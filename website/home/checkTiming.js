const marketTimeMsg = document.querySelector("#market_time_msg");

function displayMarketStatus() {

  changeBodyStyle();

  displayMarketHeader();

}

function changeBodyStyle() {

  const body = document.querySelector("#body");

  let className = checkMarketOpen() ? "closedMarket" : "openMarket";

  body.classList.add(className);

}

function displayMarketHeader() {

  let headerMessage = checkMarketOpen()
    ? `market is currently open`
    : `market is currently closed`;

  document.querySelector("#market_status").innerHTML = headerMessage;

}

function checkMarketOpen() {

  let currentTime = new Date();
  const marketOpenTime = new Date();
  const marketCloseTime = new Date();

  marketOpenTime.setHours(9, 30, 0);
  marketCloseTime.setHours(16, 0, 0);

  if (currentTime < marketOpenTime) {

    marketTimeMsg.innerHTML = convertMilliSeconds(`market opens in`, marketOpenTime - currentTime);

    return false;
  } else if (currentTime >= marketCloseTime) {

    marketTimeMsg.innerHTML = convertMilliSeconds(`market already closed for`, currentTime - marketCloseTime);

    return false;
  } else if (currentTime >= marketOpenTime && currentTime <= marketCloseTime && checkWeekend()) {

    marketTimeMsg.innerHTML = convertMilliSeconds(`market already open for`, currentTime - marketOpenTime);

    return true;
  }

}

function checkWeekend() {

  let currentDay = new Date().getDay;

  if (currentDay == 6) {

    marketTimeMsg.innerHTML = "market closed on saturday";

    return false;
  } else if (currentDay == 0) {

    marketTimeMsg.innerHTML = "market closed on sunday";

    return false;
  } else {
    return true;
  }
  
}

function convertMilliSeconds(innerTxt, numOfMilliSeconds) {

  let seconds = Math.floor((numOfMilliSeconds / 1000) % 60);
  let minutes = Math.floor((numOfMilliSeconds / (1000 * 60)) % 60);
  let hour = Math.floor((numOfMilliSeconds / (1000 * 60 * 60)) % 60);

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hour < 10) {
    hour = ` 0${hour}`;
  }

  return `${innerTxt} ${hour}:${minutes}:${seconds} hours`;

}
