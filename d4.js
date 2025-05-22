/*
    Production Assistant v4.0
    Author: AI Assistant (based on provided specifications)
    Date: [Current Date]
*/
(function() {
    'use strict';

    // --- ------------------------------------------------------------------------ ---
    // --- --------- SCRIPT CONFIGURATION (All settings are here) --------------- ---
    // --- ------------------------------------------------------------------------ ---
    const CONFIG = {
        // --- General & Version ---
        SCRIPT_VERSION: '4.0',
        SCRIPT_ID_PREFIX: 'prodHelper_v4_0_',
        DEBUG_MODE: false, // Set to true for development console logs

        // --- UI & Styling ---
        UI_CONTAINER_ID: 'mainContainer',
        UI_BOTTOM_OFFSET: '10px',
        UI_RIGHT_OFFSET: '10px',
        UI_INITIAL_WIDTH_VW: 30,
        UI_INITIAL_HEIGHT_VH: 30,
        UI_MIN_WIDTH_PX: 380, // Accommodate settings panel width + padding
        UI_MIN_HEIGHT_PX: 280,
        UI_BACKGROUND_COLOR: 'rgba(250, 250, 250, 0.0)', // Minimalist transparent
        UI_TEXT_COLOR: 'rgba(30, 30, 30, 0.75)', // Dark grey for text
        UI_BORDER_COLOR: 'rgba(200, 200, 200, 0.0)', // Transparent border
        FONT_FAMILY: '"Segoe UI", Roboto, Arial, sans-serif',
        MAIN_ACCENT_COLOR: 'rgba(255, 130, 0, 0.85)', // Brighter orange
        SETTINGS_PANEL_BACKGROUND: 'rgba(45, 50, 60, 0.97)',
        SETTINGS_PANEL_TEXT_COLOR: 'rgba(240, 240, 245, 0.95)',
        SETTINGS_PANEL_BORDER_COLOR: 'rgba(255, 130, 0, 0.6)',
        BUTTON_DEFAULT_BG_COLOR: 'rgba(200, 200, 200, 0.15)',
        BUTTON_DEFAULT_TEXT_COLOR: 'rgba(20, 20, 20, 0.75)',
        NO_SHADOW_STYLE: '0 0 0px rgba(0,0,0,0.0)',

        // --- Clicker & Counter ---
        MAIN_COUNTER_FONT_SIZE_INITIAL_EM: 5.5,
        MAIN_COUNTER_FONT_SIZE_MIN_EM: 2.0,
        MAIN_COUNTER_MAX_CHARS_BEFORE_RESIZE: 4,
        SHOW_INCREMENT_BUTTON: true,
        SHOW_DECREMENT_BUTTON: true,
        CLICKER_INCREMENT_BUTTON_COLOR: 'rgba(150, 150, 150, 0.18)',
        CLICKER_INCREMENT_BUTTON_TEXT_COLOR: 'rgba(0,0,0,0.65)',
        CLICKER_DECREMENT_BUTTON_COLOR: 'rgba(0, 0, 0, 0.04)',
        CLICKER_DECREMENT_BUTTON_TEXT_COLOR: 'rgba(0,0,0,0.65)',
        CLICKER_BUTTON_FONT_SIZE_EM: 2.2,
        INCREMENT_KEYBOARD_SHORTCUT_CODE: 'ShiftRight',

        // --- Resizable UI Panel & Panes ---
        RESIZE_HANDLE_SIZE_PX: 10, // For panel border resizing
        DIVIDER_WIDTH_PX: 8,
        LEFT_PANE_INITIAL_FLEX_BASIS: '40%',
        LEFT_PANE_MIN_WIDTH_PERCENT: 20,
        RIGHT_PANE_MIN_WIDTH_PERCENT: 25,

        // --- Timers & Clock ---
        LAST_ACTION_TIMER_WARN_SECONDS: 10 * 60, // Increased default
        LAST_ACTION_TIMER_WARN_COLOR: 'rgba(230, 40, 40, 0.95)',
        TIMERS_FONT_SIZE_EM: 0.8,

        // --- Minimalist "Bare Numbers" Statistics ---
        MINIMAL_STATS_ID_SUFFIX: '_minimalStats',
        MINIMAL_STATS_DEFAULT_VISIBLE: true,
        MINIMAL_STATS_DEFAULT_BOTTOM_VH: 3,
        MINIMAL_STATS_DEFAULT_RIGHT_VW: 30,
        MINIMAL_STATS_FONT_SIZE_EM: 1.2,
        MINIMAL_STATS_TEXT_COLOR: 'rgba(60, 60, 60, 0.7)',
        MINIMAL_STATS_BACKGROUND_COLOR: 'rgba(245, 245, 245, 0.0)', // Transparent background
        MINIMAL_STATS_SHOW_TOTAL_DEFAULT: true,
        MINIMAL_STATS_SHOW_PER_HOUR_DEFAULT: true,
        MINIMAL_STATS_SHOW_NON_CONTRIBUTING_DEFAULT: true,
        MINIMAL_STATS_DRAG_HANDLE_TEXT_KEY: 'minimalStats_dragHandle', // localized
        MINIMAL_STATS_DRAG_HANDLE_SIZE: '18px',

        // --- Page Overlay & Tab Identification ---
        PAGE_COLOR_OVERLAY_ID_SUFFIX: '_pageColorOverlay',
        PAGE_INDICATOR_TEXT_ID_SUFFIX: '_pageIndicatorText',
        PAGE_COLOR_OVERLAY_DEFAULT_VISIBLE: false,
        PAGE_INDICATOR_TEXT_DEFAULT_VISIBLE: false,
        PAGE_INDICATOR_FONT_SIZE_PX: 60,
        TAB_TYPES: {
            CRET: 'C-RET', WHD: 'WHD', REFURB: 'REFURB', UNKNOWN: 'General'
        },
        TAB_IDENTIFICATION_MODES: [
            { name: 'REFURB', keyword: 'REFURB', color: 'rgba(255, 165, 0, 0.04)', textColor: 'rgba(255, 140, 0, 0.65)' },
            { name: 'C-RET', keyword: 'CRETURN', color: 'rgba(0, 165, 255, 0.04)', textColor: 'rgba(0, 140, 255, 0.65)' },
            { name: 'WHD', keyword: 'DEALS', color: 'rgba(100, 255, 100, 0.04)', textColor: 'rgba(80, 220, 80, 0.65)' },
        ],
        DEFAULT_TAB_MODE_NAME: 'General',
        DEFAULT_TAB_MODE_COLOR: 'rgba(100, 100, 100, 0.04)',
        DEFAULT_TAB_MODE_TEXT_COLOR: 'rgba(150, 150, 150, 0.55)',
        UI_TAB_INDICATOR_FONT_SIZE_EM: 1.0, // For indicator in main panel bottom bar

        // --- Department Logic ---
        DEPARTMENTS: {
            UG: 'UG', BK: 'BK', RB: 'RB', CR: 'CR', WD: 'WD', RB_ONLY: 'RB_ONLY', UNKNOWN: 'UNKNOWN', DETERMINING: 'DETERMINING'
        },
        DEPARTMENT_SESSION_TTL_HOURS: 14,
        DEPARTMENT_DETERMINATION_TIMEOUT_MS: 20 * 60 * 1000, // 20 minutes

        // --- Multi-Tab State Sync ---
        MULTI_TAB_STORAGE_PREFIX: 'tabs_data_',
        MULTI_TAB_WRITE_INTERVAL_MS: 1100,
        MULTI_TAB_READ_INTERVAL_MS: 1600,
        MULTI_TAB_DATA_TTL_MS: 5 * 60 * 1000, // 5 minutes for individual tab data

        // --- Shift & Lunch ---
        DEFAULT_DAY_SHIFT_START_TIME: '06:28',
        DEFAULT_NIGHT_SHIFT_START_TIME: '18:28',
        DEFAULT_LUNCH_OPTIONS: [
            { text_key: "lunch_day1", start: "11:20", end: "11:50", type: "day" },
            { text_key: "lunch_day2", start: "11:50", end: "12:20", type: "day" },
            { text_key: "lunch_day3", start: "12:20", end: "12:50", type: "day" },
            { text_key: "lunch_day4", start: "12:50", end: "13:20", type: "day" },
            { text_key: "lunch_night1", start: "23:20", end: "23:50", type: "night" },
            { text_key: "lunch_night2", start: "23:50", end: "00:20", type: "night" },
            { text_key: "lunch_night3", start: "00:20", end: "00:50", type: "night" },
            { text_key: "lunch_night4", start: "00:50", end: "01:20", type: "night" },
            { text_key: "lunch_noLunch", start: "00:00", end: "00:00", type: "any" }
        ],

        // --- Statistics Display ---
        STATS_FONT_SIZE_EM: 0.95,
        STATS_UPDATE_INTERVAL_MS: 2000,

        // --- Auto-Clicker Trigger ---
        INITIAL_TRIGGER_TEXT: 'poniżej',
        FINAL_TRIGGER_TEXT_CRET: 'Przypisz ponownie',
        FINAL_TRIGGER_TEXT_WHD_REFURB: 'Przypisz nowy',
        TRIGGER_OBSERVE_AREA_SELECTOR: 'body',
        TRIGGER_DEBUG_MAX_PATHS: 7,
        AUTO_CLICK_REFRESH_RATE_MS: 180, // Debounce for MutationObserver

        // --- Storage Keys (suffixed with SCRIPT_ID_PREFIX by StorageManager) ---
        STORAGE_KEY_MAIN_SETTINGS: 'mainCfg',
        STORAGE_KEY_CUSTOM_THEMES: 'customThemes_global', // Global, not tab specific
        STORAGE_KEY_UI_SIZE_POS: 'uiSizePos', // Main panel size and pos
        STORAGE_KEY_MINIMAL_STATS_POS: 'minimalStatsPos',
        STORAGE_KEY_DEPARTMENT_INFO: 'departmentInfo', // Global department state
        STORAGE_KEY_LANGUAGE: 'languagePref_global', // Global language preference
        USE_SESSION_STORAGE_FOR_UI_STATE: true, // For panel visibility, pane size, not global UI size/pos

        // --- UI Controls & Settings Panel ---
        EMERGENCY_HIDE_BUTTON_TEXT_KEY: 'closeBtn',
        EMERGENCY_SHOW_BUTTON_ID_SUFFIX: '_emergencyShowBtn',
        EMERGENCY_SHOW_BUTTON_TEXT: '🛠️', // This is an icon, not localized by key
        EMERGENCY_SHOW_BUTTON_SIZE: '36px',
        EMERGENCY_SHOW_BUTTON_OPACITY: 0.3,
        EMERGENCY_SHOW_BUTTON_HOVER_OPACITY: 0.9,
        SETTINGS_PANEL_ID_SUFFIX: '_settingsPanel',
        SETTINGS_PANEL_WIDTH_VW: 35, // Percentage of viewport width for settings panel
        SETTINGS_PANEL_MIN_WIDTH_PX: 350,
        SETTINGS_PANEL_MAX_WIDTH_PX: 500,
        LOCK_UI_BUTTON_TEXT_UNLOCKED_KEY: 'uiLockBtn',
        LOCK_UI_BUTTON_TEXT_LOCKED_KEY: 'uiUnlockBtn',
        TOGGLE_SETTINGS_BUTTON_TEXT_CLOSED_KEY: 'settingsBtn',
        TOGGLE_SETTINGS_BUTTON_TEXT_OPENED_KEY: 'settingsBackBtn',

        // --- Pointer Events Mode Options (lang keys for text) ---
        POINTER_EVENTS_MODES: [
            { value: 'fully_interactive', text_key: 'peMode_fullyInteractive' },
            { value: 'default_transparent_buttons_active', text_key: 'peMode_defaultTransparent' },
            { value: 'fully_click_through', text_key: 'peMode_mostlyClickThrough' },
            { value: 'windows_watermark', text_key: 'peMode_watermark' }
        ],
        DEFAULT_POINTER_EVENTS_MODE: 'windows_watermark',
        DEFAULT_UI_VISIBILITY_ON_INIT: false,

        // --- Language Settings ---
        DEFAULT_LANGUAGE: 'pl',
        AVAILABLE_LANGUAGES: [
            { code: 'pl', name: 'Polski' },
            { code: 'en', name: 'English' },
        ],
        LANG_STRINGS: {
            // English strings
            en: {
                // General
                closeBtn: "Close", saveBtn: "Save", resetBtn: "Reset",
                uiLockBtn: "UI Lock", uiUnlockBtn: "UI Unlock",
                settingsBtn: "Settings", settingsBackBtn: "Settings <",
                show: "Show", hide: "Hide", enable: "Enable", disable: "Disable",
                error: "Error", warning: "Warning", info: "Info",
                yes: "Yes", no: "No",
                // Pointer Events
                peMode_title: "Mouse Click Mode",
                peMode_label: "Panel Click Behavior:",
                peMode_fullyInteractive: "Fully Interactive (Blocks Background)",
                peMode_defaultTransparent: "Transparent BG (Buttons Active)",
                peMode_mostlyClickThrough: "Mostly Click-Through (Hotkeys/Auto)",
                peMode_watermark: "Watermark Mode (Fully Click-Through)",
                // Tabs & Department
                tabName: "Tab Name", currentTab: "Current Tab", global: "Global",
                department: "Department", unknownDepartment: "Unknown", determiningDepartment: "Determining...",
                depName_UG: "UG Dept.", depName_BK: "BK Dept.", depName_RB: "RB Dept.", depName_CR: "CR Dept.", depName_WD: "WD Dept.", depName_RB_ONLY: "RB (Solo) Dept.",
                depName_UNKNOWN: "Unknown Dept.", depName_DETERMINING: "Determining Dept...",
                // Shift & Lunch
                shiftLunch_title: "Shift & Lunch",
                shiftType: "Shift Type:", shiftType_auto: "Automatic", shiftType_day: "Day", shiftType_night: "Night",
                shiftStartManual: "Shift Start (manual):", lunchBreak: "Lunch Break:",
                lunch_day1: "Day Lunch 1 (11:20-11:50)", lunch_day2: "Day Lunch 2 (11:50-12:20)", lunch_day3: "Day Lunch 3 (12:20-12:50)", lunch_day4: "Day Lunch 4 (12:50-13:20)",
                lunch_night1: "Night Lunch 1 (23:20-23:50)", lunch_night2: "Night Lunch 2 (23:50-00:20)", lunch_night3: "Night Lunch 3 (00:20-00:50)", lunch_night4: "Night Lunch 4 (00:50-01:20)",
                lunch_noLunch: "No Lunch",
                // Stats
                stats_items: "Items", stats_total: "Total", stats_perHour: "/hr",
                stats_lastAction: "Last Action", stats_workedTime: "Worked",
                stats_shift: "Shift", stats_lunch: "Lunch",
                stats_thisTab: "This Tab", stats_global: "Global (Contributing)",
                stats_otherTabsSummary: "Others",
                // Minimal Stats
                minimalStats_title: "Minimalist Statistics",
                minimalStats_enable: "Enable 'Bare Numbers'",
                minimalStats_showTotal: "Show total items",
                minimalStats_showPerHour: "Show items/hour",
                minimalStats_showNonContributing: "Show non-contributing items",
                minimalStats_dragHandle: " D ", minimalStats_pin: " Pin ", minimalStats_resetPosition: "Reset Position",
                minimalStats_editPosition: "Move 'Bare Numbers'",
                // Automation
                automation_title: "Automation & Contribution",
                automation_autoIncrement: "Auto-Increment on Trigger",
                automation_triggerWordDebug: "Trigger Word",
                automation_contributesToGlobal: "This Tab contributes to Global Stats",
                automation_otherTabsContribution: "Other Tabs Contribution:",
                automation_noOtherTabs: "(No other active helper tabs detected)",
                // UI Visibility
                uiVisibility_title: "UI Element Visibility",
                uiVisibility_clock: "Real-time Clock", uiVisibility_statsBlock: "Statistics Block",
                uiVisibility_lastActionTimer: "Last Action Timer", uiVisibility_tabIndicatorPanel: "Tab Name in Panel",
                uiVisibility_pageOverlay: "Full Page Color Overlay", uiVisibility_pageIndicatorText: "Page Indicator Text",
                uiVisibility_triggerDebug: "Trigger Debug Display",
                // Current Tab Appearance
                appearance_title: "Current Tab Appearance",
                appearance_currentTabName: "Current Tab Name",
                appearance_displayName: "Tab Display Name:",
                appearance_overlayColor: "Page Overlay Color:",
                appearance_indicatorTextColor: "Page Indicator Text Color:",
                appearance_saveCustom: "Save Appearance for This URL",
                appearance_resetCustom: "Reset Appearance to Default",
                // Debugging
                debug_title: "Debugging Tools",
                debug_pointerBorders: "Show Clickable Area Debug Borders",
                debug_autoClickerState: "Auto-Clicker State",
                debug_initialTrigger: "Initial", debug_finalCRETTrigger: "Final C-RET", debug_finalWHDREFTrigger: "Final WHD/REF",
                debug_found: "FOUND", debug_notFound: "Not Found", debug_flagOn: "Flag:ON", debug_flagOff: "Flag:OFF",
                debug_paths: "Paths",
                // Buttons
                button_plus: "+1", button_minus: "-1", settings_applyClose: "Apply & Close",
                // Time units
                time_s: "s", time_m: "m", time_h: "h",
                // Language Selector
                language_select: "Language:",
                // Stats Formatting Function (Example structure, customize per department)
                stats_format_total_items_bare: (dept, counts, T) => { // T is a shorthand for Utils.getLangString
                    const { CRET = 0, WHD = 0, REFURB = 0, TOTAL = 0, TOTAL_BK = 0, REFURB_NON_CONTRIB = 0, WHD_NON_CONTRIB = 0, CURRENT_TAB_TYPE, CURRENT_TAB_COUNT = 0 } = counts;
                    switch (dept) {
                        case CONFIG.DEPARTMENTS.UG: return `[${CRET}C, ${WHD}W, ${REFURB}R = ${TOTAL}]`;
                        case CONFIG.DEPARTMENTS.BK: return `[${CRET}C, ${WHD}W = ${TOTAL_BK}${REFURB_NON_CONTRIB ? ` (+${REFURB_NON_CONTRIB}R)` : ''}]`;
                        case CONFIG.DEPARTMENTS.RB: return `[${REFURB}R${WHD_NON_CONTRIB ? ` (+${WHD_NON_CONTRIB}W)` : ''}]`;
                        case CONFIG.DEPARTMENTS.CR: return `[${CRET}C]`;
                        case CONFIG.DEPARTMENTS.WD: return `[${WHD}W]`;
                        case CONFIG.DEPARTMENTS.RB_ONLY: return `[${REFURB}R]`;
                        default: return `${CURRENT_TAB_TYPE || T('unknownDepartment')}: ${CURRENT_TAB_COUNT}`;
                    }
                },
            },
            // Polish strings
            pl: {
                // General
                closeBtn: "Zamknij", saveBtn: "Zapisz", resetBtn: "Resetuj",
                uiLockBtn: "Blokada UI", uiUnlockBtn: "Odblokuj UI",
                settingsBtn: "Ustawienia", settingsBackBtn: "Ustawienia <",
                show: "Pokaż", hide: "Ukryj", enable: "Włącz", disable: "Wyłącz",
                error: "Błąd", warning: "Ostrzeżenie", info: "Informacja",
                yes: "Tak", no: "Nie",
                // Pointer Events
                peMode_title: "Tryb kliknięć myszy",
                peMode_label: "Zachowanie panelu przy kliknięciu:",
                peMode_fullyInteractive: "Pełna interaktywność (blokuje tło)",
                peMode_defaultTransparent: "Przezroczyste tło (przyciski aktywne)",
                peMode_mostlyClickThrough: "Głównie 'Click-Through' (Skróty/Auto)",
                peMode_watermark: "Tryb znaku wodnego (Pełny 'Click-Through')",
                // Tabs & Department
                tabName: "Nazwa karty", currentTab: "Bieżąca karta", global: "Globalnie",
                department: "Dział", unknownDepartment: "Nieznany", determiningDepartment: "Określanie działu...",
                depName_UG: "Dział UG", depName_BK: "Dział BK", depName_RB: "Dział RB", depName_CR: "Dział CR", depName_WD: "Dział WD", depName_RB_ONLY: "Dział RB (Solo)",
                depName_UNKNOWN: "Dział nieznany", depName_DETERMINING: "Określanie działu...",
                // Shift & Lunch
                shiftLunch_title: "Zmiana i Przerwa",
                shiftType: "Rodzaj zmiany:", shiftType_auto: "Automatycznie", shiftType_day: "Dzienna", shiftType_night: "Nocna",
                shiftStartManual: "Początek zmiany (ręcznie):", lunchBreak: "Przerwa obiadowa:",
                lunch_day1: "Przerwa dzienna 1 (11:20-11:50)", lunch_day2: "Przerwa dzienna 2 (11:50-12:20)", lunch_day3: "Przerwa dzienna 3 (12:20-12:50)", lunch_day4: "Przerwa dzienna 4 (12:50-13:20)",
                lunch_night1: "Przerwa nocna 1 (23:20-23:50)", lunch_night2: "Przerwa nocna 2 (23:50-00:20)", lunch_night3: "Przerwa nocna 3 (00:20-00:50)", lunch_night4: "Przerwa nocna 4 (00:50-01:20)",
                lunch_noLunch: "Brak przerwy",
                // Stats
                stats_items: "Sztuk", stats_total: "Suma", stats_perHour: "/godz.",
                stats_lastAction: "Ostatnia akcja", stats_workedTime: "Przepracowano",
                stats_shift: "Zmiana", stats_lunch: "Przerwa",
                stats_thisTab: "Ta karta", stats_global: "Globalnie (sumowane)",
                stats_otherTabsSummary: "Inne",
                 // Minimal Stats
                minimalStats_title: "Statystyki minimalistyczne",
                minimalStats_enable: "Włącz 'Gołe liczby'",
                minimalStats_showTotal: "Pokaż łączną liczbę sztuk",
                minimalStats_showPerHour: "Pokaż sztuk/godzinę",
                minimalStats_showNonContributing: "Pokaż sztuki niewliczane",
                minimalStats_dragHandle: " P ", minimalStats_pin: " Z ", minimalStats_resetPosition: "Resetuj pozycję",
                minimalStats_editPosition: "Przesuń 'Gołe liczby'",
                // Automation
                automation_title: "Automatyzacja i Wkład",
                automation_autoIncrement: "Automatyczne naliczanie",
                automation_triggerWordDebug: "Słowo spustowe",
                automation_contributesToGlobal: "Ta karta wlicza się do globalnych statystyk",
                automation_otherTabsContribution: "Wkład innych kart:",
                automation_noOtherTabs: "(Brak innych aktywnych kart z pomocnikiem)",
                // UI Visibility
                uiVisibility_title: "Widoczność elementów UI",
                uiVisibility_clock: "Zegar czasu rzeczywistego", uiVisibility_statsBlock: "Blok statystyk",
                uiVisibility_lastActionTimer: "Licznik od ostatniej akcji", uiVisibility_tabIndicatorPanel: "Nazwa karty w panelu",
                uiVisibility_pageOverlay: "Pełnoekranowa nakładka", uiVisibility_pageIndicatorText: "Tekstowy wskaźnik strony",
                uiVisibility_triggerDebug: "Debugowanie zdarzeń",
                // Current Tab Appearance
                appearance_title: "Wygląd bieżącej karty",
                appearance_currentTabName: "Nazwa bieżącej karty",
                appearance_displayName: "Nazwa wyświetlana karty:",
                appearance_overlayColor: "Kolor nakładki strony:",
                appearance_indicatorTextColor: "Kolor tekstu wskaźnika:",
                appearance_saveCustom: "Zapisz wygląd dla tego URL",
                appearance_resetCustom: "Resetuj wygląd do domyślnego",
                // Debugging
                debug_title: "Narzędzia deweloperskie",
                debug_pointerBorders: "Pokaż ramki obszarów klikalnych",
                debug_autoClickerState: "Stan Auto-Kilkera",
                debug_initialTrigger: "Początkowy", debug_finalCRETTrigger: "Końcowy C-RET", debug_finalWHDREFTrigger: "Końcowy WHD/REF",
                debug_found: "ZNALAZIONO", debug_notFound: "Nie znaleziono", debug_flagOn: "Flaga:ON", debug_flagOff: "Flaga:OFF",
                debug_paths: "Ścieżki",
                // Buttons
                button_plus: "+1", button_minus: "-1", settings_applyClose: "Zastosuj i Zamknij",
                // Time units
                time_s: "s", time_m: "m", time_h: "g",
                // Language Selector
                language_select: "Język:",
                // Stats Formatting (same logic, can call English if specific PL format not needed or for brevity)
                stats_format_total_items_bare: (dept, counts, T) => { // T is a shorthand for Utils.getLangString
                   const { CRET = 0, WHD = 0, REFURB = 0, TOTAL = 0, TOTAL_BK = 0, REFURB_NON_CONTRIB = 0, WHD_NON_CONTRIB = 0, CURRENT_TAB_TYPE, CURRENT_TAB_COUNT = 0 } = counts;
                    switch (dept) {
                        case CONFIG.DEPARTMENTS.UG: return `[${CRET}C, ${WHD}W, ${REFURB}R = ${TOTAL}]`;
                        case CONFIG.DEPARTMENTS.BK: return `[${CRET}C, ${WHD}W = ${TOTAL_BK}${REFURB_NON_CONTRIB ? ` (+${REFURB_NON_CONTRIB}R)` : ''}]`;
                        case CONFIG.DEPARTMENTS.RB: return `[${REFURB}R${WHD_NON_CONTRIB ? ` (+${WHD_NON_CONTRIB}W)` : ''}]`;
                        case CONFIG.DEPARTMENTS.CR: return `[${CRET}C]`;
                        case CONFIG.DEPARTMENTS.WD: return `[${WHD}W]`;
                        case CONFIG.DEPARTMENTS.RB_ONLY: return `[${REFURB}R]`;
                        default: return `${CURRENT_TAB_TYPE || T('unknownDepartment')}: ${CURRENT_TAB_COUNT}`;
                    }
                },
            }
        }
    };

    // --- ------------------------------------------------------------------------ ---
    // --- --------- SCRIPT STATE (Internal - Do not modify directly) ----------- ---
    // --- ------------------------------------------------------------------------ ---
    const state = {
        initialized: false,
        uiContainer: null,
        dom: {}, // References to DOM elements
        intervals: {},
        timeouts: {},
        mutationObserver: null,
        pageKeydownListener: null,
        beforeUnloadListener: null,
        storageListener: null,

        // --- UI State ---
        uiPanelVisible: CONFIG.DEFAULT_UI_VISIBILITY_ON_INIT,
        uiPanelPosition: { x: CONFIG.UI_RIGHT_OFFSET, y: CONFIG.UI_BOTTOM_OFFSET }, // For main panel, store as offsets
        uiPanelSize: { width: `${CONFIG.UI_INITIAL_WIDTH_VW}vw`, height: `${CONFIG.UI_INITIAL_HEIGHT_VH}vh`},
        uiLocked: false,
        settingsPanelVisible: false,
        leftPaneFlexBasis: CONFIG.LEFT_PANE_INITIAL_FLEX_BASIS,
        pointerEventsMode: CONFIG.DEFAULT_POINTER_EVENTS_MODE,
        isResizingPanel: false,
        isDraggingMinimalStats: false,

        // --- Minimal Stats State ---
        minimalStatsVisible: CONFIG.MINIMAL_STATS_DEFAULT_VISIBLE,
        minimalStatsPosition: { bottom: `${CONFIG.MINIMAL_STATS_DEFAULT_BOTTOM_VH}vh`, right: `${CONFIG.MINIMAL_STATS_DEFAULT_RIGHT_VW}vw` },
        minimalStatsShowTotal: CONFIG.MINIMAL_STATS_SHOW_TOTAL_DEFAULT,
        minimalStatsShowPerHour: CONFIG.MINIMAL_STATS_SHOW_PER_HOUR_DEFAULT,
        minimalStatsShowNonContributing: CONFIG.MINIMAL_STATS_SHOW_NON_CONTRIBUTING_DEFAULT,

        // --- Feature Visibility Toggles ---
        showClock: true, showStats: true, showLastActionTimer: true, showUITabIndicator: true,
        showPageOverlay: CONFIG.PAGE_COLOR_OVERLAY_DEFAULT_VISIBLE,
        showPageIndicatorText: CONFIG.PAGE_INDICATOR_TEXT_DEFAULT_VISIBLE,
        showTriggerDebug: CONFIG.DEBUG_MODE,
        debugPointerEventBorders: false,

        // --- Core Operational State ---
        currentLanguage: CONFIG.DEFAULT_LANGUAGE,
        currentTabFullUrl: window.location.href,
        currentTabId: '',
        currentTabType: CONFIG.TAB_TYPES.UNKNOWN,
        currentTabModeDetails: {
            name: CONFIG.DEFAULT_TAB_MODE_NAME, color: CONFIG.DEFAULT_TAB_MODE_COLOR,
            textColor: CONFIG.DEFAULT_TAB_MODE_TEXT_COLOR, isCustom: false
        },
        currentDepartment: CONFIG.DEPARTMENTS.DETERMINING,
        departmentInfo: { department: null, sequence: [], sessionStartTime: null }, // Loaded from storage

        clicksForThisTab: 0,
        lastActionTimestampForThisTab: Date.now(),
        currentTabContributesToTotal: true,

        // --- Shift & Lunch ---
        shiftType: 'auto',
        shiftStartTime: null, // Date object
        selectedLunchOption: null, // Object from CONFIG.DEFAULT_LUNCH_OPTIONS

        // --- Auto-Clicker State ---
        autoClickEnabled: true,
        autoClickerInternalState: 'IDLE', // IDLE, ITEM_STARTED_PONIŻEJ, FINALIZE_DETECTED_PRZYPISZ
        autoClickerInitialTriggerFound: false, // Helper for state transitions
        autoClickerFinalTriggerFound: false,   // Helper for state transitions
        
        // --- Global/Multi-tab state ---
        customTabThemes: {},
        otherTabsData: {},
    };

    // --- ------------------------------------------------------------------------ ---
    // --- ------------------------- UTILITY FUNCTIONS -------------------------- ---
    // --- ------------------------------------------------------------------------ ---
    const Utils = {
        log: (level, ...args) => {
            const prefix = `[PA v${CONFIG.SCRIPT_VERSION} ${level.toUpperCase()}]`;
            const tabInfo = `${state.currentTabType || (state.currentTabId ? state.currentTabId.substring(0,10) : '')}`;
            const deptInfo = `${state.currentDepartment || ''}`;
            const fullPrefix = `${prefix} ${tabInfo}${deptInfo ? ` (${deptInfo})` : ''}:`;

            if (level === 'debug' && !CONFIG.DEBUG_MODE) return;
            const logFunction = console[level] || console.log;
            logFunction(fullPrefix, ...args);
        },
        debug: (...args) => Utils.log('debug', ...args),
        info: (...args) => Utils.log('info', ...args),
        warn: (...args) => Utils.log('warn', ...args),
        error: (...args) => Utils.log('error', ...args),

        getStorage: (useSession) => useSession ? sessionStorage : localStorage,

        generateTabId: (urlStr) => {
            try {
                const url = new URL(urlStr);
                // Use hostname + pathname, normalize trailing slashes, and remove common prefixes if any
                let path = url.hostname.replace(/^www\./, '') + url.pathname.toLowerCase().replace(/\/$/, '');
                // Limit length and make it somewhat readable, replace non-alphanumeric
                path = path.replace(/[^a-z0-9_.-]/gi, '_').replace(/__+/g, '_');
                if (path.length > 60) {
                    path = path.substring(0, 30) + '...' + path.substring(path.length - 27);
                }
                return path || 'default_tab';
            } catch (e) {
                Utils.error("Error generating Tab ID from URL:", urlStr, e);
                // Fallback for invalid URLs or unforeseen issues
                return 'error_tab_id_' + Date.now().toString().slice(-5);
            }
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

        formatMsToDuration: (ms, includeSeconds = false, useShortUnits = false) => {
            if (isNaN(ms) || ms < 0) ms = 0;
            let totalSeconds = Math.floor(ms / 1000);
            const hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            
            const hUnit = useShortUnits ? Utils.getLangString('time_h') : 'h';
            const mUnit = useShortUnits ? Utils.getLangString('time_m') : 'm';
            const sUnit = useShortUnits ? Utils.getLangString('time_s') : 's';

            let parts = [];
            if (hours > 0) parts.push(`${String(hours)}${hUnit}`);
            if (hours > 0 || minutes > 0) parts.push(`${String(minutes).padStart(parts.length > 0 ? 2 : 1, '0')}${mUnit}`);
            
            if (includeSeconds || (hours === 0 && minutes === 0)) {
                parts.push(`${String(seconds).padStart(parts.length > 0 ? 2 : 1, '0')}${sUnit}`);
            }
             if (parts.length === 0) return `0${sUnit}`; // Ensure something is returned if ms is very small and seconds not included
            return parts.join(' ');
        },

        createDOMElement: (tag, attributes = {}, children = []) => {
            const element = document.createElement(tag);
            for (const key in attributes) {
                if (key === 'style' && typeof attributes[key] === 'object') {
                    Object.assign(element.style, attributes[key]);
                } else if (key === 'dataset' && typeof attributes[key] === 'object') {
                    Object.assign(element.dataset, attributes[key]);
                } else if (key === 'id' && attributes[key]) { // Ensure ID is not empty
                    element.id = CONFIG.SCRIPT_ID_PREFIX + attributes[key];
                } else if (['textContent', 'innerHTML', 'value', 'checked', 'disabled', 'type', 'title', 'placeholder', 'tabIndex', 'src', 'className', 'name', 'htmlFor', 'colSpan', 'rowSpan', 'target', 'rel'].includes(key) ) {
                    element[key] = attributes[key];
                } else if (typeof attributes[key] === 'function' && key.startsWith('on')) {
                    element.addEventListener(key.substring(2).toLowerCase(), attributes[key]);
                }
                 else {
                    element.setAttribute(key, attributes[key]);
                }
            }
            // Ensure text elements are non-selectable by default for cleaner UI
            if ((tag === 'div' || tag === 'span' || tag === 'p' || tag === 'h1' || tag === 'h2' || tag === 'h3' || tag === 'h4' || tag === 'h5' || tag === 'h6' || tag === 'label') &&
                (!attributes.className || !attributes.className.includes('ph-interactive-text')) && // allow specific override
                (!element.style.pointerEvents || element.style.pointerEvents === 'auto')) { // only if not explicitly set
                element.style.pointerEvents = 'none';
                element.style.userSelect = 'none';
            }

            children.forEach(child => {
                if (child === null || typeof child === 'undefined') return;
                if (typeof child === 'string' || typeof child === 'number') {
                    element.appendChild(document.createTextNode(String(child)));
                } else if (child instanceof Node) {
                    element.appendChild(child);
                } else if (Array.isArray(child)) {
                    child.forEach(c => {
                        if (c instanceof Node) element.appendChild(c);
                        else if (typeof c === 'string' || typeof c === 'number') element.appendChild(document.createTextNode(String(c)));
                    });
                }
            });
            return element;
        },
        
        makeButtonInteractive: (button, scale = 0.95) => {
            if (!button) return;
            button.addEventListener('mousedown', e => {
                if (e.button !== 0) return; // Only for left click
                if (!button.disabled) button.style.transform = `scale(${scale})`;
            });
            const resetTransform = () => { if (!button.disabled) button.style.transform = 'scale(1)'; };
            button.addEventListener('mouseup', resetTransform);
            button.addEventListener('mouseleave', resetTransform);
            button.addEventListener('blur', resetTransform); // For keyboard tabbing
        },

        applyElementInteractivity: (element, interactive, cursorStyle = 'default') => {
            if (!element) return;
            if (interactive) {
                element.style.pointerEvents = 'auto';
                // For inputs/buttons, user-select is usually fine or handled by browser defaults
                if (element.tagName !== 'INPUT' && element.tagName !== 'TEXTAREA' && element.tagName !== 'SELECT' && element.tagName !== 'BUTTON') {
                    element.style.userSelect = 'auto'; 
                }
                element.style.cursor = cursorStyle;
            } else {
                element.style.pointerEvents = 'none';
                element.style.userSelect = 'none';
                element.style.cursor = 'default';
            }
        },

        getLangString: (key, ...args) => {
            const langPack = CONFIG.LANG_STRINGS[state.currentLanguage] || CONFIG.LANG_STRINGS[CONFIG.DEFAULT_LANGUAGE];
            let str = langPack[key];

            if (typeof str === 'undefined') {
                // Fallback to default language if key not in current
                const defaultLangPack = CONFIG.LANG_STRINGS[CONFIG.DEFAULT_LANGUAGE];
                str = defaultLangPack[key];
                if (typeof str === 'undefined') {
                    Utils.warn(`Lang key "${key}" not found in "${state.currentLanguage}" or default "${CONFIG.DEFAULT_LANGUAGE}".`);
                    return `[Missing ${state.currentLanguage.toUpperCase()} Translation: ${key}]`;
                }
            }
            
            if (typeof str === 'function') { // Handle functions in LANG_STRINGS (e.g., for complex formatting)
                try {
                    return str(...args);
                } catch (e) {
                    Utils.error(`Error executing lang string function for key "${key}":`, e);
                    return `[Error in lang fn: ${key}]`;
                }
            }

            if (args.length > 0 && typeof str === 'string') {
                args.forEach((arg, i) => {
                    str = str.replace(new RegExp(`\\{${i}\\}`, 'g'), arg);
                });
            }
            return str;
        },

        debounce: (func, delay) => {
            let timeoutId;
            return function(...args) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                }, delay);
            };
        },

        getUniqueSelectorPath: (element, limit = 5) => {
            if (!(element instanceof Element)) return 'Not an Element';
            const path = [];
            while (element.nodeType === Node.ELEMENT_NODE && path.length < limit) {
                let selector = element.nodeName.toLowerCase();
                if (element.id && !element.id.startsWith(CONFIG.SCRIPT_ID_PREFIX)) { // Prefer ID if not ours
                    selector += `#${element.id.split(' ')[0]}`; // Take first ID if multiple
                    path.unshift(selector);
                    break; // ID is unique enough
                } else {
                    let classNames = Array.from(element.classList)
                                         .filter(cn => !cn.startsWith('ph-') && !cn.startsWith(CONFIG.SCRIPT_ID_PREFIX.slice(0,-1))) // Exclude our own classes
                                         .slice(0, 2); // Max 2 classes
                    if (classNames.length > 0) {
                        selector += `.${classNames.join('.')}`;
                    } else if (element.parentElement) { // Add :nth-child if no good identifier
                        let sibling = element;
                        let nth = 1;
                        while (sibling.previousElementSibling) {
                            sibling = sibling.previousElementSibling;
                            if (sibling.nodeName.toLowerCase() === selector) {
                                nth++;
                            }
                        }
                        if (nth > 1) selector += `:nth-of-type(${nth})`; // Or :nth-child if preferred
                    }
                }
                path.unshift(selector);
                element = element.parentNode;
                 if (element === document.body || element === document.documentElement) {
                    path.unshift(element.nodeName.toLowerCase());
                    break;
                }
            }
            return path.join(' > ');
        },
        
        // Helper to parse HH:MM into a Date object for today (or tomorrow if applicable for night shifts)
        timeToDate: (timeStr, baseDate = new Date()) => {
            const [hours, minutes] = timeStr.split(':').map(Number);
            const date = new Date(baseDate);
            date.setHours(hours, minutes, 0, 0);
            return date;
        },
    };

    // --- ------------------------------------------------------------------------ ---
    // --- ----------------------- STORAGE MANAGER ------------------------------ ---
    // --- ------------------------------------------------------------------------ ---
    const StorageManager = {
        _prefixKey: (key) => `${CONFIG.SCRIPT_ID_PREFIX}${key}`,

        save: (key, value, useSession = false) => {
            try {
                const storage = Utils.getStorage(useSession);
                storage.setItem(StorageManager._prefixKey(key), JSON.stringify(value));
            } catch (e) {
                Utils.error(`Failed to save to storage (key: ${key}):`, e);
            }
        },

        load: (key, defaultValue = null, useSession = false) => {
            try {
                const storage = Utils.getStorage(useSession);
                const value = storage.getItem(StorageManager._prefixKey(key));
                return value ? JSON.parse(value) : defaultValue;
            } catch (e) {
                Utils.error(`Failed to load from storage (key: ${key}):`, e);
                return defaultValue;
            }
        },

        remove: (key, useSession = false) => {
            try {
                const storage = Utils.getStorage(useSession);
                storage.removeItem(StorageManager._prefixKey(key));
            } catch (e) {
                Utils.error(`Failed to remove from storage (key: ${key}):`, e);
            }
        },

        loadAllState: () => {
            Utils.info("Loading all state from storage...");
            state.currentTabId = Utils.generateTabId(state.currentTabFullUrl);

            // Language
            state.currentLanguage = StorageManager.load(CONFIG.STORAGE_KEY_LANGUAGE, CONFIG.DEFAULT_LANGUAGE, false);
            if (!CONFIG.AVAILABLE_LANGUAGES.find(l => l.code === state.currentLanguage)) {
                state.currentLanguage = CONFIG.DEFAULT_LANGUAGE; // Fallback if stored lang is invalid
            }

            // UI Panel Size & Position
            const uiSizePos = StorageManager.load(CONFIG.STORAGE_KEY_UI_SIZE_POS, null, false);
            if (uiSizePos) {
                if (uiSizePos.width) state.uiPanelSize.width = uiSizePos.width;
                if (uiSizePos.height) state.uiPanelSize.height = uiSizePos.height;
                // Position might be added later if panel becomes draggable
            }

            // Minimal Stats Position
            const minStatsPos = StorageManager.load(CONFIG.STORAGE_KEY_MINIMAL_STATS_POS, null, false);
            if (minStatsPos) state.minimalStatsPosition = minStatsPos;

            // Custom Themes
            state.customTabThemes = StorageManager.load(CONFIG.STORAGE_KEY_CUSTOM_THEMES, {}, false);
            StorageManager.determineCurrentTabTypeAndModeDetails(); // Sets tab type and initial mode details

            // Main Settings (specific to this tab instance, potentially session)
            const mainSettings = StorageManager.load(CONFIG.STORAGE_KEY_MAIN_SETTINGS + state.currentTabId, {}, CONFIG.USE_SESSION_STORAGE_FOR_UI_STATE);
            
            state.uiPanelVisible = typeof mainSettings.uiPanelVisible === 'boolean' ? mainSettings.uiPanelVisible : CONFIG.DEFAULT_UI_VISIBILITY_ON_INIT;
            state.uiLocked = typeof mainSettings.uiLocked === 'boolean' ? mainSettings.uiLocked : false;
            state.settingsPanelVisible = typeof mainSettings.settingsPanelVisible === 'boolean' ? mainSettings.settingsPanelVisible : false;
            state.leftPaneFlexBasis = mainSettings.leftPaneFlexBasis || CONFIG.LEFT_PANE_INITIAL_FLEX_BASIS;
            state.pointerEventsMode = mainSettings.pointerEventsMode || CONFIG.DEFAULT_POINTER_EVENTS_MODE;
            
            state.showClock = typeof mainSettings.showClock === 'boolean' ? mainSettings.showClock : true;
            state.showStats = typeof mainSettings.showStats === 'boolean' ? mainSettings.showStats : true;
            state.showLastActionTimer = typeof mainSettings.showLastActionTimer === 'boolean' ? mainSettings.showLastActionTimer : true;
            state.showUITabIndicator = typeof mainSettings.showUITabIndicator === 'boolean' ? mainSettings.showUITabIndicator : true;
            state.showPageOverlay = typeof mainSettings.showPageOverlay === 'boolean' ? mainSettings.showPageOverlay : CONFIG.PAGE_COLOR_OVERLAY_DEFAULT_VISIBLE;
            state.showPageIndicatorText = typeof mainSettings.showPageIndicatorText === 'boolean' ? mainSettings.showPageIndicatorText : CONFIG.PAGE_INDICATOR_TEXT_DEFAULT_VISIBLE;
            state.showTriggerDebug = typeof mainSettings.showTriggerDebug === 'boolean' ? mainSettings.showTriggerDebug : CONFIG.DEBUG_MODE;
            state.debugPointerEventBorders = typeof mainSettings.debugPointerEventBorders === 'boolean' ? mainSettings.debugPointerEventBorders : false;

            state.minimalStatsVisible = typeof mainSettings.minimalStatsVisible === 'boolean' ? mainSettings.minimalStatsVisible : CONFIG.MINIMAL_STATS_DEFAULT_VISIBLE;
            state.minimalStatsShowTotal = typeof mainSettings.minimalStatsShowTotal === 'boolean' ? mainSettings.minimalStatsShowTotal : CONFIG.MINIMAL_STATS_SHOW_TOTAL_DEFAULT;
            state.minimalStatsShowPerHour = typeof mainSettings.minimalStatsShowPerHour === 'boolean' ? mainSettings.minimalStatsShowPerHour : CONFIG.MINIMAL_STATS_SHOW_PER_HOUR_DEFAULT;
            state.minimalStatsShowNonContributing = typeof mainSettings.minimalStatsShowNonContributing === 'boolean' ? mainSettings.minimalStatsShowNonContributing : CONFIG.MINIMAL_STATS_SHOW_NON_CONTRIBUTING_DEFAULT;

            state.shiftType = mainSettings.shiftType || 'auto';
            state.shiftStartTime = mainSettings.shiftStartTimeISO ? new Date(mainSettings.shiftStartTimeISO) : null;
            if (mainSettings.selectedLunchOptionIndex >= 0 && CONFIG.DEFAULT_LUNCH_OPTIONS[mainSettings.selectedLunchOptionIndex]) {
                state.selectedLunchOption = CONFIG.DEFAULT_LUNCH_OPTIONS[mainSettings.selectedLunchOptionIndex];
            } else {
                state.selectedLunchOption = null; // Will be set by ShiftManager if null
            }
            state.autoClickEnabled = typeof mainSettings.autoClickEnabled === 'boolean' ? mainSettings.autoClickEnabled : true;
            // currentTabContributesToTotal is loaded with multi-tab data

            // Department Info (Global)
            const deptInfo = StorageManager.load(CONFIG.STORAGE_KEY_DEPARTMENT_INFO, { department: null, sequence: [], sessionStartTime: null }, false);
            state.departmentInfo = deptInfo;
            state.currentDepartment = deptInfo.department || CONFIG.DEPARTMENTS.DETERMINING; // Set initial based on stored

            // Multi-tab data for *this* tab on initial load
            StorageManager.readAllTabsDataFromLocalStorage(true);
        },

        saveMainSettings: () => {
            const lunchIndex = state.selectedLunchOption ? CONFIG.DEFAULT_LUNCH_OPTIONS.findIndex(opt =>
                opt.start === state.selectedLunchOption.start &&
                opt.end === state.selectedLunchOption.end &&
                opt.type === state.selectedLunchOption.type) : -1;

            const dataToSave = {
                uiPanelVisible: state.uiPanelVisible, uiLocked: state.uiLocked, settingsPanelVisible: state.settingsPanelVisible,
                leftPaneFlexBasis: state.leftPaneFlexBasis, pointerEventsMode: state.pointerEventsMode,
                showClock: state.showClock, showStats: state.showStats, showLastActionTimer: state.showLastActionTimer,
                showUITabIndicator: state.showUITabIndicator, showPageOverlay: state.showPageOverlay, showPageIndicatorText: state.showPageIndicatorText,
                showTriggerDebug: state.showTriggerDebug, debugPointerEventBorders: state.debugPointerEventBorders,
                minimalStatsVisible: state.minimalStatsVisible, minimalStatsShowTotal: state.minimalStatsShowTotal,
                minimalStatsShowPerHour: state.minimalStatsShowPerHour, minimalStatsShowNonContributing: state.minimalStatsShowNonContributing,
                shiftType: state.shiftType, shiftStartTimeISO: state.shiftStartTime ? state.shiftStartTime.toISOString() : null,
                selectedLunchOptionIndex: lunchIndex, autoClickEnabled: state.autoClickEnabled,
                // currentTabContributesToTotal is saved in multi-tab data
            };
            StorageManager.save(CONFIG.STORAGE_KEY_MAIN_SETTINGS + state.currentTabId, dataToSave, CONFIG.USE_SESSION_STORAGE_FOR_UI_STATE);
        },
        
        saveUIPanelSizePos: () => { StorageManager.save(CONFIG.STORAGE_KEY_UI_SIZE_POS, state.uiPanelSize, false); },
        saveMinimalStatsPos: () => { StorageManager.save(CONFIG.STORAGE_KEY_MINIMAL_STATS_POS, state.minimalStatsPosition, false); },
        saveCustomThemes: () => { StorageManager.save(CONFIG.STORAGE_KEY_CUSTOM_THEMES, state.customTabThemes, false); },
        saveDepartmentInfo: () => { StorageManager.save(CONFIG.STORAGE_KEY_DEPARTMENT_INFO, state.departmentInfo, false); },
        saveLanguagePreference: () => { StorageManager.save(CONFIG.STORAGE_KEY_LANGUAGE, state.currentLanguage, false); },

        determineCurrentTabTypeAndModeDetails: () => {
            // Determine Tab Type
            const urlUpper = state.currentTabFullUrl.toUpperCase();
            state.currentTabType = CONFIG.TAB_TYPES.UNKNOWN;
            for (const mode of CONFIG.TAB_IDENTIFICATION_MODES) {
                if (urlUpper.includes(mode.keyword.toUpperCase())) {
                    state.currentTabType = CONFIG.TAB_TYPES[mode.name.replace(/-/g, '')] || CONFIG.TAB_TYPES.UNKNOWN; // e.g. C-RET -> CRET
                    break;
                }
            }

            // Determine Tab Mode Details (for coloring)
            const customTheme = state.customTabThemes[state.currentTabFullUrl];
            if (customTheme && customTheme.name && customTheme.color && customTheme.textColor) {
                state.currentTabModeDetails = { ...customTheme, isCustom: true };
                return;
            }

            const autoDetectedMode = CONFIG.TAB_IDENTIFICATION_MODES.find(m => state.currentTabType === CONFIG.TAB_TYPES[m.name.replace(/-/g, '')]);
            if (autoDetectedMode) {
                state.currentTabModeDetails = { ...autoDetectedMode, isCustom: false };
            } else {
                state.currentTabModeDetails = {
                    name: CONFIG.DEFAULT_TAB_MODE_NAME, color: CONFIG.DEFAULT_TAB_MODE_COLOR,
                    textColor: CONFIG.DEFAULT_TAB_MODE_TEXT_COLOR, isCustom: false
                };
            }
        },

        writeCurrentTabDataToLocalStorage: () => {
            if (!state.currentTabId) { Utils.error("Cannot write tab data: currentTabId is not set."); return; }
            try {
                const tabData = {
                    tabId: state.currentTabId,
                    type: state.currentTabType, // C-RET, WHD, REFURB, UNKNOWN
                    modeName: state.currentTabModeDetails.name,
                    clicks: state.clicksForThisTab,
                    lastActionTimestamp: state.lastActionTimestampForThisTab,
                    contributesToTotal: state.currentTabContributesToTotal,
                    department: state.currentDepartment, // Share current department status
                    timestamp: Date.now()
                };
                // Use the global prefix for multi-tab data, not the scriptId prefix which is already part of StorageManager._prefixKey
                localStorage.setItem(CONFIG.SCRIPT_ID_PREFIX + CONFIG.MULTI_TAB_STORAGE_PREFIX + state.currentTabId, JSON.stringify(tabData));
            } catch (e) { Utils.error('Error writing tab data to localStorage:', e); }
        },

        readAllTabsDataFromLocalStorage: (isInitialLoad = false) => {
            let newOtherTabsData = {}; const now = Date.now();
            let globalTotalClicks = 0;
            let globalContributingTabsCount = 0; // For averaging per-hour rates later if needed

            try {
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (key && key.startsWith(CONFIG.SCRIPT_ID_PREFIX + CONFIG.MULTI_TAB_STORAGE_PREFIX)) {
                        const itemJson = localStorage.getItem(key);
                        if (itemJson) {
                            try {
                                const itemData = JSON.parse(itemJson);
                                if (now - (itemData.timestamp || 0) > CONFIG.MULTI_TAB_DATA_TTL_MS) {
                                    localStorage.removeItem(key); continue;
                                }

                                if (itemData.tabId === state.currentTabId) {
                                    if (isInitialLoad) {
                                        state.clicksForThisTab = parseInt(itemData.clicks, 10) || 0;
                                        state.lastActionTimestampForThisTab = parseInt(itemData.lastActionTimestamp, 10) || Date.now();
                                        state.currentTabContributesToTotal = typeof itemData.contributesToTotal === 'boolean' ? itemData.contributesToTotal : true;
                                    }
                                    // Always reflect current tab's state in the collected data
                                    newOtherTabsData[itemData.tabId] = { ...itemData, clicks: state.clicksForThisTab, contributesToTotal: state.currentTabContributesToTotal, department: state.currentDepartment };
                                } else {
                                    newOtherTabsData[itemData.tabId] = itemData;
                                }
                            } catch (parseError) { Utils.error(`Error parsing localStorage key ${key}:`, parseError); localStorage.removeItem(key); }
                        }
                    }
                }
            } catch (e) { Utils.error('Error reading from localStorage multi-tab sync:', e); }
            
            state.otherTabsData = newOtherTabsData;

            // Update global stats *after* department is determined and applied
            // This calculation will be moved to a dedicated stats update function that considers department logic
            
            if (!isInitialLoad && typeof UIManager !== 'undefined' && UIManager.isInitialized()) {
                 UIManager.updateStatisticsDisplay();
                 MinimalStatsDisplay.updateDisplay();
                 if (state.settingsPanelVisible) SettingsPanel.updateOtherTabsSettingsDisplay();
            }
        }
    };

    // --- ------------------------------------------------------------------------ ---
    // --- ----------------------- DEPARTMENT MANAGER --------------------------- ---
    // --- ------------------------------------------------------------------------ ---
    const DepartmentManager = {
        _determinationTimeoutId: null,

        init: () => {
            DepartmentManager.checkAndReloadForSessionTTL(); // This must be first
            DepartmentManager.determineDepartmentOnLaunch();
        },

        checkAndReloadForSessionTTL: () => {
            const { sessionStartTime } = state.departmentInfo;
            if (sessionStartTime) {
                const ttlMs = CONFIG.DEPARTMENT_SESSION_TTL_HOURS * 60 * 60 * 1000;
                if (Date.now() - sessionStartTime > ttlMs) {
                    Utils.info("Department session TTL expired. Clearing department info and reloading page.");
                    StorageManager.remove(CONFIG.STORAGE_KEY_DEPARTMENT_INFO, false); // Clear global department info
                    // Optionally clear tab-specific settings too, or let them persist
                    window.location.reload(true); // Force reload from server
                }
            }
        },

        determineDepartmentOnLaunch: () => {
            Utils.debug("DepartmentManager: Determining department on launch.");
            const { department, sessionStartTime } = state.departmentInfo;

            if (department && sessionStartTime) { // Department known and session active
                Utils.info(`Department already determined: ${department}. Session started: ${new Date(sessionStartTime)}`);
                state.currentDepartment = department;
                // No need to re-evaluate sequence if department is already set and session is valid
                return; 
            }
            
            // No department or session expired, (re-)start determination
            state.currentDepartment = CONFIG.DEPARTMENTS.DETERMINING;
            if (!sessionStartTime) { // If session truly new, reset sequence
                state.departmentInfo.sequence = [];
                state.departmentInfo.sessionStartTime = Date.now();
                Utils.info("Starting new department determination session.");
            } else {
                Utils.info("Continuing department determination session.");
            }
            DepartmentManager.updateSequenceAndTryDetermine();
        },

        updateSequenceAndTryDetermine: () => {
            if (state.currentDepartment && state.currentDepartment !== CONFIG.DEPARTMENTS.DETERMINING && state.currentDepartment !== CONFIG.DEPARTMENTS.UNKNOWN) {
                Utils.debug("Department already set, skipping sequence update:", state.currentDepartment);
                return; // Don't re-evaluate if already determined in this session.
            }

            // Add current tab type to sequence if not already the last one (to avoid duplicates from reloads)
            const currentTabLaunchInfo = { type: state.currentTabType, timestamp: Date.now() };
            const lastInSequence = state.departmentInfo.sequence[state.departmentInfo.sequence.length - 1];
            
            let addedToSequence = false;
            if (!lastInSequence || lastInSequence.type !== currentTabLaunchInfo.type) {
                 // Only add if it's a new unique type in a row or first item
                const existingTypeEntry = state.departmentInfo.sequence.find(s => s.type === currentTabLaunchInfo.type);
                if (!existingTypeEntry) { // Add only if this type of tab hasn't been seen yet in the sequence
                    state.departmentInfo.sequence.push(currentTabLaunchInfo);
                    addedToSequence = true;
                } else {
                    Utils.debug("Tab type already in sequence, not adding again:", currentTabLaunchInfo.type);
                }
            } else {
                 Utils.debug("Tab type is same as last in sequence, not adding:", currentTabLaunchInfo.type);
            }


            if(addedToSequence) Utils.debug("Updated department sequence:", JSON.stringify(state.departmentInfo.sequence));
            StorageManager.saveDepartmentInfo(); // Save sequence and session start time

            let determinedDept = null;
            const seq = state.departmentInfo.sequence.map(s => s.type); // Array of types: ['C-RET', 'WHD', ...]

            // Rule Evaluation (Order of priority matters for overlapping conditions)
            // UG: C-RET -> WHD -> REFURB
            if (seq.includes(CONFIG.TAB_TYPES.CRET) && seq.includes(CONFIG.TAB_TYPES.WHD) && seq.includes(CONFIG.TAB_TYPES.REFURB)) {
                const cretIdx = seq.indexOf(CONFIG.TAB_TYPES.CRET);
                const whdIdx = seq.indexOf(CONFIG.TAB_TYPES.WHD);
                const refurbIdx = seq.indexOf(CONFIG.TAB_TYPES.REFURB);
                if (cretIdx < whdIdx && whdIdx < refurbIdx) {
                    determinedDept = CONFIG.DEPARTMENTS.UG;
                }
            }

            // BK: C-RET -> REFURB -> WHD
            if (!determinedDept && seq.includes(CONFIG.TAB_TYPES.CRET) && seq.includes(CONFIG.TAB_TYPES.WHD) && seq.includes(CONFIG.TAB_TYPES.REFURB)) {
                const cretIdx = seq.indexOf(CONFIG.TAB_TYPES.CRET);
                const refurbIdx = seq.indexOf(CONFIG.TAB_TYPES.REFURB);
                const whdIdx = seq.indexOf(CONFIG.TAB_TYPES.WHD);
                 if (cretIdx < refurbIdx && refurbIdx < whdIdx) {
                    determinedDept = CONFIG.DEPARTMENTS.BK;
                }
            }
            
            // RB: REFURB (1st), then WHD (later). C-RET doesn't break this if REFURB was first.
            if (!determinedDept && seq.length > 0 && seq[0] === CONFIG.TAB_TYPES.REFURB && seq.includes(CONFIG.TAB_TYPES.WHD)) {
                determinedDept = CONFIG.DEPARTMENTS.RB;
            }

            if (determinedDept) {
                DepartmentManager._setDepartment(determinedDept);
                return;
            }

            // For CR, WD, RB_ONLY - depends on timeout if only one type is present after a while
            if (seq.length === 1 || (seq.length > 0 && !determinedDept) ) { // Only one unique type launched so far or more but no combo matched
                clearTimeout(DepartmentManager._determinationTimeoutId); // Clear previous timeout if any

                const firstTabType = seq[0];
                DepartmentManager._determinationTimeoutId = setTimeout(() => {
                    // Re-check sequence length. If still 1, or conditions still match, determine.
                    const currentSeq = StorageManager.load(CONFIG.STORAGE_KEY_DEPARTMENT_INFO, {}, false).sequence || [];
                    if (currentSeq.length === 0) { // Should not happen if timeout was set
                        DepartmentManager._setDepartment(CONFIG.DEPARTMENTS.UNKNOWN);
                        return;
                    }

                    const firstTypeInStoredSeq = currentSeq[0].type;
                    let timeoutDept = null;

                    if (currentSeq.map(s => s.type).filter((v, i, a) => a.indexOf(v) === i).length === 1) { // Still only one unique type
                        if (firstTypeInStoredSeq === CONFIG.TAB_TYPES.REFURB) timeoutDept = CONFIG.DEPARTMENTS.RB_ONLY;
                        else if (firstTypeInStoredSeq === CONFIG.TAB_TYPES.CRET) timeoutDept = CONFIG.DEPARTMENTS.CR;
                        else if (firstTypeInStoredSeq === CONFIG.TAB_TYPES.WHD) timeoutDept = CONFIG.DEPARTMENTS.WD;
                    } else if (firstTypeInStoredSeq === CONFIG.TAB_TYPES.REFURB && !currentSeq.map(s => s.type).includes(CONFIG.TAB_TYPES.WHD)) {
                        // If REFURB was first and WHD still hasn't appeared after timeout
                        timeoutDept = CONFIG.DEPARTMENTS.RB_ONLY;
                    }
                    // Add other complex timeout conditions here if needed

                    if (timeoutDept) {
                        DepartmentManager._setDepartment(timeoutDept);
                    } else {
                        // If after timeout, still no clear single-tab department and no combo matched above, could be unknown or still determining.
                        // For now, let's assume if UG/BK/RB didn't match, and timeout for single ones didn't give a clear one, it is unknown.
                        // Or, re-run the combo checks if sequence changed during timeout.
                        const complexCheckDept = DepartmentManager._checkComplexAfterTimeout();
                        if (complexCheckDept) {
                             DepartmentManager._setDepartment(complexCheckDept);
                        } else {
                             Utils.warn("Department determination timed out, no specific rule matched. Setting to UNKNOWN.");
                             DepartmentManager._setDepartment(CONFIG.DEPARTMENTS.UNKNOWN); // Or keep as DETERMINING
                        }
                    }
                }, CONFIG.DEPARTMENT_DETERMINATION_TIMEOUT_MS);
                Utils.debug(`DepartmentManager: Timeout set for ${CONFIG.DEPARTMENT_DETERMINATION_TIMEOUT_MS / 1000}s for potential single-type department.`);
            }
        },
        _checkComplexAfterTimeout: () => {
            // This function re-evaluates UG, BK, RB rules *after* a timeout might have occurred.
            // This is in case the sequence was updated by another tab during the timeout period.
            const { sequence } = StorageManager.load(CONFIG.STORAGE_KEY_DEPARTMENT_INFO, { sequence: [] }, false);
            const seq = sequence.map(s => s.type);
            let determinedDept = null;

            if (seq.includes(CONFIG.TAB_TYPES.CRET) && seq.includes(CONFIG.TAB_TYPES.WHD) && seq.includes(CONFIG.TAB_TYPES.REFURB)) {
                const cretIdx = seq.indexOf(CONFIG.TAB_TYPES.CRET);
                const whdIdx = seq.indexOf(CONFIG.TAB_TYPES.WHD);
                const refurbIdx = seq.indexOf(CONFIG.TAB_TYPES.REFURB);
                if (cretIdx < whdIdx && whdIdx < refurbIdx) {
                    determinedDept = CONFIG.DEPARTMENTS.UG;
                } else if (cretIdx < refurbIdx && refurbIdx < whdIdx) {
                    determinedDept = CONFIG.DEPARTMENTS.BK;
                }
            }
             if (!determinedDept && seq.length > 0 && seq[0] === CONFIG.TAB_TYPES.REFURB && seq.includes(CONFIG.TAB_TYPES.WHD)) {
                determinedDept = CONFIG.DEPARTMENTS.RB;
            }
            return determinedDept;
        },

        _setDepartment: (dept) => {
            Utils.info(`Department determined: ${dept}`);
            state.currentDepartment = dept;
            state.departmentInfo.department = dept;
            // Session start time should already be set when determination begins
            if (!state.departmentInfo.sessionStartTime) state.departmentInfo.sessionStartTime = Date.now();
            StorageManager.saveDepartmentInfo();
            clearTimeout(DepartmentManager._determinationTimeoutId);
            DepartmentManager._determinationTimeoutId = null;
            
            // Update UI elements that show department
            if (state.initialized) {
                UIManager.updateStatisticsDisplay();
                MinimalStatsDisplay.updateDisplay();
                if (state.settingsPanelVisible) SettingsPanel.populateDepartmentInfo();
            }
        },

        getDepartmentDisplayName: (deptCode) => {
            const code = deptCode || state.currentDepartment || CONFIG.DEPARTMENTS.DETERMINING;
            return Utils.getLangString(`depName_${code}`);
        },

        isTabContributingByDefault: (tabType) => {
            // Determines if a tab type *should* contribute by default based on current department
            // This can be overridden by user settings if allowed by department logic
            if (!state.currentDepartment || state.currentDepartment === CONFIG.DEPARTMENTS.DETERMINING || state.currentDepartment === CONFIG.DEPARTMENTS.UNKNOWN) {
                return true; // Default to contributing if department is not clear
            }

            switch (state.currentDepartment) {
                case CONFIG.DEPARTMENTS.UG:
                    return [CONFIG.TAB_TYPES.CRET, CONFIG.TAB_TYPES.WHD, CONFIG.TAB_TYPES.REFURB].includes(tabType);
                case CONFIG.DEPARTMENTS.BK:
                    return [CONFIG.TAB_TYPES.CRET, CONFIG.TAB_TYPES.WHD].includes(tabType); // REFURB is non-contributing for BK's main metric
                case CONFIG.DEPARTMENTS.RB:
                    return tabType === CONFIG.TAB_TYPES.REFURB; // WHD is non-contributing for RB's main metric
                case CONFIG.DEPARTMENTS.CR:
                    return tabType === CONFIG.TAB_TYPES.CRET;
                case CONFIG.DEPARTMENTS.WD:
                    return tabType === CONFIG.TAB_TYPES.WHD;
                case CONFIG.DEPARTMENTS.RB_ONLY:
                    return tabType === CONFIG.TAB_TYPES.REFURB;
                default:
                    return true;
            }
        }
    };

    // --- ------------------------------------------------------------------------ ---
    // --- ------------------------- SHIFT MANAGER ------------------------------ ---
    // --- ------------------------------------------------------------------------ ---
    const ShiftManager = { // Mostly from v3.4, adapted for lang strings
        init: () => {
            if (!state.shiftStartTime || isNaN(new Date(state.shiftStartTime).getTime())) {
                ShiftManager.determineAndSetShiftStartTime(true); // Force auto on first init if no valid time
            } else {
                // Ensure it's a Date object if loaded from ISO string
                state.shiftStartTime = new Date(state.shiftStartTime);
            }
            if (!state.selectedLunchOption) {
                ShiftManager.setDynamicDefaultLunch();
            }
        },

        determineAndSetShiftStartTime: (forceAuto = false) => {
            const now = new Date();
            let shiftStartHour, shiftStartMinute;
            let calculatedStartTime = new Date(now); // Base on current day initially
            let determinedShiftCategory = ''; // 'day' or 'night'

            const dayStartTotalMinutes = Utils.timeStringToMinutes(CONFIG.DEFAULT_DAY_SHIFT_START_TIME);
            const nightStartTotalMinutes = Utils.timeStringToMinutes(CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME);

            if (forceAuto || state.shiftType === 'auto') {
                const currentTotalMinutes = now.getHours() * 60 + now.getMinutes();
                // Determine if current time falls into day or night shift period
                // This logic assumes day shift is e.g. 06:00-18:00 and night 18:00-06:00
                // Adjust if shifts cross midnight differently or overlap strangely
                if (currentTotalMinutes >= dayStartTotalMinutes && currentTotalMinutes < nightStartTotalMinutes) {
                    determinedShiftCategory = 'day';
                    [shiftStartHour, shiftStartMinute] = CONFIG.DEFAULT_DAY_SHIFT_START_TIME.split(':').map(Number);
                } else {
                    determinedShiftCategory = 'night';
                    [shiftStartHour, shiftStartMinute] = CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME.split(':').map(Number);
                    // If current time is before night shift start (e.g. 03:00 for a 22:00 start), shift started yesterday
                    if (currentTotalMinutes < nightStartTotalMinutes) { // (e.g. current 03:00, night start 22:00)
                         calculatedStartTime.setDate(now.getDate() -1); // Shift started yesterday
                    }
                }
                calculatedStartTime.setHours(shiftStartHour, shiftStartMinute, 0, 0);
                state.shiftStartTime = calculatedStartTime;
                if (state.shiftType === 'auto' || forceAuto) { // If forced or was auto, update type
                    state.shiftType = determinedShiftCategory;
                }
            } else if (state.shiftType === 'day' || state.shiftType === 'night') {
                const timeValue = state.dom.settingsShiftStartTimeInput?.value; // From UI if set
                let baseTime = state.shiftType === 'day' ? CONFIG.DEFAULT_DAY_SHIFT_START_TIME : CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME;
                if (timeValue) baseTime = timeValue;

                [shiftStartHour, shiftStartMinute] = baseTime.split(':').map(Number);
                calculatedStartTime.setHours(shiftStartHour, shiftStartMinute, 0, 0);
                
                // If night shift and current time is before defined start time (e.g. 03:00 for a 22:00 start), assume it started previous day
                if (state.shiftType === 'night' && (now.getHours() < shiftStartHour || (now.getHours() === shiftStartHour && now.getMinutes() < shiftStartMinute))) {
                     calculatedStartTime.setDate(now.getDate() -1);
                }
                state.shiftStartTime = calculatedStartTime;
            }
            // If after all logic, shiftStartTime is in the future, adjust it to the past occurrence
            if (state.shiftStartTime > now) {
                 state.shiftStartTime.setDate(state.shiftStartTime.getDate() -1);
            }


            Utils.debug(`Shift start time set to: ${state.shiftStartTime}, type: ${state.shiftType}`);
            ShiftManager.setDynamicDefaultLunch(); // Recalculate default lunch based on new shift time/type
        },

        setDynamicDefaultLunch: () => {
            let potentialShiftType = state.shiftType;
            if (potentialShiftType === 'auto') {
                potentialShiftType = ShiftManager.getCurrentShiftCategory(); // Get day/night based on actual start time
            }

            const defaultLunch = CONFIG.DEFAULT_LUNCH_OPTIONS.find(opt => opt.type === potentialShiftType) ||
                                 CONFIG.DEFAULT_LUNCH_OPTIONS.find(opt => opt.type === "any") ||
                                 CONFIG.DEFAULT_LUNCH_OPTIONS[0];
            state.selectedLunchOption = defaultLunch;
            Utils.debug(`Default lunch set to: ${defaultLunch.text_key}`);
        },

        getCurrentShiftCategory: () => { // 'day', 'night', or 'any' (if undetermined)
            if (!state.shiftStartTime) return 'any';

            const shiftStartHour = state.shiftStartTime.getHours();
            const dayStartH = parseInt(CONFIG.DEFAULT_DAY_SHIFT_START_TIME.split(':')[0], 10);
            const nightStartH = parseInt(CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME.split(':')[0], 10);

            // If manual type is set, respect it
            if (state.shiftType === 'day') return 'day';
            if (state.shiftType === 'night') return 'night';

            // Auto-detect based on start hour
            // This assumes day shift starts >= dayStartH and < nightStartH
            if (shiftStartHour >= dayStartH && shiftStartHour < nightStartH) {
                return 'day';
            } else {
                return 'night';
            }
        },

        calculateEffectiveWorkTimeMs: () => {
            if (!state.shiftStartTime) return 0;
            const now = new Date();
            let totalElapsedMs = now.getTime() - state.shiftStartTime.getTime();
            if (totalElapsedMs < 0) totalElapsedMs = 0;

            let lunchDurationMs = 0;
            const lunch = state.selectedLunchOption;

            if (lunch && (lunch.start !== "00:00" || lunch.end !== "00:00")) {
                // Create Date objects for lunch start/end based on the shift's date context
                let lunchStartAbs = Utils.timeToDate(lunch.start, state.shiftStartTime);
                let lunchEndAbs = Utils.timeToDate(lunch.end, state.shiftStartTime);

                // Handle lunch crossing midnight relative to shift start
                if (lunchEndAbs < lunchStartAbs) { // e.g. Lunch 23:00 - 01:00
                    lunchEndAbs.setDate(lunchEndAbs.getDate() + 1);
                }
                
                // If the shift itself crosses midnight (e.g. night shift starts 22:00, lunch is 01:00-01:30)
                // and lunch times are "before" shift start time on the same calendar day, advance lunch day.
                if (state.shiftStartTime.getHours() > lunchStartAbs.getHours() && lunchStartAbs < lunchEndAbs) {
                     lunchStartAbs.setDate(lunchStartAbs.getDate() + 1);
                     lunchEndAbs.setDate(lunchEndAbs.getDate() + 1);
                }


                const effectiveActualLunchStart = Math.max(state.shiftStartTime.getTime(), lunchStartAbs.getTime());
                const effectiveActualLunchEnd = Math.min(now.getTime(), lunchEndAbs.getTime());

                if (effectiveActualLunchEnd > effectiveActualLunchStart) {
                    lunchDurationMs = effectiveActualLunchEnd - effectiveActualLunchStart;
                }
            }
            return Math.max(0, totalElapsedMs - lunchDurationMs);
        }
    };
    
    // --- ------------------------------------------------------------------------ ---
    // --- -------------------- RESIZABLE ITEMS MANAGER ------------------------- ---
    // --- ------------------------------------------------------------------------ ---
    const ResizableItemsManager = {
        isResizingPane: false, // For internal resizable panes like left/right stats
        activeResizeTarget: null, // For main panel or minimal stats

        initPanelResizing: (panelElement) => {
            const handles = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'];
            const handleSize = CONFIG.RESIZE_HANDLE_SIZE_PX;

            handles.forEach(dir => {
                const handle = Utils.createDOMElement('div', {
                    className: `ph-resize-handle ph-resize-handle-${dir} ph-interactive`, // Mark as interactive
                    style: {
                        position: 'absolute',
                        backgroundColor: 'transparent', // Invisible
                        zIndex: '1', // Above panel content for interaction
                    }
                });

                if (dir.includes('n')) handle.style.top = `-${handleSize / 2}px`;
                if (dir.includes('s')) handle.style.bottom = `-${handleSize / 2}px`;
                if (dir.includes('e')) handle.style.right = `-${handleSize / 2}px`;
                if (dir.includes('w')) handle.style.left = `-${handleSize / 2}px`;

                if (dir === 'n' || dir === 's') { handle.style.left = '0px'; handle.style.width = '100%'; handle.style.height = `${handleSize}px`; handle.style.cursor = 'ns-resize'; }
                if (dir === 'e' || dir === 'w') { handle.style.top = '0px'; handle.style.height = '100%'; handle.style.width = `${handleSize}px`; handle.style.cursor = 'ew-resize'; }
                
                if (dir === 'ne') { handle.style.width = `${handleSize}px`; handle.style.height = `${handleSize}px`; handle.style.cursor = 'nesw-resize'; }
                if (dir === 'nw') { handle.style.width = `${handleSize}px`; handle.style.height = `${handleSize}px`; handle.style.cursor = 'nwse-resize'; }
                if (dir === 'se') { handle.style.width = `${handleSize}px`; handle.style.height = `${handleSize}px`; handle.style.cursor = 'nwse-resize'; }
                if (dir === 'sw') { handle.style.width = `${handleSize}px`; handle.style.height = `${handleSize}px`; handle.style.cursor = 'nesw-resize'; }
                
                panelElement.appendChild(handle);
                handle.addEventListener('mousedown', (e) => ResizableItemsManager.startMainPanelResize(e, panelElement, dir));
            });
        },

        startMainPanelResize: (e, panelElement, direction) => {
            if (e.button !== 0) return;
            e.preventDefault();
            e.stopPropagation();
            state.isResizingPanel = true; // Global flag for panel resizing state
            UIManager.updatePointerEventsMode(); // Make main container interactive for resize feedback

            const initialRect = panelElement.getBoundingClientRect();
            const initialMouseX = e.clientX;
            const initialMouseY = e.clientY;

            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            const doResize = (moveEvent) => {
                if (!state.isResizingPanel) return;
                moveEvent.preventDefault();

                let newWidth = initialRect.width;
                let newHeight = initialRect.height;
                // Position adjustments are needed if dragging w, n, nw, ne, sw borders
                let newRight = parseFloat(CONFIG.UI_RIGHT_OFFSET); // Assuming it's in px or can be parsed
                let newBottom = parseFloat(CONFIG.UI_BOTTOM_OFFSET);

                const dx = moveEvent.clientX - initialMouseX;
                const dy = moveEvent.clientY - initialMouseY;

                if (direction.includes('e')) newWidth = initialRect.width + dx;
                if (direction.includes('w')) {
                    newWidth = initialRect.width - dx;
                    // newRight = viewportWidth - (initialRect.left + dx) - newWidth; // This moves the panel
                }
                if (direction.includes('s')) newHeight = initialRect.height + dy;
                if (direction.includes('n')) {
                    newHeight = initialRect.height - dy;
                    // newBottom = viewportHeight - (initialRect.top + dy) - newHeight; // This moves the panel
                }

                // Apply Min/Max
                newWidth = Math.max(CONFIG.UI_MIN_WIDTH_PX, newWidth);
                newHeight = Math.max(CONFIG.UI_MIN_HEIGHT_PX, newHeight);
                
                // Update panel style
                panelElement.style.width = `${newWidth}px`;
                panelElement.style.height = `${newHeight}px`;
                // If panel position is fixed from right/bottom and we resize from left/top,
                // the browser handles it. If position was top/left, we'd need to adjust panelElement.style.left/top.
            };

            const stopResize = () => {
                if (!state.isResizingPanel) return;
                document.removeEventListener('mousemove', doResize);
                document.removeEventListener('mouseup', stopResize);
                state.isResizingPanel = false;
                
                // Save new size in vw/vh for responsiveness if desired, or px
                state.uiPanelSize.width = panelElement.style.width; // Store as px
                state.uiPanelSize.height = panelElement.style.height; // Store as px
                StorageManager.saveUIPanelSizePos();
                UIManager.updatePointerEventsMode(); // Restore normal pointer events
                Utils.debug("Panel resize stopped. New size:", state.uiPanelSize);
            };

            document.addEventListener('mousemove', doResize);
            document.addEventListener('mouseup', stopResize);
        },

        initMinimalStatsDragging: (minimalStatsElement, dragHandleElement) => {
            dragHandleElement.addEventListener('mousedown', (e) => {
                if (e.button !== 0) return;
                e.preventDefault();
                e.stopPropagation();
                state.isDraggingMinimalStats = true;
                MinimalStatsDisplay.applyDraggableStyling(true); // Visual cue

                const initialMouseX = e.clientX;
                const initialMouseY = e.clientY;
                const rect = minimalStatsElement.getBoundingClientRect();
                // Get current position relative to viewport bottom-right
                const initialRight = window.innerWidth - rect.right;
                const initialBottom = window.innerHeight - rect.bottom;

                const doDrag = (moveEvent) => {
                    if (!state.isDraggingMinimalStats) return;
                    moveEvent.preventDefault();

                    const dx = moveEvent.clientX - initialMouseX;
                    const dy = moveEvent.clientY - initialMouseY;

                    let newRight = initialRight - dx;
                    let newBottom = initialBottom - dy;

                    // Keep within viewport boundaries
                    newRight = Math.max(0, Math.min(newRight, window.innerWidth - rect.width));
                    newBottom = Math.max(0, Math.min(newBottom, window.innerHeight - rect.height));
                    
                    minimalStatsElement.style.right = `${newRight}px`;
                    minimalStatsElement.style.bottom = `${newBottom}px`;
                };

                const stopDrag = () => {
                    if (!state.isDraggingMinimalStats) return;
                    document.removeEventListener('mousemove', doDrag);
                    document.removeEventListener('mouseup', stopDrag);
                    state.isDraggingMinimalStats = false;
                    MinimalStatsDisplay.applyDraggableStyling(false);
                    
                    // Save position as style strings (px)
                    state.minimalStatsPosition = {
                        right: minimalStatsElement.style.right,
                        bottom: minimalStatsElement.style.bottom
                    };
                    StorageManager.saveMinimalStatsPos();
                    Utils.debug("Minimal stats drag stopped. New position:", state.minimalStatsPosition);
                };

                document.addEventListener('mousemove', doDrag);
                document.addEventListener('mouseup', stopDrag);
            });
        },
        
        // For internal pane resizing (e.g. stats left/right)
        initInternalPaneResizing: (dividerElement, leftPaneElement, rightPaneElement, onStopCallback) => {
            dividerElement.addEventListener('mousedown', (e) => {
                if (e.button !== 0) return;
                e.preventDefault();
                ResizableItemsManager.isResizingPane = true;
                const mainArea = leftPaneElement.parentElement;
                const initialMouseX = e.clientX;
                const initialLeftPaneWidth = leftPaneElement.offsetWidth;
                const totalWidth = mainArea.offsetWidth - CONFIG.DIVIDER_WIDTH_PX;

                const doResize = (moveEvent) => {
                    if (!ResizableItemsManager.isResizingPane) return;
                    const dx = moveEvent.clientX - initialMouseX;
                    let newLeftWidth = initialLeftPaneWidth + dx;
                    const minLeftPx = totalWidth * (CONFIG.LEFT_PANE_MIN_WIDTH_PERCENT / 100);
                    const minRightPx = totalWidth * (CONFIG.RIGHT_PANE_MIN_WIDTH_PERCENT / 100);

                    newLeftWidth = Math.max(minLeftPx, Math.min(newLeftWidth, totalWidth - minRightPx));
                    
                    const newLeftFlexBasis = (newLeftWidth / totalWidth) * 100;
                    leftPaneElement.style.flexBasis = `${newLeftFlexBasis}%`;
                    // Right pane will adjust due to flex-grow
                };

                const stopResize = () => {
                    if (!ResizableItemsManager.isResizingPane) return;
                    document.removeEventListener('mousemove', doResize);
                    document.removeEventListener('mouseup', stopResize);
                    ResizableItemsManager.isResizingPane = false;
                    if (onStopCallback) onStopCallback(leftPaneElement.style.flexBasis);
                };

                document.addEventListener('mousemove', doResize);
                document.addEventListener('mouseup', stopResize);
            });
        }
    };

    // --- ------------------------------------------------------------------------ ---
    // --- ------------------------ MINIMAL STATS DISPLAY ----------------------- ---
    // --- ------------------------------------------------------------------------ ---
    const MinimalStatsDisplay = {
        isInitialized: false,
        dragHandle: null, // Store drag handle element

        init: () => {
            state.dom.minimalStatsContainer = Utils.createDOMElement('div', {
                id: CONFIG.MINIMAL_STATS_ID_SUFFIX,
                className: 'ph-minimal-stats ph-non-selectable', // Non-selectable base
                style: {
                    position: 'fixed',
                    padding: '5px 8px',
                    backgroundColor: CONFIG.MINIMAL_STATS_BACKGROUND_COLOR, // Transparent BG
                    color: CONFIG.MINIMAL_STATS_TEXT_COLOR,
                    fontSize: `${CONFIG.MINIMAL_STATS_FONT_SIZE_EM}em`,
                    borderRadius: '4px',
                    zIndex: '2147483638', // High z-index, below main panel potentially
                    pointerEvents: 'none', // Click-through by default
                    userSelect: 'none',
                    transition: 'opacity 0.3s, transform 0.3s, background-color 0.2s',
                    whiteSpace: 'nowrap', // Prevent line breaks
                    boxShadow: CONFIG.NO_SHADOW_STYLE,
                    lineHeight: '1.3',
                    textAlign: 'right', // Align text to the right
                }
            });
            // Content element for stats text
            state.dom.minimalStatsContent = Utils.createDOMElement('span', {textContent: 'Loading...'});
            state.dom.minimalStatsContainer.appendChild(state.dom.minimalStatsContent);

            // Create drag handle but don't append yet (Settings panel will make it visible)
            MinimalStatsDisplay.dragHandle = Utils.createDOMElement('div', {
                className: 'ph-minimal-stats-drag-handle ph-interactive', // Interactive
                textContent: Utils.getLangString(CONFIG.MINIMAL_STATS_DRAG_HANDLE_TEXT_KEY),
                title: Utils.getLangString('minimalStats_editPosition'),
                style: {
                    position: 'absolute',
                    top: '-5px', // Position it slightly above
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: '1px 3px',
                    fontSize: '0.7em',
                    backgroundColor: `${CONFIG.MAIN_ACCENT_COLOR}99`,
                    color: 'white',
                    borderRadius: '3px',
                    cursor: 'move',
                    display: 'none', // Hidden by default
                    pointerEvents: 'auto', // Interactive part
                    userSelect: 'none',
                }
            });
            
            document.body.appendChild(state.dom.minimalStatsContainer);
            MinimalStatsDisplay.setPosition(state.minimalStatsPosition); // Apply loaded/default position
            MinimalStatsDisplay.setVisibility(state.minimalStatsVisible); // Apply visibility
            MinimalStatsDisplay.updateDisplay();
            MinimalStatsDisplay.isInitialized = true;
        },

        updateDisplay: () => {
            if (!MinimalStatsDisplay.isInitialized || !state.minimalStatsVisible || !state.dom.minimalStatsContent) return;

            if (!state.shiftStartTime || !state.currentDepartment || state.currentDepartment === CONFIG.DEPARTMENTS.DETERMINING) {
                state.dom.minimalStatsContent.textContent = Utils.getLangString('determiningDepartment');
                return;
            }

            const effectiveWorkMs = ShiftManager.calculateEffectiveWorkTimeMs();
            const hoursWorked = effectiveWorkMs / (1000 * 60 * 60);

            // Get counts based on department
            const counts = StatsCalculator.getDepartmentCounts();
            let itemsForRate = 0;
            
            switch (state.currentDepartment) {
                case CONFIG.DEPARTMENTS.UG: itemsForRate = counts.TOTAL || 0; break;
                case CONFIG.DEPARTMENTS.BK: itemsForRate = counts.TOTAL_BK || 0; break;
                case CONFIG.DEPARTMENTS.RB: itemsForRate = counts.REFURB || 0; break;
                case CONFIG.DEPARTMENTS.CR: itemsForRate = counts.CRET || 0; break;
                case CONFIG.DEPARTMENTS.WD: itemsForRate = counts.WHD || 0; break;
                case CONFIG.DEPARTMENTS.RB_ONLY: itemsForRate = counts.REFURB || 0; break;
                default: itemsForRate = state.clicksForThisTab; // Fallback
            }

            const itemsPerHour = (hoursWorked > 0.001) ? (itemsForRate / hoursWorked) : 0;
            
            let displayText = [];
            if (state.minimalStatsShowTotal) {
                const totalItemsString = Utils.getLangString('stats_format_total_items_bare', state.currentDepartment, counts, Utils.getLangString);
                displayText.push(totalItemsString);
            }
            if (state.minimalStatsShowPerHour) {
                 displayText.push(`${itemsPerHour.toFixed(1)}${Utils.getLangString('stats_perHour')}`);
            }
            // Non-contributing items are already part of the stats_format_total_items_bare if logic is there
            // If `minimalStatsShowNonContributing` is true, the format function should include them.
            // This specific flag is more of a hint to the format function or if we want a separate line.
            // For now, relying on `stats_format_total_items_bare` logic.

            state.dom.minimalStatsContent.textContent = displayText.join(' | ') || Utils.getLangString('depName_UNKNOWN');
        },

        setVisibility: (visible) => {
            state.minimalStatsVisible = visible;
            if (state.dom.minimalStatsContainer) {
                state.dom.minimalStatsContainer.style.display = visible ? 'inline-block' : 'none'; // inline-block for proper sizing
                if(visible) MinimalStatsDisplay.updateDisplay(); // Refresh content when shown
            }
            if(MinimalStatsDisplay.dragHandle) { // Also hide drag handle if stats are hidden
                MinimalStatsDisplay.dragHandle.style.display = 'none';
            }
        },

        setPosition: (posObject) => { // posObject like { bottom: '3vh', right: '30vw' }
            if (state.dom.minimalStatsContainer && posObject) {
                state.dom.minimalStatsContainer.style.right = posObject.right || CONFIG.MINIMAL_STATS_DEFAULT_RIGHT_VW + 'vw';
                state.dom.minimalStatsContainer.style.bottom = posObject.bottom || CONFIG.MINIMAL_STATS_DEFAULT_BOTTOM_VH + 'vh';
                // Clear any conflicting positioning
                state.dom.minimalStatsContainer.style.left = '';
                state.dom.minimalStatsContainer.style.top = '';
            }
        },
        
        showDragHandle: (show) => {
            if (!MinimalStatsDisplay.dragHandle || !state.dom.minimalStatsContainer) return;
            if (show) {
                if (!MinimalStatsDisplay.dragHandle.parentElement) {
                    state.dom.minimalStatsContainer.appendChild(MinimalStatsDisplay.dragHandle); // Append if not already
                    ResizableItemsManager.initMinimalStatsDragging(state.dom.minimalStatsContainer, MinimalStatsDisplay.dragHandle);
                }
                MinimalStatsDisplay.dragHandle.style.display = 'block';
            } else {
                MinimalStatsDisplay.dragHandle.style.display = 'none';
            }
        },

        applyDraggableStyling: (isDragging) => {
            if (state.dom.minimalStatsContainer) {
                state.dom.minimalStatsContainer.style.border = isDragging ? `1px dashed ${CONFIG.MAIN_ACCENT_COLOR}` : 'none';
                state.dom.minimalStatsContainer.style.backgroundColor = isDragging ? 'rgba(255,255,255,0.3)' : CONFIG.MINIMAL_STATS_BACKGROUND_COLOR;
            }
        }
    };

    // --- ------------------------------------------------------------------------ ---
    // --- -------------------------- STATS CALCULATOR -------------------------- ---
    // --- ------------------------------------------------------------------------ ---
    const StatsCalculator = {
        getDepartmentCounts: () => {
            // This function aggregates counts from state.otherTabsData based on department logic
            // It's crucial for accurate display in both main UI and minimal stats.
            const counts = { CRET: 0, WHD: 0, REFURB: 0, TOTAL: 0, TOTAL_BK: 0, REFURB_NON_CONTRIB: 0, WHD_NON_CONTRIB: 0, CURRENT_TAB_COUNT: state.clicksForThisTab, CURRENT_TAB_TYPE: state.currentTabType };
            
            for (const tabId in state.otherTabsData) {
                const tab = state.otherTabsData[tabId];
                if (!tab.contributesToTotal && tab.tabId !== state.currentTabId) continue; // Skip if user manually unchecks contribution for other tabs (unless it's this tab for its own display)

                const clicks = parseInt(tab.clicks, 10) || 0;

                if (tab.type === CONFIG.TAB_TYPES.CRET) counts.CRET += clicks;
                if (tab.type === CONFIG.TAB_TYPES.WHD) counts.WHD += clicks;
                if (tab.type === CONFIG.TAB_TYPES.REFURB) counts.REFURB += clicks;
            }
            
            // Apply department-specific logic for totals and non-contributing
            switch (state.currentDepartment) {
                case CONFIG.DEPARTMENTS.UG:
                    counts.TOTAL = counts.CRET + counts.WHD + counts.REFURB;
                    break;
                case CONFIG.DEPARTMENTS.BK:
                    counts.TOTAL_BK = counts.CRET + counts.WHD;
                    counts.REFURB_NON_CONTRIB = counts.REFURB; // All REFURB clicks are non-contributing for BK's primary metric
                    counts.TOTAL = counts.TOTAL_BK; // Primary total for BK
                    break;
                case CONFIG.DEPARTMENTS.RB:
                    // For RB, REFURB is primary. WHD is non-contributing.
                    counts.WHD_NON_CONTRIB = counts.WHD;
                    counts.TOTAL = counts.REFURB; // Primary total for RB
                    break;
                case CONFIG.DEPARTMENTS.CR:
                    counts.TOTAL = counts.CRET;
                    break;
                case CONFIG.DEPARTMENTS.WD:
                    counts.TOTAL = counts.WHD;
                    break;
                case CONFIG.DEPARTMENTS.RB_ONLY:
                    counts.TOTAL = counts.REFURB;
                    break;
                default: // UNKNOWN or DETERMINING
                    // Simple sum of all contributing tabs if department isn't clear
                    counts.TOTAL = Object.values(state.otherTabsData)
                                        .filter(t => t.contributesToTotal)
                                        .reduce((sum, t) => sum + (parseInt(t.clicks,10) || 0), 0);
                    break;
            }
            return counts;
        }
    };

    // --- ------------------------------------------------------------------------ ---
    // --- ------------------------- UI MANAGER --------------------------------- ---
    // --- ------------------------------------------------------------------------ ---
    const UIManager = {
        _isInitialized: false,

        init: () => {
            UIManager.buildInitialUI();
            UIManager.setInitialUIValues();
            ResizableItemsManager.initPanelResizing(state.uiContainer); // Enable main panel resizing
            UIManager._isInitialized = true;
        },
        isInitialized: () => UIManager._isInitialized,
        
        buildInitialUI: () => {
            Utils.debug("Building initial UI...");
            UIManager.buildMainPanel();
            SettingsPanel.build(); // Builds and appends to main panel
            UIManager.buildPageOverlayAndIndicator();
            UIManager.buildEmergencyShowButton();

            document.body.appendChild(state.dom.pageColorOverlay);
            document.body.appendChild(state.dom.pageIndicatorText);
            document.body.appendChild(state.dom.emergencyShowButton);
            document.body.appendChild(state.uiContainer);
        },

        buildMainPanel: () => {
            state.uiContainer = Utils.createDOMElement('div', {
                id: CONFIG.UI_CONTAINER_ID,
                className: 'ph-main-container', // Base class for easier global styling if needed
                style: {
                    position: 'fixed',
                    bottom: state.uiPanelPosition.y, // Use state for potential future dragging
                    right: state.uiPanelPosition.x,
                    width: state.uiPanelSize.width, // From state (loaded or default)
                    height: state.uiPanelSize.height,
                    minWidth: `${CONFIG.UI_MIN_WIDTH_PX}px`,
                    minHeight: `${CONFIG.UI_MIN_HEIGHT_PX}px`,
                    backgroundColor: CONFIG.UI_BACKGROUND_COLOR,
                    border: `1px solid ${CONFIG.UI_BORDER_COLOR}`,
                    borderRadius: '5px',
                    boxSizing: 'border-box',
                    color: CONFIG.UI_TEXT_COLOR,
                    fontFamily: CONFIG.FONT_FAMILY,
                    zIndex: '2147483640',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '5px', // Reduced padding
                    overflow: 'hidden', // Important for resizable children and settings panel
                    boxShadow: CONFIG.NO_SHADOW_STYLE,
                    transition: 'opacity 0.3s ease, transform 0.3s ease, width 0.05s linear, height 0.05s linear', // Fast resize transition
                }
            });

            // Top Controls Bar
            const topControls = Utils.createDOMElement('div', { className: 'ph-top-controls ph-interactive-parent', style: { display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '3px', flexShrink: 0, paddingRight: '5px' }});
            const controlBtnStyle = { cursor: 'pointer', background: 'none', border: 'none', color: CONFIG.UI_TEXT_COLOR, borderRadius: '3px', padding: '3px 6px', fontSize: '0.75em', marginLeft: '4px', opacity: '0.65', transition: 'opacity 0.2s, color 0.2s' };
            
            state.dom.toggleSettingsButton = Utils.createDOMElement('button', { className: 'ph-interactive', title: Utils.getLangString('settingsBtn'), style: controlBtnStyle, onClick: EventHandlers.toggleSettingsPanelVisibility });
            Utils.makeButtonInteractive(state.dom.toggleSettingsButton);

            state.dom.lockUIButton = Utils.createDOMElement('button', { className: 'ph-interactive', title: Utils.getLangString('uiLockBtn'), style: controlBtnStyle, onClick: EventHandlers.toggleUILockState });
            Utils.makeButtonInteractive(state.dom.lockUIButton);
            
            state.dom.emergencyHideButton = Utils.createDOMElement('button', { className: 'ph-interactive', title: Utils.getLangString('closeBtn'), style: {...controlBtnStyle, fontWeight: 'bold', opacity: '0.7' }, onClick: () => UIManager.setUIPanelVisibility(false) });
            Utils.makeButtonInteractive(state.dom.emergencyHideButton);

            topControls.append(state.dom.toggleSettingsButton, state.dom.lockUIButton, state.dom.emergencyHideButton);
            state.uiContainer.appendChild(topControls);

            // Main Content Area (Clicker + Stats)
            const mainContentArea = Utils.createDOMElement('div', { className: 'ph-main-content-area ph-interactive-parent', style: { display: 'flex', flexGrow: 1, overflow: 'hidden', position: 'relative', padding: '0 3px' }});
            
            // Left Pane (Clicker)
            state.dom.leftPane = Utils.createDOMElement('div', { className: 'ph-left-pane ph-interactive-parent', style: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexBasis: state.leftPaneFlexBasis, minWidth: `${CONFIG.LEFT_PANE_MIN_WIDTH_PERCENT}%`, overflow: 'hidden', paddingRight: `${CONFIG.DIVIDER_WIDTH_PX / 2}px`, position: 'relative' }});
            state.dom.mainCounterInput = Utils.createDOMElement('input', {
                type: 'number', id: 'mainCounterInput', className: `${CONFIG.SCRIPT_ID_PREFIX}main_counter_input ph-interactive`, // For global style hook
                style: {
                    fontSize: `${CONFIG.MAIN_COUNTER_FONT_SIZE_INITIAL_EM}em`, fontWeight: '300', color: CONFIG.UI_TEXT_COLOR, opacity: '0.9',
                    width: '95%', marginBottom: '10px', textAlign: 'center', background: 'transparent', border: 'none', outline: 'none',
                    padding: '0 3px', MozAppearance: 'textfield' // Firefox
                },
                onInput: EventHandlers.handleCounterInputDynamic, onChange: EventHandlers.handleCounterInputChange
            });

            const clickerButtonsContainer = Utils.createDOMElement('div', { style: { display: 'flex', alignItems: 'center'} });
            const clickerBtnSharedStyle = {
                cursor: 'pointer', border: 'none', borderRadius: '3px', boxShadow: CONFIG.NO_SHADOW_STYLE,
                transition: 'transform 0.08s, background-color 0.1s',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold',
                fontSize: `${CONFIG.CLICKER_BUTTON_FONT_SIZE_EM}em`,
            };
            
            state.dom.decrementButton = Utils.createDOMElement('button', {
                id: 'decrementBtn', className: 'ph-interactive', title: Utils.getLangString('button_minus'),
                style: { ...clickerBtnSharedStyle, backgroundColor: CONFIG.CLICKER_DECREMENT_BUTTON_COLOR, color: CONFIG.CLICKER_DECREMENT_BUTTON_TEXT_COLOR, marginRight: '10px', width:'40px', height:'40px', lineHeight: '40px'},
                onClick: EventHandlers.handleDecrementClick
            });
            Utils.makeButtonInteractive(state.dom.decrementButton);
            
            state.dom.incrementButton = Utils.createDOMElement('button', {
                id: 'incrementBtn', className: 'ph-interactive', title: `${Utils.getLangString('button_plus')} (${CONFIG.INCREMENT_KEYBOARD_SHORTCUT_CODE})`,
                style: { ...clickerBtnSharedStyle, backgroundColor: CONFIG.CLICKER_INCREMENT_BUTTON_COLOR, color: CONFIG.CLICKER_INCREMENT_BUTTON_TEXT_COLOR, width:'55px', height:'55px', lineHeight: '55px'},
                onClick: (event) => EventHandlers.processIncrementForCurrentTab(true, event)
            });
            Utils.makeButtonInteractive(state.dom.incrementButton);

            if(CONFIG.SHOW_DECREMENT_BUTTON) clickerButtonsContainer.appendChild(state.dom.decrementButton);
            if(CONFIG.SHOW_INCREMENT_BUTTON) clickerButtonsContainer.appendChild(state.dom.incrementButton);
            state.dom.leftPane.append(state.dom.mainCounterInput, clickerButtonsContainer);

            // Divider
            state.dom.divider = Utils.createDOMElement('div', { className: 'ph-divider ph-interactive', style: { width: `${CONFIG.DIVIDER_WIDTH_PX}px`, cursor: 'ew-resize', flexShrink: 0, display: 'flex', alignItems:'center', justifyContent: 'center', backgroundColor: `${CONFIG.MAIN_ACCENT_COLOR}33`, borderRadius: '2px', opacity: 0.6 }});
            // Event listener for divider resizing will be attached by ResizableItemsManager

            // Right Pane (Stats)
            state.dom.rightPane = Utils.createDOMElement('div', { className: 'ph-right-pane ph-interactive-parent', style: { display: 'flex', flexDirection: 'column', flexGrow: 1, overflowY: 'auto', paddingLeft: `${CONFIG.DIVIDER_WIDTH_PX / 2}px`, minWidth: `${CONFIG.RIGHT_PANE_MIN_WIDTH_PERCENT}%`, fontSize: `${CONFIG.STATS_FONT_SIZE_EM}em` }});
            state.dom.statsTextSummary = Utils.createDOMElement('div', { id: 'statsSummary', style: { lineHeight: '1.4', marginBottom: '5px', overflowWrap: 'break-word' }});
            state.dom.triggerDebugDisplay = Utils.createDOMElement('div', { id: 'triggerDebugDisplay', style: { fontSize: '0.75em', marginTop: '8px', borderTop: `1px dashed ${CONFIG.UI_TEXT_COLOR}22`, paddingTop: '4px', display: 'none', maxHeight: '50px', overflowY: 'auto', opacity: '0.65', wordBreak: 'break-all'} });
            state.dom.rightPane.append(state.dom.statsTextSummary, state.dom.triggerDebugDisplay);
            
            mainContentArea.append(state.dom.leftPane, state.dom.divider, state.dom.rightPane);
            ResizableItemsManager.initInternalPaneResizing(state.dom.divider, state.dom.leftPane, state.dom.rightPane, (newFlexBasis) => {
                state.leftPaneFlexBasis = newFlexBasis;
                StorageManager.saveMainSettings(); // Save session-specific setting
            });
            state.uiContainer.appendChild(mainContentArea);

            // Bottom Info Bar
            const bottomInfoBar = Utils.createDOMElement('div', { className: 'ph-bottom-bar', style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto', paddingTop: '3px', flexShrink: 0, borderTop: `1px solid ${CONFIG.UI_TEXT_COLOR}1A`, padding: '0 3px' }});
            state.dom.uiTabIndicatorText = Utils.createDOMElement('div', { id: 'uiTabIndicator', style: { fontSize: `${CONFIG.UI_TAB_INDICATOR_FONT_SIZE_EM}em`, fontWeight: '500', opacity: 0.55 }});
            
            const timersContainer = Utils.createDOMElement('div', {className: 'ph-timers-container', style: {display: 'flex', alignItems: 'flex-end', gap: '10px'}});
            state.dom.lastActionTimerDisplay = Utils.createDOMElement('div', { id: 'lastActionTimer', style: { fontSize: `${CONFIG.TIMERS_FONT_SIZE_EM}em`, opacity: '0.7' }});
            state.dom.realTimeClock = Utils.createDOMElement('div', { id: 'realTimeClock', style: { fontSize: `${CONFIG.TIMERS_FONT_SIZE_EM}em`, opacity: '0.5' }});
            timersContainer.append(state.dom.lastActionTimerDisplay, state.dom.realTimeClock);
            bottomInfoBar.append(state.dom.uiTabIndicatorText, timersContainer);
            state.uiContainer.appendChild(bottomInfoBar);
        },

        buildPageOverlayAndIndicator: () => {
            state.dom.pageColorOverlay = Utils.createDOMElement('div', {
                id: CONFIG.PAGE_COLOR_OVERLAY_ID_SUFFIX,
                style: {
                    position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh',
                    zIndex: '2147483630', pointerEvents: 'none', display: 'none',
                    transition: 'background-color 0.3s ease'
                }
            });
            state.dom.pageIndicatorText = Utils.createDOMElement('div', {
                id: CONFIG.PAGE_INDICATOR_TEXT_ID_SUFFIX,
                style: {
                    position: 'fixed', top: '50%', right: '20px', transform: 'translateY(-50%)',
                    fontSize: `${CONFIG.PAGE_INDICATOR_FONT_SIZE_PX}px`, fontWeight: 'bold',
                    opacity: 0.75, zIndex: '2147483631', pointerEvents: 'none', display: 'none',
                    textShadow: CONFIG.NO_SHADOW_STYLE, writingMode: 'vertical-rl', textOrientation: 'mixed',
                    transition: 'color 0.3s ease, opacity 0.3s ease', userSelect: 'none'
                }
            });
        },

        buildEmergencyShowButton: () => {
            state.dom.emergencyShowButton = Utils.createDOMElement('button', {
                id: CONFIG.EMERGENCY_SHOW_BUTTON_ID_SUFFIX, textContent: CONFIG.EMERGENCY_SHOW_BUTTON_TEXT,
                className: 'ph-interactive', title: 'Show UI Panel', // Title will be updated with lang later
                style: {
                    position: 'fixed', bottom: CONFIG.UI_BOTTOM_OFFSET, right: CONFIG.UI_RIGHT_OFFSET,
                    width: CONFIG.EMERGENCY_SHOW_BUTTON_SIZE, height: CONFIG.EMERGENCY_SHOW_BUTTON_SIZE,
                    backgroundColor: `${CONFIG.MAIN_ACCENT_COLOR}${Math.floor(CONFIG.EMERGENCY_SHOW_BUTTON_OPACITY * 255).toString(16).padStart(2,'0')}`, // opacity in hex
                    border: `1px solid ${CONFIG.MAIN_ACCENT_COLOR}80`, color: CONFIG.UI_TEXT_COLOR,
                    borderRadius: '50%', cursor: 'pointer', display: 'none', alignItems: 'center',
                    justifyContent: 'center', zIndex: '2147483646',
                    transition: 'opacity 0.2s ease, transform 0.1s ease, background-color 0.2s',
                    fontSize: '18px', boxShadow: CONFIG.NO_SHADOW_STYLE, pointerEvents: 'auto'
                }
            });
            state.dom.emergencyShowButton.onmouseover = () => {
                state.dom.emergencyShowButton.style.opacity = String(CONFIG.EMERGENCY_SHOW_BUTTON_HOVER_OPACITY);
                state.dom.emergencyShowButton.style.transform = 'scale(1.1)';
                state.dom.emergencyShowButton.style.backgroundColor = CONFIG.MAIN_ACCENT_COLOR;
            };
            state.dom.emergencyShowButton.onmouseout = () => {
                state.dom.emergencyShowButton.style.opacity = String(CONFIG.EMERGENCY_SHOW_BUTTON_OPACITY);
                state.dom.emergencyShowButton.style.transform = 'scale(1)';
                state.dom.emergencyShowButton.style.backgroundColor = `${CONFIG.MAIN_ACCENT_COLOR}${Math.floor(CONFIG.EMERGENCY_SHOW_BUTTON_OPACITY * 255).toString(16).padStart(2,'0')}`;
            };
            state.dom.emergencyShowButton.onclick = () => UIManager.setUIPanelVisibility(true);
        },
        
        setInitialUIValues: () => {
            Utils.debug("Setting initial UI values...");
            // Counter
            if (state.dom.mainCounterInput) { state.dom.mainCounterInput.value = state.clicksForThisTab; EventHandlers.handleCounterInputDynamic({target: state.dom.mainCounterInput}); }
            // Panes
            if (state.dom.leftPane) state.dom.leftPane.style.flexBasis = state.leftPaneFlexBasis;
            // Visibility and themes
            UIManager.applyElementVisibilityFromState();
            UIManager.applyPageTheme();
            UIManager.updateUITabIndicatorText(); // Sets text and color
            // Controls state
            UIManager.updateUILockVisuals();
            UIManager.updateTopControlsText(); // Lang update for buttons
            // Settings Panel
            if (state.settingsPanelVisible && SettingsPanel.isInitialized()) SettingsPanel.populateAllFields();
            // Initial overall visibility (must be last for pointer events)
            UIManager.setUIPanelVisibility(state.uiPanelVisible);

            MinimalStatsDisplay.setVisibility(state.minimalStatsVisible);
            MinimalStatsDisplay.updateDisplay();
        },
        
        updateTopControlsText: () => { // For language changes
             if(state.dom.toggleSettingsButton) {
                state.dom.toggleSettingsButton.textContent = Utils.getLangString(state.settingsPanelVisible ? CONFIG.TOGGLE_SETTINGS_BUTTON_TEXT_OPENED_KEY : CONFIG.TOGGLE_SETTINGS_BUTTON_TEXT_CLOSED_KEY);
                state.dom.toggleSettingsButton.title = Utils.getLangString('settingsBtn');
             }
             if(state.dom.lockUIButton) {
                state.dom.lockUIButton.textContent = Utils.getLangString(state.uiLocked ? CONFIG.LOCK_UI_BUTTON_TEXT_LOCKED_KEY : CONFIG.LOCK_UI_BUTTON_TEXT_UNLOCKED_KEY);
                state.dom.lockUIButton.title = Utils.getLangString('uiLockBtn');
             }
             if(state.dom.emergencyHideButton) {
                state.dom.emergencyHideButton.textContent = Utils.getLangString(CONFIG.EMERGENCY_HIDE_BUTTON_TEXT_KEY);
                state.dom.emergencyHideButton.title = Utils.getLangString('closeBtn');
             }
             if(state.dom.emergencyShowButton) {
                 state.dom.emergencyShowButton.title = Utils.getLangString('show') + " UI Panel"; // Simple fallback
             }
        },

        setUIPanelVisibility: (visible) => {
            state.uiPanelVisible = visible;
            if (state.uiContainer) {
                state.uiContainer.style.opacity = visible ? '1' : '0';
                state.uiContainer.style.transform = visible ? 'translateY(0)' : `translateY(15px)`;
                state.uiContainer.style.visibility = visible ? 'visible' : 'hidden';
            }
            if (state.dom.emergencyShowButton) state.dom.emergencyShowButton.style.display = visible ? 'none' : 'flex';
            
            if (!visible && state.settingsPanelVisible) UIManager.setSettingsPanelVisibility(false); // Auto-close settings if panel hides
            
            UIManager.updatePointerEventsMode(); // Crucial: update after visibility change
            StorageManager.saveMainSettings();
        },
        
        setSettingsPanelVisibility: (visible) => {
            state.settingsPanelVisible = visible;
            if (SettingsPanel.isInitialized() && state.dom.settingsPanel) {
                // Calculate width based on vw or px limits
                const settingsWidthVw = CONFIG.SETTINGS_PANEL_WIDTH_VW;
                const settingsPanelFinalWidth = `clamp(${CONFIG.SETTINGS_PANEL_MIN_WIDTH_PX}px, ${settingsWidthVw}vw, ${CONFIG.SETTINGS_PANEL_MAX_WIDTH_PX}px)`;
                state.dom.settingsPanel.style.width = settingsPanelFinalWidth;

                state.dom.settingsPanel.style.transform = visible ? 'translateX(0%)' : `translateX(101%)`;
                if (visible) SettingsPanel.populateAllFields(); // Refresh content when shown
            }
            UIManager.updateTopControlsText(); // Update "Settings <" button text
            UIManager.updatePointerEventsMode(); // Settings panel affects overall interactivity
            if (visible && state.uiLocked) UIManager.applyUILockToElements(true); // Re-apply lock to new elements
            StorageManager.saveMainSettings();
        },

        updateUILockVisuals: () => {
            if (state.dom.lockUIButton) {
                state.dom.lockUIButton.textContent = Utils.getLangString(state.uiLocked ? CONFIG.LOCK_UI_BUTTON_TEXT_LOCKED_KEY : CONFIG.LOCK_UI_BUTTON_TEXT_UNLOCKED_KEY);
            }
        },

        applyUILockToElements: (locked) => {
            // This primarily disables form elements. Pointer events are the main control.
             const topBarButtonsToLock = [state.dom.toggleSettingsButton, state.dom.emergencyHideButton]; // Lock button itself is never locked by this
            const clickerElementsToLock = [state.dom.decrementButton, state.dom.mainCounterInput]; // Increment button never locked
            const resizableElementsToLock = [state.dom.divider]; // Main panel resize handles handled by pointer-events

            topBarButtonsToLock.forEach(el => { if (el) el.disabled = locked; });
            clickerElementsToLock.forEach(el => { if (el) el.disabled = locked; });
            // Resizable divider: pointer events will handle its interactivity
            if (state.dom.incrementButton) state.dom.incrementButton.disabled = false; // Always enabled

            if (SettingsPanel.isInitialized() && state.dom.settingsPanel) {
                state.dom.settingsPanel.querySelectorAll('input, select, textarea, button:not(.ph-settings-close-btn):not(#settingsLockUIButton)') // Exclude settings close and its own lock btn
                    .forEach(el => { el.disabled = locked; });
                 // Ensure settings close button is NOT locked by this
                 if(state.dom.settingsCloseButton) state.dom.settingsCloseButton.disabled = false;
            }
            UIManager.updatePointerEventsMode(); // Re-evaluate interactivity after lock state change
        },
        
        updatePointerEventsMode: () => {
            if (!state.uiContainer || !UIManager.isInitialized()) return;

            const isPanelEffectivelyVisible = state.uiPanelVisible && state.uiContainer.style.visibility !== 'hidden';

            // Default: all text non-interactive, main container click-through
            Utils.applyElementInteractivity(state.uiContainer, false);
            Array.from(state.uiContainer.querySelectorAll('p, span:not(.ph-interactive), div:not(.ph-interactive):not(.ph-interactive-parent)'))
                 .forEach(el => Utils.applyElementInteractivity(el, false));

            if (!isPanelEffectivelyVisible) {
                UIManager.applyDebugPointerEventBorders();
                return;
            }
            
            // Top bar buttons: always interactive unless UI is locked (lock button itself is an exception)
            [state.dom.toggleSettingsButton, state.dom.emergencyHideButton].forEach(btn => Utils.applyElementInteractivity(btn, !state.uiLocked, 'pointer'));
            Utils.applyElementInteractivity(state.dom.lockUIButton, true, 'pointer'); // Lock button always interactive

            // Settings panel: interactive if open
            if (state.settingsPanelVisible && SettingsPanel.isInitialized()) {
                Utils.applyElementInteractivity(state.dom.settingsPanel, true);
                 state.dom.settingsPanel.querySelectorAll('.ph-interactive, input, select, textarea, button').forEach(el => {
                    const elIsLockExempt = el === state.dom.settingsCloseButton || el === state.dom.settingsLockUIButton; // Example IDs if such buttons exist in settings
                    Utils.applyElementInteractivity(el, !state.uiLocked || elIsLockExempt, el.tagName === 'BUTTON' || el.tagName === 'SELECT' ? 'pointer' : 'text');
                 });
                 if(state.dom.settingsCloseButton) Utils.applyElementInteractivity(state.dom.settingsCloseButton, true, 'pointer');
            } else if (SettingsPanel.isInitialized() && state.dom.settingsPanel) {
                 Utils.applyElementInteractivity(state.dom.settingsPanel, false);
            }

            // Divider: interactive if not locked and not currently resizing main panel border
            if (state.dom.divider) Utils.applyElementInteractivity(state.dom.divider, !state.uiLocked && !state.isResizingPanel, 'ew-resize');

            // Main panel resize handles: interactive if not locked
            state.uiContainer.querySelectorAll('.ph-resize-handle').forEach(h => Utils.applyElementInteractivity(h, !state.uiLocked, h.style.cursor || 'default'));
            
            // Clicker elements
            const incrementBtnInteractive = CONFIG.SHOW_INCREMENT_BUTTON && !state.uiLocked; // Increment always active if not locked
            Utils.applyElementInteractivity(state.dom.incrementButton, incrementBtnInteractive, 'pointer');
            if (CONFIG.SHOW_DECREMENT_BUTTON && state.dom.decrementButton) {
                Utils.applyElementInteractivity(state.dom.decrementButton, !state.uiLocked, 'pointer');
            }
            if (state.dom.mainCounterInput) {
                Utils.applyElementInteractivity(state.dom.mainCounterInput, !state.uiLocked, 'text');
            }

            // Apply mode-specific overrides
            switch (state.pointerEventsMode) {
                case 'fully_interactive':
                    Utils.applyElementInteractivity(state.uiContainer, true); // Main container blocks clicks
                    break;
                case 'default_transparent_buttons_active':
                    // Base behavior is already click-through for container, buttons handled above
                    break;
                case 'fully_click_through':
                    // Top bar still active. Make clicker elements non-interactive *except* increment button.
                    if (CONFIG.SHOW_DECREMENT_BUTTON && state.dom.decrementButton) Utils.applyElementInteractivity(state.dom.decrementButton, false);
                    if (state.dom.mainCounterInput) Utils.applyElementInteractivity(state.dom.mainCounterInput, false);
                    // Increment button handled by general rule (active if not locked)
                    break;
                case 'windows_watermark':
                    // ALL clicker elements (including increment) become non-interactive
                    Utils.applyElementInteractivity(state.dom.incrementButton, false);
                    if (CONFIG.SHOW_DECREMENT_BUTTON && state.dom.decrementButton) Utils.applyElementInteractivity(state.dom.decrementButton, false);
                    if (state.dom.mainCounterInput) Utils.applyElementInteractivity(state.dom.mainCounterInput, false);
                    // Make sure the divider is also non-interactive in watermark mode unless resizing panel.
                    if (state.dom.divider && !state.isResizingPanel) Utils.applyElementInteractivity(state.dom.divider, false);
                    // Main panel resize handles should remain active if !uiLocked
                    state.uiContainer.querySelectorAll('.ph-resize-handle').forEach(h => Utils.applyElementInteractivity(h, !state.uiLocked, h.style.cursor || 'default'));

                    break;
            }
            
            // If main panel is being resized, it must be interactive regardless of mode
            if (state.isResizingPanel) {
                 Utils.applyElementInteractivity(state.uiContainer, true);
            }

            UIManager.applyDebugPointerEventBorders();
        },

        applyDebugPointerEventBorders: () => {
            const elementsToTest = state.uiContainer ? [state.uiContainer, ...state.uiContainer.querySelectorAll('*')] : [];
            if (MinimalStatsDisplay.isInitialized && state.dom.minimalStatsContainer) {
                elementsToTest.push(state.dom.minimalStatsContainer, ...state.dom.minimalStatsContainer.querySelectorAll('*'));
            }

            elementsToTest.forEach(el => { if(el.style) { el.style.outline = ''; el.style.outlineOffset = ''; }});

            if (state.debugPointerEventBorders) {
                elementsToTest.forEach(el => {
                    if (!el.style) return;
                    const computedPE = getComputedStyle(el).pointerEvents;
                    if (computedPE === 'auto' || computedPE === 'all' || (el.tagName === 'BUTTON' && computedPE !== 'none')) {
                        el.style.outline = '1px dashed red'; // Interactive
                    } else if (computedPE === 'none') {
                        el.style.outline = '1px dotted dodgerblue'; // Non-interactive
                    }
                    el.style.outlineOffset = '1px';
                });
                if (state.uiContainer) state.uiContainer.style.outline = `2px solid ${getComputedStyle(state.uiContainer).pointerEvents === 'none' ? 'blue' : 'green'}`;
                if (MinimalStatsDisplay.isInitialized && state.dom.minimalStatsContainer) {
                    state.dom.minimalStatsContainer.style.outline = `2px solid ${getComputedStyle(state.dom.minimalStatsContainer).pointerEvents === 'none' ? 'blue' : 'orange'}`;
                }
            }
        },

        applyElementVisibilityFromState: () => {
            if (!UIManager.isInitialized()) return;
            const setDisp = (el, show) => { if(el) el.style.display = show ? (el.tagName === 'DIV' || el.tagName==='P' ? 'block' : 'inline-block') : 'none';};
            
            setDisp(state.dom.realTimeClock, state.showClock);
            setDisp(state.dom.statsTextSummary, state.showStats);
            setDisp(state.dom.lastActionTimerDisplay, state.showLastActionTimer);
            setDisp(state.dom.uiTabIndicatorText, state.showUITabIndicator);
            setDisp(state.dom.triggerDebugDisplay, state.showTriggerDebug);
            // Page overlay visibility is handled in applyPageTheme
        },

        applyPageTheme: () => {
            if (!UIManager.isInitialized()) return;
            const mode = state.customTabThemes[state.currentTabFullUrl] || state.currentTabModeDetails;
            if (state.dom.pageColorOverlay) {
                state.dom.pageColorOverlay.style.backgroundColor = mode.color;
                state.dom.pageColorOverlay.style.display = state.showPageOverlay ? 'block' : 'none';
            }
            if (state.dom.pageIndicatorText) {
                state.dom.pageIndicatorText.textContent = mode.name.substring(0,10).toUpperCase();
                state.dom.pageIndicatorText.style.color = mode.textColor;
                state.dom.pageIndicatorText.style.display = state.showPageIndicatorText ? 'block' : 'none';
            }
        },
        
        updateUITabIndicatorText: () => {
            if(state.dom.uiTabIndicatorText) {
                const mode = state.customTabThemes[state.currentTabFullUrl] || state.currentTabModeDetails;
                state.dom.uiTabIndicatorText.textContent = mode.name;
                state.dom.uiTabIndicatorText.style.color = mode.textColor || CONFIG.UI_TEXT_COLOR;
            }
        },
        
        updateCounterDisplay: () => {
            if (state.dom.mainCounterInput) {
                state.dom.mainCounterInput.value = state.clicksForThisTab;
                EventHandlers.handleCounterInputDynamic({target: state.dom.mainCounterInput});
            }
        },
        updateRealTimeClockDisplay: () => {
            if(state.dom.realTimeClock && state.showClock) {
                state.dom.realTimeClock.textContent = Utils.formatDateToHHMM(new Date(), true);
            }
        },
        updateLastActionTimerDisplay: () => {
            if (!state.dom.lastActionTimerDisplay || !state.showLastActionTimer) {
                if(state.dom.lastActionTimerDisplay) state.dom.lastActionTimerDisplay.style.display = 'none';
                return;
            }
            state.dom.lastActionTimerDisplay.style.display = 'inline-block'; // Or block depending on layout
            const elapsedMs = Date.now() - state.lastActionTimestampForThisTab;
            state.dom.lastActionTimerDisplay.textContent = `${Utils.getLangString('stats_lastAction')}: ${Utils.formatMsToDuration(elapsedMs, true, true).replace(/^0h\s*/, '').replace(/^0m\s*/, '')}`;
            const isWarn = elapsedMs > CONFIG.LAST_ACTION_TIMER_WARN_SECONDS * 1000;
            state.dom.lastActionTimerDisplay.style.color = isWarn ? CONFIG.LAST_ACTION_TIMER_WARN_COLOR : CONFIG.UI_TEXT_COLOR;
            state.dom.lastActionTimerDisplay.style.fontWeight = isWarn ? 'bold' : 'normal';
            state.dom.lastActionTimerDisplay.style.opacity = isWarn ? '0.9' : '0.7';
        },
        updateStatisticsDisplay: () => {
            if (!state.dom.statsTextSummary || !state.showStats) {
                if(state.dom.statsTextSummary) state.dom.statsTextSummary.innerHTML = '';
                return;
            }
            state.dom.statsTextSummary.style.display = 'block';
            if (!state.shiftStartTime) {
                state.dom.statsTextSummary.innerHTML = `<p style="color:red;">${Utils.getLangString('error')}: Shift start not set!</p>`;
                return;
            }
            if (!state.currentDepartment || state.currentDepartment === CONFIG.DEPARTMENTS.DETERMINING) {
                 state.dom.statsTextSummary.innerHTML = `<p>${Utils.getLangString('determiningDepartment')}</p>`;
                return;
            }

            const effectiveWorkMs = ShiftManager.calculateEffectiveWorkTimeMs();
            const hoursWorked = effectiveWorkMs / (1000 * 60 * 60);
            const T = Utils.getLangString; // Shorthand for localization

            const deptCounts = StatsCalculator.getDepartmentCounts();
            let itemsForGlobalRate = 0;
            // Determine which count to use for the global rate based on department
            switch(state.currentDepartment) {
                case CONFIG.DEPARTMENTS.UG: itemsForGlobalRate = deptCounts.TOTAL; break;
                case CONFIG.DEPARTMENTS.BK: itemsForGlobalRate = deptCounts.TOTAL_BK; break; // BK uses C+W for rate
                case CONFIG.DEPARTMENTS.RB: itemsForGlobalRate = deptCounts.REFURB; break; // RB uses REFURB for rate
                case CONFIG.DEPARTMENTS.CR: itemsForGlobalRate = deptCounts.CRET; break;
                case CONFIG.DEPARTMENTS.WD: itemsForGlobalRate = deptCounts.WHD; break;
                case CONFIG.DEPARTMENTS.RB_ONLY: itemsForGlobalRate = deptCounts.REFURB; break;
                default: itemsForGlobalRate = deptCounts.TOTAL; // Fallback for UNKNOWN, sum of all contributing
            }
            
            const globalItemsPerHour = (hoursWorked > 0.001 && itemsForGlobalRate > 0) ? (itemsForGlobalRate / hoursWorked) : 0;

            // For "This Tab" rate, always use this tab's clicks
            const thisTabItemsPerHour = (hoursWorked > 0.001) ? (state.clicksForThisTab / hoursWorked) : 0;


            let statsHTML = `<p style="margin-bottom: 2px;">${T('stats_shift')}: <strong>${Utils.formatDateToHHMM(state.shiftStartTime)}</strong> (${T('shiftType_' + state.shiftType) || state.shiftType})</p>
                             <p style="margin-bottom: 5px;">${T('stats_lunch')}: ${state.selectedLunchOption ? T(state.selectedLunchOption.text_key).replace(/\s\(.+\)/,'') : 'N/A'}</p>
                             <div style="font-size:0.9em; margin-bottom: 3px;">${T('department')}: <strong>${DepartmentManager.getDepartmentDisplayName()}</strong></div>
                             <div style="display:flex; justify-content:space-around; gap: 8px; border-top: 1px solid ${CONFIG.UI_TEXT_COLOR}1A; padding-top: 5px;">
                                <div style="text-align:center;">
                                    <div><u>${T('stats_thisTab')} (${state.currentTabModeDetails.name})</u></div>
                                    <div>${T('stats_items')}: <strong>${state.clicksForThisTab}</strong></div>
                                    <div><strong style="color:${CONFIG.MAIN_ACCENT_COLOR};font-size:1.1em;">${thisTabItemsPerHour.toFixed(1)}</strong>${T('stats_perHour')}</div>
                                </div>
                                <div style="text-align:center; border-left: 1px solid ${CONFIG.UI_TEXT_COLOR}2A; padding-left:8px;">
                                    <div><u>${T('stats_global')}</u></div>
                                    <div>${T('stats_total')}: <strong>${T('stats_format_total_items_bare', state.currentDepartment, deptCounts, T)}</strong></div>
                                    <div><strong style="color:${CONFIG.MAIN_ACCENT_COLOR};font-size:1.1em;">${globalItemsPerHour.toFixed(1)}</strong>${T('stats_perHour')}</div>
                                </div>
                             </div>
                             <div style="font-size:0.8em; opacity:0.7; text-align:center; margin-top:2px;">(${T('stats_workedTime')}: ${Utils.formatMsToDuration(effectiveWorkMs, false, true)})</div>`;
            
            const otherTabsArray = Object.values(state.otherTabsData).filter(td => td.tabId !== state.currentTabId);
            if (otherTabsArray.length > 0) {
                statsHTML += `<div style="font-size:0.75em; margin-top:5px; border-top:1px solid ${CONFIG.UI_TEXT_COLOR}1A; padding-top:3px; max-height: 35px; overflow-y:auto; opacity: 0.75;">
                                <strong>${T('stats_otherTabsSummary')}:</strong> ${otherTabsArray.map(td => `${td.modeName||td.tabId.substring(0,10)}: ${td.clicks}${td.contributesToTotal?'<span title="Contributing">✓</span>':'<span title="Not Cntr.">x</span>'}`).join('; ')}
                              </div>`;
            }
            state.dom.statsTextSummary.innerHTML = statsHTML;
        },

        refreshUIForLanguageChange: () => {
            if (!UIManager.isInitialized()) return;
            Utils.info("Refreshing UI for language change to:", state.currentLanguage);
            
            UIManager.updateTopControlsText();
            // Update all static text in the main panel if any (most are dynamic)
            UIManager.updateStatisticsDisplay(); // Contains localized strings
            UIManager.updateLastActionTimerDisplay(); // "Last Action:" part

            if (MinimalStatsDisplay.isInitialized) {
                MinimalStatsDisplay.updateDisplay(); // Minimal stats also have localized parts
                if (MinimalStatsDisplay.dragHandle) { // Update drag handle text
                    MinimalStatsDisplay.dragHandle.textContent = Utils.getLangString(CONFIG.MINIMAL_STATS_DRAG_HANDLE_TEXT_KEY);
                    MinimalStatsDisplay.dragHandle.title = Utils.getLangString('minimalStats_editPosition');
                }
            }

            if (SettingsPanel.isInitialized()) {
                SettingsPanel.rebuildOrRelocalize(); // Tell settings panel to update its static texts
            }
            // Counter buttons titles
            if(state.dom.decrementButton) state.dom.decrementButton.title = Utils.getLangString('button_minus');
            if(state.dom.incrementButton) state.dom.incrementButton.title = `${Utils.getLangString('button_plus')} (${CONFIG.INCREMENT_KEYBOARD_SHORTCUT_CODE})`;

            // Update trigger debug display section headers if any are static
            AutoIncrementer.updateTriggerDebugDisplay(state.autoClickerInitialTriggerFound || state.autoClickerFinalTriggerFound, []);


        }
    };
    
    // --- ------------------------------------------------------------------------ ---
    // --- -------------------------- AUTO INCREMENTER -------------------------- ---
    // --- ------------------------------------------------------------------------ ---
    const AutoIncrementer = {
        debounceTimer: null,
        
        init: () => {
            if (state.mutationObserver) state.mutationObserver.disconnect();
            if (!state.autoClickEnabled) {
                 Utils.debug("AutoIncrementer: Not initializing, autoClick is disabled.");
                 return;
            }

            const observeTargetNode = document.querySelector(CONFIG.TRIGGER_OBSERVE_AREA_SELECTOR) || document.body;
            
            const processMutationsDebounced = Utils.debounce(() => {
                if (!state.autoClickEnabled) {
                    AutoIncrementer.resetInternalState(); // Reset if disabled during debounce
                    return;
                }
                AutoIncrementer.evaluateTriggers(observeTargetNode);
            }, CONFIG.AUTO_CLICK_REFRESH_RATE_MS);

            state.mutationObserver = new MutationObserver(processMutationsDebounced);
            state.mutationObserver.observe(observeTargetNode, { childList: true, subtree: true, characterData: true, attributes: false });
            
            // Initial check in case triggers are already present
            setTimeout(() => AutoIncrementer.evaluateTriggers(observeTargetNode), 250);
            Utils.info("AutoIncrementer initialized. State:", state.autoClickerInternalState);
        },

        disconnect: () => {
            if (state.mutationObserver) {
                state.mutationObserver.disconnect();
                state.mutationObserver = null;
                Utils.info("AutoIncrementer disconnected.");
            }
            clearTimeout(AutoIncrementer.debounceTimer);
            AutoIncrementer.resetInternalState(); // Clear state on disconnect
        },

        resetInternalState: () => {
            state.autoClickerInternalState = 'IDLE';
            state.autoClickerInitialTriggerFound = false;
            state.autoClickerFinalTriggerFound = false;
             if(state.initialized) AutoIncrementer.updateTriggerDebugDisplay();
        },
        
        evaluateTriggers: (observeTargetNode) => {
            // To avoid self-triggering from UI, temporarily hide UI if it's part of observed area
            let pageTextContent = "";
            const uiWasVisible = state.uiContainer && getComputedStyle(state.uiContainer).visibility !== 'hidden';
            if (uiWasVisible && state.uiContainer && observeTargetNode.contains(state.uiContainer)) {
                state.uiContainer.style.visibility = 'hidden';
            }
            try {
                pageTextContent = observeTargetNode.innerText || observeTargetNode.textContent || "";
            } finally {
                 if (uiWasVisible && state.uiContainer && observeTargetNode.contains(state.uiContainer)) {
                    state.uiContainer.style.visibility = 'visible';
                }
            }
            
            const initialTriggerPresent = new RegExp(`\\b${CONFIG.INITIAL_TRIGGER_TEXT}\\b`, 'i').test(pageTextContent);
            let finalTriggerText = '';
            if (state.currentTabType === CONFIG.TAB_TYPES.CRET) finalTriggerText = CONFIG.FINAL_TRIGGER_TEXT_CRET;
            else if (state.currentTabType === CONFIG.TAB_TYPES.WHD || state.currentTabType === CONFIG.TAB_TYPES.REFURB) finalTriggerText = CONFIG.FINAL_TRIGGER_TEXT_WHD_REFURB;
            
            const finalTriggerPresent = finalTriggerText ? new RegExp(`\\b${finalTriggerText}\\b`, 'i').test(pageTextContent) : false;

            // Update internal flags for debug display BEFORE state transitions
            state.autoClickerInitialTriggerFound = initialTriggerPresent;
            state.autoClickerFinalTriggerFound = finalTriggerPresent;

            // State machine logic
            switch (state.autoClickerInternalState) {
                case 'IDLE':
                    if (initialTriggerPresent) {
                        state.autoClickerInternalState = 'ITEM_STARTED_PONIŻEJ';
                        Utils.debug("AutoClicker: IDLE -> ITEM_STARTED_PONIŻEJ (Initial trigger found)");
                    }
                    break;
                case 'ITEM_STARTED_PONIŻEJ':
                    if (finalTriggerPresent && finalTriggerText) {
                        state.autoClickerInternalState = 'FINALIZE_DETECTED_PRZYPISZ';
                        Utils.debug("AutoClicker: ITEM_STARTED_PONIŻEJ -> FINALIZE_DETECTED_PRZYPISZ (Final trigger found)");
                    } else if (!initialTriggerPresent) {
                        // Initial trigger disappeared before final one - reset
                        state.autoClickerInternalState = 'IDLE';
                        Utils.debug("AutoClicker: ITEM_STARTED_PONIŻEJ -> IDLE (Initial trigger disappeared)");
                    }
                    break;
                case 'FINALIZE_DETECTED_PRZYPISZ':
                    if (!finalTriggerPresent && finalTriggerText) { // Final trigger disappeared
                        EventHandlers.processIncrementForCurrentTab(false); // Increment!
                        state.autoClickerInternalState = 'IDLE';
                        Utils.debug("AutoClicker: FINALIZE_DETECTED_PRZYPISZ -> IDLE (Final trigger disappeared - INCREMENTED)");
                    } else if (initialTriggerPresent && !finalTriggerPresent) {
                        // This case means final trigger disappeared, but initial is still there (or re-appeared).
                        // This might happen if the page refreshes just right.
                        // Let's assume the disappearance of the final trigger is the primary event for increment.
                        // If that leads to double counts, this needs refinement based on page behavior.
                        // For now, this path is covered by the above `!finalTriggerPresent`
                    } else if (!initialTriggerPresent && !finalTriggerPresent) {
                         // Both disappeared - might have incremented or something else happened
                         state.autoClickerInternalState = 'IDLE';
                         Utils.debug("AutoClicker: FINALIZE_DETECTED_PRZYPISZ -> IDLE (Both triggers disappeared)");
                    }
                    break;
            }
            AutoIncrementer.updateTriggerDebugDisplay();
        },

        updateTriggerDebugDisplay: () => {
            if (!state.dom.triggerDebugDisplay || !state.showTriggerDebug) {
                if(state.dom.triggerDebugDisplay) state.dom.triggerDebugDisplay.style.display = 'none';
                return;
            }
            state.dom.triggerDebugDisplay.style.display = 'block';
            const T = Utils.getLangString;
            
            let html = `<strong>${T('debug_autoClickerState')}:</strong> ${state.autoClickerInternalState}<br>`;
            html += `<span>${T('debug_initialTrigger')} (${CONFIG.INITIAL_TRIGGER_TEXT.substring(0,10)}..): ${state.autoClickerInitialTriggerFound ? `<strong style="color:lightgreen;">${T('debug_found')}</strong>` : T('debug_notFound')}</span><br>`;
            
            let finalTriggerKey = '';
            let finalTriggerShort = '';
            if (state.currentTabType === CONFIG.TAB_TYPES.CRET) {
                finalTriggerKey = 'debug_finalCRETTrigger';
                finalTriggerShort = CONFIG.FINAL_TRIGGER_TEXT_CRET.substring(0,10) + "..";
            } else if (state.currentTabType === CONFIG.TAB_TYPES.WHD || state.currentTabType === CONFIG.TAB_TYPES.REFURB) {
                finalTriggerKey = 'debug_finalWHDREFTrigger';
                finalTriggerShort = CONFIG.FINAL_TRIGGER_TEXT_WHD_REFURB.substring(0,10) + "..";
            }

            if(finalTriggerKey) {
                 html += `<span>${T(finalTriggerKey)} (${finalTriggerShort}): ${state.autoClickerFinalTriggerFound ? `<strong style="color:lightgreen;">${T('debug_found')}</strong>` : T('debug_notFound')}</span><br>`;
            }


            // Find and display paths if any trigger is found
            if (CONFIG.DEBUG_MODE && (state.autoClickerInitialTriggerFound || state.autoClickerFinalTriggerFound)) {
                const root = document.querySelector(CONFIG.TRIGGER_OBSERVE_AREA_SELECTOR) || document.body;
                let paths = [];
                if(state.autoClickerInitialTriggerFound) {
                    paths = paths.concat(AutoIncrementer.findElementsContainingText(root, CONFIG.INITIAL_TRIGGER_TEXT));
                }
                if(state.autoClickerFinalTriggerFound) {
                     let finalTriggerWord = "";
                     if (state.currentTabType === CONFIG.TAB_TYPES.CRET) finalTriggerWord = CONFIG.FINAL_TRIGGER_TEXT_CRET;
                     else if (state.currentTabType === CONFIG.TAB_TYPES.WHD || state.currentTabType === CONFIG.TAB_TYPES.REFURB) finalTriggerWord = CONFIG.FINAL_TRIGGER_TEXT_WHD_REFURB;
                     if (finalTriggerWord) paths = paths.concat(AutoIncrementer.findElementsContainingText(root, finalTriggerWord));
                }
                // Deduplicate paths
                paths = [...new Set(paths)];

                if (paths.length > 0) {
                    html += `<strong>${T('debug_paths')}:</strong> ${paths.slice(0, CONFIG.TRIGGER_DEBUG_MAX_PATHS).map(p=>`<code>${p.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</code>`).join('; ')}`;
                }
            }
            state.dom.triggerDebugDisplay.innerHTML = html;
        },
        
        findElementsContainingText: (rootElement, searchText) => {
            const paths = new Set();
            if (!rootElement || !searchText) return [];

            // Temporarily hide own UI to prevent self-detection in paths
            const uiWasVisible = state.uiContainer && getComputedStyle(state.uiContainer).visibility !== 'hidden';
            if (uiWasVisible && state.uiContainer && rootElement.contains(state.uiContainer)) {
                 state.uiContainer.style.visibility = 'hidden';
            }

            try {
                const walker = document.createTreeWalker(rootElement, NodeFilter.SHOW_TEXT, {
                    acceptNode: (node) => {
                        if (state.uiContainer && state.uiContainer.contains(node.parentElement)) return NodeFilter.FILTER_REJECT;
                        if (node.nodeValue && node.nodeValue.toLowerCase().includes(searchText.toLowerCase())) return NodeFilter.FILTER_ACCEPT;
                        return NodeFilter.FILTER_REJECT;
                    }
                });
                let node;
                while ((node = walker.nextNode()) && paths.size < CONFIG.TRIGGER_DEBUG_MAX_PATHS) {
                    const path = Utils.getUniqueSelectorPath(node.parentElement, 4); // Limit path depth
                    if (path) paths.add(path);
                }
            } finally {
                if (uiWasVisible && state.uiContainer && rootElement.contains(state.uiContainer)) {
                     state.uiContainer.style.visibility = 'visible';
                }
            }
            return Array.from(paths);
        }
    };

    // --- ------------------------------------------------------------------------ ---
    // --- ------------------------- SETTINGS PANEL ----------------------------- ---
    // --- ------------------------------------------------------------------------ ---
    const SettingsPanel = { // Structure based on v3.4, adapted for new settings and i18n
        _isInitialized: false,

        isInitialized: () => SettingsPanel._isInitialized,
        
        build: () => {
            if (!state.uiContainer) { Utils.error("SettingsPanel: Main UI container not found."); return; }
             // Calculate width: clamp(min_px, vw_val, max_px)
            const settingsWidthVw = CONFIG.SETTINGS_PANEL_WIDTH_VW;
            const settingsPanelFinalWidth = `clamp(${CONFIG.SETTINGS_PANEL_MIN_WIDTH_PX}px, ${settingsWidthVw}vw, ${CONFIG.SETTINGS_PANEL_MAX_WIDTH_PX}px)`;

            state.dom.settingsPanel = Utils.createDOMElement('div', {
                id: CONFIG.SETTINGS_PANEL_ID_SUFFIX, className: 'ph-settings-panel ph-interactive-parent',
                style: {
                    position: 'absolute', top: '0px', right: '0px', bottom: '0px',
                    width: settingsPanelFinalWidth, // Dynamic width
                    backgroundColor: CONFIG.SETTINGS_PANEL_BACKGROUND,
                    borderLeft: `2px solid ${CONFIG.SETTINGS_PANEL_BORDER_COLOR}`,
                    padding: '12px 18px', zIndex: '10', // Above main panel content
                    display: 'flex', flexDirection: 'column', gap: '8px',
                    overflowY: 'auto', overflowX: 'hidden',
                    boxShadow: CONFIG.NO_SHADOW_STYLE, // No shadow for settings panel itself
                    transform: 'translateX(101%)', // Start off-screen
                    transition: 'transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1), width 0.1s ease-out',
                    pointerEvents: 'none' // Managed by UIManager
                }
            });
            SettingsPanel._isInitialized = true; // Mark as initialized once DOM exists
            SettingsPanel.rebuildOrRelocalize(); // Populate with content
            state.uiContainer.appendChild(state.dom.settingsPanel);
        },

        rebuildOrRelocalize: () => { // Used for initial build and language change
            if (!SettingsPanel.isInitialized()) return;
            state.dom.settingsPanel.innerHTML = ''; // Clear existing content

            const T = Utils.getLangString;
            const commonInputStyle = {width: '100%', padding: '7px', boxSizing: 'border-box', backgroundColor: 'rgba(20,20,30,0.6)', color: CONFIG.SETTINGS_PANEL_TEXT_COLOR, border: `1px solid ${CONFIG.MAIN_ACCENT_COLOR}aa`, borderRadius: '3px', fontSize: '0.85em', pointerEvents: 'auto', userSelect: 'auto', cursor:'text'};
            const commonSelectStyle = {...commonInputStyle, cursor: 'pointer'};
            const commonLabelStyle = { display: 'block', marginBottom: '2px', fontSize: '0.8em', color: `${CONFIG.SETTINGS_PANEL_TEXT_COLOR}cc`};
            const checkboxRowStyle = { display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '0.85em', color: `${CONFIG.SETTINGS_PANEL_TEXT_COLOR}dd`, margin: '5px 0', pointerEvents:'auto', userSelect:'none' };
            const checkboxStyle = { marginRight: '8px', transform: 'scale(1.15)', accentColor: CONFIG.MAIN_ACCENT_COLOR, cursor:'pointer', pointerEvents:'auto' };

            const createSection = (titleKey, elements, sectionId = null) => {
                const section = Utils.createDOMElement('div', {className: 'ph-settings-section'});
                if(sectionId) section.id = CONFIG.SCRIPT_ID_PREFIX + sectionId;
                if (titleKey) section.appendChild(Utils.createDOMElement('h4', { textContent: T(titleKey), style: {margin: '12px 0 6px 0', color: CONFIG.SETTINGS_PANEL_TEXT_COLOR, fontSize: '1em', borderBottom: `1px solid ${CONFIG.SETTINGS_PANEL_TEXT_COLOR}33`, paddingBottom: '4px'} }));
                elements.forEach(el => section.appendChild(el));
                return section;
            };
            
            // --- Heading ---
            const heading = Utils.createDOMElement('h3', { textContent: T('settingsBtn'), style: { marginTop: '0', marginBottom: '10px', textAlign: 'center', color: CONFIG.SETTINGS_PANEL_TEXT_COLOR, fontSize: '1.15em'} });
            state.dom.settingsPanel.appendChild(heading);

            // --- Language Selector ---
            state.dom.languageSelect = Utils.createDOMElement('select', { id: 'languageSelect', style: commonSelectStyle, className:'ph-interactive', onChange: EventHandlers.handleLanguageChange });
            CONFIG.AVAILABLE_LANGUAGES.forEach(lang => state.dom.languageSelect.add(new Option(lang.name, lang.code)));
            state.dom.settingsPanel.appendChild(createSection(null, [Utils.createDOMElement('label', { htmlFor: state.dom.languageSelect.id, textContent: T('language_select'), style: commonLabelStyle }), state.dom.languageSelect ]));

            // --- Pointer Events Mode ---
            state.dom.pointerEventsModeSelect = Utils.createDOMElement('select', { id: 'pointerEventsModeSelect', style: commonSelectStyle, className:'ph-interactive', onChange: EventHandlers.handlePointerModeChange });
            CONFIG.POINTER_EVENTS_MODES.forEach(opt => state.dom.pointerEventsModeSelect.add(new Option(T(opt.text_key), opt.value)));
            state.dom.settingsPanel.appendChild(createSection('peMode_title', [ Utils.createDOMElement('label', { htmlFor: state.dom.pointerEventsModeSelect.id, textContent: T('peMode_label'), style: commonLabelStyle }), state.dom.pointerEventsModeSelect ]));

            // --- Shift & Lunch ---
            state.dom.settingsShiftTypeSelect = Utils.createDOMElement('select', { id: 'shiftTypeSelect', style: commonSelectStyle, className:'ph-interactive', onChange: EventHandlers.handleShiftSettingsChange });
            // Options added in populateAllFields
            state.dom.settingsShiftStartTimeInput = Utils.createDOMElement('input', { type: 'time', id: 'shiftStartTimeInput', style: commonInputStyle, className:'ph-interactive', onChange: EventHandlers.handleShiftSettingsChange });
            state.dom.settingsLunchSelect = Utils.createDOMElement('select', { id: 'lunchSelect', style: commonSelectStyle, className:'ph-interactive', onChange: EventHandlers.handleLunchSettingChange });
            // Options added in populateAllFields
            state.dom.settingsPanel.appendChild(createSection('shiftLunch_title', [
                Utils.createDOMElement('label', { htmlFor: state.dom.settingsShiftTypeSelect.id, textContent: T('shiftType'), style: commonLabelStyle }), state.dom.settingsShiftTypeSelect,
                Utils.createDOMElement('label', { htmlFor: state.dom.settingsShiftStartTimeInput.id, textContent: T('shiftStartManual'), style: {...commonLabelStyle, marginTop:'6px'} }), state.dom.settingsShiftStartTimeInput,
                Utils.createDOMElement('label', { htmlFor: state.dom.settingsLunchSelect.id, textContent: T('lunchBreak'), style: {...commonLabelStyle, marginTop:'6px'} }), state.dom.settingsLunchSelect,
            ]));

            // --- Department Info (Display Only) ---
            state.dom.departmentInfoDisplay = Utils.createDOMElement('div', {id: 'departmentInfoDisplay', style: { padding: '5px', backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: '3px', fontSize: '0.8em', color: `${CONFIG.SETTINGS_PANEL_TEXT_COLOR}bb` }});
            state.dom.settingsPanel.appendChild(createSection('department', [state.dom.departmentInfoDisplay]));
            
            // --- Automation & Contribution ---
            state.dom.autoClickEnabledCheckbox = Utils.createDOMElement('input', { type: 'checkbox', id: 'autoClickEnableCb', style: checkboxStyle, className:'ph-interactive', onChange: EventHandlers.handleAutoClickSettingChange });
            const autoClickLabel = Utils.createDOMElement('label', {htmlFor: state.dom.autoClickEnabledCheckbox.id, textContent: T('automation_autoIncrement'), style:checkboxRowStyle, className:'ph-interactive'}, [state.dom.autoClickEnabledCheckbox]);
            
            state.dom.currentTabContributesCheckbox = Utils.createDOMElement('input', {type: 'checkbox', id: 'currentTabContributesCb', style: checkboxStyle, className:'ph-interactive', onChange: EventHandlers.handleCurrentTabContributionChange });
            const currentTabContributeLabel = Utils.createDOMElement('label', {htmlFor: state.dom.currentTabContributesCheckbox.id, textContent: T('automation_contributesToGlobal'), style: checkboxRowStyle, className:'ph-interactive' }, [state.dom.currentTabContributesCheckbox]);
            state.dom.otherTabsSettingsContainer = Utils.createDOMElement('div', {id: 'otherTabsSettingsContainer', style: {marginLeft: '20px', marginTop: '1px', fontSize: '0.9em'}});
            state.dom.settingsPanel.appendChild(createSection('automation_title', [ autoClickLabel, currentTabContributeLabel, state.dom.otherTabsSettingsContainer ]));

            // --- Minimal Stats Settings ---
            const minimalStatsElements = [];
            state.dom.minimalStatsEnabledCheckbox = Utils.createDOMElement('input', {type:'checkbox', id:'minimalStatsEnableCb', style: checkboxStyle, className:'ph-interactive', onChange: EventHandlers.handleMinimalStatsEnableChange});
            minimalStatsElements.push(Utils.createDOMElement('label', {htmlFor: state.dom.minimalStatsEnabledCheckbox.id, textContent: T('minimalStats_enable'), style:checkboxRowStyle, className:'ph-interactive'}, [state.dom.minimalStatsEnabledCheckbox]));

            state.dom.minimalStatsShowTotalCheckbox = Utils.createDOMElement('input', {type:'checkbox', id:'minimalStatsShowTotalCb', style: checkboxStyle, className:'ph-interactive', onChange: EventHandlers.handleMinimalStatsDetailChange});
            minimalStatsElements.push(Utils.createDOMElement('label', {htmlFor: state.dom.minimalStatsShowTotalCheckbox.id, textContent: T('minimalStats_showTotal'), style:checkboxRowStyle, className:'ph-interactive'}, [state.dom.minimalStatsShowTotalCheckbox]));
            
            state.dom.minimalStatsShowPerHourCheckbox = Utils.createDOMElement('input', {type:'checkbox', id:'minimalStatsShowPerHourCb', style: checkboxStyle, className:'ph-interactive', onChange: EventHandlers.handleMinimalStatsDetailChange});
            minimalStatsElements.push(Utils.createDOMElement('label', {htmlFor: state.dom.minimalStatsShowPerHourCheckbox.id, textContent: T('minimalStats_showPerHour'), style:checkboxRowStyle, className:'ph-interactive'}, [state.dom.minimalStatsShowPerHourCheckbox]));

            state.dom.minimalStatsShowNonContributingCheckbox = Utils.createDOMElement('input', {type:'checkbox', id:'minimalStatsShowNonContributingCb', style: checkboxStyle, className:'ph-interactive', onChange: EventHandlers.handleMinimalStatsDetailChange});
            minimalStatsElements.push(Utils.createDOMElement('label', {htmlFor: state.dom.minimalStatsShowNonContributingCheckbox.id, textContent: T('minimalStats_showNonContributing'), style:checkboxRowStyle, className:'ph-interactive'}, [state.dom.minimalStatsShowNonContributingCheckbox]));

            const editMinStatsPosButton = Utils.createDOMElement('button', { textContent: T('minimalStats_editPosition'), className: 'ph-interactive', style: {...commonInputStyle, backgroundColor: `${CONFIG.MAIN_ACCENT_COLOR}66`, color:CONFIG.SETTINGS_PANEL_TEXT_COLOR, marginTop:'5px', fontSize: '0.8em', padding: '4px', cursor:'pointer'}, onClick: EventHandlers.toggleMinimalStatsDragMode });
            const resetMinStatsPosButton = Utils.createDOMElement('button', { textContent: T('minimalStats_resetPosition'), className: 'ph-interactive', style: {...commonInputStyle, backgroundColor: `rgba(100,100,100,0.3)`, color:CONFIG.SETTINGS_PANEL_TEXT_COLOR, marginTop:'3px', fontSize: '0.8em', padding: '4px', cursor:'pointer'}, onClick: EventHandlers.handleMinimalStatsResetPosition });
            minimalStatsElements.push(editMinStatsPosButton, resetMinStatsPosButton);
            state.dom.settingsPanel.appendChild(createSection('minimalStats_title', minimalStatsElements));

            // --- UI Element Visibility ---
            const visControls = [
                { stateKey: 'showClock', idSuffix: 'showClockCb', labelKey: 'uiVisibility_clock' },
                { stateKey: 'showStats', idSuffix: 'showStatsCb', labelKey: 'uiVisibility_statsBlock' },
                { stateKey: 'showLastActionTimer', idSuffix: 'showLastActionTimerCb', labelKey: 'uiVisibility_lastActionTimer' },
                { stateKey: 'showUITabIndicator', idSuffix: 'showUITabIndicatorCb', labelKey: 'uiVisibility_tabIndicatorPanel' },
                { stateKey: 'showPageOverlay', idSuffix: 'showPageOverlayCb', labelKey: 'uiVisibility_pageOverlay' },
                { stateKey: 'showPageIndicatorText', idSuffix: 'showPageIndicatorTextCb', labelKey: 'uiVisibility_pageIndicatorText' },
                { stateKey: 'showTriggerDebug', idSuffix: 'showTriggerDebugCb', labelKey: 'uiVisibility_triggerDebug' }
            ];
            const visElements = visControls.map(vc => {
                state.dom[vc.stateKey + 'Checkbox'] = Utils.createDOMElement('input', {type: 'checkbox', id: vc.idSuffix, style: checkboxStyle, className:'ph-interactive', dataset: { statekey: vc.stateKey }, onChange: EventHandlers.handleVisibilityToggleChange });
                return Utils.createDOMElement('label', {htmlFor: state.dom[vc.stateKey + 'Checkbox'].id, textContent: T(vc.labelKey), style:checkboxRowStyle, className:'ph-interactive'}, [state.dom[vc.stateKey + 'Checkbox']]);
            });
            state.dom.settingsPanel.appendChild(createSection('uiVisibility_title', visElements));

            // --- Current Tab Appearance ---
            state.dom.customTabNameInput = Utils.createDOMElement('input', {type: 'text', id: 'customTabNameInput', style: commonInputStyle, placeholder: 'E.g., Station Alpha', className:'ph-interactive'});
            state.dom.customTabBkgColorInput = Utils.createDOMElement('input', {type: 'text', id: 'customTabOverlayColorInput', style: commonInputStyle, placeholder: 'rgba(R,G,B,A) or #HEX', className:'ph-interactive'});
            state.dom.customTabTextColorInput = Utils.createDOMElement('input', {type: 'text', id: 'customTabTextColorInput', style: commonInputStyle, placeholder: 'rgba(R,G,B,A) or #HEX', className:'ph-interactive'});
            const saveThemeBtn = Utils.createDOMElement('button', {textContent: T('appearance_saveCustom'), className: 'ph-interactive', style: {...commonInputStyle, backgroundColor: `${CONFIG.MAIN_ACCENT_COLOR}bb`, color:'black', marginTop:'6px', cursor:'pointer'}, onClick: EventHandlers.handleSaveCustomTheme});
            const resetThemeBtn = Utils.createDOMElement('button', {textContent: T('appearance_resetCustom'), className: 'ph-interactive', style: {...commonInputStyle, backgroundColor: `rgba(100,100,100,0.4)`, color:CONFIG.SETTINGS_PANEL_TEXT_COLOR, marginTop:'4px', cursor:'pointer'}, onClick: EventHandlers.handleResetCustomTheme});
            state.dom.settingsPanel.appendChild(createSection('appearance_title', [
                Utils.createDOMElement('label', {htmlFor: state.dom.customTabNameInput.id, textContent: T('appearance_displayName'), style: commonLabelStyle}), state.dom.customTabNameInput,
                Utils.createDOMElement('label', {htmlFor: state.dom.customTabBkgColorInput.id, textContent: T('appearance_overlayColor'), style: {...commonLabelStyle, marginTop:'6px'}}), state.dom.customTabBkgColorInput,
                Utils.createDOMElement('label', {htmlFor: state.dom.customTabTextColorInput.id, textContent: T('appearance_indicatorTextColor'), style: {...commonLabelStyle, marginTop:'6px'}}), state.dom.customTabTextColorInput,
                saveThemeBtn, resetThemeBtn
            ], 'tabAppearanceSection'));
            
            // --- Debugging Tools ---
            state.dom.debugPointerEventBordersCheckbox = Utils.createDOMElement('input', {type: 'checkbox', id: 'debugPointerBordersCb', style: checkboxStyle, className:'ph-interactive', onChange: EventHandlers.handleDebugPointerBordersChange });
            const debugPointerLabel = Utils.createDOMElement('label', {htmlFor: state.dom.debugPointerEventBordersCheckbox.id, textContent: T('debug_pointerBorders'), style:checkboxRowStyle, className:'ph-interactive'}, [state.dom.debugPointerEventBordersCheckbox]);
            state.dom.settingsPanel.appendChild(createSection('debug_title', [debugPointerLabel]));

            // --- Close Button ---
            state.dom.settingsCloseButton = Utils.createDOMElement('button', { textContent: T('settings_applyClose'), className: 'ph-settings-close-btn ph-interactive', style: { cursor: 'pointer', backgroundColor: `${CONFIG.MAIN_ACCENT_COLOR}dd`, border: 'none', color: 'black', borderRadius: '4px', padding: '8px 12px', fontSize: '0.9em', width: '100%', marginTop: 'auto', transition: 'background-color 0.2s' }, onClick: () => UIManager.setSettingsPanelVisibility(false) });
            Utils.makeButtonInteractive(state.dom.settingsCloseButton);
            state.dom.settingsPanel.appendChild(state.dom.settingsCloseButton);
            
            SettingsPanel.populateAllFields(); // Populate after rebuilding
        },

        populateAllFields: () => {
            if (!SettingsPanel.isInitialized()) return;
            const T = Utils.getLangString;

            if(state.dom.languageSelect) state.dom.languageSelect.value = state.currentLanguage;
            if (state.dom.pointerEventsModeSelect) state.dom.pointerEventsModeSelect.value = state.pointerEventsMode;
            
            // Shift & Lunch
            if(state.dom.settingsShiftTypeSelect) {
                state.dom.settingsShiftTypeSelect.innerHTML = ''; // Clear previous
                [['auto', T('shiftType_auto')], ['day', T('shiftType_day')], ['night', T('shiftType_night')]]
                    .forEach(([val, txt]) => state.dom.settingsShiftTypeSelect.add(new Option(txt, val)));
                state.dom.settingsShiftTypeSelect.value = state.shiftType;
            }
            if(state.dom.settingsShiftStartTimeInput) {
                state.dom.settingsShiftStartTimeInput.value = state.shiftStartTime ? Utils.formatDateToHHMM(state.shiftStartTime) : '';
                const isManual = state.shiftType !== 'auto';
                state.dom.settingsShiftStartTimeInput.style.display = isManual ? 'block' : 'none';
                const label = state.dom.settingsShiftStartTimeInput.previousElementSibling;
                if (label && label.tagName === 'LABEL') label.style.display = isManual ? 'block' : 'none';
            }
            if(state.dom.settingsLunchSelect) {
                state.dom.settingsLunchSelect.innerHTML = ''; // Clear previous
                const currentShiftCat = ShiftManager.getCurrentShiftCategory();
                const filteredOptions = CONFIG.DEFAULT_LUNCH_OPTIONS.filter(opt => opt.type === currentShiftCat || opt.type === 'any');
                filteredOptions.forEach(opt => {
                    const originalIndex = CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(opt);
                    state.dom.settingsLunchSelect.add(new Option(T(opt.text_key), String(originalIndex)));
                });
                if (state.selectedLunchOption) {
                    const currentLunchOriginalIndex = CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(state.selectedLunchOption);
                    if (filteredOptions.includes(state.selectedLunchOption)) {
                        state.dom.settingsLunchSelect.value = String(currentLunchOriginalIndex);
                    } else if (filteredOptions.length > 0) { // Fallback if selected lunch not valid for current shift
                        state.selectedLunchOption = filteredOptions[0]; // Auto-select first valid
                        state.dom.settingsLunchSelect.value = String(CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(filteredOptions[0]));
                        Utils.warn("Selected lunch was invalid for current shift, defaulted to first available.");
                    }
                } else if (filteredOptions.length > 0) { // If no lunch selected at all
                    state.selectedLunchOption = filteredOptions[0];
                    state.dom.settingsLunchSelect.value = String(CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(filteredOptions[0]));
                }
            }

            SettingsPanel.populateDepartmentInfo();

            // Automation & Contribution
            if(state.dom.autoClickEnabledCheckbox) state.dom.autoClickEnabledCheckbox.checked = state.autoClickEnabled;
            if(state.dom.currentTabContributesCheckbox) {
                state.dom.currentTabContributesCheckbox.checked = state.currentTabContributesToTotal;
                // Disable if department logic dictates contribution (e.g., UG must contribute all 3)
                // This is a simplified check; more complex logic might be needed.
                 const isContributionFixed = (state.currentDepartment === CONFIG.DEPARTMENTS.UG && 
                                            [CONFIG.TAB_TYPES.CRET, CONFIG.TAB_TYPES.WHD, CONFIG.TAB_TYPES.REFURB].includes(state.currentTabType));
                 state.dom.currentTabContributesCheckbox.disabled = isContributionFixed;
                 if (isContributionFixed) state.dom.currentTabContributesCheckbox.checked = true; // Force checked
            }
            SettingsPanel.updateOtherTabsSettingsDisplay();

            // Minimal Stats
            if(state.dom.minimalStatsEnabledCheckbox) state.dom.minimalStatsEnabledCheckbox.checked = state.minimalStatsVisible;
            if(state.dom.minimalStatsShowTotalCheckbox) state.dom.minimalStatsShowTotalCheckbox.checked = state.minimalStatsShowTotal;
            if(state.dom.minimalStatsShowPerHourCheckbox) state.dom.minimalStatsShowPerHourCheckbox.checked = state.minimalStatsShowPerHour;
            if(state.dom.minimalStatsShowNonContributingCheckbox) state.dom.minimalStatsShowNonContributingCheckbox.checked = state.minimalStatsShowNonContributing;
            
            // UI Vis
            ['showClock', 'showStats', 'showLastActionTimer', 'showUITabIndicator', 'showPageOverlay', 'showPageIndicatorText', 'showTriggerDebug'].forEach(key => {
                if(state.dom[key + 'Checkbox']) state.dom[key + 'Checkbox'].checked = state[key];
            });

            // Tab Appearance
            const themeToDisplay = state.customTabThemes[state.currentTabFullUrl] || state.currentTabModeDetails;
            if(state.dom.customTabNameInput) state.dom.customTabNameInput.value = themeToDisplay.name;
            if(state.dom.customTabBkgColorInput) state.dom.customTabBkgColorInput.value = themeToDisplay.color;
            if(state.dom.customTabTextColorInput) state.dom.customTabTextColorInput.value = themeToDisplay.textColor;
            const appearanceSection = document.getElementById(CONFIG.SCRIPT_ID_PREFIX + 'tabAppearanceSection');
            if(appearanceSection) {
                const sectionHeading = appearanceSection.querySelector('h4');
                if(sectionHeading) sectionHeading.textContent = `${T('appearance_title')} (${state.currentTabModeDetails.name})`;
            }
            
            // Debug
            if(state.dom.debugPointerEventBordersCheckbox) state.dom.debugPointerEventBordersCheckbox.checked = state.debugPointerEventBorders;
        },

        populateDepartmentInfo: () => {
            if (!SettingsPanel.isInitialized() || !state.dom.departmentInfoDisplay) return;
            state.dom.departmentInfoDisplay.textContent = `${Utils.getLangString('department')}: ${DepartmentManager.getDepartmentDisplayName()}`;
            if (state.currentDepartment === CONFIG.DEPARTMENTS.DETERMINING && state.departmentInfo.sequence.length > 0) {
                 state.dom.departmentInfoDisplay.textContent += ` (Sequence: ${state.departmentInfo.sequence.map(s=>s.type).join(' -> ')})`;
            }
        },

        updateOtherTabsSettingsDisplay: () => {
            if (!SettingsPanel.isInitialized() || !state.dom.otherTabsSettingsContainer) return;
            const T = Utils.getLangString;
            state.dom.otherTabsSettingsContainer.innerHTML = ''; // Clear
            const checkboxRowStyle = { display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '0.8em', color: `${CONFIG.SETTINGS_PANEL_TEXT_COLOR}cc`, margin:'2px 0', pointerEvents:'auto', userSelect:'none' };
            const checkboxStyle = { marginRight: '6px', transform: 'scale(1.05)', accentColor: CONFIG.MAIN_ACCENT_COLOR, cursor:'pointer', pointerEvents:'auto' };

            const otherTabs = Object.values(state.otherTabsData).filter(td => td.tabId !== state.currentTabId);
            if (otherTabs.length === 0) {
                state.dom.otherTabsSettingsContainer.appendChild(Utils.createDOMElement('p', {textContent: T('automation_noOtherTabs'), style: {opacity:'0.6', fontStyle:'italic', fontSize:'0.9em', margin:'4px 0'}}));
                return;
            }
             // Add a small title for this sub-section
            state.dom.otherTabsSettingsContainer.appendChild(Utils.createDOMElement('div', {textContent: T('automation_otherTabsContribution'), style: {fontSize: '0.85em', marginBottom: '3px', color: `${CONFIG.SETTINGS_PANEL_TEXT_COLOR}dd`}}));

            otherTabs.forEach(tabData => {
                const checkboxId = `contribToggle_${tabData.tabId.replace(/[^a-zA-Z0-9]/g, '_')}`;
                const checkbox = Utils.createDOMElement('input', { type: 'checkbox', id: checkboxId, checked: tabData.contributesToTotal || false, style: checkboxStyle, dataset: { targetTabId: tabData.tabId }, className:'ph-interactive', onChange: EventHandlers.handleOtherTabContributionChange });
                const label = Utils.createDOMElement('label', { htmlFor: checkbox.id, style: checkboxRowStyle, className:'ph-interactive' }, [
                    checkbox, `${tabData.modeName || tabData.tabId.substring(0,12)+'...'} (${tabData.clicks || 0} ${T('stats_items')})`
                ]);
                // Disable checkbox if department logic dictates (e.g., UG must use all its tabs)
                // This simplified logic assumes that if a tab *type* is part of the current department's core, its contribution cannot be toggled.
                if(DepartmentManager.isTabContributingByDefault(tabData.type) && 
                   (state.currentDepartment === CONFIG.DEPARTMENTS.UG || state.currentDepartment === CONFIG.DEPARTMENTS.BK) // For UG and BK, core tabs are fixed
                ) {
                    checkbox.disabled = true;
                    checkbox.checked = true; // Ensure it's checked if fixed
                }

                state.dom.otherTabsSettingsContainer.appendChild(label);
            });
        }
    };

    // --- ------------------------------------------------------------------------ ---
    // --- -------------------------- EVENT HANDLERS ---------------------------- ---
    // --- ------------------------------------------------------------------------ ---
    const EventHandlers = {
        processIncrementForCurrentTab: (isManualAction = false, event = null) => {
            state.clicksForThisTab++;
            state.lastActionTimestampForThisTab = Date.now();
            UIManager.updateCounterDisplay();
            UIManager.updateLastActionTimerDisplay();
            StorageManager.writeCurrentTabDataToLocalStorage(); // This tab's data
            StorageManager.readAllTabsDataFromLocalStorage(false); // Read all, which triggers global stat update via UIManager.updateStatisticsDisplay

            if (isManualAction && state.dom.incrementButton) { // Visual feedback for manual click
                state.dom.incrementButton.style.transform = 'scale(0.92)';
                setTimeout(() => { if(state.dom.incrementButton) state.dom.incrementButton.style.transform = 'scale(1)'; }, 90);
            }
            Utils.debug(`Incremented. Tab: ${state.clicksForThisTab}. Manual: ${isManualAction}`);
        },
        handleDecrementClick: () => {
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
                newFontSize = Math.max(CONFIG.MAIN_COUNTER_FONT_SIZE_MIN_EM, CONFIG.MAIN_COUNTER_FONT_SIZE_INITIAL_EM - overflowChars * 0.75);
            }
            input.style.fontSize = `${newFontSize}em`;
        },
        handleCounterInputChange: (event) => {
            let newValue = parseInt(event.target.value, 10);
            if (isNaN(newValue) || newValue < 0) newValue = 0;
            if (newValue !== state.clicksForThisTab) {
                state.clicksForThisTab = newValue;
                state.lastActionTimestampForThisTab = Date.now();
                UIManager.updateLastActionTimerDisplay();
                StorageManager.writeCurrentTabDataToLocalStorage();
                StorageManager.readAllTabsDataFromLocalStorage(false);
            }
            UIManager.updateCounterDisplay(); // Also calls dynamic font sizing
        },
        
        handleShiftSettingsChange: () => {
            state.shiftType = state.dom.settingsShiftTypeSelect.value;
            ShiftManager.determineAndSetShiftStartTime(false); // Recalculate start time
            if (SettingsPanel.isInitialized()) SettingsPanel.populateAllFields(); // Repopulate to update dependent fields (like manual time input visibility and lunch options)
            UIManager.updateStatisticsDisplay();
            MinimalStatsDisplay.updateDisplay();
            StorageManager.saveMainSettings();
        },
        handleLunchSettingChange: () => {
            const selectedIndex = parseInt(state.dom.settingsLunchSelect.value, 10);
            if (CONFIG.DEFAULT_LUNCH_OPTIONS[selectedIndex]) {
                state.selectedLunchOption = CONFIG.DEFAULT_LUNCH_OPTIONS[selectedIndex];
                UIManager.updateStatisticsDisplay();
                MinimalStatsDisplay.updateDisplay();
                StorageManager.saveMainSettings();
            }
        },
        handleAutoClickSettingChange: (event) => {
            state.autoClickEnabled = event.target.checked;
            if (state.autoClickEnabled && !state.mutationObserver) AutoIncrementer.init();
            else if (!state.autoClickEnabled && state.mutationObserver) AutoIncrementer.disconnect();
            StorageManager.saveMainSettings();
        },
        
        handleCurrentTabContributionChange: (event) => {
            state.currentTabContributesToTotal = event.target.checked;
            StorageManager.writeCurrentTabDataToLocalStorage(); // Save this tab's contribution status
            StorageManager.readAllTabsDataFromLocalStorage(false); // This will re-calc global stats
            StorageManager.saveMainSettings(); // Save the checkbox state for this tab's UI
        },
        handleOtherTabContributionChange: (event) => {
            const targetTabId = event.target.dataset.targetTabId;
            const isChecked = event.target.checked;
            const otherTabStorageKey = CONFIG.SCRIPT_ID_PREFIX + CONFIG.MULTI_TAB_STORAGE_PREFIX + targetTabId;
            try {
                const otherTabStoredJson = localStorage.getItem(otherTabStorageKey);
                if (otherTabStoredJson) {
                    const otherTabStoredData = JSON.parse(otherTabStoredJson);
                    otherTabStoredData.contributesToTotal = isChecked;
                    otherTabStoredData.timestamp = Date.now(); // Update timestamp
                    localStorage.setItem(otherTabStorageKey, JSON.stringify(otherTabStoredData));
                    StorageManager.readAllTabsDataFromLocalStorage(false); // Refresh local view of all tabs
                }
            } catch (err) { Utils.error('Error updating contribution for other tab:', err); }
        },

        handleMinimalStatsEnableChange: (event) => {
            state.minimalStatsVisible = event.target.checked;
            MinimalStatsDisplay.setVisibility(state.minimalStatsVisible);
            StorageManager.saveMainSettings();
        },
        handleMinimalStatsDetailChange: (event) => {
            const checkbox = event.target;
            if (checkbox === state.dom.minimalStatsShowTotalCheckbox) state.minimalStatsShowTotal = checkbox.checked;
            else if (checkbox === state.dom.minimalStatsShowPerHourCheckbox) state.minimalStatsShowPerHour = checkbox.checked;
            else if (checkbox === state.dom.minimalStatsShowNonContributingCheckbox) state.minimalStatsShowNonContributing = checkbox.checked;
            MinimalStatsDisplay.updateDisplay();
            StorageManager.saveMainSettings();
        },
        toggleMinimalStatsDragMode: (event) => {
            const button = event.target;
            const T = Utils.getLangString;
            const isCurrentlyEditing = MinimalStatsDisplay.dragHandle && MinimalStatsDisplay.dragHandle.style.display === 'block';
            if (isCurrentlyEditing) {
                MinimalStatsDisplay.showDragHandle(false);
                button.textContent = T('minimalStats_editPosition');
                MinimalStatsDisplay.applyDraggableStyling(false);
            } else {
                MinimalStatsDisplay.showDragHandle(true);
                button.textContent = T('minimalStats_pin'); // "Pin" or "Done Dragging"
            }
        },
        handleMinimalStatsResetPosition: () => {
            state.minimalStatsPosition = { bottom: `${CONFIG.MINIMAL_STATS_DEFAULT_BOTTOM_VH}vh`, right: `${CONFIG.MINIMAL_STATS_DEFAULT_RIGHT_VW}vw` };
            MinimalStatsDisplay.setPosition(state.minimalStatsPosition);
            StorageManager.saveMinimalStatsPos();
        },
        
        handleVisibilityToggleChange: (event) => {
            const key = event.target.dataset.statekey;
            if (state.hasOwnProperty(key)) {
                state[key] = event.target.checked;
                UIManager.applyElementVisibilityFromState();
                if (key === 'showPageOverlay' || key === 'showPageIndicatorText') UIManager.applyPageTheme();
                if (key === 'showTriggerDebug' && state.dom.triggerDebugDisplay) {
                     AutoIncrementer.updateTriggerDebugDisplay(); // Make sure it shows current state correctly
                }
                StorageManager.saveMainSettings();
            }
        },

        handleSaveCustomTheme: () => {
            const name = state.dom.customTabNameInput.value.trim() || state.currentTabModeDetails.name; // Default to current auto-detected name
            const color = state.dom.customTabBkgColorInput.value.trim() || state.currentTabModeDetails.color;
            const textColor = state.dom.customTabTextColorInput.value.trim() || state.currentTabModeDetails.textColor;
            state.customTabThemes[state.currentTabFullUrl] = { name, color, textColor };
            state.currentTabModeDetails = { name, color, textColor, isCustom: true }; // Update current state
            StorageManager.saveCustomThemes();
            UIManager.applyPageTheme();
            UIManager.updateUITabIndicatorText();
            if (SettingsPanel.isInitialized()) SettingsPanel.populateAllFields(); // Refresh settings panel
        },
        handleResetCustomTheme: () => {
            if (state.customTabThemes[state.currentTabFullUrl]) {
                delete state.customTabThemes[state.currentTabFullUrl];
                StorageManager.saveCustomThemes();
                StorageManager.determineCurrentTabTypeAndModeDetails(); // Re-determine based on URL
                UIManager.applyPageTheme();
                UIManager.updateUITabIndicatorText();
                if (SettingsPanel.isInitialized()) SettingsPanel.populateAllFields();
            }
        },
        
        handleDebugPointerBordersChange: (event) => {
            state.debugPointerEventBorders = event.target.checked;
            UIManager.applyDebugPointerEventBorders();
            StorageManager.saveMainSettings();
        },

        handlePageKeydown: (event) => {
            const target = event.target;
            const isOurInput = (state.uiContainer && state.uiContainer.contains(target) && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA'));
            if (!isOurInput && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
                return; // Ignore if focus is on external input elements
            }
            if (event.code === CONFIG.INCREMENT_KEYBOARD_SHORTCUT_CODE) {
                // Allow hotkey even if UI is locked for increment button
                event.preventDefault();
                EventHandlers.processIncrementForCurrentTab(false, event);
            }
        },
        
        // Event handlers tied to UIManager elements
        toggleSettingsPanelVisibility: () => UIManager.setSettingsPanelVisibility(!state.settingsPanelVisible),
        toggleUILockState: () => {
            state.uiLocked = !state.uiLocked;
            UIManager.updateUILockVisuals();
            UIManager.applyUILockToElements(state.uiLocked);
            StorageManager.saveMainSettings();
        },
        handlePointerModeChange: (event) => {
            state.pointerEventsMode = event.target.value;
            UIManager.updatePointerEventsMode();
            StorageManager.saveMainSettings();
        },
        handleLanguageChange: (event) => {
            state.currentLanguage = event.target.value;
            StorageManager.saveLanguagePreference();
            UIManager.refreshUIForLanguageChange(); // This will call SettingsPanel.rebuildOrRelocalize
        },

        handleWindowBeforeUnload: () => {
            Utils.info("Window beforeunload: Saving state...");
            StorageManager.writeCurrentTabDataToLocalStorage(); // Ensure last count is saved
            StorageManager.saveMainSettings(); // Session settings
            StorageManager.saveUIPanelSizePos();
            StorageManager.saveMinimalStatsPos();
            StorageManager.saveCustomThemes();
            StorageManager.saveDepartmentInfo(); // Save potentially updated sequence
            StorageManager.saveLanguagePreference();
        },
        
        handleStorageEvent: (event) => {
            // Check if it's our multi-tab data that changed
            if (event.key && event.key.startsWith(CONFIG.SCRIPT_ID_PREFIX + CONFIG.MULTI_TAB_STORAGE_PREFIX)) {
                if (event.key !== (CONFIG.SCRIPT_ID_PREFIX + CONFIG.MULTI_TAB_STORAGE_PREFIX + state.currentTabId)) { // Change from another tab
                    Utils.debug("Storage event detected from another tab:", event.key);
                    StorageManager.readAllTabsDataFromLocalStorage(false);
                }
            }
            // Check if department info changed (e.g., by another tab determining it)
            if (event.key === StorageManager._prefixKey(CONFIG.STORAGE_KEY_DEPARTMENT_INFO)) {
                 Utils.debug("Department info changed in storage. Reloading and re-evaluating.");
                 const newDeptInfo = JSON.parse(event.newValue);
                 if (newDeptInfo && newDeptInfo.department && newDeptInfo.department !== state.currentDepartment) {
                     state.departmentInfo = newDeptInfo;
                     state.currentDepartment = newDeptInfo.department;
                     // Update relevant UI immediately
                     if(state.initialized) {
                        UIManager.updateStatisticsDisplay();
                        MinimalStatsDisplay.updateDisplay();
                        if (SettingsPanel.isInitialized() && state.settingsPanelVisible) SettingsPanel.populateDepartmentInfo();
                     }
                 } else if (newDeptInfo && newDeptInfo.sequence.length !== state.departmentInfo.sequence.length) {
                     // Sequence changed, might need to re-evaluate if still determining
                     state.departmentInfo = newDeptInfo;
                     if (state.currentDepartment === CONFIG.DEPARTMENTS.DETERMINING) {
                         DepartmentManager.updateSequenceAndTryDetermine();
                     }
                 }
            }
             // Check for language preference change
            if (event.key === StorageManager._prefixKey(CONFIG.STORAGE_KEY_LANGUAGE)) {
                const newLang = JSON.parse(event.newValue);
                if (newLang && newLang !== state.currentLanguage && CONFIG.AVAILABLE_LANGUAGES.find(l=>l.code === newLang)) {
                    Utils.info("Language preference changed by another instance. Updating this instance.");
                    state.currentLanguage = newLang;
                    if (state.initialized) UIManager.refreshUIForLanguageChange();
                }
            }
        }
    };

    // --- ------------------------------------------------------------------------ ---
    // --- -------------------- INITIALIZATION & DESTRUCTION -------------------- ---
    // --- ------------------------------------------------------------------------ ---
    function initialize() {
        const initFlag = `${CONFIG.SCRIPT_ID_PREFIX}initialized_${CONFIG.SCRIPT_VERSION.replace(/\./g, '_')}`;
        if (window[initFlag]) {
            Utils.warn(`Production Assistant v${CONFIG.SCRIPT_VERSION} already initialized. Attempting to destroy and re-init.`);
            const destroyFuncKey = `destroyProductionHelper_${CONFIG.SCRIPT_VERSION.replace(/\./g, '_')}`;
            if (typeof window[destroyFuncKey] === 'function') {
                try { window[destroyFuncKey](); } catch(e) { Utils.error("Error destroying old PHelper instance:", e); }
            } else { // Manual cleanup if destroy function somehow lost
                const oldContainer = document.getElementById(CONFIG.SCRIPT_ID_PREFIX + CONFIG.UI_CONTAINER_ID);
                if(oldContainer) oldContainer.remove();
                // Add removal of other specific v4.0 elements if needed
            }
            delete window[initFlag];
            setTimeout(actualInit, 150); // Give a moment for cleanup
            return;
        }
        actualInit();
    }
    
    function actualInit() {
        Utils.info(`Initializing Production Assistant v${CONFIG.SCRIPT_VERSION}...`);
        
        // 1. Department Session TTL Check (must be very early, might reload page)
        // Note: loadAllState also loads departmentInfo, but TTL check is critical path.
        const loadedDeptInfo = StorageManager.load(CONFIG.STORAGE_KEY_DEPARTMENT_INFO, { department: null, sequence: [], sessionStartTime: null }, false);
        state.departmentInfo = loadedDeptInfo; // Temporarily load for TTL check
        DepartmentManager.checkAndReloadForSessionTTL(); // This might exit if reload occurs

        // 2. Load all settings, including language preference
        StorageManager.loadAllState(); // This re-loads departmentInfo properly among other things.
        
        // 3. Initialize Department Manager (determines or confirms department)
        DepartmentManager.init(); // This will use the already loaded state.departmentInfo

        // 4. Initialize Shift Manager
        ShiftManager.init();

        // 5. Build UI
        UIManager.init(); // Builds DOM and sets _isInitialized flag
        MinimalStatsDisplay.init(); // Builds Minimal Stats DOM

        // 6. Set initial UI values based on loaded state (incl. language-specific texts)
        UIManager.setInitialUIValues(); // This will populate with correct language from state

        // 7. Update dynamic displays
        UIManager.updateCounterDisplay();
        UIManager.updateRealTimeClockDisplay();
        UIManager.updateLastActionTimerDisplay();
        UIManager.updateStatisticsDisplay(); // Now uses correct department for calcs

        // 8. Start intervals
        state.intervals.realTimeClock = setInterval(UIManager.updateRealTimeClockDisplay, 1000);
        state.intervals.lastActionTimer = setInterval(UIManager.updateLastActionTimerDisplay, 1000);
        state.intervals.statistics = setInterval(() => {
            UIManager.updateStatisticsDisplay();
            MinimalStatsDisplay.updateDisplay();
        }, CONFIG.STATS_UPDATE_INTERVAL_MS);
        state.intervals.multiTabWrite = setInterval(StorageManager.writeCurrentTabDataToLocalStorage, CONFIG.MULTI_TAB_WRITE_INTERVAL_MS);
        state.intervals.multiTabRead = setInterval(() => StorageManager.readAllTabsDataFromLocalStorage(false), CONFIG.MULTI_TAB_READ_INTERVAL_MS);

        // 9. Initialize AutoIncrementer
        if (state.autoClickEnabled) AutoIncrementer.init();
        else AutoIncrementer.updateTriggerDebugDisplay(); // Show disabled state if UI is up

        // 10. Attach global event listeners
        state.pageKeydownListener = EventHandlers.handlePageKeydown;
        document.addEventListener('keydown', state.pageKeydownListener);
        
        state.beforeUnloadListener = EventHandlers.handleWindowBeforeUnload;
        window.addEventListener('beforeunload', state.beforeUnloadListener);
        
        state.storageListener = EventHandlers.handleStorageEvent;
        window.addEventListener('storage', state.storageListener);

        state.initialized = true;
        const initFlag = `${CONFIG.SCRIPT_ID_PREFIX}initialized_${CONFIG.SCRIPT_VERSION.replace(/\./g, '_')}`;
        window[initFlag] = true;
        
        const destroyFuncKey = `destroyProductionHelper_${CONFIG.SCRIPT_VERSION.replace(/\./g, '_')}`;
        window[destroyFuncKey] = destroy;

        Utils.info(`Production Assistant v${CONFIG.SCRIPT_VERSION} initialized successfully.`);
    }

    function destroy() {
        const destroyFuncKey = `destroyProductionHelper_${CONFIG.SCRIPT_VERSION.replace(/\./g, '_')}`;
        Utils.info(`Destroying Production Assistant v${CONFIG.SCRIPT_VERSION}...`);
        
        if(state.initialized) { // Attempt to save final state only if initialized
            try { EventHandlers.handleWindowBeforeUnload(); } // Reuse save logic
            catch (e) { Utils.error("Error saving data on destroy:", e); }
        }

        AutoIncrementer.disconnect();
        Object.values(state.intervals).forEach(clearInterval); state.intervals = {};
        Object.values(state.timeouts).forEach(clearTimeout); state.timeouts = {}; // Clear department timeouts

        if (state.pageKeydownListener) document.removeEventListener('keydown', state.pageKeydownListener);
        if (state.beforeUnloadListener) window.removeEventListener('beforeunload', state.beforeUnloadListener);
        if (state.storageListener) window.removeEventListener('storage', state.storageListener);

        // Remove DOM elements
        const elementsToRemoveIds = [
            CONFIG.SCRIPT_ID_PREFIX + CONFIG.UI_CONTAINER_ID,
            CONFIG.SCRIPT_ID_PREFIX + CONFIG.PAGE_COLOR_OVERLAY_ID_SUFFIX,
            CONFIG.SCRIPT_ID_PREFIX + CONFIG.PAGE_INDICATOR_TEXT_ID_SUFFIX,
            CONFIG.SCRIPT_ID_PREFIX + CONFIG.EMERGENCY_SHOW_BUTTON_ID_SUFFIX,
            CONFIG.SCRIPT_ID_PREFIX + CONFIG.MINIMAL_STATS_ID_SUFFIX,
            CONFIG.SCRIPT_ID_PREFIX + 'globalStyles', // Remove injected styles
        ];
        elementsToRemoveIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.remove();
        });

        // Reset state object (optional, good practice)
        // For simplicity here, we'll just nullify some key parts
        state.uiContainer = null;
        state.dom = {};
        state.initialized = false;
        
        const initFlag = `${CONFIG.SCRIPT_ID_PREFIX}initialized_${CONFIG.SCRIPT_VERSION.replace(/\./g, '_')}`;
        delete window[initFlag];
        delete window[destroyFuncKey]; // Remove self from window

        Utils.info(`Production Assistant v${CONFIG.SCRIPT_VERSION} destroyed.`);
    }
    
    function injectGlobalStyles() {
        const styleId = CONFIG.SCRIPT_ID_PREFIX + 'globalStyles';
        if (document.getElementById(styleId)) return;

        const css = `
            .${CONFIG.SCRIPT_ID_PREFIX}main_counter_input::-webkit-outer-spin-button,
            .${CONFIG.SCRIPT_ID_PREFIX}main_counter_input::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
            .${CONFIG.SCRIPT_ID_PREFIX}main_counter_input[type=number] {
                -moz-appearance: textfield; /* Firefox */
            }
            .ph-interactive { /* Convenience class for elements that should generally be interactive */
                pointer-events: auto !important; 
                user-select: auto !important; /* Allow text selection for inputs, etc. */
            }
            .ph-interactive-parent > .ph-interactive { /* Ensure children of an interactive parent are also interactive */
                 pointer-events: auto !important;
            }
             .ph-non-selectable {
                user-select: none;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
            }
        `;
        const style = document.createElement('style');
        style.id = styleId;
        style.type = 'text/css';
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);
    }

    // --- GO ---
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        injectGlobalStyles();
        initialize();
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            injectGlobalStyles();
            initialize();
        }, { once: true });
    }

})();
