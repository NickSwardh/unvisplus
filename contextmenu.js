// Javascript in strict mode.
"use strict";



// Add an Unvisit-option to the context menu.
chrome.contextMenus.create({
	id: "Unv.is",
	title: "Unv.is this link...",
	contexts: ["link"]
});



// Add a listener and check if the user clicked on the Unvisit option in the context menu. If so, oen a new tab!
chrome.contextMenus.onClicked.addListener((info, tab) => {

	var link = "https://unv.is/" + info.linkUrl;
	
	if (!DonationReminder())
		chrome.tabs.create({ url: link });		// Open a new tab and navigate to link
	else
		Donate(link);							// Call `Donate()` from counter.js and display the donation reminder.
	
});