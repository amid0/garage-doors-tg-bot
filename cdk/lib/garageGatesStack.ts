import * as cdk from 'aws-cdk-lib';
import {NodejsFunction} from 'aws-cdk-lib/aws-lambda-nodejs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';

export class GarageGatesStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const fn = new NodejsFunction(this, 'garage-gates-fn', {
      memorySize: 1024,
      timeout: cdk.Duration.seconds(5),
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'main',
      entry: path.join(__dirname, `/../lambda-entry-point.ts`),
      bundling: {
        minify: true,
        externalModules: ['aws-sdk'],
      },
      environment: {
        "TELEGRAM_BOT_TOKEN" : ""
      }
    });

    const fnUrlProps = {
      function: fn,
      authType: lambda.FunctionUrlAuthType.NONE
    } as lambda.FunctionUrlProps;

    const fnUrl = new lambda.FunctionUrl(this, 'garage-gates-fn-url', fnUrlProps);

    new cdk.CfnOutput(this, 'garage-gates-fn-url-out', { value: fnUrl.url })
  }
}
