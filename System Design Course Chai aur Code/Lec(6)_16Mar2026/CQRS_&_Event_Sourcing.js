
//(2)Problem Statement: We are sending message regularly to 100 people but one day message stop working while the same 100 message? what is the problem?
//Queue starvation  when a one big client send a million of message after you cannot able to send single message
// Solution: Transitional Promotional

//Duration after 1hr
//<============CQRS(Command Query Responsibility Segregation) ======================>
//  Crud heavy application like Amazon   
// CQRS (Command Query Responsibility Segregation)
// CQRS is a design pattern that separates write operations (Commands) from read operations (Queries).
// Instead of using the same model/database for both reading and writing, CQRS uses separate models optimized for each.

// Without CQRS (Traditional CRUD)

//                 Client
//                    │
//           ┌────────┴────────┐
//           │                 │
//       Read Data        Write Data
//           │                 │
//           └────────┬────────┘
//                    │
//              Single Database

// Both reads and writes use the same database.

// # With CQRS

//                    Client
//                       │
//          ┌────────────┴────────────┐
//          │                         │
//      Command (Write)          Query (Read)
//          │                         │
//    Write Database            Read Database
//          │                         ▲
//          └──────────┬──────────────┘
//                     │
//             Data Synchronization

// The write database handles inserts/updates/deletes, while the read database is optimized for fetching data.

// # What is a Command?

// A Command changes data.

// Examples:
// * Create User
// * Update Profile
// * Place Order
// * Delete Product

// Example:
// POST /orders
// {
//   "productId": 101,
//   "quantity": 2
// }
// This creates a new order.

// # What is a Query?

// A Query only reads data.

// Examples:
// * Get User
// * Get Orders
// * Search Products
// * Dashboard Analytics

// Example:
// GET /orders/101
// No data is modified.

// Real-World Example: Amazon

// Suppose 10 million users visit Amazon.

// ### Write Operations
// * Place Order
// * Cancel Order
// * Update Address
// * Add to Cart
// These are relatively fewer.

// ### Read Operations
// * View Products
// * Search Products
// * View Reviews
// * View Recommendations

// These happen far more often.

// Instead of overloading one database:
// Write Requests → Write DB

// Read Requests → Read DB

// The read database can have multiple replicas to serve heavy traffic efficiently.

// # Banking Example
// ### Commands
// Deposit ₹1000

// Withdraw ₹500

// Transfer ₹200

// These modify account data.
// ### Queries
// Check Balance

// View Transactions

// Mini Statement

// These only retrieve information.

// # CQRS + Event Sourcing

// CQRS is often combined with **Event Sourcing**.

// User Places Order
//         │
//         ▼
// Command
//         │
// Write Database
//         │
// OrderCreated Event
//         │
// Kafka / RabbitMQ
//         │
// Read Database Updated

// Flow:
// 1. User places an order.
// 2. The command updates the write model.
// 3. An event (`OrderCreated`) is published.
// 4. Consumers update the read model.

// # Advantages
// 1. Faster Reads
// The read database can be optimized specifically for queries.
// 2. Better Scalability
// You can scale reads and writes independently.

// Example:
// 10 Write Servers

// 100 Read Servers

// 3. Better Performance
// Read-heavy applications (e-commerce, dashboards, reporting) perform much better.

// 4. Separation of Responsibilities
// Write logic stays focused on business rules.
// Read logic stays focused on fast data retrieval.
// This makes code easier to maintain.

// 5. Flexible Data Models
// The read model can be designed differently from the write model.
// Example:
// Write Model
// {
//   "userId": 1,
//   "productId": 101,
//   "quantity": 2
// }

// Read Model
// {
//   "orderId": 1,
//   "customerName": "Noor",
//   "productName": "Laptop",
//   "price": 65000
// }

// The read model is optimized for display.
// # Disadvantages
// * More complex architecture
// * Additional infrastructure to maintain
// * Data synchronization between read and write models
// * Read data may be **eventually consistent**, meaning it can be slightly behind the latest write

// # When to Use CQRS
// Use CQRS when:
// * Large-scale systems
// * Read traffic is much higher than write traffic
// * Complex business logic
// * Microservices architecture
// * Event-driven systems
// * High-performance dashboards

// # When Not to Use CQRS
// Avoid CQRS for:
// * Small CRUD applications
// * Simple admin panels
// * Small startups with low traffic
// * Projects where the added complexity isn't justified

// # Interview Comparison

// | Traditional CRUD                | CQRS                                                      |
// | ------------------------------- | --------------------------------------------------------- |
// | Same model for reads and writes | Separate models for reads and writes                      |
// | Easier to implement             | More complex                                              |
// | Harder to scale independently   | Read and write sides scale independently                  |
// | Good for small apps             | Good for large systems                                    |
// | Single database                 | Separate read and write models (often separate databases) |

// # Real Companies Using CQRS
// CQRS concepts are commonly used in large-scale systems at companies such as:

// * Netflix
// * Amazon
// * Uber
// * Microsoft
// * LinkedIn

// # Interview Answer (30 Seconds)
// > CQRS (Command Query Responsibility Segregation) is an architectural pattern that separates write operations (commands) from read operations (queries).
//  Commands modify data, while queries only retrieve data. By using separate models or databases
//  for reads and writes, applications can scale each side independently, optimize performance, and simplify business logic. CQRS is commonly used in large-scale,
//   event-driven, and microservices-based systems, and is often paired with Event Sourcing.**
