<!-- Base URL = https://jsonplaceholder.typicode.com -->
## curl 1: GET /posts/1
- Method: GET
- Status code: 200
- Content-type: application/json
- What came back: {
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
}

## curl 2: GET /posts/99999
- Status code is 404 because what I think is that post with id 99999 does not exist and we are tryin to fetch that post. Hence, we get 404 (Data does not exist).

## curl 3: GET /posts?userId=1
- It returns data of the posts with userId = 1

## curl 4: POST 
- The status code is 201 which means we have successfully created a new post with following data passed in body:
{
"title":"Hello",
"body":"From curl",
"userId":1
} 
and the response we got is
{
  "title": "Hello",
  "body": "From curl",
  "userId": 1,
  "id": 101
}