# Getting Started
## Prerequisities
- Python 3.*
- PostgresSQL
- Nodejs
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You can just run `docker-compose up -d --build` in main folder to have all setup ready to development. Also you can edit and live view your changes in both front and backend apps.

In order to run this application, you need to have npm (Node Package Manager) installed.
It comes with Node.js.

* [Node.js and NPM](https://www.npmjs.com/get-npm) - Installation guide for Node.js and NPM
* [Python 3.6 or higher](https://www.python.org/downloads/release/python-375/)


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
I advise to go through tutorial linked below, which I based flask API.

[Python guide I followed for creating basic flask api structure.](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.freecodecamp.org%2Fnews%2Fstructuring-a-flask-restplus-web-service-for-production-builds-c2ec676de563%2F%3Ffbclid%3DIwAR1LUt_GeIZ06S-Kya47OTK_mrMGPRE2xo6LJbICbOJ2TVn5DePJc5_CjDc&h=AT0mpNo-RsrYWfU6FlDtP0bVP-k7ooMx-7ktWf0M1efelTPkLQJqRDEMV4pdl2KH1z_wzz7gXltFT43cUNviW97zlIL7JTQT0-mRtI6shGUgSxNR3so6p2wh1CQxL_QAmBhS9A)

In the **Pop-Grupa-A-Backend** project directory, you can run:

### `pip install requirements.txt`

Installs required dependencies for starting up the project.
(it might take a while, so wait patiently)

Next, when you have your local postgres database __balticlsc__ created with user __admin__ and password __123456__ run:
### `python manage.py db upgrade` -- applies migration to database

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
Migration to database in __entrypoint.sh__ might not be applied due to windows line endings.
To fix that, you may have to go inside API container and run the script automatically.
- `docker exec -it backend-pop sh` - this command moves you inside the container
- `python manage.py db upgrade` - runs migration to postgres database
## Note2:
If you want to browse docker-created database, run those commands:
- `docker exec -it postgres sh`
- `psql -U admin balticlsc`

[How to link pull request in GitHub to Azure Devops Board](https://docs.microsoft.com/en-us/azure/devops/boards/github/link-to-from-github?view=azure-devops)  
[![Board Status](https://dev.azure.com/popgrupaa/4e25e485-1bc5-4995-b7ba-e037895d93fc/5026bfd1-15a0-451c-8d86-8ba02e2a81c5/_apis/work/boardbadge/c475f19d-f275-4e12-9765-2b8b3332eb38)](https://dev.azure.com/popgrupaa/4e25e485-1bc5-4995-b7ba-e037895d93fc/_boards/board/t/5026bfd1-15a0-451c-8d86-8ba02e2a81c5/Microsoft.RequirementCategory/)
