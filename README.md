# Betfair Bet Bot

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description
"Online web app providing automated betting systems for Betfair users. This includes automated backend update API calls from the server to the Betfair API point. Users can set up detailed betting systems within the scope of the Betfair API.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [Licence](#Licence)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

Several scripts are set up in the root package.json to manage distribution build and running the app as follows:
* start: node server/server.js,
* develop: concurrently \cd server && npm run watch\ \cd client && npm start\,
* install: cd server && npm i && cd ../client && npm i,
* seed: cd server && npm run seed,
* build: cd client && npm run build

Running install will install all the required client and server dependancies. This is a React web app.

Note: Two env vars are required to hold secrets for encrption:
*JWT_SECRET
*ENCRYPT_SECRET

### File structure of the application:
```md
.
├── client/public          // contains public standard folders and files with default base html page
├── client/src             // contains src standard folders and files with the addition of React pages and components folders
├── client/src/utils       // contains the Auth for JWT Decode and Apollo/graphQL queries and mutations
├── server/classes         // contains two classes to control the Betfair API and logic.
├── server/utlis           // contains additional logic helper files for the app
├── .gitignore             // indicates which folders and files Git should ignore 
├── LICENCE                // licence file      
```
Note: The root, client and server folders each have seperate package.json files that setup required app and dev dependencies.

NOTE: There is a scheduler.js file in the Server/Utils that uses a setInterval timer to automatically request data from the Betfair API. These automatted proceses do the following:
* Event update every 4 hours
* API keepalive every hour
* PlaceBets every 15 seconds
* Bet update every 15 seconds (alternate to placebets-offset by 7 sedonds)

The following mongoDb database schemas are used:
* Apisettings - holds the Betfair API settings and status data
* Condfig - holds global system config values
* Event - holds all system event data
* EventTypes - a list of current Betfair event types
* Market - holds all the market data for each event
* Result - holds all bet and bet result data
* Runner - holds all the market runner data
* Scenario - holds the template scenarios data
* Staking Plan - holds the template staking plan data
* System - holds all sytem configuration and statistical data
* Transaction - all account/wallet transactions
* User

### NOTE: App is currently deployed on AWS EC2 instance: http://ec2-54-206-10-245.ap-southeast-2.compute.amazonaws.com


## Usage

Usage of the app can be found in the apps support page which has been copied here:

### Dashboard
The Dashboard provides a summary of your current betting status along with details of all active betting systems and the last 4 bets placed.

### Systems
Systems is where all the action happens. This page lists all your systems and status of each one. Clicking on the name of the system. Systems can be started, stopped, copied (future) and archived (future). The system stats can also be reset.

There are 4 tabs for
* System Details - includes the systems main details including the event type, scenario and staking plans.
* System Stats - Overview of the system stats
* System Limits - Limits can be set on a variety on stats so that your system is autimatically stopped when reched.
* Bet Settings - These settings determine when a bet is made and the stake of the bet throught scenarios and staking plans.
* System Filter Settings - A comprehensive set of fields to zero down on the events and markets you want to consider bets on.

### Events
The Events page provides all relevant event and market details for the system that the betting will be based upon. Clicking on the time will provide details about the market.

### Results
The Results page provides details on all bets made for a system and their status. Clicking on the bet provides full details of the bet and status.

### API
The API page is where all the connection information required for the Betfair API and current status. Your Befair username and password is required along with SSL certificate informaton and API keys. All this is needed to be able to log into Betfair so you can activate your betting systems.


## Credits
Rob Davis Github: [robertpdavis](https://github.com/robertpdavis)

## Licence
MIT License

## Contributing
Please contact me at: robertpdavis@optusnet.com.au

## Tests
No tests are currently included.

## Questions
* Github: [robertpdavis](https://github.com/robertpdavis)
* Email: robertpdavis@optusnet.com.au

## Screenshots
![Webpage screenshot](https://github.com/robertpdavis/betfair-bet-bot/blob/main/screenshots/Dashboard.png "Screenshot of Dashboard")
![Webpage screenshot](https://github.com/robertpdavis/betfair-bet-bot/blob/main/screenshots/Systems.png "Screenshot of Systems")
![Webpage screenshot](https://github.com/robertpdavis/betfair-bet-bot/blob/main/screenshots/System.png "Screenshot of System")
![Webpage screenshot](https://github.com/robertpdavis/betfair-bet-bot/blob/main/screenshots/Events.png "Screenshot of Events")
![Webpage screenshot](https://github.com/robertpdavis/betfair-bet-bot/blob/main/screenshots/Market.png "Screenshot of Market")
![Webpage screenshot](https://github.com/robertpdavis/betfair-bet-bot/blob/main/screenshots/Results.png "Screenshot of Results")
![Webpage screenshot](https://github.com/robertpdavis/betfair-bet-bot/blob/main/screenshots/Result.png "Screenshot of Result")
![Webpage screenshot](https://github.com/robertpdavis/betfair-bet-bot/blob/main/screenshots/Api.png "Screenshot of API")
