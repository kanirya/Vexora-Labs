// Improve cursor responsiveness
document.addEventListener("DOMContentLoaded", () => {
    // Custom cursor with improved performance
    const cursor = document.querySelector(".cursor")
    const cursorDot = document.querySelector(".cursor-dot")
    const cursorOutline = document.querySelector(".cursor-outline")
    const cursorText = document.querySelector(".cursor-text")

    if (cursor && cursorDot && cursorOutline) {
        document.addEventListener("mousemove", (e) => {
            // Direct DOM manipulation for better performance
            cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`

            // Use requestAnimationFrame for smoother outline movement
            requestAnimationFrame(() => {
                cursorOutline.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
                cursorText.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
            })

            // Only use GSAP for more complex animations, not for basic movement
            // This improves cursor responsiveness significantly
        })

        // Rest of cursor code remains the same...
        // Cursor hover effects
        const interactiveElements = document.querySelectorAll("a, button, .btn, input, textarea, [data-cursor-text]")

        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", function () {
                cursor.classList.add("cursor-active")

                // Get custom text if available
                const text = this.getAttribute("data-cursor-text")
                if (text && cursorText) {
                    cursorText.innerHTML = text
                }
            })

            el.addEventListener("mouseleave", () => {
                cursor.classList.remove("cursor-active")
                if (cursorText) {
                    cursorText.innerHTML = ""
                }
            })
        })

        // Hide cursor when leaving window
        document.addEventListener("mouseout", (e) => {
            if (e.relatedTarget === null) {
                cursor.style.opacity = "0"
            }
        })

        document.addEventListener("mouseover", () => {
            cursor.style.opacity = "1"
        })
    }

    // Fix Locomotive Scroll issues
    let locoScroll
    if (typeof LocomotiveScroll !== "undefined") {
        const scrollContainer = document.querySelector("[data-scroll-container]")
        if (scrollContainer) {
            try {
                locoScroll = new LocomotiveScroll({
                    el: scrollContainer,
                    smooth: true,
                    multiplier: 1,
                    lerp: 0.1, // Increased from 0.05 to 0.1 for better performance
                    tablet: { smooth: false }, // Disable on tablet for better performance
                    smartphone: { smooth: false }, // Disable on mobile for better performance
                })

                // Store the instance for later reference
                window.locoScroll = locoScroll

                // Handle potential errors with Locomotive Scroll
                window.addEventListener("error", (e) => {
                    if (e.message.includes("locomotive") || e.message.includes("scroll")) {
                        // Fallback to native scroll if Locomotive Scroll fails
                        if (locoScroll) {
                            locoScroll.destroy()
                            locoScroll = null
                        }
                        document.body.style.overflow = "auto"
                    }
                })

                // Refresh on page load to prevent empty content
                window.addEventListener("load", () => {
                    if (locoScroll) {
                        setTimeout(() => {
                            locoScroll.update()
                        }, 500)
                    }
                })
            } catch (error) {
                console.error("Locomotive Scroll initialization failed:", error)
                // Fallback to native scroll
                document.body.style.overflow = "auto"
            }
        }
    }

    // Fallback for content visibility if Locomotive Scroll fails
    const sections = document.querySelectorAll(".section")
    sections.forEach((section) => {
        section.style.visibility = "visible"
        section.style.opacity = "1"
    })
})

// Improve preloader to ensure content is visible
window.addEventListener("load", () => {
    setTimeout(() => {
        const preloader = document.querySelector(".preloader")
        if (preloader) {
            preloader.classList.add("hidden")

            // Enable body scrolling
            document.body.style.overflow = "auto"

            // Ensure all content is visible
            document.querySelectorAll(".section").forEach((section) => {
                section.style.visibility = "visible"
                section.style.opacity = "1"
            })

            // Refresh Locomotive Scroll
            if (window.locoScroll) {
                window.locoScroll.update()
            }
        }
    }, 1000) // Reduced from 1500ms to 1000ms for faster loading
})

// Main JavaScript file for Vexora Labs website

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Initialize AOS animations
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 800,
            easing: "ease-in-out",
            once: true,
            mirror: false,
            disable: window.innerWidth < 768,
        })
    }

    // Initialize GSAP animations
    if (typeof gsap !== "undefined") {
        // Hero section animations
        gsap.from(".hero-title", {
            opacity: 0,
            y: 50,
            duration: 1,
            delay: 0.5,
        })

        gsap.from(".hero-subtitle", {
            opacity: 0,
            y: 50,
            duration: 1,
            delay: 0.7,
        })

        gsap.from(".hero-buttons", {
            opacity: 0,
            y: 50,
            duration: 1,
            delay: 0.9,
        })
    }

    // Custom cursor
    const cursor = document.querySelector(".cursor")
    const cursorDot = document.querySelector(".cursor-dot")
    const cursorOutline = document.querySelector(".cursor-outline")
    const cursorText = document.querySelector(".cursor-text")

    if (cursor && cursorDot && cursorOutline && window.innerWidth > 991) {
        document.addEventListener("mousemove", (e) => {
            // Direct DOM manipulation for better performance
            cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`

            // Use requestAnimationFrame for smoother outline movement
            requestAnimationFrame(() => {
                cursorOutline.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
                if (cursorText) {
                    cursorText.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
                }
            })
        })

        // Cursor hover effects
        const interactiveElements = document.querySelectorAll("a, button, .btn, input, textarea, [data-cursor-text]")

        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", function () {
                cursor.classList.add("cursor-active")

                // Get custom text if available
                const text = this.getAttribute("data-cursor-text")
                if (text && cursorText) {
                    cursorText.innerHTML = text
                }
            })

            el.addEventListener("mouseleave", () => {
                cursor.classList.remove("cursor-active")
                if (cursorText) {
                    cursorText.innerHTML = ""
                }
            })
        })

        // Hide cursor when leaving window
        document.addEventListener("mouseout", (e) => {
            if (e.relatedTarget === null) {
                cursor.style.opacity = "0"
            }
        })

        document.addEventListener("mouseover", () => {
            cursor.style.opacity = "1"
        })
    } else if (cursor) {
        // Disable custom cursor on mobile/tablet
        cursor.style.display = "none"
    }

    // Navbar scroll effect
    const navbar = document.querySelector(".navbar")
    if (navbar) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                navbar.classList.add("navbar-scrolled")
            } else {
                navbar.classList.remove("navbar-scrolled")
            }
        })
    }

    // Mobile menu toggle
    const navbarToggler = document.querySelector(".navbar-toggler")
    if (navbarToggler) {
        navbarToggler.addEventListener("click", function () {
            this.classList.toggle("active")
        })
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault()

            const targetId = this.getAttribute("href")
            const targetElement = document.querySelector(targetId)

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: "smooth",
                })

                // Update active nav link
                document.querySelectorAll(".nav-link").forEach((navLink) => {
                    navLink.classList.remove("active")
                })
                this.classList.add("active")
            }
        })
    })

    // Back to top button
    const backToTopButton = document.querySelector(".back-to-top")
    if (backToTopButton) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add("active")
            } else {
                backToTopButton.classList.remove("active")
            }
        })

        backToTopButton.addEventListener("click", (e) => {
            e.preventDefault()
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })
        })
    }

    // Form validation
    const contactForm = document.querySelector(".contact-form")
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault()

            // Basic form validation
            let isValid = true
            const formInputs = contactForm.querySelectorAll("input, textarea")

            formInputs.forEach((input) => {
                if (input.hasAttribute("required") && !input.value.trim()) {
                    isValid = false
                    input.classList.add("is-invalid")
                } else {
                    input.classList.remove("is-invalid")
                }
            })

            // Email validation
            const emailInput = contactForm.querySelector('input[type="email"]')
            if (emailInput && emailInput.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if (!emailRegex.test(emailInput.value)) {
                    isValid = false
                    emailInput.classList.add("is-invalid")
                }
            }

            if (isValid) {
                // Show success message (in a real application, you would submit the form to the server)
                const formContainer = contactForm.closest(".contact-form-container")
                formContainer.innerHTML = `
                    <div class="text-center py-5">
                        <div class="mb-4">
                            <i class="fas fa-check-circle text-success" style="font-size: 4rem;"></i>
                        </div>
                        <h3>Message Sent Successfully!</h3>
                        <p class="mb-4">Thank you for contacting us. We'll get back to you shortly.</p>
                        <button type="button" class="btn btn-gradient" id="resetForm">Send Another Message</button>
                    </div>
                `

                // Add event listener to reset form button
                const resetButton = document.getElementById("resetForm")
                if (resetButton) {
                    resetButton.addEventListener("click", () => {
                        window.location.reload()
                    })
                }
            }
        })

        // Clear validation on input
        const formInputs = contactForm.querySelectorAll("input, textarea")
        formInputs.forEach((input) => {
            input.addEventListener("input", function () {
                this.classList.remove("is-invalid")
            })
        })
    }

    // Newsletter form submission
    const newsletterForm = document.querySelector(".newsletter-form")
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (e) {
            e.preventDefault()

            const emailInput = this.querySelector('input[type="email"]')
            if (emailInput && emailInput.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if (emailRegex.test(emailInput.value)) {
                    // Success state
                    const formGroup = emailInput.closest(".input-group")
                    formGroup.innerHTML = `
                        <div class="d-flex align-items-center w-100">
                            <i class="fas fa-check-circle text-success me-2"></i>
                            <span class="text-white">Thank you for subscribing!</span>
                        </div>
                    `
                } else {
                    // Invalid email
                    emailInput.classList.add("is-invalid")
                }
            }
        })
    }

    // Animate counter numbers
    function animateCounter(el) {
        const target = Number.parseInt(el.getAttribute("data-count"))
        const duration = 2000
        const start = 0
        const increment = target / (duration / 16)
        let current = start

        const counter = setInterval(() => {
            current += increment
            el.textContent = Math.floor(current)

            if (current >= target) {
                el.textContent = target
                clearInterval(counter)
            }
        }, 16)
    }

    // Initialize counters when they come into view
    const counterElements = document.querySelectorAll("[data-count]")
    if (counterElements.length > 0) {
        const observerOptions = {
            threshold: 0.5,
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target)
                    observer.unobserve(entry.target)
                }
            })
        }, observerOptions)

        counterElements.forEach((counter) => {
            observer.observe(counter)
        })
    }

    // Dynamic year for copyright
    const yearElements = document.querySelectorAll(".current-year")
    const currentYear = new Date().getFullYear()

    yearElements.forEach((element) => {
        element.textContent = currentYear
    })

    // Initialize Swiper sliders if available
    if (typeof Swiper !== "undefined") {
        const testimonialsSwiper = new Swiper(".testimonials-swiper", {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
        })
    }

    // Project filtering with jQuery if available
    if (typeof jQuery !== "undefined" && typeof jQuery.fn.isotope !== "undefined") {
        // Use jQuery if it's loaded
        const $ = jQuery

        const $grid = $(".project-grid").isotope({
            itemSelector: ".project-item",
            layoutMode: "fitRows",
        })

        $(".project-filter-menu").on("click", "li", function () {
            const filterValue = $(this).attr("data-filter")
            $grid.isotope({ filter: filterValue })

            $(".project-filter-menu li").removeClass("active")
            $(this).addClass("active")
        })
    }
})

// Preloader
window.addEventListener("load", () => {
    setTimeout(() => {
        const preloader = document.querySelector(".preloader")
        if (preloader) {
            preloader.classList.add("hidden")
            document.body.style.overflow = "auto"
        }
    }, 1000)
})
document.addEventListener('DOMContentLoaded', function () {
    const passwordInput = document.getElementById('Input_Password');
    if (!passwordInput) return;

    // Create password strength elements
    const strengthContainer = document.createElement('div');
    strengthContainer.className = 'password-strength';

    const strengthMeter = document.createElement('div');
    strengthMeter.className = 'password-strength-meter';

    const strengthFeedback = document.createElement('div');
    strengthFeedback.className = 'password-feedback';

    // Insert elements after password input
    const passwordParent = passwordInput.parentNode;
    passwordParent.insertBefore(strengthContainer, passwordInput.nextSibling);
    strengthContainer.appendChild(strengthMeter);
    passwordParent.insertBefore(strengthFeedback, strengthContainer.nextSibling);

    // Add event listener for password input
    passwordInput.addEventListener('input', function () {
        const password = this.value;
        const strength = calculatePasswordStrength(password);

        // Update strength meter
        strengthMeter.className = 'password-strength-meter';
        strengthFeedback.textContent = '';

        if (password.length === 0) {
            strengthMeter.style.width = '0';
            return;
        }

        if (strength < 30) {
            strengthMeter.classList.add('strength-weak');
            strengthFeedback.textContent = 'Weak: Try adding numbers or symbols';
        } else if (strength < 60) {
            strengthMeter.classList.add('strength-fair');
            strengthFeedback.textContent = 'Fair: Try adding uppercase letters';
        } else if (strength < 80) {
            strengthMeter.classList.add('strength-good');
            strengthFeedback.textContent = 'Good: Your password is solid';
        } else {
            strengthMeter.classList.add('strength-strong');
            strengthFeedback.textContent = 'Strong: Excellent password!';
        }
    });

    // Simple password strength calculator
    function calculatePasswordStrength(password) {
        let strength = 0;

        // Length contribution
        if (password.length >= 8) {
            strength += 25;
        } else {
            return 10; // Very weak if less than 8 chars
        }

        // Complexity contribution
        if (/[A-Z]/.test(password)) strength += 15; // Uppercase
        if (/[a-z]/.test(password)) strength += 10; // Lowercase
        if (/[0-9]/.test(password)) strength += 15; // Numbers
        if (/[^A-Za-z0-9]/.test(password)) strength += 20; // Special chars

        // Variety contribution
        const uniqueChars = new Set(password.split('')).size;
        strength += Math.min(15, uniqueChars / password.length * 15);

        return strength;
    }
});
document.addEventListener('DOMContentLoaded', function () {
    // Tabs functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to clicked button and corresponding pane
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Toggle active class on clicked item
            item.classList.toggle('active');

            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });

    // Testimonials slider functionality
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    const testimonials = document.querySelectorAll('.testimonial-card');

    // Hide all testimonials except the first one
    testimonials.forEach((testimonial, index) => {
        if (index !== 0) {
            testimonial.style.display = 'none';
        }
    });

    // Function to show a specific slide
    function showSlide(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.style.display = 'none';
        });

        // Show the selected testimonial
        testimonials[index].style.display = 'block';

        // Update dots
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');

        // Update current slide index
        currentSlide = index;
    }

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Event listeners for prev/next buttons
    prevBtn.addEventListener('click', () => {
        let newIndex = currentSlide - 1;
        if (newIndex < 0) {
            newIndex = testimonials.length - 1;
        }
        showSlide(newIndex);
    });

    nextBtn.addEventListener('click', () => {
        let newIndex = currentSlide + 1;
        if (newIndex >= testimonials.length) {
            newIndex = 0;
        }
        showSlide(newIndex);
    });

    // Auto-rotate testimonials
    setInterval(() => {
        let newIndex = currentSlide + 1;
        if (newIndex >= testimonials.length) {
            newIndex = 0;
        }
        showSlide(newIndex);
    }, 5000);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.tech-category, .process-step, .project-card, .info-card');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    };

    // Run on load
    animateOnScroll();

    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
});
document.addEventListener('DOMContentLoaded', function () {
    // Platform cards hover effect
    const platformCards = document.querySelectorAll('.platform-card');
    platformCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            platformCards.forEach(c => c.classList.remove('hovered'));
            card.classList.add('hovered');
        });
    });

    // Services carousel functionality
    const serviceSlides = document.querySelectorAll('.service-slide');
    const carouselDots = document.querySelector('.carousel-dots');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentSlideIndex = 0;
    let slideWidth = 0;
    let carouselInterval;

    // Create dots for each slide
    serviceSlides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.dataset.index = index;
        carouselDots.appendChild(dot);

        dot.addEventListener('click', () => {
            goToSlide(index);
            resetCarouselInterval();
        });
    });

    const dots = document.querySelectorAll('.carousel-dots .dot');

    function updateCarouselPosition() {
        const carousel = document.querySelector('.services-carousel');
        if (!carousel) return;

        slideWidth = serviceSlides[0].offsetWidth + 30; // width + gap
        const scrollPosition = currentSlideIndex * slideWidth;
        carousel.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });

        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlideIndex);
        });
    }

    function goToSlide(index) {
        currentSlideIndex = index;
        updateCarouselPosition();
    }

    function goToNextSlide() {
        currentSlideIndex = (currentSlideIndex + 1) % serviceSlides.length;
        updateCarouselPosition();
    }

    function goToPrevSlide() {
        currentSlideIndex = (currentSlideIndex - 1 + serviceSlides.length) % serviceSlides.length;
        updateCarouselPosition();
    }

    function startCarouselInterval() {
        carouselInterval = setInterval(goToNextSlide, 5000);
    }

    function resetCarouselInterval() {
        clearInterval(carouselInterval);
        startCarouselInterval();
    }

    // Event listeners for carousel navigation
    if (prevBtn) prevBtn.addEventListener('click', () => {
        goToPrevSlide();
        resetCarouselInterval();
    });

    if (nextBtn) nextBtn.addEventListener('click', () => {
        goToNextSlide();
        resetCarouselInterval();
    });

    // Initialize carousel
    updateCarouselPosition();
    startCarouselInterval();

    // App showcase functionality
    const showcaseOptions = document.querySelectorAll('.showcase-option');
    const appScreens = document.querySelectorAll('.app-screen');

    showcaseOptions.forEach(option => {
        option.addEventListener('click', () => {
            const appType = option.dataset.app;

            // Update active option
            showcaseOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');

            // Show corresponding app screen
            appScreens.forEach(screen => {
                screen.classList.toggle('active', screen.dataset.app === appType);
            });
        });
    });

    // Technology tabs functionality
    const techTabBtns = document.querySelectorAll('.tech-tab-btn');
    const techTabPanes = document.querySelectorAll('.tech-tab-pane');

    techTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;

            // Update active tab button
            techTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show corresponding tab pane
            techTabPanes.forEach(pane => {
                pane.classList.toggle('active', pane.id === tabId);
            });
        });
    });

    // Lifecycle stages functionality
    const lifecycleStages = document.querySelectorAll('.lifecycle-stage');
    const lifecycleIndicators = document.querySelectorAll('.lifecycle-indicators .indicator');
    const lifecyclePrevBtn = document.querySelector('.lifecycle-prev');
    const lifecycleNextBtn = document.querySelector('.lifecycle-next');
    let currentStageIndex = 0;

    function updateLifecycleStage() {
        // Update active stage
        lifecycleStages.forEach((stage, index) => {
            stage.classList.toggle('active', index === currentStageIndex);
        });

        // Update indicators
        lifecycleIndicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentStageIndex);
        });

        // Update progress bar
        const progressIndicator = document.querySelector('.progress-indicator');
        if (progressIndicator) {
            progressIndicator.style.width = `${(currentStageIndex + 1) * (100 / lifecycleStages.length)}%`;
        }

        // Update button states
        if (lifecyclePrevBtn) lifecyclePrevBtn.disabled = currentStageIndex === 0;
        if (lifecycleNextBtn) lifecycleNextBtn.disabled = currentStageIndex === lifecycleStages.length - 1;
    }

    function goToStage(index) {
        currentStageIndex = index;
        updateLifecycleStage();
    }

    // Event listeners for lifecycle navigation
    lifecycleIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToStage(index);
        });
    });

    if (lifecyclePrevBtn) {
        lifecyclePrevBtn.addEventListener('click', () => {
            if (currentStageIndex > 0) {
                goToStage(currentStageIndex - 1);
            }
        });
    }

    if (lifecycleNextBtn) {
        lifecycleNextBtn.addEventListener('click', () => {
            if (currentStageIndex < lifecycleStages.length - 1) {
                goToStage(currentStageIndex + 1);
            }
        });
    }

    // Initialize lifecycle
    updateLifecycleStage();

    // Projects filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;

            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Testimonials slider functionality
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialDots = document.querySelectorAll('.testimonials-dots .dot');
    const testimonialPrevBtn = document.querySelector('.testimonials-nav .prev-btn');
    const testimonialNextBtn = document.querySelector('.testimonials-nav .next-btn');
    let currentTestimonialIndex = 0;
    let testimonialInterval;

    function showTestimonial(index) {
        // Hide all testimonials
        testimonialCards.forEach(card => {
            card.style.display = 'none';
        });

        // Show selected testimonial
        testimonialCards[index].style.display = 'block';

        // Update dots
        testimonialDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        currentTestimonialIndex = index;
    }

    function nextTestimonial() {
        const newIndex = (currentTestimonialIndex + 1) % testimonialCards.length;
        showTestimonial(newIndex);
    }

    function prevTestimonial() {
        const newIndex = (currentTestimonialIndex - 1 + testimonialCards.length) % testimonialCards.length;
        showTestimonial(newIndex);
    }

    // Initialize testimonials
    testimonialCards.forEach((card, index) => {
        if (index !== 0) {
            card.style.display = 'none';
        }
    });

    // Event listeners for testimonial navigation
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
            resetTestimonialInterval();
        });
    });

    if (testimonialPrevBtn) {
        testimonialPrevBtn.addEventListener('click', () => {
            prevTestimonial();
            resetTestimonialInterval();
        });
    }

    if (testimonialNextBtn) {
        testimonialNextBtn.addEventListener('click', () => {
            nextTestimonial();
            resetTestimonialInterval();
        });
    }

    function startTestimonialInterval() {
        testimonialInterval = setInterval(nextTestimonial, 6000);
    }

    function resetTestimonialInterval() {
        clearInterval(testimonialInterval);
        startTestimonialInterval();
    }

    startTestimonialInterval();

    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Toggle active class on clicked item
            item.classList.toggle('active');

            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.platform-card, .service-slide, .tech-item, .project-card, .info-card');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    };

    // Run on load
    animateOnScroll();

    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Form validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            const requiredFields = contactForm.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('invalid');
                } else {
                    field.classList.remove('invalid');
                }
            });

            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    }

    // Responsive adjustments
    function handleResponsiveLayout() {
        const windowWidth = window.innerWidth;

        if (windowWidth < 768) {
            // Mobile adjustments
        } else if (windowWidth < 992) {
            // Tablet adjustments
        } else {
            // Desktop adjustments
        }
    }

    // Run on load and resize
    handleResponsiveLayout();
    window.addEventListener('resize', handleResponsiveLayout);
});

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initCloudAnimation();
    initPlatformTabs();
    initCaseStudiesSlider();
    initPricingToggle();
    initFaqAccordion();
    initSmoothScrolling();
    initAnimations();
    initFormValidation();

    // Cloud animation effect
    function initCloudAnimation() {
        const clouds = document.querySelectorAll('.cloud');
        
        clouds.forEach(cloud => {
            const randomDelay = Math.random() * 5;
            cloud.style.animationDelay = `${randomDelay}s`;
        });
    }

    // Platform tabs functionality
    function initPlatformTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabPanes = document.querySelectorAll('.tab-pane');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.dataset.tab;
                
                // Update active tab button
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Show corresponding tab pane
                tabPanes.forEach(pane => {
                    pane.classList.toggle('active', pane.id === tabId);
                });
            });
        });
    }

    // Case studies slider functionality
    function initCaseStudiesSlider() {
        const caseStudyCards = document.querySelectorAll('.case-study-card');
        const dots = document.querySelectorAll('.case-studies-dots .dot');
        const prevBtn = document.querySelector('.case-studies-nav .prev-btn');
        const nextBtn = document.querySelector('.case-studies-nav .next-btn');
        let currentIndex = 0;
        let interval;

        function showCaseStudy(index) {
            // Hide all case studies
            caseStudyCards.forEach(card => {
                card.style.display = 'none';
            });
            
            // Show selected case study
            caseStudyCards[index].style.display = 'block';
            
            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            
            currentIndex = index;
        }

        function nextCaseStudy() {
            const newIndex = (currentIndex + 1) % caseStudyCards.length;
            showCaseStudy(newIndex);
        }

        function prevCaseStudy() {
            const newIndex = (currentIndex - 1 + caseStudyCards.length) % caseStudyCards.length;
            showCaseStudy(newIndex);
        }

        // Initialize case studies
        if (caseStudyCards.length > 0) {
            caseStudyCards.forEach((card, index) => {
                if (index !== 0) {
                    card.style.display = 'none';
                }
            });

            // Event listeners for navigation
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    showCaseStudy(index);
                    resetInterval();
                });
            });

            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    prevCaseStudy();
                    resetInterval();
                });
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    nextCaseStudy();
                    resetInterval();
                });
            }

            function startInterval() {
                interval = setInterval(nextCaseStudy, 6000);
            }

            function resetInterval() {
                clearInterval(interval);
                startInterval();
            }

            startInterval();
        }
    }

    // Pricing toggle functionality
    function initPricingToggle() {
        const billingToggle = document.getElementById('billing-toggle');
        const pricingPlans = document.querySelector('.pricing-plans');
        
        if (billingToggle && pricingPlans) {
            billingToggle.addEventListener('change', () => {
                pricingPlans.classList.toggle('annual', billingToggle.checked);
                
                const monthlyAmounts = document.querySelectorAll('.amount.monthly');
                const annualAmounts = document.querySelectorAll('.amount.annual');
                
                if (billingToggle.checked) {
                    monthlyAmounts.forEach(amount => amount.style.display = 'none');
                    annualAmounts.forEach(amount => amount.style.display = 'inline');
                } else {
                    monthlyAmounts.forEach(amount => amount.style.display = 'inline');
                    annualAmounts.forEach(amount => amount.style.display = 'none');
                }
            });
        }
    }

    // FAQ accordion functionality
    function initFaqAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Toggle active class on clicked item
                item.classList.toggle('active');
                
                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
            });
        });
    }

    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Animate elements on scroll
    function initAnimations() {
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.service-card, .benefit-card, .process-step, .case-study-card, .pricing-plan, .info-card');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (elementPosition < screenPosition) {
                    element.classList.add('animated');
                }
            });
        };

        // Run on load
        animateOnScroll();

        // Run on scroll
        window.addEventListener('scroll', animateOnScroll);
    }

    // Form validation
    function initFormValidation() {
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                const requiredFields = contactForm.querySelectorAll('[required]');
                let isValid = true;
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('invalid');
                    } else {
                        field.classList.remove('invalid');
                    }
                });
                
                if (!isValid) {
                    e.preventDefault();
                    alert('Please fill in all required fields.');
                }
            });
        }
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        }
    });

    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });

        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});



document.addEventListener('DOMContentLoaded', function() {
    // Particle animation
    initParticleAnimation();

    // Testimonial slider
    initTestimonialSlider();

    // Animate elements on scroll
    initScrollAnimations();
});

// Particle animation
function initParticleAnimation() {
    const canvas = document.createElement('canvas');
    const container = document.getElementById('particle-container');
    if (!container) return;

    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;

    // Particle properties
    const particleCount = 50;
    const particles = [];

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 3 + 1,
            color: `hsla(${Math.random() * 60 + 250}, 100%, 70%, ${Math.random() * 0.5 + 0.3})`,
            speedX: (Math.random() - 0.5) * 1,
            speedY: (Math.random() - 0.5) * 1
        });
    }

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            // Move particle
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Bounce off edges
            if (particle.x < 0 || particle.x > canvas.width) {
                particle.speedX *= -1;
            }

            if (particle.y < 0 || particle.y > canvas.height) {
                particle.speedY *= -1;
            }

            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
        });
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    });

    animate();
}

// Testimonial slider
function initTestimonialSlider() {
    const testimonials = [
        {
            quote: "Vexora Labs CRM has completely transformed how we manage our customer relationships. The intuitive interface and powerful features have helped us increase sales by 35% in just three months.",
            name: "Sarah Johnson",
            position: "CEO, TechStart",
            avatar: "/images/avatar-1.jpg"
        },
        {
            quote: "After trying several CRM solutions, we finally found Vexora Labs. The automation features have saved our team countless hours, and the analytics provide invaluable insights for our sales strategy.",
            name: "Michael Chen",
            position: "Sales Director, GrowthForce",
            avatar: "/images/avatar-2.jpg"
        },
        {
            quote: "The integration capabilities of Vexora Labs CRM are outstanding. We've connected all our marketing tools, and now have a unified view of our customer journey. Highly recommended!",
            name: "Emily Rodriguez",
            position: "Marketing Manager, Innovate Inc",
            avatar: "/images/avatar-3.jpg"
        }
    ];

    const container = document.getElementById('testimonial-container');
    const indicators = document.getElementById('testimonial-indicators');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');

    if (!container || !indicators || !prevBtn || !nextBtn) return;

    let currentIndex = 0;

    // Create indicators
    testimonials.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('indicator');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        indicators.appendChild(dot);
    });

    // Create initial testimonial
    renderTestimonial(currentIndex);

    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Auto slide
    let interval = setInterval(nextSlide, 5000);

    // Reset interval on manual navigation
    function resetInterval() {
        clearInterval(interval);
        interval = setInterval(nextSlide, 5000);
    }

    function renderTestimonial(index) {
        const testimonial = testimonials[index];

        container.innerHTML = `
            <div class="testimonial-quote">${testimonial.quote}</div>
            <div class="testimonial-author">
                <div class="author-avatar">
                    <img src="${testimonial.avatar || '/images/avatar-placeholder.jpg'}" alt="${testimonial.name}">
                </div>
                <div class="author-name">${testimonial.name}</div>
                <div class="author-position">${testimonial.position}</div>
            </div>
        `;

        // Update indicators
        const dots = indicators.querySelectorAll('.indicator');
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        renderTestimonial(currentIndex);
        resetInterval();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        renderTestimonial(currentIndex);
        resetInterval();
    }

    function goToSlide(index) {
        currentIndex = index;
        renderTestimonial(currentIndex);
        resetInterval();
    }
}

// Scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.feature-card, .section-header, .hero-content, .hero-visual');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(element => {
        observer.observe(element);
        element.classList.add('fade-in-element');
    });

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .fade-in-element {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .fade-in-element.animated {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}


document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();

    // Initialize pricing toggle
    initPricingToggle();

    // Initialize timeline animations
    initTimelineAnimations();
});

// Initialize animations
function initAnimations() {
    // Add fade-in class to elements
    const elements = document.querySelectorAll('.section-header, .detailed-feature, .pricing-card, .timeline-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach((element, index) => {
        // Add delay based on index for staggered animation
        element.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(element);
        element.classList.add('fade-in-element');
    });

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .fade-in-element {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .fade-in-element.animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        .detailed-feature .feature-list li {
            opacity: 0;
            transform: translateX(-10px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .detailed-feature.animated .feature-list li {
            opacity: 1;
            transform: translateX(0);
        }
        
        .detailed-feature.animated .feature-list li:nth-child(1) { transition-delay: 0.2s; }
        .detailed-feature.animated .feature-list li:nth-child(2) { transition-delay: 0.3s; }
        .detailed-feature.animated .feature-list li:nth-child(3) { transition-delay: 0.4s; }
        .detailed-feature.animated .feature-list li:nth-child(4) { transition-delay: 0.5s; }
        .detailed-feature.animated .feature-list li:nth-child(5) { transition-delay: 0.6s; }
    `;
    document.head.appendChild(style);
}

// Initialize pricing toggle
function initPricingToggle() {
    const toggle = document.getElementById('billing-toggle');
    const monthlyPrices = document.querySelectorAll('.pricing-price .amount.monthly');
    const annualPrices = document.querySelectorAll('.pricing-price .amount.annual');

    if (!toggle) return;

    toggle.addEventListener('change', function() {
        if (this.checked) {
            // Annual pricing
            monthlyPrices.forEach(price => price.style.display = 'none');
            annualPrices.forEach(price => price.style.display = 'inline');
        } else {
            // Monthly pricing
            monthlyPrices.forEach(price => price.style.display = 'inline');
            annualPrices.forEach(price => price.style.display = 'none');
        }
    });

    // Initialize display
    monthlyPrices.forEach(price => price.style.display = 'inline');
    annualPrices.forEach(price => price.style.display = 'none');
}

// Initialize timeline animations
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    timelineItems.forEach((item, index) => {
        // Add delay based on index for staggered animation
        item.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(item);

        // Add animation class based on position
        if (item.classList.contains('timeline-item-left')) {
            item.classList.add('slide-in-left');
        } else {
            item.classList.add('slide-in-right');
        }
    });

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .slide-in-left {
            opacity: 0;
            transform: translateX(-50px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .slide-in-right {
            opacity: 0;
            transform: translateX(50px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .slide-in-left.animated,
        .slide-in-right.animated {
            opacity: 1;
            transform: translateX(0);
        }
    `;
    document.head.appendChild(style);
}