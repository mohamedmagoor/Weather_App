//general variables......
var searchBtn = document.getElementById("searchBtn");
var searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function () {
  searchWeather(searchInput.value);
});

//start making the search function....

async function searchWeather(city) {
  var rawData = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=ba3e7f00a06243a4aec102546230408&q=${city}&days=4`
  );
  var finalData = await rawData.json();

  //entry the data of the current day....
  document.getElementById("degreeOne").innerHTML =
    finalData.current.temp_c + `<sup>o</sup>C`;
  document.getElementById("customOne").innerHTML =
    finalData.current.condition.text;
  document.getElementById("locationCity").innerHTML = finalData.location.name;
  document.getElementById("weatherIcon").src = finalData.current.condition.icon;

  //get the  current day name
  let weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDate = new Date();
  let day = weekday[currentDate.getDay()];
  document.getElementById("dayOne").innerHTML = day;

  //get the  current month name....

  let month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let d = new Date();
  let name = month[d.getMonth()];
  let theCurrentDay = d.getDate();
  document.getElementById("theMonthName").innerHTML = theCurrentDay + name;
  //  searchInput.value = ''

  console.log(finalData.forecast.forecastday[1].date);

  // get the next day weather...

  document.getElementById("icon-two").src =
    finalData.forecast.forecastday[1].day.condition.icon;

  document.getElementById("theDegree-Two").innerHTML =
    finalData.forecast.forecastday[1].day.maxtemp_c + `<sup>o</sup>C`;
  document.getElementById("smallTwo").innerHTML =
    finalData.forecast.forecastday[1].day.mintemp_c + `<sup>o</sup>`;
  document.getElementById("customTwo").innerHTML =
    finalData.forecast.forecastday[1].day.condition.text;

  //GET THE DAY
  function getDayName(date = new Date(), locale = "en-US") {
    return date.toLocaleDateString(locale, { weekday: "long" });
  }

  var nextDayDate = finalData.forecast.forecastday[2].date;

  document.getElementById("nextDay").innerHTML = getDayName(
    new Date(nextDayDate)
  );

  //set the weather for the third day

  document.getElementById("icon-thrd").src =
    finalData.forecast.forecastday[2].day.condition.icon;
  document.getElementById("thirdDegree").innerHTML =
    finalData.forecast.forecastday[2].day.maxtemp_c + `<sup>o</sup>C`;
  document.getElementById("smallThird").innerHTML =
    finalData.forecast.forecastday[2].day.mintemp_c + `<sup>o</sup>`;
  document.getElementById("customThree").innerHTML =
    finalData.forecast.forecastday[2].day.condition.text;

  //get the third day name

  var thirdDay = finalData.forecast.forecastday[3].date;

  document.getElementById("thirdDay").innerHTML = getDayName(
    new Date(thirdDay)
  );
}

//start making my location

const findMyState = (_) => {
  const sucess = (position) => {
    console.log(position);

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    var geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

    async function fetchFunc() {
      var allData = await fetch(geoApiUrl);
      var infoData = await allData.json();
      var actualPlace = infoData.city;

      searchWeather(infoData.city);
    }
    fetchFunc();
  };
  const error = () => {
    console.log("unable to retrive the location");
  };

  navigator.geolocation.getCurrentPosition(sucess, error);
};

var findLocatBtn = document.getElementById("find-my-location");
findLocatBtn.addEventListener("click", findMyState);

// function getDayName(date = new Date(), locale = 'en-US') {
//    return date.toLocaleDateString(locale, {weekday: 'long'});
//  }

//  console.log(getDayName(new Date()));
