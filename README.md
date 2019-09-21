# HackerBay-Interview-Round-1
Node.JS Task Round 1
[![Build Status](https://travis-ci.com/Lundii/HackerBay-Interview-Round-1.svg?branch=develop)](https://travis-ci.com/Lundii/HackerBay-Interview-Round-1) [![Coverage Status](https://coveralls.io/repos/github/Lundii/HackerBay-Interview-Round-1/badge.svg)](https://coveralls.io/github/Lundii/HackerBay-Interview-Round-1)


## Pivotal Tracker Story Board
- https://www.pivotaltracker.com/n/projects/2399135

##APIs 

Login - `POST {host}/api/v1/login` - Login a user
```
  username: "string"
  password: "string"
```


Json patch - `PATCH {host}/api/v1/json-patch` - patch a json object
```
  docs: "object"
  patch: "array"
```


Thumbnail - `PATCH {host}/api/v1/thumbnail` - download and return a thumbnail
```
  imageUrl: "string"
```

## Swagger API documentation
- `GET host:port/api/v1/docs` 

## docker iamge 
- `docker pull lundii/hackerbay1`
