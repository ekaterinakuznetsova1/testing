// == Production Assistant v2.1 (International) ==
// Purpose: Advanced UI for statistics, tracking, and process automation.
// Deployment: Copy this entire code and paste it into the browser's developer console (F12)
//             on the target page.
// Author: Your AI Assistant & You
// --------------------------------------

(function() {
    'use strict';

    // --- ------------------------------------------------------------------------ ---
    // --- --------- SCRIPT CONFIGURATION (All settings are here) --------------- ---
    // --- ------------------------------------------------------------------------ ---
    const CONFIG = {
        // --- General UI & Styling ---
        UI_CONTAINER_ID: 'productionHelperUI_v2_1_intl',
        UI_BOTTOM_OFFSET: '10px',
        UI_RIGHT_OFFSET: '10px',
        UI_WIDTH_PERCENT_VIEWPORT: 40,
        UI_HEIGHT_PERCENT_VIEWPORT: 30, // Adjusted for new layout, can be less if notes are small
        UI_MIN_HEIGHT_PX: 250,          // Min height to prevent collapse
        UI_BACKGROUND_COLOR: 'rgba(0, 0, 0, 0.0)', // Fully transparent by default
        UI_TEXT_COLOR: 'rgba(128, 128, 128, 0.7)', // Slightly more visible text
        UI_BORDER_COLOR: 'rgba(0, 0, 0, 0.0)',     // No border by default
        FONT_FAMILY: '"Segoe UI", Roboto, Arial, sans-serif',
        CLICKER_BUTTON_COLOR: 'rgba(0, 0, 0, 0.2)',
        DECREMENT_BUTTON_COLOR: 'rgba(10, 0, 0, 0.13)',
        MAIN_ACCENT_COLOR: 'rgba(80, 80, 80, 0.3)',      // More neutral accent

        // --- Hide/Show Button ---
        EMERGENCY_HIDE_BUTTON_TEXT: 'CLOSE',
        EMERGENCY_SHOW_BUTTON_TEXT: '🛠️',
        EMERGENCY_SHOW_BUTTON_SIZE: '30px',
        EMERGENCY_SHOW_BUTTON_OPACITY: 0.3,

        // --- Clicker & Counter ---
        MAIN_COUNTER_INPUT_ID: 'mainProdCounterInput_v2_1',
        CLICKER_INCREMENT_BUTTON_ID: 'incrementProdBtn_v2_1',
        CLICKER_DECREMENT_BUTTON_ID: 'decrementProdBtn_v2_1',
        INCREMENT_KEYBOARD_SHORTCUT: 'PageDown',

        // --- Real-time Clock ---
        CLOCK_DISPLAY_ID: 'prodRealTimeClock_v2_1',

        // --- Shift Settings ---
        DEFAULT_DAY_SHIFT_START_TIME: '06:26',
        DEFAULT_NIGHT_SHIFT_START_TIME: '18:26',
        SETTINGS_SHIFT_TYPE_SELECT_ID: 'shiftTypeSelect_v2_1',
        SETTINGS_SHIFT_START_TIME_INPUT_ID: 'shiftStartTimeInput_v2_1',

        // --- Lunch Settings ---
        SETTINGS_LUNCH_TIME_SELECT_ID: 'lunchTimeSelect_v2_1',
        DEFAULT_LUNCH_OPTIONS: [
            { text: "Day Lunch 1 (11:20-11:50)", start: "11:20", end: "11:50", type: "day" },
            { text: "Day Lunch 2 (11:50-12:20)", start: "11:50", end: "12:20", type: "day" },
            { text: "Day Lunch 3 (12:20-12:50)", start: "12:20", end: "12:50", type: "day" },
            { text: "Day Lunch 4 (12:50-13:20)", start: "12:50", end: "13:20", type: "day" },
            { text: "Night Lunch 1 (23:20-23:50)", start: "23:20", end: "23:50", type: "night" },
            { text: "Night Lunch 2 (23:50-00:20)", start: "23:50", end: "00:20", type: "night" },
            { text: "Night Lunch 3 (00:20-00:50)", start: "00:20", end: "00:50", type: "night" },
            { text: "Night Lunch 4 (00:50-01:20)", start: "00:50", end: "01:20", type: "night" },
            { text: "No Lunch", start: "00:00", end: "00:00", type: "any" } // Option for no lunch
        ],
        // DEFAULT_LUNCH_INDEX will be determined dynamically based on shift type

        // --- Statistics Display ---
        STATS_TEXT_SUMMARY_ID: 'prodStatsSummary_v2_1',
        STATS_UPDATE_INTERVAL_MS: 3000,

        // --- Auto-Clicker Trigger ---
        AUTO_CLICK_TRIGGER_WORD: 'admin333', // Case-sensitive trigger word
        TRIGGER_OBSERVE_AREA_SELECTOR: 'body',
        AUTO_CLICK_ENABLED_CHECKBOX_ID: 'autoClickEnabled_v2_1',

        // --- Notes Field with History (Temporarily disabled in UI as per image, logic remains) ---
        NOTES_INPUT_ID: 'prodNotesInput_v2_1',
        NOTES_HISTORY_DISPLAY_ID: 'prodNotesHistory_v2_1',
        MAX_NOTES_HISTORY_ITEMS: 15, // Reduced from 115 for practicality

        // --- Storage Settings ---
        STORAGE_KEY_PREFIX: 'prodHelper_intl_v2.1_',
        USE_SESSION_STORAGE: true,

        // --- UI Lock & Settings Panel ---
        LOCK_UI_BUTTON_TEXT_UNLOCKED: 'UI block',
        LOCK_UI_BUTTON_TEXT_LOCKED: 'UI unblock',
        SETTINGS_PANEL_ID: 'prodHelperSettingsPanel_v2_1',
        TOGGLE_SETTINGS_BUTTON_TEXT_CLOSED: 'settings',
        TOGGLE_SETTINGS_BUTTON_TEXT_OPENED: 'settings',

        // --- UI Element Visibility Toggles in Settings ---
        SETTINGS_SHOW_CLOCK_CHECKBOX_ID: 'showClockToggle_v2_1',
        SETTINGS_SHOW_STATS_CHECKBOX_ID: 'showStatsToggle_v2_1',
        // SETTINGS_SHOW_NOTES_CHECKBOX_ID: 'showNotesToggle_v2_1', // If notes section is re-enabled

        DEBUG_MODE: false, // Set to true for verbose console logs
    };

    // --- ------------------------------------------------------------------------ ---
    // --- --------- SCRIPT STATE (Do not modify directly from outside) --------- ---
    // --- ------------------------------------------------------------------------ ---
    const state = {
        uiVisible: true,
        uiLocked: false,
        settingsPanelVisible: false,
        totalClicks: 0,
        shiftType: 'auto', // 'auto', 'day', 'night'
        shiftStartTime: null,
        selectedLunchOption: null, // Will be set dynamically or from storage
        autoClickEnabled: true,
        sessionStartTimestamp: Date.now(),
        isTriggerWordCurrentlyVisible: false,
        clickedForThisTriggerInstance: false,
        notesHistory: [],
        // Graph data removed
        showClock: true, // Default visibility states for new toggles
        showStats: true,
        // showNotes: true, // If notes are re-enabled
        domElements: {},
        intervals: {},
        mutationObserver: null,
        pageKeydownListener: null,
    };

    // --- ------------------------------------------------------------------------ ---
    // --- --------------------- UTILITY FUNCTIONS ------------------------------ ---
    // --- ------------------------------------------------------------------------ ---
    function logDebug(...args) { if (CONFIG.DEBUG_MODE) console.debug('[ProdHelper INTL DEBUG]', ...args); }
    function logInfo(...args) { console.info('[ProdHelper INTL INFO]', ...args); }
    function logError(...args) { console.error('[ProdHelper INTL ERROR]', ...args); }

    function getStorage() { return CONFIG.USE_SESSION_STORAGE ? sessionStorage : localStorage; }

    function saveDataToStorage() {
        try {
            const storage = getStorage();
            const lunchIndex = state.selectedLunchOption
                ? CONFIG.DEFAULT_LUNCH_OPTIONS.findIndex(opt => opt.start === state.selectedLunchOption.start && opt.end === state.selectedLunchOption.end && opt.type === state.selectedLunchOption.type)
                : -1;

            const dataToSave = {
                totalClicks: state.totalClicks,
                shiftType: state.shiftType,
                shiftStartTimeISO: state.shiftStartTime ? state.shiftStartTime.toISOString() : null,
                selectedLunchOptionIndex: lunchIndex, // Can be -1 if not found (e.g. "No Lunch" if added)
                autoClickEnabled: state.autoClickEnabled,
                uiVisible: state.uiVisible,
                uiLocked: state.uiLocked,
                settingsPanelVisible: state.settingsPanelVisible,
                notesHistory: state.notesHistory.slice(-CONFIG.MAX_NOTES_HISTORY_ITEMS),
                showClock: state.showClock,
                showStats: state.showStats,
                // showNotes: state.showNotes,
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
                if (!isNaN(lunchIndex) && lunchIndex >= 0 && CONFIG.DEFAULT_LUNCH_OPTIONS[lunchIndex]) {
                    state.selectedLunchOption = CONFIG.DEFAULT_LUNCH_OPTIONS[lunchIndex];
                } else {
                    // Default lunch will be set after shift type is determined
                }

                state.autoClickEnabled = typeof savedData.autoClickEnabled === 'boolean' ? savedData.autoClickEnabled : true;
                state.uiVisible = typeof savedData.uiVisible === 'boolean' ? savedData.uiVisible : true;
                state.uiLocked = typeof savedData.uiLocked === 'boolean' ? savedData.uiLocked : false;
                state.settingsPanelVisible = typeof savedData.settingsPanelVisible === 'boolean' ? savedData.settingsPanelVisible : false;
                state.notesHistory = Array.isArray(savedData.notesHistory) ? savedData.notesHistory : [];

                state.showClock = typeof savedData.showClock === 'boolean' ? savedData.showClock : true;
                state.showStats = typeof savedData.showStats === 'boolean' ? savedData.showStats : true;
                // state.showNotes = typeof savedData.showNotes === 'boolean' ? savedData.showNotes : true;

                logInfo('Data loaded from storage.');
            } else {
                logInfo('No saved data. Initializing defaults.');
            }
            // Determine shift start and default lunch if not loaded or invalid
            if (!state.shiftStartTime || !(state.shiftStartTime instanceof Date) || isNaN(state.shiftStartTime.getTime())) {
                determineAndSetShiftStartTime(true); // true to force auto-determination
            }
            if (!state.selectedLunchOption) { // If lunch wasn't loaded or was invalid
                 setDynamicDefaultLunch();
            }

        } catch (e) {
            logError('Failed to load data:', e);
            determineAndSetShiftStartTime(true);
            setDynamicDefaultLunch();
        }
    }

    function setDynamicDefaultLunch() {
        let potentialShiftType = state.shiftType;
        if (potentialShiftType === 'auto') { // If auto, need to "guess" current shift
            const now = new Date();
            const dayStart = timeStringToMinutes(CONFIG.DEFAULT_DAY_SHIFT_START_TIME);
            const nightStart = timeStringToMinutes(CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME);
            const currentTime = now.getHours() * 60 + now.getMinutes();
            potentialShiftType = (currentTime >= dayStart && currentTime < nightStart) ? 'day' : 'night';
        }

        const defaultLunch = CONFIG.DEFAULT_LUNCH_OPTIONS.find(
            opt => opt.type === potentialShiftType || opt.type === "any" // Prioritize specific type
        );
        state.selectedLunchOption = defaultLunch || CONFIG.DEFAULT_LUNCH_OPTIONS.find(opt => opt.type === "any") || CONFIG.DEFAULT_LUNCH_OPTIONS[0]; // Fallback
        logDebug("Dynamic default lunch set to:", state.selectedLunchOption);
    }

    function timeStringToMinutes(timeStr) { // Renamed from timeHHMMToMinutes for clarity
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
        return `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m`; // English 'h' and 'm'
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
                border: CONFIG.UI_BORDER_COLOR === 'rgba(0, 0, 0, 0.0)' ? 'none' : `1px solid ${CONFIG.UI_BORDER_COLOR}`, // Conditional border
                borderRadius: '0px', boxSizing: 'border-box', color: CONFIG.UI_TEXT_COLOR,
                fontFamily: CONFIG.FONT_FAMILY, zIndex: '2147483645', display: 'flex',
                flexDirection: 'column', padding: '10px', overflow: 'hidden',
                boxShadow: CONFIG.UI_BACKGROUND_COLOR === 'rgba(0, 0, 0, 0.0)' ? 'none' : '0 3px 15px rgba(0,0,0,0.2)', // Conditional shadow
                transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
            }
        });
        state.domElements.uiContainer = uiContainer;

        // --- Top Controls Bar (Settings, Lock, Hide) ---
        const topControls = createDOMElement('div', {
            style: { display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '5px', flexShrink: 0 }
        });
        // Base style for control buttons, now more subtle matching the image
        const controlButtonBaseStyle = {
            cursor: 'pointer', background: 'none', border: 'none',
            color: CONFIG.UI_TEXT_COLOR, borderRadius: '3px', padding: '0px 0px', fontSize: '0.8em',
            marginLeft: '10px', opacity: '0.7', transition: 'opacity 0.2s'
        };
        controlButtonBaseStyle[':hover'] = { opacity: '1' };


        state.domElements.toggleSettingsButton = createDOMElement('button', {
            id: CONFIG.TOGGLE_SETTINGS_BUTTON_ID, textContent: CONFIG.TOGGLE_SETTINGS_BUTTON_TEXT_CLOSED,
            title: 'Open/Close Settings', style: {...controlButtonBaseStyle} // Applied here
        });
        state.domElements.toggleSettingsButton.addEventListener('click', toggleSettingsPanelVisibility);

        state.domElements.lockUIButton = createDOMElement('button', {
            id: 'lockProdUIBtn_intl', textContent: CONFIG.LOCK_UI_BUTTON_TEXT_UNLOCKED,
            title: 'Lock/Unlock UI (except clicker)', style: {...controlButtonBaseStyle} // Applied here
        });
        state.domElements.lockUIButton.addEventListener('click', toggleUILockState);

        state.domElements.emergencyHideButton = createDOMElement('button', {
            id: 'hideProdUIBtn_intl', textContent: CONFIG.EMERGENCY_HIDE_BUTTON_TEXT,
            title: 'Hide UI Panel', style: { ...controlButtonBaseStyle, color: 'rgba(200,80,80,0.7)' } // Applied here, with custom color
        });
        state.domElements.emergencyHideButton.addEventListener('click', () => setUIVisibility(false));

        topControls.append(state.domElements.toggleSettingsButton, state.domElements.lockUIButton, state.domElements.emergencyHideButton);
        uiContainer.appendChild(topControls);

        // --- Main Content Area ---
        // Reordered: Clocker (left), Stats (center), Clock (right bottom)
        const mainContentArea = createDOMElement('div', {
            style: { display: 'flex', flexGrow: 1, gap: '15px', overflow: 'hidden', position: 'relative', alignItems: 'center' /* Vertically align items */ }
        });

        // Clicker Area (Left)
        const clickerArea = createDOMElement('div', {
            style: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexBasis: '30%' }
        });
        state.domElements.mainCounterInput = createDOMElement('input', {
            type: 'number', id: CONFIG.MAIN_COUNTER_INPUT_ID, value: state.totalClicks,
            style: {
                fontSize: '4.5em', fontWeight: '600', color: CONFIG.UI_TEXT_COLOR, opacity: '0.8', marginBottom: '10px',
                textAlign: 'center', background: 'none', border: 'none', width: '150px', outline: 'none',
            }
        });
        state.domElements.mainCounterInput.addEventListener('change', handleCounterInputChange);
        state.domElements.mainCounterInput.addEventListener('input', (e) => { e.target.value = e.target.value.replace(/[^0-9]/g, ''); });

        const clickerButtonsContainer = createDOMElement('div', { style: { display: 'flex', alignItems: 'center' } });
        const clickerBtnStyle = {
            padding: '12px 18px', fontSize: '1.8em', cursor: 'pointer',
            color: CONFIG.UI_TEXT_COLOR, opacity: '0.7', border: 'none', borderRadius: '8px',
            boxShadow: 'none', transition: 'transform 0.1s, opacity 0.2s'
        };
        clickerBtnStyle[':hover'] = { opacity: '1' };

        state.domElements.decrementButton = createDOMElement('button', {
            id: CONFIG.CLICKER_DECREMENT_BUTTON_ID, textContent: '━', title: 'Decrement (-1)',
            style: { ...clickerBtnStyle, backgroundColor: CONFIG.DECREMENT_BUTTON_COLOR, marginRight: '30px',fontSize: '0.6em' }
        });
        state.domElements.decrementButton.addEventListener('click', handleDecrementClick);
        makeButtonInteractive(state.domElements.decrementButton);

        state.domElements.incrementButton = createDOMElement('button', {
            id: CONFIG.CLICKER_INCREMENT_BUTTON_ID, textContent: '✚', title: `Increment (+1) or ${CONFIG.INCREMENT_KEYBOARD_SHORTCUT}`,
            style: { ...clickerBtnStyle, backgroundColor: CONFIG.CLICKER_BUTTON_COLOR, fontSize: '2.2em', padding: '15px 22px'}
        });
        state.domElements.incrementButton.addEventListener('click', () => processIncrement(true, event)); // Pass event
        makeButtonInteractive(state.domElements.incrementButton);

        clickerButtonsContainer.append(state.domElements.decrementButton, state.domElements.incrementButton);
        clickerArea.append(state.domElements.mainCounterInput, clickerButtonsContainer);
        mainContentArea.appendChild(clickerArea);

        // Statistics Area (Center)
        state.domElements.statsTextSummary = createDOMElement('div', {
            id: CONFIG.STATS_TEXT_SUMMARY_ID,
            style: {
                flexGrow: 1, textAlign: 'left', paddingLeft: '20px', fontSize: '0.8em', lineHeight: '1.5',
                borderLeft: `1px solid ${CONFIG.UI_TEXT_COLOR}44`, // Subtle separator
            }
        });
        mainContentArea.appendChild(state.domElements.statsTextSummary);

        // --- Real-time Clock (Bottom Right of UI Container) ---
        state.domElements.realTimeClock = createDOMElement('div', {
            id: CONFIG.CLOCK_DISPLAY_ID, textContent: '00:00:00',
            style: {
                position: 'absolute', bottom: '10px', right: '15px',
                fontSize: '3.5em', fontFamily: 'monospace', color: CONFIG.UI_TEXT_COLOR, opacity: '0.5'
            }
        });
        uiContainer.appendChild(state.domElements.realTimeClock); // Add directly to uiContainer for absolute positioning

        uiContainer.appendChild(mainContentArea); // Add main content after clock for layering if needed

        // Settings Panel
        buildSettingsPanel();
        uiContainer.appendChild(state.domElements.settingsPanel); // Add settings panel to main UI container to slide over

        buildEmergencyShowButton();
        document.body.appendChild(uiContainer);

        setInitialUIStates();
        // updateNotesHistoryDisplay(); // Notes UI is currently commented out
        applyVisibilitySettings(); // Apply visibility from settings
        logInfo('Main UI v2.1 (Intl) built.');
    }

    function makeButtonInteractive(button) {
        button.addEventListener('mousedown', e => {
            e.preventDefault(); button.style.transform = 'scale(0.95)';
        });
        button.addEventListener('mouseup', () => button.style.transform = 'scale(1)');
        button.addEventListener('mouseleave', () => button.style.transform = 'scale(1)');
    }

    function buildEmergencyShowButton() {
         state.domElements.emergencyShowButton = createDOMElement('button', {
            id: 'emergencyShowBtn_intl', textContent: CONFIG.EMERGENCY_SHOW_BUTTON_TEXT, title: 'Show UI Panel',
            style: {
                position: 'fixed', bottom: CONFIG.UI_BOTTOM_OFFSET, right: CONFIG.UI_RIGHT_OFFSET,
                width: CONFIG.EMERGENCY_SHOW_BUTTON_SIZE, height: CONFIG.EMERGENCY_SHOW_BUTTON_SIZE,
                backgroundColor: 'rgba(50,60,80,0.1)', border: `1px solid ${CONFIG.UI_BORDER_COLOR === 'rgba(0, 0, 0, 0.0)' ? 'rgba(128,128,128,0.2)' : CONFIG.UI_BORDER_COLOR}`,
                color: CONFIG.UI_TEXT_COLOR, borderRadius: '50%', cursor: 'pointer', display: 'none',
                alignItems: 'center', justifyContent: 'center', zIndex: '2147483646',
                opacity: String(CONFIG.EMERGENCY_SHOW_BUTTON_OPACITY),
                transition: 'opacity 0.2s ease, transform 0.1s ease, background-color 0.2s', fontSize: '16px',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)'
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
            state.domElements.emergencyShowButton.style.backgroundColor = 'rgba(50,60,80,0.1)';
        };
        state.domElements.emergencyShowButton.onclick = () => setUIVisibility(true);
        document.body.appendChild(state.domElements.emergencyShowButton);
    }

    function buildSettingsPanel() {
        const panel = createDOMElement('div', {
            id: CONFIG.SETTINGS_PANEL_ID,
            style: {
                position: 'absolute', top: '0px', right: '0px', bottom: '0px', // Covers entire main UI
                width: '50%',                 // Full width of parent
                backgroundColor: `rgba(30, 35, 45, 0.2)`, // More opaque for settings
                // borderLeft: `2px solid ${CONFIG.MAIN_ACCENT_COLOR}`, // Accent border
                padding: '10px', zIndex: '1000', display: 'none', flexDirection: 'column',
                gap: '0px', overflowY: 'auto', boxShadow: '0px 0px 0px rgba(0,0,0,0.3)',
                transition: 'transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)'
            }
        });
        state.domElements.settingsPanel = panel;

        const heading = createDOMElement('h3', { textContent: 'Settings', style: { margin: '0 0 15px 0', textAlign: 'center', color: 'white', fontSize: '1.3em'} });
        panel.appendChild(heading);

        const commonSelectStyle = {width: '100%', padding: '10px', boxSizing: 'border-box', backgroundColor: 'rgba(0,0,0,0.3)', color: 'white', border: `1px solid ${CONFIG.MAIN_ACCENT_COLOR}cc`, borderRadius: '5px', fontSize: '0.9em'};
        const commonLabelStyle = { display: 'block', marginBottom: '6px', fontSize: '0.95em', color: 'rgba(255,255,255,0.8)'};
        const checkboxLabelStyle = { display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '0.95em', color: 'rgba(255,255,255,0.8)'};
        const checkboxStyle = { marginRight: '10px', transform: 'scale(1.3)', accentColor: CONFIG.MAIN_ACCENT_COLOR};

        // Shift Type
        const shiftTypeGroup = createDOMElement('div');
        shiftTypeGroup.appendChild(createDOMElement('label', { for: CONFIG.SETTINGS_SHIFT_TYPE_SELECT_ID, textContent: 'Shift Type:', style: commonLabelStyle }));
        state.domElements.settingsShiftTypeSelect = createDOMElement('select', { id: CONFIG.SETTINGS_SHIFT_TYPE_SELECT_ID, style: commonSelectStyle });
        state.domElements.settingsShiftTypeSelect.addEventListener('change', handleShiftSettingsChange);
        shiftTypeGroup.appendChild(state.domElements.settingsShiftTypeSelect);
        panel.appendChild(shiftTypeGroup);

        // Shift Start Time (Manual)
        const shiftStartTimeGroup = createDOMElement('div');
        shiftStartTimeGroup.appendChild(createDOMElement('label', { for: CONFIG.SETTINGS_SHIFT_START_TIME_INPUT_ID, textContent: 'Shift Start Time (if manual):', style: commonLabelStyle }));
        state.domElements.settingsShiftStartTimeInput = createDOMElement('input', { type: 'time', id: CONFIG.SETTINGS_SHIFT_START_TIME_INPUT_ID, style: commonSelectStyle });
        state.domElements.settingsShiftStartTimeInput.addEventListener('change', handleShiftSettingsChange);
        shiftStartTimeGroup.appendChild(state.domElements.settingsShiftStartTimeInput);
        panel.appendChild(shiftStartTimeGroup);

        // Lunch Break
        const lunchGroup = createDOMElement('div');
        lunchGroup.appendChild(createDOMElement('label', { for: CONFIG.SETTINGS_LUNCH_TIME_SELECT_ID, textContent: 'Lunch Break:', style: commonLabelStyle }));
        state.domElements.settingsLunchSelect = createDOMElement('select', { id: CONFIG.SETTINGS_LUNCH_TIME_SELECT_ID, style: commonSelectStyle });
        state.domElements.settingsLunchSelect.addEventListener('change', handleLunchSettingChange);
        lunchGroup.appendChild(state.domElements.settingsLunchSelect);
        panel.appendChild(lunchGroup);

        // Auto-click Checkbox
        const autoClickGroup = createDOMElement('div', {style: {marginTop: '15px'}});
        const autoClickLabel = createDOMElement('label', { style: checkboxLabelStyle });
        state.domElements.autoClickEnabledCheckbox = createDOMElement('input', { type: 'checkbox', id: CONFIG.AUTO_CLICK_ENABLED_CHECKBOX_ID, checked: state.autoClickEnabled, style: checkboxStyle });
        state.domElements.autoClickEnabledCheckbox.addEventListener('change', handleAutoClickSettingChange);
        autoClickLabel.append(state.domElements.autoClickEnabledCheckbox, `Enable Auto-Increment (trigger: "${CONFIG.AUTO_CLICK_TRIGGER_WORD}")`);
        autoClickGroup.appendChild(autoClickLabel);
        panel.appendChild(autoClickGroup);

        // --- Visibility Toggles ---
        const visibilityGroup = createDOMElement('div', {style: {marginTop: '15px', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '15px'}});
        visibilityGroup.appendChild(createDOMElement('h4', {textContent: 'UI Element Visibility:', style: {margin: '0 0 10px 0', color: 'white', fontSize: '1em'}}));

        const showClockLabel = createDOMElement('label', { style: checkboxLabelStyle });
        state.domElements.showClockCheckbox = createDOMElement('input', {type: 'checkbox', id: CONFIG.SETTINGS_SHOW_CLOCK_CHECKBOX_ID, checked: state.showClock, style: checkboxStyle});
        state.domElements.showClockCheckbox.addEventListener('change', (e) => { state.showClock = e.target.checked; applyVisibilitySettings(); saveDataToStorage(); });
        showClockLabel.append(state.domElements.showClockCheckbox, 'Show Real-time Clock');
        visibilityGroup.appendChild(showClockLabel);

        const showStatsLabel = createDOMElement('label', { style: {...checkboxLabelStyle, marginTop: '8px'} });
        state.domElements.showStatsCheckbox = createDOMElement('input', {type: 'checkbox', id: CONFIG.SETTINGS_SHOW_STATS_CHECKBOX_ID, checked: state.showStats, style: checkboxStyle});
        state.domElements.showStatsCheckbox.addEventListener('change', (e) => { state.showStats = e.target.checked; applyVisibilitySettings(); saveDataToStorage(); });
        showStatsLabel.append(state.domElements.showStatsCheckbox, 'Show Statistics Text');
        visibilityGroup.appendChild(showStatsLabel);
        panel.appendChild(visibilityGroup);
        // Add Notes toggle if re-enabled later

        const settingsPanelButtonStyle = {
            cursor: 'pointer', backgroundColor: /*`${CONFIG.MAIN_ACCENT_COLOR}dd`*/ 'rgba(128,128,128,0.6)' ,
            border: 'none', color: 'white', borderRadius: '5px', padding: '12px',
            fontSize: '1.05em', width: '100%', marginTop: 'auto',
            transition: 'background-color 0.2s'
        };
        settingsPanelButtonStyle[':hover'] = { backgroundColor: CONFIG.MAIN_ACCENT_COLOR };

        const closeButton = createDOMElement('button', { textContent: 'Apply & Close', style: settingsPanelButtonStyle });
        closeButton.addEventListener('click', () => setSettingsPanelVisibility(false));
        panel.appendChild(closeButton);
    }

    function setInitialUIStates() {
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
            lunchSelect.innerHTML = '';
            CONFIG.DEFAULT_LUNCH_OPTIONS.forEach((opt, index) => {
                lunchSelect.add(new Option(opt.text, String(index)));
            });
            const currentLunchIndex = state.selectedLunchOption
                ? CONFIG.DEFAULT_LUNCH_OPTIONS.findIndex(opt => opt.start === state.selectedLunchOption.start && opt.end === state.selectedLunchOption.end && opt.type === state.selectedLunchOption.type)
                : -1;
            lunchSelect.value = String(currentLunchIndex > -1 ? currentLunchIndex : 0); // Default to first option if not found
        }
        if(state.domElements.autoClickEnabledCheckbox) state.domElements.autoClickEnabledCheckbox.checked = state.autoClickEnabled;
        if(state.domElements.showClockCheckbox) state.domElements.showClockCheckbox.checked = state.showClock;
        if(state.domElements.showStatsCheckbox) state.domElements.showStatsCheckbox.checked = state.showStats;

        setUIVisibility(state.uiVisible);
        setUILockState(state.uiLocked);
        setSettingsPanelVisibility(state.settingsPanelVisible);
        updateCounterDisplay();
        updateManualShiftTimeInputVisibility();
    }

    function applyVisibilitySettings() {
        if (state.domElements.realTimeClock) {
            state.domElements.realTimeClock.style.display = state.showClock ? 'inline-block' : 'none';
        }
        if (state.domElements.statsTextSummary) {
            state.domElements.statsTextSummary.style.display = state.showStats ? 'block' : 'none'; // Or 'flex' if it's a flex item
        }
        // Add for notes if re-enabled
    }

    // --- ------------------------------------------------------------------------ ---
    // --- ----------------------- UI STATE MANAGEMENT -------------------------- ---
    // --- ------------------------------------------------------------------------ ---
    function setUIVisibility(visible) {
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
        if (!state.uiVisible && locked) return;
        state.uiLocked = locked;

        state.domElements.lockUIButton.textContent = state.uiLocked ? CONFIG.LOCK_UI_BUTTON_TEXT_LOCKED : CONFIG.LOCK_UI_BUTTON_TEXT_UNLOCKED;
        state.domElements.lockUIButton.title = state.uiLocked ? 'Unlock UI' : 'Lock UI (PageDown & Clicker active)';
        // No background change for lock button to match subtlety

        const elementsToToggle = [
            state.domElements.toggleSettingsButton, state.domElements.emergencyHideButton,
            state.domElements.decrementButton, state.domElements.mainCounterInput,
            // state.domElements.notesInput, // If notes are re-enabled
            ...(state.settingsPanelVisible ? state.domElements.settingsPanel.querySelectorAll('input, select, button:not(#'+state.domElements.lockUIButton.id+'):not([textContent="Apply & Close"])') : [])
        ];

        elementsToToggle.forEach(el => {
            if (el) {
                 el.disabled = state.uiLocked;
                 el.style.opacity = state.uiLocked ? '0.5' : '1'; // General opacity for disabled
                 el.style.cursor = state.uiLocked ? 'not-allowed' : (el.tagName === 'BUTTON' || el.tagName === 'SELECT' ? 'pointer' : 'default');
            }
        });
        saveDataToStorage();
    }

    function toggleSettingsPanelVisibility() { setSettingsPanelVisibility(!state.settingsPanelVisible); }

    function setSettingsPanelVisibility(visible) {
        state.settingsPanelVisible = visible;
        if (state.domElements.settingsPanel) {
            state.domElements.settingsPanel.style.display = visible ? 'flex' : 'none';
            // Slide from right to left, or from bottom to top
            state.domElements.settingsPanel.style.transform = visible ? 'translateX(0%)' : 'translateX(101%)';
        }
        state.domElements.toggleSettingsButton.textContent = visible ? CONFIG.TOGGLE_SETTINGS_BUTTON_TEXT_OPENED : CONFIG.TOGGLE_SETTINGS_BUTTON_TEXT_CLOSED;
        // No background change toggle button for settings to match subtlety

        if (visible && state.uiLocked) { setUILockState(true); }
        saveDataToStorage();
    }

    // --- ------------------------------------------------------------------------ ---
    // --- ----------------------- EVENT HANDLERS ------------------------------- ---
    // --- ------------------------------------------------------------------------ ---
    // FIX for 'event' not defined: Pass 'event' as an argument if it's an event handler,
    // or ensure it's available in the scope if it's a global event object (less common for this use).
    // For processIncrement called from a button click, the 'event' object is implicitly available
    // if the handler is defined like: element.onclick = function(event) { processIncrement(true, event); }
    // Or if using addEventListener: element.addEventListener('click', (event) => processIncrement(true, event));
    // I've updated the call in buildMainUI for incrementButton.

    function processIncrement(isManualAction = false, event = null) { // Added event parameter
        if (isManualAction && state.uiLocked && event && (event.currentTarget === state.domElements.incrementButton)) {
            // UI locked, but click is on the main increment button - allow
        } else if (state.uiLocked && isManualAction) {
            logDebug('UI is locked, manual increment ignored unless from main button.');
            return;
        }

        state.totalClicks++;
        // No graph data update needed anymore
        updateCounterDisplay();
        updateStatistics(); // Renamed from updateStatisticsAndGraph
        saveDataToStorage();
    }

    function handleDecrementClick() {
        if (state.uiLocked) return;
        if (state.totalClicks > 0) {
            state.totalClicks--;
            updateCounterDisplay();
            updateStatistics();
            saveDataToStorage();
        }
    }

    function handleCounterInputChange(event) {
        if (state.uiLocked) {
            event.target.value = state.totalClicks; return;
        }
        let newValue = parseInt(event.target.value, 10);
        if (isNaN(newValue) || newValue < 0) newValue = 0;
        state.totalClicks = newValue;
        updateCounterDisplay();
        updateStatistics();
        saveDataToStorage();
    }

    function updateCounterDisplay() {
        if (state.domElements.mainCounterInput) {
            state.domElements.mainCounterInput.value = state.totalClicks;
        }
    }

    function handleShiftSettingsChange() {
        state.shiftType = state.domElements.settingsShiftTypeSelect.value;
        determineAndSetShiftStartTime(false); // false = don't force auto if manual type selected
        setDynamicDefaultLunch(); // Update default lunch based on new shift type
        // Update lunch dropdown to reflect new default
        if (state.domElements.settingsLunchSelect && state.selectedLunchOption) {
            const newLunchIndex = CONFIG.DEFAULT_LUNCH_OPTIONS.findIndex(opt =>
                opt.start === state.selectedLunchOption.start &&
                opt.end === state.selectedLunchOption.end &&
                opt.type === state.selectedLunchOption.type
            );
            if (newLunchIndex > -1) {
                state.domElements.settingsLunchSelect.value = String(newLunchIndex);
            }
        }
        updateManualShiftTimeInputVisibility();
        updateStatistics();
        saveDataToStorage();
    }

    function updateManualShiftTimeInputVisibility() {
        const isManual = state.shiftType !== 'auto';
        const inputEl = state.domElements.settingsShiftStartTimeInput;
        const labelEl = inputEl?.labels?.[0] || inputEl?.previousElementSibling;

        if (inputEl) {
           inputEl.disabled = !isManual;
           inputEl.style.opacity = isManual ? '1' : '0.6';
           inputEl.style.display = isManual ? 'block' : 'none';
           if (state.shiftStartTime) {
                inputEl.value = formatDateToHHMM(state.shiftStartTime);
           }
        }
        if (labelEl && labelEl.tagName === 'LABEL') {
           labelEl.style.display = isManual ? 'block' : 'none';
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
        }
    }

    function handleNoteInputKeypress(event) { // Notes logic kept, UI part can be commented out
        if (event.key === 'Enter') {
            event.preventDefault();
            if (!state.domElements.notesInput) return; // Guard if notes UI is disabled
            const noteText = state.domElements.notesInput.value.trim();
            if (noteText) {
                state.notesHistory.unshift({ text: noteText, timestamp: new Date() });
                if (state.notesHistory.length > CONFIG.MAX_NOTES_HISTORY_ITEMS) state.notesHistory.pop();
                state.domElements.notesInput.value = '';
                updateNotesHistoryDisplay();
                saveDataToStorage();
            }
        }
    }

    function updateNotesHistoryDisplay() { // Notes logic kept
        /* // UI part is commented out in buildMainUI
        const display = state.domElements.notesHistoryDisplay;
        if (!display) return;
        display.innerHTML = '';
        if (state.notesHistory.length === 0) {
            display.appendChild(createDOMElement('p', {textContent: 'Notes history is empty.', style: {opacity: '0.5', textAlign: 'center', margin: '10px 0'}}));
            return;
        }
        state.notesHistory.forEach(note => {
            const noteItem = createDOMElement('div', { style: {padding: '5px', borderBottom: '1px dashed rgba(255,255,255,0.1)', marginBottom: '5px', wordBreak: 'break-word'} });
            const timeSpan = createDOMElement('span', {textContent: `[${formatDateToHHMM(note.timestamp, true)}] `, style: {color: CONFIG.MAIN_ACCENT_COLOR, marginRight: '5px'}});
            noteItem.append(timeSpan, document.createTextNode(note.text));
            display.appendChild(noteItem);
        });
        */
    }

    function handlePageKeydown(event) {
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA' || event.target.isContentEditable) return;
        if (event.key === CONFIG.INCREMENT_KEYBOARD_SHORTCUT) {
            event.preventDefault();
            processIncrement(false, event); // Pass event
            logDebug(`${CONFIG.INCREMENT_KEYBOARD_SHORTCUT} pressed, counter incremented.`);
            if(state.domElements.incrementButton){ // Visual feedback
                state.domElements.incrementButton.style.transform = 'scale(0.95)';
                setTimeout(() => { if(state.domElements.incrementButton) state.domElements.incrementButton.style.transform = 'scale(1)'; }, 100);
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
                [shiftStartHour, shiftStartMinute] = CONFIG.DEFAULT_DAY_SHIFT_START_TIME.split(':').map(Number);
            } else {
                [shiftStartHour, shiftStartMinute] = CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME.split(':').map(Number);
                if (currentMins < dayStartMins) calculatedStartTime.setDate(now.getDate() - 1);
            }
            calculatedStartTime.setHours(shiftStartHour, shiftStartMinute, 0, 0);
            state.shiftStartTime = calculatedStartTime;
            logDebug(`Auto-determined shift start: ${state.shiftStartTime.toLocaleString()}`);

        } else if (state.shiftType === 'day' || state.shiftType === 'night') {
            const timeValue = state.domElements.settingsShiftStartTimeInput?.value;
            let baseTime = state.shiftType === 'day' ? CONFIG.DEFAULT_DAY_SHIFT_START_TIME : CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME;
            if(timeValue) baseTime = timeValue; // User input overrides default for type

            [shiftStartHour, shiftStartMinute] = baseTime.split(':').map(Number);
            calculatedStartTime.setHours(shiftStartHour, shiftStartMinute, 0, 0);
            if (state.shiftType === 'night' && now.getHours() < shiftStartHour) {
                 calculatedStartTime.setDate(now.getDate() - 1);
            }
            state.shiftStartTime = calculatedStartTime;
            logDebug(`Manual shift type set. Start: ${state.shiftStartTime.toLocaleString()}`);
        }
        // Removed graph data filtering as graph is removed
    }

    function updateRealTimeClockDisplay() {
        if (state.domElements.realTimeClock && state.showClock) { // Check visibility flag
            state.domElements.realTimeClock.textContent = formatDateToHHMM(new Date(), true);
        }
    }

    function updateStatistics() { // Renamed from updateStatisticsAndGraph
        if (!state.domElements.statsTextSummary || !state.showStats) { // Check visibility flag
            if(state.domElements.statsTextSummary) state.domElements.statsTextSummary.innerHTML = ''; // Clear if hidden
            return;
        }

        if (!state.shiftStartTime || !(state.shiftStartTime instanceof Date) || isNaN(state.shiftStartTime.getTime())) {
            determineAndSetShiftStartTime(true);
             if (!state.shiftStartTime) {
                state.domElements.statsTextSummary.innerHTML = '<p style="color:red;">Error: Could not determine shift start time!</p>';
                return;
             }
        }

        const now = new Date();
        let totalElapsedMs = now.getTime() - state.shiftStartTime.getTime();

        if (totalElapsedMs < 0) {
            state.domElements.statsTextSummary.innerHTML = `
                <p>Shift starts at: <strong>${formatDateToHHMM(state.shiftStartTime)}</strong></p>
                <p>Waiting...</p>`;
            return;
        }

        let lunchDurationMs = 0;
        const lunchTimes = state.selectedLunchOption;
        if (lunchTimes && (lunchTimes.start !== "00:00" || lunchTimes.end !== "00:00")) {
            const shiftBaseDate = new Date(state.shiftStartTime); // Use shift start date as base for lunch
            shiftBaseDate.setHours(0,0,0,0); // Normalize to midnight

            let lunchStartAbs = new Date(shiftBaseDate);
            const [lsh, lsm] = lunchTimes.start.split(':').map(Number);
            lunchStartAbs.setHours(lsh, lsm, 0, 0);

            let lunchEndAbs = new Date(shiftBaseDate);
            const [leh, lem] = lunchTimes.end.split(':').map(Number);
            lunchEndAbs.setHours(leh, lem, 0, 0);

            // Adjust lunch date if shift started previous day and lunch is on "current" day part of shift
            if (state.shiftStartTime.getDate() < now.getDate() && lunchStartAbs.getTime() < state.shiftStartTime.getTime()) {
                 lunchStartAbs.setDate(lunchStartAbs.getDate() + 1);
                 lunchEndAbs.setDate(lunchEndAbs.getDate() + 1);
            } else if (state.shiftStartTime.getDate() > now.getDate()){
                // This case implies shiftStartTime is in future, handled above.
                // Or coding error, but mostly means shift starts tomorrow, while lunch is set for "today"
                // This needs careful handling if shifts often cross midnight AND lunch is set for day AFTER shift starts
            }


            if (lunchEndAbs < lunchStartAbs) lunchEndAbs.setDate(lunchEndAbs.getDate() + 1); // Lunch crosses midnight

            const effectiveLunchStart = Math.max(state.shiftStartTime.getTime(), lunchStartAbs.getTime());
            const effectiveLunchEnd = Math.min(now.getTime(), lunchEndAbs.getTime());

            if (effectiveLunchEnd > effectiveLunchStart) {
                lunchDurationMs = effectiveLunchEnd - effectiveLunchStart;
            }
        }

        const effectiveWorkMs = Math.max(0, totalElapsedMs - lunchDurationMs);
        const hoursWorked = effectiveWorkMs / (1000 * 60 * 60);
        const clicksPerHour = (hoursWorked > 0.001) ? (state.totalClicks / hoursWorked) : 0;

        state.domElements.statsTextSummary.innerHTML = `
            <p>Shift: <strong>${formatDateToHHMM(state.shiftStartTime)}</strong> (${state.shiftType === 'auto' ? 'Auto' : (state.shiftType === 'day' ? 'Day' : 'Night')})</p>
            <p>Completed: <strong>${state.totalClicks}</strong> (in ${formatMsToDuration(effectiveWorkMs)})</p>
            <p style="font-size: 1.1em;">~ <strong style="color: ${CONFIG.MAIN_ACCENT_COLOR};">${clicksPerHour.toFixed(1)}</strong> in hour</p>
            <p>Lunch: ${lunchTimes ? lunchTimes.text : 'N/A'}</p>
        `;
        // Graph drawing removed
    }

    function initializeMutationObserver() {
        if (state.mutationObserver) state.mutationObserver.disconnect();
        const observeTargetNode = document.querySelector(CONFIG.TRIGGER_OBSERVE_AREA_SELECTOR) || document.body;

        const observerCallback = (mutationsList) => {
            if (!state.autoClickEnabled) return;
            let triggerCurrentlyOnPage = observeTargetNode.textContent?.includes(CONFIG.AUTO_CLICK_TRIGGER_WORD);

            if (triggerCurrentlyOnPage && !state.isTriggerWordCurrentlyVisible) {
                logDebug(`Trigger "${CONFIG.AUTO_CLICK_TRIGGER_WORD}" detected. Setting visible flag.`);
                state.isTriggerWordCurrentlyVisible = true;
                state.clickedForThisTriggerInstance = false;
            } else if (!triggerCurrentlyOnPage && state.isTriggerWordCurrentlyVisible) {
                logDebug(`Trigger "${CONFIG.AUTO_CLICK_TRIGGER_WORD}" disappeared.`);
                state.isTriggerWordCurrentlyVisible = false;
                state.clickedForThisTriggerInstance = false;
            }

            if (state.isTriggerWordCurrentlyVisible && !state.clickedForThisTriggerInstance) {
                logDebug(`Auto-incrementing for "${CONFIG.AUTO_CLICK_TRIGGER_WORD}"`);
                processIncrement(false);
                state.clickedForThisTriggerInstance = true;
            }
        };
        state.mutationObserver = new MutationObserver(observerCallback);
        state.mutationObserver.observe(observeTargetNode, { childList: true, subtree: true, characterData: true });
        logInfo(`MutationObserver for auto-click initialized. Observing:`, observeTargetNode);
        observerCallback([]); // Initial check
    }

    // --- ------------------------------------------------------------------------ ---
    // --- ----------------------- SCRIPT INITIALIZATION ------------------------ ---
    // --- ------------------------------------------------------------------------ ---
    function initialize() {
        if (document.getElementById(CONFIG.UI_CONTAINER_ID)) {
            logError('Prod Helper UI v2.1 (Intl) is already initialized. Aborting.');
            return;
        }
        logInfo('Initializing Production Helper v2.1 (Intl)...');

        loadDataFromStorage();
        buildMainUI();

        updateRealTimeClockDisplay();
        updateStatistics();
        // updateNotesHistoryDisplay(); // Notes UI commented out

        state.intervals.realTimeClock = setInterval(updateRealTimeClockDisplay, 1000);
        state.intervals.statistics = setInterval(updateStatistics, CONFIG.STATS_UPDATE_INTERVAL_MS);

        if (state.autoClickEnabled) initializeMutationObserver();

        state.pageKeydownListener = handlePageKeydown;
        document.addEventListener('keydown', state.pageKeydownListener);

        window.addEventListener('beforeunload', saveDataToStorage);
        window.productionHelperV2_1_Initialized = true;
        logInfo('Production Helper v2.1 (Intl) initialized successfully.');
    }
    function destroy() {
        logInfo('Destroying Production Helper v2.1 (Intl)...');
        saveDataToStorage();
        if (state.mutationObserver) state.mutationObserver.disconnect();
        Object.values(state.intervals).forEach(clearInterval);
        if (state.domElements.uiContainer) state.domElements.uiContainer.remove();
        if (state.domElements.emergencyShowButton) state.domElements.emergencyShowButton.remove();
        if(state.pageKeydownListener) document.removeEventListener('keydown', state.pageKeydownListener);
        window.removeEventListener('beforeunload', saveDataToStorage);
        delete window.productionHelperV2_1_Initialized;
        logInfo('Production Helper v2.1 (Intl) destroyed.');
    }

    // --- Execution ---
    if (window.productionHelperV2_1_Initialized) {
        logError("Prod Helper v2.1 (Intl): Attempting to initialize again. Aborting.");
        // Optional: call destroy() on the old instance if a reference is available.
        // if (typeof window.destroyProductionHelperV2_1 === 'function') window.destroyProductionHelperV2_1();
        return;
    }
    window.destroyProductionHelperV2_1 = destroy; // Make destroy function globally accessible

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initialize();
    } else {
        document.addEventListener('DOMContentLoaded', initialize, { once: true });
    }

})();
