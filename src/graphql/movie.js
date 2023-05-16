import { gql } from "@apollo/client";

//Requesting Movie Data
export const FEATURED_MOVIES_QUERY = gql`
  query MoviesData($sort: ListMoviesSort, $filter: ListMoviesFilter) {
    listMovies(sort: $sort, filter: $filter) {
      message
      count
      data {
        id
        adult
        title
        status
      }
    }
  }
`;
//Mutation Request

// Delete
export const DELETE_MOVIE_QUERY = gql`
  mutation DeleteMovie($id: ID!) {
    deleteMovie(id: $id) {
      message
    }
  }
`;

export const MOVIE_QUERY_BY_ID = gql`
  query MovieByid($id: ID!) {
    movie(id: $id) {
      message
      data {
        adult
        budget
        originalLanguage
        originalTitle
        title
        overview
        releaseDate
        revenue
        runtime
        status
        tagline
      }
    }
  }
`;

// ########### MOVIE FORM #########
export const MOVIE_UPDATE_QUERY = gql`
  mutation MovieUpdating($id: ID!, $data: UpdateMovieInput!) {
    updateMovie(id: $id, data: $data) {
      message
      data {
        posterData
        collections
        credits
        genres
      }
    }
  }
`;
export const ADD_MOVIE_QUERY = gql`
  mutation AddMovie($data: MovieInput) {
    createMovie(data: $data) {
      message
      data {
        companies
        genres
        credits
        backdropData
      }
    }
  }
`;
