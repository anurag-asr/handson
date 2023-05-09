import { gql } from "@apollo/client";

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