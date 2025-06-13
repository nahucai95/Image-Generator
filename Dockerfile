# 1) use a lightweight Node.js runtime
FROM node:18-alpine

# 2) set working dir
WORKDIR /usr/src/app

# 3) install dependencies
COPY package.json package-lock.json* ./
RUN npm install --only=production

# 4) copy source
COPY . .

# 5) expose the port your Express server listens on
EXPOSE 3000

# 6) start the app
CMD ["npm", "start"]