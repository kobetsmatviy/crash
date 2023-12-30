// Знаходимо всі кнопки з класом .button__buy
const buttons = document.querySelectorAll('.button__buy');

// Знаходимо елемент #modal
const modal = document.querySelector('#modal');

// Додаємо обробник події кліку на кожну кнопку
buttons.forEach(function(button) {
  button.addEventListener('click', function() {
    // При кліку відкриваємо модальне вікно
    modal.style.display = 'flex';
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
    console.log('1');
    const name = event.target.name; // Отримуємо ім'я вибраного радіо (payment або service)
    const value = event.target.value; // Отримуємо значення вибраного радіо
    console.log(name +' / '+ value);

    // Оновлюємо відповідне приховане поле у формі
    const hiddenInput = document.querySelector(`#formSubmit input[type="hidden"][id="${name}"]`);
    if (hiddenInput) {
      hiddenInput.value = value;
    }
  }
}

// Додаємо обробник події зміни до контейнера радіо кнопок
choiceContainer.addEventListener('change', updateHiddenInput);


