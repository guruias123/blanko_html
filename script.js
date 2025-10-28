// Modern JavaScript for Enhanced Interactivity
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');
    const navActions = document.querySelector('.nav__actions');
    
    if (navToggle && navMenu) {
        // Get the logo element and clone it
        const navLogo = document.querySelector('.nav__logo');
        let logoForMobile = '';
        
        if (navLogo) {
            // Create a mobile version without the email
            const logoImg = navLogo.querySelector('img');
            if (logoImg) {
                logoForMobile = `
                    <div class="nav__logo">
                        ${logoImg.outerHTML}
                        <p class="mail__box">mail@blanko.com</p>
                    </div>
                `;
            }
        }
        
        // Create mobile menu container
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'nav__mobile-menu';
        
        // Add close button
        const closeButton = document.createElement('button');
        closeButton.className = 'nav__close';
        closeButton.setAttribute('aria-label', 'Close menu');
        closeButton.innerHTML = '<i class="fas fa-times"></i>';
        
        mobileMenu.innerHTML = `
            <p class="mail__box">mail@blanko.com</p>
            ${navMenu.outerHTML}
            ${navActions ? navActions.outerHTML : ''}
        `;
        
        // Insert mobile menu after navigation
        navToggle.parentNode.insertBefore(mobileMenu, navToggle.nextSibling);
        
        const closeMobileMenu = () => {
            mobileMenu.classList.remove('nav__mobile-menu--open');
            navToggle.classList.remove('nav__toggle--open');
            document.body.style.overflow = ''; // Restore scrolling
        };
        
        const openMobileMenu = () => {
            mobileMenu.classList.add('nav__mobile-menu--open');
            navToggle.classList.add('nav__toggle--open');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        };
        
        // Toggle mobile menu
        navToggle.addEventListener('click', function() {
            const isOpen = mobileMenu.classList.contains('nav__mobile-menu--open');
            isOpen ? closeMobileMenu() : openMobileMenu();
        });
        
        // Close mobile menu when clicking on the overlay (outside content area)
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                closeMobileMenu();
            }
        });
        
        // Close mobile menu when clicking on menu items
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        
        // Close mobile menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('nav__mobile-menu--open')) {
                closeMobileMenu();
            }
        });
    }
    
    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header Background on Scroll
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
        
        // Hide/show header on scroll direction
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.classList.add('header--hidden');
        } else {
            header.classList.remove('header--hidden');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature, .landing-page, .testimonial__content');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Testimonial Carousel
    const paginationDots = document.querySelectorAll('.pagination-dot');
    const testimonials = [
        {
            brand: 'ORUK',
            quote: 'Join a community of industry leading professionals. Join a community of industry leading professionals.',
            author: 'Laura Paula',
            title: 'Director @company'
        },
        {
            brand: 'TECHCO',
            quote: 'Exceptional design and development services that exceeded our expectations and delivered outstanding results.',
            author: 'Michael Chen',
            title: 'CEO @TechCorp'
        }
    ];
    
    let currentTestimonial = 0;
    
    if (paginationDots.length > 0) {
        paginationDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentTestimonial = index;
                updateTestimonial();
            });
        });
        
        // Auto-rotate testimonials
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            updateTestimonial();
        }, 5000);
    }
    
    function updateTestimonial() {
        const testimonialImage = document.querySelector('.testimonial__content img');
        const testimonialQuote = document.querySelector('.testimonial__quote');
        const testimonialAuthor = document.querySelector('.testimonial__author strong');
        const testimonialTitle = document.querySelector('.testimonial__author span');
        
        if (testimonialQuote && testimonials[currentTestimonial]) {
            // Add fade out effect
            const content = document.querySelector('.testimonial__content');
            content.style.opacity = '0.5';
            
            setTimeout(() => {
                testimonialQuote.textContent = `"${testimonials[currentTestimonial].quote}"`;
                testimonialAuthor.textContent = testimonials[currentTestimonial].author;
                testimonialTitle.textContent = testimonials[currentTestimonial].title;
                
                // Update active dot
                paginationDots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentTestimonial);
                });
                
                // Fade back in
                content.style.opacity = '1';
            }, 200);
        }
    }
    
    // Parallax Effect for Hero Section
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero__content');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (hero && scrolled < hero.offsetHeight) {
            heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
    
    // Button Ripple Effect
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('btn__ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Lazy Loading for Images
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Performance Optimization: Throttled Scroll Events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    // Form Handling (if forms are added)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form submission logic here
            console.log('Form submitted');
        });
    });
    
    // Keyboard Navigation Support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu on escape
            const mobileMenu = document.querySelector('.nav__mobile-menu--open');
            if (mobileMenu) {
                mobileMenu.classList.remove('nav__mobile-menu--open');
                navToggle.classList.remove('nav__toggle--open');
            }
        }
    });
    
    // Preload Critical Images
    function preloadImage(src) {
        const img = new Image();
        img.src = src;
    }
    
    // Add loading states
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}