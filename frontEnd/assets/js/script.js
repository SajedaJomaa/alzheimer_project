$(document).ready(function () {
    $(".owl-carousel").owlCarousel();
});
//   يعمل loop 
$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 3
        },
        1000: {
            items: 5
        }
    }
})
// register
// let section = document.querySelector('section')
// let navlink =document.querySelector('navbar navbar-nav nav-link')
// Window.onscroll=() =>{
//     section.forEach(sec =>{
//         let top = window.scrollY;
//         let offset = sec.offsetTop - 150;
//         let height = sec.offsetHeight;
//         let id = sec.getAttribute('id');
//         if (top>= offset && top< offset + height){
//             navlink.forEach( links => {
//            links.classList.remove('.nav-link active');
//            document.querySelector(' .navbar navbar-nav nav-link [href*=' + id + ']').classList.add('.nav-link active');

//         })
//     }
//         })
// }

const activePage = window.location.pathname;
const navlinks = document.querySelectorAll('.nav-link ');
const sectionEls = document.querySelectorAll('.section');
let currentsection = '.header';
window.addEventListener('scroll', () => {
    sectionEls.forEach(sectionEl => {
        if (window.scrollY >= sectionEl.offsetTop) {
            currentsection = sectionEl.id;
        }
    });
    navlinks.forEach(navlink => {
        if (navlink.href.includes(currentsection)) {
            document.querySelector('.active').classList.remove('.active');
            vavLink.classList.add('active');
        }
    })
})

// mixitup
var mixer = mixitup('.event-gallery');




