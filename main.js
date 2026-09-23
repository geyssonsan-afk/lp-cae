document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll Event for Navbar
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Tab Navigation for Projects / Communities
  const tabButtons = document.querySelectorAll('.tab-btn');
  const playerHeaderTitle = document.querySelector('.player-title span');
  const mixcloudIframe = document.querySelector('.mixcloud-container iframe');
  
  // Custom Mixcloud player links for different projects pointing to the main verified profile feed
  const projectMEdias = {
    jamaiquintas: {
      title: "Jamaiquintas - Mix Seleção Especial",
      embed: "https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=https%3A%2F%2Fwww.mixcloud.com%2Fuhuruselector%2F"
    },
    adubando: {
      title: "Adubando o Pinhão - Sound System na Rua",
      embed: "https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=https%3A%2F%2Fwww.mixcloud.com%2Fuhuruselector%2F"
    },
    aqualtune: {
      title: "Coletivo Aqualtune - Vozes Antirracistas",
      embed: "https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=https%3A%2F%2Fwww.mixcloud.com%2Fuhuruselector%2F"
    }
  };

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      tabButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');
      
      const projectKey = button.getAttribute('data-project');
      const projectData = projectMEdias[projectKey];
      
      if (projectData) {
        // Update Title
        playerHeaderTitle.textContent = projectData.title;
        // Update Embed URL
        mixcloudIframe.src = projectData.embed;
      }
    });
  });

  // 3. Volunteer Form Simulation
  const volunteerForm = document.getElementById('volunteer-form');
  const formSuccess = document.getElementById('form-success');

  if (volunteerForm) {
    volunteerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Basic input capture
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      
      // Interest tags checked
      const interests = [];
      document.querySelectorAll('input[name="interest"]:checked').forEach(cb => {
        interests.push(cb.value);
      });
      
      // Simulate API call/loading state
      const submitBtn = volunteerForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin" style="width:20px; height:20px; animation: spin 1s linear infinite;" viewBox="0 0 24 24">
          <circle style="opacity:0.25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
          <path style="opacity:0.75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Enviando...
      `;

      // CSS for spinner inside JS if not standard
      if (!document.getElementById('spin-keyframes')) {
        const style = document.createElement('style');
        style.id = 'spin-keyframes';
        style.innerHTML = `@keyframes spin { to { transform: rotate(360deg); } }`;
        document.head.appendChild(style);
      }

      setTimeout(() => {
        // Hide form and show success message
        volunteerForm.style.display = 'none';
        formSuccess.style.display = 'flex';
        
        // Console log simulation
        console.log("Inscrição de Voluntário Simulada com Sucesso:", {
          name,
          email,
          phone,
          interests,
          timestamp: new Date().toISOString()
        });
      }, 1500);
    });
  }

  // 4. Scroll Animations (Intersection Observer)
  const animElements = document.querySelectorAll('.profile-card, .bandeira-card, .support-box, .player-wrapper, .video-card, .hero-content, .hero-image-wrapper');
  
  // Setup standard styles for fade-in elements
  animElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  });

  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target); // Run animation once
      }
    });
  }, observerOptions);

  animElements.forEach(el => {
    observer.observe(el);
  });

  // 5. Easter Egg (Jingle)
  let easterEggKeys = "";
  document.addEventListener('keydown', (e) => {
    easterEggKeys += e.key;
    if (easterEggKeys.length > 20) {
      easterEggKeys = easterEggKeys.slice(-20);
    }
    if (easterEggKeys.endsWith("13420Enter")) {
      new Audio('midia/jingle_chase.mp3').play();
      easterEggKeys = "";
    }
  });
});
