// 로그인 로직
document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await fetch("/api/service/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const result = await response.json();
  if (result.resultCode === 200) {
    localStorage.setItem("accessToken", result.data.accessToken);
    window.location.href = "/main.html";
  } else {
    alert(result.message);
  }
});

// 데모 계정으로 입력값 자동 채워주기
document.getElementById("demo-login").addEventListener("click", () => {
  document.getElementById("email").value = "user1@test.com";
  document.getElementById("password").value = "pw1";
});