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
// It helps maintain application availability and allows you to scale your Amazon EC2 capacity up or down automatically according to conditions you define.
// ASGs can be configured to launch or terminate instances based on various metrics, such as CPU utilization, network traffic, or custom CloudWatch metrics.
// This ensures that your application can handle varying levels of traffic while optimizing costs by only using the necessary resources.

// 3. Database Replication
// Database replication is the process of copying and maintaining database objects, such as tables, in multiple database servers.
// It is used to improve data availability, fault tolerance, and performance.
// There are different types of replication, including master-slave replication, master-master replication, and multi-master replication.
// Replication can be synchronous (where changes are immediately propagated to replicas) or asynchronous (where changes are propagated with some delay).
// It is important to consider the consistency model and potential conflicts when implementing database replication.

// 4. Point-in-Time Recovery
// Point-in-Time Recovery (PITR) is a feature that allows you to restore a database to a specific point in time.
// This is particularly useful in scenarios where data has been accidentally deleted or corrupted.
// PITR typically involves taking regular backups of the database and maintaining transaction logs that record all changes made to the database.
// In the event of a failure, you can use the backups and transaction logs to restore the database to the desired point in time, minimizing data loss and downtime.

// 5. Sharding
// Sharding is a database partitioning technique that involves splitting a large database into smaller, more manageable pieces called shards.
// Each shard is a separate database that contains a subset of the data, and together they form the complete dataset.
// Sharding can improve performance and scalability by distributing the load across multiple servers.
// It is important to choose an appropriate sharding key to ensure even distribution of data and to minimize
// cross-shard queries, which can be expensive in terms of performance.
// Examples of sharding include horizontal sharding (where rows are distributed across shards) and vertical sharding 
// (where columns are distributed across shards).

// 6. Leader Election
// Leader election is a process used in distributed systems to designate a single node as the leader or coordinator among a group of nodes.
// The leader is responsible for managing tasks, coordinating actions, and making decisions on behalf of the group.
// Leader election algorithms ensure that there is only one leader at any given time and that the system can recover from failures by electing a new leader when necessary.
// Common algorithms for leader election include the Bully algorithm, the Ring algorithm, and the Paxos algorithm.
// Leader election is crucial for maintaining consistency and coordination in distributed systems, especially in scenarios where multiple nodes need to work together to achieve a common goal.

// 7. Eventual Consistency
// Eventual consistency is a consistency model used in distributed systems where updates to a data item will eventually propagate to all replicas, but there may be a delay before all replicas reflect the update.
// In an eventually consistent system, it is possible for different replicas to return different values for the same data item at the same time, but they will eventually converge to the same value.
// This model is often used in systems that prioritize availability and partition tolerance over immediate consistency, such as NoSQL databases and distributed caches.
// Eventual consistency can lead to scenarios where clients may read stale data, so it is important to design applications with this in mind and consider the trade-offs between consistency and availability.

// 8. Hash Function
// A hash function is a mathematical function that takes an input (or "message") and returns a fixed-size string of bytes, typically a hash code.
// The output is usually a unique representation of the input data, and even small changes to the input can produce a significantly different hash code.
// Hash functions are commonly used in various applications, such as data indexing, password storage, and distributed systems for tasks like sharding and load balancing.
// A good hash function should have properties such as being deterministic, fast to compute, and producing a uniform distribution of hash codes to minimize collisions (where different inputs produce the same hash code).