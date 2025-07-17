// Main configuration entry point
// SECURITY ISSUE: No environment validation or sanitization

const database = require('./database');
const app = require('./app');
const constants = require('./constants');

// SECURITY ISSUE: Merging all configs without validation
const config = {
  // SECURITY ISSUE: Exposing environment directly
  env: process.env.NODE_ENV || 'development',
  
  // SECURITY ISSUE: No validation on port number
  port: process.env.PORT || 3000,
  
  // Database configuration based on environment
  // SECURITY ISSUE: Falls back to hardcoded values
  database: database[process.env.NODE_ENV || 'development'],
  
  // App configuration
  app: app,
  
  // Constants
  constants: constants,
  
  // SECURITY ISSUE: MongoDB connection string with credentials
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://admin:password123@localhost:27017/blog',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // SECURITY ISSUE: Auto-indexing in production
      autoIndex: true  // Should be false in production
    }
  },
  
  // SECURITY ISSUE: Elasticsearch with credentials
  elasticsearch: {
    node: process.env.ELASTIC_URL || 'http://elastic:changeme@localhost:9200',
    auth: {
      username: 'elastic',
      password: 'changeme'  // Default Elasticsearch password!
    }
  },
  
  // SECURITY ISSUE: S3 bucket configuration exposed
  aws: {
    s3: {
      bucket: 'blog-uploads-prod',
      region: 'us-east-1',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'AKIAIOSFODNN7EXAMPLE',
      secretAccessKey: process.env.AWS_SECRET_KEY || 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY'
    }
  },
  
  // SECURITY ISSUE: Logging configuration that might log sensitive data
  logging: {
    level: 'debug',  // Too verbose for production
    logSensitiveData: true,  // Should never be true!
    destinations: [
      'console',
      'file',
      'remote'  // Sending logs to remote server
    ],
    remoteLogger: {
      url: 'https://logs.blog.com',
      apiKey: 'logger-api-key-123'  // Logger API key exposed
    }
  },
  
  // SECURITY ISSUE: Security headers not properly configured
  security: {
    enableHelmet: false,  // Helmet disabled!
    csrfProtection: false,  // CSRF protection disabled!
    xssProtection: false,  // XSS protection disabled!
    contentSecurityPolicy: false,  // CSP disabled!
    
    // SECURITY ISSUE: Weak password policy
    passwordPolicy: {
      minLength: 4,  // Way too short!
      requireUppercase: false,
      requireLowercase: false,
      requireNumbers: false,
      requireSpecialChars: false,
      maxAge: 365 * 24 * 60 * 60 * 1000  // 1 year - too long!
    }
  },
  
  // SECURITY ISSUE: Test/debug endpoints enabled
  testEndpoints: {
    enabled: true,  // Should be false in production
    resetDatabase: '/api/test/reset-db',
    createTestUsers: '/api/test/create-users',
    bypassAuth: '/api/test/bypass-auth'
  }
};

// SECURITY ISSUE: Config object is mutable
// Anyone can modify config at runtime: config.app.jwtSecret = 'hacked'

// SECURITY ISSUE: No config validation
// Should validate required environment variables and config values

// SECURITY ISSUE: Logging entire config (including secrets)
if (config.env === 'development') {
  console.log('Current configuration:', JSON.stringify(config, null, 2));
}

module.exports = config;

// TODO: Security improvements needed:
// 1. Use environment variables for all sensitive values
// 2. Validate configuration on startup
// 3. Make config object immutable
// 4. Never log sensitive configuration
// 5. Use config schema validation
// 6. Separate secrets from non-sensitive config