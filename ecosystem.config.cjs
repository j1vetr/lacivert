module.exports = {
  apps: [
    {
      name: 'lacivert-teknoloji',
      script: 'dist/index.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000,
        OPENAI_API_KEY: '',
        SMTP_HOST: 'mail.lacivertteknoloji.com',
        SMTP_USER: 'no-reply@lacivertteknoloji.com',
        SMTP_PASSWORD: ''
      }
    }
  ]
};
