// // EC2 Setup and nginx Installation

// 1. Create an EC2 instance:
// - Go to the AWS Management Console and navigate to the EC2 service.
// - Click on "Launch Instance" and select an Amazon Machine Image (AMI) that suits your needs (e.g., Amazon Linux 2, Ubuntu).
// - Choose an instance type based on your requirements (e.g., t2.micro for free tier).
// - Configure the instance details, such as network settings and storage.
// - Add tags if needed and configure the security group to allow HTTP (port 80) and SSH (port 22) access.
// - Review and launch the instance, and create a new key pair or use an existing one for SSH access.
// 2. Connect to the EC2 instance:
// - Use an SSH client (e.g., Terminal, PuTTY) to connect to the instance using the public IP address and the key pair you created.
// - For example, in Terminal, you can use the following command:
// ssh -i /path/to/your/key.pem ec2-user@your-ec2-public-ip
// 3. Update the package manager and install nginx:
// - Once connected to the EC2 instance, update the package manager to ensure you have the latest package information:
//   - For Amazon Linux 2:
//     sudo yum update -y
//     sudo yum install nginx -y
//   - For Ubuntu:
//     sudo apt update
//     sudo apt install nginx -y
// 4. Start the nginx service:
// - After installing nginx, start the service to ensure it is running:    
//     - For Amazon Linux 2:
//         sudo systemctl start nginx
//     - For Ubuntu:
//         sudo systemctl start nginx
// 5. Verify nginx is running:
// - Open a web browser and navigate to the public IP address of your EC2 instance. You should see the default nginx welcome page, indicating that nginx is successfully installed and running on your EC2 instance.
// 6. (Optional) Configure nginx:
// - You can customize the nginx configuration by editing the configuration files located in /etc/nginx/ (for Amazon Linux 2) or /etc/nginx/sites-available/ (for Ubuntu).
// - After making changes to the configuration, remember to restart the nginx service to apply the changes:
//     - For Amazon Linux 2:
//         sudo systemctl restart nginx
//     - For Ubuntu:
//         sudo systemctl restart nginx    
// 7. (Optional) Set up auto-start for nginx:
// - To ensure that nginx starts automatically when the EC2 instance is rebooted, enable the service to start on boot:
//     - For Amazon Linux 2:
//         sudo systemctl enable nginx
//     - For Ubuntu:
//         sudo systemctl enable nginx
// Congratulations! You have successfully set up an EC2 instance and installed nginx on it. You can now use nginx to serve your web applications or static content as needed.


// /////////////////////////////////////////////////////////////////////////////////////////
// //##2 Install nginx on EC2 Instance
// 1. Connect to the EC2 instance using SSH.
// 2. Update the package manager and install nginx:
// - For Amazon Linux 2:
//     sudo yum update -y  
//     sudo yum install nginx -y
// - For Ubuntu: 
//     sudo apt update
//     sudo apt install nginx -y
// 3. Start the nginx service:
// - For Amazon Linux 2:
//     sudo systemctl start nginx
// - For Ubuntu:
//     sudo systemctl start nginx
// 4. Verify nginx is running by navigating to the public IP address of your EC2 instance in a web browser. You should see the default nginx welcome page. 
// 5. (Optional) Configure nginx by editing the configuration files located in /etc/nginx/ (for Amazon Linux 2) or /etc/nginx/sites-available/ (for Ubuntu). Remember to restart the nginx service after making changes to apply the new configuration.
// - For Amazon Linux 2:
//     sudo systemctl restart nginx
// - For Ubuntu:
//     sudo systemctl restart nginx
// 6. (Optional) Set up auto-start for nginx to ensure it starts automatically when the EC2 instance is rebooted:
// - For Amazon Linux 2:
//     sudo systemctl enable nginx
// - For Ubuntu:     
//     sudo systemctl enable nginx
// Congratulations! You have successfully installed nginx on your EC2 instance and can now use it to serve your web applications or static content as needed.

// ///////////////////////////////////////////////////////////////////////////////////////////////
// //## 2. Load Balancer Setup (Optional)

// 1. Create a Load Balancer:      
// - In the AWS Management Console, navigate to the EC2 service and select "Load Balancers" from the left-hand menu.
// - Click on "Create Load Balancer" and choose the type of load balancer you want to create (e.g., Application Load Balancer, Network Load Balancer).
// - Follow the prompts to configure the load balancer, including selecting the appropriate VPC, subnets, and security groups.
// 2. Register Targets:
// - After creating the load balancer, you need to register your EC2 instances as targets for the load balancer.
// - In the load balancer settings, navigate to the "Targets" section and click on "Register Targets."
// - Select the EC2 instances you want to include in the load balancing and click "Add to registered."
// 3. Configure Health Checks:
// - In the load balancer settings, navigate to the "Health Checks" section and configure the health check settings according to your application's requirements (e.g., protocol, port, path).
// 4. Test the Load Balancer:
// - Once the load balancer is set up and your EC2 instances are registered, you can test the load balancer by navigating to its DNS name in a web browser. You should see the nginx welcome page from one of your EC2 instances, 
// indicating that the load balancer is successfully distributing traffic to your instances.
// Congratulations! You have successfully set up a load balancer to distribute traffic across your EC2 instances running nginx. This setup will help improve the availability and scalability of your application.


// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //4 Target Groups and Listeners (Optional)

// 1. Create Target Groups:    
// - In the AWS Management Console, navigate to the EC2 service and select "Target Groups" from the left-hand menu.
// - Click on "Create Target Group" and choose the appropriate settings for your target group (e.g., target type, protocol, port).
// 2. Register Targets:
// - After creating the target group, you need to register your EC2 instances as targets for the target group.
// - In the target group settings, navigate to the "Targets" section and click on "Register Targets."
// - Select the EC2 instances you want to include in the target group and click "Add to registered."
// 3. Create Listeners:
// - In the AWS Management Console, navigate to the EC2 service and select "Load Balancers" from the left-hand menu.
// - Select your load balancer and navigate to the "Listeners" tab.
// - Click on "Add Listener" and configure the listener settings (e.g., protocol, port) to forward traffic to your target group.
// 4. Test the Listener:
// - Once the listener is set up and your target group is registered, you can test the listener by navigating to the load balancer's DNS name in a web browser. You should see the nginx welcome page from one of your EC2 instances, indicating that the listener is successfully forwarding traffic to your target group.
// Congratulations! You have successfully set up target groups and listeners to manage traffic distribution to your EC2 instances running nginx. This setup will help improve the performance and reliability of your application.