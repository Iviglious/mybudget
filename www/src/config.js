// You can obtain these values by running:
// aws cloudformation describe-stacks --stack-name <YOUR STACK NAME> --query "Stacks[0].Outputs[]"

const config = {
  "aws_user_pools_web_client_id": "bc77ic06hf4cf8kphs2floaec",     // CognitoClientID
  "api_base_url": "https://43siqg47x8.execute-api.us-east-1.amazonaws.com/prod",                                     // TodoFunctionApi
  "cognito_hosted_domain": "mybudget-mybudget.auth.us-east-1.amazoncognito.com",                   // CognitoDomainName
  "redirect_url": "https://master.d11b524htth1px.amplifyapp.com"                                      // AmplifyURL
};

export default config;
