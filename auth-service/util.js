const axios = require('axios');
const config = require('./config');
const EVENT_BUS_URL = process.env.EVENT_BUS_URL || config.EVENT_BUS_URL;

module.exports.generateRandomString = function(length) {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }    
  
    return text;
}

module.exports.fireEvent = async (data) => {
    await axios.post(`${EVENT_BUS_URL}`, data);
}