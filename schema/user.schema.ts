export const user = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/user",
  "title": "User",
  "description": "An user in the blog",
  "type": "object",
  "properties": {
    "firstname": {
      "description": "User firstname",
      "type": "string"
    },
    "lastname": {
      "description": "User lastname",
      "type": "string"
    },
    "username": {
      "description": "User username",
      "type": "string"
    },
    "about": {
      "description": "About user",
      "type": "string"
    },
    "dateregistered": {
      "description": "Date of user registered",
      "type": "date"
    },
    "password": {
      "description": "User password",
      "type": "string"
    },
    "passwordsalt": {
      "description": "User password salt",
      "type": "string"
    },
    "email": {
      "description": "User email",
      "type": "string"
    },
    "avatarurl": {
      "description": "User avatar url",
      "type": "string"
    },
  },
  "required": ["username", "dateregistered", "email"]
}