/* PART 1 */
/*
    In this part (Part 1), we will:
    1.  Define the main IIFE (Immediately Invoked Function Expression) wrapper and 'use strict'.
    2.  Establish the global CONFIG object containing all configurable parameters for the script.
        This includes UI dimensions, colors, text labels, feature toggles, default timings,
        trigger words, storage keys, and debug flags.
    3.  Establish the global 'state' object to hold the dynamic state of the script.
        This includes UI visibility, operational data (clicks, shift times), loaded settings,
        references to DOM elements, interval IDs, etc.
    4.  Define core utility functions that are independent of DOM or specific UI logic.
        These will include logging functions, storage access helpers (localStorage/sessionStorage),
        date/time formatting, string-to-minutes conversion, and a robust createDOMElement helper.
    5.  Define functions related to tab identification and theme management (determining current tab mode,
        loading/saving custom themes).
    6.  Define functions for saving and loading the main application settings and multi-tab data
        to/from browser storage, including logic for handling initial setup if no saved data exists.
    7.  Define helper functions for dynamic default lunch selection based on shift type.

    Tasks remaining for Part 2:
    1.  Define UI state management functions (controlling visibility, lock state, pointer events mode,
        settings panel visibility, and debug border styles).
    2.  Start building the main UI structure (buildMainUI function and its main layout components:
        top controls, main content area with resizable panes, bottom info bar).
    3.  Implement helper functions for UI elements like resizable panes (startResizePanes, doResize, stopResize)
        and interactive button effects.
    4.  Implement functions to build the emergency show button and the full-page color overlay/indicator.

    Tasks remaining for Part 3:
    1.  Complete the UI build by defining `buildSettingsPanel` with all its configuration options.
    2.  Define `setInitialUIStates` to populate the UI (especially settings) after it's built.
    3.  Define all event handler functions (for clicks, input changes, settings changes, keyboard shortcuts).
    4.  Define core application logic functions (shift time determination, statistics calculation,
        last action timer updates, trigger word observation via MutationObserver, theme application).
    5.  Define the main `initialize` and `destroy` functions for the script.
    6.  Add the final execution block to start the script.
*/

(function() {
    'use strict';

    // --- ------------------------------------------------------------------------ ---
    // --- --------- SCRIPT CONFIGURATION (All settings are here) --------------- ---
    // --- ------------------------------------------------------------------------ ---
    const CONFIG = {
        // --- General UI & Styling ---
        UI_CONTAINER_ID: 'prodHelperUI_v3_3_final', // Updated ID for clarity
        UI_BOTTOM_OFFSET: '10px',
        UI_RIGHT_OFFSET: '10px',
        UI_WIDTH_PERCENT_VIEWPORT: 45,
        UI_HEIGHT_PERCENT_VIEWPORT: 35,
        UI_MIN_WIDTH_PX: 380,
        UI_MIN_HEIGHT_PX: 280,
        UI_BACKGROUND_COLOR: 'rgba(30, 35, 45, 0.85)',
        UI_TEXT_COLOR: 'rgba(220, 220, 230, 0.9)',
        UI_BORDER_COLOR: 'rgba(80, 120, 220, 0.5)',
        FONT_FAMILY: '"Segoe UI", Roboto, Arial, sans-serif',
        MAIN_ACCENT_COLOR: 'rgba(255, 152, 0, 0.9)', // Orange accent

        // --- Clicker & Counter ---
        MAIN_COUNTER_INPUT_ID: 'mainProdCounterInput_v3_3',
        MAIN_COUNTER_FONT_SIZE_INITIAL_EM: 4.8,
        MAIN_COUNTER_FONT_SIZE_MIN_EM: 1.8,
        MAIN_COUNTER_MAX_CHARS_BEFORE_RESIZE: 3,
        SHOW_DECREMENT_BUTTON: true,
        CLICKER_INCREMENT_BUTTON_ID: 'incrementProdBtn_v3_3',
        CLICKER_INCREMENT_BUTTON_COLOR: 'rgba(80, 180, 80, 0.7)',
        CLICKER_DECREMENT_BUTTON_ID: 'decrementProdBtn_v3_3',
        CLICKER_DECREMENT_BUTTON_COLOR: 'rgba(200, 80, 80, 0.7)',
        INCREMENT_KEYBOARD_SHORTCUT_CODE: 'ShiftRight', // e.g., 'PageDown', 'ShiftRight'

        // --- Resizable Divider ---
        DIVIDER_WIDTH_PX: 8,
        LEFT_PANE_MIN_WIDTH_PERCENT: 25,
        RIGHT_PANE_MIN_WIDTH_PERCENT: 30,

        // --- Timer for Last Action ---
        LAST_ACTION_TIMER_ID: 'lastActionTimer_v3_3',
        LAST_ACTION_TIMER_WARN_SECONDS: 10 * 60, // 10 minutes
        LAST_ACTION_TIMER_WARN_COLOR: 'rgba(255, 0, 0, 0.9)',

        // --- Real-time Clock ---
        CLOCK_DISPLAY_ID: 'prodRealTimeClock_v3_3',
        CLOCK_FONT_SIZE_EM: 3.8,

        // --- Tabs/Modes Overlay & Identification ---
        PAGE_COLOR_OVERLAY_ID: 'prodHelperPageColorOverlay_v3_3',
        PAGE_INDICATOR_TEXT_ID: 'prodHelperPageIndicatorText_v3_3',
        PAGE_INDICATOR_FONT_SIZE_PX: 48,
        TAB_IDENTIFICATION_MODES: [
            { name: 'PREB', keyword: 'PREBUILD', color: 'rgba(255, 165, 0, 0.04)', textColor: 'rgba(255, 140, 0, 0.6)' },
            { name: 'CURRB', keyword: 'CURRENTBUILD', color: 'rgba(0, 165, 255, 0.04)', textColor: 'rgba(0, 140, 255, 0.6)' },
            { name: 'AFTREF', keyword: 'AFTERREFURBISH', color: 'rgba(100, 255, 100, 0.04)', textColor: 'rgba(80, 220, 80, 0.6)' },
        ],
        DEFAULT_TAB_MODE_NAME: 'General',
        DEFAULT_TAB_MODE_COLOR: 'rgba(100, 100, 100, 0.03)',
        DEFAULT_TAB_MODE_TEXT_COLOR: 'rgba(150, 150, 150, 0.5)',
        UI_TAB_INDICATOR_TEXT_ID: 'prodHelperUITabIndicator_v3_3',
        UI_TAB_INDICATOR_FONT_SIZE_EM: 1.1,

        // --- Multi-Tab State Sync via localStorage ---
        MULTI_TAB_STORAGE_PREFIX: 'prodHelper_tabs_v3_3_',
        MULTI_TAB_UPDATE_INTERVAL_MS: 1000,
        MULTI_TAB_READ_INTERVAL_MS: 1500,
        MULTI_TAB_DATA_TTL_MS: 5 * 60 * 1000, // Data older than this is considered stale

        // --- Shift & Lunch ---
        DEFAULT_DAY_SHIFT_START_TIME: '06:26',
        DEFAULT_NIGHT_SHIFT_START_TIME: '18:26',
        SETTINGS_SHIFT_TYPE_SELECT_ID: 'shiftTypeSelect_v3_3',
        SETTINGS_SHIFT_START_TIME_INPUT_ID: 'shiftStartTimeInput_v3_3',
        SETTINGS_LUNCH_TIME_SELECT_ID: 'lunchTimeSelect_v3_3',
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
        STATS_TEXT_SUMMARY_ID: 'prodStatsSummary_v3_3',
        STATS_FONT_SIZE_EM: 0.9,
        STATS_UPDATE_INTERVAL_MS: 3000,

        // --- Auto-Clicker Trigger ---
        AUTO_CLICK_TRIGGER_WORD: 'wysłano',
        TRIGGER_OBSERVE_AREA_SELECTOR: 'body', // Observe whole body for simplicity, can be narrowed
        AUTO_CLICK_ENABLED_CHECKBOX_ID: 'autoClickEnabled_v3_3',
        TRIGGER_DEBUG_DISPLAY_ID: 'triggerDebugDisplay_v3_3',
        MAX_TRIGGER_DEBUG_LINES: 5,

        // --- Storage ---
        STORAGE_KEY_PREFIX_MAIN_SETTINGS: 'prodHelper_mainCfg_v3_3_',
        STORAGE_KEY_PREFIX_CUSTOM_TAB_THEMES: 'prodHelper_customTabThemes_v3_3_',
        USE_SESSION_STORAGE_FOR_MAIN_SETTINGS: true,

        // --- UI Controls & Settings Panel ---
        SETTINGS_PANEL_ID: 'prodHelperSettingsPanel_v3_3',
        EMERGENCY_HIDE_BUTTON_TEXT: 'CLOSE',
        LOCK_UI_BUTTON_TEXT_UNLOCKED: 'UI block',
        LOCK_UI_BUTTON_TEXT_LOCKED: 'UI unblock',
        TOGGLE_SETTINGS_BUTTON_TEXT_CLOSED: 'settings',
        TOGGLE_SETTINGS_BUTTON_TEXT_OPENED: 'settings ◀',

        // --- Pointer Events Mode Setting ---
        SETTINGS_POINTER_EVENTS_MODE_SELECT_ID: 'pointerEventsModeSelect_v3_3',

        // --- Settings Toggles ---
        SETTINGS_SHOW_CLOCK_CHECKBOX_ID: 'showClockToggle_v3_3',
        SETTINGS_SHOW_STATS_CHECKBOX_ID: 'showStatsToggle_v3_3',
        SETTINGS_SHOW_LAST_ACTION_TIMER_CHECKBOX_ID: 'showLastActionTimerToggle_v3_3',
        SETTINGS_SHOW_UI_TAB_INDICATOR_CHECKBOX_ID: 'showUITabIndicatorToggle_v3_3',
        SETTINGS_SHOW_PAGE_OVERLAY_CHECKBOX_ID: 'showPageOverlayToggle_v3_3',
        SETTINGS_SHOW_TRIGGER_DEBUG_CHECKBOX_ID: 'showTriggerDebugToggle_v3_3',
        SETTINGS_CURRENT_TAB_CONTRIBUTES_TO_TOTAL_CHECKBOX_ID: 'currentTabContributes_v3_3',
        SETTINGS_DEBUG_INTERACTIVE_BORDERS_CHECKBOX_ID: 'debugInteractiveBorders_v3_3',

        // --- Custom Tab Theme Settings ---
        SETTINGS_CUSTOM_TAB_NAME_INPUT_ID: 'customTabNameInput_v3_3',
        SETTINGS_CUSTOM_TAB_COLOR_INPUT_ID: 'customTabBkgColorInput_v3_3',
        SETTINGS_CUSTOM_TAB_TEXT_COLOR_INPUT_ID: 'customTabTextColorInput_v3_3',

        DEBUG_MODE: true,
    };

    // --- ------------------------------------------------------------------------ ---
    // --- --------- SCRIPT STATE (Internal - Do not modify directly) ----------- ---
    // --- ------------------------------------------------------------------------ ---
    const state = {
        uiVisible: true,
        uiLocked: false,
        settingsPanelVisible: false,
        currentTabFullUrl: window.location.href,
        currentTabId: '',
        currentTabMode: { name: CONFIG.DEFAULT_TAB_MODE_NAME, keyword: '', color: CONFIG.DEFAULT_TAB_MODE_COLOR, textColor: CONFIG.DEFAULT_TAB_MODE_TEXT_COLOR, isCustom: false },
        globalTotalClicks: 0,
        clicksForThisTab: 0,
        lastActionTimestampForThisTab: Date.now(),
        shiftType: 'auto',
        shiftStartTime: null,
        selectedLunchOption: null,
        autoClickEnabled: true,
        isTriggerWordCurrentlyVisible: false,
        triggerLastFoundIn: null,
        pointerEventsMode: 'interactive_except_buttons',
        showClock: true, showStats: true, showLastActionTimer: true,
        showUITabIndicator: true, showPageOverlay: true, showTriggerDebug: CONFIG.DEBUG_MODE,
        debugInteractiveBorders: false,
        currentTabContributesToTotal: true,
        otherTabsData: {},
        customTabThemes: {},
        domElements: { leftPane: null, rightPane: null, divider: null },
        intervals: {},
        mutationObserver: null,
        pageKeydownListener: null,
        isResizing: false,
        initialLeftPaneFlexBasis: null,
    };

    // --- ------------------------------------------------------------------------ ---
    // --- --------------------- UTILITY FUNCTIONS ------------------------------ ---
    // --- ------------------------------------------------------------------------ ---
    function logDebug(...args) { if (CONFIG.DEBUG_MODE) console.debug(`[PHv3.3 DEBUG ${state.currentTabMode?.name || state.currentTabId || ''}]`, ...args); }
    function logInfo(...args) { console.info(`[PHv3.3 INFO ${state.currentTabMode?.name || state.currentTabId || ''}]`, ...args); }
    function logError(...args) { console.error(`[PHv3.3 ERROR ${state.currentTabMode?.name || state.currentTabId || ''}]`, ...args); }

    function getStorage(useSession = CONFIG.USE_SESSION_STORAGE_FOR_MAIN_SETTINGS) {
        return useSession ? sessionStorage : localStorage;
    }

    function generateTabIdFromUrl() {
        const path = window.location.pathname.toLowerCase().replace(/\/$/, '');
        const search = window.location.search.toLowerCase();
        let id = `${path}${search}`;
        id = id.replace(/[^a-z0-9_.-]/g, '_').replace(/_+/g, '_');
        if (id.startsWith('_')) id = id.substring(1);
        if (id.length > 100) id = id.substring(0, 50) + '...' + id.substring(id.length - 47);
        return id || 'default_tab_id';
    }

    function determineCurrentTabMode() {
        const customTheme = state.customTabThemes[state.currentTabFullUrl];
        if (customTheme && customTheme.name && customTheme.color && customTheme.textColor) {
            return { ...customTheme, isCustom: true };
        }
        const urlUpper = window.location.href.toUpperCase();
        for (const mode of CONFIG.TAB_IDENTIFICATION_MODES) {
            if (urlUpper.includes(mode.keyword.toUpperCase())) {
                return { ...mode, isCustom: false };
            }
        }
        return { name: CONFIG.DEFAULT_TAB_MODE_NAME, keyword: '', color: CONFIG.DEFAULT_TAB_MODE_COLOR, textColor: CONFIG.DEFAULT_TAB_MODE_TEXT_COLOR, isCustom: false };
    }

    function timeStringToMinutes(timeStr) {
        if (!timeStr || typeof timeStr !== 'string' || !timeStr.includes(':')) { logError('Invalid timeStr to timeStringToMinutes:', timeStr); return 0; }
        const parts = timeStr.split(':');
        if (parts.length < 2) { logError('Invalid time format (HH:MM):', timeStr); return 0; }
        const hours = parseInt(parts[0], 10); const minutes = parseInt(parts[1], 10);
        if (isNaN(hours) || isNaN(minutes)) { logError('Non-numeric time parts:', timeStr); return 0; }
        return hours * 60 + minutes;
    }

    function _getDayStartHour() { return parseInt(CONFIG.DEFAULT_DAY_SHIFT_START_TIME.split(':')[0],10); }
    function _getNightStartHour() { return parseInt(CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME.split(':')[0],10); }

    function setDynamicDefaultLunch() {
        let potentialShiftType = state.shiftType;
        if (potentialShiftType === 'auto') {
            if (state.shiftStartTime) { // If shiftStartTime is already determined (e.g. from manual set or previous auto)
                const shiftStartHour = state.shiftStartTime.getHours();
                potentialShiftType = (shiftStartHour >= _getDayStartHour() && shiftStartHour < _getNightStartHour()) ? 'day' : 'night';
            } else { // If shiftStartTime is not yet set (e.g. very first load or after reset)
                const currentHour = new Date().getHours();
                potentialShiftType = (currentHour >= _getDayStartHour() && currentHour < _getNightStartHour()) ? 'day' : 'night';
            }
        }
        const defaultLunch = CONFIG.DEFAULT_LUNCH_OPTIONS.find(opt => opt.type === potentialShiftType) ||
                             CONFIG.DEFAULT_LUNCH_OPTIONS.find(opt => opt.type === "any") || // Fallback to 'any' type
                             CONFIG.DEFAULT_LUNCH_OPTIONS[0]; // Absolute fallback
        state.selectedLunchOption = defaultLunch;
        logDebug("Dynamic default lunch set to:", state.selectedLunchOption ? state.selectedLunchOption.text : "None (or issue in options)");
    }

    function saveDataToStorage() {
        try {
            const mainSettingsStorage = getStorage(CONFIG.USE_SESSION_STORAGE_FOR_MAIN_SETTINGS);
            const lunchIndex = state.selectedLunchOption ? CONFIG.DEFAULT_LUNCH_OPTIONS.findIndex(opt => opt.start === state.selectedLunchOption.start && opt.end === state.selectedLunchOption.end && opt.type === state.selectedLunchOption.type) : -1;
            const mainDataToSave = {
                shiftType: state.shiftType, shiftStartTimeISO: state.shiftStartTime ? state.shiftStartTime.toISOString() : null,
                selectedLunchOptionIndex: lunchIndex, autoClickEnabled: state.autoClickEnabled,
                uiVisible: state.uiVisible, uiLocked: state.uiLocked, settingsPanelVisible: state.settingsPanelVisible,
                showClock: state.showClock, showStats: state.showStats, showLastActionTimer: state.showLastActionTimer,
                showUITabIndicator: state.showUITabIndicator, showPageOverlay: state.showPageOverlay,
                showTriggerDebug: state.showTriggerDebug, debugInteractiveBorders: state.debugInteractiveBorders,
                currentTabContributesToTotal: state.currentTabContributesToTotal,
                leftPaneFlexBasis: state.domElements.leftPane ? state.domElements.leftPane.style.flexBasis : state.initialLeftPaneFlexBasis, // Save current or initial
                pointerEventsMode: state.pointerEventsMode,
            };
            mainSettingsStorage.setItem(CONFIG.STORAGE_KEY_PREFIX_MAIN_SETTINGS + state.currentTabId, JSON.stringify(mainDataToSave));

            const themeStorage = getStorage(false); // Custom themes always to localStorage
            themeStorage.setItem(CONFIG.STORAGE_KEY_PREFIX_CUSTOM_TAB_THEMES, JSON.stringify(state.customTabThemes));
            logDebug('Main settings and themes saved for tab:', state.currentTabId);
        } catch (e) { logError('Failed to save data:', e); }
    }

    function loadDataFromStorage() {
        state.currentTabFullUrl = window.location.href;
        state.currentTabId = generateTabIdFromUrl();

        try {
            const themeStorage = getStorage(false);
            const themesJSON = themeStorage.getItem(CONFIG.STORAGE_KEY_PREFIX_CUSTOM_TAB_THEMES);
            if (themesJSON) state.customTabThemes = JSON.parse(themesJSON);
        } catch (e) { logError('Failed to load custom themes:', e); state.customTabThemes = {}; }

        state.currentTabMode = determineCurrentTabMode();
        logInfo(`Current Tab ID: ${state.currentTabId}, Mode: ${state.currentTabMode.name} (Custom: ${state.currentTabMode.isCustom})`);

        try {
            const mainSettingsStorage = getStorage(CONFIG.USE_SESSION_STORAGE_FOR_MAIN_SETTINGS);
            const savedDataJSON = mainSettingsStorage.getItem(CONFIG.STORAGE_KEY_PREFIX_MAIN_SETTINGS + state.currentTabId);
            if (savedDataJSON) {
                const sd = JSON.parse(savedDataJSON); // sd for savedData
                state.shiftType = sd.shiftType || 'auto';
                if (sd.shiftStartTimeISO) state.shiftStartTime = new Date(sd.shiftStartTimeISO);
                const lunchIndex = parseInt(sd.selectedLunchOptionIndex, 10);
                if (!isNaN(lunchIndex) && lunchIndex >=0 && CONFIG.DEFAULT_LUNCH_OPTIONS[lunchIndex]) state.selectedLunchOption = CONFIG.DEFAULT_LUNCH_OPTIONS[lunchIndex];
                state.autoClickEnabled = typeof sd.autoClickEnabled === 'boolean' ? sd.autoClickEnabled : true;
                state.uiVisible = typeof sd.uiVisible === 'boolean' ? sd.uiVisible : true;
                state.uiLocked = typeof sd.uiLocked === 'boolean' ? sd.uiLocked : false;
                state.settingsPanelVisible = typeof sd.settingsPanelVisible === 'boolean' ? sd.settingsPanelVisible : false;
                state.showClock = typeof sd.showClock === 'boolean' ? sd.showClock : true;
                state.showStats = typeof sd.showStats === 'boolean' ? sd.showStats : true;
                state.showLastActionTimer = typeof sd.showLastActionTimer === 'boolean' ? sd.showLastActionTimer : true;
                state.showUITabIndicator = typeof sd.showUITabIndicator === 'boolean' ? sd.showUITabIndicator : true;
                state.showPageOverlay = typeof sd.showPageOverlay === 'boolean' ? sd.showPageOverlay : true;
                state.showTriggerDebug = typeof sd.showTriggerDebug === 'boolean' ? sd.showTriggerDebug : CONFIG.DEBUG_MODE;
                state.debugInteractiveBorders = typeof sd.debugInteractiveBorders === 'boolean' ? sd.debugInteractiveBorders : false;
                state.currentTabContributesToTotal = typeof sd.currentTabContributesToTotal === 'boolean' ? sd.currentTabContributesToTotal : true;
                state.initialLeftPaneFlexBasis = sd.leftPaneFlexBasis || '45%'; // Default if not saved
                state.pointerEventsMode = sd.pointerEventsMode || 'interactive_except_buttons';
                logInfo('Main settings loaded for tab:', state.currentTabId);
            } else {
                logInfo('No saved main settings for this tab. Using defaults.');
                state.currentTabContributesToTotal = true; // Default contribution for a new tab config
                state.pointerEventsMode = 'interactive_except_buttons';
                state.initialLeftPaneFlexBasis = '45%';
            }

            if (!state.shiftStartTime || !(state.shiftStartTime instanceof Date) || isNaN(state.shiftStartTime.getTime())) {
                determineAndSetShiftStartTime(true); // force auto if invalid
            }
            if (!state.selectedLunchOption) { // If still no lunch option after loading main settings
                 setDynamicDefaultLunch();
            }

        } catch (e) {
            logError('Failed to load/parse main settings:', e);
            determineAndSetShiftStartTime(true); // fallback
            setDynamicDefaultLunch(); // fallback
        }
        readAllTabsDataFromLocalStorage(true); // Load multi-tab data, true for initial load
    }

    function writeCurrentTabDataToLocalStorage() {
        if (!state.currentTabId) { logError("Cannot write tab data: currentTabId is not set."); return; }
        try {
            const tabData = {
                tabId: state.currentTabId,
                modeName: state.currentTabMode.name,
                clicks: state.clicksForThisTab,
                lastActionTimestamp: state.lastActionTimestampForThisTab,
                contributesToTotal: state.currentTabContributesToTotal,
                timestamp: Date.now()
            };
            localStorage.setItem(CONFIG.MULTI_TAB_STORAGE_PREFIX + state.currentTabId, JSON.stringify(tabData));
            logDebug('Tab data written to localStorage:', state.currentTabId, tabData);
        } catch (e) { logError('Error writing tab data to localStorage:', e); }
    }

    function readAllTabsDataFromLocalStorage(isInitialLoad = false) {
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
                                logDebug(`Data for tab ${itemData.tabId} is stale. Removing from localStorage.`);
                                localStorage.removeItem(key); continue;
                            }
                            if (itemData.tabId === state.currentTabId) {
                                if (isInitialLoad) {
                                    state.clicksForThisTab = parseInt(itemData.clicks, 10) || 0;
                                    state.lastActionTimestampForThisTab = parseInt(itemData.lastActionTimestamp, 10) || Date.now();
                                    // state.currentTabContributesToTotal is loaded from main settings, not this multi-tab record.
                                    logInfo(`Restored click data for current tab ${state.currentTabId} from multi-tab storage: Clicks=${state.clicksForThisTab}`);
                                }
                                // Update its entry in otherTabsData with current clicks and contribution status
                                newOtherTabsData[itemData.tabId] = { ...itemData, clicks: state.clicksForThisTab, contributesToTotal: state.currentTabContributesToTotal };
                            } else {
                                newOtherTabsData[itemData.tabId] = itemData;
                            }
                        } catch (parseError) { logError(`Error parsing localStorage key ${key}:`, parseError); localStorage.removeItem(key); }
                    }
                }
            }
        } catch (e) { logError('Error reading from localStorage during multi-tab sync:', e); }

        state.otherTabsData = newOtherTabsData;
        // Recalculate global total clicks based on the freshly read/updated otherTabsData
        state.globalTotalClicks = Object.values(state.otherTabsData)
                                   .filter(td => td.contributesToTotal)
                                   .reduce((sum, td) => sum + (parseInt(td.clicks, 10) || 0), 0);

        logDebug('Multi-tab sync complete. Other tabs data:', state.otherTabsData, 'Global total clicks:', state.globalTotalClicks);
        if (!isInitialLoad) updateStatistics(); // Avoid double update if called from loadDataFromStorage
        updateOtherTabsSettingsDisplay(); // Update checkboxes in settings
    }

    function updateOtherTabsSettingsDisplay() {
        const container = state.domElements.otherTabsSettingsContainer; if (!container) return;
        container.innerHTML = '';
        const checkboxLabelStyle = { display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '0.85em', color: 'rgba(255,255,255,0.75)', margin:'4px 0'};
        const checkboxStyle = { marginRight: '8px', transform: 'scale(1.15)', accentColor: CONFIG.MAIN_ACCENT_COLOR};
        const otherTabs = Object.values(state.otherTabsData).filter(td => td.tabId !== state.currentTabId);

        if (otherTabs.length === 0) {
            container.appendChild(createDOMElement('p', {textContent: '(No other active helper tabs detected)', style: {opacity:'0.6', fontStyle:'italic', fontSize:'0.85em'}}));
            return;
        }
        otherTabs.forEach(tabData => {
            const checkboxId = `contribToggle_${tabData.tabId.replace(/[^a-zA-Z0-9]/g, '_')}`;
            const label = createDOMElement('label', { for: checkboxId, style: checkboxLabelStyle });
            const checkbox = createDOMElement('input', { type: 'checkbox', id: checkboxId, checked: tabData.contributesToTotal || false, style: checkboxStyle, dataset: { tabIdTarget: tabData.tabId } });
            checkbox.addEventListener('change', (e) => {
                const targetTabId = e.target.dataset.tabIdTarget;
                const isChecked = e.target.checked;
                const otherTabStorageKey = CONFIG.MULTI_TAB_STORAGE_PREFIX + targetTabId;
                try {
                    const otherTabStoredJson = localStorage.getItem(otherTabStorageKey);
                    if (otherTabStoredJson) {
                        const otherTabStoredData = JSON.parse(otherTabStoredJson);
                        otherTabStoredData.contributesToTotal = isChecked;
                        otherTabStoredData.timestamp = Date.now();
                        localStorage.setItem(otherTabStorageKey, JSON.stringify(otherTabStoredData));
                        logInfo(`Contribution flag for tab ${targetTabId} updated to ${isChecked}.`);
                        // Optimistically update local state & re-read all to reflect changes immediately
                        if(state.otherTabsData[targetTabId]) state.otherTabsData[targetTabId].contributesToTotal = isChecked;
                        readAllTabsDataFromLocalStorage(false);
                    } else { logError(`Could not find localStorage data for tab ${targetTabId}.`);}
                } catch (err) { logError('Error updating contribution for other tab:', err); }
            });
            label.append(checkbox, `Tab: ${tabData.modeName || tabData.tabId.substring(0,20)+'...'} (${tabData.clicks} items)`);
            container.appendChild(label);
        });
    }

    function formatDateToHHMM(dateObj, includeSeconds = false) {
        if (!dateObj || !(dateObj instanceof Date) || isNaN(dateObj.getTime())) return "N/A";
        const h = String(dateObj.getHours()).padStart(2, '0');
        const m = String(dateObj.getMinutes()).padStart(2, '0');
        if (includeSeconds) { const s = String(dateObj.getSeconds()).padStart(2, '0'); return `${h}:${m}:${s}`; }
        return `${h}:${m}`;
    }

    function formatMsToDuration(ms, includeSeconds = false) {
        if (isNaN(ms) || ms < 0) ms = 0;
        let totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        let parts = [];
        if (hours > 0) parts.push(`${String(hours)}h`);
        parts.push(`${String(minutes).padStart(2, '0')}m`);
        if (includeSeconds || (hours === 0 && minutes === 0)) parts.push(`${String(seconds).padStart(2, '0')}s`);
        return parts.join(' ');
    }

    function createDOMElement(tag, attributes = {}, children = []) {
        const element = document.createElement(tag);
        for (const key in attributes) {
            if (key === 'style' && typeof attributes[key] === 'object') Object.assign(element.style, attributes[key]);
            else if (key === 'dataset' && typeof attributes[key] === 'object') Object.assign(element.dataset, attributes[key]);
            else if (['textContent', 'innerHTML', 'value', 'checked', 'disabled', 'type', 'id', 'title', 'placeholder', 'tabIndex', 'src', 'className'].includes(key) ) element[key] = attributes[key];
            else element.setAttribute(key, attributes[key]);
        }
        children.forEach(child => {
            if (child === null || typeof child === 'undefined') return;
            if (typeof child === 'string' || typeof child === 'number') element.appendChild(document.createTextNode(String(child)));
            else if (child instanceof Node) element.appendChild(child);
            else if (Array.isArray(child)) { child.forEach(subChild => { if (subChild === null || typeof subChild === 'undefined') return; if (typeof subChild === 'string' || typeof subChild === 'number') element.appendChild(document.createTextNode(String(subChild))); else if (subChild instanceof Node) element.appendChild(subChild); }); }
        });
        return element;
    }

/* END OF PART 1 (CONFIG, State, Core Utilities, Storage, Tab ID/Mode) */






/* PART 2 */
/*
    In this part (Part 2), we will:
    1.  Define UI state management functions:
        - setUIVisibility: Controls overall visibility of the main UI panel and emergency show button.
        - setSettingsPanelVisibility & toggleSettingsPanelVisibility: Manages visibility of the settings panel.
        - setUILockState & toggleUILockState: Controls interactivity of UI elements (except main clicker/shortcut).
        - updateMainContainerPointerEvents: Central function to apply the selected click-through mode.
        - setInteractiveChildrenPointerEvents: Helper for the above.
        - applyVisibilitySettings: Applies individual show/hide states to UI components.
        - applyDebugInteractiveBordersStyle: Toggles debug borders for clickable areas (renamed from applyDebugPointerEventsStyle).
        - applyThemeToPage: Applies page overlay color and text based on current tab mode.
        - updateUITabIndicator: Updates the tab indicator text within the UI panel.

    2.  Define UI assembly functions (building the DOM structure):
        - buildMainUI: Creates the main container and orchestrates the building of its internal sections.
        - makeButtonInteractive: Adds simple visual feedback to buttons on click.
        - buildEmergencyShowButton: Creates the small button to restore the UI when hidden.
        - buildPageOverlayAndIndicator: Creates the full-page color overlay and its text indicator.
        - startResizePanes, doResize, stopResize: Implement the draggable divider logic for resizable panes.
        - buildSettingsPanel: Creates the settings panel structure (input fields and toggles will be populated by LATER by setInitialUIStates and event handlers).

    Tasks remaining for Part 3:
    1.  Define `setInitialUIStates` to populate all settings fields with loaded/default values AFTER `buildSettingsPanel` has created them.
    2.  Define ALL event handler functions (for clicks, input changes, settings changes, keyboard shortcuts:
        processIncrementForCurrentTab, handleDecrementClick, handleCounterInputDynamic, handleCounterInputChange,
        updateCounterDisplay, handleShiftSettingsChange, updateManualShiftTimeInputVisibility,
        handleLunchSettingChange, handleAutoClickSettingChange, handleSaveCustomTheme, handleResetCustomTheme,
        handlePageKeydown).
    3.  Define core application logic functions (determineAndSetShiftStartTime, updateRealTimeClockDisplay,
        updateLastActionTimerDisplay, updateStatistics, initializeMutationObserver, findElementsContainingText,
        updateTriggerDebugDisplay).
    4.  Define the main `initialize` and `destroy` functions for the script.
    5.  Add the final execution block to start the script.
*/

    // --- ------------------------------------------------------------------------ ---
    // --- ----------------- UI STATE MANAGEMENT FUNCTIONS ---------------------- ---
    // --- ------------------------------------------------------------------------ ---

    function setUIVisibility(visible) {
        state.uiVisible = visible;
        const uiContainer = state.domElements.uiContainer;
        const showButton = state.domElements.emergencyShowButton;

        if (uiContainer) {
            uiContainer.style.opacity = visible ? '1' : '0';
            uiContainer.style.transform = visible ? 'translateY(0)' : 'translateY(20px)';
            // Pointer events are managed by updateMainContainerPointerEvents based on overall state
        }
        if (showButton) {
            showButton.style.display = visible ? 'none' : 'flex';
        }
        if (!visible && state.settingsPanelVisible) {
            setSettingsPanelVisibility(false); // Also hide settings if main UI is hidden
        }
        updateMainContainerPointerEvents(); // Update pointer events based on new visibility
        saveDataToStorage();
    }

    function setSettingsPanelVisibility(visible) {
        state.settingsPanelVisible = visible;
        const panel = state.domElements.settingsPanel;
        const toggleButton = state.domElements.toggleSettingsButton;

        if (panel) {
            panel.style.display = visible ? 'flex' : 'none';
            panel.style.transform = visible ? 'translateX(0%)' : 'translateX(101%)'; // Slide from right
        }
        if (toggleButton) {
            toggleButton.textContent = visible ? CONFIG.TOGGLE_SETTINGS_BUTTON_TEXT_OPENED : CONFIG.TOGGLE_SETTINGS_BUTTON_TEXT_CLOSED;
        }

        updateMainContainerPointerEvents(); // Main UI container might need to become interactive

        if (visible && state.uiLocked) { // Re-apply lock to settings elements if panel opened while locked
            setUILockState(true);
        }
        saveDataToStorage();
    }

    function toggleSettingsPanelVisibility() {
        setSettingsPanelVisibility(!state.settingsPanelVisible);
    }

    function setUILockState(locked) {
        // Cannot lock if UI is completely hidden (unless settings panel is trying to be shown, which is an edge case)
        if (!state.uiVisible && locked && !state.settingsPanelVisible) {
            logDebug("Cannot lock a fully hidden UI.");
            return;
        }
        state.uiLocked = locked;
        const lockButton = state.domElements.lockUIButton;
        if (lockButton) {
            lockButton.textContent = state.uiLocked ? CONFIG.LOCK_UI_BUTTON_TEXT_LOCKED : CONFIG.LOCK_UI_BUTTON_TEXT_UNLOCKED;
        }

        // Define which elements should be affected by the UI lock
        const elementsToLock = [
            state.domElements.toggleSettingsButton,
            state.domElements.emergencyHideButton,
            state.domElements.decrementButton, // Decrement button is locked
            state.domElements.mainCounterInput,  // Counter input field is locked
            state.domElements.divider,          // Resizable divider is locked
        ];

        // If settings panel is visible, also lock its interactive elements (except the close button for settings itself)
        if (state.settingsPanelVisible && state.domElements.settingsPanel) {
            Array.from(state.domElements.settingsPanel.querySelectorAll('input, select, button'))
                .filter(el => el.textContent !== 'Apply & Close') // Don't disable the settings panel's own close button
                .forEach(el => elementsToLock.push(el));
        }

        elementsToLock.forEach(el => {
            if (el) {
                el.disabled = state.uiLocked;
                el.style.opacity = state.uiLocked ? '0.5' : '1';
                el.style.cursor = state.uiLocked ? 'not-allowed' : ((el.tagName === 'BUTTON' || el.tagName === 'SELECT' || el.classList.contains('ph-divider')) ? 'pointer' : 'default');
                if (el.classList.contains('ph-divider')) {
                    el.style.cursor = state.uiLocked ? 'default' : 'ew-resize';
                }
            }
        });

        // Main increment button and keyboard shortcut remain active regardless of UI lock
        if (state.domElements.incrementButton) {
            state.domElements.incrementButton.disabled = false;
            state.domElements.incrementButton.style.opacity = '1';
            state.domElements.incrementButton.style.cursor = 'pointer';
        }
        updateMainContainerPointerEvents(); // Main UI container might need to become interactive if locked
        saveDataToStorage();
    }

    function toggleUILockState() {
        setUILockState(!state.uiLocked);
    }

    function updateMainContainerPointerEvents() {
        const uiContainer = state.domElements.uiContainer;
        if (!uiContainer) return;

        // 1. Settings panel open: Main container must be interactive to interact with settings.
        if (state.settingsPanelVisible) {
            uiContainer.style.pointerEvents = 'auto';
        }
        // 2. Resizing: Main container must be interactive for mouse move events.
        else if (state.isResizing) {
            uiContainer.style.pointerEvents = 'auto';
        }
        // 3. UI Locked: Main container must be interactive for lock/unlock button and settings.
        else if (state.uiLocked) {
            uiContainer.style.pointerEvents = 'auto';
        }
        // 4. UI Visible and Unlocked, Settings Closed, Not Resizing: Apply selected mode.
        else if (state.uiVisible) {
            switch (state.pointerEventsMode) {
                case 'fully_interactive':
                    uiContainer.style.pointerEvents = 'auto';
                    // Ensure all children are also auto, unless specifically set to none
                    setInteractiveChildrenPointerEvents(uiContainer, 'auto', ['all']); // 'all' can be a special keyword
                    break;
                case 'interactive_except_buttons': // Default behavior
                    uiContainer.style.pointerEvents = 'none'; // Main container passes clicks
                    // Specific interactive elements within buildMainUI get 'auto'
                    // This function helps ensure top-level children are correctly set if they also contain interactive stuff.
                    setInteractiveChildrenPointerEvents(uiContainer, 'auto', ['ph-top-controls', 'ph-left-pane', 'ph-divider', 'ph-right-pane', 'ph-bottom-bar']);
                    break;
                case 'fully_transparent':
                    uiContainer.style.pointerEvents = 'none'; // Main container and most children pass clicks
                    setInteractiveChildrenPointerEvents(uiContainer, 'none'); // Make all children 'none'
                    // Only the very top controls (settings, lock, close) should remain clickable
                    if (state.domElements.topControls) state.domElements.topControls.style.pointerEvents = 'auto';
                    break;
                default: // Fallback to 'interactive_except_buttons'
                    uiContainer.style.pointerEvents = 'none';
                    setInteractiveChildrenPointerEvents(uiContainer, 'auto', ['ph-top-controls', 'ph-left-pane', 'ph-divider', 'ph-right-pane', 'ph-bottom-bar']);
            }
        }
        // 5. UI Hidden: Main container is not interactive.
        else {
            uiContainer.style.pointerEvents = 'none';
        }
        applyDebugInteractiveBordersStyle(); // Re-apply debug borders
    }

    function setInteractiveChildrenPointerEvents(container, eventStyle, interactiveSelectors = []) {
        if (!container || !container.children) return;
        Array.from(container.children).forEach(child => {
            // Skip the settings panel itself as it's handled separately
            if (child.id === CONFIG.SETTINGS_PANEL_ID) return;

            let childShouldBeAuto = false;
            if (eventStyle === 'auto') {
                if (interactiveSelectors.includes('all')) {
                    childShouldBeAuto = true;
                } else {
                    interactiveSelectors.forEach(selector => {
                        if (child.classList.contains(selector) || child.id === selector || child.tagName === selector.toUpperCase()) {
                            childShouldBeAuto = true;
                        }
                    });
                }
            }

            child.style.pointerEvents = childShouldBeAuto ? 'auto' : eventStyle;

            // For elements that should always be interactive regardless of mode (like topControls)
            if (child === state.domElements.topControls) {
                child.style.pointerEvents = 'auto';
            }
        });
    }


    function applyVisibilitySettings() {
        if (state.domElements.realTimeClock) state.domElements.realTimeClock.style.display = state.showClock ? 'block' : 'none';
        if (state.domElements.statsTextSummary) state.domElements.statsTextSummary.style.display = state.showStats ? 'block' : 'none';
        if (state.domElements.lastActionTimerDisplay) state.domElements.lastActionTimerDisplay.style.display = state.showLastActionTimer ? 'block' : 'none';
        if (state.domElements.uiTabIndicatorText) state.domElements.uiTabIndicatorText.style.display = state.showUITabIndicator ? 'block' : 'none';
        if (state.domElements.triggerDebugDisplay) state.domElements.triggerDebugDisplay.style.display = state.showTriggerDebug ? 'block' : 'none';
        applyThemeToPage(); // This will also handle page overlay visibility
    }

    function applyDebugInteractiveBordersStyle() {
        const interactiveElementsQuery = `#${CONFIG.UI_CONTAINER_ID} button, #${CONFIG.UI_CONTAINER_ID} input, #${CONFIG.UI_CONTAINER_ID} select, #${CONFIG.UI_CONTAINER_ID} textarea, .ph-divider`;
        const allPotentialElements = document.querySelectorAll(`#${CONFIG.UI_CONTAINER_ID}, #${CONFIG.UI_CONTAINER_ID} *`);

        allPotentialElements.forEach(el => { // Reset all outlines first
            el.style.outline = '';
            el.style.outlineOffset = '';
        });

        if (state.debugInteractiveBorders) {
            // Highlight elements that are *computed* to be interactive
            document.querySelectorAll(interactiveElementsQuery).forEach(el => {
                if (getComputedStyle(el).pointerEvents !== 'none') {
                    el.style.outline = '1px dashed red';
                    el.style.outlineOffset = '1px';
                }
            });
            // Special highlight for main container based on its pointer-events status
            const uiContainer = state.domElements.uiContainer;
            if (uiContainer) {
                const containerPE = getComputedStyle(uiContainer).pointerEvents;
                uiContainer.style.outline = containerPE === 'none' ? '2px solid blue' : '2px solid green';
                uiContainer.style.outlineOffset = '-2px'; // Inside to see container bounds
                 logDebug(`UI Container pointer-events: ${containerPE}, outline: ${uiContainer.style.outline}`);
            }
        }
    }

    function applyThemeToPage() {
        const mode = state.customTabThemes[state.currentTabFullUrl] || state.currentTabMode;

        if (state.domElements.pageColorOverlay) {
            state.domElements.pageColorOverlay.style.backgroundColor = mode.color;
            state.domElements.pageColorOverlay.style.display = state.showPageOverlay ? 'block' : 'none';
        }
        if (state.domElements.pageIndicatorText) {
            state.domElements.pageIndicatorText.textContent = mode.name.substring(0, 10).toUpperCase();
            state.domElements.pageIndicatorText.style.color = mode.textColor;
            state.domElements.pageIndicatorText.style.display = state.showPageOverlay ? 'block' : 'none';
        }
        // Main UI background and border can also be themed if desired, or kept separate
        // if (state.domElements.uiContainer) {
        //     state.domElements.uiContainer.style.backgroundColor = CONFIG.UI_BACKGROUND_COLOR; // or mode.uiColor?
        // }
    }

    function updateUITabIndicator() {
        if(state.domElements.uiTabIndicatorText) {
            const mode = state.customTabThemes[state.currentTabFullUrl] || state.currentTabMode;
            state.domElements.uiTabIndicatorText.textContent = mode.name;
            state.domElements.uiTabIndicatorText.style.color = mode.textColor || CONFIG.UI_TEXT_COLOR; // Fallback
        }
        if(state.domElements.settingsPanel) { // Update heading in settings panel too
            const heading = state.domElements.settingsPanel.querySelector('h4[textContent^="Customize This Tab"]');
            if(heading) heading.textContent = `Customize This Tab (${state.currentTabMode.name || 'Identifier'})`;
        }
    }


    // --- ------------------------------------------------------------------------ ---
    // --- ----------------------- UI ELEMENT ASSEMBLY -------------------------- ---
    // --- ------------------------------------------------------------------------ ---

    function buildMainUI() { /* ... (Full definition as provided in previous response, with classNames like 'ph-top-controls') ... */
        if (document.getElementById(CONFIG.UI_CONTAINER_ID)) { logError('UI container already exists.'); return; }
        const uiContainer = createDOMElement('div', { id: CONFIG.UI_CONTAINER_ID, style: { position: 'fixed', bottom: CONFIG.UI_BOTTOM_OFFSET, right: CONFIG.UI_RIGHT_OFFSET, width: `${CONFIG.UI_WIDTH_PERCENT_VIEWPORT}vw`, height: `${CONFIG.UI_HEIGHT_PERCENT_VIEWPORT}vh`, minWidth: `${CONFIG.UI_MIN_WIDTH_PX}px`, minHeight: `${CONFIG.UI_MIN_HEIGHT_PX}px`, backgroundColor: CONFIG.UI_BACKGROUND_COLOR, border: CONFIG.UI_BORDER_COLOR === 'rgba(0, 0, 0, 0.0)' ? 'none' : `1px solid ${CONFIG.UI_BORDER_COLOR}`, borderRadius: '0px', boxSizing: 'border-box', color: CONFIG.UI_TEXT_COLOR, fontFamily: CONFIG.FONT_FAMILY, zIndex: '2147483640', display: 'flex', flexDirection: 'column', padding: '8px 12px', overflow: 'hidden', boxShadow: CONFIG.UI_BACKGROUND_COLOR === 'rgba(0, 0, 0, 0.0)' ? 'none' : '0 2px 10px rgba(0,0,0,0.15)', transition: 'opacity 0.3s ease-out, transform 0.3s ease-out, width 0.2s ease, height 0.2s ease', /* pointerEvents managed by updateMainContainerPointerEvents() */ } });
        state.domElements.uiContainer = uiContainer;
        state.domElements.topControls = createDOMElement('div', { className: 'ph-top-controls', style: { display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '5px', flexShrink: 0, pointerEvents: 'auto' } });
        const controlButtonBaseStyle = { cursor: 'pointer', background: 'none', border: 'none', color: CONFIG.UI_TEXT_COLOR, borderRadius: '3px', padding: '3px 7px', fontSize: '0.75em', marginLeft: '8px', opacity: '0.6', transition: 'opacity 0.2s' };
        controlButtonBaseStyle[':hover'] = { opacity: '1' };
        state.domElements.toggleSettingsButton = createDOMElement('button', { id: CONFIG.TOGGLE_SETTINGS_BUTTON_ID, textContent: CONFIG.TOGGLE_SETTINGS_BUTTON_TEXT_CLOSED, title: 'Open/Close Settings', style: {...controlButtonBaseStyle} });
        state.domElements.toggleSettingsButton.addEventListener('click', toggleSettingsPanelVisibility);
        state.domElements.lockUIButton = createDOMElement('button', { id: 'lockProdUIBtn_v3_3', textContent: CONFIG.LOCK_UI_BUTTON_TEXT_UNLOCKED, title: 'Lock/Unlock UI', style: {...controlButtonBaseStyle} });
        state.domElements.lockUIButton.addEventListener('click', toggleUILockState);
        state.domElements.emergencyHideButton = createDOMElement('button', { id: 'hideProdUIBtn_v3_3', textContent: CONFIG.EMERGENCY_HIDE_BUTTON_TEXT, title: 'Hide UI Panel', style: { ...controlButtonBaseStyle, color: CONFIG.LAST_ACTION_TIMER_WARN_COLOR, fontWeight: 'bold' } });
        state.domElements.emergencyHideButton.addEventListener('click', () => setUIVisibility(false));
        state.domElements.topControls.append(state.domElements.toggleSettingsButton, state.domElements.lockUIButton, state.domElements.emergencyHideButton);
        uiContainer.appendChild(state.domElements.topControls);
        const mainContentArea = createDOMElement('div', { className: 'ph-main-content-area', style: { display: 'flex', flexGrow: 1, overflow: 'hidden', position: 'relative' } });
        state.domElements.leftPane = createDOMElement('div', { className: 'ph-left-pane', style: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexBasis: state.initialLeftPaneFlexBasis || '45%', minWidth: `${CONFIG.LEFT_PANE_MIN_WIDTH_PERCENT}%`, overflow: 'hidden', paddingRight: `${CONFIG.DIVIDER_WIDTH_PX / 2}px`, position: 'relative', pointerEvents: 'auto' } });
        state.domElements.mainCounterInput = createDOMElement('input', { type: 'number', id: CONFIG.MAIN_COUNTER_INPUT_ID, value: state.clicksForThisTab, style: { fontSize: `${CONFIG.MAIN_COUNTER_FONT_SIZE_INITIAL_EM}em`, fontWeight: '300', color: CONFIG.UI_TEXT_COLOR, opacity: '0.9', marginBottom: '15px', textAlign: 'center', background: 'none', border: 'none', width: 'auto', minWidth: '70px', outline: 'none', padding: '0 5px', pointerEvents: 'auto' } });
        state.domElements.mainCounterInput.addEventListener('change', handleCounterInputChange);
        state.domElements.mainCounterInput.addEventListener('input', handleCounterInputDynamic);
        const clickerButtonsContainer = createDOMElement('div', { style: { display: 'flex', alignItems: 'center', pointerEvents: 'auto'} });
        const clickerBtnSharedStyle = { cursor: 'pointer', border: 'none', borderRadius: '6px', boxShadow: 'none', transition: 'transform 0.1s, background-color 0.15s', pointerEvents: 'auto', color: CONFIG.UI_TEXT_COLOR, opacity: '0.6', display: 'flex', alignItems: 'center', justifyContent: 'center' };
        if (CONFIG.SHOW_DECREMENT_BUTTON) { state.domElements.decrementButton = createDOMElement('button', { id: CONFIG.CLICKER_DECREMENT_BUTTON_ID, textContent: '–', title: 'Decrement (-1)', style: { ...clickerBtnSharedStyle, backgroundColor: CONFIG.CLICKER_DECREMENT_BUTTON_COLOR, marginRight: '15px', fontSize: '1.5em', width:'40px', height:'40px' } }); state.domElements.decrementButton.addEventListener('click', handleDecrementClick); makeButtonInteractive(state.domElements.decrementButton); clickerButtonsContainer.appendChild(state.domElements.decrementButton); }
        state.domElements.incrementButton = createDOMElement('button', { id: CONFIG.CLICKER_INCREMENT_BUTTON_ID, textContent: '+', title: `Increment (+1) or ${CONFIG.INCREMENT_KEYBOARD_SHORTCUT_CODE}`, style: { ...clickerBtnSharedStyle, backgroundColor: CONFIG.CLICKER_INCREMENT_BUTTON_COLOR, fontSize: '2.2em', width:'60px', height:'60px', padding: CONFIG.SHOW_DECREMENT_BUTTON ? '0' : '0' } });
        state.domElements.incrementButton.addEventListener('click', (event) => processIncrementForCurrentTab(true, event)); makeButtonInteractive(state.domElements.incrementButton); clickerButtonsContainer.appendChild(state.domElements.incrementButton);
        state.domElements.leftPane.append(state.domElements.mainCounterInput, clickerButtonsContainer);
        state.domElements.divider = createDOMElement('div', { className: 'ph-divider', style: { width: `${CONFIG.DIVIDER_WIDTH_PX}px`, cursor: 'ew-resize', flexShrink: 0, pointerEvents: 'auto', display: 'flex', alignItems:'center', justifyContent: 'center', backgroundColor: `${CONFIG.MAIN_ACCENT_COLOR}22` } });
        state.domElements.divider.addEventListener('mousedown', startResizePanes);
        state.domElements.rightPane = createDOMElement('div', { className: 'ph-right-pane', style: { display: 'flex', flexDirection: 'column', flexGrow: 1, overflowY: 'auto', pointerEvents: 'auto', paddingLeft: `${CONFIG.DIVIDER_WIDTH_PX / 2}px`, minWidth: `${CONFIG.RIGHT_PANE_MIN_WIDTH_PERCENT}%`, } });
        state.domElements.statsTextSummary = createDOMElement('div', { id: CONFIG.STATS_TEXT_SUMMARY_ID, style: { fontSize: `${CONFIG.STATS_FONT_SIZE_EM}em`, lineHeight: '1.5', marginBottom: '8px', pointerEvents: 'auto' } });
        state.domElements.lastActionTimerDisplay = createDOMElement('div', { id: CONFIG.LAST_ACTION_TIMER_ID, textContent: 'Last: 00s', style: { fontSize: `${CONFIG.STATS_FONT_SIZE_EM * 0.9}em`, marginTop: '5px', opacity: '0.8', pointerEvents: 'none' } });
        state.domElements.triggerDebugDisplay = createDOMElement('div', { id: CONFIG.TRIGGER_DEBUG_DISPLAY_ID, style: { fontSize: `${CONFIG.STATS_FONT_SIZE_EM * 0.8}em`, marginTop: '10px', borderTop: `1px dashed ${CONFIG.UI_TEXT_COLOR}22`, paddingTop: '5px', display: 'none', maxHeight: '50px', overflowY: 'auto', opacity: '0.7', pointerEvents: 'auto', wordBreak: 'break-all'} });
        state.domElements.triggerDebugDisplay.innerHTML = 'Trigger Debug: Waiting...';
        state.domElements.rightPane.append(state.domElements.statsTextSummary, state.domElements.lastActionTimerDisplay, state.domElements.triggerDebugDisplay);
        mainContentArea.append(state.domElements.leftPane, state.domElements.divider, state.domElements.rightPane);
        uiContainer.appendChild(mainContentArea);
        const bottomInfoBar = createDOMElement('div', { className: 'ph-bottom-bar', style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto', paddingTop: '5px', flexShrink: 0, borderTop: `1px solid ${CONFIG.UI_TEXT_COLOR}1A`, pointerEvents: 'none' } });
        state.domElements.uiTabIndicatorText = createDOMElement('div', { id: CONFIG.UI_TAB_INDICATOR_TEXT_ID, textContent: state.currentTabMode.name, style: { fontSize: `${CONFIG.UI_TAB_INDICATOR_FONT_SIZE_EM}em`, fontWeight: '500', color: state.currentTabMode.textColor || CONFIG.UI_TEXT_COLOR, opacity: 0.5, pointerEvents: 'auto' } });
        state.domElements.realTimeClock = createDOMElement('div', { id: CONFIG.CLOCK_DISPLAY_ID, textContent: '00:00:00', style: { fontSize: `${CONFIG.CLOCK_FONT_SIZE_EM}em`, fontFamily: 'monospace', color: CONFIG.UI_TEXT_COLOR, opacity: '0.3', pointerEvents: 'none' } });
        bottomInfoBar.append(state.domElements.uiTabIndicatorText, state.domElements.realTimeClock);
        uiContainer.appendChild(bottomInfoBar);
        buildSettingsPanel(); uiContainer.appendChild(state.domElements.settingsPanel);
        buildPageOverlayAndIndicator(); document.body.appendChild(state.domElements.pageColorOverlay); document.body.appendChild(state.domElements.pageIndicatorText);
        buildEmergencyShowButton(); document.body.appendChild(state.domElements.emergencyShowButton);
        setInitialUIStates(); // This populates settings and applies initial visibility based on state
        // Initial pointer events mode must be applied after all elements exist
        updateMainContainerPointerEvents();
        applyDebugInteractiveBordersStyle(); // Apply debug borders based on initial state
        logInfo('Main UI v3.3 (Intl) built.');
    }

    function makeButtonInteractive(button) { if (!button) return; button.addEventListener('mousedown', e => { e.preventDefault(); button.style.transform = 'scale(0.95)'; }); button.addEventListener('mouseup', () => button.style.transform = 'scale(1)'); button.addEventListener('mouseleave', () => button.style.transform = 'scale(1)'); }
    
    function buildEmergencyShowButton() { state.domElements.emergencyShowButton = createDOMElement('button', { id: 'emergencyShowBtn_v3_3', textContent: CONFIG.EMERGENCY_SHOW_BUTTON_TEXT, title: 'Show UI Panel', style: { position: 'fixed', bottom: CONFIG.UI_BOTTOM_OFFSET, right: CONFIG.UI_RIGHT_OFFSET, width: CONFIG.EMERGENCY_SHOW_BUTTON_SIZE, height: CONFIG.EMERGENCY_SHOW_BUTTON_SIZE, backgroundColor: 'rgba(80,80,100,0.2)', border: `1px solid rgba(128,128,128,0.3)`, color: CONFIG.UI_TEXT_COLOR, borderRadius: '50%', cursor: 'pointer', display: 'none', alignItems: 'center', justifyContent: 'center', zIndex: '2147483646', opacity: String(CONFIG.EMERGENCY_SHOW_BUTTON_OPACITY), transition: 'opacity 0.2s ease, transform 0.1s ease, background-color 0.2s', fontSize: '16px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', pointerEvents: 'auto' } }); state.domElements.emergencyShowButton.onmouseover = () => { state.domElements.emergencyShowButton.style.opacity = '1'; state.domElements.emergencyShowButton.style.transform = 'scale(1.1)'; state.domElements.emergencyShowButton.style.backgroundColor = CONFIG.MAIN_ACCENT_COLOR; }; state.domElements.emergencyShowButton.onmouseout = () => { state.domElements.emergencyShowButton.style.opacity = String(CONFIG.EMERGENCY_SHOW_BUTTON_OPACITY); state.domElements.emergencyShowButton.style.transform = 'scale(1)'; state.domElements.emergencyShowButton.style.backgroundColor = 'rgba(80,80,100,0.2)'; }; state.domElements.emergencyShowButton.onclick = () => setUIVisibility(true); document.body.appendChild(state.domElements.emergencyShowButton); }
    
    function buildPageOverlayAndIndicator() { state.domElements.pageColorOverlay = createDOMElement('div', { id: CONFIG.PAGE_COLOR_OVERLAY_ID, style: { position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh', backgroundColor: state.currentTabMode.color, zIndex: '2147483630', pointerEvents: 'none', display: state.showPageOverlay ? 'block' : 'none', transition: 'background-color 0.3s ease' } }); state.domElements.pageIndicatorText = createDOMElement('div', { id: CONFIG.PAGE_INDICATOR_TEXT_ID, textContent: state.currentTabMode.name, style: { position: 'fixed', top: '50%', right: '30px', transform: 'translateY(-50%)', fontSize: `${CONFIG.PAGE_INDICATOR_FONT_SIZE_PX}px`, fontWeight: 'bold', color: state.currentTabMode.textColor, opacity: 0.8, zIndex: '2147483631', pointerEvents: 'none', display: state.showPageOverlay ? 'block' : 'none', textShadow: '0 0 5px rgba(0,0,0,0.3)', writingMode: 'vertical-rl', textOrientation: 'mixed', transition: 'color 0.3s ease, opacity 0.3s ease' } });}
    
    function startResizePanes(e) { e.preventDefault(); state.isResizing = true; updateMainContainerPointerEvents(); const mainArea = state.domElements.leftPane.parentElement; const initialMouseX = e.clientX; const initialLeftPaneWidth = state.domElements.leftPane.offsetWidth; const totalWidth = mainArea.offsetWidth - CONFIG.DIVIDER_WIDTH_PX; const doResize = (moveEvent) => { if (!state.isResizing) return; const dx = moveEvent.clientX - initialMouseX; let newLeftWidth = initialLeftPaneWidth + dx; const minLeft = totalWidth * (CONFIG.LEFT_PANE_MIN_WIDTH_PERCENT / 100); const minRight = totalWidth * (CONFIG.RIGHT_PANE_MIN_WIDTH_PERCENT / 100); if (newLeftWidth < minLeft) newLeftWidth = minLeft; if (newLeftWidth > totalWidth - minRight) newLeftWidth = totalWidth - minRight; const newLeftFlexBasis = (newLeftWidth / totalWidth) * 100; state.domElements.leftPane.style.flexBasis = `${newLeftFlexBasis}%`; }; const stopResize = () => { if (!state.isResizing) return; state.isResizing = false; document.removeEventListener('mousemove', doResize); document.removeEventListener('mouseup', stopResize); updateMainContainerPointerEvents(); saveDataToStorage(); }; document.addEventListener('mousemove', doResize); document.addEventListener('mouseup', stopResize); }

/* END OF PART 2 (UI State Management & UI Assembly Start) */









/* PART 3 */
/*
    In this FINAL part (Part 3), we will:
    1.  Complete the `buildSettingsPanel` function with all its configuration options, including
        the new Pointer Events Mode select and custom tab theme inputs.
    2.  Define `setInitialUIStates` to correctly populate all UI elements (especially in the
        settings panel) with values from the loaded state or defaults.
    3.  Define ALL event handler functions:
        - For clicker: processIncrementForCurrentTab, handleDecrementClick.
        - For counter input: handleCounterInputDynamic, handleCounterInputChange, updateCounterDisplay.
        - For settings: handleShiftSettingsChange, updateManualShiftTimeInputVisibility,
          handleLunchSettingChange, handleAutoClickSettingChange, handleSaveCustomTheme,
          handleResetCustomTheme, and handlers for all new visibility/mode toggles.
        - For keyboard: handlePageKeydown.
    4.  Define core application logic functions:
        - determineAndSetShiftStartTime: Calculates shift start.
        - updateRealTimeClockDisplay: Updates the clock.
        - updateLastActionTimerDisplay: Updates timer since last action.
        - updateStatistics: Calculates and displays all statistics.
        - initializeMutationObserver, findElementsContainingText, updateTriggerDebugDisplay: For 'wysłano' trigger.
    5.  Define the main `initialize` function to orchestrate script startup.
    6.  Define the `destroy` function for cleanup.
    7.  Add the final execution block to start the script.
*/

    // --- ------------------------------------------------------------------------ ---
    // --- ----------------------- UI ELEMENT ASSEMBLY (Continued)----------------- ---
    // --- ------------------------------------------------------------------------ ---

    function buildSettingsPanel() {
        const panel = createDOMElement('div', {
            id: CONFIG.SETTINGS_PANEL_ID,
            style: {
                position: 'absolute', top: '0px', right: '0px', bottom: '0px',
                width: 'clamp(320px, 60%, 500px)', // Responsive width
                backgroundColor: `rgba(35, 40, 50, 0.98)`,
                borderLeft: `2px solid ${CONFIG.MAIN_ACCENT_COLOR}`,
                padding: '15px 20px', zIndex: '1000', display: 'none', flexDirection: 'column',
                gap: '12px', overflowY: 'auto', boxShadow: '-10px 0px 25px rgba(0,0,0,0.3)',
                transition: 'transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
                pointerEvents: 'auto' // Settings panel is always interactive when visible
            }
        });
        state.domElements.settingsPanel = panel;

        const heading = createDOMElement('h3', { textContent: 'Settings', style: { margin: '0 0 15px 0', textAlign: 'center', color: 'white', fontSize: '1.3em'} });
        panel.appendChild(heading);

        // Common styles for form elements in settings
        const commonSelectStyle = {width: '100%', padding: '8px', boxSizing: 'border-box', backgroundColor: 'rgba(0,0,0,0.35)', color: 'white', border: `1px solid ${CONFIG.MAIN_ACCENT_COLOR}bb`, borderRadius: '4px', fontSize: '0.9em'};
        const commonInputStyle = {...commonSelectStyle, type: 'text'};
        const commonLabelStyle = { display: 'block', marginBottom: '4px', fontSize: '0.9em', color: 'rgba(255,255,255,0.8)'};
        const checkboxLabelStyle = { display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '0.9em', color: 'rgba(255,255,255,0.8)', margin: '6px 0'};
        const checkboxStyle = { marginRight: '8px', transform: 'scale(1.25)', accentColor: CONFIG.MAIN_ACCENT_COLOR};
        const sectionHeadingStyle = {margin: '18px 0 10px 0', color: 'white', fontSize: '1.05em', borderBottom: '1px solid rgba(255,255,255,0.25)', paddingBottom: '6px'};

        // --- Pointer Events Mode ---
        panel.appendChild(createDOMElement('h4', {textContent: 'Mouse Click-Through Mode', style: sectionHeadingStyle}));
        const peGroup = createDOMElement('div');
        peGroup.appendChild(createDOMElement('label', { for: CONFIG.SETTINGS_POINTER_EVENTS_MODE_SELECT_ID, textContent: 'Panel Click Behavior:', style: commonLabelStyle }));
        state.domElements.pointerEventsModeSelect = createDOMElement('select', { id: CONFIG.SETTINGS_POINTER_EVENTS_MODE_SELECT_ID, style: commonSelectStyle });
        [
            {value: 'fully_interactive', text: 'Fully Interactive (Blocks Background Clicks)'},
            {value: 'interactive_except_buttons', text: 'Default (Panel Transparent, UI Buttons Active)'},
            {value: 'fully_transparent', text: 'Fully Click-Through (Keyboard/Auto Only)'}
        ].forEach(opt => state.domElements.pointerEventsModeSelect.add(new Option(opt.text, opt.value)));
        // Value will be set in setInitialUIStates
        state.domElements.pointerEventsModeSelect.addEventListener('change', (e) => {
            state.pointerEventsMode = e.target.value;
            updateMainContainerPointerEvents();
            saveDataToStorage();
        });
        peGroup.appendChild(state.domElements.pointerEventsModeSelect);
        panel.appendChild(peGroup);


        // --- Shift & Lunch Section ---
        panel.appendChild(createDOMElement('h4', {textContent: 'Shift & Lunch', style: sectionHeadingStyle}));
        const shiftTypeGroup = createDOMElement('div');
        shiftTypeGroup.appendChild(createDOMElement('label', { for: CONFIG.SETTINGS_SHIFT_TYPE_SELECT_ID, textContent: 'Shift Type:', style: commonLabelStyle }));
        state.domElements.settingsShiftTypeSelect = createDOMElement('select', { id: CONFIG.SETTINGS_SHIFT_TYPE_SELECT_ID, style: commonSelectStyle });
        state.domElements.settingsShiftTypeSelect.addEventListener('change', handleShiftSettingsChange);
        shiftTypeGroup.appendChild(state.domElements.settingsShiftTypeSelect);
        panel.appendChild(shiftTypeGroup);

        const shiftStartTimeGroup = createDOMElement('div',{style:{marginTop:'8px'}});
        shiftStartTimeGroup.appendChild(createDOMElement('label', { for: CONFIG.SETTINGS_SHIFT_START_TIME_INPUT_ID, textContent: 'Shift Start Time (manual):', style: commonLabelStyle }));
        state.domElements.settingsShiftStartTimeInput = createDOMElement('input', { type: 'time', id: CONFIG.SETTINGS_SHIFT_START_TIME_INPUT_ID, style: commonSelectStyle });
        state.domElements.settingsShiftStartTimeInput.addEventListener('change', handleShiftSettingsChange);
        shiftStartTimeGroup.appendChild(state.domElements.settingsShiftStartTimeInput);
        panel.appendChild(shiftStartTimeGroup);

        const lunchGroup = createDOMElement('div',{style:{marginTop:'8px'}});
        lunchGroup.appendChild(createDOMElement('label', { for: CONFIG.SETTINGS_LUNCH_TIME_SELECT_ID, textContent: 'Lunch Break:', style: commonLabelStyle }));
        state.domElements.settingsLunchSelect = createDOMElement('select', { id: CONFIG.SETTINGS_LUNCH_TIME_SELECT_ID, style: commonSelectStyle });
        state.domElements.settingsLunchSelect.addEventListener('change', handleLunchSettingChange);
        lunchGroup.appendChild(state.domElements.settingsLunchSelect);
        panel.appendChild(lunchGroup);

        // --- Automation & Trigger Section ---
        panel.appendChild(createDOMElement('h4', {textContent: 'Automation', style: sectionHeadingStyle}));
        const autoClickLabel = createDOMElement('label', { style: checkboxLabelStyle });
        state.domElements.autoClickEnabledCheckbox = createDOMElement('input', { type: 'checkbox', id: CONFIG.AUTO_CLICK_ENABLED_CHECKBOX_ID, style: checkboxStyle }); // Checked state from setInitialUIStates
        state.domElements.autoClickEnabledCheckbox.addEventListener('change', handleAutoClickSettingChange);
        autoClickLabel.append(state.domElements.autoClickEnabledCheckbox, `Auto-Increment (trigger: "${CONFIG.AUTO_CLICK_TRIGGER_WORD}")`);
        panel.appendChild(autoClickLabel);

        // --- UI Element Visibility Section ---
        panel.appendChild(createDOMElement('h4', {textContent: 'UI Element Visibility', style: sectionHeadingStyle}));
        const visControls = [
            { stateKey: 'showClock', id: CONFIG.SETTINGS_SHOW_CLOCK_CHECKBOX_ID, label: 'Show Real-time Clock' },
            { stateKey: 'showStats', id: CONFIG.SETTINGS_SHOW_STATS_CHECKBOX_ID, label: 'Show Statistics Text' },
            { stateKey: 'showLastActionTimer', id: CONFIG.SETTINGS_SHOW_LAST_ACTION_TIMER_CHECKBOX_ID, label: 'Show Last Action Timer' },
            { stateKey: 'showUITabIndicator', id: CONFIG.SETTINGS_SHOW_UI_TAB_INDICATOR_CHECKBOX_ID, label: 'Show Tab ID in Panel' },
            { stateKey: 'showPageOverlay', id: CONFIG.SETTINGS_SHOW_PAGE_OVERLAY_CHECKBOX_ID, label: 'Show Full Page Color Overlay & Text' },
            { stateKey: 'showTriggerDebug', id: CONFIG.SETTINGS_SHOW_TRIGGER_DEBUG_CHECKBOX_ID, label: 'Show Trigger Debug Info' }
        ];
        visControls.forEach(vc => {
            const label = createDOMElement('label', { style: checkboxLabelStyle});
            state.domElements[vc.stateKey + 'Checkbox'] = createDOMElement('input', {type: 'checkbox', id: vc.id, style: checkboxStyle}); // Checked state from setInitialUIStates
            state.domElements[vc.stateKey + 'Checkbox'].addEventListener('change', (e) => { state[vc.stateKey] = e.target.checked; applyVisibilitySettings(); saveDataToStorage(); });
            label.append(state.domElements[vc.stateKey + 'Checkbox'], vc.label);
            panel.appendChild(label);
        });

        // --- Debugging Section ---
        panel.appendChild(createDOMElement('h4', {textContent: 'Debugging', style: sectionHeadingStyle}));
        const debugPointerLabel = createDOMElement('label', { style: checkboxLabelStyle });
        state.domElements.debugInteractiveBordersCheckbox = createDOMElement('input', { type: 'checkbox', id: CONFIG.SETTINGS_DEBUG_INTERACTIVE_BORDERS_CHECKBOX_ID, style: checkboxStyle }); // Checked state from setInitialUIStates
        state.domElements.debugInteractiveBordersCheckbox.addEventListener('change', (e) => { state.debugInteractiveBorders = e.target.checked; applyDebugInteractiveBordersStyle(); saveDataToStorage(); });
        debugPointerLabel.append(state.domElements.debugInteractiveBordersCheckbox, 'Highlight Clickable Areas');
        panel.appendChild(debugPointerLabel);

        // --- Custom Tab Theme Section ---
        panel.appendChild(createDOMElement('h4', {textContent: `Customize This Tab's Appearance`, style: sectionHeadingStyle}));
        // Input fields will be populated by setInitialUIStates
        const nameGroup = createDOMElement('div');
        nameGroup.appendChild(createDOMElement('label', {for: CONFIG.SETTINGS_CUSTOM_TAB_NAME_INPUT_ID, textContent: 'Tab Display Name:', style: commonLabelStyle}));
        state.domElements.customTabNameInput = createDOMElement('input', {type: 'text', id: CONFIG.SETTINGS_CUSTOM_TAB_NAME_INPUT_ID, style: commonInputStyle, placeholder: 'E.g., PREBUILD-Station1'});
        nameGroup.appendChild(state.domElements.customTabNameInput);
        panel.appendChild(nameGroup);

        const colorGroup = createDOMElement('div', {style:{marginTop:'8px'}});
        colorGroup.appendChild(createDOMElement('label', {for: CONFIG.SETTINGS_CUSTOM_TAB_COLOR_INPUT_ID, textContent: 'Page Overlay Color (e.g., rgba(255,0,0,0.05)):', style: commonLabelStyle}));
        state.domElements.customTabBkgColorInput = createDOMElement('input', {type: 'text', id: CONFIG.SETTINGS_CUSTOM_TAB_COLOR_INPUT_ID, style: commonInputStyle });
        colorGroup.appendChild(state.domElements.customTabBkgColorInput);
        panel.appendChild(colorGroup);

        const textColorGroup = createDOMElement('div', {style:{marginTop:'8px'}});
        textColorGroup.appendChild(createDOMElement('label', {for: CONFIG.SETTINGS_CUSTOM_TAB_TEXT_COLOR_INPUT_ID, textContent: 'Page Indicator Text Color (e.g., rgba(200,0,0,0.5)):', style: commonLabelStyle}));
        state.domElements.customTabTextColorInput = createDOMElement('input', {type: 'text', id: CONFIG.SETTINGS_CUSTOM_TAB_TEXT_COLOR_INPUT_ID, style: commonInputStyle});
        textColorGroup.appendChild(state.domElements.customTabTextColorInput);
        panel.appendChild(textColorGroup);

        const saveThemeButton = createDOMElement('button', {textContent: 'Save Custom Appearance for This URL', style: {...commonSelectStyle, backgroundColor: `${CONFIG.MAIN_ACCENT_COLOR}aa`, color:'white', marginTop:'10px', cursor:'pointer'}});
        saveThemeButton.onclick = handleSaveCustomTheme;
        panel.appendChild(saveThemeButton);
        const resetThemeButton = createDOMElement('button', {textContent: 'Reset Appearance to Default for This URL', style: {...commonSelectStyle, backgroundColor: `rgba(100,100,100,0.3)`, color:'white', marginTop:'5px', cursor:'pointer'}});
        resetThemeButton.onclick = handleResetCustomTheme;
        panel.appendChild(resetThemeButton);

        // --- Multi-Tab Contribution Section ---
        panel.appendChild(createDOMElement('h4', {textContent: 'Multi-Tab Statistics Contribution', style: sectionHeadingStyle}));
        const currentTabContributeLabel = createDOMElement('label', { style: checkboxLabelStyle });
        state.domElements.currentTabContributesCheckbox = createDOMElement('input', {type: 'checkbox', id: CONFIG.SETTINGS_CURRENT_TAB_CONTRIBUTES_TO_TOTAL_CHECKBOX_ID, style: checkboxStyle }); // Checked state from setInitialUIStates
        state.domElements.currentTabContributesCheckbox.addEventListener('change', (e) => {
            state.currentTabContributesToTotal = e.target.checked;
            writeCurrentTabDataToLocalStorage(); readAllTabsDataFromLocalStorage(); saveDataToStorage();
        });
        currentTabContributeLabel.append(state.domElements.currentTabContributesCheckbox, `This Tab (${state.currentTabMode.name}) contributes to Global Stats`);
        panel.appendChild(currentTabContributeLabel);
        state.domElements.otherTabsSettingsContainer = createDOMElement('div', {id: 'otherTabsSettings_v3_3', style: {marginLeft: '20px', marginTop: '5px'}});
        panel.appendChild(state.domElements.otherTabsSettingsContainer);
        // updateOtherTabsSettingsDisplay() will populate this when settings are opened or data changes


        //--- Close Button for Settings Panel ---
        const settingsPanelCloseButtonStyle = { cursor: 'pointer', backgroundColor: `${CONFIG.MAIN_ACCENT_COLOR}dd`, border: 'none', color: 'white', borderRadius: '5px', padding: '10px', fontSize: '1em', width: '100%', marginTop: 'auto', transition: 'background-color 0.2s' };
        settingsPanelCloseButtonStyle[':hover'] = { backgroundColor: CONFIG.MAIN_ACCENT_COLOR };
        const closeButton = createDOMElement('button', { textContent: 'Apply & Close', style: settingsPanelCloseButtonStyle });
        closeButton.addEventListener('click', () => setSettingsPanelVisibility(false));
        panel.appendChild(closeButton);
    }


    // --- POST-BUILD UI SETUP ---
    function setInitialUIStates() {
        // Populate Shift Type select
        const shiftSelect = state.domElements.settingsShiftTypeSelect;
        if(shiftSelect) {
            shiftSelect.innerHTML = ''; // Clear current options
            [['auto', 'Automatic'], ['day', `Day (from ${CONFIG.DEFAULT_DAY_SHIFT_START_TIME})`], ['night', `Night (from ${CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME})`]].forEach(([val, txt]) => {
                shiftSelect.add(new Option(txt, val));
            });
            shiftSelect.value = state.shiftType;
        }
        // Set Shift Start Time input
        if(state.domElements.settingsShiftStartTimeInput && state.shiftStartTime) {
            state.domElements.settingsShiftStartTimeInput.value = formatDateToHHMM(state.shiftStartTime);
        }
        // Populate Lunch select (dynamic based on shift type)
        const lunchSelect = state.domElements.settingsLunchSelect;
        if(lunchSelect) {
            lunchSelect.innerHTML = '';
            let currentShiftCategory = 'any';
            if (state.shiftType === 'day' || (state.shiftType === 'auto' && state.shiftStartTime && state.shiftStartTime.getHours() < _getNightStartHour() && state.shiftStartTime.getHours() >= _getDayStartHour())) {
                currentShiftCategory = 'day';
            } else if (state.shiftType === 'night' || (state.shiftType === 'auto' && (state.shiftStartTime.getHours() >= _getNightStartHour() || state.shiftStartTime.getHours() < _getDayStartHour()))) {
                currentShiftCategory = 'night';
            }
            const filteredLunchOptions = CONFIG.DEFAULT_LUNCH_OPTIONS.filter(opt => opt.type === currentShiftCategory || opt.type === 'any');
            filteredLunchOptions.forEach((opt) => { const originalIndex = CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(opt); lunchSelect.add(new Option(opt.text, String(originalIndex))); });
            const currentLunchOriginalIndex = state.selectedLunchOption ? CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(state.selectedLunchOption) : -1;
            if(currentLunchOriginalIndex > -1 && filteredLunchOptions.some(opt => CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(opt) === currentLunchOriginalIndex) ) {
                lunchSelect.value = String(currentLunchOriginalIndex);
            } else if (filteredLunchOptions.length > 0) {
                state.selectedLunchOption = filteredLunchOptions[0]; // Update state if current selection is invalid for filtered list
                lunchSelect.value = String(CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(filteredLunchOptions[0]));
            } else { // Fallback if no options match, select "No Lunch" or first overall
                const noLunchOpt = CONFIG.DEFAULT_LUNCH_OPTIONS.find(opt => opt.start === "00:00" && opt.end === "00:00" && opt.type === "any");
                state.selectedLunchOption = noLunchOpt || CONFIG.DEFAULT_LUNCH_OPTIONS[0];
                lunchSelect.value = String(CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(state.selectedLunchOption));
            }
        }
        // Set checkbox states
        if(state.domElements.autoClickEnabledCheckbox) state.domElements.autoClickEnabledCheckbox.checked = state.autoClickEnabled;
        if(state.domElements.showClockCheckbox) state.domElements.showClockCheckbox.checked = state.showClock;
        if(state.domElements.showStatsCheckbox) state.domElements.showStatsCheckbox.checked = state.showStats;
        if(state.domElements.showLastActionTimerCheckbox) state.domElements.showLastActionTimerCheckbox.checked = state.showLastActionTimer;
        if(state.domElements.showUITabIndicatorCheckbox) state.domElements.showUITabIndicatorCheckbox.checked = state.showUITabIndicator;
        if(state.domElements.showPageOverlayCheckbox) state.domElements.showPageOverlayCheckbox.checked = state.showPageOverlay;
        if(state.domElements.showTriggerDebugCheckbox) state.domElements.showTriggerDebugCheckbox.checked = state.showTriggerDebug;
        if(state.domElements.debugInteractiveBordersCheckbox) state.domElements.debugInteractiveBordersCheckbox.checked = state.debugInteractiveBorders;
        if(state.domElements.currentTabContributesCheckbox) state.domElements.currentTabContributesCheckbox.checked = state.currentTabContributesToTotal;
        if(state.domElements.pointerEventsModeSelect) state.domElements.pointerEventsModeSelect.value = state.pointerEventsMode;

        // Set custom theme input fields
        const currentThemeForInputs = state.customTabThemes[state.currentTabFullUrl] || state.currentTabMode;
        if(state.domElements.customTabNameInput) state.domElements.customTabNameInput.value = currentThemeForInputs.name;
        if(state.domElements.customTabBkgColorInput) state.domElements.customTabBkgColorInput.value = currentThemeForInputs.color;
        if(state.domElements.customTabTextColorInput) state.domElements.customTabTextColorInput.value = currentThemeForInputs.textColor;

        updateCounterDisplay(); // Includes font resizing
        updateManualShiftTimeInputVisibility();
        updateOtherTabsSettingsDisplay(); // Populate other tabs contribution checkboxes
        applyVisibilitySettings();
    }

    // (All 'handle...' event handlers are here - same as provided in previous "Part 3" block)
    // (All core logic functions are here - same as provided in previous "Part 3" block)
    // ... (Initialize and Destroy as well)

    // --- EVENT HANDLERS (Ensure all definitions are present and correct) ---
    function processIncrementForCurrentTab(isManualAction = false, event = null) { if (isManualAction && state.uiLocked && event && (event.currentTarget === state.domElements.incrementButton || event.currentTarget === document )) {} else if (state.uiLocked && isManualAction) { logDebug('UI locked, increment ignored.'); return; } state.clicksForThisTab++; state.lastActionTimestampForThisTab = Date.now(); updateCounterDisplay(); updateLastActionTimerDisplay(); writeCurrentTabDataToLocalStorage(); readAllTabsDataFromLocalStorage(false); }
    function handleDecrementClick() { if (state.uiLocked) return; if (state.clicksForThisTab > 0) { state.clicksForThisTab--; state.lastActionTimestampForThisTab = Date.now(); updateCounterDisplay(); updateLastActionTimerDisplay(); writeCurrentTabDataToLocalStorage(); readAllTabsDataFromLocalStorage(false); } }
    function handleCounterInputDynamic(event) { const input = event.target; const valueLength = input.value.length; let newFontSize = CONFIG.MAIN_COUNTER_FONT_SIZE_INITIAL_EM; if (valueLength > CONFIG.MAIN_COUNTER_MAX_CHARS_BEFORE_RESIZE) { const overflowChars = valueLength - CONFIG.MAIN_COUNTER_MAX_CHARS_BEFORE_RESIZE; newFontSize = Math.max(CONFIG.MAIN_COUNTER_FONT_SIZE_MIN_EM, CONFIG.MAIN_COUNTER_FONT_SIZE_INITIAL_EM - overflowChars * 0.55); } input.style.fontSize = `${newFontSize}em`; input.style.width = `${Math.max(70, valueLength * (newFontSize * 0.65) + INPUT_PADDING_GUESS)}px`; const INPUT_PADDING_GUESS = 20; } // Added guess for padding
    function handleCounterInputChange(event) { if (state.uiLocked) { event.target.value = state.clicksForThisTab; handleCounterInputDynamic({target: event.target}); return; } let newValue = parseInt(event.target.value, 10); if (isNaN(newValue) || newValue < 0) newValue = state.clicksForThisTab; if (newValue !== state.clicksForThisTab) { state.clicksForThisTab = newValue; state.lastActionTimestampForThisTab = Date.now(); updateLastActionTimerDisplay(); writeCurrentTabDataToLocalStorage(); readAllTabsDataFromLocalStorage(false); } updateCounterDisplay(); }
    function updateCounterDisplay() { if (state.domElements.mainCounterInput) { state.domElements.mainCounterInput.value = state.clicksForThisTab; handleCounterInputDynamic({target: state.domElements.mainCounterInput}); } }
    function handleShiftSettingsChange() { state.shiftType = state.domElements.settingsShiftTypeSelect.value; determineAndSetShiftStartTime(false); setDynamicDefaultLunch(); if (state.domElements.settingsLunchSelect && state.selectedLunchOption) { const lunchSelect = state.domElements.settingsLunchSelect; lunchSelect.innerHTML = ''; let currentShiftCategory = 'any'; if (state.shiftType === 'day' || (state.shiftType === 'auto' && state.shiftStartTime && state.shiftStartTime.getHours() < _getNightStartHour() && state.shiftStartTime.getHours() >= _getDayStartHour())) currentShiftCategory = 'day'; else if (state.shiftType === 'night' || (state.shiftType === 'auto' && (state.shiftStartTime.getHours() >= _getNightStartHour() || state.shiftStartTime.getHours() < _getDayStartHour()))) currentShiftCategory = 'night'; const filteredLunchOptions = CONFIG.DEFAULT_LUNCH_OPTIONS.filter(opt => opt.type === currentShiftCategory || opt.type === 'any'); filteredLunchOptions.forEach((opt) => { const originalIndex = CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(opt); lunchSelect.add(new Option(opt.text, String(originalIndex))); }); const currentLunchOriginalIndex = state.selectedLunchOption ? CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(state.selectedLunchOption) : -1; if(currentLunchOriginalIndex > -1 && filteredLunchOptions.some(opt => CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(opt) === currentLunchOriginalIndex) ) lunchSelect.value = String(currentLunchOriginalIndex); else if (filteredLunchOptions.length > 0) { state.selectedLunchOption = filteredLunchOptions[0]; lunchSelect.value = String(CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(filteredLunchOptions[0]));} else { const noLunchOpt = CONFIG.DEFAULT_LUNCH_OPTIONS.find(opt => opt.start === "00:00" && opt.end === "00:00"); if (noLunchOpt) { state.selectedLunchOption = noLunchOpt; lunchSelect.value = String(CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(noLunchOpt)); } else { state.selectedLunchOption = CONFIG.DEFAULT_LUNCH_OPTIONS[0]; lunchSelect.value = "0";}}} updateManualShiftTimeInputVisibility(); updateStatistics(); saveDataToStorage(); }
    function updateManualShiftTimeInputVisibility() { const isManual = state.shiftType !== 'auto'; const inputEl = state.domElements.settingsShiftStartTimeInput; const labelEl = inputEl?.previousElementSibling; if (inputEl) { inputEl.disabled = !isManual; inputEl.style.display = isManual ? 'block' : 'none'; if (labelEl && labelEl.tagName === 'LABEL') labelEl.style.display = isManual ? 'block' : 'none'; if (state.shiftStartTime) inputEl.value = formatDateToHHMM(state.shiftStartTime); } }
    function handleLunchSettingChange() { const selectedIndex = parseInt(state.domElements.settingsLunchSelect.value, 10); if (CONFIG.DEFAULT_LUNCH_OPTIONS[selectedIndex]) { state.selectedLunchOption = CONFIG.DEFAULT_LUNCH_OPTIONS[selectedIndex]; updateStatistics(); saveDataToStorage(); } }
    function handleAutoClickSettingChange(event) { state.autoClickEnabled = event.target.checked; logInfo(`Auto-click is ${state.autoClickEnabled ? 'ENABLED' : 'DISABLED'}`); saveDataToStorage(); if (state.autoClickEnabled && !state.mutationObserver) initializeMutationObserver(); else if (!state.autoClickEnabled && state.mutationObserver) { state.mutationObserver.disconnect(); state.mutationObserver = null; logDebug('MutationObserver disconnected.'); } }
    function handleSaveCustomTheme() { const name = state.domElements.customTabNameInput.value.trim() || state.currentTabMode.name || CONFIG.DEFAULT_TAB_MODE_NAME; const color = state.domElements.customTabBkgColorInput.value.trim() || state.currentTabMode.color || CONFIG.DEFAULT_TAB_MODE_COLOR; const textColor = state.domElements.customTabTextColorInput.value.trim() || state.currentTabMode.textColor || CONFIG.DEFAULT_TAB_MODE_TEXT_COLOR; state.customTabThemes[state.currentTabFullUrl] = { name, color, textColor }; state.currentTabMode = { name, color, textColor, isCustom: true }; logInfo(`Custom theme saved for ${state.currentTabFullUrl}:`, state.currentTabMode); saveDataToStorage(); applyThemeToPage(); updateUITabIndicator(); }
    function handleResetCustomTheme() { if (state.customTabThemes[state.currentTabFullUrl]) { delete state.customTabThemes[state.currentTabFullUrl]; logInfo(`Custom theme reset for ${state.currentTabFullUrl}.`); state.currentTabMode = determineCurrentTabMode(); saveDataToStorage(); applyThemeToPage(); updateUITabIndicator(); const defaultThemeForInputs = state.currentTabMode; state.domElements.customTabNameInput.value = defaultThemeForInputs.name; state.domElements.customTabBkgColorInput.value = defaultThemeForInputs.color; state.domElements.customTabTextColorInput.value = defaultThemeForInputs.textColor; } }
    function handlePageKeydown(event) { if ((event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA' || event.target.isContentEditable) && !(event.code === CONFIG.INCREMENT_KEYBOARD_SHORTCUT_CODE && event.target !== state.domElements.mainCounterInput)) return; if (event.code === CONFIG.INCREMENT_KEYBOARD_SHORTCUT_CODE) { event.preventDefault(); processIncrementForCurrentTab(false, event); logDebug(`${CONFIG.INCREMENT_KEYBOARD_SHORTCUT_CODE} pressed`); if(state.domElements.incrementButton){ state.domElements.incrementButton.style.transform = 'scale(0.93)'; setTimeout(() => { if(state.domElements.incrementButton) state.domElements.incrementButton.style.transform = 'scale(1)'; }, 120);}} }

    // --- CORE LOGIC ---
    function determineAndSetShiftStartTime(forceAuto = false) { const now = new Date(); let shiftStartHour, shiftStartMinute; let calculatedStartTime = new Date(now); let determinedShiftCategory = ''; if (forceAuto || state.shiftType === 'auto') { const dayStartMins = timeStringToMinutes(CONFIG.DEFAULT_DAY_SHIFT_START_TIME); const nightStartMins = timeStringToMinutes(CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME); const currentMins = now.getHours() * 60 + now.getMinutes(); if (currentMins >= dayStartMins && currentMins < nightStartMins) { determinedShiftCategory = 'day'; [shiftStartHour, shiftStartMinute] = CONFIG.DEFAULT_DAY_SHIFT_START_TIME.split(':').map(Number); } else { determinedShiftCategory = 'night'; [shiftStartHour, shiftStartMinute] = CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME.split(':').map(Number); if (currentMins < dayStartMins) calculatedStartTime.setDate(now.getDate() - 1); } calculatedStartTime.setHours(shiftStartHour, shiftStartMinute, 0, 0); state.shiftStartTime = calculatedStartTime; if (state.shiftType === 'auto' && forceAuto) { state.shiftType = determinedShiftCategory; if(state.domElements.settingsShiftTypeSelect) state.domElements.settingsShiftTypeSelect.value = state.shiftType;} logDebug(`Auto Shift: ${state.shiftStartTime.toLocaleString()} (as ${state.shiftType})`); } else if (state.shiftType === 'day' || state.shiftType === 'night') { const timeValue = state.domElements.settingsShiftStartTimeInput?.value; let baseTime = state.shiftType === 'day' ? CONFIG.DEFAULT_DAY_SHIFT_START_TIME : CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME; if(timeValue) baseTime = timeValue; [shiftStartHour, shiftStartMinute] = baseTime.split(':').map(Number); calculatedStartTime.setHours(shiftStartHour, shiftStartMinute, 0, 0); if (state.shiftType === 'night' && (now.getHours() < shiftStartHour || (now.getHours() === shiftStartHour && now.getMinutes() < shiftStartMinute) )) calculatedStartTime.setDate(now.getDate() - 1); state.shiftStartTime = calculatedStartTime; logDebug(`Manual Shift '${state.shiftType}': ${state.shiftStartTime.toLocaleString()}`); } }
    function updateRealTimeClockDisplay() { if(state.domElements.realTimeClock && state.showClock) state.domElements.realTimeClock.textContent = formatDateToHHMM(new Date(),true); }
    function updateLastActionTimerDisplay() { if (!state.domElements.lastActionTimerDisplay || !state.showLastActionTimer) { if(state.domElements.lastActionTimerDisplay) state.domElements.lastActionTimerDisplay.style.display = 'none'; return; } state.domElements.lastActionTimerDisplay.style.display = 'block'; const elapsedMs = Date.now() - state.lastActionTimestampForThisTab; state.domElements.lastActionTimerDisplay.textContent = `Last: ${formatMsToDuration(elapsedMs, true).replace(/^00h\s*/, '')}`; const isWarn = elapsedMs > CONFIG.LAST_ACTION_TIMER_WARN_SECONDS * 1000; state.domElements.lastActionTimerDisplay.style.color = isWarn ? CONFIG.LAST_ACTION_TIMER_WARN_COLOR : CONFIG.UI_TEXT_COLOR; state.domElements.lastActionTimerDisplay.style.fontWeight = isWarn ? 'bold' : 'normal'; }
    function updateStatistics() { if (!state.domElements.statsTextSummary || !state.showStats) { if(state.domElements.statsTextSummary) state.domElements.statsTextSummary.innerHTML = ''; return; } state.domElements.statsTextSummary.style.display = 'block'; if (!state.shiftStartTime) { determineAndSetShiftStartTime(true); if (!state.shiftStartTime) { state.domElements.statsTextSummary.innerHTML = '<p style="color:red;">Error: Shift start not set!</p>'; return; }} const now = new Date(); let totalElapsedMsOverall = now.getTime() - state.shiftStartTime.getTime(); if (totalElapsedMsOverall < 0) { state.domElements.statsTextSummary.innerHTML = `<p>Shift: <strong>${formatDateToHHMM(state.shiftStartTime)}</strong> (${state.shiftType})</p><p>Waiting...</p>`; return; } let lunchDurationMs = 0; const lunch = state.selectedLunchOption; if (lunch && (lunch.start !== "00:00" || lunch.end !== "00:00")) { const shiftBaseDate = new Date(state.shiftStartTime); shiftBaseDate.setHours(0,0,0,0); let LSAbs = new Date(shiftBaseDate); const [lsh, lsm] = lunch.start.split(':').map(Number); LSAbs.setHours(lsh, lsm, 0, 0); let LEAbs = new Date(shiftBaseDate); const [leh, lem] = lunch.end.split(':').map(Number); LEAbs.setHours(leh, lem, 0, 0); if (state.shiftType === 'night' && state.shiftStartTime.getHours() >= _getNightStartHour() && lsh < _getDayStartHour()) { LSAbs.setDate(LSAbs.getDate() + 1); LEAbs.setDate(LEAbs.getDate() + 1); } if (LEAbs < LSAbs) LEAbs.setDate(LEAbs.getDate() + 1); const effLS = Math.max(state.shiftStartTime.getTime(), LSAbs.getTime()); const effLE = Math.min(now.getTime(), LEAbs.getTime()); if (effLE > effLS) lunchDurationMs = effLE - effLS; } const effectiveWorkMsThisTab = Math.max(0, totalElapsedMsOverall - lunchDurationMs); const hoursWorkedThisTab = effectiveWorkMsThisTab / 3600000; const clicksPerHourThisTab = (hoursWorkedThisTab > 0.001) ? (state.clicksForThisTab / hoursWorkedThisTab) : 0; const globalClicksPerHour = (hoursWorkedThisTab > 0.001 && state.globalTotalClicks > 0 && state.currentTabContributesToTotal) ? (state.globalTotalClicks / hoursWorkedThisTab) : (state.currentTabContributesToTotal ? 0 : clicksPerHourThisTab ) ; let statsHTML = `<p>Shift: <strong>${formatDateToHHMM(state.shiftStartTime)}</strong> (${state.shiftType})   Lunch: ${lunch ? lunch.text : 'N/A'}</p><div style="display:flex; justify-content:space-around; margin-top:5px;"><div style="text-align:center;"><div>This Tab (${state.currentTabMode.name}):</div><div>Completed: <strong>${state.clicksForThisTab}</strong></div><div>~<strong style="color:${CONFIG.MAIN_ACCENT_COLOR};font-size:1.1em;">${clicksPerHourThisTab.toFixed(1)}</strong>/hr</div><div>(in ${formatMsToDuration(effectiveWorkMsThisTab)})</div></div><div style="text-align:center; border-left: 1px solid ${CONFIG.UI_TEXT_COLOR}33; padding-left:10px; margin-left:10px;"><div>Global (Contributing Tabs):</div><div>Total: <strong>${state.globalTotalClicks}</strong></div><div>~<strong style="color:${CONFIG.MAIN_ACCENT_COLOR};font-size:1.1em;">${globalClicksPerHour.toFixed(1)}</strong>/hr</div></div></div>`; const otherTabsArray = Object.values(state.otherTabsData); if (otherTabsArray.length > 1 || (otherTabsArray.length === 1 && otherTabsArray[0].tabId !== state.currentTabId)){ statsHTML += `<div style="font-size:0.8em; margin-top:8px; border-top:1px solid ${CONFIG.UI_TEXT_COLOR}22; padding-top:5px; max-height: 50px; overflow-y:auto;">Details: ${otherTabsArray.map(td => `${td.modeName||td.tabId.substring(0,15)}: ${td.clicks} ${td.contributesToTotal?'(✓)':'(x)'}`).join('; ')}</div>`; } state.domElements.statsTextSummary.innerHTML = statsHTML; }
    function initializeMutationObserver() { if (state.mutationObserver) state.mutationObserver.disconnect(); const observeTargetNode = document.querySelector(CONFIG.TRIGGER_OBSERVE_AREA_SELECTOR) || document.body; let debounceTimer = null; const processMutations = () => { if (!state.autoClickEnabled) return; const pageText = observeTargetNode.innerText || observeTargetNode.textContent || ""; const triggerRegex = new RegExp(`\\b${CONFIG.AUTO_CLICK_TRIGGER_WORD}\\b`, 'g'); const triggerIsCurrentlyFound = triggerRegex.test(pageText); let foundElementsPaths = []; if (CONFIG.DEBUG_MODE && state.showTriggerDebug) { if (triggerIsCurrentlyFound) foundElementsPaths = findElementsContainingText(observeTargetNode, CONFIG.AUTO_CLICK_TRIGGER_WORD); updateTriggerDebugDisplay(triggerIsCurrentlyFound, foundElementsPaths); } if (triggerIsCurrentlyFound && !state.isTriggerWordCurrentlyVisible) { logDebug(`Trigger "${CONFIG.AUTO_CLICK_TRIGGER_WORD}" DETECTED.`); state.isTriggerWordCurrentlyVisible = true; } else if (!triggerIsCurrentlyFound && state.isTriggerWordCurrentlyVisible) { logInfo(`Trigger "${CONFIG.AUTO_CLICK_TRIGGER_WORD}" DISAPPEARED. Auto-incrementing.`); processIncrementForCurrentTab(false); state.isTriggerWordCurrentlyVisible = false; }}; const observerCallback = () => { clearTimeout(debounceTimer); debounceTimer = setTimeout(processMutations, 150); }; state.mutationObserver = new MutationObserver(observerCallback); state.mutationObserver.observe(observeTargetNode, { childList: true, subtree: true, characterData: true }); logInfo(`MutationObserver initialized for "${CONFIG.AUTO_CLICK_TRIGGER_WORD}".`); setTimeout(processMutations, 250); }
    function findElementsContainingText(root, text) { const paths = []; const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let node; const unique = new Set(); while((node=walker.nextNode())){if(node.nodeValue&&node.nodeValue.includes(text)){let p=[],el=node.parentElement;while(el&&el!==root&&p.length<5){let d=el.tagName.toLowerCase();if(el.id)d+=`#${el.id}`;if(el.className&&typeof el.className==='string')d+=`.${el.className.trim().split(/\s+/).join('.')}`;p.unshift(d);el=el.parentElement;}const ps=p.join(' > ');if(ps&&!unique.has(ps)&&paths.length<CONFIG.MAX_TRIGGER_DEBUG_LINES){unique.add(ps);paths.push(ps);}}} return paths; }
    function updateTriggerDebugDisplay(isFound, paths = []) { if (!state.domElements.triggerDebugDisplay || !state.showTriggerDebug) { if(state.domElements.triggerDebugDisplay) state.domElements.triggerDebugDisplay.style.display = 'none'; return; } state.domElements.triggerDebugDisplay.style.display = 'block'; let html = `<strong>TrigDebug ("${CONFIG.AUTO_CLICK_TRIGGER_WORD}"):</strong> ${isFound?`<span style="color:lightgreen;">FOUND</span>`:`<span style="color:orange;">Not found</span>`} (VisFlag:${state.isTriggerWordCurrentlyVisible})<br>`; if(isFound&&paths.length>0) html+="Locs: "+paths.map(p=>`<code>${p.replace(/</g,'<').replace(/>/g,'>')}</code>`).join('; '); state.domElements.triggerDebugDisplay.innerHTML = html; }
    function applyThemeToPage() { const mode = state.customTabThemes[state.currentTabFullUrl] || state.currentTabMode; if (state.domElements.pageColorOverlay) { state.domElements.pageColorOverlay.style.backgroundColor = mode.color; state.domElements.pageColorOverlay.style.display = state.showPageOverlay ? 'block' : 'none'; } if (state.domElements.pageIndicatorText) { state.domElements.pageIndicatorText.textContent = mode.name.substring(0, 10).toUpperCase(); state.domElements.pageIndicatorText.style.color = mode.textColor; state.domElements.pageIndicatorText.style.display = state.showPageOverlay ? 'block' : 'none'; } if (state.domElements.uiTabIndicatorText) { state.domElements.uiTabIndicatorText.textContent = mode.name; state.domElements.uiTabIndicatorText.style.color = mode.textColor || CONFIG.UI_TEXT_COLOR; }}
    function applyDebugInteractiveBordersStyle() { const elements = document.querySelectorAll(`#${CONFIG.UI_CONTAINER_ID}, #${CONFIG.UI_CONTAINER_ID} *`); const outlineInteractive = state.debugInteractiveBorders ? '1px dashed red' : ''; const outlineNone = state.debugInteractiveBorders ? '1px dotted lightblue' : ''; elements.forEach(el => { if (el.id === CONFIG.SETTINGS_PANEL_ID && state.settingsPanelVisible) { el.style.outline = state.debugInteractiveBorders ? '2px solid limegreen' : ''; el.style.outlineOffset = state.debugInteractiveBorders ? '-2px' : ''; return; } const CcomputedPointerEvents = getComputedStyle(el).pointerEvents; if(state.debugInteractiveBorders){ if (CcomputedPointerEvents !== 'none') { el.style.outline = outlineInteractive; el.style.outlineOffset = '1px'; } else { el.style.outline = outlineNone; el.style.outlineOffset = '1px'; } } else { el.style.outline = ''; el.style.outlineOffset = ''; } });}

    // --- SCRIPT INITIALIZATION ---
    function initialize() {
        if (document.getElementById(CONFIG.UI_CONTAINER_ID) || window.productionHelperV3_3_Initialized) {
            logError('Prod Helper UI v3.3 already initialized. Attempting safe restart.');
            if (typeof window.destroyProductionHelperV3_3 === 'function') {
                try { window.destroyProductionHelperV3_3(); } catch (e) { logError("Error destroying previous instance during re-init:", e); }
                const checkDestroyed = () => {
                    if (!document.getElementById(CONFIG.UI_CONTAINER_ID) && !window.productionHelperV3_3_Initialized) {
                        actualInit();
                    } else {
                        logError("Old instance not fully destroyed. Re-init aborted.");
                    }
                };
                setTimeout(checkDestroyed, 300); // Delay to allow destroy to complete
            } else { logError("No destroy function for previous instance. Aborting re-init.");}
            return;
        }
        actualInit();
    }

    function actualInit(){
        logInfo('Initializing Production Helper v3.3 (Intl)...');
        loadDataFromStorage();
        buildMainUI(); // Includes setInitialUIStates call internally

        // These are called after buildMainUI and setInitialUIStates have run
        applyThemeToPage();
        applyVisibilitySettings();
        updateMainContainerPointerEvents(); // This also calls applyDebugInteractiveBordersStyle

        updateRealTimeClockDisplay(); // Initial calls for dynamic elements
        updateStatistics();
        updateLastActionTimerDisplay();

        state.intervals.realTimeClock = setInterval(updateRealTimeClockDisplay, 1000);
        state.intervals.lastActionTimer = setInterval(updateLastActionTimerDisplay, 1000);
        state.intervals.statistics = setInterval(updateStatistics, CONFIG.STATS_UPDATE_INTERVAL_MS);
        state.intervals.multiTabWrite = setInterval(writeCurrentTabDataToLocalStorage, CONFIG.MULTI_TAB_UPDATE_INTERVAL_MS);
        state.intervals.multiTabRead = setInterval(() => readAllTabsDataFromLocalStorage(false), CONFIG.MULTI_TAB_READ_INTERVAL_MS);

        if (state.autoClickEnabled) initializeMutationObserver();
        state.pageKeydownListener = handlePageKeydown;
        document.addEventListener('keydown', state.pageKeydownListener);
        window.addEventListener('beforeunload', () => { writeCurrentTabDataToLocalStorage(); saveDataToStorage(); });
        window.productionHelperV3_3_Initialized = true;
        logInfo('Production Helper v3.3 (Intl) initialized successfully.');
    }

    function destroy() {
        logInfo('Destroying Production Helper v3.3 (Intl)...');
        try { writeCurrentTabDataToLocalStorage(); saveDataToStorage(); } catch (e) { logError("Error saving on destroy:", e); }
        if (state.mutationObserver) state.mutationObserver.disconnect(); state.mutationObserver = null;
        Object.values(state.intervals).forEach(clearInterval); state.intervals = {};
        const idsAndClassesToRemove = [CONFIG.UI_CONTAINER_ID, 'emergencyShowBtn_v3_3', CONFIG.PAGE_COLOR_OVERLAY_ID, CONFIG.PAGE_INDICATOR_TEXT_ID];
        idsAndClassesToRemove.forEach(id => { const el = document.getElementById(id); if (el) el.remove(); });
        state.domElements = { leftPane: null, rightPane: null, divider: null }; // Reset DOM element cache
        if(state.pageKeydownListener) document.removeEventListener('keydown', state.pageKeydownListener); state.pageKeydownListener = null;
        // Cannot reliably remove anonymous beforeunload listener, but flag helps.
        delete window.productionHelperV3_3_Initialized;
        logInfo('Production Helper v3.3 (Intl) destroyed.');
    }

    // --- EXECUTION ---
    window.destroyProductionHelperV3_3 = destroy; // Make destroy function globally accessible for CURRENT version

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initialize();
    } else {
        document.addEventListener('DOMContentLoaded', initialize, { once: true });
    }

})(); // End of main IIFE
