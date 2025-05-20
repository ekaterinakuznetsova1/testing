// == Production Assistant v3.0 (International, Multi-Tab) ==
// Purpose: Highly configurable, multi-tab aware UI for production statistics and automation.
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
        UI_CONTAINER_ID: 'prodHelperUI_v3_intl',
        UI_BOTTOM_OFFSET: '10px',
        UI_RIGHT_OFFSET: '10px',
        UI_WIDTH_PERCENT_VIEWPORT: 40,    // As in your l.js
        UI_HEIGHT_PERCENT_VIEWPORT: 30,   // As in your l.js
        UI_MIN_HEIGHT_PX: 220,            // As in your l.js
        UI_BACKGROUND_COLOR: 'rgba(0, 0, 0, 0.0)',
        UI_TEXT_COLOR: 'rgba(128, 128, 128, 0.7)',
        UI_BORDER_COLOR: 'rgba(0, 0, 0, 0.0)',
        FONT_FAMILY: '"Segoe UI", Roboto, Arial, sans-serif',
        MAIN_ACCENT_COLOR: 'rgba(80, 80, 80, 0.4)', // Slightly increased alpha

        // --- Clicker & Counter ---
        MAIN_COUNTER_INPUT_ID: 'mainProdCounterInput_v3',
        MAIN_COUNTER_FONT_SIZE_INITIAL_EM: 4.5,
        MAIN_COUNTER_FONT_SIZE_MIN_EM: 2.0, // Min font size when numbers get too long
        MAIN_COUNTER_MAX_CHARS_BEFORE_RESIZE: 3, // Resize font if more than 3 digits
        SHOW_DECREMENT_BUTTON: true,     // Option to hide decrement button
        CLICKER_INCREMENT_BUTTON_ID: 'incrementProdBtn_v3',
        CLICKER_INCREMENT_BUTTON_COLOR: 'rgba(0, 0, 0, 0.3)',
        CLICKER_DECREMENT_BUTTON_ID: 'decrementProdBtn_v3',
        CLICKER_DECREMENT_BUTTON_COLOR: 'rgba(10, 0, 0, 0.13)',
        INCREMENT_KEYBOARD_SHORTCUT_CODE: 'ShiftRight', // e.g., 'PageDown', 'ShiftRight', 'ControlLeft'

        // --- Timer for Last Action ---
        LAST_ACTION_TIMER_ID: 'lastActionTimer_v3',
        LAST_ACTION_TIMER_WARN_SECONDS: 8 * 60, // 10 minutes
        LAST_ACTION_TIMER_WARN_COLOR: 'rgba(255, 0, 0, 0.7)',

        // --- Real-time Clock ---
        CLOCK_DISPLAY_ID: 'prodRealTimeClock_v3',
        CLOCK_FONT_SIZE_EM: 5.5,

        // --- Tabs/Modes Overlay & Identification ---
        TAB_OVERLAY_ID_PREFIX: 'prodHelperTabOverlay_',
        TAB_IDENTIFICATION_MODES: [ // User can define multiple modes
            { name: 'REFURB', keyword: 'REFURB', color: 'rgba(255, 165, 0, 0.03)', textColor: 'rgba(200, 100, 0, 0.07)'},
            { name: 'C-RET', keyword: 'CUSTOMER', color: 'rgba(0, 165, 255, 0.03)', textColor: 'rgba(0, 100, 200, 0.07)'},
            { name: 'WHD', keyword: 'WAREHOUSE', color: 'rgba(100, 255, 100, 0.03)', textColor: 'rgba(50, 180, 50, 0.07)'},
            // Add more modes as needed
        ],
        DEFAULT_TAB_MODE_NAME: 'UNKWN', // Default if no keyword match
        DEFAULT_TAB_MODE_COLOR: 'rgba(128, 128, 128, 0.02)',
        DEFAULT_TAB_MODE_TEXT_COLOR: 'rgba(100, 100, 100, 0.05)',
        TAB_INDICATOR_TEXT_ID: 'prodHelperTabIndicator_v3',
        TAB_INDICATOR_FONT_SIZE_EM: 1.5,

        // --- Multi-Tab State Sync via localStorage ---
        // Unique ID for this script instance. Will be appended with tab mode.
        // It's better to let user define unique part in Storage if needed, or derive from URL path.
        // For now, we'll derive a unique ID from the path/search part of URL
        MULTI_TAB_STORAGE_PREFIX: 'prodHelper_tabs_v3_',
        MULTI_TAB_UPDATE_INTERVAL_MS: 1000, // How often to write to localStorage
        MULTI_TAB_READ_INTERVAL_MS: 1500,   // How often to read from localStorage
        MULTI_TAB_DATA_TTL_MS: 5 * 60 * 1000, // 5 minutes: data older than this is considered stale for a tab

        // --- Shift Settings ---
        DEFAULT_DAY_SHIFT_START_TIME: '06:27',
        DEFAULT_NIGHT_SHIFT_START_TIME: '18:27',
        SETTINGS_SHIFT_TYPE_SELECT_ID: 'shiftTypeSelect_v3',
        SETTINGS_SHIFT_START_TIME_INPUT_ID: 'shiftStartTimeInput_v3',

        // --- Lunch Settings ---
        SETTINGS_LUNCH_TIME_SELECT_ID: 'lunchTimeSelect_v3',
        DEFAULT_LUNCH_OPTIONS: [ /* Same as your l.js */
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

        // --- Statistics Display ---
        STATS_TEXT_SUMMARY_ID: 'prodStatsSummary_v3',
        STATS_FONT_SIZE_EM: 2,
        STATS_UPDATE_INTERVAL_MS: 3000,
        // Configuration for which tabs contribute to the main "Clicks/Hour"
        // This will be a setting in the UI: array of tab IDs (keywords)
        // Default to current tab only for now, user configures in settings.

        // --- Auto-Clicker Trigger ---
        AUTO_CLICK_TRIGGER_WORD: 'wysłano', // New trigger word
        TRIGGER_OBSERVE_AREA_SELECTOR: 'body', // Observe whole body
        AUTO_CLICK_ENABLED_CHECKBOX_ID: 'autoClickEnabled_v3',
        TRIGGER_DEBUG_DISPLAY_ID: 'triggerDebugDisplay_v3',
        MAX_TRIGGER_DEBUG_LINES: 20,

        // --- Storage ---
        STORAGE_KEY_PREFIX_MAIN_SETTINGS: 'prodHelper_mainCfg_v3_', // For main UI settings
        USE_SESSION_STORAGE_FOR_MAIN_SETTINGS: true,

        // --- UI Lock & Settings Panel ---
        SETTINGS_PANEL_ID: 'prodHelperSettingsPanel_v3',
        // Texts from your l.js
        EMERGENCY_HIDE_BUTTON_TEXT: 'CLOSE',
        LOCK_UI_BUTTON_TEXT_UNLOCKED: 'UI block',
        LOCK_UI_BUTTON_TEXT_LOCKED: 'UI unblock',
        TOGGLE_SETTINGS_BUTTON_TEXT_CLOSED: 'settings',
        TOGGLE_SETTINGS_BUTTON_TEXT_OPENED: 'settings', // Can be different if desired e.g., 'settings ◀'

        // --- UI Element Visibility Toggles in Settings ---
        SETTINGS_SHOW_CLOCK_CHECKBOX_ID: 'showClockToggle_v3',
        SETTINGS_SHOW_STATS_CHECKBOX_ID: 'showStatsToggle_v3',
        SETTINGS_SHOW_LAST_ACTION_TIMER_CHECKBOX_ID: 'showLastActionTimerToggle_v3',
        SETTINGS_SHOW_TAB_INDICATOR_CHECKBOX_ID: 'showTabIndicatorToggle_v3',
        SETTINGS_SHOW_TRIGGER_DEBUG_CHECKBOX_ID: 'showTriggerDebugToggle_v3',
        SETTINGS_CURRENT_TAB_CONTRIBUTES_TO_TOTAL_CHECKBOX_ID: 'currentTabContributes_v3',
        // Dynamic checkboxes for other tabs will be generated.

        DEBUG_MODE: true, // Verbose console logs. Set to false for production.
    };

    // --- ------------------------------------------------------------------------ ---
    // --- --------- SCRIPT STATE (Internal - Do not modify directly) ----------- ---
    // --- ------------------------------------------------------------------------ ---
    const state = {
        uiVisible: true,
        uiLocked: false,
        settingsPanelVisible: false,

        // Current Tab's own data
        currentTabId: '', // Will be derived from URL or set by user
        currentTabMode: { name: CONFIG.DEFAULT_TAB_MODE_NAME, keyword: '', color: CONFIG.DEFAULT_TAB_MODE_COLOR, textColor: CONFIG.DEFAULT_TAB_MODE_TEXT_COLOR },
        globalTotalClicks: 0, // This will be the sum from contributing tabs
        clicksForThisTab: 0,  // Clicks performed ON THIS TAB instance
        lastActionTimestampForThisTab: Date.now(),

        // Shift and Lunch for this tab instance
        shiftType: 'auto',
        shiftStartTime: null,
        selectedLunchOption: null,

        // Controls
        autoClickEnabled: true,
        isTriggerWordCurrentlyVisible: false, // For 'wysłano'
        triggerLastFoundIn: null, // For debug: path to element

        // Visibility settings for UI elements
        showClock: true,
        showStats: true,
        showLastActionTimer: true,
        showTabIndicator: true,
        showTriggerDebug: CONFIG.DEBUG_MODE, // Show debug by default if global debug is on
        currentTabContributesToTotal: true, // Whether this tab's clicks add to the global Clicks/Hour

        // Data for/from other tabs
        otherTabsData: {}, // { tabId1: {clicks, lastAction, timestamp, contributes}, tabId2: ... }

        // General
        sessionStartTimestamp: Date.now(),
        domElements: {},
        intervals: {},
        mutationObserver: null,
        pageKeydownListener: null,
    };

    // --- ------------------------------------------------------------------------ ---
    // --- --------------------- UTILITY FUNCTIONS ------------------------------ ---
    // --- ------------------------------------------------------------------------ ---
    function logDebug(...args) { if (CONFIG.DEBUG_MODE) console.debug(`[PHv3 DEBUG ${state.currentTabMode?.name || ''}]`, ...args); }
    function logInfo(...args) { console.info(`[PHv3 INFO ${state.currentTabMode?.name || ''}]`, ...args); }
    function logError(...args) { console.error(`[PHv3 ERROR ${state.currentTabMode?.name || ''}]`, ...args); }

    function getStorage(useSession = CONFIG.USE_SESSION_STORAGE_FOR_MAIN_SETTINGS) {
        return useSession ? sessionStorage : localStorage;
    }

    function generateTabIdFromUrl() {
        // Generates a somewhat unique ID from pathname + search, removing common prefixes
        // This needs to be robust enough to distinguish your different /workspace?code_mode=X pages.
        let path = window.location.pathname.replace(/^\//, '').replace(/\/$/, '');
        let search = window.location.search.replace(/^\?/, '');
        let id = `${path}${search ? '_' + search : ''}`.replace(/[^a-zA-Z0-9_-]/g, '_'); // Sanitize
        return id || 'default_tab'; // Fallback
    }

    // Function to get current tab_mode object based on URL
    function getCurrentTabModeFromUrl() {
        const url = window.location.href.toUpperCase(); // Case-insensitive keyword matching
        for (const mode of CONFIG.TAB_IDENTIFICATION_MODES) {
            if (url.includes(mode.keyword.toUpperCase())) {
                return { ...mode }; // Return a copy
            }
        }
        return { name: CONFIG.DEFAULT_TAB_MODE_NAME, keyword: '', color: CONFIG.DEFAULT_TAB_MODE_COLOR, textColor: CONFIG.DEFAULT_TAB_MODE_TEXT_COLOR };
    }


    function saveDataToStorage() { // Saves MAIN settings and this tab's contribution preference
        try {
            const storage = getStorage(); // Main settings usually session
            const lunchIndex = state.selectedLunchOption
                ? CONFIG.DEFAULT_LUNCH_OPTIONS.findIndex(opt => opt.start === state.selectedLunchOption.start && opt.end === state.selectedLunchOption.end && opt.type === state.selectedLunchOption.type)
                : -1;

            const dataToSave = {
                // clicksForThisTab: state.clicksForThisTab, // This is now saved by writeCurrentTabDataToLocalStorage
                shiftType: state.shiftType,
                shiftStartTimeISO: state.shiftStartTime ? state.shiftStartTime.toISOString() : null,
                selectedLunchOptionIndex: lunchIndex,
                autoClickEnabled: state.autoClickEnabled,
                uiVisible: state.uiVisible,
                uiLocked: state.uiLocked,
                settingsPanelVisible: state.settingsPanelVisible,
                showClock: state.showClock,
                showStats: state.showStats,
                showLastActionTimer: state.showLastActionTimer,
                showTabIndicator: state.showTabIndicator,
                showTriggerDebug: state.showTriggerDebug,
                currentTabContributesToTotal: state.currentTabContributesToTotal,
                // Notes are not saved as they are not in the UI per image.
            };
            storage.setItem(CONFIG.STORAGE_KEY_PREFIX_MAIN_SETTINGS + state.currentTabId, JSON.stringify(dataToSave));
            logDebug('Main settings saved for tab:', state.currentTabId, dataToSave);
        } catch (e) { logError('Failed to save main settings:', e); }
    }

    function loadDataFromStorage() { // Loads MAIN settings for this tab
        state.currentTabId = generateTabIdFromUrl();
        state.currentTabMode = getCurrentTabModeFromUrl();
        logInfo(`Current Tab ID: ${state.currentTabId}, Mode: ${state.currentTabMode.name}`);

        try {
            const storage = getStorage();
            const savedDataJSON = storage.getItem(CONFIG.STORAGE_KEY_PREFIX_MAIN_SETTINGS + state.currentTabId);

            if (savedDataJSON) {
                const savedData = JSON.parse(savedDataJSON);
                // state.clicksForThisTab not loaded here, comes from multi-tab storage
                state.shiftType = savedData.shiftType || 'auto';
                if (savedData.shiftStartTimeISO) state.shiftStartTime = new Date(savedData.shiftStartTimeISO);

                const lunchIndex = parseInt(savedData.selectedLunchOptionIndex, 10);
                if (!isNaN(lunchIndex) && lunchIndex >=0 && CONFIG.DEFAULT_LUNCH_OPTIONS[lunchIndex]) {
                    state.selectedLunchOption = CONFIG.DEFAULT_LUNCH_OPTIONS[lunchIndex];
                }

                state.autoClickEnabled = typeof savedData.autoClickEnabled === 'boolean' ? savedData.autoClickEnabled : true;
                state.uiVisible = typeof savedData.uiVisible === 'boolean' ? savedData.uiVisible : true;
                state.uiLocked = typeof savedData.uiLocked === 'boolean' ? savedData.uiLocked : false;
                state.settingsPanelVisible = typeof savedData.settingsPanelVisible === 'boolean' ? savedData.settingsPanelVisible : false;

                state.showClock = typeof savedData.showClock === 'boolean' ? savedData.showClock : true;
                state.showStats = typeof savedData.showStats === 'boolean' ? savedData.showStats : true;
                state.showLastActionTimer = typeof savedData.showLastActionTimer === 'boolean' ? savedData.showLastActionTimer : true;
                state.showTabIndicator = typeof savedData.showTabIndicator === 'boolean' ? savedData.showTabIndicator : true;
                state.showTriggerDebug = typeof savedData.showTriggerDebug === 'boolean' ? savedData.showTriggerDebug : CONFIG.DEBUG_MODE;
                state.currentTabContributesToTotal = typeof savedData.currentTabContributesToTotal === 'boolean' ? savedData.currentTabContributesToTotal : true;

                logInfo('Main settings loaded for tab:', state.currentTabId);
            } else {
                logInfo('No saved main settings found for this tab. Initializing defaults.');
                 //Contribution is true by default on first load for a tab
                state.currentTabContributesToTotal = true;
            }

            if (!state.shiftStartTime || !(state.shiftStartTime instanceof Date) || isNaN(state.shiftStartTime.getTime())) {
                determineAndSetShiftStartTime(true);
            }
            if (!state.selectedLunchOption) {
                 setDynamicDefaultLunch();
            }

        } catch (e) {
            logError('Failed to load main settings:', e);
            determineAndSetShiftStartTime(true);
            setDynamicDefaultLunch();
        }
        // Load this tab's specific click data (and potentially others if starting up)
        readAllTabsDataFromLocalStorage(true); // true to initialize this tab's clicks if found
    }


    function writeCurrentTabDataToLocalStorage() {
        if (!state.currentTabId) return; // Should not happen
        try {
            const tabData = {
                tabId: state.currentTabId,
                modeName: state.currentTabMode.name,
                clicks: state.clicksForThisTab,
                lastActionTimestamp: state.lastActionTimestampForThisTab,
                contributesToTotal: state.currentTabContributesToTotal, // Include contribution status
                timestamp: Date.now() // Last updated timestamp
            };
            localStorage.setItem(CONFIG.MULTI_TAB_STORAGE_PREFIX + state.currentTabId, JSON.stringify(tabData));
            logDebug('Wrote data for tab', state.currentTabId, 'to localStorage');
        } catch (e) {
            logError('Error writing tab data to localStorage:', e);
        }
    }

    function readAllTabsDataFromLocalStorage(isInitialLoad = false) {
        let newOtherTabsData = {};
        let currentGlobalTotalClicks = 0;
        const now = Date.now();

        try {
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith(CONFIG.MULTI_TAB_STORAGE_PREFIX)) {
                    const itemJson = localStorage.getItem(key);
                    if (itemJson) {
                        try {
                            const itemData = JSON.parse(itemJson);
                            // Check if data is stale
                            if (now - (itemData.timestamp || 0) > CONFIG.MULTI_TAB_DATA_TTL_MS) {
                                logDebug(`Data for tab ${itemData.tabId} is stale. Removing.`);
                                localStorage.removeItem(key); // Remove stale data
                                continue;
                            }

                            if (itemData.tabId === state.currentTabId) {
                                if (isInitialLoad) { // Only on initial load, restore clicks and last action for current tab
                                    state.clicksForThisTab = parseInt(itemData.clicks, 10) || 0;
                                    state.lastActionTimestampForThisTab = parseInt(itemData.lastActionTimestamp, 10) || Date.now();
                                    // state.currentTabContributesToTotal is loaded from main settings, not here.
                                    logInfo(`Restored data for current tab ${state.currentTabId}: Clicks=${state.clicksForThisTab}`);
                                }
                                // Always update its contribution status in the collected data
                                newOtherTabsData[itemData.tabId] = { ...itemData, contributesToTotal: state.currentTabContributesToTotal };
                            } else {
                                newOtherTabsData[itemData.tabId] = itemData;
                            }

                            if (newOtherTabsData[itemData.tabId].contributesToTotal) {
                                currentGlobalTotalClicks += (parseInt(newOtherTabsData[itemData.tabId].clicks, 10) || 0);
                            }

                        } catch (parseError) {
                            logError(`Error parsing data for key ${key}:`, parseError);
                            localStorage.removeItem(key); // Remove corrupted data
                        }
                    }
                }
            }
        } catch (e) {
            logError('Error reading from localStorage:', e);
        }
        state.otherTabsData = newOtherTabsData;
        state.globalTotalClicks = currentGlobalTotalClicks; // This total is based on what other tabs *say* they contribute

        // If it's initial load and current tab's clicks were restored, they are already in its own state.
        // The globalTotalClicks calculation needs to ensure it doesn't double-count if the current tab's
        // data was also found in localStorage and its contribute flag was true.
        // The logic above should handle this correctly by using itemData.clicks for summation.

        logDebug('Read other tabs data:', state.otherTabsData, 'Global total clicks:', state.globalTotalClicks);
        updateStatistics(); // Update UI with new totals
        updateOtherTabsSettingsDisplay(); // Update checkboxes in settings for other tabs
    }

    // ... (timeStringToMinutes, formatDateToHHMM, formatMsToDuration, createDOMElement - same as previous version)
    // (These are essential utilities and remain unchanged unless specific styling needs adjustment)
    function timeStringToMinutes(timeStr) {
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

    function formatMsToDuration(ms, includeSeconds = false) {
        if (isNaN(ms) || ms < 0) ms = 0;
        let totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        if (includeSeconds) {
             return `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;
        }
        return `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m`;
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

        function setDynamicDefaultLunch() {
        let potentialShiftType = state.shiftType;

        // If shift type is 'auto', we need to guess the current actual shift (day/night)
        // based on current time and configured shift start times.
        if (potentialShiftType === 'auto') {
            if (state.shiftStartTime) { // If shiftStartTime has been determined by auto-logic
                const shiftStartHour = state.shiftStartTime.getHours();
                // A simple heuristic: if shift starts between typical day start and before typical night start, assume day.
                // This uses the _getHour helpers for clarity.
                potentialShiftType = (shiftStartHour >= _getDayStartHour() && shiftStartHour < _getNightStartHour()) ? 'day' : 'night';
            } else {
                // Fallback if shiftStartTime isn't even set yet (e.g. very early in init)
                // try to guess based on current time directly
                const now = new Date();
                const currentHour = now.getHours();
                potentialShiftType = (currentHour >= _getDayStartHour() && currentHour < _getNightStartHour()) ? 'day' : 'night';
            }
        }

        // Find the first suitable lunch option for the determined (or set) shift type or 'any'
        const defaultLunch = CONFIG.DEFAULT_LUNCH_OPTIONS.find(
            opt => opt.type === potentialShiftType
        ) || CONFIG.DEFAULT_LUNCH_OPTIONS.find( // Fallback to 'any' type
            opt => opt.type === "any"
        ) || CONFIG.DEFAULT_LUNCH_OPTIONS[0]; // Absolute fallback to the very first option

        state.selectedLunchOption = defaultLunch;
        logDebug("Dynamic default lunch set to:", state.selectedLunchOption ? state.selectedLunchOption.text : "None");
    }

    // Helper functions to get start hours for day/night shifts for setDynamicDefaultLunch
    function _getDayStartHour() {
        return parseInt(CONFIG.DEFAULT_DAY_SHIFT_START_TIME.split(':')[0], 10);
    }

    function _getNightStartHour() {
        return parseInt(CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME.split(':')[0], 10);
    }
    // ... (Rest of the script: UI Building, Event Handlers, Core Logic, Init)
    // This will be substantial and provided in subsequent parts if needed.
 // == Production Assistant v3.0 (International, Multi-Tab) ==
// (Продолжение предыдущего блока кода)

    // --- ------------------------------------------------------------------------ ---
    // --- ----------------------- UI ELEMENT ASSEMBLY -------------------------- ---
    // --- ------------------------------------------------------------------------ ---

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
                border: CONFIG.UI_BORDER_COLOR === 'rgba(0, 0, 0, 0.0)' ? 'none' : `1px solid ${CONFIG.UI_BORDER_COLOR}`,
                borderRadius: '0px', boxSizing: 'border-box', color: CONFIG.UI_TEXT_COLOR,
                fontFamily: CONFIG.FONT_FAMILY, zIndex: '2147483640', // Lower than settings, higher than overlay
                display: 'flex', flexDirection: 'column', padding: '8px 12px', overflow: 'hidden',
                boxShadow: CONFIG.UI_BACKGROUND_COLOR === 'rgba(0, 0, 0, 0.0)' ? 'none' : '0 2px 10px rgba(0,0,0,0.15)',
                transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
                pointerEvents: 'none', // Allow clicks through main container by default
            }
        });
        state.domElements.uiContainer = uiContainer;

        // --- Top Controls Bar (Settings, Lock, Hide) ---
        const topControls = createDOMElement('div', {
            style: {
                display: 'flex', justifyContent: 'flex-end', alignItems: 'center',
                marginBottom: '5px', flexShrink: 0, pointerEvents: 'auto' // Make controls clickable
            }
        });
        const controlButtonBaseStyle = {
            cursor: 'pointer', background: 'none', border: 'none',
            color: CONFIG.UI_TEXT_COLOR, borderRadius: '3px', padding: '3px 7px', fontSize: '0.75em',
            marginLeft: '8px', opacity: '0.6', transition: 'opacity 0.2s'
        };
        controlButtonBaseStyle[':hover'] = { opacity: '1' };

        state.domElements.toggleSettingsButton = createDOMElement('button', {
            id: CONFIG.TOGGLE_SETTINGS_BUTTON_TEXT_CLOSED, textContent: CONFIG.TOGGLE_SETTINGS_BUTTON_TEXT_CLOSED,
            title: 'Open/Close Settings', style: {...controlButtonBaseStyle}
        });
        state.domElements.toggleSettingsButton.addEventListener('click', toggleSettingsPanelVisibility);

        state.domElements.lockUIButton = createDOMElement('button', {
            id: 'lockProdUIBtn_v3', textContent: CONFIG.LOCK_UI_BUTTON_TEXT_UNLOCKED,
            title: 'Lock/Unlock UI (except clicker/shortcut)', style: {...controlButtonBaseStyle}
        });
        state.domElements.lockUIButton.addEventListener('click', toggleUILockState);

        state.domElements.emergencyHideButton = createDOMElement('button', {
            id: 'hideProdUIBtn_v3', textContent: CONFIG.EMERGENCY_HIDE_BUTTON_TEXT,
            title: 'Hide UI Panel', style: { ...controlButtonBaseStyle, color: CONFIG.LAST_ACTION_TIMER_WARN_COLOR, fontWeight: 'bold' }
        });
        state.domElements.emergencyHideButton.addEventListener('click', () => setUIVisibility(false));

        topControls.append(state.domElements.toggleSettingsButton, state.domElements.lockUIButton, state.domElements.emergencyHideButton);
        uiContainer.appendChild(topControls);

        // --- Main Content Area ---
        const mainContentArea = createDOMElement('div', {
            style: {
                display: 'flex', flexGrow: 1, gap: '10px', overflow: 'hidden',
                position: 'relative', pointerEvents: 'none' // By default, passes clicks through
            }
        });

        // Clicker Area (Left - takes available space)
        const clickerArea = createDOMElement('div', {
            style: {
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                flexGrow: 1, pointerEvents: 'auto' // This area itself is clickable for its children
            }
        });
        state.domElements.mainCounterInput = createDOMElement('input', {
            type: 'number', id: CONFIG.MAIN_COUNTER_INPUT_ID, value: state.clicksForThisTab, // Show THIS tab's clicks here
            style: {
                fontSize: `${CONFIG.MAIN_COUNTER_FONT_SIZE_INITIAL_EM}em`,
                fontWeight: '600', color: CONFIG.UI_TEXT_COLOR, opacity: '0.8', marginBottom: '10px',
                textAlign: 'center', background: 'none', border: 'none', width: 'auto', minWidth: '80px', maxWidth: '250px',
                outline: 'none', padding: '0 5px', pointerEvents: 'auto' // Input field itself needs pointer events
            }
        });
        state.domElements.mainCounterInput.addEventListener('change', handleCounterInputChange);
        state.domElements.mainCounterInput.addEventListener('input', handleCounterInputDynamic);


        const clickerButtonsContainer = createDOMElement('div', { style: { display: 'flex', alignItems: 'center', pointerEvents: 'auto'} });
        const clickerBtnStyle = {
            padding: '10px 15px', fontSize: '1.6em', cursor: 'pointer',
            color: CONFIG.UI_TEXT_COLOR, opacity: '0.7', border: 'none', borderRadius: '6px',
            boxShadow: 'none', transition: 'transform 0.1s, opacity 0.2s', pointerEvents: 'auto'
        };
        clickerBtnStyle[':hover'] = { opacity: '1' };

        if (CONFIG.SHOW_DECREMENT_BUTTON) {
            state.domElements.decrementButton = createDOMElement('button', {
                id: CONFIG.CLICKER_DECREMENT_BUTTON_ID, textContent: '━', title: 'Decrement (-1)', // Em dash or Minus sign
                style: { ...clickerBtnStyle, backgroundColor: CONFIG.CLICKER_DECREMENT_BUTTON_COLOR, marginRight: '20px', fontSize: '0.8em' }
            });
            state.domElements.decrementButton.addEventListener('click', handleDecrementClick);
            makeButtonInteractive(state.domElements.decrementButton);
            clickerButtonsContainer.appendChild(state.domElements.decrementButton);
        }

        state.domElements.incrementButton = createDOMElement('button', {
            id: CONFIG.CLICKER_INCREMENT_BUTTON_ID, textContent: '✚', title: `Increment (+1) or ${CONFIG.INCREMENT_KEYBOARD_SHORTCUT_CODE}`, // Plus sign
            style: { ...clickerBtnStyle, backgroundColor: CONFIG.CLICKER_INCREMENT_BUTTON_COLOR, fontSize: '2em', padding: CONFIG.SHOW_DECREMENT_BUTTON ? '12px 20px' : '15px 30px' }
        });
        state.domElements.incrementButton.addEventListener('click', (event) => processIncrementForCurrentTab(true, event));
        makeButtonInteractive(state.domElements.incrementButton);
        clickerButtonsContainer.appendChild(state.domElements.incrementButton);

        clickerArea.append(state.domElements.mainCounterInput, clickerButtonsContainer);
        mainContentArea.appendChild(clickerArea);

        // Statistics Area (Right - fixed width, content scrolls if needed)
        const statsArea = createDOMElement('div', {
            style: {
                flexBasis: '220px', // Fixed width as per your new image more or less
                flexShrink: 0,
                display: 'flex', flexDirection: 'column',
                borderLeft: `1px solid ${CONFIG.UI_TEXT_COLOR}33`,
                paddingLeft: '12px', overflowY: 'auto', pointerEvents: 'auto' // Make stats area scrollable and clickable
            }
        });
        state.domElements.statsTextSummary = createDOMElement('div', {
            id: CONFIG.STATS_TEXT_SUMMARY_ID,
            style: { fontSize: `${CONFIG.STATS_FONT_SIZE_EM}em`, lineHeight: '1.4', marginBottom: '8px' }
        });
        state.domElements.lastActionTimerDisplay = createDOMElement('div', {
            id: CONFIG.LAST_ACTION_TIMER_ID, textContent: 'Last: 00m 00s',
            style: { fontSize: `${CONFIG.STATS_FONT_SIZE_EM * 0.9}em`, marginTop: '5px', opacity: '0.8' }
        });
        // Trigger debug UI (initially hidden, managed by settings)
        state.domElements.triggerDebugDisplay = createDOMElement('div', {
            id: CONFIG.TRIGGER_DEBUG_DISPLAY_ID,
            style: {
                fontSize: `${CONFIG.STATS_FONT_SIZE_EM * 0.8}em`, marginTop: '10px',
                borderTop: `1px dashed ${CONFIG.UI_TEXT_COLOR}22`, paddingTop: '5px', display: 'none',
                maxHeight: '60px', overflowY: 'auto', opacity: '0.7'
            }
        });
        state.domElements.triggerDebugDisplay.innerHTML = 'Trigger Debug: Waiting...';

        statsArea.append(state.domElements.statsTextSummary, state.domElements.lastActionTimerDisplay, state.domElements.triggerDebugDisplay);
        mainContentArea.appendChild(statsArea);


        // --- Real-time Clock & Tab Indicator(Bottom of UI Container, below mainContentArea) ---
        const bottomInfoBar = createDOMElement('div', {
            style: {
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
                marginTop: 'auto', paddingTop: '5px', flexShrink: 0,
                borderTop: `1px solid ${CONFIG.UI_TEXT_COLOR}22`,
                pointerEvents: 'none' // Whole bar passes clicks unless children override
            }
        });

        state.domElements.tabIndicatorText = createDOMElement('div', {
            id: CONFIG.TAB_INDICATOR_TEXT_ID, textContent: state.currentTabMode.name,
            style: {
                fontSize: `${CONFIG.TAB_INDICATOR_FONT_SIZE_EM}em`, fontWeight: 'bold',
                color: state.currentTabMode.textColor, opacity: 0.7, // Use mode's text color
                pointerEvents: 'auto' // If you want to be able to select it
            }
        });

        state.domElements.realTimeClock = createDOMElement('div', {
            id: CONFIG.CLOCK_DISPLAY_ID, textContent: '00:00:00',
            style: {
                fontSize: `${CONFIG.CLOCK_FONT_SIZE_EM}em`, fontFamily: 'monospace',
                color: CONFIG.UI_TEXT_COLOR, opacity: '0.4',
                pointerEvents: 'none' // Clock itself doesn't need to be clickable
            }
        });
        bottomInfoBar.append(state.domElements.tabIndicatorText, state.domElements.realTimeClock);

        uiContainer.append(mainContentArea, bottomInfoBar);

        // Settings Panel (initially hidden, positioned over main UI)
        buildSettingsPanel();
        uiContainer.appendChild(state.domElements.settingsPanel);

        // Page Overlay for Tab Color Indication
        buildTabOverlay(); // Create but don't show yet
        document.body.appendChild(state.domElements.tabOverlay);


        buildEmergencyShowButton();
        document.body.appendChild(uiContainer);

        setInitialUIStates();
        applyVisibilitySettings();
        updateLastActionTimerDisplay();
        logInfo('Main UI v3 (Intl) built.');
    }

    function makeButtonInteractive(button) {
        if (!button) return;
        button.addEventListener('mousedown', e => { e.preventDefault(); button.style.transform = 'scale(0.95)'; });
        button.addEventListener('mouseup', () => button.style.transform = 'scale(1)');
        button.addEventListener('mouseleave', () => button.style.transform = 'scale(1)');
    }

    function buildEmergencyShowButton() {
         state.domElements.emergencyShowButton = createDOMElement('button', {
            id: 'emergencyShowBtn_v3', textContent: CONFIG.EMERGENCY_SHOW_BUTTON_TEXT, title: 'Show UI Panel',
            style: {
                position: 'fixed', bottom: CONFIG.UI_BOTTOM_OFFSET, right: CONFIG.UI_RIGHT_OFFSET,
                width: CONFIG.EMERGENCY_SHOW_BUTTON_SIZE, height: CONFIG.EMERGENCY_SHOW_BUTTON_SIZE,
                backgroundColor: 'rgba(80,80,100,0.2)', border: `1px solid rgba(128,128,128,0.3)`,
                color: CONFIG.UI_TEXT_COLOR, borderRadius: '50%', cursor: 'pointer', display: 'none',
                alignItems: 'center', justifyContent: 'center', zIndex: '2147483646',
                opacity: String(CONFIG.EMERGENCY_SHOW_BUTTON_OPACITY),
                transition: 'opacity 0.2s ease, transform 0.1s ease, background-color 0.2s', fontSize: '16px',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)', pointerEvents: 'auto'
            }
        });
        state.domElements.emergencyShowButton.onmouseover = () => {
            state.domElements.emergencyShowButton.style.opacity = '1';
            state.domElements.emergencyShowButton.style.transform = 'scale(1.1)';
            state.domElements.emergencyShowButton.style.backgroundColor = CONFIG.MAIN_ACCENT_COLOR;
        };
        state.domElements.emergencyShowButton.onmouseout = () => {
            state.domElements.emergencyShowButton.style.opacity = String(CONFIG.EMERGENCY_SHOW_BUTTON_OPACITY);
            state.domElements.emergencyShowButton.style.transform = 'scale(1)';
            state.domElements.emergencyShowButton.style.backgroundColor = 'rgba(80,80,100,0.2)';
        };
        state.domElements.emergencyShowButton.onclick = () => setUIVisibility(true);
        document.body.appendChild(state.domElements.emergencyShowButton);
    }

    function buildTabOverlay() {
        state.domElements.tabOverlay = createDOMElement('div', {
            id: CONFIG.TAB_OVERLAY_ID_PREFIX + state.currentTabId,
            style: {
                position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh',
                backgroundColor: state.currentTabMode.color,
                zIndex: '2147483630', // Very high, but below helper UI and its popups
                pointerEvents: 'none', // Crucial: allow interaction with page underneath
                display: state.showTabIndicator ? 'block' : 'none' // Controlled by setting
            }
        });
    }

    function buildSettingsPanel() {
        const panel = createDOMElement('div', {
            id: CONFIG.SETTINGS_PANEL_ID,
            style: {
                position: 'absolute', top: '0px', right: '0px', bottom: '0px',
                width: 'clamp(300px, 50%, 450px)', // Responsive width
                backgroundColor: `rgba(40, 45, 55, 0.97)`, // Darker, more opaque for settings
                borderLeft: `2px solid ${CONFIG.MAIN_ACCENT_COLOR}`,
                padding: '15px 20px', zIndex: '1000', display: 'none', flexDirection: 'column',
                gap: '12px', overflowY: 'auto', boxShadow: '-10px 0px 25px rgba(0,0,0,0.3)',
                transition: 'transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
                pointerEvents: 'auto' // Settings panel itself must be interactive
            }
        });
        state.domElements.settingsPanel = panel;

        const heading = createDOMElement('h3', { textContent: 'Settings', style: { margin: '0 0 15px 0', textAlign: 'center', color: 'white', fontSize: '1.2em'} });
        panel.appendChild(heading);

        const commonSelectStyle = {width: '100%', padding: '8px', boxSizing: 'border-box', backgroundColor: 'rgba(0,0,0,0.3)', color: 'white', border: `1px solid ${CONFIG.MAIN_ACCENT_COLOR}aa`, borderRadius: '4px', fontSize: '0.9em'};
        const commonLabelStyle = { display: 'block', marginBottom: '4px', fontSize: '0.9em', color: 'rgba(255,255,255,0.75)'};
        const checkboxLabelStyle = { display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '0.9em', color: 'rgba(255,255,255,0.75)', margin: '8px 0'};
        const checkboxStyle = { marginRight: '8px', transform: 'scale(1.2)', accentColor: CONFIG.MAIN_ACCENT_COLOR};
        const sectionHeadingStyle = {margin: '15px 0 8px 0', color: 'white', fontSize: '1em', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '5px'};

        // --- Shift & Lunch Section ---
        panel.appendChild(createDOMElement('h4', {textContent: 'Shift & Lunch', style: sectionHeadingStyle}));
        // Shift Type, Start Time, Lunch (same as before, just ensure IDs are correct)
        // ... (Shift Type, Start Time input, Lunch Select - code from previous version can be adapted here)
        // ...
        const shiftTypeGroup = createDOMElement('div');
        shiftTypeGroup.appendChild(createDOMElement('label', { for: CONFIG.SETTINGS_SHIFT_TYPE_SELECT_ID, textContent: 'Shift Type:', style: commonLabelStyle }));
        state.domElements.settingsShiftTypeSelect = createDOMElement('select', { id: CONFIG.SETTINGS_SHIFT_TYPE_SELECT_ID, style: commonSelectStyle });
        state.domElements.settingsShiftTypeSelect.addEventListener('change', handleShiftSettingsChange);
        shiftTypeGroup.appendChild(state.domElements.settingsShiftTypeSelect);
        panel.appendChild(shiftTypeGroup);

        const shiftStartTimeGroup = createDOMElement('div');
        shiftStartTimeGroup.appendChild(createDOMElement('label', { for: CONFIG.SETTINGS_SHIFT_START_TIME_INPUT_ID, textContent: 'Shift Start Time (manual):', style: commonLabelStyle }));
        state.domElements.settingsShiftStartTimeInput = createDOMElement('input', { type: 'time', id: CONFIG.SETTINGS_SHIFT_START_TIME_INPUT_ID, style: commonSelectStyle });
        state.domElements.settingsShiftStartTimeInput.addEventListener('change', handleShiftSettingsChange);
        shiftStartTimeGroup.appendChild(state.domElements.settingsShiftStartTimeInput);
        panel.appendChild(shiftStartTimeGroup);

        const lunchGroup = createDOMElement('div');
        lunchGroup.appendChild(createDOMElement('label', { for: CONFIG.SETTINGS_LUNCH_TIME_SELECT_ID, textContent: 'Lunch Break:', style: commonLabelStyle }));
        state.domElements.settingsLunchSelect = createDOMElement('select', { id: CONFIG.SETTINGS_LUNCH_TIME_SELECT_ID, style: commonSelectStyle });
        state.domElements.settingsLunchSelect.addEventListener('change', handleLunchSettingChange);
        lunchGroup.appendChild(state.domElements.settingsLunchSelect);
        panel.appendChild(lunchGroup);


        // --- Automation Section ---
        panel.appendChild(createDOMElement('h4', {textContent: 'Automation', style: sectionHeadingStyle}));
        const autoClickLabel = createDOMElement('label', { style: checkboxLabelStyle });
        state.domElements.autoClickEnabledCheckbox = createDOMElement('input', { type: 'checkbox', id: CONFIG.AUTO_CLICK_ENABLED_CHECKBOX_ID, checked: state.autoClickEnabled, style: checkboxStyle });
        state.domElements.autoClickEnabledCheckbox.addEventListener('change', handleAutoClickSettingChange);
        autoClickLabel.append(state.domElements.autoClickEnabledCheckbox, `Auto-Increment (trigger: "${CONFIG.AUTO_CLICK_TRIGGER_WORD}")`);
        panel.appendChild(autoClickLabel);

        // --- UI Visibility Section ---
        panel.appendChild(createDOMElement('h4', {textContent: 'UI Element Visibility', style: sectionHeadingStyle}));
        const visControls = [
            { stateKey: 'showClock', id: CONFIG.SETTINGS_SHOW_CLOCK_CHECKBOX_ID, label: 'Show Real-time Clock' },
            { stateKey: 'showStats', id: CONFIG.SETTINGS_SHOW_STATS_CHECKBOX_ID, label: 'Show Statistics Text' },
            { stateKey: 'showLastActionTimer', id: CONFIG.SETTINGS_SHOW_LAST_ACTION_TIMER_CHECKBOX_ID, label: 'Show Last Action Timer' },
            { stateKey: 'showTabIndicator', id: CONFIG.SETTINGS_SHOW_TAB_INDICATOR_CHECKBOX_ID, label: 'Show Tab Color Overlay & ID' },
            { stateKey: 'showTriggerDebug', id: CONFIG.SETTINGS_SHOW_TRIGGER_DEBUG_CHECKBOX_ID, label: 'Show Trigger Debug Info' }
        ];
        visControls.forEach(vc => {
            const label = createDOMElement('label', { style: checkboxLabelStyle});
            state.domElements[vc.stateKey + 'Checkbox'] = createDOMElement('input', {type: 'checkbox', id: vc.id, checked: state[vc.stateKey], style: checkboxStyle});
            state.domElements[vc.stateKey + 'Checkbox'].addEventListener('change', (e) => {
                state[vc.stateKey] = e.target.checked;
                applyVisibilitySettings();
                saveDataToStorage();
            });
            label.append(state.domElements[vc.stateKey + 'Checkbox'], vc.label);
            panel.appendChild(label);
        });

        // --- Multi-Tab Contribution Section ---
        panel.appendChild(createDOMElement('h4', {textContent: 'Multi-Tab Statistics', style: sectionHeadingStyle}));
        const currentTabContributeLabel = createDOMElement('label', { style: checkboxLabelStyle });
        state.domElements.currentTabContributesCheckbox = createDOMElement('input', {type: 'checkbox', id: CONFIG.SETTINGS_CURRENT_TAB_CONTRIBUTES_TO_TOTAL_CHECKBOX_ID, checked: state.currentTabContributesToTotal, style: checkboxStyle });
        state.domElements.currentTabContributesCheckbox.addEventListener('change', (e) => {
            state.currentTabContributesToTotal = e.target.checked;
            writeCurrentTabDataToLocalStorage(); // Update self in localStorage immediately
            readAllTabsDataFromLocalStorage(); // Re-read to update global total and other tab displays
            saveDataToStorage(); // Save this main setting
        });
        currentTabContributeLabel.append(state.domElements.currentTabContributesCheckbox, `This Tab (${state.currentTabMode.name}) contributes to Global Clicks/Hour`);
        panel.appendChild(currentTabContributeLabel);

        state.domElements.otherTabsSettingsContainer = createDOMElement('div', {id: 'otherTabsSettings_v3', style: {marginLeft: '20px', marginTop: '5px'}});
        panel.appendChild(state.domElements.otherTabsSettingsContainer);
        updateOtherTabsSettingsDisplay(); // Populate this on build

        // --- Close Button ---
        const settingsPanelButtonStyle = { /* ... same as your fixed version ... */
            cursor: 'pointer', backgroundColor: `${CONFIG.MAIN_ACCENT_COLOR}dd`,
            border: 'none', color: 'white', borderRadius: '5px', padding: '10px',
            fontSize: '1em', width: '100%', marginTop: 'auto',
            transition: 'background-color 0.2s'
        };

        const closeButton = createDOMElement('button', { textContent: 'Apply & Close', style: settingsPanelButtonStyle });
        closeButton.addEventListener('click', () => setSettingsPanelVisibility(false));
        panel.appendChild(closeButton);
    }

    function updateOtherTabsSettingsDisplay() {
        const container = state.domElements.otherTabsSettingsContainer;
        if (!container) return;
        container.innerHTML = ''; // Clear previous

        Object.values(state.otherTabsData).forEach(tabData => {
            if (tabData.tabId === state.currentTabId) return; // Don't show current tab here

            const checkboxId = `contribToggle_${tabData.tabId}`;
            const label = createDOMElement('label', { style: { display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '0.85em', color: 'rgba(255,255,255,0.7)', margin:'3px 0'} });
            const checkbox = createDOMElement('input', {
                type: 'checkbox', id: checkboxId, checked: tabData.contributesToTotal,
                 style: { marginRight: '8px', transform: 'scale(1.1)', accentColor: CONFIG.MAIN_ACCENT_COLOR}
            });
            checkbox.addEventListener('change', (e) => {
                // To change another tab's contribution, we need to modify its localStorage entry
                // This is an "optimistic" update for the UI; the other tab will eventually reflect this
                // if it's open and reading. If not, it will pick it up when it next loads.
                const otherTabStorageKey = CONFIG.MULTI_TAB_STORAGE_PREFIX + tabData.tabId;
                try {
                    const otherTabStoredJson = localStorage.getItem(otherTabStorageKey);
                    if (otherTabStoredJson) {
                        const otherTabStoredData = JSON.parse(otherTabStoredJson);
                        otherTabStoredData.contributesToTotal = e.target.checked;
                        otherTabStoredData.timestamp = Date.now(); // Update timestamp to keep it fresh
                        localStorage.setItem(otherTabStorageKey, JSON.stringify(otherTabStoredData));
                        logInfo(`Updated contribution for tab ${tabData.tabId} to ${e.target.checked}`);
                        // Re-read all data to reflect change immediately
                        readAllTabsDataFromLocalStorage();
                    }
                } catch (err) {logError('Error updating other tab contribution:', err)}
            });
            label.append(checkbox, `Tab: ${tabData.modeName || tabData.tabId} (${tabData.clicks} clicks)`);
            container.appendChild(label);
        });
        if (Object.keys(state.otherTabsData).filter(id => id !== state.currentTabId).length === 0) {
            container.textContent = '(No other active tabs detected)';
            container.style.opacity = '0.5';
        } else {
             container.style.opacity = '1';
        }
    }

    function setInitialUIStates() {
        // Fill selects in settings
        const shiftSelect = state.domElements.settingsShiftTypeSelect;
        if(shiftSelect) {
            shiftSelect.innerHTML = '';
            [['auto', 'Automatic'], ['day', `Day (from ${CONFIG.DEFAULT_DAY_SHIFT_START_TIME})`], ['night', `Night (from ${CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME})`]].forEach(([val, txt]) => {
                shiftSelect.add(new Option(txt, val));
            });
            shiftSelect.value = state.shiftType;
        }
        if(state.domElements.settingsShiftStartTimeInput && state.shiftStartTime) {
            state.domElements.settingsShiftStartTimeInput.value = formatDateToHHMM(state.shiftStartTime);
        }

        const lunchSelect = state.domElements.settingsLunchSelect;
        if(lunchSelect) {
            lunchSelect.innerHTML = ''; // Clear previous options
            // Filter lunch options based on current shift type (day/night) or show all if 'any'
            let currentShiftCategory = 'any'; // Default to 'any' if shiftType is 'auto' and not yet determined
            if (state.shiftType === 'day' || (state.shiftType === 'auto' && state.shiftStartTime && state.shiftStartTime.getHours() < _getNightStartHour())) {
                currentShiftCategory = 'day';
            } else if (state.shiftType === 'night' || (state.shiftType === 'auto' && state.shiftStartTime && state.shiftStartTime.getHours() >= _getNightStartHour())) {
                currentShiftCategory = 'night';
            }

            const filteredLunchOptions = CONFIG.DEFAULT_LUNCH_OPTIONS.filter(
                opt => opt.type === currentShiftCategory || opt.type === 'any'
            );

            filteredLunchOptions.forEach((opt) => {
                // Find original index to use as value, so saving/loading still works with full list
                const originalIndex = CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(opt);
                lunchSelect.add(new Option(opt.text, String(originalIndex)));
            });

            const currentLunchOriginalIndex = state.selectedLunchOption
                ? CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(state.selectedLunchOption)
                : -1;
            if(currentLunchOriginalIndex > -1) {
                lunchSelect.value = String(currentLunchOriginalIndex);
            } else if (filteredLunchOptions.length > 0) { // If current selected not in filtered, pick first of filtered
                state.selectedLunchOption = filteredLunchOptions[0];
                lunchSelect.value = String(CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(filteredLunchOptions[0]));
            }
        }

        if(state.domElements.autoClickEnabledCheckbox) state.domElements.autoClickEnabledCheckbox.checked = state.autoClickEnabled;
        if(state.domElements.showClockCheckbox) state.domElements.showClockCheckbox.checked = state.showClock;
        if(state.domElements.showStatsCheckbox) state.domElements.showStatsCheckbox.checked = state.showStats;
        if(state.domElements.showLastActionTimerCheckbox) state.domElements.showLastActionTimerCheckbox.checked = state.showLastActionTimer;
        if(state.domElements.showTabIndicatorCheckbox) state.domElements.showTabIndicatorCheckbox.checked = state.showTabIndicator;
        if(state.domElements.showTriggerDebugCheckbox) state.domElements.showTriggerDebugCheckbox.checked = state.showTriggerDebug;
        if(state.domElements.currentTabContributesCheckbox) state.domElements.currentTabContributesCheckbox.checked = state.currentTabContributesToTotal;

        setUIVisibility(state.uiVisible);
        setUILockState(state.uiLocked);
        setSettingsPanelVisibility(state.settingsPanelVisible);
        updateCounterDisplay();
        updateManualShiftTimeInputVisibility();
    }

    // Helper to get night start hour for lunch filtering logic
    function _getNightStartHour() {
        return parseInt(CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME.split(':')[0], 10);
    }


    function applyVisibilitySettings() {
        if (state.domElements.realTimeClock) state.domElements.realTimeClock.style.display = state.showClock ? 'block' : 'none';
        if (state.domElements.statsTextSummary) state.domElements.statsTextSummary.style.display = state.showStats ? 'block' : 'none';
        if (state.domElements.lastActionTimerDisplay) state.domElements.lastActionTimerDisplay.style.display = state.showLastActionTimer ? 'block' : 'none';

        if (state.domElements.tabOverlay) state.domElements.tabOverlay.style.display = state.showTabIndicator ? 'block' : 'none';
        if (state.domElements.tabIndicatorText) state.domElements.tabIndicatorText.style.display = state.showTabIndicator ? 'block' : 'none';

        if (state.domElements.triggerDebugDisplay) state.domElements.triggerDebugDisplay.style.display = state.showTriggerDebug ? 'block' : 'none';
    }


    // --- ------------------------------------------------------------------------ ---
    // --- ----------------------- UI STATE MANAGEMENT -------------------------- ---
    // --- ------------------------------------------------------------------------ ---
    function setUIVisibility(visible) {
        state.uiVisible = visible;
        if (state.domElements.uiContainer) {
            state.domElements.uiContainer.style.opacity = visible ? '1' : '0';
            state.domElements.uiContainer.style.transform = visible ? 'translateY(0)' : 'translateY(20px)';
            // pointerEvents for container should be 'none' to allow clicks through,
            // unless settings panel is open.
            state.domElements.uiContainer.style.pointerEvents = (visible && !state.settingsPanelVisible) ? 'none' : 'auto';
            if (state.settingsPanelVisible) state.domElements.uiContainer.style.pointerEvents = 'auto';
        }
        if (state.domElements.emergencyShowButton) {
            state.domElements.emergencyShowButton.style.display = visible ? 'none' : 'flex';
        }
        if (!visible && state.settingsPanelVisible) {
            setSettingsPanelVisibility(false); // Hide settings if main UI is hidden
        }
        saveDataToStorage();
    }

    function toggleUILockState() { setUILockState(!state.uiLocked); }

    function setUILockState(locked) {
        if (!state.uiVisible && locked) return;
        state.uiLocked = locked;

        state.domElements.lockUIButton.textContent = state.uiLocked ? CONFIG.LOCK_UI_BUTTON_TEXT_LOCKED : CONFIG.LOCK_UI_BUTTON_TEXT_UNLOCKED;
        state.domElements.lockUIButton.title = state.uiLocked ? 'Unlock UI' : 'Lock UI (PageDown & Clicker active)';

        const elementsToToggle = [
            state.domElements.toggleSettingsButton, // Settings button
            state.domElements.emergencyHideButton,  // Close button
            state.domElements.decrementButton,
            state.domElements.mainCounterInput,
            // If settings panel is open, its contents should also be affected (except close button for settings)
            ...(state.settingsPanelVisible ? Array.from(state.domElements.settingsPanel.querySelectorAll('input, select, button')).filter(el => el.textContent !== 'Apply & Close') : [])
        ];

        elementsToToggle.forEach(el => {
            if (el) {
                 el.disabled = state.uiLocked;
                 el.style.opacity = state.uiLocked ? '0.5' : '1';
                 el.style.cursor = state.uiLocked ? 'not-allowed' : (el.tagName === 'BUTTON' || el.tagName === 'SELECT' ? 'pointer' : 'default');
            }
        });
        // Ensure clicker buttons remain visually distinct if needed, or also get opacity
        if (state.domElements.incrementButton) {
            state.domElements.incrementButton.style.cursor = state.uiLocked ? 'default' : 'pointer'; // Main clicker might still 'look' active
        }
        saveDataToStorage();
    }

    function toggleSettingsPanelVisibility() { setSettingsPanelVisibility(!state.settingsPanelVisible); }

    function setSettingsPanelVisibility(visible) {
        state.settingsPanelVisible = visible;
        const panel = state.domElements.settingsPanel;
        const uiContainer = state.domElements.uiContainer;

        if (panel) {
            panel.style.display = visible ? 'flex' : 'none';
            panel.style.transform = visible ? 'translateX(0%)' : 'translateX(101%)';
        }
        if (uiContainer) { // Main container needs to become interactive when settings are open
            uiContainer.style.pointerEvents = visible ? 'auto' : 'none';
        }

        state.domElements.toggleSettingsButton.textContent = visible ? CONFIG.TOGGLE_SETTINGS_BUTTON_TEXT_OPENED : CONFIG.TOGGLE_SETTINGS_BUTTON_TEXT_CLOSED;

        if (visible && state.uiLocked) { setUILockState(true); } // Re-apply lock state to new elements in settings
        saveDataToStorage();
    }
// ... (Продолжение в Части 3: Обработчики событий, Логика ядра, Инициализация)
// == Production Assistant v3.0 (International, Multi-Tab) ==
// (Продолжение Части 2)

    // --- ------------------------------------------------------------------------ ---
    // --- ----------------------- EVENT HANDLERS ------------------------------- ---
    // --- ------------------------------------------------------------------------ ---

    function processIncrementForCurrentTab(isManualAction = false, event = null) {
        if (isManualAction && state.uiLocked && event && (event.currentTarget === state.domElements.incrementButton || event.currentTarget === document)) {
            // UI locked, but click is on the main increment button or it's a keyboard shortcut - allow
        } else if (state.uiLocked && isManualAction) {
            logDebug('UI is locked, manual increment ignored.');
            return;
        }

        state.clicksForThisTab++;
        state.lastActionTimestampForThisTab = Date.now();
        updateCounterDisplay(); // Updates based on clicksForThisTab
        updateLastActionTimerDisplay();
        // Global total and statistics will be updated when data is written/read from localStorage
        writeCurrentTabDataToLocalStorage(); // Write immediately for other tabs to pick up
        readAllTabsDataFromLocalStorage();   // Re-read to update global stats view immediately
    }

    function handleDecrementClick() {
        if (state.uiLocked) return;
        if (state.clicksForThisTab > 0) {
            state.clicksForThisTab--;
            state.lastActionTimestampForThisTab = Date.now();
            updateCounterDisplay();
            updateLastActionTimerDisplay();
            writeCurrentTabDataToLocalStorage();
            readAllTabsDataFromLocalStorage();
        }
    }

    function handleCounterInputDynamic(event) { // For resizing font
        const input = event.target;
        const valueLength = input.value.length;
        let newFontSize = CONFIG.MAIN_COUNTER_FONT_SIZE_INITIAL_EM;

        if (valueLength > CONFIG.MAIN_COUNTER_MAX_CHARS_BEFORE_RESIZE) {
            const overflowChars = valueLength - CONFIG.MAIN_COUNTER_MAX_CHARS_BEFORE_RESIZE;
            // Decrease font size proportionally, with a minimum
            newFontSize = Math.max(CONFIG.MAIN_COUNTER_FONT_SIZE_MIN_EM, CONFIG.MAIN_COUNTER_FONT_SIZE_INITIAL_EM - overflowChars * 0.5); // Adjust 0.5 factor as needed
        }
        input.style.fontSize = `${newFontSize}em`;
    }

    function handleCounterInputChange(event) { // For when focus is lost or Enter pressed
        if (state.uiLocked) {
            event.target.value = state.clicksForThisTab; return;
        }
        let newValue = parseInt(event.target.value, 10);
        if (isNaN(newValue) || newValue < 0) newValue = state.clicksForThisTab; // Revert if invalid

        if (newValue !== state.clicksForThisTab) {
            state.clicksForThisTab = newValue;
            state.lastActionTimestampForThisTab = Date.now();
            updateLastActionTimerDisplay();
            writeCurrentTabDataToLocalStorage();
            readAllTabsDataFromLocalStorage();
        }
        updateCounterDisplay(); // Ensure visual consistency even if value was reverted
        handleCounterInputDynamic({target: event.target}); // Re-check font size
    }


    function updateCounterDisplay() {
        if (state.domElements.mainCounterInput) {
            state.domElements.mainCounterInput.value = state.clicksForThisTab;
            handleCounterInputDynamic({target: state.domElements.mainCounterInput}); // Adjust font size after setting value
        }
    }

    function handleShiftSettingsChange() {
        state.shiftType = state.domElements.settingsShiftTypeSelect.value;
        determineAndSetShiftStartTime(false);
        setDynamicDefaultLunch(); // Update default lunch based on new shift type

        if (state.domElements.settingsLunchSelect && state.selectedLunchOption) {
            // Update available lunch options in the dropdown
            const lunchSelect = state.domElements.settingsLunchSelect;
            lunchSelect.innerHTML = ''; // Clear previous options
            let currentShiftCategory = state.shiftType === 'day' ? 'day' : (state.shiftType === 'night' ? 'night' : 'any');
             if (state.shiftType === 'auto' && state.shiftStartTime) {
                 currentShiftCategory = state.shiftStartTime.getHours() >= _getNightStartHour() || state.shiftStartTime.getHours() < _getDayStartHour() ? 'night' : 'day';
             }

            const filteredLunchOptions = CONFIG.DEFAULT_LUNCH_OPTIONS.filter(
                opt => opt.type === currentShiftCategory || opt.type === 'any'
            );
            filteredLunchOptions.forEach((opt) => {
                const originalIndex = CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(opt);
                lunchSelect.add(new Option(opt.text, String(originalIndex)));
            });
            // Try to re-select the currently selected one if it's still valid, or pick new default
            const currentLunchOriginalIndex = state.selectedLunchOption ? CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(state.selectedLunchOption) : -1;
            if(currentLunchOriginalIndex > -1 && filteredLunchOptions.includes(state.selectedLunchOption) ) {
                lunchSelect.value = String(currentLunchOriginalIndex);
            } else if (filteredLunchOptions.length > 0) { // If current selected not in filtered, pick first of filtered
                state.selectedLunchOption = filteredLunchOptions[0];
                lunchSelect.value = String(CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(filteredLunchOptions[0]));
            } else { // No valid lunch options for this shift, select "No Lunch" if available
                const noLunchOpt = CONFIG.DEFAULT_LUNCH_OPTIONS.find(opt => opt.start === "00:00" && opt.end === "00:00");
                if (noLunchOpt) {
                    state.selectedLunchOption = noLunchOpt;
                    lunchSelect.value = String(CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(noLunchOpt));
                }
            }
        }
        updateManualShiftTimeInputVisibility();
        updateStatistics();
        saveDataToStorage(); // Save main settings
    }

    function updateManualShiftTimeInputVisibility() {
        const isManual = state.shiftType !== 'auto';
        const inputEl = state.domElements.settingsShiftStartTimeInput;
        if (inputEl) {
           inputEl.disabled = !isManual;
           inputEl.style.opacity = isManual ? '1' : '0.6';
           inputEl.style.display = isManual ? 'block' : 'none'; // Show/hide completely
            inputEl.previousElementSibling.style.display = isManual ? 'block' : 'none'; // Also hide/show label
           if (state.shiftStartTime) inputEl.value = formatDateToHHMM(state.shiftStartTime);
        }
    }

    function handleLunchSettingChange() {
        const selectedIndex = parseInt(state.domElements.settingsLunchSelect.value, 10);
        if (CONFIG.DEFAULT_LUNCH_OPTIONS[selectedIndex]) {
            state.selectedLunchOption = CONFIG.DEFAULT_LUNCH_OPTIONS[selectedIndex];
            updateStatistics();
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
            logDebug('MutationObserver disconnected for auto-click.');
        }
    }

    function handlePageKeydown(event) {
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA' || event.target.isContentEditable) {
            // Allow typing in input fields, unless it's our special shortcut and the input isn't our counter
            if (event.code === CONFIG.INCREMENT_KEYBOARD_SHORTCUT_CODE && event.target !== state.domElements.mainCounterInput) {
                // Proceed if it's the shortcut, even if focus is on another input (e.g. website's input)
            } else {
                return; // Otherwise, don't interfere with typing
            }
        }
        if (event.code === CONFIG.INCREMENT_KEYBOARD_SHORTCUT_CODE) {
            event.preventDefault();
            processIncrementForCurrentTab(false, event); // false = not a direct UI button click
            logDebug(`${CONFIG.INCREMENT_KEYBOARD_SHORTCUT_CODE} pressed, counter incremented.`);
            if(state.domElements.incrementButton){
                state.domElements.incrementButton.style.transform = 'scale(0.93)';
                setTimeout(() => { if(state.domElements.incrementButton) state.domElements.incrementButton.style.transform = 'scale(1)'; }, 120);
            }
        }
    }

    // --- ------------------------------------------------------------------------ ---
    // --- --------------------------- CORE LOGIC ------------------------------- ---
    // --- ------------------------------------------------------------------------ ---

    function determineAndSetShiftStartTime(forceAuto = false) {
        const now = new Date();
        let shiftStartHour, shiftStartMinute;
        let calculatedStartTime = new Date(now);

        if (forceAuto || state.shiftType === 'auto') {
            const dayStartMins = timeStringToMinutes(CONFIG.DEFAULT_DAY_SHIFT_START_TIME);
            const nightStartMins = timeStringToMinutes(CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME);
            const currentMins = now.getHours() * 60 + now.getMinutes();

            if (currentMins >= dayStartMins && currentMins < nightStartMins) {
                state.shiftType = 'day'; // Explicitly set guessed type for auto
                [shiftStartHour, shiftStartMinute] = CONFIG.DEFAULT_DAY_SHIFT_START_TIME.split(':').map(Number);
            } else {
                state.shiftType = 'night'; // Explicitly set guessed type for auto
                [shiftStartHour, shiftStartMinute] = CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME.split(':').map(Number);
                if (currentMins < dayStartMins) calculatedStartTime.setDate(now.getDate() - 1);
            }
            calculatedStartTime.setHours(shiftStartHour, shiftStartMinute, 0, 0);
            state.shiftStartTime = calculatedStartTime;
            logDebug(`Auto-determined shift start: ${state.shiftStartTime.toLocaleString()} (as ${state.shiftType})`);
            // Update select if it was 'auto'
            if (forceAuto && state.domElements.settingsShiftTypeSelect && state.domElements.settingsShiftTypeSelect.value === 'auto'){
                 state.domElements.settingsShiftTypeSelect.value = state.shiftType;
            }

        } else if (state.shiftType === 'day' || state.shiftType === 'night') {
            const timeValue = state.domElements.settingsShiftStartTimeInput?.value;
            let baseTime = state.shiftType === 'day' ? CONFIG.DEFAULT_DAY_SHIFT_START_TIME : CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME;
            if(timeValue) baseTime = timeValue;

            [shiftStartHour, shiftStartMinute] = baseTime.split(':').map(Number);
            calculatedStartTime.setHours(shiftStartHour, shiftStartMinute, 0, 0);
            if (state.shiftType === 'night' && (now.getHours() < shiftStartHour || (now.getHours() === shiftStartHour && now.getMinutes() < shiftStartMinute) )) {
                 calculatedStartTime.setDate(now.getDate() - 1);
            } else if (state.shiftType === 'day' && state.shiftStartTime && state.shiftStartTime > now) {
                // If user sets day shift start time in future, maybe they mean previous day's shift extending.
                // This is complex logic; for now assume start time is for "current" logical day or previous if night.
            }
            state.shiftStartTime = calculatedStartTime;
            logDebug(`Manual shift type set. Start: ${state.shiftStartTime.toLocaleString()}`);
        }
    }

    function updateRealTimeClockDisplay() {
        if (state.domElements.realTimeClock && state.showClock) {
            state.domElements.realTimeClock.textContent = formatDateToHHMM(new Date(), true);
        }
    }

    function updateLastActionTimerDisplay() {
        if (!state.domElements.lastActionTimerDisplay || !state.showLastActionTimer) {
             if(state.domElements.lastActionTimerDisplay) state.domElements.lastActionTimerDisplay.textContent = '';
            return;
        }
        const now = Date.now();
        const elapsedMs = now - state.lastActionTimestampForThisTab;
        const displayStr = `Last: ${formatMsToDuration(elapsedMs, true).replace(/^\d\dh\s/, '')}`; // Remove hours if 00h

        state.domElements.lastActionTimerDisplay.textContent = displayStr;
        if (elapsedMs > CONFIG.LAST_ACTION_TIMER_WARN_SECONDS * 1000) {
            state.domElements.lastActionTimerDisplay.style.color = CONFIG.LAST_ACTION_TIMER_WARN_COLOR;
            state.domElements.lastActionTimerDisplay.style.fontWeight = 'bold';
        } else {
            state.domElements.lastActionTimerDisplay.style.color = CONFIG.UI_TEXT_COLOR;
            state.domElements.lastActionTimerDisplay.style.fontWeight = 'normal';
        }
    }


    function updateStatistics() {
        if (!state.domElements.statsTextSummary || !state.showStats) {
            if(state.domElements.statsTextSummary) state.domElements.statsTextSummary.innerHTML = '';
            return;
        }

        if (!state.shiftStartTime || !(state.shiftStartTime instanceof Date) || isNaN(state.shiftStartTime.getTime())) {
            determineAndSetShiftStartTime(true);
             if (!state.shiftStartTime) {
                state.domElements.statsTextSummary.innerHTML = '<p style="color:red;">Error: Shift start time not determined!</p>';
                return;
             }
        }

        const now = new Date();
        let totalElapsedMsOverall = now.getTime() - state.shiftStartTime.getTime(); // Total since shift start

        if (totalElapsedMsOverall < 0) {
            state.domElements.statsTextSummary.innerHTML = `
                <p>Shift starts at: <strong>${formatDateToHHMM(state.shiftStartTime)}</strong> (${state.shiftType})</p>
                <p>Waiting...</p>`;
            return;
        }

        // Calculate lunch duration for THIS tab's shift
        let lunchDurationMs = 0;
        const lunch = state.selectedLunchOption;
        if (lunch && (lunch.start !== "00:00" || lunch.end !== "00:00")) {
            // ... (lunch calculation logic - same as before) ...
            const shiftBaseDate = new Date(state.shiftStartTime);
            shiftBaseDate.setHours(0,0,0,0);

            let lunchStartAbs = new Date(shiftBaseDate);
            const [lsh, lsm] = lunch.start.split(':').map(Number);
            lunchStartAbs.setHours(lsh, lsm, 0, 0);

            let lunchEndAbs = new Date(shiftBaseDate);
            const [leh, lem] = lunch.end.split(':').map(Number);
            lunchEndAbs.setHours(leh, lem, 0, 0);

            if (state.shiftType === 'night' && state.shiftStartTime.getHours() >= 12 && lsh < 12) { // Night shift started PM, lunch is AM (next day)
                lunchStartAbs.setDate(lunchStartAbs.getDate() + 1);
                lunchEndAbs.setDate(lunchEndAbs.getDate() + 1);
            } else if (state.shiftStartTime.getDate() < now.getDate() && lunchStartAbs.getTime() < state.shiftStartTime.getTime() && (now.getTime() - state.shiftStartTime.getTime() > 12*3600*1000) ) {
                 // Shift started yesterday, current time is "today", and lunch was "yesterday" (relative to shift start)
                 // This logic can be tricky, for now assume lunch is on the same "logical" day as current segment of shift or next if crosses midnight
            }


            if (lunchEndAbs < lunchStartAbs) lunchEndAbs.setDate(lunchEndAbs.getDate() + 1);

            const effectiveLunchStart = Math.max(state.shiftStartTime.getTime(), lunchStartAbs.getTime());
            const effectiveLunchEnd = Math.min(now.getTime(), lunchEndAbs.getTime());

            if (effectiveLunchEnd > effectiveLunchStart) {
                lunchDurationMs = effectiveLunchEnd - effectiveLunchStart;
            }
        }

        const effectiveWorkMsThisTab = Math.max(0, totalElapsedMsOverall - lunchDurationMs);
        const hoursWorkedThisTab = effectiveWorkMsThisTab / (1000 * 60 * 60);
        const clicksPerHourThisTab = (hoursWorkedThisTab > 0.001) ? (state.clicksForThisTab / hoursWorkedThisTab) : 0;

        // Calculate GLOBAL clicks per hour using state.globalTotalClicks and effective work time of THIS tab.
        // This assumes all contributing tabs have similar work/lunch schedules, which is a simplification.
        // A more accurate global clicks/hour would require summing up effective work times from all contributing tabs.
        const globalClicksPerHour = (hoursWorkedThisTab > 0.001 && state.globalTotalClicks > 0) ? (state.globalTotalClicks / hoursWorkedThisTab) : 0;

        let statsHTML = `
            <p>Shift: <strong>${formatDateToHHMM(state.shiftStartTime)}</strong> (${state.shiftType})</p>
            <p>Lunch: ${lunch ? lunch.text : 'N/A'}</p>
            <hr style="border:0; border-top:1px solid ${CONFIG.UI_TEXT_COLOR}33; margin: 5px 0;">
            <p><u>This Tab (${state.currentTabMode.name}):</u></p>
            <p>Completed: <strong>${state.clicksForThisTab}</strong> (in ${formatMsToDuration(effectiveWorkMsThisTab)})</p>
            <p style="font-size: 1.05em;">~ <strong style="color: ${CONFIG.MAIN_ACCENT_COLOR};">${clicksPerHourThisTab.toFixed(1)}</strong>/hr (this tab)</p>
            <hr style="border:0; border-top:1px solid ${CONFIG.UI_TEXT_COLOR}33; margin: 5px 0;">
            <p><u>Global (Contributing Tabs):</u></p>
            <p>Total Completed: <strong>${state.globalTotalClicks}</strong></p>
            <p style="font-size: 1.1em;">~ <strong style="color: ${CONFIG.MAIN_ACCENT_COLOR};">${globalClicksPerHour.toFixed(1)}</strong>/hr (global estimate)</p>
        `;

        // Add details for other tabs
        const otherContributingTabs = Object.values(state.otherTabsData).filter(td => td.tabId !== state.currentTabId && td.contributesToTotal);
        if (otherContributingTabs.length > 0) {
            statsHTML += `<p style="font-size:0.9em; margin-top:3px;">(Including: `;
            statsHTML += otherContributingTabs.map(td => `${td.modeName || td.tabId}: ${td.clicks}`).join(', ');
            statsHTML += `)</p>`;
        }
        const otherNonContributingTabs = Object.values(state.otherTabsData).filter(td => td.tabId !== state.currentTabId && !td.contributesToTotal && td.clicks > 0);
         if (otherNonContributingTabs.length > 0) {
            statsHTML += `<p style="font-size:0.8em; opacity:0.7; margin-top:2px;">Other (not in total): `;
            statsHTML += otherNonContributingTabs.map(td => `${td.modeName || td.tabId}: ${td.clicks}`).join(', ');
            statsHTML += `)</p>`;
        }

        state.domElements.statsTextSummary.innerHTML = statsHTML;
    }


    function initializeMutationObserver() {
        if (state.mutationObserver) state.mutationObserver.disconnect();
        const observeTargetNode = document.querySelector(CONFIG.TRIGGER_OBSERVE_AREA_SELECTOR) || document.body;
        let debounceTimer = null;

        const processMutations = () => {
            if (!state.autoClickEnabled) return;

            const pageText = observeTargetNode.innerText || observeTargetNode.textContent || "";
            // Simple check using indexOf, can be made more robust with regex for whole word if needed
            // \b for word boundaries aroud wysłano
            const triggerRegex = new RegExp(`\\b${CONFIG.AUTO_CLICK_TRIGGER_WORD}\\b`, 'g');
            const triggerIsCurrentlyFound = triggerRegex.test(pageText);
            let foundElementsPaths = []; // For debug

            if (CONFIG.DEBUG_MODE && state.showTriggerDebug) { // Only search for paths if debug is active
                if (triggerIsCurrentlyFound) {
                     foundElementsPaths = findElementsContainingText(observeTargetNode, CONFIG.AUTO_CLICK_TRIGGER_WORD);
                }
                updateTriggerDebugDisplay(triggerIsCurrentlyFound, foundElementsPaths);
            }


            if (triggerIsCurrentlyFound && !state.isTriggerWordCurrentlyVisible) {
                logDebug(`Trigger "${CONFIG.AUTO_CLICK_TRIGGER_WORD}" DETECTED. Was not visible, now IS.`);
                state.isTriggerWordCurrentlyVisible = true;
                // DO NOT increment here. Increment on DISAPPEARANCE after being visible.
            } else if (!triggerIsCurrentlyFound && state.isTriggerWordCurrentlyVisible) {
                // Word was visible, and now it's NOT. This is the actual trigger point.
                logInfo(`Trigger "${CONFIG.AUTO_CLICK_TRIGGER_WORD}" DISAPPEARED after being visible. Auto-incrementing.`);
                processIncrementForCurrentTab(false); // Auto-increment
                state.isTriggerWordCurrentlyVisible = false; // Reset for next cycle
            } else if (triggerIsCurrentlyFound && state.isTriggerWordCurrentlyVisible) {
                // Word is still visible, no change in state needed regarding increment.
                logDebug(`Trigger "${CONFIG.AUTO_CLICK_TRIGGER_WORD}" is STILL visible.`);
            } else { // !triggerIsCurrentlyFound && !state.isTriggerWordCurrentlyVisible
                // Word is not found and was not visible, normal state.
                logDebug(`Trigger "${CONFIG.AUTO_CLICK_TRIGGER_WORD}" is NOT visible and was NOT visible.`);
            }
        };

        const observerCallback = (mutationsList, observer) => {
            // Debounce processing to avoid excessive checks during rapid DOM changes
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(processMutations, 100); // Check 100ms after last mutation
        };

        state.mutationObserver = new MutationObserver(observerCallback);
        const observerConfig = { childList: true, subtree: true, characterData: true };
        state.mutationObserver.observe(observeTargetNode, observerConfig);
        logInfo(`MutationObserver for trigger word initialized. Observing:`, observeTargetNode);
        setTimeout(processMutations, 200); // Initial check after a brief delay
    }

    function findElementsContainingText(rootElement, searchText) { // Debug helper
        const paths = [];
        const walker = document.createTreeWalker(rootElement, NodeFilter.SHOW_TEXT, null, false);
        let node;
        const uniquePaths = new Set();

        while ((node = walker.nextNode())) {
            if (node.nodeValue && node.nodeValue.includes(searchText)) {
                let path = [];
                let el = node.parentElement;
                while(el && el !== rootElement && path.length < 7) { // Limit path depth for brevity
                    let elDesc = el.tagName.toLowerCase();
                    if(el.id) elDesc += `#${el.id}`;
                    if(el.className && typeof el.className === 'string') elDesc += `.${el.className.trim().split(/\s+/).join('.')}`;
                    path.unshift(elDesc);
                    el = el.parentElement;
                }
                const pathStr = path.join(' > ');
                if (pathStr && !uniquePaths.has(pathStr) && paths.length < CONFIG.MAX_TRIGGER_DEBUG_LINES) {
                    uniquePaths.add(pathStr);
                    paths.push(pathStr);
                }
            }
        }
        return paths;
    }

    function updateTriggerDebugDisplay(isFound, paths = []) {
        if (!state.domElements.triggerDebugDisplay || !state.showTriggerDebug) {
            if(state.domElements.triggerDebugDisplay) state.domElements.triggerDebugDisplay.style.display = 'none';
            return;
        }
        state.domElements.triggerDebugDisplay.style.display = 'block';
        let html = `<strong>Trigger Debug ("${CONFIG.AUTO_CLICK_TRIGGER_WORD}"):</strong><br>`;
        html += isFound ? `<span style="color:lightgreen;">FOUND.</span>` : `<span style="color:orange;">NOT found recently.</span>`;
        html += ` (State: ${state.isTriggerWordCurrentlyVisible ? 'Flagged Visible' : 'Flagged NOT Visible'})<br>`;
        if (isFound && paths.length > 0) {
            html += "Potential locations:<br>" + paths.map(p => `<code>${p.replace(/</g, '<').replace(/>/g, '>')}</code>`).join('<br>');
        } else if (isFound) {
            html += "Found, but path finding yielded no distinct paths.";
        }
        state.domElements.triggerDebugDisplay.innerHTML = html;
    }


    // --- ------------------------------------------------------------------------ ---
    // --- ----------------------- SCRIPT INITIALIZATION ------------------------ ---
    // --- ------------------------------------------------------------------------ ---
    function initialize() {
        if (document.getElementById(CONFIG.UI_CONTAINER_ID)) {
            logError('Prod Helper UI v3 (Intl) is already initialized. Aborting.');
            if (typeof window.destroyProductionHelperV3 === 'function') {
                // Optional: Call destroy on the old one if you want to replace it.
                // window.destroyProductionHelperV3();
                // Then might need a slight delay before re-initializing if you do this.
            } else {
                return;
            }
        }
        logInfo('Initializing Production Helper v3 (Intl)...');

        loadDataFromStorage(); // Loads main settings, determines tab ID and mode
        buildMainUI();         // Builds UI based on loaded or default state

        updateRealTimeClockDisplay();
        updateStatistics();
        updateLastActionTimerDisplay();
        applyVisibilitySettings(); // Apply loaded visibility settings

        state.intervals.realTimeClock = setInterval(updateRealTimeClockDisplay, 1000);
        state.intervals.lastActionTimer = setInterval(updateLastActionTimerDisplay, 1000);
        state.intervals.statistics = setInterval(updateStatistics, CONFIG.STATS_UPDATE_INTERVAL_MS);
        state.intervals.multiTabWrite = setInterval(writeCurrentTabDataToLocalStorage, CONFIG.MULTI_TAB_UPDATE_INTERVAL_MS);
        state.intervals.multiTabRead = setInterval(() => readAllTabsDataFromLocalStorage(false), CONFIG.MULTI_TAB_READ_INTERVAL_MS);


        if (state.autoClickEnabled) initializeMutationObserver();

        state.pageKeydownListener = handlePageKeydown;
        document.addEventListener('keydown', state.pageKeydownListener);

        window.addEventListener('beforeunload', () => {
            writeCurrentTabDataToLocalStorage(); // Final write on close
            saveDataToStorage();
        });
        window.productionHelperV3Initialized = true;
        logInfo('Production Helper v3 (Intl) initialized successfully.');
    }

    function destroy() {
        logInfo('Destroying Production Helper v3 (Intl)...');
        writeCurrentTabDataToLocalStorage(); // Attempt a final save of tab-specific data
        saveDataToStorage(); // Save main settings
        if (state.mutationObserver) state.mutationObserver.disconnect();
        Object.values(state.intervals).forEach(clearInterval);
        if (state.domElements.uiContainer) state.domElements.uiContainer.remove();
        if (state.domElements.emergencyShowButton) state.domElements.emergencyShowButton.remove();
        if (state.domElements.tabOverlay) state.domElements.tabOverlay.remove();
        if(state.pageKeydownListener) document.removeEventListener('keydown', state.pageKeydownListener);
        window.removeEventListener('beforeunload', saveDataToStorage); // Assuming saveDataToStorage doesn't also do the final write
        delete window.productionHelperV3Initialized;
        logInfo('Production Helper v3 (Intl) destroyed.');
    }

    // --- Execution ---
    if (window.productionHelperV3Initialized && typeof window.destroyProductionHelperV3 === 'function') {
        logInfo("Found existing Prod Helper v3 instance. Attempting to destroy it first.");
        window.destroyProductionHelperV3(); // Call previous destroy
        // Add a small delay to ensure DOM cleanup before re-initializing
        setTimeout(() => {
             window.destroyProductionHelperV3 = destroy; // Make new destroy globally accessible
             initialize();
        }, 250);
    } else {
        window.destroyProductionHelperV3 = destroy;
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            initialize();
        } else {
            document.addEventListener('DOMContentLoaded', initialize, { once: true });
        }
    }
})();
