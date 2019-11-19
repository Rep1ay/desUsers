chrome.runtime.onMessage.addListener(function(resp){
	window.interval;
	const scrollBar = document.querySelector(".scrollbar-users");

	if(!sessionStorage.counting && resp.action === "start"){
		if(scrollBar){
		sessionStorage.setItem('counting', true);
		window.interval = setInterval(startCount, 3000);
		startCount();
		}else{
			alert("Не смог найти учасников чата, попробуй открыть вкладку 'Все участники'")
		}
	}else if(sessionStorage.counting && resp.action === "start"){
		alert("Подсчёт уже запущен")
	}

	if(resp.action === "stop"){
		sessionStorage.removeItem('counting');
	}

	function startCount(){
		window.pointsCounter = 0;

		const http = new XMLHttpRequest();

		http.open("GET", "http://localhost/api/members", true);
		http.setRequestHeader("Content-type", "application/json; charset=utf-8");

		http.onreadystatechange = function() {
			if (http.readyState == 4) {
				window.pointsCounter++;
				const db_users = JSON.parse(http.response);
				const usersContainer = document.querySelectorAll(".user-container");
				console.log("Добавлено " + usersContainer.length + " чел.");
	
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
						http.send(userBody);
					})
				}
			}
		
		http.send();
		}

	if(resp.action === "stop"){
		clearInterval(window.interval);
		alert("Подсчёт остановлен");
	}

})