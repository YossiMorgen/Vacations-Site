# alpine OS  + node.js
FROM node:18-alpine3.16

# Global instlations needed to run our app:
RUN npm i -g ts-node
RUN npm i -g nodemon

# Create folder for our app:
WORKDIR /app

# Copy only package.json into /app directory
COPY package*.json /app

# Run command npm i to restore node_modules:
RUN npm i

# Copy files form our machine to the image:
COPY . /app

# Execute command:
ENTRYPOINT npm i && npm start

## Build the image, -t = tag, . is the current folder
# docker build -t <image-name> .

## Create container with port binding --> host:container 
# docker create --name kittens-container -p 5000:3001  kittens-image

## Create container with Environment variable --> key=vlaue 
# docker create --name kittens-container -p 5000:3004 -e PORT=3004  kittens-image

##
# docker start <container-name>
# docker stop <container-name>

# docker rm <container name>
# docker rmi <image name>

## List of all images in the host
# docker images

## List of only running continers
# docker ps

## List of all continers
# docker ps -a