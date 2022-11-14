const homeIdea = document.getElementById('homeIdea');

async function idea() {
    const parent = $(this).parent().parent().parent().parent().siblings(".hidden");
    $( parent ).toggleClass( "show" ); 

    const response = await fetch ('/bucketlist', { 
        method: "GET"
    })
    .then((result) => {
        return result.json();
    })
    .then((result) => {
        console.log(result.item);
    })

}
homeIdea.addEventListener('click', idea);

// place code from gunnner in slack here or inside idea()

