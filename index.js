const SearchForMovie = require('./OMDb-api');

SearchForMovie('Guardians of the Galaxy Vol. 2')
    .then(movieData => {
        console.log(movieData);
    })
    .catch(error => {
        console.error(error);
    });