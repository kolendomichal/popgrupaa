# Getting Started
## Prerequisities
- Python 3.* 
- PostgresSQL 
- Nodejs
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

In order to run this application, you need to have npm (Node Package Manager) installed.  
It comes with Node.js.

* [Node.js and NPM](https://www.npmjs.com/get-npm) - Installation guide for Node.js and NPM
* [PostgresSQL](https://www.postgresql.org/download/) and [Guide](http://www.postgresqltutorial.com/install-postgresql/) - Installations for different OS and guide for installation. I advice to setup login: admin , password: 123456 and default port in installation
*  [Python 3.6 or higher](https://www.python.org/downloads/release/python-375/)


# Setup FrontEnd
In the **Pop-Grupa-A-Frontend** project directory, you can run:

### `npm install`

Installs required dependencies for starting up the project.  
(it might take a while, so wait patiently)

After installing all dependencies, run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

# Setup Backend
In the **Pop-Grupa-A-Backend** project directory, you can run:

### `pip install requirements.txt`

Installs required dependencies for starting up the project.  
(it might take a while, so wait patiently)

After installing all dependencies, run:

### `python manage.py run`

Runs the app in the development mode.<br>
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

API  will reload if you make edits.<br>
You will also see any lint errors in the console.

# Docker
[Docker for Windows Installation](https://docs.docker.com/docker-for-windows/install/)
To create and run docker images follow instruction below:
1. Launch **Powershell IDE** or different console
2. Navigate to directory containing 2 projects with **docker-compose.yml** file
3. In console run `docker-compose up -d --build` - it will build images and spin up the containers. They will be accessed on localhost:3000 and localhost:5000. Any changes made in both projects will be automatically refreshed in containers (hot-reloading)
## Note: 
On _Linux_ and _MAC_ systems connection to postgres probably won't work. In order to fix that, you have to change in
**docker-compose.yml**  in DATABASE_URL env variable **_host.docker.internal_** to your computer IP address