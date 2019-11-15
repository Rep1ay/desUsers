chrome.runtime.onMessage.addListener(function(request){
	debugger
	document.querySelectorAll(".user-container").forEach(function(user) {

		const userBody = JSON.stringify({
			"userName": user.innerText,
			"userId": user.firstChild.children[0].attributes["user-id"].value
		})

		const http = new XMLHttpRequest();

		http.open("PUT", "http://localhost/api/members", true);
		http.setRequestHeader("Content-type", "application/json; charset=utf-8");

		http.onreadystatechange = function() {
			if (http.readyState == 4) {
				console.log('http: status 200');
			}
		}
		http.send(userBody);
	})
})