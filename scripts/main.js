// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to 'dark'
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (window.scrollY > 100) {
        navbar.style.background = currentTheme === 'dark' 
            ? 'rgba(26, 32, 44, 0.98)' 
            : 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px var(--shadow-light)';
    } else {
        navbar.style.background = currentTheme === 'dark' 
            ? 'rgba(26, 32, 44, 0.95)' 
            : 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// Enhanced Intersection Observer for bidirectional animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

// Card animation observer with better timing
const cardObserverOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const element = entry.target;
        
        if (entry.isIntersecting) {
            // Element is entering the viewport
            setTimeout(() => {
                element.classList.add('animate');
            }, 100);
        } else {
            // Element is leaving the viewport - remove animation for re-trigger
            if (entry.boundingClientRect.top > 0) {
                // Element is above viewport (scrolling up)
                element.classList.remove('animate');
            }
        }
    });
}, observerOptions);

// Dedicated observer for cards with smoother animations
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const element = entry.target;
        
        if (entry.isIntersecting) {
            // Add smooth animation with proper delay
            const index = Array.from(element.parentNode.children).indexOf(element);
            const delay = index * 150; // Staggered by 150ms
            
            setTimeout(() => {
                element.classList.add('animate');
                console.log(`Animating card ${index}:`, element.className);
                
                // Animate text elements within the card using simple approach
                const textElements = element.querySelectorAll('.card-text-animate');
                textElements.forEach((textEl, textIndex) => {
                    setTimeout(() => {
                        textEl.classList.add('animate');
                        console.log(`Animating text element ${textIndex} in card ${index}`);
                    }, textIndex * 100); // Simple staggered delay like section titles
                });
            }, delay);
        } else {
            // Remove animation if scrolling back up past the element
            if (entry.boundingClientRect.top > 0) {
                element.classList.remove('animate');
                
                // Remove text animations too
                const textElements = element.querySelectorAll('.card-text-animate');
                textElements.forEach(textEl => {
                    textEl.classList.remove('animate');
                });
                
                console.log('Removing animation from card:', element.className);
            }
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

// Specific observer for text elements
const textObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const element = entry.target;
        
        if (entry.isIntersecting) {
            // Add a small delay to make the animation more visible
            setTimeout(() => {
                element.classList.add('animate');
            }, 200);
        } else {
            // Element is leaving the viewport - remove animation for re-trigger
            if (entry.boundingClientRect.top > 0) {
                element.classList.remove('animate');
            }
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Bidirectional scroll observer for sections
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const section = entry.target;
        const animatedElements = section.querySelectorAll('.scroll-animate, .service-card, .portfolio-card, .testimonial-card, .feature, .metric-card');
        
        if (entry.isIntersecting) {
            // Section entering viewport
            animatedElements.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('animate');
                }, index * 100);
            });
        } else if (entry.boundingClientRect.top > 0) {
            // Section leaving viewport from top (scrolling up)
            animatedElements.forEach(el => {
                el.classList.remove('animate');
            });
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
});

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Add scroll animation classes to elements
    const serviceCards = document.querySelectorAll('.service-card');
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const features = document.querySelectorAll('.feature');
    const metricCards = document.querySelectorAll('.metric-card');
    const textElements = document.querySelectorAll('.scroll-animate-text');
    
    console.log(`Initializing animations for:
    - ${serviceCards.length} service cards
    - ${portfolioCards.length} portfolio cards  
    - ${testimonialCards.length} testimonial cards
    - ${features.length} features
    - ${metricCards.length} metric cards
    - ${textElements.length} text elements`);
    
    // Initialize all cards with scroll-animate class
    serviceCards.forEach((card, index) => {
        card.classList.add('scroll-animate');
        cardObserver.observe(card);
    });
    
    portfolioCards.forEach((card, index) => {
        card.classList.add('scroll-animate');
        cardObserver.observe(card);
    });
    
    testimonialCards.forEach((card, index) => {
        card.classList.add('scroll-animate');
        cardObserver.observe(card);
    });
    
    features.forEach((feature, index) => {
        feature.classList.add('scroll-animate-left');
        observer.observe(feature);
    });
    
    metricCards.forEach((card, index) => {
        card.classList.add('scroll-animate-scale');
        observer.observe(card);
    });
    
    // Observe text elements with special text observer
    textElements.forEach((text, index) => {
        console.log(`Observing text element ${index}:`, text.textContent.substring(0, 50));
        textObserver.observe(text);
    });
    
    // Observe sections for bidirectional animation
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});

// Counter animation for hero stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    const speed = 200;

    counters.forEach(counter => {
        const animate = () => {
            const value = counter.innerText;
            const data = parseInt(value.replace(/[^\d]/g, ''));
            const time = data / speed;
            let count = 0;

            const timer = setInterval(() => {
                if (count < data) {
                    count += Math.ceil(time);
                    if (value.includes('%')) {
                        counter.innerText = count + '%';
                    } else if (value.includes('M')) {
                        counter.innerText = '$' + count + 'M+';
                    } else {
                        counter.innerText = count + '+';
                    }
                } else {
                    counter.innerText = value;
                    clearInterval(timer);
                }
            }, 50);
        };

        // Trigger animation when hero section is in view
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animate();
                    heroObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        heroObserver.observe(counter.closest('.hero'));
    });
}

// Contact form handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
        // Simulate form submission (replace with actual endpoint)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success message
        showNotification('Thank you! Your message has been sent. We\'ll get back to you soon!', 'success');
        contactForm.reset();
        
    } catch (error) {
        // Show error message
        showNotification('Oops! Something went wrong. Please try again or contact us directly.', 'error');
    } finally {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    const autoRemove = setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Manual close
    notification.querySelector('.notification-close').addEventListener('click', () => {
        clearTimeout(autoRemove);
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Form validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'This field is required');
            isValid = false;
        } else {
            clearFieldError(field);
        }
    });
    
    // Email validation
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
            showFieldError(emailField, 'Please enter a valid email address');
            isValid = false;
        }
    }
    
    return isValid;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    `;
    
    field.style.borderColor = '#ef4444';
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    field.style.borderColor = '#e2e8f0';
}

// Add form validation to contact form
contactForm.addEventListener('submit', (e) => {
    if (!validateForm(contactForm)) {
        e.preventDefault();
    }
});

// Floating animation for hero cards
function initFloatingAnimation() {
    const cards = document.querySelectorAll('.floating-card');
    
    cards.forEach((card, index) => {
        const duration = 3000 + (index * 500); // Different durations for each card
        const delay = index * 1000; // Staggered start times
        
        card.style.animationDuration = `${duration}ms`;
        card.style.animationDelay = `${delay}ms`;
    });
}

// Portfolio filter functionality (if needed)
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.portfolio-filter');
    const portfolioItems = document.querySelectorAll('.portfolio-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter items
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(30px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    animateCounters();
    initFloatingAnimation();
    
    // Initialize theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Add loading animation to page
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Force initial state for text animations and add debug
    const textElements = document.querySelectorAll('.scroll-animate-text');
    console.log(`Found ${textElements.length} text elements to animate`);
    
    textElements.forEach((text, index) => {
        text.style.opacity = '0';
        text.style.transform = 'translateY(30px)';
        text.style.transition = 'all 0.8s ease';
        console.log(`Initialized text element ${index}:`, text.textContent.substring(0, 30));
    });
    
    // Trigger animations for elements already in view after a short delay
    setTimeout(() => {
        const initialElements = document.querySelectorAll('.scroll-animate, .service-card, .portfolio-card, .testimonial-card, .feature, .metric-card, .scroll-animate-text');
        initialElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const isInView = rect.top < window.innerHeight && rect.bottom > 0;
            if (isInView) {
                setTimeout(() => {
                    el.classList.add('animate');
                }, Math.random() * 300);
            }
        });
    }, 500);
});

// Test function to manually trigger animations
window.testTextAnimations = function() {
    const textElements = document.querySelectorAll('.scroll-animate-text');
    console.log('Testing animations on', textElements.length, 'elements');
    
    textElements.forEach((element, index) => {
        setTimeout(() => {
            console.log('Animating element', index);
            element.classList.add('animate');
        }, index * 200);
    });
};

// Test function to reset animations
window.resetTextAnimations = function() {
    const textElements = document.querySelectorAll('.scroll-animate-text');
    textElements.forEach(element => {
        element.classList.remove('animate');
    });
    console.log('Reset all text animations');
};

// Test function to manually show all cards (for debugging)
window.showAllCards = function() {
    const allCards = document.querySelectorAll('.service-card, .portfolio-card, .testimonial-card');
    allCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate');
            
            // Animate text within cards using simple approach
            const textElements = card.querySelectorAll('.card-text-animate');
            textElements.forEach((textEl, textIndex) => {
                setTimeout(() => {
                    textEl.classList.add('animate');
                    console.log(`Manually animated text element ${textIndex} in card ${index}`);
                }, textIndex * 100);
            });
            
            console.log('Manually animated card:', card.className);
        }, index * 150);
    });
    console.log('Manually animated all cards with simple text animations');
};

// Test function to reset all cards
window.resetAllCards = function() {
    const allCards = document.querySelectorAll('.service-card, .portfolio-card, .testimonial-card');
    allCards.forEach(card => {
        card.classList.remove('animate');
        
        // Reset text animations
        const textElements = card.querySelectorAll('.card-text-animate');
        textElements.forEach(textEl => {
            textEl.classList.remove('animate');
        });
    });
    console.log('Reset all cards and text animations');
};

// Preloader (optional)
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Performance optimization: Debounce scroll events
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

// Manual scroll animation fallback
function checkScrollAnimations() {
    const textElements = document.querySelectorAll('.scroll-animate-text');
    
    textElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100 && rect.bottom > 100;
        
        if (isVisible && !element.classList.contains('animate')) {
            element.classList.add('animate');
        } else if (!isVisible && rect.top > 0) {
            element.classList.remove('animate');
        }
    });
}

// Add scroll listener as fallback
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(checkScrollAnimations, 10);
});

// Lazy loading for images (if any are added later)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Add CSS for active nav link and enhanced animations
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--accent-color) !important;
        font-weight: 600;
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
    
    /* Enhanced floating animation */
    @keyframes enhancedFloat {
        0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
        }
        25% { 
            transform: translateY(-15px) rotate(1deg); 
        }
        50% { 
            transform: translateY(-10px) rotate(0deg); 
        }
        75% { 
            transform: translateY(-20px) rotate(-1deg); 
        }
    }
    
    .floating-card {
        animation: enhancedFloat 4s ease-in-out infinite;
    }
    
    .card-1 {
        animation-delay: 0s;
    }
    
    .card-2 {
        animation-delay: 1.3s;
    }
    
    .card-3 {
        animation-delay: 2.6s;
    }
    
    /* Smooth theme transitions */
    * {
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
    }
    
    /* Custom scrollbar for dark theme */
    ::-webkit-scrollbar {
        width: 8px;
    }
    
    ::-webkit-scrollbar-track {
        background: var(--bg-secondary);
    }
    
    ::-webkit-scrollbar-thumb {
        background: var(--accent-color);
        border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: var(--gradient-primary);
    }
    
    /* Text fade-in animations */
    .scroll-animate-text {
        transform: translateY(30px) !important;
        opacity: 0 !important;
        transition: all 0.8s ease !important;
    }
    
    .scroll-animate-text.animate {
        transform: translateY(0) !important;
        opacity: 1 !important;
    }
    
    /* Staggered text delays */
    .scroll-animate-text:nth-child(1) { transition-delay: 0.1s; }
    .scroll-animate-text:nth-child(2) { transition-delay: 0.2s; }
    .scroll-animate-text:nth-child(3) { transition-delay: 0.3s; }
    .scroll-animate-text:nth-child(4) { transition-delay: 0.4s; }
`;
document.head.appendChild(style);
