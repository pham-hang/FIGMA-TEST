document.addEventListener('DOMContentLoaded', () => {
  const scene1 = document.querySelector('.scene-1');
  const component = document.getElementById('scene1-component');

  if (scene1 && component) {
    scene1.addEventListener('click', () => {
      component.classList.add('visible');
    });

    // Handle scroll to expand component
    let hasExpanded = false;
    window.addEventListener('scroll', () => {
      if (!hasExpanded && component.classList.contains('visible')) {
        const scrollPosition = window.scrollY;
        const scene1Bottom = scene1.offsetTop + scene1.offsetHeight;
        
        // Expand when scrolled past 30% of scene 1
        if (scrollPosition > scene1.offsetTop + (scene1.offsetHeight * 0.3)) {
          component.classList.add('expanded');
          hasExpanded = true;
        }
      }
    });
  }

  // Scene 4 rain effect
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
