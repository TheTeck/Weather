module.exports = {
    windDirection,
    capitalizeAllWords,
    moonPhase,
    dateToTime
}

function windDirection (wd) {
    let windDirection = 'N';

    if (wd > 348.75 || wd <= 11.25) {
        windDirection = 'N'
    } else if (wd > 11.25 && wd <= 33.75) {
        windDirection = 'NNE'
    } else if (wd > 33.75 && wd <= 56.25) {
        windDirection = 'NE'
    } else if (wd > 56.25 && wd <= 78.75) {
        windDirection = 'ENE'
    } else if (wd > 78.75 && wd <= 101.25) {
        windDirection = 'E'
    } else if (wd > 101.25 && wd <= 123.75) {
        windDirection = 'ESE'
    } else if (wd > 123.75 && wd <= 146.25) {
        windDirection = 'SE'
    } else if (wd > 146.25 && wd <= 168.75) {
        windDirection = 'SSE'
    } else if (wd > 168.75 && wd <= 191.25) {
        windDirection = 'S'
    } else if (wd > 191.25 && wd <= 213.75) {
        windDirection = 'SSW'
    } else if (wd > 213.75 && wd <= 236.25) {
        windDirection = 'SW'
    } else if (wd > 236.25 && wd <= 258.75) {
        windDirection = 'WSW'
    } else if (wd > 258.75 && wd <= 281.25) {
        windDirection = 'W'
    } else if (wd > 281.25 && wd <= 303.75) {
        windDirection = 'WNW'
    } else if (wd > 303.75 && wd <= 326.25) {
        windDirection = 'NW'
    } else {
        windDirection = 'NNW'
    }

    return windDirection;
}

function capitalizeAllWords (str) {
    let words = str.split(' ');
    return words.map(word => {
        return word[0].toUpperCase() + (word.length > 1 ? word.slice(1) : '');
    }).join(' ');
}

function moonPhase (phase) {
    let phaseName = "New Moon";

    if (phase > 0 && phase < 0.25)
        phaseName = "Waxing Crescent"
    else if (phase === 0.25)
        phaseName = "First Quarter"
    else if (phase > 0.25 && phase < 0.5) 
        phaseName = "Waxing Gibbous"
    else if (phase === 0.5)
        phaseName = "Full Moon"
    else if (phase > 0.5 && phase < 0.75)
        phaseName = "Waning Gibbous"
    else if (phase === 0.75)
        phaseName = "Last Quarter"
    else if (phase > 0.75 && phase < 1)
        phaseName = "Waning Crescent"
    
    return phaseName
}

function dateToTime (date) {
    let hour = date.getHours() % 12; 
    let minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

    return hour + ':' + minute
}