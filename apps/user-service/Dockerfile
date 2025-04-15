# Usa una imagen base de Node
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Instalar pnpm directamente
RUN npm install -g pnpm@10.6.5

# Copia los archivos del monorepo
COPY . .

# DEsactivar prompts interactivos
ENV CI=true

# Instala solo dependencias necesarias
RUN pnpm install

# Entra al microservicio específico
WORKDIR /app/apps/user-service

# Expone el puerto
EXPOSE 3001

# Comando por defecto
CMD ["pnpm", "start:dev"]