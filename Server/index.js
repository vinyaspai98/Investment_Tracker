const app = require('express')()
var bodyParser = require('body-parser')
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));

const {AddInvestment} = require('./investment');

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.get('/addinvestment',AddInvestment);

app.listen(3000,()=>{
    console.log("Server is running in 3000");
  })
  .on('error',console.log);