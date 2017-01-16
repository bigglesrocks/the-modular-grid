/*jslint browser, es6, single, for, devel, multivar */
/*global window, chrome */

/*
 * This file is called each time a new browser window loads.
 */

//
// TODO: This variable should be removed in favor of inspecting the settings variable
// isGridEnabled in chrome.browserAction.onClicked and chrome.commands.onCommand
//
let isGridEnabled = false;
    // lastTabId,
    //
    // Structure for holding and reserving project settings
    //
    // currentSettings = {
    //     gridIsEnabled : false
    // };

//
// Initiate the default settings
//
chrome.storage.sync.set(
    {
        currentGrid: 'all-grids',
        isGridEnabled: false
    }
);

chrome.browserAction.setIcon({path: 'img/extension-icon-19-off.png'});

/**
 * Acquiring last tab’s ID
 */
// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     lastTabId = tabs[0].id;
// });

/**
 * Maintaining track of the current tab ID
 */
// chrome.tabs.onSelectionChanged.addListener(function(tabId) {
//     lastTabId = tabId;
// });

/**
 *
 */
chrome.browserAction.onClicked.addListener(function () {
    'use strict';

    if (isGridEnabled) {
        chrome.browserAction.setIcon({path: 'img/extension-icon-19-off.png'});
    } else {
        chrome.browserAction.setIcon({path: 'img/extension-icon-19.png'});
    }

    isGridEnabled = !isGridEnabled;

    chrome.storage.sync.set({isGridEnabled: isGridEnabled});
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(
            tabs[0].id,
            {
                isGridEnabledViaBrowserAction: isGridEnabled
            }
        );
    });
});

/**
 *
 */
chrome.commands.onCommand.addListener(function() {
    'use strict';

    if (isGridEnabled) {
        chrome.browserAction.setIcon({path: 'img/extension-icon-19-off.png'});
    } else {
        chrome.browserAction.setIcon({path: 'img/extension-icon-19.png'});
    }

    isGridEnabled = !isGridEnabled;

    chrome.storage.sync.set({isGridEnabled: isGridEnabled});
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(
            tabs[0].id,
            {
                isGridEnabledViaBrowserAction: isGridEnabled
            }
        );
    });
});
