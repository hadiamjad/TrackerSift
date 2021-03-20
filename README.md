# CaptureNetworkCallStacks
> only files in seperate folders are relevant. Rest are for testing and error finding.

## Pre-requisitives
### server: 
```
npm install
```
### selenium automation
1. chrome driver
2. Selenium
3. pandas 

### chrome_extension
nothing

### mongoDB local
You need to set-up mongoDB locally and provide appropriate URI string in server.js file

## Working
1. start the local server after installing
```
node server.js
```
wait untill database connection is established
P.S make your URI is updated with apprpriate credentials

2. Before starting selenium automation code, provide appropriate link to unpacked extension and list of sites url that you want to visit and then run the traces.py 
