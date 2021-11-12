function getCurrent(location) {
    return fetch('/weather/' + location)
    .then(res => {
        // Valid login if we have a status of 2xx (res.ok)
        if (res.ok) return res.json();
    })
}

function getSevenDay(lat, lon) {
    return fetch('/weather/week/' + lat + '&' + lon)
    .then(res => {
        // Valid login if we have a status of 2xx (res.ok)
        if (res.ok) return res.json();
    })
}
  
  
module.exports = {
    getCurrent,
    getSevenDay
};