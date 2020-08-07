# E-Commerce Database

In this homework, you are going to work with an ecommerce database. In this database, you have `products` that `consumers` can buy from different `suppliers`. Customers can create an `order` and several products can be added in one order.

## Submission

Below you will find a set of tasks for you to complete to set up a databases of students and mentors.

To submit this homework write the correct commands for each question here:

```sql


```

When you have finished all of the questions - open a pull request with your answers to the `Databases-Homework` repository.

## Setup

To prepare your environment for this homework, open a terminal and create a new database called `cyf_ecommerce`:

```sql
createdb cyf_ecommerce
```

Import the file [`cyf_ecommerce.sql`](./cyf_ecommerce.sql) in your newly created database:

```sql
psql -d cyf_ecommerce -f cyf_ecommerce.sql
```

Open the file `cyf_ecommerce.sql` in VSCode and make sure you understand all the SQL code. Take a piece of paper and draw the database with the different relations between tables. Identify the foreign keys and make sure you understand the full database schema.

## Task

Once you understand the database that you are going to work with, solve the following challenge by writing SQL queries using everything you learned about SQL:

1. Retrieve all the customers names and addresses who lives in United States
<!-- select * from customers where country = 'United States'; -->
2. Retrieve all the customers ordered by ascending name
<!-- select name from customers order by name asc  -->
3. Retrieve all the products which cost more than 100
<!-- select * from products where unit_price > 100 -->
4. Retrieve all the products whose name contains the word `socks`
<!-- select * from products where product_name  like '%socks%'; -->
5. Retrieve the 5 most expensive products
<!-- select * from products where unit_price > 40 -->
6. Retrieve all the products with their corresponding suppliers. The result should only contain the columns `product_name`, `unit_price` and `supplier_name`
<!-- select * from products join suppliers on products.supplier_id = suppliers.id REVISAR -->
7. Retrieve all the products sold by suppliers based in the United Kingdom. The result should only contain the columns `product_name` and `supplier_name`.
<!-- select product_name, supplier_name from products join suppliers on products.supplier_id =suppliers.id where suppliers.country ='United Kingdom' -->
8. Retrieve all orders from customer ID `1`
<!-- select * from orders where customer_id =1 -->
9. Retrieve all orders from customer named `Hope Crosby`
<!-- select * from orders join customers on orders.customer_id = customers.id where name ='Hope Crosby'; -->

10. Retrieve all the products in the order `ORD006`. The result should only contain the columns `product_name`, `unit_price` and `quantity`.
<!-- select product_name,unit_price,quantity from products join order_items on products.id=order_items.product_id  join orders on orders.id=order_items.order_id where order_reference ='ORD006';  -->

11. Retrieve all the products with their supplier for all orders of all customers. The result should only contain the columns `name` (from customer), `order_reference` `order_date`, `product_name`, `supplier_name` and `quantity`.
<!-- select name,order_reference,order_date,product_name,supplier_name,quantity from customers 
join orders on customers.id=orders.customer_id
join order_items on orders.id = order_items.order_id 
join products on products.id = order_items.product_id 
join suppliers on suppliers.id = products.supplier_id  -->

12. Retrieve the names of all customers who bought a product from a supplier from China.
<!-- select name from customers 
join orders on customers.id=orders.customer_id
join order_items on orders.id = order_items.order_id 
join products on products.id = order_items.product_id 
join suppliers on suppliers.id = products.supplier_id where suppliers.country ='China' -->
