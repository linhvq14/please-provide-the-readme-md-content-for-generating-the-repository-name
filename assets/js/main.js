// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize all app functionality
function initializeApp() {
    try {
        setupMobileNavigation();
        setupAnimatedCounters();
        setupSmoothScrolling();
        setupShowMoreButton();
        setupFormValidations();
    } catch (error) {
        console.error('Error initializing app:', error);
    }
}

// Mobile Navigation Toggle
function setupMobileNavigation() {
    try {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                
                // Animate hamburger menu
                const spans = navToggle.querySelectorAll('span');
                spans.forEach((span, index) => {
                    if (navMenu.classList.contains('active')) {
                        if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                        if (index === 1) span.style.opacity = '0';
                        if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                    } else {
                        span.style.transform = 'none';
                        span.style.opacity = '1';
                    }
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(event) {
                if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                    navMenu.classList.remove('active');
                    const spans = navToggle.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.transform = 'none';
                        span.style.opacity = '1';
                    });
                }
            });
        }
    } catch (error) {
        console.error('Error setting up mobile navigation:', error);
    }
}

// Animated Counters for Statistics
function setupAnimatedCounters() {
    try {
        const counters = document.querySelectorAll('.stat-number');
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        counters.forEach(counter => {
            observer.observe(counter);
        });
    } catch (error) {
        console.error('Error setting up animated counters:', error);
    }
}

// Animate individual counter
function animateCounter(element) {
    try {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = formatNumber(Math.floor(current));
        }, 16);
    } catch (error) {
        console.error('Error animating counter:', error);
    }
}

// Format numbers with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Smooth Scrolling for Navigation Links
function setupSmoothScrolling() {
    try {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed header
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    } catch (error) {
        console.error('Error setting up smooth scrolling:', error);
    }
}

// Show More Button Functionality
function setupShowMoreButton() {
    try {
        const showMoreBtn = document.querySelector('.show-more-btn');
        const testimonialsGrid = document.querySelector('.testimonials-grid');
        
        if (showMoreBtn && testimonialsGrid) {
            showMoreBtn.addEventListener('click', function() {
                // Create additional testimonial cards
                const additionalTestimonials = [
                    {
                        name: 'Sourabh Saini',
                        date: 'June 9, 2024',
                        rating: '★★★★★',
                        text: 'Yes I recommend this website definitely. It is a very good and easy to use website for creating any bill. And this website has a lot of varieties of bill also so that you can create any bill you want. Overall It\'s a great experience with bill generator of mine.'
                    },
                    {
                        name: 'Clara cool',
                        date: 'June 8, 2024',
                        rating: '★★★★★',
                        text: 'Would recommend for a friend'
                    },
                    {
                        name: 'Rishi Mathuria',
                        date: 'May 21, 2024',
                        rating: '★★★★★',
                        text: 'Worth every penny. Making life easier'
                    }
                ];

                additionalTestimonials.forEach(testimonial => {
                    const testimonialCard = createTestimonialCard(testimonial);
                    testimonialsGrid.appendChild(testimonialCard);
                });

                // Hide the show more button
                showMoreBtn.style.display = 'none';
            });
        }
    } catch (error) {
        console.error('Error setting up show more button:', error);
    }
}

// Create testimonial card element
function createTestimonialCard(testimonial) {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    card.innerHTML = `
        <img src="assets/img/user-avatar.png" alt="User avatar" class="testimonial-avatar">
        <h4 class="testimonial-name">${testimonial.name}</h4>
        <p class="testimonial-date">${testimonial.date}</p>
        <div class="testimonial-rating">${testimonial.rating}</div>
        <p class="testimonial-text">${testimonial.text}</p>
    `;
    return card;
}

// Form Validations (for future forms)
function setupFormValidations() {
    try {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                if (!validateForm(this)) {
                    e.preventDefault();
                }
            });

            // Real-time validation
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', function() {
                    validateField(this);
                });
                
                input.addEventListener('input', function() {
                    clearFieldError(this);
                });
            });
        });
    } catch (error) {
        console.error('Error setting up form validations:', error);
    }
}

// Validate entire form
function validateForm(form) {
    try {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    } catch (error) {
        console.error('Error validating form:', error);
        return false;
    }
}

// Validate individual field
function validateField(field) {
    try {
        const value = field.value.trim();
        const fieldType = field.type;
        let isValid = true;
        let errorMessage = '';

        // Check if required field is empty
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        // Email validation
        else if (fieldType === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        // Number validation
        else if (fieldType === 'number' && value) {
            if (isNaN(value) || parseFloat(value) < 0) {
                isValid = false;
                errorMessage = 'Please enter a valid positive number';
            }
        }
        // Phone validation
        else if (field.name === 'phone' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }

        // Display or clear error
        if (!isValid) {
            showFieldError(field, errorMessage);
        } else {
            clearFieldError(field);
        }

        return isValid;
    } catch (error) {
        console.error('Error validating field:', error);
        return false;
    }
}

// Show field error
function showFieldError(field, message) {
    try {
        clearFieldError(field);
        
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        
        field.parentNode.insertBefore(errorDiv, field.nextSibling);
    } catch (error) {
        console.error('Error showing field error:', error);
    }
}

// Clear field error
function clearFieldError(field) {
    try {
        field.classList.remove('error');
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    } catch (error) {
        console.error('Error clearing field error:', error);
    }
}

// Close Alert Banner
function closeAlert() {
    try {
        const alertBanner = document.querySelector('.alert-banner');
        if (alertBanner) {
            alertBanner.style.display = 'none';
        }
    } catch (error) {
        console.error('Error closing alert:', error);
    }
}

// Scroll to Top Function
function scrollToTop() {
    try {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } catch (error) {
        console.error('Error scrolling to top:', error);
    }
}

// Add scroll to top button
function addScrollToTopButton() {
    try {
        const scrollBtn = document.createElement('button');
        scrollBtn.innerHTML = '↑';
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.onclick = scrollToTop;
        
        // Add styles
        scrollBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #2563eb;
            color: white;
            border: none;
            font-size: 20px;
            cursor: pointer;
            display: none;
            z-index: 1000;
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(scrollBtn);
        
        // Show/hide based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollBtn.style.display = 'block';
            } else {
                scrollBtn.style.display = 'none';
            }
        });
    } catch (error) {
        console.error('Error adding scroll to top button:', error);
    }
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', function() {
    addScrollToTopButton();
});

// Lazy Loading for Images
function setupLazyLoading() {
    try {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } catch (error) {
        console.error('Error setting up lazy loading:', error);
    }
}

// Error Handling for Missing Images
function handleImageErrors() {
    try {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('error', function() {
                // Replace with placeholder or hide
                this.style.display = 'none';
                console.warn('Failed to load image:', this.src);
            });
        });
    } catch (error) {
        console.error('Error setting up image error handling:', error);
    }
}

// Initialize image error handling
document.addEventListener('DOMContentLoaded', function() {
    handleImageErrors();
});

// Performance optimization: Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    // Add any scroll-based functionality here
}, 100);

window.addEventListener('scroll', optimizedScrollHandler);

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatNumber,
        validateField,
        validateForm
    };
}
