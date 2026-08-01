//<============Lec7: Cache to Cloud : Scaling System with Caching and Cloud Services ============>
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
