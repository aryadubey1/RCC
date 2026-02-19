let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function moveSlide(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    
    // Hide all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    
    // Show the current slide (if any slides exist)
    if (slides.length > 0) {
        slides[slideIndex-1].style.display = "block";  
    }
}

// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function () {
    document.body.classList.add('page-loaded');

    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('nav-open');
        });
    }
});