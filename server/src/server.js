const http = require('http');

const app = require('./app');
const { mongooseConnect } = require('./services/mongo');
const { loadPlanetsData } = require('./models/planets.model');
const { loadLaunchData } = require('./models/launches.model');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function start() {
    await mongooseConnect();

    await loadPlanetsData();
    await loadLaunchData();

    server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}

start();