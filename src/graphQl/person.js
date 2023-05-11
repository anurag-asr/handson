import { gql } from "@apollo/client";

export const PERSON_LIST_QUERY = gql`
  query PersonList($sort: ListPersonsSort!, $filter: ListPersonsFilter!) {
    listPersons(sort: $sort, filter: $filter) {
      message
      count
      data {
        id
        tmdbId
        birthday
        knownForDepartment
        deathday
        name
        alsoKnownAs
        gender
        biography
        popularity
        placeOfBirth
        profilePath
        homePage
        adult
      }
    }
  }
`;

export const DELETE_PERSON_QUERY = gql`
  mutation DeletePersonData($id: ID!) {
    deletePerson(id: $id) {
      message
    }
  }
`;

export const EDITING_PERSON_QUERY = gql`
  mutation personListEditing($id: ID!, $data: UpdatePersonInput!) {
    updatePerson(id: $id, data: $data) {
      message
      data {
        id
        tmdbId
        birthday
        knownForDepartment
        deathday
        name
        alsoKnownAs
        gender
        biography
        popularity
        placeOfBirth
        profilePath
        homePage
        adult
      }
    }
  }
`;

export const ADD_PERSON_DATA = gql`
mutation AddPerson($data:PersonInput!){
  createPerson(data:$data){
    message
    data{
      name    
    }
  }
}
`