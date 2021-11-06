function getCurrent(location) {
    return fetch('/weather/' + location)
    .then(res => {
        // Valid login if we have a status of 2xx (res.ok)
        if (res.ok) return res.json();
    })
}
  
  
export default {
    getCurrent
};