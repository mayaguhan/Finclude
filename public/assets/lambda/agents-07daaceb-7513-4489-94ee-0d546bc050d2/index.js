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
      case "GET /agents/{id}":
        const id = event.pathParameters.id;
        const params = {
          "TableName": "agents",
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
      case "GET /agents":
        body = await dynamo.scan({ TableName: "agents" }).promise();
        break;
      case "PUT /agents":
        let requestJSON = JSON.parse(event.body);
        await dynamo
          .put({
            TableName: "agents",
            Item: {
              id: requestJSON.id,
              firstName: requestJSON.firstName,
              lastName: requestJSON.lastName,
              rating: requestJSON.rating,
              experience: requestJSON.experience,
              linkedinUrl: requestJSON.linkedinUrl,
              teleHandle: requestJSON.teleHandle,
              imgUrl: requestJSON.imgUrl,
              tags: requestJSON["tags"],
              contactNumber: requestJSON.contactNumber,
              email: requestJSON.email,
              lang: requestJSON.lang
            }
          })
          .promise();
        body = `Put agent ${requestJSON.id}`;
        break;
      case "PATCH /agents/{id}":
        let requestJson = JSON.parse(event.body);
        let expression = "set " + Object.keys(requestJson)[0] + " = :v"
        await dynamo
          .update({
            TableName: "agents",
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
        body = `Update agent ${JSON.stringify(requestJson)}`;
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