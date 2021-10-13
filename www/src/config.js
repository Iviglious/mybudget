// You can obtain these values by running:
// aws cloudformation describe-stacks --stack-name <YOUR STACK NAME> --query "Stacks[0].Outputs[]"

const config = {
  "aws_user_pools_web_client_id": "1f8s7rcj0ai782jcatg4gls2b1",                   // CognitoClientID
  "api_base_url": "https://qqqsaeo46e.execute-api.us-east-1.amazonaws.com/prod",  // MyBudgetFunctionApi
  "cognito_hosted_domain": "mybudget-mybudget.auth.us-east-1.amazoncognito.com",  // CognitoDomainName
  //"redirect_url": "https://master.d2u8nm67jwwpmx.amplifyapp.com"                  // AmplifyURL
  "redirect_url": "http://localhost:3000/"  // Local URL for testing
};

export default config;
