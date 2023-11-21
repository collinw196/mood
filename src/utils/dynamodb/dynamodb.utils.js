import * as AWS from 'aws-sdk'

AWS.config.update({
  region: 'us-east-1',
  secretAccessKey: 'l0nSIGQRVk8tOzsQEH99AmkiXMcvjaOPbPe45L5t',
  accessKeyId: 'AKIA3FRDZSQVTKOLDKH6'
});

const docClient = new AWS.DynamoDB.DocumentClient()

const encryptionKey = new AWS.KMS();

const tableName = 'Stream-Vary-Users';

export const fetchAllUsers = async () => {
  var params = {
    TableName: tableName
  }

  docClient.scan(params, function (err, data) {
      if (!err) {
          console.log(data)
      }
  })
};

export const validateUserLogin = async (email, password) => {
  var params = {
    TableName: tableName,
    Key: {
      email: email
    }
  }

  const result = await docClient.get(params).promise();
  var pass = await decryptCiphertext(result.Item.password);
  if(password == pass){
    alert("Login successful");
  } else {
    alert("Incorrect email or password.");
  }
}

export const addUser = async(userId, email, password) => {
  const cipherPass = await encryptPlaintext(password);
  var params = {
    TableName: tableName,
    Item: {
      userId: userId,
      email: email,
      password: cipherPass.CiphertextBlob
    }
  }

  const existingUser = await checkExistingUsers(email);
  if(existingUser.Item === undefined) {
    docClient.put(params, function (err, data) {
        if (err) {
            console.log('Error', err)
        } else {
            console.log('Success', data)
            alert('Successfully Created User.')
        }
    })
  } else {
    alert('Email already in use.');
  }
}

const deleteUser = async(email) => {
  await docClient.delete({
      TableName: tableName,
      Key: {
        email: email,
      }
    }).promise();
}

const checkExistingUsers = async(email) => {
  var existingUserParams = {
    TableName: tableName,
    Key: {
      email: email,
    }
  }

  var users;
  try {
    users = await docClient.get(existingUserParams).promise();
  } catch(e) {
    console.log(e);
  }
  return users;
}

const encryptPlaintext = async(plainText) => {
  var encryptionParams = {
    KeyId: '1a909316-430b-497a-aec7-cefb1044b18b',
    Plaintext: plainText
  }

  const result = await encryptionKey.encrypt(encryptionParams).promise();
  return result;
}

const decryptCiphertext = async(cipherText) => {
  var params = {
    KeyId: '1a909316-430b-497a-aec7-cefb1044b18b',
    CiphertextBlob: cipherText
  }

  const result = await encryptionKey.decrypt(params).promise();
  return result.Plaintext.toString();
}