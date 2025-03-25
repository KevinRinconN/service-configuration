# Guía de Instalación y Arquitectura del Sistema de Microservicios

## 1. Introducción
Este documento proporciona la guía completa para desplegar el sistema compuesto por:
- **5 Microservicios Spring Boot** (Config Server, Eureka, Gateway, User y Publication Services)
- **Frontend React** 
- **PostgreSQL** como base de datos relacional

## 2. Requisitos Previos

### 2.1 Software Obligatorio
| Componente       | Versión Mínima | Comando de Verificación       |
|------------------|----------------|-------------------------------|
| Docker           | 20.10+         | `docker --version`            |
| Docker Compose   | 2.17+          | `docker compose version`      |
| Git              | 2.25+          | `git --version`               |

### 2.2 Requerimientos Hardware
- **4GB RAM** mínimos asignados a Docker
- 10GB de espacio libre

## 3. Instalación y Ejecución
Para iniciar los servicios, ejecute el siguiente comando en la raíz del proyecto:
Ejecuta primero 

docker-compose -f docker-compose-config.yml -p prueba-tecnica up -d

Esto iniciara el contenedor y el servicio de configuraciones
Una vez en ejecución ejecuta el siguiente comando 

docker-compose -f docker-compose-service.yml -p prueba-tecnica up -d

Esto creara las imágenes correspondientes tanto de todos los microservicios como del frontend. Una vez en ejecución verificamos el contenedor con el siguiente comando:
docker ps
## 4. Acceso a los Servicios
Una vez que los contenedores estén en ejecución, puede acceder a:
•	Frontend (React): http://localhost
•	API Gateway: http://localhost:8080
