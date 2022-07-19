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
      'bettingAPi': 'https://api.betfair.com/exchange/betting/json-rpc/v1'
    }
  }

  async login(apiSettings) {
    //TO DO: Check if session active
    let appKey = "";

    //Check if loggin in with live or test key
    if (apiSettings) {
      if (apiSettings['apiMode'] === 'Live') {
        appKey = apiSettings['apiKeyLive'];
      } else if (apiSettings['apiMode'] === 'Test') {
        appKey = apiSettings['apiKeyTest'];
      } else {
        //ERROR
        return [False, "NO_API_KEY"];
      }
    } else {
      //ERROR
      return [False, "API_SETTINGS_MISSING"];
    }

    //Setup req header and body details
    const data = `username=${apiSettings['userName']}&password=${apiSettings['passWord']}`;
    const headers = {
      'Content-type': 'application/x-www-form-urlencoded',
      'X-Application': appKey,
      'Accept': 'application/json'
    }
    //Setup SSL certs required by Betfair for login
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
      cert: fs.readFileSync('./classes/certs/client-2048.crt'),
      key: fs.readFileSync('./classes/certs/client-2048.key'),
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
      console.log('Betfair login connection error.');
      return [false, 'Betfair login connection error.'];
    }

    if (res.data.loginStatus === 'SUCCESS') {
      this.sessionId = res.data.sessionToken
      this.apiKey = appKey;
      return [true, res.data.sessionToken];
    } else {
      console.log('Betfair login error:', res.data.loginStatus);
      return [false, res.data.loginStatus];
    }
  }

  async keepAlive(apiSettings) {
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

    if (res.status !== 'SUCCESS') {
      console.log('Betfair connection error.');
      return [false, res.error];
    } else {
      return [true, res.status];
    }
  }

  async logout(apiSettings) {
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

    if (res.status !== 'SUCCESS') {
      console.log('Betfair connection error.');
      return [false, res.error];
    } else {
      return [true, res.status];
    }
  }

  async getAllEventTypes() {

    const apiOp = 'listEventTypes';
    const params = '{"filter":{}}';

    const res = await this.BettingAPIRequest(apiOp, params);

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
      res[1] = res[1][0].result;
    }

    return res;
  }

  async getMarkets(params) {
    const apiOp = 'listMarketCatalogue';
    const res = await this.BettingAPIRequest(apiOp, params);

    if (res[0]) {
      res[1] = res[1][0].result;
    }

    return res;
  }

  async getMarketBook(params) {
    const apiOp = 'listMarketBook';
    const res = await this.BettingAPIRequest(apiOp, params);

    if (res[0]) {
      res[1] = res[1];
    }

    return res;
  }

  async getRunnerBook(params) {

    const apiOp = 'listRunnerBook';
    const res = await this.BettingAPIRequest(apiOp, params);

    return res;
  }

  async placeBet(params) {

    const apiOp = 'placeOrders';
    const res = await this.BettingAPIRequest(apiOp, params);

    return res;

  }

  async BettingAPIRequest(operation, params) {

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

    //Manage error return
    if (res.error != null) {
      //Detailed error message
      if (Object.keys(res.error).length > 2) {
        return [false, JSON.stringify(res.error.data.APINGException, null, DEFAULT_JSON_FORMAT)];
      } else {
        //No details
        return [false, "Betting API Request error"];
      }

    } else {
      //Retunr the data
      return [true, res.data];
    }
  }
}

module.exports = Betfairapi;






