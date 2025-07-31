FROM node:18-alpine

# Set working directory
WORKDIR /app

# Accept build-time arguments for Keycloak env
ARG NEXT_PUBLIC_KEYCLOAK_URL
ARG NEXT_PUBLIC_KEYCLOAK_REALM
ARG NEXT_PUBLIC_KEYCLOAK_CLIENT_ID

# Make the arguments available to the app
ENV NEXT_PUBLIC_KEYCLOAK_URL=${NEXT_PUBLIC_KEYCLOAK_URL}
ENV NEXT_PUBLIC_KEYCLOAK_REALM=${NEXT_PUBLIC_KEYCLOAK_REALM}
ENV NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=${NEXT_PUBLIC_KEYCLOAK_CLIENT_ID}

# Copy everything
COPY . .

# Install dependencies and build
RUN npm install
RUN npm run build

# Expose app port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
