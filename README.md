# Dating App API Backend

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Note](#note)

## About <a name = "about"></a>

Create a basic dating app which should contain following features:-

    Test users loading: You can load test users with 10 images in the database.
    Sign up api : Basic email and password based registration
    login api : Jwt based login with email and password
        
        Image like api : Whenever someone like other user image, a socket io notification will sent to other user but image of person who liked should not be visible to who is being liked
        
        Block api: When a user block another user then his/her image should not be shown while blocked user is scrolling random images

## Getting Started <a name = "getting_started"></a>

create a `.env` file and add following content

```
# .envNODE_ENV=development
APP_NAME=dattingAppAPI
jwtSecret=YOUR_SECRET_KEY
PORT=3000 
```

### Prerequisites

What things you need to install the software and how to install them.

```
NodeJs 12~
```

### Installing

A step by step series of examples that tell you how to get a development env running.

In root directory run in terminal to install npm packages from `package.json`
```
npm install
```

## Usage <a name = "usage"></a>

use postman to test the API with following URL path :

to register the user : - 
```
localhost:3000/register

Body Parameter : 
{
    "email" : "your@email.com",
    "password" : "passwordYouWantToSet"
}
```

to login the user : -
```
localhost:3000/login


Body parameter : - 
{
    "email" : "your@email.com",
    "password" : "passwordYouWantToSet"
}
Header : (in request url) // you can get the authorisation header value from register URL response.
{
    authorisation : "dsankabdsnlhadsbdaslndasblndasvasdsavkabsasdbkjgasdkvbasdk"
}
```
to update image for specific user : -
```
localhost:3000/image/update

{
    "email" : "your@email.com",
    "imgUrl" : "www.image.url.com/image.png"
}
```
to block an user :-
```
localhost:3000/block/user


Body parameter : - 
{
	"email" : "test2@mail.com",
	"blockedUserEmail" : "test1@gmail.com"
}
```
to view all registered user profile :-
```
localhost:3000/scroll/all/user


Body parameter : - 
{
    userEmail : "your@email.com"
}
```

## Note <a name = "note"></a>

```
Scrolling user info is not done yet and I am getting some error on blocked User route too. Will be  updating both the route ASAP.
```
