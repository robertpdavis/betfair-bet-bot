const path = require('path');
const axios = require('axios');
//Node:https and fs use for managing login SSL cert requirements
const https = require('node:https');
const fs = require('fs');

class Betfairapi {

  constructor() {
    //Hold the session and APIKey when logging in for future requests
    this.sessionId = '';
    this.apiKey = '';
    this.apiEndPoints = {
      'login': 'https://identitysso-cert.betfair.com/api/certlogin',
      'keepAlive': 'https://identitysso.betfair.com.au/api/keepAlive',
      'logout': 'https://identitysso.betfair.com/api/logout',
      'bettingAPi': 'https://api.betfair.com/exchange/betting/json-rpc/v1',
      'accountAPi': 'https://api.betfair.com/exchange/account/json-rpc/v1'
    }
  }

  async login(apiSettings) {
    try {
      //TO DO: Check if session active
      let appKey = "";

      //Convert string cert and key files into a byte buffer for sending to Betfair server
      const certFile = Buffer.from(apiSettings.certfile, 'utf-8');
      const keyFile = Buffer.from(apiSettings.keyfile, 'utf-8');

      //Check if loggin in with live or test key
      if (apiSettings) {
        if (apiSettings.apiMode === 'Live') {
          appKey = apiSettings.apiKeyLive;
        } else if (apiSettings.apiMode === 'Test') {
          appKey = apiSettings.apiKeyTest;
        } else {
          //ERROR
          return [false, "No API key"];
        }
      } else {
        //ERROR
        return [false, "API settings not provided."];
      }

      //Setup req header and body details
      const data = `username=${apiSettings.apiUsername}&password=${apiSettings.apiPassword}`;
      const headers = {
        'Content-type': 'application/x-www-form-urlencoded',
        'X-Application': appKey,
        'Accept': 'application/json'
      }
      //Setup SSL required by Betfair for login only
      const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
        cert: certFile,
        key: keyFile,
      });

      const res = await axios(
        {
          method: 'post',
          url: this.apiEndPoints.login,
          data: data,
          headers: headers,
          httpsAgent: httpsAgent
        }
      );

      if (res.status !== 200) {
        return [false, 'Betfair login connection error.'];
      }

      if (res.data.loginStatus === 'SUCCESS') {
        return [true, res.data.sessionToken];
      } else {
        return [false, res.data.loginStatus];
      }
    } catch (e) {
      return [false, e];
    }
  }

  async keepAlive(apiSettings) {
    try {
      let appKey = "";
      let session = "";

      //Check if doing keepAlive for live or test key
      if (apiSettings) {
        if (apiSettings['apiMode'] === 'Live') {
          appKey = apiSettings['apiKeyLive'];
          session = apiSettings['liveSessionId'];
        } else if (apiSettings['apiMode'] === 'Test') {
          appKey = apiSettings['apiKeyTest'];
          session = apiSettings['testSessionId'];
        } else {
          //ERROR
          return [False, "NO_API_KEY"];
        }
      } else {
        //ERROR
        return [False, "API_SETTINGS_MISSING"];
      }

      //Setup req header details
      const headers = {
        'Accept': 'application/json',
        'X-Authentication': session,
        'X-Application': appKey,
      }

      const res = await axios(
        {
          method: 'get',
          url: this.apiEndPoints.keepAlive,
          headers: headers,
        }
      );

      if (res.data.status !== 'SUCCESS') {
        return [false, res.error];
      } else {
        return [true, res.status];
      }
    } catch (e) {
      return [false, e];
    }
  }

  async logout(apiSettings) {
    try {
      let appKey = "";
      let session = "";

      //Check if doing keepAlive for live or test key
      if (apiSettings) {
        if (apiSettings['apiMode'] === 'Live') {
          appKey = apiSettings['apiKeyLive'];
          session = apiSettings['liveSessionId'];
        } else if (apiSettings['apiMode'] === 'Test') {
          appKey = apiSettings['apiKeyTest'];
          session = apiSettings['testSessionId'];
        } else {
          //ERROR
          return [False, "NO_API_KEY"];
        }
      } else {
        //ERROR
        return [False, "API_SETTINGS_MISSING"];
      }

      //Setup req header details
      const headers = {
        'Accept': 'application/json',
        'X-Authentication': session,
        'X-Application': appKey,
      }

      const res = await axios(
        {
          method: 'get',
          url: this.apiEndPoints.logout,
          headers: headers,
        }
      );

      if (res.data.status !== 'SUCCESS') {
        return [false, res.data.error];
      } else {
        return [true, res.data.status];
      }
    } catch (e) {
      return [false, e];
    }
  }

  async getAllEventTypes() {

    const apiOp = 'listEventTypes';
    const params = '{"filter":{}}';

    const res = await this.BettingAPIRequest(apiOp, params);

    //Get result from response
    if (res[0]) {
      res[1] = res[1].result
    }

    return res;
  }

  async getEventTypeId(eventTypeName) {

    const res = await this.getAllEventTypes();

    if (res[0]) {
      const result = res[1][0].result;
      for (var i = 0; i <= Object.keys(result).length; i++) {
        if (result[i].eventType.name === eventTypeName) {
          return [true, result[i].eventType.id];
        }
      }
    } else {
      return res;
    }
  }

  async getEvents(params) {
    const apiOp = 'listEvents';
    const res = await this.BettingAPIRequest(apiOp, params);

    if (res[0]) {
      res[1] = res[1].result;
    }

    return res;
  }

  async getMarkets(params) {
    const apiOp = 'listMarketCatalogue';
    const res = await this.BettingAPIRequest(apiOp, params);

    if (res[0]) {
      res[1] = res[1].result;
    }

    return res;
  }

  async getMarketBook(params) {
    const apiOp = 'listMarketBook';
    const res = await this.BettingAPIRequest(apiOp, params);

    if (res[0]) {
      res[1] = res[1].result;;
    }

    return res;
  }

  async getRunnerBook(params) {

    const apiOp = 'listRunnerBook';
    const res = await this.BettingAPIRequest(apiOp, params);

    if (res[0]) {
      res[1] = res[1].result;;
    }
  }

  async placeBet(params) {

    const apiOp = 'placeOrders';
    const res = await this.BettingAPIRequest(apiOp, params);

    if (res[0]) {
      res[1] = res[1].result;;
    }

  }

  async BettingAPIRequest(operation, params) {
    try {
      //Data string for betfair jsonrpc request. Made up of API operation and associated required parameters
      const jsonRPCReq = '[{"jsonrpc":"2.0","method":"SportsAPING/v1.0/' + operation + '", "params": ' + params + ', "id": 1}]';
      //Betfair betting API URL
      const url = this.apiEndPoints.bettingAPi;
      //Setup request headers which requires API key and session
      const headers = {
        'Content-type': 'application/json',
        'X-Application': this.apiKey,
        'Accept': 'application/json',
        'X-Authentication': this.sessionId
      }

      const res = await axios(
        {
          method: 'post',
          url: url,
          data: jsonRPCReq,
          headers: headers,
        }
      );

      //Get the data from the response
      const resData = res.data[0]

      // console.log("Params:", params);
      // console.log("Response:", resData);


      //Manage error return
      if (resData.error != null) {
        //Detailed error message
        if (Object.keys(resData.error).length > 2) {
          return [false, JSON.stringify(resData.error.data.APINGException)];
        } else {
          //No details
          return [false, "Betting API Request error"];
        }

      } else {
        //Return the data
        return [true, res.data[0]];
      }
    } catch (e) {
      return [false, e];
    }
  }
}

module.exports = Betfairapi;






