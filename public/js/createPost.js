async function postFormHandler (event) {
    event.preventDefault();

    //grabbing title. I know markup hasn't been made yet, i'm using a placeholder until then. Feel free to change this. 
    const title = document.querySelector('input[name="post-title"]').value;

    //grabing the post content. 
    const postContent = document.querySelector('input[name="post-content"]').value;

    const postResponse = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            title, 
            post_content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(postResponse.ok){
        document.location.replace('/dashboard')
    } else {
        window.alert('Error while adding post' + postResponse.statusText);
    }
}

document.querySelector('placeholderForm').addEventListener('submit', postFormHandler)