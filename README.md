Design Decisions:
RDMS - Migrated from sqlite to postgreSQL
REST APIs - CRUD operations for products,stores and stock_movement
Filtering - By date_range,store_id
Security - Role Based JWT-based authentication
Throttling - middleware express-rate-limit

Assumptions:
Role based authentication - Only admin can create/add, update and delete stores
Additional Middleware for admin authorization

API Design:
Method Endpoint Access Description
Register user/admin : POST /auth/register (Public)
Get JWT token : POST /auth/login (Public)
Add new store : POST /stores (Admin)
View products by store : GET /stores/:id/products
Stock summary : GET /stores/:id/stock-report
Add new product : POST /products (Admin)
Update stock : PUT /products/:id/stock
Record stock movement : POST /stock-movements
Filter stock logs : GET /stock-movements

Stage 3:
Scalability:
To make the system horizontally scalable,I will choose microservices architecture in order to build individual server for each services auth,inventory,audit_logs for stock_movement, increasing no of servers make the system horizontally scalable.
To implement this in code we can make multiple servers each for each service, handling frequent requests from the users while sharing the same database

Read/Write Seperation:
This can be implemented using pg package, creating two pools,one of them use primary Database for writes while the other use replicas for read.This can be obtained by ditributed database structure.

Caching:
I propose the solution for caching that we implement cache manually using alone server that provide frequent data loads and invalidated when the primary database is updated using read-through strategy.

Event-driven Updates:
For this, We will implement a queue that asynchronously tracks the changes and this will be consumed by any special worker that updated primary DataBase accordingly and also invalidates the implemented cache.
