/**
 * Infinite Logo Marquee Controller
 */

class LogoMarquee {
  constructor(trackSelector) {
    this.tracks = document.querySelectorAll(trackSelector);
    if (this.tracks.length === 0) return;
    this.init();
  }

  init() {
    this.tracks.forEach(track => {
      // 1. Double the items for seamless infinite scroll
      const children = Array.from(track.children);
      children.forEach(item => {
        const clone = item.cloneNode(true);
        // Ensure cloned items don't disrupt tab order if the original has tab indices
        if (clone.tagName === 'A' || clone.querySelector('a')) {
          clone.setAttribute('tabindex', '-1');
          clone.setAttribute('aria-hidden', 'true');
        }
        track.appendChild(clone);
      });

      // 2. Add keyboard accessibility listeners to parent wrapper
      const wrapper = track.closest('.marquee__row-wrapper');
      if (wrapper) {
        // Pause animation when focused inside (for links or interactive logos)
        wrapper.addEventListener('focusin', () => {
          track.style.animationPlayState = 'paused';
        });

        wrapper.addEventListener('focusout', () => {
          track.style.animationPlayState = 'running';
        });
        
        // Explicitly handle hover in JS as a fallback/robust addition
        wrapper.addEventListener('mouseenter', () => {
          track.style.animationPlayState = 'paused';
        });

        wrapper.addEventListener('mouseleave', () => {
          track.style.animationPlayState = 'running';
        });
      }
    });
  }
}

// Export for main application initialization
window.LogoMarquee = LogoMarquee;
