# Premier Schools Exhibition Landing Page

A premium, high-performance, and fully responsive desktop-first landing page designed for the Premier Schools Exhibition (PSE) in Gurugram. 

## Project Links

*   **Live Vercel Deployment:** [https://premier-schools-swart.vercel.app/](https://premier-schools-swart.vercel.app/)
*   **GitHub Repository:** [https://github.com/PrabhavRathi06/premier_schools](https://github.com/PrabhavRathi06/premier_schools)

---

## Key Features Implemented

1.  **Header Section (Hanging Logo Layout)**
    *   Figma-accurate hanging logo badge overlay (`top: 3px`, `left: 76px`, `width: 201px`, `height: 157px`).
    *   Flex-aligned navigation bar with a call-to-action "Register Now" button pushed to the far right.
2.  **Hero Section (3-Column Vertical Waterfall Loop)**
    *   Three-column vertical gallery utilizing offset CSS keyframe animations for a seamless loop.
    *   Paused scroll animations on mouse hover and keyboard `:focus-within` for accessibility.
    *   Outfit & Inter typography elements with custom linear golden text gradients (`#FFCC81` to `#E9C79F`).
3.  **Enquire Now Form Card**
    *   An interactive modal card with HTML validation and a responsive success state handler.
    *   Double-block CTA button matching the header theme.
4.  **Trust Statistics Row**
    *   Four custom stats displaying laurel wreaths (`Group 1000004112 (2).png`) centered with Open Sans typography and navy-to-royal-blue linear gradients (`#010E39` to `#0344A2`).
5.  **Participating Schools Marquee**
    *   Alternating double horizontal tracks scrolling from **Right to Left** at offset durations (32s and 36s) for a dynamic layout rhythm.
    *   Cards with sharp corners (`border-radius: 0px`) and borders styled to exact Figma colors (`#e8e7e7`).
    *   Image-error handlers displaying text fallback states for logo cards that haven't loaded yet.
6.  **Choose the School Section**
    *   A 4-column desktop grid stretching to `1720px` width.
    *   Uniform card height of `405px`, rounded card corners (`20px`), hover scale-zoom transitions, and dark background gradient overlays for text readability.
    *   Mobile/Tablet horizontal touch swipe layout with CSS snap points.
7.  **Pre-schedule Appointments Promotion Banner**
    *   A full-bleed, screen-width banner in soft lavender gradient background (`#EAD7FF` to `#DEC1FF`).
    *   Title sized at `64px` and tagline at `32px` styled with gradient fills (`#000E38` to `#3F186A`).
    *   Title lines wrapped in spans to prevent wrapping issues on smaller desktop resolutions.
    *   Seamless CSS edge masking (`mask-image` / `-webkit-mask-image`) on the image container for both desktop and mobile viewports.
8.  **Scroll-Triggered Floating Header**
    *   Slide-down sticky header bar with a custom translucent purple gradient background (`#18093a` to `#0d0426`) and backdrop blur.
    *   Contains the inline square logo (`logo 2.png`) and solid register button, activated on scroll past 150px and hidden at the top.

---

## Technology Stack

*   **Core Structure:** Semantic HTML5
*   **Styling System:** Vanilla CSS3 (utilizing BEM methodology and CSS Custom Properties/Variables)
*   **Interactions:** Vanilla JavaScript (ES6+)

---

## Codebase Structure

```text
├── assets/
│   ├── hero/            # Hero gallery waterfall images
│   ├── logos/           # School logo cards for the marquee
│   ├── stats/           # Statistics badge graphics (wreaths)
│   ├── appointments/    # Event banner imagery
│   └── schools/         # Card background images
├── css/
│   ├── base.css         # Reset rules, custom variables, font imports, focus rings
│   ├── main.css         # Entry style file importing all modular styles
│   └── components/      # Modular stylesheets for each component layout
│       ├── header.css
│       ├── hero.css
│       ├── stats.css
│       ├── marquee.css
│       ├── schools.css
│       └── appointments.css
├── js/
│   ├── main.js          # App bootstrapping, validation, skip links
│   ├── sliders.js       # Carousel class definition
│   └── marquee.js       # Infinite marquee horizontal scroller class
├── index.html           # Main semantic HTML structure
└── README.md            # Repository documentation
```

---

## Running Locally

1.  Clone the repository:
    ```bash
    git clone https://github.com/PrabhavRathi06/premier_schools.git
    ```
2.  Navigate to the project folder:
    ```bash
    cd premier_schools
    ```
3.  Open `index.html` directly in your browser or run a local development server (e.g. VS Code Live Server).
