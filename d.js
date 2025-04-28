(function() {
    // --- Блок инициализации и проверки ---
    console.log('Bookmarklet script starting...');
    alert('скрипт загружен');

    // Предотвращаем повторный запуск, если скрипт уже внедрен
    if (document.getElementById('myInjectedClock') || document.body.dataset.highlighterActive === 'true') {
        console.log('Script or highlighter already active. Exiting.');
        return;
    }
    document.body.dataset.highlighterActive = 'true'; // Флаг активности

    // --- Функциональность часов (из предыдущей версии) ---
    try {
        const clockDiv = document.createElement('div');
        clockDiv.id = 'myInjectedClock';
        clockDiv.style.position = 'fixed';
        clockDiv.style.bottom = '10px';
        clockDiv.style.right = '10px';
        clockDiv.style.padding = '5px 10px';
        clockDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        clockDiv.style.color = 'white';
        clockDiv.style.fontSize = '14px';
        clockDiv.style.fontFamily = 'monospace, sans-serif'; // Моноширинный для красоты
        clockDiv.style.zIndex = '9999';
        clockDiv.style.borderRadius = '3px';
        clockDiv.style.userSelect = 'none';
        clockDiv.style.minWidth = '70px'; // Чтобы не прыгала ширина
        clockDiv.style.textAlign = 'center';
        document.body.appendChild(clockDiv);

        function updateClock() {
            const element = document.getElementById('myInjectedClock');
            if (!element) return; // Если элемент удалили, прекращаем
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            element.textContent = `${hours}:${minutes}:${seconds}`;
        }

        updateClock(); // Показать время сразу
        const clockIntervalId = setInterval(updateClock, 1000); // Обновлять каждую секунду
        console.log('Clock initialized.');
    } catch (error) {
        console.error("Error initializing clock:", error);
    }

    // --- Новая функциональность: Постепенное выделение текста ---
    try {
        console.log('Initializing highlighter...');
        // Целевой элемент для Википедии (основной контент статьи)
        // Используем более конкретный селектор для контента статьи
        const contentArea = document.querySelector('#mw-content-text .mw-parser-output');

        if (!contentArea) {
            console.error('Content area (#mw-content-text .mw-parser-output) not found. Highlighter cannot start.');
            alert('Не удалось найти основной контент статьи для выделения.');
            return;
        } else {
            console.log('Content area found.');
        }

        const charsPerSecond = 4; // Количество символов для выделения в секунду
        const intervalMilliseconds = 1000; // Обновление каждую секунду

        // Используем TreeWalker для эффективного обхода только текстовых узлов
        const walker = document.createTreeWalker(
            contentArea,
            NodeFilter.SHOW_TEXT, // Показывать только текстовые узлы
            { // Фильтр для пропуска пустых или содержащих только пробелы узлов
                acceptNode: function(node) {
                    // Пропускаем текст внутри <script>, <style>, <noscript> тегов (на всякий случай)
                    // и текст внутри уже существующих <mark> (чтобы не выделять повторно)
                    if (node.parentElement.closest('script, style, noscript, mark')) {
                         return NodeFilter.FILTER_REJECT;
                    }
                    // Пропускаем пустые или только пробельные узлы
                    if (!/\S/.test(node.nodeValue)) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return NodeFilter.FILTER_ACCEPT;
                }
            },
            false // Не используем entity references (устарело)
        );

        let currentNode = walker.nextNode(); // Начинаем с первого подходящего текстового узла
        let currentPosition = 0; // Текущая позиция внутри currentNode
        let highlightIntervalId = null;

        function highlightNextCharacters() {
            if (!currentNode) {
                console.log('Highlighting finished: No more text nodes.');
                clearInterval(highlightIntervalId); // Останавливаем интервал
                document.body.removeAttribute('data-highlighter-active'); // Снимаем флаг
                return;
            }

            let charsHighlightedThisTick = 0;
            while (charsHighlightedThisTick < charsPerSecond) {
                 if (!currentNode) { // Если узлы закончились во время цикла
                    console.log('Highlighting finished during tick.');
                    clearInterval(highlightIntervalId);
                    document.body.removeAttribute('data-highlighter-active');
                    return;
                 }

                const text = currentNode.nodeValue;
                const remainingCharsInNode = text.length - currentPosition;

                if (remainingCharsInNode <= 0) {
                    // Текстовый узел закончился, переходим к следующему
                    currentNode = walker.nextNode();
                    currentPosition = 0;
                    continue; // Переходим к следующей итерации while, чтобы обработать новый узел
                }

                // Определяем, сколько символов выделить из текущего узла
                const charsToHighlightNow = Math.min(1, remainingCharsInNode); // Выделяем по одному символу за шаг

                // --- Логика выделения ---
                const textToHighlight = text.substring(currentPosition, currentPosition + charsToHighlightNow);

                // Пропускаем, если это просто пробел (хотя фильтр должен был их убрать, но на всякий)
                if (!/\S/.test(textToHighlight)) {
                    currentPosition += charsToHighlightNow;
                    continue; // Не считаем пробелы за выделенные символы для счетчика charsHighlightedThisTick
                }

                try {
                    // 1. Создаем новый узел <mark>
                    const markElement = document.createElement('mark');
                    markElement.style.backgroundColor = 'yellow'; // Явный стиль, как маркер
                    markElement.textContent = textToHighlight;

                    // 2. Разбиваем текущий текстовый узел
                    const nodeAfterHighlight = currentNode.splitText(currentPosition + charsToHighlightNow); // Текст после выделения
                    const nodeToReplace = currentNode.splitText(currentPosition); // Текст, который нужно заменить на <mark>

                    // 3. Заменяем текстовый узел (nodeToReplace) на <mark>
                    if (nodeToReplace.parentNode) {
                       nodeToReplace.parentNode.replaceChild(markElement, nodeToReplace);
                    }

                    // 4. Устанавливаем currentNode на текст *после* вставленного <mark>
                    currentNode = nodeAfterHighlight;
                    currentPosition = 0; // Позиция в новом узле сбрасывается
                } catch (domError) {
                     console.error("DOM manipulation error during highlighting:", domError, "Current node:", currentNode);
                     // Попытка перейти к следующему узлу, чтобы избежать зависания
                     currentNode = walker.nextNode();
                     currentPosition = 0;
                }
                // --- Конец логики выделения ---

                charsHighlightedThisTick++; // Увеличиваем счетчик выделенных символов в этом тике
            }
            // Плавно прокручиваем страницу к выделенному элементу, если он вне видимости
             const lastMark = contentArea.querySelector('mark:last-of-type');
             if(lastMark) {
                  const rect = lastMark.getBoundingClientRect();
                  if (rect.bottom < 0 || rect.top > window.innerHeight) {
                     lastMark.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
             }
        }

        // Запускаем интервал
        highlightIntervalId = setInterval(highlightNextCharacters, intervalMilliseconds / charsPerSecond); // Интервал между выделениями символов
        console.log(`Highlighter initialized. Highlighting ${charsPerSecond} chars per second.`);

    } catch (error) {
        console.error("Error initializing highlighter:", error);
        document.body.removeAttribute('data-highlighter-active'); // Снимаем флаг при ошибке
    }

    // --- Очистка при закрытии страницы (не всегда срабатывает для букмарклетов) ---
    // window.addEventListener('beforeunload', () => {
    //     if (clockIntervalId) clearInterval(clockIntervalId);
    //     if (highlightIntervalId) clearInterval(highlightIntervalId);
    //     const clock = document.getElementById('myInjectedClock');
    //     if (clock) clock.remove();
    //     // Удаление <mark> тегов сложнее, их много
    //     document.body.removeAttribute('data-highlighter-active');
    //     console.log('Cleanup attempted.');
    // });

})(); // Немедленно вызываем функцию
