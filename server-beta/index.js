const express = require('express');
const cors = require('cors');
const mountRoutes = require('./routes');

const app = express();
mountRoutes(app);
const port = 3000;

// const corsOptions = {
//     origin: '*',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// };
//
// app.use(cors(corsOptions));

// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
// });

app.use(express.json());

app.get('/', (req, res)=>{
    res.send(`system beta - server`)
});

app.listen(port, ()=>{
    console.log(`server-beta listening on port ${port}`)
})