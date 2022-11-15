async function newFormHandler(event) {
  event.preventDefault()

  const title = document.querySelector('input[name="post-title"]').value
  const post_content = document.querySelector(
    'textarea[name="post_content"]'
  ).value
  console.log(post_content)
  const response = await fetch(`/api/post`, {
    method: "POST",
    body: JSON.stringify({
      title,
      post_content,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (response.ok) {
    document.location.replace("/dashboard")
  } else {
    alert(response.statusText)
  }
}

// if there is an idea in localStorage, then update the title with the idea from localStorage
// document.querySelector('input[name="post-title"]').value = localStorage.getItem("idea")
// delete idea from localStorage
const storedIdea = localStorage.getItem("idea")
if (storedIdea) {
  document.querySelector('input[name="post-title"]').value = storedIdea
  localStorage.removeItem("idea")
}

document
  .querySelector("#new-post-form")
  .addEventListener("submit", newFormHandler)
