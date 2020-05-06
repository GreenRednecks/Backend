# Backend
This is a CRUD interface for multiple applications

## Setup
To setup the server you need a system with x64 architecture we use a pi 3.
- Operating system is Ubuntu Server for pi. It is important to use a x64 image, otherwise you are not be able to install the corect MongoDB version. Here is a good Tutorial: https://ubuntu.com/tutorials/how-to-install-ubuntu-on-your-raspberry-pi 
- DB is MongoDB. We use version 4.X. Here is a simple setup guide: https://pimylifeup.com/mongodb-raspberry-pi/
- Server is Express. In Order to use it you need to install **nodejs**

## Startup
On first boot you should run
```
sudo apt update
sudo apt upgrade
```
To startup the server you need to copy all files to a knowen location switch to that location and install all dependencies.
- Install dependencies:
```
npm install
```
- Start the server:
```
node index.js
```
