// browse.js - 둘러보기 탭 기능

async function fetchJson(url) {
  const accessToken = localStorage.getItem('accessToken');
  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  const json = await res.json();
  if (json.resultCode !== 200) {
    console.error(`[API ERROR] ${url}:`, json.message);
    throw new Error(json.message || 'API 호출 실패');
  }
  return json.data;
}

async function initBrowseTab() {
  const contentEl = document.getElementById('browse-content');
  contentEl.innerHTML = '<p class="text-center">데이터를 불러오는 중...</p>';

  try {
    // 올바른 API 경로로 수정
    const [plans, vass, coupons] = await Promise.all([
      fetchJson('/api/service/plans'),
      fetchJson('/api/service/vass'), 
      fetchJson('/api/service/coupons'),
    ]);

    console.log('API 응답:', { plans, vass, coupons });

    // HTML 카드 생성 함수
    const createCard = (item, type) => {
      const idField = `${type}Id`;
      const nameField = `${type}Name`;
      
      return `
        <div class="browse-card p-4 border rounded shadow-sm cursor-pointer hover:shadow-md transition-shadow" 
             data-type="${type}" data-id="${item[idField]}">
          <div class="w-full h-32 bg-gray-100 rounded mb-2 flex items-center justify-center text-4xl">
            ${type === 'plan' ? '📱' : type === 'vas' ? '🎯' : '🎁'}
          </div>
          <h3 class="font-bold text-lg mb-1">${item[nameField] || item.name}</h3>
          <p class="text-sm text-gray-600 mb-1">가격: ${item.price ? item.price.toLocaleString() : '0'}원</p>
          <p class="text-xs text-gray-400">카테고리: ${item.category || '-'}</p>
        </div>
      `;
    };

    // 그룹별 렌더링
    const renderGroup = (title, items, type) => {
      if (!items || !items.length) return '';
      const cardsHTML = items.map(item => createCard(item, type)).join('');
      return `
        <div class="mb-8">
          <h2 class="text-xl font-semibold mb-4">${title}</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            ${cardsHTML}
          </div>
        </div>
      `;
    };

	
	const plansArray = Array.isArray(plans?.content) ? plans.content : [];
	const vassArray = Array.isArray(vass?.content) ? vass.content : [];
	const couponsArray = Array.isArray(coupons?.content) ? coupons.content : [];
	
	const allItems = [
	...plansArray.map(item => ({...item, type: 'plan'})),
	...vassArray.map(item => ({...item, type: 'vas'})),
	...couponsArray.map(item => ({...item, type: 'coupon'}))
	];
    
    const cardsHTML = allItems.map(item => createCard(item, item.type)).join('');
    contentEl.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        ${cardsHTML}
      </div>
    `;

    // 필터 이벤트 등록
    setupCategoryFilters();
    setupCardClickEvents();

  } catch (error) {
    console.error('둘러보기 데이터 로드 실패:', error);
    contentEl.innerHTML = '<p class="text-center text-red-500">데이터를 불러오는데 실패했습니다.</p>';
  }
}

function setupCategoryFilters() {
  const categoryButtons = document.querySelectorAll('.category-btn');
  
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      const selected = button.getAttribute('data-category');
      const allCards = document.querySelectorAll('.browse-card');

      // 버튼 활성화 상태 업데이트
      categoryButtons.forEach(btn => {
        btn.classList.remove('bg-purple-600', 'text-white');
        btn.classList.add('border-gray-300', 'text-gray-700');
      });
      button.classList.add('bg-purple-600', 'text-white');
      button.classList.remove('border-gray-300', 'text-gray-700');

      // 카드 필터링
      allCards.forEach(card => {
        const cardType = card.getAttribute('data-type');
        if (selected === 'all' || cardType === selected) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

function setupCardClickEvents() {
  document.querySelectorAll('.browse-card').forEach(card => {
    card.addEventListener('click', () => {
      const type = card.getAttribute('data-type');
      const id = card.getAttribute('data-id');
      if (type && id) {
        location.href = `detail.html?type=${type}&id=${id}`;
      }
    });
  });
}

// 탭 전환 시 실행
document.addEventListener('DOMContentLoaded', () => {
  const searchTab = document.querySelector('[data-tab="search"]');
  if (searchTab) {
    searchTab.addEventListener('click', () => {
      // 탭이 활성화될 때 데이터 로드
      setTimeout(initBrowseTab, 100);
    });
  }
});