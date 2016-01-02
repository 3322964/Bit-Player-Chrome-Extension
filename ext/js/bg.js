function open_app(options)
{
	options = options || {};
	chrome.storage.local.get("debug", function (n)
	{
		options.debug = n.debug || "";
		var o = Object.keys(options).map(function (key)
		{
			return key + "=" + encodeURIComponent(options[key])
		}).join("&");
		chrome.app.window.create("html/window.html?" + o, {bounds: {width: 800, height: 450}})
	})
}
chrome.app.runtime.onLaunched.addListener(function ()
{
	open_app()
});
chrome.runtime.onMessageExternal.addListener(function (request, sender, sendResponse)
{
	console.log("external message received", request);
	if ("open-torrent-url" == request.command)
	{
		open_app({url: request.url});
		sendResponse({result: 1});
	}
});