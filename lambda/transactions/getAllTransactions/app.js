// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

// default imports
const AWSXRay = require('aws-xray-sdk-core')
const AWS = AWSXRay.captureAWS(require('aws-sdk'))
const {metricScope, Unit} = require("aws-embedded-metrics")
const DDB = new AWS.DynamoDB({apiVersion: "2012-10-08"})

// environment variables
const {TABLE_NAME, ENDPOINT_OVERRIDE, REGION} = process.env
const options = {region: REGION}
AWS.config.update({region: REGION})

if (ENDPOINT_OVERRIDE !== "") {
    options.endpoint = ENDPOINT_OVERRIDE
}

const docClient = new AWS.DynamoDB.DocumentClient(options)
// response helper
const response = (statusCode, body, additionalHeaders) => ({
    statusCode,
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', ...additionalHeaders },
})

// Get cognito username from claims
function getCognitoUsername(event){
    let authHeader = event.requestContext.authorizer;
    if (authHeader !== null)
    {
        return authHeader.claims["cognito:username"];
    }
    return null;

}

// Retrieve all the items by cognito_user_id
function getRecords(user_id) {
    let params = {
        TableName: TABLE_NAME,
        KeyConditionExpression: "#user_id = :user_id",
        ExpressionAttributeNames:{
            "#user_id": "cognito_user_id"
        },
        ExpressionAttributeValues: {
            ":user_id": user_id
        }
    }

    return docClient.query(params)
}

// Lambda Handler
exports.getAllTransactions =
    metricScope(metrics =>
        async (event, context, callback) => {
            metrics.setNamespace('MyBudgetApp')
            metrics.putDimensions({Service: "getAllTransactions"})
            metrics.setProperty("RequestId", context.requestId)

            try {
                let username = getCognitoUsername(event);
                let data = await getRecords(username).promise()
                metrics.putMetric("Success", 1, Unit.Count)
                return response(200, data)

            } catch (err) {
                metrics.putMetric("Error", 1, Unit.Count)
                console.error(err.message);
                return response(400, {message: err.message})
            }
        }
    )