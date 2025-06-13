// auth.js - 공통 API 요청 및 토큰 갱신 처리 모듈

let accessToken = null;

export function setAccessToken(token) {
  accessToken = token;
}

async function refreshAccessToken() {
  const res = await fetch("/api/service/auth/refresh", {
    method: "POST",
    credentials: "include", // HttpOnly 쿠키 포함
  });
  if (!res.ok) throw new Error("Refresh token expired");
  const json = await res.json();
  accessToken = json.data.accessToken;
  return accessToken;
}

export async function apiRequest(url, options = {}) {
  if (!accessToken) throw new Error("No access token");

  const headers = options.headers || {};
  headers["Authorization"] = `Bearer ${accessToken}`;
  headers["Content-Type"] = "application/json";

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    try {
      await refreshAccessToken();
      return await apiRequest(url, options); // 재시도
    } catch (err) {
      window.location.href = "/login.html"; // 로그인 페이지로 리다이렉트
    }
  }

  return response;
}

export function logout() {
  localStorage.removeItem("accessToken");
  window.location.href = "/login.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logout-button");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }
});