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