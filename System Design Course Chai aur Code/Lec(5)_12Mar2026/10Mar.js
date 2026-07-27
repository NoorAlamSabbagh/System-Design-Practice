// //Question(1) I have to create sign up or login using best system design practice to handle 1 million signup and its bottleneck
// // (Rate limiting, Email Pass, validation, password Hash, DB Insert, Email, return token)

// # 📚 System Design Notes – Day 1 (Signup/Login System)
// ## 🎯 Goal
// Build a **fast, secure, and scalable** signup system that can handle **1 million users**.

// ---

// # 📌 Step 1: User Sends Signup Request

// ```text
// User
//    │
//    ▼
// Signup API
// ```

// User enters:

// * Email
// * Password
// * Name

// ---

// # 📌 Step 2: Rate Limiting (Security Guard 🚔)

// **Think:** A security guard standing at the entrance.

// He checks:

// > "Has this user/IP sent too many requests?"

// If **Yes**

// ```text
// ❌ Too Many Requests (429)
// ```

// If **No**

// ```text
// ✅ Allow request
// ```

// **Why?**

// Stops:

// * Bots
// * Spam
// * DDOS attacks

// **Tool:** Redis

// ---

// # 📌 Step 3: Validate Data

// Before touching the database, check:

// ✅ Email format

// ✅ Password length

// ✅ Required fields

// If invalid:

// ```text
// Return Error
// ```

// **Why?**

// Don't waste database resources on bad requests.

// ---

// # 📌 Step 4: Check Email Exists

// Ask Database:

// > "Does this email already exist?"

// If Yes

// ```text
// Email already registered
// ```

// If No

// ```text
// Continue
// ```

// 💡 Keep **UNIQUE index** on email so duplicates are impossible.

// ---

// # 📌 Step 5: Hash Password 🔒

// Never save

// ```text
// Password123
// ```

// Save

// ```text
// $2b$12$xYz...
// ```

// Use:

// * Argon2 ✅
// * bcrypt ✅

// **Why?**

// If database is hacked, passwords stay protected.

// ---

// # 📌 Step 6: Save User

// Store in Database

// ```text
// Name

// Email

// Hashed Password

// Created At
// ```

// This is the **most important step**.

// ---

// # 📌 Step 7: Generate Token

// Generate

// * JWT Access Token

// Return immediately

// ```text
// Signup Successful
// ```

// User is logged in.

// ---

// # 📌 Step 8: Send Verification Email

// ❌ Bad Way

// ```text
// Create User

// ↓

// Send Email

// ↓

// Return Response
// ```

// User waits.

// ---

// ✅ Good Way

// ```text
// Create User

// ↓

// Return Success

// ↓

// Queue

// ↓

// Email Worker

// ↓

// Send Email
// ```

// User doesn't wait.

// ---

// # 📌 Why Queue?

// Imagine

// ```text
// 100,000 users sign up.
// ```

// Instead of API sending emails,

// API simply says:

// ```text
// "Please send this email later."
// ```

// A background worker sends emails one by one.

// Examples:

// * Email
// * OTP
// * SMS
// * Notifications

// ---

// # 📌 Final Flow

// ```text
// User
//    │
//    ▼
// Rate Limiter
//    │
//    ▼
// Validation
//    │
//    ▼
// Check Email
//    │
//    ▼
// Hash Password
//    │
//    ▼
// Save User
//    │
//    ▼
// Generate JWT
//    │
//    ▼
// Return Success 🚀
//    │
//    ▼
// Queue
//    │
//    ▼
// Email Worker
//    │
//    ▼
// Send Email
// ```

// ---

// # 🔥 Common Bottlenecks & Solutions

// | Problem               | Solution                             |
// | --------------------- | ------------------------------------ |
// | Too many requests     | Rate Limiter (Redis)                 |
// | Duplicate email       | UNIQUE Index                         |
// | Password security     | Argon2 / bcrypt                      |
// | Slow email sending    | Queue + Worker                       |
// | One server overloaded | Multiple API servers + Load Balancer |
// | Database becomes slow | Indexing + Read Replicas             |

// ---

// # 🎤 Interview Answer (Easy Version)

// > "When a user signs up, I first apply rate limiting to prevent spam. Then I validate the input, check whether the email already exists, hash the password using Argon2 or bcrypt, and save the user in the database with a unique email constraint. After that, I generate a JWT and return the response immediately. Sending the verification email is done asynchronously through a queue and background worker so that email delays don't slow down the signup API. This approach is secure, scalable, and suitable for handling high traffic."

// ---

// # ⭐ Remember This Formula

// ```text
// Protect
//    ↓
// Validate
//    ↓
// Check
//    ↓
// Hash
//    ↓
// Store
//    ↓
// Return Response
//    ↓
// Background Tasks

// <================================(2) =================================>
//     Yes, absolutely. In fact, **this is how production systems are designed**.

// Think of it like a restaurant.

// * **Signup API** = Waiter taking orders.
// * **Queue** = Order slips.
// * **Email Workers** = Chefs preparing food.

// If one chef can't handle all the orders, what do you do?

// 👉 **Hire more chefs.** You don't make the waiter cook the food.

// The same applies to email services.

// ### Scenario 1: Normal Traffic

// ```text
// Signup API
//       │
//       ▼
//     Queue
//       │
//       ▼
// Email Worker 1
//       │
//       ▼
//  Send Email
// ```

// One email worker is enough.

// ---

// ### Scenario 2: High Traffic (1 Million Signups)

// ```text
//               Queue
//       ┌────────┼────────┐
//       ▼        ▼        ▼
//  Worker 1  Worker 2  Worker 3
//       │        │        │
//       ▼        ▼        ▼
//  Send     Send      Send
//  Email    Email     Email
// ```

// Now three workers process emails simultaneously.

// If the queue has **300,000 emails**:

// * Worker 1 → 100,000
// * Worker 2 → 100,000
// * Worker 3 → 100,000

// This is called **horizontal scaling**.

// ---

// ### Scenario 3: One Worker Crashes

// ```text
//               Queue
//       ┌────────┼────────┐
//       ▼        ▼        ▼
//  Worker 1   ❌ Down   Worker 3
//       │                  │
//       ▼                  ▼
//    Send Email       Send Email
// ```

// The emails assigned to the failed worker stay in the queue.

// The remaining workers continue processing them, or a new worker starts and picks them up.

// **No emails are lost** because the queue stores them until they are successfully processed.

// ---

// ### Can we add more email servers?

// **Yes.**

// You can have:

// * 1 Email Worker
// * 5 Email Workers
// * 20 Email Workers
// * 100 Email Workers

// All of them read jobs from the same queue.

// As traffic increases, you simply increase the number of workers.

// ---

// ### Best Production Flow

// ```text
// User
//    │
//    ▼
// Signup API
//    │
//    ▼
// Save User
//    │
//    ▼
// Return Success (Don't Wait)
//    │
//    ▼
// Queue (Kafka / RabbitMQ / SQS)
//    │
//    ├───────────────┬───────────────┐
//    ▼               ▼               ▼
// Email Worker 1  Email Worker 2  Email Worker 3
//    │               │               │
//    ▼               ▼               ▼
//  Email Provider (SES / SendGrid / SMTP)
// ```

// ### Interview Answer

// If an interviewer asks:

// > **"What if the email server goes down?"**

// You can answer:

// > "I wouldn't send emails directly from the signup API. 
// I'd publish an event to a message queue and return the response immediately. 
// Multiple background email workers consume messages from the queue. 
// If one worker or the email provider becomes unavailable, the messages remain in the queue and are retried later.
// If traffic increases, I can horizontally scale by adding more email workers without changing the signup API."

// This is the pattern used by many large-scale systems because it keeps the user-facing API fast, prevents email outages from affecting signups, 
// and scales easily under heavy load.


// <=============================(3)Push Based message broker system =====================================>

//<====================(4)AWS SQS ============================>
// <===========================(5)Rabbit MQ Vs SQS VS Kafka ====================>
//<==================(6)Pull Based VS Push Based =================>
//     This is one of the most common interview questions, especially when discussing **Kafka, RabbitMQ, Redis Streams, and message queues**.

// # Push-Based vs Pull-Based (Layman's Terms)

// Imagine you're watching **YouTube**.

// There are two ways to get new videos.

// ---

// # 1. Push-Based 📤

// Think of **WhatsApp notifications**.

// Whenever someone sends you a message,

// 👉 WhatsApp immediately sends (pushes) a notification to your phone.

// You don't ask for it.

// ```text
// Friend
//    │
//    ▼
// WhatsApp Server
//    │
//    ▼
// 📱 Your Phone
// ```

// The server pushes data to you.

// ### Real-life examples

// * WhatsApp notification
// * Gmail notification
// * Facebook notification
// * Food delivery notification

// ### System Design Example

// ```text
// Email Service
//       │
//       ▼
// User
// ```

// As soon as the email is ready, the server sends it automatically.

// ### Pros

// ✅ Very fast

// ✅ Real-time

// ### Cons

// ❌ If the receiver is offline, delivery can fail unless retries are implemented.

// ---

// # 2. Pull-Based 📥

// Think of checking your **mailbox**.

// Nobody brings the letters to your room.

// You walk to the mailbox and check:

// > "Do I have any new mail?"

// If yes, you take it.

// If no, you come back later.

// ```text
// You
//  │
//  ▼
// Mailbox
// ```

// You are requesting (pulling) the data.

// ### Real-life examples

// * Refreshing Gmail
// * Refreshing Instagram feed
// * Checking bank balance
// * Refreshing YouTube homepage

// ---

// # Queue Example (Most Important)

// Suppose there are **100 emails** waiting.

// ## Push-Based

// Queue says:

// ```text
// Queue
//    │
//    ▼
// Worker
// ```

// Queue immediately pushes jobs to the worker.

// Worker doesn't ask.

// ---

// ## Pull-Based

// Worker keeps asking:

// ```text
// Worker
//    │
// "Any job?"
//    │
//    ▼
// Queue
// ```

// Queue replies:

// ```text
// Yes

// Take this email.
// ```

// Worker finishes it and asks again:

// ```text
// Any more jobs?
// ```

// This continues until the queue is empty.

// ---

// # Which one does Kafka use?

// ✅ **Pull-Based**

// Consumers continuously ask Kafka:

// ```text
// Give me next message
// ```

// Kafka never forces messages onto consumers.

// ---

// # Which one does RabbitMQ use?

// Mostly **Push-Based**.

// RabbitMQ pushes messages to consumers (while respecting acknowledgments and prefetch settings so it doesn't overwhelm them).

// ---

// # Easy Interview Table

// | Push-Based                 | Pull-Based                 |
// | -------------------------- | -------------------------- |
// | Server sends data          | Client requests data       |
// | Real-time                  | Client checks periodically |
// | Like WhatsApp notification | Like refreshing Gmail      |
// | Faster updates             | Consumer controls speed    |
// | Example: RabbitMQ          | Example: Kafka             |

// ---

// # Super Easy Memory Trick

// 📤 **Push = Pizza Delivery 🍕**

// You stay at home.

// Pizza comes to you.

// ---

// 📥 **Pull = Water from a Well 🪣**

// Nobody brings water.

// You go and pull it yourself.

// ---

// # Interview Answer (30 seconds)

// > **Push-Based:** The producer or broker sends data directly to the consumer as soon as it's available, similar to WhatsApp notifications. RabbitMQ commonly follows this model.

// > **Pull-Based:** The consumer requests data from the broker whenever it's ready to process more messages, similar to refreshing Gmail. Kafka follows this model, allowing consumers to control their own processing speed.

// **Memory Tip:**

// * 📤 **Push = Server → Client**
// * 📥 **Pull = Client → Server**


// <=================Distributed system me first in first out kuch nhi hota ha =============
