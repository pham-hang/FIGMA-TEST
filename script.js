document.addEventListener('DOMContentLoaded', () => {
  // Scene 1 - Interactive Component with Ultra-Smooth Transitions
  const scene1 = document.querySelector('.scene-introdution');
  const component = document.getElementById('scene-introdution-component');
  const vectors = component ? component.querySelectorAll('.vector-element') : [];

  // Store original positions for smooth animations
  const vectorPositions = [];

  // Show component with a slight delay after page loads for a nice entrance
  if (component) {
    // Pre-calculate and store original positions
    vectors.forEach((vector) => {
      // Store initial state for later use
      vectorPositions.push({
        element: vector,
        initialTransform: window.getComputedStyle(vector).transform
      });
    });

    setTimeout(() => {
      component.classList.add('visible');

      // Add subtle entrance animation for each vector
      vectors.forEach((vector, index) => {
        vector.style.opacity = '0';
        vector.style.transform = 'translateY(30px) scale(0.8)';

        setTimeout(() => {
          vector.style.opacity = '1';
          vector.style.transform = 'translateY(0) scale(1)';
        }, 100 + (index * 70));
      });
    }, 300);

    let isVertical = false;
    let isAnimating = false;

    if (scene1) {
      // Click event to toggle vertical arrangement with enhanced transition
      scene1.addEventListener('click', () => {
        if (isAnimating) return; // Prevent multiple clicks during animation
        isAnimating = true;

        // Toggle between horizontal and vertical layout
        if (isVertical) {
          // Prepare for horizontal layout
          component.classList.remove('vertical');

          // Animate each vector with precise timing
          vectors.forEach((vector, index) => {
            // Create a unique animation for each vector
            vector.style.transition = `all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.4 - (index * 0.05)}s`;

            // Reset transform to horizontal position with slight delay
            setTimeout(() => {
              vector.style.transform = '';
            }, 50);
          });

          // Reset animation flag after transition completes
          setTimeout(() => {
            isAnimating = false;
            vectors.forEach(vector => {
              vector.style.transition = ''; // Reset to CSS values
            });
          }, 1200);

        } else {
          // Prepare for vertical layout
          component.classList.add('vertical');

          // Animate each vector with staggered timing
          vectors.forEach((vector, index) => {
            // Create a unique animation for each vector
            vector.style.transition = `all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.05}s`;

            // Apply transform with slight delay
            setTimeout(() => {
              vector.style.transform = 'translateY(10px) rotate(5deg)';
            }, 50);
          });

          // Reset animation flag after transition completes
          setTimeout(() => {
            isAnimating = false;
            vectors.forEach(vector => {
              vector.style.transition = ''; // Reset to CSS values
            });
          }, 1200);
        }

        isVertical = !isVertical;
      });

      // Handle scroll to expand component with smoother transition
      let hasExpanded = false;
      window.addEventListener('scroll', () => {
        if (!hasExpanded && component.classList.contains('visible')) {
          const scrollPosition = window.scrollY;
          const scene1Bottom = scene1.offsetTop + scene1.offsetHeight;

          // Expand when scrolled past 30% of scene 1
          if (scrollPosition > scene1.offsetTop + (scene1.offsetHeight * 0.3)) {
            component.classList.add('expanded');
            hasExpanded = true;

            // Add subtle animation for expansion
            vectors.forEach((vector, index) => {
              vector.style.transform = 'scale(1.1)';
              setTimeout(() => {
                vector.style.transform = '';
              }, 600 + (index * 30));
            });
          }
        }
      });
    }
  }

  // Scene 4 - Rain Effect
  const scene4 = document.querySelector('.scene-4');
  const rainContainer = document.getElementById('rain-container');
  let rainTriggered = false;

  function createRaindrops() {
    if (!rainContainer) return;

    const numDrops = 100;
    for (let i = 0; i < numDrops; i++) {
      const drop = document.createElement('div');
      drop.className = 'raindrop';
      drop.style.left = Math.random() * 100 + '%';
      drop.style.animationDuration = (Math.random() * 0.5 + 0.5) + 's';
      drop.style.animationDelay = Math.random() * 2 + 's';
      rainContainer.appendChild(drop);
    }
  }

  function triggerRain() {
    if (rainTriggered || !rainContainer || !scene4) return;
    rainTriggered = true;

    createRaindrops();
    rainContainer.classList.add('active');

    setTimeout(() => {
      rainContainer.classList.remove('active');
      scene4.classList.add('orange-bg');

      setTimeout(() => {
        rainContainer.innerHTML = '';
      }, 500);
    }, 3000);
  }

  window.addEventListener('scroll', () => {
    if (!rainTriggered && scene4) {
      const scene4Top = scene4.offsetTop;
      const scene4Height = scene4.offsetHeight;
      const scrollPosition = window.scrollY + window.innerHeight;

      if (scrollPosition > scene4Top + (scene4Height * 0.3)) {
        triggerRain();
      }
    }
  });

  // Scene 5 - Interactive Draggable Gallery with Direct Swapping
  const galleryGrid = document.getElementById('gallery-grid');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const successMessage = document.querySelector('.gallery-success-message');

  if (galleryGrid && galleryItems.length) {
    // Randomize initial positions
    const itemsArray = Array.from(galleryItems);
    shuffleArray(itemsArray);

    // Clear the grid and append in random order
    galleryGrid.innerHTML = '';
    itemsArray.forEach(item => {
      galleryGrid.appendChild(item);
    });

    // Set up drag and drop for each item
    galleryItems.forEach(item => {
      item.addEventListener('dragstart', handleDragStart);
      item.addEventListener('dragend', handleDragEnd);
      item.addEventListener('dragover', handleDragOver);
      item.addEventListener('dragenter', handleDragEnter);
      item.addEventListener('dragleave', handleDragLeave);
      item.addEventListener('drop', handleDrop);

      // Make the item draggable (not just the image)
      item.setAttribute('draggable', 'true');
    });
  }

  let draggedItem = null;

  function handleDragStart(e) {
    draggedItem = this;
    this.classList.add('dragging');

    // Store the HTML content and position for swapping
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);

    // Add a subtle scale effect
    this.style.transform = 'scale(0.95)';
    this.style.opacity = '0.8';

    // Create a custom ghost image if needed
    const ghostImg = this.querySelector('img');
    if (ghostImg) {
      const rect = ghostImg.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;
      e.dataTransfer.setDragImage(ghostImg, offsetX, offsetY);
    }
  }

  function handleDragEnd() {
    this.classList.remove('dragging');

    // Reset styles
    this.style.transform = '';
    this.style.opacity = '';

    // Check if all items are in correct position
    setTimeout(checkPositions, 300);
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
  }

  function handleDragEnter() {
    this.classList.add('drag-over');
  }

  function handleDragLeave() {
    this.classList.remove('drag-over');
  }

  function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    }

    if (draggedItem !== this) {
      // Direct swap between the two items
      swapItems(draggedItem, this);
    }

    this.classList.remove('drag-over');
    return false;
  }

  // Function to swap two items directly
  function swapItems(item1, item2) {
    if (!galleryGrid) return;

    // Get the current positions in the DOM
    const allItems = Array.from(document.querySelectorAll('.gallery-item'));
    const index1 = allItems.indexOf(item1);
    const index2 = allItems.indexOf(item2);

    // Create a visual swap effect
    const rect1 = item1.getBoundingClientRect();
    const rect2 = item2.getBoundingClientRect();

    // Calculate the translation distances
    const deltaX1 = rect2.left - rect1.left;
    const deltaY1 = rect2.top - rect1.top;
    const deltaX2 = rect1.left - rect2.left;
    const deltaY2 = rect1.top - rect2.top;

    // Apply transition for smooth movement
    item1.style.transition = 'transform 0.3s ease';
    item2.style.transition = 'transform 0.3s ease';

    // Move items to their new positions
    item1.style.transform = `translate(${deltaX1}px, ${deltaY1}px)`;
    item2.style.transform = `translate(${deltaX2}px, ${deltaY2}px)`;

    // After animation completes, update the actual DOM
    setTimeout(() => {
      // Reset transitions and transforms
      item1.style.transition = '';
      item2.style.transition = '';
      item1.style.transform = '';
      item2.style.transform = '';

      // Perform the actual DOM swap
      const nextItem1 = item1.nextElementSibling;
      const nextItem2 = item2.nextElementSibling;

      if (index1 < index2) {
        if (nextItem2) {
          galleryGrid.insertBefore(item1, nextItem2);
        } else {
          galleryGrid.appendChild(item1);
        }
        galleryGrid.insertBefore(item2, nextItem1);
      } else {
        if (nextItem1) {
          galleryGrid.insertBefore(item2, nextItem1);
        } else {
          galleryGrid.appendChild(item2);
        }
        galleryGrid.insertBefore(item1, nextItem2);
      }
    }, 300);
  }

  function checkPositions() {
    const currentItems = document.querySelectorAll('.gallery-item');
    let allCorrect = true;

    currentItems.forEach((item, index) => {
      const correctPosition = parseInt(item.getAttribute('data-correct-position'));
      if (index !== correctPosition) {
        allCorrect = false;
      }
    });

    if (allCorrect) {
      // All items are in correct position, trigger success animation
      currentItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('correct');
        }, index * 200); // Staggered animation
      });

      // Show success message
      setTimeout(() => {
        if (successMessage) {
          successMessage.classList.add('visible');
        }
      }, currentItems.length * 200 + 500);
    }
  }

  // Fisher-Yates shuffle algorithm
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Add touch support for mobile devices
  if ('ontouchstart' in window) {
    enableTouchDrag();
  }

  function enableTouchDrag() {
    let touchedItem = null;
    let initialX = 0;
    let initialY = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener('touchstart', touchStart, { passive: false });
    document.addEventListener('touchmove', touchMove, { passive: false });
    document.addEventListener('touchend', touchEnd, { passive: false });

    function touchStart(e) {
      const touch = e.touches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY);
      const galleryItem = target.closest('.gallery-item');

      if (galleryItem) {
        touchedItem = galleryItem;
        initialX = touch.clientX;
        initialY = touch.clientY;

        touchedItem.classList.add('dragging');
        touchedItem.style.zIndex = '1000';

        // Prevent default to avoid scrolling while dragging
        e.preventDefault();
      }
    }

    function touchMove(e) {
      if (!touchedItem) return;

      const touch = e.touches[0];
      currentX = touch.clientX;
      currentY = touch.clientY;

      // Calculate the distance moved
      const deltaX = currentX - initialX;
      const deltaY = currentY - initialY;

      // Move the element
      touchedItem.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

      // Prevent default to avoid scrolling while dragging
      e.preventDefault();

      // Check if we're over another gallery item
      const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
      const galleryItemBelow = elementBelow.closest('.gallery-item');

      // Reset all items
      document.querySelectorAll('.gallery-item').forEach(item => {
        if (item !== touchedItem) {
          item.classList.remove('drag-over');
        }
      });

      // Highlight the item we're over
      if (galleryItemBelow && galleryItemBelow !== touchedItem) {
        galleryItemBelow.classList.add('drag-over');
      }
    }

    function touchEnd(e) {
      if (!touchedItem) return;

      // Check if we're over another gallery item
      const elementBelow = document.elementFromPoint(currentX, currentY);
      const galleryItemBelow = elementBelow ? elementBelow.closest('.gallery-item') : null;

      // Reset the dragged item
      touchedItem.classList.remove('dragging');
      touchedItem.style.transform = '';
      touchedItem.style.zIndex = '';

      // If we dropped on another gallery item, swap them
      if (galleryItemBelow && galleryItemBelow !== touchedItem) {
        galleryItemBelow.classList.remove('drag-over');
        swapItems(touchedItem, galleryItemBelow);
      }

      // Reset for next interaction
      touchedItem = null;
      initialX = 0;
      initialY = 0;
      currentX = 0;
      currentY = 0;

      // Check if all items are in correct position
      setTimeout(checkPositions, 300);
    }
  }
});
