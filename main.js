// Dynamic Portfolio Data Engine
const PortfolioData = {
  profile: {
    fullName: "Pradnesh Santosh Luniya",
    college: "AISSMS College of Engineering, Pune",
    birthDate: "March 23, 2008",
    status: "2nd Year",
    linkedin: "https://www.linkedin.com/in/pradnesh-luniya-233239384/",
    github: "https://github.com/pradneshluniya58-creator"
  },
  
  skills: [
    {
      id: "cpp-dsa",
      name: "C++ (DSA)",
      category: "Programming & Core",
      level: 85,
      details: "Data Structures & Algorithms, OOP principles, and competitive programming foundations.",
      featured: true,
      icon: "⚡"
    },
    {
      id: "python",
      name: "Python",
      category: "Programming & Core",
      level: 80,
      details: "Automation scripting, data analysis foundations, and backend operations.",
      featured: true,
      icon: "🐍"
    },
    {
      id: "c-lang",
      name: "C Programming",
      category: "Programming & Core",
      level: 75,
      details: "Low-level structures, memory management, and fundamental computer science paradigms.",
      featured: true,
      icon: "💻"
    },
    {
      id: "js",
      name: "JavaScript",
      category: "Web Development",
      level: 70,
      details: "DOM manipulation, asynchronous operations, event handling, and interactive dynamic components.",
      featured: false,
      icon: "🌐"
    },
    {
      id: "html-css",
      name: "HTML5 & CSS3",
      category: "Web Development",
      level: 90,
      details: "Semantic layouts, responsive flexbox/grid structures, and keyframe-based micro-animations.",
      featured: false,
      icon: "🎨"
    },
    {
      id: "sql",
      name: "SQL",
      category: "Databases",
      level: 75,
      details: "Relational database querying, normalization, schema design, and transaction management.",
      featured: false,
      icon: "📊"
    }
  ],

  projects: [
    {
      id: "portfolio-website",
      title: "Portfolio Website",
      subtitle: "Personal Portfolio & Git Pipeline",
      shortDescription: "A highly interactive, glassmorphic portfolio site engineered with vanilla HTML, CSS, and JS, featuring dynamic data binding.",
      longDescription: "This personal portfolio serves as both a central hub for my professional identity and a demonstration of my engineering skills. It is designed with clean typography, neon accents, fluid layout elements, and uses a custom JS data engine so that adding new items is trivial.",
      features: [
        "Crafted custom glassmorphism components and fluid hover micro-animations using CSS transitions.",
        "Built an interactive project modal and dynamic skill progress bar loading using Intersection Observers.",
        "Created an extensible JavaScript data engine to dynamically populate page items, ensuring easy future expansion.",
        "Configured a local Git structure and synchronized the workspace with a newly spawned remote GitHub repository."
      ],
      tech: ["HTML5", "CSS3", "JavaScript", "SVG", "Git"],
      github: "https://github.com/pradneshluniya58-creator/my-portfolio",
      demo: "#", // Resolves to current site
      featured: true
    }
  ],

  experiences: [
    {
      id: "engineering-student",
      period: "2025 - Present",
      role: "Undergraduate Engineering Student",
      org: "AISSMS College of Engineering, Pune",
      desc: "Completing fundamental coursework in Computer Engineering. Maintained top grades during the first year, focusing on programming paradigms and digital electronics. Transitioning to second year."
    }
  ]
};

// Main Initialization
document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initContactForm();
  
  // Render functions based on which page is active
  if (document.getElementById("projects-featured-container")) {
    renderFeaturedProjects();
  }
  if (document.getElementById("projects-all-container")) {
    renderAllProjects();
  }
  if (document.getElementById("skills-featured-container")) {
    renderFeaturedSkills();
  }
  if (document.getElementById("skills-all-container")) {
    renderAllSkills();
  }
  if (document.getElementById("experience-timeline-container")) {
    renderExperienceTimeline();
  }

  // Common setups
  initModals();
  initSkillProgressAnimation();
});

// Mobile Menu Handler
function initMobileMenu() {
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");
  
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("show");
      menuBtn.innerHTML = navLinks.classList.contains("show") ? "✕" : "☰";
    });
  }
}

// Render Featured Projects on Home Page
function renderFeaturedProjects() {
  const container = document.getElementById("projects-featured-container");
  const featured = PortfolioData.projects.filter(p => p.featured);
  
  container.innerHTML = featured.map(p => createProjectCardMarkup(p)).join("");
}

// Render All Projects on Dedicated Page
function renderAllProjects() {
  const container = document.getElementById("projects-all-container");
  container.innerHTML = PortfolioData.projects.map(p => createProjectCardMarkup(p)).join("");
}

// Render Featured Skills on Home Page
function renderFeaturedSkills() {
  const container = document.getElementById("skills-featured-container");
  const featured = PortfolioData.skills.filter(s => s.featured);
  
  container.innerHTML = featured.map(s => createSkillCardMarkup(s)).join("");
}

// Render All Skills on Dedicated Page
function renderAllSkills() {
  const container = document.getElementById("skills-all-container");
  container.innerHTML = PortfolioData.skills.map(s => createSkillCardMarkup(s)).join("");
}

// Render Experience Timeline
function renderExperienceTimeline() {
  const container = document.getElementById("experience-timeline-container");
  container.innerHTML = PortfolioData.experiences.map(exp => `
    <div class="timeline-item">
      <div class="timeline-marker"></div>
      <div class="timeline-period">${exp.period}</div>
      <div class="timeline-role">${exp.role}</div>
      <div class="timeline-org">${exp.org}</div>
      <p class="timeline-desc">${exp.desc}</p>
    </div>
  `).join("");
}

// Project Card Template
function createProjectCardMarkup(project) {
  const techBadges = project.tech.map(t => `<span class="project-tech-badge">${t}</span>`).join("");
  
  return `
    <div class="project-card" data-id="${project.id}">
      <div class="project-img-wrapper">
        <span class="project-placeholder-icon">🗂️</span>
        <span class="project-badge">${project.tech[0]}</span>
      </div>
      <div class="project-content">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-desc">${project.shortDescription}</p>
        <div class="project-tech-list">
          ${techBadges}
        </div>
      </div>
    </div>
  `;
}

// Skill Card Template
function createSkillCardMarkup(skill) {
  return `
    <div class="skill-card">
      <div class="skill-header">
        <div class="skill-name-container">
          <span class="skill-icon">${skill.icon}</span>
          <span class="skill-name">${skill.name}</span>
        </div>
      </div>
      <p class="skill-details-text">${skill.details}</p>
    </div>
  `;
}

// Skill Progress Bar Trigger
function initSkillProgressAnimation() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fillElement = entry.target.querySelector(".skill-bar-fill");
        if (fillElement) {
          const pct = fillElement.getAttribute("data-pct");
          fillElement.style.width = `${pct}%`;
        }
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".skill-card").forEach(card => {
    observer.observe(card);
  });
}

// Modal View Handler
function initModals() {
  const overlay = document.getElementById("project-modal-overlay");
  if (!overlay) return;

  const closeBtn = overlay.querySelector(".modal-close-btn");
  
  // Card click triggers modal opening
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".project-card");
    if (card) {
      const projectId = card.getAttribute("data-id");
      const project = PortfolioData.projects.find(p => p.id === projectId);
      if (project) {
        openProjectModal(project);
      }
    }
  });

  // Close modal click handlers
  closeBtn.addEventListener("click", closeProjectModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      closeProjectModal();
    }
  });

  // Esc key closure
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("show")) {
      closeProjectModal();
    }
  });

  function openProjectModal(project) {
    overlay.querySelector(".modal-subtitle").innerText = project.subtitle;
    overlay.querySelector(".modal-title").innerText = project.title;
    overlay.querySelector(".modal-desc").innerText = project.longDescription;
    
    const featuresList = overlay.querySelector(".modal-features-list");
    featuresList.innerHTML = project.features.map(f => `
      <li class="modal-feature-item">${f}</li>
    `).join("");

    const githubBtn = overlay.querySelector(".github-repo-btn");
    const demoBtn = overlay.querySelector(".live-demo-btn");
    
    githubBtn.href = project.github;
    demoBtn.href = project.demo;

    overlay.classList.add("show");
    document.body.style.overflow = "hidden"; // Lock background scroll
  }

  function closeProjectModal() {
    overlay.classList.remove("show");
    document.body.style.overflow = ""; // Restore background scroll
  }
}

// Contact Form Handler with Custom Neon Toast
function initContactForm() {
  const form = document.getElementById("contact-portfolio-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Extract input fields
    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const subject = document.getElementById("contact-subject").value.trim();
    const message = document.getElementById("contact-message").value.trim();

    if (!name || !email || !message) {
      showToast("Please fill in all required fields.", true);
      return;
    }

    // Mock send status
    const submitBtn = form.querySelector("button[type='submit']");
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = "Sending Message...";
    submitBtn.disabled = true;

    setTimeout(() => {
      // Clear inputs
      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      
      showToast(`Thank you, ${name}! Your message was successfully sent.`);
    }, 1500);
  });
}

function showToast(message, isError = false) {
  let toast = document.getElementById("portfolio-toast");
  if (!toast) {
    // Dynamically insert toast HTML if missing
    toast = document.createElement("div");
    toast.id = "portfolio-toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <span class="toast-icon">${isError ? '⚠️' : '✓'}</span>
    <span class="toast-msg">${message}</span>
  `;

  if (isError) {
    toast.style.borderLeftColor = "#ff0080";
    toast.querySelector(".toast-icon").style.color = "#ff0080";
  } else {
    toast.style.borderLeftColor = "#00df89";
    toast.querySelector(".toast-icon").style.color = "#00df89";
  }

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}
