# demo-service

This is just a small demo application showing a few things one can do in a
simple setup of Node.js & React. You can post requests to an API for creating
jobs in a job framework. A worker instance will pick up and solve those jobs,
and the server also has a WebSocket extension both the worker and the frontend
can communicate with.

## Development

`docker-compose up`

`cd backend && yarn run worker:dev`

`cd backend && yarn run server:dev`

`cd frontend && yarn run start`

## Running tests
`cd backend && yarn run test:dev`

`cd frontend && yarn run test`

## Todo

✅ ground work

✅ api endpoint listing jobs

✅ api endpoint adding job

✅ api endpoint for downloading a pdf

✅ worker doing the job

✅ web socket publishing job state change

✅ frontend listing jobs

✅ frontend adding a job

✅ frontend listening on job state changes

✅ frontend downloading a job

❌ todo
✅ done
