let seconds = 0;
let minutes = 0;
let hours = 0;

let displayseconds = 0;
let displayminutes = 0;
let displayhours = 0;

let interval = null;

let status = "stopped";

function stopwatch() {
  seconds++;

  if (seconds / 60 === 1) {
    seconds = 0;
    minutes++;

    if (minutes / 60 === 1) {
      minutes = 0;
      hours++;
    }
    if (seconds < 10) {
      displayseconds = "0" + seconds.toString();
    } else {
      displayseconds = seconds;
    }
    if (minutes < 10) {
      displayminutes = "0" + minutes.toString();
    } else {
      displayminutes = minutes;
    }
    if (hours < 10) {
      displayhours = "0" + hours.toString();
    } else {
      displayhours = hours;
    }
  }
  document.getElementById("display").innerHTML =
    hours + ":" + minutes + ":" + seconds;
}

function startstop() {
  if (status === "stopped") {
    interval = window.setInterval(stopwatch, 1000);
    document.getElementById("startstop").innerHTML = "stop";
    status = "started";
  }
  else{
      window.clearInterval(interval)
      document.getElementById("startstop").innerHTML = "start";
      status = "stopped";
  }
}

function check() {
  if (status === "started") {
    window.clearInterval(interval);
    document.getElementById("startstop").innerHTML = "start";
    status = "stopped";

    console.log(hours, minutes, seconds);
  }
}

function finishTimer() {
  let wsholoh = localStorage.getItem("activityData");
  if (!wsholoh || typeof JSON.parse(wsholoh) === "string")
    return localStorage.setItem(
      "activityData",
      JSON.stringify([{ id: 0, activityName: null, time: `${hours}:${minutes}:${seconds}` }])
    );

  let parsedArray = JSON.parse(wsholoh);
  parsedArray.push({ id: parsedArray.length, activityName: null,  time: `${hours}:${minutes}:${seconds}` });

  localStorage.setItem("activityData", JSON.stringify(parsedArray));
}
