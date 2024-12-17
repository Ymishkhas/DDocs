# DDocs Web Application

DDocs allows users to create and edit folders and documents with a Markdown text editor. Documents can be shared in the platform for others to see, and users can search through a wide range of documents created by the community. 

#### Features
- User sign-in with Google, along with authentication and authorization using Firebase.
- Fully functional file explorer for user folders and documents. Users can add, edit, and  delete folders and files.
- Markdown text editor for editing documents.
- Search home page, where users can search for publicly shared documents.

## Screenshots

![](/Screenshots/home%20page.png)
![](/Screenshots/Editing%20page.png)



## Architecture

This project uses the [starter template](https://github.com/UsableSystemsLab/react-node-postgres-pgadmin-docker-template) for a full stack web application using Docker Compose. It uses React, Node.js, PostgreSQL, and pgAdmin, offering a complete development environment.

 #### Architecture breakdown

- React frontend
- Node.js backend API server
- PostgreSQL database
- pgAdmin for database management
- Database initialization scripts
- Docker Compose

#### Services

| Service            | URL                                 |
|--------------------|-------------------------------------|
| PostgreSQL         | `postgres://localhost:5432`         |
| pgAdmin            | `http://localhost:5050`             |
| React App          | `http://localhost:3000`             |
| Express API Server | `http://localhost:4000/health`      |

#### Note
> I don't own the architecture [template](https://github.com/UsableSystemsLab/react-node-postgres-pgadmin-docker-template), it is an open template and of the property of [@kalharbi](https://github.com/kalharbi). If you need more info about it, it's available in the template repo.

## Usage

### Docker setup
- Must have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and signed in your account

### Firebase setup

- Muse have a Firebase project or create a [new Firebase project](https://console.firebase.google.com/)
- Register the web app under the project settings, copy the firebase config, and place them in the `/react_app/src/firebase.js` file.
- Create a new service account under the project settings, generate the private key and save it.

### Environment variables setup

- Copy the example environment file to create your .env file:

```shell
cp example.env .env
```
- Put your service account private key details in the .env
```shell
FIREBASE_TYPE=
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
FIREBASE_CLIENT_ID=
FIREBASE_AUTH_URI=
FIREBASE_TOKEN_URI=
FIREBASE_AUTH_PROVIDER_CERT_URL=
FIREBASE_CERT_URL=
FIREBASE_UNIVERSE_DOMAIN=
````

- Optional - Change the environment variables if wanted

### Run the application

- Start the containers:

```shell
docker compose up
```

- Visit the website at http://localhost:3000

## License
This project is licensed under the MIT License.
