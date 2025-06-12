// 공통코드 관리 JavaScript
let commonCodes = [];
let selectedGroupCode = '';

// 공통코드 API 함수들
const commonCodeApi = {
    // 공통코드 목록 조회
    async getCommonCodeList(pageNumber = 1, pageSize = 10) {
        try {
            const response = await fetch(`/commoncode?pageNumber=${pageNumber}&pageSize=${pageSize}`);
            const result = await response.json();
            if (result.codeName === 'SUCCESS') {
                return result.data.commonCodeDtoList;
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            handleApiError(error, '공통코드 목록 조회');
            return null;
        }
    },

    // 공통코드 상세 조회
    async getCommonCodeById(commonCode, groupCode) {
        try {
            const response = await fetch(`/commoncode/detail?commonCode=${commonCode}&groupCode=${groupCode}`);
            const result = await response.json();
            if (result.codeName === 'SUCCESS') {
                return result.data.commonCodeDto;
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            handleApiError(error, '공통코드 상세 조회');
            return null;
        }
    },

    // 공통코드 등록
    async registerCommonCode(commonCodeData) {
        try {
            const response = await fetch('/commoncode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(commonCodeData)
            });
            const result = await response.json();
            if (result.codeName === 'SUCCESS') {
                showAlert('공통코드가 성공적으로 등록되었습니다.');
                return result.data;
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            handleApiError(error, '공통코드 등록');
            return null;
        }
    },

    // 공통코드 수정
    async updateCommonCode(commonCodeData) {
        try {
            const response = await fetch('/commoncode', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(commonCodeData)
            });
            const result = await response.json();
            if (result.codeName === 'SUCCESS') {
                showAlert('공통코드가 성공적으로 수정되었습니다.');
                return result.data;
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            handleApiError(error, '공통코드 수정');
            return null;
        }
    },

    // 공통코드 삭제
    async deleteCommonCode(commonCode, groupCode) {
        try {
            const response = await fetch(`/commoncode?commonCode=${commonCode}&groupCode=${groupCode}`, {
                method: 'DELETE'
            });
            const result = await response.json();
            if (result.codeName === 'SUCCESS') {
                showAlert('공통코드가 성공적으로 삭제되었습니다.');
                return true;
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            handleApiError(error, '공통코드 삭제');
            return false;
        }
    }
};

// 공통코드 테이블 렌더링
function renderCommonCodeTable(commonCodeData) {
    const tbody = document.querySelector('#codes .section:nth-child(3) .table tbody');
    if (!tbody) return;

    if (!commonCodeData || !commonCodeData.content || commonCodeData.content.length === 0) {
        tbody.innerHTML = adminUtils.createEmptyTableRow(5, '등록된 공통코드가 없습니다.');
        return;
    }

    tbody.innerHTML = commonCodeData.content.map(commonCode => `
        <tr>
            <td>${commonCode.groupCode || '-'}</td>
            <td>${commonCode.commonCode || '-'}</td>
            <td>${commonCode.commonName || '-'}</td>
         
            <td>
                <button class="btn btn-outline" onclick="viewCommonCodeDetail('${commonCode.commonCode}', '${commonCode.groupCode}')">상세</button>
                <button class="btn btn-outline" onclick="editCommonCode('${commonCode.commonCode}', '${commonCode.groupCode}')">수정</button>
                <button class="btn btn-secondary" onclick="deleteCommonCodeConfirm('${commonCode.commonCode}', '${commonCode.groupCode}')">삭제</button>
            </td>
        </tr>
    `).join('');
}

// 공통코드 목록 로드
async function loadCommonCodeList() {
    const commonCodeData = await commonCodeApi.getCommonCodeList(1, 10); // 더 많은 데이터 로드
    if (commonCodeData) {
        commonCodes = commonCodeData;
        renderCommonCodeTable({content : commonCodeData});
        updateCommonCodeStats();
    }
}

// 공통코드 통계 업데이트
function updateCommonCodeStats() {
    const totalCommonCodes = commonCodes.length;
    const statsCard = document.querySelector('#codes .stats-grid .stat-card:nth-child(2) .stat-number');
    if (statsCard) {
        statsCard.textContent = totalCommonCodes;
    }
}

// 그룹코드 필터 적용
function filterByGroupCode(groupCode) {
    selectedGroupCode = groupCode;

    if (groupCode === '' || groupCode === '전체 그룹') {
        renderCommonCodeTable({ content: commonCodes });
        return;
    }

    const filteredCodes = commonCodes.filter(code => code.groupCode === groupCode);
    renderCommonCodeTable({ content: filteredCodes });
}

// 공통코드 상세 보기
async function viewCommonCodeDetail(commonCode, groupCode) {
    const commonCodeDetail = await commonCodeApi.getCommonCodeById(commonCode, groupCode);
    if (commonCodeDetail) {
        const modal = createCommonCodeDetailModal(commonCodeDetail);
        document.body.appendChild(modal);
    }
}

// 공통코드 상세 모달 생성
function createCommonCodeDetailModal(commonCode) {
    const body = `
        <div class="form-group">
            <label class="form-label">그룹 코드:</label>
            <p>${commonCode.groupCode || '-'}</p>
        </div>
        <div class="form-group">
            <label class="form-label">공통 코드:</label>
            <p>${commonCode.commonCode || '-'}</p>
        </div>
        <div class="form-group">
            <label class="form-label">그룹 코드 설명:</label>
            <p>${commonCode.groupCodeDescription || '-'}</p>
        </div>
        <div class="form-group">
            <label class="form-label">공통 코드 설명:</label>
            <p>${commonCode.description || '-'}</p>
        </div>
        <div class="form-group">
            <label class="form-label">정렬 순서:</label>
            <p>${commonCode.sortOrder || '-'}</p>
        </div>
        <div class="form-group">
            <label class="form-label">사용 여부:</label>
            <p><span class="status-badge ${commonCode.isActive ? 'status-active' : 'status-inactive'}">${commonCode.isActive ? '사용' : '미사용'}</span></p>
        </div>
        <div class="form-group">
            <label class="form-label">생성일:</label>
            <p>${adminUtils.formatDate(commonCode.createdAt)}</p>
        </div>
        <div class="form-group">
            <label class="form-label">수정일:</label>
            <p>${adminUtils.formatDate(commonCode.updatedAt)}</p>
        </div>
    `;

    const footer = `
        <button class="btn btn-secondary" onclick="closeModal()">닫기</button>
    `;

    return createModal('공통코드 상세 정보', body, footer);
}

// 공통코드 수정
async function editCommonCode(commonCode, groupCode) {
    const commonCodeDetail = await commonCodeApi.getCommonCodeById(commonCode, groupCode);
    if (commonCodeDetail) {
        const modal = createCommonCodeEditModal(commonCodeDetail);
        document.body.appendChild(modal);
    }
}

// 공통코드 수정 모달 생성
function createCommonCodeEditModal(commonCode) {
    const body = `
        <form id="editCommonCodeForm">
            <div class="form-group">
                <label class="form-label">그룹 코드:</label>
                <input type="text" class="form-input" name="groupCode" value="${commonCode.groupCode || ''}" readonly style="background-color: #f8f9fa;">
            </div>
            <div class="form-group">
                <label class="form-label">공통 코드:</label>
                <input type="text" class="form-input" name="commonCode" value="${commonCode.commonCode || ''}" readonly style="background-color: #f8f9fa;">
                <small class="form-text text-muted">그룹코드와 공통코드는 수정할 수 없습니다.</small>
            </div>
            <div class="form-group">
                <label class="form-label">공통 코드 설명:</label>
                <textarea class="form-input" name="description" rows="3" required>${commonCode.description || ''}</textarea>
            </div>
            <div class="form-group">
                <label class="form-label">정렬 순서:</label>
                <input type="number" class="form-input" name="sortOrder" value="${commonCode.sortOrder || 0}" min="0">
            </div>
            <div class="form-group">
                <label class="form-label">사용 여부:</label>
                <select class="form-input" name="isActive" required>
                    <option value="true" ${commonCode.isActive ? 'selected' : ''}>사용</option>
                    <option value="false" ${!commonCode.isActive ? 'selected' : ''}>미사용</option>
                </select>
            </div>
        </form>
    `;

    const footer = `
        <button class="btn btn-secondary" onclick="closeModal()">취소</button>
        <button class="btn btn-primary" onclick="saveCommonCodeEdit('${commonCode.commonCode}', '${commonCode.groupCode}')">저장</button>
    `;

    return createModal('공통코드 수정', body, footer);
}

// 공통코드 수정 저장
async function saveCommonCodeEdit(originalCommonCode, originalGroupCode) {
    const form = document.getElementById('editCommonCodeForm');
    const formData = new FormData(form);
    const commonCodeData = adminUtils.formDataToObject(formData);

    // 타입 변환
    commonCodeData.isActive = commonCodeData.isActive === 'true';
    if (commonCodeData.sortOrder) commonCodeData.sortOrder = parseInt(commonCodeData.sortOrder);

    const result = await commonCodeApi.updateCommonCode(commonCodeData);
    if (result) {
        closeModal();
        loadCommonCodeList();
    }
}

// 공통코드 삭제 확인
function deleteCommonCodeConfirm(commonCode, groupCode) {
    confirmDialog(`정말로 공통코드 "${commonCode}" (${groupCode})를 삭제하시겠습니까?`, () => {
        deleteCommonCodeAction(commonCode, groupCode);
    });
}

// 공통코드 삭제 실행
async function deleteCommonCodeAction(commonCode, groupCode) {
    const result = await commonCodeApi.deleteCommonCode(commonCode, groupCode);
    if (result) {
        loadCommonCodeList();
    }
}

// 새 공통코드 추가 모달
function showAddCommonCodeModal() {
    // 그룹코드 목록 가져오기
    const groupCodeOptions = window.groupCodeModule ?
        window.groupCodeModule.getGroupCodeList().map(gc =>
            `<option value="${gc.groupCode}">${gc.groupCode} - ${gc.description}</option>`
        ).join('') :
        '<option value="">그룹코드를 먼저 등록해주세요</option>';

    const body = `
        <form id="addCommonCodeForm">
            <div class="form-group">
                <label class="form-label">그룹 코드:</label>
                <select class="form-input" name="groupCode" required>
                    <option value="">그룹코드 선택</option>
                    ${groupCodeOptions}
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">공통 코드:</label>
                <input type="text" class="form-input" name="commonCode" required placeholder="예: PREMIUM" pattern="[A-Z0-9_]+" title="대문자, 숫자, 언더스코어(_)만 사용 가능합니다">
                <small class="form-text text-muted">대문자, 숫자, 언더스코어(_)만 사용하세요.</small>
            </div>
            <div class="form-group">
                <label class="form-label">공통 코드 설명:</label>
                <textarea class="form-input" name="description" rows="3" required placeholder="공통코드에 대한 설명을 입력하세요"></textarea>
            </div>
            <div class="form-group">
                <label class="form-label">정렬 순서:</label>
                <input type="number" class="form-input" name="sortOrder" value="0" min="0" placeholder="0">
            </div>
            <div class="form-group">
                <label class="form-label">사용 여부:</label>
                <select class="form-input" name="isActive" required>
                    <option value="true" selected>사용</option>
                    <option value="false">미사용</option>
                </select>
            </div>
        </form>
    `;

    const footer = `
        <button class="btn btn-secondary" onclick="closeModal()">취소</button>
        <button class="btn btn-primary" onclick="saveCommonCodeAdd()">등록</button>
    `;

    const modal = createModal('새 공통코드 추가', body, footer);
    document.body.appendChild(modal);
}

// 새 공통코드 저장
async function saveCommonCodeAdd() {
    const form = document.getElementById('addCommonCodeForm');
    const formData = new FormData(form);
    const commonCodeData = adminUtils.formDataToObject(formData);

    // 타입 변환
    commonCodeData.isActive = commonCodeData.isActive === 'true';
    if (commonCodeData.sortOrder) commonCodeData.sortOrder = parseInt(commonCodeData.sortOrder);

    // 공통코드 형식 검증
    if (!/^[A-Z0-9_]+$/.test(commonCodeData.commonCode)) {
        showAlert('공통코드는 대문자, 숫자, 언더스코어(_)만 사용할 수 있습니다.');
        return;
    }

    const result = await commonCodeApi.registerCommonCode(commonCodeData);
    if (result) {
        closeModal();
        loadCommonCodeList();
    }
}

// 공통코드 검색 기능
function searchCommonCodes(searchTerm) {
    if (!searchTerm) {
        if (selectedGroupCode && selectedGroupCode !== '전체 그룹') {
            filterByGroupCode(selectedGroupCode);
        } else {
            loadCommonCodeList();
        }
        return;
    }

    let filteredCodes = commonCodes.filter(code =>
        (code.commonCode && code.commonCode.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (code.description && code.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (code.groupCode && code.groupCode.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // 그룹코드 필터가 적용된 경우 추가 필터링
    if (selectedGroupCode && selectedGroupCode !== '전체 그룹') {
        filteredCodes = filteredCodes.filter(code => code.groupCode === selectedGroupCode);
    }

    renderCommonCodeTable({ content: filteredCodes });
}

// 그룹코드 선택 옵션 업데이트
function updateGroupCodeOptions() {
    const select = document.querySelector('#codes .section:nth-child(3) select');
    if (!select || !window.groupCodeModule) return;

    const groupCodes = window.groupCodeModule.getGroupCodeList();
    const options = ['<option value="">전체 그룹</option>'].concat(
        groupCodes.map(gc => `<option value="${gc.groupCode}">${gc.groupCode}</option>`)
    );

    select.innerHTML = options.join('');
}

// 공통코드 이벤트 초기화
function initializeCommonCodeEvents() {
    // 공통코드 검색 기능
    const commonCodeSearchInput = document.querySelector('#codes .section:nth-child(3) .search-input');
    if (commonCodeSearchInput) {
        commonCodeSearchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                searchCommonCodes(this.value);
            }
        });
    }

    // 그룹코드 필터 선택
    const groupCodeSelect = document.querySelector('#codes .section:nth-child(3) select');
    if (groupCodeSelect) {
        groupCodeSelect.addEventListener('change', function() {
            filterByGroupCode(this.value);
        });
    }

    // 새 공통코드 추가 버튼
    const addCommonCodeBtn = document.querySelector('#codes .section:nth-child(3) .btn-primary');
    if (addCommonCodeBtn) {
        addCommonCodeBtn.addEventListener('click', showAddCommonCodeModal);
    }

    // 그룹코드 옵션 업데이트
    updateGroupCodeOptions();
}

// 공통코드 모듈 외부 인터페이스
window.commonCodeModule = {
    initialize() {
        loadCommonCodeList();
        initializeCommonCodeEvents();
    },
    loadCommonCodeList,
    updateStats: updateCommonCodeStats,
    searchCommonCodes,
    showAddCommonCodeModal,
    updateGroupCodeOptions
};