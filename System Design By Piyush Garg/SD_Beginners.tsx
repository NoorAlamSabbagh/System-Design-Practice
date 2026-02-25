// (1)Vertical Scalling: 
// Vertical scaling is the process of increasing or decreasing the capacity 
// of a single server or machine by adding or removing hardware resources 
// such as CPU, RAM, or storage, without changing the number of servers.
// Example
// Upgrade server from 4 GB RAM → 16 GB RAM
// Add more CPU cores to the same machine
// Where it’s used
// Databases (MySQL, MongoDB)
// Monolithic applications
// Early-stage or low-traffic systems
// Advantages
// Simple to implement
// No code changes
// Easy to manage
// Disadvantages
// Hardware limit (can’t scale infinitely)
// Single point of failure
// Downtime sometimes required

// | Feature               | **Vertical Scaling (Scale Up/Down)**      | **Horizontal Scaling (Scale Out/In)**            |
// | --------------------- | ----------------------------------------- | ------------------------------------------------ |
// | **Definition**        | Increase resources of a **single server** | Add or remove **multiple servers**               |
// | **How it works**      | Add CPU, RAM, storage to same machine     | Add more machines to handle load                 |
// | **Example**           | 8 GB RAM → 32 GB RAM                      | 1 server → 5 servers                             |
// | **Scalability limit** | Limited by hardware                       | Almost unlimited                                 |
// | **Fault tolerance**   | Low (single point of failure)             | High (failure of one server doesn’t stop system) |
// | **Downtime**          | May require downtime                      | Usually no downtime                              |
// | **Complexity**        | Simple                                    | More complex (load balancer needed)              |
// | **Cost**              | Expensive at higher limits                | Cost-effective at scale                          |
// | **Best for**          | Small apps, databases, monoliths          | Large apps, microservices, high traffic          |
// | **Cloud example**     | Increase EC2 instance size                | Auto Scaling Group + Load Balancer               |


// A Load Balancer is a component that distributes incoming network traffic across multiple servers
//  to ensure high availability, reliability, and optimal performance of an application.
// Load Balancer is used in → ✅ Horizontal Scaling

// Fan-out architecture is when one message or event is sent to multiple receivers simultaneously.
// CDN (Content Delivery Network) is a network of servers spread across different 
// locations that deliver content from the nearest server to the user.
// Cluster means multiple machines connected together to share load, increase speed, and avoid failure.

// <==================Lecture 3: Event Sourcing ==================>
// Event Sourcing is a design pattern where state changes are logged as a sequence of events.
// Instead of storing just the current state, all changes (events) are stored, allowing reconstruction of past states.
// “Event Sourcing is a design pattern where instead of storing the current state in a database, we store every state change as an immutable event.
// The current state is rebuilt by replaying those events. The event store becomes the source of truth.”
// 🔑 Explain with 10-second example
// “For example, in an order system, instead of updating order status, we store events like OrderCreated, OrderConfirmed, OrderShipped.
// If needed, we can rebuild the order state anytime by replaying these events.”

// <===================Lecture 4: CQRS ===================> 
// CQRS (Command Query Responsibility Segregation) is a design pattern that separates read and write operations into different models.
// This allows optimization of each operation independently, improving performance and scalability.
// “CQRS is a design pattern that separates read and write operations into different models.
// CQRS in layman terms 👇
// 👉 Writing data and reading data are handled separately.

//<===================Lecture 5: Back of envelope calculation ===================>

//<===================Lecture 6: Master Rate Limiting ===================>
// Rate Limiting is a technique used to control the amount of incoming and outgoing traffic to or from a network.
// It helps prevent abuse, ensures fair usage, and protects against DDoS attacks.
// “Rate Limiting is a technique used to control the number of requests a user or system can make to a service within a specified time period.

//<===================Lecture 7: Consisting Hashing ===================>
// Consistent Hashing is a distributed hashing technique that minimizes the reorganization of data when nodes are added or removed from a distributed system.
// It ensures that only a small portion of the data needs to be redistributed, improving scalability and fault tolerance.
// “Consistent Hashing is a technique used in distributed systems to evenly distribute data across multiple nodes while minimizing data movement when nodes are added or removed.”'


//<===================Lecture 8: Video Streaming ===================>
// Adaptive Bitrate Streaming (ABR) is a technique used in video streaming that adjusts the quality of the 
// video stream in real-time based on the viewer's network conditions and device capabilities.
// This ensures a smooth viewing experience by dynamically switching between different video quality 
// levels to prevent buffering and interruptions.
// “Adaptive Bitrate Streaming (ABR) is a technique used in video streaming that 
// adjusts the quality of the video stream in real-time based on the viewer's network conditions and device capabilities.”

//<===================Lecture 9: Design UPI Payments ===================>
