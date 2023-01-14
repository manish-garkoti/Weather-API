import { fetchWeatherDetails } from "./weather.js";

const fetchBtn = document.getElementById("fetch"),
  latElement = document.getElementById("lat"),
  longElement = document.getElementById("long"),
  locationInfoContainer = document.getElementById("location-info");

const userLocationPromise = new Promise((resolve,reject)=> {
    navigator.geolocation.getCurrentPosition((data)=> {
        resolve(data)
    },
    (error) => {
        reject(error);
    }
    )
})

function createMapElement (lat,long) {
  const iframeElement = document.createElement("iframe");
  iframeElement.width = "100%";
  iframeElement.height = "150px";
  iframeElement.src = `//maps.google.com/maps?q=${lat},${long}&z=15&output=embed`;
  iframeElement.scrolling = "no";

  return iframeElement;
}

function renderUserLocationInfo (location) {
    const lat = location.coords.latitude;
    const long = location.coords.longitude;
    locationInfoContainer.style.display = "flex";
    latElement.textContent = lat;
    longElement.textContent = long;

    const mapElement = createMapElement(lat,long);
    locationInfoContainer.appendChild(mapElement);
}

export async function getUserLocation () {
  const userLocation = await userLocationPromise;
  fetchBtn.style.display = "none";
 
  renderUserLocationInfo(userLocation);
  await fetchWeatherDetails(userLocation);
}