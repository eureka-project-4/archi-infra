// mypage.js - 통합 버전

const baseUrl = '/api/service/users';

// 공통 요청 핸들러
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

function formatPrice(value) {
  return value === 0 ? '무료' : `₩${value.toLocaleString()}`;
}

function formatDate(isoString) {
  return isoString.split('T')[0];
}

// 내 정보 렌더링
async function loadUserProfile() {
  try {
    const data = await fetchJson(`${baseUrl}/profile`);
    
    document.getElementById('user-name').textContent = data.username;
    document.getElementById('user-email').textContent = data.email;
    document.getElementById('user-phone').textContent = data.number;
    document.getElementById('user-birth').textContent = data.birth;
    document.getElementById('user-gender').textContent = data.gender;
    document.getElementById('user-email-display').textContent = data.email;
  } catch (err) {
    console.error('사용자 정보 불러오기 실패:', err);
  }
}

// 요금제 렌더링
function renderPlan(plan, prefix) {
  document.getElementById(`${prefix}-plan-name`).textContent = plan.planName;
  document.getElementById(`${prefix}-plan-benefit`).textContent = plan.benefit;
  document.getElementById(`${prefix}-plan-price`).textContent = formatPrice(plan.price);
}

// 부가서비스 렌더링
function renderVas(vas, prefix) {
  document.getElementById(`${prefix}-vas-name`).textContent = vas.vasName;
  document.getElementById(`${prefix}-vas-description`).textContent = vas.vasDescription;
  document.getElementById(`${prefix}-vas-price`).textContent = formatPrice(vas.discountedPrice);
}

// 쿠폰 렌더링
function renderCoupon(coupon, prefix) {
  document.getElementById(`${prefix}-coupon-name`).textContent = coupon.couponName;
  document.getElementById(`${prefix}-coupon-category`).textContent = coupon.category;
  document.getElementById(`${prefix}-coupon-price`).textContent = formatPrice(coupon.price);
}

// 현재 구독 정보 로드
async function loadCurrentSubscription() {
  try {
    const [plan, vas, coupon] = await Promise.all([
      fetchJson(`${baseUrl}/current/plans`),
      fetchJson(`${baseUrl}/current/vass`),
      fetchJson(`${baseUrl}/current/coupons`),
    ]);

    renderPlan(plan, 'current');
    renderVas(vas, 'current');
    renderCoupon(coupon, 'current');
  } catch (err) {
    console.error('현재 구독 정보 불러오기 실패:', err);
  }
}

// 다음달 구독 정보 로드
async function loadNextSubscription() {
  try {
    const [plan, vas, coupon] = await Promise.all([
      fetchJson(`${baseUrl}/next/plans`),
      fetchJson(`${baseUrl}/next/vass`),
      fetchJson(`${baseUrl}/next/coupons`),
    ]);

    renderPlan(plan, 'next');
    renderVas(vas, 'next');
    renderCoupon(coupon, 'next');
  } catch (err) {
    console.error('다음달 구독 정보 불러오기 실패:', err);
  }
}

// 초기화
document.addEventListener('DOMContentLoaded', async () => {
  try {
    await loadUserProfile();
    await loadCurrentSubscription();
    await loadNextSubscription();
  } catch (e) {
    console.error('마이페이지 초기화 실패:', e);
  }
});