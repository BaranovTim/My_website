document.addEventListener('DOMContentLoaded', () => {
    const progressBars = document.querySelectorAll('.progress-bar');

    const observer_bars = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear-animation--short');
            } else {
                entry.target.classList.remove('appear-animation--short');
            }
        });
    });

    progressBars.forEach(bar => observer_bars.observe(bar));

    const appear = document.querySelector('.appear');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                appear.classList.add('appear-animation--long');
                observer.unobserve(appear); // Stop observing after the animation is added
            }
        });
    });

    // Start observing the element
    observer.observe(appear);

    const works = document.querySelectorAll('.intro_works');

    const works_reader = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear-animation');
            } else {
                entry.target.classList.remove('appear-animation');
            }
        });
    });
    works.forEach(bar => works_reader.observe(bar));

    const counters = document.querySelectorAll('.fun_num');

    // Создаем один общий IntersectionObserver
    const fun_reader = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target'); // Целевое значение
                const duration = 2000; // Длительность анимации (мс)
                const increment = target / (duration / 16); // Шаг увеличения (~16ms на кадр)

                let currentValue = 0;

                const updateCounter = () => {
                    currentValue += increment;

                    if (currentValue < target) {
                        counter.textContent = Math.floor(currentValue);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target; // Финальное значение
                        fun_reader.unobserve(counter); // Прекращаем наблюдение за элементом
                    }
                };

                updateCounter();
            }
        });
    });

    // Наблюдаем за каждым элементом
    counters.forEach(counter => fun_reader.observe(counter));


});

hamburger = document.querySelector('.hamburger');
hamburger.onclick = function () {
    navBar = document.querySelector('.nav-bar');
    navBar.classList.toggle('active');
};

// Закрытие меню при нажатии на ссылку
document.querySelectorAll('.nav-bar a').forEach(link => {
    link.onclick = function () {
        navBar.classList.remove('active'); // Удаляем класс 'active', чтобы закрыть меню
    };
});

window.onload = function () {
    const preloader = document.querySelector('.preloader');
    const startTime = performance.now(); // Время начала загрузки

    // Минимальное время показа прелоадера (в миллисекундах)
    const minDisplayTime = 800;

    // Убираем прелоадер после загрузки сайта, но не раньше 1.5 сек
    const hidePreloader = () => {
        const elapsedTime = performance.now() - startTime;
        const remainingTime = Math.max(0, minDisplayTime - elapsedTime);

        setTimeout(() => {
            preloader.style.transition = 'opacity 0.5s ease';
            preloader.style.opacity = 0;

            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500); // Задержка для плавного скрытия
        }, remainingTime);
    };

    hidePreloader();
};


const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(img => {
  img.addEventListener('click', () => {
    const modal = document.querySelector(img.dataset.modalTarget)
    openModal(modal)
  })
})

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.active-modal')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.active-modal')
    closeModal(modal)
  })
})

function openModal(modal) {
  if (modal == null) {
    console.error('Modal not found');
    return;
  }
  modal.classList.remove('modal')
  modal.classList.add('active-modal');
  overlay.classList.add('active-overlay');
  console.log('Modal opened:', modal); // Диагностика
}

function closeModal(modal) {
  if (modal == null) {
    console.error('Modal not found');
    return;
  }
  modal.classList.add('modal')
  modal.classList.remove('active-modal');
  overlay.classList.remove('active-overlay');
  console.log('Modal closed:', modal); // Диагностика
}
