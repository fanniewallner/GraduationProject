module.exports = ({ env }) => ({
  email: {
    config: {
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
  },
});
