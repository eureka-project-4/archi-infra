// 메인 관리자 JavaScript - 공통 기능만
// 전역 변수
let currentPage = 1;
let pageSize = 10;

// 탭 전환 함수
function switchTab(tabName) {
    // 모든 탭 버튼에서 active 클래스 제거
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });

    // 모든 탭 패널 숨기기
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
    });

    // 클릭된 탭 버튼 찾아서 active 클래스 추가
    document.querySelector(`[onclick="switchTab('${tabName}')"]`).classList.add('active');

    // 해당 탭 패널 보이기
    document.getElementById(tabName).classList.add('active');
}

// 모달 닫기 공통 함수
function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
}

// 통계 업데이트 공통 함수
function updateMainStats() {
    // 각 모듈에서 자체 통계 업데이트하도록 위임
    if (window.planModule && window.planModule.updateStats) {
        window.planModule.updateStats();
    }
    if (window.vasModule && window.vasModule.updateStats) {
        window.vasModule.updateStats();
    }
    if (window.couponModule && window.couponModule.updateStats) {
        window.couponModule.updateStats();
    }
}

// 공통 유틸리티 함수들
const utils = {
    // 날짜 포맷팅
    formatDate(dateString) {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleString();
    },

    // 숫자 포맷팅 (천단위 콤마)
    formatNumber(number) {
        if (!number && number !== 0) return '-';
        return number.toLocaleString();
    },

    // 통화 포맷팅
    formatCurrency(amount) {
        if (!amount && amount !== 0) return '₩0';
        return `₩${amount.toLocaleString()}`;
    },

    // 폼 데이터를 객체로 변환
    formDataToObject(formData) {
        const obj = {};
        for (let [key, value] of formData.entries()) {
            obj[key] = value;
        }
        return obj;
    },

    // 빈 테이블 행 생성
    createEmptyTableRow(colspan, message) {
        return `<tr><td colspan="${colspan}" class="empty-state">${message}</td></tr>`;
    }
};

// 공통 모달 생성 함수
function createModal(title, body, footer, onClose = 'closeModal') {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close" onclick="${onClose}()">&times;</button>
            </div>
            <div class="modal-body">
                ${body}
            </div>
            <div class="modal-footer">
                ${footer}
            </div>
        </div>
    `;
    return modal;
}

// 공통 확인 다이얼로그
function confirmDialog(message, onConfirm) {
    if (confirm(message)) {
        onConfirm();
    }
}

// 공통 알림 함수
function showAlert(message, type = 'info') {
    // 간단한 알림 - 나중에 토스트로 업그레이드 가능
    alert(message);
}

// 공통 에러 핸들링
function handleApiError(error, context = '') {
    console.error(`${context} 오류:`, error);
    showAlert(`${context}에 실패했습니다. 다시 시도해주세요.`, 'error');
}

// DOM 로드 완료 후 메인 초기화
document.addEventListener('DOMContentLoaded', function() {
    console.log('관리자 페이지 초기화 시작');

    // 각 모듈 초기화
    initializeModules();

    // 공통 이벤트 리스너 등록
    setupCommonEvents();

    console.log('관리자 페이지 초기화 완료');
});

// 모듈 초기화
function initializeModules() {
    // 요금제 모듈 초기화
    if (window.planModule) {
        window.planModule.initialize();
    }

    // 부가서비스 모듈 초기화
    if (window.vasModule) {
        window.vasModule.initialize();
    }

    // 쿠폰 모듈 초기화
    if (window.couponModule) {
        window.couponModule.initialize();
    }

    // 그룹코드 모듈 초기화 추가
    if (window.groupCodeModule) {
        window.groupCodeModule.initialize();
    }

    // 공통코드 모듈 초기화 추가
    if (window.commonCodeModule) {
        window.commonCodeModule.initialize();
    }
}

// 공통 이벤트 설정
function setupCommonEvents() {
    // 모달 외부 클릭 시 닫기
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    });

    // ESC 키로 모달 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// 전역으로 공통 함수들 노출
window.adminUtils = utils;
window.createModal = createModal;
window.confirmDialog = confirmDialog;
window.showAlert = showAlert;
window.handleApiError = handleApiError;