FROM node:10.15.0 as react-build

WORKDIR /app
COPY . .

ARG REACT_APP_API_URL
ARG REACT_APP_X_IBM_CLIENT_ID
ARG SASS_PATH

ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_X_IBM_CLIENT_ID=$REACT_APP_X_IBM_CLIENT_ID
ENV SASS_PATH=$SASS_PATH
RUN npm install
RUN npm run build

EXPOSE 8080/tcp
CMD ["node", "app.js"]