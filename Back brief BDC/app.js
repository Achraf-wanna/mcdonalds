require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');

var cors = require('cors')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PATCH, POST, OPTIONS, PUT, DELETE");
  next();
});

const categoryRouter = require('./routes/category')
const subcategoryRouter = require('./routes/subcategory')
const produitRouter = require('./routes/produit')
const extraRouter = require('./routes/extra')
const commandeRouter = require('./routes/commande')
const promocodeRouter = require('./routes/promocode')
const cardfideleRouter = require('./routes/cardfidele')

//db
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true})
const db = mongoose.connection
db.on('error',(error) => console.error(error))
db.once('open', () => console.log('connected to Database'))

//use

app.use(express.json())

app.use('/category' , categoryRouter)
app.use('/subcategory' , subcategoryRouter)
app.use('/produit' , produitRouter)
app.use('/extra' , extraRouter)
app.use('/commande' , commandeRouter)
app.use('/promocode' , promocodeRouter)
app.use('/cardfidele' , cardfideleRouter)





app.listen(3000, () => console.log('Running ...'));