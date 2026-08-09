//<============Lec9: Building Real time Applications - Part 2 ============>
// ### Simulcast — Short Notes
// Simulcast = Send the same video in multiple qualities at the same time.
// Camera
//  ├── 1080p → Fast Internet
//  ├── 720p  → Medium Internet
//  └── 360p  → Slow Internet

// Why?
// * Adapts to different network speeds
// * Reduces buffering
// * Improves real-time video quality

// Used in: WebRTC, video calls, meetings, live streaming.
// >Interview: Simulcast sends multiple quality versions of the same video so each user can
//  receive the quality suitable for their network.

// //MediaSoup vs Websocket Vs WebRTC 
// Advantages of MediaSoup:
// 1. Scalability: MediaSoup can handle a large number of concurrent users and streams, making it suitable for applications with high traffic.
// 2. Flexibility: MediaSoup provides a flexible architecture that allows developers to customize the media processing pipeline according to their needs.
// 3. Low Latency: MediaSoup is designed to minimize latency, which is crucial for real-time applications like video conferencing and online gaming.
// 4. Advanced Features: MediaSoup supports advanced features like simulcast, SVC (Scalable Video Coding), and SFU (Selective Forwarding Unit) which can enhance the user experience in real-time applications.
// Disadvantages of MediaSoup:
// 1. Complexity: MediaSoup can be complex to set up and configure, especially for developers who are new to real-time media processing.
// 2. Resource Intensive: MediaSoup can be resource-intensive, requiring significant CPU and memory resources, which may not be suitable for all applications.

// Advantages of WebSocket:
// 1. Simplicity: WebSocket is relatively simple to implement and use, making it accessible for developers of varying skill levels.
// 2. Low Latency: WebSocket provides low-latency communication, which is beneficial for real-time applications.
// 3. Broad Support: WebSocket is widely supported across different platforms and browsers, making it a versatile choice for real-time communication.
// Disadvantages of WebSocket:
// 1. Limited Media Support: WebSocket is primarily designed for text and binary data, and may not be as efficient for handling media streams compared to specialized media servers like MediaSoup.
// Advantages of WebRTC:
// 1. Peer-to-Peer Communication: WebRTC enables direct peer-to-peer communication, which can reduce latency and improve performance for real-time applications.
// 2. Built-in Media Support: WebRTC has built-in support for audio and video streams, making it suitable for applications like video conferencing and live streaming.
// 3. Security: WebRTC includes security features like encryption and authentication, which are important for protecting user data in real-time applications.
// Disadvantages of WebRTC:
// 1.Complexity: WebRTC can be complex to implement, especially for developers who are new to real-time communication technologies.


//<================Build Chat Application ==================>
// ### Why WebSocket for Chat?
// For a normal chat application, WebSocket is usually preferred because it provides a persistent client ↔ server connection.
// User A
//   ↕
// WebSocket Server
//   ↕
// User B

// When A sends a message:
// A → Server → B

// The server can also handle:
// * Message storage
// * Authentication
// * Online/offline status
// * Message delivery
// * Notifications
// * Multiple users/rooms

// ### Why not WebRTC?

// WebRTC is mainly designed for peer-to-peer real-time audio/video/data.

// For chat:
// WebRTC:
// A ↔ B

// This becomes difficult when you have:
// A → B, C, D, E, F...

// You also need signaling and connection management.
// So:
// >Chat → WebSocket 💬
// >Video/Audio → WebRTC 🎥🎙️

// ### Other technologies for Chat
// | Technology             | Use                                         |
// | ---------------------- | ------------------------------------------- |
// | WebSocket          | ⭐ Best common choice for real-time chat     |
// | SSE                | Server → client updates, not two-way        |
// | Long Polling       | Simple fallback, but less efficient         |
// | HTTP Polling       | Periodically check for messages             |
// | WebRTC DataChannel | P2P chat, specialized use cases             |
// | MQTT               | IoT/mobile messaging, lightweight messaging |

// ### Typical Production Architecture
// React App
//     ↓
// WebSocket
//     ↓
// Node.js Server
//     ↓
// Redis / Kafka
//     ↓
// MongoDB / PostgreSQL

// Simple interview answer:
// >For a chat application, I would typically use WebSocket because it provides persistent bidirectional communication between clients and the server.
//  WebRTC is better suited for peer-to-peer audio, video, and data communication


//
// ### Real-Time Notifications
// For real-time notifications, WebSocket is a very common choice.
// Server
//    ↓ WebSocket
// User → 🔔 "You received a new message"

// The server can **push** the notification immediately without the client repeatedly asking.

// ### Other options
// | Technology                        | Best for                                      |
// | --------------------------------- | --------------------------------------------- |
// | WebSocket ⭐                   | Two-way real-time notifications               |
// | SSE                           | Simple server → client notifications          |
// | Push Notifications (FCM/APNs) | Mobile/background notifications               |
// | Polling                       | Simple applications / fallback                |
// | Long Polling                  | Near real-time when WebSocket isn't available |

// ### Easy rule
// > 💬 Chat → WebSocket
// > 🔔 Real-time notification → WebSocket / SSE
// > 📱 Mobile notification when app is closed → FCM/APNs
// > 🎥 Video/audio → WebRTC

//
// ## Operational Transform (OT) vs CRDT — Layman Term
// Both are techniques used when multiple users edit the same data at the same time.
// Think of Google Docs:
// Noor → "Hello World"
// Aman → edits at the same time

// The system must make sure both users' changes are handled correctly.
// ### 1. Operational Transform (OT)
// OT changes/adjusts an operation when another user's operation happens at the same time.
// Example:
// Original:  ABC
// Noor inserts X → ABCX
// Aman inserts Y → ABCY

// OT adjusts the operations so both changes can be combined consistently:
// Final: ABCXY
// Simple meaning:
// > OT = Adjust the operation to resolve conflicts.
// Used historically in collaborative editors like Google Docs.

// ### 2. CRDT
// CRDT = Conflict-free Replicated Data Type

// Instead of trying to change operations centrally, CRDTs are designed so that 
// changes from different users can be merged automatically and eventually produce the same result.
//         Shared Data
//         /         \
//      Noor         Aman
//        ↓            ↓
//     Change X      Change Y
//        \            /
//         \          /
//           Merge
//             ↓
//         Same Result

// Simple meaning:
// > CRDT = Design the data structure so changes can be merged without conflicts.

// ## OT vs CRDT

// | OT                                         | CRDT                                          |
// | ------------------------------------------ | --------------------------------------------- |
// | Adjusts operations                         | Merges changes                                |
// | Conflict resolution through transformation | Conflict resolution built into data structure |
// | Often needs coordination                   | Can work well in distributed/offline systems  |
// | More complex operation logic               | More data/metadata overhead                   |
// | Collaborative editing                      | Collaborative editing, offline-first apps     |

// ### Easy Interview Answer

// >OT and CRDT solve the same basic problem: multiple users changing the same data concurrently.
// OT transforms operations so they remain consistent, while CRDTs use specially designed data structures that allow concurrent changes to be merged automatically.

// ### Easy Memory Trick
// > OT → Transform the operation
// > CRDT → Merge the changes


