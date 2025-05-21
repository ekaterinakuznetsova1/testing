/*
    Production Assistant v3.4
    Rewritten based on the original Technical Specification and new requirements.
*/
(function() {
    'use strict';

    // --- ------------------------------------------------------------------------ ---
    // --- --------- SCRIPT CONFIGURATION (All settings are here) --------------- ---
    // --- ------------------------------------------------------------------------ ---
    const CONFIG = {
        // --- General UI & Styling ---
        SCRIPT_ID_PREFIX: 'prodHelper_v3_4_', // Version updated
        UI_CONTAINER_ID: 'prodHelperUI_v3_4_mainContainer',
        UI_BOTTOM_OFFSET: '10px',
        UI_RIGHT_OFFSET: '10px',
        UI_WIDTH_PERCENT_VIEWPORT: 45,
        UI_HEIGHT_PERCENT_VIEWPORT: 35,
        UI_MIN_WIDTH_PX: 1200, // Adjusted from original image observation, seems large
        UI_MIN_HEIGHT_PX: 450, // Adjusted from original image observation
        UI_BACKGROUND_COLOR: 'rgba(30, 35, 45, 0.0)', // Kept as per request
        UI_TEXT_COLOR: 'rgba(0, 0, 0, 0.5)',          // Kept
        UI_BORDER_COLOR: 'rgba(0, 0, 0, 0.00)',       // Kept
        FONT_FAMILY: '"Segoe UI", Roboto, Arial, sans-serif',
        MAIN_ACCENT_COLOR: 'rgba(255, 152, 0, 0.6)',

        // --- Clicker & Counter ---
        MAIN_COUNTER_FONT_SIZE_INITIAL_EM: 6,
        MAIN_COUNTER_FONT_SIZE_MIN_EM: 3,
        MAIN_COUNTER_MAX_CHARS_BEFORE_RESIZE: 4,
        SHOW_DECREMENT_BUTTON: true,
        CLICKER_INCREMENT_BUTTON_COLOR: 'rgba(128, 128, 128, 0.2)',
        CLICKER_DECREMENT_BUTTON_COLOR: 'rgba(0, 0, 0, 0.05)',
        INCREMENT_KEYBOARD_SHORTCUT_CODE: 'ShiftRight',

        // --- Resizable Divider ---
        DIVIDER_WIDTH_PX: 10,
        LEFT_PANE_INITIAL_FLEX_BASIS: '40%',
        LEFT_PANE_MIN_WIDTH_PERCENT: 20,
        RIGHT_PANE_MIN_WIDTH_PERCENT: 25,

        // --- Timers & Clock ---
        LAST_ACTION_TIMER_WARN_SECONDS: 8 * 60,
        LAST_ACTION_TIMER_WARN_COLOR: 'rgba(255, 60, 60, 0.95)',
        TIMERS_FONT_SIZE_EM: 0.9, // For LastActionTimer and RealTimeClock in bottom bar

        // --- Tabs/Modes Overlay & Identification ---
        PAGE_COLOR_OVERLAY_ID_SUFFIX: '_pageColorOverlay',
        PAGE_INDICATOR_TEXT_ID_SUFFIX: '_pageIndicatorText',
        PAGE_INDICATOR_FONT_SIZE_PX: 60,
        TAB_IDENTIFICATION_MODES: [
            { name: 'REFURB', keyword: 'REFURB', color: 'rgba(255, 165, 0, 0.05)', textColor: 'rgba(255, 140, 0, 0.65)' },
            { name: 'C-RET', keyword: 'CRETURN', color: 'rgba(0, 165, 255, 0.05)', textColor: 'rgba(0, 140, 255, 0.65)' },
            { name: 'WHD', keyword: 'DEALS', color: 'rgba(100, 255, 100, 0.05)', textColor: 'rgba(80, 220, 80, 0.65)' },
        ],
        DEFAULT_TAB_MODE_NAME: 'General',
        DEFAULT_TAB_MODE_COLOR: 'rgba(100, 100, 100, 0.05)',
        DEFAULT_TAB_MODE_TEXT_COLOR: 'rgba(150, 150, 150, 0.55)',
        UI_TAB_INDICATOR_FONT_SIZE_EM: 3.0,

        // --- Multi-Tab State Sync via localStorage ---
        MULTI_TAB_STORAGE_PREFIX: 'prodHelper_tabs_data_v3_4_', // Version updated
        MULTI_TAB_WRITE_INTERVAL_MS: 1000,
        MULTI_TAB_READ_INTERVAL_MS: 1500,
        MULTI_TAB_DATA_TTL_MS: 5 * 60 * 1000,

        // --- Shift & Lunch ---
        DEFAULT_DAY_SHIFT_START_TIME: '06:28',
        DEFAULT_NIGHT_SHIFT_START_TIME: '18:28',
        DEFAULT_LUNCH_OPTIONS: [ // Same as original
            { text: "Day Lunch 1 (11:20-11:50)", start: "11:20", end: "11:50", type: "day" },
            { text: "Day Lunch 2 (11:50-12:20)", start: "11:50", end: "12:20", type: "day" },
            { text: "Day Lunch 3 (12:20-12:50)", start: "12:20", end: "12:50", type: "day" },
            { text: "Day Lunch 4 (12:50-13:20)", start: "12:50", end: "13:20", type: "day" },
            { text: "Night Lunch 1 (23:20-23:50)", start: "23:20", end: "23:50", type: "night" },
            { text: "Night Lunch 2 (23:50-00:20)", start: "23:50", end: "00:20", type: "night" },
            { text: "Night Lunch 3 (00:20-00:50)", start: "00:20", end: "00:50", type: "night" },
            { text: "Night Lunch 4 (00:50-01:20)", start: "00:50", end: "01:20", type: "night" },
            { text: "No Lunch", start: "00:00", end: "00:00", type: "any" }
        ],

        // --- Statistics ---
        STATS_FONT_SIZE_EM: 1,
        STATS_UPDATE_INTERVAL_MS: 2500,

        // --- Auto-Clicker Trigger ---
        AUTO_CLICK_TRIGGER_WORD: 'wysłano', // Actual trigger word
        TRIGGER_UI_PLACEHOLDER: 'Trigger', // Word to display in UI to avoid self-triggering if it's the same
        TRIGGER_OBSERVE_AREA_SELECTOR: 'body',
        TRIGGER_DEBUG_MAX_PATHS: 10,
        TRIGGER_MUTATION_DEBOUNCE_MS: 200,

        // --- Storage ---
        STORAGE_KEY_MAIN_SETTINGS: 'prodHelper_mainCfg_v3_4_', // Version updated
        STORAGE_KEY_CUSTOM_THEMES: 'prodHelper_customThemes_v3_4_global', // Version updated
        USE_SESSION_STORAGE_FOR_UI_STATE: true,

        // --- UI Controls & Settings Panel ---
        EMERGENCY_HIDE_BUTTON_TEXT: 'CLOSE',
        EMERGENCY_SHOW_BUTTON_ID_SUFFIX: '_emergencyShowBtn',
        EMERGENCY_SHOW_BUTTON_TEXT: '🛠️',
        EMERGENCY_SHOW_BUTTON_SIZE: '36px',
        EMERGENCY_SHOW_BUTTON_OPACITY: 0.3,
        EMERGENCY_SHOW_BUTTON_HOVER_OPACITY: 0.9,
        SETTINGS_PANEL_ID_SUFFIX: '_settingsPanel',
        LOCK_UI_BUTTON_TEXT_UNLOCKED: 'UI block',
        LOCK_UI_BUTTON_TEXT_LOCKED: 'UI unblock',
        TOGGLE_SETTINGS_BUTTON_TEXT_CLOSED: 'settings',
        TOGGLE_SETTINGS_BUTTON_TEXT_OPENED: 'settings ◄',

        // --- Pointer Events Mode Options ---
        POINTER_EVENTS_MODES: [
            { value: 'fully_interactive', text: 'Fully Interactive (Blocks Background)' },
            { value: 'default_transparent_buttons_active', text: 'Default (Panel BG Transparent, Buttons Active)' },
            { value: 'fully_click_through', text: 'Mostly Click-Through (Hotkeys/Auto, Top Bar Active)' },
            { value: 'windows_watermark', text: 'Watermark Mode (Fully Click-Through, Top Bar Active)' } // New mode
        ],
        DEFAULT_POINTER_EVENTS_MODE: 'windows_watermark', // Default to most transparent requested

        // --- Debugging ---
        DEBUG_MODE: false,
    };

    // --- ------------------------------------------------------------------------ ---
    // --- --------- SCRIPT STATE (Internal - Do not modify directly) ----------- ---
    // --- ------------------------------------------------------------------------ ---
    const state = {
        initialized: false,
        uiContainer: null,
        dom: {},
        intervals: {},
        mutationObserver: null,
        pageKeydownListener: null,
        isResizing: false,

        uiVisible: true,
        uiLocked: false,
        settingsPanelVisible: false,
        leftPaneFlexBasis: CONFIG.LEFT_PANE_INITIAL_FLEX_BASIS,
        pointerEventsMode: CONFIG.DEFAULT_POINTER_EVENTS_MODE,

        showClock: true,
        showStats: true,
        showLastActionTimer: true,
        showUITabIndicator: true,
        showPageOverlay: true,
        showTriggerDebug: CONFIG.DEBUG_MODE,
        debugPointerEventBorders: false,

        currentTabFullUrl: window.location.href,
        currentTabId: '',
        currentTabMode: { ...CONFIG.TAB_IDENTIFICATION_MODES.find(m => m.name === CONFIG.DEFAULT_TAB_MODE_NAME) || { name: CONFIG.DEFAULT_TAB_MODE_NAME, keyword: '', color: CONFIG.DEFAULT_TAB_MODE_COLOR, textColor: CONFIG.DEFAULT_TAB_MODE_TEXT_COLOR, isCustom: false }},

        clicksForThisTab: 0,
        lastActionTimestampForThisTab: Date.now(),
        currentTabContributesToTotal: true,

        shiftType: 'auto',
        shiftStartTime: null,
        selectedLunchOption: null,

        autoClickEnabled: true,
        autoClickTriggerWordFound: false,
        
        customTabThemes: {},
        otherTabsData: {},
        globalTotalClicks: 0,
    };

    // --- ------------------------------------------------------------------------ ---
    // --- ------------------------- UTILITY FUNCTIONS -------------------------- ---
    // --- ------------------------------------------------------------------------ ---
    const Utils = {
        logDebug: (...args) => { if (CONFIG.DEBUG_MODE) console.debug(`[PHelper DEBUG ${state.currentTabMode?.name || state.currentTabId?.substring(0,10) || ''}]`, ...args); },
        logInfo: (...args) => console.info(`[PHelper INFO ${state.currentTabMode?.name || state.currentTabId?.substring(0,10) || ''}]`, ...args),
        logError: (...args) => console.error(`[PHelper ERROR ${state.currentTabMode?.name || state.currentTabId?.substring(0,10) || ''}]`, ...args),

        getStorage: (useSession) => useSession ? sessionStorage : localStorage,

        generateTabId: (url) => { // Same as original
            const path = (new URL(url)).pathname.toLowerCase().replace(/\/$/, '');
            const search = (new URL(url)).search.toLowerCase();
            let id = `${path}${search}`;
            id = id.replace(/[^a-z0-9_.-]/g, '_').replace(/_+/g, '_');
            if (id.startsWith('_')) id = id.substring(1);
            if (id.length > 100) id = id.substring(0, 50) + '...' + id.substring(id.length - 47);
            return id || 'default_tab_id';
        },

        timeStringToMinutes: (timeStr) => { // Same as original
            if (!timeStr || typeof timeStr !== 'string' || !timeStr.includes(':')) return 0;
            const [hours, minutes] = timeStr.split(':').map(Number);
            return isNaN(hours) || isNaN(minutes) ? 0 : hours * 60 + minutes;
        },

        formatDateToHHMM: (dateObj, includeSeconds = false) => { // Same as original
            if (!dateObj || !(dateObj instanceof Date) || isNaN(dateObj.getTime())) return "N/A";
            const h = String(dateObj.getHours()).padStart(2, '0');
            const m = String(dateObj.getMinutes()).padStart(2, '0');
            if (includeSeconds) { const s = String(dateObj.getSeconds()).padStart(2, '0'); return `${h}:${m}:${s}`; }
            return `${h}:${m}`;
        },

        formatMsToDuration: (ms, includeSeconds = false) => { // Same as original
            if (isNaN(ms) || ms < 0) ms = 0;
            let totalSeconds = Math.floor(ms / 1000);
            const hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            let parts = [];
            if (hours > 0) parts.push(`${String(hours)}h`);
            parts.push(`${String(minutes).padStart(hours > 0 || minutes > 0 ? 2 : 1, '0')}m`);
            if (includeSeconds || (hours === 0 && minutes === 0)) parts.push(`${String(seconds).padStart(2, '0')}s`);
            return parts.join(' ') || '0s';
        },

        createDOMElement: (tag, attributes = {}, children = []) => { // Enhanced for user-select and pointer-events defaults for text
            const element = Utils.createDOMElementBase(tag, attributes, children);
            // Default non-interactivity for simple text display divs/spans unless specified
            if ((tag === 'div' || tag === 'span' || tag === 'p' || tag === 'h4' || tag === 'h3' || tag === 'label') && 
                attributes.style && attributes.style.pointerEvents === undefined && 
                !attributes.onClick && !attributes.onmousedown && !attributes.className?.includes('ph-interactive')) {
                element.style.pointerEvents = 'none';
                element.style.userSelect = 'none';
                element.style.cursor = 'default';
            }
            return element;
        },
        createDOMElementBase: (tag, attributes = {}, children = []) => { // Original createDOMElement
            const element = document.createElement(tag);
            for (const key in attributes) {
                if (key === 'style' && typeof attributes[key] === 'object') Object.assign(element.style, attributes[key]);
                else if (key === 'dataset' && typeof attributes[key] === 'object') Object.assign(element.dataset, attributes[key]);
                else if (key === 'id') element.id = CONFIG.SCRIPT_ID_PREFIX + attributes[key];
                else if (['textContent', 'innerHTML', 'value', 'checked', 'disabled', 'type', 'title', 'placeholder', 'tabIndex', 'src', 'className', 'name', 'htmlFor'].includes(key) ) element[key] = attributes[key];
                else element.setAttribute(key, attributes[key]);
            }
            children.forEach(child => {
                if (child === null || typeof child === 'undefined') return;
                if (typeof child === 'string' || typeof child === 'number') element.appendChild(document.createTextNode(String(child)));
                else if (child instanceof Node) element.appendChild(child);
                else if (Array.isArray(child)) child.forEach(c => { if (c instanceof Node) element.appendChild(c); else if (typeof c === 'string' || typeof c === 'number') element.appendChild(document.createTextNode(String(c))); });
            });
            return element;
        },
        
        makeButtonInteractive: (button) => { // Same as original
            if (!button) return;
            button.addEventListener('mousedown', e => { e.preventDefault(); if (!button.disabled) button.style.transform = 'scale(0.95)'; });
            button.addEventListener('mouseup', () => { if (!button.disabled) button.style.transform = 'scale(1)';});
            button.addEventListener('mouseleave', () => { if (!button.disabled) button.style.transform = 'scale(1)';});
        },

        // Helper to apply pointer-events and user-select to an element
        applyElementInteractivity: (element, interactive) => {
            if (!element) return;
            if (interactive) {
                element.style.pointerEvents = 'auto';
                // For inputs/buttons, user-select is usually fine or handled by browser
                if (element.tagName !== 'INPUT' && element.tagName !== 'TEXTAREA' && element.tagName !== 'SELECT' && element.tagName !== 'BUTTON') {
                    element.style.userSelect = 'auto'; 
                }
                if (element.tagName === 'BUTTON' || element.tagName === 'SELECT' || element.classList.contains('ph-divider')) {
                    element.style.cursor = element.classList.contains('ph-divider') ? 'ew-resize' : 'pointer';
                } else {
                    element.style.cursor = 'default'; // Or 'text' for inputs
                }
            } else {
                element.style.pointerEvents = 'none';
                element.style.userSelect = 'none';
                element.style.cursor = 'default';
            }
        }
    };

    // --- ------------------------------------------------------------------------ ---
    // --- -------------------- STATE & STORAGE MANAGEMENT ---------------------- ---
    // --- ------------------------------------------------------------------------ ---
    const StorageManager = { // Largely same, adapted for new CONFIG keys
        loadAllState: () => {
            state.currentTabId = Utils.generateTabId(state.currentTabFullUrl);
            StorageManager.loadCustomThemes();
            StorageManager.determineCurrentTabMode();
            StorageManager.loadMainSettings();
            StorageManager.readAllTabsDataFromLocalStorage(true);
            
            if (!state.shiftStartTime || isNaN(new Date(state.shiftStartTime).getTime())) {
                ShiftManager.determineAndSetShiftStartTime(true);
            } else {
                state.shiftStartTime = new Date(state.shiftStartTime);
            }
            if (!state.selectedLunchOption) {
                ShiftManager.setDynamicDefaultLunch();
            }
        },

        saveMainSettings: () => {
            try {
                const uiStateStorage = Utils.getStorage(CONFIG.USE_SESSION_STORAGE_FOR_UI_STATE);
                const lunchIndex = state.selectedLunchOption ? CONFIG.DEFAULT_LUNCH_OPTIONS.findIndex(opt => opt.start === state.selectedLunchOption.start && opt.end === state.selectedLunchOption.end && opt.type === state.selectedLunchOption.type) : -1;
                
                const dataToSave = {
                    uiVisible: state.uiVisible, uiLocked: state.uiLocked, settingsPanelVisible: state.settingsPanelVisible,
                    leftPaneFlexBasis: state.leftPaneFlexBasis, pointerEventsMode: state.pointerEventsMode,
                    showClock: state.showClock, showStats: state.showStats, showLastActionTimer: state.showLastActionTimer,
                    showUITabIndicator: state.showUITabIndicator, showPageOverlay: state.showPageOverlay,
                    showTriggerDebug: state.showTriggerDebug, debugPointerEventBorders: state.debugPointerEventBorders,
                    shiftType: state.shiftType, shiftStartTimeISO: state.shiftStartTime ? state.shiftStartTime.toISOString() : null,
                    selectedLunchOptionIndex: lunchIndex, autoClickEnabled: state.autoClickEnabled,
                    currentTabContributesToTotal: state.currentTabContributesToTotal,
                };
                uiStateStorage.setItem(CONFIG.STORAGE_KEY_MAIN_SETTINGS + state.currentTabId, JSON.stringify(dataToSave));
            } catch (e) { Utils.logError('Failed to save main settings:', e); }
        },

        loadMainSettings: () => {
            try {
                const uiStateStorage = Utils.getStorage(CONFIG.USE_SESSION_STORAGE_FOR_UI_STATE);
                const savedJSON = uiStateStorage.getItem(CONFIG.STORAGE_KEY_MAIN_SETTINGS + state.currentTabId);
                if (savedJSON) {
                    const sd = JSON.parse(savedJSON);
                    Object.assign(state, {
                        uiVisible: typeof sd.uiVisible === 'boolean' ? sd.uiVisible : true,
                        uiLocked: typeof sd.uiLocked === 'boolean' ? sd.uiLocked : false,
                        settingsPanelVisible: typeof sd.settingsPanelVisible === 'boolean' ? sd.settingsPanelVisible : false,
                        leftPaneFlexBasis: sd.leftPaneFlexBasis || CONFIG.LEFT_PANE_INITIAL_FLEX_BASIS,
                        pointerEventsMode: sd.pointerEventsMode || CONFIG.DEFAULT_POINTER_EVENTS_MODE,
                        showClock: typeof sd.showClock === 'boolean' ? sd.showClock : true,
                        showStats: typeof sd.showStats === 'boolean' ? sd.showStats : true,
                        showLastActionTimer: typeof sd.showLastActionTimer === 'boolean' ? sd.showLastActionTimer : true,
                        showUITabIndicator: typeof sd.showUITabIndicator === 'boolean' ? sd.showUITabIndicator : true,
                        showPageOverlay: typeof sd.showPageOverlay === 'boolean' ? sd.showPageOverlay : true,
                        showTriggerDebug: typeof sd.showTriggerDebug === 'boolean' ? sd.showTriggerDebug : CONFIG.DEBUG_MODE,
                        debugPointerEventBorders: typeof sd.debugPointerEventBorders === 'boolean' ? sd.debugPointerEventBorders : false,
                        shiftType: sd.shiftType || 'auto',
                        shiftStartTime: sd.shiftStartTimeISO ? new Date(sd.shiftStartTimeISO) : null,
                        selectedLunchOption: (sd.selectedLunchOptionIndex >= 0 && CONFIG.DEFAULT_LUNCH_OPTIONS[sd.selectedLunchOptionIndex]) ? CONFIG.DEFAULT_LUNCH_OPTIONS[sd.selectedLunchOptionIndex] : null,
                        autoClickEnabled: typeof sd.autoClickEnabled === 'boolean' ? sd.autoClickEnabled : true,
                        currentTabContributesToTotal: typeof sd.currentTabContributesToTotal === 'boolean' ? sd.currentTabContributesToTotal : true
                    });
                } else {
                    state.leftPaneFlexBasis = CONFIG.LEFT_PANE_INITIAL_FLEX_BASIS;
                    state.pointerEventsMode = CONFIG.DEFAULT_POINTER_EVENTS_MODE;
                }
            } catch (e) { Utils.logError('Failed to load/parse main settings:', e); }
        },

        saveCustomThemes: () => { try { localStorage.setItem(CONFIG.STORAGE_KEY_CUSTOM_THEMES, JSON.stringify(state.customTabThemes)); } catch (e) { Utils.logError('Failed to save custom themes:', e); }},
        loadCustomThemes: () => { try { const t = localStorage.getItem(CONFIG.STORAGE_KEY_CUSTOM_THEMES); if(t) state.customTabThemes = JSON.parse(t); } catch (e) { Utils.logError('Failed to load custom themes:', e); state.customTabThemes = {}; }},
        
        determineCurrentTabMode: () => { // Same as original
            const customTheme = state.customTabThemes[state.currentTabFullUrl];
            if (customTheme && customTheme.name && customTheme.color && customTheme.textColor) {
                state.currentTabMode = { ...customTheme, isCustom: true }; return;
            }
            const urlUpper = window.location.href.toUpperCase();
            for (const mode of CONFIG.TAB_IDENTIFICATION_MODES) {
                if (urlUpper.includes(mode.keyword.toUpperCase())) {
                    state.currentTabMode = { ...mode, isCustom: false }; return;
                }
            }
            state.currentTabMode = { name: CONFIG.DEFAULT_TAB_MODE_NAME, keyword: '', color: CONFIG.DEFAULT_TAB_MODE_COLOR, textColor: CONFIG.DEFAULT_TAB_MODE_TEXT_COLOR, isCustom: false };
        },

        writeCurrentTabDataToLocalStorage: () => { // Same as original
            if (!state.currentTabId) { Utils.logError("Cannot write tab data: currentTabId is not set."); return; }
            try {
                const tabData = {
                    tabId: state.currentTabId, modeName: state.currentTabMode.name, clicks: state.clicksForThisTab,
                    lastActionTimestamp: state.lastActionTimestampForThisTab, contributesToTotal: state.currentTabContributesToTotal,
                    timestamp: Date.now()
                };
                localStorage.setItem(CONFIG.MULTI_TAB_STORAGE_PREFIX + state.currentTabId, JSON.stringify(tabData));
            } catch (e) { Utils.logError('Error writing tab data to localStorage:', e); }
        },

        readAllTabsDataFromLocalStorage: (isInitialLoad = false) => { // Same as original
            let newOtherTabsData = {}; const now = Date.now();
            try {
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (key && key.startsWith(CONFIG.MULTI_TAB_STORAGE_PREFIX)) {
                        const itemJson = localStorage.getItem(key);
                        if (itemJson) {
                            try {
                                const itemData = JSON.parse(itemJson);
                                if (now - (itemData.timestamp || 0) > CONFIG.MULTI_TAB_DATA_TTL_MS) { localStorage.removeItem(key); continue; }
                                if (itemData.tabId === state.currentTabId) {
                                    if (isInitialLoad) {
                                        state.clicksForThisTab = parseInt(itemData.clicks, 10) || 0;
                                        state.lastActionTimestampForThisTab = parseInt(itemData.lastActionTimestamp, 10) || Date.now();
                                    }
                                    newOtherTabsData[itemData.tabId] = { ...itemData, clicks: state.clicksForThisTab, contributesToTotal: state.currentTabContributesToTotal };
                                } else { newOtherTabsData[itemData.tabId] = itemData; }
                            } catch (parseError) { Utils.logError(`Error parsing localStorage key ${key}:`, parseError); localStorage.removeItem(key); }
                        }
                    }
                }
            } catch (e) { Utils.logError('Error reading from localStorage multi-tab sync:', e); }
            state.otherTabsData = newOtherTabsData;
            state.globalTotalClicks = Object.values(state.otherTabsData).filter(td => td.contributesToTotal).reduce((sum, td) => sum + (parseInt(td.clicks, 10) || 0), 0);
            if (!isInitialLoad && typeof UIManager !== 'undefined') { UIManager.updateStatisticsDisplay(); if (state.settingsPanelVisible) SettingsPanel.updateOtherTabsSettingsDisplay(); }
        }
    };

    // --- ------------------------------------------------------------------------ ---
    // --- ----------------------- SHIFT & LUNCH MANAGEMENT --------------------- ---
    // --- ------------------------------------------------------------------------ ---
    const ShiftManager = { // Same as original
        determineAndSetShiftStartTime: (forceAuto = false) => {
            const now = new Date(); let shiftStartHour, shiftStartMinute;
            let calculatedStartTime = new Date(now); let determinedShiftCategory = '';
            const dayStartHour = parseInt(CONFIG.DEFAULT_DAY_SHIFT_START_TIME.split(':')[0],10);
            const nightStartHour = parseInt(CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME.split(':')[0],10);
            if (forceAuto || state.shiftType === 'auto') {
                const currentHour = now.getHours();
                if (currentHour >= dayStartHour && currentHour < nightStartHour) { determinedShiftCategory = 'day'; [shiftStartHour, shiftStartMinute] = CONFIG.DEFAULT_DAY_SHIFT_START_TIME.split(':').map(Number);
                } else { determinedShiftCategory = 'night'; [shiftStartHour, shiftStartMinute] = CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME.split(':').map(Number); if (currentHour < dayStartHour) calculatedStartTime.setDate(now.getDate() - 1); }
                calculatedStartTime.setHours(shiftStartHour, shiftStartMinute, 0, 0); state.shiftStartTime = calculatedStartTime;
                if (state.shiftType === 'auto' && forceAuto) state.shiftType = determinedShiftCategory;
            } else if (state.shiftType === 'day' || state.shiftType === 'night') {
                const timeValue = state.dom.settingsShiftStartTimeInput?.value;
                let baseTime = state.shiftType === 'day' ? CONFIG.DEFAULT_DAY_SHIFT_START_TIME : CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME;
                if (timeValue) baseTime = timeValue;
                [shiftStartHour, shiftStartMinute] = baseTime.split(':').map(Number); calculatedStartTime.setHours(shiftStartHour, shiftStartMinute, 0, 0);
                if (state.shiftType === 'night' && (now.getHours() < shiftStartHour || (now.getHours() === shiftStartHour && now.getMinutes() < shiftStartMinute))) calculatedStartTime.setDate(now.getDate() - 1);
                state.shiftStartTime = calculatedStartTime;
            }
            ShiftManager.setDynamicDefaultLunch();
        },
        setDynamicDefaultLunch: () => {
            let potentialShiftType = state.shiftType; const dayStartHour = parseInt(CONFIG.DEFAULT_DAY_SHIFT_START_TIME.split(':')[0],10); const nightStartHour = parseInt(CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME.split(':')[0],10);
            if (potentialShiftType === 'auto') {
                if (state.shiftStartTime) { const shiftStartHr = state.shiftStartTime.getHours(); potentialShiftType = (shiftStartHr >= dayStartHour && shiftStartHr < nightStartHour) ? 'day' : 'night';
                } else { const currentHr = new Date().getHours(); potentialShiftType = (currentHr >= dayStartHour && currentHr < nightStartHour) ? 'day' : 'night'; }
            }
            const defaultLunch = CONFIG.DEFAULT_LUNCH_OPTIONS.find(opt => opt.type === potentialShiftType) || CONFIG.DEFAULT_LUNCH_OPTIONS.find(opt => opt.type === "any") || CONFIG.DEFAULT_LUNCH_OPTIONS[0];
            state.selectedLunchOption = defaultLunch;
        },
        getCurrentShiftCategory: () => {
            if (!state.shiftStartTime) return 'any'; const dayStartHour = parseInt(CONFIG.DEFAULT_DAY_SHIFT_START_TIME.split(':')[0],10); const nightStartHour = parseInt(CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME.split(':')[0],10);
            const shiftStartHr = state.shiftStartTime.getHours(); if (state.shiftType === 'day') return 'day'; if (state.shiftType === 'night') return 'night';
            return (shiftStartHr >= dayStartHour && shiftStartHr < nightStartHour) ? 'day' : 'night';
        }
    };

    // --- ------------------------------------------------------------------------ ---
    // --- ------------------------- UI MANAGEMENT ------------------------------ ---
    // --- ------------------------------------------------------------------------ ---
    const UIManager = {
        buildInitialUI: () => {
            UIManager.buildMainPanel();
            UIManager.buildPageOverlayAndIndicator();
            UIManager.buildEmergencyShowButton();
            document.body.appendChild(state.dom.pageColorOverlay);
            document.body.appendChild(state.dom.pageIndicatorText);
            document.body.appendChild(state.dom.emergencyShowButton);
            document.body.appendChild(state.uiContainer);
            SettingsPanel.build();
        },

        buildMainPanel: () => {
            state.uiContainer = Utils.createDOMElementBase('div', { // Use base to avoid self-applying pointer-events:none
                id: CONFIG.UI_CONTAINER_ID,
                style: {
                    position: 'fixed', bottom: CONFIG.UI_BOTTOM_OFFSET, right: CONFIG.UI_RIGHT_OFFSET,
                    width: `${CONFIG.UI_WIDTH_PERCENT_VIEWPORT}vw`, height: `${CONFIG.UI_HEIGHT_PERCENT_VIEWPORT}vh`,
                    minWidth: `${CONFIG.UI_MIN_WIDTH_PX}px`, minHeight: `${CONFIG.UI_MIN_HEIGHT_PX}px`,
                    backgroundColor: CONFIG.UI_BACKGROUND_COLOR, border: `1px solid ${CONFIG.UI_BORDER_COLOR}`,
                    borderRadius: '6px', boxSizing: 'border-box', color: CONFIG.UI_TEXT_COLOR, fontFamily: CONFIG.FONT_FAMILY,
                    zIndex: '2147483640', display: 'flex', flexDirection: 'column', padding: '8px', overflow: 'hidden',
                    boxShadow: '0 0px 0px rgba(0,0,0,0.0)', // No shadow
                    transition: 'opacity 0.3s ease, transform 0.3s ease, width 0.1s ease, height 0.1s ease',
                }
            });

            const topControls = Utils.createDOMElementBase('div', { className: 'ph-top-controls ph-interactive-parent', style: { display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '5px', flexShrink: 0 }});
            const controlBtnStyle = { cursor: 'pointer', background: 'none', border: 'none', color: CONFIG.UI_TEXT_COLOR, borderRadius: '3px', padding: '4px 8px', fontSize: '0.8em', marginLeft: '5px', opacity: '0.7', transition: 'opacity 0.2s, color 0.2s' };
            
            state.dom.toggleSettingsButton = Utils.createDOMElementBase('button', { textContent: CONFIG.TOGGLE_SETTINGS_BUTTON_TEXT_CLOSED, title: 'Open/Close Settings', style: controlBtnStyle, className: 'ph-interactive' });
            state.dom.toggleSettingsButton.addEventListener('click', UIManager.toggleSettingsPanelVisibility);
            Utils.makeButtonInteractive(state.dom.toggleSettingsButton);

            state.dom.lockUIButton = Utils.createDOMElementBase('button', { textContent: CONFIG.LOCK_UI_BUTTON_TEXT_UNLOCKED, title: 'Lock/Unlock UI', style: controlBtnStyle, className: 'ph-interactive' });
            state.dom.lockUIButton.addEventListener('click', UIManager.toggleUILockState);
            Utils.makeButtonInteractive(state.dom.lockUIButton);
            
            state.dom.emergencyHideButton = Utils.createDOMElementBase('button', { textContent: CONFIG.EMERGENCY_HIDE_BUTTON_TEXT, title: 'Hide UI Panel', style: {...controlBtnStyle, color: CONFIG.LAST_ACTION_TIMER_WARN_COLOR, fontWeight: 'bold' }, className: 'ph-interactive' });
            state.dom.emergencyHideButton.addEventListener('click', () => UIManager.setUIVisibility(false));
            Utils.makeButtonInteractive(state.dom.emergencyHideButton);

            topControls.append(state.dom.toggleSettingsButton, state.dom.lockUIButton, state.dom.emergencyHideButton);
            state.uiContainer.appendChild(topControls);

            const mainContentArea = Utils.createDOMElementBase('div', { className: 'ph-main-content-area ph-interactive-parent', style: { display: 'flex', flexGrow: 1, overflow: 'hidden', position: 'relative' }});
            
            state.dom.leftPane = Utils.createDOMElementBase('div', { className: 'ph-left-pane ph-interactive-parent', style: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexBasis: state.leftPaneFlexBasis, minWidth: `${CONFIG.LEFT_PANE_MIN_WIDTH_PERCENT}%`, overflow: 'hidden', paddingRight: `${CONFIG.DIVIDER_WIDTH_PX / 2}px`, position: 'relative' }});
            state.dom.mainCounterInput = Utils.createDOMElementBase('input', { type: 'number', id: 'mainCounterInput', value: state.clicksForThisTab, className: 'ph-interactive', style: { fontSize: `${CONFIG.MAIN_COUNTER_FONT_SIZE_INITIAL_EM}em`, fontWeight: '300', color: CONFIG.UI_TEXT_COLOR, opacity: '0.95', width: '90%', marginBottom: '15px', textAlign: 'center', background: 'transparent', border: 'none', outline: 'none', padding: '0 5px', appearance: 'textfield' }});
            state.dom.mainCounterInput.addEventListener('change', EventHandlers.handleCounterInputChange);
            state.dom.mainCounterInput.addEventListener('input', EventHandlers.handleCounterInputDynamic);
            const styleSheet = document.createElement("style"); styleSheet.innerText = `#${CONFIG.SCRIPT_ID_PREFIX}mainCounterInput::-webkit-outer-spin-button, #${CONFIG.SCRIPT_ID_PREFIX}mainCounterInput::-webkit-inner-spin-button {-webkit-appearance: none; margin: 0;}`; document.head.appendChild(styleSheet);

            const clickerButtonsContainer = Utils.createDOMElementBase('div', { style: { display: 'flex', alignItems: 'center'} });
            const clickerBtnSharedStyle = { cursor: 'pointer', border: 'none', borderRadius: '0px', boxShadow: '0 0px 0px rgba(0,0,0,0.0)', transition: 'transform 0.1s, background-color 0.15s', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' };
            
            if (CONFIG.SHOW_DECREMENT_BUTTON) {
                state.dom.decrementButton = Utils.createDOMElementBase('button', { id: 'decrementBtn', textContent: '–', title: 'Decrement (-1)', className: 'ph-interactive', style: { ...clickerBtnSharedStyle, backgroundColor: CONFIG.CLICKER_DECREMENT_BUTTON_COLOR, marginRight: '15px', fontSize: '1.8em', width:'45px', height:'45px' }});
                state.dom.decrementButton.addEventListener('click', EventHandlers.handleDecrementClick);
                Utils.makeButtonInteractive(state.dom.decrementButton);
                clickerButtonsContainer.appendChild(state.dom.decrementButton);
            }
            state.dom.incrementButton = Utils.createDOMElementBase('button', { id: 'incrementBtn', textContent: '+', title: `Increment (+1) or ${CONFIG.INCREMENT_KEYBOARD_SHORTCUT_CODE}`, className: 'ph-interactive', style: { ...clickerBtnSharedStyle, backgroundColor: CONFIG.CLICKER_INCREMENT_BUTTON_COLOR, fontSize: '2.5em', width:'65px', height:'65px' }});
            state.dom.incrementButton.addEventListener('click', (event) => EventHandlers.processIncrementForCurrentTab(true, event));
            Utils.makeButtonInteractive(state.dom.incrementButton);
            clickerButtonsContainer.appendChild(state.dom.incrementButton);
            state.dom.leftPane.append(state.dom.mainCounterInput, clickerButtonsContainer);

            state.dom.divider = Utils.createDOMElementBase('div', { className: 'ph-divider ph-interactive', style: { width: `${CONFIG.DIVIDER_WIDTH_PX}px`, cursor: 'ew-resize', flexShrink: 0, display: 'flex', alignItems:'center', justifyContent: 'center', backgroundColor: `${CONFIG.MAIN_ACCENT_COLOR}33`, borderRadius: '2px' }});
            state.dom.divider.addEventListener('mousedown', EventHandlers.startResizePanes);

            state.dom.rightPane = Utils.createDOMElementBase('div', { className: 'ph-right-pane ph-interactive-parent', style: { display: 'flex', flexDirection: 'column', flexGrow: 1, overflowY: 'auto', paddingLeft: `${CONFIG.DIVIDER_WIDTH_PX / 2}px`, minWidth: `${CONFIG.RIGHT_PANE_MIN_WIDTH_PERCENT}%`, fontSize: `${CONFIG.STATS_FONT_SIZE_EM}em` }});
            state.dom.statsTextSummary = Utils.createDOMElement('div', { id: 'statsSummary', style: { lineHeight: '1.45', marginBottom: '8px' }}); // Default non-interactive by createDOMElement
            state.dom.triggerDebugDisplay = Utils.createDOMElement('div', { id: 'triggerDebugDisplay', style: { fontSize: '0.8em', marginTop: '10px', borderTop: `1px dashed ${CONFIG.UI_TEXT_COLOR}2A`, paddingTop: '5px', display: 'none', maxHeight: '60px', overflowY: 'auto', opacity: '0.7', wordBreak: 'break-all'} });
            state.dom.triggerDebugDisplay.innerHTML = `<strong>${CONFIG.TRIGGER_UI_PLACEHOLDER} Debug:</strong> Waiting...`;
            state.dom.rightPane.append(state.dom.statsTextSummary, state.dom.triggerDebugDisplay);
            mainContentArea.append(state.dom.leftPane, state.dom.divider, state.dom.rightPane);
            state.uiContainer.appendChild(mainContentArea);

            // Bottom Info Bar (Tab ID, LastActionTimer, Clock) - Modified Layout
            const bottomInfoBar = Utils.createDOMElementBase('div', { className: 'ph-bottom-bar', style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto', paddingTop: '5px', flexShrink: 0, borderTop: `1px solid ${CONFIG.UI_TEXT_COLOR}1F` }});
            state.dom.uiTabIndicatorText = Utils.createDOMElement('div', { id: 'uiTabIndicator', textContent: state.currentTabMode.name, style: { fontSize: `${CONFIG.UI_TAB_INDICATOR_FONT_SIZE_EM}em`, fontWeight: '500', color: state.currentTabMode.textColor || CONFIG.UI_TEXT_COLOR, opacity: 0.6 }});
            
            const timersContainer = Utils.createDOMElementBase('div', {className: 'ph-timers-container', style: {display: 'flex', alignItems: 'flex-end', gap: '15px'}});
            state.dom.lastActionTimerDisplay = Utils.createDOMElement('div', { id: 'lastActionTimer', textContent: 'Last: 0s', style: { fontSize: `${CONFIG.TIMERS_FONT_SIZE_EM}em`, opacity: '0.75' }});
            state.dom.realTimeClock = Utils.createDOMElement('div', { id: 'realTimeClock', textContent: '00:00:00', style: { fontSize: `${CONFIG.TIMERS_FONT_SIZE_EM}em`, fontFamily: 'monospace', color: CONFIG.UI_TEXT_COLOR, opacity: '0.55' }});
            timersContainer.append(state.dom.lastActionTimerDisplay, state.dom.realTimeClock);
            bottomInfoBar.append(state.dom.uiTabIndicatorText, timersContainer);
            state.uiContainer.appendChild(bottomInfoBar);
        },

        buildPageOverlayAndIndicator: () => { // Same as original
            state.dom.pageColorOverlay = Utils.createDOMElementBase('div', { id: CONFIG.PAGE_COLOR_OVERLAY_ID_SUFFIX, style: { position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh', backgroundColor: state.currentTabMode.color, zIndex: '2147483630', pointerEvents: 'none', display: 'none', transition: 'background-color 0.3s ease' }});
            state.dom.pageIndicatorText = Utils.createDOMElementBase('div', { id: CONFIG.PAGE_INDICATOR_TEXT_ID_SUFFIX, textContent: state.currentTabMode.name.substring(0,10).toUpperCase(), style: { position: 'fixed', top: '50%', right: '20px', transform: 'translateY(-50%)', fontSize: `${CONFIG.PAGE_INDICATOR_FONT_SIZE_PX}px`, fontWeight: 'bold', color: state.currentTabMode.textColor, opacity: 0.8, zIndex: '2147483631', pointerEvents: 'none', display: 'none', textShadow: '0 0 0px rgba(0,0,0,0.0)', writingMode: 'vertical-rl', textOrientation: 'mixed', transition: 'color 0.3s ease, opacity 0.3s ease', userSelect: 'none' }});
        },

        buildEmergencyShowButton: () => { // Same as original, but uses createDOMElementBase
            state.dom.emergencyShowButton = Utils.createDOMElementBase('button', {
                id: CONFIG.EMERGENCY_SHOW_BUTTON_ID_SUFFIX, textContent: CONFIG.EMERGENCY_SHOW_BUTTON_TEXT, title: 'Show UI Panel', className: 'ph-interactive',
                style: {
                    position: 'fixed', bottom: CONFIG.UI_BOTTOM_OFFSET, right: CONFIG.UI_RIGHT_OFFSET,
                    width: CONFIG.EMERGENCY_SHOW_BUTTON_SIZE, height: CONFIG.EMERGENCY_SHOW_BUTTON_SIZE,
                    backgroundColor: `rgba(80,80,100, ${CONFIG.EMERGENCY_SHOW_BUTTON_OPACITY})`, border: `1px solid rgba(128,128,128,0.4)`, color: CONFIG.UI_TEXT_COLOR,
                    borderRadius: '50%', cursor: 'pointer', display: 'none', alignItems: 'center', justifyContent: 'center', zIndex: '2147483646',
                    transition: 'opacity 0.2s ease, transform 0.1s ease, background-color 0.2s', fontSize: '18px', boxShadow: '0 0 0px rgba(0,0,0,0.0)', pointerEvents: 'auto'
                }
            });
            state.dom.emergencyShowButton.onmouseover = () => { state.dom.emergencyShowButton.style.opacity = String(CONFIG.EMERGENCY_SHOW_BUTTON_HOVER_OPACITY); state.dom.emergencyShowButton.style.transform = 'scale(1.1)'; state.dom.emergencyShowButton.style.backgroundColor = CONFIG.MAIN_ACCENT_COLOR; };
            state.dom.emergencyShowButton.onmouseout = () => { state.dom.emergencyShowButton.style.opacity = String(CONFIG.EMERGENCY_SHOW_BUTTON_OPACITY); state.dom.emergencyShowButton.style.transform = 'scale(1)'; state.dom.emergencyShowButton.style.backgroundColor = `rgba(80,80,100, ${CONFIG.EMERGENCY_SHOW_BUTTON_OPACITY})`; };
            state.dom.emergencyShowButton.onclick = () => UIManager.setUIVisibility(true);
        },
        
        setInitialUIValues: () => {
            if (state.dom.mainCounterInput) { state.dom.mainCounterInput.value = state.clicksForThisTab; EventHandlers.handleCounterInputDynamic({target: state.dom.mainCounterInput}); }
            if (state.dom.leftPane) state.dom.leftPane.style.flexBasis = state.leftPaneFlexBasis;
            if (state.settingsPanelVisible && state.dom.settingsPanel) SettingsPanel.populateAllFields();
            UIManager.applyElementVisibilityFromState(); UIManager.applyPageTheme(); UIManager.updateUITabIndicatorText(); UIManager.updateUILockVisuals();
            UIManager.setUIVisibility(state.uiVisible); // This also calls updatePointerEventsMode
        },

        setUIVisibility: (visible) => {
            state.uiVisible = visible;
            if (state.uiContainer) {
                state.uiContainer.style.opacity = visible ? '1' : '0';
                state.uiContainer.style.transform = visible ? 'translateY(0)' : 'translateY(15px)';
                state.uiContainer.style.visibility = visible ? 'visible' : 'hidden'; // Helps with pointer events
            }
            if (state.dom.emergencyShowButton) state.dom.emergencyShowButton.style.display = visible ? 'none' : 'flex';
            if (!visible && state.settingsPanelVisible) UIManager.setSettingsPanelVisibility(false);
            UIManager.updatePointerEventsMode();
            StorageManager.saveMainSettings();
        },
        
        setSettingsPanelVisibility: (visible) => {
            state.settingsPanelVisible = visible;
            if (state.dom.settingsPanel) {
                state.dom.settingsPanel.style.transform = visible ? 'translateX(0%)' : `translateX(101%)`;
                if (visible) SettingsPanel.populateAllFields();
            }
            if (state.dom.toggleSettingsButton) state.dom.toggleSettingsButton.textContent = visible ? CONFIG.TOGGLE_SETTINGS_BUTTON_TEXT_OPENED : CONFIG.TOGGLE_SETTINGS_BUTTON_TEXT_CLOSED;
            UIManager.updatePointerEventsMode();
            if (visible && state.uiLocked) UIManager.applyUILockToElements(true);
            StorageManager.saveMainSettings();
        },
        toggleSettingsPanelVisibility: () => UIManager.setSettingsPanelVisibility(!state.settingsPanelVisible),

        updateUILockVisuals: () => { if (state.dom.lockUIButton) state.dom.lockUIButton.textContent = state.uiLocked ? CONFIG.LOCK_UI_BUTTON_TEXT_LOCKED : CONFIG.LOCK_UI_BUTTON_TEXT_UNLOCKED; },

        applyUILockToElements: (locked) => { // Simplified, actual pointer events handled by updatePointerEventsMode
            const elementsToPotentiallyLock = [
                state.dom.toggleSettingsButton, state.dom.emergencyHideButton,
                state.dom.decrementButton, state.dom.mainCounterInput, state.dom.divider,
            ];
            if (state.dom.settingsPanel) {
                state.dom.settingsPanel.querySelectorAll('input, select, textarea, button:not(.ph-settings-close-btn)')
                    .forEach(el => elementsToPotentiallyLock.push(el));
            }
            elementsToPotentiallyLock.forEach(el => { if (el) el.disabled = locked; });
            if (state.dom.incrementButton) state.dom.incrementButton.disabled = false; // Never locked
            UIManager.updatePointerEventsMode(); // Re-evaluate after lock state change
        },
        setUILockState: (locked) => {
            if (!state.uiVisible && locked && !state.settingsPanelVisible) return;
            state.uiLocked = locked; UIManager.updateUILockVisuals(); UIManager.applyUILockToElements(locked); StorageManager.saveMainSettings();
        },
        toggleUILockState: () => UIManager.setUILockState(!state.uiLocked),

        updatePointerEventsMode: () => {
            if (!state.uiContainer) return;

            const topBarButtons = [state.dom.toggleSettingsButton, state.dom.lockUIButton, state.dom.emergencyHideButton];
            const clickerElements = [state.dom.incrementButton, state.dom.decrementButton, state.dom.mainCounterInput];
            const dividerElement = state.dom.divider;
            const allTextElements = Array.from(state.uiContainer.querySelectorAll('p, span:not(.ph-interactive), div:not(.ph-interactive-parent):not(.ph-interactive)')); // General text

            // Base pass: make all text non-interactive visually
            allTextElements.forEach(el => Utils.applyElementInteractivity(el, false));

            // Default to non-interactive for the main container
            Utils.applyElementInteractivity(state.uiContainer, false);

            if (!state.uiVisible) { // If panel is hidden, everything is non-interactive
                UIManager.applyDebugPointerEventBorders(); return;
            }
            
            // Settings panel is interactive if open, its children controlled by its own state mostly
            if (state.settingsPanelVisible) {
                Utils.applyElementInteractivity(state.dom.settingsPanel, true);
                 state.dom.settingsPanel.querySelectorAll('.ph-interactive, input, select, textarea, button').forEach(el => Utils.applyElementInteractivity(el, !state.uiLocked || el === state.dom.lockUIButton || el.classList.contains('ph-settings-close-btn')));
            } else {
                 if(state.dom.settingsPanel) Utils.applyElementInteractivity(state.dom.settingsPanel, false);
            }

            // Top bar buttons are always interactive (unless locked)
            topBarButtons.forEach(btn => Utils.applyElementInteractivity(btn, !state.uiLocked || btn === state.dom.lockUIButton));
            
            // Resizing makes divider and container interactive
            if(state.isResizing) {
                Utils.applyElementInteractivity(state.uiContainer, true);
                Utils.applyElementInteractivity(dividerElement, true);
            } else {
                Utils.applyElementInteractivity(dividerElement, !state.uiLocked);
            }


            switch (state.pointerEventsMode) {
                case 'fully_interactive':
                    Utils.applyElementInteractivity(state.uiContainer, true); // Main container blocks clicks
                    clickerElements.forEach(el => Utils.applyElementInteractivity(el, !state.uiLocked || el === state.dom.incrementButton));
                    // Text elements could be made selectable here if desired, but spec implies no. They remain non-interactive.
                    break;
                case 'default_transparent_buttons_active':
                    // Main container is click-through (already set)
                    clickerElements.forEach(el => Utils.applyElementInteractivity(el, !state.uiLocked || el === state.dom.incrementButton));
                    break;
                case 'fully_click_through': // Top bar remains active, main clickers are not
                case 'windows_watermark':   // Same logic for panel elements as fully_click_through
                    // Main container is click-through (already set)
                    clickerElements.forEach(el => Utils.applyElementInteractivity(el, (el === state.dom.incrementButton && !state.uiLocked))); // Only increment button remains active if not locked and it is desired
                    // For true watermark, even increment might be none:
                    if (state.pointerEventsMode === 'windows_watermark') {
                         clickerElements.forEach(el => Utils.applyElementInteractivity(el, false)); // ALL clickers non-interactive
                    } else { // fully_click_through might keep increment active
                         Utils.applyElementInteractivity(state.dom.incrementButton, !state.uiLocked);
                         if(state.dom.decrementButton) Utils.applyElementInteractivity(state.dom.decrementButton, false);
                         if(state.dom.mainCounterInput) Utils.applyElementInteractivity(state.dom.mainCounterInput, false);
                    }
                    break;
            }
             // Ensure lock button itself is always interactive if rest of top bar is
            if (state.dom.lockUIButton) Utils.applyElementInteractivity(state.dom.lockUIButton, true);

            UIManager.applyDebugPointerEventBorders();
        },

        applyDebugPointerEventBorders: () => { // Same as original
            const allElements = state.uiContainer ? state.uiContainer.querySelectorAll('*') : [];
            const elementsToTest = state.uiContainer ? [state.uiContainer, ...allElements] : [];
            elementsToTest.forEach(el => { el.style.outline = ''; el.style.outlineOffset = ''; });
            if (state.debugPointerEventBorders) {
                elementsToTest.forEach(el => {
                    const computedPE = getComputedStyle(el).pointerEvents;
                    if (computedPE === 'auto' || computedPE === 'all' || (el.tagName === 'BUTTON' && computedPE !== 'none')) el.style.outline = '1px dashed red';
                    else if (computedPE === 'none') el.style.outline = '1px dotted dodgerblue';
                    el.style.outlineOffset = '1px';
                });
                if(state.uiContainer) state.uiContainer.style.outline = `2px solid ${getComputedStyle(state.uiContainer).pointerEvents === 'none' ? 'blue' : 'green'}`;
            }
        },

        applyElementVisibilityFromState: () => { // Same as original logic
            if (state.dom.realTimeClock) state.dom.realTimeClock.style.display = state.showClock ? 'block' : 'none';
            if (state.dom.statsTextSummary) state.dom.statsTextSummary.style.display = state.showStats ? 'block' : 'none';
            if (state.dom.lastActionTimerDisplay) state.dom.lastActionTimerDisplay.style.display = state.showLastActionTimer ? 'block' : 'none';
            if (state.dom.uiTabIndicatorText) state.dom.uiTabIndicatorText.style.display = state.showUITabIndicator ? 'block' : 'none';
            if (state.dom.triggerDebugDisplay) state.dom.triggerDebugDisplay.style.display = state.showTriggerDebug ? 'block' : 'none';
            UIManager.applyPageTheme();
        },

        applyPageTheme: () => { // Same as original logic
            const mode = state.customTabThemes[state.currentTabFullUrl] || state.currentTabMode;
            if (state.dom.pageColorOverlay) { state.dom.pageColorOverlay.style.backgroundColor = mode.color; state.dom.pageColorOverlay.style.display = state.showPageOverlay ? 'block' : 'none'; }
            if (state.dom.pageIndicatorText) { state.dom.pageIndicatorText.textContent = mode.name.substring(0, 10).toUpperCase(); state.dom.pageIndicatorText.style.color = mode.textColor; state.dom.pageIndicatorText.style.display = state.showPageOverlay ? 'block' : 'none'; }
        },
        
        updateUITabIndicatorText: () => { // Same as original
            if(state.dom.uiTabIndicatorText) { const m = state.customTabThemes[state.currentTabFullUrl] || state.currentTabMode; state.dom.uiTabIndicatorText.textContent = m.name; state.dom.uiTabIndicatorText.style.color = m.textColor || CONFIG.UI_TEXT_COLOR; }
        },
        
        updateCounterDisplay: () => { if (state.dom.mainCounterInput) { state.dom.mainCounterInput.value = state.clicksForThisTab; EventHandlers.handleCounterInputDynamic({target: state.dom.mainCounterInput}); }},
        updateRealTimeClockDisplay: () => { if(state.dom.realTimeClock && state.showClock) state.dom.realTimeClock.textContent = Utils.formatDateToHHMM(new Date(),true); },
        updateLastActionTimerDisplay: () => {
            if (!state.dom.lastActionTimerDisplay || !state.showLastActionTimer) { if(state.dom.lastActionTimerDisplay) state.dom.lastActionTimerDisplay.style.display = 'none'; return; }
            state.dom.lastActionTimerDisplay.style.display = 'block'; const elapsedMs = Date.now() - state.lastActionTimestampForThisTab;
            state.dom.lastActionTimerDisplay.textContent = `Last: ${Utils.formatMsToDuration(elapsedMs, true).replace(/^0h\s*/, '').replace(/^0m\s*/, '')}`;
            const isWarn = elapsedMs > CONFIG.LAST_ACTION_TIMER_WARN_SECONDS * 1000;
            state.dom.lastActionTimerDisplay.style.color = isWarn ? CONFIG.LAST_ACTION_TIMER_WARN_COLOR : CONFIG.UI_TEXT_COLOR;
            state.dom.lastActionTimerDisplay.style.fontWeight = isWarn ? 'bold' : 'normal'; state.dom.lastActionTimerDisplay.style.opacity = isWarn ? '0.9' : '0.75';
        },
        updateStatisticsDisplay: () => { // Same as original
            if (!state.dom.statsTextSummary || !state.showStats) { if(state.dom.statsTextSummary) state.dom.statsTextSummary.innerHTML = ''; return; }
            state.dom.statsTextSummary.style.display = 'block'; if (!state.shiftStartTime) { state.dom.statsTextSummary.innerHTML = '<p style="color:red;">Shift start error!</p>'; return; }
            const now = new Date(); let totalElapsedMsOverall = now.getTime() - state.shiftStartTime.getTime(); if (totalElapsedMsOverall < 0) totalElapsedMsOverall = 0;
            let lunchDurationMs = 0; const lunch = state.selectedLunchOption;
            if (lunch && (lunch.start !== "00:00" || lunch.end !== "00:00")) {
                const shiftBaseDate = new Date(state.shiftStartTime); shiftBaseDate.setHours(0,0,0,0);
                let lunchStartAbs = new Date(shiftBaseDate); const [lsh, lsm] = lunch.start.split(':').map(Number); lunchStartAbs.setHours(lsh, lsm, 0, 0);
                let lunchEndAbs = new Date(shiftBaseDate); const [leh, lem] = lunch.end.split(':').map(Number); lunchEndAbs.setHours(leh, lem, 0, 0);
                if (ShiftManager.getCurrentShiftCategory() === 'night' && state.shiftStartTime.getHours() >= 12) { if (lsh < state.shiftStartTime.getHours()) lunchStartAbs.setDate(lunchStartAbs.getDate() + 1); if (leh < state.shiftStartTime.getHours() || (leh <lsh)) lunchEndAbs.setDate(lunchEndAbs.getDate() + 1);
                } else if (leh < lsh) lunchEndAbs.setDate(lunchEndAbs.getDate() + 1);
                const effectiveLunchStart = Math.max(state.shiftStartTime.getTime(), lunchStartAbs.getTime()); const effectiveLunchEnd = Math.min(now.getTime(), lunchEndAbs.getTime());
                if (effectiveLunchEnd > effectiveLunchStart) lunchDurationMs = effectiveLunchEnd - effectiveLunchStart;
            }
            const effectiveWorkMsThisTab = Math.max(0, totalElapsedMsOverall - lunchDurationMs); const hoursWorkedThisTab = effectiveWorkMsThisTab / (1000 * 60 * 60);
            const clicksPerHourThisTab = (hoursWorkedThisTab > 0.001) ? (state.clicksForThisTab / hoursWorkedThisTab) : 0;
            const globalClicksPerHour = (hoursWorkedThisTab > 0.001 && state.globalTotalClicks > 0) ? (state.globalTotalClicks / hoursWorkedThisTab) : 0;
            let statsHTML = `<p style="margin-bottom: 4px;">Shift: <strong>${Utils.formatDateToHHMM(state.shiftStartTime)}</strong> (${state.shiftType})</p> <p style="margin-bottom: 8px;">Lunch: ${lunch ? lunch.text.replace(/\s\(.+\)/,'') : 'N/A'}</p> <div style="display:flex; justify-content:space-around; gap: 10px; border-top: 1px solid ${CONFIG.UI_TEXT_COLOR}1A; padding-top: 8px;"> <div style="text-align:center;"> <div><u>This Tab (${state.currentTabMode.name})</u></div> <div>Items: <strong>${state.clicksForThisTab}</strong></div> <div>~<strong style="color:${CONFIG.MAIN_ACCENT_COLOR};font-size:1.15em;">${clicksPerHourThisTab.toFixed(1)}</strong>/hr</div> <div style="font-size:0.85em; opacity:0.7;">(worked ${Utils.formatMsToDuration(effectiveWorkMsThisTab)})</div> </div> <div style="text-align:center; border-left: 1px solid ${CONFIG.UI_TEXT_COLOR}2A; padding-left:10px;"> <div><u>Global (Active Tabs)</u></div> <div>Total: <strong>${state.globalTotalClicks}</strong></div> <div>~<strong style="color:${CONFIG.MAIN_ACCENT_COLOR};font-size:1.15em;">${globalClicksPerHour.toFixed(1)}</strong>/hr</div> <div style="font-size:0.85em; opacity:0.7;">(based on this tab time)</div> </div> </div>`;
            const otherTabsArray = Object.values(state.otherTabsData).filter(td => td.tabId !== state.currentTabId);
            if (otherTabsArray.length > 0) statsHTML += `<div style="font-size:0.8em; margin-top:8px; border-top:1px solid ${CONFIG.UI_TEXT_COLOR}1A; padding-top:5px; max-height: 40px; overflow-y:auto; opacity: 0.8;"> Others: ${otherTabsArray.map(td => `${td.modeName||td.tabId.substring(0,10)}: ${td.clicks}${td.contributesToTotal?'<span title="Contributing">✓</span>':'<span title="Not Cntr.">x</span>'}`).join('; ')} </div>`;
            state.dom.statsTextSummary.innerHTML = statsHTML;
        },
    };
    
    const AutoIncrementer = { // Mostly same, ensure UI placeholder for trigger word in debug
        debounceTimer: null,
        init: () => {
            if (state.mutationObserver) state.mutationObserver.disconnect();
            const observeTargetNode = document.querySelector(CONFIG.TRIGGER_OBSERVE_AREA_SELECTOR) || document.body;
            const processMutations = () => {
                if (!state.autoClickEnabled) return;
                // To avoid self-triggering from UI, temporarily hide UI if it's part of observed area
                let pageTextContent = "";
                const uiWasVisible = state.uiContainer && getComputedStyle(state.uiContainer).visibility !== 'hidden';
                if (uiWasVisible && observeTargetNode.contains(state.uiContainer)) state.uiContainer.style.visibility = 'hidden';
                pageTextContent = observeTargetNode.innerText || observeTargetNode.textContent || "";
                if (uiWasVisible && observeTargetNode.contains(state.uiContainer)) state.uiContainer.style.visibility = 'visible';

                const triggerRegex = new RegExp(`\\b${CONFIG.AUTO_CLICK_TRIGGER_WORD}\\b`, 'i');
                const triggerIsCurrentlyFoundOnPage = triggerRegex.test(pageTextContent);
                
                let foundElementsPaths = [];
                if (CONFIG.DEBUG_MODE && state.showTriggerDebug && triggerIsCurrentlyFoundOnPage) {
                    foundElementsPaths = AutoIncrementer.findElementsContainingText(observeTargetNode, CONFIG.AUTO_CLICK_TRIGGER_WORD);
                }
                if(state.showTriggerDebug) AutoIncrementer.updateTriggerDebugDisplay(triggerIsCurrentlyFoundOnPage, foundElementsPaths);

                if (triggerIsCurrentlyFoundOnPage && !state.autoClickTriggerWordFound) { state.autoClickTriggerWordFound = true; }
                else if (!triggerIsCurrentlyFoundOnPage && state.autoClickTriggerWordFound) { EventHandlers.processIncrementForCurrentTab(false); state.autoClickTriggerWordFound = false; }
            };
            const observerCallback = () => { clearTimeout(AutoIncrementer.debounceTimer); AutoIncrementer.debounceTimer = setTimeout(processMutations, CONFIG.TRIGGER_MUTATION_DEBOUNCE_MS); };
            state.mutationObserver = new MutationObserver(observerCallback);
            state.mutationObserver.observe(observeTargetNode, { childList: true, subtree: true, characterData: true });
            setTimeout(processMutations, 250);
        },
        disconnect: () => { if (state.mutationObserver) { state.mutationObserver.disconnect(); state.mutationObserver = null; } clearTimeout(AutoIncrementer.debounceTimer); },
        findElementsContainingText: (rootElement, searchText) => { // Skip paths from own UI
            const paths = new Set();
            const walker = document.createTreeWalker(rootElement, NodeFilter.SHOW_TEXT, {
                acceptNode: (node) => {
                    if (state.uiContainer && state.uiContainer.contains(node.parentElement)) return NodeFilter.FILTER_REJECT; // Skip own UI
                    if (node.nodeValue && node.nodeValue.toLowerCase().includes(searchText.toLowerCase())) return NodeFilter.FILTER_ACCEPT;
                    return NodeFilter.FILTER_REJECT;
                }
            });
            let node;
            while ((node = walker.nextNode()) && paths.size < CONFIG.TRIGGER_DEBUG_MAX_PATHS) {
                let currentElement = node.parentElement; const elementPath = [];
                while (currentElement && currentElement !== rootElement && elementPath.length < 4) {
                    let elDesc = currentElement.tagName.toLowerCase(); if (currentElement.id) elDesc += `#${currentElement.id.replace(CONFIG.SCRIPT_ID_PREFIX, '')}`;
                    if (currentElement.className && typeof currentElement.className === 'string') { const classes = currentElement.className.split(/\s+/).filter(c => c && !c.startsWith('ph-')).slice(0,2).join('.'); if(classes) elDesc += `.${classes}`; }
                    elementPath.unshift(elDesc); currentElement = currentElement.parentElement;
                }
                if (elementPath.length > 0) paths.add(elementPath.join(' > '));
            }
            return Array.from(paths);
        },
        updateTriggerDebugDisplay: (isFound, paths = []) => {
            if (!state.dom.triggerDebugDisplay || !state.showTriggerDebug) { if(state.dom.triggerDebugDisplay) state.dom.triggerDebugDisplay.style.display = 'none'; return; }
            state.dom.triggerDebugDisplay.style.display = 'block';
            let html = `<strong>${CONFIG.TRIGGER_UI_PLACEHOLDER} Debug:</strong> ${isFound?`<span style="color:lightgreen;">FOUND</span>`:`<span style="color:orange;">Not found</span>`} (Flag:${state.autoClickTriggerWordFound?'ON':'OFF'})<br>`;
            if(isFound&&paths.length>0) html+="Paths: "+paths.map(p=>`<code>${p.replace(/</g,'<').replace(/>/g,'>')}</code>`).join('; ');
            else if (isFound) html += "Paths: (root text likely)";
            state.dom.triggerDebugDisplay.innerHTML = html;
        }
    };
    
    const SettingsPanel = { // Mostly same, adapted for new Utils.createDOMElement behavior and placeholder for trigger word
        build: () => {
            state.dom.settingsPanel = Utils.createDOMElementBase('div', { // Base to control its own pointer events precisely
                id: CONFIG.SETTINGS_PANEL_ID_SUFFIX, className: 'ph-settings-panel ph-interactive-parent',
                style: {
                    position: 'absolute', top: '0px', right: '0px', bottom: '0px', width: 'clamp(300px, 55%, 450px)',
                    backgroundColor: `rgba(40, 45, 55, 0.50)`, borderLeft: `2px solid ${CONFIG.MAIN_ACCENT_COLOR}`,
                    padding: '15px 20px', zIndex: '10', display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto',
                    boxShadow: '0px 0px 0px rgba(0,0,0,0.3)', transform: 'translateX(101%)',
                    transition: 'transform 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)', pointerEvents: 'none'
                }
            });
            const heading = Utils.createDOMElement('h3', { textContent: 'Production Settings', style: { marginTop: '0', marginBottom: '15px', textAlign: 'center', color: 'white', fontSize: '1.25em'} });
            state.dom.settingsPanel.appendChild(heading);

            const createSection = (title, elements) => { const section = Utils.createDOMElement('div', {className: 'ph-settings-section'}); if (title) section.appendChild(Utils.createDOMElement('h4', { textContent: title, style: {margin: '15px 0 8px 0', color: 'rgba(255,255,255,0.9)', fontSize: '1.05em', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '5px'} })); elements.forEach(el => section.appendChild(el)); return section; };
            const commonInputStyle = {width: '100%', padding: '8px', boxSizing: 'border-box', backgroundColor: 'rgba(20,20,30,0.5)', color: 'white', border: `1px solid ${CONFIG.MAIN_ACCENT_COLOR}cc`, borderRadius: '4px', fontSize: '0.9em', pointerEvents: 'auto', userSelect: 'auto', cursor:'text'};
            const commonSelectStyle = {...commonInputStyle, cursor: 'pointer'};
            const commonLabelStyle = { display: 'block', marginBottom: '3px', fontSize: '0.85em', color: 'rgba(255,255,255,0.75)'}; // Non-interactive by default
            const checkboxRowStyle = { display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '0.9em', color: 'rgba(255,255,255,0.85)', margin: '6px 0', pointerEvents:'auto', userSelect:'none' }; // Row is interactive for click
            const checkboxStyle = { marginRight: '10px', transform: 'scale(1.2)', accentColor: CONFIG.MAIN_ACCENT_COLOR, cursor:'pointer', pointerEvents:'auto' };

            state.dom.pointerEventsModeSelect = Utils.createDOMElementBase('select', { id: 'pointerEventsModeSelect', style: commonSelectStyle, className:'ph-interactive' });
            CONFIG.POINTER_EVENTS_MODES.forEach(opt => state.dom.pointerEventsModeSelect.add(new Option(opt.text, opt.value)));
            state.dom.pointerEventsModeSelect.addEventListener('change', (e) => { state.pointerEventsMode = e.target.value; UIManager.updatePointerEventsMode(); StorageManager.saveMainSettings(); });
            state.dom.settingsPanel.appendChild(createSection('Mouse Click Mode', [ Utils.createDOMElement('label', { htmlFor: state.dom.pointerEventsModeSelect.id, textContent: 'Panel Click Behavior:', style: commonLabelStyle }), state.dom.pointerEventsModeSelect ]));
            
            state.dom.settingsShiftTypeSelect = Utils.createDOMElementBase('select', { id: 'shiftTypeSelect', style: commonSelectStyle, className:'ph-interactive' });
            state.dom.settingsShiftTypeSelect.addEventListener('change', EventHandlers.handleShiftSettingsChange);
            state.dom.settingsShiftStartTimeInput = Utils.createDOMElementBase('input', { type: 'time', id: 'shiftStartTimeInput', style: commonInputStyle, className:'ph-interactive' });
            state.dom.settingsShiftStartTimeInput.addEventListener('change', EventHandlers.handleShiftSettingsChange);
            state.dom.settingsLunchSelect = Utils.createDOMElementBase('select', { id: 'lunchSelect', style: commonSelectStyle, className:'ph-interactive' });
            state.dom.settingsLunchSelect.addEventListener('change', EventHandlers.handleLunchSettingChange);
            state.dom.settingsPanel.appendChild(createSection('Shift & Lunch', [ Utils.createDOMElement('label', { htmlFor: state.dom.settingsShiftTypeSelect.id, textContent: 'Shift Type:', style: commonLabelStyle }), state.dom.settingsShiftTypeSelect, Utils.createDOMElement('label', { htmlFor: state.dom.settingsShiftStartTimeInput.id, textContent: 'Shift Start (manual):', style: {...commonLabelStyle, marginTop:'8px'} }), state.dom.settingsShiftStartTimeInput, Utils.createDOMElement('label', { htmlFor: state.dom.settingsLunchSelect.id, textContent: 'Lunch Break:', style: {...commonLabelStyle, marginTop:'8px'} }), state.dom.settingsLunchSelect, ]));

            state.dom.autoClickEnabledCheckbox = Utils.createDOMElementBase('input', { type: 'checkbox', id: 'autoClickEnableCb', style: checkboxStyle, className:'ph-interactive' });
            state.dom.autoClickEnabledCheckbox.addEventListener('change', EventHandlers.handleAutoClickSettingChange);
            const autoClickLabel = Utils.createDOMElementBase('label', { htmlFor: state.dom.autoClickEnabledCheckbox.id, textContent: `Auto-Increment on ${CONFIG.TRIGGER_UI_PLACEHOLDER}`, style: checkboxRowStyle, className:'ph-interactive' }, [state.dom.autoClickEnabledCheckbox]);
            
            state.dom.currentTabContributesCheckbox = Utils.createDOMElementBase('input', {type: 'checkbox', id: 'currentTabContributesCb', style: checkboxStyle, className:'ph-interactive' });
            state.dom.currentTabContributesCheckbox.addEventListener('change', EventHandlers.handleCurrentTabContributionChange);
            const currentTabContributeLabel = Utils.createDOMElementBase('label', {htmlFor: state.dom.currentTabContributesCheckbox.id, textContent: `This Tab contributes to Global Stats`, style: checkboxRowStyle, className:'ph-interactive' }, [state.dom.currentTabContributesCheckbox]);
            state.dom.otherTabsSettingsContainer = Utils.createDOMElement('div', {id: 'otherTabsSettingsContainer', style: {marginLeft: '25px', marginTop: '2px', fontSize: '0.9em'}});
            state.dom.settingsPanel.appendChild(createSection('Automation & Stats Contribution', [ autoClickLabel, currentTabContributeLabel, state.dom.otherTabsSettingsContainer ]));

            const visControls = [ { stateKey: 'showClock', idSuffix: 'showClockCb', label: 'Show Real-time Clock' }, { stateKey: 'showStats', idSuffix: 'showStatsCb', label: 'Show Statistics Block' }, { stateKey: 'showLastActionTimer', idSuffix: 'showLastActionTimerCb', label: 'Show Last Action Timer' }, { stateKey: 'showUITabIndicator', idSuffix: 'showUITabIndicatorCb', label: 'Show Tab Name in Panel' }, { stateKey: 'showPageOverlay', idSuffix: 'showPageOverlayCb', label: 'Show Full Page Color Overlay' }, { stateKey: 'showTriggerDebug', idSuffix: 'showTriggerDebugCb', label: `Show ${CONFIG.TRIGGER_UI_PLACEHOLDER} Debug` } ];
            const visElements = visControls.map(vc => { state.dom[vc.stateKey + 'Checkbox'] = Utils.createDOMElementBase('input', {type: 'checkbox', id: vc.idSuffix, style: checkboxStyle, className:'ph-interactive'}); state.dom[vc.stateKey + 'Checkbox'].addEventListener('change', (e) => { state[vc.stateKey] = e.target.checked; UIManager.applyElementVisibilityFromState(); StorageManager.saveMainSettings(); }); return Utils.createDOMElementBase('label', {htmlFor: state.dom[vc.stateKey + 'Checkbox'].id, textContent: vc.label, style:checkboxRowStyle, className:'ph-interactive'}, [state.dom[vc.stateKey + 'Checkbox']]); });
            state.dom.settingsPanel.appendChild(createSection('UI Element Visibility', visElements));

            state.dom.customTabNameInput = Utils.createDOMElementBase('input', {type: 'text', id: 'customTabNameInput', style: commonInputStyle, placeholder: 'E.g., Station Alpha - Prebuild', className:'ph-interactive'});
            state.dom.customTabBkgColorInput = Utils.createDOMElementBase('input', {type: 'text', id: 'customTabOverlayColorInput', style: commonInputStyle, placeholder: 'rgba(R,G,B,A) or #HEX', className:'ph-interactive'});
            state.dom.customTabTextColorInput = Utils.createDOMElementBase('input', {type: 'text', id: 'customTabTextColorInput', style: commonInputStyle, placeholder: 'rgba(R,G,B,A) or #HEX', className:'ph-interactive'});
            const saveThemeBtn = Utils.createDOMElementBase('button', {textContent: 'Save Custom Appearance for This URL', style: {...commonInputStyle, backgroundColor: `${CONFIG.MAIN_ACCENT_COLOR}bb`, color:'black', marginTop:'8px', cursor:'pointer'}, className:'ph-interactive'});
            saveThemeBtn.onclick = EventHandlers.handleSaveCustomTheme;
            const resetThemeBtn = Utils.createDOMElementBase('button', {textContent: 'Reset Appearance to Default for This URL', style: {...commonInputStyle, backgroundColor: `rgba(100,100,100,0.4)`, color:'white', marginTop:'5px', cursor:'pointer'}, className:'ph-interactive'});
            resetThemeBtn.onclick = EventHandlers.handleResetCustomTheme;
            state.dom.settingsPanel.appendChild(createSection('Current Tab Appearance', [ Utils.createDOMElement('label', {htmlFor: state.dom.customTabNameInput.id, textContent: 'Tab Display Name:', style: commonLabelStyle}), state.dom.customTabNameInput, Utils.createDOMElement('label', {htmlFor: state.dom.customTabBkgColorInput.id, textContent: 'Page Overlay Color:', style: {...commonLabelStyle, marginTop:'8px'}}), state.dom.customTabBkgColorInput, Utils.createDOMElement('label', {htmlFor: state.dom.customTabTextColorInput.id, textContent: 'Page Indicator Text Color:', style: {...commonLabelStyle, marginTop:'8px'}}), state.dom.customTabTextColorInput, saveThemeBtn, resetThemeBtn ]));
            
            state.dom.debugPointerEventBordersCheckbox = Utils.createDOMElementBase('input', {type: 'checkbox', id: 'debugPointerBordersCb', style: checkboxStyle, className:'ph-interactive'});
            state.dom.debugPointerEventBordersCheckbox.addEventListener('change', (e) => { state.debugPointerEventBorders = e.target.checked; UIManager.applyDebugPointerEventBorders(); StorageManager.saveMainSettings(); });
            const debugPointerLabel = Utils.createDOMElementBase('label', {htmlFor: state.dom.debugPointerEventBordersCheckbox.id, textContent: 'Show Clickable Area Debug Borders', style:checkboxRowStyle, className:'ph-interactive'}, [state.dom.debugPointerEventBordersCheckbox]);
            state.dom.settingsPanel.appendChild(createSection('Debugging Tools', [debugPointerLabel]));

            const closeButton = Utils.createDOMElementBase('button', { textContent: 'Apply & Close', className: 'ph-settings-close-btn ph-interactive', style: { cursor: 'pointer', backgroundColor: `${CONFIG.MAIN_ACCENT_COLOR}dd`, border: 'none', color: 'black', borderRadius: '5px', padding: '10px 15px', fontSize: '1em', width: '100%', marginTop: 'auto', transition: 'background-color 0.2s' }});
            closeButton.addEventListener('click', () => UIManager.setSettingsPanelVisibility(false)); Utils.makeButtonInteractive(closeButton);
            state.dom.settingsPanel.appendChild(closeButton);
            state.uiContainer.appendChild(state.dom.settingsPanel);
        },
        populateAllFields: () => { // Same as original
            if (state.dom.pointerEventsModeSelect) state.dom.pointerEventsModeSelect.value = state.pointerEventsMode;
            if(state.dom.settingsShiftTypeSelect) { state.dom.settingsShiftTypeSelect.innerHTML = ''; [['auto', 'Automatic Detection'], ['day', `Day (from ${CONFIG.DEFAULT_DAY_SHIFT_START_TIME})`], ['night', `Night (from ${CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME})`]].forEach(([val, txt]) => state.dom.settingsShiftTypeSelect.add(new Option(txt, val))); state.dom.settingsShiftTypeSelect.value = state.shiftType; }
            if(state.dom.settingsShiftStartTimeInput) { state.dom.settingsShiftStartTimeInput.value = state.shiftStartTime ? Utils.formatDateToHHMM(state.shiftStartTime) : ''; const isManual = state.shiftType !== 'auto'; state.dom.settingsShiftStartTimeInput.style.display = isManual ? 'block' : 'none'; const label = state.dom.settingsShiftStartTimeInput.previousElementSibling; if (label && label.tagName === 'LABEL') label.style.display = isManual ? 'block' : 'none'; }
            if(state.dom.settingsLunchSelect) { state.dom.settingsLunchSelect.innerHTML = ''; const currentShiftCat = ShiftManager.getCurrentShiftCategory(); const filteredOptions = CONFIG.DEFAULT_LUNCH_OPTIONS.filter(opt => opt.type === currentShiftCat || opt.type === 'any'); filteredOptions.forEach(opt => { const originalIndex = CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(opt); state.dom.settingsLunchSelect.add(new Option(opt.text, String(originalIndex))); }); if (state.selectedLunchOption) { const currentLunchOriginalIndex = CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(state.selectedLunchOption); if (filteredOptions.includes(state.selectedLunchOption)) state.dom.settingsLunchSelect.value = String(currentLunchOriginalIndex); else if (filteredOptions.length > 0) { state.selectedLunchOption = filteredOptions[0]; state.dom.settingsLunchSelect.value = String(CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(filteredOptions[0])); } } else if (filteredOptions.length > 0) { state.selectedLunchOption = filteredOptions[0]; state.dom.settingsLunchSelect.value = String(CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(filteredOptions[0])); }}
            if(state.dom.autoClickEnabledCheckbox) state.dom.autoClickEnabledCheckbox.checked = state.autoClickEnabled;
            if(state.dom.currentTabContributesCheckbox) state.dom.currentTabContributesCheckbox.checked = state.currentTabContributesToTotal;
            SettingsPanel.updateOtherTabsSettingsDisplay();
            ['showClock', 'showStats', 'showLastActionTimer', 'showUITabIndicator', 'showPageOverlay', 'showTriggerDebug'].forEach(key => { if(state.dom[key + 'Checkbox']) state.dom[key + 'Checkbox'].checked = state[key]; });
            if(state.dom.debugPointerEventBordersCheckbox) state.dom.debugPointerEventBordersCheckbox.checked = state.debugPointerEventBorders;
            const themeToDisplay = state.customTabThemes[state.currentTabFullUrl] || state.currentTabMode;
            if(state.dom.customTabNameInput) state.dom.customTabNameInput.value = themeToDisplay.name; if(state.dom.customTabBkgColorInput) state.dom.customTabBkgColorInput.value = themeToDisplay.color; if(state.dom.customTabTextColorInput) state.dom.customTabTextColorInput.value = themeToDisplay.textColor;
            const headingElem = state.dom.settingsPanel.querySelector('h4'); if(headingElem && headingElem.textContent.startsWith('Current Tab Appearance')) headingElem.textContent = `Current Tab Appearance (${state.currentTabMode.name})`;
        },
        updateOtherTabsSettingsDisplay: () => { // Same as original, ensure interactive elements are marked
            if (!state.dom.otherTabsSettingsContainer) return; state.dom.otherTabsSettingsContainer.innerHTML = '';
            const checkboxRowStyle = { display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '0.9em', color: 'rgba(255,255,255,0.8)', margin:'3px 0', pointerEvents:'auto', userSelect:'none' };
            const checkboxStyle = { marginRight: '8px', transform: 'scale(1.1)', accentColor: CONFIG.MAIN_ACCENT_COLOR, cursor:'pointer', pointerEvents:'auto' };
            const otherTabs = Object.values(state.otherTabsData).filter(td => td.tabId !== state.currentTabId);
            if (otherTabs.length === 0) { state.dom.otherTabsSettingsContainer.appendChild(Utils.createDOMElement('p', {textContent: '(No other active helper tabs detected)', style: {opacity:'0.6', fontStyle:'italic', fontSize:'0.85em', margin:'5px 0'}})); return; }
            otherTabs.forEach(tabData => { const checkboxId = `contribToggle_${tabData.tabId.replace(/[^a-zA-Z0-9]/g, '_')}`; const checkbox = Utils.createDOMElementBase('input', { type: 'checkbox', id: checkboxId, checked: tabData.contributesToTotal || false, style: checkboxStyle, dataset: { targetTabId: tabData.tabId }, className:'ph-interactive' }); checkbox.addEventListener('change', EventHandlers.handleOtherTabContributionChange); const label = Utils.createDOMElementBase('label', { htmlFor: checkbox.id, style: checkboxRowStyle, className:'ph-interactive' }, [ checkbox, `Tab: ${tabData.modeName || tabData.tabId.substring(0,15)+'...'} (${tabData.clicks || 0} items)` ]); state.dom.otherTabsSettingsContainer.appendChild(label); });
        }
    };

    // --- ------------------------------------------------------------------------ ---
    // --- -------------------------- EVENT HANDLERS ---------------------------- ---
    // --- ------------------------------------------------------------------------ ---
    const EventHandlers = { // Mostly same logic, pointer event checks are now centralized in UIManager
        processIncrementForCurrentTab: (isManualAction = false, event = null) => {
            state.clicksForThisTab++; state.lastActionTimestampForThisTab = Date.now();
            UIManager.updateCounterDisplay(); UIManager.updateLastActionTimerDisplay();
            StorageManager.writeCurrentTabDataToLocalStorage(); StorageManager.readAllTabsDataFromLocalStorage(false);
            if (isManualAction && state.dom.incrementButton) { state.dom.incrementButton.style.transform = 'scale(0.93)'; setTimeout(() => { if(state.dom.incrementButton) state.dom.incrementButton.style.transform = 'scale(1)'; }, 100); }
        },
        handleDecrementClick: () => {
            if (state.dom.decrementButton && state.dom.decrementButton.style.pointerEvents === 'none') return; // Respect pointer mode
            if (state.clicksForThisTab > 0) { state.clicksForThisTab--; state.lastActionTimestampForThisTab = Date.now(); UIManager.updateCounterDisplay(); UIManager.updateLastActionTimerDisplay(); StorageManager.writeCurrentTabDataToLocalStorage(); StorageManager.readAllTabsDataFromLocalStorage(false); }
        },
        handleCounterInputDynamic: (event) => { // Same as original
            const input = event.target; const valueLength = String(input.value).length; let newFontSize = CONFIG.MAIN_COUNTER_FONT_SIZE_INITIAL_EM;
            if (valueLength > CONFIG.MAIN_COUNTER_MAX_CHARS_BEFORE_RESIZE) { const overflowChars = valueLength - CONFIG.MAIN_COUNTER_MAX_CHARS_BEFORE_RESIZE; newFontSize = Math.max(CONFIG.MAIN_COUNTER_FONT_SIZE_MIN_EM, CONFIG.MAIN_COUNTER_FONT_SIZE_INITIAL_EM - overflowChars * 0.65); }
            input.style.fontSize = `${newFontSize}em`;
        },
        handleCounterInputChange: (event) => { // Same, respect pointer mode
            if (state.dom.mainCounterInput && state.dom.mainCounterInput.style.pointerEvents === 'none') { event.target.value = state.clicksForThisTab; EventHandlers.handleCounterInputDynamic({target: event.target}); return; }
            let newValue = parseInt(event.target.value, 10); if (isNaN(newValue) || newValue < 0) newValue = 0;
            if (newValue !== state.clicksForThisTab) { state.clicksForThisTab = newValue; state.lastActionTimestampForThisTab = Date.now(); UIManager.updateLastActionTimerDisplay(); StorageManager.writeCurrentTabDataToLocalStorage(); StorageManager.readAllTabsDataFromLocalStorage(false); }
            UIManager.updateCounterDisplay();
        },
        handleShiftSettingsChange: () => { state.shiftType = state.dom.settingsShiftTypeSelect.value; ShiftManager.determineAndSetShiftStartTime(false); if (state.dom.settingsLunchSelect) SettingsPanel.populateAllFields(); UIManager.updateStatisticsDisplay(); StorageManager.saveMainSettings(); },
        handleLunchSettingChange: () => { const selectedIndex = parseInt(state.dom.settingsLunchSelect.value, 10); if (CONFIG.DEFAULT_LUNCH_OPTIONS[selectedIndex]) { state.selectedLunchOption = CONFIG.DEFAULT_LUNCH_OPTIONS[selectedIndex]; UIManager.updateStatisticsDisplay(); StorageManager.saveMainSettings(); }},
        handleAutoClickSettingChange: (event) => { state.autoClickEnabled = event.target.checked; if (state.autoClickEnabled && !state.mutationObserver) AutoIncrementer.init(); else if (!state.autoClickEnabled && state.mutationObserver) AutoIncrementer.disconnect(); StorageManager.saveMainSettings(); },
        handleSaveCustomTheme: () => { const name = state.dom.customTabNameInput.value.trim() || CONFIG.DEFAULT_TAB_MODE_NAME; const color = state.dom.customTabBkgColorInput.value.trim() || CONFIG.DEFAULT_TAB_MODE_COLOR; const textColor = state.dom.customTabTextColorInput.value.trim() || CONFIG.DEFAULT_TAB_MODE_TEXT_COLOR; state.customTabThemes[state.currentTabFullUrl] = { name, color, textColor }; state.currentTabMode = { name, color, textColor, isCustom: true }; StorageManager.saveCustomThemes(); UIManager.applyPageTheme(); UIManager.updateUITabIndicatorText(); SettingsPanel.populateAllFields(); },
        handleResetCustomTheme: () => { if (state.customTabThemes[state.currentTabFullUrl]) { delete state.customTabThemes[state.currentTabFullUrl]; StorageManager.determineCurrentTabMode(); StorageManager.saveCustomThemes(); UIManager.applyPageTheme(); UIManager.updateUITabIndicatorText(); SettingsPanel.populateAllFields(); }},
        handlePageKeydown: (event) => { // Same as original
            const target = event.target; const isOurInput = target === state.dom.mainCounterInput || (state.dom.settingsPanel && state.dom.settingsPanel.contains(target) && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA'));
            if (!isOurInput && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) return;
            if (event.code === CONFIG.INCREMENT_KEYBOARD_SHORTCUT_CODE) { event.preventDefault(); EventHandlers.processIncrementForCurrentTab(false, event); }
        },
        startResizePanes: (e) => { // Mostly same, UIManager.updatePointerEventsMode handles interactivity
            if (state.dom.divider && state.dom.divider.style.pointerEvents === 'none') return; e.preventDefault();
            state.isResizing = true; UIManager.updatePointerEventsMode();
            const mainArea = state.dom.leftPane.parentElement; const initialMouseX = e.clientX; const initialLeftPaneWidth = state.dom.leftPane.offsetWidth; const totalWidth = mainArea.offsetWidth - CONFIG.DIVIDER_WIDTH_PX;
            const doResize = (moveEvent) => { if (!state.isResizing) return; const dx = moveEvent.clientX - initialMouseX; let newLeftWidth = initialLeftPaneWidth + dx; const minLeftPx = totalWidth * (CONFIG.LEFT_PANE_MIN_WIDTH_PERCENT / 100); const minRightPx = totalWidth * (CONFIG.RIGHT_PANE_MIN_WIDTH_PERCENT / 100); if (newLeftWidth < minLeftPx) newLeftWidth = minLeftPx; if (newLeftWidth > totalWidth - minRightPx) newLeftWidth = totalWidth - minRightPx; const newLeftFlexBasis = (newLeftWidth / totalWidth) * 100; state.dom.leftPane.style.flexBasis = `${newLeftFlexBasis}%`; };
            const stopResize = () => { if (!state.isResizing) return; state.isResizing = false; document.removeEventListener('mousemove', doResize); document.removeEventListener('mouseup', stopResize); state.leftPaneFlexBasis = state.dom.leftPane.style.flexBasis; UIManager.updatePointerEventsMode(); StorageManager.saveMainSettings(); };
            document.addEventListener('mousemove', doResize); document.addEventListener('mouseup', stopResize);
        },
        handleCurrentTabContributionChange: (event) => { state.currentTabContributesToTotal = event.target.checked; StorageManager.writeCurrentTabDataToLocalStorage(); StorageManager.readAllTabsDataFromLocalStorage(false); StorageManager.saveMainSettings(); },
        handleOtherTabContributionChange: (event) => { // Same as original
            const targetTabId = event.target.dataset.targetTabId; const isChecked = event.target.checked; const otherTabStorageKey = CONFIG.MULTI_TAB_STORAGE_PREFIX + targetTabId;
            try { const otherTabStoredJson = localStorage.getItem(otherTabStorageKey); if (otherTabStoredJson) { const otherTabStoredData = JSON.parse(otherTabStoredJson); otherTabStoredData.contributesToTotal = isChecked; otherTabStoredData.timestamp = Date.now(); localStorage.setItem(otherTabStorageKey, JSON.stringify(otherTabStoredData)); StorageManager.readAllTabsDataFromLocalStorage(false); }} catch (err) { Utils.logError('Error updating contribution for other tab:', err); }
        }
    };

    // --- ------------------------------------------------------------------------ ---
    // --- -------------------- INITIALIZATION & DESTRUCTION -------------------- ---
    // --- ------------------------------------------------------------------------ ---
    function initialize() {
        const existingInstance = document.getElementById(CONFIG.UI_CONTAINER_ID);
        if (existingInstance || window.productionHelperInitialized_v3_4) { // Versioned flag
            Utils.logError('Production Assistant already initialized or remnant found. Attempting to destroy and re-init.');
            if (typeof window.destroyProductionHelper_v3_4 === 'function') { try { window.destroyProductionHelper_v3_4(); } catch(e) { Utils.logError("Error destroying old PHelper:", e); }}
            else { if(existingInstance) existingInstance.remove(); const ov = document.getElementById(CONFIG.SCRIPT_ID_PREFIX + CONFIG.PAGE_COLOR_OVERLAY_ID_SUFFIX); if(ov) ov.remove(); const ind = document.getElementById(CONFIG.SCRIPT_ID_PREFIX + CONFIG.PAGE_INDICATOR_TEXT_ID_SUFFIX); if(ind) ind.remove(); const sb = document.getElementById(CONFIG.SCRIPT_ID_PREFIX + CONFIG.EMERGENCY_SHOW_BUTTON_ID_SUFFIX); if(sb) sb.remove(); }
            delete window.productionHelperInitialized_v3_4; setTimeout(actualInit, 100); return;
        }
        actualInit();
    }
    
    function actualInit() {
        Utils.logInfo('Initializing Production Assistant v3.4 ...');
        StorageManager.loadAllState(); UIManager.buildInitialUI(); UIManager.setInitialUIValues();
        UIManager.updateCounterDisplay(); UIManager.updateRealTimeClockDisplay(); UIManager.updateLastActionTimerDisplay(); UIManager.updateStatisticsDisplay();
        state.intervals.realTimeClock = setInterval(UIManager.updateRealTimeClockDisplay, 1000);
        state.intervals.lastActionTimer = setInterval(UIManager.updateLastActionTimerDisplay, 1000);
        state.intervals.statistics = setInterval(UIManager.updateStatisticsDisplay, CONFIG.STATS_UPDATE_INTERVAL_MS);
        state.intervals.multiTabWrite = setInterval(StorageManager.writeCurrentTabDataToLocalStorage, CONFIG.MULTI_TAB_WRITE_INTERVAL_MS);
        state.intervals.multiTabRead = setInterval(() => StorageManager.readAllTabsDataFromLocalStorage(false), CONFIG.MULTI_TAB_READ_INTERVAL_MS);
        if (state.autoClickEnabled) AutoIncrementer.init();
        state.pageKeydownListener = EventHandlers.handlePageKeydown; document.addEventListener('keydown', state.pageKeydownListener);
        window.addEventListener('beforeunload', () => { StorageManager.writeCurrentTabDataToLocalStorage(); StorageManager.saveMainSettings(); StorageManager.saveCustomThemes(); });
        window.addEventListener('storage', (event) => { if (event.key && event.key.startsWith(CONFIG.MULTI_TAB_STORAGE_PREFIX) && event.key !== (CONFIG.MULTI_TAB_STORAGE_PREFIX + state.currentTabId)) StorageManager.readAllTabsDataFromLocalStorage(false); });
        state.initialized = true; window.productionHelperInitialized_v3_4 = true;
        Utils.logInfo('Production Assistant v3.4 initialized successfully.');
    }

    function destroy() {
        Utils.logInfo('Destroying Production Assistant v3.4 ...');
        try { if(state.initialized) { StorageManager.writeCurrentTabDataToLocalStorage(); StorageManager.saveMainSettings(); StorageManager.saveCustomThemes(); }} catch (e) { Utils.logError("Error saving data on destroy:", e); }
        AutoIncrementer.disconnect(); Object.values(state.intervals).forEach(clearInterval); state.intervals = {};
        if (state.pageKeydownListener) document.removeEventListener('keydown', state.pageKeydownListener);
        [CONFIG.UI_CONTAINER_ID, CONFIG.SCRIPT_ID_PREFIX + CONFIG.PAGE_COLOR_OVERLAY_ID_SUFFIX, CONFIG.SCRIPT_ID_PREFIX + CONFIG.PAGE_INDICATOR_TEXT_ID_SUFFIX, CONFIG.SCRIPT_ID_PREFIX + CONFIG.EMERGENCY_SHOW_BUTTON_ID_SUFFIX].forEach(id => { const el = document.getElementById(id); if (el) el.remove(); });
        state.uiContainer = null; state.dom = {}; state.initialized = false; delete window.productionHelperInitialized_v3_4;
        Utils.logInfo('Production Assistant v3.4 destroyed.');
    }
    window.destroyProductionHelper_v3_4 = destroy; // Versioned destroy function

    if (document.readyState === 'complete' || document.readyState === 'interactive') initialize();
    else document.addEventListener('DOMContentLoaded', initialize, { once: true });
})();
