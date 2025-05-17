// ==UserScript==
// @name         Production Helper UI (Enterprise Edition)
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Advanced UI for production department statistics and automation.
// @author       Your Name/AI Assistant
// @match        *://*/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    // --- ------------------------------------------------------------------- ---
    // --- --------- CONFIGURATION (Все можно настроить здесь) ------------- ---
    // --- ------------------------------------------------------------------- ---
    const CONFIG = {
        // --- General UI & Styling ---
        UI_CONTAINER_ID: 'enterpriseProductionHelperUI',
        UI_BOTTOM_OFFSET: '10px',            // Отступ основного UI снизу
        UI_RIGHT_OFFSET: '10px',             // Отступ основного UI справа
        UI_WIDTH_PERCENT_VIEWPORT: 70,       // Ширина основного UI в % от ширины окна
        UI_HEIGHT_PERCENT_VIEWPORT: 18,      // Высота UI в % от высоты видимой части окна
        UI_MIN_HEIGHT_PX: 120,               // Минимальная высота UI, чтобы не схлопывался
        UI_BACKGROUND_COLOR: 'rgba(30, 35, 45, 0.75)', // Темно-сине-серый, полупрозрачный
        UI_TEXT_COLOR: 'rgba(230, 230, 240, 0.85)',   // Светлый, слегка синеватый текст
        UI_BORDER_COLOR: 'rgba(80, 120, 220, 0.75)',  // Более яркая синяя рамка
        FONT_FAMILY: '"Segoe UI", Roboto, Arial, sans-serif', // Современный шрифт
        CLICKER_BUTTON_COLOR: 'rgba(140, 60, 160, 0.85)', // Насыщенный фиолетовый
        CLICKER_BUTTON_TEXT: 'РЕГИСТРАЦИЯ (+1)',
        STATS_GRAPH_COLOR: 'rgba(60, 220, 100, 0.75)', // Ярко-зеленый для графика

        // --- Emergency Hide/Show ---
        EMERGENCY_HIDE_BUTTON_ID: 'emergencyHideProdHelperBtn',
        EMERGENCY_SHOW_BUTTON_ID: 'emergencyShowProdHelperBtn',
        EMERGENCY_SHOW_BUTTON_SIZE: '25px',       // Размер маленькой кнопки "показать"
        EMERGENCY_SHOW_BUTTON_OPACITY: 0.25,      // Начальная прозрачность кнопки "показать"

        // --- Clicker & Counter ---
        CLICKER_BUTTON_ID: 'manualProdClickerBtn',
        CLICKER_COUNTER_ID: 'prodClickerCounter',

        // --- Real-time Clock (внутри UI) ---
        CLOCK_DISPLAY_ID: 'prodRealTimeClock',
        CLOCK_FONT_SIZE: '0.9em',                 // Размер шрифта для часов

        // --- Shift Settings ---
        DEFAULT_DAY_SHIFT_START_TIME: '07:15',    // Время начала дневной смены
        DEFAULT_NIGHT_SHIFT_START_TIME: '19:15',  // Время начала ночной смены
        SETTINGS_SHIFT_TYPE_SELECT_ID: 'prodSettingsShiftType',
        SETTINGS_SHIFT_START_TIME_INPUT_ID: 'prodSettingsShiftStartTime',

        // --- Lunch Settings ---
        SETTINGS_LUNCH_TIME_SELECT_ID: 'prodSettingsLunchTime',
        DEFAULT_LUNCH_OPTIONS: [
            { text: "Без обеда", start: "00:00", end: "00:00" }, // Должен быть первым, если DEFAULT_LUNCH_INDEX = 0
            { text: "Обед Гр.1 (10:30-11:00)", start: "10:30", end: "11:00" },
            { text: "Обед Гр.2 (11:00-11:30)", start: "11:00", end: "11:30" },
            { text: "Обед Гр.3 (11:30-12:00)", start: "11:30", end: "12:00" },
            { text: "Обед Гр.4 (12:00-12:30)", start: "12:00", end: "12:30" },
            // Можно добавить еще варианты
        ],
        DEFAULT_LUNCH_INDEX: 0,                // Индекс опции "Без обеда" по умолчанию

        // --- Statistics Display ---
        STATS_TOTAL_CLICKS_ID: 'prodStatsTotalClicks',
        STATS_SESSION_START_TIME_ID: 'prodStatsSessionStartTime',
        STATS_EFFECTIVE_WORK_TIME_ID: 'prodStatsEffectiveWorkTime',
        STATS_CLICKS_PER_HOUR_ID: 'prodStatsClicksPerHour',
        STATS_UPDATE_INTERVAL_MS: 3000,        // Обновление статистики каждые 3 секунды
        STATS_GRAPH_ID: 'prodStatsPulseGraph',
        STATS_GRAPH_HEIGHT_PX: 45,             // Высота холста для графика
        STATS_GRAPH_POINTS_COUNT: 60,          // Кол-во точек на графике (60 * 3сек = 3 мин истории)

        // --- Auto-Clicker Trigger (!!! КРИТИЧЕСКИ ВАЖНО НАСТРОИТЬ !!!) ---
        AUTO_CLICK_TRIGGER_WORD: 'MOgoskury',                             // Ключевое слово
        SCANNER_INPUT_SELECTOR: 'input#scannerField',                     // CSS-селектор поля ввода сканера
        TRIGGER_WORD_CONTAINER_SELECTOR: 'div#operationResultDisplay',    // CSS-селектор элемента, где появляется триггерное слово
        AUTO_CLICK_ENABLED_CHECKBOX_ID: 'prodAutoClickEnabled',

        // --- Storage Settings ---
        STORAGE_KEY_PREFIX: 'enterpriseProdHelper_v1.1_', // Уникальный префикс для ключей
        USE_SESSION_STORAGE: true,                        // true = sessionStorage (очистка при закрытии браузера), false = localStorage (дольше)

        // --- UI Lock & Settings Panel ---
        LOCK_UI_BUTTON_ID: 'prodLockHelperUIBtn',
        SETTINGS_PANEL_ID: 'prodHelperSettingsPanel',
        TOGGLE_SETTINGS_BUTTON_ID: 'prodToggleSettingsBtn',
        SETTINGS_PANEL_BACKGROUND: 'rgba(45, 50, 65, 0.92)',// Фон панели настроек (чуть менее прозрачный)
        DEBUG_MODE: true, // Включить/выключить дополнительные логи в консоль
    };

    // --- ------------------------------------------------------------------- ---
    // --- --------- SCRIPT STATE (Не изменять напрямую извне) ------------- ---
    // --- ------------------------------------------------------------------- ---
    const state = {
        uiVisible: true,
        uiLocked: false,
        settingsPanelVisible: false,
        totalClicks: 0,
        shiftType: 'auto', // 'auto', 'day', 'night'
        shiftStartTime: null, // объект Date
        selectedLunchOption: CONFIG.DEFAULT_LUNCH_OPTIONS[CONFIG.DEFAULT_LUNCH_INDEX],
        autoClickEnabled: true,
        clicksInCurrentInterval: 0, // для подсчета кликов между обновлениями графика
        graphDataPoints: [], // массив чисел (клики за интервал) для графика
        sessionStartTimestamp: Date.now(), // Время первого запуска скрипта (в текущей сессии)
        isMOgoskuryCurrentlyVisible: false, // Флаг для отслеживания состояния триггерного слова
        domElements: {}, // Кэш созданных DOM-элементов UI
        intervals: {},   // Для хранения ID интервалов (clearInterval)
        mutationObserver: null, // Экземпляр MutationObserver
    };

    // --- ------------------------------------------------------------------- ---
    // --- --------------------- UTILITY FUNCTIONS ------------------------- ---
    // --- ------------------------------------------------------------------- ---

    function logDebug(...args) {
        if (CONFIG.DEBUG_MODE) {
            console.log('[ProdHelper DEBUG]', ...args);
        }
    }
    function logInfo(...args) {
        console.log('[ProdHelper INFO]', ...args);
    }
    function logError(...args) {
        console.error('[ProdHelper ERROR]', ...args);
    }

    function getStorage() {
        return CONFIG.USE_SESSION_STORAGE ? sessionStorage : localStorage;
    }

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
                selectedLunchOptionIndex: lunchIndex > -1 ? lunchIndex :CONFIG.DEFAULT_LUNCH_INDEX,
                autoClickEnabled: state.autoClickEnabled,
                uiVisible: state.uiVisible,
                uiLocked: state.uiLocked, // Сохраняем состояние блокировки
                settingsPanelVisible: state.settingsPanelVisible, // Сохраняем видимость панели настроек
            };
            storage.setItem(CONFIG.STORAGE_KEY_PREFIX + 'data', JSON.stringify(dataToSave));
            logDebug('Data saved to storage:', dataToSave);
        } catch (e) {
            logError('Failed to save data to storage:', e);
        }
    }

    function loadDataFromStorage() {
        try {
            const storage = getStorage();
            const savedDataJSON = storage.getItem(CONFIG.STORAGE_KEY_PREFIX + 'data');
            if (savedDataJSON) {
                const savedData = JSON.parse(savedDataJSON);
                state.totalClicks = parseInt(savedData.totalClicks, 10) || 0;
                state.shiftType = savedData.shiftType || 'auto';
                if (savedData.shiftStartTimeISO) {
                    state.shiftStartTime = new Date(savedData.shiftStartTimeISO);
                }
                const lunchIndex = parseInt(savedData.selectedLunchOptionIndex, 10);
                if (!isNaN(lunchIndex) && CONFIG.DEFAULT_LUNCH_OPTIONS[lunchIndex]) {
                    state.selectedLunchOption = CONFIG.DEFAULT_LUNCH_OPTIONS[lunchIndex];
                } else {
                    state.selectedLunchOption = CONFIG.DEFAULT_LUNCH_OPTIONS[CONFIG.DEFAULT_LUNCH_INDEX];
                }
                state.autoClickEnabled = typeof savedData.autoClickEnabled === 'boolean' ? savedData.autoClickEnabled : true;
                state.uiVisible = typeof savedData.uiVisible === 'boolean' ? savedData.uiVisible : true;
                state.uiLocked = typeof savedData.uiLocked === 'boolean' ? savedData.uiLocked : false;
                state.settingsPanelVisible = typeof savedData.settingsPanelVisible === 'boolean' ? savedData.settingsPanelVisible : false;

                logInfo('Data loaded from storage.');
                // sessionStartTimestamp не загружается, он всегда текущий для сессии скрипта

                // Если данные загружены, но время начала смены не определено (старые данные или ошибка),
                // или если оно явно в прошлом и не соответствует текущему авто-определению (можно добавить логику)
                if (!state.shiftStartTime) {
                    determineAndSetShiftStartTime();
                }

            } else {
                logInfo('No saved data found. Initializing with defaults.');
                determineAndSetShiftStartTime(); // Определяем при первом запуске
            }
        } catch (e) {
            logError('Failed to load data from storage:', e);
            determineAndSetShiftStartTime(); // В случае ошибки загрузки, инициализируем время смены
        }
    }

    function timeHHMMToMinutes(timeStr) { // "HH:MM"
        if (!timeStr || !timeStr.includes(':')) return 0;
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
    }

    function formatDateToHHMM(dateObj) {
        if (!dateObj || !(dateObj instanceof Date)) return "N/A";
        return `${String(dateObj.getHours()).padStart(2, '0')}:${String(dateObj.getMinutes()).padStart(2, '0')}`;
    }

    function formatMsToDuration(ms) {
        if (isNaN(ms) || ms < 0) ms = 0;
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        // const seconds = totalSeconds % 60; // Секунды для отладки, в UI обычно не нужны
        return `${String(hours).padStart(2, '0')}ч ${String(minutes).padStart(2, '0')}м`;
    }

    function createDOMElement(tag, attributes = {}, children = []) {
        const element = document.createElement(tag);
        for (const key in attributes) {
            if (key === 'style' && typeof attributes[key] === 'object') {
                Object.assign(element.style, attributes[key]);
            } else if (key === 'dataset' && typeof attributes[key] === 'object') {
                 Object.assign(element.dataset, attributes[key]);
            } else if (key === 'textContent' || key === 'innerHTML' || key === 'value' || key === 'checked' || key === 'disabled' ) {
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

    // --- Далее будет ОЧЕНЬ МНОГО КОДА для UI и логики ---
    // Я разобью его на части в следующих мыслях/ответах, если потребуется.
    // Постараюсь вместить сюда максимум.

    // --- ------------------------------------------------------------------- ---
    // --- ----------------------- UI CREATION & MGMT ---------------------- ---
    // --- ------------------------------------------------------------------- ---

    function buildMainUI() {
        if (document.getElementById(CONFIG.UI_CONTAINER_ID)) {
            logError('UI container already exists. Aborting UI build.');
            return;
        }

        const uiContainer = createDOMElement('div', {
            id: CONFIG.UI_CONTAINER_ID,
            style: {
                position: 'fixed',
                bottom: CONFIG.UI_BOTTOM_OFFSET,
                right: CONFIG.UI_RIGHT_OFFSET,
                width: `${CONFIG.UI_WIDTH_PERCENT_VIEWPORT}vw`,
                height: `${CONFIG.UI_HEIGHT_PERCENT_VIEWPORT}vh`,
                minHeight: `${CONFIG.UI_MIN_HEIGHT_PX}px`,
                backgroundColor: CONFIG.UI_BACKGROUND_COLOR,
                border: `2px solid ${CONFIG.UI_BORDER_COLOR}`,
                borderRadius: '10px',
                boxSizing: 'border-box',
                color: CONFIG.UI_TEXT_COLOR,
                fontFamily: CONFIG.FONT_FAMILY,
                zIndex: '2147483645', // Высокий z-index
                display: 'flex',
                flexDirection: 'column',
                padding: '8px 12px',
                overflow: 'hidden',
                boxShadow: '0 0 25px rgba(0,0,0,0.4)',
                transition: 'opacity 0.25s ease-out, transform 0.25s ease-out',
            }
        });
        state.domElements.uiContainer = uiContainer;

        // --- Top Controls Bar (Settings, Lock, Hide) ---
        const topControls = createDOMElement('div', {
            style: { display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '5px', flexShrink: 0 }
        });
        const controlButtonBaseStyle = {
            cursor: 'pointer', background: 'none', border: '1px solid rgba(255,255,255,0.2)',
            color: CONFIG.UI_TEXT_COLOR, borderRadius: '5px', padding: '3px 6px', fontSize: '0.9em',
            marginLeft: '5px', transition: 'background-color 0.2s, border-color 0.2s'
        };

        state.domElements.toggleSettingsButton = createDOMElement('button', {
            id: CONFIG.TOGGLE_SETTINGS_BUTTON_ID, textContent: 'Настройки ⚙️', title: 'Открыть/Закрыть панель настроек',
            style: {...controlButtonBaseStyle}
        });
        state.domElements.toggleSettingsButton.addEventListener('click', toggleSettingsPanelVisibility);

        state.domElements.lockUIButton = createDOMElement('button', {
            id: CONFIG.LOCK_UI_BUTTON_ID, textContent: '🔓 Блок.', title: 'Заблокировать/Разблокировать интерфейс (кроме кликера)',
            style: {...controlButtonBaseStyle}
        });
        state.domElements.lockUIButton.addEventListener('click', toggleUILockState);

        state.domElements.emergencyHideButton = createDOMElement('button', {
            id: CONFIG.EMERGENCY_HIDE_BUTTON_ID, textContent: 'Свернуть ✕', title: 'Свернуть интерфейс',
            style: {...controlButtonBaseStyle, backgroundColor: 'rgba(180, 50, 50, 0.3)'}
        });
        state.domElements.emergencyHideButton.addEventListener('click', () => setUIVisibility(false));

        topControls.append(state.domElements.toggleSettingsButton, state.domElements.lockUIButton, state.domElements.emergencyHideButton);
        uiContainer.appendChild(topControls);

        // --- Main Content Area (Кликер, Статистика, График) ---
        const mainContentArea = createDOMElement('div', {
            style: { display: 'flex', flexGrow: 1, gap: '12px', overflow: 'hidden', position: 'relative' /* Для панели настроек */ }
        });

        // --- Кликер-зона (Центральная или левая часть) ---
        const clickerZone = createDOMElement('div', {
            style: {
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                flexBasis: '35%', // Можно настроить ширину
                padding: '10px', borderRight: `1px solid rgba(255,255,255,0.1)`
            }
        });
        state.domElements.clickerCounter = createDOMElement('div', {
            id: CONFIG.CLICKER_COUNTER_ID, textContent: '0',
            style: { fontSize: '3.5em', fontWeight: 'bold', color: 'white', marginBottom: '10px', lineHeight: '1'  }
        });
        state.domElements.clickerButton = createDOMElement('button', {
            id: CONFIG.CLICKER_BUTTON_ID, textContent: CONFIG.CLICKER_BUTTON_TEXT,
            tabIndex: -1, // Недоступна для выбора с клавиатуры
            style: {
                padding: '12px 20px', fontSize: '1.1em', fontWeight: '500', cursor: 'pointer',
                backgroundColor: CONFIG.CLICKER_BUTTON_COLOR, color: 'white', border: 'none', borderRadius: '6px',
                userSelect: 'none', letterSpacing: '0.5px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)', transition: 'transform 0.1s, background-color 0.15s'
            }
        });
        state.domElements.clickerButton.addEventListener('mousedown', e => {
            e.preventDefault();  // Предотвращаем фокус
            state.domElements.clickerButton.style.transform = 'scale(0.97)';
        });
        state.domElements.clickerButton.addEventListener('mouseup', () => state.domElements.clickerButton.style.transform = 'scale(1)');
        state.domElements.clickerButton.addEventListener('mouseleave', () => state.domElements.clickerButton.style.transform = 'scale(1)'); // Если мышь ушла с зажатой кнопкой
        state.domElements.clickerButton.addEventListener('click', handleManualRegistration);
        clickerZone.append(state.domElements.clickerCounter, state.domElements.clickerButton);

        // --- Зона статистики и графика (Правая часть) ---
        const statsZone = createDOMElement('div', {
            style: { display: 'flex', flexDirection: 'column', flexGrow: 1, padding: '5px 10px', justifyContent: 'space-between' }
        });
        const statsTextContainer = createDOMElement('div', { style: { fontSize: '0.85em', lineHeight: '1.5' }});
        state.domElements.statsTotalClicks = createDOMElement('p', { id: CONFIG.STATS_TOTAL_CLICKS_ID, textContent: 'Всего регистраций: 0' });
        state.domElements.statsSessionStartTime = createDOMElement('p', { id: CONFIG.STATS_SESSION_START_TIME_ID, textContent: 'Начало смены: N/A' });
        state.domElements.statsEffectiveWorkTime = createDOMElement('p', { id: CONFIG.STATS_EFFECTIVE_WORK_TIME_ID, textContent: 'Эффективное время: 00ч 00м' });
        state.domElements.statsClicksPerHour = createDOMElement('p', { id: CONFIG.STATS_CLICKS_PER_HOUR_ID, textContent: 'Регистраций/час: 0.0' });
        statsTextContainer.append(
            state.domElements.statsTotalClicks, state.domElements.statsSessionStartTime,
            state.domElements.statsEffectiveWorkTime, state.domElements.statsClicksPerHour
        );

        state.domElements.statsGraphCanvas = createDOMElement('canvas', { id: CONFIG.STATS_GRAPH_ID });
        state.domElements.statsGraphCanvas.height = CONFIG.STATS_GRAPH_HEIGHT_PX; // Ширина установится после добавления в DOM
        statsZone.append(statsTextContainer, state.domElements.statsGraphCanvas);

        mainContentArea.append(clickerZone, statsZone);
        uiContainer.appendChild(mainContentArea);

        // --- Нижняя панель с часами ---
        const bottomBar = createDOMElement('div', {
            style: { marginTop: 'auto', paddingTop: '5px', borderTop: `1px solid rgba(255,255,255,0.1)`, textAlign: 'right', flexShrink: 0 }
        });
        state.domElements.realTimeClock = createDOMElement('div', {
            id: CONFIG.CLOCK_DISPLAY_ID, textContent: '00:00:00',
            style: { fontSize: CONFIG.CLOCK_FONT_SIZE, fontFamily: 'monospace', display: 'inline-block' }
        });
        bottomBar.appendChild(state.domElements.realTimeClock);
        uiContainer.appendChild(bottomBar);

        // --- Панель настроек (изначально скрыта и позиционируется абсолютно внутри mainContentArea или uiContainer) ---
        buildSettingsPanel(); // Функция создаст панель и добавит ее в state.domElements.settingsPanel
        mainContentArea.appendChild(state.domElements.settingsPanel); // Добавляем ее, чтобы она была в потоке для display:none

        // --- Кнопка "Показать интерфейс" (изначально скрыта) ---
        buildEmergencyShowButton();

        document.body.appendChild(uiContainer);

        // Важно: установить ширину canvas ПОСЛЕ того, как он добавлен в DOM и имеет размеры
        state.domElements.statsGraphCanvas.width = state.domElements.statsGraphCanvas.offsetWidth;

        // Применить начальные состояния видимости и блокировки
        setUIVisibility(state.uiVisible);
        setUILockState(state.uiLocked); // Используем новую функцию для установки начального состояния
        setSettingsPanelVisibility(state.settingsPanelVisible); // И для настроек
        updateClickerCounter(); // Отобразить загруженный счетчик
        logInfo('Main UI built and appended to body.');
    }

    function buildEmergencyShowButton() {
        state.domElements.emergencyShowButton = createDOMElement('button', {
            id: CONFIG.EMERGENCY_SHOW_BUTTON_ID, textContent: '🛠️', title: 'Развернуть интерфейс рабочего места',
            style: {
                position: 'fixed',
                bottom: CONFIG.UI_BOTTOM_OFFSET,
                right: CONFIG.UI_RIGHT_OFFSET,
                width: CONFIG.EMERGENCY_SHOW_BUTTON_SIZE,
                height: CONFIG.EMERGENCY_SHOW_BUTTON_SIZE,
                backgroundColor: 'rgba(50,60,80,0.5)',
                border: `1px solid ${CONFIG.UI_BORDER_COLOR}`,
                color: CONFIG.UI_TEXT_COLOR,
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'none', // Изначально невидима
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: '2147483646', // Выше всего
                opacity: String(CONFIG.EMERGENCY_SHOW_BUTTON_OPACITY),
                transition: 'opacity 0.2s ease, transform 0.2s ease',
                fontSize: '14px'
            }
        });
        state.domElements.emergencyShowButton.addEventListener('mouseover', () => {
            state.domElements.emergencyShowButton.style.opacity = '1';
            state.domElements.emergencyShowButton.style.transform = 'scale(1.1)';
        });
        state.domElements.emergencyShowButton.addEventListener('mouseout', () => {
            state.domElements.emergencyShowButton.style.opacity = String(CONFIG.EMERGENCY_SHOW_BUTTON_OPACITY);
            state.domElements.emergencyShowButton.style.transform = 'scale(1)';
        });
        state.domElements.emergencyShowButton.addEventListener('click', () => setUIVisibility(true));
        document.body.appendChild(state.domElements.emergencyShowButton);
    }

    function buildSettingsPanel() {
        // Создаем панель
        const panel = createDOMElement('div', {
            id: CONFIG.SETTINGS_PANEL_ID,
            style: {
                position: 'absolute', // Относительно mainContentArea или uiContainer
                top: '0px', right: '0px', bottom: '0px', // Растянем на всю высоту mainContentArea
                width: '280px', // Фиксированная ширина или %
                backgroundColor: CONFIG.SETTINGS_PANEL_BACKGROUND,
                borderLeft: `2px solid ${CONFIG.UI_BORDER_COLOR}`,
                padding: '15px',
                zIndex: '100', // Выше остального содержимого uiContainer
                display: 'none', // Изначально скрыта
                flexDirection: 'column',
                gap: '12px',
                overflowY: 'auto', // Если настроек много
                boxShadow: '-5px 0px 15px rgba(0,0,0,0.2)',
                transition: 'transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)'
            }
        });
        state.domElements.settingsPanel = panel;

        const heading = createDOMElement('h3', { textContent: 'Параметры смены и отображения', style: { marginTop: '0', marginBottom: '10px', textAlign: 'center', color: 'white', fontSize: '1.1em'} });
        panel.appendChild(heading);

        // --- Настройка типа смены ---
        const shiftTypeGroup = createDOMElement('div');
        shiftTypeGroup.appendChild(createDOMElement('label', { for: CONFIG.SETTINGS_SHIFT_TYPE_SELECT_ID, textContent: 'Тип смены:', style: { display: 'block', marginBottom: '3px'} }));
        state.domElements.settingsShiftTypeSelect = createDOMElement('select', { id: CONFIG.SETTINGS_SHIFT_TYPE_SELECT_ID, style: {width: '100%', padding: '5px', backgroundColor: 'rgba(0,0,0,0.3)', color: CONFIG.UI_TEXT_COLOR, border: '1px solid #555'} });
        [['auto', 'Автоматически'], ['day', 'Дневная (с ' + CONFIG.DEFAULT_DAY_SHIFT_START_TIME + ')'], ['night', 'Ночная (с ' + CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME + ')']].forEach(([val, txt]) => {
            state.domElements.settingsShiftTypeSelect.add(new Option(txt, val));
        });
        state.domElements.settingsShiftTypeSelect.value = state.shiftType;
        state.domElements.settingsShiftTypeSelect.addEventListener('change', handleShiftSettingsChange);
        shiftTypeGroup.appendChild(state.domElements.settingsShiftTypeSelect);
        panel.appendChild(shiftTypeGroup);

        // --- Настройка времени начала смены (ручная) ---
        const shiftStartTimeGroup = createDOMElement('div');
        shiftStartTimeGroup.appendChild(createDOMElement('label', { for: CONFIG.SETTINGS_SHIFT_START_TIME_INPUT_ID, textContent: 'Время начала (если не авто):', style: { display: 'block', marginBottom: '3px'} }));
        state.domElements.settingsShiftStartTimeInput = createDOMElement('input', {
            type: 'time', id: CONFIG.SETTINGS_SHIFT_START_TIME_INPUT_ID,
            style: {width: '100%', padding: '5px', boxSizing: 'border-box', backgroundColor: 'rgba(0,0,0,0.3)', color: CONFIG.UI_TEXT_COLOR, border: '1px solid #555'}
        });
        if (state.shiftStartTime) state.domElements.settingsShiftStartTimeInput.value = formatDateToHHMM(state.shiftStartTime);
        state.domElements.settingsShiftStartTimeInput.addEventListener('change', handleShiftSettingsChange);
        shiftStartTimeGroup.appendChild(state.domElements.settingsShiftStartTimeInput);
        panel.appendChild(shiftStartTimeGroup);

        // --- Настройка обеда ---
        const lunchGroup = createDOMElement('div');
        lunchGroup.appendChild(createDOMElement('label', { for: CONFIG.SETTINGS_LUNCH_TIME_SELECT_ID, textContent: 'Обеденный перерыв:', style: { display: 'block', marginBottom: '3px'} }));
        state.domElements.settingsLunchSelect = createDOMElement('select', { id: CONFIG.SETTINGS_LUNCH_TIME_SELECT_ID, style: {width: '100%', padding: '5px', backgroundColor: 'rgba(0,0,0,0.3)', color: CONFIG.UI_TEXT_COLOR, border: '1px solid #555'} });
        CONFIG.DEFAULT_LUNCH_OPTIONS.forEach((opt, index) => {
            state.domElements.settingsLunchSelect.add(new Option(opt.text, String(index)));
        });
        const currentLunchIndex = CONFIG.DEFAULT_LUNCH_OPTIONS.findIndex(opt => opt.start === state.selectedLunchOption.start && opt.end === state.selectedLunchOption.end);
        state.domElements.settingsLunchSelect.value = String(currentLunchIndex > -1 ? currentLunchIndex : CONFIG.DEFAULT_LUNCH_INDEX);
        state.domElements.settingsLunchSelect.addEventListener('change', handleLunchSettingChange);
        lunchGroup.appendChild(state.domElements.settingsLunchSelect);
        panel.appendChild(lunchGroup);

        // --- Чекбокс авто-клика ---
        const autoClickGroup = createDOMElement('div', {style: {marginTop: '10px'}});
        const autoClickLabel = createDOMElement('label', { style: { display: 'flex', alignItems: 'center', cursor: 'pointer' } });
        state.domElements.autoClickEnabledCheckbox = createDOMElement('input', { type: 'checkbox', id: CONFIG.AUTO_CLICK_ENABLED_CHECKBOX_ID, checked: state.autoClickEnabled, style: { marginRight: '8px', transform: 'scale(1.2)' } });
        state.domElements.autoClickEnabledCheckbox.addEventListener('change', (e) => {
            state.autoClickEnabled = e.target.checked;
            logInfo(`Auto-click is now ${state.autoClickEnabled ? 'ENABLED' : 'DISABLED'}`);
            saveDataToStorage();
            // Перезапустить/остановить MutationObserver если нужно
            if (state.autoClickEnabled && !state.mutationObserver) {
                initializeMutationObserver();
            } else if (!state.autoClickEnabled && state.mutationObserver) {
                state.mutationObserver.disconnect();
                state.mutationObserver = null;
                logDebug('MutationObserver disconnected for auto-click.');
            }
        });
        autoClickLabel.append(state.domElements.autoClickEnabledCheckbox, 'Включить авто-регистрацию (по слову "MOgoskury")');
        autoClickGroup.appendChild(autoClickLabel);
        panel.appendChild(autoClickGroup);

        // Кнопка "Закрыть настройки" внутри панели
        const closeSettingsBtn = createDOMElement('button', {
            textContent: 'Закрыть настройки',
            style: {
                width: '100%', padding: '8px', marginTop: 'auto', // Прижать к низу панели если она не скроллится
                backgroundColor: 'rgba(80,90,110,0.7)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'
            }
        });
        closeSettingsBtn.addEventListener('click', () => setSettingsPanelVisibility(false));
        panel.appendChild(closeSettingsBtn);

        updateManualShiftTimeInputVisibility(); // Первичная настройка видимости поля времени
    }


    function setUIVisibility(visible) {
        state.uiVisible = visible;
        if (state.domElements.uiContainer) {
            state.domElements.uiContainer.style.opacity = visible ? '1' : '0';
            state.domElements.uiContainer.style.transform = visible ? 'translateY(0)' : 'translateY(20px)'; // Эффект выезда
            state.domElements.uiContainer.style.pointerEvents = visible ? 'auto' : 'none';
        }
        if (state.domElements.emergencyShowButton) {
            state.domElements.emergencyShowButton.style.display = visible ? 'none' : 'flex';
        }
        if (!visible && state.settingsPanelVisible) { // Если скрываем UI, скрываем и настройки
            setSettingsPanelVisibility(false);
        }
        saveDataToStorage();
    }

    function toggleUILockState() {
        setUILockState(!state.uiLocked);
    }

    function setUILockState(locked) {
        if (!state.uiVisible && locked) return; // Нельзя заблокировать невидимый интерфейс
        state.uiLocked = locked;

        state.domElements.lockUIButton.textContent = state.uiLocked ? '🔒 Разблок.' : '🔓 Блок.';
        state.domElements.lockUIButton.title = state.uiLocked ? 'Разблокировать интерфейс' : 'Заблокировать интерфейс (кроме кликера)';
        state.domElements.lockUIButton.style.backgroundColor = state.uiLocked ? 'rgba(200, 80, 80, 0.4)' : '';

        // Элементы, которые блокируются (кроме кнопки кликера и самой кнопки блокировки)
        const elementsToToggle = [
            state.domElements.toggleSettingsButton,
            state.domElements.emergencyHideButton,
            // Все элементы внутри панели настроек, если она видима
            ...(state.settingsPanelVisible ? state.domElements.settingsPanel.querySelectorAll('input, select, button:not(#'+CONFIG.LOCK_UI_BUTTON_ID+')') : [])
        ];

        elementsToToggle.forEach(el => {
            if (el) {
                 el.disabled = state.uiLocked;
                 el.style.opacity = state.uiLocked ? '0.5' : '1';
                 el.style.cursor = state.uiLocked ? 'not-allowed' : 'default';
            }
        });
         // Если панель настроек ОТДЕЛЬНО (не через querySelectorAll), то ее контейнер тоже можно "дизейблить"
        if (state.domElements.settingsPanel) {
            state.domElements.settingsPanel.style.pointerEvents = (state.uiLocked && state.settingsPanelVisible) ? 'none' : 'auto';
        }

        logInfo(`UI is now ${state.uiLocked ? 'LOCKED' : 'UNLOCKED'}`);
        saveDataToStorage();
    }

    function toggleSettingsPanelVisibility() {
        setSettingsPanelVisibility(!state.settingsPanelVisible);
    }

    function setSettingsPanelVisibility(visible) {
        state.settingsPanelVisible = visible;
        if (state.domElements.settingsPanel) {
            state.domElements.settingsPanel.style.display = visible ? 'flex' : 'none';
            state.domElements.settingsPanel.style.transform = visible ? 'translateX(0)' : 'translateX(100%)'; // Эффект выезда справа
        }
         state.domElements.toggleSettingsButton.textContent = visible ? 'Настройки ◀' : 'Настройки ⚙️';
        state.domElements.toggleSettingsButton.style.backgroundColor = visible ? 'rgba(100,120,160,0.5)' : '';

        // Если открываем настройки, и UI заблокирован, то нужно применить блокировку к элементам настроек
        if (visible && state.uiLocked) {
            setUILockState(true); // Переприменит блокировку
        }
        saveDataToStorage();
    }


    // --- ------------------------------------------------------------------- ---
    // --- ----------------------- EVENT HANDLERS -------------------------- ---
    // --- ------------------------------------------------------------------- ---

    function handleManualRegistration() {
        // Кнопка кликера работает всегда, даже если UI заблокирован.
        state.totalClicks++;
        state.clicksInCurrentInterval++;
        updateClickerCounter();
        updateStatisticsDisplay(); // Чтобы общее кол-во обновилось сразу
        // График обновится по своему таймеру, аккумулируя clicksInCurrentInterval
        saveDataToStorage();
    }

    function updateClickerCounter() {
        if (state.domElements.clickerCounter) {
            state.domElements.clickerCounter.textContent = state.totalClicks;
        }
        if (state.domElements.statsTotalClicks) { // Также обновляем в текстовой статистике
            state.domElements.statsTotalClicks.textContent = `Всего регистраций: ${state.totalClicks}`;
        }
    }

    function handleShiftSettingsChange() {
        state.shiftType = state.domElements.settingsShiftTypeSelect.value;
        if (state.shiftType !== 'auto') {
            const timeValue = state.domElements.settingsShiftStartTimeInput.value;
            if (timeValue) { // Если пользователь что-то ввел
                const [hours, minutes] = timeHHMMToMinutes(timeValue); // эта функция ожидает число, а не строку
                const now = new Date();
                state.shiftStartTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);
            } else { // Если поле времени пустое, а тип не авто - используем дефолт для этого типа
                const defaultTime = state.shiftType === 'day' ? CONFIG.DEFAULT_DAY_SHIFT_START_TIME : CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME;
                const [hours, minutes] = defaultTime.split(':').map(Number);
                const now = new Date();
                state.shiftStartTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);
                // Дополнительно, обработка ночной смены, начавшейся "вчера"
                 if (state.shiftType === 'night' && (new Date().getHours() < hours)) { // Если сейчас УТРО (до 19:15), а смена ночная
                    state.shiftStartTime.setDate(state.shiftStartTime.getDate() - 1);
                 }
            }
        } else { // 'auto'
            determineAndSetShiftStartTime(); // Переопределяем автоматически
        }
        updateManualShiftTimeInputVisibility();
        updateStatisticsDisplay();
        saveDataToStorage();
        logDebug(`Shift settings changed. Type: ${state.shiftType}, Start: ${state.shiftStartTime ? state.shiftStartTime.toLocaleString() : 'N/A'}`);
    }

    function updateManualShiftTimeInputVisibility() {
        const isManual = state.shiftType !== 'auto';
        if (state.domElements.settingsShiftStartTimeInput) {
           state.domElements.settingsShiftStartTimeInput.disabled = !isManual;
           state.domElements.settingsShiftStartTimeInput.style.opacity = isManual ? '1' : '0.5';
           // Если перешли на "авто", отображаем авто-рассчитанное время (disabled)
           if (!isManual && state.shiftStartTime) {
               state.domElements.settingsShiftStartTimeInput.value = formatDateToHHMM(state.shiftStartTime);
           }
        }
        // Также можно скрыть label
        const label = state.domElements.settingsShiftStartTimeInput?.previousElementSibling;
        if (label && label.tagName === 'LABEL') {
           label.style.display = isManual ? 'block' : 'none';
           state.domElements.settingsShiftStartTimeInput.style.display = isManual ? 'block' : 'none'; // И само поле
        }

    }

    function handleLunchSettingChange() {
        const selectedIndex = parseInt(state.domElements.settingsLunchSelect.value, 10);
        if (CONFIG.DEFAULT_LUNCH_OPTIONS[selectedIndex]) {
            state.selectedLunchOption = CONFIG.DEFAULT_LUNCH_OPTIONS[selectedIndex];
            updateStatisticsDisplay();
            saveDataToStorage();
            logDebug(`Lunch option changed: ${state.selectedLunchOption.text}`);
        }
    }

    // --- ------------------------------------------------------------------- ---
    // --- --------------------------- CORE LOGIC -------------------------- ---
    // --- ------------------------------------------------------------------- ---

    function determineAndSetShiftStartTime() {
        const now = new Date();
        let shiftStartHour, shiftStartMinute;
        // Эта функция вызывается только если state.shiftType === 'auto' или для инициализации
        // Если state.shiftType уже установлен на 'day' или 'night' вручную, их время уже должно быть в state.shiftStartTime

        if (state.shiftType === 'auto' || !state.shiftStartTime) { // Если авто или время еще не установлено
            const [dayH, dayM] = CONFIG.DEFAULT_DAY_SHIFT_START_TIME.split(':').map(Number);
            const [nightH, nightM] = CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME.split(':').map(Number);

            const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();
            const dayShiftStartInMinutes = dayH * 60 + dayM;
            const nightShiftStartInMinutes = nightH * 60 + nightM;

            if (currentTimeInMinutes >= dayShiftStartInMinutes && currentTimeInMinutes < nightShiftStartInMinutes) {
                // Текущее время соответствует дневной смене, которая началась сегодня
                [shiftStartHour, shiftStartMinute] = [dayH, dayM];
                state.shiftStartTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), shiftStartHour, shiftStartMinute, 0);
            } else {
                // Либо ночная смена, либо раннее утро (ночная смена со вчера)
                [shiftStartHour, shiftStartMinute] = [nightH, nightM];
                state.shiftStartTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), shiftStartHour, shiftStartMinute, 0);
                if (currentTimeInMinutes < dayShiftStartInMinutes) { // Например, сейчас 3:00, дневная с 7:15. Значит, ночная началась вчера.
                    state.shiftStartTime.setDate(state.shiftStartTime.getDate() - 1);
                }
            }
             logDebug(`Auto-determined shift start time: ${state.shiftStartTime.toLocaleString()}`);
        }
        // Если state.shiftType НЕ 'auto' и state.shiftStartTime УЖЕ есть, эта функция не должна его менять грубо
        // Его изменение происходит в handleShiftSettingsChange
         updateManualShiftTimeInputVisibility(); // Обновим значение в поле ввода, если оно есть
    }

    function updateRealTimeClockDisplay() {
        if (state.domElements.realTimeClock) {
            const now = new Date();
            state.domElements.realTimeClock.textContent = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
        }
    }

    function updateStatisticsDisplay() {
        if (!state.shiftStartTime) {
            determineAndSetShiftStartTime(); // Убедимся, что время смены есть
             if (!state.shiftStartTime) { // Если все еще нет - проблема
                logError("Cannot update statistics: Shift start time is not set.");
                if (state.domElements.statsClicksPerHour) state.domElements.statsClicksPerHour.textContent = 'Регистраций/час: ОШИБКА ВРЕМЕНИ СМЕНЫ';
                return;
             }
        }

        const now = new Date();
        const totalElapsedMs = now.getTime() - state.shiftStartTime.getTime();

        if (totalElapsedMs < 0) { // Начало смены в будущем - обнуляем или показываем предупреждение
             if (state.domElements.statsSessionStartTime) state.domElements.statsSessionStartTime.textContent = `Начало смены: ${formatDateToHHMM(state.shiftStartTime)} (в будущем)`;
             if (state.domElements.statsEffectiveWorkTime) state.domElements.statsEffectiveWorkTime.textContent = 'Эффективное время: 00ч 00м';
             if (state.domElements.statsClicksPerHour) state.domElements.statsClicksPerHour.textContent = 'Регистраций/час: -';
             return;
        }

        // Расчет времени обеда
        let lunchDurationMs = 0;
        const lunchStartAbs = new Date(state.shiftStartTime); // Берем дату начала смены как основу
        const [lunchStartH, lunchStartM] = state.selectedLunchOption.start.split(':').map(Number);
        lunchStartAbs.setHours(lunchStartH, lunchStartM, 0, 0);

        const lunchEndAbs = new Date(state.shiftStartTime);
        const [lunchEndH, lunchEndM] = state.selectedLunchOption.end.split(':').map(Number);
        lunchEndAbs.setHours(lunchEndH, lunchEndM, 0, 0);

        // Если обед переходит через полночь (редко, но возможно для ночных смен)
        if (lunchEndAbs < lunchStartAbs) {
            lunchEndAbs.setDate(lunchEndAbs.getDate() + 1); // Обед заканчивается на следующий день
        }
         // Если сама смена ночная и началась вчера, а обед сегодня (например, смена с 19:15 (вчера), обед в 01:00 (сегодня))
         // lunchStartAbs и lunchEndAbs должны быть скорректированы, если они "перепрыгнули" текущую дату `now` из-за установки часов/минут
         // и если state.shiftStartTime от прошлого дня

        // Проверка, что обед начался и еще не закончился, или уже прошел, но в рамках смены
        const effectiveLunchStart = Math.max(state.shiftStartTime.getTime(), lunchStartAbs.getTime());
        const effectiveLunchEnd = Math.min(now.getTime(), lunchEndAbs.getTime());

        if (effectiveLunchEnd > effectiveLunchStart) {
            lunchDurationMs = effectiveLunchEnd - effectiveLunchStart;
        }

        const effectiveWorkMs = Math.max(0, totalElapsedMs - lunchDurationMs);
        const hoursWorked = effectiveWorkMs / (1000 * 60 * 60);

        if (state.domElements.statsSessionStartTime) state.domElements.statsSessionStartTime.textContent = `Начало смены: ${formatDateToHHMM(state.shiftStartTime)} (${state.shiftType === 'auto' ? 'Авто' : (state.shiftType === 'day' ? 'День' : 'Ночь')})`;
        if (state.domElements.statsEffectiveWorkTime) state.domElements.statsEffectiveWorkTime.textContent = `Эффективное время: ${formatMsToDuration(effectiveWorkMs)}`;

        if (hoursWorked > 0.001) { // Избегаем деления на ноль или очень малые числа
            const clicksPerHour = state.totalClicks / hoursWorked;
            if (state.domElements.statsClicksPerHour) state.domElements.statsClicksPerHour.textContent = `Регистраций/час: ${clicksPerHour.toFixed(1)}`;
        } else {
            if (state.domElements.statsClicksPerHour) state.domElements.statsClicksPerHour.textContent = 'Регистраций/час: 0.0';
        }
    }

    function updateGraphDataAndDraw() {
        state.graphDataPoints.push(state.clicksInCurrentInterval);
        state.clicksInCurrentInterval = 0; // Сбрасываем счетчик для следующего интервала

        while (state.graphDataPoints.length > CONFIG.STATS_GRAPH_POINTS_COUNT) {
            state.graphDataPoints.shift(); // Удаляем старые точки
        }
        // Дополняем нулями слева, если точек меньше, чем нужно для полного графика
        while (state.graphDataPoints.length < CONFIG.STATS_GRAPH_POINTS_COUNT) {
            state.graphDataPoints.unshift(0);
        }

        drawPulseGraph();
    }

    function drawPulseGraph() {
        if (!state.domElements.statsGraphCanvas) return;
        const canvas = state.domElements.statsGraphCanvas;
        const ctx = canvas.getContext('2d');
        const w = canvas.width;
        const h = canvas.height;

        ctx.clearRect(0, 0, w, h);

        if (state.graphDataPoints.length < 2) return;

        const maxPointValue = Math.max(1, ...state.graphDataPoints); // Минимум 1 для масштаба
        const pointWidth = w / (CONFIG.STATS_GRAPH_POINTS_COUNT - 1);

        ctx.strokeStyle = CONFIG.STATS_GRAPH_COLOR;
        ctx.lineWidth = 1.5;
        ctx.beginPath();

        state.graphDataPoints.forEach((pointValue, index) => {
            const x = index * pointWidth;
            const y = h - (pointValue / maxPointValue) * (h * 0.9) - (h*0.05); // 90% высоты для данных, 5% отступ снизу
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();
         // Линия "земли"
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, h-(h*0.05) + 0.5); // +0.5 для четкой линии
        ctx.lineTo(w, h-(h*0.05) + 0.5);
        ctx.stroke();
    }

    function initializeMutationObserver() {
        if (state.mutationObserver) {
            state.mutationObserver.disconnect(); // Отключаем старый, если есть
        }

        const triggerWordContainer = document.querySelector(CONFIG.TRIGGER_WORD_CONTAINER_SELECTOR);
        const scannerInput = document.querySelector(CONFIG.SCANNER_INPUT_SELECTOR);

        if (!triggerWordContainer) {
            logError(`Auto-click: Trigger container "${CONFIG.TRIGGER_WORD_CONTAINER_SELECTOR}" not found. Auto-click will be disabled.`);
            state.autoClickEnabled = false; // Отключаем, так как некуда смотреть
            if (state.domElements.autoClickEnabledCheckbox) state.domElements.autoClickEnabledCheckbox.checked = false;
            if (state.domElements.autoClickEnabledCheckbox) state.domElements.autoClickEnabledCheckbox.disabled = true;
            return;
        }
        if (!scannerInput) {
            logInfo(`Auto-click: Scanner input "${CONFIG.SCANNER_INPUT_SELECTOR}" not found. Trigger will rely solely on trigger word appearance/disappearance.`);
        }

        const observerCallback = (mutationsList) => {
            if (!state.autoClickEnabled) return; // Проверяем флаг

            let mogoSkuryFoundThisMutation = false;
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList' || mutation.type === 'characterData' || (mutation.target && mutation.target.textContent)) {
                    if (mutation.target.textContent?.includes(CONFIG.AUTO_CLICK_TRIGGER_WORD)) {
                        mogoSkuryFoundThisMutation = true;
                        break;
                    }
                }
            }

            if (mogoSkuryFoundThisMutation && !state.isMOgoskuryCurrentlyVisible) {
                logDebug(`MOgoskury detected! Current state: isVisible=false. Setting to true.`);
                state.isMOgoskuryCurrentlyVisible = true;
            } else if (!mogoSkuryFoundThisMutation && state.isMOgoskuryCurrentlyVisible) {
                logDebug(`MOgoskury disappeared! Current state: isVisible=true. Performing auto-click and setting to false.`);
                handleManualRegistration(); // Регистрируем клик
                state.isMOgoskuryCurrentlyVisible = false; // Сбрасываем флаг
            }
        };

        state.mutationObserver = new MutationObserver(observerCallback);
        const observerConfig = { childList: true, subtree: true, characterData: true };
        // Наблюдаем за ближайшим общим предком или за самим контейнером, если он один
        state.mutationObserver.observe(triggerWordContainer, observerConfig);
        logInfo('MutationObserver for auto-click initialized and observing:', triggerWordContainer);

        // Дополнительная логика со сбросом state.isMOgoskuryCurrentlyVisible при вводе в сканнер, если слово УЖЕ пропало.
        if(scannerInput){
            scannerInput.addEventListener('input', () => {
                if (state.isMOgoskuryCurrentlyVisible && !(triggerWordContainer.textContent?.includes(CONFIG.AUTO_CLICK_TRIGGER_WORD))) {
                    // Это условие может быть избыточным, так как MutationObserver должен был это поймать.
                    // Но как "страховка", если событие input сработало раньше, чем observer на исчезновение
                    logDebug("Input in scanner while MOgoskury was visible but now isn't. Firing auto-click as a fallback.");
                    handleManualRegistration();
                    state.isMOgoskuryCurrentlyVisible = false;
                } else if (!state.isMOgoskuryCurrentlyVisible && !(triggerWordContainer.textContent?.includes(CONFIG.AUTO_CLICK_TRIGGER_WORD))) {
                    // Если слова и так нет - просто убеждаемся, что флаг сброшен
                    state.isMOgoskuryCurrentlyVisible = false;
                }
            });
        }
    }


    // --- ------------------------------------------------------------------- ---
    // --- ----------------------- INITIALIZATION -------------------------- ---
    // --- ------------------------------------------------------------------- ---
    function initialize() {
        if (document.getElementById(CONFIG.UI_CONTAINER_ID)) {
            logError('Production Helper UI is already initialized on this page. Aborting.');
            // Возможно, стоит вызвать destroy() для предыдущей копии, если это скрипт Tampermonkey
            // и есть доступ к предыдущему состоянию, но для простого внедрения это не нужно.
            return;
        }
        logInfo('Initializing Enterprise Production Helper...');

        loadDataFromStorage();  // Загружаем сохраненные данные ДО создания UI
        buildMainUI();          // Строим все видимые элементы

        // Устанавливаем начальные значения и состояния отображения после построения UI
        updateClickerCounter();
        updateStatisticsDisplay();
        updateRealTimeClockDisplay();
        updateManualShiftTimeInputVisibility(); // Для корректного отображения поля времени при загрузке
        // Начальная отрисовка графика (скорее всего, будет пустым или с нулями)
        updateGraphDataAndDraw();


        // Запускаем интервалы
        state.intervals.realTimeClock = setInterval(updateRealTimeClockDisplay, 1000);
        state.intervals.statisticsAndGraph = setInterval(() => {
            updateStatisticsDisplay();
            updateGraphDataAndDraw();
        }, CONFIG.STATS_UPDATE_INTERVAL_MS);

        if (state.autoClickEnabled) { // Инициализируем Observer только если авто-клик включен по умолчанию или в настройках
            initializeMutationObserver();
        }

        // Сохраняем данные при выгрузке страницы
        window.addEventListener('beforeunload', saveDataToStorage);

        // Добавляем глобальный флаг, что скрипт инициализирован
        // Это полезно для UserScript менеджеров, чтобы не запускать несколько копий на SPA
        window.enterpriseProductionHelperInitialized = true;

        logInfo('Enterprise Production Helper initialized successfully.');
        // alert('Интерфейс Помощника Производства загружен!'); // Можно раскомментировать для отладки
    }

    function destroy() { // Функция для "самоуничтожения" скрипта, полезна для UserScript'ов
        logInfo('Destroying Enterprise Production Helper...');
        saveDataToStorage(); // Попытка сохранить последнее состояние

        if (state.mutationObserver) state.mutationObserver.disconnect();
        Object.values(state.intervals).forEach(clearInterval);

        if (state.domElements.uiContainer) state.domElements.uiContainer.remove();
        if (state.domElements.emergencyShowButton) state.domElements.emergencyShowButton.remove();
        // Остальные созданные элементы удалятся вместе с контейнером или не требуют явного удаления

        window.removeEventListener('beforeunload', saveDataToStorage);
        delete window.enterpriseProductionHelperInitialized; // Убираем флаг

        logInfo('Enterprise Production Helper destroyed.');
    }

    // --- Запуск ---
    // Проверка, не был ли скрипт уже инициализирован (важно для UserScript менеджеров)
    if (window.enterpriseProductionHelperInitialized) {
        logError("Attempting to initialize Production Helper again, but it's already running. Aborting.");
        return;
    }

    // Запускаем инициализацию после полной загрузки страницы
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initialize();
    } else {
        document.addEventListener('DOMContentLoaded', initialize);
    }

    // Для UserScript'ов можно добавить команды в меню
    if (typeof GM_registerMenuCommand === 'function') {
        GM_registerMenuCommand('Помощник: Перезагрузить данные и UI', () => {
            destroy();
            // Таймаут, чтобы дать DOM очиститься перед новой инициализацией
            setTimeout(initialize, 100);
        });
        GM_registerMenuCommand('Помощник: Сбросить все сохраненные данные', () => {
            const storage = getStorage();
            storage.removeItem(CONFIG.STORAGE_KEY_PREFIX + 'data');
            logInfo('All saved data has been reset. Please reload the page or re-run the script.');
            alert('Все сохраненные данные Помощника сброшены. Перезагрузите или пересоздайте UI.');
            destroy(); // Уничтожаем текущий UI
        });
         GM_registerMenuCommand('Помощник: Уничтожить UI', destroy);
    }

})();
