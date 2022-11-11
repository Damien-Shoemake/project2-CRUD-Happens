const homeIdea = document.getElementById('homeIdea');

function idea() {
    console.log('boom');
    console.log(this);
    const parent = $(this).parent().parent().parent().parent().siblings(".hidden");
    console.log(parent);
    // const apiSection = document.getElementById('apiSection');
    $( parent ).toggleClass( "show" );
    // apiSection.toggleClass('show');
    
}
homeIdea.addEventListener('click', idea);

// place code from gunnner in slack here or inside idea()

