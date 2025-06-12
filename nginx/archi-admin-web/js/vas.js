// 부가서비스 관리 JavaScript
let services = [];

// 부가서비스 API 함수들
const vasApi = {
    // 부가서비스 목록 조회
    async getServiceList(pageNumber = 1, pageSize = 10) {
        try {
            const response = await fetch(`/vass?pageNumber=${pageNumber}&pageSize=${pageSize}`);
            const result = await response.json();
            if (result.codeName === 'SUCCESS') {
                return result.data.vasDtoList;
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            handleApiError(error, '부가서비스 목록 조회');
            return null;
        }
    },

    // 부가서비스 상세 조회
    async getServiceById(serviceId) {
        try {
            const response = await fetch(`/vass/${serviceId}`);
            const result = await response.json();
            if (result.codeName === 'SUCCESS') {
                return result.data.vasDto;
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            handleApiError(error, '부가서비스 상세 조회');
            return null;
        }
    },

    // 부가서비스 등록
    async registerService(serviceData) {
        try {
            const response = await fetch('/vass', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(serviceData)
            });
            const result = await response.json();
            if (result.codeName === 'SUCCESS') {
                showAlert('부가서비스가 성공적으로 등록되었습니다.');
                return result.data;
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            handleApiError(error, '부가서비스 등록');
            return null;
        }
    },

    // 부가서비스 수정
    async updateService(serviceId, serviceData) {
        try {
            const response = await fetch(`/vass/${serviceId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(serviceData)
            });
            const result = await response.json();
            if (result.codeName === 'SUCCESS') {
                showAlert('부가서비스가 성공적으로 수정되었습니다.');
                return result.data;
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            handleApiError(error, '부가서비스 수정');
            return null;
        }
    },

    // 부가서비스 삭제
    async deleteService(serviceId) {
        try {
            const response = await fetch(`/vass/${serviceId}`, {
                method: 'DELETE'
            });
            const result = await response.json();
            if (result.codeName === 'SUCCESS') {
                showAlert('부가서비스가 성공적으로 삭제되었습니다.');
                return true;
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            handleApiError(error, '부가서비스 삭제');
            return false;
        }
    }
};

// 부가서비스 테이블 렌더링
function renderServiceTable(serviceData) {
    const tbody = document.querySelector('#products .section:nth-child(3) .table tbody');
    if (!tbody) return;

    if (!serviceData || !serviceData.content || serviceData.content.length === 0) {
        tbody.innerHTML = adminUtils.createEmptyTableRow(6, '등록된 부가서비스가 없습니다.');
        return;
    }

    tbody.innerHTML = serviceData.content.map(service => `
        <tr>
            <td>${service.serviceName || '-'}</td>
            <td>${adminUtils.formatCurrency(service.monthlyFee)}</td>
            <td>${service.category || '-'}</td>
            <td><span class="status-badge ${service.isActive ? 'status-active' : 'status-inactive'}">${service.isActive ? '활성' : '비활성'}</span></td>
            <td>${adminUtils.formatNumber(service.userCount)}</td>
            <td>
                <button class="btn btn-outline" onclick="viewServiceDetail(${service.serviceId})">상세</button>
                <button class="btn btn-outline" onclick="editService(${service.serviceId})">수정</button>
                <button class="btn btn-secondary" onclick="deleteServiceConfirm(${service.serviceId})">삭제</button>
            </td>
        </tr>
    `).join('');
}

// 부가서비스 목록 로드
async function loadServiceList() {
    const serviceData = await vasApi.getServiceList(currentPage, pageSize);
    if (serviceData) {
        services = serviceData.content || [];
        renderServiceTable(serviceData);
        updateServiceStats();
    }
}

// 부가서비스 통계 업데이트
function updateServiceStats() {
    const totalServices = services.length;
    const statsCard = document.querySelector('.stats-grid .stat-card:nth-child(2) .stat-number');
    if (statsCard) {
        statsCard.textContent = totalServices;
    }
}

// 부가서비스 상세 보기
async function viewServiceDetail(serviceId) {
    const serviceDetail = await vasApi.getServiceById(serviceId);
    if (serviceDetail) {
        const modal = createServiceDetailModal(serviceDetail);
        document.body.appendChild(modal);
    }
}

// 부가서비스 상세 모달 생성
function createServiceDetailModal(service) {
    const body = `
        <div class="form-group">
            <label class="form-label">서비스명:</label>
            <p>${service.serviceName || '-'}</p>
        </div>
        <div class="form-group">
            <label class="form-label">월 요금:</label>
            <p>${adminUtils.formatCurrency(service.monthlyFee)}</p>
        </div>
        <div class="form-group">
            <label class="form-label">카테고리:</label>
            <p>${service.category || '-'}</p>
        </div>
        <div class="form-group">
            <label class="form-label">설명:</label>
            <p>${service.description || '-'}</p>
        </div>
        <div class="form-group">
            <label class="form-label">상태:</label>
            <p><span class="status-badge ${service.isActive ? 'status-active' : 'status-inactive'}">${service.isActive ? '활성' : '비활성'}</span></p>
        </div>
        <div class="form-group">
            <label class="form-label">이용자 수:</label>
            <p>${adminUtils.formatNumber(service.userCount)}명</p>
        </div>
        <div class="form-group">
            <label class="form-label">생성일:</label>
            <p>${adminUtils.formatDate(service.createdAt)}</p>
        </div>
        <div class="form-group">
            <label class="form-label">수정일:</label>
            <p>${adminUtils.formatDate(service.updatedAt)}</p>
        </div>
    `;

    const footer = `
        <button class="btn btn-secondary" onclick="closeModal()">닫기</button>
    `;

    return createModal('부가서비스 상세 정보', body, footer);
}

// 부가서비스 수정
async function editService(serviceId) {
    const serviceDetail = await vasApi.getServiceById(serviceId);
    if (serviceDetail) {
        const modal = createServiceEditModal(serviceDetail);
        document.body.appendChild(modal);
    }
}

// 부가서비스 수정 모달 생성
function createServiceEditModal(service) {
    const body = `
        <form id="editServiceForm">
            <div class="form-group">
                <label class="form-label">서비스명:</label>
                <input type="text" class="form-input" name="serviceName" value="${service.serviceName || ''}" required>
            </div>
            <div class="form-group">
                <label class="form-label">월 요금:</label>
                <input type="number" class="form-input" name="monthlyFee" value="${service.monthlyFee || ''}" required>
            </div>
            <div class="form-group">
                <label class="form-label">카테고리:</label>
                <select class="form-input" name="category" required>
                    <option value="">카테고리 선택</option>
                    <option value="OTT" ${service.category === 'OTT' ? 'selected' : ''}>OTT</option>
                    <option value="음악" ${service.category === '음악' ? 'selected' : ''}>음악</option>
                    <option value="게임" ${service.category === '게임' ? 'selected' : ''}>게임</option>
                    <option value="클라우드" ${service.category === '클라우드' ? 'selected' : ''}>클라우드</option>
                    <option value="기타" ${service.category === '기타' ? 'selected' : ''}>기타</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">설명:</label>
                <textarea class="form-input" name="description" rows="3">${service.description || ''}</textarea>
            </div>
            <div class="form-group">
                <label class="form-label">상태:</label>
                <select class="form-input" name="isActive" required>
                    <option value="true" ${service.isActive ? 'selected' : ''}>활성</option>
                    <option value="false" ${!service.isActive ? 'selected' : ''}>비활성</option>
                </select>
            </div>
        </form>
    `;

    const footer = `
        <button class="btn btn-secondary" onclick="closeModal()">취소</button>
        <button class="btn btn-primary" onclick="saveServiceEdit(${service.serviceId})">저장</button>
    `;

    return createModal('부가서비스 수정', body, footer);
}

// 부가서비스 수정 저장
async function saveServiceEdit(serviceId) {
    const form = document.getElementById('editServiceForm');
    const formData = new FormData(form);
    const serviceData = adminUtils.formDataToObject(formData);

    // 타입 변환
    if (serviceData.monthlyFee) serviceData.monthlyFee = parseInt(serviceData.monthlyFee);
    serviceData.isActive = serviceData.isActive === 'true';

    const result = await vasApi.updateService(serviceId, serviceData);
    if (result) {
        closeModal();
        loadServiceList();
    }
}

// 부가서비스 삭제 확인
function deleteServiceConfirm(serviceId) {
    confirmDialog('정말로 이 부가서비스를 삭제하시겠습니까?', () => {
        deleteServiceAction(serviceId);
    });
}

// 부가서비스 삭제 실행
async function deleteServiceAction(serviceId) {
    const result = await vasApi.deleteService(serviceId);
    if (result) {
        loadServiceList();
    }
}

// 새 부가서비스 추가 모달
function showAddServiceModal() {
    const body = `
        <form id="addServiceForm">
            <div class="form-group">
                <label class="form-label">서비스명:</label>
                <input type="text" class="form-input" name="serviceName" required>
            </div>
            <div class="form-group">
                <label class="form-label">월 요금:</label>
                <input type="number" class="form-input" name="monthlyFee" required>
            </div>
            <div class="form-group">
                <label class="form-label">카테고리:</label>
                <select class="form-input" name="category" required>
                    <option value="">카테고리 선택</option>
                    <option value="OTT">OTT</option>
                    <option value="음악">음악</option>
                    <option value="게임">게임</option>
                    <option value="클라우드">클라우드</option>
                    <option value="기타">기타</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">설명:</label>
                <textarea class="form-input" name="description" rows="3" placeholder="서비스 설명을 입력해주세요"></textarea>
            </div>
            <div class="form-group">
                <label class="form-label">상태:</label>
                <select class="form-input" name="isActive" required>
                    <option value="true">활성</option>
                    <option value="false">비활성</option>
                </select>
            </div>
        </form>
    `;

    const footer = `
        <button class="btn btn-secondary" onclick="closeModal()">취소</button>
        <button class="btn btn-primary" onclick="saveServiceAdd()">등록</button>
    `;

    const modal = createModal('새 부가서비스 추가', body, footer);
    document.body.appendChild(modal);
}

// 새 부가서비스 저장
async function saveServiceAdd() {
    const form = document.getElementById('addServiceForm');
    const formData = new FormData(form);
    const serviceData = adminUtils.formDataToObject(formData);

    // 타입 변환
    if (serviceData.monthlyFee) serviceData.monthlyFee = parseInt(serviceData.monthlyFee);
    serviceData.isActive = serviceData.isActive === 'true';

    const result = await vasApi.registerService(serviceData);
    if (result) {
        closeModal();
        loadServiceList();
    }
}

// 부가서비스 검색 기능
function searchServices(searchTerm) {
    if (!searchTerm) {
        loadServiceList();
        return;
    }

    const filteredServices = services.filter(service =>
        service.serviceName && service.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const serviceData = { content: filteredServices };
    renderServiceTable(serviceData);
}

// 부가서비스 이벤트 초기화
function initializeServiceEvents() {
    // 부가서비스 검색 기능
    const serviceSearchInput = document.querySelector('#products .section:nth-child(3) .search-input');
    if (serviceSearchInput) {
        serviceSearchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                searchServices(this.value);
            }
        });
    }

    // 새 부가서비스 추가 버튼
    const addServiceBtn = document.querySelector('#products .section:nth-child(3) .btn-primary');
    if (addServiceBtn) {
        addServiceBtn.addEventListener('click', showAddServiceModal);
    }
}

// 부가서비스 모듈 외부 인터페이스
window.vasModule = {
    initialize() {
        loadServiceList();
        initializeServiceEvents();
    },
    loadServiceList,
    updateStats: updateServiceStats,
    searchServices,
    showAddServiceModal
};