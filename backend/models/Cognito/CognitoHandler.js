const AWS = require('aws-sdk');
const { CognitoUserPoolHandler } = require('./CognitoUserPoolHandler');


class CognitoHandler {

    constructor(AWSRegion = process.env.AWS_REGION) {
        this.AWSRegion = AWSRegion;
        AWS.config.region = this.AWSRegion;
    }

    getCognitoUserPool(UserPoolId, ClientId) {
        return new CognitoUserPoolHandler(UserPoolId, ClientId, this.AWSRegion)
    }
}

module.exports = {
    CognitoHandler
}