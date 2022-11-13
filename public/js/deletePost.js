async function deletePostFormHandler(event) {
    event.preventDefault();
    
    //stack overflow praise be
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

    const delResponse = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({
          post_id: id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (delResponse.ok) {
        document.location.replace('/dashboard/');
      } else {
        window.alert('Error deleting post ' + delResponse.statusText);
      }
    
  }
  
  //placeholder for whatever we decide to name the class/id on the front end. Make sure to modify once that is built. 
  document.querySelector('.deletePlaceholder').addEventListener('click', deletePostFormHandler);