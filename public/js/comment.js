let deleteCommentButton = document.querySelector('#delete-comment');

async function commentFormHandler(event) {
  event.preventDefault()

  const comment = document
    .querySelector('textarea[name="comment-body"]')
    .value.trim()

  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ]
// check if there is a comment, preventing from users submitting empty comments
  if (comment) {
    const response = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({
        post_id,
        comment,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (response.ok) {
      document.location.reload()
    } else {
      alert(response.statusText)
    }
  }
}

 document
   .querySelector("#comment-form")
   .addEventListener("submit", commentFormHandler)


  async function deleteFormHandler(event) {
    event.preventDefault();

   let id = deleteCommentButton.parentElement.parentElement.parentElement.getAttribute('data-commentID');

  
    const response = await fetch(`/api/comment/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({
          id: id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
  
  }
  
deleteCommentButton.addEventListener('click', deleteFormHandler);