var AWS = require('aws-sdk');
var uuidv4 = require('uuid/v4');

const NUM_CHARS = 4;
const TABLENAME = 'qwave_bookings';

function generateToken() {
  return Math.random().toString(36).replace('0.', '').slice(0, 4);
}

exports.handler = async (event) => {
  let request = JSON.parse(event.body);

  // Set the region
  AWS.config.update({region: 'ap-southeast-2'});
  const dynamoDb = new AWS.DynamoDB({apiVersion: '2012-10-08'});

  // Generate token
  let token = generateToken();

  // Generate uuid
  let id = uuidv4();

  // get booked date time
  let startDate = request.startDate;
  let endDate = request.endDate;
  let username = request.username;

  // Save the token to the db
  let item = {
    Item: {
      "code": {
        S: token
      },
      "startDate": {
        S: startDate
      },
      "endDate": {
        S: endDate
      },
      "id": {
        S: id
      },
      "username": {
        S: username
      }
    },
    ReturnConsumedCapacity: "TOTAL",
    TableName: TABLENAME
  };

  let res = await dynamoDb.putItem(item, (err, data) => {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.Item);
    }
  }).promise();

  let response = {
    code: token,
    start: startDate,
    end: endDate
  };

  // Return the token
  return {
    statusCode: 200,
    body: JSON.stringify(response),
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  };
};