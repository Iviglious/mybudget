@REM Deploy using wizard
@REM sam deploy --guided --stack-name mybudget

@REM Deploy previously created deployment configuration
sam deploy --config-file samconfig.toml --stack-name mybudget
