// <====================== (1)🔌 WebSocket – System Design Notes ======================>
// ## 📌 1️⃣ Definition
// * WebSocket is a persistent, full-duplex communication protocol over TCP.
// * Enables real-time bidirectional communication between client and server.
// * Starts with HTTP handshake → upgrades to WebSocket.
// * Connection remains open until closed by client/server.

// ## 🎯 2️⃣🏗️ Common Use Cases
// * Chat systems (WhatsApp-like apps)
// * Live notifications
// * Multiplayer gaming
// * Stock trading dashboards
// * Real-time analytics
// * Collaborative tools (Google Docs type)

// ## 🧠 3️⃣ High-Level Architecture (Distributed System)
// Clients
//    ↓
// Load Balancer (WebSocket supported)
//    ↓
// WebSocket Servers (Stateless)
//    ↓
// Redis Pub/Sub or Kafka
//    ↓
// Database

// ## 🔥 4️⃣ Core Scaling Challenges
// ### 1. Stateful Nature
// * Each connection consumes memory
// * Server must track socket ↔ user mapping
// ### 2. Multi-Server Communication Problem

// If:
// * User A → Server 1
// * User B → Server 2
// Server 1 must communicate with Server 2.
// ### 3. High Concurrent Connections
// * File descriptor limits (ulimit)
// * Memory usage per connection
// * CPU event-loop pressure

// ## ✅ 5️⃣ Scaling Strategies
// ### Horizontal Scaling
// * Add more WebSocket servers
// * Use load balancer
// ### Pub/Sub Layer
// * Redis Pub/Sub
// * Kafka
// * RabbitMQ

// ### Sticky Sessions (Optional)
// * Keeps user on same server
// * Not ideal for large-scale distributed systems

// ### Stateless Authentication
// * JWT during handshake
// * No session storage in server memory

// ### Sharding Strategy
// * Divide users by:
//   * Region
//   * User ID hash
//   * Channel/group

// ## 🔐 6️⃣ Security Best Practices
// * Use WSS (TLS encryption)
// * JWT validation at handshake
// * Rate limiting per connection
// * Heartbeat (ping/pong) monitoring
// * Idle timeout handling
// * Origin validation

// ## ⚖️ 7️⃣ WebSocket vs Alternatives
// ### Polling
// * Client repeatedly requests server
// * High overhead
// * Poor scalability

// ### Long Polling
// * Slightly better than polling
// * Still inefficient at scale
// ### Server-Sent Events (SSE)
// * One-way (Server → Client)
// * Good for notifications
// * Not full-duplex
// ### WebSocket
// * Bi-directional
// * Low latency
// * Best for real-time apps

// ## 🏆 8️⃣ Interview Key Points
// * WebSocket is stateful
// * Harder to scale than REST APIs
// * Requires Pub/Sub for distributed messaging
// * Memory-heavy at large scale
// * Best for real-time communication systems

// ## 🚀 Advanced Concepts (For Senior-Level Prep)
// * Backpressure handling
// * Connection draining during deployments
// * Load shedding
// * Graceful shutdown
// * WebSocket clustering
// * Regional failover
// * Rate limiting at gateway level
// * WebRTC vs WebSocket

// ## 🧩 Quick Revision Summary
// * Persistent TCP connection
// * Full-duplex communication
// * Real-time data flow
// * Stateful architecture
// * Needs Redis/Kafka for scaling
// * Use WSS + JWT
// * Avoid for simple CRUD APIs

// # 🚀 SCALING – Important Points to Remember
// ## 🔹 1️⃣ Types of Scaling
// ### ✅ Vertical Scaling (Scale Up)
// * Increase CPU, RAM, Storage
// * Simple to implement
// * Hardware limit exists
// * Single point of failure
// * Downtime possible

// ### ✅ Horizontal Scaling (Scale Out)
// * Add more servers
// * Requires load balancer
// * High availability
// * Fault tolerant
// * Used in large-scale systems

// 👉 Modern systems prefer **Horizontal Scaling**
// ## 🔹 2️⃣ Stateless vs Stateful Services
// ### Stateless (Easy to scale)
// * No session stored in server memory
// * JWT-based authentication
// * Any server can handle request

// ### Stateful (Hard to scale)
// * Stores session in memory
// * Requires sticky sessions
// * Harder for distributed systems
// 👉 Always try to design **stateless APIs**

// ## 🔹 3️⃣ Load Balancing
// Types:
// * Round Robin
// * Least Connections
// * IP Hash
// * Weighted Routing

// Tools:
// * Nginx
// * AWS ALB
// * HAProxy

// ## 🔹 4️⃣ Database Scaling
// ### Read Scaling
// * Read replicas
// * Improves read throughput

// ### Write Scaling
// * Sharding (partition data)
// * Harder than read scaling

// ## 🔹 5️⃣ Caching
// * Redis / Memcached
// * Reduce DB load
// * Improve latency

// Cache Strategies:
// * Cache Aside
// * Write Through
// * Write Back

// ## 🔹 6️⃣ Bottleneck Identification
// Common bottlenecks:
// * Database
// * CPU
// * Memory
// * Network
// * Disk I/O
// 👉 Always identify bottleneck before scaling.

// ## 🔹 7️⃣ Asynchronous Processing
// * Use message queues (Kafka, RabbitMQ)
// * Background workers
// * Improves performance
// * Reduces response time

// ## 🔹 8️⃣ Auto Scaling
// * Scale based on:
//   * CPU usage
//   * Memory usage
//   * Request rate
// * Used in cloud systems

// ## 🔹 9️⃣ High Availability
// * No single point of failure
// * Redundant servers
// * Health checks
// * Failover mechanisms

// ## 🔹 🔟 Key Scaling Keywords (Revision)
// * Horizontal Scaling
// * Vertical Scaling
// * Load Balancer
// * Stateless Services
// * Replication
// * Sharding
// * Caching
// * Auto-scaling
// * High Availability
// * Fault Tolerance

// <====================== (2) 🧠 CAP THEOREM – Important Points to Remember  ======================>
// ## 🔹 1️⃣ Definition
// In distributed systems, you can only guarantee **2 out of 3**:
// * Consistency (C)
// * Availability (A)
// * Partition Tolerance (P)

// ## 🔹 2️⃣ Partition Tolerance is Mandatory
// In real distributed systems:
// * Network failures WILL happen
// * So P is always required

// 👉 So real choice is between:
// * CP
// * AP

// ## 🔹 3️⃣ Consistency (C)
// * Every read gets latest write
// * No stale data
// * Strong correctness

// Used in:
// * Banking
// * Payments
// * Inventory

// ## 🔹 4️⃣ Availability (A)
// * Every request gets response
// * No downtime
// * Might return stale data

// Used in:
// * Social media
// * Messaging
// * DNS

// ## 🔹 5️⃣ CP Systems
// * Prioritize correct data
// * May reject requests
// * Sacrifice availability

// Examples:
// * HBase
// * MongoDB (strong consistency mode)

// ## 🔹 6️⃣ AP Systems
// * Always respond
// * Eventual consistency
// * May return stale data temporarily

// Examples:
// * Cassandra
// * DynamoDB (eventual mode)

// ## 🔹 7️⃣ CA Systems
// * Only possible without partition
// * Works in single-node systems
// * Not realistic for distributed systems

// ## 🔹 8️⃣ Eventual Consistency
// * Data will become consistent eventually
// * Temporary inconsistency allowed
// * Common in large-scale systems

// ## 🔹 9️⃣ Interview Trick Point
// If interviewer asks:
// "What do you choose in distributed system?"
// Correct thinking:
// > Partition tolerance is mandatory.
// > So I choose between Consistency and Availability based on business requirement.
// ## 🔹 🔟 CAP Keywords (Quick Revision)
// * Strong Consistency
// * Eventual Consistency
// * Network Partition
// * CP vs AP
// * Trade-offs
// * Distributed System
// * Replication
// * Consensus

// # 🏆 Golden Interview Line
// > In distributed systems, partition tolerance is unavoidable. So during a partition, we must choose between consistency and availability depending on business needs.

//<========================== (3) ⚖️ Load Balancing – Short Notes ==========================>//
// ## 📌 Definition
// Load Balancing is distributing incoming requests across multiple servers to:
// * Improve performance
// * Prevent overload
// * Ensure high availability

// ## 🧠 Why Needed?
// Without Load Balancer:
// * All traffic goes to one server → Crash risk
// With Load Balancer:
// * Traffic is divided → Stable system

// ## 🏗️ Basic Flow
// Users
// ↓
// Load Balancer
// ↓
// Multiple Servers

// ## 🔹 Types
// ### 1️⃣ Layer 4 (Transport)
// * Based on IP & Port
// * Faster

// ### 2️⃣ Layer 7 (Application)
// * Based on URL, headers
// * More intelligent
// * Mostly used today

// ## 🔹 Common Algorithms
// * Round Robin
// * Least Connections
// * IP Hash
// * Weighted Round Robin

// ## 🔹 Important Concepts
// * Health Checks
// * Sticky Sessions (not ideal for scaling)
// * Stateless servers (recommended)
// * High Availability

// ## 🏆 Interview Line
// > Load balancer distributes traffic across multiple servers to improve scalability, reliability, and performance.


// <=================== (4) 🔁 Reverse Proxy =====================>

// ## 📌 Definition

// A **Reverse Proxy** is a server that sits between clients and backend servers and forwards client requests to appropriate backend servers.

// Client → Reverse Proxy → Backend Servers

// ---

// ## 🧠 Why Used?

// * Hide internal servers
// * Improve security
// * Load balancing
// * SSL termination
// * Caching
// * Rate limiting

// ---

// ## 🔹 How It Works

// 1. Client sends request
// 2. Reverse proxy receives it
// 3. Forwards to backend server
// 4. Returns response to client

// Client never directly talks to backend.

// ---

// ## 🔹 Reverse Proxy vs Forward Proxy

// ### Reverse Proxy

// * Protects servers
// * Used by backend systems

// ### Forward Proxy

// * Protects clients
// * Used in corporate networks

// ---

// ## 🔹 Common Tools

// * Nginx
// * HAProxy
// * AWS ALB
// * Cloudflare

// ---

// ## 🔹 Benefits

// * Security (hide IPs)
// * Better scalability
// * Centralized logging
// * Load distribution
// * SSL handling

// ---

// ## 🏆 Interview Line
// > A reverse proxy sits in front of backend servers, forwards client requests, improves security, and helps with load balancing and scalability.


//<==================== Points covered in this lecture ====================>
// Topics Covered in the System Design Lecture:
// (1)Application Layer Scaling
// (2) DNS
// (3)Scale Up vs Scale Out
// (4) Consistency in Distributed Systems
// (5) Reverse Proxy
// (6) VPC (Virtual Private Cloud)
// (7) Pre-Warming and Bottlenecks
// (8) Load Balancers
// (9) Stateless vs Stateful Systems
// (10) Availability and Resource Planning
// (11) Traffic Spikes Handling
// (12) Auto Scaling
// (13) Single Point of Failure
// (14) System Design Trade-offs
// (15) Caching Strategies
// (16) Mutex and Cache Locking
// (17) Thundering Herd Problem
// (18) Time To Live (TTL)
// (19) Cache Jitter
// (20) Stale-While-Revalidate (SWR)
// (21) Cache Warming

// Case Studies:
// (1) Atlassian Load Balancer Case Study
// (2) Learnyst ChaiCode Traffic Spike Case Study
// (3) Netflix, YouTube, and Hotstar Traffic Patterns 🚀


// # 🚀 System Design Course – Key Takeaways
// (1) Application Layer Scaling
// Application Layer Scaling simply means making your app able to handle more users without slowing down.
// For example, if thousands of people start using your website at the same time, 
// one server might not be enough. So we add more servers or increase the server power 
// so that all users can use the application smoothly.

// Simple Example:
// Imagine a food counter 🍔.
// If only one person is serving food, the line becomes long.
// So the shop adds more people to serve, and customers get food faster.

// (2) DNS
// DNS (Domain Name System) is like the phone book of the internet. 
// It translates human-friendly domain names (like www.google.com) into IP addresses that computers use to identify each other on the network.
// When you type a website name, your computer asks the DNS server for the corresponding IP address, and then it can connect to the website.


// (3) Scale Up vs Scale Out
// Scale Up (Vertical Scaling) means increasing the capacity of a single server (like adding more RAM or CPU).
// Scale Out (Horizontal Scaling) means adding more servers to handle the load.
// Scale Up is easier but has limits, while Scale Out can handle much larger loads but is more complex to manage.

// (4) Consistency in Distributed Systems
// In distributed systems, consistency means that all users see the same data at the same time. 
// However, achieving perfect consistency can be difficult due to network delays and failures. 
// Systems often choose between strong consistency (where all users see the same data) and eventual consistency (where data may be temporarily inconsistent but will become consistent over time).

// (5) Reverse Proxy
// A Reverse Proxy is a server that sits in front of backend servers and forwards client requests to those servers. 
// It helps improve security, load balancing, and can also handle SSL termination and caching.

// (6) VPC (Virtual Private Cloud)
// A VPC is a private network in the cloud where you can launch your resources. 
// It provides isolation and security for your applications, allowing you to control who can access your resources and how they communicate with each other. 

// (7) Pre-Warming and Bottlenecks
// Pre-Warming is the process of preparing your servers to handle traffic spikes by running them before the actual traffic arrives. 
// Bottlenecks are points in your system that limit performance. Identifying and addressing bottlenecks is crucial for scaling effectively.

// (8) Load Balancers
// Load Balancers distribute incoming traffic across multiple servers to ensure no single server is overwhelmed. 
// They improve the availability and reliability of your application by spreading the load and providing failover capabilities.

// (9) Stateless vs Stateful Systems
// Stateless systems do not store any information about the user's session on the server, making them easier to scale. 
// Stateful systems, on the other hand, maintain session information, which can make scaling more complex as you need to ensure that users are directed to the correct server that holds their session data.
// example:
// Stateless: A REST API that does not store user sessions.
// Stateful: A chat application that keeps track of user sessions to maintain conversations.   

// (10) Availability and Resource Planning
// Availability refers to the percentage of time your system is operational and accessible. 
// Resource Planning involves ensuring you have enough resources (like servers, bandwidth, etc.) to meet user demand while maintaining high availability.

// (11) Traffic Spikes Handling
// Traffic spikes can occur due to events like sales, promotions, or viral content. 
// To handle traffic spikes, you can use auto-scaling to automatically add resources when demand increases and remove them when demand decreases.

// (12) Auto Scaling
// Auto Scaling is a feature that automatically adjusts the number of servers in response to traffic demand. 
// It helps maintain performance and availability while optimizing costs by only using resources when needed.
// example:
// During a sale, if traffic increases, auto-scaling can add more servers to handle the load.

// (13) Single Point of Failure
// A Single Point of Failure (SPOF) is a part of the system that, if it fails, will cause the entire system to fail. 
// To avoid SPOFs, you can use redundancy and failover strategies, such as having multiple servers and load balancers.

// (14) System Design Trade-offs
// In system design, you often have to make trade-offs between different factors like consistency, availability, latency, and cost. 
// Understanding these trade-offs is crucial for designing systems that meet your specific requirements.

// (15) Caching Strategies
// Caching is a technique to store frequently accessed data in a faster storage medium to improve performance. 
// Common caching strategies include Cache-Aside, Write-Through, and Write-Back.
// example:
// Cache-Aside: The application checks the cache first, and if the data is not there, it retrieves it from the database and then stores it in the cache for future requests.

// (16) Mutex and Cache Locking
// A Mutex (Mutual Exclusion) is a synchronization mechanism used to prevent multiple threads from accessing a shared resource simultaneously.
// example:
// In a caching system, if multiple requests try to update the same cache entry at the same time,
// a mutex can be used to ensure that only one request updates the cache 
// while others wait, preventing race conditions

// (17) Thundering Herd Problem
// The Thundering Herd Problem occurs when a large number of requests hit the server at the same time, causing it to become overwhelmed. 
// This can happen during traffic spikes or when a cache expires and many requests try to access the database simultaneously.

// (18) Time To Live (TTL)
// TTL is the duration for which a cache entry is considered valid. 
// After the TTL expires, the cache entry is invalidated and must be refreshed from the original data source.

// (19) Cache Jitter
// Cache Jitter refers to the variability in response times due to cache misses and hits. 
// When a cache entry expires, it can cause a spike in latency as the system retrieves data from the slower backend.

// (20) Stale-While-Revalidate (SWR)
// SWR is a caching strategy where stale data is served while the cache is being refreshed in the background. 
// This allows for faster responses while ensuring that the cache is updated with fresh data.   

// (21) Cache Warming
// Cache Warming is the process of pre-populating the cache with data before it is needed. 
// This can help reduce latency for the first few requests after a cache reset or during traffic spikes. 
// For example, you might run a script to load popular data into the cache before a big sale event.


