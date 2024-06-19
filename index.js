const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors module
// require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors()); 


app.use("/",(req,res) =>{
  res.json({msg:"HI Gi=uys thisi aagujhgifh"})
})

const questionRoutes = require('./routes/route');
const sign = require('./routes/user')

app.use('/api', questionRoutes);
app.use('/api/auth',sign);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
