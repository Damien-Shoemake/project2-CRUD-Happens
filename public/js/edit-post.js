async function editFormHandler(event) {
  event.preventDefault()
  console.log(event.target)

  const title = document.querySelector('input[name="post-title"]').value.trim()
  const post_content = document
    .querySelector('textarea[name="post_content"]')
    .value.trim()
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ]

  const response = await fetch(`/api/post/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      post_id: id,
      title,
      post_content,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (response.ok) {
    document.location.replace("/dashboard/")
  } else {
    alert(response.statusText)
  }
}

document
  .querySelector("#edit-post-form")
  .addEventListener("submit", editFormHandler)
