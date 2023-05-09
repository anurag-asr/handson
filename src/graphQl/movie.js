import { gql } from "@apollo/client";

//Query Request
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
export const MOVIE_DELETE_BY_ID = gql`
mutation DeleteMovie($id:ID!){
  deleteMovie(id:$id){
    message
  }
} 
`