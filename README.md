# SurveyServer-Django

Node Server for the survey app. Admin refers to the Broadcasters that add surveys and User refers to the users voting in the survey using the mobile app.

## Technologies-

NodeJS  
Fastify  
MongoDB  
JWT for Auth

## Tools (optional) -

Postman  
Robo3T

## Folder Structure

```bash
|-- controller
    // controller of every route
|   `-- admin.js
|-- models
    // models which are used in the project eg Admin, User
|   `-- admin.js
|-- routes
    // routes are declared here
|   |-- admin.js
|   `-- index.js
|-- schema
    // schema is used to validate the body of a request for a POST/PUT request
|   `-- admin.js
|-- config.js
|-- index.js    // Main file
|-- package.json
|-- README.md
`-- yarn.lock
```

## Installation -

1) Install NodeJS v8.11.3, MongoDB v3.6.9
2) Clone the repository using git
3) Run the mongod service  
   For Linux -

   ```shell
   sudo service mongod start
   ```

4) Install the dependencies in the project folder

   ```shell
   yarn install
   ```

5) Run the node server using command -

    ```shell
    yarn run start
    ```

6) Use postman to send a GET request to [localhost:3000](localhost:3000) to test the server

## Information about the models -

### Admin -

1) Common model for Admin and Sub-Admins.
2) Admins won't have the 'parent' attribute and sub-admins won't have the 'children' attribute.

### Survey -

1) A type attribute to store the the type of the survey, possible values - 'single', 'multiple', 'rating', 'feedback'.

### Response -

~~1) Four attributes to store the different types of responses.~~  
~~2) Type of survey decides the attribute in which data is stored, other three would be null.~~  
~~3) The attributes are named same as the type of the survey-~~

1) A field named response defined for 4 different types of responses.

## To-Do -  

- [x] Publish and unpublished to model  
- [x] Change subAdmin controls to return subAdmin when added  
- [x] Result policy to survey model  
- [x] Add category, approval logic  
- [x] Add Albums to admin profile  
- [x] Validate start is before end when adding survey

## Mobile App Endpoints -

- [x] Deploy to GCP Compute Engine
- [ ] Feed - live surveys
- [x] List of all broadcasters that can be followed
- [ ] User Profile
- [x] Register response
- [x] Don't let answer again
- [ ] Calculate result before sending response for first two result types
- [x] Follow broadcaster