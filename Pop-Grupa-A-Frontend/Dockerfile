# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /app/

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent

# start app

CMD ["npm", "start"]



# On windows open Powershell and go to project directory
# For building docker image run command below:
# docker build -t front-pop .
# front-pop -> will be image name

# In order to run the image , run command below
# docker run --v ${PWD}:/app -v /app/node_modules -p 3001:3000 --rm front-pop


