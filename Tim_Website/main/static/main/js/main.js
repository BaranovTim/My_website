const hamburger = document.querySelector('.hamburger');
const navBar = document.querySelector('.nav-bar');
const navLinks = document.querySelectorAll('.nav-bar ul li a'); // Все ссылки

navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        // Удаляем класс 'active' со всех ссылок
        navLinks.forEach((l) => l.classList.remove('active'));

        // Добавляем класс 'active' только на нажатую ссылку
        event.target.classList.add('active');

        // Закрываем меню
        navBar.classList.remove('active');
        hamburger.classList.remove('open');
    });
});
// Открытие/закрытие меню при клике на гамбургер
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navBar.classList.toggle('active');
});

// Закрытие меню при прокрутке страницы
window.addEventListener('scroll', () => {
    if (navBar.classList.contains('active')) {
        navBar.classList.remove('active');
        hamburger.classList.remove('open');
    }
});

// Закрытие меню при клике на ссылку (li > a)
navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        navBar.classList.remove('active'); // Закрываем меню
        hamburger.classList.remove('open'); // Возвращаем линии гамбургера
    });
});

// Закрытие меню при клике вне гамбургера и меню
document.addEventListener('click', (event) => {
    if (
        !hamburger.contains(event.target) && // Если клик не по гамбургеру
        !navBar.contains(event.target)       // И не по меню
    ) {
        navBar.classList.remove('active');
        hamburger.classList.remove('open');
    }
});


document.addEventListener('DOMContentLoaded', () => {
    // Watch the grey track, not the bar itself. The bar starts moved fully
    // out of its track (translateX(-100%)), and Safari on iPhone does not count
    // that hidden bar as "on screen", so it never appeared there.
    const progressTracks = document.querySelectorAll('.progress');

    const observer_bars = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const bar = entry.target.querySelector('.progress-bar');
            if (!bar) return;
            if (entry.isIntersecting) {
                bar.classList.add('appear-animation--short');
            } else {
                bar.classList.remove('appear-animation--short');
            }
        });
    });

    progressTracks.forEach(track => observer_bars.observe(track));

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
  // stop any demo video when its pop-up closes
  modal.querySelectorAll('video').forEach(video => video.pause());
  console.log('Modal closed:', modal); // Диагностика
}


// ===== MLE @ Anthropic tracker =====
// The big number is the weighted sum of the milestones' data-progress values.
// To update the tracker, change data-progress (0-100) on a milestone in index.html.
(function () {
    const tracker = document.getElementById('mle-tracker');
    if (!tracker) return;

    const items = Array.from(tracker.querySelectorAll('.ms'));
    let totalWeight = 0;
    let done = 0;

    items.forEach(item => {
        const weight = parseFloat(item.dataset.weight) || 0;
        const progress = Math.max(0, Math.min(100, parseFloat(item.dataset.progress) || 0));
        totalWeight += weight;
        done += weight * progress / 100;

        item.classList.add(progress >= 100 ? 'is-done' : progress > 0 ? 'is-active' : 'is-todo');
        const bar = item.querySelector('.ms-bar');
        if (bar) bar.dataset.pct = progress + '%';
    });

    const percent = totalWeight ? Math.round(done / totalWeight * 100) : 0;
    const numberEl = tracker.querySelector('.tracker-percent');
    const fillEl = tracker.querySelector('.tracker-fill');

    const run = () => {
        if (fillEl) fillEl.style.width = percent + '%';
        items.forEach(item => {
            const fill = item.querySelector('.ms-bar i');
            if (fill) fill.style.width = Math.min(100, parseFloat(item.dataset.progress) || 0) + '%';
        });
        if (!numberEl) return;
        const start = performance.now();
        const duration = 1600;
        const step = now => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            numberEl.textContent = Math.round(percent * eased);
            if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };

    if ('IntersectionObserver' in window) {
        const watcher = new IntersectionObserver(entries => {
            if (entries.some(e => e.isIntersecting)) {
                run();
                watcher.disconnect();
            }
        }, { threshold: 0.25 });
        watcher.observe(tracker);
    } else {
        run();
    }
})();
