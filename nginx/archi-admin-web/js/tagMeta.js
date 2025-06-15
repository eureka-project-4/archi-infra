// 태그 메타데이터 API 함수들
const tagMetaApi = {
    // 태그 메타데이터 목록 조회
    async getTagMetaList(pageNumber = 1, pageSize = 10) {
        try {
            const response = await fetch(`/tagmeta?pageNumber=${pageNumber}&pageSize=${pageSize}`);
            const result = await response.json();
            if (result.codeName === 'SUCCESS') {
                return result.data.tagMetaDtoList;
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            handleApiError(error, '태그 메타데이터 목록 조회');
            return null;
        }
    },

    // 태그 메타데이터 상세 조회
    async getTagMetaById(tagType, tagKey) {
        try {
            const response = await fetch(`/tagmeta/detail?tagType=${tagType}&tagKey=${tagKey}`);
            const result = await response.json();
            if (result.codeName === 'SUCCESS') {
                return result.data.tagMetaDto;
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            handleApiError(error, '태그 메타데이터 상세 조회');
            return null;
        }
    },

    // 태그 메타데이터 등록
    async registerTagMeta(tagMetaData) {
        try {
            const response = await fetch('/tagmeta', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tagMetaData)
            });
            const result = await response.json();
            if (result.codeName === 'SUCCESS') {
                showAlert('태그 메타데이터가 성공적으로 등록되었습니다.');
                return result.data;
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            handleApiError(error, '태그 메타데이터 등록');
            return null;
        }
    },

    // 태그 메타데이터 수정
    async updateTagMeta(tagMetaData) {
        try {
            const response = await fetch('/tagmeta', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tagMetaData)
            });
            const result = await response.json();
            if (result.codeName === 'SUCCESS') {
                showAlert('태그 메타데이터가 성공적으로 수정되었습니다.');
                return result.data;
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            handleApiError(error, '태그 메타데이터 수정');
            return null;
        }
    },

    // 태그 메타데이터 삭제
    async deleteTagMeta(tagType, tagKey) {
        try {
            const response = await fetch(`/tagmeta?tagMeta=${tagType}&tagKey=${tagKey}`, {
                method: 'DELETE'
            });
            const result = await response.json();
            if (result.codeName === 'SUCCESS') {
                showAlert('태그 메타데이터가 성공적으로 삭제되었습니다.');
                return true;
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            handleApiError(error, '태그 메타데이터 삭제');
            return false;
        }
    }
};

// 태그 메타데이터 테이블 렌더링
function renderTagMetaTable(tagMetaData) {
    // HTML 구조에 맞게 선택자 수정: codes 탭의 마지막 섹션 테이블
    const tbody = document.querySelector('#codes .section:last-child .table tbody');
    if (!tbody) {
        console.error('태그 메타데이터 테이블을 찾을 수 없습니다.');
        return;
    }

    if (!tagMetaData || !tagMetaData.content || tagMetaData.content.length === 0) {
        tbody.innerHTML = adminUtils.createEmptyTableRow(5, '등록된 태그 메타데이터가 없습니다.');
        return;
    }

    tbody.innerHTML = tagMetaData.content.map(tagMeta => `
        <tr>
            <td>${tagMeta.tagType || '-'}</td>
            <td>${tagMeta.tagKey || '-'}</td>
            <td>${tagMeta.tagDescription || '-'}</td>
            <td>${tagMeta.bitPosition || '-'}</td>
            <td>
                <button class="btn btn-outline" onclick="viewTagMetaDetail('${tagMeta.tagType}', '${tagMeta.tagKey}')">상세</button>
                <button class="btn btn-outline" onclick="editTagMeta('${tagMeta.tagType}', '${tagMeta.tagKey}')">수정</button>
                <button class="btn btn-secondary" onclick="deleteTagMetaConfirm('${tagMeta.tagType}', '${tagMeta.tagKey}')">삭제</button>
            </td>
        </tr>
    `).join('');
}

// 태그 메타데이터 목록 로드
async function loadTagMetaList() {
    console.log('태그 메타데이터 목록 로드 시작');
    const tagMetaData = await tagMetaApi.getTagMetaList(currentPage, pageSize);
    if (tagMetaData) {
        tagMetas = tagMetaData;
        renderTagMetaTable({content : tagMetaData});
        updateTagMetaStats();
        console.log('태그 메타데이터 로드 완료:', tagMetaData.length, '개');
    } else {
        console.error('태그 메타데이터 로드 실패');
    }
}

// 태그 메타데이터 통계 업데이트
function updateTagMetaStats() {
    const totalTagMetas = tagMetas.length;
    // codes 탭의 첫 번째 stats-card 업데이트
    const statsCard = document.querySelector('#codes .stats-grid .stat-card:first-child .stat-number');
    if (statsCard) {
        statsCard.textContent = totalTagMetas;
        console.log('태그 메타데이터 통계 업데이트:', totalTagMetas);
    }
}

// 태그 메타데이터 상세 보기
async function viewTagMetaDetail(tagType, tagKey) {
    const tagMetaDetail = await tagMetaApi.getTagMetaById(tagType, tagKey);
    if (tagMetaDetail) {
        const modal = createTagMetaDetailModal(tagMetaDetail);
        document.body.appendChild(modal);
    }
}

// 태그 메타데이터 상세 모달 생성
function createTagMetaDetailModal(tagMeta) {
    const body = `
        <div class="form-group">
            <label class="form-label">태그 타입:</label>
            <p>${tagMeta.tagType || '-'}</p>
        </div>
        <div class="form-group">
            <label class="form-label">태그 키:</label>
            <p>${tagMeta.tagKey || '-'}</p>
        </div>
        <div class="form-group">
            <label class="form-label">설명:</label>
            <p>${tagMeta.tagDescription || '-'}</p>
        </div>
        <div class="form-group">
            <label class="form-label">비트 위치:</label>
            <p>${tagMeta.bitPosition || '-'}</p>
        </div>
        <div class="form-group">
            <label class="form-label">생성일:</label>
            <p>${adminUtils.formatDate(tagMeta.createdAt)}</p>
        </div>
        <div class="form-group">
            <label class="form-label">수정일:</label>
            <p>${adminUtils.formatDate(tagMeta.updatedAt)}</p>
        </div>
    `;

    const footer = `
        <button class="btn btn-secondary" onclick="closeModal()">닫기</button>
    `;

    return createModal('태그 메타데이터 상세 정보', body, footer);
}

// 태그 메타데이터 수정
async function editTagMeta(tagType, tagKey) {
    const tagMetaDetail = await tagMetaApi.getTagMetaById(tagType, tagKey);
    if (tagMetaDetail) {
        const modal = createTagMetaEditModal(tagMetaDetail);
        document.body.appendChild(modal);
    }
}

// 태그 메타데이터 수정 모달 생성
function createTagMetaEditModal(tagMeta) {
    const body = `
        <form id="editTagMetaForm">
            <div class="form-group">
                <label class="form-label">태그 타입:</label>
                <input type="text" class="form-input" name="tagType" value="${tagMeta.tagType || ''}" required>
            </div>
            <div class="form-group">
                <label class="form-label">태그 키:</label>
                <input type="text" class="form-input" name="tagKey" value="${tagMeta.tagKey || ''}" required>
            </div>
            <div class="form-group">
                <label class="form-label">설명:</label>
                <textarea class="form-input" name="tagDescription" rows="3">${tagMeta.tagDescription || ''}</textarea>
            </div>
            <div class="form-group">
                <label class="form-label">비트 위치:</label>
                <input type="number" class="form-input" name="bitPosition" value="${tagMeta.bitPosition || 0}">
            </div>
        </form>
    `;

    const footer = `
        <button class="btn btn-secondary" onclick="closeModal()">취소</button>
        <button class="btn btn-primary" onclick="saveTagMetaEdit('${tagMeta.tagType}', '${tagMeta.tagKey}')">저장</button>
    `;

    return createModal('태그 메타데이터 수정', body, footer);
}

// 태그 메타데이터 수정 저장
async function saveTagMetaEdit(tagType, tagKey) {
    const form = document.getElementById('editTagMetaForm');
    const formData = new FormData(form);
    const tagMetaData = adminUtils.formDataToObject(formData);

    // 숫자 필드 변환
    if (tagMetaData.bitPosition) tagMetaData.bitPosition = parseInt(tagMetaData.bitPosition);

    const result = await tagMetaApi.updateTagMeta(tagMetaData);
    if (result) {
        closeModal();
        loadTagMetaList();
    }
}

// 태그 메타데이터 삭제 확인
function deleteTagMetaConfirm(tagType, tagKey) {
    confirmDialog('정말로 이 태그 메타데이터를 삭제하시겠습니까?', () => {
        deleteTagMetaAction(tagType, tagKey);
    });
}

// 태그 메타데이터 삭제 실행
async function deleteTagMetaAction(tagType, tagKey) {
    const result = await tagMetaApi.deleteTagMeta(tagType, tagKey);
    if (result) {
        loadTagMetaList();
    }
}

// 새 태그 메타데이터 추가 모달
function showAddTagMetaModal() {
    const body = `
        <form id="addTagMetaForm">
            <div class="form-group">
                <label class="form-label">태그 타입:</label>
                <input type="text" class="form-input" name="tagType" required>
            </div>
            <div class="form-group">
                <label class="form-label">태그 키:</label>
                <input type="text" class="form-input" name="tagKey" required>
            </div>
            <div class="form-group">
                <label class="form-label">설명:</label>
                <textarea class="form-input" name="tagDescription" rows="3"></textarea>
            </div>
            <div class="form-group">
                <label class="form-label">비트 위치:</label>
                <input type="number" class="form-input" name="bitPosition" value="0">
            </div>
        </form>
    `;

    const footer = `
        <button class="btn btn-secondary" onclick="closeModal()">취소</button>
        <button class="btn btn-primary" onclick="saveTagMetaAdd()">등록</button>
    `;

    const modal = createModal('새 태그 메타데이터 추가', body, footer);
    document.body.appendChild(modal);
}

// 새 태그 메타데이터 저장
async function saveTagMetaAdd() {
    const form = document.getElementById('addTagMetaForm');
    const formData = new FormData(form);
    const tagMetaData = adminUtils.formDataToObject(formData);

    // 숫자 필드 변환
    if (tagMetaData.bitPosition) tagMetaData.bitPosition = parseInt(tagMetaData.bitPosition);

    const result = await tagMetaApi.registerTagMeta(tagMetaData);
    if (result) {
        closeModal();
        loadTagMetaList();
    }
}

// 태그 메타데이터 검색 기능
function searchTagMetas(searchTerm) {
    if (!searchTerm) {
        loadTagMetaList();
        return;
    }

    const filteredTagMetas = tagMetas.filter(tagMeta =>
        (tagMeta.tagType && tagMeta.tagType.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (tagMeta.tagKey && tagMeta.tagKey.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (tagMeta.tagDescription && tagMeta.tagDescription.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const tagMetaData = { content: filteredTagMetas };
    renderTagMetaTable(tagMetaData);
}

// 태그 메타데이터 이벤트 초기화
function initializeTagMetaEvents() {
    // 태그 메타데이터 검색 기능 - codes 탭의 마지막 섹션
    const tagMetaSearchInput = document.querySelector('#codes .section:last-child .search-input');
    if (tagMetaSearchInput) {
        tagMetaSearchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                searchTagMetas(this.value);
            }
        });
        console.log('태그 메타데이터 검색 이벤트 초기화 완료');
    } else {
        console.warn('태그 메타데이터 검색 입력창을 찾을 수 없습니다.');
    }

    // 새 태그 메타데이터 추가 버튼 - codes 탭의 마지막 섹션
    const addTagMetaBtn = document.querySelector('#codes .section:last-child .btn-primary');
    if (addTagMetaBtn) {
        addTagMetaBtn.addEventListener('click', showAddTagMetaModal);
        console.log('태그 메타데이터 추가 버튼 이벤트 초기화 완료');
    } else {
        console.warn('태그 메타데이터 추가 버튼을 찾을 수 없습니다.');
    }
}

// 태그 메타데이터 모듈 외부 인터페이스
window.tagMetaModule = {
    initialize() {
        console.log('TagMeta 모듈 초기화 시작');

        loadTagMetaList();
        initializeTagMetaEvents();
    },

    // 강제 초기화 (탭 전환시 사용)
    forceInitialize() {
        console.log('TagMeta 모듈 강제 초기화');
        loadTagMetaList();
        initializeTagMetaEvents();
    },

    loadTagMetaList,
    updateStats: updateTagMetaStats,
    searchTagMetas,
    showAddTagMetaModal
};

// DOM이 준비되면 자동으로 초기화 (개발/디버깅용)
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 로드 완료 - TagMeta 모듈 자동 초기화 대기');
    // 실제 사용 시에는 탭 전환 시점에 초기화해야 함
    // window.tagMetaModule.initialize();
});