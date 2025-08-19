document.addEventListener('DOMContentLoaded', function () {
  /* ===============================
     Particles animation
  =============================== */
  const particlesContainer = document.getElementById('particles');
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    const size = Math.random() * 10 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;

    const tx = (Math.random() - 0.5) * 500;
    const ty = (Math.random() - 0.5) * 500;

    particle.style.setProperty('--tx', `${tx}px`);
    particle.style.setProperty('--ty', `${ty}px`);
    particle.style.animationDuration = `${20 + Math.random() * 30}s`;
    particle.style.animationDelay = `${Math.random() * 10}s`;

    particle.style.opacity = Math.random() * 0.5;

    particlesContainer.appendChild(particle);
  }

  /* ===============================
     Word bubbles
  =============================== */
  const wordBubbles = document.getElementById('wordBubbles');
  const words = [
    'Reading', 'Writing', 'Speaking', 'Listening',
    'Vocabulary', 'Grammar', 'TOEFL', 'Practice',
    'Test', 'Score', 'Essay', 'Fluency'
  ];

  for (let i = 0; i < 12; i++) {
    const bubble = document.createElement('div');
    bubble.className = 'word-bubble';
    bubble.textContent = words[i];

    bubble.style.left = `${Math.random() * 90 + 5}%`;
    bubble.style.top = `${Math.random() * 90 + 5}%`;

    const tx = (Math.random() - 0.5) * 300;
    const ty = (Math.random() - 0.5) * 300;

    bubble.style.setProperty('--tx', `${tx}px`);
    bubble.style.setProperty('--ty', `${ty}px`);
    bubble.style.animationDuration = `${30 + Math.random() * 30}s`;
    bubble.style.animationDelay = `${Math.random() * 5}s`;

    bubble.style.fontSize = `${0.7 + Math.random() * 0.6}rem`;
    bubble.style.padding = `${0.3 + Math.random() * 0.5}rem ${0.8 + Math.random() * 1}rem`;

    wordBubbles.appendChild(bubble);
  }

  /* ===============================
     Hover effects for buttons
  =============================== */
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-5px) scale(1.05)';
    });

    button.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  /* ===============================
     Parallax effect
  =============================== */
  document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
      particle.style.transform = `translate(${x * 20 - 10}px, ${y * 20 - 10}px)`;
    });
  });

  /* ===============================
     Confetti on scroll into .toefl-offer-section
  =============================== */
  const section = document.querySelector(".toefl-offer-section");
  let confettiFired = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !confettiFired) {
        confettiFired = true;
        fireConfetti();
      }
    });
  }, { threshold: 0.4 });

  if (section) observer.observe(section);

  function fireConfetti() {
    const duration = 2000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999 };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, {
        particleCount,
        origin: { x: Math.random(), y: Math.random() - 0.2 }
      }));
    }, 250);
  }

  /* ===============================
     ADV Card Interactions & Show More
  =============================== */
  const cards = document.querySelectorAll('.adv-card');
  const showMoreBtn = document.getElementById('advShowMore');
  let showingAll = false;
  
  // Floating animation stagger
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.5}s`;
  });

  // Click interaction
  cards.forEach(card => {
    card.addEventListener('click', function () {
      cards.forEach(otherCard => {
        if (otherCard !== card && otherCard.classList.contains('active')) {
          otherCard.classList.remove('active');
        }
      });
      this.classList.toggle('active');
    });
  });

  // Initial setup for mobile/desktop
  function setupInitialCards() {
    if (window.innerWidth <= 768) {
      cards.forEach((card, index) => {
        card.style.display = index < 5 ? 'flex' : 'none';
      });
      showMoreBtn.style.display = 'block';
      showMoreBtn.innerHTML = 'Show More Advantages <i class="fas fa-chevron-down"></i>';
      showingAll = false;
    } else {
      cards.forEach(card => {
        card.style.display = 'flex';
      });
      showMoreBtn.style.display = 'none';
    }
  }
  setupInitialCards(); // Run on load

  // Mobile Show More
  if (showMoreBtn) {
    showMoreBtn.addEventListener('click', function () {
      showingAll = !showingAll;
      if (showingAll) {
        cards.forEach(card => {
          card.style.display = 'flex';
        });
        this.innerHTML = 'Show Less <i class="fas fa-chevron-up"></i>';
      } else {
        cards.forEach((card, index) => {
          card.style.display = index < 5 ? 'flex' : 'none';
        });
        this.innerHTML = 'Show More Advantages <i class="fas fa-chevron-down"></i>';
      }
    });
  }

  // Handle Resize
  window.addEventListener('resize', setupInitialCards);

  /* ===============================
     Table Animation & Hover Effect
  =============================== */
  setTimeout(() => {
    const tableCard = document.querySelector('.TFL-stru-table-card');
    if (tableCard) {
      tableCard.classList.add('animate');
    }
  }, 200);

  const rows = document.querySelectorAll('.TFL-stru-table tbody tr');
  rows.forEach(row => {
    row.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-2px)';
      this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    });
    
    row.addEventListener('mouseleave', function () {
      this.style.transform = '';
      this.style.boxShadow = '';
    });
  });

  /* ===============================
     Cource-Type Button Ripple + Processing
  =============================== */
  // const courceButtons = document.querySelectorAll('.Cource-Type-btn');
  // courceButtons.forEach(button => {
  //   button.addEventListener('click', function(e) {
  //     if (this.classList.contains('processing')) return;
  //     this.classList.add('processing');

  //     const ripple = document.createElement('span');
  //     ripple.className = 'ripple';
  //     this.appendChild(ripple);

  //     const rect = this.getBoundingClientRect();
  //     ripple.style.left = `${e.clientX - rect.left}px`;
  //     ripple.style.top = `${e.clientY - rect.top}px`;

  //     const originalHTML = this.innerHTML;
  //     this.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Processing...`;

  //     setTimeout(() => {
  //       this.innerHTML = `<i class="fas fa-check"></i> Success!`;
  //       this.style.background = 'linear-gradient(to right, #10b981, #34d399)';
  //       setTimeout(() => {
  //         this.innerHTML = originalHTML;
  //         this.style.background = '';
  //         this.classList.remove('processing');
  //         ripple.remove();
  //       }, 2000);
  //     }, 1500);
  //   });
  // });

  /* ===============================
     Filter Functionality for English Test Table
  =============================== */
  const engTestTabs = document.querySelectorAll('.eng-test-tab');
  const engTestFeatureRows = document.querySelectorAll('.eng-test-feature-row');
  
  const toeflHeading = document.querySelector('.eng-test-toefl-heading');
  const ieltsHeading = document.querySelector('.eng-test-ielts-heading');
  const pteHeading = document.querySelector('.eng-test-pte-heading');
  
  const toeflCols = document.querySelectorAll('.eng-test-toefl-col');
  const ieltsCols = document.querySelectorAll('.eng-test-ielts-col');
  const pteCols = document.querySelectorAll('.eng-test-pte-col');

  engTestTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      engTestTabs.forEach(t => t.classList.remove('eng-test-tab-active'));
      tab.classList.add('eng-test-tab-active');

      const filter = tab.dataset.filter;

      if (filter === 'all') {
        toeflHeading.classList.remove('eng-test-hidden');
        ieltsHeading.classList.remove('eng-test-hidden');
        pteHeading.classList.remove('eng-test-hidden');

        toeflCols.forEach(col => col.classList.remove('eng-test-hidden'));
        ieltsCols.forEach(col => col.classList.remove('eng-test-hidden'));
        pteCols.forEach(col => col.classList.remove('eng-test-hidden'));

        engTestFeatureRows.forEach(row => row.style.display = '');
      } else {
        toeflHeading.classList.add('eng-test-hidden');
        ieltsHeading.classList.add('eng-test-hidden');
        pteHeading.classList.add('eng-test-hidden');

        toeflCols.forEach(col => col.classList.add('eng-test-hidden'));
        ieltsCols.forEach(col => col.classList.add('eng-test-hidden'));
        pteCols.forEach(col => col.classList.add('eng-test-hidden'));

        if (filter === 'toefl') {
          toeflHeading.classList.remove('eng-test-hidden');
          toeflCols.forEach(col => col.classList.remove('eng-test-hidden'));
        } else if (filter === 'ielts') {
          ieltsHeading.classList.remove('eng-test-hidden');
          ieltsCols.forEach(col => col.classList.remove('eng-test-hidden'));
        } else if (filter === 'pte') {
          pteHeading.classList.remove('eng-test-hidden');
          pteCols.forEach(col => col.classList.remove('eng-test-hidden'));
        }

        engTestFeatureRows.forEach(row => row.style.display = '');
      }
    });
  });

  const engTestTestValues = document.querySelectorAll('.eng-test-test-value');
  engTestTestValues.forEach(cell => {
    cell.addEventListener('mouseenter', () => {
      cell.style.transform = 'scale(1.02)';
      cell.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
      cell.style.zIndex = '10';
    });
    
    cell.addEventListener('mouseleave', () => {
      cell.style.transform = '';
      cell.style.boxShadow = '';
      cell.style.zIndex = '';
    });
  });

  const engTestRows = document.querySelectorAll('.eng-test-feature-row');
  engTestRows.forEach((row, index) => {
    row.style.animationDelay = `${index * 0.1}s`;
  });


  /* ===============================
     Contact Section: Copy, Form, Social Hover & Animation
  =============================== */
  const contactMethods = document.querySelectorAll(".contact-sec-method");
  contactMethods.forEach((method) => {
    method.addEventListener("click", copyText);
    method.addEventListener("keypress", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        copyText.call(method);
      }
    });
  });

  function copyText() {
    this.style.transform = "translateX(12px) scale(1.05)";
    setTimeout(() => {
      this.style.transform = "translateX(12px)";
    }, 300);

    const text = this.querySelector("p").textContent.trim();
    if (this.id === "emailMethod" || this.id === "phoneMethod") {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          const icon = this.querySelector(".contact-sec-icon i");
          const originalClass = icon.className;
          icon.className = "fas fa-check";
          icon.style.color = "#00ff99";
          setTimeout(() => {
            icon.className = originalClass;
            icon.style.color = "";
          }, 2000);
        })
        .catch(() => {
          alert("Failed to copy!");
        });
    }
  }

  const socialLinks = document.querySelectorAll(".contact-sec-social-link");
  socialLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      link.querySelector("i").style.transform = "scale(1.3)";
    });
    link.addEventListener("mouseleave", () => {
      link.querySelector("i").style.transform = "scale(1)";
    });
  });

  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const successMessage = document.getElementById("successMessage");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;
    const inputs = this.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      if (!input.value.trim()) {
        input.style.borderColor = "#e74c3c";
        input.setAttribute("aria-invalid", "true");
        isValid = false;
      } else {
        input.style.borderColor = "";
        input.removeAttribute("aria-invalid");
      }
    });

    if (!isValid) {
      return;
    }

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      successMessage.style.display = "block";
      submitBtn.style.display = "none";

      setTimeout(() => {
        form.reset();
        submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
        submitBtn.disabled = false;
        successMessage.style.display = "none";
        submitBtn.style.display = "inline-flex";
      }, 3000);
    }, 1500);
  });

  const inputFields = document.querySelectorAll(
    ".contact-sec-input-group input, .contact-sec-input-group textarea"
  );
  inputFields.forEach((input) => {
    input.addEventListener("focus", () => {
      input.parentNode.style.transform = "scale(1.03)";
      input.parentNode.style.transition = "transform 0.3s ease";
    });
    input.addEventListener("blur", () => {
      input.parentNode.style.transform = "scale(1)";
    });
  });

  // Animate wrapper on load
  setTimeout(() => {
    const wrapper = document.querySelector(".contact-sec-container");
    wrapper.style.opacity = "1";
    wrapper.style.transform = "translateY(0)";
  }, 100);

});


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