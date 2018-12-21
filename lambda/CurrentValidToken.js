var AWS = require('aws-sdk');

async function getFutureUsers(ddb) {
  // get the time 5 minutes in the future
  let timeStart = new Date();
  timeStart.setMinutes(timeStart.getMinutes() + 5);

  // get the time 30 minutes in the future
  let timeEnd = new Date();
  timeEnd.setMinutes(timeEnd.getMinutes() + 60);

  // get current record for current time
  var params = {
    TableName : "qwave_bookings",
    FilterExpression: "startDate >= :timeStart AND endDate <= :timeEnd",
    ExpressionAttributeValues: {
      ":timeStart":{"S":timeStart.toISOString()},
      ":timeEnd":{"S":timeEnd.toISOString()}
    },
  };

  // Call DynamoDB to read the item from the table
  let res = await ddb.scan(params, (err, data) => {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.Item);

    }
  }).promise();

  return res.Items.map((item) => {
    return {
      username: item.username.S,
      startDate: item.startDate.S

    };
  });
}

async function getCurrentUser(ddb) {
  // get current time
  let currentTime = new Date().toISOString();

  // get current record for current time
  var params = {
    TableName : "qwave_bookings",
    FilterExpression: "startDate <= :currentTime AND endDate >= :currentTime",
    ExpressionAttributeValues: {
      ":currentTime":{"S":currentTime}
    },
  };

  // Call DynamoDB to read the item from the table
  let res = await ddb.scan(params, (err, data) => {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.Item);

    }
  }).promise();

  if (res.Items.length === 0) {
    return null;
  }

  let username = res.Items.length !== 0 ? res.Items[0].username.S : null;

  return username;
}

exports.handler = async (event) => {
  // Set the region
  AWS.config.update({region: 'ap-southeast-2'});

  // Create the DynamoDB service object
  let ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'});

  let username = await getCurrentUser(ddb);
  let futureUsers = await getFutureUsers(ddb);

  // return user name
  let response = {
    username: username,
    futureUsers: futureUsers
  };

  return {
    statusCode: 200,
    body: JSON.stringify(response),
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  };
};
