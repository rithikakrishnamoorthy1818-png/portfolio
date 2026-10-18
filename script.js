/* ============================================================
   SCRIPT.JS — swipe navigation, dots, arrows, active-page effects
   ------------------------------------------------------------
   Everything here is vanilla JavaScript (no libraries).
   Read the comments — they explain each block for beginners.
   ============================================================ */

// Grab the elements we need from the page
const deck    = document.getElementById('deck');     // the swipe container
const pages   = Array.from(deck.querySelectorAll('.page')); // all 4 pages
const dots    = Array.from(document.querySelectorAll('.dot'));
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const hint    = document.getElementById('swipeHint');

let current = 0;   // which page we're on right now (0 = home)


/* ------------------------------------------------------------
   goToPage() — scroll the deck so that page `index` is shown.
   Because the deck uses CSS scroll-snap, we only have to
   scroll to the page's left edge and the browser does the rest.
   ------------------------------------------------------------ */
function goToPage(index) {
  // Don't go below 0 or past the last page
  current = Math.max(0, Math.min(index, pages.length - 1));

  pages[current].scrollIntoView({
    behavior: 'smooth',      // dreamy slide
    inline: 'start',         // line up with the left edge
    block: 'nearest'
  });

  updateUI();
}


/* ------------------------------------------------------------
   updateUI() — keep the dots, arrows and animations in sync
   with whichever page is currently visible.
   ------------------------------------------------------------ */
function updateUI() {
  // 1. Dots: move the "active" class
  dots.forEach((dot, i) => dot.classList.toggle('is-active', i === current));

  // 2. Arrows: hide them at the very start / very end
  prevBtn.classList.toggle('is-hidden', current === 0);
  nextBtn.classList.toggle('is-hidden', current === pages.length - 1);

  // 3. Pages: add .is-active so the CSS fade/float-in animation plays.
  //    Also set aria-hidden so screen readers only read the visible page.
  pages.forEach((page, i) => {
    const isActive = i === current;
    page.classList.toggle('is-active', isActive);
    page.setAttribute('aria-hidden', String(!isActive));
  });

  // 4. Hide the swipe hint the first time the user leaves page 1
  if (current > 0 && hint) hint.classList.add('is-hidden');
}


/* ------------------------------------------------------------
   TRACK THE CURRENT PAGE WHILE SWIPING
   The IntersectionObserver watches each page and tells us
   which one is most visible. This catches swipes done by touch,
   trackpad, mouse-drag AND the arrow buttons — one system for all.
   ------------------------------------------------------------ */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      // "isIntersecting" = the page is on screen.
      // "intersectionRatio >= 0.5" = at least half of it is visible.
      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
        current = pages.indexOf(entry.target);
        updateUI();
      }
    });
  },
  { threshold: [0.5] }   // fire when a page is 50%+ visible
);

pages.forEach((page) => observer.observe(page));


/* ------------------------------------------------------------
   KEYBOARD — left/right arrow keys
   ------------------------------------------------------------ */
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    goToPage(current + 1);
  } else if (e.key === 'ArrowLeft') {
    goToPage(current - 1);
  }
});


/* ------------------------------------------------------------
   MOUSE DRAG on desktop
   Phones use touch and laptops use the trackpad automatically,
   but a plain mouse can't swipe — so we emulate it:
   remember where the mouse went down, and if it moved far
   enough to the left/right when released, treat it as a swipe.
   ------------------------------------------------------------ */
let dragStartX = 0;
let isDragging = false;
const DRAG_DISTANCE = 60;   // how far (px) you must drag

deck.addEventListener('mousedown', (e) => {
  isDragging = true;
  dragStartX = e.pageX;
});

deck.addEventListener('mouseup', (e) => {
  if (!isDragging) return;
  isDragging = false;

  const distance = e.pageX - dragStartX;
  if (distance < -DRAG_DISTANCE)      goToPage(current + 1);  // dragged left  → next page
  else if (distance > DRAG_DISTANCE)  goToPage(current - 1);  // dragged right → previous page
});

// Safety net: stop dragging if the mouse leaves the window
deck.addEventListener('mouseleave', () => { isDragging = false; });


/* ------------------------------------------------------------
   DOTS + ARROW BUTTONS
   ------------------------------------------------------------ */
dots.forEach((dot) => {
  dot.addEventListener('click', () => goToPage(Number(dot.dataset.index)));
});

prevBtn.addEventListener('click', () => goToPage(current - 1));
nextBtn.addEventListener('click', () => goToPage(current + 1));


/* ------------------------------------------------------------
   START — mark page 1 as active as soon as the site loads
   ------------------------------------------------------------ */
updateUI();
