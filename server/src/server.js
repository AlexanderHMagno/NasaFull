//Separating express JS from the HTTP model, will allow us to use websockets as another protocol in this file.
//Imaging that app.js is controling the web server and another file will handeling websocked for realt time communication
//using other protocol....

const HTTP = require("http");

const app = require("./app");
const { loadPlanets } = require("./models/planets.model");

const server = HTTP.createServer(app);

const PORT = process.env.PORT || 8000;

//use a node pattern to make sure the data you need is loaded previously

async function startServer() {
  //Make sure the planets are loaded before
  await loadPlanets();
  server.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`);
  });
}

startServer();
