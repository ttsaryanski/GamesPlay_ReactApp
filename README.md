# GamesPlay - [Live App](https://gamesplay-54b41.web.app/) - Firebase

⚠️ **Note:** The Rest API is hosted on a free-tier service and may take some time to wake up after a period of inactivity. Please be patient when making the first request.

## Project Overview

This is a Single Page Application (SPA) designed to serve as a catalog for games. The project includes both public and private sections, following the required specifications. The app demonstrates dynamic functionalities, interaction with the REST API, and the use of core concepts and technologies in React.

---

## Features and Functionality

### Public Section

The public section is accessible to all users and includes:

-   📌 **Home Page**: Showcases the three latest games.
-   📌 **Catalog**: A list of all available games for browsing.
-   📌 **Details**: Detailed information about a specific game and related comments.
-   📌 **Authentication Forms**: Registration and login forms to access the private section with more features.

### Private Section

The private section is available only to registered and logged-in users, offering:

-   📌 **Game Management**: Create, edit, and delete your own games.
-   📌 **Interaction**: Ability to comment on other users’ games (but not your own).

### Admin Section

The admin section is available only to registered and logged-in users with the admin role.  
⚠️ You can log in as an admin using "`admin@abv.bg`" with the password "`admin`" - Live App only! ⚠️

-   📌 **Game Deletion**: Delete games.
-   📌 **Comment Deletion**: Delete comments.
-   📌 **User Management**: Delete users or grant them admin rights. ⚠️ You cannot delete other admins! ⚠️

---

## Technologies and Concepts

### Core Technologies

-   📌 **React**: The main library for the client-side part.
-   📌 **REST API**: For communication with a remote server.
-   📌 **JavaScript**: Used for dynamic interaction within the app.

### Core React Concepts

-   📌 **Routing**: React Router is used to manage client-side routing for different pages.
-   📌 **Component State**: useState and useReducer are used for managing state within components.
-   📌 **React Hooks**: Various hooks like useEffect, useContext are used to manage component behavior and state.
-   📌 **Context API**: Used to share state across components without passing props.
-   📌 **React Router Guards**: Used to protect both public and private sections of the app (e.g., authentication checks).

### Core Features

-   📌 **CRUD Operations**: Full support for creating, reading, updating, and deleting games and comments.
-   📌 **Data Validation**: Client-side validation to prevent invalid input.
-   📌 **Error Handling**: Graceful handling of API communication errors.
-   📌 **Stay Logged In**: Users remain logged in after reloading the page using cookies.

---

⚠️ **Note:** This application was developed as part of the educational program at [SoftUni (Software University)](https://softuni.bg).  
It demonstrates the practical application of concepts and technologies studied in the React module.
