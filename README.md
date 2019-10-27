# InKurz news app

I developed **InKurz** news app as my final project during the [neuefische](https://www.neuefische.de) web developer bootcamp in fall 2019.

![InKurz App demo](https://media.giphy.com/media/WOBoyXbPUD2RWjEuQc/giphy.gif)

## Table of Contents

- [Introduction](#introduction)
- [Technologies](#technologies)
- [Setup](#setup)
- [Acknowledgements](#Acknowledgements)

## Introduction

With **InKurz**, one can read news which is within 60 words and so the same "InKurz". One can read more by clicking the links. A user can create his own account and able to comment on individual news cards. A user can also look for news based categories and countries as well. One can even search news by keyword. A user can also write reviews so that I can improve the app and make it better. A user can read the news in light mode and dark mode.

## Technologies

The app was built [create-react-app](https://create-react-app.dev/) and MERN Stack:

- MongoDB
- Express
- React
- Node.js

### Additional dependencies

- bcrypt
- cors
- mongoose
- prop-types
- react-router-dom
- react-scripts
- styled-components
- styled-icons
- material-ui
- gravatar

### Dev dependencies

- cypress
- eslint-plugin-cypress
- nodemon
- npm-run-all
- storybook

## Setup

To run the app, you need to clone the project. Then run

```
npm install
```

You need to setup the database to get the news articles. So go to file newsAPIRoute.js which is located in

```
src/server/routes/newsAPIRoute.js
```

Change the country according to your needs and change in fetch request url as well. For example :

```
  https://newsapi.org/v2/top-headlines?country=in&apiKey=020b3817a9ee4c8387dd3bcfac3eb12e&category=science
```

You need to install MongoDB or already installed. It can reachable by default port [http://localhost:27017](http://localhost:27017)

Once the database containe the articles, you can run the app using the command

```
npm start
```

You can skip the login page and start reading the news but comments are read-only. If you want to comment on news articles, you need register and login to make comments enable.

You can also watch a small glimpse of the app video above on how to use the app.

You can see the documentation of the app by running:

```
npm run storybook
```

As of now, only a small part of the app is documented.

## Acknowledgements

- I would like to thank the team of neuefische for teaching us all the above concepts. I had a lot of fun.
- I also would like to thank my fellow bootcampers. They are a gem of people and really helpful.
