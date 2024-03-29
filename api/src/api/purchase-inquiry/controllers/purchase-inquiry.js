module.exports = {
  async sendEmail(ctx) {
    try {
      const { toEmail, subject, content } = ctx.request.body;

      await strapi.plugins.email.services.email.send({
        to: toEmail,
        subject,
        text: content,
      });

      ctx.send({ success: true });
    } catch (error) {
      console.error("Error sending email:", error);
      ctx.response.status = 500;
      ctx.send({ error: "Internal Server Error" });
    }
  },
};
