// == Производственный Помощник v2.0 ==
// Назначение: Расширенный интерфейс для статистики, отслеживания и автоматизации
//             рабочих процессов на предприятии.
// Внедрение: Скопируйте весь этот код и вставьте в консоль разработчика (F12)
//            на целевой странице.
// Автор: Ваш ИИ-ассистент и Вы
// --------------------------------------

(function() {
    'use strict';

    // --- ------------------------------------------------------------------- ---
    // --- --------- НАСТРОЙКИ СКРИПТА (Все можно настроить здесь) ---------- ---
    // --- ------------------------------------------------------------------- ---
    const CONFIG = {
        // --- Общие UI и Стили ---
        UI_CONTAINER_ID: 'productionHelperUI_v2',
        UI_BOTTOM_OFFSET: '10px',
        UI_RIGHT_OFFSET: '10px',
        UI_WIDTH_PERCENT_VIEWPORT: 75,      // Ширина основного UI в % от ширины окна (было 70)
        UI_HEIGHT_PERCENT_VIEWPORT: 22,     // Высота UI в % (было 18, увеличил для новых эл-тов)
        UI_MIN_HEIGHT_PX: 180,              // Минимальная высота UI (было 120)
        UI_BACKGROUND_COLOR: 'rgba(30, 35, 45, 0.8)', // Темно-сине-серый, чуть прозрачнее
        UI_TEXT_COLOR: 'rgba(230, 230, 240, 0.9)',
        UI_BORDER_COLOR: 'rgba(80, 120, 220, 0.8)',
        FONT_FAMILY: '"Segoe UI", Roboto, Arial, sans-serif',
        CLICKER_BUTTON_COLOR: 'rgba(255, 100, 0, 0.85)', // Оранжевый для "плюса"
        DECREMENT_BUTTON_COLOR: 'rgba(200, 60, 60, 0.8)', // Красный для "минуса"
        MAIN_ACCENT_COLOR: 'rgba(255, 160, 0, 0.9)',      // Акцентный цвет (оранжевый)

        // --- Кнопка Свернуть/Развернуть ---
        EMERGENCY_HIDE_BUTTON_TEXT: 'СКРЫТЬ ЭТУ ПАНЕЛЬ!', // Как на картинке
        EMERGENCY_SHOW_BUTTON_TEXT: '🛠️',
        EMERGENCY_SHOW_BUTTON_SIZE: '30px',
        EMERGENCY_SHOW_BUTTON_OPACITY: 0.3,

        // --- Кликер и Счетчик ---
        MAIN_COUNTER_INPUT_ID: 'mainProdCounterInput',   // Теперь это input
        CLICKER_INCREMENT_BUTTON_ID: 'incrementProdBtn',
        CLICKER_DECREMENT_BUTTON_ID: 'decrementProdBtn', // Новая кнопка
        INCREMENT_KEYBOARD_SHORTCUT: 'PageDown',         // Клавиша для +1

        // --- Часы (внутри UI) ---
        CLOCK_DISPLAY_ID: 'prodRealTimeClock_v2',

        // --- Настройки Смены ---
        DEFAULT_DAY_SHIFT_START_TIME: '07:15',
        DEFAULT_NIGHT_SHIFT_START_TIME: '19:15', // Для ночных смен, если авто-определение
        SETTINGS_SHIFT_TYPE_SELECT_ID: 'shiftTypeSelect_v2',
        SETTINGS_SHIFT_START_TIME_INPUT_ID: 'shiftStartTimeInput_v2',

        // --- Настройки Обеда ---
        SETTINGS_LUNCH_TIME_SELECT_ID: 'lunchTimeSelect_v2',
        DEFAULT_LUNCH_OPTIONS: [ // Обед всегда есть, первый в списке будет по умолчанию
            { text: "Обед 1 (10:30-11:00)", start: "10:30", end: "11:00" },
            { text: "Обед 2 (11:00-11:30)", start: "11:00", end: "11:30" },
            { text: "Обед 3 (11:30-12:00)", start: "11:30", end: "12:00" },
            { text: "Обед 4 (12:00-12:30)", start: "12:00", end: "12:30" },
            { text: "Обед Ночь (22:30-23:00)", start: "22:30", end: "23:00" },
            { text: "Другой (указать в коде)" , start: "00:00", end: "00:00"}, // можно переопределить
        ],
        DEFAULT_LUNCH_INDEX: 0, // Индекс обеда по умолчанию из списка выше

        // --- Отображение Статистики ---
        STATS_TEXT_SUMMARY_ID: 'prodStatsSummary_v2',    // Общий блок для текстовой статистики
        STATS_UPDATE_INTERVAL_MS: 5000,      // Обновление статистики и графика

        // --- График Прогресса за Смену ---
        SHIFT_PROGRESS_GRAPH_ID: 'shiftProgressGraph_v2',
        SHIFT_PROGRESS_GRAPH_HEIGHT_PX: 80, // Увеличил высоту для лучшей читаемости
        GRAPH_LINE_COLOR: 'rgba(255, 165, 0, 0.9)',       // Цвет линии фактических данных
        GRAPH_TARGET_RATE_LINES: [                        // Целевые линии производительности (предметов/час)
            { rate: 10, color: 'rgba(100, 100, 255, 0.5)', label: '10/ч' },
            { rate: 20, color: 'rgba(100, 200, 100, 0.5)', label: '20/ч' },
            { rate: 30, color: 'rgba(255, 100, 100, 0.5)', label: '30/ч' }
        ],
        GRAPH_X_AXIS_TIME_MARKERS_COUNT: 6, // Примерное кол-во временных меток на оси X

        // --- Авто-Кликер по Триггеру ---
        AUTO_CLICK_TRIGGER_WORD: 'MOgoskury',             // Ключевое слово (чувствительно к регистру)
        TRIGGER_OBSERVE_AREA_SELECTOR: 'body',            // Селектор элемента, где искать триггерное слово. 'body' - вся страница.
                                                          // Можно сузить до конкретного контейнера: 'div#operationResultDisplay'
        AUTO_CLICK_ENABLED_CHECKBOX_ID: 'autoClickEnabled_v2',

        // --- Поле для Заметок с Историей ---
        NOTES_INPUT_ID: 'prodNotesInput_v2',
        NOTES_HISTORY_DISPLAY_ID: 'prodNotesHistory_v2',
        MAX_NOTES_HISTORY_ITEMS: 15,

        // --- Хранилище Настроек ---
        STORAGE_KEY_PREFIX: 'prodHelper_data_v2.1_',
        USE_SESSION_STORAGE: true, // true = sessionStorage (очистка при закрытии браузера), false = localStorage

        // --- UI Блокировка и Панель Настроек ---
        LOCK_UI_BUTTON_TEXT_UNLOCKED: '🔓 Блок. UI',
        LOCK_UI_BUTTON_TEXT_LOCKED: '🔒 Разблок.',
        SETTINGS_PANEL_ID: 'prodHelperSettingsPanel_v2',
        TOGGLE_SETTINGS_BUTTON_TEXT_CLOSED: 'НАСТРОЙКИ ⚙️', // Как на картинке
        TOGGLE_SETTINGS_BUTTON_TEXT_OPENED: 'НАСТРОЙКИ ◀',

        DEBUG_MODE: true, // Включить/выключить доп. логи в консоль
    };

    // --- ------------------------------------------------------------------- ---
    // --- --------- СОСТОЯНИЕ СКРИПТА (Не изменять напрямую извне) ---------- ---
    // --- ------------------------------------------------------------------- ---
    const state = {
        uiVisible: true,
        uiLocked: false,
        settingsPanelVisible: false,
        totalClicks: 0,
        shiftType: 'auto', // 'auto', 'day', 'night'
        shiftStartTime: null,
        selectedLunchOption: CONFIG.DEFAULT_LUNCH_OPTIONS[CONFIG.DEFAULT_LUNCH_INDEX],
        autoClickEnabled: true,
        sessionStartTimestamp: Date.now(),
        isMOgoskuryCurrentlyVisible: false, // Флаг для отслеживания видимости триггера
        clickedForThisMOgoskuryInstance: false, // Флаг, что уже кликнули за это появление
        notesHistory: [], // Массив для истории заметок
        clickDataForGraph: [], // [{ timestamp: Date, count: number (cumulative) }]
        domElements: {},
        intervals: {},
        mutationObserver: null,
        pageKeydownListener: null,
    };

    // --- ------------------------------------------------------------------- ---
    // --- --------------------- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ------------------- ---
    // --- ------------------------------------------------------------------- ---
    function logDebug(...args) { if (CONFIG.DEBUG_MODE) console.debug('[ProdHelper V2 DEBUG]', ...args); }
    function logInfo(...args) { console.info('[ProdHelper V2 INFO]', ...args); }
    function logError(...args) { console.error('[ProdHelper V2 ERROR]', ...args); }

    function getStorage() { return CONFIG.USE_SESSION_STORAGE ? sessionStorage : localStorage; }

    function saveDataToStorage() {
        try {
            const storage = getStorage();
            const lunchIndex = CONFIG.DEFAULT_LUNCH_OPTIONS.findIndex(
                opt => opt.start === state.selectedLunchOption.start && opt.end === state.selectedLunchOption.end
            );
            const dataToSave = {
                totalClicks: state.totalClicks,
                shiftType: state.shiftType,
                shiftStartTimeISO: state.shiftStartTime ? state.shiftStartTime.toISOString() : null,
                selectedLunchOptionIndex: lunchIndex > -1 ? lunchIndex : CONFIG.DEFAULT_LUNCH_INDEX,
                autoClickEnabled: state.autoClickEnabled,
                uiVisible: state.uiVisible,
                uiLocked: state.uiLocked,
                settingsPanelVisible: state.settingsPanelVisible,
                notesHistory: state.notesHistory.slice(-CONFIG.MAX_NOTES_HISTORY_ITEMS), // Сохраняем только последние N заметок
                clickDataForGraph: state.clickDataForGraph, // Полные данные для графика
            };
            storage.setItem(CONFIG.STORAGE_KEY_PREFIX + 'data', JSON.stringify(dataToSave));
            logDebug('Data saved to storage:', dataToSave);
        } catch (e) { logError('Failed to save data:', e); }
    }

    function loadDataFromStorage() {
        try {
            const storage = getStorage();
            const savedDataJSON = storage.getItem(CONFIG.STORAGE_KEY_PREFIX + 'data');
            if (savedDataJSON) {
                const savedData = JSON.parse(savedDataJSON);
                state.totalClicks = parseInt(savedData.totalClicks, 10) || 0;
                state.shiftType = savedData.shiftType || 'auto';
                if (savedData.shiftStartTimeISO) state.shiftStartTime = new Date(savedData.shiftStartTimeISO);

                const lunchIndex = parseInt(savedData.selectedLunchOptionIndex, 10);
                state.selectedLunchOption = (!isNaN(lunchIndex) && CONFIG.DEFAULT_LUNCH_OPTIONS[lunchIndex])
                    ? CONFIG.DEFAULT_LUNCH_OPTIONS[lunchIndex]
                    : CONFIG.DEFAULT_LUNCH_OPTIONS[CONFIG.DEFAULT_LUNCH_INDEX];

                state.autoClickEnabled = typeof savedData.autoClickEnabled === 'boolean' ? savedData.autoClickEnabled : true;
                state.uiVisible = typeof savedData.uiVisible === 'boolean' ? savedData.uiVisible : true;
                state.uiLocked = typeof savedData.uiLocked === 'boolean' ? savedData.uiLocked : false;
                state.settingsPanelVisible = typeof savedData.settingsPanelVisible === 'boolean' ? savedData.settingsPanelVisible : false;
                state.notesHistory = Array.isArray(savedData.notesHistory) ? savedData.notesHistory : [];
                state.clickDataForGraph = Array.isArray(savedData.clickDataForGraph)
                    ? savedData.clickDataForGraph.map(d => ({ timestamp: new Date(d.timestamp), count: d.count }))
                    : [];
                logInfo('Data loaded from storage.');
            } else {
                logInfo('No saved data. Initializing defaults.');
            }
             // Если данные загружены и невалидное время начала смены, или не было данных
            if (!state.shiftStartTime || !(state.shiftStartTime instanceof Date) || isNaN(state.shiftStartTime.getTime())) {
                determineAndSetShiftStartTime(true); // true для принудительного авто-определения при загрузке
            }

        } catch (e) {
            logError('Failed to load data:', e);
            determineAndSetShiftStartTime(true); // При ошибке тоже инициализируем
        }
    }
    // ... (остальные вспомогательные функции: timeHHMMToMinutes, formatDateToHHMM, formatMsToDuration, createDOMElement - как в прошлой версии, но с новым createDOMElement)

    function timeHHMMToMinutes(timeStr) {
        if (!timeStr || !timeStr.includes(':')) return 0;
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
    }

    function formatDateToHHMM(dateObj, includeSeconds = false) {
        if (!dateObj || !(dateObj instanceof Date) || isNaN(dateObj.getTime())) return "N/A";
        const h = String(dateObj.getHours()).padStart(2, '0');
        const m = String(dateObj.getMinutes()).padStart(2, '0');
        if (includeSeconds) {
            const s = String(dateObj.getSeconds()).padStart(2, '0');
            return `${h}:${m}:${s}`;
        }
        return `${h}:${m}`;
    }

    function formatMsToDuration(ms) {
        if (isNaN(ms) || ms < 0) ms = 0;
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        return `${String(hours).padStart(2, '0')}ч ${String(minutes).padStart(2, '0')}м`;
    }

    function createDOMElement(tag, attributes = {}, children = []) {
        const element = document.createElement(tag);
        for (const key in attributes) {
            if (key === 'style' && typeof attributes[key] === 'object') {
                Object.assign(element.style, attributes[key]);
            } else if (key === 'dataset' && typeof attributes[key] === 'object') {
                 Object.assign(element.dataset, attributes[key]);
            } else if (['textContent', 'innerHTML', 'value', 'checked', 'disabled', 'type', 'id', 'title', 'placeholder', 'tabIndex'].includes(key)) {
                element[key] = attributes[key];
            } else {
                element.setAttribute(key, attributes[key]);
            }
        }
        children.forEach(child => {
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            } else if (child instanceof Node) {
                element.appendChild(child);
            }
        });
        return element;
    }


    // --- ------------------------------------------------------------------- ---
    // --- ----------------------- СБОРКА UI ЭЛЕМЕНТОВ --------------------- ---
    // --- ------------------------------------------------------------------- ---

    function buildMainUI() {
        if (document.getElementById(CONFIG.UI_CONTAINER_ID)) {
            logError('UI container already exists. Aborting UI build.');
            return;
        }

        const uiContainer = createDOMElement('div', {
            id: CONFIG.UI_CONTAINER_ID,
            style: {
                position: 'fixed', bottom: CONFIG.UI_BOTTOM_OFFSET, right: CONFIG.UI_RIGHT_OFFSET,
                width: `${CONFIG.UI_WIDTH_PERCENT_VIEWPORT}vw`, height: `${CONFIG.UI_HEIGHT_PERCENT_VIEWPORT}vh`,
                minHeight: `${CONFIG.UI_MIN_HEIGHT_PX}px`, backgroundColor: CONFIG.UI_BACKGROUND_COLOR,
                border: `2px solid ${CONFIG.UI_BORDER_COLOR}`, borderRadius: '12px', // Увеличил радиус
                boxSizing: 'border-box', color: CONFIG.UI_TEXT_COLOR, fontFamily: CONFIG.FONT_FAMILY,
                zIndex: '999999998', // Чуть ниже экстренной кнопки "показать"
                display: 'flex', flexDirection: 'column', padding: '10px 15px', // Увеличил padding
                overflow: 'hidden', boxShadow: '0 5px 30px rgba(0,0,0,0.5)', // Усилил тень
                transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
            }
        });
        state.domElements.uiContainer = uiContainer;

        // --- Верхняя панель управления (Настройки, Блокировка, Скрытие) ---
        const topControlsStyle = { display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '8px', flexShrink: 0 };
        const topControls = createDOMElement('div', { style: topControlsStyle });
        const commonButtonStyle = {
            cursor: 'pointer', background: 'rgba(255,255,255,0.05)', border: `1px solid ${CONFIG.UI_BORDER_COLOR}`,
            color: CONFIG.UI_TEXT_COLOR, borderRadius: '6px', padding: '5px 10px', fontSize: '0.85em',
            marginLeft: '8px', transition: 'background-color 0.2s, border-color 0.2s, color 0.2s'
        };
        commonButtonStyle[':hover'] = { backgroundColor: 'rgba(255,255,255,0.15)' }; // Псевдо-ховер

        state.domElements.toggleSettingsButton = createDOMElement('button', {
            id: CONFIG.TOGGLE_SETTINGS_BUTTON_ID, textContent: CONFIG.TOGGLE_SETTINGS_BUTTON_TEXT_CLOSED,
            title: 'Открыть/Закрыть панель настроек', style: commonButtonStyle
        });
        state.domElements.toggleSettingsButton.addEventListener('click', toggleSettingsPanelVisibility);

        state.domElements.lockUIButton = createDOMElement('button', {
            id: 'lockProdUIBtn_v2', textContent: CONFIG.LOCK_UI_BUTTON_TEXT_UNLOCKED,
            title: 'Заблокировать/Разблокировать UI (кроме кликера)', style: commonButtonStyle
        });
        state.domElements.lockUIButton.addEventListener('click', toggleUILockState);

        state.domElements.emergencyHideButton = createDOMElement('button', {
            id: 'hideProdUIBtn_v2', textContent: CONFIG.EMERGENCY_HIDE_BUTTON_TEXT,
            title: 'Свернуть интерфейс', style: { ...commonButtonStyle, backgroundColor: 'rgba(200, 80, 80, 0.4)' }
        });
        state.domElements.emergencyHideButton.addEventListener('click', () => setUIVisibility(false));

        topControls.append(state.domElements.toggleSettingsButton, state.domElements.lockUIButton, state.domElements.emergencyHideButton);
        uiContainer.appendChild(topControls);

        // --- Основная рабочая область (Лево: Кликер+Заметки, Право: Статистика+График) ---
        const mainWorkspace = createDOMElement('div', {
            style: { display: 'flex', flexGrow: 1, gap: '15px', overflow: 'hidden', position: 'relative' }
        });

        // --- Левая колонка (Кликер и Заметки) ---
        const leftColumn = createDOMElement('div', {
            style: { display: 'flex', flexDirection: 'column', flexBasis: '40%', // Чуть больше места кликеру
                       borderRight: `1px solid rgba(255,255,255,0.15)`, paddingRight: '15px' }
        });

        // Зона Кликера (сверху в левой колонке)
        const clickerArea = createDOMElement('div', {
            style: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '15px' }
        });
        state.domElements.mainCounterInput = createDOMElement('input', {
            type: 'number', id: CONFIG.MAIN_COUNTER_INPUT_ID, value: state.totalClicks,
            style: {
                fontSize: '3.8em', fontWeight: 'bold', color: CONFIG.MAIN_ACCENT_COLOR, marginBottom: '10px',
                textAlign: 'center', background: 'none', border: 'none', borderBottom: `2px solid ${CONFIG.MAIN_ACCENT_COLOR}55`,
                width: '180px', padding: '5px 0', outline: 'none',
            }
        });
        state.domElements.mainCounterInput.addEventListener('change', handleCounterInputChange);
        state.domElements.mainCounterInput.addEventListener('input', (e) => { // Предотвращение ввода не-цифр
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });


        const clickerButtonsContainer = createDOMElement('div', { style: { display: 'flex', alignItems: 'center' } });
        state.domElements.decrementButton = createDOMElement('button', {
            id: CONFIG.CLICKER_DECREMENT_BUTTON_ID, textContent: '➖', title: 'Уменьшить счетчик (-1)',
            style: {
                padding: '10px 15px', fontSize: '1.5em', cursor: 'pointer', marginRight: '10px',
                backgroundColor: CONFIG.DECREMENT_BUTTON_COLOR, color: 'white', border: 'none', borderRadius: '8px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)', transition: 'transform 0.1s'
            }
        });
        state.domElements.decrementButton.addEventListener('click', handleDecrementClick);
        makeButtonInteractive(state.domElements.decrementButton);

        state.domElements.incrementButton = createDOMElement('button', {
            id: CONFIG.CLICKER_INCREMENT_BUTTON_ID, textContent: '✚', title: `Зарегистрировать (+1) или ${CONFIG.INCREMENT_KEYBOARD_SHORTCUT}`,
            style: {
                padding: '15px 25px', fontSize: '2.5em', fontWeight: 'bold', cursor: 'pointer',
                backgroundColor: CONFIG.CLICKER_BUTTON_COLOR, color: 'white', border: 'none', borderRadius: '10px',
                boxShadow: '0 3px 7px rgba(0,0,0,0.25)', transition: 'transform 0.1s'
            }
        });
        state.domElements.incrementButton.addEventListener('click', () => processIncrement(true)); // true - ручной клик
        makeButtonInteractive(state.domElements.incrementButton);

        clickerButtonsContainer.append(state.domElements.decrementButton, state.domElements.incrementButton);
        clickerArea.append(state.domElements.mainCounterInput, clickerButtonsContainer);
        leftColumn.appendChild(clickerArea);

        // Зона Заметок (снизу в левой колонке)
        const notesArea = createDOMElement('div', { style: { display: 'flex', flexDirection: 'column', flexGrow: 1 } });
        notesArea.appendChild(createDOMElement('label', { for: CONFIG.NOTES_INPUT_ID, textContent: 'Быстрые заметки (Enter для сохранения):', style: { marginBottom: '5px', fontSize: '0.8em' } }));
        state.domElements.notesInput = createDOMElement('input', {
            type: 'text', id: CONFIG.NOTES_INPUT_ID, placeholder: 'Введите заметку...',
            style: {
                width: '100%', padding: '8px', boxSizing: 'border-box', marginBottom: '8px',
                background: 'rgba(0,0,0,0.2)', border: `1px solid ${CONFIG.UI_BORDER_COLOR}88`,
                borderRadius: '4px', color: CONFIG.UI_TEXT_COLOR, outline: 'none'
            }
        });
        state.domElements.notesInput.addEventListener('keypress', handleNoteInputKeypress);
        state.domElements.notesHistoryDisplay = createDOMElement('div', {
            id: CONFIG.NOTES_HISTORY_DISPLAY_ID,
            style: {
                flexGrow: 1, overflowY: 'auto', background: 'rgba(0,0,0,0.1)', padding: '8px',
                borderRadius: '4px', fontSize: '0.75em', border: `1px solid ${CONFIG.UI_BORDER_COLOR}55`
            }
        });
        notesArea.append(state.domElements.notesInput, state.domElements.notesHistoryDisplay);
        leftColumn.appendChild(notesArea);

        // --- Правая колонка (Статистика и График) ---
        const rightColumn = createDOMElement('div', {
            style: { display: 'flex', flexDirection: 'column', flexGrow: 1 }
        });
        state.domElements.statsTextSummary = createDOMElement('div', {
            id: CONFIG.STATS_TEXT_SUMMARY_ID,
            style: { fontSize: '0.85em', lineHeight: '1.6', marginBottom: '10px', textAlign: 'center' } // Текст по центру
        });
        // Canvas для графика
        state.domElements.shiftProgressGraphCanvas = createDOMElement('canvas', {
            id: CONFIG.SHIFT_PROGRESS_GRAPH_ID,
            style: { width: '100%', flexGrow: 1, background: 'rgba(0,0,0,0.05)', borderRadius: '4px' }
        });
        state.domElements.shiftProgressGraphCanvas.height = CONFIG.SHIFT_PROGRESS_GRAPH_HEIGHT_PX; // Высота задается из конфига

        rightColumn.append(state.domElements.statsTextSummary, state.domElements.shiftProgressGraphCanvas);

        mainWorkspace.append(leftColumn, rightColumn);
        uiContainer.appendChild(mainWorkspace);

        // --- Нижняя панель (Часы) ---
        const bottomBar = createDOMElement('div', {
            style: {
                marginTop: 'auto', paddingTop: '8px', borderTop: `1px solid rgba(255,255,255,0.1)`,
                textAlign: 'right', flexShrink: 0, fontSize: '0.9em'
            }
        });
        state.domElements.realTimeClock = createDOMElement('div', {
            id: CONFIG.CLOCK_DISPLAY_ID, textContent: '00:00:00',
            style: { fontFamily: 'monospace', display: 'inline-block' }
        });
        bottomBar.appendChild(state.domElements.realTimeClock);
        uiContainer.appendChild(bottomBar);

        // Панель настроек (создается, но добавляется позже или позиционируется абсолютно)
        buildSettingsPanel();
        mainWorkspace.appendChild(state.domElements.settingsPanel); // Добавляем в DOM, чтобы управлять display

        buildEmergencyShowButton();
        document.body.appendChild(uiContainer);

        // Важно: установить ширину canvas ПОСЛЕ того, как он добавлен в DOM
        // Он уже должен иметь ширину благодаря flex-контейнеру
        const canvasTimeout = setTimeout(() => { // Даем DOM немного времени на рендер
             if (state.domElements.shiftProgressGraphCanvas) {
                state.domElements.shiftProgressGraphCanvas.width = state.domElements.shiftProgressGraphCanvas.offsetWidth;
                logDebug(`Canvas width set to: ${state.domElements.shiftProgressGraphCanvas.width}`);
                drawShiftProgressGraph(); // Первичная отрисовка
             }
        }, 100);
        state.intervals.canvasTimeout = canvasTimeout;


        setInitialUIStates();
        updateNotesHistoryDisplay();
        logInfo('Main UI v2 built.');
    }

    function makeButtonInteractive(button) {
        button.addEventListener('mousedown', e => {
            e.preventDefault(); button.style.transform = 'scale(0.95)';
        });
        button.addEventListener('mouseup', () => button.style.transform = 'scale(1)');
        button.addEventListener('mouseleave', () => button.style.transform = 'scale(1)');
    }

    function buildEmergencyShowButton() {
        // (Как в прошлой версии, но с измененным текстом и стилями из CONFIG)
         state.domElements.emergencyShowButton = createDOMElement('button', {
            id: 'emergencyShowBtn_v2', textContent: CONFIG.EMERGENCY_SHOW_BUTTON_TEXT, title: 'Развернуть интерфейс',
            style: {
                position: 'fixed', bottom: CONFIG.UI_BOTTOM_OFFSET, right: CONFIG.UI_RIGHT_OFFSET,
                width: CONFIG.EMERGENCY_SHOW_BUTTON_SIZE, height: CONFIG.EMERGENCY_SHOW_BUTTON_SIZE,
                backgroundColor: 'rgba(50,60,80,0.6)', border: `1px solid ${CONFIG.UI_BORDER_COLOR}`,
                color: CONFIG.UI_TEXT_COLOR, borderRadius: '50%', cursor: 'pointer', display: 'none',
                alignItems: 'center', justifyContent: 'center', zIndex: '999999999',
                opacity: String(CONFIG.EMERGENCY_SHOW_BUTTON_OPACITY),
                transition: 'opacity 0.2s ease, transform 0.2s ease, background-color 0.2s', fontSize: '16px',
                boxShadow: '0 0 15px rgba(0,0,0,0.3)'
            }
        });
        state.domElements.emergencyShowButton.onmouseover = () => {
            state.domElements.emergencyShowButton.style.opacity = '1';
            state.domElements.emergencyShowButton.style.transform = 'scale(1.1)';
            state.domElements.emergencyShowButton.style.backgroundColor = CONFIG.UI_BORDER_COLOR;
        };
        state.domElements.emergencyShowButton.onmouseout = () => {
            state.domElements.emergencyShowButton.style.opacity = String(CONFIG.EMERGENCY_SHOW_BUTTON_OPACITY);
            state.domElements.emergencyShowButton.style.transform = 'scale(1)';
            state.domElements.emergencyShowButton.style.backgroundColor = 'rgba(50,60,80,0.6)';
        };
        state.domElements.emergencyShowButton.onclick = () => setUIVisibility(true);
        document.body.appendChild(state.domElements.emergencyShowButton);
    }

        function buildSettingsPanel() {
        const panel = createDOMElement('div', {
            id: CONFIG.SETTINGS_PANEL_ID,
            style: {
                position: 'absolute', top: '-2px', right: '-2px', bottom: '-2px',
                width: '300px',
                backgroundColor: CONFIG.UI_BACKGROUND_COLOR,
                borderLeft: `2px solid ${CONFIG.UI_BORDER_COLOR}`,
                padding: '15px', zIndex: '100', display: 'none', flexDirection: 'column',
                gap: '15px', overflowY: 'auto', boxShadow: '-8px 0px 20px rgba(0,0,0,0.3)',
                transition: 'transform 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)'
            }
        });
        state.domElements.settingsPanel = panel;

        const heading = createDOMElement('h3', { textContent: 'Параметры', style: { margin: '0 0 10px 0', textAlign: 'center', color: CONFIG.MAIN_ACCENT_COLOR, fontSize: '1.2em'} });
        panel.appendChild(heading);

        const commonSelectStyle = {width: '100%', padding: '8px', boxSizing: 'border-box', backgroundColor: 'rgba(0,0,0,0.25)', color: CONFIG.UI_TEXT_COLOR, border: `1px solid ${CONFIG.UI_BORDER_COLOR}aa`, borderRadius: '4px'};
        const commonLabelStyle = { display: 'block', marginBottom: '5px', fontSize: '0.9em'};

        // Тип смены
        const shiftTypeGroup = createDOMElement('div');
        shiftTypeGroup.appendChild(createDOMElement('label', { for: CONFIG.SETTINGS_SHIFT_TYPE_SELECT_ID, textContent: 'Тип смены:', style: commonLabelStyle }));
        state.domElements.settingsShiftTypeSelect = createDOMElement('select', { id: CONFIG.SETTINGS_SHIFT_TYPE_SELECT_ID, style: commonSelectStyle });
        state.domElements.settingsShiftTypeSelect.addEventListener('change', handleShiftSettingsChange);
        shiftTypeGroup.appendChild(state.domElements.settingsShiftTypeSelect);
        panel.appendChild(shiftTypeGroup);

        // Время начала смены (ручное)
        const shiftStartTimeGroup = createDOMElement('div');
        shiftStartTimeGroup.appendChild(createDOMElement('label', { for: CONFIG.SETTINGS_SHIFT_START_TIME_INPUT_ID, textContent: 'Время начала (если ручное):', style: commonLabelStyle }));
        state.domElements.settingsShiftStartTimeInput = createDOMElement('input', { type: 'time', id: CONFIG.SETTINGS_SHIFT_START_TIME_INPUT_ID, style: commonSelectStyle });
        state.domElements.settingsShiftStartTimeInput.addEventListener('change', handleShiftSettingsChange);
        shiftStartTimeGroup.appendChild(state.domElements.settingsShiftStartTimeInput);
        panel.appendChild(shiftStartTimeGroup);

        // Обед
        const lunchGroup = createDOMElement('div');
        lunchGroup.appendChild(createDOMElement('label', { for: CONFIG.SETTINGS_LUNCH_TIME_SELECT_ID, textContent: 'Обеденный перерыв:', style: commonLabelStyle }));
        state.domElements.settingsLunchSelect = createDOMElement('select', { id: CONFIG.SETTINGS_LUNCH_TIME_SELECT_ID, style: commonSelectStyle });
        state.domElements.settingsLunchSelect.addEventListener('change', handleLunchSettingChange);
        lunchGroup.appendChild(state.domElements.settingsLunchSelect);
        panel.appendChild(lunchGroup);

        // Чекбокс авто-клика
        const autoClickGroup = createDOMElement('div', {style: {marginTop: '10px'}});
        const autoClickLabel = createDOMElement('label', { style: { display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '0.9em' } });
        state.domElements.autoClickEnabledCheckbox = createDOMElement('input', { type: 'checkbox', id: CONFIG.AUTO_CLICK_ENABLED_CHECKBOX_ID, checked: state.autoClickEnabled, style: { marginRight: '10px', transform: 'scale(1.3)' } });
        state.domElements.autoClickEnabledCheckbox.addEventListener('change', handleAutoClickSettingChange);
        autoClickLabel.append(state.domElements.autoClickEnabledCheckbox, `Авто-регистрация (по слову "${CONFIG.AUTO_CLICK_TRIGGER_WORD}")`);
        autoClickGroup.appendChild(autoClickLabel);
        panel.appendChild(autoClickGroup);

        // --- ИСПРАВЛЕНИЕ ЗДЕСЬ ---
        // Определяем стили для кнопки закрытия панели настроек локально
        const settingsPanelButtonStyle = {
            cursor: 'pointer',
            backgroundColor: `${CONFIG.MAIN_ACCENT_COLOR}cc`, // Используем основной акцентный цвет с прозрачностью
            border: `1px solid ${CONFIG.UI_BORDER_COLOR}aa`,
            color: 'white', // Белый текст для контраста с акцентным цветом
            borderRadius: '6px',
            padding: '10px',
            fontSize: '1em',
            width: '100%',
            marginTop: 'auto', // Прижать к низу, если есть место
            transition: 'background-color 0.2s, border-color 0.2s'
        };
        // --- КОНЕЦ ИСПРАВЛЕНИЯ ---

        const closeButton = createDOMElement('button', {
            textContent: 'Применить и Закрыть',
            style: settingsPanelButtonStyle // Используем локально определенный стиль
        });
        closeButton.addEventListener('click', () => setSettingsPanelVisibility(false));
        panel.appendChild(closeButton);
    }

    function setInitialUIStates() {
        // Заполнить селекты в настройках
        const shiftSelect = state.domElements.settingsShiftTypeSelect;
        if(shiftSelect) {
            shiftSelect.innerHTML = ''; // Очистить, если были старые опции
            [['auto', 'Автоматически'], ['day', `Дневная (с ${CONFIG.DEFAULT_DAY_SHIFT_START_TIME})`], ['night', `Ночная (с ${CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME})`]].forEach(([val, txt]) => {
                shiftSelect.add(new Option(txt, val));
            });
            shiftSelect.value = state.shiftType;
        }
        if(state.domElements.settingsShiftStartTimeInput && state.shiftStartTime) {
            state.domElements.settingsShiftStartTimeInput.value = formatDateToHHMM(state.shiftStartTime);
        }

        const lunchSelect = state.domElements.settingsLunchSelect;
        if(lunchSelect) {
            lunchSelect.innerHTML = '';
            CONFIG.DEFAULT_LUNCH_OPTIONS.forEach((opt, index) => {
                lunchSelect.add(new Option(opt.text, String(index)));
            });
            const currentLunchIndex = CONFIG.DEFAULT_LUNCH_OPTIONS.findIndex(opt => opt.start === state.selectedLunchOption.start && opt.end === state.selectedLunchOption.end);
            lunchSelect.value = String(currentLunchIndex > -1 ? currentLunchIndex : CONFIG.DEFAULT_LUNCH_INDEX);
        }
        if(state.domElements.autoClickEnabledCheckbox) state.domElements.autoClickEnabledCheckbox.checked = state.autoClickEnabled;


        // Применить состояния видимости и блокировки
        setUIVisibility(state.uiVisible);
        setUILockState(state.uiLocked);
        setSettingsPanelVisibility(state.settingsPanelVisible);
        updateCounterDisplay();
        updateManualShiftTimeInputVisibility();
    }


    // --- ------------------------------------------------------------------- ---
    // --- ----------------------- УПРАВЛЕНИЕ UI СОСТОЯНИЕМ ------------------ ---
    // --- ------------------------------------------------------------------- ---
    function setUIVisibility(visible) {
        // (Аналогично прошлой версии, но с новыми текстами для кнопок)
        state.uiVisible = visible;
        if (state.domElements.uiContainer) {
            state.domElements.uiContainer.style.opacity = visible ? '1' : '0';
            state.domElements.uiContainer.style.transform = visible ? 'translateY(0)' : 'translateY(30px)';
            state.domElements.uiContainer.style.pointerEvents = visible ? 'auto' : 'none';
        }
        if (state.domElements.emergencyShowButton) {
            state.domElements.emergencyShowButton.style.display = visible ? 'none' : 'flex';
        }
        if (!visible && state.settingsPanelVisible) {
            setSettingsPanelVisibility(false);
        }
        saveDataToStorage();
    }

    function toggleUILockState() { setUILockState(!state.uiLocked); }

    function setUILockState(locked) {
        // (Аналогично прошлой версии, но с новыми текстами)
        if (!state.uiVisible && locked) return;
        state.uiLocked = locked;

        state.domElements.lockUIButton.textContent = state.uiLocked ? CONFIG.LOCK_UI_BUTTON_TEXT_LOCKED : CONFIG.LOCK_UI_BUTTON_TEXT_UNLOCKED;
        state.domElements.lockUIButton.title = state.uiLocked ? 'Разблокировать интерфейс' : 'Заблокировать (кроме кликера и PageDown)';
        state.domElements.lockUIButton.style.backgroundColor = state.uiLocked ? 'rgba(200, 80, 80, 0.5)' : 'rgba(255,255,255,0.05)';

        const elementsToToggle = [
            state.domElements.toggleSettingsButton, state.domElements.emergencyHideButton,
            state.domElements.decrementButton, // Кнопка -1 тоже блокируется
            state.domElements.mainCounterInput, // Поле счетчика блокируется для прямого ввода
            state.domElements.notesInput,       // Поле заметок
            // Все элементы панели настроек, если она видима
            ...(state.settingsPanelVisible ? state.domElements.settingsPanel.querySelectorAll('input, select, button:not(#'+state.domElements.lockUIButton.id+')') : [])
        ];

        elementsToToggle.forEach(el => {
            if (el) {
                 el.disabled = state.uiLocked;
                 el.style.opacity = state.uiLocked ? '0.6' : '1';
                 el.style.cursor = state.uiLocked ? 'not-allowed' : (el.tagName === 'BUTTON' || el.tagName === 'SELECT' ? 'pointer' : 'default');
            }
        });
        // Кнопка +1 и PageDown остаются активными
        saveDataToStorage();
    }

    function toggleSettingsPanelVisibility() { setSettingsPanelVisibility(!state.settingsPanelVisible); }

    function setSettingsPanelVisibility(visible) {
        // (Аналогично прошлой версии, с новыми текстами)
        state.settingsPanelVisible = visible;
        if (state.domElements.settingsPanel) {
            state.domElements.settingsPanel.style.display = visible ? 'flex' : 'none';
            state.domElements.settingsPanel.style.transform = visible ? 'translateX(0%)' : 'translateX(105%)';
        }
         state.domElements.toggleSettingsButton.textContent = visible ? CONFIG.TOGGLE_SETTINGS_BUTTON_TEXT_OPENED : CONFIG.TOGGLE_SETTINGS_BUTTON_TEXT_CLOSED;
        state.domElements.toggleSettingsButton.style.backgroundColor = visible ? 'rgba(100,120,160,0.6)' : 'rgba(255,255,255,0.05)';

        if (visible && state.uiLocked) { setUILockState(true); } // Переприменить блокировку
        saveDataToStorage();
    }

    // --- ------------------------------------------------------------------- ---
    // --- ----------------------- ОБРАБОТЧИКИ СОБЫТИЙ --------------------- ---
    // --- ------------------------------------------------------------------- ---
    function processIncrement(isManualAction = false) {
        if (isManualAction && state.uiLocked && event && (event.target === state.domElements.incrementButton)) {
             // Если UI заблокирован, но клик именно по большой кнопке - разрешаем
        } else if (state.uiLocked && isManualAction) { // Любое другое ручное действие при блоке (кроме PageDown)
            logDebug('UI is locked, manual increment ignored unless from main button.');
            return;
        } // Авто-клик и PageDown проходят мимо блокировки UI

        state.totalClicks++;
        // Записываем данные для графика
        state.clickDataForGraph.push({ timestamp: new Date(), count: state.totalClicks });
        // Ограничиваем размер массива, если это необходимо (например по времени смены)
        // filterOldGraphData(); // Реализовать если нужно удалять старые данные из clickDataForGraph

        updateCounterDisplay();
        updateStatisticsAndGraph(); // Обновит и текстовую статистику и график
        saveDataToStorage();
    }
    function filterOldGraphData(){
        // Пример: оставлять данные только за текущую смену (если state.shiftStartTime определено)
        if (!state.shiftStartTime) return;
        const shiftStartMillis = state.shiftStartTime.getTime();
        state.clickDataForGraph = state.clickDataForGraph.filter(d => d.timestamp.getTime() >= shiftStartMillis);
    }


    function handleDecrementClick() {
        if (state.uiLocked) return;
        if (state.totalClicks > 0) {
            state.totalClicks--;
            // Удаляем последнюю точку данных с графика, если она есть
            // Это упрощение, по-хорошему нужно искать ближайшую по времени и уменьшать ее count,
            // или хранить историю действий для отката, но для простоты - убираем последнюю.
            if (state.clickDataForGraph.length > 0 && state.clickDataForGraph[state.clickDataForGraph.length-1].count > state.totalClicks) {
                 // Если последний count на графике был больше текущего (после декремента), это может быть
                 // результатом прямого редактирования поля счетчика. В таком случае, просто добавляем новую точку
                 // с актуальным уменьшенным значением и текущим временем, чтобы график не "прыгнул" назад по времени.
                 state.clickDataForGraph.push({ timestamp: new Date(), count: state.totalClicks });
            } else if(state.clickDataForGraph.length > 0){
                state.clickDataForGraph.pop(); // Удаляем последнюю точку
            }

            updateCounterDisplay();
            updateStatisticsAndGraph(); // Обновит и текстовую статистику и график
            saveDataToStorage();
        }
    }

    function handleCounterInputChange(event) {
        if (state.uiLocked) { // Если заблокировано, восстанавливаем старое значение
            event.target.value = state.totalClicks;
            return;
        }
        let newValue = parseInt(event.target.value, 10);
        if (isNaN(newValue) || newValue < 0) {
            newValue = 0; // или state.totalClicks, если не хотим обнулять при неверном вводе
        }
        // Если значение изменилось значительно, возможно, стоит добавить точку на график
        if (newValue !== state.totalClicks) {
            state.clickDataForGraph.push({ timestamp: new Date(), count: newValue });
        }
        state.totalClicks = newValue;

        updateCounterDisplay(); // На случай если auto-correction что-то изменил
        updateStatisticsAndGraph();
        saveDataToStorage();
    }

    function updateCounterDisplay() {
        if (state.domElements.mainCounterInput) {
            state.domElements.mainCounterInput.value = state.totalClicks;
        }
    }

    function handleShiftSettingsChange() {
        // (Логика как в прошлой версии, но с обновленными ID и вызовом determineAndSetShiftStartTime с флагом)
        state.shiftType = state.domElements.settingsShiftTypeSelect.value;
        determineAndSetShiftStartTime(false); // false - не принудительное авто, учитываем выбор пользователя
        updateManualShiftTimeInputVisibility();
        updateStatisticsAndGraph();
        saveDataToStorage();
    }

    function updateManualShiftTimeInputVisibility() {
        // (Как в прошлой версии, с обновленными ID)
        const isManual = state.shiftType !== 'auto';
        const inputEl = state.domElements.settingsShiftStartTimeInput;
        const labelEl = inputEl?.labels?.[0] || inputEl?.previousElementSibling;

        if (inputEl) {
           inputEl.disabled = !isManual;
           inputEl.style.opacity = isManual ? '1' : '0.6';
           inputEl.style.display = isManual ? 'block' : 'none';
           if (state.shiftStartTime) { // Всегда отображаем текущее вычисленное или установленное время
                inputEl.value = formatDateToHHMM(state.shiftStartTime);
           }
        }
        if (labelEl && labelEl.tagName === 'LABEL') {
           labelEl.style.display = isManual ? 'block' : 'none';
        }
    }

    function handleLunchSettingChange() {
        // (Как в прошлой версии, с обновленными ID)
        const selectedIndex = parseInt(state.domElements.settingsLunchSelect.value, 10);
        if (CONFIG.DEFAULT_LUNCH_OPTIONS[selectedIndex]) {
            state.selectedLunchOption = CONFIG.DEFAULT_LUNCH_OPTIONS[selectedIndex];
            updateStatisticsAndGraph();
            saveDataToStorage();
        }
    }
    function handleAutoClickSettingChange(event) {
        state.autoClickEnabled = event.target.checked;
        logInfo(`Auto-click is now ${state.autoClickEnabled ? 'ENABLED' : 'DISABLED'}`);
        saveDataToStorage();
        if (state.autoClickEnabled && !state.mutationObserver) {
            initializeMutationObserver();
        } else if (!state.autoClickEnabled && state.mutationObserver) {
            state.mutationObserver.disconnect();
            state.mutationObserver = null;
        }
    }

    function handleNoteInputKeypress(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const noteText = state.domElements.notesInput.value.trim();
            if (noteText) {
                state.notesHistory.unshift({ text: noteText, timestamp: new Date() }); // Добавляем в начало
                if (state.notesHistory.length > CONFIG.MAX_NOTES_HISTORY_ITEMS) {
                    state.notesHistory.pop(); // Удаляем самый старый, если превышен лимит
                }
                state.domElements.notesInput.value = ''; // Очищаем поле ввода
                updateNotesHistoryDisplay();
                saveDataToStorage();
            }
        }
    }

    function updateNotesHistoryDisplay() {
        const display = state.domElements.notesHistoryDisplay;
        if (!display) return;
        display.innerHTML = ''; // Очищаем
        if (state.notesHistory.length === 0) {
            display.appendChild(createDOMElement('p', {textContent: 'История заметок пуста.', style: {opacity: '0.5', textAlign: 'center', margin: '10px 0'}}));
            return;
        }
        state.notesHistory.forEach(note => {
            const noteItem = createDOMElement('div', {
                style: {
                    padding: '5px', borderBottom: '1px dashed rgba(255,255,255,0.1)',
                    marginBottom: '5px', wordBreak: 'break-word'
                }
            });
            const timeSpan = createDOMElement('span', {textContent: `[${formatDateToHHMM(note.timestamp, true)}] `, style: {color: CONFIG.MAIN_ACCENT_COLOR, marginRight: '5px'}});
            const textNode = document.createTextNode(note.text);
            noteItem.append(timeSpan, textNode);
            display.appendChild(noteItem);
        });
    }

    function handlePageKeydown(event) {
        // Проверяем, не находится ли фокус в поле ввода, чтобы не мешать تایپ کردن
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA' || event.target.isContentEditable) {
            return;
        }
        if (event.key === CONFIG.INCREMENT_KEYBOARD_SHORTCUT) {
            event.preventDefault();
            processIncrement(false); // false - не ручной клик (в плане GUI), но инициировано пользователем
            logDebug_v2(`${CONFIG.INCREMENT_KEYBOARD_SHORTCUT} pressed, counter incremented.`);

            // Эффект "нажатия" для основной кнопки для визуальной обратной связи
            if(state.domElements.incrementButton){
                state.domElements.incrementButton.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    if(state.domElements.incrementButton) state.domElements.incrementButton.style.transform = 'scale(1)';
                }, 100);
            }
        }
    }

    // --- ------------------------------------------------------------------- ---
    // --- --------------------------- ОСНОВНАЯ ЛОГИКА ----------------------- ---
    // --- ------------------------------------------------------------------- ---

    function determineAndSetShiftStartTime(forceAuto = false) {
        const now = new Date();
        let shiftStartHour, shiftStartMinute;
        let calculatedStartTime = new Date(now); // Начнем с текущей даты

        if (forceAuto || state.shiftType === 'auto') { // Авто-определение
            const [dayH, dayM] = CONFIG.DEFAULT_DAY_SHIFT_START_TIME.split(':').map(Number);
            const [nightH, nightM] = CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME.split(':').map(Number);
            const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();
            const dayShiftStartInMinutes = dayH * 60 + dayM;
            const nightShiftStartInMinutes = nightH * 60 + nightM;

            if (currentTimeInMinutes >= dayShiftStartInMinutes && currentTimeInMinutes < nightShiftStartInMinutes) {
                [shiftStartHour, shiftStartMinute] = [dayH, dayM]; // Дневная сегодня
            } else {
                [shiftStartHour, shiftStartMinute] = [nightH, nightM]; // Ночная
                if (currentTimeInMinutes < dayShiftStartInMinutes) { // Ночная со вчера (например, сейчас 3:00, дневная с 7:15)
                    calculatedStartTime.setDate(now.getDate() - 1);
                }
            }
            calculatedStartTime.setHours(shiftStartHour, shiftStartMinute, 0, 0);
            state.shiftStartTime = calculatedStartTime;
            logDebug(`Auto-determined shift start: ${state.shiftStartTime.toLocaleString()}`);

        } else if (state.shiftType === 'day' || state.shiftType === 'night') { // Ручной выбор типа, но время из поля
            const timeValue = state.domElements.settingsShiftStartTimeInput?.value;
            if (timeValue) {
                [shiftStartHour, shiftStartMinute] = timeValue.split(':').map(Number);
                calculatedStartTime.setHours(shiftStartHour, shiftStartMinute, 0, 0);
                 // Коррекция для ночной смены, если время начала "вчера" относительно текущего дня
                if (state.shiftType === 'night' && now.getHours() < shiftStartHour) {
                    calculatedStartTime.setDate(now.getDate() - 1);
                }
                state.shiftStartTime = calculatedStartTime;
            } else { // Если поле пустое, берем дефолтное для выбранного типа
                 const defaultTime = state.shiftType === 'day' ? CONFIG.DEFAULT_DAY_SHIFT_START_TIME : CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME;
                [shiftStartHour, shiftStartMinute] = defaultTime.split(':').map(Number);
                calculatedStartTime.setHours(shiftStartHour, shiftStartMinute, 0, 0);
                if (state.shiftType === 'night' && now.getHours() < shiftStartHour) {
                     calculatedStartTime.setDate(now.getDate() - 1);
                }
                state.shiftStartTime = calculatedStartTime;
            }
            logDebug(`Manual shift type set. Start: ${state.shiftStartTime.toLocaleString()}`);
        }
        filterOldGraphData(); // После установки нового времени смены, отфильтровать старые данные графика
    }

    function updateRealTimeClockDisplay() {
        if (state.domElements.realTimeClock) {
            state.domElements.realTimeClock.textContent = formatDateToHHMM(new Date(), true);
        }
    }

    function updateStatisticsAndGraph() { // Объединенная функция
        if (!state.shiftStartTime || !(state.shiftStartTime instanceof Date) || isNaN(state.shiftStartTime.getTime())) {
            determineAndSetShiftStartTime(true); // Убедимся, что время смены есть
             if (!state.shiftStartTime) {
                if (state.domElements.statsTextSummary) state.domElements.statsTextSummary.innerHTML = '<p style="color:red;">Ошибка: Не удалось определить время начала смены!</p>';
                return;
             }
        }

        const now = new Date();
        let totalElapsedMs = now.getTime() - state.shiftStartTime.getTime();

        if (totalElapsedMs < 0) { // Начало смены в будущем
            if (state.domElements.statsTextSummary) {
                state.domElements.statsTextSummary.innerHTML = `
                    <p>Смена начнется в: ${formatDateToHHMM(state.shiftStartTime)}</p>
                    <p>Ожидание...</p>
                `;
            }
            drawShiftProgressGraph(); // Отрисовать пустой график
            return;
        }

        // Расчет времени обеда (аналогично прошлой версии, но учитывая, что shiftStartTime может быть "вчера")
        let lunchDurationMs = 0;
        const lunchTimes = state.selectedLunchOption;
        if (lunchTimes.start !== "00:00" || lunchTimes.end !== "00:00") {
            const shiftStartDate = new Date(state.shiftStartTime.getFullYear(), state.shiftStartTime.getMonth(), state.shiftStartTime.getDate());

            let lunchStartAbs = new Date(shiftStartDate);
            const [lsh, lsm] = lunchTimes.start.split(':').map(Number);
            lunchStartAbs.setHours(lsh, lsm, 0, 0);

            let lunchEndAbs = new Date(shiftStartDate);
            const [leh, lem] = lunchTimes.end.split(':').map(Number);
            lunchEndAbs.setHours(leh, lem, 0, 0);

             // Если смена началась вчера, а обед сегодня (например, смена 19:00 вчера, обед 01:00 сегодня)
            if (state.shiftStartTime.getDate() !== now.getDate() && lunchStartAbs.getTime() < state.shiftStartTime.getTime()) {
                lunchStartAbs.setDate(lunchStartAbs.getDate() + 1);
                lunchEndAbs.setDate(lunchEndAbs.getDate() + 1);
            }

            // Если обед переходит через полночь сам по себе
            if (lunchEndAbs < lunchStartAbs) lunchEndAbs.setDate(lunchEndAbs.getDate() + 1);

            const effectiveLunchStart = Math.max(state.shiftStartTime.getTime(), lunchStartAbs.getTime());
            const effectiveLunchEnd = Math.min(now.getTime(), lunchEndAbs.getTime());

            if (effectiveLunchEnd > effectiveLunchStart) {
                lunchDurationMs = effectiveLunchEnd - effectiveLunchStart;
            }
        }

        const effectiveWorkMs = Math.max(0, totalElapsedMs - lunchDurationMs);
        const hoursWorked = effectiveWorkMs / (1000 * 60 * 60);
        const clicksPerHour = (hoursWorked > 0.001) ? (state.totalClicks / hoursWorked) : 0;

        if (state.domElements.statsTextSummary) {
            state.domElements.statsTextSummary.innerHTML = `
                <p>Смена с: <strong>${formatDateToHHMM(state.shiftStartTime)}</strong> (${state.shiftType === 'auto' ? 'Авто' : (state.shiftType === 'day' ? 'День' : 'Ночь')})</p>
                <p>Выполнено: <strong>${state.totalClicks}</strong> (за ${formatMsToDuration(effectiveWorkMs)})</p>
                <p>Это примерно: <strong style="color: ${CONFIG.MAIN_ACCENT_COLOR}; font-size: 1.1em;">${clicksPerHour.toFixed(1)}</strong> в час</p>
                <p>Обед: ${lunchTimes.text}</p>
            `;
        }
        drawShiftProgressGraph(); // Обновляем график
    }


    function drawShiftProgressGraph() {
        if (!state.domElements.shiftProgressGraphCanvas || !state.shiftStartTime) return;
        const canvas = state.domElements.shiftProgressGraphCanvas;
        const ctx = canvas.getContext('2d');
        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);

        const now = new Date();
        const shiftStartMillis = state.shiftStartTime.getTime();
        let totalShiftDurationMs = now.getTime() - shiftStartMillis;

        if (totalShiftDurationMs <=0) return; // Смена еще не началась или только что

        // Настройки отступов и области графика
        const padding = { top: 10, right: 35, bottom: 25, left: 35 }; // отступы для осей
        const graphWidth = w - padding.left - padding.right;
        const graphHeight = h - padding.top - padding.bottom;

        // --- Ось X (Время) ---
        // Начало в 0 (старт смены), конец - текущее время в смене.
        // Можно ограничить макс. продолжительностью смены, если есть (например, 8 или 12 часов)
        // const maxExpectedShiftMs = 8 * 60 * 60 * 1000; // Например, 8 часов
        // totalShiftDurationMs = Math.min(totalShiftDurationMs, maxExpectedShiftMs);

        // Рисуем сетку и метки оси X
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.fillStyle = CONFIG.UI_TEXT_COLOR;
        ctx.font = '10px ' + CONFIG.FONT_FAMILY;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';

        const numTimeMarkers = CONFIG.GRAPH_X_AXIS_TIME_MARKERS_COUNT;
        for (let i = 0; i <= numTimeMarkers; i++) {
            const ratio = i / numTimeMarkers;
            const x = padding.left + ratio * graphWidth;
            ctx.beginPath();
            ctx.moveTo(x, padding.top);
            ctx.lineTo(x, padding.top + graphHeight);
            ctx.stroke();
            const timeMs = ratio * totalShiftDurationMs;
            const timeLabel = formatMsToDuration(timeMs).replace('00ч ',''); // Убираем "00ч" если меньше часа
            ctx.fillText(timeLabel, x, padding.top + graphHeight + 5);
        }
         ctx.fillText('Сейчас', padding.left + graphWidth, padding.top + graphHeight + 15); // Подпись "Сейчас"


        // --- Ось Y (Количество) ---
        // Максимальное значение Y - либо текущее кол-во предметов, либо макс. из целевых линий
        let maxYValue = Math.max(1, state.totalClicks); // Минимум 1, чтобы избежать деления на 0
        CONFIG.GRAPH_TARGET_RATE_LINES.forEach(line => {
            const targetAtEnd = line.rate * (totalShiftDurationMs / (3600 * 1000));
            maxYValue = Math.max(maxYValue, targetAtEnd);
        });
        maxYValue = Math.ceil(maxYValue * 1.1); // +10% для отступа сверху

        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        const numYMarkers = 4; // Количество меток на оси Y
        for (let i = 0; i <= numYMarkers; i++) {
            const ratio = i / numYMarkers;
            const y = padding.top + graphHeight - (ratio * graphHeight);
            const value = Math.round(ratio * maxYValue);
            ctx.beginPath();
            ctx.moveTo(padding.left -5, y);
            ctx.lineTo(padding.left + graphWidth, y); // Горизонтальные линии сетки
            ctx.stroke();
            if (value > 0 || i === 0 ) ctx.fillText(String(value), padding.left - 8, y);
        }

        // --- Рисуем целевые линии производительности ---
        CONFIG.GRAPH_TARGET_RATE_LINES.forEach(targetLine => {
            ctx.strokeStyle = targetLine.color;
            ctx.lineWidth = 1;
            ctx.setLineDash([3, 3]); // Пунктирная линия
            ctx.beginPath();
            ctx.moveTo(padding.left, padding.top + graphHeight); // Начало в (0,0) графика

            const itemsAtEndOfCurrentView = targetLine.rate * (totalShiftDurationMs / (3600 * 1000));
            const yTarget = padding.top + graphHeight - (itemsAtEndOfCurrentView / maxYValue) * graphHeight;
            ctx.lineTo(padding.left + graphWidth, Math.max(padding.top, yTarget)); // Не выходить за верхнюю границу
            ctx.stroke();
            // Подпись линии (опционально, может загромождать)
            // ctx.fillStyle = targetLine.color;
            // ctx.fillText(targetLine.label, padding.left + graphWidth - 30, Math.max(padding.top + 10, yTarget - 5 ));
        });
        ctx.setLineDash([]); // Сброс пунктира

        // --- Рисуем фактические данные ---
        if (state.clickDataForGraph.length > 0) {
            ctx.strokeStyle = CONFIG.GRAPH_LINE_COLOR;
            ctx.lineWidth = 2;
            ctx.beginPath();

            state.clickDataForGraph.forEach((dataPoint, index) => {
                const elapsedMsForPoint = dataPoint.timestamp.getTime() - shiftStartMillis;
                if (elapsedMsForPoint < 0) return; // Точка до начала текущей смены

                const xRatio = elapsedMsForPoint / totalShiftDurationMs;
                const x = padding.left + xRatio * graphWidth;

                const yRatio = dataPoint.count / maxYValue;
                const y = padding.top + graphHeight - (yRatio * graphHeight);

                if (x > padding.left + graphWidth + 5) return; // Не рисуем точки сильно за пределами "Сейчас"

                if (index === 0 || state.clickDataForGraph.slice(0,index).every(p => p.timestamp.getTime() < shiftStartMillis)) {
                     // Для первой точки в текущей смене, или если предыдущие были до начала смены
                     ctx.moveTo(Math.max(padding.left, x), Math.min(padding.top + graphHeight, Math.max(padding.top, y)));
                } else {
                     ctx.lineTo(Math.max(padding.left, x), Math.min(padding.top + graphHeight, Math.max(padding.top, y)));
                }
            });
            ctx.stroke();
            // Можно добавить точки на линию
            // state.clickDataForGraph.forEach(...) { ctx.beginPath(); ctx.arc(x,y,2,0,2*Math.PI); ctx.fill(); }
        }
    }


    function initializeMutationObserver() {
        // (Логика немного изменена для отлова "появления" и установки флага)
        if (state.mutationObserver) state.mutationObserver.disconnect();

        const observeTargetNode = document.querySelector(CONFIG.TRIGGER_OBSERVE_AREA_SELECTOR) || document.body;

        const observerCallback = (mutationsList) => {
            if (!state.autoClickEnabled) return;

            let mogoSkuryCurrentlyOnPage = false;
            // Проверяем весь целевой узел на наличие слова после мутаций
            if (observeTargetNode.textContent?.includes(CONFIG.AUTO_CLICK_TRIGGER_WORD)) {
                mogoSkuryCurrentlyOnPage = true;
            }

            if (mogoSkuryCurrentlyOnPage && !state.isMOgoskuryCurrentlyVisible) {
                // Слово появилось (или было, но мы его не "видели")
                logDebug(`Trigger "${CONFIG.AUTO_CLICK_TRIGGER_WORD}" detected. Was not visible, now is.`);
                state.isMOgoskuryCurrentlyVisible = true;
                state.clickedForThisMOgoskuryInstance = false; // Сбрасываем, т.к. это новое появление/обнаружение
            } else if (!mogoSkuryCurrentlyOnPage && state.isMOgoskuryCurrentlyVisible) {
                // Слово исчезло
                logDebug(`Trigger "${CONFIG.AUTO_CLICK_TRIGGER_WORD}" disappeared.`);
                state.isMOgoskuryCurrentlyVisible = false;
                state.clickedForThisMOgoskuryInstance = false; // Сбрасываем, готовимся к следующему появлению
            }

            // Если слово видимо и мы еще не кликнули за это "появление"
            if (state.isMOgoskuryCurrentlyVisible && !state.clickedForThisMOgoskuryInstance) {
                logInfo(`Auto-incrementing for "${CONFIG.AUTO_CLICK_TRIGGER_WORD}"`);
                processIncrement(false); // false - не ручной клик
                state.clickedForThisMOgoskuryInstance = true; // Отмечаем, что кликнули
            }
        };

        state.mutationObserver = new MutationObserver(observerCallback);
        const observerConfig = { childList: true, subtree: true, characterData: true };
        state.mutationObserver.observe(observeTargetNode, observerConfig);
        logInfo(`MutationObserver for auto-click initialized. Observing:`, observeTargetNode);

        // Первичная проверка при запуске, если слово уже есть на странице
        observerCallback([]); // Вызываем с пустым списком мутаций для начальной проверки
    }

    // --- ------------------------------------------------------------------- ---
    // --- ----------------------- ИНИЦИАЛИЗАЦИЯ СКРИПТА ------------------- ---
    // --- ------------------------------------------------------------------- ---
    function initialize() {
        if (document.getElementById(CONFIG.UI_CONTAINER_ID)) {
            logError('Prod Helper UI v2 is already initialized. Aborting.');
            return;
        }
        logInfo('Initializing Production Helper v2...');

        loadDataFromStorage(); // Загружаем данные ДО создания UI
        buildMainUI();         // Строим UI

        // (Заполняем селекты и UI после их создания, это перенесено в setInitialUIStates)
        // setInitialUIStates() вызывается внутри buildMainUI после DOM-манипуляций

        updateRealTimeClockDisplay();
        updateStatisticsAndGraph();   // Первичный расчет статистики и отрисовка графика
        updateNotesHistoryDisplay();  // Обновляем отображение заметок

        state.intervals.realTimeClock = setInterval(updateRealTimeClockDisplay, 1000);
        state.intervals.statisticsAndGraph = setInterval(updateStatisticsAndGraph, CONFIG.STATS_UPDATE_INTERVAL_MS);

        if (state.autoClickEnabled) {
            initializeMutationObserver();
        }

        // Обработчик PageDown
        state.pageKeydownListener = handlePageKeydown; // Сохраняем ссылку для removeEventListener
        document.addEventListener('keydown', state.pageKeydownListener);

        window.addEventListener('beforeunload', saveDataToStorage);
        window.productionHelperV2Initialized = true;
        logInfo('Production Helper v2 initialized successfully.');
    }

    function destroy() { // Для возможной "перезагрузки" из консоли
        logInfo('Destroying Production Helper v2...');
        saveDataToStorage();
        if (state.mutationObserver) state.mutationObserver.disconnect();
        Object.values(state.intervals).forEach(clearInterval);
        if (state.domElements.uiContainer) state.domElements.uiContainer.remove();
        if (state.domElements.emergencyShowButton) state.domElements.emergencyShowButton.remove();
        if(state.pageKeydownListener) document.removeEventListener('keydown', state.pageKeydownListener);

        window.removeEventListener('beforeunload', saveDataToStorage);
        delete window.productionHelperV2Initialized;
        logInfo('Production Helper v2 destroyed.');
    }

    // --- Запуск ---
    if (window.productionHelperV2Initialized) {
        // Если предыдущая версия скрипта была запущена, можно ее "уничтожить"
        // if(typeof window.destroyProductionHelperV1 === 'function') window.destroyProductionHelperV1();
        // А затем, если нужно, запросить подтверждение на запуск новой.
        // Но т.к. у нас есть проверка по ID контейнера, это не строго обязательно.
        logError("Prod Helper v2: Attempting to initialize again, but a version (or this one) might be running.");
        // Можно добавить: return; если не хотим затирать старую версию.
        // Но для отладки часто удобно выполнить destroy() предыдущей и initialize() новой.
        // if (typeof window.destroyProductionHelperV2 === 'function') window.destroyProductionHelperV2();
    }
    // Сохраняем функцию destroy в глобальной области для ручного вызова из консоли
    window.destroyProductionHelperV2 = destroy;


    // Запускаем инициализацию
    // Проверка document.readyState нужна, если скрипт внедряется очень рано
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initialize();
    } else {
        document.addEventListener('DOMContentLoaded', initialize, { once: true });
    }

})();
