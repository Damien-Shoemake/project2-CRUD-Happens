const homeIdea = document.getElementById('homeIdea');

function idea() {
    console.log('boom');
    console.log(this);
    // const apiSection = document.getElementById('apiSection');
    $( this ).toggleClass( "show" );
    // apiSection.toggleClass('show');
    
}
homeIdea.addEventListener('click', idea);

// place code from gunnner in slack here or inside idea()

