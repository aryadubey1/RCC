/* ============================================================
   Rajak's Coaching Classes — Enhanced JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
    /* --- Page loaded flag --- */
    document.body.classList.add('page-loaded');

    /* =========================================================
       MOBILE NAVIGATION
       ========================================================= */
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('#nav-links');
    const overlay = document.querySelector('#nav-overlay');

    function openNav() {
        navLinks.classList.add('nav-open');
        if (overlay) overlay.classList.add('active');
        toggle.setAttribute('aria-expanded', 'true');
        toggle.innerHTML = '<i class="fas fa-times"></i>';
    }

    function closeNav() {
        navLinks.classList.remove('nav-open');
        if (overlay) overlay.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = '<i class="fas fa-bars"></i>';
    }

    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.contains('nav-open');
            isOpen ? closeNav() : openNav();
        });

        // Close nav on overlay click
        if (overlay) {
            overlay.addEventListener('click', closeNav);
        }

        // Close nav when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeNav);
        });

        // Close nav on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('nav-open')) {
                closeNav();
            }
        });
    }

    /* =========================================================
       NAVBAR SCROLL EFFECT
       ========================================================= */
    const navbar = document.getElementById('navbar');

    if (navbar) {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll > 60) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            lastScroll = currentScroll;
        }, { passive: true });
    }

    /* =========================================================
       SCROLL REVEAL (IntersectionObserver)
       ========================================================= */
    const revealElements = document.querySelectorAll('.reveal');

    if (revealElements.length > 0 && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        revealObserver.unobserve(entry.target); // Animate only once
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback: show everything
        revealElements.forEach(el => el.classList.add('revealed'));
    }

    /* =========================================================
       IMAGE SLIDER (About Page)
       ========================================================= */
    const slides = document.getElementsByClassName('slide');
    const dotsContainer = document.getElementById('slider-dots');
    let slideIndex = 1;
    let autoSlideTimer = null;

    function showSlides(n) {
        if (slides.length === 0) return;

        if (n > slides.length) slideIndex = 1;
        if (n < 1) slideIndex = slides.length;

        // Hide all slides
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none';
        }

        // Show current slide
        slides[slideIndex - 1].style.display = 'block';

        // Update dots
        if (dotsContainer) {
            const dots = dotsContainer.querySelectorAll('.slider-dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === slideIndex - 1);
            });
        }
    }

    // Create dots
    if (dotsContainer && slides.length > 0) {
        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('button');
            dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.addEventListener('click', () => {
                slideIndex = i + 1;
                showSlides(slideIndex);
                resetAutoSlide();
            });
            dotsContainer.appendChild(dot);
        }
    }

    // Initialize first slide
    if (slides.length > 0) {
        showSlides(slideIndex);
    }

    // Auto slide
    function startAutoSlide() {
        autoSlideTimer = setInterval(() => {
            slideIndex++;
            showSlides(slideIndex);
        }, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideTimer);
        startAutoSlide();
    }

    if (slides.length > 1) {
        startAutoSlide();

        // Pause on hover
        const sliderContainer = document.getElementById('gallery-slider');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => clearInterval(autoSlideTimer));
            sliderContainer.addEventListener('mouseleave', startAutoSlide);
        }
    }

    // Expose moveSlide globally for onclick handlers
    window.moveSlide = function (n) {
        slideIndex += n;
        showSlides(slideIndex);
        resetAutoSlide();
    };

    /* =========================================================
       BACK TO TOP BUTTON
       ========================================================= */
    const backToTop = document.getElementById('back-to-top');

    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }, { passive: true });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* =========================================================
       ANIMATED COUNTERS (Stats)
       ========================================================= */
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');

    if (statNumbers.length > 0 && 'IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        counterObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        statNumbers.forEach(el => counterObserver.observe(el));
    }

    function animateCounter(el) {
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.textContent.replace(/[\d]/g, '').trim(); // e.g. '+' or '%'
        const duration = 1500; // ms
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);

            el.textContent = current + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }
    /* =========================================================
       THEME TOGGLE (Light / Dark)
       ========================================================= */
    const themeToggle = document.getElementById('theme-toggle');

    if (themeToggle) {
        // Check current theme
        function getCurrentTheme() {
            return document.documentElement.getAttribute('data-theme') || 'dark';
        }

        function setTheme(theme) {
            if (theme === 'light') {
                document.documentElement.setAttribute('data-theme', 'light');
            } else {
                document.documentElement.removeAttribute('data-theme');
            }
            localStorage.setItem('rcc-theme', theme);
            themeToggle.setAttribute('aria-label',
                theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
            );
        }

        // Set initial aria-label
        themeToggle.setAttribute('aria-label',
            getCurrentTheme() === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
        );

        themeToggle.addEventListener('click', () => {
            const current = getCurrentTheme();
            setTheme(current === 'light' ? 'dark' : 'light');
        });
    }
});