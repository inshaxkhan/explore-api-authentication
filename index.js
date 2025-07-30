import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "inshaxkhan";
const yourPassword = "Insha@01";
const yourAPIKey = "1d8540bd-7d93-4312-8a55-7071b8105d6c";
const yourBearerToken = "a158cf54-6996-47c4-ac35-5145b15a121d";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {

  try {
    const result=await axios.get(API_URL+'/random');
    res.render("index.ejs", { content: result.data});
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
    res.render("index.ejs",{content: result.data})
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

    res.render("index.ejs",{content: result.data})
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

    res.render("index.ejs",{content:result.data});
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
