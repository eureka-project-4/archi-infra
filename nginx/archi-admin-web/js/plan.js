// 요금제 관리 JavaScript
let plans = [];

// 요금제 API 함수들
const planApi = {
    // 요금제 목록 조회
    async getPlanList(pageNumber = 1, pageSize = 10) {
        try {
            const response = await fetch(`/plans?pageNumber=${pageNumber}&pageSize=${pageSize}`);
            const result = await response.json();
            if (result.codeName === 'SUCCESS') {
                return result.data.planDtoList;
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            handleApiError(error, '요금제 목록 조회');
            return null;
        }
    },

    // 요금제 상세 조회
    async getPlanById(planId) {
        try {
            const response = await fetch(`/plans/${planId}`);
            const result = await response.json();
            if (result.codeName === 'SUCCESS') {
                return result.data.planDto;
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            handleApiError(error, '요금제 상세 조회');
            return null;
        }
    },

    // 요금제 등록
    async registerPlan(planData) {
        try {
            const response = await fetch('/plans', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(planData)
            });
            const result = await response.json();
            if (result.codeName === 'SUCCESS') {
                showAlert('요금제가 성공적으로 등록되었습니다.');
                return result.data;
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            handleApiError(error, '요금제 등록');
            return null;
        }
    },

    // 요금제 수정
    async updatePlan(planId, planData) {
        try {
            const response = await fetch(`/plans/${planId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(planData)
            });
            const result = await response.json();
            if (result.codeName === 'SUCCESS') {
                showAlert('요금제가 성공적으로 수정되었습니다.');
                return result.data;
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            handleApiError(error, '요금제 수정');
            return null;
        }
    },

    // 요금제 삭제
    async deletePlan(planId) {
        try {
            const response = await fetch(`/plans/${planId}`, {
                method: 'DELETE'
            });
            const result = await response.json();
            if (result.codeName === 'SUCCESS') {
                showAlert('요금제가 성공적으로 삭제되었습니다.');
                return true;
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            handleApiError(error, '요금제 삭제');
            return false;
        }
    }
};

// 요금제 테이블 렌더링
function renderPlanTable(planData) {
    const tbody = document.querySelector('#products .section:nth-child(2) .table tbody');
    if (!tbody) return;

    if (!planData || !planData.content || planData.content.length === 0) {
        tbody.innerHTML = adminUtils.createEmptyTableRow(6, '등록된 요금제가 없습니다.');
        return;
    }

    tbody.innerHTML = planData.content.map(plan => `
        <tr>
            <td>${plan.planName || '-'}</td>
            <td>${plan.price || '-'}</td>
            <td>${plan.monthData || '-'}</td>
            <td>${plan.callUsage || '-'}</td>
            <td>${plan.messageUsage || '-'}</td>
            <td>
                <button class="btn btn-outline" onclick="viewPlanDetail(${plan.planId})">상세</button>
                <button class="btn btn-outline" onclick="editPlan(${plan.planId})">수정</button>
                <button class="btn btn-secondary" onclick="deletePlanConfirm(${plan.planId})">삭제</button>
            </td>
        </tr>
    `).join('');
}

// 요금제 목록 로드
async function loadPlanList() {
    const planData = await planApi.getPlanList(currentPage, pageSize);
    if (planData) {
        plans = planData;
        renderPlanTable({content : planData});
        updatePlanStats();
    }
}

// 요금제 통계 업데이트
function updatePlanStats() {
    const totalPlans = plans.length;
    const statsCard = document.querySelector('.stats-grid .stat-card:first-child .stat-number');
    if (statsCard) {
        statsCard.textContent = totalPlans;
    }
}

// 요금제 상세 보기
async function viewPlanDetail(planId) {
    const planDetail = await planApi.getPlanById(planId);
    if (planDetail) {
        const modal = createPlanDetailModal(planDetail);
        document.body.appendChild(modal);
    }
}

// 요금제 상세 모달 생성
function createPlanDetailModal(plan) {
    const body = `
        <div class="form-group">
            <label class="form-label">요금제명:</label>
            <p>${plan.planName || '-'}</p>
        </div>
        <div class="form-group">
            <label class="form-label">월 요금:</label>
            <p>${adminUtils.formatCurrency(plan.monthlyFee)}</p>
        </div>
        <div class="form-group">
            <label class="form-label">데이터:</label>
            <p>${plan.dataAmount || '-'}</p>
        </div>
        <div class="form-group">
            <label class="form-label">통화:</label>
            <p>${plan.voiceMinutes || '-'}</p>
        </div>
        <div class="form-group">
            <label class="form-label">메시지:</label>
            <p>${plan.smsCount || '-'}</p>
        </div>
        <div class="form-group">
            <label class="form-label">혜택:</label>
            <p>${plan.benefit || '-'}</p>
        </div>
        <div class="form-group">
            <label class="form-label">태그 코드:</label>
            <p>${plan.tagCode || '-'}</p>
        </div>
        <div class="form-group">
            <label class="form-label">연령 코드:</label>
            <p>${plan.ageCode || '-'}</p>
        </div>
        <div class="form-group">
            <label class="form-label">생성일:</label>
            <p>${adminUtils.formatDate(plan.createdAt)}</p>
        </div>
        <div class="form-group">
            <label class="form-label">수정일:</label>
            <p>${adminUtils.formatDate(plan.updatedAt)}</p>
        </div>
    `;

    const footer = `
        <button class="btn btn-secondary" onclick="closeModal()">닫기</button>
    `;

    return createModal('요금제 상세 정보', body, footer);
}

// 요금제 수정
async function editPlan(planId) {
    const planDetail = await planApi.getPlanById(planId);
    if (planDetail) {
        const modal = createPlanEditModal(planDetail);
        document.body.appendChild(modal);
    }
}

// 요금제 수정 모달 생성
function createPlanEditModal(plan) {
    const body = `
        <form id="editPlanForm">
            <div class="form-group">
                <label class="form-label">요금제명:</label>
                <input type="text" class="form-input" name="planName" value="${plan.planName || ''}" required>
            </div>
            <div class="form-group">
                <label class="form-label">월 요금:</label>
                <input type="number" class="form-input" name="monthlyFee" value="${plan.monthlyFee || ''}" required>
            </div>
            <div class="form-group">
                <label class="form-label">데이터:</label>
                <input type="text" class="form-input" name="dataAmount" value="${plan.dataAmount || ''}">
            </div>
            <div class="form-group">
                <label class="form-label">통화 (분):</label>
                <input type="text" class="form-input" name="voiceMinutes" value="${plan.voiceMinutes || ''}">
            </div>
            <div class="form-group">
                <label class="form-label">메시지 (건):</label>
                <input type="text" class="form-input" name="smsCount" value="${plan.smsCount || ''}">
            </div>
            <div class="form-group">
                <label class="form-label">혜택:</label>
                <textarea class="form-input" name="benefit" rows="3">${plan.benefit || ''}</textarea>
            </div>
            <div class="form-group">
                <label class="form-label">태그 코드:</label>
                <input type="text" class="form-input" name="tagCode" value="${plan.tagCode || ''}">
            </div>
            <div class="form-group">
                <label class="form-label">연령 코드:</label>
                <input type="text" class="form-input" name="ageCode" value="${plan.ageCode || ''}">
            </div>
        </form>
    `;

    const footer = `
        <button class="btn btn-secondary" onclick="closeModal()">취소</button>
        <button class="btn btn-primary" onclick="savePlanEdit(${plan.planId})">저장</button>
    `;

    return createModal('요금제 수정', body, footer);
}

// 요금제 수정 저장
async function savePlanEdit(planId) {
    const form = document.getElementById('editPlanForm');
    const formData = new FormData(form);
    const planData = adminUtils.formDataToObject(formData);

    // 숫자 필드 변환
    if (planData.monthlyFee) planData.monthlyFee = parseInt(planData.monthlyFee);

    const result = await planApi.updatePlan(planId, planData);
    if (result) {
        closeModal();
        loadPlanList();
    }
}

// 요금제 삭제 확인
function deletePlanConfirm(planId) {
    confirmDialog('정말로 이 요금제를 삭제하시겠습니까?', () => {
        deletePlanAction(planId);
    });
}

// 요금제 삭제 실행
async function deletePlanAction(planId) {
    const result = await planApi.deletePlan(planId);
    if (result) {
        loadPlanList();
    }
}

// 새 요금제 추가 모달
function showAddPlanModal() {
    const body = `
        <form id="addPlanForm">
            <div class="form-group">
                <label class="form-label">요금제명:</label>
                <input type="text" class="form-input" name="planName" required>
            </div>
            <div class="form-group">
                <label class="form-label">월 요금:</label>
                <input type="number" class="form-input" name="monthlyFee" required>
            </div>
            <div class="form-group">
                <label class="form-label">데이터:</label>
                <input type="text" class="form-input" name="dataAmount">
            </div>
            <div class="form-group">
                <label class="form-label">통화 (분):</label>
                <input type="text" class="form-input" name="voiceMinutes">
            </div>
            <div class="form-group">
                <label class="form-label">메시지 (건):</label>
                <input type="text" class="form-input" name="smsCount">
            </div>
            <div class="form-group">
                <label class="form-label">혜택:</label>
                <textarea class="form-input" name="benefit" rows="3"></textarea>
            </div>
            <div class="form-group">
                <label class="form-label">태그 코드:</label>
                <input type="text" class="form-input" name="tagCode">
            </div>
            <div class="form-group">
                <label class="form-label">연령 코드:</label>
                <input type="text" class="form-input" name="ageCode">
            </div>
        </form>
    `;

    const footer = `
        <button class="btn btn-secondary" onclick="closeModal()">취소</button>
        <button class="btn btn-primary" onclick="savePlanAdd()">등록</button>
    `;

    const modal = createModal('새 요금제 추가', body, footer);
    document.body.appendChild(modal);
}

// 새 요금제 저장
async function savePlanAdd() {
    const form = document.getElementById('addPlanForm');
    const formData = new FormData(form);
    const planData = adminUtils.formDataToObject(formData);

    // 숫자 필드 변환
    if (planData.monthlyFee) planData.monthlyFee = parseInt(planData.monthlyFee);

    const result = await planApi.registerPlan(planData);
    if (result) {
        closeModal();
        loadPlanList();
    }
}

// 요금제 검색 기능
function searchPlans(searchTerm) {
    if (!searchTerm) {
        loadPlanList();
        return;
    }

    const filteredPlans = plans.filter(plan =>
        plan.planName && plan.planName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const planData = { content: filteredPlans };
    renderPlanTable(planData);
}

// 요금제 이벤트 초기화
function initializePlanEvents() {
    // 요금제 검색 기능
    const planSearchInput = document.querySelector('#products .section:nth-child(2) .search-input');
    if (planSearchInput) {
        planSearchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                searchPlans(this.value);
            }
        });
    }

    // 새 요금제 추가 버튼
    const addPlanBtn = document.querySelector('#products .section:nth-child(2) .btn-primary');
    if (addPlanBtn) {
        addPlanBtn.addEventListener('click', showAddPlanModal);
    }
}

// 요금제 모듈 외부 인터페이스
window.planModule = {
    initialize() {
        loadPlanList();
        initializePlanEvents();
    },
    loadPlanList,
    updateStats: updatePlanStats,
    searchPlans,
    showAddPlanModal
};