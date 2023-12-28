module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337, 5173),
  app: {
    keys: env.array("APP_KEYS"),
  },
  email: {
    provider: "sendgrid",
    providerOptions: {
      apiKey: env("SENDGRID_API_KEY"),
    },
    settings: {
      defaultFrom: "fannie.wallner@medieinstitutet.se",
      defaultReplyTo: "fannie.wallner@medieinstitutet.se",
      testAddress: "fannie.wallner@medieinstitutet.se",
    },
  },
  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },
});
