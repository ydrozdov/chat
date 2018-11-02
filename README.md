# chat
A simple chat application which is able to send messages and display messages from all senders.

## How to run?
```
mvn compile jib:dockerBuild
docker-compose up
```
You need to run `mvn compile jib:dockerBuild` only once. You might need to run `docker-compose up` twice if you will have any error messages.

## How to access?
Please go to http://localhost:8086/

Port 8080 is used by backend.
