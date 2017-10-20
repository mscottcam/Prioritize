# Prioritize

A task management system that allows users to organize their projects to make the most of their time by focusing on what is important. 

## [Prioritize Website](https://prioritize-app.herokuapp.com/)

<!-- ## Build Status -->

<!-- ![Build Status](https://travis-ci.org/eharris128/life-coach.svg?branch=master) -->

## Local Setup

1. Setup mongo servers for production and testing
2. Within the server folder, create .env with the variables: CLIENT_ID, CLIENT_SECRET, DATABASE, TEST_DATABASE
3. Navigate to the [google developers console](https://console.developers.google.com/) to create a client id and client secret
4. In the root folder of the project run ```npm install```
5. In the root folder of the project run ```npm run dev``` 

### Tech Used
* Redux 
* Node.js 
* MongoDB 
* Google OAuth 
* Chai 
* Nock
* Enzyme

### Documentation of API
All server endpoints require Google authentication. 

* GET /api/userData/:id
  - Retrieves all task, role, and goal data associated with a user
* GET /api/mission/:id
  - Retrieves a user's mission by user id
* POST /api/userTask
  - Adds a task to the database
* PUT /api/userMission
  - Modifies user's mission
* DELETE /api/userTask/:id
  - Deletes task from databased by user id