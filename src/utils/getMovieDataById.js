import axios from "axios";

const getDirector = (crew) => {
  const director = crew.find((element) => element.job > "Director");
  return director.name;
};

const getMovieDataById = async (movieId) => {
  let movieData = {};
  await axios
    .get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
    )
    .then(async (response) => {
      movieData = response.data;
      await axios
        .get(
          `https://api.themoviedb.org/3/movie/${movieData.id}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
        )
        .then((response) => {
          movieData.director = getDirector(response.data.crew);
          movieData.cast = [
            response.data.cast[0].name,
            response.data.cast[1].name,
          ];
        });
    });

  return movieData;
};

export default getMovieDataById;
