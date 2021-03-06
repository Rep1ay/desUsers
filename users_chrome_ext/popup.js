// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

document.addEventListener("DOMContentLoaded", function() {
const startBtn = document.querySelector("#startCount");
startBtn.addEventListener("click", onStart, false);
document.querySelector("#stopCount").addEventListener("click", onStop, false)

function onStart(){
	startBtn.disabled = true;
	startBtn.style.background = "#ccc";
	chrome.tabs.query({currentWindow: true, active: true},
	function(tabs){
		chrome.tabs.sendMessage(tabs[0].id, {action: "start"})
	})
}

function onStop(){
	startBtn.disabled = false;
	startBtn.style.background = "yellowgreen";
	
	chrome.tabs.query({currentWindow: true, active: true},
	function(tabs){
		chrome.tabs.sendMessage(tabs[0].id, {action: "stop"})
	})
}
	
}, false)

