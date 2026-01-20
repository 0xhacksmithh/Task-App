# HLD

![This HLD Image.](./Architectural%20Diagrams/HLD.png)

## LLD

<<<<<<< HEAD
![alt text](./Architectural%20Diagrams/LLD-1.png)

![alt text](./Architectural%20Diagrams/LLD-2.png)
=======

Architechture
----------------

Client (Frontend)
      |
      | HTTP (REST)
      ↓
API Gateway (Express)
      |
      ├── /users/*  → User Service (REST) 
      |
      ├── /posts/* → Post Service (REST)
                          | 
                         └── gRPC → User Service (ValidateUser) 
        
      
![alt text](image.png)
>>>>>>> db623df50884c46c0563a584d948ec883d05dc8e
