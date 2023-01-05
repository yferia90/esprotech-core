module.exports = {
    apps : [{
      name: "API-GEOREF-PROVINCE",
      script: "./build/app.js",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
      exec_mode: "cluster",
      instances: 1,
      watch: false,
    }]
}