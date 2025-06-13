const baseUserUrl = '/api/service/users';
const baseSurveyUrl = '/api/service/surveys';
const accessToken = localStorage.getItem('accessToken');

const headers = {
  'Authorization': `Bearer ${accessToken}`,
};

// 1. 기존 성향 불러오기
async function loadTendencyTags() {
  try {
    const res = await fetch(`${baseUserUrl}/tendency`, { headers });
    const json = await res.json();

    if (json.resultCode !== 200) throw new Error(json.message);
    const tags = json.data;

    const tagBox = document.getElementById('tendency-tags');
    tagBox.innerHTML = '';

    tags.forEach(tag => {
      const tagEl = document.createElement('div');
      tagEl.className = 'bg-blue-100 text-blue-700 px-3 py-2 rounded text-sm';
      tagEl.textContent = tag.tagDescription;
      tagBox.appendChild(tagEl);
    });

    document.getElementById('tendency-updated-at').textContent =
      `마지막 분석: ${new Date().toLocaleDateString()}`;
  } catch (err) {
    console.error('성향 태그 로딩 실패:', err);
  }
}

// 2. 테스트 시작 시 모달 열기
document.getElementById('start-tendency-test').addEventListener('click', async () => {
  document.getElementById('tendency-modal-overlay').classList.remove('hidden');
  document.getElementById('modal-footer').classList.add('hidden');
  await loadQuestion(1, null);
});

// 3. 질문 로딩
async function loadQuestion(nextQuestionId = 1, tagCode = null) {
  try {
    const params = new URLSearchParams();
    if (nextQuestionId) params.append('nextQuestionId', nextQuestionId);
    if (tagCode !== null) params.append('tagCode', tagCode);

    const res = await fetch(`${baseSurveyUrl}/questions?${params.toString()}`, { headers });
    const json = await res.json();
    const question = json.data;

    const optionBox = document.getElementById('modal-options');
    optionBox.innerHTML = '';

    if (question.order === 0) {
      document.getElementById('modal-question').textContent = question.questionText;
      document.getElementById('modal-footer').classList.remove('hidden');
      return;
    }

    renderOptions(question.options, question.questionText);
  } catch (err) {
    console.error('질문 불러오기 실패:', err);
  }
}

// 4. 선택지 렌더링
function renderOptions(options, questionText) {
  const container = document.getElementById('modal-options');
  container.innerHTML = '';

  document.getElementById('modal-question').textContent = questionText;

  options.forEach(option => {
    const btn = document.createElement('button');
    btn.className = 'bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded text-sm';
    btn.textContent = option.optionText;

    btn.onclick = () => {
      loadQuestion(option.nextQustionId, option.tagCode);
    };

    container.appendChild(btn);
  });
}

// 5. 결과 저장
document.getElementById('submit-tendency').addEventListener('click', async () => {
  try {
    const res = await fetch(`${baseSurveyUrl}/save`, {
      method: 'POST',
      headers,
    });
    const json = await res.json();

    alert('성향 분석 결과가 저장되었습니다!');
    window.location.reload();
  } catch (err) {
    console.error('성향 저장 실패:', err);
  }
});

// 6. 모달 닫기
document.getElementById('close-modal').addEventListener('click', () => {
  document.getElementById('tendency-modal-overlay').classList.add('hidden');
});

// 7. 페이지 로드 시 기존 성향 태그 로드
document.addEventListener('DOMContentLoaded', () => {
  loadTendencyTags();
});