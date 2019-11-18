chrome.runtime.onMessage.addListener(function(responce){
	const db_users = JSON.parse(responce);
	const usersContainer = document.querySelectorAll(".user-container");
	const scrollBar = document.querySelector(".scrollbar-users");
	if(scrollBar){
		usersContainer.forEach(function(user) {
			let userBody;
			const userID = user.firstChild.children[0].attributes["user-id"].value
	
			const getTotalTime = (value) => {
				let result;
				if(value){
					result = +( db_users.find(x => x.userId === userID)["totalTime"]) + value;
				}else{
					result = 1
				}
				return result;
			}
	
			let userExist = db_users.find(x => x.userId === userID);
	
	
			if(userExist){
				userBody = JSON.stringify({
					"userName": user.innerText,
					"userId": userID,
					totalTime: getTotalTime(1)
				})
			}else{
				userBody = JSON.stringify({
					"userName": user.innerText,
					"userId": userID,
					totalTime: getTotalTime(null)
				})
			}
			
	
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
	}else{
		alert("Не смог найти учасников чата, попробуй открыть вкладку 'Все участники'")
	}

})