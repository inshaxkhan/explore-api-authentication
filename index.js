import dotenv from "dotenv";
dotenv.config();

import express from "express";
import axios from "axios";


const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";


const yourUsername = process.env.USERNAME;
const yourPassword = process.env.PASSWORD;
const yourAPIKey = process.env.API_KEY;
const yourBearerToken = process.env.BEARER_TOKEN;


const describe="API Authentication: Protects sensitive data. Ensures only authorized users can access endpoints. Tracks and limits API usage."
const describe1="Public Access Endpoint: /random . No credentials or keys required. Anyone can access the API. Useful for public or sample data.";
const describe2="Basic Authentication: Username & Password. Endpoint: /all?page=1 , Credentials passed in request header (Base64 encoded). Simple but not secure over HTTP (use HTTPS).";
const describe3="API Key Authentication : Static Key in Query Param. Endpoint: /filter?score=5&apiKey=... API key sent as part of the URL query. Often used for rate-limiting and usage tracking.";
const describe4="4. Bearer Token Authentication: OAuth2 Access Token. Endpoint: /secrets/:id. Token sent in Authorization header. More secure; used for user-specific access.";
app.get("/", (req, res) => {
  res.render("index.ejs", { content: "", msg:describe, color:"white" });
});

app.get("/noAuth", async (req, res) => {

  try {
    const result=await axios.get(API_URL+'/random');
    res.render("index.ejs", { content: result.data, msg:describe1, color:"#90CAF9"});
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/basicAuth", async(req, res) => {
  try {
    const result=await axios.get(API_URL+'/all?page=2',{
      auth:{
        username:yourUsername,
        password:yourPassword,
      },

    });
    res.render("index.ejs",{content: result.data, msg:describe2, color:"#A5D6A7"})
  } catch (error) {
    res.status(404).send(error.message)
  }

});

app.get("/apiKey", async(req, res) => {
  try {
    const result=await axios.get(API_URL+"/filter",{
      params:{
        score:5,
        apiKey:yourAPIKey,
      }
    });

    res.render("index.ejs",{content: result.data, msg:describe3, color:"#FFE082"})
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/bearerToken", async(req, res) => {
  try {
    const result=await axios.get(API_URL+'/secrets/42',{
      headers:{
        Authorization:`Bearer ${yourBearerToken}`
      }
    });

    res.render("index.ejs",{content:result.data, msg:describe4, color:"#EF9A9A"});
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
