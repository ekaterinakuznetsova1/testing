/*
    Production Assistant v3.3+
    Full rewrite based on the provided Technical Specification.
*/
(function() {
    'use strict';

    // --- ------------------------------------------------------------------------ ---
    // --- --------- SCRIPT CONFIGURATION (All settings are here) --------------- ---
    // --- ------------------------------------------------------------------------ ---
    const CONFIG = {
        // --- General UI & Styling ---
        SCRIPT_ID_PREFIX: 'prodHelper_v3_3_plus_',
        UI_CONTAINER_ID: 'prodHelperUI_v3_3_plus_mainContainer',
        UI_BOTTOM_OFFSET: '10px',
        UI_RIGHT_OFFSET: '10px',
        UI_WIDTH_PERCENT_VIEWPORT: 45, // Initial width as % of viewport width
        UI_HEIGHT_PERCENT_VIEWPORT: 35, // Initial height as % of viewport height
        UI_MIN_WIDTH_PX: 380,
        UI_MIN_HEIGHT_PX: 280,
        UI_BACKGROUND_COLOR: 'rgba(30, 35, 45, 0.92)', // Slightly more opaque
        UI_TEXT_COLOR: 'rgba(220, 220, 230, 0.95)',
        UI_BORDER_COLOR: 'rgba(80, 120, 220, 0.6)',
        FONT_FAMILY: '"Segoe UI", Roboto, Arial, sans-serif',
        MAIN_ACCENT_COLOR: 'rgba(255, 152, 0, 0.9)', // Orange accent

        // --- Clicker & Counter ---
        MAIN_COUNTER_FONT_SIZE_INITIAL_EM: 4.5, // Adjusted
        MAIN_COUNTER_FONT_SIZE_MIN_EM: 1.5,   // Adjusted
        MAIN_COUNTER_MAX_CHARS_BEFORE_RESIZE: 4,
        SHOW_DECREMENT_BUTTON: true,
        CLICKER_INCREMENT_BUTTON_COLOR: 'rgba(80, 180, 80, 0.8)',
        CLICKER_DECREMENT_BUTTON_COLOR: 'rgba(200, 80, 80, 0.8)',
        INCREMENT_KEYBOARD_SHORTCUT_CODE: 'ShiftRight',

        // --- Resizable Divider ---
        DIVIDER_WIDTH_PX: 8,
        LEFT_PANE_INITIAL_FLEX_BASIS: '40%',
        LEFT_PANE_MIN_WIDTH_PERCENT: 20,
        RIGHT_PANE_MIN_WIDTH_PERCENT: 25,

        // --- Timer for Last Action ---
        LAST_ACTION_TIMER_WARN_SECONDS: 10 * 60, // 10 minutes
        LAST_ACTION_TIMER_WARN_COLOR: 'rgba(255, 60, 60, 0.95)',

        // --- Real-time Clock ---
        CLOCK_FONT_SIZE_EM: 3.6, // Adjusted for bottom bar

        // --- Tabs/Modes Overlay & Identification ---
        PAGE_COLOR_OVERLAY_ID_SUFFIX: '_pageColorOverlay',
        PAGE_INDICATOR_TEXT_ID_SUFFIX: '_pageIndicatorText',
        PAGE_INDICATOR_FONT_SIZE_PX: 48,
        TAB_IDENTIFICATION_MODES: [
            { name: 'PREB', keyword: 'PREBUILD', color: 'rgba(255, 165, 0, 0.05)', textColor: 'rgba(255, 140, 0, 0.65)' },
            { name: 'CURRB', keyword: 'CURRENTBUILD', color: 'rgba(0, 165, 255, 0.05)', textColor: 'rgba(0, 140, 255, 0.65)' },
            { name: 'AFTREF', keyword: 'AFTERREFURBISH', color: 'rgba(100, 255, 100, 0.05)', textColor: 'rgba(80, 220, 80, 0.65)' },
        ],
        DEFAULT_TAB_MODE_NAME: 'General',
        DEFAULT_TAB_MODE_COLOR: 'rgba(100, 100, 100, 0.04)',
        DEFAULT_TAB_MODE_TEXT_COLOR: 'rgba(150, 150, 150, 0.55)',
        UI_TAB_INDICATOR_FONT_SIZE_EM: 1.0,

        // --- Multi-Tab State Sync via localStorage ---
        MULTI_TAB_STORAGE_PREFIX: 'prodHelper_tabs_data_v3.3p_',
        MULTI_TAB_WRITE_INTERVAL_MS: 1000,
        MULTI_TAB_READ_INTERVAL_MS: 1500,
        MULTI_TAB_DATA_TTL_MS: 5 * 60 * 1000, // Data older than this is considered stale

        // --- Shift & Lunch ---
        DEFAULT_DAY_SHIFT_START_TIME: '06:26',
        DEFAULT_NIGHT_SHIFT_START_TIME: '18:26',
        DEFAULT_LUNCH_OPTIONS: [
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
        STATS_FONT_SIZE_EM: 0.85, // Adjusted
        STATS_UPDATE_INTERVAL_MS: 2500,

        // --- Auto-Clicker Trigger ---
        AUTO_CLICK_TRIGGER_WORD: 'wysłano',
        TRIGGER_OBSERVE_AREA_SELECTOR: 'body',
        TRIGGER_DEBUG_MAX_PATHS: 5,
        TRIGGER_MUTATION_DEBOUNCE_MS: 200,

        // --- Storage ---
        STORAGE_KEY_MAIN_SETTINGS: 'prodHelper_mainCfg_v3.3p_', // Suffix tabId
        STORAGE_KEY_CUSTOM_THEMES: 'prodHelper_customThemes_v3.3p_global', // Global
        USE_SESSION_STORAGE_FOR_UI_STATE: true, // For panel visibility, pane size etc.

        // --- UI Controls & Settings Panel ---
        EMERGENCY_HIDE_BUTTON_TEXT: 'CLOSE',
        EMERGENCY_SHOW_BUTTON_ID_SUFFIX: '_emergencyShowBtn',
        EMERGENCY_SHOW_BUTTON_TEXT: '🛠️',
        EMERGENCY_SHOW_BUTTON_SIZE: '36px',
        EMERGENCY_SHOW_BUTTON_OPACITY: 0.4,
        EMERGENCY_SHOW_BUTTON_HOVER_OPACITY: 0.9,
        SETTINGS_PANEL_ID_SUFFIX: '_settingsPanel',
        LOCK_UI_BUTTON_TEXT_UNLOCKED: 'UI block',
        LOCK_UI_BUTTON_TEXT_LOCKED: 'UI unblock',
        TOGGLE_SETTINGS_BUTTON_TEXT_CLOSED: 'settings',
        TOGGLE_SETTINGS_BUTTON_TEXT_OPENED: 'settings ◄', // Arrow changed

        // --- Pointer Events Mode Options ---
        POINTER_EVENTS_MODES: [
            { value: 'fully_interactive', text: 'Fully Interactive (Blocks Background)' },
            { value: 'default_transparent_buttons_active', text: 'Default (Panel BG Transparent, Buttons Active)' },
            { value: 'fully_click_through', text: 'Fully Click-Through (Use Hotkeys/Auto)' }
        ],
        DEFAULT_POINTER_EVENTS_MODE: 'default_transparent_buttons_active',

        // --- Debugging ---
        DEBUG_MODE: true, // Master debug switch for console logs
    };

    // --- ------------------------------------------------------------------------ ---
    // --- --------- SCRIPT STATE (Internal - Do not modify directly) ----------- ---
    // --- ------------------------------------------------------------------------ ---
    const state = {
        initialized: false,
        uiContainer: null,
        dom: {}, // To store references to frequently accessed DOM elements
        intervals: {},
        mutationObserver: null,
        pageKeydownListener: null,
        isResizing: false,

        // --- Persisted State (loaded from storage or defaults) ---
        // UI Related State (potentially sessionStorage for current tab)
        uiVisible: true,
        uiLocked: false,
        settingsPanelVisible: false,
        leftPaneFlexBasis: CONFIG.LEFT_PANE_INITIAL_FLEX_BASIS,
        pointerEventsMode: CONFIG.DEFAULT_POINTER_EVENTS_MODE,

        // Visibility toggles (sessionStorage)
        showClock: true,
        showStats: true,
        showLastActionTimer: true,
        showUITabIndicator: true,
        showPageOverlay: true,
        showTriggerDebug: CONFIG.DEBUG_MODE, // Default to DEBUG_MODE
        debugPointerEventBorders: false,

        // Operational State (localStorage for cross-session & multi-tab where applicable)
        currentTabFullUrl: window.location.href,
        currentTabId: '', // Generated from URL
        currentTabMode: { ...CONFIG.TAB_IDENTIFICATION_MODES.find(m => m.name === CONFIG.DEFAULT_TAB_MODE_NAME) || { name: CONFIG.DEFAULT_TAB_MODE_NAME, keyword: '', color: CONFIG.DEFAULT_TAB_MODE_COLOR, textColor: CONFIG.DEFAULT_TAB_MODE_TEXT_COLOR, isCustom: false }},

        clicksForThisTab: 0,
        lastActionTimestampForThisTab: Date.now(),
        currentTabContributesToTotal: true,

        shiftType: 'auto', // 'auto', 'day', 'night'
        shiftStartTime: null, // Date object
        selectedLunchOption: null, // Object from CONFIG.DEFAULT_LUNCH_OPTIONS

        autoClickEnabled: true,
        autoClickTriggerWordFound: false, // Flag if an element with the word is currently visible
        
        // Global/Multi-tab state (from localStorage)
        customTabThemes: {}, // Key: full URL, Value: {name, color, textColor}
        otherTabsData: {}, // Key: tabId, Value: {tabId, modeName, clicks, lastActionTimestamp, contributesToTotal, timestamp}
        globalTotalClicks: 0, // Sum of clicks from all contributing tabs
    };

    // --- ------------------------------------------------------------------------ ---
    // --- ------------------------- UTILITY FUNCTIONS -------------------------- ---
    // --- ------------------------------------------------------------------------ ---
    const Utils = {
        logDebug: (...args) => { if (CONFIG.DEBUG_MODE) console.debug(`[PHelper DEBUG ${state.currentTabMode?.name || state.currentTabId?.substring(0,10) || ''}]`, ...args); },
        logInfo: (...args) => console.info(`[PHelper INFO ${state.currentTabMode?.name || state.currentTabId?.substring(0,10) || ''}]`, ...args),
        logError: (...args) => console.error(`[PHelper ERROR ${state.currentTabMode?.name || state.currentTabId?.substring(0,10) || ''}]`, ...args),

        getStorage: (useSession) => useSession ? sessionStorage : localStorage,

        generateTabId: (url) => {
            const path = (new URL(url)).pathname.toLowerCase().replace(/\/$/, '');
            const search = (new URL(url)).search.toLowerCase();
            let id = `${path}${search}`;
            id = id.replace(/[^a-z0-9_.-]/g, '_').replace(/_+/g, '_');
            if (id.startsWith('_')) id = id.substring(1);
            if (id.length > 100) id = id.substring(0, 50) + '...' + id.substring(id.length - 47);
            return id || 'default_tab_id';
        },

        timeStringToMinutes: (timeStr) => {
            if (!timeStr || typeof timeStr !== 'string' || !timeStr.includes(':')) return 0;
            const [hours, minutes] = timeStr.split(':').map(Number);
            return isNaN(hours) || isNaN(minutes) ? 0 : hours * 60 + minutes;
        },

        formatDateToHHMM: (dateObj, includeSeconds = false) => {
            if (!dateObj || !(dateObj instanceof Date) || isNaN(dateObj.getTime())) return "N/A";
            const h = String(dateObj.getHours()).padStart(2, '0');
            const m = String(dateObj.getMinutes()).padStart(2, '0');
            if (includeSeconds) { const s = String(dateObj.getSeconds()).padStart(2, '0'); return `${h}:${m}:${s}`; }
            return `${h}:${m}`;
        },

        formatMsToDuration: (ms, includeSeconds = false) => {
            if (isNaN(ms) || ms < 0) ms = 0;
            let totalSeconds = Math.floor(ms / 1000);
            const hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            let parts = [];
            if (hours > 0) parts.push(`${String(hours)}h`);
            parts.push(`${String(minutes).padStart(hours > 0 || minutes > 0 ? 2 : 1, '0')}m`); // Show 0m if no hours
            if (includeSeconds || (hours === 0 && minutes === 0)) parts.push(`${String(seconds).padStart(2, '0')}s`);
            return parts.join(' ') || '0s';
        },

        createDOMElement: (tag, attributes = {}, children = []) => {
            const element = document.createElement(tag);
            for (const key in attributes) {
                if (key === 'style' && typeof attributes[key] === 'object') Object.assign(element.style, attributes[key]);
                else if (key === 'dataset' && typeof attributes[key] === 'object') Object.assign(element.dataset, attributes[key]);
                else if (key === 'id') element.id = CONFIG.SCRIPT_ID_PREFIX + attributes[key]; // Auto-prefix IDs
                else if (['textContent', 'innerHTML', 'value', 'checked', 'disabled', 'type', 'title', 'placeholder', 'tabIndex', 'src', 'className', 'name', 'htmlFor'].includes(key) ) element[key] = attributes[key];
                else element.setAttribute(key, attributes[key]);
            }
            children.forEach(child => {
                if (child === null || typeof child === 'undefined') return;
                if (typeof child === 'string' || typeof child === 'number') element.appendChild(document.createTextNode(String(child)));
                else if (child instanceof Node) element.appendChild(child);
                // Allow array of children as well
                else if (Array.isArray(child)) child.forEach(c => { if (c instanceof Node) element.appendChild(c); else if (typeof c === 'string' || typeof c === 'number') element.appendChild(document.createTextNode(String(c))); });
            });
            return element;
        },
        
        makeButtonInteractive: (button) => {
            if (!button) return;
            button.addEventListener('mousedown', e => { e.preventDefault(); if (!button.disabled) button.style.transform = 'scale(0.95)'; });
            button.addEventListener('mouseup', () => { if (!button.disabled) button.style.transform = 'scale(1)';});
            button.addEventListener('mouseleave', () => { if (!button.disabled) button.style.transform = 'scale(1)';});
        }
    };

    // --- ------------------------------------------------------------------------ ---
    // --- -------------------- STATE & STORAGE MANAGEMENT ---------------------- ---
    // --- ------------------------------------------------------------------------ ---
    const StorageManager = {
        loadAllState: () => {
            state.currentTabId = Utils.generateTabId(state.currentTabFullUrl);
            StorageManager.loadCustomThemes(); // Load global themes first
            StorageManager.determineCurrentTabMode(); // Then determine mode for this tab
            StorageManager.loadMainSettings(); // Load tab-specific UI/operational settings
            StorageManager.readAllTabsDataFromLocalStorage(true); // Load multi-tab data
            
            // Ensure critical defaults if not loaded
            if (!state.shiftStartTime || isNaN(new Date(state.shiftStartTime).getTime())) {
                ShiftManager.determineAndSetShiftStartTime(true); // Force auto determination
            } else {
                state.shiftStartTime = new Date(state.shiftStartTime); // Ensure it's a Date object
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
                    // UI State
                    uiVisible: state.uiVisible,
                    uiLocked: state.uiLocked,
                    settingsPanelVisible: state.settingsPanelVisible,
                    leftPaneFlexBasis: state.leftPaneFlexBasis,
                    pointerEventsMode: state.pointerEventsMode,
                    showClock: state.showClock, showStats: state.showStats, showLastActionTimer: state.showLastActionTimer,
                    showUITabIndicator: state.showUITabIndicator, showPageOverlay: state.showPageOverlay,
                    showTriggerDebug: state.showTriggerDebug, debugPointerEventBorders: state.debugPointerEventBorders,
                    // Operational State
                    shiftType: state.shiftType,
                    shiftStartTimeISO: state.shiftStartTime ? state.shiftStartTime.toISOString() : null,
                    selectedLunchOptionIndex: lunchIndex,
                    autoClickEnabled: state.autoClickEnabled,
                    currentTabContributesToTotal: state.currentTabContributesToTotal,
                };
                uiStateStorage.setItem(CONFIG.STORAGE_KEY_MAIN_SETTINGS + state.currentTabId, JSON.stringify(dataToSave));
                Utils.logDebug('Main settings saved for tab:', state.currentTabId);
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
                    Utils.logInfo('Main settings loaded for tab:', state.currentTabId);
                } else {
                    Utils.logInfo('No saved main settings for this tab. Using defaults.');
                    // Defaults are already in state object, ensure derived state is set
                    state.leftPaneFlexBasis = CONFIG.LEFT_PANE_INITIAL_FLEX_BASIS;
                    state.pointerEventsMode = CONFIG.DEFAULT_POINTER_EVENTS_MODE;
                }
            } catch (e) { Utils.logError('Failed to load/parse main settings:', e); }
        },

        saveCustomThemes: () => {
            try {
                localStorage.setItem(CONFIG.STORAGE_KEY_CUSTOM_THEMES, JSON.stringify(state.customTabThemes));
            } catch (e) { Utils.logError('Failed to save custom themes:', e); }
        },

        loadCustomThemes: () => {
            try {
                const themesJSON = localStorage.getItem(CONFIG.STORAGE_KEY_CUSTOM_THEMES);
                if (themesJSON) state.customTabThemes = JSON.parse(themesJSON);
            } catch (e) { Utils.logError('Failed to load custom themes:', e); state.customTabThemes = {}; }
        },
        
        determineCurrentTabMode: () => {
            const customTheme = state.customTabThemes[state.currentTabFullUrl];
            if (customTheme && customTheme.name && customTheme.color && customTheme.textColor) {
                state.currentTabMode = { ...customTheme, isCustom: true };
                return;
            }
            const urlUpper = window.location.href.toUpperCase();
            for (const mode of CONFIG.TAB_IDENTIFICATION_MODES) {
                if (urlUpper.includes(mode.keyword.toUpperCase())) {
                    state.currentTabMode = { ...mode, isCustom: false };
                    return;
                }
            }
            state.currentTabMode = { name: CONFIG.DEFAULT_TAB_MODE_NAME, keyword: '', color: CONFIG.DEFAULT_TAB_MODE_COLOR, textColor: CONFIG.DEFAULT_TAB_MODE_TEXT_COLOR, isCustom: false };
            Utils.logInfo(`Current Tab ID: ${state.currentTabId}, Mode: ${state.currentTabMode.name} (Custom: ${state.currentTabMode.isCustom})`);
        },

        writeCurrentTabDataToLocalStorage: () => {
            if (!state.currentTabId) { Utils.logError("Cannot write tab data: currentTabId is not set."); return; }
            try {
                const tabData = {
                    tabId: state.currentTabId,
                    modeName: state.currentTabMode.name,
                    clicks: state.clicksForThisTab,
                    lastActionTimestamp: state.lastActionTimestampForThisTab,
                    contributesToTotal: state.currentTabContributesToTotal,
                    timestamp: Date.now() // For TTL
                };
                localStorage.setItem(CONFIG.MULTI_TAB_STORAGE_PREFIX + state.currentTabId, JSON.stringify(tabData));
                // Utils.logDebug('Tab data written to localStorage:', state.currentTabId);
            } catch (e) { Utils.logError('Error writing tab data to localStorage:', e); }
        },

        readAllTabsDataFromLocalStorage: (isInitialLoad = false) => {
            let newOtherTabsData = {};
            const now = Date.now();
            try {
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (key && key.startsWith(CONFIG.MULTI_TAB_STORAGE_PREFIX)) {
                        const itemJson = localStorage.getItem(key);
                        if (itemJson) {
                            try {
                                const itemData = JSON.parse(itemJson);
                                if (now - (itemData.timestamp || 0) > CONFIG.MULTI_TAB_DATA_TTL_MS) {
                                    localStorage.removeItem(key); // Remove stale data
                                    continue;
                                }
                                if (itemData.tabId === state.currentTabId) {
                                    if (isInitialLoad) { // Only restore clicks/lastAction on initial load for current tab
                                        state.clicksForThisTab = parseInt(itemData.clicks, 10) || 0;
                                        state.lastActionTimestampForThisTab = parseInt(itemData.lastActionTimestamp, 10) || Date.now();
                                        // state.currentTabContributesToTotal is loaded from main settings
                                        Utils.logInfo(`Restored click data for current tab ${state.currentTabId} from multi-tab storage: Clicks=${state.clicksForThisTab}`);
                                    }
                                    // Always update its entry in otherTabsData with potentially newer state
                                    newOtherTabsData[itemData.tabId] = { ...itemData, clicks: state.clicksForThisTab, contributesToTotal: state.currentTabContributesToTotal };
                                } else {
                                    newOtherTabsData[itemData.tabId] = itemData;
                                }
                            } catch (parseError) { Utils.logError(`Error parsing localStorage key ${key}:`, parseError); localStorage.removeItem(key); }
                        }
                    }
                }
            } catch (e) { Utils.logError('Error reading from localStorage during multi-tab sync:', e); }

            state.otherTabsData = newOtherTabsData;
            state.globalTotalClicks = Object.values(state.otherTabsData)
                                       .filter(td => td.contributesToTotal)
                                       .reduce((sum, td) => sum + (parseInt(td.clicks, 10) || 0), 0);
            
            // Utils.logDebug('Multi-tab sync complete. Other tabs:', Object.keys(state.otherTabsData).length, 'Global total:', state.globalTotalClicks);
            if (!isInitialLoad && typeof UIManager !== 'undefined') { // Avoid errors if UIManager not yet defined
                 UIManager.updateStatisticsDisplay();
                 if (state.settingsPanelVisible) SettingsPanel.updateOtherTabsSettingsDisplay();
            }
        }
    };

    // --- ------------------------------------------------------------------------ ---
    // --- ----------------------- SHIFT & LUNCH MANAGEMENT --------------------- ---
    // --- ------------------------------------------------------------------------ ---
    const ShiftManager = {
        determineAndSetShiftStartTime: (forceAuto = false) => {
            const now = new Date();
            let shiftStartHour, shiftStartMinute;
            let calculatedStartTime = new Date(now); // Base on current day initially
            let determinedShiftCategory = '';

            const dayStartHour = parseInt(CONFIG.DEFAULT_DAY_SHIFT_START_TIME.split(':')[0],10);
            const nightStartHour = parseInt(CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME.split(':')[0],10);

            if (forceAuto || state.shiftType === 'auto') {
                const currentHour = now.getHours();
                if (currentHour >= dayStartHour && currentHour < nightStartHour) { // Day shift
                    determinedShiftCategory = 'day';
                    [shiftStartHour, shiftStartMinute] = CONFIG.DEFAULT_DAY_SHIFT_START_TIME.split(':').map(Number);
                } else { // Night shift
                    determinedShiftCategory = 'night';
                    [shiftStartHour, shiftStartMinute] = CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME.split(':').map(Number);
                    // If current time is early morning (before day shift start), night shift started yesterday
                    if (currentHour < dayStartHour) {
                        calculatedStartTime.setDate(now.getDate() - 1);
                    }
                }
                calculatedStartTime.setHours(shiftStartHour, shiftStartMinute, 0, 0);
                state.shiftStartTime = calculatedStartTime;
                if (state.shiftType === 'auto' && forceAuto) { // If was auto and forced, update type
                    state.shiftType = determinedShiftCategory;
                }
                Utils.logDebug(`Auto Shift Start determined: ${state.shiftStartTime.toLocaleString()} (as ${state.shiftType})`);
            } else if (state.shiftType === 'day' || state.shiftType === 'night') {
                // Use manual time from input if available, else default for type
                const timeValue = state.dom.settingsShiftStartTimeInput?.value;
                let baseTime = state.shiftType === 'day' ? CONFIG.DEFAULT_DAY_SHIFT_START_TIME : CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME;
                if (timeValue) {
                    baseTime = timeValue; // "HH:MM"
                }
                [shiftStartHour, shiftStartMinute] = baseTime.split(':').map(Number);
                calculatedStartTime.setHours(shiftStartHour, shiftStartMinute, 0, 0);

                // If night shift and current time is before manually set night shift start, assume it started yesterday
                if (state.shiftType === 'night' && (now.getHours() < shiftStartHour || (now.getHours() === shiftStartHour && now.getMinutes() < shiftStartMinute))) {
                     calculatedStartTime.setDate(now.getDate() - 1);
                }
                state.shiftStartTime = calculatedStartTime;
                Utils.logDebug(`Manual Shift '${state.shiftType}' Start set: ${state.shiftStartTime.toLocaleString()}`);
            }
            ShiftManager.setDynamicDefaultLunch(); // Update lunch after shift time changes
        },

        setDynamicDefaultLunch: () => {
            let potentialShiftType = state.shiftType;
            const dayStartHour = parseInt(CONFIG.DEFAULT_DAY_SHIFT_START_TIME.split(':')[0],10);
            const nightStartHour = parseInt(CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME.split(':')[0],10);

            if (potentialShiftType === 'auto') {
                if (state.shiftStartTime) {
                    const shiftStartHr = state.shiftStartTime.getHours();
                    potentialShiftType = (shiftStartHr >= dayStartHour && shiftStartHr < nightStartHour) ? 'day' : 'night';
                } else { // Should not happen if determineAndSetShiftStartTime called first
                    const currentHr = new Date().getHours();
                    potentialShiftType = (currentHr >= dayStartHour && currentHr < nightStartHour) ? 'day' : 'night';
                }
            }
            const defaultLunch = CONFIG.DEFAULT_LUNCH_OPTIONS.find(opt => opt.type === potentialShiftType) ||
                                 CONFIG.DEFAULT_LUNCH_OPTIONS.find(opt => opt.type === "any") ||
                                 CONFIG.DEFAULT_LUNCH_OPTIONS[0];
            state.selectedLunchOption = defaultLunch;
            // Utils.logDebug("Dynamic default lunch set to:", state.selectedLunchOption?.text);
        },
        
        getCurrentShiftCategory: () => {
            if (!state.shiftStartTime) return 'any'; // Fallback
            const dayStartHour = parseInt(CONFIG.DEFAULT_DAY_SHIFT_START_TIME.split(':')[0],10);
            const nightStartHour = parseInt(CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME.split(':')[0],10);
            const shiftStartHr = state.shiftStartTime.getHours();

            if (state.shiftType === 'day') return 'day';
            if (state.shiftType === 'night') return 'night';
            // Auto mode, derive from determined shiftStartTime
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
            
            // Append to body at the end
            document.body.appendChild(state.dom.pageColorOverlay);
            document.body.appendChild(state.dom.pageIndicatorText);
            document.body.appendChild(state.dom.emergencyShowButton);
            document.body.appendChild(state.uiContainer); // IMPORTANT: Append main container

            SettingsPanel.build(); // Builds settings panel and appends to uiContainer
        },

        buildMainPanel: () => {
            state.uiContainer = Utils.createDOMElement('div', {
                id: CONFIG.UI_CONTAINER_ID,
                style: {
                    position: 'fixed', bottom: CONFIG.UI_BOTTOM_OFFSET, right: CONFIG.UI_RIGHT_OFFSET,
                    width: `${CONFIG.UI_WIDTH_PERCENT_VIEWPORT}vw`, height: `${CONFIG.UI_HEIGHT_PERCENT_VIEWPORT}vh`,
                    minWidth: `${CONFIG.UI_MIN_WIDTH_PX}px`, minHeight: `${CONFIG.UI_MIN_HEIGHT_PX}px`,
                    backgroundColor: CONFIG.UI_BACKGROUND_COLOR,
                    border: `1px solid ${CONFIG.UI_BORDER_COLOR}`,
                    borderRadius: '6px', // Softer corners
                    boxSizing: 'border-box', color: CONFIG.UI_TEXT_COLOR, fontFamily: CONFIG.FONT_FAMILY,
                    zIndex: '2147483640', display: 'flex', flexDirection: 'column',
                    padding: '8px', overflow: 'hidden',
                    boxShadow: '0 5px 20px rgba(0,0,0,0.25)',
                    transition: 'opacity 0.3s ease, transform 0.3s ease, width 0.1s ease, height 0.1s ease',
                }
            });

            // Top Controls (Settings, Lock, Close)
            const topControls = Utils.createDOMElement('div', { className: 'ph-top-controls', style: { display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '5px', flexShrink: 0 }});
            const controlBtnStyle = { cursor: 'pointer', background: 'none', border: 'none', color: CONFIG.UI_TEXT_COLOR, borderRadius: '3px', padding: '4px 8px', fontSize: '0.8em', marginLeft: '5px', opacity: '0.7', transition: 'opacity 0.2s, color 0.2s' };
            controlBtnStyle[':hover'] = { opacity: '1' };

            state.dom.toggleSettingsButton = Utils.createDOMElement('button', { textContent: CONFIG.TOGGLE_SETTINGS_BUTTON_TEXT_CLOSED, title: 'Open/Close Settings', style: controlBtnStyle });
            state.dom.toggleSettingsButton.addEventListener('click', UIManager.toggleSettingsPanelVisibility);
            Utils.makeButtonInteractive(state.dom.toggleSettingsButton);

            state.dom.lockUIButton = Utils.createDOMElement('button', { textContent: CONFIG.LOCK_UI_BUTTON_TEXT_UNLOCKED, title: 'Lock/Unlock UI', style: controlBtnStyle });
            state.dom.lockUIButton.addEventListener('click', UIManager.toggleUILockState);
            Utils.makeButtonInteractive(state.dom.lockUIButton);
            
            state.dom.emergencyHideButton = Utils.createDOMElement('button', { textContent: CONFIG.EMERGENCY_HIDE_BUTTON_TEXT, title: 'Hide UI Panel', style: {...controlBtnStyle, color: CONFIG.LAST_ACTION_TIMER_WARN_COLOR, fontWeight: 'bold' }});
            state.dom.emergencyHideButton.addEventListener('click', () => UIManager.setUIVisibility(false));
            Utils.makeButtonInteractive(state.dom.emergencyHideButton);

            topControls.append(state.dom.toggleSettingsButton, state.dom.lockUIButton, state.dom.emergencyHideButton);
            state.uiContainer.appendChild(topControls);

            // Main Content Area (Resizable Panes)
            const mainContentArea = Utils.createDOMElement('div', { className: 'ph-main-content-area', style: { display: 'flex', flexGrow: 1, overflow: 'hidden', position: 'relative' }});
            
            // Left Pane (Counter & Buttons)
            state.dom.leftPane = Utils.createDOMElement('div', { className: 'ph-left-pane', style: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexBasis: state.leftPaneFlexBasis, minWidth: `${CONFIG.LEFT_PANE_MIN_WIDTH_PERCENT}%`, overflow: 'hidden', paddingRight: `${CONFIG.DIVIDER_WIDTH_PX / 2}px`, position: 'relative' }});
            state.dom.mainCounterInput = Utils.createDOMElement('input', { type: 'number', id: 'mainCounterInput', value: state.clicksForThisTab, style: { fontSize: `${CONFIG.MAIN_COUNTER_FONT_SIZE_INITIAL_EM}em`, fontWeight: '300', color: CONFIG.UI_TEXT_COLOR, opacity: '0.95', width: '90%', marginBottom: '15px', textAlign: 'center', background: 'transparent', border: 'none', outline: 'none', padding: '0 5px', appearance: 'textfield' }});
            state.dom.mainCounterInput.addEventListener('change', EventHandlers.handleCounterInputChange);
            state.dom.mainCounterInput.addEventListener('input', EventHandlers.handleCounterInputDynamic);
            // Hide number input spinners
            const styleSheet = document.createElement("style");
            styleSheet.innerText = `#${state.dom.mainCounterInput.id}::-webkit-outer-spin-button, #${state.dom.mainCounterInput.id}::-webkit-inner-spin-button {-webkit-appearance: none; margin: 0;}`;
            document.head.appendChild(styleSheet);


            const clickerButtonsContainer = Utils.createDOMElement('div', { style: { display: 'flex', alignItems: 'center'} });
            const clickerBtnSharedStyle = { cursor: 'pointer', border: 'none', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.2)', transition: 'transform 0.1s, background-color 0.15s', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' };
            
            if (CONFIG.SHOW_DECREMENT_BUTTON) {
                state.dom.decrementButton = Utils.createDOMElement('button', { id: 'decrementBtn', textContent: '–', title: 'Decrement (-1)', style: { ...clickerBtnSharedStyle, backgroundColor: CONFIG.CLICKER_DECREMENT_BUTTON_COLOR, marginRight: '15px', fontSize: '1.8em', width:'45px', height:'45px' }});
                state.dom.decrementButton.addEventListener('click', EventHandlers.handleDecrementClick);
                Utils.makeButtonInteractive(state.dom.decrementButton);
                clickerButtonsContainer.appendChild(state.dom.decrementButton);
            }
            state.dom.incrementButton = Utils.createDOMElement('button', { id: 'incrementBtn', textContent: '+', title: `Increment (+1) or ${CONFIG.INCREMENT_KEYBOARD_SHORTCUT_CODE}`, style: { ...clickerBtnSharedStyle, backgroundColor: CONFIG.CLICKER_INCREMENT_BUTTON_COLOR, fontSize: '2.5em', width:'65px', height:'65px' }});
            state.dom.incrementButton.addEventListener('click', (event) => EventHandlers.processIncrementForCurrentTab(true, event));
            Utils.makeButtonInteractive(state.dom.incrementButton);
            clickerButtonsContainer.appendChild(state.dom.incrementButton);
            
            state.dom.leftPane.append(state.dom.mainCounterInput, clickerButtonsContainer);

            // Divider
            state.dom.divider = Utils.createDOMElement('div', { className: 'ph-divider', style: { width: `${CONFIG.DIVIDER_WIDTH_PX}px`, cursor: 'ew-resize', flexShrink: 0, display: 'flex', alignItems:'center', justifyContent: 'center', backgroundColor: `${CONFIG.MAIN_ACCENT_COLOR}33`, borderRadius: '2px' }});
            state.dom.divider.addEventListener('mousedown', EventHandlers.startResizePanes);

            // Right Pane (Stats, Timers, Debug)
            state.dom.rightPane = Utils.createDOMElement('div', { className: 'ph-right-pane', style: { display: 'flex', flexDirection: 'column', flexGrow: 1, overflowY: 'auto', paddingLeft: `${CONFIG.DIVIDER_WIDTH_PX / 2}px`, minWidth: `${CONFIG.RIGHT_PANE_MIN_WIDTH_PERCENT}%`, fontSize: CONFIG.STATS_FONT_SIZE_EM }});
            state.dom.statsTextSummary = Utils.createDOMElement('div', { id: 'statsSummary', style: { lineHeight: '1.45', marginBottom: '8px' }});
            state.dom.lastActionTimerDisplay = Utils.createDOMElement('div', { id: 'lastActionTimer', textContent: 'Last: 0s', style: { fontSize: '0.9em', marginTop: 'auto', paddingTop: '5px', opacity: '0.75' }}); // marginTop: auto
            state.dom.triggerDebugDisplay = Utils.createDOMElement('div', { id: 'triggerDebugDisplay', style: { fontSize: '0.8em', marginTop: '10px', borderTop: `1px dashed ${CONFIG.UI_TEXT_COLOR}2A`, paddingTop: '5px', display: 'none', maxHeight: '60px', overflowY: 'auto', opacity: '0.7', wordBreak: 'break-all'} });
            state.dom.triggerDebugDisplay.innerHTML = 'Trigger Debug: Waiting...';
            
            state.dom.rightPane.append(state.dom.statsTextSummary, state.dom.triggerDebugDisplay, state.dom.lastActionTimerDisplay); // Timer last
            
            mainContentArea.append(state.dom.leftPane, state.dom.divider, state.dom.rightPane);
            state.uiContainer.appendChild(mainContentArea);

            // Bottom Info Bar (Tab ID, Clock)
            const bottomInfoBar = Utils.createDOMElement('div', { className: 'ph-bottom-bar', style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto', paddingTop: '5px', flexShrink: 0, borderTop: `1px solid ${CONFIG.UI_TEXT_COLOR}1F` }});
            state.dom.uiTabIndicatorText = Utils.createDOMElement('div', { id: 'uiTabIndicator', textContent: state.currentTabMode.name, style: { fontSize: `${CONFIG.UI_TAB_INDICATOR_FONT_SIZE_EM}em`, fontWeight: '500', color: state.currentTabMode.textColor || CONFIG.UI_TEXT_COLOR, opacity: 0.6 }});
            state.dom.realTimeClock = Utils.createDOMElement('div', { id: 'realTimeClock', textContent: '00:00:00', style: { fontSize: `${CONFIG.CLOCK_FONT_SIZE_EM}em`, fontFamily: 'monospace', color: CONFIG.UI_TEXT_COLOR, opacity: '0.35' }});
            bottomInfoBar.append(state.dom.uiTabIndicatorText, state.dom.realTimeClock);
            state.uiContainer.appendChild(bottomInfoBar);
        },

        buildPageOverlayAndIndicator: () => {
            state.dom.pageColorOverlay = Utils.createDOMElement('div', { id: CONFIG.PAGE_COLOR_OVERLAY_ID_SUFFIX, style: { position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh', backgroundColor: state.currentTabMode.color, zIndex: '2147483630', pointerEvents: 'none', display: 'none', transition: 'background-color 0.3s ease' }});
            state.dom.pageIndicatorText = Utils.createDOMElement('div', { id: CONFIG.PAGE_INDICATOR_TEXT_ID_SUFFIX, textContent: state.currentTabMode.name.substring(0,10).toUpperCase(), style: { position: 'fixed', top: '50%', right: '20px', transform: 'translateY(-50%) rotate(0deg)', fontSize: `${CONFIG.PAGE_INDICATOR_FONT_SIZE_PX}px`, fontWeight: 'bold', color: state.currentTabMode.textColor, opacity: 0.8, zIndex: '2147483631', pointerEvents: 'none', display: 'none', textShadow: '0 0 8px rgba(0,0,0,0.3)', writingMode: 'vertical-rl', textOrientation: 'mixed', transition: 'color 0.3s ease, opacity 0.3s ease' }});
        },

        buildEmergencyShowButton: () => {
            state.dom.emergencyShowButton = Utils.createDOMElement('button', {
                id: CONFIG.EMERGENCY_SHOW_BUTTON_ID_SUFFIX, textContent: CONFIG.EMERGENCY_SHOW_BUTTON_TEXT, title: 'Show UI Panel',
                style: {
                    position: 'fixed', bottom: CONFIG.UI_BOTTOM_OFFSET, right: CONFIG.UI_RIGHT_OFFSET,
                    width: CONFIG.EMERGENCY_SHOW_BUTTON_SIZE, height: CONFIG.EMERGENCY_SHOW_BUTTON_SIZE,
                    backgroundColor: `rgba(80,80,100, ${CONFIG.EMERGENCY_SHOW_BUTTON_OPACITY})`,
                    border: `1px solid rgba(128,128,128,0.4)`, color: CONFIG.UI_TEXT_COLOR,
                    borderRadius: '50%', cursor: 'pointer', display: 'none',
                    alignItems: 'center', justifyContent: 'center', zIndex: '2147483646',
                    transition: 'opacity 0.2s ease, transform 0.1s ease, background-color 0.2s',
                    fontSize: '18px', boxShadow: '0 0 12px rgba(0,0,0,0.2)', pointerEvents: 'auto'
                }
            });
            state.dom.emergencyShowButton.onmouseover = () => { state.dom.emergencyShowButton.style.opacity = String(CONFIG.EMERGENCY_SHOW_BUTTON_HOVER_OPACITY); state.dom.emergencyShowButton.style.transform = 'scale(1.1)'; state.dom.emergencyShowButton.style.backgroundColor = CONFIG.MAIN_ACCENT_COLOR; };
            state.dom.emergencyShowButton.onmouseout = () => { state.dom.emergencyShowButton.style.opacity = String(CONFIG.EMERGENCY_SHOW_BUTTON_OPACITY); state.dom.emergencyShowButton.style.transform = 'scale(1)'; state.dom.emergencyShowButton.style.backgroundColor = `rgba(80,80,100, ${CONFIG.EMERGENCY_SHOW_BUTTON_OPACITY})`; };
            state.dom.emergencyShowButton.onclick = () => UIManager.setUIVisibility(true);
        },
        
        setInitialUIValues: () => { // Called after DOM is built and state is loaded
            // Counter
            if (state.dom.mainCounterInput) {
                state.dom.mainCounterInput.value = state.clicksForThisTab;
                EventHandlers.handleCounterInputDynamic({target: state.dom.mainCounterInput}); // Resize font
            }
            // Pane size
            if (state.dom.leftPane) state.dom.leftPane.style.flexBasis = state.leftPaneFlexBasis;

            // Settings Panel (if visible, its own init will handle fields)
            if (state.settingsPanelVisible && state.dom.settingsPanel) {
                 SettingsPanel.populateAllFields(); // Ensure fields are up-to-date
            }

            // Visibility of elements based on state flags
            UIManager.applyElementVisibilityFromState();
            UIManager.applyDebugPointerEventBorders();
            UIManager.applyPageTheme();
            UIManager.updateUITabIndicatorText();
            UIManager.updateUILockVisuals();
             // This call applies the initial opacity/transform to uiContainer and display to emergencyShowButton
            UIManager.setUIVisibility(state.uiVisible); 
        },

        setUIVisibility: (visible) => {
            state.uiVisible = visible;
            if (state.uiContainer) {
                state.uiContainer.style.opacity = visible ? '1' : '0';
                state.uiContainer.style.transform = visible ? 'translateY(0)' : 'translateY(15px)';
                // Pointer events handled separately by UIManager.updatePointerEventsMode()
            }
            if (state.dom.emergencyShowButton) {
                state.dom.emergencyShowButton.style.display = visible ? 'none' : 'flex';
            }
            if (!visible && state.settingsPanelVisible) { // Auto-close settings if main UI is hidden
                UIManager.setSettingsPanelVisibility(false);
            }
            UIManager.updatePointerEventsMode(); // Update based on new visibility
            StorageManager.saveMainSettings();
        },
        
        setSettingsPanelVisibility: (visible) => {
            state.settingsPanelVisible = visible;
            if (state.dom.settingsPanel) {
                state.dom.settingsPanel.style.transform = visible ? 'translateX(0%)' : `translateX(101%)`;
                state.dom.settingsPanel.style.pointerEvents = visible ? 'auto' : 'none'; // Ensure panel is non-interactive when hidden
                if (visible) SettingsPanel.populateAllFields(); // Refresh fields on open
            }
            if (state.dom.toggleSettingsButton) {
                state.dom.toggleSettingsButton.textContent = visible ? CONFIG.TOGGLE_SETTINGS_BUTTON_TEXT_OPENED : CONFIG.TOGGLE_SETTINGS_BUTTON_TEXT_CLOSED;
            }
            UIManager.updatePointerEventsMode(); // Main UI might need to change interactivity
            if (visible && state.uiLocked) UIManager.applyUILockToElements(true); // Re-apply lock to settings elements
            StorageManager.saveMainSettings();
        },

        toggleSettingsPanelVisibility: () => UIManager.setSettingsPanelVisibility(!state.settingsPanelVisible),

        updateUILockVisuals: () => {
            if (state.dom.lockUIButton) {
                state.dom.lockUIButton.textContent = state.uiLocked ? CONFIG.LOCK_UI_BUTTON_TEXT_LOCKED : CONFIG.LOCK_UI_BUTTON_TEXT_UNLOCKED;
            }
        },

        applyUILockToElements: (locked) => {
            const elementsToLock = [
                state.dom.toggleSettingsButton, state.dom.emergencyHideButton,
                state.dom.decrementButton, state.dom.mainCounterInput, state.dom.divider,
            ];
             // Add all interactive elements within the settings panel if it's visible
            if (state.settingsPanelVisible && state.dom.settingsPanel) {
                state.dom.settingsPanel.querySelectorAll('input, select, textarea, button:not(.ph-settings-close-btn)')
                    .forEach(el => elementsToLock.push(el));
            }
            elementsToLock.forEach(el => {
                if (el) {
                    el.disabled = locked;
                    el.style.opacity = locked ? '0.5' : '1';
                    el.style.cursor = locked ? 'not-allowed' : (el.tagName === 'BUTTON' || el.tagName === 'SELECT' || el.classList.contains('ph-divider') ? 'pointer' : 'default');
                     if (el === state.dom.divider) el.style.cursor = locked ? 'default' : 'ew-resize';
                }
            });
            // Increment button is never locked
            if (state.dom.incrementButton) {
                 state.dom.incrementButton.disabled = false;
                 state.dom.incrementButton.style.opacity = '1';
                 state.dom.incrementButton.style.cursor = 'pointer';
            }
        },

        setUILockState: (locked) => {
            if (!state.uiVisible && locked && !state.settingsPanelVisible) return; // Cannot lock fully hidden UI
            state.uiLocked = locked;
            UIManager.updateUILockVisuals();
            UIManager.applyUILockToElements(locked);
            UIManager.updatePointerEventsMode(); // Main container pointer events might change
            StorageManager.saveMainSettings();
        },
        toggleUILockState: () => UIManager.setUILockState(!state.uiLocked),

        updatePointerEventsMode: () => {
            if (!state.uiContainer) return;
            
            let mainContainerPointerEvents = 'none'; // Default for click-through modes
            const interactiveChildSelectors = ['ph-top-controls', 'ph-main-content-area', 'ph-bottom-bar'];

            if (state.settingsPanelVisible || state.isResizing || state.uiLocked) {
                mainContainerPointerEvents = 'auto'; // Must be interactive
            } else if (state.uiVisible) {
                switch(state.pointerEventsMode) {
                    case 'fully_interactive':
                        mainContainerPointerEvents = 'auto';
                        break;
                    case 'default_transparent_buttons_active':
                        mainContainerPointerEvents = 'none'; // Main container is see-through
                        // Children are set to auto below
                        break;
                    case 'fully_click_through':
                        mainContainerPointerEvents = 'none';
                        // For fully click-through, only top-level controls (close, settings, lock) should explicitly be auto.
                        // Children will inherit 'none' unless specified.
                        // However, our structure relies on ph-main-content-area being auto if its children are to be.
                        // So for now, fully_click_through will behave like default_transparent for panel children,
                        // relying on hotkeys for primary interaction. Buttons will still be clickable.
                        // TODO: True fully_click_through might require individual pointer-events: none on more children.
                        break;
                }
            } else { // UI not visible
                mainContainerPointerEvents = 'none';
            }
            state.uiContainer.style.pointerEvents = mainContainerPointerEvents;

            // Set pointer events for direct children of uiContainer
            Array.from(state.uiContainer.children).forEach(child => {
                if (child === state.dom.settingsPanel) return; // Settings panel handles its own
                
                let childPE = mainContainerPointerEvents === 'auto' ? 'auto' : 'none'; // Inherit or be none
                if (mainContainerPointerEvents === 'none') { // If parent is none, children need explicit 'auto'
                    if (interactiveChildSelectors.some(sel => child.classList.contains(sel))) {
                        childPE = 'auto';
                    }
                }
                // Top controls always interactive when panel visible (unless locked)
                if (child.classList.contains('ph-top-controls')) childPE = 'auto';

                child.style.pointerEvents = childPE;
            });
             // Ensure specific items within children are also set if needed (e.g., buttons themselves)
            if (state.dom.leftPane) state.dom.leftPane.style.pointerEvents = 'auto'; // Ensure panes are interactive bases
            if (state.dom.rightPane) state.dom.rightPane.style.pointerEvents = 'auto';
            if (state.dom.divider) state.dom.divider.style.pointerEvents = state.uiLocked ? 'default' : 'auto';


            UIManager.applyDebugPointerEventBorders();
        },

        applyDebugPointerEventBorders: () => {
            const allElements = state.uiContainer ? state.uiContainer.querySelectorAll('*') : [];
            const elementsToTest = state.uiContainer ? [state.uiContainer, ...allElements] : [];

            elementsToTest.forEach(el => { // Reset first
                el.style.outline = ''; el.style.outlineOffset = '';
            });

            if (state.debugPointerEventBorders) {
                elementsToTest.forEach(el => {
                    const computedPE = getComputedStyle(el).pointerEvents;
                    if (computedPE === 'auto' || computedPE === 'all' || (el.tagName === 'BUTTON' && computedPE !== 'none') ) { // Heuristic for interactive
                        el.style.outline = '1px dashed red';
                    } else if (computedPE === 'none') {
                        el.style.outline = '1px dotted dodgerblue';
                    }
                    el.style.outlineOffset = '1px';
                });
                if(state.uiContainer) state.uiContainer.style.outline = `2px solid ${getComputedStyle(state.uiContainer).pointerEvents === 'none' ? 'blue' : 'green'}`;
            }
        },

        applyElementVisibilityFromState: () => {
            if (state.dom.realTimeClock) state.dom.realTimeClock.style.display = state.showClock ? 'block' : 'none';
            if (state.dom.statsTextSummary) state.dom.statsTextSummary.style.display = state.showStats ? 'block' : 'none';
            if (state.dom.lastActionTimerDisplay) state.dom.lastActionTimerDisplay.style.display = state.showLastActionTimer ? 'block' : 'none';
            if (state.dom.uiTabIndicatorText) state.dom.uiTabIndicatorText.style.display = state.showUITabIndicator ? 'block' : 'none';
            if (state.dom.triggerDebugDisplay) state.dom.triggerDebugDisplay.style.display = state.showTriggerDebug ? 'block' : 'none';
            UIManager.applyPageTheme(); // Handles overlay/indicator visibility too
        },

        applyPageTheme: () => {
            const mode = state.customTabThemes[state.currentTabFullUrl] || state.currentTabMode;
            if (state.dom.pageColorOverlay) {
                state.dom.pageColorOverlay.style.backgroundColor = mode.color;
                state.dom.pageColorOverlay.style.display = state.showPageOverlay ? 'block' : 'none';
            }
            if (state.dom.pageIndicatorText) {
                state.dom.pageIndicatorText.textContent = mode.name.substring(0, 10).toUpperCase();
                state.dom.pageIndicatorText.style.color = mode.textColor;
                state.dom.pageIndicatorText.style.display = state.showPageOverlay ? 'block' : 'none';
            }
        },
        
        updateUITabIndicatorText: () => {
            if(state.dom.uiTabIndicatorText) {
                const mode = state.customTabThemes[state.currentTabFullUrl] || state.currentTabMode;
                state.dom.uiTabIndicatorText.textContent = mode.name;
                state.dom.uiTabIndicatorText.style.color = mode.textColor || CONFIG.UI_TEXT_COLOR;
            }
        },
        
        // --- Data Display Updaters ---
        updateCounterDisplay: () => {
            if (state.dom.mainCounterInput) {
                state.dom.mainCounterInput.value = state.clicksForThisTab;
                EventHandlers.handleCounterInputDynamic({target: state.dom.mainCounterInput}); // Resize font
            }
        },
        updateRealTimeClockDisplay: () => { if(state.dom.realTimeClock && state.showClock) state.dom.realTimeClock.textContent = Utils.formatDateToHHMM(new Date(),true); },
        updateLastActionTimerDisplay: () => {
            if (!state.dom.lastActionTimerDisplay || !state.showLastActionTimer) {
                if(state.dom.lastActionTimerDisplay) state.dom.lastActionTimerDisplay.style.display = 'none'; return;
            }
            state.dom.lastActionTimerDisplay.style.display = 'block';
            const elapsedMs = Date.now() - state.lastActionTimestampForThisTab;
            state.dom.lastActionTimerDisplay.textContent = `Last: ${Utils.formatMsToDuration(elapsedMs, true).replace(/^0h\s*/, '').replace(/^0m\s*/, '')}`;
            const isWarn = elapsedMs > CONFIG.LAST_ACTION_TIMER_WARN_SECONDS * 1000;
            state.dom.lastActionTimerDisplay.style.color = isWarn ? CONFIG.LAST_ACTION_TIMER_WARN_COLOR : CONFIG.UI_TEXT_COLOR;
            state.dom.lastActionTimerDisplay.style.fontWeight = isWarn ? 'bold' : 'normal';
            state.dom.lastActionTimerDisplay.style.opacity = isWarn ? '0.9' : '0.75';
        },
        updateStatisticsDisplay: () => {
            if (!state.dom.statsTextSummary || !state.showStats) {
                if(state.dom.statsTextSummary) state.dom.statsTextSummary.innerHTML = ''; return;
            }
            state.dom.statsTextSummary.style.display = 'block';
            if (!state.shiftStartTime) { state.dom.statsTextSummary.innerHTML = '<p style="color:red;">Shift start not fully initialized!</p>'; return; }

            const now = new Date();
            let totalElapsedMsOverall = now.getTime() - state.shiftStartTime.getTime();
            if (totalElapsedMsOverall < 0) totalElapsedMsOverall = 0; // Shift hasn't started yet today

            let lunchDurationMs = 0;
            const lunch = state.selectedLunchOption;
            if (lunch && (lunch.start !== "00:00" || lunch.end !== "00:00")) {
                const shiftBaseDate = new Date(state.shiftStartTime); // Use actual shift start date
                shiftBaseDate.setHours(0,0,0,0); // Normalize to midnight of shift start day
                
                let lunchStartAbs = new Date(shiftBaseDate);
                const [lsh, lsm] = lunch.start.split(':').map(Number);
                lunchStartAbs.setHours(lsh, lsm, 0, 0);

                let lunchEndAbs = new Date(shiftBaseDate);
                const [leh, lem] = lunch.end.split(':').map(Number);
                lunchEndAbs.setHours(leh, lem, 0, 0);

                // Handle night shift lunch spanning midnight relative to shift start date
                if (ShiftManager.getCurrentShiftCategory() === 'night' && state.shiftStartTime.getHours() >= 12) { // Typical night shift
                    if (lsh < state.shiftStartTime.getHours()) lunchStartAbs.setDate(lunchStartAbs.getDate() + 1); // Lunch is next calendar day
                    if (leh < state.shiftStartTime.getHours() || (leh <lsh)) lunchEndAbs.setDate(lunchEndAbs.getDate() + 1);
                } else if (leh < lsh) { // Lunch spans midnight, e.g. 23:00-01:00
                    lunchEndAbs.setDate(lunchEndAbs.getDate() + 1);
                }
                
                const effectiveLunchStart = Math.max(state.shiftStartTime.getTime(), lunchStartAbs.getTime());
                const effectiveLunchEnd = Math.min(now.getTime(), lunchEndAbs.getTime());
                if (effectiveLunchEnd > effectiveLunchStart) {
                    lunchDurationMs = effectiveLunchEnd - effectiveLunchStart;
                }
            }

            const effectiveWorkMsThisTab = Math.max(0, totalElapsedMsOverall - lunchDurationMs);
            const hoursWorkedThisTab = effectiveWorkMsThisTab / (1000 * 60 * 60);
            const clicksPerHourThisTab = (hoursWorkedThisTab > 0.001) ? (state.clicksForThisTab / hoursWorkedThisTab) : 0;
            
            // Global per hour based on *this tab's* effective work time as a simplifying assumption from TZ
            const globalClicksPerHour = (hoursWorkedThisTab > 0.001 && state.globalTotalClicks > 0) ? (state.globalTotalClicks / hoursWorkedThisTab) : 0;

            let statsHTML = `
                <p style="margin-bottom: 4px;">Shift: <strong>${Utils.formatDateToHHMM(state.shiftStartTime)}</strong> (${state.shiftType})</p>
                <p style="margin-bottom: 8px;">Lunch: ${lunch ? lunch.text.replace(/\s\(.+\)/,'') : 'N/A'}</p>
                <div style="display:flex; justify-content:space-around; gap: 10px; border-top: 1px solid ${CONFIG.UI_TEXT_COLOR}1A; padding-top: 8px;">
                    <div style="text-align:center;">
                        <div><u>This Tab (${state.currentTabMode.name})</u></div>
                        <div>Items: <strong>${state.clicksForThisTab}</strong></div>
                        <div>~<strong style="color:${CONFIG.MAIN_ACCENT_COLOR};font-size:1.15em;">${clicksPerHourThisTab.toFixed(1)}</strong>/hr</div>
                        <div style="font-size:0.85em; opacity:0.7;">(worked ${Utils.formatMsToDuration(effectiveWorkMsThisTab)})</div>
                    </div>
                    <div style="text-align:center; border-left: 1px solid ${CONFIG.UI_TEXT_COLOR}2A; padding-left:10px;">
                        <div><u>Global (Active Tabs)</u></div>
                        <div>Total: <strong>${state.globalTotalClicks}</strong></div>
                        <div>~<strong style="color:${CONFIG.MAIN_ACCENT_COLOR};font-size:1.15em;">${globalClicksPerHour.toFixed(1)}</strong>/hr</div>
                        <div style="font-size:0.85em; opacity:0.7;">(based on this tab time)</div>
                    </div>
                </div>`;
            
            const otherTabsArray = Object.values(state.otherTabsData).filter(td => td.tabId !== state.currentTabId);
            if (otherTabsArray.length > 0){
                statsHTML += `<div style="font-size:0.8em; margin-top:8px; border-top:1px solid ${CONFIG.UI_TEXT_COLOR}1A; padding-top:5px; max-height: 40px; overflow-y:auto; opacity: 0.8;">
                Others: ${otherTabsArray.map(td => `${td.modeName||td.tabId.substring(0,10)}: ${td.clicks}${td.contributesToTotal?'<span title="Contributing">✓</span>':'<span title="Not Cntr.">x</span>'}`).join('; ')}
                </div>`;
            }
            state.dom.statsTextSummary.innerHTML = statsHTML;
        },
    };
    
    // Auto-increment is part of core logic but often interacts with UI directly for debug
    const AutoIncrementer = {
        debounceTimer: null,
        init: () => {
            if (state.mutationObserver) state.mutationObserver.disconnect();
            const observeTargetNode = document.querySelector(CONFIG.TRIGGER_OBSERVE_AREA_SELECTOR) || document.body;
            
            const processMutations = () => {
                if (!state.autoClickEnabled) return;
                const pageTextContent = observeTargetNode.innerText || observeTargetNode.textContent || "";
                // Use word boundary regex to avoid partial matches
                const triggerRegex = new RegExp(`\\b${CONFIG.AUTO_CLICK_TRIGGER_WORD}\\b`, 'i'); // case-insensitive for robustness
                const triggerIsCurrentlyFoundOnPage = triggerRegex.test(pageTextContent);
                
                let foundElementsPaths = [];
                if (CONFIG.DEBUG_MODE && state.showTriggerDebug && triggerIsCurrentlyFoundOnPage) {
                    foundElementsPaths = AutoIncrementer.findElementsContainingText(observeTargetNode, CONFIG.AUTO_CLICK_TRIGGER_WORD);
                }
                if(state.showTriggerDebug) AutoIncrementer.updateTriggerDebugDisplay(triggerIsCurrentlyFoundOnPage, foundElementsPaths);

                if (triggerIsCurrentlyFoundOnPage && !state.autoClickTriggerWordFound) { // Word just appeared
                    Utils.logDebug(`Trigger "${CONFIG.AUTO_CLICK_TRIGGER_WORD}" DETECTED.`);
                    state.autoClickTriggerWordFound = true; // Set flag: word is now visible
                } else if (!triggerIsCurrentlyFoundOnPage && state.autoClickTriggerWordFound) { // Word just disappeared
                    Utils.logInfo(`Trigger "${CONFIG.AUTO_CLICK_TRIGGER_WORD}" DISAPPEARED. Auto-incrementing.`);
                    EventHandlers.processIncrementForCurrentTab(false); // Increment
                    state.autoClickTriggerWordFound = false; // Reset flag: word is no longer visible
                }
            };

            const observerCallback = (mutationsList, observer) => {
                clearTimeout(AutoIncrementer.debounceTimer);
                AutoIncrementer.debounceTimer = setTimeout(processMutations, CONFIG.TRIGGER_MUTATION_DEBOUNCE_MS);
            };
            
            state.mutationObserver = new MutationObserver(observerCallback);
            state.mutationObserver.observe(observeTargetNode, { childList: true, subtree: true, characterData: true });
            Utils.logInfo(`AutoIncrementer: MutationObserver initialized for "${CONFIG.AUTO_CLICK_TRIGGER_WORD}".`);
            setTimeout(processMutations, 250); // Initial check
        },
        
        disconnect: () => {
            if (state.mutationObserver) {
                state.mutationObserver.disconnect();
                state.mutationObserver = null;
                Utils.logDebug('AutoIncrementer: MutationObserver disconnected.');
            }
            clearTimeout(AutoIncrementer.debounceTimer);
        },

        findElementsContainingText: (rootElement, searchText) => {
            const paths = new Set();
            const walker = document.createTreeWalker(rootElement, NodeFilter.SHOW_TEXT, {
                acceptNode: (node) => {
                    // Check only text nodes that contain the search text (case-insensitive)
                    if (node.nodeValue && node.nodeValue.toLowerCase().includes(searchText.toLowerCase())) {
                        return NodeFilter.FILTER_ACCEPT;
                    }
                    return NodeFilter.FILTER_REJECT;
                }
            });
            let node;
            while ((node = walker.nextNode()) && paths.size < CONFIG.TRIGGER_DEBUG_MAX_PATHS) {
                let currentElement = node.parentElement;
                const elementPath = [];
                while (currentElement && currentElement !== rootElement && elementPath.length < 4) { // Max 4 levels up
                    let elDesc = currentElement.tagName.toLowerCase();
                    if (currentElement.id) elDesc += `#${currentElement.id.replace(CONFIG.SCRIPT_ID_PREFIX, '')}`; // Shorten own IDs
                    if (currentElement.className && typeof currentElement.className === 'string') {
                       const classes = currentElement.className.split(/\s+/).filter(c => c && !c.startsWith('ph-')).slice(0,2).join('.');
                       if(classes) elDesc += `.${classes}`;
                    }
                    elementPath.unshift(elDesc);
                    currentElement = currentElement.parentElement;
                }
                if (elementPath.length > 0) paths.add(elementPath.join(' > '));
            }
            return Array.from(paths);
        },
        
        updateTriggerDebugDisplay: (isFound, paths = []) => {
            if (!state.dom.triggerDebugDisplay || !state.showTriggerDebug) {
                if(state.dom.triggerDebugDisplay) state.dom.triggerDebugDisplay.style.display = 'none'; return;
            }
            state.dom.triggerDebugDisplay.style.display = 'block';
            let html = `<strong>TrigDebug ("${CONFIG.AUTO_CLICK_TRIGGER_WORD}"):</strong> ${isFound?`<span style="color:lightgreen;">FOUND</span>`:`<span style="color:orange;">Not found</span>`} (Flag:${state.autoClickTriggerWordFound?'ON':'OFF'})<br>`;
            if(isFound&&paths.length>0) html+="Paths: "+paths.map(p=>`<code>${p.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</code>`).join('; ');
            else if (isFound) html += "Paths: (root text likely)";
            state.dom.triggerDebugDisplay.innerHTML = html;
        }
    };
    
    // Moved SettingsPanel definition here to be self-contained
    // --- ------------------------------------------------------------------------ ---
    // --- ------------------------- SETTINGS PANEL ----------------------------- ---
    // --- ------------------------------------------------------------------------ ---
    const SettingsPanel = {
        build: () => {
            state.dom.settingsPanel = Utils.createDOMElement('div', {
                id: CONFIG.SETTINGS_PANEL_ID_SUFFIX,
                className: 'ph-settings-panel', // For specific styling if needed
                style: {
                    position: 'absolute', top: '0px', right: '0px', bottom: '0px',
                    width: 'clamp(300px, 55%, 450px)', // Responsive width
                    backgroundColor: `rgba(40, 45, 55, 0.98)`,
                    borderLeft: `2px solid ${CONFIG.MAIN_ACCENT_COLOR}`,
                    padding: '15px 20px', zIndex: '10', // Relative to uiContainer
                    display: 'flex', flexDirection: 'column',
                    gap: '10px', overflowY: 'auto',
                    boxShadow: '-8px 0px 20px rgba(0,0,0,0.3)',
                    transform: 'translateX(101%)', // Initially off-screen
                    transition: 'transform 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)',
                    pointerEvents: 'none' // Initially non-interactive
                }
            });

            const heading = Utils.createDOMElement('h3', { textContent: 'Production Settings', style: { marginTop: '0', marginBottom: '15px', textAlign: 'center', color: 'white', fontSize: '1.25em'} });
            state.dom.settingsPanel.appendChild(heading);

            // Helper to create sections
            const createSection = (title, elements) => {
                const section = Utils.createDOMElement('div', {className: 'ph-settings-section'});
                if (title) section.appendChild(Utils.createDOMElement('h4', { textContent: title, style: {margin: '15px 0 8px 0', color: 'rgba(255,255,255,0.9)', fontSize: '1.05em', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '5px'} }));
                elements.forEach(el => section.appendChild(el));
                return section;
            };
            const commonInputStyle = {width: '100%', padding: '8px', boxSizing: 'border-box', backgroundColor: 'rgba(20,20,30,0.5)', color: 'white', border: `1px solid ${CONFIG.MAIN_ACCENT_COLOR}cc`, borderRadius: '4px', fontSize: '0.9em'};
            const commonLabelStyle = { display: 'block', marginBottom: '3px', fontSize: '0.85em', color: 'rgba(255,255,255,0.75)'};
            const checkboxRowStyle = { display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '0.9em', color: 'rgba(255,255,255,0.85)', margin: '6px 0'};
            const checkboxStyle = { marginRight: '10px', transform: 'scale(1.2)', accentColor: CONFIG.MAIN_ACCENT_COLOR, cursor:'pointer' };

            // --- Pointer Events Mode ---
            state.dom.pointerEventsModeSelect = Utils.createDOMElement('select', { id: 'pointerEventsModeSelect', style: commonInputStyle });
            CONFIG.POINTER_EVENTS_MODES.forEach(opt => state.dom.pointerEventsModeSelect.add(new Option(opt.text, opt.value)));
            state.dom.pointerEventsModeSelect.addEventListener('change', (e) => { state.pointerEventsMode = e.target.value; UIManager.updatePointerEventsMode(); StorageManager.saveMainSettings(); });
            state.dom.settingsPanel.appendChild(createSection('Mouse Click Mode', [
                Utils.createDOMElement('label', { htmlFor: state.dom.pointerEventsModeSelect.id, textContent: 'Panel Click Behavior:', style: commonLabelStyle }),
                state.dom.pointerEventsModeSelect
            ]));
            
            // --- Shift & Lunch ---
            state.dom.settingsShiftTypeSelect = Utils.createDOMElement('select', { id: 'shiftTypeSelect', style: commonInputStyle });
            state.dom.settingsShiftTypeSelect.addEventListener('change', EventHandlers.handleShiftSettingsChange);
            state.dom.settingsShiftStartTimeInput = Utils.createDOMElement('input', { type: 'time', id: 'shiftStartTimeInput', style: commonInputStyle });
            state.dom.settingsShiftStartTimeInput.addEventListener('change', EventHandlers.handleShiftSettingsChange);
            state.dom.settingsLunchSelect = Utils.createDOMElement('select', { id: 'lunchSelect', style: commonInputStyle });
            state.dom.settingsLunchSelect.addEventListener('change', EventHandlers.handleLunchSettingChange);
            state.dom.settingsPanel.appendChild(createSection('Shift & Lunch', [
                Utils.createDOMElement('label', { htmlFor: state.dom.settingsShiftTypeSelect.id, textContent: 'Shift Type:', style: commonLabelStyle }), state.dom.settingsShiftTypeSelect,
                Utils.createDOMElement('label', { htmlFor: state.dom.settingsShiftStartTimeInput.id, textContent: 'Shift Start (manual):', style: {...commonLabelStyle, marginTop:'8px'} }), state.dom.settingsShiftStartTimeInput,
                Utils.createDOMElement('label', { htmlFor: state.dom.settingsLunchSelect.id, textContent: 'Lunch Break:', style: {...commonLabelStyle, marginTop:'8px'} }), state.dom.settingsLunchSelect,
            ]));

            // --- Automation & Contribution ---
            state.dom.autoClickEnabledCheckbox = Utils.createDOMElement('input', { type: 'checkbox', id: 'autoClickEnableCb', style: checkboxStyle });
            state.dom.autoClickEnabledCheckbox.addEventListener('change', EventHandlers.handleAutoClickSettingChange);
            const autoClickLabel = Utils.createDOMElement('label', { htmlFor: state.dom.autoClickEnabledCheckbox.id, textContent: `Auto-Increment on "${CONFIG.AUTO_CLICK_TRIGGER_WORD}"`, style: checkboxRowStyle }, [state.dom.autoClickEnabledCheckbox]);
            
            state.dom.currentTabContributesCheckbox = Utils.createDOMElement('input', {type: 'checkbox', id: 'currentTabContributesCb', style: checkboxStyle });
            state.dom.currentTabContributesCheckbox.addEventListener('change', EventHandlers.handleCurrentTabContributionChange);
            const currentTabContributeLabel = Utils.createDOMElement('label', {htmlFor: state.dom.currentTabContributesCheckbox.id, textContent: `This Tab contributes to Global Stats`, style: checkboxRowStyle }, [state.dom.currentTabContributesCheckbox]);
            state.dom.otherTabsSettingsContainer = Utils.createDOMElement('div', {id: 'otherTabsSettingsContainer', style: {marginLeft: '25px', marginTop: '2px', fontSize: '0.9em'}});

            state.dom.settingsPanel.appendChild(createSection('Automation & Stats Contribution', [
                autoClickLabel, currentTabContributeLabel, state.dom.otherTabsSettingsContainer
            ]));

            // --- UI Element Visibility ---
            const visControls = [
                { stateKey: 'showClock', idSuffix: 'showClockCb', label: 'Show Real-time Clock' },
                { stateKey: 'showStats', idSuffix: 'showStatsCb', label: 'Show Statistics Block' },
                { stateKey: 'showLastActionTimer', idSuffix: 'showLastActionTimerCb', label: 'Show Last Action Timer' },
                { stateKey: 'showUITabIndicator', idSuffix: 'showUITabIndicatorCb', label: 'Show Tab Name in Panel' },
                { stateKey: 'showPageOverlay', idSuffix: 'showPageOverlayCb', label: 'Show Full Page Color Overlay' },
                { stateKey: 'showTriggerDebug', idSuffix: 'showTriggerDebugCb', label: `Show "${CONFIG.AUTO_CLICK_TRIGGER_WORD}" Trigger Debug` }
            ];
            const visElements = visControls.map(vc => {
                state.dom[vc.stateKey + 'Checkbox'] = Utils.createDOMElement('input', {type: 'checkbox', id: vc.idSuffix, style: checkboxStyle});
                state.dom[vc.stateKey + 'Checkbox'].addEventListener('change', (e) => { state[vc.stateKey] = e.target.checked; UIManager.applyElementVisibilityFromState(); StorageManager.saveMainSettings(); });
                return Utils.createDOMElement('label', {htmlFor: state.dom[vc.stateKey + 'Checkbox'].id, textContent: vc.label, style:checkboxRowStyle}, [state.dom[vc.stateKey + 'Checkbox']]);
            });
            state.dom.settingsPanel.appendChild(createSection('UI Element Visibility', visElements));

            // --- Custom Tab Theme ---
            state.dom.customTabNameInput = Utils.createDOMElement('input', {type: 'text', id: 'customTabNameInput', style: commonInputStyle, placeholder: 'E.g., Station Alpha - Prebuild'});
            state.dom.customTabBkgColorInput = Utils.createDOMElement('input', {type: 'text', id: 'customTabOverlayColorInput', style: commonInputStyle, placeholder: 'rgba(R,G,B,A) or #HEX'});
            state.dom.customTabTextColorInput = Utils.createDOMElement('input', {type: 'text', id: 'customTabTextColorInput', style: commonInputStyle, placeholder: 'rgba(R,G,B,A) or #HEX'});
            const saveThemeBtn = Utils.createDOMElement('button', {textContent: 'Save Custom Appearance for This URL', style: {...commonInputStyle, backgroundColor: `${CONFIG.MAIN_ACCENT_COLOR}bb`, color:'white', marginTop:'8px', cursor:'pointer'}});
            saveThemeBtn.onclick = EventHandlers.handleSaveCustomTheme;
            const resetThemeBtn = Utils.createDOMElement('button', {textContent: 'Reset Appearance to Default for This URL', style: {...commonInputStyle, backgroundColor: `rgba(100,100,100,0.4)`, color:'white', marginTop:'5px', cursor:'pointer'}});
            resetThemeBtn.onclick = EventHandlers.handleResetCustomTheme;
            state.dom.settingsPanel.appendChild(createSection('Current Tab Appearance', [
                Utils.createDOMElement('label', {htmlFor: state.dom.customTabNameInput.id, textContent: 'Tab Display Name:', style: commonLabelStyle}), state.dom.customTabNameInput,
                Utils.createDOMElement('label', {htmlFor: state.dom.customTabBkgColorInput.id, textContent: 'Page Overlay Color:', style: {...commonLabelStyle, marginTop:'8px'}}), state.dom.customTabBkgColorInput,
                Utils.createDOMElement('label', {htmlFor: state.dom.customTabTextColorInput.id, textContent: 'Page Indicator Text Color:', style: {...commonLabelStyle, marginTop:'8px'}}), state.dom.customTabTextColorInput,
                saveThemeBtn, resetThemeBtn
            ]));
            
            // --- Debugging ---
            state.dom.debugPointerEventBordersCheckbox = Utils.createDOMElement('input', {type: 'checkbox', id: 'debugPointerBordersCb', style: checkboxStyle});
            state.dom.debugPointerEventBordersCheckbox.addEventListener('change', (e) => { state.debugPointerEventBorders = e.target.checked; UIManager.applyDebugPointerEventBorders(); StorageManager.saveMainSettings(); });
            const debugPointerLabel = Utils.createDOMElement('label', {htmlFor: state.dom.debugPointerEventBordersCheckbox.id, textContent: 'Show Clickable Area Debug Borders', style:checkboxRowStyle}, [state.dom.debugPointerEventBordersCheckbox]);
            state.dom.settingsPanel.appendChild(createSection('Debugging Tools', [debugPointerLabel]));


            // --- Close Button ---
            const closeButton = Utils.createDOMElement('button', { textContent: 'Apply & Close', className: 'ph-settings-close-btn', style: { cursor: 'pointer', backgroundColor: `${CONFIG.MAIN_ACCENT_COLOR}dd`, border: 'none', color: 'white', borderRadius: '5px', padding: '10px 15px', fontSize: '1em', width: '100%', marginTop: 'auto', transition: 'background-color 0.2s' }});
            closeButton.addEventListener('click', () => UIManager.setSettingsPanelVisibility(false));
            Utils.makeButtonInteractive(closeButton);
            state.dom.settingsPanel.appendChild(closeButton);
            
            state.uiContainer.appendChild(state.dom.settingsPanel);
        },

        populateAllFields: () => { // Called when settings panel opens or state changes
            // Pointer Events Mode
            if (state.dom.pointerEventsModeSelect) state.dom.pointerEventsModeSelect.value = state.pointerEventsMode;
            
            // Shift Type
            if(state.dom.settingsShiftTypeSelect) {
                state.dom.settingsShiftTypeSelect.innerHTML = ''; // Clear
                [['auto', 'Automatic Detection'], ['day', `Day (from ${CONFIG.DEFAULT_DAY_SHIFT_START_TIME})`], ['night', `Night (from ${CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME})`]].forEach(([val, txt]) => {
                    state.dom.settingsShiftTypeSelect.add(new Option(txt, val));
                });
                state.dom.settingsShiftTypeSelect.value = state.shiftType;
            }
            // Shift Start Time Input
            if(state.dom.settingsShiftStartTimeInput) {
                state.dom.settingsShiftStartTimeInput.value = state.shiftStartTime ? Utils.formatDateToHHMM(state.shiftStartTime) : '';
                const isManual = state.shiftType !== 'auto';
                state.dom.settingsShiftStartTimeInput.style.display = isManual ? 'block' : 'none';
                const label = state.dom.settingsShiftStartTimeInput.previousElementSibling;
                if (label && label.tagName === 'LABEL') label.style.display = isManual ? 'block' : 'none';
            }
            // Lunch Select
            if(state.dom.settingsLunchSelect) {
                state.dom.settingsLunchSelect.innerHTML = ''; // Clear
                const currentShiftCat = ShiftManager.getCurrentShiftCategory();
                const filteredOptions = CONFIG.DEFAULT_LUNCH_OPTIONS.filter(opt => opt.type === currentShiftCat || opt.type === 'any');
                filteredOptions.forEach(opt => {
                    const originalIndex = CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(opt);
                    state.dom.settingsLunchSelect.add(new Option(opt.text, String(originalIndex)));
                });
                if (state.selectedLunchOption) {
                    const currentLunchOriginalIndex = CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(state.selectedLunchOption);
                    if (filteredOptions.includes(state.selectedLunchOption)) {
                         state.dom.settingsLunchSelect.value = String(currentLunchOriginalIndex);
                    } else if (filteredOptions.length > 0) { // Current selection not valid for this shift, pick first valid
                        state.selectedLunchOption = filteredOptions[0];
                        state.dom.settingsLunchSelect.value = String(CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(filteredOptions[0]));
                    }
                } else if (filteredOptions.length > 0) { // No selection, pick first valid
                     state.selectedLunchOption = filteredOptions[0];
                     state.dom.settingsLunchSelect.value = String(CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(filteredOptions[0]));
                }
            }
            // Automation & Contribution
            if(state.dom.autoClickEnabledCheckbox) state.dom.autoClickEnabledCheckbox.checked = state.autoClickEnabled;
            if(state.dom.currentTabContributesCheckbox) state.dom.currentTabContributesCheckbox.checked = state.currentTabContributesToTotal;
            SettingsPanel.updateOtherTabsSettingsDisplay();

            // UI Visibility Toggles
            ['showClock', 'showStats', 'showLastActionTimer', 'showUITabIndicator', 'showPageOverlay', 'showTriggerDebug'].forEach(key => {
                if(state.dom[key + 'Checkbox']) state.dom[key + 'Checkbox'].checked = state[key];
            });
            // Debug Toggles
            if(state.dom.debugPointerEventBordersCheckbox) state.dom.debugPointerEventBordersCheckbox.checked = state.debugPointerEventBorders;

            // Custom Theme Inputs
            const themeToDisplay = state.customTabThemes[state.currentTabFullUrl] || state.currentTabMode; // Show custom if exists, else current auto-detected
            if(state.dom.customTabNameInput) state.dom.customTabNameInput.value = themeToDisplay.name;
            if(state.dom.customTabBkgColorInput) state.dom.customTabBkgColorInput.value = themeToDisplay.color;
            if(state.dom.customTabTextColorInput) state.dom.customTabTextColorInput.value = themeToDisplay.textColor;
            
            const headingElem = state.dom.settingsPanel.querySelector('h4[textContent^="Current Tab Appearance"]');
            if(headingElem) headingElem.textContent = `Current Tab Appearance (${state.currentTabMode.name})`;

        },
        
        updateOtherTabsSettingsDisplay: () => {
            if (!state.dom.otherTabsSettingsContainer) return;
            state.dom.otherTabsSettingsContainer.innerHTML = '';
            const checkboxRowStyle = { display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '0.9em', color: 'rgba(255,255,255,0.8)', margin:'3px 0'};
            const checkboxStyle = { marginRight: '8px', transform: 'scale(1.1)', accentColor: CONFIG.MAIN_ACCENT_COLOR, cursor:'pointer' };
            
            const otherTabs = Object.values(state.otherTabsData).filter(td => td.tabId !== state.currentTabId);
            if (otherTabs.length === 0) {
                state.dom.otherTabsSettingsContainer.appendChild(Utils.createDOMElement('p', {textContent: '(No other active helper tabs detected)', style: {opacity:'0.6', fontStyle:'italic', fontSize:'0.85em', margin:'5px 0'}}));
                return;
            }
            otherTabs.forEach(tabData => {
                const checkboxId = `contribToggle_${tabData.tabId.replace(/[^a-zA-Z0-9]/g, '_')}`;
                const checkbox = Utils.createDOMElement('input', { type: 'checkbox', id: checkboxId, checked: tabData.contributesToTotal || false, style: checkboxStyle, dataset: { targetTabId: tabData.tabId } });
                checkbox.addEventListener('change', EventHandlers.handleOtherTabContributionChange);
                const label = Utils.createDOMElement('label', { htmlFor: checkbox.id, style: checkboxRowStyle }, [
                    checkbox,
                    `Tab: ${tabData.modeName || tabData.tabId.substring(0,15)+'...'} (${tabData.clicks || 0} items)`
                ]);
                state.dom.otherTabsSettingsContainer.appendChild(label);
            });
        }
    };


    // --- ------------------------------------------------------------------------ ---
    // --- -------------------------- EVENT HANDLERS ---------------------------- ---
    // --- ------------------------------------------------------------------------ ---
    const EventHandlers = {
        processIncrementForCurrentTab: (isManualAction = false, event = null) => {
            // Allow increment even if UI is locked (via hotkey or main button, as per spec)
            state.clicksForThisTab++;
            state.lastActionTimestampForThisTab = Date.now();
            UIManager.updateCounterDisplay();
            UIManager.updateLastActionTimerDisplay();
            StorageManager.writeCurrentTabDataToLocalStorage();
            StorageManager.readAllTabsDataFromLocalStorage(false); // To update global counts immediately
            if (isManualAction && state.dom.incrementButton) { // Visual feedback for manual click
                state.dom.incrementButton.style.transform = 'scale(0.93)';
                setTimeout(() => { if(state.dom.incrementButton) state.dom.incrementButton.style.transform = 'scale(1)'; }, 100);
            }
        },
        handleDecrementClick: () => {
            if (state.uiLocked && state.dom.decrementButton && state.dom.decrementButton.disabled) return;
            if (state.clicksForThisTab > 0) {
                state.clicksForThisTab--;
                state.lastActionTimestampForThisTab = Date.now();
                UIManager.updateCounterDisplay();
                UIManager.updateLastActionTimerDisplay();
                StorageManager.writeCurrentTabDataToLocalStorage();
                StorageManager.readAllTabsDataFromLocalStorage(false);
            }
        },
        handleCounterInputDynamic: (event) => {
            const input = event.target;
            const valueLength = String(input.value).length;
            let newFontSize = CONFIG.MAIN_COUNTER_FONT_SIZE_INITIAL_EM;
            if (valueLength > CONFIG.MAIN_COUNTER_MAX_CHARS_BEFORE_RESIZE) {
                const overflowChars = valueLength - CONFIG.MAIN_COUNTER_MAX_CHARS_BEFORE_RESIZE;
                newFontSize = Math.max(CONFIG.MAIN_COUNTER_FONT_SIZE_MIN_EM, CONFIG.MAIN_COUNTER_FONT_SIZE_INITIAL_EM - overflowChars * 0.65); // Tuned factor
            }
            input.style.fontSize = `${newFontSize}em`;
        },
        handleCounterInputChange: (event) => {
            if (state.uiLocked && state.dom.mainCounterInput && state.dom.mainCounterInput.disabled) {
                event.target.value = state.clicksForThisTab; // Revert if locked
                EventHandlers.handleCounterInputDynamic({target: event.target});
                return;
            }
            let newValue = parseInt(event.target.value, 10);
            if (isNaN(newValue) || newValue < 0) newValue = 0; // Reset to 0 if invalid, or keep old: state.clicksForThisTab
            
            if (newValue !== state.clicksForThisTab) {
                state.clicksForThisTab = newValue;
                state.lastActionTimestampForThisTab = Date.now();
                UIManager.updateLastActionTimerDisplay();
                StorageManager.writeCurrentTabDataToLocalStorage();
                StorageManager.readAllTabsDataFromLocalStorage(false);
            }
            UIManager.updateCounterDisplay(); // Ensure font size is also updated
        },
        handleShiftSettingsChange: () => {
            state.shiftType = state.dom.settingsShiftTypeSelect.value;
            ShiftManager.determineAndSetShiftStartTime(false); // Recalculate based on new type/manual time
            if (state.dom.settingsLunchSelect) SettingsPanel.populateAllFields(); // Repopulate lunch options & other fields
            UIManager.updateStatisticsDisplay();
            StorageManager.saveMainSettings();
        },
        handleLunchSettingChange: () => {
            const selectedIndex = parseInt(state.dom.settingsLunchSelect.value, 10);
            if (CONFIG.DEFAULT_LUNCH_OPTIONS[selectedIndex]) {
                state.selectedLunchOption = CONFIG.DEFAULT_LUNCH_OPTIONS[selectedIndex];
                UIManager.updateStatisticsDisplay();
                StorageManager.saveMainSettings();
            }
        },
        handleAutoClickSettingChange: (event) => {
            state.autoClickEnabled = event.target.checked;
            Utils.logInfo(`Auto-click is ${state.autoClickEnabled ? 'ENABLED' : 'DISABLED'}`);
            if (state.autoClickEnabled && !state.mutationObserver) {
                AutoIncrementer.init();
            } else if (!state.autoClickEnabled && state.mutationObserver) {
                AutoIncrementer.disconnect();
            }
            StorageManager.saveMainSettings();
        },
        handleSaveCustomTheme: () => {
            const name = state.dom.customTabNameInput.value.trim() || CONFIG.DEFAULT_TAB_MODE_NAME;
            const color = state.dom.customTabBkgColorInput.value.trim() || CONFIG.DEFAULT_TAB_MODE_COLOR;
            const textColor = state.dom.customTabTextColorInput.value.trim() || CONFIG.DEFAULT_TAB_MODE_TEXT_COLOR;
            state.customTabThemes[state.currentTabFullUrl] = { name, color, textColor };
            state.currentTabMode = { name, color, textColor, isCustom: true }; // Update current mode immediately
            Utils.logInfo(`Custom theme saved for ${state.currentTabFullUrl}:`, state.currentTabMode);
            StorageManager.saveCustomThemes();
            UIManager.applyPageTheme();
            UIManager.updateUITabIndicatorText();
             const headingElem = state.dom.settingsPanel.querySelector('h4[textContent^="Current Tab Appearance"]');
            if(headingElem) headingElem.textContent = `Current Tab Appearance (${state.currentTabMode.name})`;
        },
        handleResetCustomTheme: () => {
            if (state.customTabThemes[state.currentTabFullUrl]) {
                delete state.customTabThemes[state.currentTabFullUrl];
                Utils.logInfo(`Custom theme reset for ${state.currentTabFullUrl}.`);
                StorageManager.determineCurrentTabMode(); // Re-determine based on URL keywords or default
                StorageManager.saveCustomThemes();
                UIManager.applyPageTheme();
                UIManager.updateUITabIndicatorText();
                SettingsPanel.populateAllFields(); // Repopulate theme inputs with new current mode
            }
        },
        handlePageKeydown: (event) => {
            // Ignore if focus is on an input field in the page (not our module's inputs)
            const target = event.target;
            const isOurInput = target === state.dom.mainCounterInput || (state.dom.settingsPanel && state.dom.settingsPanel.contains(target) && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA'));
            
            if (!isOurInput && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
                return;
            }
            if (event.code === CONFIG.INCREMENT_KEYBOARD_SHORTCUT_CODE) {
                event.preventDefault();
                EventHandlers.processIncrementForCurrentTab(false, event); // False for not manual click source
            }
        },
        startResizePanes: (e) => {
            if (state.uiLocked) return;
            e.preventDefault();
            state.isResizing = true;
            UIManager.updatePointerEventsMode(); // Ensure panel is interactive during resize
            const mainArea = state.dom.leftPane.parentElement;
            const initialMouseX = e.clientX;
            const initialLeftPaneWidth = state.dom.leftPane.offsetWidth;
            const totalWidth = mainArea.offsetWidth - CONFIG.DIVIDER_WIDTH_PX;

            const doResize = (moveEvent) => {
                if (!state.isResizing) return;
                const dx = moveEvent.clientX - initialMouseX;
                let newLeftWidth = initialLeftPaneWidth + dx;
                const minLeftPx = totalWidth * (CONFIG.LEFT_PANE_MIN_WIDTH_PERCENT / 100);
                const minRightPx = totalWidth * (CONFIG.RIGHT_PANE_MIN_WIDTH_PERCENT / 100);
                if (newLeftWidth < minLeftPx) newLeftWidth = minLeftPx;
                if (newLeftWidth > totalWidth - minRightPx) newLeftWidth = totalWidth - minRightPx;
                const newLeftFlexBasis = (newLeftWidth / totalWidth) * 100;
                state.dom.leftPane.style.flexBasis = `${newLeftFlexBasis}%`;
            };
            const stopResize = () => {
                if (!state.isResizing) return;
                state.isResizing = false;
                document.removeEventListener('mousemove', doResize);
                document.removeEventListener('mouseup', stopResize);
                state.leftPaneFlexBasis = state.dom.leftPane.style.flexBasis; // Save new basis
                UIManager.updatePointerEventsMode(); // Reset pointer events
                StorageManager.saveMainSettings();
            };
            document.addEventListener('mousemove', doResize);
            document.addEventListener('mouseup', stopResize);
        },
        handleCurrentTabContributionChange: (event) => {
             state.currentTabContributesToTotal = event.target.checked;
             StorageManager.writeCurrentTabDataToLocalStorage(); // Update this tab's record
             StorageManager.readAllTabsDataFromLocalStorage(false); // Recalculate global total and update stats
             StorageManager.saveMainSettings(); // Persist for this tab's main settings
        },
        handleOtherTabContributionChange: (event) => {
            const targetTabId = event.target.dataset.targetTabId;
            const isChecked = event.target.checked;
            const otherTabStorageKey = CONFIG.MULTI_TAB_STORAGE_PREFIX + targetTabId;
            try {
                const otherTabStoredJson = localStorage.getItem(otherTabStorageKey);
                if (otherTabStoredJson) {
                    const otherTabStoredData = JSON.parse(otherTabStoredJson);
                    otherTabStoredData.contributesToTotal = isChecked;
                    otherTabStoredData.timestamp = Date.now(); // Update timestamp
                    localStorage.setItem(otherTabStorageKey, JSON.stringify(otherTabStoredData));
                    Utils.logInfo(`Contribution flag for other tab ${targetTabId} updated to ${isChecked}.`);
                    StorageManager.readAllTabsDataFromLocalStorage(false); // Refresh all data and stats
                } else { Utils.logError(`Could not find localStorage data for tab ${targetTabId} to update contribution.`);}
            } catch (err) { Utils.logError('Error updating contribution for other tab:', err); }
        }
    };

    // --- ------------------------------------------------------------------------ ---
    // --- -------------------- INITIALIZATION & DESTRUCTION -------------------- ---
    // --- ------------------------------------------------------------------------ ---
    function initialize() {
        const existingInstance = document.getElementById(CONFIG.UI_CONTAINER_ID);
        if (existingInstance || window.productionHelperInitialized) {
            Utils.logError('Production Assistant already initialized or remnant found. Attempting to destroy and re-init.');
            if (typeof window.destroyProductionHelper === 'function') {
                try { window.destroyProductionHelper(); } catch(e) { Utils.logError("Error destroying old PHelper:", e); }
            } else { // Force removal if destroy function not available
                 if(existingInstance) existingInstance.remove();
                 const overlay = document.getElementById(CONFIG.SCRIPT_ID_PREFIX + CONFIG.PAGE_COLOR_OVERLAY_ID_SUFFIX);
                 if(overlay) overlay.remove();
                 const indicator = document.getElementById(CONFIG.SCRIPT_ID_PREFIX + CONFIG.PAGE_INDICATOR_TEXT_ID_SUFFIX);
                 if(indicator) indicator.remove();
                 const showBtn = document.getElementById(CONFIG.SCRIPT_ID_PREFIX + CONFIG.EMERGENCY_SHOW_BUTTON_ID_SUFFIX);
                 if(showBtn) showBtn.remove();
            }
            // Clear flag and give a moment for DOM to update before re-initializing
            delete window.productionHelperInitialized;
            setTimeout(actualInit, 100); 
            return;
        }
        actualInit();
    }
    
    function actualInit() {
        Utils.logInfo('Initializing Production Assistant v3.3+ ...');
        StorageManager.loadAllState();   // Load all settings and multi-tab data
        UIManager.buildInitialUI();      // Create all DOM elements
        UIManager.setInitialUIValues();  // Populate UI from state and apply initial visibility
        
        // Initial display updates
        UIManager.updateCounterDisplay();
        UIManager.updateRealTimeClockDisplay();
        UIManager.updateLastActionTimerDisplay();
        UIManager.updateStatisticsDisplay();

        // Start intervals
        state.intervals.realTimeClock = setInterval(UIManager.updateRealTimeClockDisplay, 1000);
        state.intervals.lastActionTimer = setInterval(UIManager.updateLastActionTimerDisplay, 1000);
        state.intervals.statistics = setInterval(UIManager.updateStatisticsDisplay, CONFIG.STATS_UPDATE_INTERVAL_MS);
        state.intervals.multiTabWrite = setInterval(StorageManager.writeCurrentTabDataToLocalStorage, CONFIG.MULTI_TAB_WRITE_INTERVAL_MS);
        state.intervals.multiTabRead = setInterval(() => StorageManager.readAllTabsDataFromLocalStorage(false), CONFIG.MULTI_TAB_READ_INTERVAL_MS);

        // Initialize Auto-Incrementer if enabled
        if (state.autoClickEnabled) AutoIncrementer.init();
        
        // Global event listeners
        state.pageKeydownListener = EventHandlers.handlePageKeydown;
        document.addEventListener('keydown', state.pageKeydownListener);
        window.addEventListener('beforeunload', () => { // Save on close/navigate
            StorageManager.writeCurrentTabDataToLocalStorage();
            StorageManager.saveMainSettings();
            StorageManager.saveCustomThemes();
        });
        // For multi-tab localStorage sync
        window.addEventListener('storage', (event) => {
            if (event.key && event.key.startsWith(CONFIG.MULTI_TAB_STORAGE_PREFIX) && event.key !== (CONFIG.MULTI_TAB_STORAGE_PREFIX + state.currentTabId)) {
               // Utils.logDebug('Storage event detected from another tab:', event.key);
                StorageManager.readAllTabsDataFromLocalStorage(false);
            }
        });

        state.initialized = true;
        window.productionHelperInitialized = true; // Global flag
        Utils.logInfo('Production Assistant v3.3+ initialized successfully.');
    }

    function destroy() {
        Utils.logInfo('Destroying Production Assistant v3.3+ ...');
        try { // Final save attempt
            if(state.initialized) { // Only if fully initialized
                StorageManager.writeCurrentTabDataToLocalStorage();
                StorageManager.saveMainSettings();
                StorageManager.saveCustomThemes();
            }
        } catch (e) { Utils.logError("Error saving data on destroy:", e); }

        AutoIncrementer.disconnect();
        Object.values(state.intervals).forEach(clearInterval); state.intervals = {};
        
        if (state.pageKeydownListener) document.removeEventListener('keydown', state.pageKeydownListener);
        // Note: 'beforeunload' and 'storage' listeners added to window are harder to remove selectively without named functions.
        // However, the `state.initialized` flag can prevent their logic from running if needed.

        const idsToRemove = [
            CONFIG.UI_CONTAINER_ID, // Main UI panel
            CONFIG.SCRIPT_ID_PREFIX + CONFIG.PAGE_COLOR_OVERLAY_ID_SUFFIX,
            CONFIG.SCRIPT_ID_PREFIX + CONFIG.PAGE_INDICATOR_TEXT_ID_SUFFIX,
            CONFIG.SCRIPT_ID_PREFIX + CONFIG.EMERGENCY_SHOW_BUTTON_ID_SUFFIX
        ];
        idsToRemove.forEach(id => { const el = document.getElementById(id); if (el) el.remove(); });

        // Clear DOM references
        state.uiContainer = null;
        state.dom = {};
        state.initialized = false;
        delete window.productionHelperInitialized;
        Utils.logInfo('Production Assistant v3.3+ destroyed.');
    }

    // Expose destroy function globally for manual cleanup or re-initialization
    window.destroyProductionHelper = destroy;

    // --- EXECUTION ---
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initialize();
    } else {
        document.addEventListener('DOMContentLoaded', initialize, { once: true });
    }

})(); // End of main IIFE
