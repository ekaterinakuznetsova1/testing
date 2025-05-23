// == Production Assistant v3.2 (International, Multi-Tab, Resizable, Advanced Debug) ==
// Purpose: Highly configurable, multi-tab aware UI with resizable panes and debug visuals.
// Deployment: Copy this entire code and paste it into the browser's developer console (F12)
//             or execute via a loader bookmarklet (fetch + eval).
// Author: Your AI Assistant & You
// ------------------------------------------------------------------------------------

(function() {
    'use strict';

    // --- ------------------------------------------------------------------------ ---
    // --- --------- SCRIPT CONFIGURATION (All settings are here) --------------- ---
    // --- ------------------------------------------------------------------------ ---
    const CONFIG = {
        // --- General UI & Styling ---
        UI_CONTAINER_ID: 'prodHelperUI_v3_2_intl',
        UI_BOTTOM_OFFSET: '10px',
        UI_RIGHT_OFFSET: '10px',
        UI_WIDTH_PERCENT_VIEWPORT: 45,
        UI_HEIGHT_PERCENT_VIEWPORT: 35,
        UI_MIN_WIDTH_PX: 350,
        UI_MIN_HEIGHT_PX: 280,
        UI_BACKGROUND_COLOR: 'rgba(20, 20, 30, 0.0)',
        UI_TEXT_COLOR: 'rgba(160, 160, 170, 0.75)',
        UI_BORDER_COLOR: 'rgba(0, 0, 0, 0.0)',
        FONT_FAMILY: '"Segoe UI", Roboto, Arial, sans-serif',
        MAIN_ACCENT_COLOR: 'rgba(100, 100, 120, 0.6)',

        // --- Clicker & Counter ---
        MAIN_COUNTER_INPUT_ID: 'mainProdCounterInput_v3_2',
        MAIN_COUNTER_FONT_SIZE_INITIAL_EM: 4.8,
        MAIN_COUNTER_FONT_SIZE_MIN_EM: 1.8,
        MAIN_COUNTER_MAX_CHARS_BEFORE_RESIZE: 3,
        SHOW_DECREMENT_BUTTON: true,
        CLICKER_INCREMENT_BUTTON_ID: 'incrementProdBtn_v3_2',
        CLICKER_INCREMENT_BUTTON_COLOR: 'rgba(50, 50, 50, 0.25)',
        CLICKER_DECREMENT_BUTTON_ID: 'decrementProdBtn_v3_2',
        CLICKER_DECREMENT_BUTTON_COLOR: 'rgba(50, 30, 30, 0.2)',
        INCREMENT_KEYBOARD_SHORTCUT_CODE: 'ShiftRight',

        // --- Resizable Divider ---
        DIVIDER_WIDTH_PX: 8,
        LEFT_PANE_MIN_WIDTH_PERCENT: 25,
        RIGHT_PANE_MIN_WIDTH_PERCENT: 30,

        // --- Timer for Last Action ---
        LAST_ACTION_TIMER_ID: 'lastActionTimer_v3_2',
        LAST_ACTION_TIMER_WARN_SECONDS: 10 * 60,
        LAST_ACTION_TIMER_WARN_COLOR: 'rgba(255, 50, 50, 0.8)',

        // --- Real-time Clock ---
        CLOCK_DISPLAY_ID: 'prodRealTimeClock_v3_2',
        CLOCK_FONT_SIZE_EM: 3.8,

        // --- Tabs/Modes Overlay & Identification ---
        TAB_OVERLAY_ID_PREFIX: 'prodHelperTabOverlay_v3_2_',
        PAGE_COLOR_OVERLAY_ID: 'prodHelperPageColorOverlay_v3_2',
        PAGE_INDICATOR_TEXT_ID: 'prodHelperPageIndicatorText_v3_2',
        PAGE_INDICATOR_FONT_SIZE_PX: 48,
        TAB_IDENTIFICATION_MODES: [
            { name: 'PREB', keyword: 'PREBUILD', color: 'rgba(255, 165, 0, 0.03)', textColor: 'rgba(255, 140, 0, 0.5)'},
            { name: 'CURRB', keyword: 'CURRENTBUILD', color: 'rgba(0, 165, 255, 0.03)', textColor: 'rgba(0, 140, 255, 0.5)'},
            { name: 'AFTREF', keyword: 'AFTERREFURBISH', color: 'rgba(100, 255, 100, 0.03)', textColor: 'rgba(80, 220, 80, 0.5)'},
        ],
        DEFAULT_TAB_MODE_NAME: 'CUSTOM',
        DEFAULT_TAB_MODE_COLOR: 'rgba(128, 128, 128, 0.02)',
        DEFAULT_TAB_MODE_TEXT_COLOR: 'rgba(180, 180, 180, 0.4)',
        UI_TAB_INDICATOR_TEXT_ID: 'prodHelperUITabIndicator_v3_2',
        UI_TAB_INDICATOR_FONT_SIZE_EM: 1.2,

        // --- Multi-Tab State Sync via localStorage ---
        MULTI_TAB_STORAGE_PREFIX: 'prodHelper_tabs_v3_2_',
        MULTI_TAB_UPDATE_INTERVAL_MS: 1000,
        MULTI_TAB_READ_INTERVAL_MS: 1500,
        MULTI_TAB_DATA_TTL_MS: 5 * 60 * 1000,

        // --- Shift & Lunch ---
        DEFAULT_DAY_SHIFT_START_TIME: '06:26',
        DEFAULT_NIGHT_SHIFT_START_TIME: '18:26',
        SETTINGS_SHIFT_TYPE_SELECT_ID: 'shiftTypeSelect_v3_2',
        SETTINGS_SHIFT_START_TIME_INPUT_ID: 'shiftStartTimeInput_v3_2',
        SETTINGS_LUNCH_TIME_SELECT_ID: 'lunchTimeSelect_v3_2',
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
        STATS_TEXT_SUMMARY_ID: 'prodStatsSummary_v3_2',
        STATS_FONT_SIZE_EM: 0.85,
        STATS_UPDATE_INTERVAL_MS: 3000,

        // --- Auto-Clicker Trigger ---
        AUTO_CLICK_TRIGGER_WORD: 'wysłano',
        TRIGGER_OBSERVE_AREA_SELECTOR: 'body',
        AUTO_CLICK_ENABLED_CHECKBOX_ID: 'autoClickEnabled_v3_2',
        TRIGGER_DEBUG_DISPLAY_ID: 'triggerDebugDisplay_v3_2',
        MAX_TRIGGER_DEBUG_LINES: 5,

        // --- Storage ---
        STORAGE_KEY_PREFIX_MAIN_SETTINGS: 'prodHelper_mainCfg_v3_2_',
        STORAGE_KEY_PREFIX_CUSTOM_TAB_THEMES: 'prodHelper_customTabThemes_v3_2_',
        USE_SESSION_STORAGE_FOR_MAIN_SETTINGS: true,

        // --- UI Controls & Settings Panel ---
        SETTINGS_PANEL_ID: 'prodHelperSettingsPanel_v3_2',
        EMERGENCY_HIDE_BUTTON_TEXT: 'CLOSE',
        LOCK_UI_BUTTON_TEXT_UNLOCKED: 'UI block',
        LOCK_UI_BUTTON_TEXT_LOCKED: 'UI unblock',
        TOGGLE_SETTINGS_BUTTON_TEXT_CLOSED: 'settings',
        TOGGLE_SETTINGS_BUTTON_TEXT_OPENED: 'settings',

        // --- Settings Toggles ---
        SETTINGS_SHOW_CLOCK_CHECKBOX_ID: 'showClockToggle_v3_2',
        SETTINGS_SHOW_STATS_CHECKBOX_ID: 'showStatsToggle_v3_2',
        SETTINGS_SHOW_LAST_ACTION_TIMER_CHECKBOX_ID: 'showLastActionTimerToggle_v3_2',
        SETTINGS_SHOW_UI_TAB_INDICATOR_CHECKBOX_ID: 'showUITabIndicatorToggle_v3_2',
        SETTINGS_SHOW_PAGE_OVERLAY_CHECKBOX_ID: 'showPageOverlayToggle_v3_2',
        SETTINGS_SHOW_TRIGGER_DEBUG_CHECKBOX_ID: 'showTriggerDebugToggle_v3_2',
        SETTINGS_CURRENT_TAB_CONTRIBUTES_TO_TOTAL_CHECKBOX_ID: 'currentTabContributes_v3_2',
        SETTINGS_DEBUG_POINTER_EVENTS_CHECKBOX_ID: 'debugPointerEvents_v3_2',

        // --- Custom Tab Theme Settings ---
        SETTINGS_CUSTOM_TAB_NAME_INPUT_ID: 'customTabNameInput_v3_2',
        SETTINGS_CUSTOM_TAB_COLOR_INPUT_ID: 'customTabBkgColorInput_v3_2',
        SETTINGS_CUSTOM_TAB_TEXT_COLOR_INPUT_ID: 'customTabTextColorInput_v3_2',

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
        showClock: true, showStats: true, showLastActionTimer: true,
        showUITabIndicator: true, showPageOverlay: true, showTriggerDebug: CONFIG.DEBUG_MODE,
        debugPointerEvents: false,
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
    function logDebug(...args) { if (CONFIG.DEBUG_MODE) console.debug(`[PHv3.2 DEBUG ${state.currentTabMode?.name || state.currentTabId || ''}]`, ...args); }
    function logInfo(...args) { console.info(`[PHv3.2 INFO ${state.currentTabMode?.name || state.currentTabId || ''}]`, ...args); }
    function logError(...args) { console.error(`[PHv3.2 ERROR ${state.currentTabMode?.name || state.currentTabId || ''}]`, ...args); }

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

    function _getDayStartHour() { return parseInt(CONFIG.DEFAULT_DAY_SHIFT_START_TIME.split(':')[0], 10); }
    function _getNightStartHour() { return parseInt(CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME.split(':')[0], 10); }

    function setDynamicDefaultLunch() {
        let potentialShiftType = state.shiftType;
        if (potentialShiftType === 'auto') {
            if (state.shiftStartTime) {
                const shiftStartHour = state.shiftStartTime.getHours();
                potentialShiftType = (shiftStartHour >= _getDayStartHour() && shiftStartHour < _getNightStartHour()) ? 'day' : 'night';
            } else {
                const currentHour = new Date().getHours();
                potentialShiftType = (currentHour >= _getDayStartHour() && currentHour < _getNightStartHour()) ? 'day' : 'night';
            }
        }
        const defaultLunch = CONFIG.DEFAULT_LUNCH_OPTIONS.find(opt => opt.type === potentialShiftType) ||
                             CONFIG.DEFAULT_LUNCH_OPTIONS.find(opt => opt.type === "any") ||
                             CONFIG.DEFAULT_LUNCH_OPTIONS[0];
        state.selectedLunchOption = defaultLunch;
        logDebug("Dynamic default lunch set to:", state.selectedLunchOption ? state.selectedLunchOption.text : "None specified");
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
                showTriggerDebug: state.showTriggerDebug, debugPointerEvents: state.debugPointerEvents,
                currentTabContributesToTotal: state.currentTabContributesToTotal,
                leftPaneFlexBasis: state.domElements.leftPane ? state.domElements.leftPane.style.flexBasis : null,
            };
            mainSettingsStorage.setItem(CONFIG.STORAGE_KEY_PREFIX_MAIN_SETTINGS + state.currentTabId, JSON.stringify(mainDataToSave));
            const themeStorage = getStorage(false);
            themeStorage.setItem(CONFIG.STORAGE_KEY_PREFIX_CUSTOM_TAB_THEMES, JSON.stringify(state.customTabThemes));
            logDebug('Main settings and themes saved for tab:', state.currentTabId);
        } catch (e) { logError('Failed to save data:', e); }
    }

    function loadDataFromStorage() {
        state.currentTabFullUrl = window.location.href; state.currentTabId = generateTabIdFromUrl();
        try {
            const themeStorage = getStorage(false); const themesJSON = themeStorage.getItem(CONFIG.STORAGE_KEY_PREFIX_CUSTOM_TAB_THEMES);
            if (themesJSON) state.customTabThemes = JSON.parse(themesJSON);
        } catch (e) { logError('Failed to load custom themes:', e); state.customTabThemes = {}; }
        state.currentTabMode = determineCurrentTabMode();
        logInfo(`Current Tab ID: ${state.currentTabId}, Mode: ${state.currentTabMode.name} (Custom: ${state.currentTabMode.isCustom})`);
        try {
            const mainSettingsStorage = getStorage(CONFIG.USE_SESSION_STORAGE_FOR_MAIN_SETTINGS);
            const savedDataJSON = mainSettingsStorage.getItem(CONFIG.STORAGE_KEY_PREFIX_MAIN_SETTINGS + state.currentTabId);
            if (savedDataJSON) {
                const savedData = JSON.parse(savedDataJSON);
                state.shiftType = savedData.shiftType || 'auto'; if (savedData.shiftStartTimeISO) state.shiftStartTime = new Date(savedData.shiftStartTimeISO);
                const lunchIndex = parseInt(savedData.selectedLunchOptionIndex, 10);
                if (!isNaN(lunchIndex) && lunchIndex >=0 && CONFIG.DEFAULT_LUNCH_OPTIONS[lunchIndex]) state.selectedLunchOption = CONFIG.DEFAULT_LUNCH_OPTIONS[lunchIndex];
                state.autoClickEnabled = typeof savedData.autoClickEnabled === 'boolean' ? savedData.autoClickEnabled : true;
                state.uiVisible = typeof savedData.uiVisible === 'boolean' ? savedData.uiVisible : true;
                state.uiLocked = typeof savedData.uiLocked === 'boolean' ? savedData.uiLocked : false;
                state.settingsPanelVisible = typeof savedData.settingsPanelVisible === 'boolean' ? savedData.settingsPanelVisible : false;
                state.showClock = typeof savedData.showClock === 'boolean' ? savedData.showClock : true;
                state.showStats = typeof savedData.showStats === 'boolean' ? savedData.showStats : true;
                state.showLastActionTimer = typeof savedData.showLastActionTimer === 'boolean' ? savedData.showLastActionTimer : true;
                state.showUITabIndicator = typeof savedData.showUITabIndicator === 'boolean' ? savedData.showUITabIndicator : true;
                state.showPageOverlay = typeof savedData.showPageOverlay === 'boolean' ? savedData.showPageOverlay : true;
                state.showTriggerDebug = typeof savedData.showTriggerDebug === 'boolean' ? savedData.showTriggerDebug : CONFIG.DEBUG_MODE;
                state.debugPointerEvents = typeof savedData.debugPointerEvents === 'boolean' ? savedData.debugPointerEvents : false;
                state.currentTabContributesToTotal = typeof savedData.currentTabContributesToTotal === 'boolean' ? savedData.currentTabContributesToTotal : true;
                state.initialLeftPaneFlexBasis = savedData.leftPaneFlexBasis || null;
                logInfo('Main settings loaded for tab:', state.currentTabId);
            } else { logInfo('No saved main settings. Defaults will be used.'); state.currentTabContributesToTotal = true; }
            if (!state.shiftStartTime || !(state.shiftStartTime instanceof Date) || isNaN(state.shiftStartTime.getTime())) determineAndSetShiftStartTime(true);
            if (!state.selectedLunchOption) setDynamicDefaultLunch();
        } catch (e) { logError('Failed to load main settings:', e); determineAndSetShiftStartTime(true); setDynamicDefaultLunch(); }
        readAllTabsDataFromLocalStorage(true);
    }

    function writeCurrentTabDataToLocalStorage() {
        if (!state.currentTabId) return; try { const tabData = { tabId: state.currentTabId, modeName: state.currentTabMode.name, clicks: state.clicksForThisTab, lastActionTimestamp: state.lastActionTimestampForThisTab, contributesToTotal: state.currentTabContributesToTotal, timestamp: Date.now() }; localStorage.setItem(CONFIG.MULTI_TAB_STORAGE_PREFIX + state.currentTabId, JSON.stringify(tabData)); logDebug('Wrote tab data:', state.currentTabId); } catch (e) { logError('Error writing tab data to LS:', e); }
    }
    function readAllTabsDataFromLocalStorage(isInitialLoad = false) {
        let newOtherTabsData = {}; const now = Date.now();
        try {
            for (let i = 0; i < localStorage.length; i++) { const key = localStorage.key(i);
                if (key && key.startsWith(CONFIG.MULTI_TAB_STORAGE_PREFIX)) { const itemJson = localStorage.getItem(key);
                    if (itemJson) { try { const itemData = JSON.parse(itemJson);
                            if (now - (itemData.timestamp || 0) > CONFIG.MULTI_TAB_DATA_TTL_MS) { localStorage.removeItem(key); continue; }
                            if (itemData.tabId === state.currentTabId) {
                                if (isInitialLoad) { state.clicksForThisTab = parseInt(itemData.clicks, 10) || 0; state.lastActionTimestampForThisTab = parseInt(itemData.lastActionTimestamp, 10) || Date.now(); logInfo(`Restored self from LS: Clicks=${state.clicksForThisTab}`); }
                                newOtherTabsData[itemData.tabId] = { ...itemData, clicks: state.clicksForThisTab, contributesToTotal: state.currentTabContributesToTotal };
                            } else { newOtherTabsData[itemData.tabId] = itemData; }
                        } catch (parseError) { logError(`Error parsing LS key ${key}:`, parseError); localStorage.removeItem(key); }
                    }}}
        } catch (e) { logError('Error reading LS for multi-tab:', e); }
        state.otherTabsData = newOtherTabsData;
        state.globalTotalClicks = Object.values(state.otherTabsData).filter(td => td.contributesToTotal).reduce((sum, td) => sum + (parseInt(td.clicks, 10) || 0), 0);
        logDebug('Other tabs data sync:', state.otherTabsData, 'Global clicks:', state.globalTotalClicks);
        if (!isInitialLoad) updateStatistics(); // Avoid double update on init
        updateOtherTabsSettingsDisplay();
    }
    function updateOtherTabsSettingsDisplay() {
        const container = state.domElements.otherTabsSettingsContainer; if (!container) { logDebug("Cannot update other tabs settings: container not found."); return; }
        container.innerHTML = ''; const checkboxLabelStyle = { display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '0.85em', color: 'rgba(255,255,255,0.75)', margin:'4px 0'};
        const checkboxStyle = { marginRight: '8px', transform: 'scale(1.15)', accentColor: CONFIG.MAIN_ACCENT_COLOR};
        const otherTabs = Object.values(state.otherTabsData).filter(td => td.tabId !== state.currentTabId);
        if (otherTabs.length === 0) { container.appendChild(createDOMElement('p', { textContent: '(No other active helper tabs detected)', style: { opacity: '0.6', fontStyle: 'italic', fontSize: '0.85em' } })); return; }
        otherTabs.forEach(tabData => { const checkboxId = `contribToggle_${tabData.tabId.replace(/[^a-zA-Z0-9]/g, '_')}`;
            const label = createDOMElement('label', { for: checkboxId, style: checkboxLabelStyle });
            const checkbox = createDOMElement('input', { type: 'checkbox', id: checkboxId, checked: tabData.contributesToTotal || false, style: checkboxStyle, dataset: { tabIdTarget: tabData.tabId } });
            checkbox.addEventListener('change', (e) => { const targetTabId = e.target.dataset.tabIdTarget; const isChecked = e.target.checked; const otherTabStorageKey = CONFIG.MULTI_TAB_STORAGE_PREFIX + targetTabId;
                try { const otherTabStoredJson = localStorage.getItem(otherTabStorageKey); if (otherTabStoredJson) { const otherTabStoredData = JSON.parse(otherTabStoredJson); otherTabStoredData.contributesToTotal = isChecked; otherTabStoredData.timestamp = Date.now(); localStorage.setItem(otherTabStorageKey, JSON.stringify(otherTabStoredData)); logInfo(`Contrib for tab ${targetTabId} set to ${isChecked}.`); if(state.otherTabsData[targetTabId]) { state.otherTabsData[targetTabId].contributesToTotal = isChecked; } readAllTabsDataFromLocalStorage(false); } else { logError(`LS data not found for tabId ${targetTabId}.`); }
                } catch (err) { logError('Error updating other tab contrib:', err); } });
            label.append(checkbox, `Tab: ${tabData.modeName || tabData.tabId} (${tabData.clicks} clicks)`); container.appendChild(label); });
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
        if (hours > 0) return `${String(hours)}h ${String(minutes).padStart(2, '0')}m` + (includeSeconds ? ` ${String(seconds).padStart(2, '0')}s` : '');
        if (minutes > 0) return `${String(minutes).padStart(2, '0')}m` + (includeSeconds ? ` ${String(seconds).padStart(2, '0')}s` : '');
        return includeSeconds ? `${String(seconds).padStart(2, '0')}s` : `00m ${String(seconds).padStart(2, '0')}s`;
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

    // --- UI State Management Functions (MUST be defined before buildMainUI needs them) ---
    function setUIVisibility(visible) {
        state.uiVisible = visible;
        const uiContainer = state.domElements.uiContainer;
        const showButton = state.domElements.emergencyShowButton;
        if (uiContainer) {
            uiContainer.style.opacity = visible ? '1' : '0';
            uiContainer.style.transform = visible ? 'translateY(0)' : 'translateY(20px)';
            uiContainer.style.pointerEvents = (visible && !state.settingsPanelVisible && !state.isResizing) ? 'none' : 'auto';
             if (state.settingsPanelVisible || state.isResizing) uiContainer.style.pointerEvents = 'auto';
        }
        if (showButton) showButton.style.display = visible ? 'none' : 'flex';
        if (!visible && state.settingsPanelVisible) setSettingsPanelVisibility(false);
        saveDataToStorage();
    }

    function setSettingsPanelVisibility(visible) {
        state.settingsPanelVisible = visible;
        const panel = state.domElements.settingsPanel;
        const uiContainer = state.domElements.uiContainer;
        const toggleButton = state.domElements.toggleSettingsButton;
        if (panel) {
            panel.style.display = visible ? 'flex' : 'none';
            panel.style.transform = visible ? 'translateX(0%)' : 'translateX(101%)';
        }
        if (uiContainer) uiContainer.style.pointerEvents = (visible || state.isResizing || state.uiLocked) ? 'auto' : 'none';
        if (toggleButton) toggleButton.textContent = visible ? CONFIG.TOGGLE_SETTINGS_BUTTON_TEXT_OPENED : CONFIG.TOGGLE_SETTINGS_BUTTON_TEXT_CLOSED;
        if (visible && state.uiLocked) setUILockState(true);
        saveDataToStorage();
    }
    function toggleSettingsPanelVisibility() { setSettingsPanelVisibility(!state.settingsPanelVisible); }

    function setUILockState(locked) {
        if (!state.uiVisible && locked && !state.settingsPanelVisible) return;
        state.uiLocked = locked;
        const lockButton = state.domElements.lockUIButton;
        if (lockButton) lockButton.textContent = state.uiLocked ? CONFIG.LOCK_UI_BUTTON_TEXT_LOCKED : CONFIG.LOCK_UI_BUTTON_TEXT_UNLOCKED;
        const elementsToToggle = [
            state.domElements.toggleSettingsButton, state.domElements.emergencyHideButton,
            state.domElements.decrementButton, state.domElements.mainCounterInput,
            state.domElements.divider,
            ...(state.settingsPanelVisible ? Array.from(state.domElements.settingsPanel.querySelectorAll('input, select, button')).filter(el => el !== lockButton && el.textContent !== 'Apply & Close') : [])
        ];
        elementsToToggle.forEach(el => {
            if (el) {
                el.disabled = state.uiLocked;
                el.style.opacity = state.uiLocked ? '0.5' : '1';
                el.style.cursor = state.uiLocked ? 'not-allowed' : ( (el.tagName === 'BUTTON' || el.tagName === 'SELECT' || el.classList.contains('divider-ph')) ? 'pointer' : 'default' );
                 if(el.classList.contains('divider-ph')) el.style.cursor = state.uiLocked ? 'default' : 'ew-resize';
            }
        });
        if (state.domElements.incrementButton) { state.domElements.incrementButton.style.cursor = 'pointer'; state.domElements.incrementButton.disabled = false; state.domElements.incrementButton.style.opacity = '1'; }
        saveDataToStorage();
    }
    function toggleUILockState() { setUILockState(!state.uiLocked); }

    // --- UI ELEMENT ASSEMBLY & POST-BUILD/EVENT HANDLERS/CORE LOGIC ---
    // (All functions from buildMainUI through the end of the script)
    // ... PASTE THE REST OF THE COMBINED SCRIPT (BUILD, EVENT HANDLERS, CORE, INIT) HERE ...
    // This includes buildMainUI, makeButtonInteractive, buildEmergencyShowButton, buildPageOverlayAndIndicator,
    // startResizePanes, buildSettingsPanel, setInitialUIStates, applyVisibilitySettings, applyDebugPointerEventsStyle,
    // all handle... event handlers (processIncrementForCurrentTab, etc.),
    // all core logic (determineAndSetShiftStartTime, updateStatistics, initializeMutationObserver, etc.),
    // and finally initialize() and destroy() and the execution block.
    // For this consolidated response, I will now paste the full remainder.


 // == Production Assistant v3.2 (International, Multi-Tab, Resizable, Advanced Debug) ==
// (Continuation - Part 2: UI Assembly, Event Handlers, Core Logic, Init)

    // --- ------------------------------------------------------------------------ ---
    // --- ----------------------- UI ELEMENT ASSEMBLY (Continued)----------------- ---
    // --- ------------------------------------------------------------------------ ---
    // (Functions buildMainUI, makeButtonInteractive, buildEmergencyShowButton, buildPageOverlayAndIndicator, startResizePanes, buildSettingsPanel were here - now they will be integrated into the single block flow)

    // --- ------------------------------------------------------------------------ ---
    // --- --------- POST-BUILD UI SETUP & EVENT HANDLERS (Continued) ----------- ---
    // --- ------------------------------------------------------------------------ ---
    // (Functions setInitialUIStates, applyVisibilitySettings, applyDebugPointerEventsStyle, and all 'handle...' event handlers were here)

    // --- ------------------------------------------------------------------------ ---
    // --- --------------------------- CORE LOGIC (Continuation) ------------------ ---
    // --- ------------------------------------------------------------------------ ---
    // (Functions determineAndSetShiftStartTime, updateRealTimeClockDisplay, updateLastActionTimerDisplay, updateStatistics, initializeMutationObserver and its_helpers were here)

    // --- ------------------------------------------------------------------------ ---
    // --- ----------------------- INITIALIZATION (Continued) --------------------- ---
    // --- ------------------------------------------------------------------------ ---
    // (Functions initialize, destroy, and the final execution block were here)

// --- The content from this point onwards is the rest of the script (UI build, event handlers, core logic, init) ---

// --- UI ELEMENT ASSEMBLY ---
function buildMainUI() {
    if (document.getElementById(CONFIG.UI_CONTAINER_ID)) { logError('UI container already exists.'); return; }
    const uiContainer = createDOMElement('div', { id: CONFIG.UI_CONTAINER_ID, style: { position: 'fixed', bottom: CONFIG.UI_BOTTOM_OFFSET, right: CONFIG.UI_RIGHT_OFFSET, width: `${CONFIG.UI_WIDTH_PERCENT_VIEWPORT}vw`, height: `${CONFIG.UI_HEIGHT_PERCENT_VIEWPORT}vh`, minWidth: `${CONFIG.UI_MIN_WIDTH_PX}px`, minHeight: `${CONFIG.UI_MIN_HEIGHT_PX}px`, backgroundColor: CONFIG.UI_BACKGROUND_COLOR, border: CONFIG.UI_BORDER_COLOR === 'rgba(0, 0, 0, 0.0)' ? 'none' : `1px solid ${CONFIG.UI_BORDER_COLOR}`, borderRadius: '0px', boxSizing: 'border-box', color: CONFIG.UI_TEXT_COLOR, fontFamily: CONFIG.FONT_FAMILY, zIndex: '2147483640', display: 'flex', flexDirection: 'column', padding: '8px 12px', overflow: 'hidden', boxShadow: CONFIG.UI_BACKGROUND_COLOR === 'rgba(0, 0, 0, 0.0)' ? 'none' : '0 2px 10px rgba(0,0,0,0.15)', transition: 'opacity 0.3s ease-out, transform 0.3s ease-out, width 0.2s ease, height 0.2s ease', pointerEvents: 'none', } });
    state.domElements.uiContainer = uiContainer;
    const topControls = createDOMElement('div', { style: { display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '5px', flexShrink: 0, pointerEvents: 'auto' } });
    const controlButtonBaseStyle = { cursor: 'pointer', background: 'none', border: 'none', color: CONFIG.UI_TEXT_COLOR, borderRadius: '3px', padding: '3px 7px', fontSize: '0.75em', marginLeft: '8px', opacity: '0.6', transition: 'opacity 0.2s' };
    controlButtonBaseStyle[':hover'] = { opacity: '1' };
    state.domElements.toggleSettingsButton = createDOMElement('button', { id: CONFIG.TOGGLE_SETTINGS_BUTTON_TEXT_CLOSED, textContent: CONFIG.TOGGLE_SETTINGS_BUTTON_TEXT_CLOSED, title: 'Open/Close Settings', style: {...controlButtonBaseStyle} });
    state.domElements.toggleSettingsButton.addEventListener('click', toggleSettingsPanelVisibility);
    state.domElements.lockUIButton = createDOMElement('button', { id: 'lockProdUIBtn_v3_2', textContent: CONFIG.LOCK_UI_BUTTON_TEXT_UNLOCKED, title: 'Lock/Unlock UI', style: {...controlButtonBaseStyle} });
    state.domElements.lockUIButton.addEventListener('click', toggleUILockState);
    state.domElements.emergencyHideButton = createDOMElement('button', { id: 'hideProdUIBtn_v3_2', textContent: CONFIG.EMERGENCY_HIDE_BUTTON_TEXT, title: 'Hide UI Panel', style: { ...controlButtonBaseStyle, color: CONFIG.LAST_ACTION_TIMER_WARN_COLOR, fontWeight: 'bold' } });
    state.domElements.emergencyHideButton.addEventListener('click', () => setUIVisibility(false));
    topControls.append(state.domElements.toggleSettingsButton, state.domElements.lockUIButton, state.domElements.emergencyHideButton);
    uiContainer.appendChild(topControls);
    const mainContentArea = createDOMElement('div', { className: 'main-content-area-ph', style: { display: 'flex', flexGrow: 1, overflow: 'hidden', position: 'relative', pointerEvents: 'none' } });
    state.domElements.leftPane = createDOMElement('div', { className: 'left-pane-ph', style: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexBasis: state.initialLeftPaneFlexBasis || '45%', minWidth: `${CONFIG.LEFT_PANE_MIN_WIDTH_PERCENT}%`, overflow: 'hidden', pointerEvents: 'auto', paddingRight: `${CONFIG.DIVIDER_WIDTH_PX / 2}px`, position: 'relative', } });
    state.domElements.mainCounterInput = createDOMElement('input', { type: 'number', id: CONFIG.MAIN_COUNTER_INPUT_ID, value: state.clicksForThisTab, style: { fontSize: `${CONFIG.MAIN_COUNTER_FONT_SIZE_INITIAL_EM}em`, fontWeight: '300', color: CONFIG.UI_TEXT_COLOR, opacity: '0.9', marginBottom: '15px', textAlign: 'center', background: 'none', border: 'none', width: 'auto', minWidth: '70px', outline: 'none', padding: '0 5px', pointerEvents: 'auto' } });
    state.domElements.mainCounterInput.addEventListener('change', handleCounterInputChange);
    state.domElements.mainCounterInput.addEventListener('input', handleCounterInputDynamic);
    const clickerButtonsContainer = createDOMElement('div', { style: { display: 'flex', alignItems: 'center', pointerEvents: 'auto'} });
    const clickerBtnSharedStyle = { cursor: 'pointer', border: 'none', borderRadius: '6px', boxShadow: 'none', transition: 'transform 0.1s, background-color 0.15s', pointerEvents: 'auto', color: CONFIG.UI_TEXT_COLOR, opacity: '0.6', display: 'flex', alignItems: 'center', justifyContent: 'center' };
    clickerBtnSharedStyle[':hover'] = { opacity: '1', backgroundColor: 'rgba(255,255,255,0.05)' };
    if (CONFIG.SHOW_DECREMENT_BUTTON) {
        state.domElements.decrementButton = createDOMElement('button', { id: CONFIG.CLICKER_DECREMENT_BUTTON_ID, textContent: '–', title: 'Decrement (-1)', style: { ...clickerBtnSharedStyle, backgroundColor: CONFIG.CLICKER_DECREMENT_BUTTON_COLOR, marginRight: '15px', fontSize: '1.5em', width:'40px', height:'40px' } });
        state.domElements.decrementButton.addEventListener('click', handleDecrementClick); makeButtonInteractive(state.domElements.decrementButton); clickerButtonsContainer.appendChild(state.domElements.decrementButton);
    }
    state.domElements.incrementButton = createDOMElement('button', { id: CONFIG.CLICKER_INCREMENT_BUTTON_ID, textContent: '+', title: `Increment (+1) or ${CONFIG.INCREMENT_KEYBOARD_SHORTCUT_CODE}`, style: { ...clickerBtnSharedStyle, backgroundColor: CONFIG.CLICKER_INCREMENT_BUTTON_COLOR, fontSize: '2.2em', width:'60px', height:'60px', padding: CONFIG.SHOW_DECREMENT_BUTTON ? '0' : '0' } });
    state.domElements.incrementButton.addEventListener('click', (event) => processIncrementForCurrentTab(true, event)); makeButtonInteractive(state.domElements.incrementButton); clickerButtonsContainer.appendChild(state.domElements.incrementButton);
    state.domElements.leftPane.append(state.domElements.mainCounterInput, clickerButtonsContainer);
    state.domElements.divider = createDOMElement('div', { className: 'divider-ph', style: { width: `${CONFIG.DIVIDER_WIDTH_PX}px`, cursor: 'ew-resize', flexShrink: 0, pointerEvents: 'auto', display: 'flex', alignItems:'center', justifyContent: 'center', } });
    state.domElements.divider.addEventListener('mousedown', startResizePanes);
    state.domElements.rightPane = createDOMElement('div', { className: 'right-pane-ph', style: { display: 'flex', flexDirection: 'column', flexGrow: 1, overflowY: 'auto', pointerEvents: 'auto', paddingLeft: `${CONFIG.DIVIDER_WIDTH_PX / 2}px`, minWidth: `${CONFIG.RIGHT_PANE_MIN_WIDTH_PERCENT}%`, } });
    state.domElements.statsTextSummary = createDOMElement('div', { id: CONFIG.STATS_TEXT_SUMMARY_ID, style: { fontSize: `${CONFIG.STATS_FONT_SIZE_EM}em`, lineHeight: '1.5', marginBottom: '8px', pointerEvents: 'auto' } });
    state.domElements.lastActionTimerDisplay = createDOMElement('div', { id: CONFIG.LAST_ACTION_TIMER_ID, textContent: 'Last: 00s', style: { fontSize: `${CONFIG.STATS_FONT_SIZE_EM * 0.9}em`, marginTop: '5px', opacity: '0.8', pointerEvents: 'none' } });
    state.domElements.triggerDebugDisplay = createDOMElement('div', { id: CONFIG.TRIGGER_DEBUG_DISPLAY_ID, style: { fontSize: `${CONFIG.STATS_FONT_SIZE_EM * 0.8}em`, marginTop: '10px', borderTop: `1px dashed ${CONFIG.UI_TEXT_COLOR}22`, paddingTop: '5px', display: 'none', maxHeight: '50px', overflowY: 'auto', opacity: '0.7', pointerEvents: 'auto', wordBreak: 'break-all'} });
    state.domElements.triggerDebugDisplay.innerHTML = 'Trigger Debug: Waiting...';
    state.domElements.rightPane.append(state.domElements.statsTextSummary, state.domElements.lastActionTimerDisplay, state.domElements.triggerDebugDisplay);
    mainContentArea.append(state.domElements.leftPane, state.domElements.divider, state.domElements.rightPane);
    uiContainer.appendChild(mainContentArea);
    const bottomInfoBar = createDOMElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto', paddingTop: '5px', flexShrink: 0, borderTop: `1px solid ${CONFIG.UI_TEXT_COLOR}1A`, pointerEvents: 'none' } });
    state.domElements.uiTabIndicatorText = createDOMElement('div', { id: CONFIG.UI_TAB_INDICATOR_TEXT_ID, textContent: state.currentTabMode.name, style: { fontSize: `${CONFIG.UI_TAB_INDICATOR_FONT_SIZE_EM}em`, fontWeight: '500', color: state.currentTabMode.textColor || CONFIG.UI_TEXT_COLOR, opacity: 0.5, pointerEvents: 'auto' } });
    state.domElements.realTimeClock = createDOMElement('div', { id: CONFIG.CLOCK_DISPLAY_ID, textContent: '00:00:00', style: { fontSize: `${CONFIG.CLOCK_FONT_SIZE_EM}em`, fontFamily: 'monospace', color: CONFIG.UI_TEXT_COLOR, opacity: '0.3', pointerEvents: 'none' } });
    bottomInfoBar.append(state.domElements.uiTabIndicatorText, state.domElements.realTimeClock);
    uiContainer.appendChild(bottomInfoBar);
    buildSettingsPanel(); uiContainer.appendChild(state.domElements.settingsPanel);
    buildPageOverlayAndIndicator(); document.body.appendChild(state.domElements.pageColorOverlay); document.body.appendChild(state.domElements.pageIndicatorText);
    buildEmergencyShowButton(); document.body.appendChild(state.domElements.emergencyShowButton);
    setInitialUIStates(); applyDebugPointerEventsStyle();
    logInfo('Main UI v3.2 (Intl) built.');
}
function makeButtonInteractive(button) { if (!button) return; button.addEventListener('mousedown', e => { e.preventDefault(); button.style.transform = 'scale(0.95)'; }); button.addEventListener('mouseup', () => button.style.transform = 'scale(1)'); button.addEventListener('mouseleave', () => button.style.transform = 'scale(1)'); }
function buildEmergencyShowButton() { state.domElements.emergencyShowButton = createDOMElement('button', { id: 'emergencyShowBtn_v3_2', textContent: CONFIG.EMERGENCY_SHOW_BUTTON_TEXT, title: 'Show UI Panel', style: { position: 'fixed', bottom: CONFIG.UI_BOTTOM_OFFSET, right: CONFIG.UI_RIGHT_OFFSET, width: CONFIG.EMERGENCY_SHOW_BUTTON_SIZE, height: CONFIG.EMERGENCY_SHOW_BUTTON_SIZE, backgroundColor: 'rgba(80,80,100,0.2)', border: `1px solid rgba(128,128,128,0.3)`, color: CONFIG.UI_TEXT_COLOR, borderRadius: '50%', cursor: 'pointer', display: 'none', alignItems: 'center', justifyContent: 'center', zIndex: '2147483646', opacity: String(CONFIG.EMERGENCY_SHOW_BUTTON_OPACITY), transition: 'opacity 0.2s ease, transform 0.1s ease, background-color 0.2s', fontSize: '16px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', pointerEvents: 'auto' } }); state.domElements.emergencyShowButton.onmouseover = () => { state.domElements.emergencyShowButton.style.opacity = '1'; state.domElements.emergencyShowButton.style.transform = 'scale(1.1)'; state.domElements.emergencyShowButton.style.backgroundColor = CONFIG.MAIN_ACCENT_COLOR; }; state.domElements.emergencyShowButton.onmouseout = () => { state.domElements.emergencyShowButton.style.opacity = String(CONFIG.EMERGENCY_SHOW_BUTTON_OPACITY); state.domElements.emergencyShowButton.style.transform = 'scale(1)'; state.domElements.emergencyShowButton.style.backgroundColor = 'rgba(80,80,100,0.2)'; }; state.domElements.emergencyShowButton.onclick = () => setUIVisibility(true); document.body.appendChild(state.domElements.emergencyShowButton); }
function buildPageOverlayAndIndicator() { state.domElements.pageColorOverlay = createDOMElement('div', { id: CONFIG.PAGE_COLOR_OVERLAY_ID, style: { position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh', backgroundColor: state.currentTabMode.color, zIndex: '2147483630', pointerEvents: 'none', display: state.showPageOverlay ? 'block' : 'none', transition: 'background-color 0.3s ease' } }); state.domElements.pageIndicatorText = createDOMElement('div', { id: CONFIG.PAGE_INDICATOR_TEXT_ID, textContent: state.currentTabMode.name, style: { position: 'fixed', top: '50%', right: '30px', transform: 'translateY(-50%)', fontSize: `${CONFIG.PAGE_INDICATOR_FONT_SIZE_PX}px`, fontWeight: 'bold', color: state.currentTabMode.textColor, opacity: 0.8, zIndex: '2147483631', pointerEvents: 'none', display: state.showPageOverlay ? 'block' : 'none', textShadow: '0 0 5px rgba(0,0,0,0.3)', writingMode: 'vertical-rl', textOrientation: 'mixed', transition: 'color 0.3s ease, opacity 0.3s ease' } });}
function startResizePanes(e) { e.preventDefault(); state.isResizing = true; const mainArea = state.domElements.leftPane.parentElement; const initialMouseX = e.clientX; const initialLeftPaneWidth = state.domElements.leftPane.offsetWidth; const totalWidth = mainArea.offsetWidth - CONFIG.DIVIDER_WIDTH_PX; const doResize = (moveEvent) => { if (!state.isResizing) return; const dx = moveEvent.clientX - initialMouseX; let newLeftWidth = initialLeftPaneWidth + dx; const minLeft = totalWidth * (CONFIG.LEFT_PANE_MIN_WIDTH_PERCENT / 100); const minRight = totalWidth * (CONFIG.RIGHT_PANE_MIN_WIDTH_PERCENT / 100); if (newLeftWidth < minLeft) newLeftWidth = minLeft; if (newLeftWidth > totalWidth - minRight) newLeftWidth = totalWidth - minRight; const newLeftFlexBasis = (newLeftWidth / totalWidth) * 100; state.domElements.leftPane.style.flexBasis = `${newLeftFlexBasis}%`; }; const stopResize = () => { if (!state.isResizing) return; state.isResizing = false; document.removeEventListener('mousemove', doResize); document.removeEventListener('mouseup', stopResize); saveDataToStorage(); }; document.addEventListener('mousemove', doResize); document.addEventListener('mouseup', stopResize); }
function buildSettingsPanel() { const panel = createDOMElement('div', { id: CONFIG.SETTINGS_PANEL_ID, style: { position: 'absolute', top: '0px', right: '0px', bottom: '0px', width: 'clamp(320px, 60%, 500px)', backgroundColor: `rgba(35, 40, 50, 0.98)`, borderLeft: `2px solid ${CONFIG.MAIN_ACCENT_COLOR}`, padding: '15px 20px', zIndex: '1000', display: 'none', flexDirection: 'column', gap: '12px', overflowY: 'auto', boxShadow: '-10px 0px 25px rgba(0,0,0,0.3)', transition: 'transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)', pointerEvents: 'auto' } }); state.domElements.settingsPanel = panel; const heading = createDOMElement('h3', { textContent: 'Settings', style: { margin: '0 0 15px 0', textAlign: 'center', color: 'white', fontSize: '1.3em'} }); panel.appendChild(heading); const commonSelectStyle = {width: '100%', padding: '8px', boxSizing: 'border-box', backgroundColor: 'rgba(0,0,0,0.35)', color: 'white', border: `1px solid ${CONFIG.MAIN_ACCENT_COLOR}bb`, borderRadius: '4px', fontSize: '0.9em'}; const commonInputStyle = {...commonSelectStyle, type: 'text'}; const commonLabelStyle = { display: 'block', marginBottom: '4px', fontSize: '0.9em', color: 'rgba(255,255,255,0.8)'}; const checkboxLabelStyle = { display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '0.9em', color: 'rgba(255,255,255,0.8)', margin: '6px 0'}; const checkboxStyle = { marginRight: '8px', transform: 'scale(1.25)', accentColor: CONFIG.MAIN_ACCENT_COLOR}; const sectionHeadingStyle = {margin: '18px 0 10px 0', color: 'white', fontSize: '1.05em', borderBottom: '1px solid rgba(255,255,255,0.25)', paddingBottom: '6px'};  panel.appendChild(createDOMElement('h4', {textContent: 'Shift & Lunch', style: sectionHeadingStyle})); const shiftTypeGroup = createDOMElement('div'); shiftTypeGroup.appendChild(createDOMElement('label', { for: CONFIG.SETTINGS_SHIFT_TYPE_SELECT_ID, textContent: 'Shift Type:', style: commonLabelStyle })); state.domElements.settingsShiftTypeSelect = createDOMElement('select', { id: CONFIG.SETTINGS_SHIFT_TYPE_SELECT_ID, style: commonSelectStyle }); state.domElements.settingsShiftTypeSelect.addEventListener('change', handleShiftSettingsChange); shiftTypeGroup.appendChild(state.domElements.settingsShiftTypeSelect); panel.appendChild(shiftTypeGroup); const shiftStartTimeGroup = createDOMElement('div',{style:{marginTop:'8px'}}); shiftStartTimeGroup.appendChild(createDOMElement('label', { for: CONFIG.SETTINGS_SHIFT_START_TIME_INPUT_ID, textContent: 'Shift Start Time (manual):', style: commonLabelStyle })); state.domElements.settingsShiftStartTimeInput = createDOMElement('input', { type: 'time', id: CONFIG.SETTINGS_SHIFT_START_TIME_INPUT_ID, style: commonSelectStyle }); state.domElements.settingsShiftStartTimeInput.addEventListener('change', handleShiftSettingsChange); shiftStartTimeGroup.appendChild(state.domElements.settingsShiftStartTimeInput); panel.appendChild(shiftStartTimeGroup); const lunchGroup = createDOMElement('div',{style:{marginTop:'8px'}}); lunchGroup.appendChild(createDOMElement('label', { for: CONFIG.SETTINGS_LUNCH_TIME_SELECT_ID, textContent: 'Lunch Break:', style: commonLabelStyle })); state.domElements.settingsLunchSelect = createDOMElement('select', { id: CONFIG.SETTINGS_LUNCH_TIME_SELECT_ID, style: commonSelectStyle }); state.domElements.settingsLunchSelect.addEventListener('change', handleLunchSettingChange); lunchGroup.appendChild(state.domElements.settingsLunchSelect); panel.appendChild(lunchGroup); panel.appendChild(createDOMElement('h4', {textContent: 'Automation', style: sectionHeadingStyle})); const autoClickLabel = createDOMElement('label', { style: checkboxLabelStyle }); state.domElements.autoClickEnabledCheckbox = createDOMElement('input', { type: 'checkbox', id: CONFIG.AUTO_CLICK_ENABLED_CHECKBOX_ID, checked: state.autoClickEnabled, style: checkboxStyle }); state.domElements.autoClickEnabledCheckbox.addEventListener('change', handleAutoClickSettingChange); autoClickLabel.append(state.domElements.autoClickEnabledCheckbox, `Auto-Increment (trigger: "${CONFIG.AUTO_CLICK_TRIGGER_WORD}")`); panel.appendChild(autoClickLabel); panel.appendChild(createDOMElement('h4', {textContent: 'UI Element Visibility', style: sectionHeadingStyle})); const visControls = [ { stateKey: 'showClock', id: CONFIG.SETTINGS_SHOW_CLOCK_CHECKBOX_ID, label: 'Show Real-time Clock' }, { stateKey: 'showStats', id: CONFIG.SETTINGS_SHOW_STATS_CHECKBOX_ID, label: 'Show Statistics Text' }, { stateKey: 'showLastActionTimer', id: CONFIG.SETTINGS_SHOW_LAST_ACTION_TIMER_CHECKBOX_ID, label: 'Show Last Action Timer' }, { stateKey: 'showUITabIndicator', id: CONFIG.SETTINGS_SHOW_UI_TAB_INDICATOR_CHECKBOX_ID, label: 'Show Tab ID in Panel' }, { stateKey: 'showPageOverlay', id: CONFIG.SETTINGS_SHOW_PAGE_OVERLAY_CHECKBOX_ID, label: 'Show Full Page Color Overlay & Text' }, { stateKey: 'showTriggerDebug', id: CONFIG.SETTINGS_SHOW_TRIGGER_DEBUG_CHECKBOX_ID, label: 'Show Trigger Debug Info' } ]; visControls.forEach(vc => { const label = createDOMElement('label', { style: checkboxLabelStyle}); state.domElements[vc.stateKey + 'Checkbox'] = createDOMElement('input', {type: 'checkbox', id: vc.id, checked: state[vc.stateKey], style: checkboxStyle}); state.domElements[vc.stateKey + 'Checkbox'].addEventListener('change', (e) => { state[vc.stateKey] = e.target.checked; applyVisibilitySettings(); saveDataToStorage(); }); label.append(state.domElements[vc.stateKey + 'Checkbox'], vc.label); panel.appendChild(label); }); panel.appendChild(createDOMElement('h4', {textContent: 'Debugging', style: sectionHeadingStyle})); const debugPointerLabel = createDOMElement('label', { style: checkboxLabelStyle }); state.domElements.debugPointerEventsCheckbox = createDOMElement('input', { type: 'checkbox', id: CONFIG.SETTINGS_DEBUG_POINTER_EVENTS_CHECKBOX_ID, checked: state.debugPointerEvents, style: checkboxStyle }); state.domElements.debugPointerEventsCheckbox.addEventListener('change', (e) => { state.debugPointerEvents = e.target.checked; applyDebugPointerEventsStyle(); saveDataToStorage(); }); debugPointerLabel.append(state.domElements.debugPointerEventsCheckbox, 'Highlight Clickable Areas (Red Border)'); panel.appendChild(debugPointerLabel); panel.appendChild(createDOMElement('h4', {textContent: `Customize This Tab (${state.currentTabMode.name || 'Identifier'})`, style: sectionHeadingStyle})); const currentTheme = state.customTabThemes[state.currentTabFullUrl] || state.currentTabMode; const nameGroup = createDOMElement('div'); nameGroup.appendChild(createDOMElement('label', {for: CONFIG.SETTINGS_CUSTOM_TAB_NAME_INPUT_ID, textContent: 'Display Name:', style: commonLabelStyle})); state.domElements.customTabNameInput = createDOMElement('input', {type: 'text', id: CONFIG.SETTINGS_CUSTOM_TAB_NAME_INPUT_ID, value: currentTheme.name, style: commonInputStyle, placeholder: 'E.g., PREBUILD-Station1'}); nameGroup.appendChild(state.domElements.customTabNameInput); panel.appendChild(nameGroup); const colorGroup = createDOMElement('div', {style:{marginTop:'8px'}}); colorGroup.appendChild(createDOMElement('label', {for: CONFIG.SETTINGS_CUSTOM_TAB_COLOR_INPUT_ID, textContent: 'Page Overlay Color (e.g., rgba(255,0,0,0.05) or #FF00000D):', style: commonLabelStyle})); state.domElements.customTabBkgColorInput = createDOMElement('input', {type: 'text', id: CONFIG.SETTINGS_CUSTOM_TAB_COLOR_INPUT_ID, value: currentTheme.color, style: commonInputStyle }); colorGroup.appendChild(state.domElements.customTabBkgColorInput); panel.appendChild(colorGroup); const textColorGroup = createDOMElement('div', {style:{marginTop:'8px'}}); textColorGroup.appendChild(createDOMElement('label', {for: CONFIG.SETTINGS_CUSTOM_TAB_TEXT_COLOR_INPUT_ID, textContent: 'Page Indicator Text Color (e.g., rgba(200,0,0,0.5) or #AA0000):', style: commonLabelStyle})); state.domElements.customTabTextColorInput = createDOMElement('input', {type: 'text', id: CONFIG.SETTINGS_CUSTOM_TAB_TEXT_COLOR_INPUT_ID, value: currentTheme.textColor, style: commonInputStyle}); textColorGroup.appendChild(state.domElements.customTabTextColorInput); panel.appendChild(textColorGroup); const saveThemeButton = createDOMElement('button', {textContent: 'Save Custom Theme for This URL', style: {...commonSelectStyle, backgroundColor: `${CONFIG.MAIN_ACCENT_COLOR}aa`, color:'white', marginTop:'10px', cursor:'pointer'}}); saveThemeButton.onclick = handleSaveCustomTheme; panel.appendChild(saveThemeButton); const resetThemeButton = createDOMElement('button', {textContent: 'Reset Theme to Default for This URL', style: {...commonSelectStyle, backgroundColor: `rgba(100,100,100,0.3)`, color:'white', marginTop:'5px', cursor:'pointer'}}); resetThemeButton.onclick = handleResetCustomTheme; panel.appendChild(resetThemeButton); panel.appendChild(createDOMElement('h4', {textContent: 'Multi-Tab Statistics Contribution', style: sectionHeadingStyle})); const currentTabContributeLabel = createDOMElement('label', { style: checkboxLabelStyle }); state.domElements.currentTabContributesCheckbox = createDOMElement('input', {type: 'checkbox', id: CONFIG.SETTINGS_CURRENT_TAB_CONTRIBUTES_TO_TOTAL_CHECKBOX_ID, checked: state.currentTabContributesToTotal, style: checkboxStyle }); state.domElements.currentTabContributesCheckbox.addEventListener('change', (e) => { state.currentTabContributesToTotal = e.target.checked; writeCurrentTabDataToLocalStorage(); readAllTabsDataFromLocalStorage(); saveDataToStorage(); }); currentTabContributeLabel.append(state.domElements.currentTabContributesCheckbox, `This Tab (${state.currentTabMode.name}) contributes to Global Clicks/Hour`); panel.appendChild(currentTabContributeLabel); state.domElements.otherTabsSettingsContainer = createDOMElement('div', {id: 'otherTabsSettings_v3_2', style: {marginLeft: '20px', marginTop: '5px'}}); panel.appendChild(state.domElements.otherTabsSettingsContainer); const settingsPanelCloseButtonStyle = { cursor: 'pointer', backgroundColor: `${CONFIG.MAIN_ACCENT_COLOR}bb`, border: 'none', color: 'white', borderRadius: '5px', padding: '10px', fontSize: '1em', width: '100%', marginTop: 'auto', transition: 'background-color 0.2s' }; settingsPanelCloseButtonStyle[':hover'] = { backgroundColor: CONFIG.MAIN_ACCENT_COLOR }; const closeButton = createDOMElement('button', { textContent: 'Apply & Close', style: settingsPanelCloseButtonStyle }); closeButton.addEventListener('click', () => setSettingsPanelVisibility(false)); panel.appendChild(closeButton); }
function setInitialUIStates() { const shiftSelect = state.domElements.settingsShiftTypeSelect; if(shiftSelect) { shiftSelect.innerHTML = ''; [['auto', 'Automatic'], ['day', `Day (from ${CONFIG.DEFAULT_DAY_SHIFT_START_TIME})`], ['night', `Night (from ${CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME})`]].forEach(([val, txt]) => shiftSelect.add(new Option(txt, val))); shiftSelect.value = state.shiftType; } if(state.domElements.settingsShiftStartTimeInput && state.shiftStartTime) state.domElements.settingsShiftStartTimeInput.value = formatDateToHHMM(state.shiftStartTime); const lunchSelect = state.domElements.settingsLunchSelect; if(lunchSelect) { lunchSelect.innerHTML = ''; let currentShiftCategory = 'any'; if (state.shiftType === 'day' || (state.shiftType === 'auto' && state.shiftStartTime && state.shiftStartTime.getHours() < _getNightStartHour() && state.shiftStartTime.getHours() >= _getDayStartHour())) currentShiftCategory = 'day'; else if (state.shiftType === 'night' || (state.shiftType === 'auto' && (state.shiftStartTime.getHours() >= _getNightStartHour() || state.shiftStartTime.getHours() < _getDayStartHour()))) currentShiftCategory = 'night'; const filteredLunchOptions = CONFIG.DEFAULT_LUNCH_OPTIONS.filter(opt => opt.type === currentShiftCategory || opt.type === 'any'); filteredLunchOptions.forEach((opt) => { const originalIndex = CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(opt); lunchSelect.add(new Option(opt.text, String(originalIndex))); }); const currentLunchOriginalIndex = state.selectedLunchOption ? CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(state.selectedLunchOption) : -1; if(currentLunchOriginalIndex > -1 && filteredLunchOptions.some(opt => CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(opt) === currentLunchOriginalIndex) ) lunchSelect.value = String(currentLunchOriginalIndex); else if (filteredLunchOptions.length > 0) { state.selectedLunchOption = filteredLunchOptions[0]; lunchSelect.value = String(CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(filteredLunchOptions[0]));} else { const noLunchOpt = CONFIG.DEFAULT_LUNCH_OPTIONS.find(opt => opt.start === "00:00" && opt.end === "00:00"); if (noLunchOpt) { state.selectedLunchOption = noLunchOpt; lunchSelect.value = String(CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(noLunchOpt)); } else { state.selectedLunchOption = CONFIG.DEFAULT_LUNCH_OPTIONS[0]; lunchSelect.value = "0";}}} if(state.domElements.autoClickEnabledCheckbox) state.domElements.autoClickEnabledCheckbox.checked = state.autoClickEnabled; if(state.domElements.showClockCheckbox) state.domElements.showClockCheckbox.checked = state.showClock; if(state.domElements.showStatsCheckbox) state.domElements.showStatsCheckbox.checked = state.showStats; if(state.domElements.showLastActionTimerCheckbox) state.domElements.showLastActionTimerCheckbox.checked = state.showLastActionTimer; if(state.domElements.showUITabIndicatorCheckbox) state.domElements.showUITabIndicatorCheckbox.checked = state.showUITabIndicator; if(state.domElements.showPageOverlayCheckbox) state.domElements.showPageOverlayCheckbox.checked = state.showPageOverlay; if(state.domElements.showTriggerDebugCheckbox) state.domElements.showTriggerDebugCheckbox.checked = state.showTriggerDebug; if(state.domElements.debugPointerEventsCheckbox) state.domElements.debugPointerEventsCheckbox.checked = state.debugPointerEvents; if(state.domElements.currentTabContributesCheckbox) state.domElements.currentTabContributesCheckbox.checked = state.currentTabContributesToTotal; const currentTheme = state.customTabThemes[state.currentTabFullUrl] || state.currentTabMode; if(state.domElements.customTabNameInput) state.domElements.customTabNameInput.value = currentTheme.name; if(state.domElements.customTabBkgColorInput) state.domElements.customTabBkgColorInput.value = currentTheme.color; if(state.domElements.customTabTextColorInput) state.domElements.customTabTextColorInput.value = currentTheme.textColor; updateCounterDisplay(); updateManualShiftTimeInputVisibility(); updateOtherTabsSettingsDisplay();}
function applyVisibilitySettings() { if (state.domElements.realTimeClock) state.domElements.realTimeClock.style.display = state.showClock ? 'block' : 'none'; if (state.domElements.statsTextSummary) state.domElements.statsTextSummary.style.display = state.showStats ? 'block' : 'none'; if (state.domElements.lastActionTimerDisplay) state.domElements.lastActionTimerDisplay.style.display = state.showLastActionTimer ? 'block' : 'none'; if (state.domElements.pageColorOverlay) state.domElements.pageColorOverlay.style.display = state.showPageOverlay ? 'block' : 'none'; if (state.domElements.pageIndicatorText) state.domElements.pageIndicatorText.style.display = state.showPageOverlay ? 'block' : 'none'; if (state.domElements.uiTabIndicatorText) state.domElements.uiTabIndicatorText.style.display = state.showUITabIndicator ? 'block' : 'none'; if (state.domElements.triggerDebugDisplay) state.domElements.triggerDebugDisplay.style.display = state.showTriggerDebug ? 'block' : 'none'; applyThemeToPage(); } // applyThemeToPage also considers showPageOverlay
function applyDebugPointerEventsStyle() { const elements = document.querySelectorAll(`#${CONFIG.UI_CONTAINER_ID} [style*="pointer-events: auto"], #${CONFIG.UI_CONTAINER_ID} button, #${CONFIG.UI_CONTAINER_ID} input, #${CONFIG.UI_CONTAINER_ID} select, #${CONFIG.UI_CONTAINER_ID} textarea, .divider-ph`); const outlineStyle = state.debugPointerEvents ? '1px dashed red' : ''; const outlineOffset = state.debugPointerEvents ? '1px' : ''; const nonInteractiveOutline = state.debugPointerEvents ? '1px dotted lightblue' : ''; elements.forEach(el => { const currentPointerEvents = getComputedStyle(el).pointerEvents; if (currentPointerEvents === 'auto' || currentPointerEvents === 'all' || (!el.hasAttribute('style') && ['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'].includes(el.tagName)) || el.classList.contains('divider-ph') ) { el.style.outline = outlineStyle; el.style.outlineOffset = outlineOffset; } else if (currentPointerEvents === 'none' && state.debugPointerEvents) { el.style.outline = nonInteractiveOutline; el.style.outlineOffset = outlineOffset; } else { el.style.outline = ''; el.style.outlineOffset = ''; }}); if (state.domElements.uiContainer && state.debugPointerEvents) { state.domElements.uiContainer.style.outline = getComputedStyle(state.domElements.uiContainer).pointerEvents === 'none' ? '1px solid blue' : outlineStyle; state.domElements.uiContainer.style.outlineOffset = getComputedStyle(state.domElements.uiContainer).pointerEvents === 'none' ? '-1px' : outlineOffset;} else if (state.domElements.uiContainer) { state.domElements.uiContainer.style.outline = '';}}
function processIncrementForCurrentTab(isManualAction = false, event = null) { if (isManualAction && state.uiLocked && event && (event.currentTarget === state.domElements.incrementButton || event.currentTarget === document )) {} else if (state.uiLocked && isManualAction) { logDebug('UI locked, increment ignored.'); return; } state.clicksForThisTab++; state.lastActionTimestampForThisTab = Date.now(); updateCounterDisplay(); updateLastActionTimerDisplay(); writeCurrentTabDataToLocalStorage(); readAllTabsDataFromLocalStorage(false); }
function handleDecrementClick() { if (state.uiLocked) return; if (state.clicksForThisTab > 0) { state.clicksForThisTab--; state.lastActionTimestampForThisTab = Date.now(); updateCounterDisplay(); updateLastActionTimerDisplay(); writeCurrentTabDataToLocalStorage(); readAllTabsDataFromLocalStorage(false); } }
function handleCounterInputDynamic(event) { const input = event.target; const valueLength = input.value.length; let newFontSize = CONFIG.MAIN_COUNTER_FONT_SIZE_INITIAL_EM; if (valueLength > CONFIG.MAIN_COUNTER_MAX_CHARS_BEFORE_RESIZE) { const overflowChars = valueLength - CONFIG.MAIN_COUNTER_MAX_CHARS_BEFORE_RESIZE; newFontSize = Math.max(CONFIG.MAIN_COUNTER_FONT_SIZE_MIN_EM, CONFIG.MAIN_COUNTER_FONT_SIZE_INITIAL_EM - overflowChars * 0.55); } input.style.fontSize = `${newFontSize}em`; input.style.width = `${Math.max(70, valueLength * (newFontSize * 0.6) + 20)}px`; }
function handleCounterInputChange(event) { if (state.uiLocked) { event.target.value = state.clicksForThisTab; handleCounterInputDynamic({target: event.target}); return; } let newValue = parseInt(event.target.value, 10); if (isNaN(newValue) || newValue < 0) newValue = state.clicksForThisTab; if (newValue !== state.clicksForThisTab) { state.clicksForThisTab = newValue; state.lastActionTimestampForThisTab = Date.now(); updateLastActionTimerDisplay(); writeCurrentTabDataToLocalStorage(); readAllTabsDataFromLocalStorage(false); } updateCounterDisplay(); }
function updateCounterDisplay() { if (state.domElements.mainCounterInput) { state.domElements.mainCounterInput.value = state.clicksForThisTab; handleCounterInputDynamic({target: state.domElements.mainCounterInput}); } }
function handleShiftSettingsChange() { state.shiftType = state.domElements.settingsShiftTypeSelect.value; determineAndSetShiftStartTime(false); setDynamicDefaultLunch(); if (state.domElements.settingsLunchSelect && state.selectedLunchOption) { const lunchSelect = state.domElements.settingsLunchSelect; lunchSelect.innerHTML = ''; let currentShiftCategory = 'any'; if (state.shiftType === 'day' || (state.shiftType === 'auto' && state.shiftStartTime && state.shiftStartTime.getHours() < _getNightStartHour() && state.shiftStartTime.getHours() >= _getDayStartHour())) currentShiftCategory = 'day'; else if (state.shiftType === 'night' || (state.shiftType === 'auto' && (state.shiftStartTime.getHours() >= _getNightStartHour() || state.shiftStartTime.getHours() < _getDayStartHour()))) currentShiftCategory = 'night'; const filteredLunchOptions = CONFIG.DEFAULT_LUNCH_OPTIONS.filter(opt => opt.type === currentShiftCategory || opt.type === 'any'); filteredLunchOptions.forEach((opt) => { const originalIndex = CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(opt); lunchSelect.add(new Option(opt.text, String(originalIndex))); }); const currentLunchOriginalIndex = state.selectedLunchOption ? CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(state.selectedLunchOption) : -1; if(currentLunchOriginalIndex > -1 && filteredLunchOptions.some(opt => CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(opt) === currentLunchOriginalIndex) ) lunchSelect.value = String(currentLunchOriginalIndex); else if (filteredLunchOptions.length > 0) { state.selectedLunchOption = filteredLunchOptions[0]; lunchSelect.value = String(CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(filteredLunchOptions[0]));} else { const noLunchOpt = CONFIG.DEFAULT_LUNCH_OPTIONS.find(opt => opt.start === "00:00" && opt.end === "00:00"); if (noLunchOpt) { state.selectedLunchOption = noLunchOpt; lunchSelect.value = String(CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(noLunchOpt)); } else { state.selectedLunchOption = CONFIG.DEFAULT_LUNCH_OPTIONS[0]; lunchSelect.value = "0";}}} updateManualShiftTimeInputVisibility(); updateStatistics(); saveDataToStorage(); }
function updateManualShiftTimeInputVisibility() { const isManual = state.shiftType !== 'auto'; const inputEl = state.domElements.settingsShiftStartTimeInput; const labelEl = inputEl?.previousElementSibling; if (inputEl) { inputEl.disabled = !isManual; inputEl.style.display = isManual ? 'block' : 'none'; if (labelEl && labelEl.tagName === 'LABEL') labelEl.style.display = isManual ? 'block' : 'none'; if (state.shiftStartTime) inputEl.value = formatDateToHHMM(state.shiftStartTime); } }
function handleLunchSettingChange() { const selectedIndex = parseInt(state.domElements.settingsLunchSelect.value, 10); if (CONFIG.DEFAULT_LUNCH_OPTIONS[selectedIndex]) { state.selectedLunchOption = CONFIG.DEFAULT_LUNCH_OPTIONS[selectedIndex]; updateStatistics(); saveDataToStorage(); } }
function handleAutoClickSettingChange(event) { state.autoClickEnabled = event.target.checked; logInfo(`Auto-click is ${state.autoClickEnabled ? 'ENABLED' : 'DISABLED'}`); saveDataToStorage(); if (state.autoClickEnabled && !state.mutationObserver) initializeMutationObserver(); else if (!state.autoClickEnabled && state.mutationObserver) { state.mutationObserver.disconnect(); state.mutationObserver = null; logDebug('MutationObserver disconnected.'); } }
function handleSaveCustomTheme() { const name = state.domElements.customTabNameInput.value.trim() || state.currentTabMode.name || CONFIG.DEFAULT_TAB_MODE_NAME; const color = state.domElements.customTabBkgColorInput.value.trim() || state.currentTabMode.color || CONFIG.DEFAULT_TAB_MODE_COLOR; const textColor = state.domElements.customTabTextColorInput.value.trim() || state.currentTabMode.textColor || CONFIG.DEFAULT_TAB_MODE_TEXT_COLOR; state.customTabThemes[state.currentTabFullUrl] = { name, color, textColor }; state.currentTabMode = { name, color, textColor, isCustom: true }; logInfo(`Custom theme saved for ${state.currentTabFullUrl}:`, state.currentTabMode); saveDataToStorage(); applyThemeToPage(); updateUITabIndicator(); }
function handleResetCustomTheme() { if (state.customTabThemes[state.currentTabFullUrl]) { delete state.customTabThemes[state.currentTabFullUrl]; logInfo(`Custom theme reset for ${state.currentTabFullUrl}.`); state.currentTabMode = determineCurrentTabMode(); saveDataToStorage(); applyThemeToPage(); updateUITabIndicator(); const defaultThemeForInputs = state.currentTabMode; state.domElements.customTabNameInput.value = defaultThemeForInputs.name; state.domElements.customTabBkgColorInput.value = defaultThemeForInputs.color; state.domElements.customTabTextColorInput.value = defaultThemeForInputs.textColor; } }
function handlePageKeydown(event) { if ((event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA' || event.target.isContentEditable) && !(event.code === CONFIG.INCREMENT_KEYBOARD_SHORTCUT_CODE && event.target !== state.domElements.mainCounterInput)) return; if (event.code === CONFIG.INCREMENT_KEYBOARD_SHORTCUT_CODE) { event.preventDefault(); processIncrementForCurrentTab(false, event); logDebug(`${CONFIG.INCREMENT_KEYBOARD_SHORTCUT_CODE} pressed`); if(state.domElements.incrementButton){ state.domElements.incrementButton.style.transform = 'scale(0.93)'; setTimeout(() => { if(state.domElements.incrementButton) state.domElements.incrementButton.style.transform = 'scale(1)'; }, 120);}} }
function determineAndSetShiftStartTime(forceAuto = false) { const now = new Date(); let shiftStartHour, shiftStartMinute; let calculatedStartTime = new Date(now); let determinedShiftCategory = ''; if (forceAuto || state.shiftType === 'auto') { const dayStartMins = timeStringToMinutes(CONFIG.DEFAULT_DAY_SHIFT_START_TIME); const nightStartMins = timeStringToMinutes(CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME); const currentMins = now.getHours() * 60 + now.getMinutes(); if (currentMins >= dayStartMins && currentMins < nightStartMins) { determinedShiftCategory = 'day'; [shiftStartHour, shiftStartMinute] = CONFIG.DEFAULT_DAY_SHIFT_START_TIME.split(':').map(Number); } else { determinedShiftCategory = 'night'; [shiftStartHour, shiftStartMinute] = CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME.split(':').map(Number); if (currentMins < dayStartMins) calculatedStartTime.setDate(now.getDate() - 1); } calculatedStartTime.setHours(shiftStartHour, shiftStartMinute, 0, 0); state.shiftStartTime = calculatedStartTime; if (state.shiftType === 'auto') state.shiftType = determinedShiftCategory; logDebug(`Auto Shift: ${state.shiftStartTime.toLocaleString()} (${state.shiftType})`); } else if (state.shiftType === 'day' || state.shiftType === 'night') { const timeValue = state.domElements.settingsShiftStartTimeInput?.value; let baseTime = state.shiftType === 'day' ? CONFIG.DEFAULT_DAY_SHIFT_START_TIME : CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME; if(timeValue) baseTime = timeValue; [shiftStartHour, shiftStartMinute] = baseTime.split(':').map(Number); calculatedStartTime.setHours(shiftStartHour, shiftStartMinute, 0, 0); if (state.shiftType === 'night' && (now.getHours() < shiftStartHour || (now.getHours() === shiftStartHour && now.getMinutes() < shiftStartMinute) )) calculatedStartTime.setDate(now.getDate() - 1); state.shiftStartTime = calculatedStartTime; logDebug(`Manual Shift '${state.shiftType}': ${state.shiftStartTime.toLocaleString()}`); } }
function updateRealTimeClockDisplay() { if(state.domElements.realTimeClock && state.showClock) state.domElements.realTimeClock.textContent = formatDateToHHMM(new Date(),true); }
function updateLastActionTimerDisplay() { if (!state.domElements.lastActionTimerDisplay || !state.showLastActionTimer) { if(state.domElements.lastActionTimerDisplay) state.domElements.lastActionTimerDisplay.style.display = 'none'; return; } state.domElements.lastActionTimerDisplay.style.display = 'block'; const elapsedMs = Date.now() - state.lastActionTimestampForThisTab; state.domElements.lastActionTimerDisplay.textContent = `Last: ${formatMsToDuration(elapsedMs, true).replace(/^00h\s*/, '')}`; const isWarn = elapsedMs > CONFIG.LAST_ACTION_TIMER_WARN_SECONDS * 1000; state.domElements.lastActionTimerDisplay.style.color = isWarn ? CONFIG.LAST_ACTION_TIMER_WARN_COLOR : CONFIG.UI_TEXT_COLOR; state.domElements.lastActionTimerDisplay.style.fontWeight = isWarn ? 'bold' : 'normal'; }
function updateStatistics() { if (!state.domElements.statsTextSummary || !state.showStats) { if(state.domElements.statsTextSummary) state.domElements.statsTextSummary.innerHTML = ''; return; } state.domElements.statsTextSummary.style.display = 'block'; if (!state.shiftStartTime) { determineAndSetShiftStartTime(true); if (!state.shiftStartTime) { state.domElements.statsTextSummary.innerHTML = '<p style="color:red;">Error: Shift start not set!</p>'; return; }} const now = new Date(); let totalElapsedMsOverall = now.getTime() - state.shiftStartTime.getTime(); if (totalElapsedMsOverall < 0) { state.domElements.statsTextSummary.innerHTML = `<p>Shift: <strong>${formatDateToHHMM(state.shiftStartTime)}</strong> (${state.shiftType})</p><p>Waiting...</p>`; return; } let lunchDurationMs = 0; const lunch = state.selectedLunchOption; if (lunch && (lunch.start !== "00:00" || lunch.end !== "00:00")) { const shiftBaseDate = new Date(state.shiftStartTime); shiftBaseDate.setHours(0,0,0,0); let LSAbs = new Date(shiftBaseDate); const [lsh, lsm] = lunch.start.split(':').map(Number); LSAbs.setHours(lsh, lsm, 0, 0); let LEAbs = new Date(shiftBaseDate); const [leh, lem] = lunch.end.split(':').map(Number); LEAbs.setHours(leh, lem, 0, 0); if (state.shiftType === 'night' && state.shiftStartTime.getHours() >= _getNightStartHour() && lsh < _getDayStartHour()) { LSAbs.setDate(LSAbs.getDate() + 1); LEAbs.setDate(LEAbs.getDate() + 1); } if (LEAbs < LSAbs) LEAbs.setDate(LEAbs.getDate() + 1); const effLS = Math.max(state.shiftStartTime.getTime(), LSAbs.getTime()); const effLE = Math.min(now.getTime(), LEAbs.getTime()); if (effLE > effLS) lunchDurationMs = effLE - effLS; } const effectiveWorkMsThisTab = Math.max(0, totalElapsedMsOverall - lunchDurationMs); const hoursWorkedThisTab = effectiveWorkMsThisTab / 3600000; const clicksPerHourThisTab = (hoursWorkedThisTab > 0.001) ? (state.clicksForThisTab / hoursWorkedThisTab) : 0; const globalClicksPerHour = (hoursWorkedThisTab > 0.001 && state.globalTotalClicks > 0) ? (state.globalTotalClicks / hoursWorkedThisTab) : 0; let statsHTML = `<p>Shift: <strong>${formatDateToHHMM(state.shiftStartTime)}</strong> (${state.shiftType})   Lunch: ${lunch ? lunch.text : 'N/A'}</p><div style="display:flex; justify-content:space-around; margin-top:5px;"><div style="text-align:center;"><div>This Tab (${state.currentTabMode.name}):</div><div>Completed: <strong>${state.clicksForThisTab}</strong></div><div>~<strong style="color:${CONFIG.MAIN_ACCENT_COLOR};font-size:1.1em;">${clicksPerHourThisTab.toFixed(1)}</strong>/hr</div><div>(in ${formatMsToDuration(effectiveWorkMsThisTab)})</div></div><div style="text-align:center; border-left: 1px solid ${CONFIG.UI_TEXT_COLOR}33; padding-left:10px; margin-left:10px;"><div>Global (Active Tabs):</div><div>Total: <strong>${state.globalTotalClicks}</strong></div><div>~<strong style="color:${CONFIG.MAIN_ACCENT_COLOR};font-size:1.1em;">${globalClicksPerHour.toFixed(1)}</strong>/hr</div></div></div>`; const otherTabsArray = Object.values(state.otherTabsData); if (otherTabsArray.length > 1 || (otherTabsArray.length === 1 && otherTabsArray[0].tabId !== state.currentTabId)){ statsHTML += `<div style="font-size:0.8em; margin-top:8px; border-top:1px solid ${CONFIG.UI_TEXT_COLOR}22; padding-top:5px; max-height: 50px; overflow-y:auto;">Details: ${otherTabsArray.map(td => `${td.modeName||td.tabId}: ${td.clicks} ${td.contributesToTotal?'(✓)':'(x)'}`).join('; ')}</div>`; } state.domElements.statsTextSummary.innerHTML = statsHTML; }
function initializeMutationObserver() { if (state.mutationObserver) state.mutationObserver.disconnect(); const observeTargetNode = document.querySelector(CONFIG.TRIGGER_OBSERVE_AREA_SELECTOR) || document.body; let debounceTimer = null; const processMutations = () => { if (!state.autoClickEnabled) return; const pageText = observeTargetNode.innerText || observeTargetNode.textContent || ""; const triggerRegex = new RegExp(`\\b${CONFIG.AUTO_CLICK_TRIGGER_WORD}\\b`, 'g'); const triggerIsCurrentlyFound = triggerRegex.test(pageText); let foundElementsPaths = []; if (CONFIG.DEBUG_MODE && state.showTriggerDebug) { if (triggerIsCurrentlyFound) foundElementsPaths = findElementsContainingText(observeTargetNode, CONFIG.AUTO_CLICK_TRIGGER_WORD); updateTriggerDebugDisplay(triggerIsCurrentlyFound, foundElementsPaths); } if (triggerIsCurrentlyFound && !state.isTriggerWordCurrentlyVisible) { logDebug(`Trigger "${CONFIG.AUTO_CLICK_TRIGGER_WORD}" DETECTED.`); state.isTriggerWordCurrentlyVisible = true; } else if (!triggerIsCurrentlyFound && state.isTriggerWordCurrentlyVisible) { logInfo(`Trigger "${CONFIG.AUTO_CLICK_TRIGGER_WORD}" DISAPPEARED. Auto-incrementing.`); processIncrementForCurrentTab(false); state.isTriggerWordCurrentlyVisible = false; }}; const observerCallback = () => { clearTimeout(debounceTimer); debounceTimer = setTimeout(processMutations, 150); }; state.mutationObserver = new MutationObserver(observerCallback); state.mutationObserver.observe(observeTargetNode, { childList: true, subtree: true, characterData: true }); logInfo(`MutationObserver initialized for "${CONFIG.AUTO_CLICK_TRIGGER_WORD}".`); setTimeout(processMutations, 250); }
function findElementsContainingText(root, text) { const paths = []; const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let node; const unique = new Set(); while((node=walker.nextNode())){if(node.nodeValue&&node.nodeValue.includes(text)){let p=[],el=node.parentElement;while(el&&el!==root&&p.length<5){let d=el.tagName.toLowerCase();if(el.id)d+=`#${el.id}`;if(el.className&&typeof el.className==='string')d+=`.${el.className.trim().split(/\s+/).join('.')}`;p.unshift(d);el=el.parentElement;}const ps=p.join(' > ');if(ps&&!unique.has(ps)&&paths.length<CONFIG.MAX_TRIGGER_DEBUG_LINES){unique.add(ps);paths.push(ps);}}} return paths; }
function updateTriggerDebugDisplay(isFound, paths = []) { if (!state.domElements.triggerDebugDisplay || !state.showTriggerDebug) { if(state.domElements.triggerDebugDisplay) state.domElements.triggerDebugDisplay.style.display = 'none'; return; } state.domElements.triggerDebugDisplay.style.display = 'block'; let html = `<strong>TrigDebug ("${CONFIG.AUTO_CLICK_TRIGGER_WORD}"):</strong> ${isFound?`<span style="color:lightgreen;">FOUND</span>`:`<span style="color:orange;">Not found</span>`} (VisFlag:${state.isTriggerWordCurrentlyVisible})<br>`; if(isFound&&paths.length>0) html+="Locs: "+paths.map(p=>`<code>${p.replace(/</g,'<').replace(/>/g,'>')}</code>`).join('; '); state.domElements.triggerDebugDisplay.innerHTML = html; }
function applyThemeToPage() { const mode = state.customTabThemes[state.currentTabFullUrl] || state.currentTabMode; if (state.domElements.pageColorOverlay) { state.domElements.pageColorOverlay.style.backgroundColor = mode.color; state.domElements.pageColorOverlay.style.display = state.showPageOverlay ? 'block' : 'none'; } if (state.domElements.pageIndicatorText) { state.domElements.pageIndicatorText.textContent = mode.name.substring(0, 10); state.domElements.pageIndicatorText.style.color = mode.textColor; state.domElements.pageIndicatorText.style.display = state.showPageOverlay ? 'block' : 'none'; } if (state.domElements.uiTabIndicatorText) { state.domElements.uiTabIndicatorText.textContent = mode.name; state.domElements.uiTabIndicatorText.style.color = mode.textColor || CONFIG.UI_TEXT_COLOR; }}
function applyDebugPointerEventsStyle() { const elements = document.querySelectorAll(`#${CONFIG.UI_CONTAINER_ID} [style*="pointer-events: auto"], #${CONFIG.UI_CONTAINER_ID} button, #${CONFIG.UI_CONTAINER_ID} input, #${CONFIG.UI_CONTAINER_ID} select, #${CONFIG.UI_CONTAINER_ID} textarea, .divider-ph`); const outlineStyle = state.debugPointerEvents ? '1px dashed red' : ''; const outlineOffset = state.debugPointerEvents ? '1px' : ''; const nonInteractiveOutline = state.debugPointerEvents ? '1px dotted lightblue' : ''; elements.forEach(el => { const computedPointerEvents = getComputedStyle(el).pointerEvents; if (computedPointerEvents === 'auto' || computedPointerEvents === 'all' || (!el.style.pointerEvents && ['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'].includes(el.tagName)) || el.classList.contains('divider-ph') ) { el.style.outline = outlineStyle; el.style.outlineOffset = outlineOffset; } else if (computedPointerEvents === 'none' && state.debugPointerEvents) { el.style.outline = nonInteractiveOutline; el.style.outlineOffset = outlineOffset; } else { el.style.outline = ''; el.style.outlineOffset = ''; }}); if (state.domElements.uiContainer && state.debugPointerEvents) { state.domElements.uiContainer.style.outline = getComputedStyle(state.domElements.uiContainer).pointerEvents === 'none' ? '1px solid blue' : outlineStyle; state.domElements.uiContainer.style.outlineOffset = getComputedStyle(state.domElements.uiContainer).pointerEvents === 'none' ? '-1px' : outlineOffset;} else if (state.domElements.uiContainer) { state.domElements.uiContainer.style.outline = '';}}
function initialize() { if (document.getElementById(CONFIG.UI_CONTAINER_ID) || window.productionHelperV3_2_Initialized) { logError('Prod Helper UI v3.2 already initialized.'); if (typeof window.destroyProductionHelperV3_2 === 'function') { try { window.destroyProductionHelperV3_2(); } catch (e) { logError("Error destroying previous instance", e); } setTimeout(() => { delete window.productionHelperV3_2_Initialized; initialize(); }, 250); } return; } actualInit(); }
function actualInit(){ logInfo('Initializing Production Helper v3.2 (Intl)...'); loadDataFromStorage(); buildMainUI(); applyThemeToPage(); applyVisibilitySettings(); applyDebugPointerEventsStyle(); updateRealTimeClockDisplay(); updateStatistics(); updateLastActionTimerDisplay(); state.intervals.realTimeClock = setInterval(updateRealTimeClockDisplay, 1000); state.intervals.lastActionTimer = setInterval(updateLastActionTimerDisplay, 1000); state.intervals.statistics = setInterval(updateStatistics, CONFIG.STATS_UPDATE_INTERVAL_MS); state.intervals.multiTabWrite = setInterval(writeCurrentTabDataToLocalStorage, CONFIG.MULTI_TAB_UPDATE_INTERVAL_MS); state.intervals.multiTabRead = setInterval(() => readAllTabsDataFromLocalStorage(false), CONFIG.MULTI_TAB_READ_INTERVAL_MS); if (state.autoClickEnabled) initializeMutationObserver(); state.pageKeydownListener = handlePageKeydown; document.addEventListener('keydown', state.pageKeydownListener); window.addEventListener('beforeunload', () => { logDebug("beforeunload: Saving data..."); writeCurrentTabDataToLocalStorage(); saveDataToStorage(); }); window.productionHelperV3_2_Initialized = true; logInfo('Production Helper v3.2 (Intl) initialized successfully.');}
function destroy() { logInfo('Destroying Production Helper v3.2 (Intl)...'); try { writeCurrentTabDataToLocalStorage(); saveDataToStorage(); } catch (e) { logError("Error saving on destroy:", e); } if (state.mutationObserver) state.mutationObserver.disconnect(); Object.values(state.intervals).forEach(clearInterval); state.intervals = {}; const idsToRemove = [ CONFIG.UI_CONTAINER_ID, 'emergencyShowBtn_v3_2', CONFIG.PAGE_COLOR_OVERLAY_ID, CONFIG.PAGE_INDICATOR_TEXT_ID ]; idsToRemove.forEach(id => { const el = document.getElementById(id); if (el) el.remove(); }); state.domElements = { leftPane: null, rightPane: null, divider: null }; if(state.pageKeydownListener) document.removeEventListener('keydown', state.pageKeydownListener); delete window.productionHelperV3_2_Initialized; logInfo('Production Helper v3.2 (Intl) destroyed.');}
window.destroyProductionHelperV3_2 = destroy;
if (document.readyState === 'complete' || document.readyState === 'interactive') { initialize(); } else { document.addEventListener('DOMContentLoaded', initialize, { once: true }); }


    
})(); // End of main IIFE
