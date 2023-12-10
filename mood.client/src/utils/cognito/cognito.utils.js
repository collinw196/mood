import {
    CognitoUserPool,
    CognitoUserAttribute,
    CognitoUser,
    AuthenticationDetails
  } from 'amazon-cognito-identity-js';
import * as AWS from 'aws-sdk'
import { promisify } from 'util';

const userPool = new CognitoUserPool({
    UserPoolId: 'us-east-1_L9QSKz1Ik',
    ClientId: '1rvbsbs1ofnde2occcjm660r3j'
});



export const getIdentityPoolCredentials = (authResult) => {
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:be847007-2ae7-4e87-87df-e4fda6d08880',
        Logins: { // optional tokens, used for authenticated login
            'accounts.google.com': authResult['id_token'],
        }
    });
        // Make the call to obtain credentials
        AWS.config.credentials.get(function(){

        // Credentials will be available when this function is called.
        var accessKeyId = AWS.config.credentials.accessKeyId;
        var secretAccessKey = AWS.config.credentials.secretAccessKey;
        var sessionToken = AWS.config.credentials.sessionToken;
    });
}

export const getUserPool = () => {
    return userPool;
}

export const signInUser = async (username, password) => {
    const userData = {
        Username: username,
        Pool: userPool
    }
    const authenticationData = {
        Username: username,
        Password: password
    }
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const cognitoUser = new CognitoUser(userData);
    let result = await asyncAuthenticateUser(cognitoUser, authenticationDetails);

    return cognitoUser;   
}

const asyncAuthenticateUser = (cognitoUser, authenticationDetails) => {
    return new Promise(function(resolve, reject) {
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: resolve,
            onFailure: reject,
            newPasswordRequired: resolve
        })
    })
}

export const signOutUser = (username) => {
    const userData = {
        Username: username,
        Pool: userPool
    }
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.signOut();
}

export const resendCode = (username) => {
    const userData = {
        Username: username,
        Pool: userPool
    }
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.resendConfirmationCode((error, result) => {
        if (error) {
            console.log('error');
            console.log(error);
            alert(error);
        } else {
            console.log('result');
            console.log(result);
            alert(result);
        }
    });
}

export const confirmUser = (username, code) => {
    const userData = {
        Username: username,
        Pool: userPool
    }
    const cognitoUser = new CognitoUser(userData);
    
    cognitoUser.confirmRegistration(code, false, (error, result) => {
        if (error) {
            console.log('error');
            console.log(error);
            alert('Confirmation failed.', error);
        } else {
            console.log('result');
            console.log(result);
            alert('Confirmation successful.');
        }
    });
}

export const signUpUser = async(username, email, password) => {
    try {
        const res = await signUp(userPool, username, email, password)
        console.log('Signup success. Result: ', res)
      } catch (e) {
        console.log('Signup fail. Error: ', e)
      }
}

async function signUp(userPool, username, email, password) {
    const usernameAttribute = new CognitoUserAttribute({
        Name: 'custom:username',
        Value: username,
      })
    const emailAttribute = new CognitoUserAttribute({
      Name: 'email',
      Value: email,
    })
  
    let attributes = [usernameAttribute, emailAttribute]
  
    const promisifiedSignUp = promisify(userPool.signUp).bind(userPool)
  
    return promisifiedSignUp(username, password, attributes, null)
  }