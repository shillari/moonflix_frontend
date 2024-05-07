# Moonflix Frontend

Moonflix Frontend is the client-side component of the moonflix app, built using React and designed to interact with the existing [server-side code](https://github.com/shillari/moonflix_backend) (REST API and database).

## Features
- Browse All Movies: Users can browse through the entire list of available movies.
- Search Functionality: Allows users to filter the list of movies using a search feature.
- Movie Details: Users can select a movie to view more details about it.
- User Authentication: Provides login and registration functionality for users.
- User Profile: Users can view and update their profile information, including username, password, email, and date of birth.
- Favorites: Users can add movies to their list of favorites and view them later.
- Remove from Favorites: Allows users to remove movies from their list of favorites.
- Logout: Provides an option for users to log out of their accounts.
- Deregistration: Allows existing users to deregister their accounts.

## Build Tool
[Parcel](https://parceljs.org/): v2.12.0

Parcel is a fast, zero-configuration web application bundler that supports various file types out of the box, making it easy to set up and use for building React applications. It provides features such as hot module replacement, code splitting, and automatic asset optimization, enhancing the development experience and improving build performance.

## Stack
- [React](https://react.dev/): v18.3.1

React is a popular open-source JavaScript library for building user interfaces. It provides a component-based architecture that promotes code reusability and simplifies the development of interactive and dynamic web applications. React's virtual DOM and efficient rendering engine contribute to its high performance. The combination of React and Parcel offers a powerful and efficient toolset for developing the client-side of moonflix, ensuring a responsive user experience.

## Hosting
The Moonflix app is hosted on Netlify. You can access it [here](https://main--moonflix-app.netlify.app).

## Running locally
To run the Moonflix Frontend locally:

- Clone or download this repository.
- Set up an environment variable MOONFLIX_BACKEND with the value https://moonflix-97228dafe8d1.herokuapp.com. This is used to point to the REST API.
- In the terminal, navigate to the project folder and run __parcel .\src\index.html --no-cache__.
- Open your browser and go to http://localhost:1234.
