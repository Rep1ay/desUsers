chrome.runtime.onMessage.addListener(function(resp){
	if(!window.counting && resp.action === "start"){
		function refreshChat(){
			window.nextrequestTimer = 300;
			const allWatchers = document.querySelectorAll('.menu-item__wrapper')[1];
			const chat = document.querySelectorAll('.menu-item__wrapper')[0];
			
			allWatchers.click();
			chat.click();
			allWatchers.click();
			setTimeout(() => {
				const scrollBar = document.querySelector(".scrollbar-users");
				if(scrollBar){
					window["counting"] =  true;
					startCount();
				}else{
					alert("Не смог найти учасников чата, попробуй открыть вкладку 'Все участники'")
				}
			}, 8000);

			if(resp.action === "stop"){
				window.counting =  false;
			}
		}

		function startCount(){
			const scrollBar = document.querySelector(".scrollbar-users");
			if(scrollBar){
			window.pointsCounter = 0;

			const http = new XMLHttpRequest();

			http.open("GET", "http://localhost/api/members", true);
			http.setRequestHeader("Content-type", "application/json; charset=utf-8");

			http.onreadystatechange = function() {
				if (http.readyState == 4) {
					window.pointsCounter++;
					setInterval(function(){
						window.nextrequestTimer--;
						console.log("Запишу зрителей через " + window.nextrequestTimer + " c");
					},1000)

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
			}else{
				alert("Не смог найти учасников чата, попробуй открыть вкладку 'Все участники'")
			}
		}

		window.interval;
		window.interval = setInterval(refreshChat, 300000);
		refreshChat();
	}else if(window.counting && resp.action === "start"){
		alert("Подсчёт уже запущен")
	}
	
	if(resp.action === "stop"){
		window.counting = false;
		clearInterval(window.interval);
		alert("Подсчёт остановлен");
	}

})