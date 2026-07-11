//Monolith: A single, large application that contains all the functionality of the system.
// Monolithic architecture is a software design methodology that combines all of an application's components into a single, inseparable unit. 
// Under this architecture, the user interface, business logic, and data access layers are all created, put into use, and maintained as one,
//  unified unit.
//  www.geeksforgeeks.org/system-design/monolithic-architecture-system-design/

//Monolith: Easy to develop, test, and deploy. 
// It is also easier to manage and monitor as a single unit
// However, it can become complex and difficult to maintain as the application grows in size 
// and complexity. Scaling a monolithic application can also be challenging, as it requires 
// scaling the entire application rather than individual components.

//Cons: Codebase Large and complex, making it difficult to understand and modify.
//Feature level scaling nhi ho payega(tightly couple)

//OIDC: OpenID Connect is an identity layer on top of the OAuth 2.0 protocol. It allows clients to verify the identity of the end-user based on the authentication performed by an authorization server, as well as to obtain basic profile information about the end-user.
//<===Watch OIDC Piyush video ========>

//(2)OAuth: OAuth 2.0 is an authorization framework that enables applications to obtain limited access to user accounts on an HTTP service, such as Facebook, GitHub, or Google. It works by delegating user authentication to the service that hosts the user account and authorizing third-party applications to access the user account. OAuth 2.0 provides specific authorization flows for web applications, desktop applications, mobile phones, and living room devices.
//OAuth 1.0 requires the client application to generate and match complex cryptographic signatures for every single API call. OAuth 2.0 eliminates this requirement, instead relying solely on TLS/SSL (HTTPS) encryption during transit
//OAuth 1.0 was primarily designed for web browser clients. OAuth 2.0 defines multiple specialized "grant types" (such as the Authorization Code flow and Client Credentials) tailored for different application types
//OAuth 2.0 is a framework that allows third-party applications to obtain limited access to an HTTP service, such as Facebook, GitHub, or Google, on behalf of a user. It works by delegating user authentication to the service that hosts the user account and authorizing third-party applications to access the user account. OAuth 2.0 provides specific authorization flows for web applications, desktop applications, mobile phones, and living room devices.

//(3)Microservices: Microservices architecture is a software design methodology that structures an application as a collection of loosely coupled services. Each service is responsible for a specific business capability and can be developed, deployed, and scaled independently. This approach allows for greater flexibility, scalability, and maintainability compared to monolithic architecture.
//Event Driven Architecture: Event-driven architecture (EDA) is a software architecture paradigm that promotes the production, detection, consumption of, and reaction to events. An event can be defined as a significant change in state. EDA is often used in microservices architectures to enable services to communicate asynchronously through events, allowing for more decoupled and scalable systems.
//Fan In: Fan-in is a design pattern in event-driven architecture where multiple events or inputs are aggregated into a single process or service. This allows for centralized processing and can simplify the handling of multiple sources of data or events. In a fan-in scenario, multiple producers send events to a single consumer, which processes the events and may trigger further actions based on the aggregated data. This pattern can help reduce complexity and improve efficiency in systems that need to handle multiple inputs.
//Fan Out: Fan-out is a design pattern in event-driven architecture where a single event triggers multiple downstream processes or services. This allows for parallel processing and can improve system responsiveness and scalability. In a fan-out scenario, an event is published to multiple subscribers, each of which can handle the event independently, leading to increased throughput and reduced latency in processing tasks.

//(4)HLS: HLS (HTTP Live Streaming) is a media streaming protocol developed by Apple that allows for the delivery of audio and video content over the internet. It works by breaking the media into small chunks and delivering them over HTTP, allowing for adaptive bitrate streaming and compatibility with a wide range of devices and platforms. HLS is widely used for live streaming and on-demand video services, providing a reliable and scalable solution for delivering multimedia content to users.
