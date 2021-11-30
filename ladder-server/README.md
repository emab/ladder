# Ladder Backend

A spring boot backend for the ladder application. 
Consists of some basic API endpoints and some logic for managing multiple leagues.

Also supports creating and inputting results of challenges, building a scoreboard.

## Usage

Ensure you have a local MongoDB instance running on the default port.

Update `application-local-EXAMPLE.properties` with
appropriate MongoDB connection details, and rename to `application-local.properties` to avoid committing to git.

Once running, API endpoints are available via http://localhost:8080/swagger-ui/ . You can use a JWT token from the frontend
application to authorize requests from here `Bearer <token from frontend>`.

## Technology

- Java
- Spring Boot
- Lombok
- MongoDB
- Swagger / SwaggerUI
- Javax Persistence

Uses Auth0 for checking the validity of provided JWT tokens from the frontend.