import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";
import { Provider } from "react-redux";
import "./styles/reset.css";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

document.getElementById("add").addEventListener("click", async function () {
  const tokenAddress = '0x8e047ec4c07d1c535a587c1193a9486e67727163';
  const tokenSymbol = 'DUFF';
  const tokenDecimals = 18;
  const tokenImage = 'https://i.imgur.com/zxJUFpa.png';

  try {
    // wasAdded is a boolean. Like any RPC method, an error may be thrown.
    const wasAdded = await ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20', // Initially only supports ERC20, but eventually more!
        options: {
          address: tokenAddress, // The address that the token is at.
          symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
          decimals: tokenDecimals, // The number of decimals in the token
          image: tokenImage, // A string url of the token logo
        },
      },
    });

    if (wasAdded) {
      console.log('Thanks for your interest!');
    } else {
      console.log('Your loss!');
    }
  } catch (error) {
    console.log(error);
  }
});


const copied = document.querySelector("#copied");

async function copyText() {
  navigator.clipboard.writeText("0x8E047Ec4c07d1C535a587C1193A9486E67727163");


  ca.children[1].style.opacity = '0';
  ca.children[2].style.opacity = '0';

  setTimeout(function () {
    ca.children[1].style.display = 'none';
    ca.children[2].style.display = 'none';
    copied.style.display = 'flex';
    copied.style.opacity = '1';
  }, 200);

  setTimeout(function () {
    copied.style.opacity = '0';

    setTimeout(function () {
      ca.children[1].style.display = 'flex';
      ca.children[2].style.display = 'flex';
      copied.style.display = 'none';
      ca.children[1].style.opacity = '1';
      ca.children[2].style.opacity = '1';
    }, 200)
  }, 1500);
}


document.getElementById("ca").addEventListener("click", copyText);


//Dark Mode

const darkMode = document.querySelector("#dark-mode");
const modeLogo = document.querySelector("#mode-logo");
const modeText = document.querySelector("#mode-text");
const chart = document.querySelector("#chart");
const copy = document.querySelector("#copy");

darkMode.addEventListener("click", () => {
  toggleMode();
})

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function AddTransitions() {
  document.querySelector("#addA").style.transition = "all 0.4s ease-in-out";
  document.querySelector("#buy").style.transition = "background-color 0.4s ease-in-out";
  document.querySelector(".hover").style.transition = "all 0.3s";
  document.querySelector(".link").style.transition = "all 0.2s ease-in-out";
}

function RemoveTransitions() {
  document.querySelector("#addA").style.transition = "none";
  document.querySelector("#buy").style.transition = "none";
  document.querySelector(".hover").style.transition = "none";
  document.querySelector(".link").style.transition = "none";
}


function toggleMode() {
  RemoveTransitions();
  var now = new Date();
  var time = now.getTime();
  var expireTime = time + 1000 * 24 * 60 * 60;
  now.setTime(expireTime);
  document.body.classList.toggle("light-mode-variables");
  if (modeLogo.innerHTML == "light_mode") {
    chart.src = "/config/images/darkChart.png";
    copy.src = "/config/images/copy.svg";
    modeLogo.innerHTML = "mode_night";
    modeText.innerHTML = "Dark Mode";
    document.cookie = "isDark=true; expires=" + now.toUTCString() + "path=/;";
  }
  else {
    chart.src = "/config/images/lightChart.png";
    copy.src = "/config/images/copyWhite.svg";
    modeLogo.innerHTML = "light_mode";
    modeText.innerHTML = "Light Mode";
    document.cookie = "isDark=false; expires=" + now.toUTCString() + "path=/;";
  }

  document.cookie =
    sleep(300).then(() => {
      AddTransitions();
    });
}

//FAKE
const api = "https://api.exchangerate-api.com/v4/latest/USD";

let usdtocad;
function getResults() {
  fetch(`${api}`)
    .then(exchangeRates => {
      return exchangeRates.json();
    }).then(saveResults => {
      usdtocad = saveResults.rates["CAD"];
    });
}
getResults();

let currency = document.getElementById("country");

let BNBPrice;
let priceUSD;
let marketCapUSD;



currency.addEventListener('change', setPrice);

async function setPrice() {
  BNBPrice = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT')
    .then(response => response.json())
    .then(data => data.price);

  priceUSD = BNBPrice / 186924351;
  marketCapUSD = priceUSD * 1000000000;

  if (currency.value == "USD") {
    document.getElementById("priceBox").innerHTML = priceUSD.toFixed(9);
    document.getElementById("mkt").innerHTML = marketCapUSD.toFixed(2);
  }
  else {
    document.getElementById("priceBox").innerHTML = (priceUSD * usdtocad).toFixed(9);
    document.getElementById("mkt").innerHTML = (marketCapUSD * usdtocad).toFixed(2);
  }
}

setPrice();