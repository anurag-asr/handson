import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation EmailandPassword($data:EmailPasswordLogInData!){
  emailPasswordLogIn(data:$data){
    message
    data{
     token
      refreshToken
      user{
        id
        email
        profileImage
        name
        firstName
      }
    }
  }
}
`