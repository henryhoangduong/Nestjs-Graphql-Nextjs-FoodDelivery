"use client";
import { DocumentNode, gql } from "@apollo/client";

export const LOGIN_USER: DocumentNode = gql`
  mutation LoginUser(email:String!, password: String!) {
    Login(email: $email, password: $password) {
      user {
        name
        email
        phone_number
        createdAt
      }
      accessToken
      refreshToken
      error{
        message
      }
    }
  }
`;
