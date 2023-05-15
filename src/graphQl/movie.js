import { gql } from "@apollo/client";

//Requesting Movie Data
export const FEATURED_MOVIES_QUERY = gql`
 query MoviesData($sort:ListMoviesSort,$filter:ListMoviesFilter){
  listMovies(sort:$sort,filter:$filter){
    message
    count
    data{
      id
      adult
      title
      status
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