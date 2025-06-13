document.addEventListener('DOMContentLoaded', () => {
  const baseRecommendUrl = '/api/service/recommend';
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    console.warn('🚨 accessToken 없음. API 호출 차단됨');
    return;
  }

  const recommendHeaders = {
    'Authorization': `Bearer ${accessToken}`,
  };

  const recommendBtn = document.getElementById('get-recommendation');
  const recommendSection = document.getElementById('recommend-section');

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

      renderRecommendations(plans, 'plan', renderPlanItem);
      renderRecommendations(vass, 'vas', renderVasItem);
      renderRecommendations(coupons, 'coupon', renderCouponItem);

      recommendSection.classList.remove('hidden');
    } catch (err) {
      console.error('❌ 추천 API 호출 실패:', err);
      alert('추천 정보를 불러오지 못했습니다.');
    }
  });

  // 공통 렌더 함수
  function renderRecommendations(list, type, renderFn) {
    if (!list || list.length === 0) return;

    const topBox = document.getElementById(`top-${type}`);
    const otherBox = document.getElementById(`other-${type}s`);
    if (!topBox || !otherBox) return;

    topBox.innerHTML = '';
    otherBox.innerHTML = '';

    topBox.appendChild(renderFn(list[0]));
    list.slice(1).forEach(item => {
      otherBox.appendChild(renderFn(item));
    });
  }

  function renderPlanItem(plan) {
    const div = document.createElement('div');
    div.className = 'p-4 border rounded bg-white';
    div.innerHTML = `
      <h4 class="font-bold text-blue-600">${plan.planName}</h4>
      <p class="text-sm text-gray-600">월 ${plan.price}원 / 데이터 ${plan.monthData}GB</p>
      <p class="text-sm text-gray-500">통화: ${plan.callUsage} / 문자: ${plan.messageUsage}</p>
      <p class="text-sm text-gray-400">혜택: ${plan.benefit || '없음'}</p>
    `;
    return div;
  }

  function renderVasItem(vas) {
    const div = document.createElement('div');
    div.className = 'p-4 border rounded bg-white';
    div.innerHTML = `
      <h4 class="font-bold text-green-600">${vas.vasName}</h4>
      <p class="text-sm text-gray-600">${vas.vasDescription}</p>
      <p class="text-sm text-gray-500">가격: ${vas.discountedPrice || vas.price}원</p>
      <p class="text-xs text-gray-400">${vas.isOnSale ? `할인율: ${vas.saleRate}%` : ''}</p>
    `;
    return div;
  }

  function renderCouponItem(coupon) {
    const div = document.createElement('div');
    div.className = 'p-4 border rounded bg-white';
    div.innerHTML = `
      <h4 class="font-bold text-yellow-600">${coupon.couponName}</h4>
      <p class="text-sm text-gray-600">가격: ${coupon.price}원</p>
    `;
    return div;
  }
});