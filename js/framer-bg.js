/**
 * Framer-Motion Style Background Canvas, Spring Scroll Reveal, Collapsible Content Panels & Sidebar Toggle Event Handler
 * Modern Minimalist UI for AWS Workshop Template
 */

(function () {
  'use strict';

  // --- Helper: Detect current page language (vi vs en) ---
  function getLanguage() {
    const langAttr = document.documentElement.getAttribute('lang') || '';
    if (langAttr.toLowerCase().startsWith('vi')) return 'vi';
    if (window.location.pathname.includes('/vi/')) return 'vi';
    return 'en';
  }

  // --- 1. Ambient Dynamic Particle Canvas ---
  function initBackgroundCanvas() {
    const canvas = document.getElementById('framer-bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height, dpr;
    let particles = [];
    let mouse = { x: null, y: null, radius: 180 };

    function resize() {
      dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.scale(dpr, dpr);
      createParticles();
    }

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.8 + 1.2;
        this.baseAlpha = Math.random() * 0.25 + 0.1;
        this.alpha = this.baseAlpha;
        const colors = ['72, 129, 205', '90, 154, 241', '253, 152, 39'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.alpha = Math.min(0.65, this.baseAlpha + force * 0.4);
            this.x -= (dx / dist) * force * 0.8;
            this.y -= (dy / dist) * force * 0.8;
          } else {
            this.alpha += (this.baseAlpha - this.alpha) * 0.05;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${this.color}, 0.4)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    function createParticles() {
      particles = [];
      const count = Math.min(Math.floor((width * height) / 18000), 50);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    }

    function connectParticles() {
      const maxDistance = 140;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(72, 129, 205, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      connectParticles();
      requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    resize();
    animate();
  }

  // --- 2. Scroll Reveal Animations ---
  function initScrollReveal() {
    const selector = '#body-inner > h1, #body-inner > h2, #body-inner > h3, #body-inner > p, #body-inner > ul, #body-inner > ol, #body-inner > .notices, #body-inner > pre, #body-inner > table, #body-inner > .collapsible-content-panel';
    const elements = document.querySelectorAll(selector);

    if (!('IntersectionObserver' in window)) {
      elements.forEach(el => el.classList.add('framer-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('framer-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    elements.forEach((el, index) => {
      el.classList.add('framer-reveal');
      const delay = Math.min((index % 6) * 0.04, 0.25);
      el.style.transitionDelay = `${delay}s`;
      observer.observe(el);
    });
  }

  // --- 3. Collapsible Content / TOC Panel Enhancements with i18n Multilingual Support ---
  function initCollapsiblePanels() {
    const bodyInner = document.getElementById('body-inner');
    if (!bodyInner) return;

    const isVi = getLanguage() === 'vi';
    const txtCollapse = isVi ? 'Thu gọn' : 'Collapse';
    const txtExpand = isVi ? 'Mở rộng' : 'Expand';

    const headings = bodyInner.querySelectorAll('h1, h2, h3, h4, h5');
    
    headings.forEach((heading) => {
      const text = heading.textContent.trim().toLowerCase();
      if (text.includes('content') || text.includes('mục lục') || text.includes('report contents')) {
        let next = heading.nextElementSibling;
        const targets = [];

        while (next && (next.tagName === 'OL' || next.tagName === 'UL' || next.classList.contains('children') || next.classList.contains('children-shortcode'))) {
          targets.push(next);
          next = next.nextElementSibling;
        }

        if (targets.length > 0) {
          const panel = document.createElement('div');
          panel.className = 'collapsible-content-panel';

          const header = document.createElement('div');
          header.className = 'collapsible-header';
          header.innerHTML = `
            <div class="collapsible-title">
              <i class="fas fa-list-ul"></i>
              <span>${heading.textContent}</span>
            </div>
            <div class="collapsible-toggle-badge">
              <span class="badge-text">${txtCollapse}</span>
              <i class="fas fa-chevron-down collapsible-icon-arrow"></i>
            </div>
          `;

          const body = document.createElement('div');
          body.className = 'collapsible-body';

          targets.forEach(target => body.appendChild(target));

          heading.parentNode.insertBefore(panel, heading);
          heading.remove();
          panel.appendChild(header);
          panel.appendChild(body);

          header.addEventListener('click', () => {
            const isCollapsed = panel.classList.toggle('collapsed');
            const badgeText = header.querySelector('.badge-text');
            if (badgeText) {
              badgeText.textContent = isCollapsed ? txtExpand : txtCollapse;
            }
          });
        }
      }
    });
  }

  // --- 4. Robust Sidebar Collapse / Expand Event Handler with i18n ---
  function initSidebarToggleEvents() {
    const isVi = getLanguage() === 'vi';
    const toggleSelectors = '[data-sidebar-toggle], #sidebar-toggle, #sidebar-toggle-btn, #sidebar-expand-float-btn';

    // Update titles for multilingual support
    const sidebarBtn = document.getElementById('sidebar-toggle-btn');
    if (sidebarBtn) {
      sidebarBtn.title = isVi ? 'Thu / Phóng Sidebar' : 'Toggle Sidebar';
    }

    const expandFloatBtn = document.getElementById('sidebar-expand-float-btn');
    if (expandFloatBtn) {
      expandFloatBtn.title = isVi ? 'Mở rộng Sidebar' : 'Expand Sidebar';
    }

    document.addEventListener('click', (e) => {
      const btn = e.target.closest(toggleSelectors);
      if (btn) {
        e.preventDefault();
        e.stopPropagation();
        document.body.classList.toggle('sidebar-hidden');
        const isHidden = document.body.classList.contains('sidebar-hidden');
        try {
          localStorage.setItem('hugo_sidebar_hidden', isHidden ? 'true' : 'false');
        } catch (err) {}
      }
    });

    try {
      if (localStorage.getItem('hugo_sidebar_hidden') === 'true') {
        document.body.classList.add('sidebar-hidden');
      }
    } catch (err) {}
  }

  // --- 5. Interactive Springs ---
  function initInteractiveSprings() {
    const cards = document.querySelectorAll('.notices, #navigation a, #sidebar ul.topics li a');
    
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }

  // Initialize
  function initAll() {
    initBackgroundCanvas();
    initCollapsiblePanels();
    initScrollReveal();
    initSidebarToggleEvents();
    initInteractiveSprings();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
