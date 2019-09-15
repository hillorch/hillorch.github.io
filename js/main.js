// variables to use when working with the navbar scrolling
const navbar = $('nav.navbar');
const colours = ['rgba(50, 50, 50, 0.7)', 'rgb(66, 66, 66)']
let opaque = false;

// register service worker to cache content
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/serviceworker.js', {scope: '/'}).then(function(registration) {
          }, /*catch*/ function(error) {
            console.log('Service worker registration failed:', error);
        });
    });
}

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

/*
// Implement background-size: cover in JS because Chrome mobile doesn't work with it and position: fixed simultaneously for some reason
let bgRatio = 1928 / 878; // insert resolution of background image here
// change the calculation of background size depending on the size of the window
function checkBG() {
    if (window.innerWidth / window.innerHeight > bgRatio) {
        $('body').css('background-size', '100vw auto');
    }
    else {
        $('body').css('background-size', '');
    }
}
checkBG(); // check for the first time
window.addEventListener('resize', checkBG); // then, every time the window resizes, check again
*/

// code to control user opt-in / opt-out for Google Analytics
let gaProperty = 'UA-58923240-2',  disableStr = 'ga-disable-' + gaProperty;
if (document.cookie.indexOf(disableStr + '=true') > -1) {
    window[disableStr] = true;
    console.log('GA Disable Cookie detected. Opting out.');
}
else if (document.cookie.indexOf(disableStr + '=false') > -1) {
    window[disableStr] = true;
    console.log('Google Analytics Enabled. If you want to change your mind, you can either run gaOptout() in the console or delete the cookies for this domain.');
}
else {
    $('#cookie-toast').toast('show');
}
function gaOptout() {
    document.cookie = disableStr + '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/';
    window[disableStr] = true;
    $('#cookie-toast').toast('hide');
    return 'Succesfully opted you out of Google Analytics';
}
function gaOptin() {
    document.cookie = disableStr + '=false; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/';
    $('#cookie-toast').toast('hide');
    return 'Succesfully opted you into Google Analytics';
}

// activate Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', gaProperty);
