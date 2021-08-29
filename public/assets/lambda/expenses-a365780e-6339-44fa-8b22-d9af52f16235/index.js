const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
    'Access-Control-Allow-Origin': '*'
  };

  try {
    switch (event.routeKey) {
      case "DELETE /expenses":
        await dynamo
          .delete({
            TableName: "expenses",
            Key: event.queryStringParameters
          })
          .promise();
        body = `Deleted expense ${JSON.stringify(event.queryStringParameters)} .`;
        break;
      case "GET /expenses/{id}":
        const id = event.pathParameters.id;
        const params = {
          "TableName": "expenses",
          "KeyConditionExpression": "#DYNOBASE_id = :pkey",
          "ExpressionAttributeValues": {
            ":pkey": id
          },
          "ExpressionAttributeNames": {
            "#DYNOBASE_id": "userId"
          },
          "ScanIndexForward": true
        };
        body = await dynamo
          .query(params)
          .promise();
        break;
      case "PUT /expenses":
        let requestJSON = JSON.parse(event.body);
        await dynamo
          .put({
            TableName: "expenses",
            Item: {
              userId: requestJSON.userId,
              name: requestJSON.name,
              category: requestJSON.category,
              amount: requestJSON.amount,
              date: requestJSON.date,
              type: requestJSON.type
            }
          })
          .promise();
        body = `Put expense ${requestJSON.userId} ${requestJSON.name} .`;
        break;
      case "PATCH /expenses/{id}":
        let requestJson = JSON.parse(event.body);
        let expression = "set " + requestJson.attributeToUpdate + " = :v";
        await dynamo
          .update({
            TableName: "expenses",
            Key: {
                "userId": event.pathParameters.id,
                "name": requestJson.name
            },
            UpdateExpression: expression,
            ExpressionAttributeValues:{
                ":v": requestJson.newValue
            },
            ReturnValues: "UPDATED_NEW"
          })
          .promise();
        body = `Update expense ${event.pathParameters.id} ${JSON.stringify(requestJson)} .`;
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
