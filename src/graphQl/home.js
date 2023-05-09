import { gql } from "@apollo/client";

export const FEATURED_MOVIES_QUERY = gql`
  query MovieList($sort: ListMoviesSort!, $filter: MoviesFilter!) {
    movies(sort: $sort, filter: $filter) {
      message
      count
      data {
        title
        id
        adult
        budget
        originalLanguage
        budget
      }
    }
  }
`