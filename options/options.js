// Javascript in strict mode.
"use strict";



// Declare a global var which will contain the status of the automatic feature. 1=enabled, 0=disabled.
var setStatus;



// Get the stored susrURL string, split it and update the HTML-form
/////////////////////////////////////////////////////////////////////////////////
function RestoreOptions() {

	
	
	// Get the list of URLS from the browser's storage
	chrome.storage.local.get({'userURL': ''}, function(items) {
		UpdateList(items);
	});
	
	
	
	// Update list of URLs
	/////////////////////////////////////////////////////////////////////////////
	function UpdateList(result) {
		
		var x = 0;
		var URL = result.userURL.split('|');

			URL.forEach(function(myVal) {

				if (x === 0) {
					$('#setURL').val(myVal);
					x++;
				} else
					AddURL(myVal);

			});
			
	}
	
}



// Toggle the on/off button.
/////////////////////////////////////////////////////////////////////////////////
function SetStatusButton() {
	
	//chrome.extension.getBackgroundPage().console.log(setStatus);
	var statusImg = (setStatus == 1) ? 'on' : 'off';
	$("#active").attr('src', statusImg + ".png");
	
}



// Function for addaing another <input> field to the form.
/////////////////////////////////////////////////////////////////////////////////
function AddURL(val) {
	
	$('#urls').append('<li><input type="text" name="myURL[]" class="userInput" value="' + val + '" /> <button class="remove">Delete</button></li>');
	
}



// Function for reloading the current tab the URL in `link`.
/////////////////////////////////////////////////////////////////////////////////
function ReloadTab(link) {
	
	// Grab the current tab.
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.update(tabs.id, { url: link } );	// Update the tab with `link`.
	});
	
}



// When options.html has been loaded...
/////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
	
	
	
	// Toggle on/off-buttons depending on the value in the global setStatus` var.
	chrome.storage.local.get({'enabled': ''}, function(item) {
		setStatus = (item.enabled !== "" && (item.enabled == 0 || item.enabled == 1)) ? item.enabled : 1;	// Get the value from the storage-cookie.
		SetStatusButton();			// Update the on/off-button. Which to show?
	});
	
	
	
	// Add new empty URL-field
	$('#add_URL').click(function() {
		AddURL("");
		$('html, body').animate({ scrollTop:$(document).height() }, 'slow');
	});
	
	
	
	// Remove input-field
	$('#urls').on("click",".remove", function() {
		$(this).closest('li').remove();
	});
	
	
	
	// Enable or disable the browser extension.
	$('#active').click(function() {
		
		// Toggle the global var `setStatus` between 1(on) and 0(off).
		setStatus = (setStatus == 0) ? 1 : 0;
		
		// Toggle the on/off-buttons depending on the value in the global var `setStatus`.
		SetStatusButton();

		// Send a messsage to `redirect.js` with the value in `setStatus` to enable/disable this extension.
		chrome.runtime.sendMessage({ extStatus: setStatus });
		
	});
	
	
	
	// Save the changes.
	$('#save').click(function() {
		
		var myURL = '';
	
		// Iterate through all <input> fields with name myURL
		$('input[name^="myURL"]').each(function() {

			if ($(this).val() !== false && $(this).val().length >= 1) {
				myURL += $(this).val() + '|'; // Build a string with a | separator
			}

		});

		// Remove last pipe |
		myURL = myURL.replace(/\|$/, '');

		// Save myURL to the browser storage
		chrome.storage.local.set({'userURL': myURL});

		chrome.extension.getBackgroundPage().LoadURLs();
		$('#status').html('<b>List Saved!</b>');
		
	});
	
	
	
	// Function for the tab-menu
	$('ul.tabs li').click(function(){
		
		var tab_id = $(this).attr('data-tab');

		$('ul.tabs li').removeClass('current');
		$('.tab-content').removeClass('current');

		$(this).addClass('current');
		$("#" + tab_id).addClass('current');
		
		//chrome.extension.getBackgroundPage().console.log("tab switched");
	})
	
	
	
	// Function for going to unv.is
	$('#unvis').click(function(e) {
		
		e.preventDefault();
		
		// Call `ReloadTab` and go to the donation page.
		ReloadTab("http://unv.is");
		
	});
	
	
	
	$('#firefox').click(function(e) {
		
		e.preventDefault();
		
		// Call `ReloadTab` and go to mozilla.
		ReloadTab("https://support.mozilla.org/en-US/kb/firefox-reader-view-clutter-free-web-pages");
		
	});
	
	
	
	// Function for going to the donation page.
	$('#donate').click(function(e) {
		
		e.preventDefault();
		
		// Call `ReloadTab` and go to the donation page.
		ReloadTab("https://paypal.me/nickswardh/");
		
	});
	
	
	
	$('#nswardh').click(function(e) {
		
		e.preventDefault();
		
		// Call `ReloadTab` and go to nswardh.com.
		ReloadTab("http://www.nswardh.com");
		
	});
	
	
	
	// Call `RestoreOptions()` as soon as the document is ready.
	RestoreOptions();
	
});


//document.addEventListener("DOMContentLoaded", RestoreOptions);
//document.getElementById('save').addEventListener('click', SaveOptions);