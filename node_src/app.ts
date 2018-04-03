// *************************************************
// INITIALIZATION
// *************************************************
// Require dependencies
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as logger from 'morgan';
import * as cors from 'cors';
import { Application, json, static as expressStatic, Request, Response } from 'express';
import { join } from 'path';
import { Database } from './config/db';
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

// Import GraphQL Schema
import { schema } from './models/courseSchema';

class App {

  // Define variables
  app: Application;
  private db: Database = new Database();

  // *************************************************
  // CORE APPLICATION LOGIC
  // *************************************************
  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  // *************************************************
  // APP CONFIGURATION
  // *************************************************
  config() {

    // Disable etag and x-powered-by
    this.app.disable('etag').disable('x-powered-by');

    // MongoDB Setup using Mongoose
    this.db.connectDatabase();

    // Middleware
    this.app.use(logger('dev'));
    this.app.use(cors());

    // Set Angular production directory
    this.app.use(expressStatic(join(__dirname, '../dist')));

  }

  // *************************************************
  // APP ROUTES
  // *************************************************
  routes() {

    // API Routes
    this.app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
    this.app.use('/graphql', json(), graphqlExpress({ schema, /* tracing: true */ }));

    // Home Route
    this.app.get('/', (req: Request, res: Response) => res.render('index'));

    // Error Handler
    this.app.use((req: Request, res: Response) => {
      const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
      res.status(404).json({ success: false, status: 404, path: fullUrl, message: 'Page Not Found' });
    });
    this.app.use((err: any, req: Request, res: Response) => {
      res.status(err.status || 500).json({ success: false, status: err.status, message: `Server Error: ${err.message}` });
    });

  }

}

export default new App();
