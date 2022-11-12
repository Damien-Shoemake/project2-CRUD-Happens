const homeIdea = document.getElementById('homeIdea');

function idea() {
    const parent = $(this).parent().parent().parent().parent().siblings(".hidden");
    $( parent ).toggleClass( "show" );
    
}
homeIdea.addEventListener('click', idea);

// place code from gunnner in slack here or inside idea()

