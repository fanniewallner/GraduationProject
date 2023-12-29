module.exports = {
  async afterCreate(event) {
    const { result } = event;

    try {
      await strapi.plugins["email"].services.email.send({
        to: "fannie.wallner@medieinstitutet.se",
        subject: "Ny kundmeddelande - XTools",
        html: `
        <style>
        .email-container {
          display: flex;
          flex-direction: column;
          font-family: Arial, sans-serif;
          color: #333;
        }
    
        .info-item {
          margin-bottom: 10px;
        }
      </style>
        <div class="email-container">
        <h3>Det har inkommit ett mejl via XTools.se:</h3>
        <div class="info-item"><strong>Förnamn:</strong> ${result.firstname}</div>
        <div class="info-item"><strong>Efternamn:</strong> ${result.lastname}</div>
        <div class="info-item"><strong>Epost:</strong> ${result.email}</div>
        <div class="info-item"><strong>Mobilnummer:</strong> ${result.phonenumber}</div>
        <div class="info-item"><strong>Meddelande:</strong> ${result.message}</div>
            </div>`,
      });
    } catch (error) {
      console.error("Error processing order:", error);
    }
  },
};
