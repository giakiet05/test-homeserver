FROM node:20-alpine
WORKDIR /app
ARG COMMIT_SHA=unknown
ARG APP_VERSION=6.0.0
ENV COMMIT_SHA=${COMMIT_SHA}
ENV APP_VERSION=${APP_VERSION}
COPY package.json ./
RUN npm install --production
COPY index.js ./
EXPOSE 4001
CMD ["node", "index.js"]
