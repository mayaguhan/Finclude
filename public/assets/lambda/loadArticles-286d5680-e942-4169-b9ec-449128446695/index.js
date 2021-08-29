const https = require('https');
const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    let dataString1 = '';
    let dataString2 = '';
    let endpoint1 = "https://newsapi.org/v2/everything?qInTitle=budgeting tips&from=2021-08-03&sortBy=popularity&apiKey=30530d9973a94e708084dc3353646880";
    let endpoint2 = "https://newsapi.org/v2/everything?qInTitle=financial planning&from=2021-08-14&sortBy=popularity&apiKey=30530d9973a94e708084dc3353646880";

    const response1 = await new Promise((resolve, reject) => {
        const req = https.get(endpoint1, function(res) {
          res.on('data', chunk => {
            dataString1 += chunk;
          });
          res.on('end', () => {
            resolve(
                JSON.parse(dataString1)
            );
          });
        });
        
        req.on('error', (e) => {
          reject({
              statusCode: 500,
              body: 'Something went wrong!'
          });
        });
    });
    
    const response2 = await new Promise((resolve, reject) => {
      const req = https.get(endpoint2, function(res) {
        res.on('data', chunk => {
          dataString2 += chunk;
        });
        res.on('end', () => {
          resolve(
              JSON.parse(dataString2)
          );
        });
      });
      
      req.on('error', (e) => {
        reject({
            statusCode: 500,
            body: 'Something went wrong!'
        });
      });
    });
    
    let articles = response1.articles.concat(response2.articles);
    
    for (const article of articles) {
      // let data = {};
      // data.title = article.title;
      // data.date = article.publishedAt.slice(0, 11);
      // data["description"] = article["description"];
      // data.url = article.url;
      // data.urlToImage = article.urlToImage;
      await dynamo
        .put({
          TableName: "articles",
          Item: {
            title: article.title,
            date: article.publishedAt.slice(0, 11),
            description: article["description"],
            url: article.url,
            urlToImage: article.urlToImage
          }
        })
        .promise()
    }
    
    return articles;
};