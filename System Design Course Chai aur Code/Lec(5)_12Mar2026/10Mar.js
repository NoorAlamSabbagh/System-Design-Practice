//Question(1)Customer getting order in different order while request send by Rider due to worker(Queue did not guarantee the order of the messages)?
// Answer: SQS Vs Kafka Vs BullMQ
// https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html

// All three—Kafka, BullMQ, and Amazon SQS—are used to handle asynchronous tasks, but they serve different purposes.

// | Feature         | Kafka                              | BullMQ               | Amazon SQS                     |
// | --------------- | ---------------------------------- | -------------------- | ------------------------------ |
// | Primary Purpose | Event streaming                    | Background job queue | Cloud message queue            |
// | Storage         | Distributed log                    | Redis                | AWS-managed queue              |
// | Best For        | Real-time data streaming           | Background jobs      | Decoupling microservices       |
// | Ordering        | Per partition                      | FIFO (per queue)     | Standard (best effort) or FIFO |
// | Scalability     | Very high (millions of events/sec) | Moderate             | High                           |
// | Persistence     | Long-term event retention          | Until job completes  | Until message is consumed      |
// | Infrastructure  | Kafka brokers                      | Redis                | Fully managed by AWS           |

// ## 1. Kafka (Event Streaming)

// **Purpose:** Stream events between systems in real time.

// Example:

// ```
// User places an order
//       ↓
// Kafka Topic: orders
//       ↓
// Inventory Service
// Payment Service
// Notification Service
// Analytics Service
// ```

// ### Use when:

// * Processing millions of events
// * Event-driven architecture
// * Real-time analytics
// * Multiple services need the same event

// Example:

// * Uber trip events
// * Banking transactions
// * Stock market data
// * User activity tracking

// ---

// ## 2. BullMQ (Background Job Queue)

// **Purpose:** Run time-consuming tasks in the background using Redis.

// Example:

// ```
// User uploads image
//       ↓
// API responds immediately
//       ↓
// BullMQ Queue
//       ↓
// Worker resizes image
// Worker uploads to S3
// Worker sends email
// ```

// ### Use when:

// * Sending emails
// * Generating PDFs
// * Image/video processing
// * Scheduled jobs
// * Retry failed jobs

// Example:

// ```js
// queue.add("sendEmail", {
//   email: "abc@gmail.com"
// });
// ```

// Worker:

// ```js
// worker.process(async(job)=>{
//    sendEmail(job.data.email);
// });
// ```

// ---

// ## 3. Amazon SQS (Simple Queue Service)

// **Purpose:** Reliable message delivery between services in AWS.

// Example:

// ```
// Order Service
//       ↓
// Amazon SQS
//       ↓
// Shipping Service
// ```

// Even if the Shipping Service is down, the message stays in the queue until it is processed.

// ### Use when:

// * Microservices communication
// * AWS architecture
// * Reliable message delivery
// * Loose coupling between services

// Example:
// Payment Service
//         ↓
//       SQS Queue
//         ↓
// Invoice Service
//         ↓
// Email Service

// # Simple Analogy
// Imagine an online shopping website.
//BullMQ
// Kitchen order system in a restaurant.
// Customer orders food.
// The waiter immediately confirms the order.
// The kitchen prepares it in the background.

// ➡️ Background jobs.

// ---

// ### Kafka

// News broadcasting.

// A TV station broadcasts one news event.

// Many people watch it simultaneously:

// * You
// * Your friend
// * Your office

// One event → many consumers.

// ➡️ Event streaming.

// ---

// ### SQS

// Courier delivery.

// A parcel is kept safely in a warehouse until the delivery person picks it up.

// If the delivery person is unavailable, the parcel waits.

// ➡️ Reliable message queue.

// ---

// # Which one should you use?

// | Scenario                            | Best Choice                   |
// | ----------------------------------- | ----------------------------- |
// | Send emails after user registration | BullMQ                        |
// | Generate Excel/PDF reports          | BullMQ                        |
// | Process uploaded images/videos      | BullMQ                        |
// | Real-time analytics/dashboard       | Kafka                         |
// | Event-driven microservices          | Kafka                         |
// | Banking transaction events          | Kafka                         |
// | AWS microservices communication     | Amazon SQS                    |
// | Ensure messages are never lost      | Amazon SQS                    |
// | Retry failed background jobs        | BullMQ (or SQS with a worker) |

// ### In one sentence:

// * **Kafka** → **Broadcast and stream events** to many consumers at very high scale.
// * **BullMQ** → **Execute background jobs** asynchronously using Redis.
// * **Amazon SQS** → **Reliably deliver messages** between services, especially in AWS-based systems.


//
// **RabbitMQ** is another popular message broker used for asynchronous communication between applications. It's different from Kafka, BullMQ, and SQS in its strengths.

// | Feature            | RabbitMQ                                            | Kafka                                  | BullMQ                     | Amazon SQS               |
// | ------------------ | --------------------------------------------------- | -------------------------------------- | -------------------------- | ------------------------ |
// | Primary Purpose    | Message broker                                      | Event streaming                        | Background job queue       | Cloud message queue      |
// | Storage            | Queue                                               | Distributed log                        | Redis                      | AWS-managed queue        |
// | Best For           | Service-to-service messaging                        | Real-time event streaming              | Background jobs            | Cloud microservices      |
// | Message Delivery   | Push                                                | Pull                                   | Push                       | Pull                     |
// | Multiple Consumers | One consumer per message (or pub/sub via exchanges) | Many consumers can read the same event | One worker processes a job | One consumer per message |
// | Retry Support      | Yes                                                 | Limited (consumer-managed)             | Yes                        | Yes (DLQ)                |
// | Ordering           | FIFO per queue                                      | Per partition                          | FIFO                       | FIFO (FIFO queue)        |

// ---

// ## RabbitMQ Purpose

// **Purpose:** Reliably send messages between applications or microservices.

// Example:

// ```
// User places an order
//         ↓
//      RabbitMQ
//         ↓
//  Payment Service
//  Shipping Service
// ```

// If the Payment Service is temporarily down, RabbitMQ stores the message until it can be processed.

// ---

// ## Common Use Cases

// * Email notifications
// * Order processing
// * Payment processing
// * Chat applications
// * Communication between microservices
// * Task distribution among multiple workers

// ---

// ## Example Flow

// ```
// User uploads a file
//         ↓
// API stores file metadata
//         ↓
// RabbitMQ Queue
//         ↓
// Worker 1 → Virus scan
// Worker 2 → Generate thumbnail
// Worker 3 → Send notification
// ```

// The API responds quickly while the workers process tasks asynchronously.

// ---

// ## RabbitMQ vs BullMQ

// | RabbitMQ                                | BullMQ                                           |
// | --------------------------------------- | ------------------------------------------------ |
// | Dedicated message broker                | Redis-based job queue                            |
// | Connects multiple applications/services | Best for Node.js background jobs                 |
// | Language agnostic                       | Primarily for Node.js                            |
// | Uses AMQP protocol                      | Uses Redis                                       |
// | Better for distributed systems          | Better for background jobs in a Node application |

// **Use RabbitMQ when** multiple services (possibly written in different languages) need to exchange messages reliably.

// **Use BullMQ when** you need background processing in a Node.js application (emails, reports, image processing, scheduled jobs).

// ---

// ## RabbitMQ vs Kafka

// | RabbitMQ                                                | Kafka                                         |
// | ------------------------------------------------------- | --------------------------------------------- |
// | Queue-based messaging                                   | Event streaming platform                      |
// | Optimized for low-latency message delivery              | Optimized for high-throughput event streams   |
// | Messages are typically removed after being acknowledged | Events are retained for a configurable period |
// | Good for task queues                                    | Good for event sourcing and analytics         |

// **Use RabbitMQ** for business workflows like order processing and notifications.

// **Use Kafka** when you need to process millions of events and allow multiple independent consumers to replay and analyze those events.

// ---

// ## RabbitMQ vs Amazon SQS

// | RabbitMQ                                       | Amazon SQS                  |
// | ---------------------------------------------- | --------------------------- |
// | Self-hosted (or managed via RabbitMQ services) | Fully managed by AWS        |
// | Rich routing using exchanges                   | Simpler queue model         |
// | More configuration and maintenance             | No infrastructure to manage |
// | Cloud-agnostic                                 | Best integrated with AWS    |

// ---

// ## Which one should you choose?

// | Scenario                               | Best Choice |
// | -------------------------------------- | ----------- |
// | Send emails after registration         | BullMQ      |
// | Generate PDFs or Excel reports         | BullMQ      |
// | Microservice communication (any cloud) | RabbitMQ    |
// | AWS microservices                      | Amazon SQS  |
// | Real-time analytics                    | Kafka       |
// | Event sourcing                         | Kafka       |
// | High-throughput event streaming        | Kafka       |
// | Reliable work queue                    | RabbitMQ    |

// ### In one sentence:

// * **RabbitMQ** → Reliable **message broker** for communication between applications and microservices.
// * **BullMQ** → **Background job queue** built on Redis, ideal for Node.js.
// * **Kafka** → **Event streaming platform** for high-throughput, real-time data pipelines.
// * **Amazon SQS** → Fully managed **cloud message queue** for reliable messaging in AWS.


//(2)Problem Statement: We are sending message regularly to 100 people but one day message stop working while the same 100 message? what is the problem?
//Queue starvation  when a one big client send a million of message after you cannot able to send single message


// <========================Event Sourcing:What is Event Sourcing?=====================>
// Event Sourcing is a design pattern where you store every change (event) made to data instead of storing only the latest state.

// Instead of saving:

// ```text
// Account Balance = ₹15,000
// ```

// You save all the events that led to that balance:

// ```text
// Account Created
// ₹10,000 Deposited
// ₹8,000 Deposited
// ₹3,000 Withdrawn
// ```

// The current balance is calculated by replaying these events.

// ---

// ## Traditional Database vs Event Sourcing

// ### Traditional Approach

// ```text
// Bank Account Table

// AccountId | Balance
// --------------------
// 101       | ₹15,000
// ```

// Only the latest value is stored.

// If someone asks:

// > "What was the balance yesterday?"

// You may not know unless you have audit logs.

// ---

// ### Event Sourcing

// ```text
// Events

// 1. Account Created
// 2. ₹10,000 Deposited
// 3. ₹8,000 Deposited
// 4. ₹3,000 Withdrawn
// ```

// Current balance:

// ```text
// 0
// +10000
// +8000
// -3000
// -------
// ₹15,000
// ```

// Everything is preserved.

// ---

// ## Example: E-commerce Order

// ### Traditional Database

// ```text
// Orders

// OrderId  Status
// -------------------
// 101      Delivered
// ```

// You only know the current status.

// ---

// ### Event Sourcing

// ```text
// Order Created
// ↓

// Payment Completed
// ↓

// Order Packed
// ↓

// Order Shipped
// ↓

// Order Delivered
// ```

// Now you know the **entire history** of the order.

// ---

// ## Why Use Event Sourcing?

// ### 1. Complete Audit Trail

// Every change is stored.

// Example:

// ```text
// 9:00  Order Created

// 9:05  Payment Done

// 9:15  Order Packed

// 9:40  Shipped

// 10:30 Delivered
// ```

// Nothing is lost.

// ---

// ### 2. Time Travel

// You can rebuild the system as it was at any point in time.

// Example:

// ```text
// "What was the account balance on July 1?"
// ```

// Replay events up to July 1.

// ---

// ### 3. Easy Debugging

// Suppose a balance is incorrect.

// Instead of seeing only:

// ```text
// Balance = ₹15,000
// ```

// You can inspect every event:

// ```text
// Deposit ₹10,000

// Deposit ₹8,000

// Withdraw ₹3,000
// ```

// ---

// ### 4. Event Replay

// If you introduce a new service later, you can replay historical events to rebuild its state.

// Example:

// ```text
// Order Events
//       ↓
// Analytics Service
//       ↓
// Notification Service
//       ↓
// Recommendation Service
// ```

// A new service can replay old events without affecting existing ones.

// ---

// ## Where Kafka Fits

// Kafka is commonly used to **store and stream events**.

// ```text
// User Places Order
//         ↓
// Kafka Topic: orders
//         ↓
// Inventory Service

// Payment Service

// Shipping Service

// Analytics Service
// ```

// Each service reads the same event independently.

// Kafka also retains events for a configurable period, allowing consumers to replay them if needed.

// ---

// ## Event Sourcing vs CRUD

// | CRUD                       | Event Sourcing         |
// | -------------------------- | ---------------------- |
// | Stores current state       | Stores every change    |
// | Old values are overwritten | Nothing is overwritten |
// | Limited history            | Complete history       |
// | Simple implementation      | More complex           |
// | Hard to replay history     | Easy to replay events  |

// ---

// ## Real-World Examples

// * **Banking**: Deposits, withdrawals, transfers
// * **E-commerce**: Order lifecycle
// * **Ride-sharing**: Ride requested, driver assigned, trip started, trip completed
// * **Stock trading**: Buy/sell orders
// * **IoT systems**: Device state changes

// ---

// ## Advantages

// * Complete audit trail
// * Recover state by replaying events
// * Easier debugging
// * Supports event-driven architectures
// * Enables multiple downstream consumers

// ## Disadvantages

// * More complex than CRUD
// * Event schema evolution must be managed carefully
// * Rebuilding state by replaying many events can be slow (often mitigated with snapshots)
// * Requires additional infrastructure and operational planning

// ---

// ## Interview Definition

// > **Event Sourcing is a design pattern where every change to an application's state is stored as an immutable event instead of updating the current state directly. The current state is reconstructed by replaying these events, providing a complete audit history, replay capability, and support for event-driven systems.**

