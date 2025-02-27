# Use the official Node.js runtime as the base image
FROM node:18 AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application code to the container
COPY . .

# Build the React app for production
RUN npm run build

# Use Nginx as the production server
FROM nginx:stable-alpine

# Copy the build output from the dist folder into the Nginx html directory
COPY --from=builder /app/build /usr/share/nginx/html

# copy nginx configuration in side conf.d folder
COPY --from=builder /app/nginx /etc/nginx/conf.d

# Expose port 80 to allow external access to the container
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]