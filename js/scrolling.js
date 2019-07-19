let navbar = $('nav.navbar');
let colours = ['rgba(50, 50, 50, 0.7)', 'rgb(66, 66, 66)']
let opaque = false;

/**
 * Change the navbar's appearance depending on whether we're at the top or not
 */
function checkScroll() {
    if($(window).scrollTop() <= 20) {
        if (opaque) {
            navbar.css('background-color', colours[0]).css('box-shadow', 'none');
            opaque = false;
        }
    }
    else if (!opaque) {
        navbar.css('background-color', colours[1]).css('box-shadow', '0px -10px 30px 0px #000000');
        opaque = true;
    }
}
setInterval(checkScroll, 100);

/**
 * Make smooth scrolling a thing
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});