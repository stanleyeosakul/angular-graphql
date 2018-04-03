// *************************************************
// Initialization
// *************************************************
// Import the App and required methods
import App from './app';
import { Application } from 'express';
import { ApolloEngine } from 'apollo-engine';
import { keys } from './config/keys';

// Define server variables
const port = process.env.PORT || 3000;
const expressApp: Application = App.app;
const engine = new ApolloEngine({ apiKey: keys.ApolloAPIKey });

// ***************************************************
// Start the Server
// ***************************************************
engine.listen({ port, expressApp }, () => console.log(`Server started on port ${port}`));
