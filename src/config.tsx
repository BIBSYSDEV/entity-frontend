export default {
  s3: {
    REGION: "eu-west-01",
    BUCKET: "YOUR_S3_UPLOADS_BUCKET_NAME"
  },
  apiGateway: {
    REGION: "eu-west-01",
    URL: "https://640w1nb4h9.execute-api.eu-west-1.amazonaws.com/final"
  },
  cognito: {
    REGION: "eu-west-01",
    USER_POOL_ID: "registry-user-pool",
    APP_CLIENT_ID: "YOUR_COGNITO_APP_CLIENT_ID",
    IDENTITY_POOL_ID: "YOUR_IDENTITY_POOL_ID"
  }
};