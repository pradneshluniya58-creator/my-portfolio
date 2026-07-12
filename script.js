document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // 1. SCROLL PROGRESS & STICKY HEADER & ACTIVE NAV LINK
    // -------------------------------------------------------------
    const header = document.getElementById('header');
    const scrollProgress = document.getElementById('scroll-progress');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    const handleScroll = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        // Scroll progress bar width
        scrollProgress.style.width = `${scrollPercent}%`;

        // Sticky Header
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Nav Link highlight on Scroll
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height'));
            const sectionHeight = section.offsetHeight;
            if (scrollTop >= sectionTop - 50) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // -------------------------------------------------------------
    // 2. MOBILE MENU OVERLAY
    // -------------------------------------------------------------
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNavClose = document.getElementById('mobile-nav-close');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const openMobileMenu = () => {
        mobileNav.classList.add('open');
        document.body.style.overflow = 'hidden'; // Stop background scrolling
    };

    const closeMobileMenu = () => {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
    };

    mobileMenuBtn.addEventListener('click', openMobileMenu);
    mobileNavClose.addEventListener('click', closeMobileMenu);
    mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

    // -------------------------------------------------------------
    // 3. DARK / LIGHT THEME TOGGLE
    // -------------------------------------------------------------
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'light' || (!savedTheme && !systemPrefersDark)) {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        themeIcon.className = 'fa-solid fa-sun';
    } else {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
        themeIcon.className = 'fa-solid fa-moon';
    }

    themeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('dark-theme')) {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            themeIcon.className = 'fa-solid fa-sun';
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            themeIcon.className = 'fa-solid fa-moon';
            localStorage.setItem('theme', 'dark');
        }
    });

    // -------------------------------------------------------------
    // 4. CUSTOM TRAILING CURSOR
    // -------------------------------------------------------------
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .timeline-badge, .service-card');

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Immediate position for center dot
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    });

    // Interpolate outer trailing ring (smooth animation)
    const animateCursor = () => {
        let dx = mouseX - cursorX;
        let dy = mouseY - cursorY;

        cursorX += dx * 0.15;
        cursorY += dy * 0.15;

        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;

        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Hover state micro-interactions
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorDot.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
    });

    // -------------------------------------------------------------
    // 5. CANVAS PARTICLE BACKGROUND
    // -------------------------------------------------------------
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');

    let particles = [];
    const particleCount = 65;

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.4 - 0.2;
            this.speedY = Math.random() * 0.4 - 0.2;
            this.alpha = Math.random() * 0.5 + 0.1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Bounce / loop logic
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            const isDark = document.body.classList.contains('dark-theme');
            ctx.fillStyle = isDark ? `rgba(255, 255, 255, ${this.alpha})` : `rgba(0, 0, 0, ${this.alpha})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Connect close particles with lines
    const connectParticles = () => {
        const isDark = document.body.classList.contains('dark-theme');
        const maxDistance = 110;
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < maxDistance) {
                    const alpha = (1 - (dist / maxDistance)) * 0.15;
                    ctx.strokeStyle = isDark ? `rgba(255, 255, 255, ${alpha})` : `rgba(0, 0, 0, ${alpha})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    };

    const animateParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        connectParticles();
        requestAnimationFrame(animateParticles);
    };
    animateParticles();

    // -------------------------------------------------------------
    // 6. TYPING EFFECT
    // -------------------------------------------------------------
    const typingElement = document.getElementById('typing-element');
    const roles = ['Frontend Developer', 'UI/UX Designer', 'Problem Solver'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeEffect = () => {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typingSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2000; // Pause at full word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(typeEffect, typingSpeed);
    };
    
    if (typingElement) {
        typeEffect();
    }

    // -------------------------------------------------------------
    // 7. SCROLL REVEAL ANIMATIONS & PROGRESS BAR TRIGGERS
    // -------------------------------------------------------------
    const revealItems = document.querySelectorAll('.scroll-reveal');
    const progressBars = document.querySelectorAll('.progress-bar');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealItems.forEach(item => revealObserver.observe(item));

    // Observe About/Skills section specifically to trigger progress bars filling
    const skillsSection = document.getElementById('about');
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                progressBars.forEach(bar => {
                    const width = bar.getAttribute('data-progress');
                    bar.style.width = width;
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // -------------------------------------------------------------
    // 8. PROJECTS FILTERING
    // -------------------------------------------------------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const grid = document.querySelector('.projects-grid');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update Active State on Button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-filter');

            // Quick fade out
            grid.style.opacity = '0.3';

            setTimeout(() => {
                projectCards.forEach(card => {
                    const cardCat = card.getAttribute('data-category');
                    if (category === 'all' || cardCat === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
                grid.style.opacity = '1';
            }, 250);
        });
    });

    // -------------------------------------------------------------
    // 9. TESTIMONIALS SLIDER
    // -------------------------------------------------------------
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    let currentSlide = 0;

    const showSlide = (index) => {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    };

    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    };

    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    };

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        // Auto rotate slides every 8 seconds
        let slideInterval = setInterval(nextSlide, 8000);

        // Reset timer on manual action
        const resetInterval = () => {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 8000);
        };

        nextBtn.addEventListener('click', resetInterval);
        prevBtn.addEventListener('click', resetInterval);
    }

    // -------------------------------------------------------------
    // 10. CONTACT FORM VALIDATION & INTERACTIVE SUCCESS
    // -------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const formSuccessCard = document.getElementById('form-success-card');
    const resetFormBtn = document.getElementById('reset-form-btn');

    const validateInput = (input) => {
        const container = input.closest('.input-container');
        let isValid = true;

        if (input.required && !input.value.trim()) {
            isValid = false;
        }

        if (input.type === 'email' && input.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value.trim())) {
                isValid = false;
            }
        }

        if (!isValid) {
            container.classList.add('invalid');
        } else {
            container.classList.remove('invalid');
        }

        return isValid;
    };

    if (contactForm) {
        // Real-time validation on blur/input
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateInput(input));
            input.addEventListener('input', () => {
                if (input.closest('.input-container').classList.contains('invalid')) {
                    validateInput(input);
                }
            });
        });

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isFormValid = true;

            inputs.forEach(input => {
                if (!validateInput(input)) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                // Mock successfully sending email
                contactForm.classList.add('hidden');
                formSuccessCard.classList.remove('hidden');
                
                // Reset form fields
                contactForm.reset();
                inputs.forEach(input => {
                    input.closest('.input-container').classList.remove('invalid');
                });
            }
        });

        resetFormBtn.addEventListener('click', () => {
            formSuccessCard.classList.add('hidden');
            contactForm.classList.remove('hidden');
        });
    }
});
