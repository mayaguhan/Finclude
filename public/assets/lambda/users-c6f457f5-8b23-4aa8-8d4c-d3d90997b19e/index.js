const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };

  try {
    switch (event.routeKey) {
      case "GET /users/{id}":
        const id = event.pathParameters.id;
        const params = {
          "TableName": "users",
          "KeyConditionExpression": "#DYNOBASE_id = :pkey",
          "ExpressionAttributeValues": {
            ":pkey": id
          },
          "ExpressionAttributeNames": {
            "#DYNOBASE_id": "id"
          },
          "ScanIndexForward": true
        };
        body = await dynamo
          .query(params)
          .promise();
        break;
      case "GET /users":
        body = await dynamo.scan({ TableName: "users" }).promise();
        break;
      case "PUT /users":
        let requestJSON = JSON.parse(event.body);
        await dynamo
          .put({
            TableName: "users",
            Item: {
              id: requestJSON.id,
              firstName: requestJSON.firstName,
              lastName: requestJSON.lastName,
              prefCurrency: requestJSON.prefCurrency,
              monExpenditure: requestJSON.monExpenditure,
              bio: requestJSON.bio,
              savings: requestJSON.savings,
              salary: requestJSON.salary,
              goal: requestJSON.goal,
              lang: requestJSON.lang,
              yearsToGoal: requestJSON.yearsToGoal,
              advisorId: requestJSON.advisorId,
              monSavings: requestJSON.monSavings,
              tags: requestJSON["tags"],
              imgUrl: requestJSON.imgUrl
            }
          })
          .promise();
        body = `Put user ${requestJSON.id}`;
        break;
      case "PATCH /users/{id}":
        let requestJson = JSON.parse(event.body);
        let expression = "set " + Object.keys(requestJson)[0] + " = :v"
        await dynamo
          .update({
            TableName: "users",
            Key: {
                "id": event.pathParameters.id
            },
            UpdateExpression: expression,
            ExpressionAttributeValues:{
                ":v": requestJson[Object.keys(requestJson)[0]]
            },
            ReturnValues: "UPDATED_NEW"
          })
          .promise();
        body = `Update item ${event.pathParameters.id}`;
        break;
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers
  };
};

