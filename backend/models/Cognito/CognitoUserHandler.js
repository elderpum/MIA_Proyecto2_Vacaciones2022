const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

class CognitoUserHandler {

    constructor(Username, Password, UserPool) {
        this.Username = Username;
        this.Password = Password;
        this.authDetails = new AmazonCognitoIdentity.AuthenticationDetails({ Username, Password });
        this.cognitoUser = new AmazonCognitoIdentity.CognitoUser({
            Username,
            Pool: UserPool
        });

        this.validAttributes = ['email'];
    }

    LogIn() {
        return new Promise((resolve, reject) => {

            this.cognitoUser.authenticateUser(this.authDetails, {
                onSuccess: function (result) {
                    var accessToken = result.getAccessToken().getJwtToken();
                    resolve(accessToken);
                },

                onFailure: function (err) {
                    reject(err.message || JSON.stringify(err));
                },
                newPasswordRequired: function (err) {
                    resolve('Se necesita crear una contraseña nueva. ')
                }
            })

        })
    }

    getInfo() {
        return new Promise((resolve, reject) => {
            this.cognitoUser.getUserAttributes(function (err, result) {
                if (err) {
                    reject(err.message || JSON.stringify(err));
                    return;
                }
                const data = {};
                for (let i = 0; i < result.length; i++) {
                    console.log(
                        'attribute ' + result[i].getName() + ' has value ' + result[i].getValue()
                    );
                    data[result[i].getName()] = result[i].getValue();
                }
                resolve(data);
            });
        })
    }
    
    // Info : [{Name, Value}, {Name, Value}]
    updateInfo(info = []) {
        return new Promise((resolve, reject) => {
            const attributeList = [];
            info.forEach(({ Name, Value }) => {
                if (this.validAttributes.includes(Name))
                    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name, Value }));
            });

            this.cognitoUser.updateAttributes(attributeList, function (err, result) {
                if (err) {
                    reject(err.message || JSON.stringify(err));
                    return;
                }
                console.log('call result: ' + result);
                resolve(result);
            });
        })
    }
}


module.exports = {
    CognitoUserHandler
}