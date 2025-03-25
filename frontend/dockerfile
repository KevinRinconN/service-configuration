# 1️⃣ Construcción de la aplicación
FROM node:18-alpine AS builder

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos y paquetes
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copiar el resto de la aplicación
COPY . .

# Construir la aplicación para producción
RUN npm run build

# 2️⃣ Servidor web Nginx para servir la aplicación
FROM nginx:alpine

# Copiar la build de Vite al servidor Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuración personalizada de Nginx (opcional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]