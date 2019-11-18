// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

document.addEventListener("DOMContentLoaded", function() {
document.querySelector("#startCount").addEventListener("click", onStart, false)
document.querySelector("#stopCount").addEventListener("click", onStop, false)
let startCount;

	function onStart(){

		startCount =  setInterval(() => {
			const http = new XMLHttpRequest();

			http.open("GET", "http://localhost/api/members", true);
			http.setRequestHeader("Content-type", "application/json; charset=utf-8");
	
			http.onreadystatechange = function() {
				if (http.readyState == 4) {
					chrome.tabs.query({currentWindow: true, active: true},
					function(tabs){
						chrome.tabs.sendMessage(tabs[0].id, (http.response))
					})
				}
			}
			http.send();
		}, 60000)
	}

	function onStop(){
		clearInterval(startCount);
	}
	
}, false)

