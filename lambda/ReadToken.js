var AWS = require('aws-sdk');
const { Client } = require('tplink-smarthome-api');

exports.handler = async (event) => {

  console.log(event, event.code, (new Date()).toISOString());

  // Set the region
  AWS.config.update({region: 'ap-southeast-2'});

  // Create the DynamoDB service object
  let ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'});
  let now = new Date();

  var params = {
    TableName : "qwave_bookings",
    FilterExpression: "code = :code AND startDate <= :startDate AND endDate >= :endDate",
    ExpressionAttributeValues: {
      ":code":{"S":event.code},
      ":startDate":{"S":now.toISOString()},
      ":endDate":{"S":now.toISOString()}
    },
  };

  // Call DynamoDB to read the item from the table
  let res = await ddb.scan(params, (err, data) => {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.Item);

      const response = {
        statusCode: 200,
        item: JSON.stringify(data.Item)
      };

      return response;
    }
  }).promise();

  console.log('Get Device');
  const client = new Client();
  let device = await client.getDevice({host: '10.5.1.5'});
  device.getSysInfo().then(console.log);
  device.setPowerState(true);

// Look for devices, log to console, and turn them on
//   client.startDiscovery().on('device-new', (device) => {
//     device.getSysInfo().then(console.log);
//     device.setPowerState(true);
//   });


  return {"result": res};
};
