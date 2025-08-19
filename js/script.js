document.addEventListener("DOMContentLoaded", () => {
    // ====== NAVBAR ======
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach(dropdown => {
        const selected = dropdown.querySelector(".selected");

        selected.addEventListener("click", (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                dropdown.classList.toggle("active");
            }
        });
    });

    document.addEventListener("click", (e) => {
        if (window.innerWidth <= 768) {
            dropdowns.forEach(dropdown => {
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove("active");
                }
            });

            if (!e.target.closest(".nav-container") && menuToggle.checked) {
                menuToggle.checked = false;
                navLinks.style.display = "none";
            }
        }
    });


    // ====== HERO SECTION ======
    // const gpiScroll = new LocomotiveScroll({
    //     el: document.querySelector('.gpi-smooth-scroll-wrapper'),
    //     smooth: true,
    //     smartphone: { smooth: true },
    //     tablet: { smooth: true }
    // });

    // Typewriter
    const typewriterWords = ['Study Abroad?', 'Work Abroad?', 'IELTS Preparation?', 'Language Training?'];
    let wordIndex = 0, charIndex = 0, isDeleting = false;

    function typeWriterEffect() {
        const typewriterElement = document.getElementById('typewriter-text');
        if (!typewriterElement) return;

        const currentWord = typewriterWords[wordIndex];
        const currentChar = currentWord.substring(0, charIndex);
        typewriterElement.textContent = currentChar;

        if (!isDeleting && charIndex < currentWord.length) {
            charIndex++;
            setTimeout(typeWriterEffect, 100);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(typeWriterEffect, 50);
        } else {
            isDeleting = !isDeleting;
            if (!isDeleting) wordIndex = (wordIndex + 1) % typewriterWords.length;
            setTimeout(typeWriterEffect, 1000);
        }
    }

    setTimeout(typeWriterEffect, 1000); // slight delay

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    const heading = document.querySelector('.gpi-hero-main-heading');
    const subtext = document.querySelector('.gpi-hero-subtext');
    const cta = document.querySelector('.gpi-hero-cta-group');

    if (heading && subtext && cta) {
        const gpiTl = gsap.timeline();
        gpiTl.to(heading, {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out'
        }).to(subtext, {
            opacity: 1, y: 0, duration: 0.8, ease: 'power2.out'
        }, '-=0.4').to(cta, {
            opacity: 1, y: 0, duration: 0.8, ease: 'power2.out'
        }, '-=0.3');
    }

    // Floating Elements
    const gpiFloatingContainer = document.getElementById('gpiFloatingElements');
    if (gpiFloatingContainer) {
        const floatCount = window.innerWidth < 768 ? 8 : 15;
        for (let i = 0; i < floatCount; i++) {
            const el = document.createElement('div');
            el.classList.add('gpi-floating-element');
            const size = Math.random() * 20 + 10;
            el.style.width = `${size}px`;
            el.style.height = `${size}px`;
            el.style.left = `${Math.random() * 100}%`;
            el.style.top = `${Math.random() * 100}%`;
            el.style.animationDelay = `${Math.random() * 5}s`;
            el.style.opacity = Math.random() * 0.5 + 0.1;
            gpiFloatingContainer.appendChild(el);
        }
    }

    // Lottie
    const lottieContainer = document.getElementById('gpiLottieAnimation');
    if (lottieContainer && typeof lottie !== "undefined") {
        lottie.loadAnimation({
            container: lottieContainer,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'https://assets5.lottiefiles.com/packages/lf20_glq3n1zy.json'
        });

        gsap.to(lottieContainer, {
            opacity: 1, duration: 1, ease: 'power2.out'
        });
    }

    // Scroll-trigger overlay and lottie Y offset
    ScrollTrigger.create({
        trigger: '.gpi-hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
            const progress = self.progress;
            gsap.to('.gpi-hero-overlay', {
                opacity: 1 - progress * 0.8,
                duration: 0.1
            });
            if (lottieContainer) {
                gsap.to(lottieContainer, {
                    y: progress * 100,
                    duration: 0.1
                });
            }
        }
    });

    window.addEventListener('beforeunload', () => {
        if (gpiScroll && gpiScroll.destroy) gpiScroll.destroy();
    });

    // ====== Timeline Show More/Less ======
    const btn = document.getElementById('mobileToggleBtn');
    const grid = document.getElementById('immigrationTimelineGrid');
    if (btn && grid) {
        btn.addEventListener('click', () => {
            grid.classList.toggle('show-all');
            btn.innerHTML = grid.classList.contains('show-all') ? 'Show Less Steps' : 'Show More Steps';
        });
    }





  // ======= STUDENT FLIGHT MAP CODE ======= //
  const mapEl = document.querySelector('#flightmap-map');
  if (!mapEl) return;

  const flightmapCountries = [
    { name: 'India', coordinates: { x: 65, y: 39 }, isOrigin: true },
    { name: 'Germany', coordinates: { x: 50, y: 29 } },
    { name: 'Canada', coordinates: { x: 30, y: 18 } },
    { name: 'Australia', coordinates: { x: 80, y: 68 } },
    { name: 'USA', coordinates: { x: 25, y: 28 } },
    { name: 'UK', coordinates: { x: 47, y: 27 } },
    { name: 'Switzerland', coordinates: { x: 50, y: 31 } }
  ];

  let flightsStarted = false;

  function createFlightmapFlights() {
    if (flightsStarted) return;
    flightsStarted = true;

    const origin = flightmapCountries.find(c => c.isOrigin);

    flightmapCountries.forEach(country => {
      if (!country.isOrigin) {
        createFlightmapMarker(country);
      }
    });

    function runFlights() {
      flightmapCountries.forEach((dest, i) => {
        if (!dest.isOrigin) {
          setTimeout(() => {
            animateFlight(origin, dest);
          }, i * 1000);
        }
      });
    }

    runFlights();
    setInterval(runFlights, 10000);
  }

  function createFlightmapMarker(country) {
    const marker = document.createElement('div');
    marker.className = 'flightmap-marker';
    marker.style.left = `${country.coordinates.x}%`;
    marker.style.top = `${country.coordinates.y}%`;
    marker.setAttribute('data-country', country.name);
    mapEl.appendChild(marker);
  }

  function animateFlight(origin, destination) {
    const dx = destination.coordinates.x - origin.coordinates.x;
    const dy = destination.coordinates.y - origin.coordinates.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;

    const path = document.createElement('div');
    path.className = 'flightmap-path';
    path.style.left = `${origin.coordinates.x}%`;
    path.style.top = `${origin.coordinates.y}%`;
    path.style.width = `${len}%`;
    path.style.transform = `rotate(${angle}deg)`;
    path.style.opacity = '0.8';
    mapEl.appendChild(path);

    const plane = document.createElement('div');
    plane.className = 'flightmap-plane';
    plane.style.left = `${origin.coordinates.x}%`;
    plane.style.top = `${origin.coordinates.y}%`;
    plane.style.transform = `translate(-50%, -50%) rotate(${angle + 90}deg)`;
    mapEl.appendChild(plane);

    const start = Date.now();
    const duration = 3000;

    function animate() {
      const progress = Math.min((Date.now() - start) / duration, 1);
      const x = origin.coordinates.x + dx * progress;
      const y = origin.coordinates.y + dy * progress;
      plane.style.left = `${x}%`;
      plane.style.top = `${y}%`;
      path.style.width = `${len * progress}%`;
      path.style.opacity = `${0.8 - progress * 0.8}`;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        plane.remove();
        path.remove();

        const marker = document.querySelector(
          `.flightmap-marker[data-country="${destination.name}"]`
        );
        if (marker) {
          marker.style.opacity = '1';
          marker.style.transform = 'translate(-50%, -50%) scale(1.3)';
          setTimeout(() => {
            marker.style.transform = 'translate(-50%, -50%) scale(1)';
          }, 300);
        }
      }
    }

    requestAnimationFrame(animate);
  }

  // Lazy start on scroll
  const flightmapObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          createFlightmapFlights();
        }
      });
    },
    { threshold: 0.3 }
  );

  flightmapObserver.observe(mapEl);
});





















 // Enhanced animated counter function with easing
        function animateCounters() {
            const studentCounters = document.querySelectorAll('.students-count');
            const successCounters = document.querySelectorAll('.success-rate');
            const duration = 1800; // ms
            
            const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
            
            const animate = (counters, appendSymbol = '') => {
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const start = 0;
                    const startTime = performance.now();
                    
                    const updateCounter = (currentTime) => {
                        const elapsedTime = currentTime - startTime;
                        const progress = Math.min(elapsedTime / duration, 1);
                        const easedProgress = easeOutQuart(progress);
                        const currentValue = Math.floor(easedProgress * target);
                        
                        counter.textContent = currentValue;
                        
                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target + appendSymbol;
                            counter.classList.add('counter-animate');
                        }
                    };
                    
                    requestAnimationFrame(updateCounter);
                });
            };
            
            animate(studentCounters, '+');
            animate(successCounters, '%');
        }

        // Intersection Observer with better performance
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    createParticles();
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        // Observe the cards wrapper
        const cardsWrapper = document.querySelector('.gateway-cards-wrapper');
        if (cardsWrapper) {
            observer.observe(cardsWrapper);
        }

        // Particle animation
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 30;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // Random properties
                const size = Math.random() * 10 + 5;
                const posX = Math.random() * 100;
                const delay = Math.random() * 5;
                const duration = Math.random() * 15 + 10;
                
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${posX}%`;
                particle.style.bottom = `-${size}px`;
                particle.style.animationDelay = `${delay}s`;
                particle.style.animationDuration = `${duration}s`;
                particle.style.opacity = Math.random() * 0.4 + 0.1;
                
                particlesContainer.appendChild(particle);
            }
        }

        // 3D tilt effect
        document.querySelectorAll('.gateway-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const angleX = (y - centerY) / 20;
                const angleY = (centerX - x) / 20;
                
                card.style.transform = `translateY(-1rem) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(-1rem) rotateX(0) rotateY(0)';
            });
        });

        // Add arrow icon animation to buttons
        document.querySelectorAll('.explore-btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                const arrow = btn.querySelector('.fa-arrow-right');
                if (arrow) {
                    arrow.style.transform = 'translateX(0.25rem)';
                }
            });
            
            btn.addEventListener('mouseleave', () => {
                const arrow = btn.querySelector('.fa-arrow-right');
                if (arrow) {
                    arrow.style.transform = 'translateX(0)';
                }
            });
        });






 document.addEventListener('DOMContentLoaded', function() {
            const carousel = document.getElementById('carousel');
            
            // Testimonial data
            const testimonials = [
                {
                    name: "Riddhi Makhija",
                    program: "Study Visa to Canada",
                    location: "Now living in Canada",
                    text: "I am extremely pleased to share my experience with Akash from International immigration, who provided exceptional assistance throughout my entire immigration process. From the very beginning, he demonstrated a high level of professionalism, in-depth knowledge of the procedures, and a genuine commitment to helping me achieve my goals."
                },
                {
                    name: "ANUSHA RAO DEEKULLA",
                    program: "Study Visa to Australia",
                    location: "Now living in Sydney",
                    text: "I will be very honest with my experience, I can't thank enough to Aakash Jaiswal for guiding me since Day 1 on my process, Helping me with my College Selection with Best Course for my Profession. Providing me through IELTS, My Documentation, University requirements,Loan process,Visa requirements, Every thing was very convincing from start to day I received all my approvals from University."
                },
                {
                    name: "Venkatesh Kardile",
                    program: "Study Visa to Scotland",
                    location: "Now living in Scotland",
                    text: "I had an excellent experience working with International Immigration for my university admission process. From the beginning, the team provided detailed guidance, making what could have been a complicated and stressful process smooth and manageable."
                },
                {
                    name: "Benkateah kumar Kumar",
                    program: "Study Visa to UK",
                    location: "Now in London",
                    text: "I want to share my experience with International Immigration and how they helped me get my UK Study Visa. I am very happy with the help I got from International Immigration. The whole process was smooth."
                },
                {
                    name: "Moses Emmanuel",
                    program: "Student Visa to Germany",
                    location: "Now in Berlin",
                    text: "Had the best coaching and motivation for my preparation within 15 days. Best ideas, tricks and methodology where thought with sample questions and answers."
                },
                {
                    name: "Vanshika Jain",
                    program: "Work Visa to Singapore",
                    location: "Now in Singapore",
                    text: "If you need reliable, efficient knowledgeable help with resolving you immigration issues International Immigration is your solution."
                }
            ];

            // Duplicate testimonials for seamless looping
            const duplicatedTestimonials = [...testimonials, ...testimonials];
            
            // Create testimonial cards
            duplicatedTestimonials.forEach(testimonial => {
                const card = document.createElement('div');
                card.className = 'testimonial-card';
                card.innerHTML = `
                    <div class="client-info">
                        <div class="client-name">${testimonial.name}</div>
                        <div class="client-program">${testimonial.program}</div>
                        <div class="stars">★★★★★</div>
                        <span class="client-location">${testimonial.location}</span>
                    </div>
                    <p class="testimonial-text">${testimonial.text}</p>
                `;
                carousel.appendChild(card);
            });
            
            const cards = document.querySelectorAll('.testimonial-card');
            let currentPosition = 0;
            let cardsPerView = 1;
            let cardWidth = 0;
            let isHovering = false;
            let animationId;
            let lastTimestamp = 0;
            const scrollSpeed = 0.1; // Slower scroll speed (pixels per millisecond)
            let resizeTimeout;

            function updateCardMetrics() {
                cardsPerView = window.innerWidth >= 1024 ? 3 : 
                              window.innerWidth >= 640 ? 2 : 1;
                cardWidth = cards[0].offsetWidth + 20; // width + margin
            }
            
            function autoScroll(timestamp) {
                if (!lastTimestamp) lastTimestamp = timestamp;
                const delta = timestamp - lastTimestamp;
                lastTimestamp = timestamp;
                
                if (!isHovering) {
                    currentPosition += scrollSpeed * delta;
                    
                    // Reset position when we've scrolled through one set of testimonials
                    if (currentPosition >= cardWidth * testimonials.length) {
                        currentPosition = 0;
                        carousel.style.transition = 'none';
                        carousel.style.transform = `translateX(0)`;
                        // Force reflow
                        void carousel.offsetWidth;
                    }
                    
                    carousel.style.transition = 'transform 0.5s linear';
                    carousel.style.transform = `translateX(${-currentPosition}px)`;
                }
                
                animationId = requestAnimationFrame(autoScroll);
            }
            
            function startAutoScroll() {
                lastTimestamp = 0;
                animationId = requestAnimationFrame(autoScroll);
            }
            
            function stopAutoScroll() {
                cancelAnimationFrame(animationId);
            }
            
            // Pause on hover
            carousel.addEventListener('mouseenter', () => {
                isHovering = true;
            });
            
            carousel.addEventListener('mouseleave', () => {
                isHovering = false;
                lastTimestamp = performance.now(); // Reset timestamp
            });
            
            // Touch events for mobile
            carousel.addEventListener('touchstart', () => {
                isHovering = true;
            }, {passive: true});
            
            carousel.addEventListener('touchend', () => {
                isHovering = false;
                lastTimestamp = performance.now();
            }, {passive: true});
            
            // Initialize
            updateCardMetrics();
            startAutoScroll();
            
            // Handle resize with debounce
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    updateCardMetrics();
                    // Reset position to avoid visual glitches
                    currentPosition = 0;
                    carousel.style.transition = 'none';
                    carousel.style.transform = `translateX(0)`;
                    void carousel.offsetWidth;
                }, 100);
            });
        });




        // %%%%%%%%%%%%%    FAQ     %%%%%%%%%%%%
         document.querySelectorAll('.faq-item').forEach(item => {
      item.addEventListener('click', () => {
        item.classList.toggle('active');
        const icon = item.querySelector('.faq-icon');
        icon.textContent = item.classList.contains('active') ? '-' : '+';
      });
    });