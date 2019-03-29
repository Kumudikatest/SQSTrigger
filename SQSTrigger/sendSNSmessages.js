let AWS = require('aws-sdk');
const sns = new AWS.SNS();

exports.handler = function (event, context, callback) {
    event.Records.forEach((record) => {
        console.log('Queue record: ', JSON.stringify(record, null, 2));
        if (record.eventSourceARN == 'arn:aws:sqs:us-east-1:318300609668:anomalyDetectionQueue') {
            sns.publish({
                Message: 'Test sqs as a trigger',
                Subject: 'Test',
                MessageAttributes: {},
                MessageStructure: 'String',
                TopicArn: 'arn:aws:sns:us-east-1:318300609668:dynamodb'
            }).promise()
                .then(data => {
                    // your code goes here
                })
                .catch(err => {
                    // error handling goes here
                });
        }
    });
    callback(null, { "message": "Successfully executed" });
};