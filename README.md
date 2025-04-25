# 💳 BankTransactions Microservices Architecture

Sistema de gestión de transacciones bancarias desarrollado bajo una arquitectura de *microservicios*. Este proyecto simula el proceso de depósitos bancarios, validaciones de usuario, validaciones de cuenta y gestión de transacciones.

---

## 🏗️ Arquitectura General

- *core-service*: Gestiona la creación de transacciones y coordina las validaciones.
- *user-service*: Maneja la información de usuarios y valida cuentas de usuario.
- *account-service*: Gestiona las cuentas bancarias, valida su estado y actualiza saldos.
- *PostgreSQL*: Cada microservicio tiene su propia base de datos.
- *Docker & Docker Compose*: Orquestación de contenedores.
- *Kafka*: (En proceso) Comunicación asíncrona basada en eventos.
  
```plaintext
[Client] ---> [Core-Service] ---> [User-Service]
                          |            |
                          ---> [Account-Service]
```
---
## Tecnologies

- *Node.js + NestJS
- *TypeORM
- *PostgreSQL
- *Docker/Docker Compose
- *Kafka (Bitnami)
- *pnpm (Package manager)
- *DBeaver (Optional)
- *Postman (API Test)

---

## Proyect Structure

bankTransactions/
├── apps/
│   ├── core-service/
│   ├── user-service/
│   └── account-service/
├── docker-compose.yml
├── package.json
└── README.md

---

## Dependencies

- Docker
- Docker Compose
- pnpm

---

## Installation and Execution Guide

1. Clone the repositorie
---
    git clone
    cd bankTransactions 
---

2. Install all dependencies

---
pnpm install
---

3. Lift all services with Docker

---
sudo docker-compose up --build

---
  
4. Verify the servicies
---

- *Core Service: http://localhost:3000
- *User Service: http://localhost:3001
- *Account Service: http://localhost:3002

---

## APIs

Use Postman to test endpoints

- *core Service (Transacciones): 
    - *POST /transaction/create*: Create a temporal transaction

- *user Service*:
    - *POST /user/createUSer*: Create user.
    - *GET /user/:userId/validate*: User validate.

- *Account Service*:
    - *POST /account/createAccount*: Create account.
    - *GET /account/:accountId/validate*: Account validate.
    - *POST /account/:accountId/update-balance*: Update amount


