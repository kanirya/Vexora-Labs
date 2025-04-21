// Main JavaScript file for Vexora Labs website

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(navLink => {
                    navLink.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });

        backToTopButton.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Form validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Basic form validation
            let isValid = true;
            const formInputs = contactForm.querySelectorAll('input, textarea');

            formInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('is-invalid');
                } else {
                    input.classList.remove('is-invalid');
                }
            });

            // Email validation
            const emailInput = contactForm.querySelector('#email');
            if (emailInput && emailInput.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailInput.value)) {
                    isValid = false;
                    emailInput.classList.add('is-invalid');
                }
            }

            if (isValid) {
                // Show success message (in a real application, you would submit the form to the server)
                const formContainer = contactForm.closest('.contact-form-container');
                formContainer.innerHTML = `
                    <div class="text-center py-5">
                        <div class="mb-4">
                            <i class="fas fa-check-circle text-success" style="font-size: 4rem;"></i>
                        </div>
                        <h3>Message Sent Successfully!</h3>
                        <p class="mb-4">Thank you for contacting us. We'll get back to you shortly.</p>
                        <button type="button" class="btn btn-gradient-primary" id="resetForm">Send Another Message</button>
                    </div>
                `;

                // Add event listener to reset form button
                const resetButton = document.getElementById('resetForm');
                if (resetButton) {
                    resetButton.addEventListener('click', function () {
                        window.location.reload();
                    });
                }
            }
        });

        // Clear validation on input
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', function () {
                this.classList.remove('is-invalid');
            });
        });
    }

    // Initialize GSAP animations if available
    if (typeof gsap !== 'undefined') {
        // Hero section animations
        gsap.from('.hero-title', {
            opacity: 0,
            y: 50,
            duration: 1,
            delay: 0.5
        });

        gsap.from('.hero-subtitle', {
            opacity: 0,
            y: 50,
            duration: 1,
            delay: 0.7
        });

        gsap.from('.hero-buttons', {
            opacity: 0,
            y: 50,
            duration: 1,
            delay: 0.9
        });

        // Scroll animations
        if (typeof ScrollTrigger !== 'undefined') {
            // Animate section titles on scroll
            gsap.utils.toArray('.section-title').forEach(title => {
                gsap.from(title, {
                    scrollTrigger: {
                        trigger: title,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    },
                    opacity: 0,
                    y: 50,
                    duration: 1
                });
            });

            // Animate service cards on scroll
            gsap.utils.toArray('.service-card').forEach((card, index) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    },
                    opacity: 0,
                    y: 50,
                    duration: 0.8,
                    delay: index * 0.1
                });
            });

            // Animate project cards on scroll
            gsap.utils.toArray('.project-card').forEach((card, index) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    },
                    opacity: 0,
                    y: 50,
                    duration: 0.8,
                    delay: index * 0.1
                });
            });
        }
    }

    // Custom cursor
    const cursor = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursor && cursorOutline) {
        document.addEventListener('mousemove', function (e) {
            if (typeof gsap !== 'undefined') {
                gsap.to(cursor, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.1
                });

                gsap.to(cursorOutline, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.5
                });
            } else {
                cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
                cursorOutline.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            }
        });

        // Hover effect on links
        const links = document.querySelectorAll('a, button, .btn, .nav-link');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
                cursorOutline.classList.add('cursor-hover');
            });

            link.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
                cursorOutline.classList.remove('cursor-hover');
            });
        });
    }

    // Mobile menu toggle animation
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function () {
            this.classList.toggle('active');
        });
    }

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailRegex.test(emailInput.value)) {
                    // Success state
                    const formGroup = emailInput.closest('.input-group');
                    formGroup.innerHTML = `
                        <div class="d-flex align-items-center w-100">
                            <i class="fas fa-check-circle text-success me-2"></i>
                            <span class="text-white">Thank you for subscribing!</span>
                        </div>
                    `;
                } else {
                    // Invalid email
                    emailInput.classList.add('is-invalid');
                }
            }
        });
    }
});

// Preloader
window.addEventListener('load', function () {
    setTimeout(function () {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.classList.add('hidden');

            // Enable body scrolling
            document.body.style.overflow = 'auto';

            // Trigger initial animations
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        }
    }, 1000);
});

// Add additional CSS styles for service cards
document.addEventListener('DOMContentLoaded', function () {
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach((card, index) => {
        // Add staggered animation delay
        card.style.animationDelay = `${index * 0.1}s`;

        // Add hover effect
        card.addEventListener('mouseenter', function () {
            serviceCards.forEach(c => {
                if (c !== card) {
                    c.style.opacity = '0.7';
                    c.style.transform = 'scale(0.95)';
                }
            });
        });

        card.addEventListener('mouseleave', function () {
            serviceCards.forEach(c => {
                c.style.opacity = '1';
                c.style.transform = 'translateY(0)';
            });
        });
    });
});

// Dynamic year for copyright
document.addEventListener('DOMContentLoaded', function () {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();

    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
});