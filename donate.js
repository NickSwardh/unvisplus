// Javascript in strict mode.
"use strict";



$("header").after('<link href="https://fonts.googleapis.com/css?family=Roboto+Condensed" rel="stylesheet">');
	


// Add the dimmer-div directly after the <body> tag.
$("body").after("<div style=\"z-index: 9998; " +
						   	"position: fixed; " +
						   	"top: 0px; " + 
							"left: 0px; " +
							"width: 100%; " +
							"height: 100%; " +
							"background: #000; " +
							"opacity: 0.8\"></div>");



// Inject the following <div> holder after the <body> tag. 
$("body").after("<div id=\"unvisDonate\" style=\"position: fixed; " +
				"margin: auto; " +
				"top: 0; " +
				"bottom: 0; " +
				"left: 0; " +
				"right: 0; " +
				"width: 600px; " +
				"height: 280px; " +
				"border: 1px solid #000; " +
				"z-index: 9999; " +
				"background: #fff; " +
				"font-family: 'Roboto Condensed', arial; " +
				"font-size: 16px; " +
				"text-decoration: none; " +
				"font-style: normal; " +
				"font-weight: normal; " +
				"color: #000; " +
				"border-radius: 8px; " +
				"overflow: hidden\"></div>");



// Inject the content.
$("#unvisDonate").html("<div style=\"padding-top: 30px\"><center><span style=\"font-size: 32px\">100 Redirects using Unv.is Plus!</span>" +
					   "<p style=\"margin-top: 16px; margin-bottom: 45px\">Thank you for using this free extension for your browser.</p>" +
					   "<button id=\"unvisDonateNow\" style=\"background-color: #4CAF50; " +
					   											"border: none; " +
																"color: white; " +
																"padding: 16px; " +
																"text-align: center; " +
																"text-decoration: none; " +
																"display:inline-block; " +
																"font-size: 16px; " +
																"margin: 4px 2px; " +
																"cursor: pointer; " +
																"border-radius: 8px\">Support & Donate &raquo;</button></center>" +
					   "</div>" + 
					   "<div style=\"margin-top: 30px; text-align: right\">" +
					   "<span id=\"unvisDonateLater\" style=\"cursor: pointer; margin-right: 30px\">Remind me later, continue &raquo;</span>" +
					   "</div>");



// Add som click events here.
$("#unvisDonateNow").click(function() {
	
	// Send user to the donation page.
	$(location).attr('href', 'https://paypal.me/nickswardh/');
});



// Click event for donation reminder.
$("#unvisDonateLater").click(function() {
	
	// The var continueURL comes from the Donate() function located in donate.js
	// This var contains the url the user is about to be directed to.
	$(location).attr('href', continueURL);
});