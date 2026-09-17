// Topics Covered in the System Design Lecture
// 1. Database (DB)
// 2. Auto Scaling Group (ASG)
// 3. Database Replication
// 4. Point-in-Time Recovery
// 5. Sharding
// 6. Leader Election
// 7. Eventual Consistency
// 8. Hash Function
// 9. Single Region Critical Write
// 10. Cluster Architecture
// 11. Split Brain Problem
// 12. Consistent Hashing
// 13. Quorum
// 14. Fencing Token
// 15. Majority Token
// 16. Re-sharding
// 17. Mutex
// 18. etcd
// 19. Apache ZooKeeper
// 20. Round Robin Load Balancing
// 21. Sticky Sessions
// 22. AWS CloudWatch
// 23. Celebrity Problem
// 24. Cross Shard Join
// 25. Hotspot Problem
// 26. PhonePe System Design Case Study 🚀

// 1. Database (DB)
// A database is a structured collection of data that is stored and accessed electronically.
// It allows for efficient storage, retrieval, and management of data.
// Databases can be categorized into various types, such as relational databases (e.g., MySQL, PostgreSQL),
// NoSQL databases (e.g., MongoDB, Cassandra), and in-memory databases (e.g., Redis).
// Each type of database has its own advantages and use cases, depending on the requirements of the application being developed.

// 2. Auto Scaling Group (ASG)
// An Auto Scaling Group (ASG) is a feature provided by cloud service providers (like AWS)
// that allows for automatic scaling of resources based on demand.
// It helps maintain application availability and allows you to scale your Amazon EC2 capacity up or down
// automatically according to conditions you define.
// ASGs can be configured to launch or terminate instances based on various metrics, such as CPU utilization,
// network traffic, or custom CloudWatch metrics.
//This ensures that your application can handle varying levels of traffic while optimizing costs by
// only using the necessary resources.

// 3. Database Replication
// Database replication is the process of copying and maintaining database objects, such as tables, in multiple database servers.
// It is used to improve data availability, fault tolerance, and performance.
// There are different types of replication, including master-slave replication, master-master replication,
// and multi-master replication.
// Replication can be synchronous (where changes are immediately propagated to replicas) or asynchronous
//  (where changes are propagated with some delay).
// It is important to consider the consistency model and potential conflicts when implementing database replication.

// 4. Point-in-Time Recovery
// Point-in-Time Recovery (PITR) is a feature that allows you to restore a database to a specific point in time.
// This is particularly useful in scenarios where data has been accidentally deleted or corrupted.
// PITR typically involves taking regular backups of the database and maintaining transaction logs that record
// all changes made to the database.
// In the event of a failure, you can use the backups and transaction logs to restore the database to the desired point in time,
// minimizing data loss and downtime.

// 5. Sharding
// Sharding is a database partitioning technique that involves splitting a large database into smaller,
// more manageable pieces called shards.
// Each shard is a separate database that contains a subset of the data, and together they form the complete dataset.
// Sharding can improve performance and scalability by distributing the load across multiple servers.
// It is important to choose an appropriate sharding key to ensure even distribution of data and to minimize
// cross-shard queries, which can be expensive in terms of performance.
// Examples of sharding include horizontal sharding (where rows are distributed across shards) and vertical sharding
// (where columns are distributed across shards).

// 6. Leader Election
// Leader election is a process used in distributed systems to designate a single node as the leader or coordinator
// among a group of nodes.
// The leader is responsible for managing tasks, coordinating actions, and making decisions on behalf of the group.
// Leader election algorithms ensure that there is only one leader at any given time and that the system can recover
// from failures by electing a new leader when necessary.
// Common algorithms for leader election include the Bully algorithm, the Ring algorithm, and the Paxos algorithm.
// Leader election is crucial for maintaining consistency and coordination in distributed systems,
// especially in scenarios where multiple nodes need to work together to achieve a common goal.

// 7. Eventual Consistency
// Eventual consistency is a consistency model used in distributed systems where updates to a data item will eventually propagate
// to all replicas, but there may be a delay before all replicas reflect the update.
// In an eventually consistent system, it is possible for different replicas to return different values for the same data
//  item at the same time, but they will eventually converge to the same value.
// This model is often used in systems that prioritize availability and partition tolerance over immediate consistency,
//  such as NoSQL databases and distributed caches.
// Eventual consistency can lead to scenarios where clients may read stale data, so it is important to design applications
// with this in mind and consider the trade-offs between consistency and availability.

// 8. Hash Function
// A hash function is a mathematical function that takes an input (or "message") and returns a fixed-size string of bytes,
// typically a hash code.
// The output is usually a unique representation of the input data, and even small changes to the input can produce a
//  significantly different hash code.
// Hash functions are commonly used in various applications, such as data indexing, password storage,
//  and distributed systems for tasks like sharding and load balancing.
// A good hash function should have properties such as being deterministic, fast to compute, and producing
//  a uniform distribution of hash codes to minimize collisions (where different inputs produce the same hash code).

// 9. Single Region Critical Write
// Single Region Critical Write is a design pattern used in distributed systems to ensure that critical write operations
// are performed in a single region or data center to maintain consistency and reduce the risk of data loss.
// In this approach, write operations are directed to a specific region, while read operations can be served from multiple regions.
// This helps to ensure that critical data is written to a single authoritative source, reducing the chances of conflicts
// and inconsistencies that can arise from concurrent writes in multiple regions.
// However, this design pattern can introduce latency for write operations, as requests may need to be routed to the designated region.
// It is important to carefully consider the trade-offs between consistency, availability, and latency when implementing
// single region critical write in a distributed system, and to choose the appropriate strategy based on the specific requirements of the application.

// 10. Cluster Architecture
// Cluster architecture refers to the design and organization of a group of interconnected computers (nodes) that work together
// to achieve a common goal, such as providing high availability, scalability, and fault tolerance.
// In a cluster architecture, nodes can be configured to share resources, distribute workloads, and provide redundancy in case of failures.

// There are different types of cluster architectures, including high-performance clusters (HPC), high-availability clusters (HA),
// and load-balancing clusters.
// Each type of cluster architecture has its own characteristics and use cases, depending on the requirements of the application or system being designed.
// Cluster architectures can be implemented using various technologies and frameworks, such as Kubernetes for container orchestration,
// Apache Hadoop for big data processing, and traditional clustering solutions like Microsoft Cluster Service (MSCS) or Linux-HA.

// 11. Split Brain Problem
// The Split Brain Problem is a situation that can occur in distributed systems when a network partition or failure
// causes a group of nodes to become isolated from each other, leading to multiple nodes believing they are the leader or primary node.
// This can result in data inconsistencies, conflicts, and potential system failures if not properly managed.
// To mitigate the Split Brain Problem, various techniques can be employed, such as implementing quorum-based decision-making,
// using fencing mechanisms to prevent multiple nodes from acting as the leader simultaneously, and employing consensus algorithms like Paxos or Raft.

// 12. Consistent Hashing
// Consistent hashing is a technique used in distributed systems to distribute data across a cluster of nodes in a way that minimizes
// the impact of adding or removing nodes on the overall system.
// In consistent hashing, both the data and the nodes are mapped to a circular hash space, and each node is
// responsible for a specific range of the hash space.
// When a new node is added or an existing node is removed, only a small portion of the data needs to be redistributed,
//  reducing the overhead and improving scalability.
// Consistent hashing is commonly used in distributed caching systems, load balancers, and distributed databases to achieve
//  efficient data distribution and fault tolerance.

// 13. Quorum
// Quorum is a concept used in distributed systems to ensure that a majority of nodes agree on a decision or action before
//  it is executed.
// It is often used in consensus algorithms and distributed databases to maintain consistency and prevent conflicts.
// A quorum is typically defined as more than half of the total number of nodes in the system, and it is required for
// operations such as leader election, data replication, and transaction commits.
// By requiring a quorum for critical operations, distributed systems can achieve fault tolerance and ensure that
// decisions are made based on the agreement of a majority of nodes.

// 14. Fencing Token
// A fencing token is a mechanism used in distributed systems to prevent multiple nodes from simultaneously accessing
// a shared resource or performing conflicting operations.
// It is often used in conjunction with leader election and quorum-based decision-making to ensure that only the designated leader
// or primary node can perform certain actions.
// Fencing tokens can be implemented using various techniques, such as version numbers, timestamps, or unique identifiers.
// When a node acquires a fencing token, it is granted exclusive access to the resource or operation, and other nodes
//  are prevented from interfering.
// This helps to prevent issues such as data corruption, inconsistencies, and conflicts that can arise in distributed
// systems when multiple nodes attempt to perform the same action simultaneously.

// 15. Majority Token
// A majority token is a concept used in distributed systems to ensure that a majority of nodes agree on a
//  decision or action before it is executed.
// It is similar to the concept of quorum, where a majority of nodes must participate in the decision-making process
// to maintain consistency and prevent conflicts.
// A majority token can be used in various scenarios, such as leader election, data replication, and transaction commits,
// to ensure that critical operations are performed based on the agreement of a majority of nodes.
// By requiring a majority token for certain actions, distributed systems can achieve fault tolerance and ensure that
// decisions are made in a reliable and consistent manner.

// 16. Re-sharding
// Re-sharding is the process of redistributing data across shards in a sharded database to improve performance,
// scalability, and load balancing.
// It involves changing the sharding key or the number of shards to better distribute the data and workload.
// Re-sharding can be necessary when the existing sharding strategy leads to uneven data distribution, hotspots,
// or performance bottlenecks.
// The process of re-sharding can be complex and may require careful planning to minimize downtime and ensure data integrity.
// Strategies for re-sharding include online re-sharding, where data is migrated gradually without taking the system offline,
// and offline re-sharding, where the system is temporarily taken offline to perform the re-sharding operation.
// It is important to monitor the system's performance and workload patterns to determine when re-sharding is necessary
// and to choose an appropriate strategy based on the specific requirements of the application.

// 17. Mutex
// A mutex (short for "mutual exclusion") is a synchronization primitive used in concurrent programming to prevent multiple threads
// or processes from accessing a shared resource simultaneously.
// It ensures that only one thread or process can hold the mutex at a time, allowing for safe access to shared data and preventing
// race conditions.
// Mutexes can be implemented using various techniques, such as locks, semaphores, or atomic operations.
// In distributed systems, mutexes can be used to coordinate access to shared resources across multiple nodes, ensuring that only one node can perform a critical operation at a time.
// Distributed mutexes can be implemented using consensus algorithms, leader election, or distributed coordination services like
// Apache ZooKeeper or etcd.

// 18. etcd
// etcd is a distributed key-value store that provides a reliable way to store and manage configuration data, metadata, and service discovery information in distributed systems.
// It is designed to be highly available, fault-tolerant, and consistent, making it suitable for use in large-scale distributed applications.
// etcd uses the Raft consensus algorithm to ensure that data is replicated across multiple nodes and that the system can recover from failures.
// It provides a simple API for reading and writing key-value pairs, as well as features like watch notifications,
// transactions, and leases for managing the lifecycle of keys.
// etcd is commonly used in container orchestration platforms like Kubernetes to store cluster state, configuration data,
// and service discovery information.

// 19. Apache ZooKeeper
// Apache ZooKeeper is a distributed coordination service that provides a centralized infrastructure for managing configuration,
// synchronization, and naming in distributed systems.
// It is designed to be highly reliable, fault-tolerant, and scalable, making it suitable for use in large-scale distributed applications.
// ZooKeeper provides a simple API for reading and writing data, as well as features like watches, ephemeral nodes,
// and leader election for managing the state of distributed systems.
// ZooKeeper is commonly used in distributed applications for tasks such as configuration management, service discovery,
// leader election, and distributed locking.

//20. Round Robin Load Balancing
// Round Robin Load Balancing is a simple and widely used load balancing algorithm that distributes
// incoming requests evenly across a group of servers.
// In this approach, each server in the pool is assigned a turn to handle incoming requests in a circular order.

// For example, if there are three servers (A, B, and C), the first request goes to server A,
// the second request goes to server B, the third request goes to server C, and the fourth request goes back to server A, and so on.
// Round Robin Load Balancing is easy to implement and works well when all servers have similar processing capabilities and workloads.
// However, it may not be the most efficient approach in scenarios where servers have varying capacities
//  or when requests have different processing times, as it does not take server load or response time into account.

// 21. Sticky Sessions
// Sticky Sessions, also known as session affinity, is a load balancing technique that ensures that a user's
// requests are consistently directed to the same server during a session.
// This is particularly useful for applications that maintain user-specific state information on the server side,
// such as shopping carts or user preferences.
// Sticky sessions can be implemented using cookies or URL parameters to track the user's session and route subsequent requests
// to the same server.
// While sticky sessions can improve user experience by maintaining state, they can also lead to uneven load distribution
//  and potential
// bottlenecks if certain servers become overloaded with requests from many users.

// 22. AWS CloudWatch
// AWS CloudWatch is a monitoring and observability service provided by Amazon Web Services (AWS) that allows you to collect,
// monitor, and analyze metrics, logs, and events from your AWS resources and applications.

// CloudWatch provides real-time visibility into the performance and health of your applications, enabling you to set alarms,
// automate actions, and gain insights into operational issues.
// It can monitor various AWS services, such as EC2 instances, RDS databases, Lambda functions, and more.
// CloudWatch also allows you to create custom metrics and dashboards to visualize and analyze your
// application's performance over time.
// By using CloudWatch, you can proactively identify and address issues, optimize resource utilization,
// and ensure the reliability of your applications.

// 23. Celebrity Problem
// The Celebrity Problem is a classic problem in computer science and graph theory that involves identifying
// a "celebrity" in a group of people.
// A celebrity is defined as someone who is known by everyone else but does not know anyone else in the group.

// The problem can be represented as a directed graph, where each person is a node, and an edge from person
// A to person B indicates that A knows B.
// The goal is to find the celebrity (if one exists) using the least number of comparisons or queries about who knows whom.
// A common approach to solve the Celebrity Problem is to use a two-pointer technique or a stack-based approach to
// eliminate non-celebrities and identify the potential celebrity.
// The problem has applications in social networks, recommendation systems, and other scenarios where relationships
//  between entities need to be analyzed.

// 24. Cross Shard Join
// Cross Shard Join is a technique used in distributed databases to perform join operations across multiple shards.
// In a sharded database, data is partitioned into different shards based on a sharding key, and each shard
// may reside on a different server or node.
// When a query requires data from multiple shards, a cross shard join is necessary to combine the results from the relevant shards.
// This can be challenging due to the distributed nature of the data and the potential for increased latency and
// complexity in query execution.
// Strategies for optimizing cross shard joins include minimizing the number of shards involved, using efficient join algorithms,
// and leveraging caching or pre-aggregation techniques.

// 25. Hotspot Problem
// The Hotspot Problem occurs in distributed systems when a particular resource or node becomes a bottleneck due to high
//  demand or traffic.
// This can lead to performance degradation, increased latency, and potential system failures if the hotspot is not addressed.

// Hotspots can arise from various factors, such as uneven data distribution, skewed workloads, or inefficient load balancing.
// To mitigate the hotspot problem, strategies such as data partitioning, load balancing, caching, and replication can be employed.
// Additionally, monitoring and analyzing system metrics can help identify hotspots early and allow for proactive measures to be taken.

// 26. PhonePe System Design Case Study


# System Design Interview Notes

### Simple Layman Terms + Real-World Examples + Interview Answers

Noor, these notes are based on your system design lecture topics. I've explained them in simple language with practical examples, especially for your Node.js, backend, AWS, and fintech interview preparation.

The goal is to understand the concept and explain it confidently in an interview—not memorize complicated definitions.

---

# 1. Database (DB)

### What is a database?

A database is a place where we store and manage application data.

Example:
In your PayFlow fintech project, you might store:

* User details
* Bank transactions
* Payment status
* Account balance

You can use PostgreSQL, MongoDB, or another database depending on your requirements.

### Layman example

Think of a database as an organized digital register.

Instead of maintaining customer information in a notebook, you store it electronically and retrieve it quickly.

### Interview answer

"A database is used to store, manage, and retrieve application data efficiently. Depending on the requirements, we can use relational databases like PostgreSQL or NoSQL databases like MongoDB."

### Follow-up: SQL vs NoSQL

| SQL                       | NoSQL                               |
| ------------------------- | ----------------------------------- |
| Tables and rows           | Flexible data structures            |
| Structured schema         | Often flexible schema               |
| Supports relational joins | Data may be embedded or distributed |
| PostgreSQL, MySQL         | MongoDB, DynamoDB                   |

Choose based on data relationships, consistency requirements, query patterns, and scalability needs.

---

# 2. Auto Scaling Group (ASG)

### What is ASG?

An Auto Scaling Group automatically increases or decreases the number of EC2 instances based on demand.

### Layman example

Imagine a restaurant.

* Normal days: 2 workers
* Busy days: 5 workers
* Less demand: 2 workers again

ASG works similarly by managing your application servers.

### Example: PayFlow

Your payment application normally receives 1,000 requests per minute.

During a festival sale, traffic increases to 10,000 requests per minute.

ASG can launch additional EC2 instances according to your configured scaling policies.

When demand decreases, it can remove unnecessary instances.

### Interview answer

"An Auto Scaling Group in AWS automatically manages the number of EC2 instances based on defined scaling policies. It helps maintain application availability and handle changing traffic while optimizing resource usage."

### Important concepts

* Minimum instances: Minimum number of instances to maintain.
* Maximum instances: Maximum number of instances allowed.
* Desired capacity: Target number of instances.
* Scaling policy: Rules that trigger scaling.

Example:
If CPU utilization remains above 70%, the ASG may launch another instance.

---

# 3. Database Replication

### What is replication?

Replication means maintaining copies of database data on multiple servers.

### Layman example

You have one original notebook and two photocopies.

If the original notebook is damaged, you can refer to a copy.

Similarly, database replicas can improve availability and support read traffic.

### Example

Your application has:

* Primary database → Handles writes
* Replica 1 → Handles reads
* Replica 2 → Handles reads

When a user updates their profile, the change is written to the primary database and replicated to the other databases.

### Types of replication

1. Synchronous replication
2. Asynchronous replication
3. Primary-replica architecture
4. Multi-primary architecture

### Synchronous vs asynchronous

| Synchronous                                                               | Asynchronous                                              |
| ------------------------------------------------------------------------- | --------------------------------------------------------- |
| Replication confirmation is required according to the configured protocol | Primary can acknowledge without waiting for every replica |
| Can increase write latency                                                | Lower write latency is possible                           |
| Helps maintain stronger consistency                                       | Replicas may temporarily lag                              |

### Interview answer

"Database replication means maintaining copies of data across multiple database servers. It improves availability and can help distribute read traffic. The replication strategy depends on consistency, latency, and fault-tolerance requirements."

### Fintech example

For a payment transaction, you need to consider how quickly replicas receive the confirmed transaction.

You should not assume that an asynchronously replicated read will always immediately reflect the latest write.

---

# 4. Point-in-Time Recovery (PITR)

### What is PITR?

Point-in-Time Recovery allows you to restore a database to a specific time before a problem occurred.

### Layman example

Imagine you accidentally delete important files at 3:00 PM.

You want to restore your computer to 2:55 PM.

PITR works similarly for supported databases.

### Example

Your payment database:

* 10:00 AM → Normal transactions
* 10:30 AM → Accidental deletion
* 11:00 AM → Problem discovered

You can restore the database to a point before the accidental deletion, depending on your backup and recovery configuration.

### How it works

1. Take a database backup.
2. Maintain transaction logs or equivalent recovery information.
3. Select a recovery time.
4. Restore the database.

### Interview answer

"Point-in-Time Recovery allows us to restore a database to a specific time using backups and transaction logs. It is useful for recovering from accidental deletion, corruption, or operational mistakes."

### AWS example

Amazon RDS supports point-in-time recovery for supported configurations.

---

# 5. Sharding

### What is sharding?

Sharding means splitting a large database into smaller databases called shards.

Each shard stores a portion of the data.

### Layman example

Imagine a school with 100,000 student records.

Instead of storing everything in one large register:

* Register 1 → Students A–F
* Register 2 → Students G–M
* Register 3 → Students N–Z

This is a simplified example of partitioning.

### Example: PayFlow

Suppose you have 100 million transaction records.

You distribute the records based on a sharding key, such as a customer ID.

* Shard 1 → Customers assigned to that shard
* Shard 2 → Customers assigned to that shard
* Shard 3 → Customers assigned to that shard

The exact distribution depends on the chosen partitioning strategy.

### Why use sharding?

* Handle larger datasets.
* Distribute database workload.
* Increase scalability.
* Reduce pressure on individual servers.

### What is a sharding key?

A sharding key determines which shard stores a particular record.

Example:
`customerId`

### Interview answer

"Sharding is a database partitioning technique where data is distributed across multiple independent shards. It helps scale large datasets and distribute workload, but we need to select an appropriate sharding key to avoid hotspots and expensive cross-shard queries."

---

# 6. Leader Election

### What is leader election?

Leader election is the process of selecting one node as the leader among multiple nodes.

The leader coordinates specific tasks for the group.

### Layman example

Imagine five people working on a project.

They select one team leader to:

* Coordinate tasks.
* Make certain decisions.
* Manage shared work.

If the leader becomes unavailable, the team selects another leader.

### Example: Distributed payment system

You have three backend nodes that process scheduled settlement tasks.

Without coordination, multiple nodes might execute the same settlement job.

Leader election can designate one node to coordinate that task.

### Interview answer

"Leader election is a distributed systems mechanism used to select a leader among multiple nodes. The leader coordinates specific operations, and a new leader can be elected if the existing leader fails."

### Important

Leader election alone does not guarantee that an old leader has stopped performing operations. Fencing and other safeguards may be needed.

---

# 7. Eventual Consistency

### What is eventual consistency?

Eventual consistency means that data changes may take some time to reach all replicas, but the replicas are expected to converge if updates stop and the system operates normally.

### Layman example

You change your WhatsApp profile picture.

One friend sees the new picture immediately, while another sees the old picture briefly.

After synchronization, both see the updated picture.

This is an analogy; actual application behavior depends on the system.

### Example: E-commerce

You update your product address.

* Primary database → Updated immediately
* Replica 1 → Updated after a short delay
* Replica 2 → Updated after a short delay

During replication lag, different reads may return different values.

### Advantages

* Can support high availability.
* Can reduce latency in distributed systems.
* Can help systems scale across replicas.

### Disadvantage

Users may temporarily read stale data.

### Interview answer

"Eventual consistency means that replicated data may temporarily differ, but replicas eventually converge when updates propagate successfully. It is useful when immediate consistency is not required for every operation."

### Fintech warning

For critical balance or payment confirmation operations, you must carefully choose the consistency model. You should not blindly rely on stale replica reads.

---

# 8. Hash Function

### What is a hash function?

A hash function converts input data into a fixed-size output.

### Layman example

Imagine a machine that takes a name and generates a number.

```text
Input: Noor
Output: 24567
```

The same input produces the same output when using the same deterministic hash function and configuration.

### Example: Sharding

Suppose you have three shards.

You calculate:

```text
hash(customerId) % 3
```

The result can be used to select a shard.

This simplified approach can cause redistribution when the number of shards changes.

### Properties

* Deterministic.
* Efficient to calculate.
* Good distribution for the intended use.
* Collisions are possible.

### Interview answer

"A hash function converts input data into a fixed-size output. In distributed systems, hashing can help distribute data across shards or route requests. A good distribution helps reduce uneven load."

### Important

Hashing is not encryption.

A cryptographic hash is designed for security-related properties, while a general distribution hash is designed for efficient data placement or lookup.

---

# 9. Single Region Critical Write

### What is it?

A design where critical write operations are directed to one designated region, while reads may be served from multiple regions.

### Layman example

Imagine a company with offices in:

* India
* USA
* Europe

All offices can read customer information, but only the India office is authorized to update a particular financial record.

This reduces the possibility of conflicting writes from multiple regions.

### Example: PayFlow

For a specific account's balance update:

```text
User in India → India write region
User in USA → India write region
User in Europe → India write region
```

Read operations might be served from regional replicas, depending on consistency requirements.

### Advantages

* Simplifies write coordination.
* Reduces conflicts between independent write regions.
* Can support a clear authoritative write path.

### Disadvantages

* Cross-region write latency.
* Dependence on the designated write region.
* Requires failover planning.

### Interview answer

"Single-region critical write routes important write operations to one authoritative region, while reads may be distributed across regions. It simplifies write coordination but can introduce latency and requires a reliable failover strategy."

---

# 10. Cluster Architecture

### What is a cluster?

A cluster is a group of interconnected computers working together.

### Layman example

Instead of one employee handling all work, you have a team of employees sharing the workload.

If one employee is unavailable, other employees may continue working.

### Example: Backend application

```text
                Load Balancer
                      |
          -----------------------
          |          |          |
       Server 1   Server 2   Server 3
```

Multiple servers work together to handle application requests.

### Benefits

* High availability.
* Scalability.
* Workload distribution.
* Fault tolerance.

### Interview answer

"Cluster architecture consists of multiple interconnected nodes working together to provide services. It can improve availability, scalability, and fault tolerance by distributing workloads across nodes."

---

# 11. Split Brain Problem

### What is split brain?

Split brain happens when nodes in a distributed system lose communication and multiple nodes believe they are authorized to act as the primary or leader.

### Layman example

A company has one manager.

Due to a communication failure, two teams cannot communicate with each other.

Both teams appoint themselves as the manager and start making conflicting decisions.

### Example

A database cluster contains three nodes:

```text
Node A
Node B
Node C
```

A network failure divides the nodes into isolated groups.

If coordination is poorly designed, more than one node may believe it is the primary.

This can result in conflicting writes or data corruption.

### How to prevent it?

* Quorum-based decisions.
* Fencing mechanisms.
* Consensus protocols.
* Proper leader election.
* Reliable failure detection.

### Interview answer

"Split brain occurs when multiple nodes in a distributed system believe they are the active leader or primary due to a communication failure. Quorum and fencing mechanisms help prevent conflicting operations."

---

# 12. Consistent Hashing

### What is consistent hashing?

Consistent hashing distributes keys across nodes while minimizing the amount of data that needs to move when nodes are added or removed.

### Why do we need it?

Consider this approach:

```text
hash(key) % numberOfServers
```

If the number of servers changes, many keys may map to different servers.

Consistent hashing reduces this redistribution in many common designs.

### Layman example

Imagine a circular arrangement of servers.

```text
          Server A

    Server C       Server B
```

Keys are mapped to positions on the same circular hash space.

Each key is assigned to a server according to the selected routing rule.

When a server is added, only a portion of the keys generally needs to move.

### Example: Redis caching

You have multiple cache servers.

When you add a new cache server, you want to avoid invalidating or moving all existing keys.

Consistent hashing can help minimize reassignment.

### Interview answer

"Consistent hashing distributes keys across a circular hash space. When nodes are added or removed, only a relatively small portion of keys needs to be reassigned compared with simple modulo hashing."

### Important follow-up

Virtual nodes are commonly used to improve distribution and reduce imbalance between physical nodes.

---

# 13. Quorum

### What is quorum?

Quorum means obtaining enough agreement or participation from a defined group of nodes for an operation.

A majority quorum is typically more than half of the nodes.

### Example

You have three nodes:

```text
Node A
Node B
Node C
```

Majority = 2 nodes.

If two nodes agree, a majority decision can be made under the protocol's rules.

### Layman example

Three committee members must vote.

At least two members need to agree to approve a decision.

### Example: Leader election

A three-node cluster may require two nodes to form a majority.

If only one node is available, it cannot form a majority.

### Interview answer

"Quorum is the minimum required participation or agreement from nodes for an operation. In a majority-based three-node cluster, two nodes are required. Quorum helps support consistent decisions and fault tolerance."

### Important

Quorum rules vary by system. A majority quorum is not automatically required for every distributed operation.

---

# 14. Fencing Token

### What is a fencing token?

A fencing token helps prevent an old or unauthorized node from performing operations on a shared resource.

### Layman example

Imagine a factory machine.

Only the worker holding the latest valid authorization token can operate it.

Even if an old worker thinks they still have permission, the machine rejects their outdated token.

### Example: Distributed database

1. Node A becomes leader and receives token 10.
2. Node A loses connectivity.
3. Node B becomes leader and receives token 11.
4. Node A later attempts a write using token 10.
5. The resource rejects the stale token.

This requires the resource to validate tokens correctly.

### Why is it useful?

It helps prevent stale leaders from performing conflicting operations.

### Interview answer

"A fencing token is a mechanism that prevents stale or unauthorized nodes from accessing a shared resource. A resource validates the token, so operations using an older token can be rejected."

### Key difference

Leader election selects the leader.

Fencing helps prevent an old leader from continuing to perform protected operations.

---

# 15. Majority Token

### What is a majority token?

Your lecture uses the term "majority token" for a mechanism that requires majority participation or agreement before a critical action.

This concept overlaps with quorum.

### Layman example

A team of five members needs at least three members to approve an important decision.

### Example

A distributed system has five nodes.

A majority requires:

```text
5 / 2 = 2.5
Majority = 3 nodes
```

Three nodes are needed to form a majority under this simplified majority rule.

### Interview answer

"A majority-based decision requires agreement or participation from more than half of the relevant nodes. It is commonly associated with quorum-based coordination and consensus."

### Interview tip

Ask which specific system or protocol is being discussed if the interviewer uses "majority token." The term can have different meanings in different designs.

---

# 16. Re-sharding

### What is re-sharding?

Re-sharding means redistributing data across shards, often because the current distribution or capacity is no longer suitable.

### Layman example

You have three warehouses:

* Warehouse A → 80% full
* Warehouse B → 20% full
* Warehouse C → 10% full

You reorganize the inventory to distribute it more evenly.

### Example

Initially:

```text
Shard 1 → 70% of traffic
Shard 2 → 20% of traffic
Shard 3 → 10% of traffic
```

Shard 1 becomes a bottleneck.

You redesign the partitioning or add capacity and redistribute the data.

### Why re-sharding?

* Uneven data distribution.
* Hotspots.
* Increased storage requirements.
* Performance bottlenecks.

### Strategies

1. Online re-sharding: Migrate data while the system remains available.
2. Offline re-sharding: Temporarily stop or restrict operations during migration.

### Interview answer

"Re-sharding is the process of redistributing data across database shards to improve scalability and load distribution. It requires careful planning to maintain data integrity and minimize downtime."

---

# 17. Mutex

### What is a mutex?

A mutex (mutual exclusion) allows only one thread or process to enter a protected critical section at a time.

### Layman example

Imagine one bathroom with a single key.

* Person A takes the key.
* Person B waits.
* Person A returns the key.
* Person B can enter.

The key represents exclusive access.

### Example: Backend

Suppose two requests try to update the same local shared resource simultaneously.

A mutex can ensure that only one operation enters the protected section at a time.

### Race condition

A race condition occurs when the outcome depends on the timing of concurrent operations.

### Interview answer

"A mutex is a synchronization mechanism that provides mutual exclusion. It ensures that only one thread or process can access a protected critical section at a time, helping prevent race conditions."

### Important

A regular in-memory mutex usually protects resources within one process.

For multiple backend servers, you need a suitable distributed coordination or locking approach.

---

# 18. etcd

### What is etcd?

etcd is a distributed key-value store commonly used to store configuration, metadata, and coordination information.

It uses the Raft consensus algorithm.

### Layman example

Imagine a shared, reliable register used by a team.

The team stores:

* Current leader information.
* Configuration.
* Service information.
* Cluster state.

Multiple nodes maintain consistent copies according to the consensus protocol.

### Example: Kubernetes

Kubernetes uses etcd to store important cluster state, including information about resources and configuration.

### Interview answer

"etcd is a distributed, consistent key-value store used for configuration management, metadata, and coordination. It uses the Raft consensus algorithm and supports features such as watches and leases."

### Important

etcd is not a replacement for your primary business database in every application. It is commonly used for coordination and control-plane state.

---

# 19. Apache ZooKeeper

### What is ZooKeeper?

Apache ZooKeeper is a distributed coordination service.

It helps distributed applications coordinate configuration, naming, synchronization, and leader election.

### Layman example

Imagine an office coordination system that tells employees:

* Who is the leader?
* Which resources are available?
* What configuration should everyone follow?
* Who currently holds a lock?

### Example

A distributed application can use ZooKeeper for:

* Leader election.
* Configuration management.
* Distributed locks.
* Service discovery.

### Interview answer

"Apache ZooKeeper is a distributed coordination service that provides features for synchronization, configuration management, leader election, and distributed locking."

### etcd vs ZooKeeper

| etcd                        | ZooKeeper                                |
| --------------------------- | ---------------------------------------- |
| Distributed key-value store | Distributed coordination service         |
| Uses Raft                   | Uses Zab protocol                        |
| Commonly used by Kubernetes | Used in various distributed applications |
| Supports watches and leases | Supports watches and ephemeral nodes     |

---

# 20. Round Robin Load Balancing

### What is round robin?

Round robin distributes requests among servers in a circular sequence.

### Example

You have three servers:

```text
Server A
Server B
Server C
```

Requests:

```text
Request 1 → A
Request 2 → B
Request 3 → C
Request 4 → A
Request 5 → B
Request 6 → C
```

### Layman example

Three employees take turns handling customers.

### Advantages

* Simple.
* Easy to implement.
* Useful when servers have similar capacity and requests have relatively similar workloads.

### Disadvantages

* Does not automatically account for current server load.
* Requests may have different processing times.
* Equal request counts do not guarantee equal resource usage.

### Interview answer

"Round robin load balancing distributes requests across servers in a circular order. It is simple and works well when servers have similar capacities, but it does not consider real-time server load."

### AWS example

Application Load Balancer supports several routing approaches, but you should verify the exact algorithm and configuration for the AWS service you're discussing.

---

# 21. Sticky Sessions

### What are sticky sessions?

Sticky sessions, also called session affinity, route a user's requests to the same backend server for a period or session according to the configured mechanism.

### Layman example

You visit a bank counter.

The bank assigns you to Employee A.

You continue visiting Employee A instead of switching employees for every request.

### Example

```text
User 1 → Server A
User 1 → Server A
User 1 → Server A
```

Another user might be routed to Server B.

### When useful?

When an application stores session-specific state locally on a server.

### Problems

* Uneven load distribution.
* Server failure can affect the session.
* Scaling can become more complicated.

### Better approach for many modern applications

Use stateless application servers and store shared session state in a suitable external store, such as Redis, when required.

### Interview answer

"Sticky sessions ensure that requests from a user are routed to the same backend server. They can help applications that maintain local session state, but they can cause uneven load distribution and complicate failover."

---

# 22. AWS CloudWatch

### What is CloudWatch?

AWS CloudWatch is a monitoring and observability service that collects and provides access to metrics, logs, and events.

### Layman example

Imagine a car dashboard.

It shows:

* Speed.
* Fuel level.
* Engine temperature.
* Warning signals.

CloudWatch acts as a monitoring dashboard for your AWS resources and applications.

### Example: EC2

You can monitor:

* CPU utilization.
* Network traffic.
* Instance-related metrics.
* Application logs when configured.

### Example: PayFlow

You could monitor:

* API response time.
* Failed payment requests.
* Error rates.
* CPU usage.
* Database-related metrics.

You can configure alarms for specific conditions.

### Interview answer

"AWS CloudWatch is a monitoring and observability service that helps collect metrics, logs, and events from AWS resources and applications. We can use it to monitor performance, configure alarms, and identify operational problems."

### Example alarm

```text
If CPU utilization > 80%
For 5 minutes
Trigger an alarm
```

The actual threshold and action depend on your configuration.

---

# 23. Celebrity Problem

### What is the celebrity problem?

This is a classic problem where you need to identify a person who is known by everyone else but does not know anyone else.

### Example

There are four people:

```text
A, B, C, D
```

You need to identify the celebrity, if one exists.

A celebrity satisfies:

1. Everyone else knows the celebrity.
2. The celebrity knows nobody else.

### Layman example

Imagine a party.

One person is famous to everyone, but that person doesn't know anyone at the party.

You need to identify them with as few questions as possible.

### Common approach

Use a two-pointer elimination strategy.

The standard solution can be implemented in O(n) time when the relationship query takes O(1) time.

### Interview answer

"The celebrity problem is a problem where we identify a person known by everyone else but who knows nobody else. We can use an elimination approach to find a candidate and then verify whether the candidate satisfies both conditions."

### Important

Finding a candidate is not enough. You must verify the candidate.

---

# 24. Cross-Shard Join

### What is a cross-shard join?

A cross-shard join combines data stored in different database shards.

### Layman example

You have two registers:

* Register A → Customer details
* Register B → Transaction details

You need information from both registers to generate a report.

### Example: PayFlow

Customer data:

```text
Shard 1:
customerId: 101
name: Noor
```

Transaction data:

```text
Shard 2:
customerId: 101
amount: 5000
```

You need to combine these records to show the customer and their transaction.

### Why is it challenging?

* Data is distributed.
* Multiple servers may need to be queried.
* Network latency can increase.
* Query coordination becomes more complex.

### How to reduce the problem?

* Choose an appropriate sharding key.
* Keep commonly joined data together where practical.
* Use application-level aggregation.
* Use caching or pre-aggregated data where appropriate.

### Interview answer

"A cross-shard join combines data from multiple database shards. It can increase query latency and complexity because data is distributed. We should design the sharding strategy to minimize frequent cross-shard operations."

---

# 25. Hotspot Problem

### What is a hotspot?

A hotspot occurs when one resource, server, or partition receives disproportionately high traffic or workload.

### Layman example

Imagine a supermarket with five billing counters.

Four counters have five customers each.

One counter has 100 customers.

That counter becomes a hotspot.

### Example: Database sharding

You shard data based on a customer ID.

But one customer is extremely active and generates most of the traffic.

The shard containing that customer's data may receive disproportionate load.

### Effects

* High latency.
* Uneven resource usage.
* Performance degradation.
* Potential service failures.

### Solutions

* Improve partitioning strategy.
* Distribute workload.
* Use caching.
* Replicate data where appropriate.
* Monitor system metrics.
* Use suitable load balancing.

### Interview answer

"A hotspot occurs when a particular server, resource, or partition receives disproportionately high traffic. It can cause increased latency and performance issues. We can reduce hotspots through better partitioning, load distribution, caching, and monitoring."

---

# 26. PhonePe System Design Case Study

Your lecture lists PhonePe as the final system design case study, but the uploaded notes do not include its actual architecture or discussion. 

Below is a separate practice framework—not a summary of the missing lecture content.

## How to approach a fintech system design interview

Suppose the interviewer asks:

"Design a payment system similar to PhonePe."

### Step 1: Clarify requirements

Ask:

* Can users send money?
* Do we support bank transfers?
* Do we need transaction history?
* Should users receive notifications?
* What happens when a payment fails?
* Do we need refunds?

### Step 2: Identify major components

```text
Client
   |
API Gateway / Load Balancer
   |
Backend Services
   |
----------------------------
|            |             |
User       Payment       Notification
Service    Service       Service
   |
Database
```

This is a simplified conceptual architecture.

### Step 3: Think about important fintech requirements

* Authentication and authorization.
* Idempotency.
* Transaction consistency.
* Secure payment processing.
* Failure handling.
* Monitoring and audit records.
* Reconciliation.

### Interview example

Interviewer:
"What happens if the payment request is sent twice?"

You:
"I would use an idempotency key for the payment request. The backend would ensure that repeated requests with the same key do not create duplicate payment operations. I would also maintain appropriate transaction status and audit records."

---

# Most Important Concepts to Revise First

For your backend and AWS interview preparation, you should be able to explain these concepts clearly:

| Topic                | What you should understand                     |
| -------------------- | ---------------------------------------------- |
| Database             | SQL vs NoSQL and data storage                  |
| ASG                  | Automatic EC2 scaling                          |
| Replication          | Copies of database data                        |
| PITR                 | Restoring to a specific time                   |
| Sharding             | Splitting data across databases                |
| Leader Election      | Selecting a coordinator                        |
| Eventual Consistency | Replication delay and convergence              |
| Hash Function        | Mapping data to a hash output                  |
| Consistent Hashing   | Minimizing key movement                        |
| Quorum               | Required agreement/participation               |
| Fencing Token        | Preventing stale-node operations               |
| Mutex                | Exclusive access to shared resources           |
| etcd                 | Distributed coordination and key-value storage |
| ZooKeeper            | Distributed coordination                       |
| Round Robin          | Circular request distribution                  |
| Sticky Sessions      | Routing a session to one server                |
| CloudWatch           | AWS monitoring                                 |
| Hotspot              | Uneven traffic or workload                     |

---

# 10 Interview Questions for Practice

Try answering these without looking at the notes.

### Q1. What is the difference between replication and sharding?

Hint:

* Replication = Copies of data.
* Sharding = Splitting data.

### Q2. Why do we use Auto Scaling Groups?

Hint:
Think about changing traffic and EC2 instance capacity.

### Q3. What is the split brain problem?

Hint:
Multiple nodes believe they are the active leader.

### Q4. What is the difference between quorum and fencing?

Hint:

* Quorum → Agreement/participation.
* Fencing → Preventing stale or unauthorized operations.

### Q5. Why is consistent hashing better than simple modulo hashing when nodes change?

Hint:
Think about how many keys need reassignment.

### Q6. What is eventual consistency?

Hint:
Data may temporarily differ across replicas.

### Q7. What is a hotspot in a database?

Hint:
One partition or resource receives disproportionate workload.

### Q8. What is the difference between a mutex and a distributed lock?

Hint:
Consider whether the protected resource spans multiple processes or machines.

### Q9. Why is PITR useful in fintech?

Hint:
Accidental deletion, corruption, and recovery requirements.

### Q10. How would you prevent duplicate payment requests?

Hint:
Idempotency key + transaction status + appropriate data consistency.

---

# Simple Study Strategy for You

Since you're building PayFlow and preparing for backend/system design interviews:

### Phase 1: Understand the fundamentals

Study:

1. Database
2. Replication
3. Sharding
4. Consistency
5. Load balancing

### Phase 2: Learn distributed systems

Study:

1. Leader election
2. Quorum
3. Split brain
4. Fencing tokens
5. Mutex
6. etcd and ZooKeeper

### Phase 3: Apply AWS concepts

Study:

1. EC2
2. Auto Scaling Groups
3. CloudWatch
4. RDS
5. S3
6. IAM

### Phase 4: Practice fintech architecture

Apply your learning to:

* Payment processing.
* Transaction history.
* Idempotency.
* Database design.
* Failure handling.
* Monitoring.

---

## Final Interview Tip

Don't try to memorize complicated definitions.

For every system design topic, remember these three things:

1. What problem does it solve?
2. How does it work?
3. What are its advantages and disadvantages?

For example:

"Why do we use sharding?"

A good simple answer:

"Sharding helps distribute a large database across multiple servers. It improves scalability, but we need to choose a good sharding key to avoid hotspots and expensive cross-shard queries."

That's the kind of explanation you should aim for in your interviews.

