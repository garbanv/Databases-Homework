const express = require('express');
const app = express();
const { Pool } = require('pg');



app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'cyf_ecommerce',
  password: '12345',
  port: 5432,
});

// app.get('/products', (req, res) => {
//   pool
//     .query(
//       `select product_name,supplier_name from products join suppliers on products.supplier_id = suppliers.id order by supplier_name `
//     )
//     .then((result) => res.json(result.rows))
//     .catch((e) => console.log(error(e)));
// });

app.get("/products/:productName", function (req, res) {
    const productName = req.params.productName;
    console.log(req.params.productName)
    pool
      .query('select product_name,supplier_name from products join suppliers on products.supplier_id = suppliers.id  where products.product_name like $1', [`%${productName}%`])
      .then((result) => res.json(result.rows))
      .catch((e) => console.error(e));
  });


  app.get("/customers/:id", (req,res)=>{
      const customerId = req.params.id;

      pool
        .query('select * from customers where id=$1',[customerId])
        .then(response=>res.json(response.rows[0]))
        .catch((e)=> console.error(e));
  })

  app.post("/customers/", (req,res)=>{
    const {name,address,city,country} = req.body;
    console.log(name)

    pool
      .query('INSERT INTO customers(name,address,city,country) values ($1,$2,$3,$4)',[name,address,city,country])
      .then(response=>res.status(201).json("Customer created"))
      .catch((e)=> console.error(e));
})


app.post("/customers/:customerId/orders", (req,res)=>{
    let customerId=req.params.customerId;
    let {orderDate,orderReference} = req.body;

    pool
        .query("Select * from customers WHERE customer.id = $1",[customerId])
        .then(results => {
            if(result.rowCount > 0){
                pool.query("INSERT INTO orders (order_date,order_reference,customer_id) VALUES ($1,$2,$3)", [orderDate,orderReference, customerId])
                    .then(result=>res.status(201).json("Creado con exito"))
            } else {
                return res.status(400).json("Something went wrong")
            }
        })
        .catch((e=>console.error(e)))
})

app.listen(3500, () => console.log('server active'));
