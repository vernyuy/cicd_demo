import { CfnOutput, RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  AttributeType,
  BillingMode,
  StreamViewType,
  Table,
} from "aws-cdk-lib/aws-dynamodb";

export class SharedStack extends Stack {
  public readonly Database: Table;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    /**
     * Database
     */

    this.Database = new Table(this, "ACMSDynamoDbTable", {
      tableName: "AcmsDynamoDBDatabaseTable",

      partitionKey: {
        name: "PK",
        type: AttributeType.STRING,
      },
      sortKey: {
        name: "SK",
        type: AttributeType.STRING,
      },

      billingMode: BillingMode.PAY_PER_REQUEST,
      stream: StreamViewType.NEW_IMAGE,

      removalPolicy: RemovalPolicy.DESTROY,
    });

  }
}
