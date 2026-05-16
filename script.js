/* =========================
   DIGIMASTERS – script.js
   All JavaScript for the website
========================= */


/* =========================
   NAVBAR: SCROLL BEHAVIOR
   Adds 'scrolled' class when page is scrolled down
========================= */
(function () {
  const navbar = document.getElementById('mainNavbar');

  function handleNavbarScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll);
})();


/* =========================
   NAVBAR: CLOSE ON MOBILE LINK CLICK
   Closes the collapsed menu when a nav link is clicked
========================= */
(function () {
  const navLinks = document.querySelectorAll('#navMenu .nav-link');
  const navCollapse = document.getElementById('navMenu');

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      // Only collapse on mobile
      if (window.innerWidth < 992) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  });
})();


/* =========================
   SMOOTH ACTIVE NAV LINK
   Highlights current section's nav link while scrolling
========================= */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  function activateNavLink() {
    let currentSection = '';

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSection) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', activateNavLink);
})();


/* =========================
   COUNTER ANIMATION
   Animates the numbers in the Results section
========================= */
(function () {
  const counters = document.querySelectorAll('.result-number');
  let hasAnimated = false;

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 1800; // milliseconds
    const step = target / (duration / 16); // ~60fps
    let current = 0;

    const timer = setInterval(function () {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current).toLocaleString('en-IN');
    }, 16);
  }

  function startCounters() {
    if (hasAnimated) return;

    const resultsSection = document.querySelector('.results-section');
    if (!resultsSection) return;

    const rect = resultsSection.getBoundingClientRect();
    const inView = rect.top <= window.innerHeight - 100;

    if (inView) {
      hasAnimated = true;
      counters.forEach(function (counter) {
        animateCounter(counter);
      });
    }
  }

  window.addEventListener('scroll', startCounters);
  startCounters(); // Run on load too
})();


/* =========================
   SCROLL TO TOP BUTTON
   Shows/hides the scroll-to-top button
========================= */
(function () {
  const scrollBtn = document.getElementById('scrollTopBtn');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      scrollBtn.classList.add('show');
    } else {
      scrollBtn.classList.remove('show');
    }
  });

  scrollBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* =========================
   CONTACT FORM SUBMISSION
   Validates and shows success message on form submit
========================= */
(function () {
  const submitBtn = document.getElementById('submitFormBtn');
  const successMsg = document.getElementById('formSuccess');

  if (!submitBtn) return;

  submitBtn.addEventListener('click', function () {
    // Get field values
    const name    = document.getElementById('userName').value.trim();
    const phone   = document.getElementById('userPhone').value.trim();
    const email   = document.getElementById('userEmail').value.trim();
    const course  = document.getElementById('userCourse').value;

    // Basic validation
    if (!name || !phone || !email || !course) {
      alert('Please fill in all required fields (Name, Phone, Email, Course).');
      return;
    }

    // Simple email format check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Phone format (basic: 10 digits)
    const phonePattern = /^[\d\s\+\-]{10,15}$/;
    if (!phonePattern.test(phone)) {
      alert('Please enter a valid phone number.');
      return;
    }

    // Show success message
    successMsg.classList.remove('d-none');
    submitBtn.textContent = '✓ Request Submitted!';
    submitBtn.disabled = true;
    submitBtn.style.background = '#16a34a';
    submitBtn.style.borderColor = '#16a34a';

    // Scroll to success message
    successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
})();


/* =========================
   CARD ENTRANCE ANIMATIONS
   Adds fade-in class when cards enter the viewport
========================= */
(function () {
  const animateItems = document.querySelectorAll(
    '.course-card, .service-card, .testimonial-card, .why-card, .result-card'
  );

  // Add base style for animation
  animateItems.forEach(function (item) {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  function revealOnScroll() {
    animateItems.forEach(function (item, index) {
      const rect = item.getBoundingClientRect();
      if (rect.top <= window.innerHeight - 60) {
        // Stagger delay based on item position
        const delay = (index % 3) * 80; // 3-column stagger
        setTimeout(function () {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, delay);
      }
    });
  }

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Run immediately on load
})();
