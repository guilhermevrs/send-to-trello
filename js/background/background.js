'use strict';

var background = angular.module('app.background', []);

chrome.browserAction.onClicked.addListener(
    function (tab) {
        if (!localStorage.getItem('trello_token')) {
            chrome.tabs.create({url: chrome.extension.getURL('js/settings/settings.html')});
            return true;
        } else {
            chrome.browserAction.setPopup({popup:'app.html'});
        }
    });

if (localStorage.getItem('trello_token')) {
    chrome.browserAction.setPopup({popup:'app.html'});
}
