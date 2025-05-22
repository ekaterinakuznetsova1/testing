/*
    Production Assistant v4.4
    Author: AI Assistant (based on provided specifications and refactoring)
*/
(function() {
    'use strict';

    // --- ------------------------------------------------------------------------ ---
    // --- --------- SCRIPT CONFIGURATION (All settings are here) --------------- ---
    // --- ------------------------------------------------------------------------ ---
    const CONFIG = {
        // --- General & Version ---
        SCRIPT_VERSION: '4.4', // Updated for v4.4
        SCRIPT_ID_PREFIX: 'prodHelper_v4_4_', // Updated for v4.4
        DEBUG_MODE: false, // Set to true for development console logs

        // --- Themes ---
        DEFAULT_THEME: 'dark', // 'light' or 'dark'
        THEMES: {
            light: {
                UI_BACKGROUND_COLOR: 'rgba(245, 245, 245, 0.92)',
                UI_TEXT_COLOR: 'rgba(30, 30, 30, 0.9)',
                UI_BORDER_COLOR: 'rgba(200, 200, 200, 0.7)',
                MAIN_ACCENT_COLOR: 'rgba(255, 120, 0, 0.9)',
                SETTINGS_PANEL_BACKGROUND: 'rgba(235, 235, 240, 0.99)',
                SETTINGS_PANEL_TEXT_COLOR: 'rgba(10, 10, 10, 0.95)',
                SETTINGS_PANEL_BORDER_COLOR: 'rgba(255, 120, 0, 0.7)',
                BUTTON_DEFAULT_BG_COLOR: 'rgba(220, 220, 220, 0.6)',
                BUTTON_DEFAULT_TEXT_COLOR: 'rgba(20, 20, 20, 0.9)',
                CLICKER_INCREMENT_BUTTON_BG_COLOR: 'rgba(200, 200, 200, 0.7)',
                CLICKER_INCREMENT_BUTTON_TEXT_COLOR: 'rgba(0,0,0,0.8)',
                CLICKER_DECREMENT_BUTTON_BG_COLOR: 'rgba(225, 225, 225, 0.5)',
                CLICKER_DECREMENT_BUTTON_TEXT_COLOR: 'rgba(0,0,0,0.8)',
                LAST_ACTION_TIMER_WARN_COLOR: 'rgba(210, 40, 40, 0.95)',
                MINIMAL_STATS_TEXT_COLOR: 'rgba(70, 70, 70, 0.9)', // Updated for v4.4
                MINIMAL_STATS_BACKGROUND_COLOR: 'rgba(240, 240, 240, 0.0)',
                DIVIDER_COLOR: 'rgba(255, 120, 0, 0.45)',
                INPUT_BG_COLOR: 'rgba(255, 255, 255, 0.7)',
                INPUT_TEXT_COLOR: 'rgba(10, 10, 10, 0.95)',
                INPUT_BORDER_COLOR: 'rgba(200, 100, 0, 0.8)',
                DEBUG_BORDER_INTERACTIVE: 'red',
                DEBUG_BORDER_NON_INTERACTIVE: 'dodgerblue',
                STATS_TEXT_SUMMARY_BORDER_TOP: 'rgba(30,30,30,0.1)',
                STATS_OTHER_TABS_BORDER_TOP: 'rgba(30,30,30,0.1)',
                BOTTOM_BAR_BORDER_TOP: 'rgba(30,30,30,0.12)',
                SCROLLBAR_TRACK_BG: '#f1f1f1',
                SCROLLBAR_THUMB_BG: '#c1c1c1',
                SCROLLBAR_THUMB_HOVER_BG: '#a8a8a8',
            },
            dark: {
                UI_BACKGROUND_COLOR: 'rgba(30, 35, 45, 0.0)',
                UI_TEXT_COLOR: 'rgba(220, 220, 225, 0.8)',
                UI_BORDER_COLOR: 'rgba(80, 80, 90, 0.0)',
                MAIN_ACCENT_COLOR: 'rgba(255, 130, 0, 0.85)',
                SETTINGS_PANEL_BACKGROUND: 'rgba(45, 50, 60, 0.98)',
                SETTINGS_PANEL_TEXT_COLOR: 'rgba(240, 240, 245, 0.95)',
                SETTINGS_PANEL_BORDER_COLOR: 'rgba(255, 130, 0, 0.65)',
                BUTTON_DEFAULT_BG_COLOR: 'rgba(70, 75, 85, 0.35)',
                BUTTON_DEFAULT_TEXT_COLOR: 'rgba(230, 230, 235, 0.9)',
                CLICKER_INCREMENT_BUTTON_BG_COLOR: 'rgba(80, 80, 90, 0.35)',
                CLICKER_INCREMENT_BUTTON_TEXT_COLOR: 'rgba(230,230,235,0.8)',
                CLICKER_DECREMENT_BUTTON_BG_COLOR: 'rgba(60, 60, 70, 0.25)',
                CLICKER_DECREMENT_BUTTON_TEXT_COLOR: 'rgba(210,210,215,0.8)',
                LAST_ACTION_TIMER_WARN_COLOR: 'rgba(255, 70, 70, 0.95)',
                MINIMAL_STATS_TEXT_COLOR: 'rgba(190, 190, 190, 0.85)', // Updated for v4.4
                MINIMAL_STATS_BACKGROUND_COLOR: 'rgba(40, 40, 50, 0.0)',
                DIVIDER_COLOR: 'rgba(255, 130, 0, 0.33)',
                INPUT_BG_COLOR: 'rgba(20,20,30,0.6)',
                INPUT_TEXT_COLOR: 'rgba(240, 240, 245, 0.95)',
                INPUT_BORDER_COLOR: 'rgba(255, 130, 0, 0.7)',
                DEBUG_BORDER_INTERACTIVE: 'orange',
                DEBUG_BORDER_NON_INTERACTIVE: 'deepskyblue',
                STATS_TEXT_SUMMARY_BORDER_TOP: 'rgba(220,220,225,0.1)',
                STATS_OTHER_TABS_BORDER_TOP: 'rgba(220,220,225,0.1)',
                BOTTOM_BAR_BORDER_TOP: 'rgba(220,220,225,0.12)',
                SCROLLBAR_TRACK_BG: '#2c2f33',
                SCROLLBAR_THUMB_BG: '#4f545c',
                SCROLLBAR_THUMB_HOVER_BG: '#72767d',
            }
        },

        // --- UI & Styling (Base values, may be overridden by themes) ---
        UI_CONTAINER_ID: 'mainContainer',
        UI_BOTTOM_OFFSET: '10px',
        UI_RIGHT_OFFSET: '10px',
        UI_INITIAL_WIDTH_VW: 30,
        UI_INITIAL_HEIGHT_VH: 30,
        UI_MIN_WIDTH_PX: 380,
        UI_MIN_HEIGHT_PX: 280,
        FONT_FAMILY: '"Segoe UI", Roboto, Arial, sans-serif',
        NO_SHADOW_STYLE: '0 0 0px rgba(0,0,0,0.0)',

        // --- Clicker & Counter ---
        MAIN_COUNTER_FONT_SIZE_INITIAL_EM: 5.5,
        MAIN_COUNTER_FONT_SIZE_MIN_EM: 2.0,
        MAIN_COUNTER_MAX_CHARS_BEFORE_RESIZE: 4,
        SHOW_INCREMENT_BUTTON: true,
        SHOW_DECREMENT_BUTTON: true,
        CLICKER_BUTTON_FONT_SIZE_EM: 2.2,
        INCREMENT_KEYBOARD_SHORTCUT_CODE: 'ShiftRight',

        // --- Resizable UI Panel & Panes ---
        RESIZE_HANDLE_SIZE_PX: 10,
        DIVIDER_WIDTH_PX: 8,
        LEFT_PANE_INITIAL_FLEX_BASIS: '40%',
        LEFT_PANE_MIN_WIDTH_PERCENT: 20,
        RIGHT_PANE_MIN_WIDTH_PERCENT: 25,

        // --- Timers & Clock ---
        LAST_ACTION_TIMER_WARN_SECONDS: 10 * 60,
        TIMERS_FONT_SIZE_EM: 0.8,

        // --- Minimalist "Bare Numbers" Statistics ---
        MINIMAL_STATS_ID_SUFFIX: '_minimalStats',
        MINIMAL_STATS_DEFAULT_VISIBLE: true,
        MINIMAL_STATS_DEFAULT_BOTTOM_VH: 3,
        MINIMAL_STATS_DEFAULT_RIGHT_VW: 30,
        MINIMAL_STATS_FONT_SIZE_EM: 1.1, // Adjusted for potentially two lines
        MINIMAL_STATS_LINE_HEIGHT_EM: 1.2,
        MINIMAL_STATS_SHOW_TOTAL_DEFAULT: true,
        MINIMAL_STATS_SHOW_PER_HOUR_DEFAULT: true,
        MINIMAL_STATS_SHOW_SECONDARY_DEFAULT: true, // Legacy, may not be directly used by new format
        MINIMAL_STATS_DRAG_HANDLE_TEXT_KEY: 'minimalStats_dragHandle',
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
            { name: 'REFURB', keyword: 'CRETURN_REFURB', color: 'rgba(255, 165, 0, 0.04)', textColor: 'rgba(255, 140, 0, 0.65)' },
            { name: 'C-RET', keyword: 'CRETURN', color: 'rgba(0, 165, 255, 0.04)', textColor: 'rgba(0, 140, 255, 0.65)' },
            { name: 'WHD', keyword: 'DEALS', color: 'rgba(100, 255, 100, 0.04)', textColor: 'rgba(80, 220, 80, 0.65)' },
        ],
        DEFAULT_TAB_MODE_NAME: 'General',
        DEFAULT_TAB_MODE_COLOR: 'rgba(100, 100, 100, 0.04)',
        DEFAULT_TAB_MODE_TEXT_COLOR: 'rgba(150, 150, 150, 0.55)',
        UI_TAB_INDICATOR_FONT_SIZE_EM: 1.0,

        // --- Department Logic ---
        DEPARTMENTS: {
            UG: 'UG', BK: 'BK', RB: 'RB', CR: 'CR', WD: 'WD', RB_ONLY: 'RB_ONLY', UNKNOWN: 'UNKNOWN', DETERMINING: 'DETERMINING', CUSTOM: 'CUSTOM'
        },
        DEPARTMENT_SESSION_TTL_HOURS: 14,
        DEPARTMENT_DETERMINATION_TIMEOUT_MS: 20 * 60 * 1000,

        // --- Multi-Tab State Sync ---
        MULTI_TAB_STORAGE_PREFIX: 'tabs_data_',
        MULTI_TAB_WRITE_INTERVAL_MS: 1100,
        MULTI_TAB_READ_INTERVAL_MS: 1600,
        MULTI_TAB_DATA_TTL_MS: 5 * 60 * 1000,

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
        get DEFAULT_STATS_CONFIG() {
            return {
                primaryContributingTabs: [this.TAB_TYPES.CRET, this.TAB_TYPES.WHD, this.TAB_TYPES.REFURB],
                secondaryInfoTabs: []
            };
        },

        // --- Auto-Clicker Trigger ---
        INITIAL_TRIGGER_TEXT: 'poniżej',
        FINAL_TRIGGER_TEXT_CRET: 'Przypisz ponownie',
        FINAL_TRIGGER_TEXT_WHD_REFURB: 'Przypisz nowy',
        TRIGGER_OBSERVE_AREA_SELECTOR: 'body',
        TRIGGER_DEBUG_MAX_PATHS: 7,
        AUTO_CLICK_REFRESH_RATE_MS: 180,

        // --- Storage Keys (Updated for v4.4) ---
        STORAGE_KEY_MAIN_SETTINGS: 'mainCfg', // Per-tab, not versioned globally
        STORAGE_KEY_CUSTOM_THEMES: 'customThemes_global', // Global, not versioned for now
        STORAGE_KEY_UI_SIZE_POS: 'uiSizePos', // Global, not versioned for now
        STORAGE_KEY_MINIMAL_STATS_POS: 'minimalStatsPos', // Global, not versioned for now
        STORAGE_KEY_DEPARTMENT_INFO: 'departmentInfo', // Global, not versioned for now
        STORAGE_KEY_LANGUAGE: 'languagePref_global', // Global, not versioned
        STORAGE_KEY_THEME_PREFERENCE: 'themePref_global_v44', // Global, versioned for v4.4
        STORAGE_KEY_STATS_CONFIG: 'statsConfig_global_v44',   // Global, versioned for v4.4
        STORAGE_KEY_MINIMAL_STATS_TYPE_CONFIG: 'minimalStatsTypeConfig_global_v44', // Global, versioned for v4.4
        USE_SESSION_STORAGE_FOR_UI_STATE: true,

        // --- UI Controls & Settings Panel ---
        EMERGENCY_HIDE_BUTTON_TEXT_KEY: 'closeBtn',
        EMERGENCY_SHOW_BUTTON_ID_SUFFIX: '_emergencyShowBtn',
        EMERGENCY_SHOW_BUTTON_TEXT: '🛠️',
        EMERGENCY_SHOW_BUTTON_SIZE: '36px',
        EMERGENCY_SHOW_BUTTON_OPACITY: 0.3,
        EMERGENCY_SHOW_BUTTON_HOVER_OPACITY: 0.9,
        SETTINGS_PANEL_ID_SUFFIX: '_settingsPanel',
        SETTINGS_PANEL_WIDTH_VW: 35,
        SETTINGS_PANEL_MIN_WIDTH_PX: 350,
        SETTINGS_PANEL_MAX_WIDTH_PX: 500,
        LOCK_UI_BUTTON_TEXT_UNLOCKED_KEY: 'uiLockBtn',
        LOCK_UI_BUTTON_TEXT_LOCKED_KEY: 'uiUnlockBtn',
        TOGGLE_SETTINGS_BUTTON_TEXT_CLOSED_KEY: 'settingsBtn',
        TOGGLE_SETTINGS_BUTTON_TEXT_OPENED_KEY: 'settingsBackBtn',

        // --- Pointer Events Mode Options ---
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
            en: {
                // General
                theme: "Theme", theme_light: "Light", theme_dark: "Dark",
                statsConfig_title: "Statistics Configuration",
                statsConfig_primaryLabel: "Contributes to Main Score (Items/hr):",
                statsConfig_secondaryLabel: "Show as Secondary Info:",
                "statsConfig_tabType_C-RET": "C-RET Tab", // Exact key for 'C-RET'
                statsConfig_tabType_WHD: "WHD Tab",
                statsConfig_tabType_REFURB: "REFURB Tab",
                statsConfig_tabType_General: "Other Tabs", // Exact key for 'General' (from TAB_TYPES.UNKNOWN)
                statsConfig_tabType_CRET: "C-RET Tab (Legacy)", // Keep old for compatibility if any part uses it, though buildStatsCheckbox will use the new ones
                statsConfig_tabType_UNKNOWN: "Other Tabs (Legacy)",
                minimalStats_showSecondary: "Show secondary info items", // Legacy, might be re-evaluated
                minimalStats_typeDisplay_title: "Minimalist Statistics - Details",
                minimalStats_typeDisplay_showInDetails: "Show in details:",
                minimalStats_typeDisplay_label: "Label:",
                minimalStats_typeDisplay_order: "Order:",
                minimalStats_typeDisplay_btnUp: "Up",
                minimalStats_typeDisplay_btnDown: "Down",
                automation_tabContributesToAggregation: "This Tab's data is available for aggregation",
                closeBtn: "Close", saveBtn: "Save", resetBtn: "Reset", uiLockBtn: "UI Lock", uiUnlockBtn: "UI Unlock", settingsBtn: "Settings", settingsBackBtn: "Settings <",
                show: "Show", hide: "Hide", enable: "Enable", disable: "Disable", error: "Error", warning: "Warning", info: "Info", yes: "Yes", no: "No",
                peMode_title: "Mouse Click Mode", peMode_label: "Panel Click Behavior:", peMode_fullyInteractive: "Fully Interactive (Blocks Background)", peMode_defaultTransparent: "Transparent BG (Buttons Active)", peMode_mostlyClickThrough: "Mostly Click-Through (Hotkeys/Auto)", peMode_watermark: "Watermark Mode (Fully Click-Through)",
                tabName: "Tab Name", currentTab: "Current Tab", global: "Global", department: "Department Profile", unknownDepartment: "Unknown", determiningDepartment: "Determining...", customDepartment: "Custom Config",
                depName_UG: "UG Profile", depName_BK: "BK Profile", depName_RB: "RB Profile", depName_CR: "CR Profile", depName_WD: "WD Profile", depName_RB_ONLY: "RB (Solo) Profile", depName_UNKNOWN: "Unknown Profile", depName_DETERMINING: "Determining Profile...", depName_CUSTOM: "Custom Configuration",
                shiftLunch_title: "Shift & Lunch", shiftType: "Shift Type:", shiftType_auto: "Automatic", shiftType_day: "Day", shiftType_night: "Night", shiftStartManual: "Shift Start (manual):", lunchBreak: "Lunch Break:",
                lunch_day1: "Day Lunch 1 (11:20-11:50)", lunch_day2: "Day Lunch 2 (11:50-12:20)", lunch_day3: "Day Lunch 3 (12:20-12:50)", lunch_day4: "Day Lunch 4 (12:50-13:20)", lunch_night1: "Night Lunch 1 (23:20-23:50)", lunch_night2: "Night Lunch 2 (23:50-00:20)", lunch_night3: "Night Lunch 3 (00:20-00:50)", lunch_night4: "Night Lunch 4 (00:50-01:20)", lunch_noLunch: "No Lunch",
                stats_items: "Items", stats_total: "Total", stats_perHour: "/hr", stats_lastAction: "Last Action", stats_workedTime: "Worked", stats_shift: "Shift", stats_lunch: "Lunch", stats_thisTab: "This Tab", stats_global: "Global (Main)", stats_otherTabsSummary: "Others",
                minimalStats_title: "Minimalist Statistics", minimalStats_enable: "Enable 'Bare Numbers'", minimalStats_showTotal: "Show total items (Main)", minimalStats_showPerHour: "Show items/hour (Main)", minimalStats_dragHandle: " D ", minimalStats_pin: " Pin ", minimalStats_resetPosition: "Reset Position", minimalStats_editPosition: "Move 'Bare Numbers'",
                automation_title: "Automation & Tab Contribution", automation_autoIncrement: "Auto-Increment on Trigger", automation_otherTabsContribution: "Other Available Tabs:", automation_noOtherTabs: "(No other active helper tabs detected)",
                uiVisibility_title: "UI Element Visibility", uiVisibility_clock: "Real-time Clock", uiVisibility_statsBlock: "Statistics Block", uiVisibility_lastActionTimer: "Last Action Timer", uiVisibility_tabIndicatorPanel: "Tab Name in Panel", uiVisibility_pageOverlay: "Full Page Color Overlay", uiVisibility_pageIndicatorText: "Page Indicator Text", uiVisibility_triggerDebug: "Trigger Debug Display",
                appearance_title: "Current Tab Appearance", appearance_currentTabName: "Current Tab Name", appearance_displayName: "Tab Display Name:", appearance_overlayColor: "Page Overlay Color:", appearance_indicatorTextColor: "Page Indicator Text Color:", appearance_saveCustom: "Save Appearance for This URL", appearance_resetCustom: "Reset Appearance to Default",
                debug_title: "Debugging Tools", debug_pointerBorders: "Show Clickable Area Debug Borders", debug_autoClickerState: "Auto-Clicker State", debug_initialTrigger: "Initial", debug_finalCRETTrigger: "Final C-RET", debug_finalWHDREFTrigger: "Final WHD/REF", debug_found: "FOUND", debug_notFound: "Not Found", debug_flagOn: "Flag:ON", debug_flagOff: "Flag:OFF", debug_paths: "Paths",
                button_plus: "+1", button_minus: "-1", settings_applyClose: "Apply & Close", time_s: "s", time_m: "m", time_h: "h", language_select: "Language:",
                stats_format_total_items_bare: (primaryCounts, secondaryCounts, T) => { // Legacy, may be used elsewhere
                    let primaryStr = "";
                    if (primaryCounts.types.length > 0 && primaryCounts.TOTAL > 0) {
                        const pParts = [];
                        if (primaryCounts.CRET > 0) pParts.push(`${primaryCounts.CRET}C`); if (primaryCounts.WHD > 0) pParts.push(`${primaryCounts.WHD}W`);
                        if (primaryCounts.REFURB > 0) pParts.push(`${primaryCounts.REFURB}R`); if (primaryCounts.UNKNOWN > 0) pParts.push(`${primaryCounts.UNKNOWN}U`);
                        primaryStr = `[${pParts.join(', ')} = ${primaryCounts.TOTAL}]`;
                    } else { primaryStr = `[0 ${T('stats_items')}]`; }
                    let secondaryStr = "";
                    if (secondaryCounts.types.length > 0 && secondaryCounts.TOTAL > 0) {
                        const sParts = [];
                        if (secondaryCounts.CRET > 0) sParts.push(`${secondaryCounts.CRET}C`); if (secondaryCounts.WHD > 0) sParts.push(`${secondaryCounts.WHD}W`);
                        if (secondaryCounts.REFURB > 0) sParts.push(`${secondaryCounts.REFURB}R`); if (secondaryCounts.UNKNOWN > 0) sParts.push(`${secondaryCounts.UNKNOWN}U`);
                        secondaryStr = ` (+${sParts.join(', ')})`;
                    } return `${primaryStr}${secondaryStr}`;
                },
            },
            pl: {
                theme: "Motyw", theme_light: "Jasny", theme_dark: "Ciemny",
                statsConfig_title: "Konfiguracja Statystyk",
                statsConfig_primaryLabel: "Wliczaj do głównego wyniku (sztuk/godz.):",
                statsConfig_secondaryLabel: "Pokaż jako informacja dodatkowa:",
                "statsConfig_tabType_C-RET": "Karta C-RET", // Exact key for 'C-RET'
                statsConfig_tabType_WHD: "Karta WHD",
                statsConfig_tabType_REFURB: "Karta REFURB",
                statsConfig_tabType_General: "Inne Karty", // Exact key for 'General'
                statsConfig_tabType_CRET: "Karta C-RET (Przestarzałe)",
                statsConfig_tabType_UNKNOWN: "Inne Karty (Przestarzałe)",
                minimalStats_showSecondary: "Pokaż sztuki z informacji dodatkowej", // Legacy
                minimalStats_typeDisplay_title: "Statystyki Minimalistyczne - Szczegóły",
                minimalStats_typeDisplay_showInDetails: "Pokaż w szczegółach:",
                minimalStats_typeDisplay_label: "Etykieta:",
                minimalStats_typeDisplay_order: "Kolejność:",
                minimalStats_typeDisplay_btnUp: "Góra",
                minimalStats_typeDisplay_btnDown: "Dół",
                automation_tabContributesToAggregation: "Dane tej karty są dostępne do agregacji",
                closeBtn: "Zamknij", saveBtn: "Zapisz", resetBtn: "Resetuj", uiLockBtn: "Blokada UI", uiUnlockBtn: "Odblokuj UI", settingsBtn: "Ustawienia", settingsBackBtn: "Ustawienia <",
                show: "Pokaż", hide: "Ukryj", enable: "Włącz", disable: "Wyłącz", error: "Błąd", warning: "Ostrzeżenie", info: "Informacja", yes: "Tak", no: "Nie",
                peMode_title: "Tryb kliknięć myszy", peMode_label: "Zachowanie panelu:", peMode_fullyInteractive: "Pełna interaktywność (blokuje tło)", peMode_defaultTransparent: "Przezroczyste tło (przyciski aktywne)", peMode_mostlyClickThrough: "Głównie 'Click-Through' (Skróty/Auto)", peMode_watermark: "Tryb znaku wodnego (Pełny 'Click-Through')",
                tabName: "Nazwa karty", currentTab: "Bieżąca karta", global: "Globalnie", department: "Profil Działu", unknownDepartment: "Nieznany", determiningDepartment: "Określanie...", customDepartment: "Konfiguracja własna",
                depName_UG: "Profil UG", depName_BK: "Profil BK", depName_RB: "Profil RB", depName_CR: "Profil CR", depName_WD: "Profil WD", depName_RB_ONLY: "Profil RB (Solo)", depName_UNKNOWN: "Profil Nieznany", depName_DETERMINING: "Określanie Profilu...", depName_CUSTOM: "Konfiguracja Własna",
                shiftLunch_title: "Zmiana i Przerwa", shiftType: "Rodzaj zmiany:", shiftType_auto: "Automatycznie", shiftType_day: "Dzienna", shiftType_night: "Nocna", shiftStartManual: "Początek zmiany (ręcznie):", lunchBreak: "Przerwa obiadowa:",
                lunch_day1: "Przerwa dzienna 1 (11:20-11:50)", lunch_day2: "Przerwa dzienna 2 (11:50-12:20)", lunch_day3: "Przerwa dzienna 3 (12:20-12:50)", lunch_day4: "Przerwa dzienna 4 (12:50-13:20)", lunch_night1: "Przerwa nocna 1 (23:20-23:50)", lunch_night2: "Przerwa nocna 2 (23:50-00:20)", lunch_night3: "Przerwa nocna 3 (00:20-00:50)", lunch_night4: "Przerwa nocna 4 (00:50-01:20)", lunch_noLunch: "Brak przerwy",
                stats_items: "Sztuk", stats_total: "Suma", stats_perHour: "/godz.", stats_lastAction: "Ostatnia akcja", stats_workedTime: "Przepracowano", stats_shift: "Zmiana", stats_lunch: "Przerwa", stats_thisTab: "Ta karta", stats_global: "Globalnie (Główne)", stats_otherTabsSummary: "Inne",
                minimalStats_title: "Statystyki minimalistyczne", minimalStats_enable: "Włącz 'Gołe liczby'", minimalStats_showTotal: "Pokaż sumę sztuk (Główne)", minimalStats_showPerHour: "Pokaż sztuk/godzinę (Główne)", minimalStats_dragHandle: " P ", minimalStats_pin: " Z ", minimalStats_resetPosition: "Resetuj pozycję", minimalStats_editPosition: "Przesuń 'Gołe liczby'",
                automation_title: "Automatyzacja i Wkład Kart", automation_autoIncrement: "Automatyczne naliczanie", automation_otherTabsContribution: "Inne dostępne karty:", automation_noOtherTabs: "(Brak innych aktywnych kart z pomocnikiem)",
                uiVisibility_title: "Widoczność elementów UI", uiVisibility_clock: "Zegar czasu rzeczywistego", uiVisibility_statsBlock: "Blok statystyk", uiVisibility_lastActionTimer: "Licznik od ostatniej akcji", uiVisibility_tabIndicatorPanel: "Nazwa karty w panelu", uiVisibility_pageOverlay: "Pełnoekranowa nakładka", uiVisibility_pageIndicatorText: "Tekstowy wskaźnik strony", uiVisibility_triggerDebug: "Debugowanie zdarzeń",
                appearance_title: "Wygląd bieżącej karty", appearance_currentTabName: "Nazwa bieżącej karty", appearance_displayName: "Nazwa wyświetlana karty:", appearance_overlayColor: "Kolor nakładki strony:", appearance_indicatorTextColor: "Kolor tekstu wskaźnika:", appearance_saveCustom: "Zapisz wygląd dla tego URL", appearance_resetCustom: "Resetuj wygląd do domyślnego",
                debug_title: "Narzędzia deweloperskie", debug_pointerBorders: "Pokaż ramki obszarów klikalnych", debug_autoClickerState: "Stan Auto-Kilkera", debug_initialTrigger: "Początkowy", debug_finalCRETTrigger: "Końcowy C-RET", debug_finalWHDREFTrigger: "Końcowy WHD/REF", debug_found: "ZNALAZIONO", debug_notFound: "Nie znaleziono", debug_flagOn: "Flaga:ON", debug_flagOff: "Flaga:OFF", debug_paths: "Ścieżki",
                button_plus: "+1", button_minus: "-1", settings_applyClose: "Zastosuj i Zamknij", time_s: "s", time_m: "m", time_h: "g", language_select: "Język:",
                stats_format_total_items_bare: (primaryCounts, secondaryCounts, T) => { // Legacy
                    let primaryStr = "";
                    if (primaryCounts.types.length > 0 && primaryCounts.TOTAL > 0) {
                        const pParts = [];
                        if (primaryCounts.CRET > 0) pParts.push(`${primaryCounts.CRET}C`); if (primaryCounts.WHD > 0) pParts.push(`${primaryCounts.WHD}W`);
                        if (primaryCounts.REFURB > 0) pParts.push(`${primaryCounts.REFURB}R`); if (primaryCounts.UNKNOWN > 0) pParts.push(`${primaryCounts.UNKNOWN}N`);
                        primaryStr = `[${pParts.join(', ')} = ${primaryCounts.TOTAL}]`;
                    } else { primaryStr = `[0 ${T('stats_items')}]`; }
                    let secondaryStr = "";
                    if (secondaryCounts.types.length > 0 && secondaryCounts.TOTAL > 0) {
                        const sParts = [];
                        if (secondaryCounts.CRET > 0) sParts.push(`${secondaryCounts.CRET}C`); if (secondaryCounts.WHD > 0) sParts.push(`${secondaryCounts.WHD}W`);
                        if (secondaryCounts.REFURB > 0) sParts.push(`${secondaryCounts.REFURB}R`); if (secondaryCounts.UNKNOWN > 0) sParts.push(`${secondaryCounts.UNKNOWN}N`);
                        secondaryStr = ` (+${sParts.join(', ')})`;
                    } return `${primaryStr}${secondaryStr}`;
                },
            }
        }
    };

    var UIManager;
    var SettingsPanel;
    var EventHandlers;
    var MinimalStatsDisplay; // Added forward declaration

    const state = {
        initialized: false, uiContainer: null, dom: {}, intervals: {}, timeouts: {}, mutationObserver: null, pageKeydownListener: null, beforeUnloadListener: null, storageListener: null,
        currentTheme: CONFIG.DEFAULT_THEME,
        uiPanelVisible: CONFIG.DEFAULT_UI_VISIBILITY_ON_INIT, uiPanelPosition: { x: CONFIG.UI_RIGHT_OFFSET, y: CONFIG.UI_BOTTOM_OFFSET }, uiPanelSize: { width: `${CONFIG.UI_INITIAL_WIDTH_VW}vw`, height: `${CONFIG.UI_INITIAL_HEIGHT_VH}vh`},
        uiLocked: false, settingsPanelVisible: false, leftPaneFlexBasis: CONFIG.LEFT_PANE_INITIAL_FLEX_BASIS, pointerEventsMode: CONFIG.DEFAULT_POINTER_EVENTS_MODE, isResizingPanel: false, isDraggingMinimalStats: false,
        minimalStatsVisible: CONFIG.MINIMAL_STATS_DEFAULT_VISIBLE, minimalStatsPosition: { bottom: `${CONFIG.MINIMAL_STATS_DEFAULT_BOTTOM_VH}vh`, right: `${CONFIG.MINIMAL_STATS_DEFAULT_RIGHT_VW}vw` },
        minimalStatsShowTotal: CONFIG.MINIMAL_STATS_SHOW_TOTAL_DEFAULT, minimalStatsShowPerHour: CONFIG.MINIMAL_STATS_SHOW_PER_HOUR_DEFAULT,
        minimalStatsTypeDisplayConfig: [], // New for v4.3 - for detailed type display in minimal stats
        // minimalStatsShowSecondary: CONFIG.MINIMAL_STATS_SHOW_SECONDARY_DEFAULT, // Legacy, behavior now controlled by minimalStatsTypeDisplayConfig for details.
        showClock: true, showStats: true, showLastActionTimer: true, showUITabIndicator: true, showPageOverlay: CONFIG.PAGE_COLOR_OVERLAY_DEFAULT_VISIBLE, showPageIndicatorText: CONFIG.PAGE_INDICATOR_TEXT_DEFAULT_VISIBLE, showTriggerDebug: CONFIG.DEBUG_MODE, debugPointerEventBorders: false,
        currentLanguage: CONFIG.DEFAULT_LANGUAGE, currentTabFullUrl: window.location.href, currentTabId: '', currentTabType: CONFIG.TAB_TYPES.UNKNOWN,
        currentTabModeDetails: { name: CONFIG.DEFAULT_TAB_MODE_NAME, color: CONFIG.DEFAULT_TAB_MODE_COLOR, textColor: CONFIG.DEFAULT_TAB_MODE_TEXT_COLOR, isCustom: false },
        currentDepartment: CONFIG.DEPARTMENTS.DETERMINING, departmentInfo: { department: null, sequence: [], sessionStartTime: null },
        clicksForThisTab: 0, lastActionTimestampForThisTab: Date.now(), currentTabContributesToAggregation: true,
        statsConfig: JSON.parse(JSON.stringify(CONFIG.DEFAULT_STATS_CONFIG)),
        shiftType: 'auto', shiftStartTime: null, selectedLunchOption: null,
        autoClickEnabled: true, autoClickerInternalState: 'IDLE', autoClickerInitialTriggerFound: false, autoClickerFinalTriggerFound: false,
        customTabThemes: {}, otherTabsData: {},
    };

    const Utils = {
        log: (level, ...args) => {
            const prefix = `[PA v${CONFIG.SCRIPT_VERSION} ${level.toUpperCase()}]`; const tabInfo = `${state.currentTabType || (state.currentTabId ? state.currentTabId.substring(0,10) : '')}`; const deptInfo = `${state.currentDepartment || ''}`; const fullPrefix = `${prefix} ${tabInfo}${deptInfo ? ` (${deptInfo})` : ''}:`;
            if (level === 'debug' && !CONFIG.DEBUG_MODE) return; const logFunction = console[level] || console.log; logFunction(fullPrefix, ...args);
        },
        debug: (...args) => Utils.log('debug', ...args), info: (...args) => Utils.log('info', ...args), warn: (...args) => Utils.log('warn', ...args), error: (...args) => Utils.log('error', ...args),
        getStorage: (useSession) => useSession ? sessionStorage : localStorage,
        getThemeColor: (colorKey) => {
            const theme = CONFIG.THEMES[state.currentTheme] || CONFIG.THEMES[CONFIG.DEFAULT_THEME]; const color = theme[colorKey];
            if (typeof color === 'undefined') {
                Utils.warn(`Theme color key "${colorKey}" not found for theme "${state.currentTheme}". Falling back to default theme.`); const defaultTheme = CONFIG.THEMES[CONFIG.DEFAULT_THEME]; const defaultColor = defaultTheme[colorKey];
                if (typeof defaultColor === 'undefined') { Utils.error(`Theme color key "${colorKey}" not found in default theme either. Falling back to black.`); return 'rgba(0,0,0,1)'; } return defaultColor;
            } return color;
        },
        generateTabId: (urlStr) => { try { const url = new URL(urlStr); let path = url.hostname.replace(/^www\./, '') + url.pathname.toLowerCase().replace(/\/$/, ''); path = path.replace(/[^a-z0-9_.-]/gi, '_').replace(/__+/g, '_'); if (path.length > 60) path = path.substring(0, 30) + '...' + path.substring(path.length - 27); return path || 'default_tab'; } catch (e) { Utils.error("Error generating Tab ID from URL:", urlStr, e); return 'error_tab_id_' + Date.now().toString().slice(-5); }},
        timeStringToMinutes: (timeStr) => { if (!timeStr || typeof timeStr !== 'string' || !timeStr.includes(':')) return 0; const [hours, minutes] = timeStr.split(':').map(Number); return isNaN(hours) || isNaN(minutes) ? 0 : hours * 60 + minutes; },
        formatDateToHHMM: (dateObj, includeSeconds = false) => { if (!dateObj || !(dateObj instanceof Date) || isNaN(dateObj.getTime())) return "N/A"; const h = String(dateObj.getHours()).padStart(2, '0'); const m = String(dateObj.getMinutes()).padStart(2, '0'); if (includeSeconds) { const s = String(dateObj.getSeconds()).padStart(2, '0'); return `${h}:${m}:${s}`; } return `${h}:${m}`; },
        formatMsToDuration: (ms, includeSeconds = false, useShortUnits = false) => {
            if (isNaN(ms) || ms < 0) ms = 0; let totalSeconds = Math.floor(ms / 1000); const hours = Math.floor(totalSeconds / 3600); totalSeconds %= 3600; const minutes = Math.floor(totalSeconds / 60); const seconds = totalSeconds % 60;
            const hUnit = useShortUnits ? Utils.getLangString('time_h') : 'h'; const mUnit = useShortUnits ? Utils.getLangString('time_m') : 'm'; const sUnit = useShortUnits ? Utils.getLangString('time_s') : 's';
            let parts = []; if (hours > 0) parts.push(`${String(hours)}${hUnit}`); if (hours > 0 || minutes > 0) parts.push(`${String(minutes).padStart(parts.length > 0 ? 2 : 1, '0')}${mUnit}`);
            if (includeSeconds || (hours === 0 && minutes === 0)) parts.push(`${String(seconds).padStart(parts.length > 0 ? 2 : 1, '0')}${sUnit}`); if (parts.length === 0) return `0${sUnit}`; return parts.join(' ');
        },
        createDOMElement: (tag, attributes = {}, children = []) => {
            const element = document.createElement(tag);
            for (const key in attributes) {
                if (key === 'style' && typeof attributes[key] === 'object') Object.assign(element.style, attributes[key]);
                else if (key === 'dataset' && typeof attributes[key] === 'object') Object.assign(element.dataset, attributes[key]);
                else if (key === 'id' && attributes[key]) element.id = CONFIG.SCRIPT_ID_PREFIX + attributes[key];
                else if (['textContent', 'innerHTML', 'value', 'checked', 'disabled', 'type', 'title', 'placeholder', 'tabIndex', 'src', 'className', 'name', 'htmlFor', 'colSpan', 'rowSpan', 'target', 'rel', 'maxLength'].includes(key) ) element[key] = attributes[key];
                else if (typeof attributes[key] === 'function' && key.startsWith('on')) element.addEventListener(key.substring(2).toLowerCase(), attributes[key]);
                else element.setAttribute(key, attributes[key]);
            }
            const isTextDisplayElement = (tag === 'div' || tag === 'span' || tag === 'p' || tag === 'h1' || tag === 'h2' || tag === 'h3' || tag === 'h4' || tag === 'h5' || tag === 'h6' || tag === 'label');
            const isPotentiallyInteractive = attributes.className?.includes('ph-interactive') || attributes.onClick || attributes.onmousedown || tag === 'button' || tag === 'select' || tag === 'input' || tag ==='textarea';
            if (isTextDisplayElement && !isPotentiallyInteractive && (!attributes.style || attributes.style.pointerEvents === undefined)) { element.style.pointerEvents = 'none'; element.style.userSelect = 'none'; }
            children.forEach(child => {
                if (child === null || typeof child === 'undefined') return; if (typeof child === 'string' || typeof child === 'number') element.appendChild(document.createTextNode(String(child)));
                else if (child instanceof Node) element.appendChild(child);
                else if (Array.isArray(child)) child.forEach(c => { if (c instanceof Node) element.appendChild(c); else if (typeof c === 'string' || typeof c === 'number') element.appendChild(document.createTextNode(String(c))); });
            }); return element;
        },
        makeButtonInteractive: (button, scale = 0.95) => { if (!button) return; button.addEventListener('mousedown', e => { if (e.button !== 0) return; if (!button.disabled) button.style.transform = `scale(${scale})`; }); const resetTransform = () => { if (!button.disabled) button.style.transform = 'scale(1)'; }; button.addEventListener('mouseup', resetTransform); button.addEventListener('mouseleave', resetTransform); button.addEventListener('blur', resetTransform); },
        applyElementInteractivity: (element, interactive, cursorStyle = 'default') => { if (!element) return; if (interactive) { element.style.pointerEvents = 'auto'; if (element.tagName !== 'INPUT' && element.tagName !== 'TEXTAREA' && element.tagName !== 'SELECT' && element.tagName !== 'BUTTON') element.style.userSelect = 'auto'; element.style.cursor = cursorStyle; } else { element.style.pointerEvents = 'none'; element.style.userSelect = 'none'; element.style.cursor = 'default'; }},
        getLangString: (key, ...args) => { const langPack = CONFIG.LANG_STRINGS[state.currentLanguage] || CONFIG.LANG_STRINGS[CONFIG.DEFAULT_LANGUAGE]; let str = langPack[key]; if (typeof str === 'undefined') { const defaultLangPack = CONFIG.LANG_STRINGS[CONFIG.DEFAULT_LANGUAGE]; str = defaultLangPack[key]; if (typeof str === 'undefined') { Utils.warn(`Lang key "${key}" not found in "${state.currentLanguage}" or default "${CONFIG.DEFAULT_LANGUAGE}".`); return `[Missing ${state.currentLanguage.toUpperCase()} Translation: ${key}]`; }} if (typeof str === 'function') { try { return str(...args); } catch (e) { Utils.error(`Error executing lang string function for key "${key}":`, e); return `[Error in lang fn: ${key}]`; }} if (args.length > 0 && typeof str === 'string') args.forEach((arg, i) => { str = str.replace(new RegExp(`\\{${i}\\}`, 'g'), String(arg)); }); return str; },
        debounce: (func, delay) => { let timeoutId; return function(...args) { clearTimeout(timeoutId); timeoutId = setTimeout(() => { func.apply(this, args); }, delay); }; },
        getUniqueSelectorPath: (element, limit = 5) => { if (!(element instanceof Element)) return 'Not an Element'; const path = []; while (element.nodeType === Node.ELEMENT_NODE && path.length < limit) { let selector = element.nodeName.toLowerCase(); if (element.id && !element.id.startsWith(CONFIG.SCRIPT_ID_PREFIX)) { selector += `#${element.id.split(' ')[0]}`; path.unshift(selector); break; } else { let classNames = Array.from(element.classList).filter(cn => !cn.startsWith('ph-') && !cn.startsWith(CONFIG.SCRIPT_ID_PREFIX.slice(0,-1))).slice(0, 2); if (classNames.length > 0) selector += `.${classNames.join('.')}`; else if (element.parentElement) { let sibling = element; let nth = 1; while (sibling.previousElementSibling) { sibling = sibling.previousElementSibling; if (sibling.nodeName.toLowerCase() === element.nodeName.toLowerCase()) nth++; } if (nth > 1) selector += `:nth-of-type(${nth})`; }} path.unshift(selector); element = element.parentNode; if (element === document.body || element === document.documentElement) { path.unshift(element.nodeName.toLowerCase()); break; }} return path.join(' > '); },
        timeToDate: (timeStr, baseDate = new Date()) => { const [hours, minutes] = timeStr.split(':').map(Number); const date = new Date(baseDate); date.setHours(hours, minutes, 0, 0); return date; },
        normalizeTabType: (typeString) => { const upperType = String(typeString).toUpperCase(); if (upperType.includes('C-RET') || upperType.includes('CRET')) return CONFIG.TAB_TYPES.CRET; if (upperType.includes('WHD')) return CONFIG.TAB_TYPES.WHD; if (upperType.includes('REFURB')) return CONFIG.TAB_TYPES.REFURB; return CONFIG.TAB_TYPES.UNKNOWN; }
    };

    const StorageManager = {
        _prefixKey: (key) => `${CONFIG.SCRIPT_ID_PREFIX}${key}`,
        save: (key, value, useSession = false) => { try { const storage = Utils.getStorage(useSession); storage.setItem(StorageManager._prefixKey(key), JSON.stringify(value)); } catch (e) { Utils.error(`Failed to save to storage (key: ${key}):`, e); }},
        load: (key, defaultValue = null, useSession = false) => { try { const storage = Utils.getStorage(useSession); const value = storage.getItem(StorageManager._prefixKey(key)); return value ? JSON.parse(value) : defaultValue; } catch (e) { Utils.error(`Failed to load from storage (key: ${key}):`, e); return defaultValue; }},
        remove: (key, useSession = false) => { try { const storage = Utils.getStorage(useSession); storage.removeItem(StorageManager._prefixKey(key)); } catch (e) { Utils.error(`Failed to remove from storage (key: ${key}):`, e); }},
        loadAllState: () => {
            Utils.info("Loading all state from storage..."); state.currentTabId = Utils.generateTabId(state.currentTabFullUrl);
            state.currentLanguage = StorageManager.load(CONFIG.STORAGE_KEY_LANGUAGE, CONFIG.DEFAULT_LANGUAGE, false); if (!CONFIG.AVAILABLE_LANGUAGES.find(l => l.code === state.currentLanguage)) state.currentLanguage = CONFIG.DEFAULT_LANGUAGE;
            state.currentTheme = StorageManager.load(CONFIG.STORAGE_KEY_THEME_PREFERENCE, CONFIG.DEFAULT_THEME, false); if (!CONFIG.THEMES[state.currentTheme]) state.currentTheme = CONFIG.DEFAULT_THEME;
            const uiSizePos = StorageManager.load(CONFIG.STORAGE_KEY_UI_SIZE_POS, null, false); if (uiSizePos) { if (uiSizePos.width) state.uiPanelSize.width = uiSizePos.width; if (uiSizePos.height) state.uiPanelSize.height = uiSizePos.height; }
            const minStatsPos = StorageManager.load(CONFIG.STORAGE_KEY_MINIMAL_STATS_POS, null, false); if (minStatsPos) state.minimalStatsPosition = minStatsPos;
            state.customTabThemes = StorageManager.load(CONFIG.STORAGE_KEY_CUSTOM_THEMES, {}, false); StorageManager.determineCurrentTabTypeAndModeDetails();
            const mainSettings = StorageManager.load(CONFIG.STORAGE_KEY_MAIN_SETTINGS + state.currentTabId, {}, CONFIG.USE_SESSION_STORAGE_FOR_UI_STATE);
            state.uiPanelVisible = typeof mainSettings.uiPanelVisible === 'boolean' ? mainSettings.uiPanelVisible : CONFIG.DEFAULT_UI_VISIBILITY_ON_INIT; state.uiLocked = typeof mainSettings.uiLocked === 'boolean' ? mainSettings.uiLocked : false; state.settingsPanelVisible = typeof mainSettings.settingsPanelVisible === 'boolean' ? mainSettings.settingsPanelVisible : false; state.leftPaneFlexBasis = mainSettings.leftPaneFlexBasis || CONFIG.LEFT_PANE_INITIAL_FLEX_BASIS; state.pointerEventsMode = mainSettings.pointerEventsMode || CONFIG.DEFAULT_POINTER_EVENTS_MODE;
            state.showClock = typeof mainSettings.showClock === 'boolean' ? mainSettings.showClock : true; state.showStats = typeof mainSettings.showStats === 'boolean' ? mainSettings.showStats : true; state.showLastActionTimer = typeof mainSettings.showLastActionTimer === 'boolean' ? mainSettings.showLastActionTimer : true; state.showUITabIndicator = typeof mainSettings.showUITabIndicator === 'boolean' ? mainSettings.showUITabIndicator : true; state.showPageOverlay = typeof mainSettings.showPageOverlay === 'boolean' ? mainSettings.showPageOverlay : CONFIG.PAGE_COLOR_OVERLAY_DEFAULT_VISIBLE; state.showPageIndicatorText = typeof mainSettings.showPageIndicatorText === 'boolean' ? mainSettings.showPageIndicatorText : CONFIG.PAGE_INDICATOR_TEXT_DEFAULT_VISIBLE; state.showTriggerDebug = typeof mainSettings.showTriggerDebug === 'boolean' ? mainSettings.showTriggerDebug : CONFIG.DEBUG_MODE; state.debugPointerEventBorders = typeof mainSettings.debugPointerEventBorders === 'boolean' ? mainSettings.debugPointerEventBorders : false;
            state.minimalStatsVisible = typeof mainSettings.minimalStatsVisible === 'boolean' ? mainSettings.minimalStatsVisible : CONFIG.MINIMAL_STATS_DEFAULT_VISIBLE; state.minimalStatsShowTotal = typeof mainSettings.minimalStatsShowTotal === 'boolean' ? mainSettings.minimalStatsShowTotal : CONFIG.MINIMAL_STATS_SHOW_TOTAL_DEFAULT; state.minimalStatsShowPerHour = typeof mainSettings.minimalStatsShowPerHour === 'boolean' ? mainSettings.minimalStatsShowPerHour : CONFIG.MINIMAL_STATS_SHOW_PER_HOUR_DEFAULT;
            // state.minimalStatsShowSecondary is now legacy, not loaded directly into a single state boolean.
            state.shiftType = mainSettings.shiftType || 'auto'; state.shiftStartTime = mainSettings.shiftStartTimeISO ? new Date(mainSettings.shiftStartTimeISO) : null; if (mainSettings.selectedLunchOptionIndex >= 0 && CONFIG.DEFAULT_LUNCH_OPTIONS[mainSettings.selectedLunchOptionIndex]) state.selectedLunchOption = CONFIG.DEFAULT_LUNCH_OPTIONS[mainSettings.selectedLunchOptionIndex]; else state.selectedLunchOption = null;
            state.autoClickEnabled = typeof mainSettings.autoClickEnabled === 'boolean' ? mainSettings.autoClickEnabled : true; state.currentTabContributesToAggregation = typeof mainSettings.currentTabContributesToAggregation === 'boolean' ? mainSettings.currentTabContributesToAggregation : true;
            const deptInfo = StorageManager.load(CONFIG.STORAGE_KEY_DEPARTMENT_INFO, { department: null, sequence: [], sessionStartTime: null }, false); state.departmentInfo = deptInfo; state.currentDepartment = deptInfo.department || CONFIG.DEPARTMENTS.DETERMINING;
            const loadedStatsConfig = StorageManager.load(CONFIG.STORAGE_KEY_STATS_CONFIG, null, false);
            if (loadedStatsConfig && Array.isArray(loadedStatsConfig.primaryContributingTabs) && Array.isArray(loadedStatsConfig.secondaryInfoTabs)) state.statsConfig = loadedStatsConfig;
            else state.statsConfig = JSON.parse(JSON.stringify(CONFIG.DEFAULT_STATS_CONFIG));

            // Load Minimal Stats Type Display Config
            const loadedMinimalStatsTypeConfig = StorageManager.load(CONFIG.STORAGE_KEY_MINIMAL_STATS_TYPE_CONFIG, null, false);
            if (loadedMinimalStatsTypeConfig && Array.isArray(loadedMinimalStatsTypeConfig)) {
                // Basic validation and merge with defaults to ensure all types are present
                const defaultConfig = MinimalStatsDisplay.getDefaultTypeConfig();
                state.minimalStatsTypeDisplayConfig = defaultConfig.map(defaultItem => {
                    const loadedItem = loadedMinimalStatsTypeConfig.find(li => li.type === defaultItem.type);
                    return loadedItem ? { ...defaultItem, ...loadedItem } : defaultItem;
                }).sort((a,b) => a.order - b.order); // Ensure sorted by order
            } else {
                state.minimalStatsTypeDisplayConfig = MinimalStatsDisplay.getDefaultTypeConfig();
            }

            StorageManager.readAllTabsDataFromLocalStorage(true);
        },
        saveMainSettings: () => { const lunchIndex = state.selectedLunchOption ? CONFIG.DEFAULT_LUNCH_OPTIONS.findIndex(opt => opt.start === state.selectedLunchOption.start && opt.end === state.selectedLunchOption.end && opt.type === state.selectedLunchOption.type) : -1; const dataToSave = { uiPanelVisible: state.uiPanelVisible, uiLocked: state.uiLocked, settingsPanelVisible: state.settingsPanelVisible, leftPaneFlexBasis: state.leftPaneFlexBasis, pointerEventsMode: state.pointerEventsMode, showClock: state.showClock, showStats: state.showStats, showLastActionTimer: state.showLastActionTimer, showUITabIndicator: state.showUITabIndicator, showPageOverlay: state.showPageOverlay, showPageIndicatorText: state.showPageIndicatorText, showTriggerDebug: state.showTriggerDebug, debugPointerEventBorders: state.debugPointerEventBorders, minimalStatsVisible: state.minimalStatsVisible, minimalStatsShowTotal: state.minimalStatsShowTotal, minimalStatsShowPerHour: state.minimalStatsShowPerHour, shiftType: state.shiftType, shiftStartTimeISO: state.shiftStartTime ? state.shiftStartTime.toISOString() : null, selectedLunchOptionIndex: lunchIndex, autoClickEnabled: state.autoClickEnabled, currentTabContributesToAggregation: state.currentTabContributesToAggregation, }; StorageManager.save(CONFIG.STORAGE_KEY_MAIN_SETTINGS + state.currentTabId, dataToSave, CONFIG.USE_SESSION_STORAGE_FOR_UI_STATE); },
        saveUIPanelSizePos: () => { StorageManager.save(CONFIG.STORAGE_KEY_UI_SIZE_POS, state.uiPanelSize, false); }, saveMinimalStatsPos: () => { StorageManager.save(CONFIG.STORAGE_KEY_MINIMAL_STATS_POS, state.minimalStatsPosition, false); }, saveCustomThemes: () => { StorageManager.save(CONFIG.STORAGE_KEY_CUSTOM_THEMES, state.customTabThemes, false); }, saveDepartmentInfo: () => { StorageManager.save(CONFIG.STORAGE_KEY_DEPARTMENT_INFO, state.departmentInfo, false); }, saveLanguagePreference: () => { StorageManager.save(CONFIG.STORAGE_KEY_LANGUAGE, state.currentLanguage, false); }, saveThemePreference: () => { StorageManager.save(CONFIG.STORAGE_KEY_THEME_PREFERENCE, state.currentTheme, false); }, saveStatsConfig: () => { StorageManager.save(CONFIG.STORAGE_KEY_STATS_CONFIG, state.statsConfig, false); },
        saveMinimalStatsTypeConfig: () => { StorageManager.save(CONFIG.STORAGE_KEY_MINIMAL_STATS_TYPE_CONFIG, state.minimalStatsTypeDisplayConfig, false); },
        determineCurrentTabTypeAndModeDetails: () => {
            const urlUpper = state.currentTabFullUrl.toUpperCase(); state.currentTabType = CONFIG.TAB_TYPES.UNKNOWN;
            for (const mode of CONFIG.TAB_IDENTIFICATION_MODES) { if (urlUpper.includes(mode.keyword.toUpperCase())) { if (mode.name === 'C-RET') state.currentTabType = CONFIG.TAB_TYPES.CRET; else if (mode.name === 'WHD') state.currentTabType = CONFIG.TAB_TYPES.WHD; else if (mode.name === 'REFURB') state.currentTabType = CONFIG.TAB_TYPES.REFURB; break; }}
            const customTheme = state.customTabThemes[state.currentTabFullUrl]; if (customTheme && customTheme.name && customTheme.color && customTheme.textColor) { state.currentTabModeDetails = { ...customTheme, isCustom: true }; return; }
            const autoDetectedMode = CONFIG.TAB_IDENTIFICATION_MODES.find(m => { if (state.currentTabType === CONFIG.TAB_TYPES.CRET && m.name === 'C-RET') return true; if (state.currentTabType === CONFIG.TAB_TYPES.WHD && m.name === 'WHD') return true; if (state.currentTabType === CONFIG.TAB_TYPES.REFURB && m.name === 'REFURB') return true; return urlUpper.includes(m.keyword.toUpperCase()); });
            if (autoDetectedMode) state.currentTabModeDetails = { ...autoDetectedMode, isCustom: false }; else state.currentTabModeDetails = { name: CONFIG.DEFAULT_TAB_MODE_NAME, color: CONFIG.DEFAULT_TAB_MODE_COLOR, textColor: CONFIG.DEFAULT_TAB_MODE_TEXT_COLOR, isCustom: false };
        },
        writeCurrentTabDataToLocalStorage: () => { if (!state.currentTabId) { Utils.error("Cannot write tab data: currentTabId is not set."); return; } try { const tabData = { tabId: state.currentTabId, type: state.currentTabType, modeName: state.currentTabModeDetails.name, clicks: state.clicksForThisTab, lastActionTimestamp: state.lastActionTimestampForThisTab, contributesToAggregation: state.currentTabContributesToAggregation, department: state.currentDepartment, timestamp: Date.now() }; localStorage.setItem(CONFIG.SCRIPT_ID_PREFIX + CONFIG.MULTI_TAB_STORAGE_PREFIX + state.currentTabId, JSON.stringify(tabData)); } catch (e) { Utils.error('Error writing tab data to localStorage:', e); }},
        readAllTabsDataFromLocalStorage: (isInitialLoad = false) => {
            let newOtherTabsData = {}; const now = Date.now();
            try { for (let i = 0; i < localStorage.length; i++) { const key = localStorage.key(i); if (key && key.startsWith(CONFIG.SCRIPT_ID_PREFIX + CONFIG.MULTI_TAB_STORAGE_PREFIX)) { const itemJson = localStorage.getItem(key); if (itemJson) { try { const itemData = JSON.parse(itemJson); if (now - (itemData.timestamp || 0) > CONFIG.MULTI_TAB_DATA_TTL_MS) { localStorage.removeItem(key); continue; } if (itemData.tabId === state.currentTabId) { if (isInitialLoad) { state.clicksForThisTab = parseInt(itemData.clicks, 10) || 0; state.lastActionTimestampForThisTab = parseInt(itemData.lastActionTimestamp, 10) || Date.now(); } newOtherTabsData[itemData.tabId] = { ...itemData, clicks: state.clicksForThisTab, contributesToAggregation: state.currentTabContributesToAggregation, department: state.currentDepartment }; } else newOtherTabsData[itemData.tabId] = itemData; } catch (parseError) { Utils.error(`Error parsing localStorage key ${key}:`, parseError); localStorage.removeItem(key); }}}}} catch (e) { Utils.error('Error reading from localStorage multi-tab sync:', e); }
            state.otherTabsData = newOtherTabsData;
            if (!isInitialLoad && typeof UIManager !== 'undefined' && UIManager.isInitialized()) { UIManager.updateStatisticsDisplay(); MinimalStatsDisplay.updateDisplay(); if (state.settingsPanelVisible) SettingsPanel.updateOtherTabsSettingsDisplay(); }
        }
    };

    const DepartmentManager = {
        _determinationTimeoutId: null,
        init: () => { DepartmentManager.checkAndReloadForSessionTTL(); DepartmentManager.determineDepartmentProfileOnLaunch(); },
        checkAndReloadForSessionTTL: () => { const { sessionStartTime } = state.departmentInfo; if (sessionStartTime) { const ttlMs = CONFIG.DEPARTMENT_SESSION_TTL_HOURS * 60 * 60 * 1000; if (Date.now() - sessionStartTime > ttlMs) { Utils.info("Department session TTL expired. Clearing department info and reloading page."); StorageManager.remove(CONFIG.STORAGE_KEY_DEPARTMENT_INFO, false); window.location.reload(true); }}},
        determineDepartmentProfileOnLaunch: () => {
            Utils.debug("DepartmentManager: Determining department profile on launch."); const { department, sessionStartTime } = state.departmentInfo;
            if (department && department !== CONFIG.DEPARTMENTS.DETERMINING && department !== CONFIG.DEPARTMENTS.CUSTOM && sessionStartTime) { Utils.info(`Department profile already determined: ${department}. Session started: ${new Date(sessionStartTime)}`); state.currentDepartment = department; const userStatsConfig = StorageManager.load(CONFIG.STORAGE_KEY_STATS_CONFIG, null, false); if (!userStatsConfig) DepartmentManager.applyDepartmentDefaultStatsConfig(department); return; }
            const userStatsConfig = StorageManager.load(CONFIG.STORAGE_KEY_STATS_CONFIG, null, false); if (userStatsConfig) { Utils.info("User has custom stats configuration. Setting department to CUSTOM."); DepartmentManager._setDepartmentProfile(CONFIG.DEPARTMENTS.CUSTOM, false); return; }
            state.currentDepartment = CONFIG.DEPARTMENTS.DETERMINING; if (!sessionStartTime || !state.departmentInfo.sequence) { state.departmentInfo.sequence = []; state.departmentInfo.sessionStartTime = Date.now(); Utils.info("Starting new department profile determination session."); } else Utils.info("Continuing department profile determination session.");
            DepartmentManager.updateSequenceAndTryDetermine();
        },
        updateSequenceAndTryDetermine: () => {
            if (state.currentDepartment === CONFIG.DEPARTMENTS.CUSTOM) { Utils.debug("DepartmentManager: Custom config active, skipping sequence update for profile."); return; } if (state.currentDepartment && state.currentDepartment !== CONFIG.DEPARTMENTS.DETERMINING && state.currentDepartment !== CONFIG.DEPARTMENTS.UNKNOWN) { Utils.debug("Department profile already set, skipping sequence update:", state.currentDepartment); return; }
            const currentTabLaunchInfo = { type: state.currentTabType, timestamp: Date.now() }; let addedToSequence = false; const existingTypeEntry = state.departmentInfo.sequence.find(s => s.type === currentTabLaunchInfo.type); if (!existingTypeEntry) { state.departmentInfo.sequence.push(currentTabLaunchInfo); addedToSequence = true; }
            if(addedToSequence) Utils.debug("Updated department sequence:", JSON.stringify(state.departmentInfo.sequence.map(s=>s.type))); StorageManager.saveDepartmentInfo();
            let determinedDept = null; const seq = state.departmentInfo.sequence.map(s => s.type);
            if (seq.includes(CONFIG.TAB_TYPES.CRET) && seq.includes(CONFIG.TAB_TYPES.WHD) && seq.includes(CONFIG.TAB_TYPES.REFURB)) { const cretIdx = state.departmentInfo.sequence.findIndex(s => s.type === CONFIG.TAB_TYPES.CRET); const whdIdx = state.departmentInfo.sequence.findIndex(s => s.type === CONFIG.TAB_TYPES.WHD); const refurbIdx = state.departmentInfo.sequence.findIndex(s => s.type === CONFIG.TAB_TYPES.REFURB); if (whdIdx > cretIdx && refurbIdx > whdIdx) determinedDept = CONFIG.DEPARTMENTS.UG; else if (refurbIdx > cretIdx && whdIdx > refurbIdx) determinedDept = CONFIG.DEPARTMENTS.BK; }
            if (!determinedDept && seq.length > 0 && state.departmentInfo.sequence[0].type === CONFIG.TAB_TYPES.REFURB && seq.includes(CONFIG.TAB_TYPES.WHD)) determinedDept = CONFIG.DEPARTMENTS.RB;
            if (determinedDept) { DepartmentManager._setDepartmentProfile(determinedDept); return; }
            if (seq.length > 0 && !determinedDept ) { clearTimeout(DepartmentManager._determinationTimeoutId); DepartmentManager._determinationTimeoutId = setTimeout(() => { const currentSeqInfo = StorageManager.load(CONFIG.STORAGE_KEY_DEPARTMENT_INFO, { sequence: [] }, false); const currentStoredSeq = currentSeqInfo.sequence.map(s => s.type); if (currentStoredSeq.length === 0) { DepartmentManager._setDepartmentProfile(CONFIG.DEPARTMENTS.UNKNOWN); return; } const uniqueTypesInStoredSeq = [...new Set(currentStoredSeq)]; let timeoutDept = null; if (uniqueTypesInStoredSeq.length === 1) { const firstType = uniqueTypesInStoredSeq[0]; if (firstType === CONFIG.TAB_TYPES.REFURB) timeoutDept = CONFIG.DEPARTMENTS.RB_ONLY; else if (firstType === CONFIG.TAB_TYPES.CRET) timeoutDept = CONFIG.DEPARTMENTS.CR; else if (firstType === CONFIG.TAB_TYPES.WHD) timeoutDept = CONFIG.DEPARTMENTS.WD; } else if (currentStoredSeq[0] === CONFIG.TAB_TYPES.REFURB && !currentStoredSeq.includes(CONFIG.TAB_TYPES.WHD)) timeoutDept = CONFIG.DEPARTMENTS.RB_ONLY; if (timeoutDept) DepartmentManager._setDepartmentProfile(timeoutDept); else { const complexCheckDept = DepartmentManager._checkComplexAfterTimeout(); if (complexCheckDept) DepartmentManager._setDepartmentProfile(complexCheckDept); else { Utils.warn("Department profile determination timed out, no specific rule matched. Setting to UNKNOWN."); DepartmentManager._setDepartmentProfile(CONFIG.DEPARTMENTS.UNKNOWN); }}}, CONFIG.DEPARTMENT_DETERMINATION_TIMEOUT_MS); Utils.debug(`DepartmentManager: Timeout set for ${CONFIG.DEPARTMENT_DETERMINATION_TIMEOUT_MS / 1000}s for potential single-type department profile.`); }
        },
        _checkComplexAfterTimeout: () => { const { sequence } = StorageManager.load(CONFIG.STORAGE_KEY_DEPARTMENT_INFO, { sequence: [] }, false); const seq = sequence.map(s => s.type); let determinedDept = null; if (seq.includes(CONFIG.TAB_TYPES.CRET) && seq.includes(CONFIG.TAB_TYPES.WHD) && seq.includes(CONFIG.TAB_TYPES.REFURB)) { const cretIdx = sequence.findIndex(s => s.type === CONFIG.TAB_TYPES.CRET); const whdIdx = sequence.findIndex(s => s.type === CONFIG.TAB_TYPES.WHD); const refurbIdx = sequence.findIndex(s => s.type === CONFIG.TAB_TYPES.REFURB); if (whdIdx > cretIdx && refurbIdx > whdIdx) determinedDept = CONFIG.DEPARTMENTS.UG; else if (refurbIdx > cretIdx && whdIdx > refurbIdx) determinedDept = CONFIG.DEPARTMENTS.BK; } if (!determinedDept && seq.length > 0 && sequence[0].type === CONFIG.TAB_TYPES.REFURB && seq.includes(CONFIG.TAB_TYPES.WHD)) determinedDept = CONFIG.DEPARTMENTS.RB; return determinedDept; },
        _setDepartmentProfile: (dept, applyDefaultStats = true) => {
            Utils.info(`Department profile suggested: ${dept}`); state.currentDepartment = dept; state.departmentInfo.department = dept; if (!state.departmentInfo.sessionStartTime) state.departmentInfo.sessionStartTime = Date.now(); StorageManager.saveDepartmentInfo(); clearTimeout(DepartmentManager._determinationTimeoutId); DepartmentManager._determinationTimeoutId = null;
            if (applyDefaultStats) { const userStatsConfig = StorageManager.load(CONFIG.STORAGE_KEY_STATS_CONFIG, null, false); if (!userStatsConfig) DepartmentManager.applyDepartmentDefaultStatsConfig(dept); }
            if (state.initialized) { UIManager.updateStatisticsDisplay(); MinimalStatsDisplay.updateDisplay(); if (state.settingsPanelVisible) { SettingsPanel.populateDepartmentInfo(); SettingsPanel.populateStatsConfigFields(); SettingsPanel.populateMinimalStatsTypeDisplayConfigFields(); }}
        },
        applyDepartmentDefaultStatsConfig: (dept) => { let suggestedConfig = JSON.parse(JSON.stringify(CONFIG.DEFAULT_STATS_CONFIG)); switch(dept) { case CONFIG.DEPARTMENTS.UG: suggestedConfig.primaryContributingTabs = [CONFIG.TAB_TYPES.CRET, CONFIG.TAB_TYPES.WHD, CONFIG.TAB_TYPES.REFURB]; suggestedConfig.secondaryInfoTabs = []; break; case CONFIG.DEPARTMENTS.BK: suggestedConfig.primaryContributingTabs = [CONFIG.TAB_TYPES.CRET, CONFIG.TAB_TYPES.WHD]; suggestedConfig.secondaryInfoTabs = [CONFIG.TAB_TYPES.REFURB]; break; case CONFIG.DEPARTMENTS.RB: suggestedConfig.primaryContributingTabs = [CONFIG.TAB_TYPES.REFURB]; suggestedConfig.secondaryInfoTabs = [CONFIG.TAB_TYPES.WHD]; break; case CONFIG.DEPARTMENTS.CR: suggestedConfig.primaryContributingTabs = [CONFIG.TAB_TYPES.CRET]; suggestedConfig.secondaryInfoTabs = []; break; case CONFIG.DEPARTMENTS.WD: suggestedConfig.primaryContributingTabs = [CONFIG.TAB_TYPES.WHD]; suggestedConfig.secondaryInfoTabs = []; break; case CONFIG.DEPARTMENTS.RB_ONLY: suggestedConfig.primaryContributingTabs = [CONFIG.TAB_TYPES.REFURB]; suggestedConfig.secondaryInfoTabs = []; break; case CONFIG.DEPARTMENTS.UNKNOWN: case CONFIG.DEPARTMENTS.DETERMINING: suggestedConfig.primaryContributingTabs = [CONFIG.TAB_TYPES.CRET, CONFIG.TAB_TYPES.WHD, CONFIG.TAB_TYPES.REFURB]; suggestedConfig.secondaryInfoTabs = []; break; } state.statsConfig = suggestedConfig; StorageManager.saveStatsConfig(); Utils.info(`Applied default stats configuration for department profile: ${dept}`); },
        getDepartmentDisplayName: (deptCode) => { const code = deptCode || state.currentDepartment || CONFIG.DEPARTMENTS.DETERMINING; return Utils.getLangString(`depName_${code}`); }
    };

    const ShiftManager = {
        init: () => { if (!state.shiftStartTime || isNaN(new Date(state.shiftStartTime).getTime())) ShiftManager.determineAndSetShiftStartTime(true); else state.shiftStartTime = new Date(state.shiftStartTime); if (!state.selectedLunchOption) ShiftManager.setDynamicDefaultLunch(); },
        determineAndSetShiftStartTime: (forceAuto = false) => { const now = new Date(); let shiftStartHour, shiftStartMinute; let calculatedStartTime = new Date(now); let determinedShiftCategory = ''; const dayStartTotalMinutes = Utils.timeStringToMinutes(CONFIG.DEFAULT_DAY_SHIFT_START_TIME); const nightStartTotalMinutes = Utils.timeStringToMinutes(CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME); if (forceAuto || state.shiftType === 'auto') { const currentTotalMinutes = now.getHours() * 60 + now.getMinutes(); if (currentTotalMinutes >= dayStartTotalMinutes && currentTotalMinutes < nightStartTotalMinutes) { determinedShiftCategory = 'day'; [shiftStartHour, shiftStartMinute] = CONFIG.DEFAULT_DAY_SHIFT_START_TIME.split(':').map(Number); } else { determinedShiftCategory = 'night'; [shiftStartHour, shiftStartMinute] = CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME.split(':').map(Number); if (currentTotalMinutes < nightStartTotalMinutes) calculatedStartTime.setDate(now.getDate() -1); } calculatedStartTime.setHours(shiftStartHour, shiftStartMinute, 0, 0); state.shiftStartTime = calculatedStartTime; if (state.shiftType === 'auto' || forceAuto) state.shiftType = determinedShiftCategory; } else if (state.shiftType === 'day' || state.shiftType === 'night') { const timeValue = state.dom.settingsShiftStartTimeInput?.value; let baseTime = state.shiftType === 'day' ? CONFIG.DEFAULT_DAY_SHIFT_START_TIME : CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME; if (timeValue) baseTime = timeValue; [shiftStartHour, shiftStartMinute] = baseTime.split(':').map(Number); calculatedStartTime.setHours(shiftStartHour, shiftStartMinute, 0, 0); if (state.shiftType === 'night' && (now.getHours() < shiftStartHour || (now.getHours() === shiftStartHour && now.getMinutes() < shiftStartMinute))) calculatedStartTime.setDate(now.getDate() -1); state.shiftStartTime = calculatedStartTime; } if (state.shiftStartTime > now) state.shiftStartTime.setDate(state.shiftStartTime.getDate() -1); Utils.debug(`Shift start time set to: ${state.shiftStartTime}, type: ${state.shiftType}`); ShiftManager.setDynamicDefaultLunch(); },
        setDynamicDefaultLunch: () => { let potentialShiftType = state.shiftType; if (potentialShiftType === 'auto') potentialShiftType = ShiftManager.getCurrentShiftCategory(); const defaultLunch = CONFIG.DEFAULT_LUNCH_OPTIONS.find(opt => opt.type === potentialShiftType) || CONFIG.DEFAULT_LUNCH_OPTIONS.find(opt => opt.type === "any") || CONFIG.DEFAULT_LUNCH_OPTIONS[0]; state.selectedLunchOption = defaultLunch; },
        getCurrentShiftCategory: () => { if (!state.shiftStartTime) return 'any'; const shiftStartHour = state.shiftStartTime.getHours(); const dayStartH = parseInt(CONFIG.DEFAULT_DAY_SHIFT_START_TIME.split(':')[0], 10); const nightStartH = parseInt(CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME.split(':')[0], 10); if (state.shiftType === 'day') return 'day'; if (state.shiftType === 'night') return 'night'; if (shiftStartHour >= dayStartH && shiftStartHour < nightStartH) return 'day'; else return 'night'; },
        calculateEffectiveWorkTimeMs: () => { if (!state.shiftStartTime) return 0; const now = new Date(); let totalElapsedMs = now.getTime() - state.shiftStartTime.getTime(); if (totalElapsedMs < 0) totalElapsedMs = 0; let lunchDurationMs = 0; const lunch = state.selectedLunchOption; if (lunch && (lunch.start !== "00:00" || lunch.end !== "00:00")) { let lunchStartAbs = Utils.timeToDate(lunch.start, state.shiftStartTime); let lunchEndAbs = Utils.timeToDate(lunch.end, state.shiftStartTime); if (lunchEndAbs < lunchStartAbs) lunchEndAbs.setDate(lunchEndAbs.getDate() + 1); if (state.shiftStartTime.getHours() > lunchStartAbs.getHours() && lunchStartAbs < lunchEndAbs) { lunchStartAbs.setDate(lunchStartAbs.getDate() + 1); lunchEndAbs.setDate(lunchEndAbs.getDate() + 1); } const effectiveActualLunchStart = Math.max(state.shiftStartTime.getTime(), lunchStartAbs.getTime()); const effectiveActualLunchEnd = Math.min(now.getTime(), lunchEndAbs.getTime()); if (effectiveActualLunchEnd > effectiveActualLunchStart) lunchDurationMs = effectiveActualLunchEnd - effectiveActualLunchStart; } return Math.max(0, totalElapsedMs - lunchDurationMs); }
    };

    const ResizableItemsManager = {
        isResizingPane: false, activeResizeTarget: null,
        initPanelResizing: (panelElement) => { const handles = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw']; const handleSize = CONFIG.RESIZE_HANDLE_SIZE_PX; handles.forEach(dir => { const handle = Utils.createDOMElement('div', { className: `ph-resize-handle ph-resize-handle-${dir} ph-interactive`, style: { position: 'absolute', backgroundColor: 'transparent', zIndex: '1' }}); if (dir.includes('n')) handle.style.top = `-${handleSize / 2}px`; if (dir.includes('s')) handle.style.bottom = `-${handleSize / 2}px`; if (dir.includes('e')) handle.style.right = `-${handleSize / 2}px`; if (dir.includes('w')) handle.style.left = `-${handleSize / 2}px`; if (dir === 'n' || dir === 's') { handle.style.left = '0px'; handle.style.width = '100%'; handle.style.height = `${handleSize}px`; handle.style.cursor = 'ns-resize'; } if (dir === 'e' || dir === 'w') { handle.style.top = '0px'; handle.style.height = '100%'; handle.style.width = `${handleSize}px`; handle.style.cursor = 'ew-resize'; } if (dir === 'ne') { handle.style.width = `${handleSize}px`; handle.style.height = `${handleSize}px`; handle.style.cursor = 'nesw-resize'; } if (dir === 'nw') { handle.style.width = `${handleSize}px`; handle.style.height = `${handleSize}px`; handle.style.cursor = 'nwse-resize'; } if (dir === 'se') { handle.style.width = `${handleSize}px`; handle.style.height = `${handleSize}px`; handle.style.cursor = 'nwse-resize'; } if (dir === 'sw') { handle.style.width = `${handleSize}px`; handle.style.height = `${handleSize}px`; handle.style.cursor = 'nesw-resize'; } panelElement.appendChild(handle); handle.addEventListener('mousedown', (e) => ResizableItemsManager.startMainPanelResize(e, panelElement, dir)); }); },
        startMainPanelResize: (e, panelElement, direction) => { if (e.button !== 0) return; e.preventDefault(); e.stopPropagation(); state.isResizingPanel = true; UIManager.updatePointerEventsMode(); const initialRect = panelElement.getBoundingClientRect(); const initialMouseX = e.clientX; const initialMouseY = e.clientY; const doResize = (moveEvent) => { if (!state.isResizingPanel) return; moveEvent.preventDefault(); let newWidth = initialRect.width; let newHeight = initialRect.height; const dx = moveEvent.clientX - initialMouseX; const dy = moveEvent.clientY - initialMouseY; if (direction.includes('e')) newWidth = initialRect.width + dx; if (direction.includes('w')) newWidth = initialRect.width - dx; if (direction.includes('s')) newHeight = initialRect.height + dy; if (direction.includes('n')) newHeight = initialRect.height - dy; newWidth = Math.max(CONFIG.UI_MIN_WIDTH_PX, newWidth); newHeight = Math.max(CONFIG.UI_MIN_HEIGHT_PX, newHeight); panelElement.style.width = `${newWidth}px`; panelElement.style.height = `${newHeight}px`; }; const stopResize = () => { if (!state.isResizingPanel) return; document.removeEventListener('mousemove', doResize); document.removeEventListener('mouseup', stopResize); state.isResizingPanel = false; state.uiPanelSize.width = panelElement.style.width; state.uiPanelSize.height = panelElement.style.height; StorageManager.saveUIPanelSizePos(); UIManager.updatePointerEventsMode(); }; document.addEventListener('mousemove', doResize); document.addEventListener('mouseup', stopResize); },
        initMinimalStatsDragging: (minimalStatsElement, dragHandleElement) => { dragHandleElement.addEventListener('mousedown', (e) => { if (e.button !== 0) return; e.preventDefault(); e.stopPropagation(); state.isDraggingMinimalStats = true; MinimalStatsDisplay.applyDraggableStyling(true); const initialMouseX = e.clientX; const initialMouseY = e.clientY; const rect = minimalStatsElement.getBoundingClientRect(); const initialRight = window.innerWidth - rect.right; const initialBottom = window.innerHeight - rect.bottom; const doDrag = (moveEvent) => { if (!state.isDraggingMinimalStats) return; moveEvent.preventDefault(); const dx = moveEvent.clientX - initialMouseX; const dy = moveEvent.clientY - initialMouseY; let newRight = initialRight - dx; let newBottom = initialBottom - dy; newRight = Math.max(0, Math.min(newRight, window.innerWidth - rect.width)); newBottom = Math.max(0, Math.min(newBottom, window.innerHeight - rect.height)); minimalStatsElement.style.right = `${newRight}px`; minimalStatsElement.style.bottom = `${newBottom}px`; }; const stopDrag = () => { if (!state.isDraggingMinimalStats) return; document.removeEventListener('mousemove', doDrag); document.removeEventListener('mouseup', stopDrag); state.isDraggingMinimalStats = false; MinimalStatsDisplay.applyDraggableStyling(false); state.minimalStatsPosition = { right: minimalStatsElement.style.right, bottom: minimalStatsElement.style.bottom }; StorageManager.saveMinimalStatsPos(); }; document.addEventListener('mousemove', doDrag); document.addEventListener('mouseup', stopDrag); }); },
        initInternalPaneResizing: (dividerElement, leftPaneElement, rightPaneElement, onStopCallback) => { dividerElement.addEventListener('mousedown', (e) => { if (e.button !== 0) return; e.preventDefault(); ResizableItemsManager.isResizingPane = true; const mainArea = leftPaneElement.parentElement; const initialMouseX = e.clientX; const initialLeftPaneWidth = leftPaneElement.offsetWidth; const totalWidth = mainArea.offsetWidth - CONFIG.DIVIDER_WIDTH_PX; const doResize = (moveEvent) => { if (!ResizableItemsManager.isResizingPane) return; const dx = moveEvent.clientX - initialMouseX; let newLeftWidth = initialLeftPaneWidth + dx; const minLeftPx = totalWidth * (CONFIG.LEFT_PANE_MIN_WIDTH_PERCENT / 100); const minRightPx = totalWidth * (CONFIG.RIGHT_PANE_MIN_WIDTH_PERCENT / 100); newLeftWidth = Math.max(minLeftPx, Math.min(newLeftWidth, totalWidth - minRightPx)); const newLeftFlexBasis = (newLeftWidth / totalWidth) * 100; leftPaneElement.style.flexBasis = `${newLeftFlexBasis}%`; }; const stopResize = () => { if (!ResizableItemsManager.isResizingPane) return; document.removeEventListener('mousemove', doResize); document.removeEventListener('mouseup', stopResize); ResizableItemsManager.isResizingPane = false; if (onStopCallback) onStopCallback(leftPaneElement.style.flexBasis); }; document.addEventListener('mousemove', doResize); document.addEventListener('mouseup', stopResize); }); }
    };

    MinimalStatsDisplay = {
        isInitialized: false, dragHandle: null,
        init: () => {
            state.dom.minimalStatsContainer = Utils.createDOMElement('div', {
                id: CONFIG.MINIMAL_STATS_ID_SUFFIX,
                className: 'ph-minimal-stats ph-non-selectable',
                style: {
                    position: 'fixed', padding: '5px 8px', borderRadius: '4px', zIndex: '2147483638',
                    pointerEvents: 'none', userSelect: 'none',
                    transition: 'opacity 0.3s, transform 0.3s, background-color 0.2s, color 0.2s',
                    whiteSpace: 'pre', // Use 'pre' for newlines to work with textContent
                    lineHeight: `${CONFIG.MINIMAL_STATS_LINE_HEIGHT_EM}em`,
                    fontSize: `${CONFIG.MINIMAL_STATS_FONT_SIZE_EM}em`,
                    textAlign: 'right',
                }
            });
            // Content will be set by updateDisplay using innerHTML for line breaks
            state.dom.minimalStatsContent = Utils.createDOMElement('span'); // Placeholder, content set by updateDisplay
            state.dom.minimalStatsContainer.appendChild(state.dom.minimalStatsContent);

            MinimalStatsDisplay.dragHandle = Utils.createDOMElement('div', {
                className: 'ph-minimal-stats-drag-handle ph-interactive',
                style: {
                    position: 'absolute', top: '-5px', left: '50%', transform: 'translateX(-50%)',
                    padding: '1px 3px', fontSize: '0.7em', borderRadius: '3px',
                    cursor: 'move', display: 'none', pointerEvents: 'auto', userSelect: 'none',
                }
            });
            document.body.appendChild(state.dom.minimalStatsContainer);
            MinimalStatsDisplay.setPosition(state.minimalStatsPosition);
            MinimalStatsDisplay.setVisibility(state.minimalStatsVisible);
            MinimalStatsDisplay.updateTheme();
            MinimalStatsDisplay.updateDisplay();
            MinimalStatsDisplay.isInitialized = true;
        },
        getDefaultTypeConfig: () => {
            return [
                { type: CONFIG.TAB_TYPES.CRET,   visible: true,  order: 0, label: 'C' },
                { type: CONFIG.TAB_TYPES.WHD,    visible: true,  order: 1, label: 'W' },
                { type: CONFIG.TAB_TYPES.REFURB, visible: true,  order: 2, label: 'R' },
                { type: CONFIG.TAB_TYPES.UNKNOWN,visible: false, order: 3, label: 'U' } // 'U' for Unknown/General
            ];
        },
        updateTheme: () => {
            if (!MinimalStatsDisplay.isInitialized || !state.dom.minimalStatsContainer) return;
            state.dom.minimalStatsContainer.style.backgroundColor = Utils.getThemeColor('MINIMAL_STATS_BACKGROUND_COLOR');
            state.dom.minimalStatsContainer.style.color = Utils.getThemeColor('MINIMAL_STATS_TEXT_COLOR');
            if (MinimalStatsDisplay.dragHandle) {
                MinimalStatsDisplay.dragHandle.style.backgroundColor = `${Utils.getThemeColor('MAIN_ACCENT_COLOR')}99`;
                MinimalStatsDisplay.dragHandle.style.color = Utils.getThemeColor('SETTINGS_PANEL_TEXT_COLOR');
            }
        },
        updateDisplay: () => {
            if (!MinimalStatsDisplay.isInitialized || !state.minimalStatsVisible || !state.dom.minimalStatsContent) return;

            if (!state.shiftStartTime || state.currentDepartment === CONFIG.DEPARTMENTS.DETERMINING) {
                state.dom.minimalStatsContent.textContent = Utils.getLangString('determiningDepartment');
                return;
            }

            const T = Utils.getLangString;
            const effectiveWorkMs = ShiftManager.calculateEffectiveWorkTimeMs();
            const hoursWorked = effectiveWorkMs / (1000 * 60 * 60);

            const aggregatedCounts = StatsCalculator.getAggregatedCounts();
            const primaryTotalItems = aggregatedCounts.primary.TOTAL;
            const primaryTotalPerHour = (hoursWorked > 0.001 && primaryTotalItems > 0) ? (primaryTotalItems / hoursWorked) : 0;

            let line1Parts = [];
            let line2Parts = [];

            // Overall Total (Line 1)
            if (state.minimalStatsShowTotal) {
                if (primaryTotalItems > 0) {
                    line1Parts.push(String(primaryTotalItems));
                } else {
                    line1Parts.push(`0 ${T('stats_items')}`);
                }
            }

            // Overall Per Hour (Line 2)
            if (state.minimalStatsShowPerHour) {
                if (primaryTotalPerHour > 0) {
                    line2Parts.push(`${primaryTotalPerHour.toFixed(1)}${T('stats_perHour')}`);
                } else {
                    line2Parts.push(`0.0${T('stats_perHour')}`);
                }
            }

            // Detailed Breakdown
            const detailedTypesConfig = state.minimalStatsTypeDisplayConfig
                .filter(item => item.visible)
                .sort((a, b) => a.order - b.order)
                .slice(0, 3); // Max 3 detailed types for space reasons (can be adjusted)

            if (detailedTypesConfig.length > 0) {
                let detailedLine1 = [];
                let detailedLine2 = [];

                detailedTypesConfig.forEach(itemConf => {
                    const countForType = aggregatedCounts.allTabs[itemConf.type] || 0;
                    const staticLabel = itemConf.label; // Use the configured label directly

                    if (state.minimalStatsShowTotal) {
                         detailedLine1.push(`${staticLabel}${countForType}`);
                    }
                    if (state.minimalStatsShowPerHour) {
                        const perHourForType = (hoursWorked > 0.001) ? (countForType / hoursWorked) : 0;
                        detailedLine2.push(`${staticLabel}${perHourForType.toFixed(1)}${T('stats_perHour')}`);
                    }
                });

                if (state.minimalStatsShowTotal && detailedLine1.length > 0) {
                    if (line1Parts.length > 0) line1Parts.push(" "); // Add spacer if total is already there
                    line1Parts.push(detailedLine1.join(', '));
                }
                if (state.minimalStatsShowPerHour && detailedLine2.length > 0) {
                     if (line2Parts.length > 0) line2Parts.push(" "); // Add spacer
                    line2Parts.push(detailedLine2.join(', '));
                }
            }

            let finalDisplay = "";
            if (line1Parts.length > 0) {
                finalDisplay += line1Parts.join('');
            }
            if (line2Parts.length > 0) {
                if (finalDisplay.length > 0) finalDisplay += "\n"; // Newline if line 1 had content
                finalDisplay += line2Parts.join('');
            }

            if (finalDisplay.trim() === "") {
                finalDisplay = DepartmentManager.getDepartmentDisplayName();
            }
            state.dom.minimalStatsContent.innerHTML = finalDisplay.replace(/\n/g, '<br>');
        },
        setVisibility: (visible) => {
            state.minimalStatsVisible = visible;
            if (state.dom.minimalStatsContainer) {
                state.dom.minimalStatsContainer.style.display = visible ? 'inline-block' : 'none';
                if(visible) MinimalStatsDisplay.updateDisplay();
            }
            if(MinimalStatsDisplay.dragHandle) MinimalStatsDisplay.dragHandle.style.display = 'none'; // Hide drag handle when visibility changes
        },
        setPosition: (posObject) => {
            if (state.dom.minimalStatsContainer && posObject) {
                state.dom.minimalStatsContainer.style.right = posObject.right || CONFIG.MINIMAL_STATS_DEFAULT_RIGHT_VW + 'vw';
                state.dom.minimalStatsContainer.style.bottom = posObject.bottom || CONFIG.MINIMAL_STATS_DEFAULT_BOTTOM_VH + 'vh';
                state.dom.minimalStatsContainer.style.left = '';
                state.dom.minimalStatsContainer.style.top = '';
            }
        },
        showDragHandle: (show) => {
            if (!MinimalStatsDisplay.dragHandle || !state.dom.minimalStatsContainer) return;
            if (show) {
                if (!MinimalStatsDisplay.dragHandle.parentElement) {
                    state.dom.minimalStatsContainer.appendChild(MinimalStatsDisplay.dragHandle);
                    ResizableItemsManager.initMinimalStatsDragging(state.dom.minimalStatsContainer, MinimalStatsDisplay.dragHandle);
                }
                MinimalStatsDisplay.dragHandle.textContent = Utils.getLangString(CONFIG.MINIMAL_STATS_DRAG_HANDLE_TEXT_KEY);
                MinimalStatsDisplay.dragHandle.title = Utils.getLangString('minimalStats_editPosition');
                MinimalStatsDisplay.dragHandle.style.display = 'block';
            } else {
                MinimalStatsDisplay.dragHandle.style.display = 'none';
            }
        },
        applyDraggableStyling: (isDragging) => {
            if (state.dom.minimalStatsContainer) {
                state.dom.minimalStatsContainer.style.border = isDragging ? `1px dashed ${Utils.getThemeColor('MAIN_ACCENT_COLOR')}` : 'none';
                const baseBg = Utils.getThemeColor('MINIMAL_STATS_BACKGROUND_COLOR');
                state.dom.minimalStatsContainer.style.backgroundColor = isDragging ? baseBg.replace(/,\s*\d(\.\d+)?\)/, ', 0.3)') : baseBg;
            }
        }
    };

    const StatsCalculator = {
        getAggregatedCounts: () => {
            const primaryCounts = { CRET: 0, WHD: 0, REFURB: 0, UNKNOWN: 0, TOTAL: 0, types: [...state.statsConfig.primaryContributingTabs] };
            const secondaryCounts = { CRET: 0, WHD: 0, REFURB: 0, UNKNOWN: 0, TOTAL: 0, types: [...state.statsConfig.secondaryInfoTabs] };
            const allTabsRawCounts = { CRET: 0, WHD: 0, REFURB: 0, UNKNOWN: 0, General: 0 }; // Ensure 'General' is here if TAB_TYPES.UNKNOWN maps to it

            // Initialize all known tab types in allTabsRawCounts based on CONFIG.TAB_TYPES
            Object.values(CONFIG.TAB_TYPES).forEach(tabTypeConst => {
                allTabsRawCounts[tabTypeConst] = 0;
            });

            for (const tabId in state.otherTabsData) {
                const tab = state.otherTabsData[tabId];
                if (!tab.contributesToAggregation && tab.tabId !== state.currentTabId) continue;

                const clicks = parseInt(tab.clicks, 10) || 0;
                const tabType = Utils.normalizeTabType(tab.type); // This returns 'C-RET', 'WHD', 'REFURB', or 'General'

                if(allTabsRawCounts.hasOwnProperty(tabType)) {
                     allTabsRawCounts[tabType] += clicks;
                } else {
                    Utils.warn(`StatsCalculator: tabType '${tabType}' from normalizeTabType not directly in allTabsRawCounts keys. Original tab.type: '${tab.type}'`);
                    // This case should ideally not happen if normalizeTabType and allTabsRawCounts keys are aligned
                }

                if (state.statsConfig.primaryContributingTabs.includes(tabType)) {
                    if(primaryCounts.hasOwnProperty(tabType)) primaryCounts[tabType] += clicks;
                    primaryCounts.TOTAL += clicks;
                }
                if (state.statsConfig.secondaryInfoTabs.includes(tabType)) {
                    if(secondaryCounts.hasOwnProperty(tabType)) secondaryCounts[tabType] += clicks;
                    secondaryCounts.TOTAL += clicks;
                }
            }
            primaryCounts.types.forEach(type => { if(!primaryCounts.hasOwnProperty(type)) primaryCounts[type] = 0; });
            secondaryCounts.types.forEach(type => { if(!secondaryCounts.hasOwnProperty(type)) secondaryCounts[type] = 0; });

            return { primary: primaryCounts, secondary: secondaryCounts, allTabs: allTabsRawCounts };
        }
    };

    const AutoIncrementer = {
        debounceTimer: null,
        init: () => { if (state.mutationObserver) state.mutationObserver.disconnect(); if (!state.autoClickEnabled) { Utils.debug("AutoIncrementer: Not initializing, autoClick is disabled."); return; } const observeTargetNode = document.querySelector(CONFIG.TRIGGER_OBSERVE_AREA_SELECTOR) || document.body; const processMutationsDebounced = Utils.debounce(() => { if (!state.autoClickEnabled) { AutoIncrementer.resetInternalState(); return; } AutoIncrementer.evaluateTriggers(observeTargetNode); }, CONFIG.AUTO_CLICK_REFRESH_RATE_MS); state.mutationObserver = new MutationObserver(processMutationsDebounced); state.mutationObserver.observe(observeTargetNode, { childList: true, subtree: true, characterData: true, attributes: false }); setTimeout(() => AutoIncrementer.evaluateTriggers(observeTargetNode), 250); Utils.info("AutoIncrementer initialized. State:", state.autoClickerInternalState); },
        disconnect: () => { if (state.mutationObserver) { state.mutationObserver.disconnect(); state.mutationObserver = null; } clearTimeout(AutoIncrementer.debounceTimer); AutoIncrementer.resetInternalState(); },
        resetInternalState: () => { state.autoClickerInternalState = 'IDLE'; state.autoClickerInitialTriggerFound = false; state.autoClickerFinalTriggerFound = false; if(state.initialized) AutoIncrementer.updateTriggerDebugDisplay(); },
        evaluateTriggers: (observeTargetNode) => { let pageTextContent = ""; const uiWasVisible = state.uiContainer && getComputedStyle(state.uiContainer).visibility !== 'hidden'; if (uiWasVisible && state.uiContainer && observeTargetNode.contains(state.uiContainer)) state.uiContainer.style.visibility = 'hidden'; try { pageTextContent = observeTargetNode.innerText || observeTargetNode.textContent || ""; } finally { if (uiWasVisible && state.uiContainer && observeTargetNode.contains(state.uiContainer)) state.uiContainer.style.visibility = 'visible'; } const initialTriggerPresent = new RegExp(`\\b${CONFIG.INITIAL_TRIGGER_TEXT}\\b`, 'i').test(pageTextContent); let finalTriggerText = ''; if (state.currentTabType === CONFIG.TAB_TYPES.CRET) finalTriggerText = CONFIG.FINAL_TRIGGER_TEXT_CRET; else if (state.currentTabType === CONFIG.TAB_TYPES.WHD || state.currentTabType === CONFIG.TAB_TYPES.REFURB) finalTriggerText = CONFIG.FINAL_TRIGGER_TEXT_WHD_REFURB; const finalTriggerPresent = finalTriggerText ? new RegExp(`\\b${finalTriggerText}\\b`, 'i').test(pageTextContent) : false; state.autoClickerInitialTriggerFound = initialTriggerPresent; state.autoClickerFinalTriggerFound = finalTriggerPresent; switch (state.autoClickerInternalState) { case 'IDLE': if (initialTriggerPresent) state.autoClickerInternalState = 'ITEM_STARTED_PONIŻEJ'; break; case 'ITEM_STARTED_PONIŻEJ': if (finalTriggerPresent && finalTriggerText) state.autoClickerInternalState = 'FINALIZE_DETECTED_PRZYPISZ'; else if (!initialTriggerPresent) state.autoClickerInternalState = 'IDLE'; break; case 'FINALIZE_DETECTED_PRZYPISZ': if (!finalTriggerPresent && finalTriggerText) { EventHandlers.processIncrementForCurrentTab(false); state.autoClickerInternalState = 'IDLE'; } else if (!initialTriggerPresent && !finalTriggerPresent) state.autoClickerInternalState = 'IDLE'; break; } AutoIncrementer.updateTriggerDebugDisplay(); },
        updateTriggerDebugDisplay: () => { if (!state.dom.triggerDebugDisplay || !state.showTriggerDebug) { if(state.dom.triggerDebugDisplay) state.dom.triggerDebugDisplay.style.display = 'none'; return; } state.dom.triggerDebugDisplay.style.display = 'block'; const T = Utils.getLangString; let html = `<strong>${T('debug_autoClickerState')}:</strong> ${state.autoClickerInternalState}<br>`; html += `<span>${T('debug_initialTrigger')} (${CONFIG.INITIAL_TRIGGER_TEXT.substring(0,10)}..): ${state.autoClickerInitialTriggerFound ? `<strong style="color:lightgreen;">${T('debug_found')}</strong>` : T('debug_notFound')}</span><br>`; let finalTriggerKey = ''; let finalTriggerShort = ''; if (state.currentTabType === CONFIG.TAB_TYPES.CRET) { finalTriggerKey = 'debug_finalCRETTrigger'; finalTriggerShort = CONFIG.FINAL_TRIGGER_TEXT_CRET.substring(0,10) + ".."; } else if (state.currentTabType === CONFIG.TAB_TYPES.WHD || state.currentTabType === CONFIG.TAB_TYPES.REFURB) { finalTriggerKey = 'debug_finalWHDREFTrigger'; finalTriggerShort = CONFIG.FINAL_TRIGGER_TEXT_WHD_REFURB.substring(0,10) + ".."; } if(finalTriggerKey) html += `<span>${T(finalTriggerKey)} (${finalTriggerShort}): ${state.autoClickerFinalTriggerFound ? `<strong style="color:lightgreen;">${T('debug_found')}</strong>` : T('debug_notFound')}</span><br>`; if (CONFIG.DEBUG_MODE && (state.autoClickerInitialTriggerFound || state.autoClickerFinalTriggerFound)) { const root = document.querySelector(CONFIG.TRIGGER_OBSERVE_AREA_SELECTOR) || document.body; let paths = []; if(state.autoClickerInitialTriggerFound) paths = paths.concat(AutoIncrementer.findElementsContainingText(root, CONFIG.INITIAL_TRIGGER_TEXT)); if(state.autoClickerFinalTriggerFound) { let finalTrigWord = ""; if (state.currentTabType === CONFIG.TAB_TYPES.CRET) finalTrigWord = CONFIG.FINAL_TRIGGER_TEXT_CRET; else if (state.currentTabType === CONFIG.TAB_TYPES.WHD || state.currentTabType === CONFIG.TAB_TYPES.REFURB) finalTrigWord = CONFIG.FINAL_TRIGGER_TEXT_WHD_REFURB; if (finalTrigWord) paths = paths.concat(AutoIncrementer.findElementsContainingText(root, finalTrigWord)); } paths = [...new Set(paths)]; if (paths.length > 0) html += `<strong>${T('debug_paths')}:</strong> ${paths.slice(0, CONFIG.TRIGGER_DEBUG_MAX_PATHS).map(p=>`<code>${p.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</code>`).join('; ')}`; } state.dom.triggerDebugDisplay.innerHTML = html; },
        findElementsContainingText: (rootElement, searchText) => { const paths = new Set(); if (!rootElement || !searchText) return []; const uiWasVisible = state.uiContainer && getComputedStyle(state.uiContainer).visibility !== 'hidden'; if (uiWasVisible && state.uiContainer && rootElement.contains(state.uiContainer)) state.uiContainer.style.visibility = 'hidden'; try { const walker = document.createTreeWalker(rootElement, NodeFilter.SHOW_TEXT, { acceptNode: (node) => { if (state.uiContainer && state.uiContainer.contains(node.parentElement)) return NodeFilter.FILTER_REJECT; if (node.nodeValue && node.nodeValue.toLowerCase().includes(searchText.toLowerCase())) return NodeFilter.FILTER_ACCEPT; return NodeFilter.FILTER_REJECT; }}); let node; while ((node = walker.nextNode()) && paths.size < CONFIG.TRIGGER_DEBUG_MAX_PATHS) { const path = Utils.getUniqueSelectorPath(node.parentElement, 4); if (path) paths.add(path); }} finally { if (uiWasVisible && state.uiContainer && rootElement.contains(state.uiContainer)) state.uiContainer.style.visibility = 'visible'; } return Array.from(paths); }
    };

    UIManager = {
        _isInitialized: false,
        init: () => { UIManager.buildInitialUI(); UIManager.setInitialUIValues(); ResizableItemsManager.initPanelResizing(state.uiContainer); UIManager._isInitialized = true; UIManager.applyThemeStyles(); },
        isInitialized: () => UIManager._isInitialized,
        buildInitialUI: () => { UIManager.buildMainPanel(); SettingsPanel.build(); UIManager.buildPageOverlayAndIndicator(); UIManager.buildEmergencyShowButton(); document.body.appendChild(state.dom.pageColorOverlay); document.body.appendChild(state.dom.pageIndicatorText); document.body.appendChild(state.dom.emergencyShowButton); document.body.appendChild(state.uiContainer); },
        buildMainPanel: () => {
            state.uiContainer = Utils.createDOMElement('div', { id: CONFIG.UI_CONTAINER_ID, className: 'ph-main-container', style: { position: 'fixed', bottom: state.uiPanelPosition.y, right: state.uiPanelPosition.x, width: state.uiPanelSize.width, height: state.uiPanelSize.height, minWidth: `${CONFIG.UI_MIN_WIDTH_PX}px`, minHeight: `${CONFIG.UI_MIN_HEIGHT_PX}px`, borderRadius: '5px', boxSizing: 'border-box', fontFamily: CONFIG.FONT_FAMILY, zIndex: '2147483640', display: 'flex', flexDirection: 'column', padding: '5px', overflow: 'hidden', boxShadow: CONFIG.NO_SHADOW_STYLE, transition: 'opacity 0.3s ease, transform 0.3s ease, width 0.05s linear, height 0.05s linear, background-color 0.2s, border-color 0.2s', }});
            const topControls = Utils.createDOMElement('div', { className: 'ph-top-controls ph-interactive-parent', style: { display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '3px', flexShrink: 0, paddingRight: '5px' }});
            const controlBtnStyle = { cursor: 'pointer', background: 'none', border: 'none', borderRadius: '3px', padding: '3px 6px', fontSize: '0.75em', marginLeft: '4px', opacity: '0.65', transition: 'opacity 0.2s, color 0.2s' };
            state.dom.toggleSettingsButton = Utils.createDOMElement('button', { className: 'ph-interactive', style: controlBtnStyle, onClick: EventHandlers.toggleSettingsPanelVisibility }); Utils.makeButtonInteractive(state.dom.toggleSettingsButton);
            state.dom.lockUIButton = Utils.createDOMElement('button', { className: 'ph-interactive', style: controlBtnStyle, onClick: EventHandlers.toggleUILockState }); Utils.makeButtonInteractive(state.dom.lockUIButton);
            state.dom.emergencyHideButton = Utils.createDOMElement('button', { className: 'ph-interactive', style: {...controlBtnStyle, fontWeight: 'bold', opacity: '0.7' }, onClick: () => UIManager.setUIPanelVisibility(false) }); Utils.makeButtonInteractive(state.dom.emergencyHideButton);
            topControls.append(state.dom.toggleSettingsButton, state.dom.lockUIButton, state.dom.emergencyHideButton); state.uiContainer.appendChild(topControls);
            const mainContentArea = Utils.createDOMElement('div', { className: 'ph-main-content-area ph-interactive-parent', style: { display: 'flex', flexGrow: 1, overflow: 'hidden', position: 'relative', padding: '0 3px' }});
            state.dom.leftPane = Utils.createDOMElement('div', { className: 'ph-left-pane ph-interactive-parent', style: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexBasis: state.leftPaneFlexBasis, minWidth: `${CONFIG.LEFT_PANE_MIN_WIDTH_PERCENT}%`, overflow: 'hidden', paddingRight: `${CONFIG.DIVIDER_WIDTH_PX / 2}px`, position: 'relative' }});
            state.dom.mainCounterInput = Utils.createDOMElement('input', { type: 'number', id: 'mainCounterInput', className: `${CONFIG.SCRIPT_ID_PREFIX}main_counter_input ph-interactive`, style: { fontSize: `${CONFIG.MAIN_COUNTER_FONT_SIZE_INITIAL_EM}em`, fontWeight: '300', opacity: '0.9', width: '95%', marginBottom: '10px', textAlign: 'center', background: 'transparent', border: 'none', outline: 'none', padding: '0 3px', MozAppearance: 'textfield' }, onInput: EventHandlers.handleCounterInputDynamic, onChange: EventHandlers.handleCounterInputChange });
            const clickerButtonsContainer = Utils.createDOMElement('div', { style: { display: 'flex', alignItems: 'center'} });
            const clickerBtnSharedStyle = { cursor: 'pointer', border: 'none', borderRadius: '3px', boxShadow: CONFIG.NO_SHADOW_STYLE, transition: 'transform 0.08s, background-color 0.1s', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: `${CONFIG.CLICKER_BUTTON_FONT_SIZE_EM}em`, };
            state.dom.decrementButton = Utils.createDOMElement('button', { id: 'decrementBtn', className: 'ph-interactive', style: { ...clickerBtnSharedStyle, marginRight: '10px', width:'40px', height:'40px', lineHeight: '40px'}, onClick: EventHandlers.handleDecrementClick }); Utils.makeButtonInteractive(state.dom.decrementButton);
            state.dom.incrementButton = Utils.createDOMElement('button', { id: 'incrementBtn', className: 'ph-interactive', style: { ...clickerBtnSharedStyle, width:'55px', height:'55px', lineHeight: '55px'}, onClick: (event) => EventHandlers.processIncrementForCurrentTab(true, event) }); Utils.makeButtonInteractive(state.dom.incrementButton);
            if(CONFIG.SHOW_DECREMENT_BUTTON) clickerButtonsContainer.appendChild(state.dom.decrementButton); if(CONFIG.SHOW_INCREMENT_BUTTON) clickerButtonsContainer.appendChild(state.dom.incrementButton); state.dom.leftPane.append(state.dom.mainCounterInput, clickerButtonsContainer);
            state.dom.divider = Utils.createDOMElement('div', { className: 'ph-divider ph-interactive', style: { width: `${CONFIG.DIVIDER_WIDTH_PX}px`, cursor: 'ew-resize', flexShrink: 0, display: 'flex', alignItems:'center', justifyContent: 'center', borderRadius: '2px', opacity: 0.6 }});
            state.dom.rightPane = Utils.createDOMElement('div', { className: 'ph-right-pane ph-interactive-parent', style: { display: 'flex', flexDirection: 'column', flexGrow: 1, overflowY: 'auto', paddingLeft: `${CONFIG.DIVIDER_WIDTH_PX / 2}px`, minWidth: `${CONFIG.RIGHT_PANE_MIN_WIDTH_PERCENT}%` }});
            state.dom.statsTextSummary = Utils.createDOMElement('div', { id: 'statsSummary', style: { lineHeight: '1.4', marginBottom: '5px', overflowWrap: 'break-word' }});
            state.dom.triggerDebugDisplay = Utils.createDOMElement('div', { id: 'triggerDebugDisplay', style: { fontSize: '0.75em', marginTop: '8px', paddingTop: '4px', display: 'none', maxHeight: '50px', overflowY: 'auto', opacity: '0.65', wordBreak: 'break-all'} });
            state.dom.rightPane.append(state.dom.statsTextSummary, state.dom.triggerDebugDisplay); mainContentArea.append(state.dom.leftPane, state.dom.divider, state.dom.rightPane);
            ResizableItemsManager.initInternalPaneResizing(state.dom.divider, state.dom.leftPane, state.dom.rightPane, (newFlexBasis) => { state.leftPaneFlexBasis = newFlexBasis; StorageManager.saveMainSettings(); }); state.uiContainer.appendChild(mainContentArea);
            const bottomInfoBar = Utils.createDOMElement('div', { className: 'ph-bottom-bar', style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto', paddingTop: '3px', flexShrink: 0, padding: '0 3px' }});
            state.dom.uiTabIndicatorText = Utils.createDOMElement('div', { id: 'uiTabIndicator', style: { fontSize: `${CONFIG.UI_TAB_INDICATOR_FONT_SIZE_EM}em`, fontWeight: '500', opacity: 0.55 }});
            const timersContainer = Utils.createDOMElement('div', {className: 'ph-timers-container', style: {display: 'flex', alignItems: 'flex-end', gap: '10px'}});
            state.dom.lastActionTimerDisplay = Utils.createDOMElement('div', { id: 'lastActionTimer', style: { opacity: '0.7' }});
            state.dom.realTimeClock = Utils.createDOMElement('div', { id: 'realTimeClock', style: { opacity: '0.5' }});
            timersContainer.append(state.dom.lastActionTimerDisplay, state.dom.realTimeClock); bottomInfoBar.append(state.dom.uiTabIndicatorText, timersContainer); state.uiContainer.appendChild(bottomInfoBar);
        },
        buildPageOverlayAndIndicator: () => { state.dom.pageColorOverlay = Utils.createDOMElement('div', { id: CONFIG.PAGE_COLOR_OVERLAY_ID_SUFFIX, style: { position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh', zIndex: '2147483630', pointerEvents: 'none', display: 'none', transition: 'background-color 0.3s ease' }}); state.dom.pageIndicatorText = Utils.createDOMElement('div', { id: CONFIG.PAGE_INDICATOR_TEXT_ID_SUFFIX, style: { position: 'fixed', top: '50%', right: '20px', transform: 'translateY(-50%)', fontSize: `${CONFIG.PAGE_INDICATOR_FONT_SIZE_PX}px`, fontWeight: 'bold', opacity: 0.75, zIndex: '2147483631', pointerEvents: 'none', display: 'none', textShadow: CONFIG.NO_SHADOW_STYLE, writingMode: 'vertical-rl', textOrientation: 'mixed', transition: 'color 0.3s ease, opacity 0.3s ease', userSelect: 'none' }}); },
        buildEmergencyShowButton: () => {
            state.dom.emergencyShowButton = Utils.createDOMElement('button', { id: CONFIG.EMERGENCY_SHOW_BUTTON_ID_SUFFIX, textContent: CONFIG.EMERGENCY_SHOW_BUTTON_TEXT, className: 'ph-interactive', style: { position: 'fixed', bottom: CONFIG.UI_BOTTOM_OFFSET, right: CONFIG.UI_RIGHT_OFFSET, width: CONFIG.EMERGENCY_SHOW_BUTTON_SIZE, height: CONFIG.EMERGENCY_SHOW_BUTTON_SIZE, borderRadius: '50%', cursor: 'pointer', display: 'none', alignItems: 'center', justifyContent: 'center', zIndex: '2147483646', transition: 'opacity 0.2s ease, transform 0.1s ease, background-color 0.2s', fontSize: '18px', boxShadow: CONFIG.NO_SHADOW_STYLE, pointerEvents: 'auto' }});
            state.dom.emergencyShowButton.onmouseover = () => { state.dom.emergencyShowButton.style.opacity = String(CONFIG.EMERGENCY_SHOW_BUTTON_HOVER_OPACITY); state.dom.emergencyShowButton.style.transform = 'scale(1.1)'; state.dom.emergencyShowButton.style.backgroundColor = Utils.getThemeColor('MAIN_ACCENT_COLOR'); };
            state.dom.emergencyShowButton.onmouseout = () => { state.dom.emergencyShowButton.style.opacity = String(CONFIG.EMERGENCY_SHOW_BUTTON_OPACITY); state.dom.emergencyShowButton.style.transform = 'scale(1)'; state.dom.emergencyShowButton.style.backgroundColor = `${Utils.getThemeColor('MAIN_ACCENT_COLOR')}${Math.floor(CONFIG.EMERGENCY_SHOW_BUTTON_OPACITY * 255).toString(16).padStart(2,'0')}`; };
            state.dom.emergencyShowButton.onclick = () => UIManager.setUIPanelVisibility(true);
        },
        applyThemeStyles: () => {
            if (!UIManager.isInitialized()) return;
            const T = Utils.getThemeColor;
            state.uiContainer.style.backgroundColor = T('UI_BACKGROUND_COLOR'); state.uiContainer.style.color = T('UI_TEXT_COLOR'); state.uiContainer.style.borderColor = T('UI_BORDER_COLOR');
            [state.dom.toggleSettingsButton, state.dom.lockUIButton].forEach(btn => { if (btn) btn.style.color = T('UI_TEXT_COLOR'); });
            if(state.dom.emergencyHideButton) state.dom.emergencyHideButton.style.color = T('LAST_ACTION_TIMER_WARN_COLOR');
            if(state.dom.mainCounterInput) state.dom.mainCounterInput.style.color = T('UI_TEXT_COLOR');
            if(state.dom.incrementButton) { state.dom.incrementButton.style.backgroundColor = T('CLICKER_INCREMENT_BUTTON_BG_COLOR'); state.dom.incrementButton.style.color = T('CLICKER_INCREMENT_BUTTON_TEXT_COLOR'); }
            if(state.dom.decrementButton) { state.dom.decrementButton.style.backgroundColor = T('CLICKER_DECREMENT_BUTTON_BG_COLOR'); state.dom.decrementButton.style.color = T('CLICKER_DECREMENT_BUTTON_TEXT_COLOR'); }
            if(state.dom.divider) state.dom.divider.style.backgroundColor = T('DIVIDER_COLOR');
            if(state.dom.rightPane) { state.dom.rightPane.style.color = T('UI_TEXT_COLOR'); state.dom.rightPane.style.fontSize = `${CONFIG.STATS_FONT_SIZE_EM}em`; }
            if(state.dom.statsTextSummary) state.dom.statsTextSummary.style.borderTopColor = T('STATS_TEXT_SUMMARY_BORDER_TOP');
            if(state.dom.triggerDebugDisplay) state.dom.triggerDebugDisplay.style.borderTopColor = T('UI_TEXT_COLOR').replace(/,\s*\d(\.\d+)?\)/, ', 0.2)');
            const bottomBar = state.uiContainer.querySelector('.ph-bottom-bar'); if(bottomBar) bottomBar.style.borderTopColor = T('BOTTOM_BAR_BORDER_TOP');
            if(state.dom.uiTabIndicatorText) { const mode = state.customTabThemes[state.currentTabFullUrl] || state.currentTabModeDetails; state.dom.uiTabIndicatorText.style.color = mode.isCustom ? mode.textColor : T('UI_TEXT_COLOR').replace(/,\s*\d(\.\d+)?\)/, ', 0.6)'); }
            if(state.dom.lastActionTimerDisplay) { state.dom.lastActionTimerDisplay.style.color = Date.now() - state.lastActionTimestampForThisTab > CONFIG.LAST_ACTION_TIMER_WARN_SECONDS * 1000 ? T('LAST_ACTION_TIMER_WARN_COLOR') : T('UI_TEXT_COLOR'); state.dom.lastActionTimerDisplay.style.fontSize = `${CONFIG.TIMERS_FONT_SIZE_EM}em`;}
            if(state.dom.realTimeClock) { state.dom.realTimeClock.style.color = T('UI_TEXT_COLOR'); state.dom.realTimeClock.style.fontSize = `${CONFIG.TIMERS_FONT_SIZE_EM}em`;}
            if(state.dom.emergencyShowButton) { state.dom.emergencyShowButton.style.backgroundColor = `${T('MAIN_ACCENT_COLOR')}${Math.floor(CONFIG.EMERGENCY_SHOW_BUTTON_OPACITY * 255).toString(16).padStart(2,'0')}`; state.dom.emergencyShowButton.style.borderColor = `${T('MAIN_ACCENT_COLOR')}80`; state.dom.emergencyShowButton.style.color = T('UI_TEXT_COLOR'); }
            if (SettingsPanel.isInitialized()) SettingsPanel.updateTheme(); if (MinimalStatsDisplay.isInitialized) MinimalStatsDisplay.updateTheme();
            injectGlobalStyles();
            UIManager.applyDebugPointerEventBorders();
        },
        setInitialUIValues: () => { Utils.debug("Setting initial UI values..."); if (state.dom.mainCounterInput) { state.dom.mainCounterInput.value = state.clicksForThisTab; EventHandlers.handleCounterInputDynamic({target: state.dom.mainCounterInput}); } if (state.dom.leftPane) state.dom.leftPane.style.flexBasis = state.leftPaneFlexBasis; UIManager.applyElementVisibilityFromState(); UIManager.applyPageTheme(); UIManager.updateUITabIndicatorText(); UIManager.updateUILockVisuals(); UIManager.updateTopControlsText(); if (state.settingsPanelVisible && SettingsPanel.isInitialized()) SettingsPanel.populateAllFields(); UIManager.setUIPanelVisibility(state.uiPanelVisible); MinimalStatsDisplay.setVisibility(state.minimalStatsVisible); MinimalStatsDisplay.updateDisplay(); },
        updateTopControlsText: () => { if(state.dom.toggleSettingsButton) { state.dom.toggleSettingsButton.textContent = Utils.getLangString(state.settingsPanelVisible ? CONFIG.TOGGLE_SETTINGS_BUTTON_TEXT_OPENED_KEY : CONFIG.TOGGLE_SETTINGS_BUTTON_TEXT_CLOSED_KEY); state.dom.toggleSettingsButton.title = Utils.getLangString('settingsBtn'); } if(state.dom.lockUIButton) { state.dom.lockUIButton.textContent = Utils.getLangString(state.uiLocked ? CONFIG.LOCK_UI_BUTTON_TEXT_LOCKED_KEY : CONFIG.LOCK_UI_BUTTON_TEXT_UNLOCKED_KEY); state.dom.lockUIButton.title = Utils.getLangString('uiLockBtn'); } if(state.dom.emergencyHideButton) { state.dom.emergencyHideButton.textContent = Utils.getLangString(CONFIG.EMERGENCY_HIDE_BUTTON_TEXT_KEY); state.dom.emergencyHideButton.title = Utils.getLangString('closeBtn'); } if(state.dom.emergencyShowButton) state.dom.emergencyShowButton.title = Utils.getLangString('show') + " UI Panel"; },
        setUIPanelVisibility: (visible) => { state.uiPanelVisible = visible; if (state.uiContainer) { state.uiContainer.style.opacity = visible ? '1' : '0'; state.uiContainer.style.transform = visible ? 'translateY(0)' : `translateY(15px)`; state.uiContainer.style.visibility = visible ? 'visible' : 'hidden'; } if (state.dom.emergencyShowButton) state.dom.emergencyShowButton.style.display = visible ? 'none' : 'flex'; if (!visible && state.settingsPanelVisible) UIManager.setSettingsPanelVisibility(false); UIManager.updatePointerEventsMode(); StorageManager.saveMainSettings(); },
        setSettingsPanelVisibility: (visible) => { state.settingsPanelVisible = visible; if (SettingsPanel.isInitialized() && state.dom.settingsPanel) { const settingsWidthVw = CONFIG.SETTINGS_PANEL_WIDTH_VW; const settingsPanelFinalWidth = `clamp(${CONFIG.SETTINGS_PANEL_MIN_WIDTH_PX}px, ${settingsWidthVw}vw, ${CONFIG.SETTINGS_PANEL_MAX_WIDTH_PX}px)`; state.dom.settingsPanel.style.width = settingsPanelFinalWidth; state.dom.settingsPanel.style.transform = visible ? 'translateX(0%)' : `translateX(101%)`; if (visible) SettingsPanel.populateAllFields(); } UIManager.updateTopControlsText(); UIManager.updatePointerEventsMode(); if (visible && state.uiLocked) UIManager.applyUILockToElements(true); StorageManager.saveMainSettings(); },
        updateUILockVisuals: () => { if (state.dom.lockUIButton) state.dom.lockUIButton.textContent = Utils.getLangString(state.uiLocked ? CONFIG.LOCK_UI_BUTTON_TEXT_LOCKED_KEY : CONFIG.LOCK_UI_BUTTON_TEXT_UNLOCKED_KEY); },
        applyUILockToElements: (locked) => { const topBarButtonsToLock = [state.dom.toggleSettingsButton, state.dom.emergencyHideButton]; const clickerElementsToLock = [state.dom.decrementButton, state.dom.mainCounterInput]; topBarButtonsToLock.forEach(el => { if (el) el.disabled = locked; }); clickerElementsToLock.forEach(el => { if (el) el.disabled = locked; }); if (state.dom.incrementButton) state.dom.incrementButton.disabled = false; if (SettingsPanel.isInitialized() && state.dom.settingsPanel) { state.dom.settingsPanel.querySelectorAll('input, select, textarea, button:not(.ph-settings-close-btn):not(.ph-settings-theme-btn)') .forEach(el => { const isExempt = el === state.dom.settingsThemeSelect || el.classList.contains("ph-stats-config-cb") || el.closest('#otherTabsSettingsContainer') || el.closest('#minimalStatsTypeDisplayConfigSection'); el.disabled = locked && !isExempt; }); if(state.dom.settingsCloseButton) state.dom.settingsCloseButton.disabled = false; if(state.dom.settingsThemeSelect) state.dom.settingsThemeSelect.disabled = false; } UIManager.updatePointerEventsMode(); },
        updatePointerEventsMode: () => {
            if (!state.uiContainer || !UIManager.isInitialized()) return; const isPanelEffectivelyVisible = state.uiPanelVisible && state.uiContainer.style.visibility !== 'hidden';
            Utils.applyElementInteractivity(state.uiContainer, false); Array.from(state.uiContainer.querySelectorAll('p, span:not(.ph-interactive), div:not(.ph-interactive):not(.ph-interactive-parent)')) .forEach(el => Utils.applyElementInteractivity(el, false));
            if (!isPanelEffectivelyVisible) { UIManager.applyDebugPointerEventBorders(); return; }
            [state.dom.toggleSettingsButton, state.dom.emergencyHideButton].forEach(btn => Utils.applyElementInteractivity(btn, !state.uiLocked, 'pointer')); Utils.applyElementInteractivity(state.dom.lockUIButton, true, 'pointer');
            if (state.settingsPanelVisible && SettingsPanel.isInitialized()) { Utils.applyElementInteractivity(state.dom.settingsPanel, true); state.dom.settingsPanel.querySelectorAll('.ph-interactive, input, select, textarea, button').forEach(el => { const elIsLockExempt = el === state.dom.settingsCloseButton || el === state.dom.settingsLockUIButton || el === state.dom.settingsThemeSelect || el.classList.contains("ph-stats-config-cb") || (el.closest && el.closest('#otherTabsSettingsContainer')) || (el.closest && el.closest('#minimalStatsTypeDisplayConfigSection')); Utils.applyElementInteractivity(el, !state.uiLocked || elIsLockExempt, el.tagName === 'BUTTON' || el.tagName === 'SELECT' ? 'pointer' : 'text'); }); if(state.dom.settingsCloseButton) Utils.applyElementInteractivity(state.dom.settingsCloseButton, true, 'pointer'); if(state.dom.settingsThemeSelect) Utils.applyElementInteractivity(state.dom.settingsThemeSelect, true, 'pointer'); }
            else if (SettingsPanel.isInitialized() && state.dom.settingsPanel) Utils.applyElementInteractivity(state.dom.settingsPanel, false);
            if (state.dom.divider) Utils.applyElementInteractivity(state.dom.divider, !state.uiLocked && !state.isResizingPanel, 'ew-resize');
            state.uiContainer.querySelectorAll('.ph-resize-handle').forEach(h => Utils.applyElementInteractivity(h, !state.uiLocked, h.style.cursor || 'default'));
            const incrementBtnInteractive = CONFIG.SHOW_INCREMENT_BUTTON && !state.uiLocked; Utils.applyElementInteractivity(state.dom.incrementButton, incrementBtnInteractive, 'pointer'); if (CONFIG.SHOW_DECREMENT_BUTTON && state.dom.decrementButton) Utils.applyElementInteractivity(state.dom.decrementButton, !state.uiLocked, 'pointer'); if (state.dom.mainCounterInput) Utils.applyElementInteractivity(state.dom.mainCounterInput, !state.uiLocked, 'text');
            switch (state.pointerEventsMode) { case 'fully_interactive': Utils.applyElementInteractivity(state.uiContainer, true); break; case 'default_transparent_buttons_active': break; case 'fully_click_through': if (CONFIG.SHOW_DECREMENT_BUTTON && state.dom.decrementButton) Utils.applyElementInteractivity(state.dom.decrementButton, false); if (state.dom.mainCounterInput) Utils.applyElementInteractivity(state.dom.mainCounterInput, false); break; case 'windows_watermark': Utils.applyElementInteractivity(state.dom.incrementButton, false); if (CONFIG.SHOW_DECREMENT_BUTTON && state.dom.decrementButton) Utils.applyElementInteractivity(state.dom.decrementButton, false); if (state.dom.mainCounterInput) Utils.applyElementInteractivity(state.dom.mainCounterInput, false); if (state.dom.divider && !state.isResizingPanel) Utils.applyElementInteractivity(state.dom.divider, false); state.uiContainer.querySelectorAll('.ph-resize-handle').forEach(h => Utils.applyElementInteractivity(h, !state.uiLocked, h.style.cursor || 'default')); break; }
            if (state.isResizingPanel) Utils.applyElementInteractivity(state.uiContainer, true); UIManager.applyDebugPointerEventBorders();
        },
        applyDebugPointerEventBorders: () => {
            const elementsToTest = state.uiContainer ? [state.uiContainer, ...state.uiContainer.querySelectorAll('*')] : []; if (MinimalStatsDisplay.isInitialized && state.dom.minimalStatsContainer) elementsToTest.push(state.dom.minimalStatsContainer, ...state.dom.minimalStatsContainer.querySelectorAll('*'));
            elementsToTest.forEach(el => { if(el.style) { el.style.outline = ''; el.style.outlineOffset = ''; }});
            if (state.debugPointerEventBorders) {
                const interactiveColor = Utils.getThemeColor('DEBUG_BORDER_INTERACTIVE'); const nonInteractiveColor = Utils.getThemeColor('DEBUG_BORDER_NON_INTERACTIVE');
                elementsToTest.forEach(el => { if (!el.style) return; const computedPE = getComputedStyle(el).pointerEvents; if (computedPE === 'auto' || computedPE === 'all' || (el.tagName === 'BUTTON' && computedPE !== 'none')) el.style.outline = `1px dashed ${interactiveColor}`; else if (computedPE === 'none') el.style.outline = `1px dotted ${nonInteractiveColor}`; el.style.outlineOffset = '1px'; });
                if (state.uiContainer) state.uiContainer.style.outline = `2px solid ${getComputedStyle(state.uiContainer).pointerEvents === 'none' ? nonInteractiveColor : 'green'}`;
                if (MinimalStatsDisplay.isInitialized && state.dom.minimalStatsContainer) state.dom.minimalStatsContainer.style.outline = `2px solid ${getComputedStyle(state.dom.minimalStatsContainer).pointerEvents === 'none' ? nonInteractiveColor : 'orange'}`;
            }
        },
        applyElementVisibilityFromState: () => { if (!UIManager.isInitialized()) return; const setDisp = (el, show) => { if(el) el.style.display = show ? (el.tagName === 'DIV' || el.tagName==='P' ? 'block' : 'inline-block') : 'none';}; setDisp(state.dom.realTimeClock, state.showClock); setDisp(state.dom.statsTextSummary, state.showStats); setDisp(state.dom.lastActionTimerDisplay, state.showLastActionTimer); setDisp(state.dom.uiTabIndicatorText, state.showUITabIndicator); setDisp(state.dom.triggerDebugDisplay, state.showTriggerDebug); UIManager.applyPageTheme(); },
        applyPageTheme: () => { if (!UIManager.isInitialized()) return; const mode = state.customTabThemes[state.currentTabFullUrl] || state.currentTabModeDetails; if (state.dom.pageColorOverlay) { state.dom.pageColorOverlay.style.backgroundColor = mode.color; state.dom.pageColorOverlay.style.display = state.showPageOverlay ? 'block' : 'none'; } if (state.dom.pageIndicatorText) { state.dom.pageIndicatorText.textContent = mode.name.substring(0,10).toUpperCase(); state.dom.pageIndicatorText.style.color = mode.textColor; state.dom.pageIndicatorText.style.display = state.showPageIndicatorText ? 'block' : 'none'; }},
        updateUITabIndicatorText: () => { if(state.dom.uiTabIndicatorText) { const mode = state.customTabThemes[state.currentTabFullUrl] || state.currentTabModeDetails; state.dom.uiTabIndicatorText.textContent = mode.name; const textColor = Utils.getThemeColor('UI_TEXT_COLOR'); state.dom.uiTabIndicatorText.style.color = mode.isCustom ? mode.textColor : textColor.replace(/,\s*\d(\.\d+)?\)/, ', 0.6)'); }},
        updateCounterDisplay: () => { if (state.dom.mainCounterInput) { state.dom.mainCounterInput.value = state.clicksForThisTab; EventHandlers.handleCounterInputDynamic({target: state.dom.mainCounterInput}); }},
        updateRealTimeClockDisplay: () => { if(state.dom.realTimeClock && state.showClock) state.dom.realTimeClock.textContent = Utils.formatDateToHHMM(new Date(), true); },
        updateLastActionTimerDisplay: () => { if (!state.dom.lastActionTimerDisplay || !state.showLastActionTimer) { if(state.dom.lastActionTimerDisplay) state.dom.lastActionTimerDisplay.style.display = 'none'; return; } state.dom.lastActionTimerDisplay.style.display = 'inline-block'; const elapsedMs = Date.now() - state.lastActionTimestampForThisTab; state.dom.lastActionTimerDisplay.textContent = `${Utils.getLangString('stats_lastAction')}: ${Utils.formatMsToDuration(elapsedMs, true, true).replace(/^0h\s*/, '').replace(/^0m\s*/, '')}`; const isWarn = elapsedMs > CONFIG.LAST_ACTION_TIMER_WARN_SECONDS * 1000; state.dom.lastActionTimerDisplay.style.color = isWarn ? Utils.getThemeColor('LAST_ACTION_TIMER_WARN_COLOR') : Utils.getThemeColor('UI_TEXT_COLOR'); state.dom.lastActionTimerDisplay.style.fontWeight = isWarn ? 'bold' : 'normal'; state.dom.lastActionTimerDisplay.style.opacity = isWarn ? '0.9' : '0.7'; },
        updateStatisticsDisplay: () => {
            if (!state.dom.statsTextSummary || !state.showStats) { if(state.dom.statsTextSummary) state.dom.statsTextSummary.innerHTML = ''; return; }
            state.dom.statsTextSummary.style.display = 'block'; if (!state.shiftStartTime) { state.dom.statsTextSummary.innerHTML = `<p style="color:red;">${Utils.getLangString('error')}: Shift start not set!</p>`; return; }
            if (state.currentDepartment === CONFIG.DEPARTMENTS.DETERMINING && !StorageManager.load(CONFIG.STORAGE_KEY_STATS_CONFIG, null, false) ) { state.dom.statsTextSummary.innerHTML = `<p>${Utils.getLangString('determiningDepartment')}</p>`; return; }
            const effectiveWorkMs = ShiftManager.calculateEffectiveWorkTimeMs(); const hoursWorked = effectiveWorkMs / (1000 * 60 * 60); const T = Utils.getLangString; const TC = Utils.getThemeColor;
            const aggregatedCounts = StatsCalculator.getAggregatedCounts(); const primaryTotal = aggregatedCounts.primary.TOTAL; const globalItemsPerHour = (hoursWorked > 0.001 && primaryTotal > 0) ? (primaryTotal / hoursWorked) : 0;
            const thisTabItemsPerHour = (hoursWorked > 0.001) ? (state.clicksForThisTab / hoursWorked) : 0;
            let statsHTML = `<p style="margin-bottom: 2px;">${T('stats_shift')}: <strong>${Utils.formatDateToHHMM(state.shiftStartTime)}</strong> (${T('shiftType_' + state.shiftType) || state.shiftType})</p>
                             <p style="margin-bottom: 5px;">${T('stats_lunch')}: ${state.selectedLunchOption ? T(state.selectedLunchOption.text_key).replace(/\s\(.+\)/,'') : 'N/A'}</p>
                             <div style="font-size:0.9em; margin-bottom: 3px;">${T('department')}: <strong>${DepartmentManager.getDepartmentDisplayName()}</strong></div>
                             <div style="display:flex; justify-content:space-around; gap: 8px; border-top: 1px solid ${TC('STATS_TEXT_SUMMARY_BORDER_TOP')}; padding-top: 5px;">
                                <div style="text-align:center;"> <div><u>${T('stats_thisTab')} (${state.currentTabModeDetails.name})</u></div> <div>${T('stats_items')}: <strong>${state.clicksForThisTab}</strong></div> <div><strong style="color:${TC('MAIN_ACCENT_COLOR')};font-size:1.1em;">${thisTabItemsPerHour.toFixed(1)}</strong>${T('stats_perHour')}</div> </div>
                                <div style="text-align:center; border-left: 1px solid ${TC('STATS_TEXT_SUMMARY_BORDER_TOP')}; padding-left:8px;"> <div><u>${T('stats_global')}</u></div> <div>${T('stats_total')}: <strong>${T('stats_format_total_items_bare', aggregatedCounts.primary, aggregatedCounts.secondary, T)}</strong></div> <div><strong style="color:${TC('MAIN_ACCENT_COLOR')};font-size:1.1em;">${globalItemsPerHour.toFixed(1)}</strong>${T('stats_perHour')}</div> </div>
                             </div>
                             <div style="font-size:0.8em; opacity:0.7; text-align:center; margin-top:2px;">(${T('stats_workedTime')}: ${Utils.formatMsToDuration(effectiveWorkMs, false, true)})</div>`;
            const otherTabsArray = Object.values(state.otherTabsData).filter(td => td.tabId !== state.currentTabId && td.contributesToAggregation);
            if (otherTabsArray.length > 0) statsHTML += `<div style="font-size:0.75em; margin-top:5px; border-top:1px solid ${TC('STATS_OTHER_TABS_BORDER_TOP')}; padding-top:3px; max-height: 35px; overflow-y:auto; opacity: 0.75;"> <strong>${T('stats_otherTabsSummary')}:</strong> ${otherTabsArray.map(td => `${td.modeName||td.tabId.substring(0,10)}: ${td.clicks}`).join('; ')} </div>`;
            state.dom.statsTextSummary.innerHTML = statsHTML;
        },
        refreshUIForLanguageChange: () => { if (!UIManager.isInitialized()) return; Utils.info("Refreshing UI for language change to:", state.currentLanguage); UIManager.updateTopControlsText(); UIManager.updateStatisticsDisplay(); UIManager.updateLastActionTimerDisplay(); if (MinimalStatsDisplay.isInitialized) { MinimalStatsDisplay.updateDisplay(); if (MinimalStatsDisplay.dragHandle) { MinimalStatsDisplay.dragHandle.textContent = Utils.getLangString(CONFIG.MINIMAL_STATS_DRAG_HANDLE_TEXT_KEY); MinimalStatsDisplay.dragHandle.title = Utils.getLangString('minimalStats_editPosition'); }} if (SettingsPanel.isInitialized()) SettingsPanel.rebuildOrRelocalize(); if(state.dom.decrementButton) state.dom.decrementButton.title = Utils.getLangString('button_minus'); if(state.dom.incrementButton) state.dom.incrementButton.title = `${Utils.getLangString('button_plus')} (${CONFIG.INCREMENT_KEYBOARD_SHORTCUT_CODE})`; AutoIncrementer.updateTriggerDebugDisplay(); }
    };

    SettingsPanel = {
        _isInitialized: false,
        isInitialized: () => SettingsPanel._isInitialized,
        build: () => { if (!state.uiContainer) { Utils.error("SettingsPanel: Main UI container not found."); return; } const settingsWidthVw = CONFIG.SETTINGS_PANEL_WIDTH_VW; const settingsPanelFinalWidth = `clamp(${CONFIG.SETTINGS_PANEL_MIN_WIDTH_PX}px, ${settingsWidthVw}vw, ${CONFIG.SETTINGS_PANEL_MAX_WIDTH_PX}px)`; state.dom.settingsPanel = Utils.createDOMElement('div', { id: CONFIG.SETTINGS_PANEL_ID_SUFFIX, className: 'ph-settings-panel ph-interactive-parent', style: { position: 'absolute', top: '0px', right: '0px', bottom: '0px', width: settingsPanelFinalWidth, padding: '12px 18px', zIndex: '10', display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', overflowX: 'hidden', boxShadow: CONFIG.NO_SHADOW_STYLE, transform: 'translateX(101%)', transition: 'transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1), width 0.1s ease-out, background-color 0.2s, border-color 0.2s', pointerEvents: 'none' }}); SettingsPanel._isInitialized = true; SettingsPanel.rebuildOrRelocalize(); state.uiContainer.appendChild(state.dom.settingsPanel); },
        updateTheme: () => { if (!SettingsPanel.isInitialized() || !state.dom.settingsPanel) return; const T = Utils.getThemeColor; state.dom.settingsPanel.style.backgroundColor = T('SETTINGS_PANEL_BACKGROUND'); state.dom.settingsPanel.style.borderLeft = `2px solid ${T('SETTINGS_PANEL_BORDER_COLOR')}`; SettingsPanel.rebuildOrRelocalize(); },
        rebuildOrRelocalize: () => {
            if (!SettingsPanel.isInitialized()) return; state.dom.settingsPanel.innerHTML = '';
            const T = Utils.getLangString; const TC = Utils.getThemeColor;
            const commonInputStyle = {width: '100%', padding: '7px', boxSizing: 'border-box', backgroundColor: TC('INPUT_BG_COLOR'), color: TC('INPUT_TEXT_COLOR'), border: `1px solid ${TC('INPUT_BORDER_COLOR')}`, borderRadius: '3px', fontSize: '0.85em', pointerEvents: 'auto', userSelect: 'auto', cursor:'text'};
            const commonSelectStyle = {...commonInputStyle, cursor: 'pointer'};
            const commonLabelStyle = { display: 'block', marginBottom: '2px', fontSize: '0.8em', color: TC('SETTINGS_PANEL_TEXT_COLOR') };
            const checkboxRowStyle = { display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '0.85em', color: TC('SETTINGS_PANEL_TEXT_COLOR'), margin: '5px 0', pointerEvents:'auto', userSelect:'none' };
            const checkboxStyle = { marginRight: '8px', transform: 'scale(1.15)', accentColor: TC('MAIN_ACCENT_COLOR'), cursor:'pointer', pointerEvents:'auto' };
            const createSection = (titleKey, elements, sectionId = null) => { const section = Utils.createDOMElement('div', {className: 'ph-settings-section'}); if(sectionId) section.id = CONFIG.SCRIPT_ID_PREFIX + sectionId; if (titleKey) section.appendChild(Utils.createDOMElement('h4', { textContent: T(titleKey), style: {margin: '12px 0 6px 0', color: TC('SETTINGS_PANEL_TEXT_COLOR'), fontSize: '1em', borderBottom: `1px solid ${TC('SETTINGS_PANEL_TEXT_COLOR').replace(/,\s*\d(\.\d+)?\)/, ', 0.2)')}`, paddingBottom: '4px'} })); elements.forEach(el => section.appendChild(el)); return section; };
            const heading = Utils.createDOMElement('h3', { textContent: T('settingsBtn'), style: { marginTop: '0', marginBottom: '10px', textAlign: 'center', color: TC('SETTINGS_PANEL_TEXT_COLOR'), fontSize: '1.15em'} }); state.dom.settingsPanel.appendChild(heading);
            state.dom.settingsThemeSelect = Utils.createDOMElement('select', {id: 'themeSelect', style: commonSelectStyle, className:'ph-interactive', onChange: EventHandlers.handleThemeChange }); Object.keys(CONFIG.THEMES).forEach(themeKey => state.dom.settingsThemeSelect.add(new Option(T(`theme_${themeKey}`), themeKey))); state.dom.settingsPanel.appendChild(createSection(null, [Utils.createDOMElement('label', {htmlFor: state.dom.settingsThemeSelect.id, textContent: T('theme'), style: commonLabelStyle}), state.dom.settingsThemeSelect ]));
            state.dom.languageSelect = Utils.createDOMElement('select', { id: 'languageSelect', style: commonSelectStyle, className:'ph-interactive', onChange: EventHandlers.handleLanguageChange }); CONFIG.AVAILABLE_LANGUAGES.forEach(lang => state.dom.languageSelect.add(new Option(lang.name, lang.code))); state.dom.settingsPanel.appendChild(createSection(null, [Utils.createDOMElement('label', { htmlFor: state.dom.languageSelect.id, textContent: T('language_select'), style: commonLabelStyle }), state.dom.languageSelect ]));
            state.dom.pointerEventsModeSelect = Utils.createDOMElement('select', { id: 'pointerEventsModeSelect', style: commonSelectStyle, className:'ph-interactive', onChange: EventHandlers.handlePointerModeChange }); CONFIG.POINTER_EVENTS_MODES.forEach(opt => state.dom.pointerEventsModeSelect.add(new Option(T(opt.text_key), opt.value))); state.dom.settingsPanel.appendChild(createSection('peMode_title', [ Utils.createDOMElement('label', { htmlFor: state.dom.pointerEventsModeSelect.id, textContent: T('peMode_label'), style: commonLabelStyle }), state.dom.pointerEventsModeSelect ]));
            state.dom.settingsShiftTypeSelect = Utils.createDOMElement('select', { id: 'shiftTypeSelect', style: commonSelectStyle, className:'ph-interactive', onChange: EventHandlers.handleShiftSettingsChange }); state.dom.settingsShiftStartTimeInput = Utils.createDOMElement('input', { type: 'time', id: 'shiftStartTimeInput', style: commonInputStyle, className:'ph-interactive', onChange: EventHandlers.handleShiftSettingsChange }); state.dom.settingsLunchSelect = Utils.createDOMElement('select', { id: 'lunchSelect', style: commonSelectStyle, className:'ph-interactive', onChange: EventHandlers.handleLunchSettingChange }); state.dom.settingsPanel.appendChild(createSection('shiftLunch_title', [ Utils.createDOMElement('label', { htmlFor: state.dom.settingsShiftTypeSelect.id, textContent: T('shiftType'), style: commonLabelStyle }), state.dom.settingsShiftTypeSelect, Utils.createDOMElement('label', { htmlFor: state.dom.settingsShiftStartTimeInput.id, textContent: T('shiftStartManual'), style: {...commonLabelStyle, marginTop:'6px'} }), state.dom.settingsShiftStartTimeInput, Utils.createDOMElement('label', { htmlFor: state.dom.settingsLunchSelect.id, textContent: T('lunchBreak'), style: {...commonLabelStyle, marginTop:'6px'} }), state.dom.settingsLunchSelect, ]));
            state.dom.departmentInfoDisplay = Utils.createDOMElement('div', {id: 'departmentInfoDisplay', style: { padding: '5px', backgroundColor: TC('INPUT_BG_COLOR').replace(/,\s*\d(\.\d+)?\)/, ', 0.1)'), borderRadius: '3px', fontSize: '0.8em', color: TC('SETTINGS_PANEL_TEXT_COLOR').replace(/,\s*\d(\.\d+)?\)/, ', 0.7)') }}); state.dom.settingsPanel.appendChild(createSection('department', [state.dom.departmentInfoDisplay]));
            const statsConfigElements = []; const buildStatsCheckbox = (typeKey, listKey) => { const cbId = `statsCfg_${listKey}_${typeKey.replace('-','')}`; state.dom[cbId] = Utils.createDOMElement('input', {type:'checkbox', id: cbId, style: checkboxStyle, className:'ph-interactive ph-stats-config-cb', dataset: { tabtype: typeKey, listkey: listKey }, onChange: EventHandlers.handleStatsConfigChange }); return Utils.createDOMElement('label', {htmlFor: cbId, textContent: T(`statsConfig_tabType_${typeKey}`), style:checkboxRowStyle, className:'ph-interactive'}, [state.dom[cbId]]); }; statsConfigElements.push(Utils.createDOMElement('p', {textContent: T('statsConfig_primaryLabel'), style: commonLabelStyle})); [CONFIG.TAB_TYPES.CRET, CONFIG.TAB_TYPES.WHD, CONFIG.TAB_TYPES.REFURB, CONFIG.TAB_TYPES.UNKNOWN].forEach(type => statsConfigElements.push(buildStatsCheckbox(type, 'primaryContributingTabs'))); statsConfigElements.push(Utils.createDOMElement('p', {textContent: T('statsConfig_secondaryLabel'), style: {...commonLabelStyle, marginTop:'8px'}})); [CONFIG.TAB_TYPES.CRET, CONFIG.TAB_TYPES.WHD, CONFIG.TAB_TYPES.REFURB, CONFIG.TAB_TYPES.UNKNOWN].forEach(type => statsConfigElements.push(buildStatsCheckbox(type, 'secondaryInfoTabs'))); state.dom.settingsPanel.appendChild(createSection('statsConfig_title', statsConfigElements));
            
            // Minimal Stats Type Display Config Section
            state.dom.minimalStatsTypeDisplayConfigContainer = Utils.createDOMElement('div', { id: 'minimalStatsTypeDisplayConfigSection' });
            state.dom.settingsPanel.appendChild(createSection('minimalStats_typeDisplay_title', [state.dom.minimalStatsTypeDisplayConfigContainer]));
            SettingsPanel.buildMinimalStatsTypeDisplayConfigUI(); // Call helper to build this part

            state.dom.autoClickEnabledCheckbox = Utils.createDOMElement('input', { type: 'checkbox', id: 'autoClickEnableCb', style: checkboxStyle, className:'ph-interactive', onChange: EventHandlers.handleAutoClickSettingChange }); const autoClickLabel = Utils.createDOMElement('label', {htmlFor: state.dom.autoClickEnabledCheckbox.id, textContent: T('automation_autoIncrement'), style:checkboxRowStyle, className:'ph-interactive'}, [state.dom.autoClickEnabledCheckbox]);
            state.dom.currentTabContributesCheckbox = Utils.createDOMElement('input', {type: 'checkbox', id: 'currentTabContributesCb', style: checkboxStyle, className:'ph-interactive', onChange: EventHandlers.handleCurrentTabAggregationChange }); const currentTabContributeLabel = Utils.createDOMElement('label', {htmlFor: state.dom.currentTabContributesCheckbox.id, textContent: T('automation_tabContributesToAggregation'), style: checkboxRowStyle, className:'ph-interactive' }, [state.dom.currentTabContributesCheckbox]);
            state.dom.otherTabsSettingsContainer = Utils.createDOMElement('div', {id: 'otherTabsSettingsContainer', style: {marginLeft: '20px', marginTop: '1px', fontSize: '0.9em'}}); state.dom.settingsPanel.appendChild(createSection('automation_title', [ autoClickLabel, currentTabContributeLabel, state.dom.otherTabsSettingsContainer ]));
            const minimalStatsElements = []; state.dom.minimalStatsEnabledCheckbox = Utils.createDOMElement('input', {type:'checkbox', id:'minimalStatsEnableCb', style: checkboxStyle, className:'ph-interactive', onChange: EventHandlers.handleMinimalStatsEnableChange}); minimalStatsElements.push(Utils.createDOMElement('label', {htmlFor: state.dom.minimalStatsEnabledCheckbox.id, textContent: T('minimalStats_enable'), style:checkboxRowStyle, className:'ph-interactive'}, [state.dom.minimalStatsEnabledCheckbox]));
            state.dom.minimalStatsShowTotalCheckbox = Utils.createDOMElement('input', {type:'checkbox', id:'minimalStatsShowTotalCb', style: checkboxStyle, className:'ph-interactive', onChange: EventHandlers.handleMinimalStatsDetailChange}); minimalStatsElements.push(Utils.createDOMElement('label', {htmlFor: state.dom.minimalStatsShowTotalCheckbox.id, textContent: T('minimalStats_showTotal'), style:checkboxRowStyle, className:'ph-interactive'}, [state.dom.minimalStatsShowTotalCheckbox]));
            state.dom.minimalStatsShowPerHourCheckbox = Utils.createDOMElement('input', {type:'checkbox', id:'minimalStatsShowPerHourCb', style: checkboxStyle, className:'ph-interactive', onChange: EventHandlers.handleMinimalStatsDetailChange}); minimalStatsElements.push(Utils.createDOMElement('label', {htmlFor: state.dom.minimalStatsShowPerHourCheckbox.id, textContent: T('minimalStats_showPerHour'), style:checkboxRowStyle, className:'ph-interactive'}, [state.dom.minimalStatsShowPerHourCheckbox]));
            // state.dom.minimalStatsShowSecondaryCheckbox is removed as per new design for minimal stats details
            const editMinStatsPosButton = Utils.createDOMElement('button', { textContent: T('minimalStats_editPosition'), className: 'ph-interactive', style: {...commonInputStyle, backgroundColor: `${TC('MAIN_ACCENT_COLOR')}66`, color:TC('SETTINGS_PANEL_TEXT_COLOR'), marginTop:'5px', fontSize: '0.8em', padding: '4px', cursor:'pointer'}, onClick: EventHandlers.toggleMinimalStatsDragMode }); const resetMinStatsPosButton = Utils.createDOMElement('button', { textContent: T('minimalStats_resetPosition'), className: 'ph-interactive', style: {...commonInputStyle, backgroundColor: TC('BUTTON_DEFAULT_BG_COLOR'), color:TC('SETTINGS_PANEL_TEXT_COLOR'), marginTop:'3px', fontSize: '0.8em', padding: '4px', cursor:'pointer'}, onClick: EventHandlers.handleMinimalStatsResetPosition }); minimalStatsElements.push(editMinStatsPosButton, resetMinStatsPosButton); state.dom.settingsPanel.appendChild(createSection('minimalStats_title', minimalStatsElements));
            const visControls = [ { stateKey: 'showClock', idSuffix: 'showClockCb', labelKey: 'uiVisibility_clock' }, { stateKey: 'showStats', idSuffix: 'showStatsCb', labelKey: 'uiVisibility_statsBlock' }, { stateKey: 'showLastActionTimer', idSuffix: 'showLastActionTimerCb', labelKey: 'uiVisibility_lastActionTimer' }, { stateKey: 'showUITabIndicator', idSuffix: 'showUITabIndicatorCb', labelKey: 'uiVisibility_tabIndicatorPanel' }, { stateKey: 'showPageOverlay', idSuffix: 'showPageOverlayCb', labelKey: 'uiVisibility_pageOverlay' }, { stateKey: 'showPageIndicatorText', idSuffix: 'showPageIndicatorTextCb', labelKey: 'uiVisibility_pageIndicatorText' }, { stateKey: 'showTriggerDebug', idSuffix: 'showTriggerDebugCb', labelKey: 'uiVisibility_triggerDebug' } ]; const visElements = visControls.map(vc => { state.dom[vc.stateKey + 'Checkbox'] = Utils.createDOMElement('input', {type: 'checkbox', id: vc.idSuffix, style: checkboxStyle, className:'ph-interactive', dataset: { statekey: vc.stateKey }, onChange: EventHandlers.handleVisibilityToggleChange }); return Utils.createDOMElement('label', {htmlFor: state.dom[vc.stateKey + 'Checkbox'].id, textContent: T(vc.labelKey), style:checkboxRowStyle, className:'ph-interactive'}, [state.dom[vc.stateKey + 'Checkbox']]); }); state.dom.settingsPanel.appendChild(createSection('uiVisibility_title', visElements));
            state.dom.customTabNameInput = Utils.createDOMElement('input', {type: 'text', id: 'customTabNameInput', style: commonInputStyle, placeholder: 'E.g., Station Alpha', className:'ph-interactive'}); state.dom.customTabBkgColorInput = Utils.createDOMElement('input', {type: 'text', id: 'customTabOverlayColorInput', style: commonInputStyle, placeholder: 'rgba(R,G,B,A) or #HEX', className:'ph-interactive'}); state.dom.customTabTextColorInput = Utils.createDOMElement('input', {type: 'text', id: 'customTabTextColorInput', style: commonInputStyle, placeholder: 'rgba(R,G,B,A) or #HEX', className:'ph-interactive'}); const saveThemeBtn = Utils.createDOMElement('button', {textContent: T('appearance_saveCustom'), className: 'ph-interactive', style: {...commonInputStyle, backgroundColor: `${TC('MAIN_ACCENT_COLOR')}bb`, color: TC('INPUT_TEXT_COLOR'), marginTop:'6px', cursor:'pointer'}, onClick: EventHandlers.handleSaveCustomTheme}); const resetThemeBtn = Utils.createDOMElement('button', {textContent: T('appearance_resetCustom'), className: 'ph-interactive', style: {...commonInputStyle, backgroundColor: TC('BUTTON_DEFAULT_BG_COLOR'), color:TC('SETTINGS_PANEL_TEXT_COLOR'), marginTop:'4px', cursor:'pointer'}, onClick: EventHandlers.handleResetCustomTheme}); state.dom.settingsPanel.appendChild(createSection('appearance_title', [ Utils.createDOMElement('label', {htmlFor: state.dom.customTabNameInput.id, textContent: T('appearance_displayName'), style: commonLabelStyle}), state.dom.customTabNameInput, Utils.createDOMElement('label', {htmlFor: state.dom.customTabBkgColorInput.id, textContent: T('appearance_overlayColor'), style: {...commonLabelStyle, marginTop:'6px'}}), state.dom.customTabBkgColorInput, Utils.createDOMElement('label', {htmlFor: state.dom.customTabTextColorInput.id, textContent: T('appearance_indicatorTextColor'), style: {...commonLabelStyle, marginTop:'6px'}}), state.dom.customTabTextColorInput, saveThemeBtn, resetThemeBtn ], 'tabAppearanceSection'));
            state.dom.debugPointerEventBordersCheckbox = Utils.createDOMElement('input', {type: 'checkbox', id: 'debugPointerBordersCb', style: checkboxStyle, className:'ph-interactive', onChange: EventHandlers.handleDebugPointerBordersChange }); const debugPointerLabel = Utils.createDOMElement('label', {htmlFor: state.dom.debugPointerEventBordersCheckbox.id, textContent: T('debug_pointerBorders'), style:checkboxRowStyle, className:'ph-interactive'}, [state.dom.debugPointerEventBordersCheckbox]); state.dom.settingsPanel.appendChild(createSection('debug_title', [debugPointerLabel]));
            state.dom.settingsCloseButton = Utils.createDOMElement('button', { textContent: T('settings_applyClose'), className: 'ph-settings-close-btn ph-interactive', style: { cursor: 'pointer', backgroundColor: `${TC('MAIN_ACCENT_COLOR')}dd`, border: 'none', color: TC('INPUT_TEXT_COLOR'), borderRadius: '4px', padding: '8px 12px', fontSize: '0.9em', width: '100%', marginTop: 'auto', transition: 'background-color 0.2s' }, onClick: () => UIManager.setSettingsPanelVisibility(false) }); Utils.makeButtonInteractive(state.dom.settingsCloseButton); state.dom.settingsPanel.appendChild(state.dom.settingsCloseButton);
            SettingsPanel.populateAllFields();
        },
        buildMinimalStatsTypeDisplayConfigUI: () => {
            if (!state.dom.minimalStatsTypeDisplayConfigContainer) return;
            state.dom.minimalStatsTypeDisplayConfigContainer.innerHTML = ''; // Clear previous
            const T = Utils.getLangString; const TC = Utils.getThemeColor;
            const commonInputStyle = { padding: '4px', boxSizing: 'border-box', backgroundColor: TC('INPUT_BG_COLOR'), color: TC('INPUT_TEXT_COLOR'), border: `1px solid ${TC('INPUT_BORDER_COLOR')}`, borderRadius: '3px', fontSize: '0.8em', pointerEvents: 'auto', userSelect: 'auto', cursor:'text', width: '40px', marginLeft: '5px', textAlign: 'center' };
            const orderButtonStyle = { padding: '2px 5px', fontSize: '0.8em', marginLeft: '3px', cursor: 'pointer', backgroundColor: TC('BUTTON_DEFAULT_BG_COLOR'), color:TC('SETTINGS_PANEL_TEXT_COLOR'), border: `1px solid ${TC('INPUT_BORDER_COLOR')}`, borderRadius: '3px'};

            state.minimalStatsTypeDisplayConfig.sort((a,b) => a.order - b.order).forEach((item, index) => {
                const itemRow = Utils.createDOMElement('div', { style: { display: 'flex', alignItems: 'center', marginBottom: '8px', padding: '5px', border: `1px solid ${TC('DIVIDER_COLOR')}`, borderRadius: '4px'} });
                
                const typeLabelText = T(`statsConfig_tabType_${item.type}`);
                const typeLabel = Utils.createDOMElement('span', { textContent: typeLabelText, style: { flexGrow: 1, color: TC('SETTINGS_PANEL_TEXT_COLOR'), fontSize: '0.9em' } });

                const visibleCheckboxId = `minStatsDetailVis_${item.type.replace('-','')}`;
                const visibleCheckbox = Utils.createDOMElement('input', { type: 'checkbox', id: visibleCheckboxId, checked: item.visible, className: 'ph-interactive', style: { marginRight: '8px', accentColor: TC('MAIN_ACCENT_COLOR'), cursor: 'pointer' }, dataset: { type: item.type }, onChange: EventHandlers.handleMinimalStatsTypeDetailChange });
                const visibleLabel = Utils.createDOMElement('label', { htmlFor: visibleCheckboxId, textContent: T('minimalStats_typeDisplay_showInDetails'), style: { color: TC('SETTINGS_PANEL_TEXT_COLOR'), fontSize: '0.85em', marginRight: '10px', cursor:'pointer' }});

                const shortLabelInputId = `minStatsDetailLabel_${item.type.replace('-','')}`;
                const shortLabelInput = Utils.createDOMElement('input', { type: 'text', id: shortLabelInputId, value: item.label, maxLength: 2, style: commonInputStyle, className: 'ph-interactive', dataset: { type: item.type }, onInput: EventHandlers.handleMinimalStatsTypeDetailChange });
                const shortLabelLabel = Utils.createDOMElement('label', { htmlFor: shortLabelInputId, textContent: T('minimalStats_typeDisplay_label'), style: { color: TC('SETTINGS_PANEL_TEXT_COLOR'), fontSize: '0.85em', marginRight: '5px'} });

                const btnUp = Utils.createDOMElement('button', { textContent: T('minimalStats_typeDisplay_btnUp'), style: orderButtonStyle, className: 'ph-interactive', disabled: index === 0, onClick: () => EventHandlers.handleMinimalStatsTypeOrderChange(item.type, 'up') });
                const btnDown = Utils.createDOMElement('button', { textContent: T('minimalStats_typeDisplay_btnDown'), style: orderButtonStyle, className: 'ph-interactive', disabled: index === state.minimalStatsTypeDisplayConfig.length - 1, onClick: () => EventHandlers.handleMinimalStatsTypeOrderChange(item.type, 'down') });
                Utils.makeButtonInteractive(btnUp, 0.9); Utils.makeButtonInteractive(btnDown, 0.9);

                const controlsDiv = Utils.createDOMElement('div', {}, [visibleCheckbox, visibleLabel, shortLabelLabel, shortLabelInput, btnUp, btnDown]);
                itemRow.append(typeLabel, controlsDiv);
                state.dom.minimalStatsTypeDisplayConfigContainer.appendChild(itemRow);
            });
        },
        populateAllFields: () => {
            if (!SettingsPanel.isInitialized()) return; const T = Utils.getLangString;
            if(state.dom.settingsThemeSelect) state.dom.settingsThemeSelect.value = state.currentTheme;
            if(state.dom.languageSelect) state.dom.languageSelect.value = state.currentLanguage;
            if (state.dom.pointerEventsModeSelect) state.dom.pointerEventsModeSelect.value = state.pointerEventsMode;
            if(state.dom.settingsShiftTypeSelect) { state.dom.settingsShiftTypeSelect.innerHTML = ''; [['auto', T('shiftType_auto')], ['day', T('shiftType_day')], ['night', T('shiftType_night')]].forEach(([val, txt]) => state.dom.settingsShiftTypeSelect.add(new Option(txt, val))); state.dom.settingsShiftTypeSelect.value = state.shiftType; }
            if(state.dom.settingsShiftStartTimeInput) { state.dom.settingsShiftStartTimeInput.value = state.shiftStartTime ? Utils.formatDateToHHMM(state.shiftStartTime) : ''; const isManual = state.shiftType !== 'auto'; state.dom.settingsShiftStartTimeInput.style.display = isManual ? 'block' : 'none'; const label = state.dom.settingsShiftStartTimeInput.previousElementSibling; if (label && label.tagName === 'LABEL') label.style.display = isManual ? 'block' : 'none'; }
            if(state.dom.settingsLunchSelect) { state.dom.settingsLunchSelect.innerHTML = ''; const currentShiftCat = ShiftManager.getCurrentShiftCategory(); const filteredOptions = CONFIG.DEFAULT_LUNCH_OPTIONS.filter(opt => opt.type === currentShiftCat || opt.type === 'any'); filteredOptions.forEach(opt => { const originalIndex = CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(opt); state.dom.settingsLunchSelect.add(new Option(T(opt.text_key), String(originalIndex))); }); if (state.selectedLunchOption) { const currentLunchOriginalIndex = CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(state.selectedLunchOption); if (filteredOptions.includes(state.selectedLunchOption)) state.dom.settingsLunchSelect.value = String(currentLunchOriginalIndex); else if (filteredOptions.length > 0) { state.selectedLunchOption = filteredOptions[0]; state.dom.settingsLunchSelect.value = String(CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(filteredOptions[0])); }} else if (filteredOptions.length > 0) { state.selectedLunchOption = filteredOptions[0]; state.dom.settingsLunchSelect.value = String(CONFIG.DEFAULT_LUNCH_OPTIONS.indexOf(filteredOptions[0])); }}
            SettingsPanel.populateDepartmentInfo(); SettingsPanel.populateStatsConfigFields();
            SettingsPanel.populateMinimalStatsTypeDisplayConfigFields(); // Populate new section
            if(state.dom.autoClickEnabledCheckbox) state.dom.autoClickEnabledCheckbox.checked = state.autoClickEnabled;
            if(state.dom.currentTabContributesCheckbox) state.dom.currentTabContributesCheckbox.checked = state.currentTabContributesToAggregation;
            SettingsPanel.updateOtherTabsSettingsDisplay();
            if(state.dom.minimalStatsEnabledCheckbox) state.dom.minimalStatsEnabledCheckbox.checked = state.minimalStatsVisible; if(state.dom.minimalStatsShowTotalCheckbox) state.dom.minimalStatsShowTotalCheckbox.checked = state.minimalStatsShowTotal; if(state.dom.minimalStatsShowPerHourCheckbox) state.dom.minimalStatsShowPerHourCheckbox.checked = state.minimalStatsShowPerHour;
            ['showClock', 'showStats', 'showLastActionTimer', 'showUITabIndicator', 'showPageOverlay', 'showPageIndicatorText', 'showTriggerDebug'].forEach(key => { if(state.dom[key + 'Checkbox']) state.dom[key + 'Checkbox'].checked = state[key]; });
            const themeToDisplay = state.customTabThemes[state.currentTabFullUrl] || state.currentTabModeDetails; if(state.dom.customTabNameInput) state.dom.customTabNameInput.value = themeToDisplay.name; if(state.dom.customTabBkgColorInput) state.dom.customTabBkgColorInput.value = themeToDisplay.color; if(state.dom.customTabTextColorInput) state.dom.customTabTextColorInput.value = themeToDisplay.textColor; const appearanceSection = document.getElementById(CONFIG.SCRIPT_ID_PREFIX + 'tabAppearanceSection'); if(appearanceSection) { const sectionHeading = appearanceSection.querySelector('h4'); if(sectionHeading) sectionHeading.textContent = `${T('appearance_title')} (${state.currentTabModeDetails.name})`;}
            if(state.dom.debugPointerEventBordersCheckbox) state.dom.debugPointerEventBordersCheckbox.checked = state.debugPointerEventBorders;
        },
        populateDepartmentInfo: () => { if (!SettingsPanel.isInitialized() || !state.dom.departmentInfoDisplay) return; state.dom.departmentInfoDisplay.textContent = `${Utils.getLangString('department')}: ${DepartmentManager.getDepartmentDisplayName()}`; if (state.currentDepartment === CONFIG.DEPARTMENTS.DETERMINING && state.departmentInfo.sequence.length > 0) state.dom.departmentInfoDisplay.textContent += ` (Sequence: ${state.departmentInfo.sequence.map(s=>s.type).join(' -> ')})`; },
        populateStatsConfigFields: () => {
            if (!SettingsPanel.isInitialized()) return;
            [CONFIG.TAB_TYPES.CRET, CONFIG.TAB_TYPES.WHD, CONFIG.TAB_TYPES.REFURB, CONFIG.TAB_TYPES.UNKNOWN].forEach(type => {
                const primaryCb = state.dom[`statsCfg_primaryContributingTabs_${type.replace('-','')}`]; if (primaryCb) primaryCb.checked = state.statsConfig.primaryContributingTabs.includes(type);
                const secondaryCb = state.dom[`statsCfg_secondaryInfoTabs_${type.replace('-','')}`]; if (secondaryCb) secondaryCb.checked = state.statsConfig.secondaryInfoTabs.includes(type);
            });
        },
        populateMinimalStatsTypeDisplayConfigFields: () => {
            if (!SettingsPanel.isInitialized() || !state.dom.minimalStatsTypeDisplayConfigContainer) return;
            // The dynamic part is rebuilt, so direct population of values is handled by buildMinimalStatsTypeDisplayConfigUI
            // We just ensure it's rebuilt if needed.
            SettingsPanel.buildMinimalStatsTypeDisplayConfigUI();
        },
        updateOtherTabsSettingsDisplay: () => {
            if (!SettingsPanel.isInitialized() || !state.dom.otherTabsSettingsContainer) return; const T = Utils.getLangString; const TC = Utils.getThemeColor; state.dom.otherTabsSettingsContainer.innerHTML = ''; const checkboxRowStyle = { display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '0.8em', color: TC('SETTINGS_PANEL_TEXT_COLOR'), margin:'2px 0', pointerEvents:'auto', userSelect:'none' }; const checkboxStyle = { marginRight: '6px', transform: 'scale(1.05)', accentColor: TC('MAIN_ACCENT_COLOR'), cursor:'pointer', pointerEvents:'auto' };
            const otherTabs = Object.values(state.otherTabsData).filter(td => td.tabId !== state.currentTabId);
            if (otherTabs.length === 0) { state.dom.otherTabsSettingsContainer.appendChild(Utils.createDOMElement('p', {textContent: T('automation_noOtherTabs'), style: {opacity:'0.6', fontStyle:'italic', fontSize:'0.9em', margin:'4px 0', color: TC('SETTINGS_PANEL_TEXT_COLOR')}})); return; }
            state.dom.otherTabsSettingsContainer.appendChild(Utils.createDOMElement('div', {textContent: T('automation_otherTabsContribution'), style: {fontSize: '0.85em', marginBottom: '3px', color: TC('SETTINGS_PANEL_TEXT_COLOR')}}));
            otherTabs.forEach(tabData => { const checkboxId = `contribToggle_${tabData.tabId.replace(/[^a-zA-Z0-9]/g, '_')}`; const checkbox = Utils.createDOMElement('input', { type: 'checkbox', id: checkboxId, checked: tabData.contributesToAggregation || false, style: checkboxStyle, dataset: { targetTabId: tabData.tabId }, className:'ph-interactive', onChange: EventHandlers.handleOtherTabAggregationChange }); const label = Utils.createDOMElement('label', { htmlFor: checkbox.id, style: checkboxRowStyle, className:'ph-interactive' }, [ checkbox, `${tabData.modeName||tabData.tabId.substring(0,12)+'...'} (${tabData.clicks || 0} ${T('stats_items')})` ]); state.dom.otherTabsSettingsContainer.appendChild(label); });
        }
    };

    EventHandlers = {
        processIncrementForCurrentTab: (isManualAction = false, event = null) => { state.clicksForThisTab++; state.lastActionTimestampForThisTab = Date.now(); UIManager.updateCounterDisplay(); UIManager.updateLastActionTimerDisplay(); StorageManager.writeCurrentTabDataToLocalStorage(); StorageManager.readAllTabsDataFromLocalStorage(false); if (isManualAction && state.dom.incrementButton) { state.dom.incrementButton.style.transform = 'scale(0.92)'; setTimeout(() => { if(state.dom.incrementButton) state.dom.incrementButton.style.transform = 'scale(1)'; }, 90); } Utils.debug(`Incremented. Tab: ${state.clicksForThisTab}. Manual: ${isManualAction}`); },
        handleDecrementClick: () => { if (state.clicksForThisTab > 0) { state.clicksForThisTab--; state.lastActionTimestampForThisTab = Date.now(); UIManager.updateCounterDisplay(); UIManager.updateLastActionTimerDisplay(); StorageManager.writeCurrentTabDataToLocalStorage(); StorageManager.readAllTabsDataFromLocalStorage(false); }},
        handleCounterInputDynamic: (event) => { const input = event.target; const valueLength = String(input.value).length; let newFontSize = CONFIG.MAIN_COUNTER_FONT_SIZE_INITIAL_EM; if (valueLength > CONFIG.MAIN_COUNTER_MAX_CHARS_BEFORE_RESIZE) { const overflowChars = valueLength - CONFIG.MAIN_COUNTER_MAX_CHARS_BEFORE_RESIZE; newFontSize = Math.max(CONFIG.MAIN_COUNTER_FONT_SIZE_MIN_EM, CONFIG.MAIN_COUNTER_FONT_SIZE_INITIAL_EM - overflowChars * 0.75); } input.style.fontSize = `${newFontSize}em`; },
        handleCounterInputChange: (event) => { let newValue = parseInt(event.target.value, 10); if (isNaN(newValue) || newValue < 0) newValue = 0; if (newValue !== state.clicksForThisTab) { state.clicksForThisTab = newValue; state.lastActionTimestampForThisTab = Date.now(); UIManager.updateLastActionTimerDisplay(); StorageManager.writeCurrentTabDataToLocalStorage(); StorageManager.readAllTabsDataFromLocalStorage(false); } UIManager.updateCounterDisplay(); },
        handleShiftSettingsChange: () => { state.shiftType = state.dom.settingsShiftTypeSelect.value; ShiftManager.determineAndSetShiftStartTime(false); if (SettingsPanel.isInitialized()) SettingsPanel.populateAllFields(); UIManager.updateStatisticsDisplay(); MinimalStatsDisplay.updateDisplay(); StorageManager.saveMainSettings(); },
        handleLunchSettingChange: () => { const selectedIndex = parseInt(state.dom.settingsLunchSelect.value, 10); if (CONFIG.DEFAULT_LUNCH_OPTIONS[selectedIndex]) { state.selectedLunchOption = CONFIG.DEFAULT_LUNCH_OPTIONS[selectedIndex]; UIManager.updateStatisticsDisplay(); MinimalStatsDisplay.updateDisplay(); StorageManager.saveMainSettings(); }},
        handleAutoClickSettingChange: (event) => { state.autoClickEnabled = event.target.checked; if (state.autoClickEnabled && !state.mutationObserver) AutoIncrementer.init(); else if (!state.autoClickEnabled && state.mutationObserver) AutoIncrementer.disconnect(); StorageManager.saveMainSettings(); },
        handleCurrentTabAggregationChange: (event) => { state.currentTabContributesToAggregation = event.target.checked; StorageManager.writeCurrentTabDataToLocalStorage(); StorageManager.readAllTabsDataFromLocalStorage(false); StorageManager.saveMainSettings(); },
        handleOtherTabAggregationChange: (event) => { const targetTabId = event.target.dataset.targetTabId; const isChecked = event.target.checked; const otherTabStorageKey = CONFIG.SCRIPT_ID_PREFIX + CONFIG.MULTI_TAB_STORAGE_PREFIX + targetTabId; try { const otherTabStoredJson = localStorage.getItem(otherTabStorageKey); if (otherTabStoredJson) { const otherTabStoredData = JSON.parse(otherTabStoredJson); otherTabStoredData.contributesToAggregation = isChecked; otherTabStoredData.timestamp = Date.now(); localStorage.setItem(otherTabStorageKey, JSON.stringify(otherTabStoredData)); StorageManager.readAllTabsDataFromLocalStorage(false); }} catch (err) { Utils.error('Error updating aggregation for other tab:', err); }},
        handleMinimalStatsEnableChange: (event) => { state.minimalStatsVisible = event.target.checked; MinimalStatsDisplay.setVisibility(state.minimalStatsVisible); StorageManager.saveMainSettings(); },
        handleMinimalStatsDetailChange: (event) => { const checkbox = event.target; if (checkbox === state.dom.minimalStatsShowTotalCheckbox) state.minimalStatsShowTotal = checkbox.checked; else if (checkbox === state.dom.minimalStatsShowPerHourCheckbox) state.minimalStatsShowPerHour = checkbox.checked; MinimalStatsDisplay.updateDisplay(); StorageManager.saveMainSettings(); },
        handleMinimalStatsTypeDetailChange: (event) => {
            const targetElement = event.target;
            const type = targetElement.dataset.type;
            const configItem = state.minimalStatsTypeDisplayConfig.find(item => item.type === type);
            if (!configItem) return;

            if (targetElement.type === 'checkbox') {
                configItem.visible = targetElement.checked;
            } else if (targetElement.type === 'text') { // Short Label input
                configItem.label = targetElement.value.substring(0, 2); // Max 2 chars
            }
            StorageManager.saveMinimalStatsTypeConfig();
            MinimalStatsDisplay.updateDisplay();
            // No need to rebuild the settings UI part for checkbox/label change, just the data.
        },
        handleMinimalStatsTypeOrderChange: (type, direction) => {
            const config = state.minimalStatsTypeDisplayConfig;
            const itemIndex = config.findIndex(item => item.type === type);
            if (itemIndex === -1) return;

            if (direction === 'up' && itemIndex > 0) {
                [config[itemIndex], config[itemIndex - 1]] = [config[itemIndex - 1], config[itemIndex]];
            } else if (direction === 'down' && itemIndex < config.length - 1) {
                [config[itemIndex], config[itemIndex + 1]] = [config[itemIndex + 1], config[itemIndex]];
            }

            // Re-assign order property
            config.forEach((item, idx) => item.order = idx);
            
            StorageManager.saveMinimalStatsTypeConfig();
            MinimalStatsDisplay.updateDisplay();
            if (SettingsPanel.isInitialized() && state.settingsPanelVisible) {
                SettingsPanel.buildMinimalStatsTypeDisplayConfigUI(); // Rebuild this part of settings
            }
        },
        toggleMinimalStatsDragMode: (event) => { const button = event.target; const T = Utils.getLangString; const isCurrentlyEditing = MinimalStatsDisplay.dragHandle && MinimalStatsDisplay.dragHandle.style.display === 'block'; if (isCurrentlyEditing) { MinimalStatsDisplay.showDragHandle(false); button.textContent = T('minimalStats_editPosition'); MinimalStatsDisplay.applyDraggableStyling(false); } else { MinimalStatsDisplay.showDragHandle(true); button.textContent = T('minimalStats_pin'); }},
        handleMinimalStatsResetPosition: () => { state.minimalStatsPosition = { bottom: `${CONFIG.MINIMAL_STATS_DEFAULT_BOTTOM_VH}vh`, right: `${CONFIG.MINIMAL_STATS_DEFAULT_RIGHT_VW}vw` }; MinimalStatsDisplay.setPosition(state.minimalStatsPosition); StorageManager.saveMinimalStatsPos(); },
        handleVisibilityToggleChange: (event) => { const key = event.target.dataset.statekey; if (state.hasOwnProperty(key)) { state[key] = event.target.checked; UIManager.applyElementVisibilityFromState(); if (key === 'showPageOverlay' || key === 'showPageIndicatorText') UIManager.applyPageTheme(); if (key === 'showTriggerDebug' && state.dom.triggerDebugDisplay) AutoIncrementer.updateTriggerDebugDisplay(); StorageManager.saveMainSettings(); }},
        handleSaveCustomTheme: () => { const name = state.dom.customTabNameInput.value.trim() || state.currentTabModeDetails.name; const color = state.dom.customTabBkgColorInput.value.trim() || state.currentTabModeDetails.color; const textColor = state.dom.customTabTextColorInput.value.trim() || state.currentTabModeDetails.textColor; state.customTabThemes[state.currentTabFullUrl] = { name, color, textColor }; state.currentTabModeDetails = { name, color, textColor, isCustom: true }; StorageManager.saveCustomThemes(); UIManager.applyPageTheme(); UIManager.updateUITabIndicatorText(); if (SettingsPanel.isInitialized()) SettingsPanel.populateAllFields(); },
        handleResetCustomTheme: () => { if (state.customTabThemes[state.currentTabFullUrl]) { delete state.customTabThemes[state.currentTabFullUrl]; StorageManager.saveCustomThemes(); StorageManager.determineCurrentTabTypeAndModeDetails(); UIManager.applyPageTheme(); UIManager.updateUITabIndicatorText(); if (SettingsPanel.isInitialized()) SettingsPanel.populateAllFields(); }},
        handleDebugPointerBordersChange: (event) => { state.debugPointerEventBorders = event.target.checked; UIManager.applyDebugPointerEventBorders(); StorageManager.saveMainSettings(); },
        handlePageKeydown: (event) => { const target = event.target; const isOurInput = (state.uiContainer && state.uiContainer.contains(target) && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')); if (!isOurInput && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) return; if (event.code === CONFIG.INCREMENT_KEYBOARD_SHORTCUT_CODE) { event.preventDefault(); EventHandlers.processIncrementForCurrentTab(false, event); }},
        toggleSettingsPanelVisibility: () => UIManager.setSettingsPanelVisibility(!state.settingsPanelVisible),
        toggleUILockState: () => { state.uiLocked = !state.uiLocked; UIManager.updateUILockVisuals(); UIManager.applyUILockToElements(state.uiLocked); StorageManager.saveMainSettings(); },
        handlePointerModeChange: (event) => { state.pointerEventsMode = event.target.value; UIManager.updatePointerEventsMode(); StorageManager.saveMainSettings(); },
        handleLanguageChange: (event) => { state.currentLanguage = event.target.value; StorageManager.saveLanguagePreference(); UIManager.refreshUIForLanguageChange(); },
        handleThemeChange: (event) => { state.currentTheme = event.target.value; StorageManager.saveThemePreference(); UIManager.applyThemeStyles(); if (SettingsPanel.isInitialized()) SettingsPanel.updateTheme(); },
        handleStatsConfigChange: (event) => {
            const checkbox = event.target; const tabType = checkbox.dataset.tabtype; const listKey = checkbox.dataset.listkey;
            if (!state.statsConfig[listKey]) state.statsConfig[listKey] = [];
            if (checkbox.checked) { if (!state.statsConfig[listKey].includes(tabType)) state.statsConfig[listKey].push(tabType); }
            else state.statsConfig[listKey] = state.statsConfig[listKey].filter(t => t !== tabType);
            state.currentDepartment = CONFIG.DEPARTMENTS.CUSTOM; // User changed stats config, becomes custom
            StorageManager.saveStatsConfig();
            StorageManager.saveDepartmentInfo(); // Save new dept status (was DepartmentManager.saveDepartmentInfo())
            UIManager.updateStatisticsDisplay(); MinimalStatsDisplay.updateDisplay();
            if (SettingsPanel.isInitialized()) { SettingsPanel.populateDepartmentInfo(); SettingsPanel.populateStatsConfigFields(); /* No direct link to minimal stats type display settings here */ }
        },
        handleWindowBeforeUnload: () => { Utils.info("Window beforeunload: Saving state..."); StorageManager.writeCurrentTabDataToLocalStorage(); StorageManager.saveMainSettings(); StorageManager.saveUIPanelSizePos(); StorageManager.saveMinimalStatsPos(); StorageManager.saveCustomThemes(); StorageManager.saveDepartmentInfo(); StorageManager.saveLanguagePreference(); StorageManager.saveThemePreference(); StorageManager.saveStatsConfig(); StorageManager.saveMinimalStatsTypeConfig(); },
        handleStorageEvent: (event) => {
            if (event.key && event.key.startsWith(CONFIG.SCRIPT_ID_PREFIX + CONFIG.MULTI_TAB_STORAGE_PREFIX) && event.key !== (CONFIG.SCRIPT_ID_PREFIX + CONFIG.MULTI_TAB_STORAGE_PREFIX + state.currentTabId)) {
                StorageManager.readAllTabsDataFromLocalStorage(false);
            }
            if (event.key === StorageManager._prefixKey(CONFIG.STORAGE_KEY_DEPARTMENT_INFO)) {
                const newDeptInfo = JSON.parse(event.newValue);
                if (newDeptInfo && newDeptInfo.department && newDeptInfo.department !== state.currentDepartment) {
                    state.departmentInfo = newDeptInfo; state.currentDepartment = newDeptInfo.department;
                    if(state.initialized) { UIManager.updateStatisticsDisplay(); MinimalStatsDisplay.updateDisplay(); if (SettingsPanel.isInitialized() && state.settingsPanelVisible) SettingsPanel.populateDepartmentInfo(); }
                } else if (newDeptInfo && newDeptInfo.sequence.length !== state.departmentInfo.sequence.length) {
                    state.departmentInfo = newDeptInfo;
                    if (state.currentDepartment === CONFIG.DEPARTMENTS.DETERMINING) DepartmentManager.updateSequenceAndTryDetermine();
                }
            }
            if (event.key === StorageManager._prefixKey(CONFIG.STORAGE_KEY_LANGUAGE)) {
                const newLang = JSON.parse(event.newValue);
                if (newLang && newLang !== state.currentLanguage && CONFIG.AVAILABLE_LANGUAGES.find(l=>l.code === newLang)) {
                    state.currentLanguage = newLang;
                    if (state.initialized) UIManager.refreshUIForLanguageChange();
                }
            }
            if (event.key === StorageManager._prefixKey(CONFIG.STORAGE_KEY_THEME_PREFERENCE)) {
                const newTheme = JSON.parse(event.newValue);
                if (newTheme && newTheme !== state.currentTheme && CONFIG.THEMES[newTheme]) {
                    state.currentTheme = newTheme;
                    if (state.initialized) UIManager.applyThemeStyles();
                }
            }
            if (event.key === StorageManager._prefixKey(CONFIG.STORAGE_KEY_STATS_CONFIG)) {
                const newStatsConfig = JSON.parse(event.newValue);
                if (newStatsConfig && JSON.stringify(newStatsConfig) !== JSON.stringify(state.statsConfig)) {
                    state.statsConfig = newStatsConfig; state.currentDepartment = CONFIG.DEPARTMENTS.CUSTOM;
                    if(state.initialized) {UIManager.updateStatisticsDisplay(); MinimalStatsDisplay.updateDisplay(); if(SettingsPanel.isInitialized()) {SettingsPanel.populateStatsConfigFields(); SettingsPanel.populateDepartmentInfo(); }}
                }
            }
            if (event.key === StorageManager._prefixKey(CONFIG.STORAGE_KEY_MINIMAL_STATS_TYPE_CONFIG)) {
                try {
                    const newMinStatsTypeConfig = JSON.parse(event.newValue);
                    if (newMinStatsTypeConfig && Array.isArray(newMinStatsTypeConfig) && JSON.stringify(newMinStatsTypeConfig) !== JSON.stringify(state.minimalStatsTypeDisplayConfig)) {
                        Utils.info("MinimalStatsTypeConfig changed in another tab. Updating...");
                        const defaultConfig = MinimalStatsDisplay.getDefaultTypeConfig();
                        state.minimalStatsTypeDisplayConfig = defaultConfig.map(defaultItem => {
                            const loadedItem = newMinStatsTypeConfig.find(li => li.type === defaultItem.type);
                            return loadedItem ? { ...defaultItem, ...loadedItem } : defaultItem;
                        }).sort((a,b) => a.order - b.order);

                        if (state.initialized) {
                            MinimalStatsDisplay.updateDisplay();
                            if (SettingsPanel.isInitialized() && state.settingsPanelVisible) {
                                SettingsPanel.populateMinimalStatsTypeDisplayConfigFields();
                            }
                        }
                    }
                } catch (e) {
                    Utils.error("Error processing minimalStatsTypeDisplayConfig from storage event:", e);
                }
            }
        }
    };

    function initialize() {
        const initFlag = `${CONFIG.SCRIPT_ID_PREFIX}initialized_${CONFIG.SCRIPT_VERSION.replace(/\./g, '_')}`;
        if (window[initFlag]) { Utils.warn(`Production Assistant v${CONFIG.SCRIPT_VERSION} already initialized. Attempting to destroy and re-init.`); const destroyFuncKey = `destroyProductionHelper_${CONFIG.SCRIPT_VERSION.replace(/\./g, '_')}`; if (typeof window[destroyFuncKey] === 'function') try { window[destroyFuncKey](); } catch(e) { Utils.error("Error destroying old PHelper instance:", e); } else { const oldContainer = document.getElementById(CONFIG.SCRIPT_ID_PREFIX + CONFIG.UI_CONTAINER_ID); if(oldContainer) oldContainer.remove(); } delete window[initFlag]; setTimeout(actualInit, 150); return; } actualInit();
    }
    function actualInit() {
        Utils.info(`Initializing Production Assistant v${CONFIG.SCRIPT_VERSION}...`);
        const loadedDeptInfo = StorageManager.load(CONFIG.STORAGE_KEY_DEPARTMENT_INFO, { department: null, sequence: [], sessionStartTime: null }, false); state.departmentInfo = loadedDeptInfo; DepartmentManager.checkAndReloadForSessionTTL();
        StorageManager.loadAllState(); DepartmentManager.init(); ShiftManager.init();
        UIManager.init(); MinimalStatsDisplay.init(); UIManager.setInitialUIValues();
        UIManager.updateCounterDisplay(); UIManager.updateRealTimeClockDisplay(); UIManager.updateLastActionTimerDisplay(); UIManager.updateStatisticsDisplay();
        state.intervals.realTimeClock = setInterval(UIManager.updateRealTimeClockDisplay, 1000); state.intervals.lastActionTimer = setInterval(UIManager.updateLastActionTimerDisplay, 1000); state.intervals.statistics = setInterval(() => { UIManager.updateStatisticsDisplay(); MinimalStatsDisplay.updateDisplay(); }, CONFIG.STATS_UPDATE_INTERVAL_MS); state.intervals.multiTabWrite = setInterval(StorageManager.writeCurrentTabDataToLocalStorage, CONFIG.MULTI_TAB_WRITE_INTERVAL_MS); state.intervals.multiTabRead = setInterval(() => StorageManager.readAllTabsDataFromLocalStorage(false), CONFIG.MULTI_TAB_READ_INTERVAL_MS);
        if (state.autoClickEnabled) AutoIncrementer.init(); else AutoIncrementer.updateTriggerDebugDisplay();
        state.pageKeydownListener = EventHandlers.handlePageKeydown; document.addEventListener('keydown', state.pageKeydownListener);
        state.beforeUnloadListener = EventHandlers.handleWindowBeforeUnload; window.addEventListener('beforeunload', state.beforeUnloadListener);
        state.storageListener = EventHandlers.handleStorageEvent; window.addEventListener('storage', state.storageListener);
        state.initialized = true; const initFlag = `${CONFIG.SCRIPT_ID_PREFIX}initialized_${CONFIG.SCRIPT_VERSION.replace(/\./g, '_')}`; window[initFlag] = true; const destroyFuncKey = `destroyProductionHelper_${CONFIG.SCRIPT_VERSION.replace(/\./g, '_')}`; window[destroyFuncKey] = destroy;
        Utils.info(`Production Assistant v${CONFIG.SCRIPT_VERSION} initialized successfully.`);
    }
    function destroy() {
        const destroyFuncKey = `destroyProductionHelper_${CONFIG.SCRIPT_VERSION.replace(/\./g, '_')}`; Utils.info(`Destroying Production Assistant v${CONFIG.SCRIPT_VERSION}...`); if(state.initialized) try { EventHandlers.handleWindowBeforeUnload(); } catch (e) { Utils.error("Error saving data on destroy:", e); }
        AutoIncrementer.disconnect(); Object.values(state.intervals).forEach(clearInterval); state.intervals = {}; Object.values(state.timeouts).forEach(clearTimeout); state.timeouts = {};
        if (state.pageKeydownListener) document.removeEventListener('keydown', state.pageKeydownListener); if (state.beforeUnloadListener) window.removeEventListener('beforeunload', state.beforeUnloadListener); if (state.storageListener) window.removeEventListener('storage', state.storageListener);
        const elementsToRemoveIds = [ CONFIG.SCRIPT_ID_PREFIX + CONFIG.UI_CONTAINER_ID, CONFIG.SCRIPT_ID_PREFIX + CONFIG.PAGE_COLOR_OVERLAY_ID_SUFFIX, CONFIG.SCRIPT_ID_PREFIX + CONFIG.PAGE_INDICATOR_TEXT_ID_SUFFIX, CONFIG.SCRIPT_ID_PREFIX + CONFIG.EMERGENCY_SHOW_BUTTON_ID_SUFFIX, CONFIG.SCRIPT_ID_PREFIX + CONFIG.MINIMAL_STATS_ID_SUFFIX, CONFIG.SCRIPT_ID_PREFIX + 'globalStyles', CONFIG.SCRIPT_ID_PREFIX + 'themeStyles', ];
        elementsToRemoveIds.forEach(id => { const el = document.getElementById(id); if (el) el.remove(); });
        state.uiContainer = null; state.dom = {}; state.initialized = false; const initFlag = `${CONFIG.SCRIPT_ID_PREFIX}initialized_${CONFIG.SCRIPT_VERSION.replace(/\./g, '_')}`; delete window[initFlag]; delete window[destroyFuncKey];
        Utils.info(`Production Assistant v${CONFIG.SCRIPT_VERSION} destroyed.`);
    }
    function injectGlobalStyles() {
        const styleId = CONFIG.SCRIPT_ID_PREFIX + 'globalStyles'; let globalStyleEl = document.getElementById(styleId);
        if (!globalStyleEl) { globalStyleEl = document.createElement('style'); globalStyleEl.id = styleId; globalStyleEl.type = 'text/css'; document.head.appendChild(globalStyleEl); }
        globalStyleEl.textContent = `.${CONFIG.SCRIPT_ID_PREFIX}main_counter_input::-webkit-outer-spin-button,.${CONFIG.SCRIPT_ID_PREFIX}main_counter_input::-webkit-inner-spin-button {-webkit-appearance: none; margin: 0;} .${CONFIG.SCRIPT_ID_PREFIX}main_counter_input[type=number] {-moz-appearance: textfield;} .ph-interactive {pointer-events: auto !important; user-select: auto !important;} .ph-interactive-parent > .ph-interactive {pointer-events: auto !important;} .ph-non-selectable {user-select: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none;} `;

        const themeStyleId = CONFIG.SCRIPT_ID_PREFIX + 'themeStyles'; let themeStyleEl = document.getElementById(themeStyleId);
        if (!themeStyleEl) { themeStyleEl = document.createElement('style'); themeStyleEl.id = themeStyleId; document.head.appendChild(themeStyleEl); }
        const scrollbarTrack = Utils.getThemeColor('SCROLLBAR_TRACK_BG'); const scrollbarThumb = Utils.getThemeColor('SCROLLBAR_THUMB_BG'); const scrollbarThumbHover = Utils.getThemeColor('SCROLLBAR_THUMB_HOVER_BG');
        themeStyleEl.textContent = `
            .ph-settings-panel::-webkit-scrollbar, .ph-right-pane::-webkit-scrollbar, .ph-stats-config-scrollable::-webkit-scrollbar { width: 8px; height: 8px; }
            .ph-settings-panel::-webkit-scrollbar-track, .ph-right-pane::-webkit-scrollbar-track, .ph-stats-config-scrollable::-webkit-scrollbar-track { background: ${scrollbarTrack}; border-radius:4px; }
            .ph-settings-panel::-webkit-scrollbar-thumb, .ph-right-pane::-webkit-scrollbar-thumb, .ph-stats-config-scrollable::-webkit-scrollbar-thumb { background: ${scrollbarThumb}; border-radius:4px;}
            .ph-settings-panel::-webkit-scrollbar-thumb:hover, .ph-right-pane::-webkit-scrollbar-thumb:hover, .ph-stats-config-scrollable::-webkit-scrollbar-thumb:hover { background: ${scrollbarThumbHover}; }
            .ph-stats-config-scrollable { max-height: 120px; overflow-y: auto; border: 1px solid ${Utils.getThemeColor('INPUT_BORDER_COLOR').replace(/,\s*\d(\.\d+)?\)/, ', 0.3)')}; padding: 5px; margin-top: 3px; border-radius: 3px; }
        `;
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') { injectGlobalStyles(); initialize(); }
    else document.addEventListener('DOMContentLoaded', () => { injectGlobalStyles(); initialize(); }, { once: true });

})();
