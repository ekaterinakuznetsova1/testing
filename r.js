// == Production Assistant v3.1 (International, Multi-Tab, Resizable, Advanced Debug) ==
// Purpose: Highly configurable, multi-tab aware UI with resizable panes and debug visuals.
// Deployment: Copy this entire code and paste it into the browser's developer console (F12)
//             or execute via a loader bookmarklet (fetch + eval).
// Author: Your AI Assistant & You
// ------------------------------------------------------------------------------------

(function() {
    'useSrict';

    // --- ------------------------------------------------------------------------ ---
    // --- --------- SCRIPT CONFIGURATION (All settings are here) --------------- ---
    // --- ------------------------------------------------------------------------ ---
    const CONFIG = {
        // --- General UI & Styling ---
        UI_CONTAINER_ID: 'prodHelperUI_v3_1_intl',
        UI_BOTTOM_OFFSET: '10px',
        UI_RIGHT_OFFSET: '10px',
        UI_WIDTH_PERCENT_VIEWPORT: 45, // Initial width, can be resized
        UI_HEIGHT_PERCENT_VIEWPORT: 35, // Initial height
        UI_MIN_WIDTH_PX: 350,            // Minimum width for the main UI
        UI_MIN_HEIGHT_PX: 280,
        UI_BACKGROUND_COLOR: 'rgba(20, 20, 30, 0.0)', // Even more subtle or fully transparent
        UI_TEXT_COLOR: 'rgba(160, 160, 170, 0.75)', // Slightly brighter grey
        UI_BORDER_COLOR: 'rgba(0, 0, 0, 0.0)',
        FONT_FAMILY: '"Segoe UI", Roboto, Arial, sans-serif',
        MAIN_ACCENT_COLOR: 'rgba(100, 100, 120, 0.6)',

        // --- Clicker & Counter ---
        MAIN_COUNTER_INPUT_ID: 'mainProdCounterInput_v3_1',
        MAIN_COUNTER_FONT_SIZE_INITIAL_EM: 4.8, // Slightly larger default
        MAIN_COUNTER_FONT_SIZE_MIN_EM: 1.8,
        MAIN_COUNTER_MAX_CHARS_BEFORE_RESIZE: 3,
        SHOW_DECREMENT_BUTTON: true,
        CLICKER_INCREMENT_BUTTON_ID: 'incrementProdBtn_v3_1',
        CLICKER_INCREMENT_BUTTON_COLOR: 'rgba(50, 50, 50, 0.25)',
        CLICKER_DECREMENT_BUTTON_ID: 'decrementProdBtn_v3_1',
        CLICKER_DECREMENT_BUTTON_COLOR: 'rgba(50, 30, 30, 0.2)',
        INCREMENT_KEYBOARD_SHORTCUT_CODE: 'ShiftRight',

        // --- Resizable Divider ---
        DIVIDER_WIDTH_PX: 8, // Width of the draggable divider
        LEFT_PANE_MIN_WIDTH_PERCENT: 25, // Min % width for clicker area
        RIGHT_PANE_MIN_WIDTH_PERCENT: 30, // Min % width for stats area

        // --- Timer for Last Action ---
        LAST_ACTION_TIMER_ID: 'lastActionTimer_v3_1',
        LAST_ACTION_TIMER_WARN_SECONDS: 10 * 60,
        LAST_ACTION_TIMER_WARN_COLOR: 'rgba(255, 50, 50, 0.8)',

        // --- Real-time Clock ---
        CLOCK_DISPLAY_ID: 'prodRealTimeClock_v3_1',
        CLOCK_FONT_SIZE_EM: 3.8, // Slightly larger

        // --- Tabs/Modes Overlay & Identification ---
        TAB_OVERLAY_ID_PREFIX: 'prodHelperTabOverlay_v3_1_',
        PAGE_COLOR_OVERLAY_ID: 'prodHelperPageColorOverlay_v3_1',
        PAGE_INDICATOR_TEXT_ID: 'prodHelperPageIndicatorText_v3_1',
        PAGE_INDICATOR_FONT_SIZE_PX: 48,
        TAB_IDENTIFICATION_MODES: [ // Predefined modes, user can override per URL
            { name: 'PREB', keyword: 'PREBUILD', color: 'rgba(255, 165, 0, 0.03)', textColor: 'rgba(255, 140, 0, 0.5)'}, // Text color more visible
            { name: 'CURRB', keyword: 'CURRENTBUILD', color: 'rgba(0, 165, 255, 0.03)', textColor: 'rgba(0, 140, 255, 0.5)'},
            { name: 'AFTREF', keyword: 'AFTERREFURBISH', color: 'rgba(100, 255, 100, 0.03)', textColor: 'rgba(80, 220, 80, 0.5)'},
        ],
        DEFAULT_TAB_MODE_NAME: 'CUSTOM', // If no keyword match or user overrides
        DEFAULT_TAB_MODE_COLOR: 'rgba(128, 128, 128, 0.02)',
        DEFAULT_TAB_MODE_TEXT_COLOR: 'rgba(180, 180, 180, 0.4)',
        UI_TAB_INDICATOR_TEXT_ID: 'prodHelperUITabIndicator_v3_1', // Indicator within the UI panel
        UI_TAB_INDICATOR_FONT_SIZE_EM: 1.2,

        // --- Multi-Tab State Sync via localStorage ---
        MULTI_TAB_STORAGE_PREFIX: 'prodHelper_tabs_v3_1_',
        MULTI_TAB_UPDATE_INTERVAL_MS: 1000,
        MULTI_TAB_READ_INTERVAL_MS: 1500,
        MULTI_TAB_DATA_TTL_MS: 5 * 60 * 1000,

        // --- Shift & Lunch --- (Same as before)
        DEFAULT_DAY_SHIFT_START_TIME: '06:26',
        DEFAULT_NIGHT_SHIFT_START_TIME: '18:26',
        SETTINGS_SHIFT_TYPE_SELECT_ID: 'shiftTypeSelect_v3_1',
        SETTINGS_SHIFT_START_TIME_INPUT_ID: 'shiftStartTimeInput_v3_1',
        SETTINGS_LUNCH_TIME_SELECT_ID: 'lunchTimeSelect_v3_1',
        DEFAULT_LUNCH_OPTIONS: [ /* ... same as your l.js ... */
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
        STATS_TEXT_SUMMARY_ID: 'prodStatsSummary_v3_1',
        STATS_FONT_SIZE_EM: 0.85, // Slightly larger
        STATS_UPDATE_INTERVAL_MS: 3000,

        // --- Auto-Clicker Trigger ---
        AUTO_CLICK_TRIGGER_WORD: 'wysłano',
        TRIGGER_OBSERVE_AREA_SELECTOR: 'body',
        AUTO_CLICK_ENABLED_CHECKBOX_ID: 'autoClickEnabled_v3_1',
        TRIGGER_DEBUG_DISPLAY_ID: 'triggerDebugDisplay_v3_1',
        MAX_TRIGGER_DEBUG_LINES: 5, // Fewer lines for less clutter

        // --- Storage ---
        STORAGE_KEY_PREFIX_MAIN_SETTINGS: 'prodHelper_mainCfg_v3_1_',
        STORAGE_KEY_PREFIX_CUSTOM_TAB_THEMES: 'prodHelper_customTabThemes_v3_1_', // For custom themes per URL
        USE_SESSION_STORAGE_FOR_MAIN_SETTINGS: true,

        // --- UI Controls & Settings Panel ---
        SETTINGS_PANEL_ID: 'prodHelperSettingsPanel_v3_1',
        EMERGENCY_HIDE_BUTTON_TEXT: 'CLOSE',
        LOCK_UI_BUTTON_TEXT_UNLOCKED: 'UI block',
        LOCK_UI_BUTTON_TEXT_LOCKED: 'UI unblock',
        TOGGLE_SETTINGS_BUTTON_TEXT_CLOSED: 'settings',
        TOGGLE_SETTINGS_BUTTON_TEXT_OPENED: 'settings',

        // --- Settings Toggles ---
        SETTINGS_SHOW_CLOCK_CHECKBOX_ID: 'showClockToggle_v3_1',
        SETTINGS_SHOW_STATS_CHECKBOX_ID: 'showStatsToggle_v3_1',
        SETTINGS_SHOW_LAST_ACTION_TIMER_CHECKBOX_ID: 'showLastActionTimerToggle_v3_1',
        SETTINGS_SHOW_UI_TAB_INDICATOR_CHECKBOX_ID: 'showUITabIndicatorToggle_v3_1', // For indicator inside UI
        SETTINGS_SHOW_PAGE_OVERLAY_CHECKBOX_ID: 'showPageOverlayToggle_v3_1',     // For full page color + text
        SETTINGS_SHOW_TRIGGER_DEBUG_CHECKBOX_ID: 'showTriggerDebugToggle_v3_1',
        SETTINGS_CURRENT_TAB_CONTRIBUTES_TO_TOTAL_CHECKBOX_ID: 'currentTabContributes_v3_1',
        SETTINGS_DEBUG_POINTER_EVENTS_CHECKBOX_ID: 'debugPointerEvents_v3_1', // New debug borders

        // --- Custom Tab Theme Settings ---
        SETTINGS_CUSTOM_TAB_NAME_INPUT_ID: 'customTabNameInput_v3_1',
        SETTINGS_CUSTOM_TAB_COLOR_INPUT_ID: 'customTabBkgColorInput_v3_1',
        SETTINGS_CUSTOM_TAB_TEXT_COLOR_INPUT_ID: 'customTabTextColorInput_v3_1',

        DEBUG_MODE: true,
    };

    // --- ------------------------------------------------------------------------ ---
    // --- --------- SCRIPT STATE (Internal - Do not modify directly) ----------- ---
    // --- ------------------------------------------------------------------------ ---
    const state = {
        uiVisible: true,
        uiLocked: false,
        settingsPanelVisible: false,
        currentTabFullUrl: window.location.href, // Used as key for custom themes
        currentTabId: '',
        currentTabMode: { /* ... */ }, // Will be initialized
        globalTotalClicks: 0,
        clicksForThisTab: 0,
        lastActionTimestampForThisTab: Date.now(),
        shiftType: 'auto',
        shiftStartTime: null,
        selectedLunchOption: null,
        autoClickEnabled: true,
        isTriggerWordCurrentlyVisible: false,
        triggerLastFoundIn: null,
        // Visibility settings
        showClock: true, showStats: true, showLastActionTimer: true,
        showUITabIndicator: true, showPageOverlay: true, showTriggerDebug: CONFIG.DEBUG_MODE,
        debugPointerEvents: false, // New debug borders state
        currentTabContributesToTotal: true,
        otherTabsData: {},
        customTabThemes: {}, // { "full_url_string": {name, color, textColor} }
        domElements: { leftPane: null, rightPane: null, divider: null /* for resizer */ },
        intervals: {},
        mutationObserver: null,
        pageKeydownListener: null,
        isResizing: false // For pane resizing
    };

    // ... (Rest of the script will follow)

 // == Production Assistant v3.1 (International, Multi-Tab, Resizable, Advanced Debug) ==
// (Continuation from Part 1: CONFIG, State)

    // --- ------------------------------------------------------------------------ ---
    // --- --------------------- UTILITY FUNCTIONS (Updated) -------------------- ---
    // --- ------------------------------------------------------------------------ ---
    function logDebug(...args) { if (CONFIG.DEBUG_MODE) console.debug(`[PHv3.1 DEBUG ${state.currentTabMode?.name || state.currentTabId || ''}]`, ...args); }
    function logInfo(...args) { console.info(`[PHv3.1 INFO ${state.currentTabMode?.name || state.currentTabId || ''}]`, ...args); }
    function logError(...args) { console.error(`[PHv3.1 ERROR ${state.currentTabMode?.name || state.currentTabId || ''}]`, ...args); }

    function getStorage(useSession = CONFIG.USE_SESSION_STORAGE_FOR_MAIN_SETTINGS) {
        return useSession ? sessionStorage : localStorage;
    }

    // Generates a more stable ID for the tab based on combining pathname and search params.
    function generateTabIdFromUrl() {
        const path = window.location.pathname.toLowerCase();
        const search = window.location.search.toLowerCase();
        // Create a simple hash or a concatenation that's relatively stable
        let id = `${path}${search}`;
        // Sanitize and shorten if necessary, but for localStorage keys, length is usually fine.
        id = id.replace(/[^a-z0-9_.-]/g, '_').replace(/_+/g, '_');
        if (id.length > 100) id = id.substring(0, 50) + '_' + id.substring(id.length - 49); // crude shortening
        return id || 'default_tab_id';
    }

    // Determines the tab mode (color, name) based on URL keywords or custom settings
    function determineCurrentTabMode() {
        const customTheme = state.customTabThemes[state.currentTabFullUrl];
        if (customTheme && customTheme.name && customTheme.color && customTheme.textColor) {
            logDebug(`Using custom theme for ${state.currentTabFullUrl}: ${customTheme.name}`);
            return { ...customTheme, isCustom: true }; // Return a copy
        }

        const urlUpper = window.location.href.toUpperCase();
        for (const mode of CONFIG.TAB_IDENTIFICATION_MODES) {
            if (urlUpper.includes(mode.keyword.toUpperCase())) {
                return { ...mode, isCustom: false }; // Return a copy
            }
        }
        return { name: CONFIG.DEFAULT_TAB_MODE_NAME, keyword: '', color: CONFIG.DEFAULT_TAB_MODE_COLOR, textColor: CONFIG.DEFAULT_TAB_MODE_TEXT_COLOR, isCustom: false };
    }

    // Enhanced saveDataToStorage to include custom themes and pointer debug state
    function saveDataToStorage() {
        try {
            // Save main UI settings (usually to sessionStorage)
            const mainSettingsStorage = getStorage(CONFIG.USE_SESSION_STORAGE_FOR_MAIN_SETTINGS);
            const lunchIndex = state.selectedLunchOption
                ? CONFIG.DEFAULT_LUNCH_OPTIONS.findIndex(opt => opt.start === state.selectedLunchOption.start && opt.end === state.selectedLunchOption.end && opt.type === state.selectedLunchOption.type)
                : -1;
            const mainDataToSave = {
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
                showUITabIndicator: state.showUITabIndicator,
                showPageOverlay: state.showPageOverlay,
                showTriggerDebug: state.showTriggerDebug,
                debugPointerEvents: state.debugPointerEvents, // Save new debug state
                currentTabContributesToTotal: state.currentTabContributesToTotal,
                // Save pane widths if they are resizable and state is stored
                leftPaneFlexBasis: state.domElements.leftPane ? state.domElements.leftPane.style.flexBasis : null,
            };
            mainSettingsStorage.setItem(CONFIG.STORAGE_KEY_PREFIX_MAIN_SETTINGS + state.currentTabId, JSON.stringify(mainDataToSave));
            logDebug('Main settings saved for tab:', state.currentTabId);

            // Save custom tab themes (to localStorage to persist across sessions)
            const themeStorage = getStorage(false); // false for localStorage
            themeStorage.setItem(CONFIG.STORAGE_KEY_PREFIX_CUSTOM_TAB_THEMES, JSON.stringify(state.customTabThemes));
            logDebug('Custom tab themes saved.');

        } catch (e) { logError('Failed to save data:', e); }
    }

    function updateOtherTabsSettingsDisplay() {
        const container = state.domElements.otherTabsSettingsContainer;
        if (!container) {
            logDebug("Cannot update other tabs settings display: container not found in DOM elements.");
            return;
        }
        container.innerHTML = ''; // Clear previous checkboxes or messages

        const checkboxLabelStyle = { display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '0.85em', color: 'rgba(255,255,255,0.75)', margin:'4px 0'};
        const checkboxStyle = { marginRight: '8px', transform: 'scale(1.15)', accentColor: CONFIG.MAIN_ACCENT_COLOR};

        const otherTabs = Object.values(state.otherTabsData).filter(td => td.tabId !== state.currentTabId);

        if (otherTabs.length === 0) {
            container.appendChild(createDOMElement('p', {
                textContent: '(No other active helper tabs detected)',
                style: { opacity: '0.6', fontStyle: 'italic', fontSize: '0.85em' }
            }));
            return;
        }

        otherTabs.forEach(tabData => {
            const checkboxId = `contribToggle_${tabData.tabId.replace(/[^a-zA-Z0-9]/g, '_')}`; // Sanitize ID
            const label = createDOMElement('label', { for: checkboxId, style: checkboxLabelStyle });
            const checkbox = createDOMElement('input', {
                type: 'checkbox',
                id: checkboxId,
                checked: tabData.contributesToTotal || false, // Default to false if undefined
                style: checkboxStyle,
                dataset: { tabIdTarget: tabData.tabId } // Store target tabId on the element
            });

            checkbox.addEventListener('change', (e) => {
                const targetTabId = e.target.dataset.tabIdTarget;
                constisChecked = e.target.checked;
                const otherTabStorageKey = CONFIG.MULTI_TAB_STORAGE_PREFIX + targetTabId;
                try {
                    const otherTabStoredJson = localStorage.getItem(otherTabStorageKey);
                    if (otherTabStoredJson) {
                        const otherTabStoredData = JSON.parse(otherTabStoredJson);
                        otherTabStoredData.contributesToTotal = isChecked;
                        otherTabStoredData.timestamp = Date.now(); // Update timestamp
                        localStorage.setItem(otherTabStorageKey, JSON.stringify(otherTabStoredData));
                        logInfo(`Contribution for tab ${targetTabId} set to ${isChecked} via settings.`);
                        // Optimistically update local state for otherTabsData
                        if(state.otherTabsData[targetTabId]) {
                           state.otherTabsData[targetTabId].contributesToTotal = isChecked;
                        }
                        readAllTabsDataFromLocalStorage(false); // Re-read and recalculate global stats
                    } else {
                        logError(`Could not find localStorage data for tabId ${targetTabId} to update contribution.`);
                    }
                } catch (err) { logError('Error updating other tab contribution setting:', err); }
            });

            label.append(checkbox, `Tab: ${tabData.modeName || tabData.tabId} (${tabData.clicks} clicks)`);
            container.appendChild(label);
        });
    }

    
    function loadDataFromStorage() {
        state.currentTabFullUrl = window.location.href; // Key for custom themes
        state.currentTabId = generateTabIdFromUrl();   // Shorter ID for main settings and tab sync

        // Load custom tab themes first (from localStorage)
        try {
            const themeStorage = getStorage(false);
            const themesJSON = themeStorage.getItem(CONFIG.STORAGE_KEY_PREFIX_CUSTOM_TAB_THEMES);
            if (themesJSON) {
                state.customTabThemes = JSON.parse(themesJSON);
                logInfo('Custom tab themes loaded.');
            }
        } catch (e) { logError('Failed to load custom tab themes:', e); state.customTabThemes = {}; }

        state.currentTabMode = determineCurrentTabMode(); // Determine after loading custom themes
        logInfo(`Current Tab ID: ${state.currentTabId}, Mode: ${state.currentTabMode.name} (Custom: ${state.currentTabMode.isCustom})`);

        // Load main UI settings for this tab
        try {
            const mainSettingsStorage = getStorage(CONFIG.USE_SESSION_STORAGE_FOR_MAIN_SETTINGS);
            const savedDataJSON = mainSettingsStorage.getItem(CONFIG.STORAGE_KEY_PREFIX_MAIN_SETTINGS + state.currentTabId);

            if (savedDataJSON) {
                const savedData = JSON.parse(savedDataJSON);
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
                state.showUITabIndicator = typeof savedData.showUITabIndicator === 'boolean' ? savedData.showUITabIndicator : true;
                state.showPageOverlay = typeof savedData.showPageOverlay === 'boolean' ? savedData.showPageOverlay : true;
                state.showTriggerDebug = typeof savedData.showTriggerDebug === 'boolean' ? savedData.showTriggerDebug : CONFIG.DEBUG_MODE;
                state.debugPointerEvents = typeof savedData.debugPointerEvents === 'boolean' ? savedData.debugPointerEvents : false;
                state.currentTabContributesToTotal = typeof savedData.currentTabContributesToTotal === 'boolean' ? savedData.currentTabContributesToTotal : true;

                // Restore pane width if saved
                state.initialLeftPaneFlexBasis = savedData.leftPaneFlexBasis || null;

                logInfo('Main settings loaded for tab:', state.currentTabId);
            } else {
                logInfo('No saved main settings found for this tab. Initializing defaults.');
                state.currentTabContributesToTotal = true; // Default contribution
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
        readAllTabsDataFromLocalStorage(true);
    }

    // ... (setDynamicDefaultLunch, _getDayStartHour, _getNightStartHour - same as your fixed version)
    function _getDayStartHour() {
        return parseInt(CONFIG.DEFAULT_DAY_SHIFT_START_TIME.split(':')[0], 10);
    }

    function _getNightStartHour() {
        return parseInt(CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME.split(':')[0], 10);
    }

    function setDynamicDefaultLunch() {
        let potentialShiftType = state.shiftType;
        if (potentialShiftType === 'auto') {
            if (state.shiftStartTime) {
                const shiftStartHour = state.shiftStartTime.getHours();
                potentialShiftType = (shiftStartHour >= _getDayStartHour() && shiftStartHour < _getNightStartHour()) ? 'day' : 'night';
            } else {
                const now = new Date();
                const currentHour = now.getHours();
                potentialShiftType = (currentHour >= _getDayStartHour() && currentHour < _getNightStartHour()) ? 'day' : 'night';
            }
        }
        const defaultLunch = CONFIG.DEFAULT_LUNCH_OPTIONS.find(opt => opt.type === potentialShiftType) ||
                             CONFIG.DEFAULT_LUNCH_OPTIONS.find(opt => opt.type === "any") ||
                             CONFIG.DEFAULT_LUNCH_OPTIONS[0];
        state.selectedLunchOption = defaultLunch;
        logDebug("Dynamic default lunch set to:", state.selectedLunchOption ? state.selectedLunchOption.text : "None specified in options");
    }


    // ... (writeCurrentTabDataToLocalStorage, readAllTabsDataFromLocalStorage - same as before but ensure they use state.currentTabId)
     function writeCurrentTabDataToLocalStorage() {
        if (!state.currentTabId) return;
        try {
            const tabData = {
                tabId: state.currentTabId, // This specific instance's ID
                modeName: state.currentTabMode.name, // The friendly name from mode config or custom
                clicks: state.clicksForThisTab,
                lastActionTimestamp: state.lastActionTimestampForThisTab,
                contributesToTotal: state.currentTabContributesToTotal,
                timestamp: Date.now()
            };
            localStorage.setItem(CONFIG.MULTI_TAB_STORAGE_PREFIX + state.currentTabId, JSON.stringify(tabData));
            logDebug('Wrote data for tab', state.currentTabId, 'to localStorage');
        } catch (e) { logError('Error writing tab data to localStorage:', e); }
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
                            if (now - (itemData.timestamp || 0) > CONFIG.MULTI_TAB_DATA_TTL_MS) {
                                localStorage.removeItem(key); continue;
                            }
                            // If it's the current tab's data being read back
                            if (itemData.tabId === state.currentTabId) {
                                if (isInitialLoad) { // Restore clicks and last action for current tab from its persisted multi-tab record
                                    state.clicksForThisTab = parseInt(itemData.clicks, 10) || 0;
                                    state.lastActionTimestampForThisTab = parseInt(itemData.lastActionTimestamp, 10) || Date.now();
                                    // state.currentTabContributesToTotal is loaded from its own main settings, not overwritten here.
                                    logInfo(`Restored multi-tab data for current tab ${state.currentTabId}: Clicks=${state.clicksForThisTab}`);
                                }
                                // Always ensure the version of "self" in otherTabsData reflects the current contribution setting
                                newOtherTabsData[itemData.tabId] = { ...itemData, clicks: state.clicksForThisTab, contributesToTotal: state.currentTabContributesToTotal };
                            } else {
                                newOtherTabsData[itemData.tabId] = itemData; // Data from other tabs
                            }

                            // Sum up global clicks based on the data just read/updated
                            if (newOtherTabsData[itemData.tabId] && newOtherTabsData[itemData.tabId].contributesToTotal) {
                                currentGlobalTotalClicks += (parseInt(newOtherTabsData[itemData.tabId].clicks, 10) || 0);
                            }
                        } catch (parseError) {
                            logError(`Error parsing data for LS key ${key}:`, parseError);
                            localStorage.removeItem(key);
                        }
                    }
                }
            }
        } catch (e) { logError('Error reading from localStorage during multi-tab sync:', e); }

        state.otherTabsData = newOtherTabsData;
        // If current tab's data wasn't in localStorage (e.g. first run for this tabId)
        // and it's supposed to contribute, add its current clicks to global.
        // This is slightly tricky to avoid double counting if it *was* in localStorage.
        // The above logic should correctly sum based on `newOtherTabsData[itemData.tabId].clicks`.
        // If current tab was NOT in localStorage at all, and it's contributing, its clicks are 0 initially for global sum.
        // So we need to ensure its own value (if contributing) is part of globalTotal
        // A simpler sum:
        state.globalTotalClicks = Object.values(state.otherTabsData)
                                   .filter(td => td.contributesToTotal)
                                   .reduce((sum, td) => sum + (parseInt(td.clicks, 10) || 0), 0);

        logDebug('Read other tabs data:', state.otherTabsData, 'Global total clicks:', state.globalTotalClicks);
        updateStatistics();
        updateOtherTabsSettingsDisplay();
    }


        function timeStringToMinutes(timeStr) {
        if (!timeStr || typeof timeStr !== 'string' || !timeStr.includes(':')) {
            logError('Invalid timeStr provided to timeStringToMinutes:', timeStr);
            return 0; // Return a default or handle error appropriately
        }
        const parts = timeStr.split(':');
        if (parts.length < 2) {
            logError('Invalid time format in timeStringToMinutes (expected HH:MM):', timeStr);
            return 0;
        }
        const hours = parseInt(parts[0], 10);
        const minutes = parseInt(parts[1], 10);

        if (isNaN(hours) || isNaN(minutes)) {
            logError('Non-numeric values in timeStringToMinutes:', timeStr);
            return 0;
        }
        return hours * 60 + minutes;
    }
    // ... (formatDateToHHMM, formatMsToDuration, createDOMElement - same as before)
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
            if (key === 'style' && typeof attributes[key] === 'object') {
                Object.assign(element.style, attributes[key]);
            } else if (key === 'dataset' && typeof attributes[key] === 'object') {
                 Object.assign(element.dataset, attributes[key]);
            } else if (['textContent', 'innerHTML', 'value', 'checked', 'disabled', 'type', 'id', 'title', 'placeholder', 'tabIndex', 'src'].includes(key) ) {
                element[key] = attributes[key];
            } else {
                element.setAttribute(key, attributes[key]);
            }
        }
        children.forEach(child => {
            if (child === null || typeof child === 'undefined') return;
            if (typeof child === 'string' || typeof child === 'number') {
                element.appendChild(document.createTextNode(String(child)));
            } else if (child instanceof Node) {
                element.appendChild(child);
            } else if (Array.isArray(child)) {
                child.forEach(subChild => { // Recursively append if child is an array of nodes/strings
                    if (subChild === null || typeof subChild === 'undefined') return;
                    if (typeof subChild === 'string' || typeof subChild === 'number') {
                         element.appendChild(document.createTextNode(String(subChild)));
                    } else if (subChild instanceof Node) {
                         element.appendChild(subChild);
                    }
                });
            }
        });
        return element;
    }


    // --- ------------------------------------------------------------------------ ---
    // --- ----------------------- UI ELEMENT ASSEMBLY (Updated) ------------------ ---
    // --- ------------------------------------------------------------------------ ---

    function buildMainUI() {
        if (document.getElementById(CONFIG.UI_CONTAINER_ID)) {
            logError('UI container already exists. Aborting UI build.');
            return;
        }

        const uiContainer = createDOMElement('div', {
            id: CONFIG.UI_CONTAINER_ID,
            style: { /* ... same as before, ensure pointerEvents: 'none' initially ... */
                position: 'fixed', bottom: CONFIG.UI_BOTTOM_OFFSET, right: CONFIG.UI_RIGHT_OFFSET,
                width: `${CONFIG.UI_WIDTH_PERCENT_VIEWPORT}vw`, height: `${CONFIG.UI_HEIGHT_PERCENT_VIEWPORT}vh`,
                minWidth: `${CONFIG.UI_MIN_WIDTH_PX}px`, minHeight: `${CONFIG.UI_MIN_HEIGHT_PX}px`,
                backgroundColor: CONFIG.UI_BACKGROUND_COLOR,
                border: CONFIG.UI_BORDER_COLOR === 'rgba(0, 0, 0, 0.0)' ? 'none' : `1px solid ${CONFIG.UI_BORDER_COLOR}`,
                borderRadius: '0px', boxSizing: 'border-box', color: CONFIG.UI_TEXT_COLOR,
                fontFamily: CONFIG.FONT_FAMILY, zIndex: '2147483640',
                display: 'flex', flexDirection: 'column', padding: '8px 12px', overflow: 'hidden',
                boxShadow: CONFIG.UI_BACKGROUND_COLOR === 'rgba(0, 0, 0, 0.0)' ? 'none' : '0 2px 10px rgba(0,0,0,0.15)',
                transition: 'opacity 0.3s ease-out, transform 0.3s ease-out, width 0.2s ease, height 0.2s ease', // Added width/height transition
                pointerEvents: 'none',
            }
        });
        state.domElements.uiContainer = uiContainer;

        // Top Controls Bar
        const topControls = createDOMElement('div', { /* ... same styles ... */
            style: { display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '5px', flexShrink: 0, pointerEvents: 'auto' }
        });
        const controlButtonBaseStyle = { /* ... same styles ... */
            cursor: 'pointer', background: 'none', border: 'none', color: CONFIG.UI_TEXT_COLOR,
            borderRadius: '3px', padding: '3px 7px', fontSize: '0.75em', marginLeft: '8px',
            opacity: '0.6', transition: 'opacity 0.2s'
        };
        // ... (toggleSettingsButton, lockUIButton, emergencyHideButton creation - same as before)
        state.domElements.toggleSettingsButton = createDOMElement('button', { id: CONFIG.TOGGLE_SETTINGS_BUTTON_TEXT_CLOSED, textContent: CONFIG.TOGGLE_SETTINGS_BUTTON_TEXT_CLOSED, title: 'Open/Close Settings', style: {...controlButtonBaseStyle} });
        state.domElements.toggleSettingsButton.addEventListener('click', toggleSettingsPanelVisibility);
        state.domElements.lockUIButton = createDOMElement('button', { id: 'lockProdUIBtn_v3_1', textContent: CONFIG.LOCK_UI_BUTTON_TEXT_UNLOCKED, title: 'Lock/Unlock UI', style: {...controlButtonBaseStyle} });
        state.domElements.lockUIButton.addEventListener('click', toggleUILockState);
        state.domElements.emergencyHideButton = createDOMElement('button', { id: 'hideProdUIBtn_v3_1', textContent: CONFIG.EMERGENCY_HIDE_BUTTON_TEXT, title: 'Hide UI Panel', style: { ...controlButtonBaseStyle, color: CONFIG.LAST_ACTION_TIMER_WARN_COLOR, fontWeight: 'bold' } });
        state.domElements.emergencyHideButton.addEventListener('click', () => setUIVisibility(false));
        topControls.append(state.domElements.toggleSettingsButton, state.domElements.lockUIButton, state.domElements.emergencyHideButton);

        uiContainer.appendChild(topControls);

        // Main Content Area (with resizable panes)
        const mainContentArea = createDOMElement('div', {
            className: 'main-content-area-ph', // class for easier selection if needed
            style: { display: 'flex', flexGrow: 1, overflow: 'hidden', position: 'relative', pointerEvents: 'none' }
        });

        // Left Pane (Clicker)
        state.domElements.leftPane = createDOMElement('div', {
            className: 'left-pane-ph',
            style: {
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                flexBasis: state.initialLeftPaneFlexBasis || '45%', // Initial width, can be resized
                minWidth: `${CONFIG.LEFT_PANE_MIN_WIDTH_PERCENT}%`,
                overflow: 'hidden', pointerEvents: 'auto', paddingRight: `${CONFIG.DIVIDER_WIDTH_PX / 2}px`, // Space for divider
                position: 'relative', // For absolute positioning of children like counter
            }
        });
        // ... (Counter and Clicker buttons - same as before, ensure pointerEvents: 'auto' for them) ...
        // Styles adapted from your "grey" image
        state.domElements.mainCounterInput = createDOMElement('input', {
            type: 'number', id: CONFIG.MAIN_COUNTER_INPUT_ID, value: state.clicksForThisTab,
            style: {
                fontSize: `${CONFIG.MAIN_COUNTER_FONT_SIZE_INITIAL_EM}em`, fontWeight: '300', // Lighter font
                color: CONFIG.UI_TEXT_COLOR, opacity: '0.9', marginBottom: '15px',
                textAlign: 'center', background: 'none', border: 'none', width: 'auto', minWidth: '70px',
                outline: 'none', padding: '0 5px', pointerEvents: 'auto'
            }
        });
        state.domElements.mainCounterInput.addEventListener('change', handleCounterInputChange);
        state.domElements.mainCounterInput.addEventListener('input', handleCounterInputDynamic);

        const clickerButtonsContainer = createDOMElement('div', { style: { display: 'flex', alignItems: 'center', pointerEvents: 'auto'} });
        const clickerBtnSharedStyle = {
            cursor: 'pointer', border: 'none', borderRadius: '6px',
            boxShadow: 'none', transition: 'transform 0.1s, background-color 0.15s', pointerEvents: 'auto',
            color: CONFIG.UI_TEXT_COLOR, opacity: '0.6', display: 'flex', alignItems: 'center', justifyContent: 'center'
        };
        clickerBtnSharedStyle[':hover'] = { opacity: '1', backgroundColor: 'rgba(255,255,255,0.05)' };

        if (CONFIG.SHOW_DECREMENT_BUTTON) {
            state.domElements.decrementButton = createDOMElement('button', {
                id: CONFIG.CLICKER_DECREMENT_BUTTON_ID, textContent: '–', title: 'Decrement (-1)',
                style: { ...clickerBtnSharedStyle, backgroundColor: CONFIG.CLICKER_DECREMENT_BUTTON_COLOR, marginRight: '15px', fontSize: '1.5em', width:'40px', height:'40px' }
            });
            state.domElements.decrementButton.addEventListener('click', handleDecrementClick);
            makeButtonInteractive(state.domElements.decrementButton);
            clickerButtonsContainer.appendChild(state.domElements.decrementButton);
        }
        state.domElements.incrementButton = createDOMElement('button', {
            id: CONFIG.CLICKER_INCREMENT_BUTTON_ID, textContent: '+', title: `Increment (+1) or ${CONFIG.INCREMENT_KEYBOARD_SHORTCUT_CODE}`,
            style: { ...clickerBtnSharedStyle, backgroundColor: CONFIG.CLICKER_INCREMENT_BUTTON_COLOR, fontSize: '2.2em', width:'60px', height:'60px',
                     padding: CONFIG.SHOW_DECREMENT_BUTTON ? '0' : '0' } // Adjusted padding
        });
        state.domElements.incrementButton.addEventListener('click', (event) => processIncrementForCurrentTab(true, event));
        makeButtonInteractive(state.domElements.incrementButton);
        clickerButtonsContainer.appendChild(state.domElements.incrementButton);

        state.domElements.leftPane.append(state.domElements.mainCounterInput, clickerButtonsContainer);


        // Draggable Divider
        state.domElements.divider = createDOMElement('div', {
            className: 'divider-ph',
            style: {
                width: `${CONFIG.DIVIDER_WIDTH_PX}px`, cursor: 'ew-resize',
                // backgroundColor: `${CONFIG.MAIN_ACCENT_COLOR}55`, // Subtle color for divider
                flexShrink: 0, pointerEvents: 'auto',
                display: 'flex', alignItems:'center', justifyContent: 'center',
                // opacity: 0.3 // Make it very subtle
            }
        });
        // Add some visual cue to divider (e.g. dots)
        // const Vdots = createDOMElement('div', {textContent:'⋮', style:{color: CONFIG.UI_TEXT_COLOR, fontSize: '1.2em', lineHeight: '0.5em'}});
        // state.domElements.divider.appendChild(Vdots);
        state.domElements.divider.addEventListener('mousedown', startResizePanes);

        // Right Pane (Statistics)
        state.domElements.rightPane = createDOMElement('div', {
            className: 'right-pane-ph',
            style: {
                display: 'flex', flexDirection: 'column', flexGrow: 1,
                overflowY: 'auto', pointerEvents: 'auto', paddingLeft: `${CONFIG.DIVIDER_WIDTH_PX / 2}px`, // Space for divider
                minWidth: `${CONFIG.RIGHT_PANE_MIN_WIDTH_PERCENT}%`,
            }
        });
        // ... (Stats Summary, Last Action Timer, Trigger Debug - same as before, ensure pointerEvents: 'auto' for statsTextSummary if selectable)
        state.domElements.statsTextSummary = createDOMElement('div', { id: CONFIG.STATS_TEXT_SUMMARY_ID, style: { fontSize: `${CONFIG.STATS_FONT_SIZE_EM}em`, lineHeight: '1.5', marginBottom: '8px', pointerEvents: 'auto' } });
        state.domElements.lastActionTimerDisplay = createDOMElement('div', { id: CONFIG.LAST_ACTION_TIMER_ID, textContent: 'Last: 00s', style: { fontSize: `${CONFIG.STATS_FONT_SIZE_EM * 0.9}em`, marginTop: '5px', opacity: '0.8', pointerEvents: 'none' } });
        state.domElements.triggerDebugDisplay = createDOMElement('div', { id: CONFIG.TRIGGER_DEBUG_DISPLAY_ID, style: { fontSize: `${CONFIG.STATS_FONT_SIZE_EM * 0.8}em`, marginTop: '10px', borderTop: `1px dashed ${CONFIG.UI_TEXT_COLOR}22`, paddingTop: '5px', display: 'none', maxHeight: '50px', overflowY: 'auto', opacity: '0.7', pointerEvents: 'auto', wordBreak: 'break-all'} });
        state.domElements.triggerDebugDisplay.innerHTML = 'Trigger Debug: Waiting...';
        state.domElements.rightPane.append(state.domElements.statsTextSummary, state.domElements.lastActionTimerDisplay, state.domElements.triggerDebugDisplay);


        mainContentArea.append(state.domElements.leftPane, state.domElements.divider, state.domElements.rightPane);
        uiContainer.appendChild(mainContentArea);

        // Bottom Info Bar (UI Tab Indicator and Clock)
        const bottomInfoBar = createDOMElement('div', {
            style: { /* ... same styles, ensure pointerEvents match desire ... */
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
                marginTop: 'auto', paddingTop: '5px', flexShrink: 0,
                borderTop: `1px solid ${CONFIG.UI_TEXT_COLOR}1A`, // More subtle top border
                pointerEvents: 'none' // Bar itself passes clicks
            }
        });
        state.domElements.uiTabIndicatorText = createDOMElement('div', { // Renamed from tabIndicatorText
            id: CONFIG.UI_TAB_INDICATOR_TEXT_ID, textContent: state.currentTabMode.name,
            style: {
                fontSize: `${CONFIG.UI_TAB_INDICATOR_FONT_SIZE_EM}em`, fontWeight: '500',
                color: state.currentTabMode.textColor || CONFIG.UI_TEXT_COLOR, // Use mode's text color or default
                opacity: 0.5, pointerEvents: 'auto' // Allow selecting this text
            }
        });
        state.domElements.realTimeClock = createDOMElement('div', {
            id: CONFIG.CLOCK_DISPLAY_ID, textContent: '00:00:00',
            style: { /* ... same as before, ensure pointerEvents:'none' ... */
                fontSize: `${CONFIG.CLOCK_FONT_SIZE_EM}em`, fontFamily: 'monospace',
                color: CONFIG.UI_TEXT_COLOR, opacity: '0.3', pointerEvents: 'none'
            }
        });
        bottomInfoBar.append(state.domElements.uiTabIndicatorText, state.domElements.realTimeClock);
        uiContainer.appendChild(bottomInfoBar);


        // Settings Panel & Page Overlay
        buildSettingsPanel(); // Defines state.domElements.settingsPanel
        uiContainer.appendChild(state.domElements.settingsPanel);

        buildPageOverlayAndIndicator(); // Defines state.domElements.pageColorOverlay & pageIndicatorText
        document.body.appendChild(state.domElements.pageColorOverlay);
        document.body.appendChild(state.domElements.pageIndicatorText);


        buildEmergencyShowButton(); // Defines state.domElements.emergencyShowButton
        document.body.appendChild(state.domElements.emergencyShowButton);

    function toggleSettingsPanelVisibility() {
        setSettingsPanelVisibility(!state.settingsPanelVisible);
    }

    function setSettingsPanelVisibility(visible) {
        state.settingsPanelVisible = visible;
        const panel = state.domElements.settingsPanel;
        const uiContainer = state.domElements.uiContainer;
        const toggleButton = state.domElements.toggleSettingsButton;

        if (panel) {
            panel.style.display = visible ? 'flex' : 'none';
            // Slide from right. Ensure parent (uiContainer or mainContentArea) has position: relative
            // And panel has position: absolute
            panel.style.transform = visible ? 'translateX(0%)' : 'translateX(101%)'; // Adjust percentage if needed
        }

        if (uiContainer) {
            // Main container needs to become interactive for pointer events when settings are open,
            // and return to 'none' (to pass clicks through) when settings are closed,
            // *unless* the UI itself is globally locked.
            if (visible) {
                uiContainer.style.pointerEvents = 'auto';
            } else {
                uiContainer.style.pointerEvents = state.uiLocked ? 'auto' : 'none';
            }
        }

        if (toggleButton) {
            toggleButton.textContent = visible ? CONFIG.TOGGLE_SETTINGS_BUTTON_TEXT_OPENED : CONFIG.TOGGLE_SETTINGS_BUTTON_TEXT_CLOSED;
            // Optional: change style of toggle button when panel is open
            // toggleButton.style.backgroundColor = visible ? 'rgba(100,120,160,0.6)' : 'rgba(255,255,255,0.05)';
        }

        // If settings panel is opened and UI is globally locked,
        // ensure elements within settings panel respect the lock.
        if (visible && state.uiLocked) {
            setUILockState(true); // Re-apply lock state to potentially new elements in settings
        }
        saveDataToStorage(); // Save the visibility state of the panel
    }

        
        setInitialUIStates(); // Populates settings, applies visibility etc.
        applyDebugPointerEventsStyle(); // Apply debug borders if enabled

        logInfo('Main UI v3.1 (Intl) built.');
    }


    function buildPageOverlayAndIndicator() {
        state.domElements.pageColorOverlay = createDOMElement('div', {
            id: CONFIG.PAGE_COLOR_OVERLAY_ID,
            style: {
                position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh',
                backgroundColor: state.currentTabMode.color,
                zIndex: '2147483630', // Very high, but below helper UI
                pointerEvents: 'none',
                display: state.showPageOverlay ? 'block' : 'none',
                transition: 'background-color 0.3s ease'
            }
        });

        state.domElements.pageIndicatorText = createDOMElement('div', {
            id: CONFIG.PAGE_INDICATOR_TEXT_ID,
            textContent: state.currentTabMode.name,
            style: {
                position: 'fixed', top: '50%', right: '30px', transform: 'translateY(-50%)',
                fontSize: `${CONFIG.PAGE_INDICATOR_FONT_SIZE_PX}px`, fontWeight: 'bold',
                color: state.currentTabMode.textColor,
                opacity: 0.8, // Text on overlay can be more opaque
                zIndex: '2147483631', // Above overlay, below helper UI
                pointerEvents: 'none',
                display: state.showPageOverlay ? 'block' : 'none', // Tied to overlay visibility
                textShadow: '0 0 5px rgba(0,0,0,0.3)',
                writingMode: 'vertical-rl', // Optional: rotate text
                textOrientation: 'mixed', // Optional
                transition: 'color 0.3s ease, opacity 0.3s ease'
            }
        });
    }


    function startResizePanes(e) {
        e.preventDefault();
        state.isResizing = true;
        const mainArea = state.domElements.leftPane.parentElement; // mainContentArea
        const initialMouseX = e.clientX;
        const initialLeftPaneWidth = state.domElements.leftPane.offsetWidth;
        const totalWidth = mainArea.offsetWidth - CONFIG.DIVIDER_WIDTH_PX; // Usable width for panes

        const doResize = (moveEvent) => {
            if (!state.isResizing) return;
            const dx = moveEvent.clientX - initialMouseX;
            let newLeftWidth = initialLeftPaneWidth + dx;

            // Constrain by min/max percentages
            const minLeft = totalWidth * (CONFIG.LEFT_PANE_MIN_WIDTH_PERCENT / 100);
            const minRight = totalWidth * (CONFIG.RIGHT_PANE_MIN_WIDTH_PERCENT / 100);

            if (newLeftWidth < minLeft) newLeftWidth = minLeft;
            if (newLeftWidth > totalWidth - minRight) newLeftWidth = totalWidth - minRight;

            const newLeftFlexBasis = (newLeftWidth / totalWidth) * 100;
            state.domElements.leftPane.style.flexBasis = `${newLeftFlexBasis}%`;
            // Right pane will adjust automatically due to flexGrow: 1
            logDebug(`Resizing: left flexBasis ${newLeftFlexBasis.toFixed(1)}%`);
        };

        const stopResize = () => {
            if (!state.isResizing) return;
            state.isResizing = false;
            document.removeEventListener('mousemove', doResize);
            document.removeEventListener('mouseup', stopResize);
            logDebug('Resizing stopped. Left pane flexBasis:', state.domElements.leftPane.style.flexBasis);
            saveDataToStorage(); // Save new pane layout
        };

        document.addEventListener('mousemove', doResize);
        document.addEventListener('mouseup', stopResize);
    }


    function buildSettingsPanel() {
        // ... (Panel creation - mostly same as before, but add new settings)
        const panel = createDOMElement('div', { /* ... styles from v3, ensure pointerEvents: 'auto' ... */
            id: CONFIG.SETTINGS_PANEL_ID,
            style: {
                position: 'absolute', top: '0px', right: '0px', bottom: '0px',
                width: 'clamp(320px, 60%, 500px)', // More flexible width
                backgroundColor: `rgba(35, 40, 50, 0.98)`, // Slightly more opaque
                borderLeft: `2px solid ${CONFIG.MAIN_ACCENT_COLOR}`,
                padding: '15px 20px', zIndex: '1000', display: 'none', flexDirection: 'column',
                gap: '12px', overflowY: 'auto', boxShadow: '-10px 0px 25px rgba(0,0,0,0.3)',
                transition: 'transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
                pointerEvents: 'auto'
            }
        });
        state.domElements.settingsPanel = panel;

        const heading = createDOMElement('h3', { textContent: 'Settings', style: { margin: '0 0 15px 0', textAlign: 'center', color: 'white', fontSize: '1.3em'} });
        panel.appendChild(heading);

        const commonSelectStyle = {width: '100%', padding: '8px', boxSizing: 'border-box', backgroundColor: 'rgba(0,0,0,0.35)', color: 'white', border: `1px solid ${CONFIG.MAIN_ACCENT_COLOR}bb`, borderRadius: '4px', fontSize: '0.9em'};
        const commonInputStyle = {...commonSelectStyle, type: 'text'}; // Base for text/color inputs
        const commonLabelStyle = { display: 'block', marginBottom: '4px', fontSize: '0.9em', color: 'rgba(255,255,255,0.8)'};
        const checkboxLabelStyle = { display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '0.9em', color: 'rgba(255,255,255,0.8)', margin: '6px 0'};
        const checkboxStyle = { marginRight: '8px', transform: 'scale(1.25)', accentColor: CONFIG.MAIN_ACCENT_COLOR};
        const sectionHeadingStyle = {margin: '18px 0 10px 0', color: 'white', fontSize: '1.05em', borderBottom: '1px solid rgba(255,255,255,0.25)', paddingBottom: '6px'};

        // --- Shift & Lunch Section --- (same inputs as before)
        panel.appendChild(createDOMElement('h4', {textContent: 'Shift & Lunch', style: sectionHeadingStyle}));
        // ... (Shift Type, Start Time, Lunch Select - adapt from previous buildSettingsPanel)
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
        // ... (Auto-click checkbox)
        const autoClickLabel = createDOMElement('label', { style: checkboxLabelStyle });
        state.domElements.autoClickEnabledCheckbox = createDOMElement('input', { type: 'checkbox', id: CONFIG.AUTO_CLICK_ENABLED_CHECKBOX_ID, checked: state.autoClickEnabled, style: checkboxStyle });
        state.domElements.autoClickEnabledCheckbox.addEventListener('change', handleAutoClickSettingChange);
        autoClickLabel.append(state.domElements.autoClickEnabledCheckbox, `Auto-Increment (trigger: "${CONFIG.AUTO_CLICK_TRIGGER_WORD}")`);
        panel.appendChild(autoClickLabel);


        // --- UI Element Visibility Section ---
        panel.appendChild(createDOMElement('h4', {textContent: 'UI Element Visibility', style: sectionHeadingStyle}));
        // ... (Checkboxes for Clock, Stats, LastActionTimer, UITabIndicator, PageOverlay, TriggerDebug)
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
            state.domElements[vc.stateKey + 'Checkbox'] = createDOMElement('input', {type: 'checkbox', id: vc.id, checked: state[vc.stateKey], style: checkboxStyle});
            state.domElements[vc.stateKey + 'Checkbox'].addEventListener('change', (e) => { state[vc.stateKey] = e.target.checked; applyVisibilitySettings(); saveDataToStorage(); });
            label.append(state.domElements[vc.stateKey + 'Checkbox'], vc.label);
            panel.appendChild(label);
        });

        // --- Debugging Section ---
        panel.appendChild(createDOMElement('h4', {textContent: 'Debugging', style: sectionHeadingStyle}));
        const debugPointerLabel = createDOMElement('label', { style: checkboxLabelStyle });
        state.domElements.debugPointerEventsCheckbox = createDOMElement('input', { type: 'checkbox', id: CONFIG.SETTINGS_DEBUG_POINTER_EVENTS_CHECKBOX_ID, checked: state.debugPointerEvents, style: checkboxStyle });
        state.domElements.debugPointerEventsCheckbox.addEventListener('change', (e) => { state.debugPointerEvents = e.target.checked; applyDebugPointerEventsStyle(); saveDataToStorage(); });
        debugPointerLabel.append(state.domElements.debugPointerEventsCheckbox, 'Highlight Clickable Areas (Red Border)');
        panel.appendChild(debugPointerLabel);


        // --- Custom Tab Theme Section ---
        panel.appendChild(createDOMElement('h4', {textContent: `Customize This Tab (${state.currentTabMode.name || 'Identifier'})`, style: sectionHeadingStyle}));
        const currentTheme = state.customTabThemes[state.currentTabFullUrl] || state.currentTabMode; // Use custom or detected

        const nameGroup = createDOMElement('div');
        nameGroup.appendChild(createDOMElement('label', {for: CONFIG.SETTINGS_CUSTOM_TAB_NAME_INPUT_ID, textContent: 'Display Name:', style: commonLabelStyle}));
        state.domElements.customTabNameInput = createDOMElement('input', {type: 'text', id: CONFIG.SETTINGS_CUSTOM_TAB_NAME_INPUT_ID, value: currentTheme.name, style: commonInputStyle, placeholder: 'E.g., PREBUILD-Station1'});
        nameGroup.appendChild(state.domElements.customTabNameInput);
        panel.appendChild(nameGroup);

        const colorGroup = createDOMElement('div', {style:{marginTop:'8px'}});
        colorGroup.appendChild(createDOMElement('label', {for: CONFIG.SETTINGS_CUSTOM_TAB_COLOR_INPUT_ID, textContent: 'Page Overlay Color (e.g., rgba(255,0,0,0.05) or #FF00000D):', style: commonLabelStyle}));
        state.domElements.customTabBkgColorInput = createDOMElement('input', {type: 'text', id: CONFIG.SETTINGS_CUSTOM_TAB_COLOR_INPUT_ID, value: currentTheme.color, style: commonInputStyle });
        // You could add a <input type="color"> here too for easier picking, then convert its HEX to RGBA if needed.
        colorGroup.appendChild(state.domElements.customTabBkgColorInput);
        panel.appendChild(colorGroup);

        const textColorGroup = createDOMElement('div', {style:{marginTop:'8px'}});
        textColorGroup.appendChild(createDOMElement('label', {for: CONFIG.SETTINGS_CUSTOM_TAB_TEXT_COLOR_INPUT_ID, textContent: 'Page Indicator Text Color (e.g., rgba(200,0,0,0.5) or #AA0000):', style: commonLabelStyle}));
        state.domElements.customTabTextColorInput = createDOMElement('input', {type: 'text', id: CONFIG.SETTINGS_CUSTOM_TAB_TEXT_COLOR_INPUT_ID, value: currentTheme.textColor, style: commonInputStyle});
        textColorGroup.appendChild(state.domElements.customTabTextColorInput);
        panel.appendChild(textColorGroup);

        const saveThemeButton = createDOMElement('button', {textContent: 'Save Custom Theme for This URL', style: {...commonSelectStyle, backgroundColor: `${CONFIG.MAIN_ACCENT_COLOR}aa`, color:'white', marginTop:'10px', cursor:'pointer'}});
        saveThemeButton.onclick = handleSaveCustomTheme;
        panel.appendChild(saveThemeButton);

        const resetThemeButton = createDOMElement('button', {textContent: 'Reset Theme to Default for This URL', style: {...commonSelectStyle, backgroundColor: `rgba(100,100,100,0.3)`, color:'white', marginTop:'5px', cursor:'pointer'}});
        resetThemeButton.onclick = handleResetCustomTheme;
        panel.appendChild(resetThemeButton);


        // --- Multi-Tab Contribution Section --- (same inputs as before)
        panel.appendChild(createDOMElement('h4', {textContent: 'Multi-Tab Statistics Contribution', style: sectionHeadingStyle}));
        // ... (currentTabContributesCheckbox and otherTabsSettingsContainer)
        const currentTabContributeLabel = createDOMElement('label', { style: checkboxLabelStyle });
        state.domElements.currentTabContributesCheckbox = createDOMElement('input', {type: 'checkbox', id: CONFIG.SETTINGS_CURRENT_TAB_CONTRIBUTES_TO_TOTAL_CHECKBOX_ID, checked: state.currentTabContributesToTotal, style: checkboxStyle });
        state.domElements.currentTabContributesCheckbox.addEventListener('change', (e) => {
            state.currentTabContributesToTotal = e.target.checked;
            writeCurrentTabDataToLocalStorage(); readAllTabsDataFromLocalStorage(); saveDataToStorage();
        });
        currentTabContributeLabel.append(state.domElements.currentTabContributesCheckbox, `This Tab (${state.currentTabMode.name}) contributes to Global Clicks/Hour`);
        panel.appendChild(currentTabContributeLabel);

        state.domElements.otherTabsSettingsContainer = createDOMElement('div', {id: 'otherTabsSettings_v3_1', style: {marginLeft: '20px', marginTop: '5px'}});
        panel.appendChild(state.domElements.otherTabsSettingsContainer);
        // updateOtherTabsSettingsDisplay() will be called in setInitialUIStates


        //--- Close Button for Settings Panel ---
        const settingsPanelCloseButtonStyle = {
            cursor: 'pointer', backgroundColor: `${CONFIG.MAIN_ACCENT_COLOR}bb`, // Using accent color
            border: 'none', color: 'white', borderRadius: '5px', padding: '10px',
            fontSize: '1em', width: '100%', marginTop: 'auto', // Pushes to bottom if panel has space
            transition: 'background-color 0.2s'
        };
        settingsPanelCloseButtonStyle[':hover'] = { backgroundColor: CONFIG.MAIN_ACCENT_COLOR };

        const closeButton = createDOMElement('button', { textContent: 'Apply & Close', style: settingsPanelCloseButtonStyle });
        closeButton.addEventListener('click', () => setSettingsPanelVisibility(false));
        panel.appendChild(closeButton);
    }
    // ... (setInitialUIStates - will need updates for new settings fields)
    // ... (applyVisibilitySettings - will need updates for new elements like page overlay/text)
    // ... (pointer-events debug style function)

 // == Production Assistant v3.1 (International, Multi-Tab, Resizable, Advanced Debug) ==
// (Continuation from Part 2: UI Assembly)

    // --- ------------------------------------------------------------------------ ---
    // --- ----------------------- EVENT HANDLERS (Updated & New) --------------- ---
    // --- ------------------------------------------------------------------------ ---

    function processIncrementForCurrentTab(isManualAction = false, event = null) {
        if (isManualAction && state.uiLocked && event &&
            (event.currentTarget === state.domElements.incrementButton || event.currentTarget === document /* for keydown */)) {
            // Allow if UI locked but direct click on button or from keyboard shortcut
        } else if (state.uiLocked && isManualAction) {
            logDebug('UI is locked, manual increment ignored.');
            return;
        }

        state.clicksForThisTab++;
        state.lastActionTimestampForThisTab = Date.now();
        updateCounterDisplay();
        updateLastActionTimerDisplay();
        writeCurrentTabDataToLocalStorage();
        readAllTabsDataFromLocalStorage(false); // false: not initial load, just update global view
    }

    function handleDecrementClick() {
        if (state.uiLocked) return;
        if (state.clicksForThisTab > 0) {
            state.clicksForThisTab--;
            state.lastActionTimestampForThisTab = Date.now();
            updateCounterDisplay();
            updateLastActionTimerDisplay();
            writeCurrentTabDataToLocalStorage();
            readAllTabsDataFromLocalStorage(false);
        }
    }

    function handleCounterInputDynamic(event) {
        const input = event.target;
        const valueLength = input.value.length;
        let newFontSize = CONFIG.MAIN_COUNTER_FONT_SIZE_INITIAL_EM;

        if (valueLength > CONFIG.MAIN_COUNTER_MAX_CHARS_BEFORE_RESIZE) {
            const overflowChars = valueLength - CONFIG.MAIN_COUNTER_MAX_CHARS_BEFORE_RESIZE;
            newFontSize = Math.max(CONFIG.MAIN_COUNTER_FONT_SIZE_MIN_EM, CONFIG.MAIN_COUNTER_FONT_SIZE_INITIAL_EM - overflowChars * 0.55); // Factor for resizing
        }
        input.style.fontSize = `${newFontSize}em`;
        // Adjust input width dynamically too, simpler approach:
        input.style.width = `${Math.max(70, valueLength * (newFontSize * 0.6) + 20)}px`; // Approximate width needed
    }

    function handleCounterInputChange(event) {
        if (state.uiLocked) {
            event.target.value = state.clicksForThisTab;
            handleCounterInputDynamic({target: event.target}); // Re-apply font size
            return;
        }
        let newValue = parseInt(event.target.value, 10);
        if (isNaN(newValue) || newValue < 0) newValue = state.clicksForThisTab;

        if (newValue !== state.clicksForThisTab) {
            state.clicksForThisTab = newValue;
            state.lastActionTimestampForThisTab = Date.now();
            updateLastActionTimerDisplay();
            writeCurrentTabDataToLocalStorage();
            readAllTabsDataFromLocalStorage(false);
        }
        updateCounterDisplay(); // Ensures value is correct and calls dynamic resize
    }

    function updateCounterDisplay() {
        if (state.domElements.mainCounterInput) {
            state.domElements.mainCounterInput.value = state.clicksForThisTab;
            handleCounterInputDynamic({target: state.domElements.mainCounterInput});
        }
    }

    function handleShiftSettingsChange() {
        state.shiftType = state.domElements.settingsShiftTypeSelect.value;
        determineAndSetShiftStartTime(false);
        setDynamicDefaultLunch();

        if (state.domElements.settingsLunchSelect && state.selectedLunchOption) {
            const lunchSelect = state.domElements.settingsLunchSelect;
            lunchSelect.innerHTML = '';
            let currentShiftCategory = 'any';
            if (state.shiftType === 'day' || (state.shiftType === 'auto' && state.shiftStartTime && state.shiftStartTime.getHours() < _getNightStartHour() && state.shiftStartTime.getHours() >= _getDayStartHour())) {
                currentShiftCategory = 'day';
            } else if (state.shiftType === 'night' || (state.shiftType === 'auto' && (state.shiftStartTime.getHours() >= _getNightStartHour() || state.shiftStartTime.getHours() < _getDayStartHour()))) {
                currentShiftCategory = 'night';
            }

            const filteredLunchOptions = CONFIG.DEFAULT_LUNCH_OPTIONS.filter(
                opt => opt.type === currentShiftCategory || opt.type === 'any'
            );
            filteredLunchOptions.forEach((opt) => {
                const originalIndex = CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(opt);
                lunchSelect.add(new Option(opt.text, String(originalIndex)));
            });

            const currentLunchOriginalIndex = state.selectedLunchOption ? CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(state.selectedLunchOption) : -1;
            if(currentLunchOriginalIndex > -1 && filteredLunchOptions.some(opt => CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(opt) === currentLunchOriginalIndex) ) {
                lunchSelect.value = String(currentLunchOriginalIndex);
            } else if (filteredLunchOptions.length > 0) {
                state.selectedLunchOption = filteredLunchOptions[0];
                lunchSelect.value = String(CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(filteredLunchOptions[0]));
            } else {
                const noLunchOpt = CONFIG.DEFAULT_LUNCH_OPTIONS.find(opt => opt.start === "00:00" && opt.end === "00:00");
                if (noLunchOpt) {
                    state.selectedLunchOption = noLunchOpt;
                    lunchSelect.value = String(CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(noLunchOpt));
                } else { // Absolute fallback if "No Lunch" isn't even an option
                     state.selectedLunchOption = CONFIG.DEFAULT_LUNCH_OPTIONS[0];
                     lunchSelect.value = "0";
                }
            }
        }
        updateManualShiftTimeInputVisibility();
        updateStatistics();
        saveDataToStorage();
    }

    function updateManualShiftTimeInputVisibility() {
        const isManual = state.shiftType !== 'auto';
        const inputEl = state.domElements.settingsShiftStartTimeInput;
        const labelEl = inputEl?.previousElementSibling; // Assuming label is direct sibling

        if (inputEl) {
           inputEl.disabled = !isManual;
           inputEl.style.display = isManual ? 'block' : 'none';
           if (labelEl && labelEl.tagName === 'LABEL') labelEl.style.display = isManual ? 'block' : 'none';
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

    function handleSaveCustomTheme() {
        const name = state.domElements.customTabNameInput.value.trim() || state.currentTabMode.name || CONFIG.DEFAULT_TAB_MODE_NAME;
        const color = state.domElements.customTabBkgColorInput.value.trim() || state.currentTabMode.color || CONFIG.DEFAULT_TAB_MODE_COLOR;
        const textColor = state.domElements.customTabTextColorInput.value.trim() || state.currentTabMode.textColor || CONFIG.DEFAULT_TAB_MODE_TEXT_COLOR;

        state.customTabThemes[state.currentTabFullUrl] = { name, color, textColor };
        state.currentTabMode = { name, color, textColor, isCustom: true }; // Update current mode immediately

        logInfo(`Custom theme saved for ${state.currentTabFullUrl}:`, state.currentTabMode);
        saveDataToStorage(); // Saves all custom themes and current main settings
        applyThemeToPage();
        updateUITabIndicator();
    }

    function handleResetCustomTheme() {
        if (state.customTabThemes[state.currentTabFullUrl]) {
            delete state.customTabThemes[state.currentTabFullUrl];
            logInfo(`Custom theme reset for ${state.currentTabFullUrl}.`);
            state.currentTabMode = determineCurrentTabMode(); // Re-determine based on defaults or URL keywords
            saveDataToStorage();
            applyThemeToPage();
            updateUITabIndicator();
            // Update input fields in settings panel to reflect reset
            const defaultThemeForInputs = state.currentTabMode;
            state.domElements.customTabNameInput.value = defaultThemeForInputs.name;
            state.domElements.customTabBkgColorInput.value = defaultThemeForInputs.color;
            state.domElements.customTabTextColorInput.value = defaultThemeForInputs.textColor;
        }
    }

    function handlePageKeydown(event) {
        // Allow typing in inputs, unless it's our shortcut and not the counter input
        if ((event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA' || event.target.isContentEditable) &&
            !(event.code === CONFIG.INCREMENT_KEYBOARD_SHORTCUT_CODE && event.target !== state.domElements.mainCounterInput)) {
            return;
        }
        if (event.code === CONFIG.INCREMENT_KEYBOARD_SHORTCUT_CODE) {
            event.preventDefault();
            processIncrementForCurrentTab(false, event);
            logDebug(`${CONFIG.INCREMENT_KEYBOARD_SHORTCUT_CODE} pressed, counter incremented.`);
            if(state.domElements.incrementButton){ /* Visual feedback ... */
                state.domElements.incrementButton.style.transform = 'scale(0.93)';
                setTimeout(() => { if(state.domElements.incrementButton) state.domElements.incrementButton.style.transform = 'scale(1)'; }, 120);
            }
        }
    }

    // --- ------------------------------------------------------------------------ ---
    // --- --------------------------- CORE LOGIC (Updated) --------------------- ---
    // --- ------------------------------------------------------------------------ ---

    function determineAndSetShiftStartTime(forceAuto = false) {
        // ... (Logic mostly same as Part 3 of previous, ensure it updates state.shiftType if auto)
         const now = new Date();
        let shiftStartHour, shiftStartMinute;
        let calculatedStartTime = new Date(now);
        let determinedShiftCategory = ''; // 'day' or 'night'

        if (forceAuto || state.shiftType === 'auto') {
            const dayStartMins = timeStringToMinutes(CONFIG.DEFAULT_DAY_SHIFT_START_TIME);
            const nightStartMins = timeStringToMinutes(CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME);
            const currentMins = now.getHours() * 60 + now.getMinutes();

            if (currentMins >= dayStartMins && currentMins < nightStartMins) {
                determinedShiftCategory = 'day';
                [shiftStartHour, shiftStartMinute] = CONFIG.DEFAULT_DAY_SHIFT_START_TIME.split(':').map(Number);
            } else {
                determinedShiftCategory = 'night';
                [shiftStartHour, shiftStartMinute] = CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME.split(':').map(Number);
                if (currentMins < dayStartMins) calculatedStartTime.setDate(now.getDate() - 1);
            }
            calculatedStartTime.setHours(shiftStartHour, shiftStartMinute, 0, 0);
            state.shiftStartTime = calculatedStartTime;
            if (state.shiftType === 'auto') state.shiftType = determinedShiftCategory; // Update state if it was auto
            logDebug(`Auto-determined shift start: ${state.shiftStartTime.toLocaleString()} (as ${state.shiftType})`);

        } else if (state.shiftType === 'day' || state.shiftType === 'night') {
            const timeValue = state.domElements.settingsShiftStartTimeInput?.value;
            let baseTime = state.shiftType === 'day' ? CONFIG.DEFAULT_DAY_SHIFT_START_TIME : CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME;
            if(timeValue) baseTime = timeValue;

            [shiftStartHour, shiftStartMinute] = baseTime.split(':').map(Number);
            calculatedStartTime.setHours(shiftStartHour, shiftStartMinute, 0, 0);
             if (state.shiftType === 'night' && (now.getHours() < shiftStartHour || (now.getHours() === shiftStartHour && now.getMinutes() < shiftStartMinute) )) {
                 calculatedStartTime.setDate(now.getDate() - 1);
            }
            state.shiftStartTime = calculatedStartTime;
            logDebug(`Manually set shift type '${state.shiftType}'. Start: ${state.shiftStartTime.toLocaleString()}`);
        }
    }

    function updateRealTimeClockDisplay() { /* ... same ... */
        if(state.domElements.realTimeClock && state.showClock){state.domElements.realTimeClock.textContent = formatDateToHHMM(new Date(),true);}
    }
    function updateLastActionTimerDisplay() { /* ... same ... */
        if (!state.domElements.lastActionTimerDisplay || !state.showLastActionTimer) { if(state.domElements.lastActionTimerDisplay) state.domElements.lastActionTimerDisplay.style.display = 'none'; return; }
        state.domElements.lastActionTimerDisplay.style.display = 'block';
        const elapsedMs = Date.now() - state.lastActionTimestampForThisTab;
        state.domElements.lastActionTimerDisplay.textContent = `Last: ${formatMsToDuration(elapsedMs, true).replace(/^00h\s*/, '')}`;
        const isWarn = elapsedMs > CONFIG.LAST_ACTION_TIMER_WARN_SECONDS * 1000;
        state.domElements.lastActionTimerDisplay.style.color = isWarn ? CONFIG.LAST_ACTION_TIMER_WARN_COLOR : CONFIG.UI_TEXT_COLOR;
        state.domElements.lastActionTimerDisplay.style.fontWeight = isWarn ? 'bold' : 'normal';
    }

    function updateStatistics() { /* ... same logic for calculation, ensure correct elements get updated ... */
        if (!state.domElements.statsTextSummary || !state.showStats) { if(state.domElements.statsTextSummary) state.domElements.statsTextSummary.innerHTML = ''; return; }
        state.domElements.statsTextSummary.style.display = 'block';
        if (!state.shiftStartTime) { determineAndSetShiftStartTime(true); if (!state.shiftStartTime) { state.domElements.statsTextSummary.innerHTML = '<p style="color:red;">Error: Shift start not set!</p>'; return; }}
        const now = new Date(); let totalElapsedMsOverall = now.getTime() - state.shiftStartTime.getTime();
        if (totalElapsedMsOverall < 0) { state.domElements.statsTextSummary.innerHTML = `<p>Shift: <strong>${formatDateToHHMM(state.shiftStartTime)}</strong> (${state.shiftType})</p><p>Waiting...</p>`; return; }
        let lunchDurationMs = 0; const lunch = state.selectedLunchOption;
        if (lunch && (lunch.start !== "00:00" || lunch.end !== "00:00")) { /* ... lunch calc logic ... */
            const shiftBaseDate = new Date(state.shiftStartTime); shiftBaseDate.setHours(0,0,0,0);
            let lunchStartAbs = new Date(shiftBaseDate); const [lsh, lsm] = lunch.start.split(':').map(Number); lunchStartAbs.setHours(lsh, lsm, 0, 0);
            let lunchEndAbs = new Date(shiftBaseDate); const [leh, lem] = lunch.end.split(':').map(Number); lunchEndAbs.setHours(leh, lem, 0, 0);
            if (state.shiftType === 'night' && state.shiftStartTime.getHours() >= _getNightStartHour() && lsh < _getDayStartHour()) { lunchStartAbs.setDate(lunchStartAbs.getDate() + 1); lunchEndAbs.setDate(lunchEndAbs.getDate() + 1); }
            if (lunchEndAbs < lunchStartAbs) lunchEndAbs.setDate(lunchEndAbs.getDate() + 1);
            const effLS = Math.max(state.shiftStartTime.getTime(), lunchStartAbs.getTime()); const effLE = Math.min(now.getTime(), lunchEndAbs.getTime());
            if (effLE > effLS) lunchDurationMs = effLE - effLS;
        }
        const effectiveWorkMsThisTab = Math.max(0, totalElapsedMsOverall - lunchDurationMs);
        const hoursWorkedThisTab = effectiveWorkMsThisTab / (3600000);
        const clicksPerHourThisTab = (hoursWorkedThisTab > 0.001) ? (state.clicksForThisTab / hoursWorkedThisTab) : 0;
        const globalClicksPerHour = (hoursWorkedThisTab > 0.001 && state.globalTotalClicks > 0) ? (state.globalTotalClicks / hoursWorkedThisTab) : 0; // Simplified global
        let statsHTML = `
            <p>Shift: <strong>${formatDateToHHMM(state.shiftStartTime)}</strong> (${state.shiftType})   Lunch: ${lunch ? lunch.text : 'N/A'}</p>
            <div style="display:flex; justify-content:space-around; margin-top:5px;">
                <div style="text-align:center;">
                    <div>This Tab (${state.currentTabMode.name}):</div>
                    <div>Completed: <strong>${state.clicksForThisTab}</strong></div>
                    <div>~<strong style="color:${CONFIG.MAIN_ACCENT_COLOR};font-size:1.1em;">${clicksPerHourThisTab.toFixed(1)}</strong>/hr</div>
                    <div>(in ${formatMsToDuration(effectiveWorkMsThisTab)})</div>
                </div>
                <div style="text-align:center; border-left: 1px solid ${CONFIG.UI_TEXT_COLOR}33; padding-left:10px; margin-left:10px;">
                    <div>Global (Active Tabs):</div>
                    <div>Total: <strong>${state.globalTotalClicks}</strong></div>
                    <div>~<strong style="color:${CONFIG.MAIN_ACCENT_COLOR};font-size:1.1em;">${globalClicksPerHour.toFixed(1)}</strong>/hr</div>
                </div>
            </div>`;
         // Other tabs details
        const otherTabsArray = Object.values(state.otherTabsData);
        if (otherTabsArray.length > 1 || (otherTabsArray.length === 1 && otherTabsArray[0].tabId !== state.currentTabId)){
            statsHTML += `<div style="font-size:0.8em; margin-top:8px; border-top:1px solid ${CONFIG.UI_TEXT_COLOR}22; padding-top:5px; max-height: 50px; overflow-y:auto;">Details: `;
            statsHTML += otherTabsArray.map(td =>
                `${td.modeName || td.tabId}: ${td.clicks} ${td.contributesToTotal ? '(✓)' : '(x)'}`
            ).join('; ');
            statsHTML += `</div>`;
        }
        state.domElements.statsTextSummary.innerHTML = statsHTML;
    }

    function initializeMutationObserver() { /* ... same core logic as before for 'wysłano', ensure updateTriggerDebugDisplay is called ... */
        if (state.mutationObserver) state.mutationObserver.disconnect();
        const observeTargetNode = document.querySelector(CONFIG.TRIGGER_OBSERVE_AREA_SELECTOR) || document.body;
        let debounceTimer = null;
        const processMutations = () => {
            if (!state.autoClickEnabled) return;
            const pageText = observeTargetNode.innerText || observeTargetNode.textContent || "";
            const triggerRegex = new RegExp(`\\b${CONFIG.AUTO_CLICK_TRIGGER_WORD}\\b`, 'g');
            const triggerIsCurrentlyFound = triggerRegex.test(pageText);
            let foundElementsPaths = [];
             if (CONFIG.DEBUG_MODE && state.showTriggerDebug) {
                if (triggerIsCurrentlyFound) foundElementsPaths = findElementsContainingText(observeTargetNode, CONFIG.AUTO_CLICK_TRIGGER_WORD);
                updateTriggerDebugDisplay(triggerIsCurrentlyFound, foundElementsPaths);
            }
            if (triggerIsCurrentlyFound && !state.isTriggerWordCurrentlyVisible) {
                logDebug(`Trigger "${CONFIG.AUTO_CLICK_TRIGGER_WORD}" DETECTED.`); state.isTriggerWordCurrentlyVisible = true;
            } else if (!triggerIsCurrentlyFound && state.isTriggerWordCurrentlyVisible) {
                logInfo(`Trigger "${CONFIG.AUTO_CLICK_TRIGGER_WORD}" DISAPPEARED. Auto-incrementing.`);
                processIncrementForCurrentTab(false); state.isTriggerWordCurrentlyVisible = false;
            } else { /* logDebug if needed for other states */ }
        };
        const observerCallback = () => { clearTimeout(debounceTimer); debounceTimer = setTimeout(processMutations, 150); }; // Slightly longer debounce
        state.mutationObserver = new MutationObserver(observerCallback);
        state.mutationObserver.observe(observeTargetNode, { childList: true, subtree: true, characterData: true });
        logInfo(`MutationObserver initialized for "${CONFIG.AUTO_CLICK_TRIGGER_WORD}".`);
        setTimeout(processMutations, 250);
    }
    function findElementsContainingText(root, text) { /* ... same ... */
        const paths = []; const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);let node; const unique = new Set();
        while((node=walker.nextNode())){if(node.nodeValue&&node.nodeValue.includes(text)){let p=[],el=node.parentElement;while(el&&el!==root&&p.length<5){let d=el.tagName.toLowerCase();if(el.id)d+=`#${el.id}`;if(el.className&&typeof el.className==='string')d+=`.${el.className.trim().split(/\s+/).join('.')}`;p.unshift(d);el=el.parentElement;}const ps=p.join('>');if(ps&&!unique.has(ps)&&paths.length<CONFIG.MAX_TRIGGER_DEBUG_LINES){unique.add(ps);paths.push(ps);}}} return paths;
    }
    function updateTriggerDebugDisplay(isFound, paths = []) { /* ... same ... */
        if (!state.domElements.triggerDebugDisplay || !state.showTriggerDebug) { if(state.domElements.triggerDebugDisplay) state.domElements.triggerDebugDisplay.style.display = 'none'; return; }
        state.domElements.triggerDebugDisplay.style.display = 'block';
        let html = `<strong>TrigDebug ("${CONFIG.AUTO_CLICK_TRIGGER_WORD}"):</strong> ${isFound?`<span style="color:lightgreen;">FOUND</span>`:`<span style="color:orange;">Not found</span>`} (VisFlag:${state.isTriggerWordCurrentlyVisible})<br>`;
        if(isFound&&paths.length>0){html+="Locs: "+paths.map(p=>`<code>${p.replace(/</g,'<').replace(/>/g,'>')}</code>`).join(', ');}
        state.domElements.triggerDebugDisplay.innerHTML = html;
    }


    // --- New function to apply custom theme and page overlay ---
    function applyThemeToPage() {
        const mode = state.customTabThemes[state.currentTabFullUrl] || state.currentTabMode; // Prefer custom theme

        if (state.domElements.pageColorOverlay) {
            state.domElements.pageColorOverlay.style.backgroundColor = mode.color;
            state.domElements.pageColorOverlay.style.display = state.showPageOverlay ? 'block' : 'none';
        }
        if (state.domElements.pageIndicatorText) {
            state.domElements.pageIndicatorText.textContent = mode.name.substring(0, 10); // Limit length
            state.domElements.pageIndicatorText.style.color = mode.textColor;
            state.domElements.pageIndicatorText.style.display = state.showPageOverlay ? 'block' : 'none';
        }
        if (state.domElements.uiTabIndicatorText) { // Also update indicator within UI panel
             state.domElements.uiTabIndicatorText.textContent = mode.name;
             state.domElements.uiTabIndicatorText.style.color = mode.textColor || CONFIG.UI_TEXT_COLOR;
        }
    }

    // --- New function to apply debug border styles ---
    function applyDebugPointerEventsStyle() {
        const elements = document.querySelectorAll(`#${CONFIG.UI_CONTAINER_ID} [style*="pointer-events: auto"], #${CONFIG.UI_CONTAINER_ID} button, #${CONFIG.UI_CONTAINER_ID} input, #${CONFIG.UI_CONTAINER_ID} select, #${CONFIG.UI_CONTAINER_ID} textarea`);
        const outlineStyle = state.debugPointerEvents ? '1px dashed red' : 'none';
        elements.forEach(el => {
            // Check if the element ALREADY has pointer-events: auto, or if it's an interactive tag by default
            // This is a simplification; true check would involve computed styles.
            const currentPointerEvents = el.style.pointerEvents;
            if (currentPointerEvents === 'auto' || (!currentPointerEvents && ['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'].includes(el.tagName))) {
                 // Only apply to elements that are indeed interactive or explicitly set to be.
                 // Avoids outlining the main "none" container or static text within an "auto" sub-container.
                el.style.outline = outlineStyle;
                el.style.outlineOffset = '1px';
            } else if (el.style.pointerEvents === 'none' && state.debugPointerEvents) {
                 el.style.outline = '1px dotted lightblue'; // Indicate 'none' pointer events
                 el.style.outlineOffset = '1px';
            } else {
                el.style.outline = 'none'; // Clear if not debugging or not matching criteria
            }
        });
        if (state.domElements.uiContainer && state.domElements.uiContainer.style.pointerEvents === 'none' && state.debugPointerEvents){
             state.domElements.uiContainer.style.outline = '1px solid blue'; // Main container if 'none'
             state.domElements.uiContainer.style.outlineOffset = '-1px';
        } else if (state.domElements.uiContainer) {
             state.domElements.uiContainer.style.outline = 'none';
        }
    }



    // --- ------------------------------------------------------------------------ ---
    // --- ----------------------- SCRIPT INITIALIZATION ------------------------ ---
    // --- ------------------------------------------------------------------------ ---
    function initialize() {
        if (document.getElementById(CONFIG.UI_CONTAINER_ID)) { /* ... error & optional destroy ... */
            logError('Prod Helper UI v3.1 already initialized. Aborting or attempting restart.');
            if (typeof window.destroyProductionHelperV3_1 === 'function') {
                window.destroyProductionHelperV3_1();
                setTimeout(initializeAfterDestroy, 100); // Attempt re-init after a short delay
            }
            return;
        }
        function initializeAfterDestroy() { // Wrapper to ensure destroy completes
            window.destroyProductionHelperV3_1 = destroy;
            actualInit();
        }
        function actualInit(){
            logInfo('Initializing Production Helper v3.1 (Intl)...');
            loadDataFromStorage(); // Loads settings, determines tab ID & mode, loads custom themes
            buildMainUI();         // Builds UI (includes setting initial leftPane flexBasis if loaded)

            applyThemeToPage();    // Apply initial page overlay/text
            applyVisibilitySettings(); // Apply loaded visibility for UI elements
            applyDebugPointerEventsStyle(); // Apply debug borders if enabled

            updateRealTimeClockDisplay();
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
            window.productionHelperV3_1_Initialized = true;
            logInfo('Production Helper v3.1 (Intl) initialized successfully.');
        }

        if (window.productionHelperV3_1_Initialized && typeof window.destroyProductionHelperV3_1 === 'function') {
             logInfo("Found existing PHv3.1 instance. Attempting to destroy it first.");
             window.destroyProductionHelperV3_1();
             setTimeout(actualInit, 250); // Delay re-init
        } else {
            window.destroyProductionHelperV3_1 = destroy; // Make new destroy globally accessible
            actualInit();
        }
    }

    function destroy() { /* ... same, ensure all new elements/listeners are cleaned ... */
        logInfo('Destroying Production Helper v3.1 (Intl)...');
        writeCurrentTabDataToLocalStorage(); saveDataToStorage();
        if (state.mutationObserver) state.mutationObserver.disconnect();
        Object.values(state.intervals).forEach(clearInterval);
        if (state.domElements.uiContainer) state.domElements.uiContainer.remove();
        if (state.domElements.emergencyShowButton) state.domElements.emergencyShowButton.remove();
        if (state.domElements.pageColorOverlay) state.domElements.pageColorOverlay.remove();
        if (state.domElements.pageIndicatorText) state.domElements.pageIndicatorText.remove();
        if(state.pageKeydownListener) document.removeEventListener('keydown', state.pageKeydownListener);
        window.removeEventListener('beforeunload', saveDataToStorage);
        delete window.productionHelperV3_1_Initialized;
        logInfo('Production Helper v3.1 (Intl) destroyed.');
    }

    // --- Execution ---
    // Simplified startup logic - assumes if this code runs, we want it to run.
    // If an old version is TRULY running and has a global destroy, call it.
    // The check inside initialize() handles re-running *this specific version*.
    if (typeof window.destroyProductionHelperV3_1 === 'function' && window.productionHelperV3_1_Initialized) {
        // This would be for a scenario where the entire script is injected again while an old instance is running
        window.destroyProductionHelperV3_1();
        setTimeout(() => {
            if (document.readyState === 'complete' || document.readyState === 'interactive') {
                initialize();
            } else {
                document.addEventListener('DOMContentLoaded', initialize, { once: true });
            }
        }, 300); // Give a bit more time for destroy to clean up if replacing self
    } else {
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            initialize();
        } else {
            document.addEventListener('DOMContentLoaded', initialize, { once: true });
        }
    }

})();
