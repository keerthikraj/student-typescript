import type { AWS } from '@serverless/typescript';

import { student, studentsList, studentsRead, updateStudent, deleteContacts } from 'src/function';

const serverlessConfiguration: AWS = {
  service: 'student',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],

  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    timeout: 600,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      MONGODB_URI: 'mongodb+srv://keerthikmca05:keerthik29@cluster0.ighxidg.mongodb.net/keerthik?retryWrites=true&w=majority',
    },
  },
  // import the function via paths
  functions: { student, studentsList, studentsRead, updateStudent, deleteContacts },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
