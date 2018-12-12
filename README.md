# SurveyServer-Django

Node Server for the survey app

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
   ```
   sudo service mongod start
   ```
4) Install the dependencies in the project folder
   ```
   yarn install
   ```
5) Run the node server using command -
    ```
    yarn run start
    ```
6) Use postman to send a GET request to [localhost:3000](localhost:3000) to test the server