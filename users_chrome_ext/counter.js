// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

let onStart;
document.addEventListener("DOMContentLoaded", function() {
document.querySelector("#runBtn").addEventListener("click", onStart, false)
document.querySelector("#stopCount").addEventListener("click", onStop, false)
const scrollBar = document.querySelector(".scrollbar-users");
debugger
if(scrollBar){
	onStart = () =>{
		chrome.tabs.query({currentWindow: true, active: true},
		function(tabs){
			chrome.tabs.sendMessage(tabs[0].id, {action: "start"})
		})
	}
}else{
	return;
}


function onStop(){
	chrome.tabs.query({currentWindow: true, active: true},
	function(tabs){
		chrome.tabs.sendMessage(tabs[0].id, {action: "stop"})
	})
}

}, false)

