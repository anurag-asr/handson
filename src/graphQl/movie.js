import { gql } from "@apollo/client";

//Requesting Movie Data
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
//Mutation Request

// Delete
export const DELETE_MOVIE_QUERY = gql`
mutation DeleteMovie($id:ID!){
  deleteMovie(id:$id){
    message
  }
}
`