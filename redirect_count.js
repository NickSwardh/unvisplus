function RedirectCount(counter) {
	var obj = {};
	
	obj.counter = counter;
	
	// Return counterdata from `userCounter`.
	obj.getCount(function() {
		chrome.storage.local.get({userCounter: ''}, function(items) {
			return items.userCounter;
		});
	});
	
	obj.setCount(function() {
		chrome.storage.local.set({userCounter: ''}, function(items) {
			return items.userCounter;
		});
	});
}