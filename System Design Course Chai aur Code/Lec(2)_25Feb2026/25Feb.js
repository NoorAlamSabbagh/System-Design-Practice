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
