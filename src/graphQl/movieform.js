import { gql } from "@apollo/client";

export const MOVIE_UPDATE_QUERY = gql`
mutation MovieUpdating($id:ID!,$data:UpdateMovieInput!){
updateMovie(id:$id,data:$data){
 message
 data{
 posterData
 collections
  credits
  genres
} 
}
}
`
export const ADD_MOVIE_QUERY = gql`
mutation AddMovie($data:MovieInput){
  createMovie(data:$data){
    message
    data{
      companies
      genres
      credits
      backdropData
    }
  }
}
`