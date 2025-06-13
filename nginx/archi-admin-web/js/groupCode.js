// 그룹코드 관리 JavaScript
let groupCodes = [];

// 그룹코드 API 함수들
const groupCodeApi = {
    // 그룹코드 목록 조회
    async getGroupCodeList(pageNumber = 0, pageSize = 10) {
        try {
            const response = await fetch(`/groupcode?pageNumber=${pageNumber}&pageSize=${pageSize}`);
            const result = await response.json();
            if (result.codeName === 'SUCCESS') {
                return result.data.groupCodeDtoList;
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            handleApiError(error, '그룹코드 목록 조회');
            return null;
        }
    },

    // 그룹코드 상세 조회
    async getGroupCodeById(groupCode) {
        try {
            const response = await fetch(`/groupcode/detail?groupCode=${groupCode}`);
            const result = await response.json();
            if (result.codeName === 'SUCCESS') {
                return result.data.groupCodeDto;
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            handleApiError(error, '그룹코드 상세 조회');
            return null;
        }
    },

    // 그룹코드 등록
    async registerGroupCode(groupCodeData) {
        try {
            const response = await fetch('/groupcode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(groupCodeData)
            });
            const result = await response.json();
            if (result.codeName === 'SUCCESS') {
                showAlert('그룹코드가 성공적으로 등록되었습니다.');
                return result.data;
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            handleApiError(error, '그룹코드 등록');
            return null;
        }
    },

    // 그룹코드 수정
    async updateGroupCode(groupCodeData) {
        try {
            const response = await fetch('/groupcode', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(groupCodeData)
            });
            const result = await response.json();
            if (result.codeName === 'SUCCESS') {
                showAlert('그룹코드가 성공적으로 수정되었습니다.');
                return result.data;
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            handleApiError(error, '그룹코드 수정');
            return null;
        }
    },

    // 그룹코드 삭제
    async deleteGroupCode(groupCode) {
        try {
            const response = await fetch(`/groupcode?groupCode=${groupCode}`, {
                method: 'DELETE'
            });
            const result = await response.json();
            if (result.codeName === 'SUCCESS') {
                showAlert('그룹코드가 성공적으로 삭제되었습니다.');
                return true;
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            handleApiError(error, '그룹코드 삭제');
            return false;
        }
    }
};

// 그룹코드 테이블 렌더링
function renderGroupCodeTable(groupCodeData) {
    const tbody = document.querySelector('#codes .section:nth-child(2) .table tbody');
    if (!tbody) return;

    if (!groupCodeData || !groupCodeData.content || groupCodeData.content.length === 0) {
        tbody.innerHTML = adminUtils.createEmptyTableRow(5, '등록된 그룹코드가 없습니다.');
        return;
    }

    tbody.innerHTML = groupCodeData.content.map(groupCode => `
        <tr>
            <td>${groupCode.groupCode || '-'}</td>
            <td>${groupCode.groupName || '-'}</td>
            <td>
                <button class="btn btn-outline" onclick="viewGroupCodeDetail('${groupCode.groupCode}')">상세</button>
                <button class="btn btn-outline" onclick="editGroupCode('${groupCode.groupCode}')">수정</button>
                <button class="btn btn-secondary" onclick="deleteGroupCodeConfirm('${groupCode.groupCode}')">삭제</button>
            </td>
        </tr>
    `).join('');
}

// 그룹코드 목록 로드
async function loadGroupCodeList() {
    const groupCodeData = await groupCodeApi.getGroupCodeList(0, 10);
    if (groupCodeData) {
        groupCodes = groupCodeData;
        renderGroupCodeTable({content : groupCodeData});
        updateGroupCodeStats();
    }
}

// 그룹코드 통계 업데이트
function updateGroupCodeStats() {
    const totalGroupCodes = groupCodes.length;
    const statsCard = document.querySelector('#codes .stats-grid .stat-card:first-child .stat-number');
    if (statsCard) {
        statsCard.textContent = totalGroupCodes;
    }
}

// 그룹코드 상세 보기
async function viewGroupCodeDetail(groupCode) {
    const groupCodeDetail = await groupCodeApi.getGroupCodeById(groupCode);
    if (groupCodeDetail) {
        const modal = createGroupCodeDetailModal(groupCodeDetail);
        document.body.appendChild(modal);
    }
}

// 그룹코드 상세 모달 생성
function createGroupCodeDetailModal(groupCode) {
    const body = `
        <div class="form-group">
            <label class="form-label">그룹 코드:</label>
            <p>${groupCode.groupCode || '-'}</p>
        </div>
        <div class="form-group">
            <label class="form-label">코드 설명:</label>
            <p>${groupCode.description || '-'}</p>
        </div>
        <div class="form-group">
            <label class="form-label">공통 코드 수:</label>
            <p>${groupCode.codeCount || 0}개</p>
        </div>
        <div class="form-group">
            <label class="form-label">사용 여부:</label>
            <p><span class="status-badge ${groupCode.isActive ? 'status-active' : 'status-inactive'}">${groupCode.isActive ? '사용' : '미사용'}</span></p>
        </div>
        <div class="form-group">
            <label class="form-label">생성일:</label>
            <p>${adminUtils.formatDate(groupCode.createdAt)}</p>
        </div>
        <div class="form-group">
            <label class="form-label">최종 수정일:</label>
            <p>${adminUtils.formatDate(groupCode.updatedAt)}</p>
        </div>
    `;

    const footer = `
        <button class="btn btn-secondary" onclick="closeModal()">닫기</button>
    `;

    return createModal('그룹코드 상세 정보', body, footer);
}

// 그룹코드 수정
async function editGroupCode(groupCode) {
    const groupCodeDetail = await groupCodeApi.getGroupCodeById(groupCode);
    if (groupCodeDetail) {
        const modal = createGroupCodeEditModal(groupCodeDetail);
        document.body.appendChild(modal);
    }
}

// 그룹코드 수정 모달 생성
function createGroupCodeEditModal(groupCode) {
    const body = `
        <form id="editGroupCodeForm">
            <div class="form-group">
                <label class="form-label">그룹 코드:</label>
                <input type="text" class="form-input" name="groupCode" value="${groupCode.groupCode || ''}" readonly style="background-color: #f8f9fa;">
                <small class="form-text text-muted">그룹 코드는 수정할 수 없습니다.</small>
            </div>
            <div class="form-group">
                <label class="form-label">코드 설명:</label>
                <textarea class="form-input" name="description" rows="3" required>${groupCode.description || ''}</textarea>
            </div>
            <div class="form-group">
                <label class="form-label">사용 여부:</label>
                <select class="form-input" name="isActive" required>
                    <option value="true" ${groupCode.isActive ? 'selected' : ''}>사용</option>
                    <option value="false" ${!groupCode.isActive ? 'selected' : ''}>미사용</option>
                </select>
            </div>
        </form>
    `;

    const footer = `
        <button class="btn btn-secondary" onclick="closeModal()">취소</button>
        <button class="btn btn-primary" onclick="saveGroupCodeEdit('${groupCode.groupCode}')">저장</button>
    `;

    return createModal('그룹코드 수정', body, footer);
}

// 그룹코드 수정 저장
async function saveGroupCodeEdit(originalGroupCode) {
    const form = document.getElementById('editGroupCodeForm');
    const formData = new FormData(form);
    const groupCodeData = adminUtils.formDataToObject(formData);

    // 타입 변환
    groupCodeData.isActive = groupCodeData.isActive === 'true';

    const result = await groupCodeApi.updateGroupCode(groupCodeData);
    if (result) {
        closeModal();
        loadGroupCodeList();
    }
}

// 그룹코드 삭제 확인
function deleteGroupCodeConfirm(groupCode) {
    confirmDialog(`정말로 그룹코드 "${groupCode}"를 삭제하시겠습니까?\n\n⚠️ 이 그룹코드에 속한 모든 공통코드도 함께 삭제됩니다.`, () => {
        deleteGroupCodeAction(groupCode);
    });
}

// 그룹코드 삭제 실행
async function deleteGroupCodeAction(groupCode) {
    const result = await groupCodeApi.deleteGroupCode(groupCode);
    if (result) {
        loadGroupCodeList();
    }
}

// 새 그룹코드 추가 모달
function showAddGroupCodeModal() {
    const body = `
        <form id="addGroupCodeForm">
            <div class="form-group">
                <label class="form-label">그룹 코드:</label>
                <input type="text" class="form-input" name="groupCode" required placeholder="예: PLAN_TYPE" pattern="[A-Z_]+" title="대문자와 언더스코어(_)만 사용 가능합니다">
                <small class="form-text text-muted">대문자와 언더스코어(_)만 사용하세요. 예: PLAN_TYPE</small>
            </div>
            <div class="form-group">
                <label class="form-label">코드 설명:</label>
                <textarea class="form-input" name="description" rows="3" required placeholder="그룹코드에 대한 설명을 입력하세요"></textarea>
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
        <button class="btn btn-primary" onclick="saveGroupCodeAdd()">등록</button>
    `;

    const modal = createModal('새 그룹코드 추가', body, footer);
    document.body.appendChild(modal);
}

// 새 그룹코드 저장
async function saveGroupCodeAdd() {
    const form = document.getElementById('addGroupCodeForm');
    const formData = new FormData(form);
    const groupCodeData = adminUtils.formDataToObject(formData);

    // 타입 변환
    groupCodeData.isActive = groupCodeData.isActive === 'true';

    // 그룹코드 형식 검증
    if (!/^[A-Z_]+$/.test(groupCodeData.groupCode)) {
        showAlert('그룹코드는 대문자와 언더스코어(_)만 사용할 수 있습니다.');
        return;
    }

    const result = await groupCodeApi.registerGroupCode(groupCodeData);
    if (result) {
        closeModal();
        loadGroupCodeList();
    }
}

// 그룹코드 검색 기능
function searchGroupCodes(searchTerm) {
    if (!searchTerm) {
        loadGroupCodeList();
        return;
    }

    const filteredGroupCodes = groupCodes.filter(groupCode =>
        (groupCode.groupCode && groupCode.groupCode.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (groupCode.description && groupCode.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const groupCodeData = { content: filteredGroupCodes };
    renderGroupCodeTable(groupCodeData);
}

// 그룹코드 이벤트 초기화
function initializeGroupCodeEvents() {
    // 그룹코드 검색 기능
    const groupCodeSearchInput = document.querySelector('#codes .section:nth-child(2) .search-input');
    if (groupCodeSearchInput) {
        groupCodeSearchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                searchGroupCodes(this.value);
            }
        });
    }

    // 새 그룹코드 추가 버튼
    const addGroupCodeBtn = document.querySelector('#codes .section:nth-child(2) .btn-primary');
    if (addGroupCodeBtn) {
        addGroupCodeBtn.addEventListener('click', showAddGroupCodeModal);
    }
}

// 그룹코드 모듈 외부 인터페이스
window.groupCodeModule = {
    initialize() {
        loadGroupCodeList();
        initializeGroupCodeEvents();
    },
    loadGroupCodeList,
    updateStats: updateGroupCodeStats,
    searchGroupCodes,
    showAddGroupCodeModal,
    getGroupCodeList: () => groupCodes // 공통코드에서 사용할 수 있도록
};