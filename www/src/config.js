// You can obtain these values by running:
// aws cloudformation describe-stacks --stack-name <YOUR STACK NAME> --query "Stacks[0].Outputs[]"

const config = {
  "aws_user_pools_web_client_id": "4m91kp6q6v8i023ftuu06b4tdm",     // CognitoClientID
  "api_base_url": "https://kz81b1vr56.execute-api.us-east-1.amazonaws.com/prod",                                     // TodoFunctionApi
  "cognito_hosted_domain": "mybudget-mybudget.auth.us-east-1.amazoncognito.com",                   // CognitoDomainName
  "redirect_url": "https://master.d15mt9hs5n3gka.amplifyapp.com"                                      // AmplifyURL
};

export default config;
