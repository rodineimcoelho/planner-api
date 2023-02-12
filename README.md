# Planner API

Planner API to organize the tasks of the week.

## Getting started

Install the dependencies:

```
npm install
```

Build the project:

```
npm run build
```

Start the server:

```
npm start
```

The server is now running on `http://localhost:3000`.

## Using the API

You can access the API using the following endpoints:

### `GET`

- `/api/v1/events`: Fetch all events
- `/api/v1/events?dayOfTheWeek={dayOfTheWeek}`: Fetch events of the current week by their `dayOfTheWeek`
  - `dayOfTheWeek` values go from 0 (sunday) to 6 (saturday)
  - Events are fetched according to the server's local time and response dates are in UTC time.
- `/api/v1/events/:id`: Fetch a single event by its `id`

### `POST`

- `/api/v1/users/signUp`: Create a new user
  - Body (all items required):
    - `firstName: string` : The user's first name
    - `lastName: string` : The user's last name
    - `birthDate: yyyy-mm-dd` : The user's date of birth, where `yyyy` is the year, `mm` is the month and `dd` is the day
    - `city: string` : The user's city
    - `country: string` : The user's country
    - `email: string` : The user's email
    - `password: string` : The user's password
    - `confirmPassword: string` : Repeat the user's password
- `/api/v1/users/signIn`: Sign in a user
  - Body (all items required):
    - `email: string` : The user's email
    - `password: string` : The user's password
- `/api/v1/events`: Create a new event
  - Body (all items required):
    - `description: string` : The event description
    - `dateTime: YYYY-MM-DDTHH:mm:ss.sssZ` : The date and time of the event in the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format

### `DELETE`

- `/api/v1/event/:id`: Delete a event by its `id`
- `/api/v1/events?dayOfTheWeek={dayOfTheWeek}`: Delete events by their `dayOfTheWeek`
  - `dayOfTheWeek` values go from 0 (sunday) to 6 (saturday)
  - Events are deleted according to the server's local time and response dates are in UTC time.
