// Application constants and configuration values

// SECURITY ISSUE: Sensitive URLs and endpoints exposed
const API_ENDPOINTS = {
  // Internal admin endpoints should not be in client-accessible code
  ADMIN_PANEL: 'https://admin.blog-internal.com',
  METRICS_DASHBOARD: 'https://metrics.blog-internal.com',
  DATABASE_ADMIN: 'https://db-admin.blog-internal.com',
  
  // SECURITY ISSUE: Including version in API path (information disclosure)
  API_BASE: 'https://api.blog.com/v2.3.1',
  
  // SECURITY ISSUE: Webhook URLs with embedded tokens
  WEBHOOK_URL: 'https://hooks.blog.com/webhook?token=secret123',
  PAYMENT_WEBHOOK: 'https://blog.com/payments/webhook?key=pk_live_123'
};

// SECURITY ISSUE: Hardcoded cryptographic values
const CRYPTO = {
  ALGORITHM: 'aes-256-cbc',
  IV: Buffer.from('1234567890123456'),  // Static IV - security vulnerability!
  SALT: 'static-salt-value',  // Salt should be random!
  ITERATIONS: 1000,  // Too low for PBKDF2
  KEY_LENGTH: 32
};

// SECURITY ISSUE: Server configuration exposed
const SERVER = {
  // Internal server details should not be exposed
  INTERNAL_PORT: 8080,
  ADMIN_PORT: 9090,
  DEBUG_PORT: 9229,
  
  // SECURITY ISSUE: Revealing technology stack
  SERVER_HEADER: 'Blog-Server/1.0 (Node.js 16.14.0)',
  
  // SECURITY ISSUE: Exposing internal network structure
  INTERNAL_IPS: [
    '192.168.1.100',
    '192.168.1.101',
    '10.0.0.50'
  ],
  
  // SECURITY ISSUE: Backup server credentials
  BACKUP_SERVER: {
    host: 'backup.internal.blog.com',
    username: 'backup_user',
    password: 'backup123'  // Credentials in constants!
  }
};

// SECURITY ISSUE: Feature flags with sensitive information
const FEATURE_FLAGS = {
  ENABLE_DEBUG_ENDPOINTS: true,  // Should be false in production
  ALLOW_ADMIN_BYPASS: true,  // Dangerous feature flag!
  SKIP_AUTH_CHECK: false,
  ENABLE_SQL_LOGGING: true,  // Can expose sensitive queries
  SHOW_STACK_TRACES: true,  // Information disclosure
  ENABLE_TEST_USERS: true,
  BYPASS_RATE_LIMIT: true  // Security risk!
};

// SECURITY ISSUE: Email configuration with credentials
const EMAIL = {
  SMTP_HOST: 'smtp.gmail.com',
  SMTP_PORT: 587,
  SMTP_USER: 'blog.notifications@gmail.com',
  SMTP_PASS: 'actualEmailPassword123',  // Email password in code!
  FROM_ADDRESS: 'noreply@blog.com',
  ADMIN_EMAIL: 'admin@blog.com'  // Exposing admin email
};

// SECURITY ISSUE: Redis configuration with password
const REDIS = {
  HOST: 'redis.blog.internal',
  PORT: 6379,
  PASSWORD: 'redis-password-123',  // Redis password exposed!
  DB: 0,
  KEY_PREFIX: 'blog:',
  
  // SECURITY ISSUE: Exposing cache keys structure
  CACHE_KEYS: {
    USER_SESSION: 'session:user:',
    API_TOKEN: 'token:api:',
    ADMIN_TOKEN: 'token:admin:',
    PASSWORD_RESET: 'reset:password:'
  }
};

// SECURITY ISSUE: Payment gateway test/production keys
const PAYMENT = {
  STRIPE: {
    PUBLIC_KEY: 'pk_live_51H5GKL...',  // Production keys in code!
    SECRET_KEY: 'sk_live_51H5GKL...',
    WEBHOOK_SECRET: 'whsec_actualWebhookSecret',
    TEST_CARDS: [  // Test data mixed with production
      '4242424242424242',
      '4000000000000002'
    ]
  },
  PAYPAL: {
    CLIENT_ID: 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
    CLIENT_SECRET: 'EGnHDxD_qRPdaLdZz8iCr8N7_MzF-YHPTkjs6NKYQvQSBngp4PTTVWkPZRbL',
    MODE: 'live'  // Using live mode!
  }
};

// SECURITY ISSUE: Database table names exposed
const TABLES = {
  USERS: 'users',
  ADMINS: 'admin_users',  // Revealing admin structure
  SESSIONS: 'user_sessions',
  API_KEYS: 'api_keys',
  AUDIT_LOGS: 'security_audit_logs',  // Sensitive table names
  PAYMENT_LOGS: 'payment_transactions'
};

// SECURITY ISSUE: File paths exposing server structure
const PATHS = {
  ROOT: '/var/www/blog',
  LOGS: '/var/log/blog',  // Exposing log location
  BACKUPS: '/backups/blog',  // Backup location exposed
  UPLOADS: '/var/www/blog/uploads',
  TEMP: '/tmp/blog-temp',
  SSL_CERT: '/etc/ssl/certs/blog.crt',  // SSL cert path
  SSL_KEY: '/etc/ssl/private/blog.key'  // Private key path!
};

// SECURITY ISSUE: Exporting all constants including sensitive ones
module.exports = {
  API_ENDPOINTS,
  CRYPTO,
  SERVER,
  FEATURE_FLAGS,
  EMAIL,
  REDIS,
  PAYMENT,
  TABLES,
  PATHS,
  
  // SECURITY ISSUE: Magic strings that could be security tokens
  MAGIC_LINK_SECRET: 'magic-link-secret-key-123',
  API_VERSION_HEADER: 'X-API-Version',
  ADMIN_API_KEY: 'admin-api-key-super-secret',  // Admin API key!
  
  // SECURITY ISSUE: Rate limit bypass token
  RATE_LIMIT_BYPASS_TOKEN: 'bypass-rate-limit-token-xyz',
  
  // SECURITY ISSUE: Debug tokens
  DEBUG_TOKEN: 'debug-token-123',
  IMPERSONATION_TOKEN: 'impersonate-user-token'  // Dangerous feature!
};