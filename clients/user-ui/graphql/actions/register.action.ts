"use client";
import { DocumentNode, gql } from "@apollo/client";

export const REGISTER_USER: DocumentNode = gql`
  mutation Register($registerInput: RegisterDto!) {
    register(registerInput: $registerInput) {
      activation_token
    }
  }
`;
