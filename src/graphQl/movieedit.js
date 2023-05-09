import { gql } from "@apollo/client";

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
