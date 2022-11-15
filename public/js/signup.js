async function signupFormHandler(event) {
  event.preventDefault()

  // getting data from the form
  const name = document.querySelector("#username-signup").value.trim()
  const password = document.querySelector("#password-signup").value.trim()
  const loginLink = document.querySelector("#login-link")
  console.log(name)

  if (name && password) {
    const response = await fetch("/api/user", {
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
      loginLink.innerHTML = "Login instead"
    }
  }
}

document
  .querySelector("#signup-form")
  .addEventListener("submit", signupFormHandler)
