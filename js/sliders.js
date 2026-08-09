/**
 * Vanilla JavaScript Slider Systems
 */

class DualAxisSlider {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.slides = Array.from(this.container.querySelectorAll('[role="slide"]'));
    if (this.slides.length === 0) return;

    this.currentIndex = 0;
    this.isPlaying = false;
    this.timer = null;
    
    // Configurations
    this.autoplayInterval = options.autoplayInterval || 5000;
    this.autoplayEnabled = options.autoplay !== false;
    
    // Touch tracking variables
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchEndX = 0;
    this.touchEndY = 0;
    this.swipeThreshold = 50; // px
    
    this.init();
  }

  init() {
    this.setupAccessibility();
    this.updateSlideStates('init');
    this.bindEvents();
    
    if (this.autoplayEnabled) {
      this.startAutoplay();
    }
  }

  setupAccessibility() {
    this.container.setAttribute('role', 'region');
    this.container.setAttribute('aria-roledescription', 'carousel');
    
    this.slides.forEach((slide, idx) => {
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-label', `${idx + 1} of ${this.slides.length}`);
    });
  }

  bindEvents() {
    // Navigation arrows if present
    const prevBtn = this.container.querySelector('.hero__slider-btn--prev');
    const nextBtn = this.container.querySelector('.hero__slider-btn--next');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        this.navigate('prev', 'horizontal');
        this.resetAutoplay();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.navigate('next', 'horizontal');
        this.resetAutoplay();
      });
    }

    // Keyboard support
    this.container.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.navigate('prev', 'horizontal');
        this.resetAutoplay();
        e.preventDefault();
      } else if (e.key === 'ArrowRight') {
        this.navigate('next', 'horizontal');
        this.resetAutoplay();
        e.preventDefault();
      } else if (e.key === 'ArrowUp') {
        this.navigate('prev', 'vertical');
        this.resetAutoplay();
        e.preventDefault();
      } else if (e.key === 'ArrowDown') {
        this.navigate('next', 'vertical');
        this.resetAutoplay();
        e.preventDefault();
      }
    });

    // Pause on Hover
    this.container.addEventListener('mouseenter', () => this.stopAutoplay());
    this.container.addEventListener('mouseleave', () => {
      if (this.autoplayEnabled) this.startAutoplay();
    });

    // Pause on Focus (accessibility)
    this.container.addEventListener('focusin', () => this.stopAutoplay());
    this.container.addEventListener('focusout', () => {
      if (this.autoplayEnabled) this.startAutoplay();
    });

    // Touch Swipe gestures
    this.container.addEventListener('touchstart', (e) => {
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
    }, { passive: true });

    this.container.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].clientX;
      this.touchEndY = e.changedTouches[0].clientY;
      this.handleSwipe();
    }, { passive: true });
  }

  handleSwipe() {
    const deltaX = this.touchEndX - this.touchStartX;
    const deltaY = this.touchEndY - this.touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (Math.abs(deltaX) > this.swipeThreshold) {
        if (deltaX > 0) {
          this.navigate('prev', 'horizontal');
        } else {
          this.navigate('next', 'horizontal');
        }
        this.resetAutoplay();
      }
    } else {
      // Vertical swipe
      if (Math.abs(deltaY) > this.swipeThreshold) {
        if (deltaY > 0) {
          this.navigate('prev', 'vertical');
        } else {
          this.navigate('next', 'vertical');
        }
        this.resetAutoplay();
      }
    }
  }

  navigate(direction, axis = 'horizontal') {
    let nextIndex = this.currentIndex;
    if (direction === 'next') {
      nextIndex = (this.currentIndex + 1) % this.slides.length;
    } else if (direction === 'prev') {
      nextIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    }

    if (nextIndex === this.currentIndex) return;

    this.transitionSlides(this.currentIndex, nextIndex, direction, axis);
    this.currentIndex = nextIndex;
  }

  transitionSlides(oldIdx, newIdx, direction, axis) {
    const activeClass = 'hero__slide--active';
    const oldSlide = this.slides[oldIdx];
    const newSlide = this.slides[newIdx];

    // Remove existing transition classes to reset state
    this.slides.forEach(slide => {
      slide.classList.remove(
        activeClass, 
        'slide-out-left', 'slide-out-right', 'slide-out-up', 'slide-out-down',
        'slide-in-left', 'slide-in-right', 'slide-in-up', 'slide-in-down'
      );
    });

    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      newSlide.classList.add(activeClass);
      this.updateSlideStates();
      return;
    }

    // Determine direction modifier classes
    if (axis === 'horizontal') {
      if (direction === 'next') {
        oldSlide.classList.add('slide-out-left');
        newSlide.classList.add('slide-in-right', activeClass);
      } else {
        oldSlide.classList.add('slide-out-right');
        newSlide.classList.add('slide-in-left', activeClass);
      }
    } else { // vertical
      if (direction === 'next') {
        oldSlide.classList.add('slide-out-up');
        newSlide.classList.add('slide-in-down', activeClass);
      } else {
        oldSlide.classList.add('slide-out-down');
        newSlide.classList.add('slide-in-up', activeClass);
      }
    }

    this.updateSlideStates();
  }

  updateSlideStates(mode = 'run') {
    this.slides.forEach((slide, idx) => {
      if (idx === this.currentIndex) {
        slide.setAttribute('aria-hidden', 'false');
        slide.setAttribute('tabindex', '0');
        if (mode === 'init') {
          slide.classList.add('hero__slide--active');
        }
      } else {
        slide.setAttribute('aria-hidden', 'true');
        slide.setAttribute('tabindex', '-1');
      }
    });
  }

  startAutoplay() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.timer = setInterval(() => {
      // Autoplay alternating horizontal and vertical for rich visuals
      const axis = Math.random() > 0.5 ? 'horizontal' : 'vertical';
      this.navigate('next', axis);
    }, this.autoplayInterval);
  }

  stopAutoplay() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    clearInterval(this.timer);
  }

  resetAutoplay() {
    if (this.autoplayEnabled) {
      this.stopAutoplay();
      this.startAutoplay();
    }
  }
}

// Export classes for main application
window.DualAxisSlider = DualAxisSlider;
