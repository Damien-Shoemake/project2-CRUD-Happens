async function editFormHandler(event) {
    event.preventDefault();
  
    //same as other two files, just combined now. These are placeholders, we can change them once the front end is built. 
    const title = document.querySelector('input[name="post-title"]').value;
    const post_content = document.querySelector('input[name="post-content"]').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

    const edit = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            post_content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
      });
      
      if (edit.ok) {
        document.location.replace('/dashboard/');
      } else {
        window.alert('Error editing post' + edit.statusText);
      }
  }
  
  document.querySelector('.editPlaceholder').addEventListener('submit', editFormHandler);