//<============Lec8: Building Real time Applications - Part 2 ============>
// Design a cache store
//Eviction policy in system design is a strategy used to determine which items to remove from a cache when it reaches its capacity. The goal of an eviction policy is to optimize the performance of the cache by keeping the most relevant and frequently accessed data while removing less important or less frequently accessed data. Here are some common eviction policies:
//1. LRU (Least Recently Used): Evict the least recently accessed item when the cache is full.
//2. LFU (Least Frequently Used): Evict the least frequently accessed item when the cache is full.
//3. FIFO (First In First Out): Evict the oldest item in the cache when it is full.
//4. Random: Evict a random item from the cache when it is full.

//consistent hashing problem: Consistent hashing is a technique used in distributed systems
//  to distribute data across multiple nodes while minimizing the impact of node additions
// or removals. The main problem it addresses is how to efficiently distribute data across
//  a cluster of nodes without causing significant disruption when nodes are added or removed.
//  In consistent hashing, each node is assigned a position on a hash ring, and data items
// are also hashed to determine their position on the ring. When a node is added or removed,
//  only a small portion of the data needs to be redistributed,
// which helps maintain system performance and scalability.

//Simple polling: Simple polling is a technique used in distributed
//systems to check the status of a resource or service at regular intervals.
// It involves sending periodic requests to the resource or service to determine its availability
// or to retrieve data. This method can be inefficient and may lead to increased latency and
//  unnecessary network traffic, especially if the resource or service is frequently unavailable
// or if the polling interval is too short. Alternative approaches, such as event-driven architectures
// or using message queues, can help reduce the drawbacks of simple polling by allowing for more
// efficient communication and resource management.

// eg: Design a cache store for a web application that serves user profiles.
// The cache should store user profile data to improve response times and reduce database load.
// The cache should implement an eviction policy to manage its capacity effectively.
//  Additionally, the cache should be designed to handle concurrent access from multiple users and ensure data consistency.

// To design a cache store for a web application that serves user profiles, we can follow these steps:

//(4)Long Polling: Long polling is a technique used in web applications to maintain a
// persistent connection between the client and server. Instead of the client sending periodic
//  requests to check for updates, the server holds the request open until new data is available or a timeout occurs.
//  This allows for real-time updates without the need for constant polling, reducing latency and improving user experience.
//  When new data is available, the server responds to the client's request, and the client can then send a new long poll request to
//  continue receiving updates.

// eg: Design a cache store for a web application that serves user profiles.
// The cache should store user profile data to improve response times and reduce database load.
// The cache should implement an eviction policy to manage its capacity effectively.
//  Additionally, the cache should be designed to handle concurrent access from multiple users and ensure data consistency.

// (5)WebRTC: WebRTC (Web Real-Time Communication) is a technology that enables peer-to-peer communication between
// web browsers and mobile applications. It allows for real-time audio, video, and data sharing without
//  the need for plugins or third-party software. WebRTC is commonly used for applications such as video conferencing,
// online gaming, and file sharing. It provides a secure and efficient way to establish direct communication between users,
//  reducing latency and improving the overall user experience.
// eg: Design a cache store for a web application that serves user profiles.
// The cache should store user profile data to improve response times and reduce database load.
// The cache should implement an eviction policy to manage its capacity effectively.
// Additionally, the cache should be designed to handle concurrent access from multiple users and ensure data consistency.
