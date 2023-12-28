module.exports = {
  sendOrderEmail: async (orderDetails) => {
    try {
      console.log("Sending order email with details:", orderDetails);

      const mailOptions = {
        to: "fannie.wallner@medieinstitutet.se", // Replace with your company email
        subject: "Ny order XTools",
        text: `Detaljer om din order:\n\n${JSON.stringify(
          orderDetails,
          null,
          2
        )}`,
      };

      // Send the email using Strapi's email service
      await strapi.plugins.email.services.email.send(mailOptions);

      console.log("Order email sent successfully!");
    } catch (error) {
      console.error("Error sending order email:", error);
    }
  },

  sendConfirmationEmail: async (toEmail, orderDetails) => {
    try {
      console.log("Sending confirmation email to:", toEmail);
      console.log("Order details:", orderDetails);

      // Construct the email content
      const mailOptions = {
        to: toEmail,
        subject: "Orderbekräftelse",
        text: `Tack för din order!\n\nOrderdetaljer:\n\n${JSON.stringify(
          orderDetails,
          null,
          2
        )}`,
      };

      // Send the email using Strapi's email service
      await strapi.plugins.email.services.email.send(mailOptions);

      console.log("Confirmation email sent successfully!");
    } catch (error) {
      console.error("Error sending confirmation email:", error);
    }
  },
};
