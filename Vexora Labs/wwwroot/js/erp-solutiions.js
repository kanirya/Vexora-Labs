document.addEventListener('DOMContentLoaded', function() {
    // Initialize module tabs
    initModuleTabs();

    // Initialize process timeline
    initProcessTimeline();

    // Initialize case studies slider
    initCaseStudiesSlider();

    // Initialize pricing toggle
    initPricingToggle();

    // Initialize animations
    initAnimations();
});

// Module tabs functionality
function initModuleTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');

            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to clicked button and corresponding pane
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Process timeline functionality
function initProcessTimeline() {
    const steps = document.querySelectorAll('.process-step');
    const progressBar = document.getElementById('timeline-progress');
    let currentStep = 0;

    // Set initial active step
    steps[currentStep].classList.add('active');
    updateProgressBar();

    // Add click event to steps
    steps.forEach((step, index) => {
        step.addEventListener('click', () => {
            // Remove active class from all steps
            steps.forEach(s => s.classList.remove('active'));

            // Add active class to clicked step and all previous steps
            for (let i = 0; i <= index; i++) {
                steps[i].classList.add('active');
            }

            currentStep = index;
            updateProgressBar();
        });
    });

    // Auto advance steps every 3 seconds
    setInterval(() => {
        currentStep = (currentStep + 1) % steps.length;

        // Remove active class from all steps
        steps.forEach(s => s.classList.remove('active'));

        // Add active class to current step and all previous steps
        for (let i = 0; i <= currentStep; i++) {
            steps[i].classList.add('active');
        }

        updateProgressBar();
    }, 3000);

    function updateProgressBar() {
        const totalSteps = steps.length - 1;
        const progress = (currentStep / totalSteps) * 100;

        // Calculate the height based on the last step's position
        const lastStepPosition = steps[steps.length - 1].offsetTop + steps[steps.length - 1].offsetHeight;
        const firstStepPosition = steps[0].offsetTop;
        const totalHeight = lastStepPosition - firstStepPosition;

        // Set progress bar height
        progressBar.style.height = `${totalHeight * (currentStep / totalSteps)}px`;
    }
}

// Case studies slider functionality
function initCaseStudiesSlider() {
    const slider = document.getElementById('case-studies-slider');
    const dotsContainer = document.getElementById('case-study-dots');
    const prevBtn = document.getElementById('prev-case-study');
    const nextBtn = document.getElementById('next-case-study');

    if (!slider || !dotsContainer || !prevBtn || !nextBtn) return;

    const slides = slider.querySelectorAll('.case-study-card');
    let currentSlide = 0;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');

        dot.addEventListener('click', () => {
            goToSlide(index);
        });

        dotsContainer.appendChild(dot);
    });

    // Hide all slides except the first one
    slides.forEach((slide, index) => {
        if (index !== 0) {
            slide.style.display = 'none';
        }
    });

    // Event listeners for prev/next buttons
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Auto slide every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);

    function goToSlide(index) {
        // Hide current slide
        slides[currentSlide].style.display = 'none';

        // Update dots
        dotsContainer.querySelectorAll('.slider-dot').forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        // Show new slide
        slides[index].style.display = 'block';

        // Update current slide index
        currentSlide = index;

        // Reset interval
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    function nextSlide() {
        const newIndex = (currentSlide + 1) % slides.length;
        goToSlide(newIndex);
    }

    function prevSlide() {
        const newIndex = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(newIndex);
    }
}

// Pricing toggle functionality
function initPricingToggle() {
    const toggle = document.getElementById('billing-toggle');
    const monthlyPrices = document.querySelectorAll('.price.monthly');
    const annualPrices = document.querySelectorAll('.price.annual');

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
}

// Animations
function initAnimations() {
    // Animate elements on scroll
    const animatedElements = document.querySelectorAll('.benefit-card, .pricing-card, .info-card, .module-content, .case-study-card');

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

    // Animate ERP visual nodes
    animateNodes();
}

// Animate ERP visual nodes
function animateNodes() {
    const nodes = document.querySelectorAll('.node');
    const connections = document.querySelectorAll('.node-connection');

    // Animate nodes with pulse effect
    nodes.forEach((node, index) => {
        node.style.animationDelay = `${index * 0.2}s`;
    });

    // Animate connections with glow effect
    connections.forEach((connection, index) => {
        setInterval(() => {
            connection.style.opacity = '0.8';

            setTimeout(() => {
                connection.style.opacity = '0.3';
            }, 500);
        }, 2000 + (index * 500));
    });
}