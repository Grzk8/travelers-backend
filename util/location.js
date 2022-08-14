const axios = require('axios');
const { response } = require('express');
const API_KEY = 'AIzaSyBwjxbKPhkHuf9JKa3OQKqvTUBZQqWgsBg';

async function getCoordinates(location) {
    const response = await axios.get(`
    https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${API_KEY}
    `);

    const data = response.data;

    if (!data || data.status === 'ZERO_RESULTS') {
        const error = new Error('Location not found');
        error.code = 422;
        return next(error);
    };

    const coordinates = data.results[0].geometry.location;
    return coordinates;
};

module.exports = getCoordinates;