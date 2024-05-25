const request = require('request');

const apiKey = 'a77cfd0c';

const SearchForMovie = (movieTitle) => {
    const url = `http://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${apiKey}`;

    return new Promise((resolve, reject) => {
        request(url, { json: true }, (err, res, body) => {
            if (err) {
                return reject('Error: ' + err);
            }
            if (res.statusCode !== 200) {
                return reject('Failed to fetch data: ' + res.statusCode);
            }

            const movieData = {
                title: body.Title,
                year: body.Year,
                imdbRating: body.imdbRating,
                language: body.Language,
                genre: body.Genre,
                director: body.Director,
                actors: body.Actors,
                plot: body.Plot,
            };

            resolve(movieData);
        });
    });
}

module.exports = SearchForMovie;