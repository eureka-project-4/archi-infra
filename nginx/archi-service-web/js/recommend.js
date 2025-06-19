document.addEventListener('DOMContentLoaded', () => {
  const baseRecommendUrl = '/api/service/recommend';
  const evaluateUrl = '/api/service/recommend/evaluate';
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    console.warn('🚨 accessToken 없음. API 호출 차단됨');
    return;
  }

  const recommendHeaders = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  };

  const recommendBtn = document.getElementById('get-recommendation');
  const recommendSection = document.getElementById('recommend-section');
  
  // 추천 데이터를 저장할 변수
  let currentRecommendData = null;

  if (!recommendBtn) {
    console.error('❌ 추천받기 버튼 (#get-recommendation)을 찾을 수 없음');
    return;
  }

  recommendBtn.addEventListener('click', async () => {
    console.log('🟣 추천받기 버튼 클릭됨');
    try {
      const res = await fetch(baseRecommendUrl, {
        method: 'GET',
        headers: recommendHeaders,
      });

      console.log('📡 API 응답 상태:', res.status);
      const json = await res.json();
      if (json.resultCode !== 200) throw new Error(json.message);

      const { plans, vass, coupons } = json.data;
      
      // 추천 데이터 저장
      currentRecommendData = { plans, vass, coupons };

      renderRecommendations(plans, 'plan', renderPlanItem);
      renderRecommendations(vass, 'vas', renderVasItem);
      renderRecommendations(coupons, 'coupon', renderCouponItem);

      recommendSection.classList.remove('hidden');
      
      // AI 평가 버튼 이벤트 리스너 추가
      setupEvaluateButton();
    } catch (err) {
      console.error('❌ 추천 API 호출 실패:', err);
      alert('추천 정보를 불러오지 못했습니다.');
    }
  });

  // AI 평가 버튼 설정
  function setupEvaluateButton() {
    const evaluateBtn = document.getElementById('evaluate-recommendation');
    if (!evaluateBtn) {
      console.error('❌ AI 평가 버튼을 찾을 수 없음');
      return;
    }

    // 기존 이벤트 리스너 제거 (중복 방지)
    evaluateBtn.replaceWith(evaluateBtn.cloneNode(true));
    const newEvaluateBtn = document.getElementById('evaluate-recommendation');

    newEvaluateBtn.addEventListener('click', async () => {
      console.log('🤖 AI 평가 버튼 클릭됨');
      
      if (!currentRecommendData) {
        alert('먼저 추천받기를 실행해주세요.');
        return;
      }

      try {
        // 로딩 표시
        newEvaluateBtn.disabled = true;
        newEvaluateBtn.textContent = 'AI 평가 중...';

        const res = await fetch(evaluateUrl, {
          method: 'POST',
          headers: recommendHeaders,
          body: JSON.stringify(currentRecommendData)
        });

        console.log('🤖 평가 API 응답 상태:', res.status);
        const json = await res.json();
        
        if (json.resultCode !== 200) throw new Error(json.message);

        // 평가 결과 렌더링
        renderEvaluationResults(json.data);
        
      } catch (err) {
        console.error('❌ AI 평가 API 호출 실패:', err);
        alert('AI 평가를 불러오지 못했습니다.');
      } finally {
        // 버튼 복원
        newEvaluateBtn.disabled = false;
        newEvaluateBtn.textContent = 'AI🤖 에게 추천 평가받기';
      }
    });
  }

  // AI 평가 결과 렌더링
  function renderEvaluationResults(evaluationData) {
    const { plans, vass, coupons, description } = evaluationData;
    
    // 평가 설명 표시
    if (description) {
      showEvaluationDescription(description);
    }

    // 재정렬된 추천 결과 렌더링
    renderRecommendations(plans, 'plan', renderPlanItem);
    renderRecommendations(vass, 'vas', renderVasItem);
    renderRecommendations(coupons, 'coupon', renderCouponItem);

    // 평가 완료 표시
    highlightEvaluated();
  }

  // 평가 설명 표시
  function showEvaluationDescription(description) {
    // 기존 평가 설명 제거
    const existingDesc = document.getElementById('ai-evaluation-desc');
    if (existingDesc) existingDesc.remove();

    // 새 평가 설명 추가
    const descDiv = document.createElement('div');
    descDiv.id = 'ai-evaluation-desc';
    descDiv.className = 'mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg';
    descDiv.innerHTML = `
      <div class="flex items-start gap-2">
        <span class="text-purple-600 text-lg">🤖</span>
        <div>
          <h4 class="font-semibold text-purple-800 mb-1">AI 평가 결과</h4>
          <p class="text-sm text-gray-700">${description}</p>
        </div>
      </div>
    `;

    const recommendSection = document.getElementById('recommend-section');
    const firstH2 = recommendSection.querySelector('h2');
    firstH2.insertAdjacentElement('afterend', descDiv);
  }

  // 평가 완료 표시
  function highlightEvaluated() {
    const sections = ['top-plan', 'top-vas', 'top-coupon'];
    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element && element.firstChild) {
        element.firstChild.classList.add('ring-2', 'ring-purple-400', 'ring-offset-2');
      }
    });
  }

  // 공통 렌더 함수
  function renderRecommendations(list, type, renderFn) {
    if (!list || list.length === 0) return;

    const topBox = document.getElementById(`top-${type}`);
    const otherBox = document.getElementById(`other-${type}s`);
    if (!topBox || !otherBox) return;

    topBox.innerHTML = '';
    otherBox.innerHTML = '';

    topBox.appendChild(renderFn(list[0], true));
    list.slice(1).forEach(item => {
      otherBox.appendChild(renderFn(item, false));
    });
  }

  function renderPlanItem(plan, isTop = false) {
    const div = document.createElement('div');
    div.className = `p-4 border rounded ${isTop ? 'bg-blue-50' : 'bg-white'}`;
    div.innerHTML = `
      <h4 class="font-bold text-blue-600">${plan.planName}</h4>
      <p class="text-sm text-gray-600">월 ${plan.price.toLocaleString()}원 / 데이터 ${plan.monthData}GB</p>
      <p class="text-sm text-gray-500">통화: ${plan.callUsage} / 문자: ${plan.messageUsage}</p>
      <p class="text-sm text-gray-400">혜택: ${plan.benefit || '없음'}</p>
      ${plan.tags ? `<div class="mt-2 flex flex-wrap gap-1">${plan.tags.map(tag => 
        `<span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">${tag}</span>`
      ).join('')}</div>` : ''}
    `;
    return div;
  }

  function renderVasItem(vas, isTop = false) {
    const div = document.createElement('div');
    div.className = `p-4 border rounded ${isTop ? 'bg-green-50' : 'bg-white'}`;
    const finalPrice = vas.discountedPrice || vas.price;
    div.innerHTML = `
      <h4 class="font-bold text-green-600">${vas.vasName}</h4>
      <p class="text-sm text-gray-600">${vas.vasDescription}</p>
      <div class="flex items-center gap-2 mt-1">
        ${vas.saleRate > 0 ? `
          <span class="text-sm text-gray-400 line-through">${vas.price.toLocaleString()}원</span>
          <span class="text-sm font-semibold text-red-600">${finalPrice.toLocaleString()}원</span>
          <span class="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">${vas.saleRate}%</span>
        ` : `
          <span class="text-sm text-gray-700">${finalPrice.toLocaleString()}원</span>
        `}
      </div>
      ${vas.tags ? `<div class="mt-2 flex flex-wrap gap-1">${vas.tags.map(tag => 
        `<span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">${tag}</span>`
      ).join('')}</div>` : ''}
    `;
    return div;
  }

  function renderCouponItem(coupon, isTop = false) {
    const div = document.createElement('div');
    div.className = `p-4 border rounded ${isTop ? 'bg-yellow-50' : 'bg-white'}`;
    div.innerHTML = `
      <h4 class="font-bold text-yellow-700">${coupon.couponName}</h4>
      <p class="text-sm text-gray-600">가격: ${coupon.price === 0 ? '무료' : coupon.price.toLocaleString() + '원'}</p>
      ${coupon.tags ? `<div class="mt-2 flex flex-wrap gap-1">${coupon.tags.map(tag => 
        `<span class="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">${tag}</span>`
      ).join('')}</div>` : ''}
    `;
    return div;
  }
});