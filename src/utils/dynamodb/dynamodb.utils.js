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

export const addUser = async(userId, userName, email, password) => {
  const cipherPass = await encryptPlaintext(password);
  var params = {
    TableName: tableName,
    Item: {
      userId: userId,
      userName: userName,
      email: email,
      password: cipherPass.CiphertextBlob
    }
  }

  const users = await checkExistingUsers();
  if(users.Count == 0) {
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
    Item: {
      email: email,
    }
  }

  var users;
  try {
    users = await docClient.scan(existingUserParams).promise();
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