/**
 * Web Experience Interactive Elements
 * 
 * This script handles all interactive elements for the web experience,
 * organized by scene for easier maintenance.
 */

document.addEventListener('DOMContentLoaded', () => {
  
  /**
   * ==========================================================================
   * SCENE 1: Interactive Title with Transform Animation
   * ==========================================================================
   */
  initScene1();

  /**
   * ==========================================================================
   * SCENE 4: Rain Effect Animation
   * ==========================================================================
   */
  initScene4();

  /**
   * ==========================================================================
   * SCENE 5: Interactive Draggable Gallery
   * ==========================================================================
   */
  initScene5();

  /**
   * Scene 1 Initialization
   * Handles the interactive title with transform animations
   */
  function initScene1() {
    const scene1 = document.querySelector('.scene-introdution');
    const component = document.getElementById('scene-introdution-component');
    
    // Exit if component doesn't exist
    if (!component || !scene1) return;
    
    const vectors = component.querySelectorAll('.vector-element');
    if (!vectors.length) return;
    
    // Scene 1 state variables
    let isVertical = false;
    let isAnimating = false;
    let hasExpanded = false;

    // Initialize component with entrance animation
    showEntranceAnimation();
    
    // Set up event listeners
    scene1.addEventListener('click', toggleLayout);
    window.addEventListener('scroll', handleScroll);

    /**
     * Shows the entrance animation for the title component
     */
    function showEntranceAnimation() {
      // Show component with delay
      setTimeout(() => {
        component.classList.add('visible');
        
        // Animate each vector with staggered timing
        vectors.forEach((vector, index) => {
          vector.style.opacity = '0';
          vector.style.transform = 'translateY(30px) scale(0.8)';
          
          setTimeout(() => {
            vector.style.opacity = '1';
            vector.style.transform = 'translateY(0) scale(1)';
          }, 100 + (index * 70));
        });
      }, 300);
    }

    /**
     * Toggles between horizontal and vertical layout
     */
    function toggleLayout() {
      if (isAnimating) return;
      isAnimating = true;
      
      if (isVertical) {
        // Switch to horizontal layout
        component.classList.remove('vertical');
        
        // Animate vectors with reversed staggered timing
        vectors.forEach((vector, index) => {
          const delay = 0.4 - (index * 0.05);
          vector.style.transition = `all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s`;
          
          setTimeout(() => {
            vector.style.transform = '';
          }, 50);
        });
      } else {
        // Switch to vertical layout
        component.classList.add('vertical');
        
        // Animate vectors with staggered timing
        vectors.forEach((vector, index) => {
          vector.style.transition = `all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.05}s`;
          
          setTimeout(() => {
            vector.style.transform = 'translateY(10px) rotate(5deg)';
          }, 50);
        });
      }
      
      // Reset animation state after transition completes
      setTimeout(() => {
        isAnimating = false;
        vectors.forEach(vector => {
          vector.style.transition = '';
        });
      }, 1200);
      
      isVertical = !isVertical;
    }

    /**
     * Handles scroll event to expand component
     */
    function handleScroll() {
      if (hasExpanded || !component.classList.contains('visible')) return;
      
      const scrollPosition = window.scrollY;
      const scrollThreshold = scene1.offsetTop + (scene1.offsetHeight * 0.3);
      
      if (scrollPosition > scrollThreshold) {
        component.classList.add('expanded');
        hasExpanded = true;
        
        // Add subtle scale animation for expansion
        vectors.forEach((vector, index) => {
          vector.style.transform = 'scale(1.1)';
          setTimeout(() => {
            vector.style.transform = '';
          }, 600 + (index * 30));
        });
      }
    }
  }

  /**
   * Scene 4 Initialization
   * Handles the rain effect animation
   */
  function initScene4() {
    const scene4 = document.querySelector('.scene-4');
    const rainContainer = document.getElementById('rain-container');
    
    // Exit if elements don't exist
    if (!scene4 || !rainContainer) return;
    
    let rainTriggered = false;
    
    // Set up scroll listener to trigger rain
    window.addEventListener('scroll', checkRainTrigger);
    
    /**
     * Checks if rain should be triggered based on scroll position
     */
    function checkRainTrigger() {
      if (rainTriggered) return;
      
      const scene4Top = scene4.offsetTop;
      const scene4Height = scene4.offsetHeight;
      const scrollPosition = window.scrollY + window.innerHeight;
      
      if (scrollPosition > scene4Top + (scene4Height * 0.3)) {
        triggerRain();
      }
    }
    
    /**
     * Creates and displays the rain effect
     */
    function triggerRain() {
      rainTriggered = true;
      
      createRaindrops();
      rainContainer.classList.add('active');
      
      // After rain effect, change background color
      setTimeout(() => {
        rainContainer.classList.remove('active');
        scene4.classList.add('orange-bg');
        
        // Clean up raindrops
        setTimeout(() => {
          rainContainer.innerHTML = '';
        }, 500);
      }, 3000);
    }
    
    /**
     * Creates the raindrop elements
     */
    function createRaindrops() {
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
  }

  /**
   * Scene 5 Initialization
   * Handles the interactive draggable gallery
   */
  function initScene5() {
    const galleryGrid = document.getElementById('gallery-grid');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const successMessage = document.querySelector('.gallery-success-message');
    
    // Exit if elements don't exist
    if (!galleryGrid || !galleryItems.length) return;
    
    let draggedItem = null;
    
    // Initialize gallery
    setupGallery();
    
    // Enable touch support if needed
    if ('ontouchstart' in window) {
      enableTouchDrag();
    }
    
    /**
     * Sets up the gallery with randomized items and event listeners
     */
    function setupGallery() {
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
        
        // Make the item draggable
        item.setAttribute('draggable', 'true');
      });
    }
    
    /**
     * Drag event handlers
     */
    function handleDragStart(e) {
      draggedItem = this;
      this.classList.add('dragging');
      
      // Set up drag data
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', this.innerHTML);
      
      // Visual feedback
      this.style.transform = 'scale(0.95)';
      this.style.opacity = '0.8';
      
      // Set custom drag image
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
      
      // Check if puzzle is solved
      setTimeout(checkPositions, 300);
    }
    
    function handleDragOver(e) {
      e.preventDefault();
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
      e.stopPropagation();
      
      if (draggedItem !== this) {
        swapItems(draggedItem, this);
      }
      
      this.classList.remove('drag-over');
      return false;
    }
    
    /**
     * Swaps two gallery items with animation
     */
    function swapItems(item1, item2) {
      // Get current positions
      const allItems = Array.from(document.querySelectorAll('.gallery-item'));
      const index1 = allItems.indexOf(item1);
      const index2 = allItems.indexOf(item2);
      
      // Get positions for animation
      const rect1 = item1.getBoundingClientRect();
      const rect2 = item2.getBoundingClientRect();
      
      // Calculate translation distances
      const deltaX1 = rect2.left - rect1.left;
      const deltaY1 = rect2.top - rect1.top;
      const deltaX2 = rect1.left - rect2.left;
      const deltaY2 = rect1.top - rect2.top;
      
      // Apply animation
      [item1, item2].forEach(item => {
        item.style.transition = 'transform 0.3s ease';
      });
      
      item1.style.transform = `translate(${deltaX1}px, ${deltaY1}px)`;
      item2.style.transform = `translate(${deltaX2}px, ${deltaY2}px)`;
      
      // After animation, update DOM
      setTimeout(() => {
        // Reset styles
        [item1, item2].forEach(item => {
          item.style.transition = '';
          item.style.transform = '';
        });
        
        // Perform DOM swap
        swapDOMElements(item1, item2, index1, index2);
      }, 300);
    }
    
    /**
     * Swaps DOM elements
     */
    function swapDOMElements(item1, item2, index1, index2) {
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
    }
    
    /**
     * Checks if all items are in correct position
     */
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
        showSuccessAnimation(currentItems);
      }
    }
    
    /**
     * Shows success animation when puzzle is solved
     */
    function showSuccessAnimation(items) {
      // Animate items disappearing
      items.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('correct');
        }, index * 200);
      });
      
      // Show success message
      setTimeout(() => {
        if (successMessage) {
          successMessage.classList.add('visible');
        }
      }, items.length * 200 + 500);
    }
    
    /**
     * Enables touch support for mobile devices
     */
    function enableTouchDrag() {
      let touchedItem = null;
      let initialX = 0, initialY = 0;
      let currentX = 0, currentY = 0;
      
      // Touch event handlers
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
          
          e.preventDefault();
        }
      }
      
      function touchMove(e) {
        if (!touchedItem) return;
        
        const touch = e.touches[0];
        currentX = touch.clientX;
        currentY = touch.clientY;
        
        // Move the element
        const deltaX = currentX - initialX;
        const deltaY = currentY - initialY;
        touchedItem.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        
        e.preventDefault();
        
        // Handle hover effects
        updateDragOverState(touch);
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
        
        // Swap items if needed
        if (galleryItemBelow && galleryItemBelow !== touchedItem) {
          galleryItemBelow.classList.remove('drag-over');
          swapItems(touchedItem, galleryItemBelow);
        }
        
        // Reset for next interaction
        touchedItem = null;
        initialX = initialY = currentX = currentY = 0;
        
        // Check if puzzle is solved
        setTimeout(checkPositions, 300);
      }
      
      function updateDragOverState(touch) {
        const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
        const galleryItemBelow = elementBelow ? elementBelow.closest('.gallery-item') : null;
        
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
    }
  }
  
  /**
   * Fisher-Yates shuffle algorithm for randomizing arrays
   */
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
});
