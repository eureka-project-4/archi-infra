// 라이프 혜택(쿠폰) 관리 JavaScript
let coupons = [];

// 쿠폰 API 함수들
const couponApi = {
    // 쿠폰 목록 조회
    async getCouponList(pageNumber = 1, pageSize = 10) {
        try {
            const response = await fetch(`/coupons?pageNumber=${pageNumber}&pageSize=${pageSize}`);
            const result = await response.json();
            if (result.codeName === 'SUCCESS') {
                return result.data.couponDtoList; // 실제 배열 반환
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            handleApiError(error, '라이프 혜택 목록 조회');
            return null;
        }
    },

    // 쿠폰 상세 조회
    async getCouponById(couponId) {
        try {
            const response = await fetch(`/coupons/${couponId}`);
            const result = await response.json();
            if (result.codeName === 'SUCCESS') {
                return result.data.couponDto; // 단일 객체 반환
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            handleApiError(error, '라이프 혜택 상세 조회');
            return null;
        }
    },

    // 쿠폰 등록
    async registerCoupon(couponData) {
        try {
            const response = await fetch('/coupons', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(couponData)
            });
            const result = await response.json();
            if (result.codeName === 'SUCCESS') {
                showAlert('라이프 혜택이 성공적으로 등록되었습니다.');
                return result.data;
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            handleApiError(error, '라이프 혜택 등록');
            return null;
        }
    },

    // 쿠폰 수정
    async updateCoupon(couponId, couponData) {
        try {
            const response = await fetch(`/coupons/${couponId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(couponData)
            });
            const result = await response.json();
            if (result.codeName === 'SUCCESS') {
                showAlert('라이프 혜택이 성공적으로 수정되었습니다.');
                return result.data;
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            handleApiError(error, '라이프 혜택 수정');
            return null;
        }
    },

    // 쿠폰 삭제
    async deleteCoupon(couponId) {
        try {
            const response = await fetch(`/coupons/${couponId}`, {
                method: 'DELETE'
            });
            const result = await response.json();
            if (result.codeName === 'SUCCESS') {
                showAlert('라이프 혜택이 성공적으로 삭제되었습니다.');
                return true;
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            handleApiError(error, '라이프 혜택 삭제');
            return false;
        }
    }
};

// 쿠폰 테이블 렌더링
function renderCouponTable(couponData) {
    const tbody = document.querySelector('#products .section:nth-child(4) .table tbody');
    if (!tbody) return;

    if (!couponData || !couponData.content || couponData.content.length === 0) {
        tbody.innerHTML = adminUtils.createEmptyTableRow(4, '등록된 라이프 혜택이 없습니다.');
        return;
    }

    tbody.innerHTML = couponData.content.map(coupon => `
        <tr>
            <td>${coupon.couponName || '-'}</td>
            <td>${coupon.tagList ? coupon.tagList.join(', ') : '-'}</td>
            <td>${coupon.categoryCode || '-'}</td>
            <td>
                <button class="btn btn-outline" onclick="viewCouponDetail(${coupon.couponId})">상세</button>
                <button class="btn btn-outline" onclick="editCoupon(${coupon.couponId})">수정</button>
                <button class="btn btn-secondary" onclick="deleteCouponConfirm(${coupon.couponId})">삭제</button>
            </td>
        </tr>
    `).join('');
}

// 쿠폰 목록 로드
async function loadCouponList() {
    const couponData = await couponApi.getCouponList(1, 10);
    if (couponData) {
        coupons = couponData; // 직접 배열 할당
        renderCouponTable({ content: couponData }); // content 형태로 전달
        updateCouponStats();
    }
}

// 태그 코드 포맷팅 (간단히 표시)
function formatTagCode(tagCode) {
    return tagCode ? `TAG_${tagCode}` : '-';
}

// 쿠폰 통계 업데이트
function updateCouponStats() {
    const totalCoupons = coupons.length;
    const statsCard = document.querySelector('.stats-grid .stat-card:nth-child(3) .stat-number');
    if (statsCard) {
        statsCard.textContent = totalCoupons;
    }
}

// 쿠폰 상세 보기
async function viewCouponDetail(couponId) {
    const couponDetail = await couponApi.getCouponById(couponId);
    if (couponDetail) {
        const modal = createCouponDetailModal(couponDetail);
        document.body.appendChild(modal);
    }
}

// 쿠폰 상세 모달 생성
function createCouponDetailModal(coupon) {
    const body = `
        <div class="form-group">
            <label class="form-label">혜택명:</label>
            <p>${coupon.couponName || '-'}</p>
        </div>
        <div class="form-group">
            <label class="form-label">태그:</label>
            <p>${coupon.tagList || '-'}</p>
        </div>
        <div class="form-group">
            <label class="form-label">카테고리:</label>
            <p>${coupon.categoryCode || '-'}</p>
        </div>
        <div class="form-group">
            <label class="form-label">생성일:</label>
            <p>${adminUtils.formatDate(coupon.createdAt)}</p>
        </div>
        <div class="form-group">
            <label class="form-label">수정일:</label>
            <p>${adminUtils.formatDate(coupon.updatedAt)}</p>
        </div>
    `;

    const footer = `
        <button class="btn btn-secondary" onclick="closeModal()">닫기</button>
    `;

    return createModal('라이프 혜택 상세 정보', body, footer);
}

// 쿠폰 수정
async function editCoupon(couponId) {
    const couponDetail = await couponApi.getCouponById(couponId);
    if (couponDetail) {
        const modal = createCouponEditModal(couponDetail);
        document.body.appendChild(modal);
    }
}

// 쿠폰 수정 모달 생성
function createCouponEditModal(coupon) {
    const body = `
        <form id="editCouponForm">
            <div class="form-group">
                <label class="form-label">혜택명:</label>
                <input type="text" class="form-input" name="couponName" value="${coupon.couponName || ''}" required>
            </div>
            <div class="form-group">
                <label class="form-label">성향:</label>
                <select class="form-input" name="preference" required>
                    <option value="">성향 선택</option>
                    <option value="활동적" ${coupon.preference === '활동적' ? 'selected' : ''}>활동적</option>
                    <option value="안정적" ${coupon.preference === '안정적' ? 'selected' : ''}>안정적</option>
                    <option value="트렌디" ${coupon.preference === '트렌디' ? 'selected' : ''}>트렌디</option>
                    <option value="실용적" ${coupon.preference === '실용적' ? 'selected' : ''}>실용적</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">카테고리:</label>
                <select class="form-input" name="category" required>
                    <option value="">카테고리 선택</option>
                    <option value="음식" ${coupon.category === '음식' ? 'selected' : ''}>음식</option>
                    <option value="영화" ${coupon.category === '영화' ? 'selected' : ''}>영화</option>
                    <option value="쇼핑" ${coupon.category === '쇼핑' ? 'selected' : ''}>쇼핑</option>
                    <option value="여행" ${coupon.category === '여행' ? 'selected' : ''}>여행</option>
                    <option value="교육" ${coupon.category === '교육' ? 'selected' : ''}>교육</option>
                    <option value="헬스" ${coupon.category === '헬스' ? 'selected' : ''}>헬스</option>
                    <option value="기타" ${coupon.category === '기타' ? 'selected' : ''}>기타</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">혜택 내용:</label>
                <textarea class="form-input" name="description" rows="3">${coupon.description || ''}</textarea>
            </div>
            <div class="form-group">
                <label class="form-label">파트너사:</label>
                <input type="text" class="form-input" name="partnerCompany" value="${coupon.partnerCompany || ''}">
            </div>
            <div class="form-group">
                <label class="form-label">할인 금액/비율:</label>
                <input type="text" class="form-input" name="discountValue" value="${coupon.discountValue || ''}" placeholder="예: 1000원, 10%">
            </div>
            <div class="form-group">
                <label class="form-label">유효 기간 (일):</label>
                <input type="number" class="form-input" name="validityPeriod" value="${coupon.validityPeriod || ''}" min="1">
            </div>
        </form>
    `;

    const footer = `
        <button class="btn btn-secondary" onclick="closeModal()">취소</button>
        <button class="btn btn-primary" onclick="saveCouponEdit(${coupon.couponId})">저장</button>
    `;

    return createModal('라이프 혜택 수정', body, footer);
}

// 쿠폰 수정 저장
async function saveCouponEdit(couponId) {
    const form = document.getElementById('editCouponForm');
    const formData = new FormData(form);
    const couponData = adminUtils.formDataToObject(formData);

    // 타입 변환
    if (couponData.validityPeriod) couponData.validityPeriod = parseInt(couponData.validityPeriod);

    const result = await couponApi.updateCoupon(couponId, couponData);
    if (result) {
        closeModal();
        loadCouponList();
    }
}

// 쿠폰 삭제 확인
function deleteCouponConfirm(couponId) {
    confirmDialog('정말로 이 라이프 혜택을 삭제하시겠습니까?', () => {
        deleteCouponAction(couponId);
    });
}

// 쿠폰 삭제 실행
async function deleteCouponAction(couponId) {
    const result = await couponApi.deleteCoupon(couponId);
    if (result) {
        loadCouponList();
    }
}

// 새 쿠폰 추가 모달
function showAddCouponModal() {
    const body = `
        <form id="addCouponForm">
            <div class="form-group">
                <label class="form-label">혜택명:</label>
                <input type="text" class="form-input" name="couponName" required>
            </div>
            <div class="form-group">
                <label class="form-label">성향:</label>
                <select class="form-input" name="preference" required>
                    <option value="">성향 선택</option>
                    <option value="활동적">활동적</option>
                    <option value="안정적">안정적</option>
                    <option value="트렌디">트렌디</option>
                    <option value="실용적">실용적</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">카테고리:</label>
                <select class="form-input" name="category" required>
                    <option value="">카테고리 선택</option>
                    <option value="음식">음식</option>
                    <option value="영화">영화</option>
                    <option value="쇼핑">쇼핑</option>
                    <option value="여행">여행</option>
                    <option value="교육">교육</option>
                    <option value="헬스">헬스</option>
                    <option value="기타">기타</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">혜택 내용:</label>
                <textarea class="form-input" name="description" rows="3" placeholder="혜택 내용을 상세히 입력해주세요"></textarea>
            </div>
            <div class="form-group">
                <label class="form-label">파트너사:</label>
                <input type="text" class="form-input" name="partnerCompany" placeholder="예: 스타벅스, CGV, 올리브영">
            </div>
            <div class="form-group">
                <label class="form-label">할인 금액/비율:</label>
                <input type="text" class="form-input" name="discountValue" placeholder="예: 1000원, 10%">
            </div>
            <div class="form-group">
                <label class="form-label">유효 기간 (일):</label>
                <input type="number" class="form-input" name="validityPeriod" min="1" placeholder="30">
            </div>
        </form>
    `;

    const footer = `
        <button class="btn btn-secondary" onclick="closeModal()">취소</button>
        <button class="btn btn-primary" onclick="saveCouponAdd()">등록</button>
    `;

    const modal = createModal('새 라이프 혜택 추가', body, footer);
    document.body.appendChild(modal);
}

// 새 쿠폰 저장
async function saveCouponAdd() {
    const form = document.getElementById('addCouponForm');
    const formData = new FormData(form);
    const couponData = adminUtils.formDataToObject(formData);

    // 타입 변환
    if (couponData.validityPeriod) couponData.validityPeriod = parseInt(couponData.validityPeriod);

    const result = await couponApi.registerCoupon(couponData);
    if (result) {
        closeModal();
        loadCouponList();
    }
}

// 쿠폰 검색 기능
function searchCoupons(searchTerm) {
    if (!searchTerm) {
        loadCouponList();
        return;
    }

    const filteredCoupons = coupons.filter(coupon =>
        (coupon.couponName && coupon.couponName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (coupon.preference && coupon.preference.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (coupon.category && coupon.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const couponData = { content: filteredCoupons };
    renderCouponTable(couponData);
}

// 쿠폰 이벤트 초기화
function initializeCouponEvents() {
    // 쿠폰 검색 기능
    const couponSearchInput = document.querySelector('#products .section:nth-child(4) .search-input');
    if (couponSearchInput) {
        couponSearchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                searchCoupons(this.value);
            }
        });
    }

    // 새 쿠폰 추가 버튼
    const addCouponBtn = document.querySelector('#products .section:nth-child(4) .btn-primary');
    if (addCouponBtn) {
        addCouponBtn.addEventListener('click', showAddCouponModal);
    }
}

// 쿠폰 모듈 외부 인터페이스
window.couponModule = {
    initialize() {
        loadCouponList();
        initializeCouponEvents();
    },
    loadCouponList,
    updateStats: updateCouponStats,
    searchCoupons,
    showAddCouponModal
};