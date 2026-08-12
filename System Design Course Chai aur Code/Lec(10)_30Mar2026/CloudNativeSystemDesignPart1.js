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

//
// AWS VS GCP VS Linode DO
// - AWS: Amazon Web Services, the largest cloud provider, offers a wide range of services and global infrastructure. 
// It is known for its scalability, reliability, and extensive ecosystem.
// - GCP: Google Cloud Platform, Google's cloud offering, is known for its data analytics and machine learning capabilities.
//  It provides a strong focus on AI and big data services.
// - Linode DO: Linode and DigitalOcean are popular cloud providers that offer simpler and more cost-effective solutions for small
//  to medium-sized applications. They are often favored for their ease of use and developer-friendly interfaces.

//
// Hypervisor:
// - A hypervisor is a software layer that allows multiple virtual machines (VMs) to run on a single physical host. 
// It abstracts the underlying hardware and provides isolation between VMs, enabling efficient resource utilization and
//  flexibility in managing workloads. Hypervisors can be categorized into two types: Type 1 (bare-metal) and Type 2 (hosted).
//  Type 1 hypervisors run directly on the host's hardware, while Type 2 hypervisors run on top of an operating system.

//
//create ec2 instance
// - Amazon Elastic Compute Cloud (EC2) is a web service that provides resizable compute capacity
//  in the cloud. It allows users to rent virtual servers (instances) to run applications

// also check in my cmd using the command: `aws ec2 describe-instances` to see the list of instances you have created.
// and install nginx on the instance using the command: `sudo apt-get install nginx` (for Ubuntu) or `sudo yum install nginx` (for Amazon Linux).

//Nginx vs Apache
// - Nginx and Apache are both popular web servers used to serve web content.
// - Nginx is known for its high performance, scalability, and efficient handling of concurrent connections.
//Laymen Explanation:
// - Nginx and Apache are both web servers used to serve web content, but they have different approaches to handling requests.
// - Nginx is known for its high performance and efficiency in handling concurrent connections, making it a good choice for high-traffic websites.
// - Apache is known for its flexibility and extensive module support, making it a good choice for applications that require a lot of customization.

// Nginx vs Apache — Layman Example
// Think of your website as a restaurant 🍽️.
// Users = Customers
// Nginx / Apache = Waiter
// Node.js application = Kitchen

// User
//  ↓
// Nginx / Apache
//  ↓
// Node.js Application
//  ↓
// Database

// #Nginx
// Nginx = Fast waiter who handles many customers efficiently.
// Example:
// 1000 users
//     ↓
//   Nginx
//     ↓
// Node.js
// Nginx can handle:
// Static files (HTML, CSS, JS, images)
// Reverse proxy
// Load balancing
// SSL/HTTPS
// Many concurrent connections

// #Apache
// Apache = Another type of web server that can also serve websites and forward requests to applications.
// User
//  ↓
// Apache
//  ↓
// Node.js / PHP / other application

// Apache is well known for:
// Serving websites
// `.htaccess` configuration
// PHP applications
// Reverse proxy
// Authentication/configuration

// ### Simple Difference
// | Nginx                            | Apache                             |
// | -------------------------------- | ---------------------------------- |
// | Very good at high concurrency    | Very flexible/configurable         |
// | Event-driven                     | Traditionally process/thread-based |
// | Excellent reverse proxy          | Excellent web server               |
// | Great for static content         | Great for dynamic applications     |
// | Commonly used as a reverse proxy | Common in PHP/Apache environments  |

// ### Real Node.js Example
// Without Nginx:
// User → :3000 → Node.js
// With Nginx:
// User
//  ↓
// HTTPS :443
//  ↓
// Nginx
//  ↓
// Node.js :3000

// User sees:
// https://mywebsite.com
// instead of:

// http://15.252.106.34:3000

// ### Interview One-Liner
// >Nginx and Apache are web servers. Nginx is commonly used as a reverse proxy, load balancer, and static file server in front of applications like Node.js,
// while Apache is a highly configurable web server commonly used for traditional web applications.

// Easy memory:
// >Nginx = Fast traffic manager 🚦
// >Apache = Flexible web server 🛠️


// ### TCP means what here?
// TCP = Transmission Control Protocol.
// UDP = User Datagram Protocol.
// In your AWS Security Group:
// SSH → TCP → Port 22
// TCP tells AWS which network protocol the traffic is using.
// ### Layman Example
// Think of TCP as a reliable delivery service📦.
// Your Laptop
//     ↓
// TCP
//     ↓
// EC2 :22

// TCP makes sure data is:
// * ✅ Delivered reliably
// * ✅ In the correct order
// * ✅ Missing data is retransmitted

// ### Why SSH uses TCP?
// SSH needs a reliable connection between your computer and EC2.
// SSH
//  ↓
// TCP
//  ↓
// Port 22
//  ↓
// EC2

// So when you see:
// Type: SSH
// Protocol: TCP
// Port: 22

// It means:
// >Allow SSH connections using TCP through port 22.

// #Easy memory
// > TCP = Reliable connection
// > UDP = Fast connection, but no delivery guarantee

// //Inbound and outbound security group in aws ec2:
// #AWS EC2 Security Group — Inbound vs Outbound
// Think of a Security Group as a security guard for your EC2 server 🛡️.
// #Inbound = Coming IN 📥
// Controls who can connect to your EC2 instance.
// Internet
//    ↓
// Security Group
//    ↓
// EC2

// Example:
// Inbound Rule
// SSH    TCP    22    Your IP
// HTTP   TCP    80    Anywhere
// HTTPS  TCP    443   Anywhere

// Meaning:
// Port 22 → You can SSH into EC2
// Port 80 → Users can access HTTP website
// Port 443 → Users can access HTTPS website

// ### Outbound = Going OUT 📤
// Controls what your EC2 instance can connect to.
// EC2
//  ↓
// Security Group
//  ↓
// Internet / Other Services

// Example:
// Outbound Rule
// All traffic → Anywhere

// This allows your EC2 to:
// * Download packages from the internet
// * Call external APIs
// * Connect to databases
// * Access AWS services

// ### Easy Difference
// | Inbound 📥                          | Outbound 📤                            |
// | ----------------------------------- | -------------------------------------- |
// | Traffic into EC2                    | Traffic from EC2                 |
// | Controls who can access your server | Controls where your server can connect |
// | SSH, HTTP, HTTPS                    | API calls, downloads, DB connections   |

// ### Your EC2 SSH Example
// When you ran:
// ssh -i "Noor.pem" ubuntu@15.252.106.34

// You needed an Inbound Security Group rule:
// Type: SSH
// Protocol: TCP
// Port: 22
// Source: Your IP

// Your Laptop
//     │
//     │ SSH :22 📥
//     ↓
// Security Group
//     ↓
// EC2

// ### Interview One-Liner
// > Inbound rules control incoming traffic to an EC2 instance,
//  while outbound rules control traffic leaving the EC2 instance.

