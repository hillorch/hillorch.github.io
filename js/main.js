// variables to use when working with the navbar scrolling
const navbar = $('nav.navbar');
const colours = ['rgba(50, 50, 50, 0.7)', 'rgb(66, 66, 66)']
let opaque = false;

/**
 * Change the navbar's appearance depending on whether we're at the top or not
 */
function checkScroll() {
    if($(window).scrollTop() <= 20) {
        if (opaque) {
            // if we're at the top of the page and the navbar is opaque
            navbar.css('background-color', colours[0]).css('box-shadow', 'none');
            // Make it transparent and remove the shadow
            opaque = false;
            // and remember that it's not opaque any more
        }
    }
    else if (!opaque) {
        // if we're not at the top and the navbar is transparent
        navbar.css('background-color', colours[1]).css('box-shadow', '0px -10px 30px 0px #000000');
        // make it opaque and add the shadow back in
        opaque = true;
        // and remember that it's opaque again
    }
}
// run that function whenever the user scrolls
window.addEventListener('scroll', checkScroll);

// register service worker to cache content
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/js/serviceworker.js');
    });
}

/**
 * Make smooth scrolling a thing
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    // for every in-page link
    anchor.addEventListener('click', function(e) {
        // when it's clicked...

        e.preventDefault();
        // instead of the default...

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            // do a sexy smooth scroll 😍
            behavior: 'smooth'
        });
    });
});