module.exports = {
  sendOrderEmail: async (orderDetails) => {
    try {
      const mailOptions = {
        to: "fannie.wallner@medieinstitutet.se",
        subject: "Ny order XTools",
        text: `Detaljer om din order:\n\n${JSON.stringify(
          orderDetails,
          null,
          2
        )}`,
      };

      await strapi.plugins.email.services.email.send(mailOptions);
    } catch (error) {
      console.error("Error sending order email:", error);
    }
  },

  sendConfirmationEmail: async (toEmail, orderDetails) => {
    try {
      const mailOptions = {
        to: toEmail,
        subject: "Orderbekräftelse",
        text: `Tack för din order!\n\nOrderdetaljer:\n\n${JSON.stringify(
          orderDetails,
          null,
          2
        )}`,
      };

      await strapi.plugins.email.services.email.send(mailOptions);
    } catch (error) {
      console.error("Error sending confirmation email:", error);
    }
  },
};
