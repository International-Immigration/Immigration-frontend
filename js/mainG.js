

//navbar//
const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });

    document.addEventListener("DOMContentLoaded", function () {
    const selected = document.querySelector(".dropdown .selected");
    const options = document.querySelector(".dropdown .options");

    selected.addEventListener("click", function () {
      options.classList.toggle("show");
    });

    // Optional: Close dropdown if clicking outside
    document.addEventListener("click", function (event) {
      if (!event.target.closest(".dropdown")) {
        options.classList.remove("show");
      }
    });
  });



   // FOR OUR STUDENTS FLYING ABROAD //
// const mapContainer = document.querySelector('.map-container');

// const countries = [
//   { name: 'India', coordinates: { x: 65, y: 39 }, isOrigin: true },
//   { name: 'Germany', coordinates: { x: 50, y: 29 } },
//   { name: 'Canada', coordinates: { x: 30, y: 18 } },
//   { name: 'Australia', coordinates: { x: 80, y: 68 } },
//   { name: 'USA', coordinates: { x: 25, y: 28 } },
//   { name: 'UK', coordinates: { x: 47, y: 27 } },
//   { name: 'Switzerland', coordinates: { x: 50, y: 31 } }
// ];

// let flightsStarted = false;
// let countersStarted = false;

// function animateCounters() {
//   if (countersStarted) return;
//   document.querySelectorAll('.stat-number').forEach(el => {
//     const target = +el.getAttribute('data-count');
//     let count = 0;
//     const step = () => {
//       count += Math.ceil(target / 2500);
//       if (count >= target) {
//         el.textContent = target + '+';
//       } else {
//         el.textContent = count;
//         requestAnimationFrame(step);
//       }
//     };
//     step();
//   });
//   countersStarted = true;
// }

// function createFlights() {
//   if (flightsStarted) return;
//   flightsStarted = true;

//   const origin = countries.find(c => c.isOrigin);

//   countries.forEach(country => {
//     if (!country.isOrigin) {
//       createMarker(country);
//     }
//   });

//   function runFlightSequence() {
//     countries.forEach((destination, i) => {
//       if (!destination.isOrigin) {
//         setTimeout(() => {
//           createFlight(origin, destination);
//         }, i * 1000);
//       }
//     });
//   }

//   runFlightSequence();
//   setInterval(runFlightSequence, 10000);
// }

// function createMarker(country) {
//   const marker = document.createElement('div');
//   marker.className = 'location-marker';
//   marker.style.left = `${country.coordinates.x}%`;
//   marker.style.top = `${country.coordinates.y}%`;
//   marker.setAttribute('data-country', country.name);
//   mapContainer.appendChild(marker);
// }

// function createFlight(origin, destination) {
//   const dx = destination.coordinates.x - origin.coordinates.x;
//   const dy = destination.coordinates.y - origin.coordinates.y;
//   const len = Math.sqrt(dx * dx + dy * dy);
//   const angle = Math.atan2(dy, dx) * 180 / Math.PI;

//   const path = document.createElement('div');
//   path.className = 'flight-path';
//   path.style.left = `${origin.coordinates.x}%`;
//   path.style.top = `${origin.coordinates.y}%`;
//   path.style.width = `${len}%`;
//   path.style.transform = `rotate(${angle}deg)`;
//   path.style.opacity = '0.8';
//   mapContainer.appendChild(path);

//   const plane = document.createElement('div');
//   plane.className = 'plane';
//   plane.style.left = `${origin.coordinates.x}%`;
//   plane.style.top = `${origin.coordinates.y}%`;
//   plane.style.transform = `translate(-50%, -50%) rotate(${angle + 90}deg)`;
//   mapContainer.appendChild(plane);

//   const start = Date.now();
//   const duration = 3000;

//   function animatePlane() {
//     const progress = Math.min((Date.now() - start) / duration, 1);
//     const x = origin.coordinates.x + dx * progress;
//     const y = origin.coordinates.y + dy * progress;
//     plane.style.left = `${x}%`;
//     plane.style.top = `${y}%`;
//     path.style.width = `${len * progress}%`;
//     path.style.opacity = `${0.8 - progress * 0.8}`;

//     if (progress < 1) {
//       requestAnimationFrame(animatePlane);
//     } else {
//       plane.remove();
//       path.remove();

//       const marker = document.querySelector(
//         `.location-marker[data-country="${destination.name}"]`
//       );
//       if (marker) {
//         marker.style.opacity = '1';
//         marker.style.transform = 'translate(-50%, -50%) scale(1.3)';
//         setTimeout(() => {
//           marker.style.transform = 'translate(-50%, -50%) scale(1)';
//         }, 300);
//       }
//     }
//   }

//   requestAnimationFrame(animatePlane);
// }

// // Lazy load flights and counters
// const observer = new IntersectionObserver(
//   entries => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         createFlights();
//         animateCounters();
//       }
//     });
//   },
//   { threshold: 0.3 }
// );

// observer.observe(document.querySelector('#mapSection'));

// type classes //
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.plan-card').forEach((card, index) => {
  gsap.to(card, {
    scrollTrigger: {
      trigger: card,
      start: 'top 85%',
    },
    opacity: 1,
    y: 0,
    duration: 0.7,
    delay: index * 0.2,
    ease: 'power3.out'
  });
});

function openForm(course) {
  document.getElementById('level').value = course;
  document.getElementById('inquiryModal').style.display = 'flex';
}

function closeForm() {
  document.getElementById('inquiryModal').style.display = 'none';
}

function submitForm(e) {
  e.preventDefault();
  alert('Enquiry submitted successfully! We will contact you soon.');
  closeForm();
}







// {{{{{{{{{{{{{{{{{{{{TESTIMONALS}}}}}}}}}}}}}}//
  // {{{{{{{{{{{{{{{{{{{{TESTIMONIALS}}}}}}}}}}}}}}//
const track = document.getElementById('track');
const wrapper = document.getElementById('carousel');

// Clone cards for loop effect
const originalCards = Array.from(track.children);
originalCards.forEach(card => {
  const clone = card.cloneNode(true);
  track.appendChild(clone);
});

let posX = 0;
let isDragging = false;
let startX = 0;
let lastPosX = 0;

// Auto scroll with requestAnimationFrame
let scrollSpeed = 0.5;

function autoScroll() {
  if (!isDragging) {
    posX -= scrollSpeed;
    if (Math.abs(posX) >= track.scrollWidth / 2) {
      posX = 0;
    }
    track.style.transform = `translateX(${posX}px)`;
  }
  requestAnimationFrame(autoScroll);
}

autoScroll();

// Dragging
wrapper.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX;
  lastPosX = posX;
});

wrapper.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const dx = e.pageX - startX;
  posX = lastPosX + dx;
  track.style.transform = `translateX(${posX}px)`;
});

wrapper.addEventListener('mouseup', () => {
  isDragging = false;
});

wrapper.addEventListener('mouseleave', () => {
  isDragging = false;
});

// Touch support
wrapper.addEventListener('touchstart', (e) => {
  isDragging = true;
  startX = e.touches[0].pageX;
  lastPosX = posX;
});

wrapper.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const dx = e.touches[0].pageX - startX;
  posX = lastPosX + dx;
  track.style.transform = `translateX(${posX}px)`;
});

wrapper.addEventListener('touchend', () => {
  isDragging = false;
});

// Pause on hover
wrapper.addEventListener('mouseenter', () => {
  scrollSpeed = 0;
});
wrapper.addEventListener('mouseleave', () => {
  scrollSpeed = 0.5;
});



  document.addEventListener("DOMContentLoaded", function () {
    const germanBookBtns = document.querySelectorAll(".gcl-book-btn");
    const germanModal = document.getElementById("german-modal");
    const germanCloseBtn = document.getElementById("german-close-btn");
    const germanCourseInput = document.getElementById("german-course");

    // Open modal with selected course
    germanBookBtns.forEach(btn => {
      btn.addEventListener("click", function () {
        const card = btn.closest(".gcl-card");
        const course = card.querySelector(".gcl-level").textContent.trim();
        germanCourseInput.value = course;
        germanModal.style.display = "block";
      });
    });

    // Close modal
    germanCloseBtn.addEventListener("click", () => {
      germanModal.style.display = "none";
    });

    // Close modal on outside click
    window.addEventListener("click", e => {
      if (e.target === germanModal) {
        germanModal.style.display = "none";
      }
    });

    // Optional: Handle form submit
    document.getElementById("german-form").addEventListener("submit", function (e) {
      e.preventDefault();
      this.reset();
      germanModal.style.display = "none";
    });
  });

