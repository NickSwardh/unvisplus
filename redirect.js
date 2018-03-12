// Javascript in strict mode.
"use strict";



var unvisEnabled;	// Declare a var for the enabled/disabled status of this webextension.
var all_URLs;		// Declar a global var for storing all urls.



// What's the status of Unv.is status-cookie? Is it enabled or disabled?
/////////////////////////////////////////////////////////////////////////////////
chrome.storage.local.get( { 'enabled': '' }, function(item) {
	
	// Get the value from the storage-cookie `enabled` and store the value in the global var `unvisEnabled`.
	unvisEnabled = (item.enabled !== "" && (item.enabled == 0 || item.enabled == 1)) ? item.enabled : 1;
	
});



// Add an event listener for disabeling or enabeling the extension at runtime.
/////////////////////////////////////////////////////////////////////////////////
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

	// Update the value from the incoming message sent from options.js
	unvisEnabled = request.extStatus;
	
	// Update the storage cookie `enabled` with the value in the `setStatus` variable.
	chrome.storage.local.set( { 'enabled' : unvisEnabled });
	
});



// Redirect the user to unv.is along with the URL in `requestDetails.url`.
/////////////////////////////////////////////////////////////////////////////////
function Redirect(requestDetails) {
	
	// If unv.is is enabled, go!
	// Remember `unvisEnabled` is a global var and is declare at the beginning of this script.
	if (unvisEnabled == 1)
		return { redirectUrl: "https://unv.is/" + requestDetails.url };
			
}



// Adds a listener that calls the `Redirect()` function when a match in the
// global var `all_URLs` is found.
/////////////////////////////////////////////////////////////////////////////////
function AddListener() {
	
	chrome.webRequest.onBeforeRequest.addListener(
        Redirect,
        {urls: all_URLs},
        ["blocking"]
	);
	
}



// Get `userURL` from the storage and call `RedirectURL()` wich loads and activates the webrequest listener.
// This function is also being called from `options.js` when the user save and update the list of URLs.
/////////////////////////////////////////////////////////////////////////////////
function LoadURLs() {
	
	// Get the value from the storage-cookie `userURL`.
	chrome.storage.local.get( { 'userURL': '' }, function(items) {
		
		all_URLs = items.userURL.split('|');	// Split the cookie into an array. Remember `all_URLs` is a global var.
		RedirectToURL();						// Call `RedirectToURL()` and activate the listener.
		
	});
}



// This function checks if there's already a listener, if there is an one then
// it will be removed replaced with a new one. If the user updates the list of URLs then
// the listener needs to be "refreshed" with the new values in the global var `all_URLs`.
///////////////////////////////////////////////////////////////////////////////////////////////
function RedirectToURL() {

	if (chrome.webRequest.onBeforeRequest.hasListener(Redirect)) {
		chrome.webRequest.onBeforeRequest.removeListener(Redirect);		// Remove the old listener.
		AddListener();													// Call `AddListener()` and create a new fresh one.
	} else
		AddListener();	// Create a listener.
	
}



// Call `LoadURLs()` and activate the extension.
LoadURLs();