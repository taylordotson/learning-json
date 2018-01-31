"use strict";

console.log("xhr main.js");

let startTime = Date.now();
console.log("startTime", startTime);

for (let i = 0; i < 2000000; i++) {
    let x = i + i/2 * 6;
};
console.log("newTime", Date.now());

let bigDataRequest = new XMLHttpRequest();

bigDataRequest.addEventListener("load", bigDataComplete);
bigDataRequest.addEventListener("error", bigDataFailed);

function bigDataComplete(event) {
    console.log("event", event);
    if(event.target.status === 200){
        let bigData = JSON.parse(event.target.responseText);
        console.log("Time of Big Data", Date.now() - startTime);
        console.log("data", bigData);
    }else{
        console.log("Check the spelling of your file");
    }
}

function bigDataFailed(event) {
    console.log("Oops, Somewthing went wrong");
}

bigDataRequest.open("GET", "JEOPARDY_QUESTIONS1.json");
bigDataRequest.send();

let dataRequest = new XMLHttpRequest();
dataRequest.addEventListener("load", dataRequestComplete);
dataRequest.addEventListener("error", dataRequestFailed);

function dataRequestComplete(event) {
    console.log("Colors have been loaded.");
    let colorData = JSON.parse(event.target.responseText);
    console.log("colorData", colorData);
    showData(colorData);
}

function showData(taco) {
    let colorDiv = document.getElementById("all-my-colors");
    let colorData = "";

    for(let item in taco){
        let colorItem = taco[item];
        colorData += `<div><h2>${colorItem.color}: ${colorItem.value}</h2></div>`
        };

    colorDiv.innerHTML = colorData;
    console.log("The colors are done", Date.now() - startTime);
}

function dataRequestFailed(event) {
    console.log("This data has failed to load", event);
}

dataRequest.open("GET", "color.json");
dataRequest.send();