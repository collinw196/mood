import {
    CognitoUserPool,
    CognitoUserAttribute,
    CognitoUser,
    AuthenticationDetails
  } from 'amazon-cognito-identity-js'
import { promisify } from 'util';

const userPool = new CognitoUserPool({
    UserPoolId: 'us-east-1_QtmG2wggg',
    ClientId: '1l0dcnac3vair4o59rqf404e3v'
});

var currentUser = null;

export const getUserPool = () => {
    return userPool;
}

export const getCurrentUser = () => {
    return currentUser;
}

export const signInUser = async(username, password) => {
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
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function(result) {
            var accessToken = result.getAccessToken().getJwtToken();

            /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer */
            var idToken = result.idToken.jwtToken;
            currentUser = cognitoUser;
        },
        onFailure: function(err) {
            alert(err);
        },
        newPasswordRequired: function(resolve) {

        }
    });   
}

export const signOutUser = (username) => {
    const userData = {
        Username: username,
        Pool: userPool
    }
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.signOut();
    currentUser = null;
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