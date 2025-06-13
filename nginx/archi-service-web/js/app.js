document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".nav-tab");
  const tabContents = document.querySelectorAll(".tab-content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const targetId = tab.dataset.tab;

      // 모든 탭 버튼 스타일 초기화
      tabs.forEach(t => {
        t.classList.remove("border-b-2", "border-pink-500", "text-pink-600", "font-semibold");
      });

      // 현재 선택 탭 강조
      tab.classList.add("border-b-2", "border-pink-500", "text-pink-600", "font-semibold");

      // 모든 탭 콘텐츠 숨기기
      tabContents.forEach(content => content.classList.add("hidden"));

      // 선택된 탭 콘텐츠만 보이기
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.remove("hidden");
      }

      // ✅ "둘러보기" 탭이면 데이터 렌더링
      if (targetId === "search") {
        initBrowseTab();
      }
    });
  });

  // 초기 탭 실행
  document.querySelector('.nav-tab[data-tab="my-page"]').click();
});