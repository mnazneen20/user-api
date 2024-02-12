# Raw Node.js RESTful API for User Management
This is a simple implementation of a RESTful API using Node.js for managing user-related operations. The API allows you to perform CRUD operations on user data, including user creation, retrieval, update, and deletion.

##
## About

Built this api server using the core nodejs modules. This helped me understand the basics of nodejs functionalities and the many core nodejs modules, It helped me gain better knowledge of the javascript language and its beauty of callback functions. I learnt how express.js works and how much easy it has made to create servers🫡. 

1. used `http` module for creating server.
2. used `url` module for parsing the request url.
3. used `string_decoder` module for receiving client data.
4. used `crypto` module for password hashing.
5. used `fs` module for storing data in the file system.

##
## Get started

### Clone the repository:
git clone https://github.com/mnazneen20/user-api.git

### Start the Node.js server: npm start
The server will run on http://localhost:4000


##
## API endpoints

### Create new user
`POST` request at `/user`

request body json (username should be unique)
```
Status: 201

{
    "firstname":"John",
    "lastname": "Doe",
    "password": "pass123",
    "username":"john22"
}
```

response:
```
{
    "message": "New User Created"
}
```

### Retrive user
`GET` request at `/user?username=john22`

response:

```
Status 200

{
    "message": "User found",
    "user": {
        "firstname": "John",
        "lastname": "Doe",
        "username": "john22"
    }
}
```


### Update user
`PUT` request at `/user?username=john22`

request body json
```
{
    "firstname":"John Anthony"
}
```

response:
```
Status: 200

{
    "message": "User updated"
}
```


### Delete user
`DELETE` request at `/user?username=john22`

response:
```
Status: 200

{
    "message": "User Deleted"
}
```