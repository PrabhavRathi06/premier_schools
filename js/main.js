/**
 * Main Application Bootstrapper
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Skip Link listener (ensures focus moves correctly to main content)
  const skipLink = document.querySelector('.skip-link');
  if (skipLink) {
    skipLink.addEventListener('click', (e) => {
      const target = document.querySelector(skipLink.getAttribute('href'));
      if (target) {
        target.setAttribute('tabindex', '-1');
        target.focus();
      }
    });
  }

  // 1. Hero Gallery Waterfall is powered directly by performance CSS keyframes (see hero.css)

  // 2. Initialize School Logos Marquee
  const logoMarquee = new window.LogoMarquee('.marquee__track');

  // 2b. Initialize Exhibition Highlights Slider
  const exhibitionSlider = new window.ExhibitionSlider(
    'exhibition-slider',
    'exhibition-track',
    'exhibition-prev',
    'exhibition-next'
  );

  // 3. Handle Enquire Now Form Submission
  const enquireForm = document.getElementById('enquire-form');
  if (enquireForm) {
    enquireForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const parentName = document.getElementById('parent-name').value.trim();
      const phoneNumber = document.getElementById('phone-number').value.trim();
      const grade = document.getElementById('grade-select').value;

      // Simple Validation
      if (!parentName || !phoneNumber || !grade) {
        alert('Please fill out all fields.');
        return;
      }

      // Display visual success state
      const formContainer = enquireForm.parentElement;
      formContainer.innerHTML = `
        <div class="hero__form-success" style="text-align: center; color: var(--color-white); padding: var(--spacing-xl) 0;">
          <h3 style="color: var(--color-accent); font-size: 1.5rem; margin-bottom: var(--spacing-md); font-family: var(--font-heading);">Submission Successful!</h3>
          <p style="font-size: 0.95rem;">Thank you for your interest, <strong>${parentName}</strong>. Our admissions counselor will contact you shortly at <strong>${phoneNumber}</strong>.</p>
        </div>
      `;
    });
  }

  // 4. Scroll-Triggered Sticky Header controller
  const stickyHeader = document.getElementById('header-sticky');
  if (stickyHeader) {
    window.addEventListener('scroll', () => {
      // Slide down sticky header when scroll is past 150px
      if (window.scrollY > 150) {
        stickyHeader.classList.add('header-sticky--active');
        stickyHeader.setAttribute('aria-hidden', 'false');
      } else {
        stickyHeader.classList.remove('header-sticky--active');
        stickyHeader.setAttribute('aria-hidden', 'true');
      }
    });
  }
});
