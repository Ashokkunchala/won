# This is a Node.js multistage dockerfile
# Stage 1: Build the application

FROM node:18-alpine AS builder
WORKDIR /app

COPY . .
RUN npm run build

# Stage 2: Run the application
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/dist ./dist

EXPOSE 3000
ENTRYPOINT ["node"]
CMD [ "dist/app.js" ]
