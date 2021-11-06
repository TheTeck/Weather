const request = require('request');

const apiKey = process.env.WEATHER_KEY;

module.exports = {
    getCurrent
};

function getCurrent (req, res) {
    let location = "San Francisco";
    request(
        `https://api.openweathermap.org/data/2.5/onecall?lat=51.5085&lon=37.7749&appid=${apiKey}&units=imperial`,
        function(err, response, body) {
            let data = JSON.parse(body);
            res.send(data);
        }
    );
}