const request = require('request');

const apiKey = process.env.WEATHER_KEY;

module.exports = {
    getCurrent
};

function getCurrent (req, res) {
    console.log(req.params)
    request(
        `https://api.openweathermap.org/data/2.5/weather?q=${req.params.id}&appid=${apiKey}&units=imperial`,
        function(err, response, body) {
            let data = JSON.parse(body);
            res.send(data);
        }
    );
}