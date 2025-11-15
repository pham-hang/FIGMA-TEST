document.addEventListener('DOMContentLoaded', () => {
  // Scene 1 - Interactive Component
  const scene1 = document.querySelector('.scene-introdution');
  const component = document.getElementById('scene-introdution-component');
  const vectors = component ? component.querySelectorAll('.vector-element') : [];
  
  // Show component with a slight delay after page loads for a nice entrance
  if (component) {
    setTimeout(() => {
      component.classList.add('visible');
      
      // Add subtle entrance animation for each vector
      vectors.forEach((vector, index) => {
        vector.style.opacity = '0';
        vector.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
          vector.style.opacity = '1';
          vector.style.transform = 'translateY(0)';
        }, 100 + (index * 50));
      });
    }, 300);
    
    let isVertical = false;

    if (scene1) {
      // Click event to toggle vertical arrangement with enhanced transition
      scene1.addEventListener('click', () => {
        // Toggle between horizontal and vertical layout
        if (isVertical) {
          component.classList.remove('vertical');
          
          // Reset any individual vector animations
          setTimeout(() => {
            vectors.forEach(vector => {
              vector.style.transform = '';
            });
          }, 50);
        } else {
          component.classList.add('vertical');
          
          // Add subtle animations to each vector during transition
          vectors.forEach((vector, index) => {
            setTimeout(() => {
              vector.style.transform = 'rotate(5deg)';
            }, 50 * index);
          });
        }
        isVertical = !isVertical;
      });

      // Handle scroll to expand component with smoother transition
      let hasExpanded = false;
      window.addEventListener('scroll', () => {
        if (!hasExpanded) {
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
      if (index1 < index2) {
        galleryGrid.insertBefore(item2, item1);
        galleryGrid.insertBefore(item1, allItems[index2 + 1]);
      } else {
        galleryGrid.insertBefore(item1, item2);
        galleryGrid.insertBefore(item2, allItems[index1 + 1]);
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
        successMessage.classList.add('visible');
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
});