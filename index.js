const express = require('express')
const app = express()
 require('dotenv').config()
const port = process.env.PORT || 5000;

const cors = require('cors')
const { MongoClient } = require('mongodb');
const fileupload = require('express-fileupload')

const ObjectId = require('mongodb').ObjectId



//middle ware//
app.use(cors ());
app.use(express.json());
app.use(fileupload())
//middle ware//




//NEW CONNECT to data base and node server code end//
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bs9pl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//NEW CONNECT to data base and node server code end//

async function run() {
    try {
        await client.connect();
        const database = client.db("e-commerce");
        const ProductColloction = database.collection("Product"); 
        const orderColloction = database.collection("order");
//*******************************all get api************************** */

//GEt  Find Multiple Documents Client site rea /d code//
        app.get('/Product',async(req, res) =>{
            const cursor = ProductColloction.find({});
            const Product= await cursor.toArray();
            res.send(Product)
        })

 //GEt  Find Multiple Documents Client site read code//

 // GET Find single data deatails Document Client site read code//
 app.get('/Product/:id',async (req, res) =>{
    const id = req.params.id;
    const query = {_id:ObjectId(id)};
    const Product = await ProductColloction.findOne(query);
    res.send(Product)
 })

 //find order data//
    app.get('/order',async(req, res) =>{
      const cursor = orderColloction.find({});
      const order= await cursor.toArray();
      res.send(order)
  })
 //find  order data//


// GET Find single data deatails  Document Client site read code//

//*******************************all get api end ************************** */



//********************all post api***********************************///
        // app.post('/Product',async(req, res)=>{
            app.post('/Product',async(req, res)=>{
                const Product = req.body;
                const result = await ProductColloction.insertOne( Product);
                res.send(result);  
            })

//order post api///
     app.post('/order',async(req, res)=>{
      const order = req.body;
     const result = await orderColloction.insertOne(order);
    res.send(result);  
    })
 //order post api///

            
 //********************all post api***********************************///
  
    
    
      } 
      
      finally {
        // await client.close();
      }

}

run().catch(console.dir);
app.get('/', (req, res) => {
    res.send('Hello World!')
  });
  app.listen(port, () => {
    console.log("Example" , port)
  });