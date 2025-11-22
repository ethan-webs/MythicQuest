// Mythic Quest - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initHeroVideo();
    initFactionHover();
    initSmoothScrolling();
    initNavbarScroll();
    initPreRegisterForm();
    initMediaTabs();
    initAnimations();
});

// Hero Video Management
function initHeroVideo() {
    const heroVideo = document.getElementById('heroVideo');
    if (heroVideo) {
        // Ensure video plays on load
        heroVideo.play().catch(e => {
            console.log('Video autoplay prevented:', e);
        });
        
        // Handle video loading errors
        heroVideo.addEventListener('error', function() {
            console.log('Hero video not found, using fallback background');
            // You can add a fallback background image here
            document.querySelector('.hero-section').style.background = 
                'linear-gradient(135deg, #2E1A47, #3D2A5C), url("fallback-bg.jpg")';
        });
    }
}

// Faction Card Hover Effects
function initFactionHover() {
    const factionCards = document.querySelectorAll('.faction-card');
    
    factionCards.forEach(card => {
        const video = card.querySelector('video');
        const content = card.querySelector('.faction-content');
        
        if (video) {
            // Preload video on hover
            card.addEventListener('mouseenter', function() {
                video.currentTime = 0;
                video.play().catch(e => {
                    console.log('Faction video autoplay prevented:', e);
                });
                
                // Add glow effect
                card.classList.add('glow-effect');
            });
            
            card.addEventListener('mouseleave', function() {
                video.pause();
                card.classList.remove('glow-effect');
            });
        }
        
        // Add click effect for mobile
        card.addEventListener('click', function() {
            if (video) {
                if (video.paused) {
                    video.play().catch(e => {
                        console.log('Video play prevented:', e);
                    });
                } else {
                    video.pause();
                }
            }
        });
    });
}

// Smooth Scrolling for Navigation
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const topBarHeight = document.querySelector('.top-bar').offsetHeight;
                const offset = headerHeight + topBarHeight + 20;
                
                const targetPosition = targetSection.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navbar Scroll Effects
function initNavbarScroll() {
    const header = document.querySelector('.header');
    const topBar = document.querySelector('.top-bar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Hide/show top bar on scroll
        if (currentScrollY > 100) {
            topBar.style.transform = 'translateY(-100%)';
        } else {
            topBar.style.transform = 'translateY(0)';
        }
        
        // Add background to header when scrolling
        if (currentScrollY > 50) {
            header.style.background = 'rgba(46, 26, 71, 0.98)';
            header.style.backdropFilter = 'blur(15px)';
        } else {
            header.style.background = 'rgba(46, 26, 71, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Pre-Register Form Handling
function initPreRegisterForm() {
    const preRegisterButtons = document.querySelectorAll('.pre-register-cta');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    preRegisterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showPreRegisterModal();
        });
    });
    
    if (newsletterForm) {
        const form = newsletterForm.querySelector('form') || newsletterForm;
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const submitButton = newsletterForm.querySelector('button');
        
        if (submitButton) {
            submitButton.addEventListener('click', function(e) {
                e.preventDefault();
                handleNewsletterSignup(emailInput.value);
            });
        }
    }
}

// Pre-Register Modal
function showPreRegisterModal() {
    // Create modal if it doesn't exist
    let modal = document.getElementById('preRegisterModal');
    if (!modal) {
        modal = createPreRegisterModal();
        document.body.appendChild(modal);
    }
    
    // Show modal
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
}

function createPreRegisterModal() {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'preRegisterModal';
    modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content" style="background: var(--primary-purple); border: 2px solid var(--accent-gold);">
                <div class="modal-header" style="border-bottom: 1px solid var(--accent-gold);">
                    <h5 class="modal-title" style="color: var(--accent-gold);">
                        <i class="fas fa-sword me-2"></i>Join the Quest
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" style="filter: invert(1);"></button>
                </div>
                <div class="modal-body">
                    <form id="preRegisterForm">
                        <div class="mb-3">
                            <label for="email" class="form-label" style="color: var(--text-light);">Email Address</label>
                            <input type="email" class="form-control" id="email" required 
                                   style="background: rgba(255,255,255,0.1); border: 1px solid var(--accent-gold); color: var(--text-light);">
                        </div>
                        <div class="mb-3">
                            <label for="faction" class="form-label" style="color: var(--text-light);">Preferred Faction</label>
                            <select class="form-select" id="faction" required
                                    style="background: rgba(255,255,255,0.1); border: 1px solid var(--accent-gold); color: var(--text-light);">
                                <option value="">Choose your faction</option>
                                <option value="order">Order of Light</option>
                                <option value="chaos">Chaos Legion</option>
                                <option value="nature">Wild Nature</option>
                            </select>
                        </div>
                        <div class="mb-3 form-check">
                            <input type="checkbox" class="form-check-input" id="newsletter" checked>
                            <label class="form-check-label" for="newsletter" style="color: var(--text-light);">
                                Subscribe to newsletter for updates
                            </label>
                        </div>
                    </form>
                </div>
                <div class="modal-footer" style="border-top: 1px solid var(--accent-gold);">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" onclick="submitPreRegister()">
                        <i class="fas fa-sword me-2"></i>Pre-Register
                    </button>
                </div>
            </div>
        </div>
    `;
    return modal;
}

// Submit Pre-Register Form
function submitPreRegister() {
    const form = document.getElementById('preRegisterForm');
    const formData = new FormData(form);
    
    // Simulate form submission
    const submitButton = document.querySelector('#preRegisterModal .btn-primary');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Registering...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        // Simulate successful registration
        showSuccessMessage();
        bootstrap.Modal.getInstance(document.getElementById('preRegisterModal')).hide();
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        form.reset();
    }, 2000);
}

function showSuccessMessage() {
    const alert = document.createElement('div');
    alert.className = 'alert alert-success alert-dismissible fade show position-fixed';
    alert.style.cssText = `
        top: 100px;
        right: 20px;
        z-index: 9999;
        background: var(--accent-gold);
        color: var(--primary-purple);
        border: none;
        border-radius: 10px;
    `;
    alert.innerHTML = `
        <i class="fas fa-check-circle me-2"></i>
        <strong>Success!</strong> You've been pre-registered for Mythic Quest!
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
        if (alert.parentNode) {
            alert.parentNode.removeChild(alert);
        }
    }, 5000);
}

// Newsletter Signup
function handleNewsletterSignup(email) {
    if (!email || !isValidEmail(email)) {
        showErrorMessage('Please enter a valid email address.');
        return;
    }
    
    // Simulate newsletter signup
    const button = document.querySelector('.newsletter-form button');
    const originalText = button.innerHTML;
    
    button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Subscribing...';
    button.disabled = true;
    
    setTimeout(() => {
        showSuccessMessage();
        button.innerHTML = originalText;
        button.disabled = false;
        document.querySelector('.newsletter-form input').value = '';
    }, 1500);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showErrorMessage(message) {
    const alert = document.createElement('div');
    alert.className = 'alert alert-danger alert-dismissible fade show position-fixed';
    alert.style.cssText = `
        top: 100px;
        right: 20px;
        z-index: 9999;
        background: #E74C3C;
        color: white;
        border: none;
        border-radius: 10px;
    `;
    alert.innerHTML = `
        <i class="fas fa-exclamation-circle me-2"></i>
        <strong>Error!</strong> ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
        if (alert.parentNode) {
            alert.parentNode.removeChild(alert);
        }
    }, 5000);
}

// Media Tabs Enhancement
function initMediaTabs() {
    const mediaTabs = document.querySelectorAll('#mediaTabs button[data-bs-toggle="tab"]');
    
    mediaTabs.forEach(tab => {
        tab.addEventListener('shown.bs.tab', function(e) {
            const targetPane = document.querySelector(e.target.getAttribute('data-bs-target'));
            if (targetPane) {
                // Add fade-in animation to tab content
                targetPane.classList.add('fade-in-up');
                
                // Remove animation class after animation completes
                setTimeout(() => {
                    targetPane.classList.remove('fade-in-up');
                }, 800);
            }
        });
    });
}

// Scroll Animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.faction-card, .feature-card, .reward-card, .section-title, .section-subtitle');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Progress Bar Animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.transition = 'width 2s ease-in-out';
            bar.style.width = width;
        }, 500);
    });
}

// Initialize progress bar animation when pre-register section comes into view
const preRegisterSection = document.querySelector('.pre-register-section');
if (preRegisterSection) {
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    sectionObserver.observe(preRegisterSection);
}

// Parallax Effect for Hero Section
function initParallax() {
    const heroSection = document.querySelector('.hero-section');
    const video = document.querySelector('#heroVideo');
    
    if (heroSection && video) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (scrolled < window.innerHeight) {
                video.style.transform = `translateY(${rate}px)`;
            }
        });
    }
}

// Initialize parallax
initParallax();

// Mobile Menu Enhancement
function initMobileMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        // Close mobile menu when clicking on a link
        const navLinks = navbarCollapse.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });
    }
}

// Initialize mobile menu
initMobileMenu();

// Add loading state to buttons
function addLoadingState(button, text = 'Loading...') {
    const originalText = button.innerHTML;
    button.innerHTML = `<i class="fas fa-spinner fa-spin me-2"></i>${text}`;
    button.disabled = true;
    
    return function removeLoadingState() {
        button.innerHTML = originalText;
        button.disabled = false;
    };
}

// Utility function for smooth scrolling to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
function addScrollToTopButton() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.className = 'btn btn-primary position-fixed';
    scrollButton.style.cssText = `
        bottom: 30px;
        right: 30px;
        z-index: 1000;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: none;
        background: var(--accent-gold);
        color: var(--primary-purple);
        border: none;
        box-shadow: var(--shadow-glow);
    `;
    
    scrollButton.addEventListener('click', scrollToTop);
    document.body.appendChild(scrollButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    });
}

// Initialize scroll to top button
addScrollToTopButton();
