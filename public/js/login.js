async function loginFormHandler(event) {
  event.preventDefault()

  const name = document.querySelector("#username-login").value.trim()
  const password = document.querySelector("#password-login").value.trim()
  const signupLink = document.querySelector("#signup-link")

  if (name && password) {
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({
        name,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    })
    console.log(response);

    if (response.ok) {
      document.location.replace("/dashboard")
    } else {
      signupLink.innerHTML = "Signup instead"
    }
  }
}

document
  .querySelector("#login-form")
  .addEventListener("submit", loginFormHandler)
