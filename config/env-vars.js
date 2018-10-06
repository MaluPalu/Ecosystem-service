'use strict';

if (!process.env.APP_CONFIG) //This is just here to run files locally...
{
   process.env.APP_CONFIG = 'local';
}

const requiredEnvVars = [
 'APP_CONFIG'
];

const missing = requiredEnvVars.reduce((prev, curr) => {
 return process.env[curr] ? prev : prev.concat([curr]);
}, []);

if(process.env.APP_CONFIG != 'local' && missing.length) {
 throw new Error(`Fragility Service is missing required environment variables: ${missing}`);
}