const AWS = require('aws-sdk');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const { CognitoUserHandler } = require('./CognitoUserHandler');

class CognitoUserPoolHandler {

    constructor(UserPoolId, ClientId, AWSRegion = process.env.AWS_REGION) {

        this.UserPool = new AmazonCognitoIdentity.CognitoUserPool({ UserPoolId, ClientId });
        this.UserPoolId = UserPoolId;
        this.ClientId = ClientId;
        this.AWSRegion = AWSRegion;
        AWS.config.region = this.AWSRegion;
    }

    getUser(Username, Password) {
        return new CognitoUserHandler(Username, Password, this.UserPool);
    }

    SignUp(username, password, name, email, picture) {
        return new Promise((resolve, reject) => {
            const attributeList = []

            var userpool = this.UserPool

            var dataName = {
                Name: 'name',
                Value: name
            }

            var dataEmail = {
                Name: 'email',
                Value: email
            }

            var dataPicture = {
                Name: 'picture',
                Value: picture
            }

            var attributeName = new AmazonCognitoIdentity.CognitoUserAttribute(dataName)
            var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail)
            var attributePicture = new AmazonCognitoIdentity.CognitoUserAttribute(dataPicture)

            attributeList.push(attributeName)
            attributeList.push(attributeEmail)
            attributeList.push(attributePicture)

            userpool.signUp(username, password, attributeList, null, function(
                err,
                result
            ) {
                if (err) {
                    reject(err.message || JSON.stringify(err))
                    return
                }
                console.log('call result: ' + result)
                resolve(result)
            })
        })
    }

    updateUser() {
        throw new Error('Modificacion de usuario no se ha implementado')
    }

    confirmUser(Username, code) {
        return new Promise((resolve, reject) => {
            var cognitoUser = new AmazonCognitoIdentity.CognitoUser({ Username, Pool: this.UserPool });
            cognitoUser.confirmRegistration(code, true, function (err, result) {
                if (err) {

                    reject(err.message || JSON.stringify(err));
                    return;
                }
                console.log('call result: ' + result);
                resolve(result)
            });
        })
    }
}

module.exports = {
    CognitoUserPoolHandler
}