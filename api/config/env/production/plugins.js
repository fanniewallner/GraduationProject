module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "sendgrid",
      providerOptions: {
        apiKey: env("SENDGRID_API_KEY"),
      },
      settings: {
        defaultFrom: "fannie.wallner@hotmail.com",
        defaultReplyTo: "fannie.wallner@medieinstitutet.se",
        testAddress: "fannie.wallner@medieinstitutet.se",
      },
    },
  },
});
