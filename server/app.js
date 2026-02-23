const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors')
const { mountRoutes } = require('./routes/index');


app.use(cors())
app.use(express.json())
mountRoutes(app);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
