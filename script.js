document.addEventListener("DOMContentLoaded", function() {
  // Чекаємо завантаження всього вмісту сторінки
  window.onload = function() {
    // Плавно ховаємо прелоадер
    var preloader = document.getElementById('preloader');
    preloader.classList.add('preloader__hide');
  }
});


// Знаходимо всі кнопки з класом .button__buy
const buttons = document.querySelectorAll('.button__buy');

// Знаходимо елемент #modal
const modal = document.querySelector('#modal');

// Додаємо обробник події кліку на кожну кнопку
buttons.forEach(function(button) {
  button.addEventListener('click', function() {
    // При кліку відкриваємо модальне вікно
    modal.style.display = 'flex';
    modal.style.opacity = '1';
  });
});

// Додаємо обробник події кліку для модального вікна
modal.addEventListener('click', function(event) {
  // Перевіряємо, чи клік відбувся саме по #modal, а не по його вмісту
  if (event.target === modal) {
    // Закриваємо модальне вікно
    modal.style.display = 'none';
  }
});

// Додаємо обробник подій для клавіатурних подій для закриття модального вікна при натисканні Esc
document.addEventListener('keydown', function(event) {
  // Перевіряємо, чи натиснута клавіша є Escape
  if (event.key === 'Escape') {
    // Якщо модальне вікно відкрите, закриваємо його
    if (modal.style.display === 'flex') {
      modal.style.display = 'none';
    }
  }
});

// Знаходимо батьківський елемент, який містить радіо кнопки
const choiceContainer = document.querySelector('.modal__choice');

// Функція для оновлення прихованих полів
function updateHiddenInput(event) {
  // Перевіряємо, чи подія відбулась на радіо-кнопці
  if (event.target.type === 'radio') {
    const name = event.target.name; // Отримуємо ім'я вибраного радіо (payment або service)
    const value = event.target.value; // Отримуємо значення вибраного радіо

    // Оновлюємо відповідне приховане поле у формі
    const hiddenInput = document.querySelector(`#formSubmit input[type="hidden"][id="${name}"]`);
    if (hiddenInput) {
      hiddenInput.value = value;
    }
  }
}

// Додаємо обробник події зміни до контейнера радіо кнопок
choiceContainer.addEventListener('change', updateHiddenInput);


// Отримуємо форму за її ID
const form = document.getElementById('formSubmit');
const submitButton = form.querySelector('input[type="submit"]');

// Функція для обробки відправлення форми
function handleFormSubmit(event) {
  event.preventDefault(); // Запобігаємо стандартній відправці форми

  // Створюємо об'єкт FormData з нашої форми
  const formData = new FormData(form);

  // Відправляємо дані форми на сервер за допомогою fetch API
  fetch(form.action, {
    method: form.method,
    body: formData
  })
  .then(response => response.json()) // Перетворення відповіді від сервера у JSON
  .then(data => {
    // Обробка даних отриманих від сервера
    console.log(data);
    submitButton.value = 'Відправлено';
    submitButton.style.background = '#4CAF50';

    // Розпочинаємо анімацію зникнення
    modal.style.opacity = '0';

    // Після завершення анімації, повністю ховаємо модальне вікно
    setTimeout(() => {
        modal.style.display = 'none';
    }, 1000); // Чекаємо 1 секунду, що відповідає тривалості анімації
  })
  .catch(error => {
    // Обробка помилок, якщо вони виникнуть
    console.error('Error:', error);
    submitButton.value = 'Не працює';

    // Розпочинаємо анімацію зникнення
    modal.style.opacity = '0';

    // Після завершення анімації, повністю ховаємо модальне вікно
    setTimeout(() => {
        modal.style.display = 'none';
    }, 1000); // Чекаємо 1 секунду, що відповідає тривалості анімації
  });
}

// Додавання обробника подій для відправлення форми
form.addEventListener('submit', handleFormSubmit);

// Отримуємо батьківський елемент
const socialContainer = document.querySelector('.contact__social');

// Додаємо обробник події кліку до батьківського елемента
socialContainer.addEventListener('click', function(event) {
  // Перевіряємо, чи клік був зроблений на елементі з класом social__link
  if (event.target.classList.contains('social__link')) {
    // Отримуємо URL із атрибута data-link
    const url = event.target.getAttribute('data-link');
    
    // Відкриваємо нову вкладку з цим URL
    window.open(url, '_blank');
  }
});
