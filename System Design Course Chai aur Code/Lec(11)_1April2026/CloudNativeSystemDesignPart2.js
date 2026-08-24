// Cloudflare is a company/platform that sits between your users and your server
// and helps make your website faster, safer, and more reliable.
// Think of it like:
// User
//   ↓
// Cloudflare
//   ↓
// Your Server (AWS / Render / EC2 / etc.)
//   ↓
// Database
// ### Why do we use Cloudflare?
// 1. DDoS protection 🛡️
// Cloudflare can detect and block huge amounts of malicious traffic before it reaches your server.
// 2. CDN — faster website 🚀
// Cloudflare stores/cache static files like:
// * JS
// * CSS
// * Images
// * Videos
// Users can receive them from a server geographically closer to them.
// 3. DNS management 🌐
// You can manage your domain's DNS through Cloudflare.
// For example:
// myapp.com
//     ↓
// Cloudflare DNS
//     ↓
// AWS EC2 IP

// 4. SSL/HTTPS 🔒
// Cloudflare can provide/manage HTTPS certificates so your website uses:
// https://myapp.com
// instead of:
// http://myapp.com
// 5. Reverse Proxy
// This is one of the most important concepts.
// Without Cloudflare:
// User ───────────────→ AWS Server

// With Cloudflare:
// User
//  ↓
// Cloudflare
//  ↓
// AWS Server
// Your server can be protected behind Cloudflare, while Cloudflare handles things like traffic filtering, 
// caching, SSL, and routing.

// ### Example for your MERN project
// Suppose you deploy:
// Frontend → Vercel
// Backend  → AWS EC2
// Database → MongoDB Atlas
// Domain   → myapp.com
// You could use:
//                     ┌──→ Vercel (Frontend)
// User → Cloudflare ──┤
//                     └──→ AWS EC2 (Backend)
//                               ↓
//                          MongoDB Atlas

// ### Cloudflare vs AWS
// They aren't exactly competitors.

// AWS gives you infrastructure:
// * EC2
// * S3
// * RDS
// * Lambda
// * Load Balancer
// Cloudflare provides the network/security layer in front of your infrastructure:
// * DNS
// * CDN
// * DDoS protection
// * WAF
// * SSL
// * Reverse proxy
// * Caching

// ### Interview answer
// If an interviewer asks "Why do you use Cloudflare?", you can say:
// >Cloudflare is used as a CDN, DNS provider, reverse proxy, and security layer. 
// It improves application performance through caching and protects servers using
// DDoS protection and WAF while also providing SSL/TLS.
// For your MERN + AWS projects, Cloudflare is especially useful to understand because it connects directly
// with concepts like DNS → CDN → Reverse Proxy → Load Balancer → Backend server.

//
// If you're asking "What is a Mutex, and is it related to the database?" — Mutex itself is not a database concept. 
// It's a concurrency-control mechanism used in programming.
// ### What is Mutex?
// Mutex = Mutual Exclusion
// It ensures that only one thread/process can access a particular resource at a time.
// Think of a bathroom 🚪:
// Thread A → 🔒 Mutex → Bathroom
// Thread B → waits
// Thread C → waits
// Thread A finishes
//        ↓
//     🔓 Unlock
// Thread B → 🔒 Mutex → Bathroom

// ### Example
// Suppose two requests try to modify the same data:
// Request A → read balance = ₹100
// Request B → read balance = ₹100
// A → subtract ₹50
// B → subtract ₹80
// Both write their result
// This can cause a race condition.
// A mutex can ensure:
// Request A → 🔒 → modify → 🔓
// Request B             ↓
//                   waits
//                      ↓
//                   🔒 → modify → 🔓
// ### Mutex vs Database Lock
// They are different:
// | Mutex                                | Database Lock                                |
// | ------------------------------------ | -------------------------------------------- |
// | Programming/concurrency concept      | Database concurrency concept                 |
// | Usually protects memory/resources    | Protects database rows/tables/data           |
// | Exists in application/process        | Managed by database                          |
// | Example: `Mutex` in Node/native code | MongoDB/SQL transaction & locking mechanisms |

// ### In Node.js
// You might use a mutex when multiple asynchronous operations in your application must not execute a critical section simultaneously.
// For example:
// Request 1 ──┐
//             ↓
//           MUTEX
//             ↓
//        Critical section
//             ↓
// Request 2 → waits
// Important: JavaScript's Node.js event loop is single-threaded, but you can still have race conditions between asynchronous operations.
// A mutex can be useful for coordinating those operations.
// If by "mutex in DB" you mean how to prevent two API requests from updating the same MongoDB document simultaneously, 
// that's slightly different — you'd typically use atomic MongoDB operations or transactions, rather than a normal application mutex.

//
// Transcoding pipeline and video Transcoding pipeline
// ### What is a Video Transcoding Pipeline?
// A video transcoding pipeline is a series of steps that takes a video in one format and converts
// it into multiple formats, resolutions, bitrates, or codecs so it can be played efficiently on different devices and network speeds.

// Think of YouTube/Netflix:
// Original Video
//      ↓
//  Upload
//      ↓
//  Transcoding
//      ↓
//  ┌──────────────┬──────────────┬──────────────┐
//  ↓              ↓              ↓
// 1080p          720p           480p
// 5 Mbps         2.5 Mbps       1 Mbps
//  ↓              ↓              ↓
//  Storage       Storage        Storage
//      ↓
//  CDN
//      ↓
//  User

// ### Why do we need transcoding?
// Suppose someone uploads:
// video.mp4
// 4K
// 50 Mbps
// H.265
// Not every user's device/network can efficiently play that.

// So the system creates:
// 1080p → 5 Mbps
// 720p  → 2.5 Mbps
// 480p  → 1 Mbps
// 360p  → 500 Kbps

// Now the player can choose the appropriate quality.
// ## Typical Video Transcoding Pipeline

// ### 1. Upload

// User uploads:
// movie.mp4

// Usually it goes to object storage such as S3.
// Client
//   ↓
// Backend
//   ↓
// S3

// ### 2. Create a Job

// The backend creates a transcoding job:
// {
//   videoId: "123",
//   input: "s3://videos/original.mp4",
//   status: "PENDING"
// }

// ### 3. Queue
// Instead of making the API wait for the entire conversion:
// API → Queue → Worker
// Examples of queues:
// * Redis/BullMQ
// * RabbitMQ
// * Kafka
// * AWS SQS
// This is important because transcoding can take minutes,
// depending on the video.

// ### 4. Worker Transcodes
// A worker picks up the job:
// Worker
//   ↓
// FFmpeg
//   ↓
// 1080p
// 720p
// 480p
// 360p
// FFmpeg is commonly used for video processing.
// ### 5. Generate Streaming Format
// For adaptive streaming, the system may create:
// master.m3u8
//    ↓
// 1080p/index.m3u8
// 720p/index.m3u8
// 480p/index.m3u8

// and video segments:
// segment001.ts
// segment002.ts
// segment003.ts
// ...
// Modern systems may also use CMAF/fMP4 segments.
// ### 6. Store Output
// S3
// ├── original/
// ├── 1080p/
// ├── 720p/
// ├── 480p/
// └── master.m3u8
// ### 7. CDN
// Finally:
// User
//  ↓
// Cloudflare / CloudFront
//  ↓
// S3
// The CDN delivers the video segments close to the user.
// ## Complete Architecture
// For a scalable MERN-based video application:
//                  ┌──────────────┐
//                  │    React     │
//                  └──────┬───────┘
//                         │
//                         ↓
//                 ┌───────────────┐
//                 │ Node.js API   │
//                 └───────┬───────┘
//                         │
//               Upload / Create Job
//                         │
//                         ↓
//                 ┌───────────────┐
//                 │ Object Storage│
//                 │     S3        │
//                 └───────┬───────┘
//                         │
//                         ↓
//                   ┌──────────┐
//                   │  Queue   │
//                   │ SQS/Redis│
//                   └────┬─────┘
//                        │
//                        ↓
//                 ┌──────────────┐
//                 │Transcoding   │
//                 │Worker        │
//                 │   FFmpeg     │
//                 └──────┬───────┘
//                        │
//              ┌─────────┼─────────┐
//              ↓         ↓         ↓
//            1080p      720p      480p
//              │         │         │
//              └─────────┼─────────┘
//                        ↓
//                   S3 / Storage
//                        ↓
//                      CDN
//                        ↓
//                      User
// ### The important concept
// Transcoding is CPU/GPU-intensive and asynchronous.
// So you generally shouldn't do this:
// User → API → FFmpeg → wait 5 minutes → response
// Instead:
// User → API → Queue → immediate response
//                   ↓
//                Worker
//                   ↓
//                FFmpeg
//                   ↓
//                Storage
//                   ↓
//                  CDN
// This architecture is very important for system design interviews, especially when designing 
// YouTube, Netflix, video-upload, or video-processing systems.

//
// ## AWS EventBridge
// Amazon Web Services EventBridge is a serverless event bus service used to connect AWS services, applications, and external systems through events.
// The simple idea:
// >Something happens → an event is generated → EventBridge matches it → sends it to the appropriate target.
// ### Simple example
// Suppose a user uploads a video:
// User uploads video
//        ↓
//       S3
//        ↓
//    EventBridge
//        ↓
//    Rule matches
//        ↓
//    SQS Queue
//        ↓
// Transcoding Worker
//        ↓
//     FFmpeg
// So your API doesn't need to directly call the transcoding service.
// ## Main components
// ### 1. Event
// An event describes something that happened.
// Example:
// {
//   "source": "my.video.app",
//   "detail-type": "VideoUploaded",
//   "detail": {
//     "videoId": "123",
//     "file": "video.mp4"
//   }
// }

// ### 2. Event Bus
// The event bus receives events.
// Producer
//    ↓
// Event Bus
//    ↓
// Rules

// There are different types, including:
// AWS default event bus — AWS services send events here.
// Custom event bus — events from your own applications.
// Partner event bus — events from supported SaaS partners.

// ### 3. Rule
// A rule decides:
// > "Which events am I interested in?"

// For example:
// IF
// source = "my.video.app"
// AND
// detail-type = "VideoUploaded"

// THEN
// send event to SQS

// ### 4. Target
// The target is where EventBridge sends the matching event.

// Common targets include:
// EventBridge
//     ↓
//  ┌───────────────┐
//  │ Targets       │
//  ├───────────────┤
//  │ Lambda        │
//  │ SQS           │
//  │ SNS           │
//  │ Step Functions│
//  │ ECS           │
//  │ API Gateway   │
//  └───────────────┘

// # EventBridge vs SQS
// This is important for interviews.
// EventBridge = event routing
// SQS = message queue
// Example:
//                  EventBridge
//                       ↓
//               ┌───────┴───────┐
//               ↓               ↓
//           Lambda             SQS
//                               ↓
//                            Worker

// EventBridge can decide where the event should go.
// SQS is primarily used to **hold messages until consumers process them.

// ### Easy way to remember
// >EventBridge = "Who should receive this event?"
// >SQS = "Hold this message until a worker processes it."
// ## EventBridge vs SNS
// Another common interview question:

// | EventBridge                        | SNS                      |
// | ---------------------------------- | ------------------------ |
// | Event routing                      | Pub/sub messaging        |
// | Powerful event filtering           | Topic/subscriber model   |
// | Integrates heavily with AWS events | Simple fan-out messaging |
// | Event buses + rules                | Topics + subscriptions   |

// For example:
// S3
//  ↓
// EventBridge
//  ↓
// Rule
//  ├── Lambda
//  ├── SQS
//  └── Step Functions

// ## Why use EventBridge?
// You use it when you want loosely coupled architecture.

// Without EventBridge:
// Order Service
//    ↓
// directly calls
//    ↓
// Email Service
//    ↓
// directly calls
//    ↓
// Analytics Service

// This creates tight coupling.
// With EventBridge:
//              EventBridge
//             /     |      \
//            ↓      ↓       ↓
//         Email  Analytics  Inventory

// The Order Service only says:
// "OrderCreated"
// It doesn't need to know who consumes that event.
// ### Interview answer

// >AWS EventBridge is a serverless event bus used to build event-driven architectures. 
// It receives events from AWS services or applications, applies rules to filter and route those events, and sends them to targets 
// such as Lambda, SQS, SNS, Step Functions, or ECS.
// For your video-transcoding pipeline, a particularly good architecture is S3 → EventBridge → SQS → transcoding worker, 
// because it keeps the upload API decoupled from the long-running transcoding process.


//
// ### AWS Elastic Transcoder — Simple Explanation
// Amazon Elastic Transcoder was an AWS service used to convert videos from one format/quality to another.
// For example:
// Original Video
//    ↓
// Elastic Transcoder
//    ↓
//  ┌───────┬───────┬───────┐
//  ↓       ↓       ↓
// 1080p   720p    480p
// ### Why?
// Suppose a user uploads:
// video.mov
// 4K
// You want to create versions that work well on different devices:
// 4K → 1080p
//    → 720p
//    → 480p
// This process is called video transcoding.
// ### Important ⚠️
// Amazon Elastic Transcoder is a legacy service. For new AWS video-transcoding applications, 
// AWS generally recommends AWS Elemental MediaConvert instead.

// So remember:
// >Elastic Transcoder = older AWS video conversion service.
// >MediaConvert = modern AWS service for video transcoding.


//2023 Teachyst
//How to enable users to add custom domains

// Route53 from AWS DNS Service (DNS)
//Own DNS Denamed-->nodejs

// ssl certificate dns challenge
// ### SSL Certificate + DNS Challenge — Simple Explanation
// When you want an SSL/TLS certificate for a domain like:
// example.com
// the Certificate Authority (CA), such as Let's Encrypt, needs to verify:
// >"Do you actually control example.com?"
// A DNS challenge is one way to prove that.
// ### How it works
// Suppose you request a certificate for:
// example.com
// The CA gives you a special value:
// abc123xyz...
// You create a TXT DNS record:
// _acme-challenge.example.com

// TXT
// abc123xyz...
// Then:
//                 Certificate Authority
//                         │
//                         │ "Prove you own example.com"
//                         ↓
//                     DNS lookup
//                         │
//                         ↓
//               _acme-challenge.example.com
//                         │
//                         ↓
//                  TXT = abc123xyz
//                         │
//                         ↓
//                   ✅ Verification
//                         │
//                         ↓
//                 SSL Certificate

// ### Why TXT record?
// Because the CA can query the public DNS system and check whether the expected secret value exists.
// If you can create the correct DNS record, it strongly demonstrates that you control the domain's DNS.
// ### DNS Challenge vs HTTP Challenge
// There are two common ACME validation methods:
// HTTP-01:
// CA
//  ↓
// http://example.com/.well-known/acme-challenge/...
//  ↓
// Your web server

// DNS-01:
// CA
//  ↓
// DNS
//  ↓
// TXT _acme-challenge.example.com

// ### When is DNS challenge useful?
// DNS-01 is especially useful when:
// Your server isn't publicly accessible over HTTP.
// You need a wildcard certificate, such as:
// .example.com
// You want certificate validation independent of your web server.
// ### Simple interview answer
// >A DNS challenge is an SSL certificate validation method where the Certificate Authority asks the domain owner to create a
// specific TXT record under `_acme-challenge`. The CA checks that DNS record to verify domain ownership and then issues the certificate.
// Remember:
// DNS challenge = prove domain ownership by adding a TXT record.

//
//https://operational-transformation.github.io/