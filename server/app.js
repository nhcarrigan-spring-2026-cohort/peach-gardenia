const express = require('express');
const app = express();
const port = 3000;

const { mountRoutes } = require('./routes/index');

mountRoutes(app);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
