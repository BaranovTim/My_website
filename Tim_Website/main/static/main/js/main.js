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


var loader = document.querySelector('.preloader'); // Выбираем первый элемент с классом preloader

window.addEventListener('load', function () {
    loader.style.display = 'none'; // Скрываем элемент после загрузки страницы
});

