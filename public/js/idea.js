const homeIdea = document.getElementById('homeIdea');

async function idea() {
    const parent = $(this).parent().parent().parent().parent().siblings(".hidden"); // this code works
    $( parent ).toggleClass( "show" ); // this code works

    const response = await fetch ('/controllers/bucketlistRoutes', { // this code does not work
        method: "GET"
    });

    console.log(response); // this code does something but not sure what is going on
    
}
homeIdea.addEventListener('click', idea); // this code works

// place code from gunnner in slack here or inside idea()

