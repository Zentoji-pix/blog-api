## Blog API

A REST API for managing Blog Posts

## Live Demo
https://blog-api-kohl-seven.vercel.app/

## Endpoints

| Method  |  Endpoint   |    Description     |
|---------|-------------|--------------------|
|  GET    |  /articles     | Get all articles      |
|  POST   |  /articles  | Create a new article  |
|  GET    |  /articles/:id | Get a particular article |
|  PATCH  |  /articles/:id | Update an article      |
|  DELETE |  /articles/:id | Delete an article      |

## Technologies
- Node Js
- Express
- Mongo DB

## How to Run locally
1. clone the repo
    > git clone https://github.com/Zentoji-pix/blog-api.git

2. Install dependencies
    > npm install

3. Create a .env file 
    add your port and Mongo database link to 
    PORT and MONGO_URI respectively

4. Start the server
    > npm start

## Sample Request
POST /articles
{
    "title": "My first article"
    "content": "the content"
    "author": "nice guy"
}

