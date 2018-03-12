// Javascript in strict mode.
"use strict";



// Declare a global var which holds the number of total redirects.
var count = 0;



// Get total redirections from the `userCounter` cookie.
///////////////////////////////////////////////////////////////////////////////////////////////
chrome.storage.local.get({ userCounter: '' }, function(items) {
	count = items.userCounter;
});



// Add 1 to `count` for each redirection. Call `UpdateRedirectCount()` for each request.
///////////////////////////////////////////////////////////////////////////////////////////////
function DonationReminder() {
	
	count++;
	
	if (count >= 100) {
		UpdateRedirectCount(0);			// Reset the counter cookie.
		count = 0;						// Reset the global counter var.
		return true;					// Return true. We reached 100 redirections.
	} else {
		UpdateRedirectCount(count);		// Update the counter cookie.
		return false;					// Return false, we didn't reach 100 redirections yet.
	}
	
}



// Save the redirection counter to `userCounter` storage.
///////////////////////////////////////////////////////////////////////////////////////////////
function UpdateRedirectCount(counter) {
	chrome.storage.local.set({ 'userCounter': counter });
}



// Function for donations...
///////////////////////////////////////////////////////////////////////////////////////////////
function Donate(url) {
	
	// Inject the JQuery.js library before anything else...
	chrome.tabs.executeScript(null, { file: "options/jquery-3.3.1.min.js" }, function() {
		
		// Inject the var `continueURL` with the value of `url`.
		chrome.tabs.executeScript(null, { code: "var continueURL = '" + url + "';" }, function(){
			
			// Finally inject the donate.js file containong the HTML for the donationrequest.
			chrome.tabs.executeScript(null, { file: "donate.js" }, function() {
            	// Everything injected.
        	});
			
		});
		
	});
	
}