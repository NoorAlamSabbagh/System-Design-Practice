//<============Lec7: Cache to Cloud : Scaling System with Caching and Cloud Services ============>
// A cache is a hidden storage space, a temporary memory location for fast data access,
// or a stash of items. It comes from a French word meaning "to hide"

//check about memcache, Valkey, redis, etc.
//Magic Number:
//Eviction policy in Redis: Redis uses an eviction policy to determine which keys to remove when the memory limit is reached.
// The eviction policy can be configured using the "maxmemory-policy" setting in the Redis configuration file. Some common eviction policies in Redis include:
//1. noeviction: No keys will be evicted, and write operations will return an error when the memory limit is reached.
//2. allkeys-lru: Evict the least recently used (LRU) keys from the entire keyspace when the memory limit is reached.
// An eviction policy is a rule set used to remove old data from a cache when it runs out of space.
// The main strategies are Least Recently Used (LRU), Least Frequently Used (LFU), and First-In, First-Out (FIFO).
// Choosing the right policy helps keep fast memory free for important data

// The best data structure to implement a Least Recently Used (LRU) cache is a combination of a Hash Map and a Doubly Linked List.
// Alternatively, if you are selecting from a standard multiple-choice list of single structures, LinkedHashMap (in Java) or OrderedDict (in Python) is the best built-in
// choice because they natively combine these two structures.Why this combination is usedTo make a cache efficient, both the get() (lookup) and put() (insert/evict) operations must run in \(O(1)\) constant time complexity.
// A single data structure cannot achieve this alone:Hash Map: Provides \(O(1)\) time complexity for lookups. It maps a key to a specific node in the cache, but it cannot maintain the order of usage.Doubly Linked List: Provides \(O(1)\) time complexity
// for insertions and deletions at any position (given the node's reference). It tracks the recency of data by keeping the most recently used items at the head and least recently used items at the tail.How they work togetherCache Hit (get):
// The Hash Map instantly finds the node in the Doubly Linked List via its key (\(O(1)\)). The node is then moved to the head of the list to mark it as most recently used (\(O(1)\)).Cache Insertion/Eviction (put): New items are added directly to the head of the list and registered in the Hash Map.
// If the cache reaches its capacity limit, the item at the tail of the Doubly Linked List (the oldest, least recently used item) is removed from both the list and the Hash Map in \(O(1)\) time

//Read Through Cache: When a request is made, the system first checks the cache. If the data is present (cache hit), it is returned immediately. If not (cache miss), the system retrieves the data from the primary data store, returns it to the client, and stores it in the cache for future requests.

// Design a cache store in System Design:
// A cache store is a temporary storage layer that holds frequently accessed data to improve the performance and efficiency of a system.
// It acts as an intermediary between the client and the primary data store, allowing for faster data retrieval and reducing the load on the underlying database or storage system.
// The cache store can be implemented using various technologies, such as in-memory databases (e.g., Redis, Memcached) or distributed caching systems. It is commonly used in web applications,
// content delivery networks (CDNs), and other scenarios where low latency and high throughput are critical.
// Eviction policy in system design is a strategy used to determine which items to remove from a cache when it reaches its capacity. The goal of an eviction policy is to optimize the performance of
// the cache by keeping the most relevant and frequently accessed data while removing less important or less frequently accessed data. Here are some common eviction policies:
//1. LRU (Least Recently Used): Evict the least recently accessed item when the cache is full.
//2. LFU (Least Frequently Used): Evict the least frequently accessed item when the cache is full.
//3. FIFO (First In First Out): Evict the oldest item in the cache when it is full.
//4. Random: Evict a random item from the cache when it is full.

//Hash Function in cache design: A hash function is a mathematical algorithm that takes an input (or "key") and produces a fixed-size string of characters, which is typically a hash code. In cache design, hash functions are used to map keys to specific locations in the cache storage, allowing for efficient data retrieval and storage. The main purposes of using hash functions in cache design include:
//1. Efficient Data Retrieval: Hash functions enable quick access to cached data by converting keys into hash codes, which can be used to index into the cache storage.
//2. Collision Resolution: Hash functions help manage collisions (when two keys produce the same hash code) through techniques like chaining or open addressing, ensuring that all data can be stored and retrieved correctly.
//3. Load Balancing: In distributed caching systems, hash functions can distribute keys evenly across multiple cache nodes, preventing any single node from becoming a bottleneck.
//4. Consistency: Hash functions provide a consistent way to map keys to cache locations, ensuring that the same key always maps to the same location, which is crucial for maintaining data integrity in the cache.

// https://www.geeksforgeeks.org/system-design/consistent-hashing/
// #Consistent Hashing (Layman Explanation)
// Consistent Hashing is a technique used to distribute data across multiple servers so that when a server is added
// or removed, only a small amount of data needs to move.

// #Imagine 3 Lockers
// Suppose you have 3 lockers:
// Locker A
// Locker B
// Locker C

// You store students' bags like this:
// Ali   → Locker A
// Noor  → Locker B
// Aman  → Locker C
// Now the school adds a 4th locker (Locker D).

// ### Without Consistent Hashing
// Everyone has to recalculate their locker.
// Ali   → D
// Noor  → A
// Aman  → C
// Rahul → B

// Almost every bag moves.
// ❌ Very slow and inefficient.

// #With Consistent Hashing
// Only the students whose bags belong in the new locker move.
// Locker A
// Locker B
// Locker C
// Locker D

// Maybe only:
// Noor → D
// Everyone else stays where they are.

// ✅ Very efficient.
// # Real-World Example

// Suppose you have 3 cache servers.
// Server A
// Server B
// Server C

// Data is stored like this:
// User 1 → A
// User 2 → B
// User 3 → C
// User 4 → A
// User 5 → B
// Now traffic increases, so you add Server D.

// Without consistent hashing:

// Almost every user changes servers.

// Millions of cache entries must be moved.

// With consistent hashing:
// Only a small portion moves to Server D.
// Most cached data stays where it is.

// # Why Is It Needed?
// Imagine Netflix has:
// 100 million users
// 50 cache servers

// If they add one new server and every user's data has to move:
// *Huge network traffic
// *Cache misses
// *Slow response times

// With consistent hashing:
// * Only about 1/51 of the data moves (roughly the share for the new server).
// * The rest stays on the existing servers.

// # Where Is It Used?
// * Redis Cluster
// * Memcached
// * Apache Cassandra
// * DynamoDB
// * Amazon S3 (internally for some distribution mechanisms)
// * Load balancers
// * Distributed caching systems
// * Distributed databases

// # Advantages
// * Only a small amount of data moves when servers are added or removed.
// * Better load distribution.
// * Easier horizontal scaling.
// * Fewer cache misses.
// * High availability.

// # Simple Comparison

// ### Without Consistent Hashing
// 3 Servers
//       ↓
// Add 1 Server
//       ↓
// Almost ALL data moves ❌

// ### With Consistent Hashing
// 3 Servers
//       ↓
// Add 1 Server
//       ↓
// Only a small amount of data moves ✅

// # Interview Definition
// >Consistent Hashing is a data distribution technique used in distributed systems to map data across multiple servers.
// Its key advantage is that when a server is added or removed, only a small portion of the data is remapped, minimizing data movement 
// and improving scalability and availability.

// ## One-Line Memory Trick
// > Normal hashing moves almost all data when servers change; consistent hashing moves only the data affected by the added or removed server.

//consistent hashing problem: Consistent hashing is a technique used in distributed systems
//  to distribute data across multiple nodes while minimizing the impact of node additions
// or removals. The main problem it addresses is how to efficiently distribute data across
//  a cluster of nodes without causing significant disruption when nodes are added or removed.
//  In consistent hashing, each node is assigned a position on a hash ring, and data items
// are also hashed to determine their position on the ring. When a node is added or removed,
//  only a small portion of the data needs to be redistributed,
// which helps maintain system performance and scalability.
