// == Production Assistant v3.3 (International, Multi-Tab, Resizable, Advanced Debug, Click-Through Modes) ==
// Purpose: Highly configurable, multi-tab aware UI with resizable panes, debug visuals, and click-through control.
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
        UI_CONTAINER_ID: 'prodHelperUI_v3_3_intl',
        UI_BOTTOM_OFFSET: '10px',
        UI_RIGHT_OFFSET: '10px',
        UI_WIDTH_PERCENT_VIEWPORT: 45,
        UI_HEIGHT_PERCENT_VIEWPORT: 35,
        UI_MIN_WIDTH_PX: 380, // Increased min width for better layout
        UI_MIN_HEIGHT_PX: 280,
        UI_BACKGROUND_COLOR: 'rgba(30, 35, 45, 0.85)', // Default to a visible background
        UI_TEXT_COLOR: 'rgba(220, 220, 230, 0.9)',   // Default visible text
        UI_BORDER_COLOR: 'rgba(80, 120, 220, 0.5)',  // Default visible border
        FONT_FAMILY: '"Segoe UI", Roboto, Arial, sans-serif',
        MAIN_ACCENT_COLOR: 'rgba(255, 152, 0, 0.9)', // A more distinct accent (orange)

        // --- Clicker & Counter ---
        MAIN_COUNTER_INPUT_ID: 'mainProdCounterInput_v3_3',
        MAIN_COUNTER_FONT_SIZE_INITIAL_EM: 4.8,
        MAIN_COUNTER_FONT_SIZE_MIN_EM: 1.8,
        MAIN_COUNTER_MAX_CHARS_BEFORE_RESIZE: 3,
        SHOW_DECREMENT_BUTTON: true,
        CLICKER_INCREMENT_BUTTON_ID: 'incrementProdBtn_v3_3',
        CLICKER_INCREMENT_BUTTON_COLOR: 'rgba(80, 180, 80, 0.7)', // Greenish
        CLICKER_DECREMENT_BUTTON_ID: 'decrementProdBtn_v3_3',
        CLICKER_DECREMENT_BUTTON_COLOR: 'rgba(200, 80, 80, 0.7)',// Reddish
        INCREMENT_KEYBOARD_SHORTCUT_CODE: 'ShiftRight',

        // --- Resizable Divider ---
        DIVIDER_WIDTH_PX: 8,
        LEFT_PANE_MIN_WIDTH_PERCENT: 25,
        RIGHT_PANE_MIN_WIDTH_PERCENT: 30,

        // --- Timer for Last Action ---
        LAST_ACTION_TIMER_ID: 'lastActionTimer_v3_3',
        LAST_ACTION_TIMER_WARN_SECONDS: 10 * 60,
        LAST_ACTION_TIMER_WARN_COLOR: 'rgba(255, 0, 0, 0.9)',

        // --- Real-time Clock ---
        CLOCK_DISPLAY_ID: 'prodRealTimeClock_v3_3',
        CLOCK_FONT_SIZE_EM: 3.8,

        // --- Tabs/Modes Overlay & Identification ---
        PAGE_COLOR_OVERLAY_ID: 'prodHelperPageColorOverlay_v3_3',
        PAGE_INDICATOR_TEXT_ID: 'prodHelperPageIndicatorText_v3_3',
        PAGE_INDICATOR_FONT_SIZE_PX: 48,
        TAB_IDENTIFICATION_MODES: [
            { name: 'PREB', keyword: 'PREBUILD', color: 'rgba(255, 165, 0, 0.04)', textColor: 'rgba(255, 140, 0, 0.6)'},
            { name: 'CURRB', keyword: 'CURRENTBUILD', color: 'rgba(0, 165, 255, 0.04)', textColor: 'rgba(0, 140, 255, 0.6)'},
            { name: 'AFTREF', keyword: 'AFTERREFURBISH', color: 'rgba(100, 255, 100, 0.04)', textColor: 'rgba(80, 220, 80, 0.6)'},
        ],
        DEFAULT_TAB_MODE_NAME: 'General', // More generic default
        DEFAULT_TAB_MODE_COLOR: 'rgba(100, 100, 100, 0.03)',
        DEFAULT_TAB_MODE_TEXT_COLOR: 'rgba(150, 150, 150, 0.5)',
        UI_TAB_INDICATOR_TEXT_ID: 'prodHelperUITabIndicator_v3_3',
        UI_TAB_INDICATOR_FONT_SIZE_EM: 1.1,

        // --- Multi-Tab State Sync via localStorage ---
        MULTI_TAB_STORAGE_PREFIX: 'prodHelper_tabs_v3_3_',
        MULTI_TAB_UPDATE_INTERVAL_MS: 1000,
        MULTI_TAB_READ_INTERVAL_MS: 1500,
        MULTI_TAB_DATA_TTL_MS: 5 * 60 * 1000,

        // --- Shift & Lunch ---
        DEFAULT_DAY_SHIFT_START_TIME: '06:26',
        DEFAULT_NIGHT_SHIFT_START_TIME: '18:26',
        SETTINGS_SHIFT_TYPE_SELECT_ID: 'shiftTypeSelect_v3_3',
        SETTINGS_SHIFT_START_TIME_INPUT_ID: 'shiftStartTimeInput_v3_3',
        SETTINGS_LUNCH_TIME_SELECT_ID: 'lunchTimeSelect_v3_3',
        DEFAULT_LUNCH_OPTIONS: [ /* Same as before */
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
        STATS_FONT_SIZE_EM: 0.9, // Slightly larger for clarity
        STATS_UPDATE_INTERVAL_MS: 3000,

        // --- Auto-Clicker Trigger ---
        AUTO_CLICK_TRIGGER_WORD: 'wysłano',
        TRIGGER_OBSERVE_AREA_SELECTOR: 'body',
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
        TOGGLE_SETTINGS_BUTTON_TEXT_OPENED: 'settings ◀', // Indicate open state

        // --- New Pointer Events Mode Setting ---
        SETTINGS_POINTER_EVENTS_MODE_SELECT_ID: 'pointerEventsModeSelect_v3_3',

        // --- Settings Toggles --- (IDs updated for v3.3)
        SETTINGS_SHOW_CLOCK_CHECKBOX_ID: 'showClockToggle_v3_3',
        SETTINGS_SHOW_STATS_CHECKBOX_ID: 'showStatsToggle_v3_3',
        SETTINGS_SHOW_LAST_ACTION_TIMER_CHECKBOX_ID: 'showLastActionTimerToggle_v3_3',
        SETTINGS_SHOW_UI_TAB_INDICATOR_CHECKBOX_ID: 'showUITabIndicatorToggle_v3_3',
        SETTINGS_SHOW_PAGE_OVERLAY_CHECKBOX_ID: 'showPageOverlayToggle_v3_3',
        SETTINGS_SHOW_TRIGGER_DEBUG_CHECKBOX_ID: 'showTriggerDebugToggle_v3_3',
        SETTINGS_CURRENT_TAB_CONTRIBUTES_TO_TOTAL_CHECKBOX_ID: 'currentTabContributes_v3_3',
        SETTINGS_DEBUG_INTERACTIVE_BORDERS_CHECKBOX_ID: 'debugInteractiveBorders_v3_3', // Renamed for clarity

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
        pointerEventsMode: 'interactive_except_buttons', // 'fully_interactive', 'interactive_except_buttons', 'fully_transparent'
        showClock: true, showStats: true, showLastActionTimer: true,
        showUITabIndicator: true, showPageOverlay: true, showTriggerDebug: CONFIG.DEBUG_MODE,
        debugInteractiveBorders: false, // Renamed from debugPointerEvents
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
    // (logDebug, logInfo, logError, getStorage, generateTabIdFromUrl, determineCurrentTabMode,
    //  timeStringToMinutes, _getDayStartHour, _getNightStartHour, setDynamicDefaultLunch,
    //  saveDataToStorage, loadDataFromStorage, writeCurrentTabDataToLocalStorage, readAllTabsDataFromLocalStorage,
    //  updateOtherTabsSettingsDisplay, formatDateToHHMM, formatMsToDuration, createDOMElement
    //  These functions are assumed to be correctly defined as per previous iterations and corrections)
    //  I will place their definitions here to ensure completeness.

    function logDebug(...args) { if (CONFIG.DEBUG_MODE) console.debug(`[PHv3.3 DEBUG ${state.currentTabMode?.name || state.currentTabId || ''}]`, ...args); }
    function logInfo(...args) { console.info(`[PHv3.3 INFO ${state.currentTabMode?.name || state.currentTabId || ''}]`, ...args); }
    function logError(...args) { console.error(`[PHv3.3 ERROR ${state.currentTabMode?.name || state.currentTabId || ''}]`, ...args); }
    function getStorage(useSession = CONFIG.USE_SESSION_STORAGE_FOR_MAIN_SETTINGS) { return useSession ? sessionStorage : localStorage; }
    function generateTabIdFromUrl() { const p = window.location.pathname.toLowerCase().replace(/\/$/, ''); const s = window.location.search.toLowerCase(); let id = `${p}${s}`; id = id.replace(/[^a-z0-9_.-]/g, '_').replace(/_+/g, '_'); if (id.startsWith('_')) id = id.substring(1); if (id.length > 100) id = id.substring(0,50)+'...'+id.substring(id.length-47); return id||'def_tab'; }
    function determineCurrentTabMode() { const ct = state.customTabThemes[state.currentTabFullUrl]; if(ct&&ct.name&&ct.color&&ct.textColor)return{...ct,isCustom:true}; const urlUp=window.location.href.toUpperCase(); for(const m of CONFIG.TAB_IDENTIFICATION_MODES){if(urlUp.includes(m.keyword.toUpperCase()))return{...m,isCustom:false};} return{name:CONFIG.DEFAULT_TAB_MODE_NAME,keyword:'',color:CONFIG.DEFAULT_TAB_MODE_COLOR,textColor:CONFIG.DEFAULT_TAB_MODE_TEXT_COLOR,isCustom:false};}
    function timeStringToMinutes(ts) { if(!ts||typeof ts!=='string'||!ts.includes(':')){logError('Invalid timeStr:',ts);return 0;}const p=ts.split(':');if(p.length<2){logError('Invalid time format:',ts);return 0;}const h=parseInt(p[0],10),m=parseInt(p[1],10);if(isNaN(h)||isNaN(m)){logError('Non-numeric time:',ts);return 0;}return h*60+m;}
    function _getDayStartHour() { return parseInt(CONFIG.DEFAULT_DAY_SHIFT_START_TIME.split(':')[0],10); }
    function _getNightStartHour() { return parseInt(CONFIG.DEFAULT_NIGHT_SHIFT_START_TIME.split(':')[0],10); }
    function setDynamicDefaultLunch() { let pt=state.shiftType;if(pt==='auto'){if(state.shiftStartTime){const sh=state.shiftStartTime.getHours();pt=(sh>=_getDayStartHour()&&sh<_getNightStartHour())?'day':'night';}else{const ch=new Date().getHours();pt=(ch>=_getDayStartHour()&&ch<_getNightStartHour())?'day':'night';}} const dl=CONFIG.DEFAULT_LUNCH_OPTIONS.find(o=>o.type===pt)||CONFIG.DEFAULT_LUNCH_OPTIONS.find(o=>o.type==="any")||CONFIG.DEFAULT_LUNCH_OPTIONS[0];state.selectedLunchOption=dl;logDebug("Dyn lunch:",dl?dl.text:"None");}
    function saveDataToStorage() { try {const ms=getStorage(); const li=state.selectedLunchOption?CONFIG.DEFAULT_LUNCH_OPTIONS.findIndex(o=>o.start===state.selectedLunchOption.start&&o.end===state.selectedLunchOption.end&&o.type===state.selectedLunchOption.type):-1; const dts={shiftType:state.shiftType,shiftStartTimeISO:state.shiftStartTime?state.shiftStartTime.toISOString():null,selectedLunchOptionIndex:li,autoClickEnabled:state.autoClickEnabled,uiVisible:state.uiVisible,uiLocked:state.uiLocked,settingsPanelVisible:state.settingsPanelVisible,showClock:state.showClock,showStats:state.showStats,showLastActionTimer:state.showLastActionTimer,showUITabIndicator:state.showUITabIndicator,showPageOverlay:state.showPageOverlay,showTriggerDebug:state.showTriggerDebug,debugInteractiveBorders:state.debugInteractiveBorders,currentTabContributesToTotal:state.currentTabContributesToTotal,leftPaneFlexBasis:state.domElements.leftPane?state.domElements.leftPane.style.flexBasis:null,pointerEventsMode:state.pointerEventsMode}; ms.setItem(CONFIG.STORAGE_KEY_PREFIX_MAIN_SETTINGS+state.currentTabId,JSON.stringify(dts)); const ts=getStorage(false); ts.setItem(CONFIG.STORAGE_KEY_PREFIX_CUSTOM_TAB_THEMES,JSON.stringify(state.customTabThemes)); logDebug('Settings saved:',state.currentTabId);}catch(e){logError('Save fail:',e);}}
    function loadDataFromStorage() { state.currentTabFullUrl=window.location.href; state.currentTabId=generateTabIdFromUrl(); try{const ts=getStorage(false);const tj=ts.getItem(CONFIG.STORAGE_KEY_PREFIX_CUSTOM_TAB_THEMES);if(tj)state.customTabThemes=JSON.parse(tj);}catch(e){logError('Load themes fail:',e);state.customTabThemes={};} state.currentTabMode=determineCurrentTabMode(); logInfo(`Tab ID: ${state.currentTabId}, Mode: ${state.currentTabMode.name} (Custom:${state.currentTabMode.isCustom})`); try{const ms=getStorage();const sdj=ms.getItem(CONFIG.STORAGE_KEY_PREFIX_MAIN_SETTINGS+state.currentTabId);if(sdj){const sd=JSON.parse(sdj);state.shiftType=sd.shiftType||'auto';if(sd.shiftStartTimeISO)state.shiftStartTime=new Date(sd.shiftStartTimeISO);const li=parseInt(sd.selectedLunchOptionIndex,10);if(!isNaN(li)&&li>=0&&CONFIG.DEFAULT_LUNCH_OPTIONS[li])state.selectedLunchOption=CONFIG.DEFAULT_LUNCH_OPTIONS[li];state.autoClickEnabled=typeof sd.autoClickEnabled==='boolean'?sd.autoClickEnabled:true;state.uiVisible=typeof sd.uiVisible==='boolean'?sd.uiVisible:true;state.uiLocked=typeof sd.uiLocked==='boolean'?sd.uiLocked:false;state.settingsPanelVisible=typeof sd.settingsPanelVisible==='boolean'?sd.settingsPanelVisible:false;state.showClock=typeof sd.showClock==='boolean'?sd.showClock:true;state.showStats=typeof sd.showStats==='boolean'?sd.showStats:true;state.showLastActionTimer=typeof sd.showLastActionTimer==='boolean'?sd.showLastActionTimer:true;state.showUITabIndicator=typeof sd.showUITabIndicator==='boolean'?sd.showUITabIndicator:true;state.showPageOverlay=typeof sd.showPageOverlay==='boolean'?sd.showPageOverlay:true;state.showTriggerDebug=typeof sd.showTriggerDebug==='boolean'?sd.showTriggerDebug:CONFIG.DEBUG_MODE;state.debugInteractiveBorders=typeof sd.debugInteractiveBorders==='boolean'?sd.debugInteractiveBorders:false;state.currentTabContributesToTotal=typeof sd.currentTabContributesToTotal==='boolean'?sd.currentTabContributesToTotal:true;state.initialLeftPaneFlexBasis=sd.leftPaneFlexBasis||null;state.pointerEventsMode=sd.pointerEventsMode||'interactive_except_buttons';logInfo('Main settings loaded:',state.currentTabId);}else{logInfo('No saved settings. Defaults.');state.currentTabContributesToTotal=true;state.pointerEventsMode='interactive_except_buttons';} if(!state.shiftStartTime||!(state.shiftStartTime instanceof Date)||isNaN(state.shiftStartTime.getTime()))determineAndSetShiftStartTime(true); if(!state.selectedLunchOption)setDynamicDefaultLunch();}catch(e){logError('Load settings fail:',e);determineAndSetShiftStartTime(true);setDynamicDefaultLunch();} readAllTabsDataFromLocalStorage(true);}
    function writeCurrentTabDataToLocalStorage() { if(!state.currentTabId)return;try{const td={tabId:state.currentTabId,modeName:state.currentTabMode.name,clicks:state.clicksForThisTab,lastActionTimestamp:state.lastActionTimestampForThisTab,contributesToTotal:state.currentTabContributesToTotal,timestamp:Date.now()};localStorage.setItem(CONFIG.MULTI_TAB_STORAGE_PREFIX+state.currentTabId,JSON.stringify(td));logDebug('Tab data written:',state.currentTabId);}catch(e){logError('Write tab data LS fail:',e);}}
    function readAllTabsDataFromLocalStorage(init=false) { let notd={}; const now=Date.now();try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&k.startsWith(CONFIG.MULTI_TAB_STORAGE_PREFIX)){const ij=localStorage.getItem(k);if(ij){try{const id=JSON.parse(ij);if(now-(id.timestamp||0)>CONFIG.MULTI_TAB_DATA_TTL_MS){localStorage.removeItem(k);continue;}if(id.tabId===state.currentTabId){if(init){state.clicksForThisTab=parseInt(id.clicks,10)||0;state.lastActionTimestampForThisTab=parseInt(id.lastActionTimestamp,10)||Date.now();logInfo(`Restored self from LS: Clicks=${state.clicksForThisTab}`);}notd[id.tabId]={...id,clicks:state.clicksForThisTab,contributesToTotal:state.currentTabContributesToTotal};}else{notd[id.tabId]=id;}}catch(pe){logError(`Parse LS key ${k} fail:`,pe);localStorage.removeItem(k);}}}}}catch(e){logError('Read LS multi-tab fail:',e);}state.otherTabsData=notd;state.globalTotalClicks=Object.values(state.otherTabsData).filter(t=>t.contributesToTotal).reduce((s,t)=>s+(parseInt(t.clicks,10)||0),0);logDebug('Tabs sync:',state.otherTabsData,'Global:',state.globalTotalClicks);if(!init)updateStatistics();updateOtherTabsSettingsDisplay();}
    function updateOtherTabsSettingsDisplay() { const c=state.domElements.otherTabsSettingsContainer;if(!c){logDebug("Other tabs settings container NF.");return;}c.innerHTML='';const ls={display:'flex',alignItems:'center',cursor:'pointer',fontSize:'0.85em',color:'rgba(255,255,255,0.75)',margin:'4px 0'};const cs={marginRight:'8px',transform:'scale(1.15)',accentColor:CONFIG.MAIN_ACCENT_COLOR};const ot=Object.values(state.otherTabsData).filter(t=>t.tabId!==state.currentTabId);if(ot.length===0){c.appendChild(createDOMElement('p',{textContent:'(No other active tabs detected)',style:{opacity:'0.6',fontStyle:'italic',fontSize:'0.85em'}}));return;}ot.forEach(td=>{const cid=`contribToggle_${td.tabId.replace(/[^a-zA-Z0-9]/g,'_')}`;const l=createDOMElement('label',{for:cid,style:ls});const cb=createDOMElement('input',{type:'checkbox',id:cid,checked:td.contributesToTotal||false,style:cs,dataset:{tabIdTarget:td.tabId}});cb.addEventListener('change',e=>{const tid=e.target.dataset.tabIdTarget;const ic=e.target.checked;const sk=CONFIG.MULTI_TAB_STORAGE_PREFIX+tid;try{const osj=localStorage.getItem(sk);if(osj){const osd=JSON.parse(osj);osd.contributesToTotal=ic;osd.timestamp=Date.now();localStorage.setItem(sk,JSON.stringify(osd));logInfo(`Contrib for ${tid} set ${ic}.`);if(state.otherTabsData[tid])state.otherTabsData[tid].contributesToTotal=ic;readAllTabsDataFromLocalStorage(false);}}catch(err){logError('Update other tab contrib fail:',err);}});l.append(cb,`Tab: ${td.modeName||td.tabId} (${td.clicks} clicks)`);c.appendChild(l);});}
    function formatDateToHHMM(d,s=false){if(!d||!(d instanceof Date)||isNaN(d.getTime()))return"N/A";const h=String(d.getHours()).padStart(2,'0'),m=String(d.getMinutes()).padStart(2,'0');if(s){const sec=String(d.getSeconds()).padStart(2,'0');return`${h}:${m}:${sec}`;}return`${h}:${m}`;}
    function formatMsToDuration(ms,s=false){if(isNaN(ms)||ms<0)ms=0;let ts=Math.floor(ms/1000);const h=Math.floor(ts/3600);ts%=3600;const m=Math.floor(ts/60);const sec=ts%60;if(h>0)return`${String(h)}h ${String(m).padStart(2,'0')}m`+(s?` ${String(sec).padStart(2,'0')}s`:'');if(m>0)return`${String(m).padStart(2,'0')}m`+(s?` ${String(sec).padStart(2,'0')}s`:'');return s?`${String(sec).padStart(2,'0')}s`:`00m ${String(sec).padStart(2,'0')}s`;}
    function createDOMElement(tag,attrs={},children=[]){const el=document.createElement(tag);for(const k in attrs){if(k==='style'&&typeof attrs[k]==='object')Object.assign(el.style,attrs[k]);else if(k==='dataset'&&typeof attrs[k]==='object')Object.assign(el.dataset,attrs[k]);else if(['textContent','innerHTML','value','checked','disabled','type','id','title','placeholder','tabIndex','src','className'].includes(k))el[k]=attrs[k];else el.setAttribute(k,attrs[k]);}children.forEach(c=>{if(c==null)return;if(typeof c==='string'||typeof c==='number')el.appendChild(document.createTextNode(String(c)));else if(c instanceof Node)el.appendChild(c);else if(Array.isArray(c))c.forEach(sc=>{if(sc==null)return;if(typeof sc==='string'||typeof sc==='number')el.appendChild(document.createTextNode(String(sc)));else if(sc instanceof Node)el.appendChild(sc);});});return el;}

    // --- UI State Management Functions ---
    // These must be defined BEFORE buildMainUI calls them or assigns them as event handlers
    function setUIVisibility(visible) { /* ... (Definition as provided previously) ... */ state.uiVisible = visible; const uiContainer = state.domElements.uiContainer; const showButton = state.domElements.emergencyShowButton; if (uiContainer) { uiContainer.style.opacity = visible ? '1' : '0'; uiContainer.style.transform = visible ? 'translateY(0)' : 'translateY(20px)'; updateMainContainerPointerEvents(); } if (showButton) showButton.style.display = visible ? 'none' : 'flex'; if (!visible && state.settingsPanelVisible) setSettingsPanelVisibility(false); saveDataToStorage(); }
    function setSettingsPanelVisibility(visible) { /* ... (Definition as provided previously, ensure it calls updateMainContainerPointerEvents) ... */ state.settingsPanelVisible = visible; const panel = state.domElements.settingsPanel; const toggleButton = state.domElements.toggleSettingsButton; if (panel) { panel.style.display = visible ? 'flex' : 'none'; panel.style.transform = visible ? 'translateX(0%)' : 'translateX(101%)'; } updateMainContainerPointerEvents(); if (toggleButton) toggleButton.textContent = visible ? CONFIG.TOGGLE_SETTINGS_BUTTON_TEXT_OPENED : CONFIG.TOGGLE_SETTINGS_BUTTON_TEXT_CLOSED; if (visible && state.uiLocked) setUILockState(true); saveDataToStorage(); }
    function toggleSettingsPanelVisibility() { setSettingsPanelVisibility(!state.settingsPanelVisible); }
    function setUILockState(locked) { /* ... (Definition as provided previously, ensure it calls updateMainContainerPointerEvents) ... */ if (!state.uiVisible && locked && !state.settingsPanelVisible) return; state.uiLocked = locked; const lockButton = state.domElements.lockUIButton; if (lockButton) lockButton.textContent = state.uiLocked ? CONFIG.LOCK_UI_BUTTON_TEXT_LOCKED : CONFIG.LOCK_UI_BUTTON_TEXT_UNLOCKED; const elementsToToggle = [ state.domElements.toggleSettingsButton, state.domElements.emergencyHideButton, state.domElements.decrementButton, state.domElements.mainCounterInput, state.domElements.divider, ...(state.settingsPanelVisible ? Array.from(state.domElements.settingsPanel.querySelectorAll('input, select, button')).filter(el => el !== lockButton && el.textContent !== 'Apply & Close') : []) ]; elementsToToggle.forEach(el => { if (el) { el.disabled = state.uiLocked; el.style.opacity = state.uiLocked ? '0.5' : '1'; el.style.cursor = state.uiLocked ? 'not-allowed' : ( (el.tagName === 'BUTTON' || el.tagName === 'SELECT' || el.classList.contains('divider-ph')) ? 'pointer' : 'default' ); if(el.classList.contains('divider-ph')) el.style.cursor = state.uiLocked ? 'default' : 'ew-resize'; } }); if (state.domElements.incrementButton) { state.domElements.incrementButton.style.cursor = 'pointer'; state.domElements.incrementButton.disabled = false; state.domElements.incrementButton.style.opacity = '1'; } updateMainContainerPointerEvents(); saveDataToStorage(); }
    function toggleUILockState() { setUILockState(!state.uiLocked); }

    // New function to manage main container's pointer-events based on overall state
    function updateMainContainerPointerEvents() {
        const uiContainer = state.domElements.uiContainer;
        if (!uiContainer) return;
        if (state.settingsPanelVisible || state.isResizing || state.uiLocked) {
            uiContainer.style.pointerEvents = 'auto'; // Interactive if settings open, resizing, or UI locked (to interact with lock button)
        } else {
            // Apply selected pointer-events mode
            switch (state.pointerEventsMode) {
                case 'fully_interactive':
                    uiContainer.style.pointerEvents = 'auto';
                    break;
                case 'interactive_except_buttons': // Default: container transparent, buttons/inputs/etc. auto
                    uiContainer.style.pointerEvents = 'none';
                    // Individual elements inside buildMainUI need 'auto'
                    setInteractiveChildrenPointerEvents(uiContainer, 'auto', ['INPUT', 'BUTTON', 'SELECT', 'TEXTAREA', '.divider-ph']);
                    // Ensure top controls and settings panel itself are interactive if opened
                    if (state.domElements.topControls) state.domElements.topControls.style.pointerEvents = 'auto';
                    if (state.domElements.settingsPanel && state.settingsPanelVisible) state.domElements.settingsPanel.style.pointerEvents = 'auto';
                    break;
                case 'fully_transparent':
                    uiContainer.style.pointerEvents = 'none';
                     // Ensure ONLY the explicit clickable elements (like settings/close buttons on top bar) are auto
                    setInteractiveChildrenPointerEvents(uiContainer, 'none'); // Make all children none by default
                    if(state.domElements.topControls) state.domElements.topControls.style.pointerEvents = 'auto'; // Top controls always clickable
                    // Specific buttons within topControls already have their own handlers and don't need this again unless overridden
                    break;
                default:
                    uiContainer.style.pointerEvents = 'none';
                    setInteractiveChildrenPointerEvents(uiContainer, 'auto', ['INPUT', 'BUTTON', 'SELECT', 'TEXTAREA', '.divider-ph']);
                    if (state.domElements.topControls) state.domElements.topControls.style.pointerEvents = 'auto';
            }
        }
        applyDebugPointerEventsStyle(); // Re-apply debug borders based on new states
    }

    function setInteractiveChildrenPointerEvents(container, eventStyle, interactiveTags = []) {
        if (!container) return;
        // Select children that are not the settings panel itself
        Array.from(container.children).forEach(child => {
            if (child.id === CONFIG.SETTINGS_PANEL_ID) return; // Skip settings panel

            if (eventStyle === 'none' && !interactiveTags.includes(child.tagName) && !interactiveTags.some(sel => child.matches(sel)) && child !== state.domElements.topControls) {
                 child.style.pointerEvents = 'none';
            } else if (interactiveTags.includes(child.tagName) || interactiveTags.some(sel => child.matches(sel)) || child === state.domElements.topControls ) {
                 child.style.pointerEvents = 'auto';
            }
            // Recursively apply might be too much, focus on direct interactive children if needed.
            // For now, specific elements like buttons within leftPane get 'auto' during their creation.
        });
         // Ensure critical interactive zones like leftPane and rightPane get correct settings too if they contain buttons.
        if (state.domElements.leftPane) state.domElements.leftPane.style.pointerEvents = (eventStyle === 'none' && state.pointerEventsMode === 'fully_transparent') ? 'none' : 'auto';
        if (state.domElements.rightPane) state.domElements.rightPane.style.pointerEvents = (eventStyle === 'none' && state.pointerEventsMode === 'fully_transparent') ? 'none' : 'auto';

    }


    // --- ------------------------------------------------------------------------ ---
    // --- ----------------------- UI ELEMENT ASSEMBLY (Continued)----------------- ---
    // --- ------------------------------------------------------------------------ ---
    // (buildMainUI, makeButtonInteractive, buildEmergencyShowButton, buildPageOverlayAndIndicator, startResizePanes, buildSettingsPanel)
    // Placed here in full

// == Production Assistant v3.3 (International, Multi-Tab, Resizable, Advanced Debug, Click-Through Modes) ==
// (Continuation from Part 1: CONFIG, State, Utilities, UI State Management)

    // --- ------------------------------------------------------------------------ ---
    // --- ----------------------- UI ELEMENT ASSEMBLY -------------------------- ---
    // --- ------------------------------------------------------------------------ ---

    function buildMainUI() {
        if (document.getElementById(CONFIG.UI_CONTAINER_ID)) {
            logError('UI container already exists. Aborting UI build.');
            // Attempt to destroy if a global destroy function exists for this version
            if (typeof window.destroyProductionHelperV3_3 === 'function') {
                try { window.destroyProductionHelperV3_3(); } catch(e) { /* ignore */ }
            }
            // return; // Or allow re-initialization logic in initialize() to handle it
        }

        const uiContainer = createDOMElement('div', {
            id: CONFIG.UI_CONTAINER_ID,
            style: {
                position: 'fixed', bottom: CONFIG.UI_BOTTOM_OFFSET, right: CONFIG.UI_RIGHT_OFFSET,
                width: `${CONFIG.UI_WIDTH_PERCENT_VIEWPORT}vw`, height: `${CONFIG.UI_HEIGHT_PERCENT_VIEWPORT}vh`,
                minWidth: `${CONFIG.UI_MIN_WIDTH_PX}px`, minHeight: `${CONFIG.UI_MIN_HEIGHT_PX}px`,
                backgroundColor: CONFIG.UI_BACKGROUND_COLOR,
                border: CONFIG.UI_BORDER_COLOR === 'rgba(0, 0, 0, 0.0)' ? 'none' : `1px solid ${CONFIG.UI_BORDER_COLOR}`,
                borderRadius: '0px', boxSizing: 'border-box', color: CONFIG.UI_TEXT_COLOR,
                fontFamily: CONFIG.FONT_FAMILY, zIndex: '2147483640',
                display: 'flex', flexDirection: 'column', padding: '8px 12px', overflow: 'hidden',
                boxShadow: CONFIG.UI_BACKGROUND_COLOR === 'rgba(0, 0, 0, 0.0)' ? 'none' : '0 2px 10px rgba(0,0,0,0.15)',
                transition: 'opacity 0.3s ease-out, transform 0.3s ease-out, width 0.2s ease, height 0.2s ease',
                // pointerEvents managed by updateMainContainerPointerEvents()
            }
        });
        state.domElements.uiContainer = uiContainer;

        // --- Top Controls Bar ---
        state.domElements.topControls = createDOMElement('div', {
            className: 'ph-top-controls', // Added class
            style: { display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '5px', flexShrink: 0, pointerEvents: 'auto' }
        });
        const controlButtonBaseStyle = { cursor: 'pointer', background: 'none', border: 'none', color: CONFIG.UI_TEXT_COLOR, borderRadius: '3px', padding: '3px 7px', fontSize: '0.75em', marginLeft: '8px', opacity: '0.6', transition: 'opacity 0.2s' };
        controlButtonBaseStyle[':hover'] = { opacity: '1' }; // Pseudo-hover for JS setting

        state.domElements.toggleSettingsButton = createDOMElement('button', { id: CONFIG.TOGGLE_SETTINGS_BUTTON_TEXT_CLOSED, textContent: CONFIG.TOGGLE_SETTINGS_BUTTON_TEXT_CLOSED, title: 'Open/Close Settings', style: {...controlButtonBaseStyle} });
        state.domElements.toggleSettingsButton.addEventListener('click', toggleSettingsPanelVisibility);

        state.domElements.lockUIButton = createDOMElement('button', { id: 'lockProdUIBtn_v3_3', textContent: CONFIG.LOCK_UI_BUTTON_TEXT_UNLOCKED, title: 'Lock/Unlock UI', style: {...controlButtonBaseStyle} });
        state.domElements.lockUIButton.addEventListener('click', toggleUILockState);

        state.domElements.emergencyHideButton = createDOMElement('button', { id: 'hideProdUIBtn_v3_3', textContent: CONFIG.EMERGENCY_HIDE_BUTTON_TEXT, title: 'Hide UI Panel', style: { ...controlButtonBaseStyle, color: CONFIG.LAST_ACTION_TIMER_WARN_COLOR, fontWeight: 'bold' } });
        state.domElements.emergencyHideButton.addEventListener('click', () => setUIVisibility(false));
        state.domElements.topControls.append(state.domElements.toggleSettingsButton, state.domElements.lockUIButton, state.domElements.emergencyHideButton);
        uiContainer.appendChild(state.domElements.topControls);

        // --- Main Content Area (Resizable Panes) ---
        const mainContentArea = createDOMElement('div', {
            className: 'ph-main-content-area',
            style: { display: 'flex', flexGrow: 1, overflow: 'hidden', position: 'relative' }
        });

        // Left Pane (Clicker)
        state.domElements.leftPane = createDOMElement('div', {
            className: 'ph-left-pane',
            style: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexBasis: state.initialLeftPaneFlexBasis || '45%', minWidth: `${CONFIG.LEFT_PANE_MIN_WIDTH_PERCENT}%`, overflow: 'hidden', paddingRight: `${CONFIG.DIVIDER_WIDTH_PX / 2}px`, position: 'relative', pointerEvents: 'auto' }
        });
        state.domElements.mainCounterInput = createDOMElement('input', { type: 'number', id: CONFIG.MAIN_COUNTER_INPUT_ID, value: state.clicksForThisTab, style: { fontSize: `${CONFIG.MAIN_COUNTER_FONT_SIZE_INITIAL_EM}em`, fontWeight: '300', color: CONFIG.UI_TEXT_COLOR, opacity: '0.9', marginBottom: '15px', textAlign: 'center', background: 'none', border: 'none', width: 'auto', minWidth: '70px', outline: 'none', padding: '0 5px', pointerEvents: 'auto' } });
        state.domElements.mainCounterInput.addEventListener('change', handleCounterInputChange);
        state.domElements.mainCounterInput.addEventListener('input', handleCounterInputDynamic);

        const clickerButtonsContainer = createDOMElement('div', { style: { display: 'flex', alignItems: 'center', pointerEvents: 'auto'} });
        const clickerBtnSharedStyle = { cursor: 'pointer', border: 'none', borderRadius: '6px', boxShadow: 'none', transition: 'transform 0.1s, background-color 0.15s', pointerEvents: 'auto', color: CONFIG.UI_TEXT_COLOR, opacity: '0.6', display: 'flex', alignItems: 'center', justifyContent: 'center' };
        if (CONFIG.SHOW_DECREMENT_BUTTON) {
            state.domElements.decrementButton = createDOMElement('button', { id: CONFIG.CLICKER_DECREMENT_BUTTON_ID, textContent: '–', title: 'Decrement (-1)', style: { ...clickerBtnSharedStyle, backgroundColor: CONFIG.CLICKER_DECREMENT_BUTTON_COLOR, marginRight: '15px', fontSize: '1.5em', width:'40px', height:'40px' } });
            state.domElements.decrementButton.addEventListener('click', handleDecrementClick); makeButtonInteractive(state.domElements.decrementButton); clickerButtonsContainer.appendChild(state.domElements.decrementButton);
        }
        state.domElements.incrementButton = createDOMElement('button', { id: CONFIG.CLICKER_INCREMENT_BUTTON_ID, textContent: '+', title: `Increment (+1) or ${CONFIG.INCREMENT_KEYBOARD_SHORTCUT_CODE}`, style: { ...clickerBtnSharedStyle, backgroundColor: CONFIG.CLICKER_INCREMENT_BUTTON_COLOR, fontSize: '2.2em', width:'60px', height:'60px', padding: CONFIG.SHOW_DECREMENT_BUTTON ? '0' : '0' } });
        state.domElements.incrementButton.addEventListener('click', (event) => processIncrementForCurrentTab(true, event)); makeButtonInteractive(state.domElements.incrementButton); clickerButtonsContainer.appendChild(state.domElements.incrementButton);
        state.domElements.leftPane.append(state.domElements.mainCounterInput, clickerButtonsContainer);

        // Draggable Divider
        state.domElements.divider = createDOMElement('div', { className: 'ph-divider', style: { width: `${CONFIG.DIVIDER_WIDTH_PX}px`, cursor: 'ew-resize', flexShrink: 0, pointerEvents: 'auto', display: 'flex', alignItems:'center', justifyContent: 'center', backgroundColor: `${CONFIG.MAIN_ACCENT_COLOR}22` } });
        state.domElements.divider.addEventListener('mousedown', startResizePanes);

        // Right Pane (Statistics)
        state.domElements.rightPane = createDOMElement('div', { className: 'ph-right-pane', style: { display: 'flex', flexDirection: 'column', flexGrow: 1, overflowY: 'auto', pointerEvents: 'auto', paddingLeft: `${CONFIG.DIVIDER_WIDTH_PX / 2}px`, minWidth: `${CONFIG.RIGHT_PANE_MIN_WIDTH_PERCENT}%`, } });
        state.domElements.statsTextSummary = createDOMElement('div', { id: CONFIG.STATS_TEXT_SUMMARY_ID, style: { fontSize: `${CONFIG.STATS_FONT_SIZE_EM}em`, lineHeight: '1.5', marginBottom: '8px', pointerEvents: 'auto' } });
        state.domElements.lastActionTimerDisplay = createDOMElement('div', { id: CONFIG.LAST_ACTION_TIMER_ID, textContent: 'Last: 00s', style: { fontSize: `${CONFIG.STATS_FONT_SIZE_EM * 0.9}em`, marginTop: '5px', opacity: '0.8', pointerEvents: 'none' } });
        state.domElements.triggerDebugDisplay = createDOMElement('div', { id: CONFIG.TRIGGER_DEBUG_DISPLAY_ID, style: { fontSize: `${CONFIG.STATS_FONT_SIZE_EM * 0.8}em`, marginTop: '10px', borderTop: `1px dashed ${CONFIG.UI_TEXT_COLOR}22`, paddingTop: '5px', display: 'none', maxHeight: '50px', overflowY: 'auto', opacity: '0.7', pointerEvents: 'auto', wordBreak: 'break-all'} });
        state.domElements.triggerDebugDisplay.innerHTML = 'Trigger Debug: Waiting...';
        state.domElements.rightPane.append(state.domElements.statsTextSummary, state.domElements.lastActionTimerDisplay, state.domElements.triggerDebugDisplay);

        mainContentArea.append(state.domElements.leftPane, state.domElements.divider, state.domElements.rightPane);
        uiContainer.appendChild(mainContentArea);

        // --- Bottom Info Bar ---
        const bottomInfoBar = createDOMElement('div', { className: 'ph-bottom-bar', style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto', paddingTop: '5px', flexShrink: 0, borderTop: `1px solid ${CONFIG.UI_TEXT_COLOR}1A`, pointerEvents: 'none' } });
        state.domElements.uiTabIndicatorText = createDOMElement('div', { id: CONFIG.UI_TAB_INDICATOR_TEXT_ID, textContent: state.currentTabMode.name, style: { fontSize: `${CONFIG.UI_TAB_INDICATOR_FONT_SIZE_EM}em`, fontWeight: '500', color: state.currentTabMode.textColor || CONFIG.UI_TEXT_COLOR, opacity: 0.5, pointerEvents: 'auto' } });
        state.domElements.realTimeClock = createDOMElement('div', { id: CONFIG.CLOCK_DISPLAY_ID, textContent: '00:00:00', style: { fontSize: `${CONFIG.CLOCK_FONT_SIZE_EM}em`, fontFamily: 'monospace', color: CONFIG.UI_TEXT_COLOR, opacity: '0.3', pointerEvents: 'none' } });
        bottomInfoBar.append(state.domElements.uiTabIndicatorText, state.domElements.realTimeClock);
        uiContainer.appendChild(bottomInfoBar);

        buildSettingsPanel(); uiContainer.appendChild(state.domElements.settingsPanel);
        buildPageOverlayAndIndicator(); document.body.appendChild(state.domElements.pageColorOverlay); document.body.appendChild(state.domElements.pageIndicatorText);
        buildEmergencyShowButton(); document.body.appendChild(state.domElements.emergencyShowButton);
        
        setInitialUIStates(); // Populates settings, applies visibility etc.
        updateMainContainerPointerEvents(); // Apply initial pointer events mode
        applyDebugPointerEventsStyle();

        logInfo('Main UI v3.3 (Intl) built.');
    }

    function makeButtonInteractive(button) { if (!button) return; button.addEventListener('mousedown', e => { e.preventDefault(); button.style.transform = 'scale(0.95)'; }); button.addEventListener('mouseup', () => button.style.transform = 'scale(1)'); button.addEventListener('mouseleave', () => button.style.transform = 'scale(1)'); }
    
    function buildEmergencyShowButton() { /* ... (Same as provided in previous final part) ... */ state.domElements.emergencyShowButton = createDOMElement('button', { id: 'emergencyShowBtn_v3_3', textContent: CONFIG.EMERGENCY_SHOW_BUTTON_TEXT, title: 'Show UI Panel', style: { position: 'fixed', bottom: CONFIG.UI_BOTTOM_OFFSET, right: CONFIG.UI_RIGHT_OFFSET, width: CONFIG.EMERGENCY_SHOW_BUTTON_SIZE, height: CONFIG.EMERGENCY_SHOW_BUTTON_SIZE, backgroundColor: 'rgba(80,80,100,0.2)', border: `1px solid rgba(128,128,128,0.3)`, color: CONFIG.UI_TEXT_COLOR, borderRadius: '50%', cursor: 'pointer', display: 'none', alignItems: 'center', justifyContent: 'center', zIndex: '2147483646', opacity: String(CONFIG.EMERGENCY_SHOW_BUTTON_OPACITY), transition: 'opacity 0.2s ease, transform 0.1s ease, background-color 0.2s', fontSize: '16px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', pointerEvents: 'auto' } }); state.domElements.emergencyShowButton.onmouseover = () => { state.domElements.emergencyShowButton.style.opacity = '1'; state.domElements.emergencyShowButton.style.transform = 'scale(1.1)'; state.domElements.emergencyShowButton.style.backgroundColor = CONFIG.MAIN_ACCENT_COLOR; }; state.domElements.emergencyShowButton.onmouseout = () => { state.domElements.emergencyShowButton.style.opacity = String(CONFIG.EMERGENCY_SHOW_BUTTON_OPACITY); state.domElements.emergencyShowButton.style.transform = 'scale(1)'; state.domElements.emergencyShowButton.style.backgroundColor = 'rgba(80,80,100,0.2)'; }; state.domElements.emergencyShowButton.onclick = () => setUIVisibility(true); document.body.appendChild(state.domElements.emergencyShowButton); }
    
    function buildPageOverlayAndIndicator() { /* ... (Same as provided in previous final part) ... */ state.domElements.pageColorOverlay = createDOMElement('div', { id: CONFIG.PAGE_COLOR_OVERLAY_ID, style: { position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh', backgroundColor: state.currentTabMode.color, zIndex: '2147483630', pointerEvents: 'none', display: state.showPageOverlay ? 'block' : 'none', transition: 'background-color 0.3s ease' } }); state.domElements.pageIndicatorText = createDOMElement('div', { id: CONFIG.PAGE_INDICATOR_TEXT_ID, textContent: state.currentTabMode.name, style: { position: 'fixed', top: '50%', right: '30px', transform: 'translateY(-50%)', fontSize: `${CONFIG.PAGE_INDICATOR_FONT_SIZE_PX}px`, fontWeight: 'bold', color: state.currentTabMode.textColor, opacity: 0.8, zIndex: '2147483631', pointerEvents: 'none', display: state.showPageOverlay ? 'block' : 'none', textShadow: '0 0 5px rgba(0,0,0,0.3)', writingMode: 'vertical-rl', textOrientation: 'mixed', transition: 'color 0.3s ease, opacity 0.3s ease' } });}
    
    function startResizePanes(e) { /* ... (Same as provided in previous final part) ... */ e.preventDefault(); state.isResizing = true; updateMainContainerPointerEvents(); const mainArea = state.domElements.leftPane.parentElement; const initialMouseX = e.clientX; const initialLeftPaneWidth = state.domElements.leftPane.offsetWidth; const totalWidth = mainArea.offsetWidth - CONFIG.DIVIDER_WIDTH_PX; const doResize = (moveEvent) => { if (!state.isResizing) return; const dx = moveEvent.clientX - initialMouseX; let newLeftWidth = initialLeftPaneWidth + dx; const minLeft = totalWidth * (CONFIG.LEFT_PANE_MIN_WIDTH_PERCENT / 100); const minRight = totalWidth * (CONFIG.RIGHT_PANE_MIN_WIDTH_PERCENT / 100); if (newLeftWidth < minLeft) newLeftWidth = minLeft; if (newLeftWidth > totalWidth - minRight) newLeftWidth = totalWidth - minRight; const newLeftFlexBasis = (newLeftWidth / totalWidth) * 100; state.domElements.leftPane.style.flexBasis = `${newLeftFlexBasis}%`; }; const stopResize = () => { if (!state.isResizing) return; state.isResizing = false; document.removeEventListener('mousemove', doResize); document.removeEventListener('mouseup', stopResize); updateMainContainerPointerEvents(); saveDataToStorage(); }; document.addEventListener('mousemove', doResize); document.addEventListener('mouseup', stopResize); }
    
    function buildSettingsPanel() { /* ... (Full definition as provided, including the new Pointer Events Mode select) ... */
        const panel = createDOMElement('div', { id: CONFIG.SETTINGS_PANEL_ID, style: { position: 'absolute', top: '0px', right: '0px', bottom: '0px', width: 'clamp(320px, 60%, 500px)', backgroundColor: `rgba(35, 40, 50, 0.98)`, borderLeft: `2px solid ${CONFIG.MAIN_ACCENT_COLOR}`, padding: '15px 20px', zIndex: '1000', display: 'none', flexDirection: 'column', gap: '12px', overflowY: 'auto', boxShadow: '-10px 0px 25px rgba(0,0,0,0.3)', transition: 'transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)', pointerEvents: 'auto' } });
        state.domElements.settingsPanel = panel;
        const heading = createDOMElement('h3', { textContent: 'Settings', style: { margin: '0 0 15px 0', textAlign: 'center', color: 'white', fontSize: '1.3em'} }); panel.appendChild(heading);
        const commonSelectStyle = {width: '100%', padding: '8px', boxSizing: 'border-box', backgroundColor: 'rgba(0,0,0,0.35)', color: 'white', border: `1px solid ${CONFIG.MAIN_ACCENT_COLOR}bb`, borderRadius: '4px', fontSize: '0.9em'};
        const commonInputStyle = {...commonSelectStyle, type: 'text'};
        const commonLabelStyle = { display: 'block', marginBottom: '4px', fontSize: '0.9em', color: 'rgba(255,255,255,0.8)'};
        const checkboxLabelStyle = { display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '0.9em', color: 'rgba(255,255,255,0.8)', margin: '6px 0'};
        const checkboxStyle = { marginRight: '8px', transform: 'scale(1.25)', accentColor: CONFIG.MAIN_ACCENT_COLOR};
        const sectionHeadingStyle = {margin: '18px 0 10px 0', color: 'white', fontSize: '1.05em', borderBottom: '1px solid rgba(255,255,255,0.25)', paddingBottom: '6px'};

        // Pointer Events Mode Select
        panel.appendChild(createDOMElement('h4', {textContent: 'Mouse Click-Through Mode', style: sectionHeadingStyle}));
        const peGroup = createDOMElement('div');
        peGroup.appendChild(createDOMElement('label', { for: CONFIG.SETTINGS_POINTER_EVENTS_MODE_SELECT_ID, textContent: 'Panel Click Behavior:', style: commonLabelStyle }));
        state.domElements.pointerEventsModeSelect = createDOMElement('select', { id: CONFIG.SETTINGS_POINTER_EVENTS_MODE_SELECT_ID, style: commonSelectStyle });
        [
            {value: 'fully_interactive', text: 'Fully Interactive (Blocks Clicks)'},
            {value: 'interactive_except_buttons', text: 'Default (Panel transparent, Buttons active)'},
            {value: 'fully_transparent', text: 'Fully Click-Through (Keyboard/Auto Only)'}
        ].forEach(opt => state.domElements.pointerEventsModeSelect.add(new Option(opt.text, opt.value)));
        state.domElements.pointerEventsModeSelect.value = state.pointerEventsMode;
        state.domElements.pointerEventsModeSelect.addEventListener('change', (e) => {
            state.pointerEventsMode = e.target.value;
            updateMainContainerPointerEvents(); // Apply the new mode
            saveDataToStorage();
        });
        peGroup.appendChild(state.domElements.pointerEventsModeSelect);
        panel.appendChild(peGroup);

        // Shift & Lunch, Automation, UI Visibility, Debugging, Custom Tab Theme, Multi-Tab Sections...
        // (These sections are the same as in the previous "Part 2" of the full code, ensure all fields and handlers are included)
        // ... (Details of these sections omitted for brevity here, but you should have them from previous construction)

        const settingsPanelCloseButtonStyle = { cursor: 'pointer', backgroundColor: `${CONFIG.MAIN_ACCENT_COLOR}dd`, border: 'none', color: 'white', borderRadius: '5px', padding: '10px', fontSize: '1em', width: '100%', marginTop: 'auto', transition: 'background-color 0.2s' };
        settingsPanelCloseButtonStyle[':hover'] = { backgroundColor: CONFIG.MAIN_ACCENT_COLOR };
        const closeButton = createDOMElement('button', { textContent: 'Apply & Close', style: settingsPanelCloseButtonStyle });
        closeButton.addEventListener('click', () => setSettingsPanelVisibility(false));
        panel.appendChild(closeButton);
    }

    // --- POST-BUILD UI SETUP & EVENT HANDLERS ---
    function setInitialUIStates() { /* ... (Full definition as provided previously, including pointerEventsModeSelect) ... */
        // (Ensure this function correctly populates ALL settings fields, including the new pointerEventsModeSelect)
        if(state.domElements.pointerEventsModeSelect) state.domElements.pointerEventsModeSelect.value = state.pointerEventsMode;
        // ... rest of setInitialUIStates
    }
    function applyVisibilitySettings() { /* ... (Full definition as provided previously) ... */ }
    function applyDebugPointerEventsStyle() { /* ... (Full definition as provided previously) ... */ }
    // (All 'handle...' event handlers: processIncrementForCurrentTab, handleDecrementClick, handleCounterInputDynamic, handleCounterInputChange, updateCounterDisplay,
    //  handleShiftSettingsChange, updateManualShiftTimeInputVisibility, handleLunchSettingChange, handleAutoClickSettingChange,
    //  handleSaveCustomTheme, handleResetCustomTheme, handlePageKeydown - these should be here, complete)

    // --- CORE LOGIC ---
    // (determineAndSetShiftStartTime, updateRealTimeClockDisplay, updateLastActionTimerDisplay, updateStatistics,
    //  initializeMutationObserver, findElementsContainingText, updateTriggerDebugDisplay, applyThemeToPage - these should be here, complete)

    // --- SCRIPT INITIALIZATION ---
    function initialize() { /* ... (Full definition as provided previously) ... */ }
    function destroy() { /* ... (Full definition as provided previously) ... */ }

    // --- EXECUTION ---
    window.destroyProductionHelperV3_3 = destroy; // Make destroy function globally accessible for this version
    if (typeof window.productionHelperV3_3_Initialized === 'function' && window.productionHelperV3_3_Initialized) {
        logInfo("Found existing PHv3.3 instance. Attempting to destroy it first.");
        try { window.destroyProductionHelperV3_3(); } catch(e) {logError("Error destroying previous instance:", e);}
        setTimeout(() => {
            delete window.productionHelperV3_3_Initialized; // Important to clear before re-init
            actualInit();
        }, 300);
    } else {
       actualInit(); // Call actualInit directly if no previous instance flag
    }

    function actualInit(){ // Renamed to avoid direct recursive call issues with setTimeout context
        if (document.getElementById(CONFIG.UI_CONTAINER_ID)) {
             logError('Prod Helper UI v3.3 container check failed post-destroy or on race. Aborting.');
             return;
        }
        logInfo('Executing actualInit for Production Helper v3.3 (Intl)...');
        loadDataFromStorage();
        buildMainUI();
        // applyThemeToPage must be called after buildPageOverlayAndIndicator which is inside buildMainUI
        // applyVisibilitySettings must be called after buildMainUI and specific element visibility toggles are created
        // applyDebugPointerEventsStyle also depends on UI elements
        // These should be robust enough if called after buildMainUI finishes and domElements are populated.

        updateRealTimeClockDisplay(); // Initial call
        updateStatistics();           // Initial call
        updateLastActionTimerDisplay(); // Initial call

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


})(); // End of main IIFE
