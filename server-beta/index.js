const express = require('express');
const cors = require('cors');
const mountRoutes = require('./routes');

const app = express();
const port = 3000;

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
};
app.use(cors(corsOptions));

app.use(express.json());

mountRoutes(app);

app.get('/', (req, res)=>{
    res.send(`system beta - server`)
});

app.listen(port, ()=>{
    console.log(`server-beta listening on port ${port}`)
})