document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Setup
    document.querySelector('.hero').classList.add('loaded');

    // 1.25 Mobile Hamburger Menu Toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');

    menuBtn.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('nav-open');
        navActions.classList.toggle('nav-open', isOpen);
        menuBtn.classList.toggle('active', isOpen);
        // Prevent page scroll while menu is open
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close the menu when any nav link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-open');
            navActions.classList.remove('nav-open');
            menuBtn.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // 1.5 Hero Slider
    const heroBgs = document.querySelectorAll('.hero-bg');
    if (heroBgs.length > 1) {
        let currentSlide = 0;
        setInterval(() => {
            heroBgs[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % heroBgs.length;
            heroBgs[currentSlide].classList.add('active');
        }, 5000); // Change image every 5 seconds
    }

    // 2. Custom Cursor Implementation
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');
    
    // Only initialize if not on a touch device
    if (window.matchMedia("(pointer: fine)").matches) {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Move direct cursor immediately
            cursor.style.left = `${mouseX}px`;
            cursor.style.top = `${mouseY}px`;
        });
        
        // Smooth follow effect for the ring
        const render = () => {
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;
            
            follower.style.left = `${followerX}px`;
            follower.style.top = `${followerY}px`;
            
            requestAnimationFrame(render);
        };
        render();

        // Hover effects for links and buttons
        const interactables = document.querySelectorAll('a, button, .tilt-effect, .magnetic-btn');
        
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.backgroundColor = 'var(--accent)';
                follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
                follower.style.borderColor = 'var(--accent)';
                follower.style.backgroundColor = 'rgba(216, 90, 106, 0.1)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.backgroundColor = 'var(--secondary)';
                follower.style.transform = 'translate(-50%, -50%) scale(1)';
                follower.style.borderColor = 'rgba(230, 168, 34, 0.5)';
                follower.style.backgroundColor = 'transparent';
            });
        });
    }

    // 3. Magnetic Button Effect
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // 4. 3D Tilt Effect on Cards
    const tiltCards = document.querySelectorAll('.tilt-effect');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });

    // 5. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 6. Number Counter Animation for Impact Section
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    const animateNumbers = () => {
        statNumbers.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const duration = 2000; // ms
            const increment = target / (duration / 16); // 60fps
            
            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.innerText = target;
                }
            };
            updateCounter();
        });
    };

    // Intersection Observer for triggering animations when in view
    const impactSection = document.querySelector('.impact');
    
    if (impactSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !animated) {
                animateNumbers();
                animated = true;
            }
        }, { threshold: 0.5 });
        
        observer.observe(impactSection);
    }

    // 7. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-toggle i').classList.replace('fa-minus', 'fa-plus');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                item.querySelector('.faq-toggle i').classList.replace('fa-plus', 'fa-minus');
            }
        });
    });

    // 8. Gallery Featured Loop Slider
    const sliderContainer = document.getElementById('gallerySliderContainer');
    const sliderTrack = document.getElementById('gallerySliderTrack');
    const prevBtn = document.getElementById('galleryPrevBtn');
    const nextBtn = document.getElementById('galleryNextBtn');
    const playStatus = document.getElementById('sliderPlayStatus');
    const dotsContainer = document.getElementById('sliderDots');

    if (sliderTrack && sliderContainer) {
        const slides = sliderTrack.querySelectorAll('.gallery-slide');
        const totalSlides = slides.length;
        let currentIndex = 0;
        let autoLoopTimer = null;
        let isPaused = false;

        const getVisibleSlides = () => {
            if (window.innerWidth <= 600) return 1;
            if (window.innerWidth <= 992) return 2;
            return 3;
        };

        const getMaxIndex = () => {
            const visible = getVisibleSlides();
            return Math.max(0, totalSlides - visible);
        };

        const renderDots = () => {
            if (!dotsContainer) return;
            dotsContainer.innerHTML = '';
            const maxIdx = getMaxIndex();
            for (let i = 0; i <= maxIdx; i++) {
                const dot = document.createElement('button');
                dot.classList.add('slider-dot');
                if (i === currentIndex) dot.classList.add('active');
                dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
                dot.addEventListener('click', () => {
                    goToSlide(i);
                });
                dotsContainer.appendChild(dot);
            }
        };

        const updateDots = () => {
            if (!dotsContainer) return;
            const dots = dotsContainer.querySelectorAll('.slider-dot');
            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentIndex);
            });
        };

        const updateSliderPosition = () => {
            const visible = getVisibleSlides();
            const slideElement = slides[0];
            if (!slideElement) return;

            // Calculate slide width + gap (20px)
            const slideWidth = slideElement.getBoundingClientRect().width;
            const gap = 20;
            const offset = currentIndex * (slideWidth + gap);
            sliderTrack.style.transform = `translateX(-${offset}px)`;
            updateDots();
        };

        const goToSlide = (index) => {
            const maxIdx = getMaxIndex();
            if (index > maxIdx) {
                currentIndex = 0; // Infinite loop wrap
            } else if (index < 0) {
                currentIndex = maxIdx; // Wrap to end
            } else {
                currentIndex = index;
            }
            updateSliderPosition();
        };

        const nextSlide = () => {
            const maxIdx = getMaxIndex();
            if (currentIndex >= maxIdx) {
                goToSlide(0);
            } else {
                goToSlide(currentIndex + 1);
            }
        };

        const prevSlide = () => {
            const maxIdx = getMaxIndex();
            if (currentIndex <= 0) {
                goToSlide(maxIdx);
            } else {
                goToSlide(currentIndex - 1);
            }
        };

        if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoplay(); });
        if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoplay(); });

        const startAutoplay = () => {
            stopAutoplay();
            autoLoopTimer = setInterval(() => {
                if (!isPaused) {
                    nextSlide();
                }
            }, 3800);
        };

        const stopAutoplay = () => {
            if (autoLoopTimer) {
                clearInterval(autoLoopTimer);
                autoLoopTimer = null;
            }
        };

        const resetAutoplay = () => {
            stopAutoplay();
            startAutoplay();
        };

        // Pause on mouse hover / focus
        sliderContainer.addEventListener('mouseenter', () => {
            isPaused = true;
            if (playStatus) {
                playStatus.classList.add('paused');
                playStatus.querySelector('.indicator-text').textContent = 'Paused';
            }
        });

        sliderContainer.addEventListener('mouseleave', () => {
            isPaused = false;
            if (playStatus) {
                playStatus.classList.remove('paused');
                playStatus.querySelector('.indicator-text').textContent = 'Auto-looping';
            }
        });

        // Touch Drag / Swipe Support
        let touchStartX = 0;
        let touchEndX = 0;

        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            isPaused = true;
        }, { passive: true });

        sliderContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (diff > 45) {
                nextSlide();
            } else if (diff < -45) {
                prevSlide();
            }
            isPaused = false;
        }, { passive: true });

        // Window resize handler
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                renderDots();
                const maxIdx = getMaxIndex();
                if (currentIndex > maxIdx) currentIndex = maxIdx;
                updateSliderPosition();
            }, 150);
        });

        // Initial setup
        renderDots();
        updateSliderPosition();
        startAutoplay();
    }

    // 9. Gallery Filter Logic
    const filterButtons = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-grid .gallery-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.classList.remove('hidden');
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.96)';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // 10. Universal Lightbox Modal
    const lightbox = document.getElementById('galleryLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDesc = document.getElementById('lightboxDesc');
    const lightboxCategory = document.getElementById('lightboxCategory');
    const lightboxIndex = document.getElementById('lightboxIndex');
    const lightboxTotal = document.getElementById('lightboxTotal');
    const lightboxClose = document.getElementById('lightboxCloseBtn');
    const lightboxPrev = document.getElementById('lightboxPrevBtn');
    const lightboxNext = document.getElementById('lightboxNextBtn');
    const lightboxBackdrop = document.querySelector('.lightbox-backdrop');

    // Compile complete gallery items data
    const allGalleryData = Array.from(galleryItems).map(item => ({
        src: item.getAttribute('data-img'),
        title: item.getAttribute('data-title') || 'Gallery Photo',
        category: item.getAttribute('data-badge') || item.querySelector('.item-category')?.textContent || 'Milestone',
        desc: item.getAttribute('data-desc') || item.querySelector('.item-desc')?.textContent || ''
    }));

    if (lightboxTotal) {
        lightboxTotal.textContent = allGalleryData.length;
    }

    let activeLightboxIndex = 0;

    const openLightbox = (index) => {
        if (!lightbox || !allGalleryData[index]) return;
        activeLightboxIndex = index;
        const item = allGalleryData[activeLightboxIndex];

        lightboxImg.src = item.src;
        lightboxImg.alt = item.title;
        lightboxTitle.textContent = item.title;
        lightboxCategory.textContent = item.category;
        lightboxDesc.textContent = item.desc;
        if (lightboxIndex) lightboxIndex.textContent = activeLightboxIndex + 1;

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        if (!lightbox) return;
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    const showPrevLightbox = () => {
        const nextIdx = (activeLightboxIndex - 1 + allGalleryData.length) % allGalleryData.length;
        openLightbox(nextIdx);
    };

    const showNextLightbox = () => {
        const nextIdx = (activeLightboxIndex + 1) % allGalleryData.length;
        openLightbox(nextIdx);
    };

    // Attach click events on gallery grid items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            openLightbox(index);
        });
    });

    // Attach click events on slider lightbox buttons
    const previewButtons = document.querySelectorAll('.btn-preview-lightbox');
    previewButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const imgSrc = btn.getAttribute('data-img');
            const foundIndex = allGalleryData.findIndex(d => d.src === imgSrc);
            if (foundIndex !== -1) {
                openLightbox(foundIndex);
            } else {
                // Fallback direct open
                lightboxImg.src = imgSrc;
                lightboxImg.alt = btn.getAttribute('data-title') || 'Milestone Preview';
                lightboxTitle.textContent = btn.getAttribute('data-title') || 'Milestone Preview';
                lightboxCategory.textContent = btn.getAttribute('data-category') || 'Featured Milestone';
                lightboxDesc.textContent = btn.getAttribute('data-desc') || '';
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevLightbox);
    if (lightboxNext) lightboxNext.addEventListener('click', showNextLightbox);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrevLightbox();
        if (e.key === 'ArrowRight') showNextLightbox();
    });

    // 11. Refresh custom cursor bindings for dynamic elements
    if (window.matchMedia("(pointer: fine)").matches) {
        const newInteractables = document.querySelectorAll('.slider-arrow, .gallery-filter-btn, .btn-preview-lightbox, .lightbox-close, .lightbox-nav, .slider-dot, .gallery-item');
        const cursor = document.querySelector('.custom-cursor');
        const follower = document.querySelector('.cursor-follower');

        if (cursor && follower) {
            newInteractables.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                    cursor.style.backgroundColor = 'var(--accent)';
                    follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
                    follower.style.borderColor = 'var(--accent)';
                    follower.style.backgroundColor = 'rgba(216, 90, 106, 0.1)';
                });

                el.addEventListener('mouseleave', () => {
                    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                    cursor.style.backgroundColor = 'var(--secondary)';
                    follower.style.transform = 'translate(-50%, -50%) scale(1)';
                    follower.style.borderColor = 'rgba(230, 168, 34, 0.5)';
                    follower.style.backgroundColor = 'transparent';
                });
            });
        }
    }
});
