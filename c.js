(function() {
    // Используем IIFE (Immediately Invoked Function Expression)
    // чтобы не загрязнять глобальное пространство имен страницы

    // 1. Показываем уведомление о загрузке
    alert('скрипт загружен');

    // 2. Создаем элемент для часов
    var clockDiv = document.createElement('div');
    clockDiv.id = 'myInjectedClock'; // Дадим ID на всякий случай

    // 3. Стилизуем элемент часов
    clockDiv.style.position = 'fixed';       // Фиксированное позиционирование
    clockDiv.style.bottom = '10px';          // Отступ снизу
    clockDiv.style.right = '10px';           // Отступ справа
    clockDiv.style.padding = '5px 10px';     // Внутренние отступы
    clockDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'; // Полупрозрачный черный фон
    clockDiv.style.color = 'white';          // Белый цвет текста
    clockDiv.style.fontSize = '14px';        // Размер шрифта
    clockDiv.style.fontFamily = 'Arial, sans-serif'; // Шрифт
    clockDiv.style.zIndex = '9999';          // Поверх большинства элементов
    clockDiv.style.borderRadius = '3px';     // Скругление углов
    clockDiv.style.userSelect = 'none';      // Запретить выделение текста часов

    // 4. Добавляем элемент на страницу
    document.body.appendChild(clockDiv);

    // 5. Функция обновления времени
    function updateClock() {
        var now = new Date();
        var hours = String(now.getHours()).padStart(2, '0');
        var minutes = String(now.getMinutes()).padStart(2, '0');
        var seconds = String(now.getSeconds()).padStart(2, '0');
        // Обновляем текст внутри нашего div'а
        // Проверяем, существует ли еще элемент (на случай, если его удалили вручную/другим скриптом)
        var element = document.getElementById('myInjectedClock');
        if (element) {
            element.textContent = hours + ':' + minutes + ':' + seconds;
        }
    }

    // 6. Запускаем обновление каждую секунду (1000 мс) и сразу показываем время
    updateClock(); // Показать время сразу
    setInterval(updateClock, 1000); // Обновлять каждую секунду

    console.log('Скрипт часов успешно внедрен и запущен.');

})(); // Немедленно вызываем функцию
