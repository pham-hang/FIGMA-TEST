document.addEventListener('DOMContentLoaded', () => {
  const scene1 = document.querySelector('.scene-introdution');
  const component = document.getElementById('scene-introdution-component');
  const vectors = component.querySelectorAll('.vector-element');
  
  // Show component with a slight delay after page loads for a nice entrance
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

  if (scene1 && component) {
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

  // Rest of the code for Scene 4 rain effect remains unchanged
  const scene4 = document.querySelector('.scene-4');
  const rainContainer = document.getElementById('rain-container');
  let rainTriggered = false;

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

  function triggerRain() {
    if (rainTriggered) return;
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
});
