import popularMovies from "../movieLists/popularMovies";
import topRatedMovies from "../movieLists/topRatedMovies";

const getMovieListData = (modeValue) => {
  switch (modeValue) {
    case "top-rated":
      return topRatedMovies;

    case "popular":
      return popularMovies;

    default:
  }
};

export default getMovieListData;
