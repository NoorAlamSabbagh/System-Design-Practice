//<============Lec8: Building Real time Applications - Part 2 ============>
//(1)MediaSoup is a popular open-source library that provides a framework for building real-time communication applications, 
//such as video conferencing and live streaming. It is designed to handle WebRTC connections and provides features like media routing, recording, and broadcasting. MediaSoup allows developers to create scalable and efficient real-time applications by managing the complexities of WebRTC and providing a high-level API for handling media streams.

//(2)What is the real time system: A real-time system is a type of computer system that is designed to process data and provide responses within a specified time constraint.
//These systems are often used in applications where timely and predictable responses are critical, such as in industrial control systems, robotics, telecommunications, 
//and multimedia applications. Real-time systems can be classified into two main categories: hard real-time systems, which have strict timing requirements and must meet deadlines, and soft real-time systems, which have more flexible timing requirements and can tolerate some delays.
//(3)What is near real time system: A near real-time system is a type of computer system that processes data and provides responses with minimal delay, but not necessarily within strict timing constraints.
// For example, a near real-time system may process data and provide responses within a few seconds or milliseconds, but it may not guarantee that all responses will be delivered within a specific time frame. 
// Near real-time systems are often used in applications where timely responses are important, but strict timing requirements are not necessary, such as in online gaming, social media platforms, and financial trading systems.

//Note Most audio video used UDP protocol for real time communication because it is faster than TCP protocol. UDP is a connectionless protocol that does not guarantee delivery or order of packets, making it suitable for real-time applications where low latency is critical. In contrast, TCP is a connection-oriented protocol that provides reliable delivery and ordering of packets, but can introduce delays due to retransmissions and acknowledgments. Therefore, UDP is often preferred for real-time audio and video streaming, where timely delivery of data is more important than reliability.

// ## TCP vs UDP — Layman Term
// Think of sending a parcel 📦:
// ### TCP = Reliable courier
// TCP makes sure the data reaches correctly and in the right order.
// You → TCP → Server
//        ↓
// "Did you receive packet 1?"
// "Yes"
// "Packet 2?"
// "Yes"

// If something is lost, TCP resends it.
// Use TCP when correctness is more important than speed.
// Examples:
// * 🌐 Websites — HTTP/HTTPS
// * 🔐 Secure communication
// * 📧 Email
// * 📁 File downloads/uploads
// * 🗄️ Database connections
// #UDP = Fast delivery
// UDP simply sends the data without waiting for confirmation.
// You → UDP → Server
//        ↓
//     Send and move on

// If a packet is lost, UDP generally doesn't resend it itself.
// Use UDP when speed/low latency is more important than perfect delivery.
// Examples:
// * 🎮 Online gaming
// * 📞 Voice calls
// * 📹 Video calls
// * 📺 Live streaming
// * ⚡ DNS queries

// ## Simple Difference
// | TCP                     | UDP                              |
// | ----------------------- | -------------------------------- |
// | Reliable                | Less reliable                    |
// | Slower                  | Faster                           |
// | Connection-oriented     | Connectionless                   |
// | Resends lost data       | Doesn't guarantee retransmission |
// | Data arrives in order   | Order isn't guaranteed           |
// | Good for websites/files | Good for real-time communication |

// ### Easy memory trick

// >TCP = "Make sure everything arrives."
// > UDP = "Send it quickly; don't wait."
// Why do we need both?
// Because different applications have different priorities.
// Downloading a PDF:
// Missing 1 byte ❌
// → File can become corrupted
// → TCP ✅

// Video call:
// Missing 1 video frame ❌
// → Don't stop and wait
// → Keep talking
// → UDP ✅

// That's why real-time applications commonly prefer UDP: a small amount of lost data is usually better than waiting 
// for old data and increasing latency.

//
// #QUIC — Short Layman Explanation
// QUIC is a modern network protocol built on top of UDP that tries to give you the speed of UDP + reliability/security features similar to TCP.
// Think:
// >TCP = reliable but can be slower
// >UDP = fast but doesn't guarantee delivery
// >QUIC = fast + reliable + secure

// ### How it works
// Traditional HTTPS:
// HTTP
//  ↓
// TLS
//  ↓
// TCP
//  ↓
// IP

// QUIC:
// HTTP/3
//  ↓
// QUIC
//  ↓
// UDP
//  ↓
// IP
// #Why was QUIC created?
// TCP has some limitations.
// For example, if one packet is lost:
// Packet 1 ✅
// Packet 2 ❌
// Packet 3 ✅
// Packet 4 ✅

// TCP may need to wait for Packet 2
// This can increase latency.
// QUIC handles streams differently, so loss in one stream doesn't necessarily block unrelated streams.
// #Important Features
// * ⚡ Low latency
// * 🔒 Encryption built in*using TLS 1.3
// * 🔄 Reliable delivery
// * 🚀 Faster connection establishment
// * 📱 Better handling when network changes, such as switching Wi-Fi → mobile data
// * 🌐 Used by HTTP/3
// ### Where is QUIC used?
// Commonly in:
// * HTTP/3
// * Modern web browsing
// * Video streaming
// * Mobile applications
// * Real-time/high-latency-sensitive services

// ### TCP vs UDP vs QUIC
// |                     | TCP              | UDP               | QUIC       |
// | ------------------- | ---------------- | ----------------- | ---------- |
// | Reliable            | ✅                | ❌                 | ✅          |
// | Fast                | Medium           | Very fast         | Very fast  |
// | Encryption built in | ❌                | ❌                 | ✅          |
// | Runs over           | IP               | IP                | UDP   |
// | Used by             | HTTP/1.1, HTTP/2 | Gaming, DNS, etc. | HTTP/3 |

// ### Interview one-liner
// >QUIC is a modern, secure and reliable transport protocol built over UDP, designed to reduce latency and overcome some limitations of TCP,
//  and it is the transport protocol used by HTTP/3.


//
// ## Polling — Layman Term
// Polling means repeatedly asking the server: "Do you have any new data?"
// Imagine you keep calling your friend:
// > "Any update?"
// > "No."
// > "Any update now?"
// > "No."
// > "Now?"
// > "Yes!" 😄
// That's polling.
// ### How it works
// Client                     Server
//   │                           │
//   │── Any new data? ─────────>│
//   │<── No ────────────────────│
//   │                           │
//   │── Any new data? ─────────>│
//   │<── No ────────────────────│
//   │                           │
//   │── Any new data? ─────────>│
//   │<── Yes, here it is ───────│

// The client keeps making requests at a fixed interval.
// ## Example
// Suppose your frontend wants to know whether a report is ready.
// setInterval(() => {
//   fetch("/api/report/status");
// }, 5000);

// Every 5 seconds:
// Client → "Is report ready?"
// Server → "No"

// 5 seconds later...
// Client → "Is report ready?"
// Server → "Yes"

// ## Types of Polling
// ### 1. Short Polling
// Request at a fixed interval.
// Every 5 seconds → Request

// Simple, but can create many unnecessary requests.
// ### 2. Long Polling

// Client asks the server:
// > "Tell me when something happens."
// The server keeps the request open until new data is available or a timeout occurs.
// Client ──────────────── Request ───────────────> Server
//                                                 │
//                                                 │ waits...
//                                                 │
// Client <──────────── New data ────────────────── Server
// Then the client sends another request.
// ## Polling vs WebSocket

// | Polling                     | WebSocket                    |
// | --------------------------- | ---------------------------- |
// | Client repeatedly asks      | Server can push data         |
// | HTTP requests repeatedly    | Persistent connection        |
// | More unnecessary requests   | More efficient for real-time |
// | Simple                      | More complex                 |
// | Good for occasional updates | Good for real-time updates   |

// ### Example
// Polling:
// "Is my order delivered?"
// "Is my order delivered?"
// "Is my order delivered?"

// WebSocket:
// Server → "Your order has been delivered!"

// ### When to use Polling?
// Use polling when real-time updates aren't critical

// Examples:
// * Checking report generation status
// * Checking payment status
// * Checking background job status
// * Simple notifications
// * Refreshing dashboards periodically

// ### Interview one-liner
// > Polling is a technique where the client repeatedly sends requests to the server at regular
//  intervals to check whether new data or an update is available.


//
// #WebRTC vs WebSocket — Layman Term
// Both are used for real-time communication, but they solve different problems.

// #Simple analogy
// Imagine a video call:
// WebSocket → You and your friend communicate **through a server.
// WebRTC → After connection setup, you can communicate **directly with your friend (peer-to-peer).

// ## WebSocket
// WebSocket creates a persistent connection between client and server.
// Client A
//    ↕
// WebSocket Server
//    ↕
// Client B

// The server can send data to clients immediately without the client repeatedly asking.
// ### Example
// A chat application:
// Noor → "Hello"
//         ↓
//    WebSocket Server
//         ↓
// Aman → "Hello"

// ### Used for
// * 💬 Chat applications
// * 🔔 Live notifications
// * 📊 Live dashboards
// * 🎮 Some multiplayer game communication
// * Real-time updates

// # WebRTC
// WebRTC is designed for real-time audio, video, and peer-to-peer data communication.
// Client A
//     ↕
//  Direct connection
//     ↕
// Client B

// For example, in a video call:
// Camera → WebRTC → Internet → WebRTC → Camera
// Microphone → WebRTC → Internet → WebRTC → Speaker

// The media doesn't normally need to continuously pass through your application server.

// ### Used for
// * 📹 Video calls
// * 🎙️ Voice calls
// * Screen sharing
// * Live audio/video
// * Peer-to-peer data transfer

// Examples include technologies behind apps such as video conferencing systems.
// # Important: WebRTC Still Needs a Server Initially
// This is a common interview question.
// WebRTC generally needs a signaling server to help two clients discover and connect to each other.
// Client A
//    │
//    ├── Signaling ──> Server <── Signaling ──┤
//    │                                         │
//    └──────────── WebRTC connection ──────────┘

// The signaling server helps exchange things like:
// * IP/network information
// * Connection details
// * Session information
// After connection establishment, media/data can flow peer-to-peer when possible.
// # WebSocket vs WebRTC

// | Feature          | WebSocket                             | WebRTC                               |
// | ---------------- | ------------------------------------- | ------------------------------------ |
// | Main purpose     | Real-time client-server communication | Real-time peer-to-peer communication |
// | Connection       | Client ↔ Server                       | Peer ↔ Peer                          |
// | Video/audio      | Possible, but not its main purpose    | Designed for it                    |
// | Chat             | ✅ Excellent                          | Possible                            |
// | Notifications    | ✅ Excellent                          | ❌ Not ideal                       |
// | Screen sharing   | Not designed for it                   | ✅                                   |
// | Low latency      | ✅                                    | Very good                      |
// | Signaling server | Not required in same way              |Usually required                |
// | NAT traversal    | Not its main concern                  | STUN/TURN/ICE                        |

// ## Real Example: Video Calling App
// Suppose you build a Zoom-like application.

// You could use:
// WebSocket
//     ↓
// Signaling
//     ↓
// WebRTC
//     ↓
// Audio + Video

// ### WebSocket
// Used for:
// "User Noor wants to call Aman"
// "Call accepted"
// "Here are the connection details"
// ### WebRTC
// Used for:
// 🎙️ Audio
// 📹 Video
// 🖥️ Screen sharing

// ## Easy Memory Trick

// > WebSocket = Real-time messages 💬
// > WebRTC = Real-time media/data 🎥🎙️

// Or:
// >WebSocket → Client ↔ Server
// > WebRTC → Peer ↔ Peer

// ### Interview Answer
// > WebSocket provides a persistent, bidirectional connection between a client and server and is commonly used for chat, notifications, and real-time updates.
//  WebRTC is designed for low-latency peer-to-peer audio, video, screen sharing, and data communication. WebRTC typically uses a signaling server to establish the connection, but the actual media can then flow directly between peers when possible.

//
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
