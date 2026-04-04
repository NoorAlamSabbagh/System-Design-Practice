//<============Lec10: Cloud Native System Design ============>
// ## 📌 1️⃣ AWS VS GCP VS Linode DO
// - AWS: Amazon Web Services, the largest cloud provider, offers a wide range of services and global infrastructure. It is known for its scalability, reliability, and extensive ecosystem.
// - GCP: Google Cloud Platform, Google's cloud offering, is known for its data analytics and machine learning capabilities. It provides a strong focus on AI and big data services.
// - Linode DO: Linode and DigitalOcean are popular cloud providers that offer simpler and more cost-effective solutions for small to medium-sized applications. They are often favored for their ease of use and developer-friendly interfaces.     

// ## 📌 2️⃣ HyperVisor
// - A hypervisor is a software layer that allows multiple virtual machines (VMs) to run on a single physical host. 
// It abstracts the underlying hardware and provides isolation between VMs, enabling efficient resource utilization and
//  flexibility in managing workloads. Hypervisors can be categorized into two types: Type 1 (bare-metal) and Type 2 (hosted).
//  Type 1 hypervisors run directly on the host's hardware, while Type 2 hypervisors run on top of an operating system.


// ## 📌 3️⃣ EC2
// - Amazon Elastic Compute Cloud (EC2) is a web service that provides resizable compute capacity
//  in the cloud. It allows users to rent virtual servers (instances) to run applications
//  and workloads. EC2 offers a variety of instance types optimized for different use cases,
//  such as general-purpose, compute-optimized, memory-optimized, and GPU instances. 
// Users can choose the instance type that best suits their needs and scale their
// applications up or down as required. EC2 also provides features like auto-scaling, 
// load balancing, and security groups to help manage and secure applications in the cloud.

//Laymen Explanation:
// - AWS, GCP, and Linode DO are like different cloud service providers that offer various tools and services for hosting applications and managing data in the cloud.
// - A hypervisor is like a software layer that allows multiple virtual machines to run on a single physical computer, providing isolation and efficient resource usage.
// - EC2 is a service from Amazon that lets you rent virtual servers to run your applications in the cloud, with options for different types of instances based on your needs.

// ## 📌4️⃣ Nginx vs Apache
// - Nginx and Apache are both popular web servers used to serve web content.
// - Nginx is known for its high performance, scalability, and efficient handling of concurrent connections. It uses an event-driven architecture that allows it to handle a large number of requests with low resource consumption. Nginx is often used as a reverse proxy server, load balancer, and HTTP cache.
// - Apache, on the other hand, is a widely used web server that has been around for a long time. It is known for its flexibility and extensive module support. Apache uses a process-driven architecture, which can lead to higher resource usage under heavy loads compared to Nginx. However, Apache is still a popular choice for many applications due to its rich feature set and compatibility with various platforms.

//Laymen Explanation:
// - Nginx and Apache are both web servers used to serve web content, but they have different approaches to handling requests.
// - Nginx is known for its high performance and efficiency in handling concurrent connections, making it a good choice for high-traffic websites.
// - Apache is known for its flexibility and extensive module support, making it a good choice for applications that require a lot of customization.

// ## 📌 5️⃣ Load Balancer
// - A load balancer is a device or software that distributes incoming network traffic across multiple servers to ensure high availability and reliability of applications. It helps to prevent any single server from becoming a bottleneck by evenly distributing the workload. Load balancers can operate at different layers of the OSI model, such as Layer 4 (transport layer) or Layer 7 (application layer), and can use various algorithms (e.g., round-robin, least connections) to determine how to distribute traffic. Load balancers are essential for scaling applications and improving performance in cloud environments.

//Laymen Explanation:
// - A load balancer is like a traffic cop that directs incoming requests to multiple servers to ensure that no single server gets overwhelmed, improving the performance and reliability of applications.

// Application Load Balancer vs Network Load Balancer Vs Gateway Load Balancer
// - Application Load Balancer (ALB): Operates at the application layer (Layer 7) and is designed to handle HTTP and HTTPS traffic. It can make routing decisions based on content, such as URL paths or host headers, making it suitable for web applications.
// - Network Load Balancer (NLB): Operates at the transport layer (Layer 4) and is designed to handle TCP traffic. It is optimized for high performance and can handle millions of requests per second while maintaining low latency, making it suitable for applications that require extreme performance.
// - Gateway Load Balancer (GLB): Operates at the network layer (Layer 3) and is designed to handle traffic between virtual private clouds (VPCs) or between on-premises data centers and the cloud. It provides a single entry point for traffic and can route it to multiple targets based on various criteria, such as source IP address or destination port.