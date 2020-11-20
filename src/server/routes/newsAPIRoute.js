const mongoose = require("mongoose");
const fetch = require("node-fetch");
// var schedule = require("node-schedule");
// var rule = new schedule.RecurrenceRule();

const country = "de";
const category = "";

function getArticles() {
  return fetch(
    `https://newsapi.org/v2/top-headlines?country=de&apiKey=???`
  )
    .then(res => res.json())
    .then(result => {
      const articles = result.articles.map(article => {
        return {
          author: article.author,
          title: article.title,
          description: article.description,
          url: article.url,
          urlToImage: article.urlToImage,
          publishedAt: article.publishedAt,
          isBookmarked: false,
          country: country,
          category: category
        };
      });
      return articles;
    });
}

// schedule.scheduleJob(rule, () => {
getArticles().then(data => {
  mongoose.connect("mongodb://localhost:27017/newsDB", (err, db) => {
    db.collection("cards").insertMany(data);
  });
});

// });
