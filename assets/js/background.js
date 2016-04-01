// Chrome event handler
chrome.commands.onCommand.addListener(function (command) {

    chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {

    	if (tabs[0] && tabs[0].url) {
    		var longUrl = tabs[0].url;

    		// disbale browser urls
    		var pattern = /^((chrome):\/\/)/;
    		if(pattern.test(longUrl)) {
			    return;
			}

	        var json = {'longUrl': longUrl};

	        $.ajax({
	            'url': 'https://www.googleapis.com/urlshortener/v1/url?key=?????????????????????????',
	            headers: {
	                'Content-Type': 'application/json'
	            },
	            'method': 'POST',
	            'dataType': 'json',
	            'data': JSON.stringify(json),
	            success: function (response) {

	                if (response) {
	                    shortUrl = response.id;
	                    copyToClipboard(shortUrl);
	                    show(shortUrl);
	                }
	            }
	        });
    	}
    });
});

function copyToClipboard(shortUrl) {
    var input = document.createElement('textarea');
    document.body.appendChild(input);
    input.value = shortUrl;
    input.focus();
    input.select();
    document.execCommand('Copy');
    input.remove();
}

function show(shortUrl) {
    var notification = new Notification('Url Shortened', {
        icon: 'assets/img/ico48.png',
        body: shortUrl + ' (Copied to clipboard)'
    });
}