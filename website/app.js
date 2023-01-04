/* Global Variables */
const baseURL = "http://api.openweathermap.org/data/2.5/forecast?zip=";
const apiKey = "&appid=7a790157fdc0f0770cb4dfd11af5f843";
// const apiKey = "b4a42ee5c694e319a8c906e229f7e8f2";

const zipCodeEl = document.querySelector("#zip");
const dateEl = document.querySelector("#date");
const tempEl = document.querySelector("#temp");
const feelingsEl = document.querySelector("#feelings");
const contentEl = document.querySelector("#content");
const generateButton = document.querySelector("#generate");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// function Decelerations

// generating data
function generate(e) {
  const zipCode = zipCodeEl.value;
  const feelings = feelingsEl.value;
  getInfo(baseURL, zipCode, apiKey).then((data) => {
    console.log(data);
    postData("/add", {
      date: d,
      temp: data.list[0].main.temp,
      content: feelings,
    });
    updateUI();
  });

  // get information by the zip code from api
  async function getInfo(baseUrl, zip, key) {
    const response = await fetch(baseUrl + zip + key);
    try {
      const data = await response.json();
      return data;
    } catch (err) {
      console.log("error", err);
    }
  }

  // post data to the server
  const postData = async (url = "", data = {}) => {
    const res = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    try {
      const newData = await res.json();
      console.log(newData);
      return newData;
    } catch (err) {
      console.log("error", err);
    }
  };
}

// updating the UI
async function updateUI() {
  let req = await fetch(`/all`);
  try {
    const allData = await req.json();
    dateEl.innerHTML = `The Date is ${allData[0].date}`;
    tempEl.innerHTML = `The Temperature is ${allData[0].temp}`;
    contentEl.innerHTML = `Mood is ${allData[0].content}`;
  } catch (err) {
    console.log("error", err);
  }
}

/// Adding the generate button functionality
generateButton.addEventListener(`click`, generate);
