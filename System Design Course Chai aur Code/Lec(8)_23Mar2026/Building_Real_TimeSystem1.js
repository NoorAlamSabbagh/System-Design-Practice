//<============Lec8: Building Real time Applications - Part 2 ============>
//(1)MediaSoup is a popular open-source library that provides a framework for building real-time communication applications, 
//such as video conferencing and live streaming. It is designed to handle WebRTC connections and provides features like media routing, recording, and broadcasting. MediaSoup allows developers to create scalable and efficient real-time applications by managing the complexities of WebRTC and providing a high-level API for handling media streams.

//(2)What is the real time system: A real-time system is a type of computer system that is designed to process data and provide responses within a specified time constraint.
//These systems are often used in applications where timely and predictable responses are critical, such as in industrial control systems, robotics, telecommunications, 
//and multimedia applications. Real-time systems can be classified into two main categories: hard real-time systems, which have strict timing requirements and must meet deadlines, and soft real-time systems, which have more flexible timing requirements and can tolerate some delays.
//(3)What is near real time system: A near real-time system is a type of computer system that processes data and provides responses with minimal delay, but not necessarily within strict timing constraints.
// For example, a near real-time system may process data and provide responses within a few seconds or milliseconds, but it may not guarantee that all responses will be delivered within a specific time frame. 
// Near real-time systems are often used in applications where timely responses are important, but strict timing requirements are not necessary, such as in online gaming, social media platforms, and financial trading systems.


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
