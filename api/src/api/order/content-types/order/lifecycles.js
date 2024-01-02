module.exports = {
  async afterCreate(event) {
    const { result } = event;
    console.log("Lifecycle afterCreate triggered:", result);
    try {
      await strapi.plugins["email"].services.email.send({
        to: "fannie.wallner@medieinstitutet.se",
        subject: "Ny order - XTools",
        html: `
        <style>
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
          color: #333;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
    
        .logo {
          max-width: 40px;
          max-height: 40px;
          margin-bottom: 20px;
        }
    
        .order-details {
          margin-bottom: 20px;
        }
    
        .contact-info {
          margin-top: 20px;
          border-top: 1px solid #ddd;
          padding-top: 10px;
        }
      </style>
      <div class="email-container">
      <p><strong>Det har inkommit en ny order från Xtools.se.</strong></p>
      Orderdetaljer:
      <p><strong> Förnamn:</strong> ${result.firstname}</p>
      <p><strong> Efternamn:</strong> ${result.lastname}</p>
      <p><strong>Epost:</strong> ${result.email}</p>
      <p><strong>Mobilnummer:</strong> ${result.phonenumber}</p>
      <p><strong>Produkt:</strong> ${result.productname}</p>
      <p><strong>Produkt ID:</strong> ${result.productId}</p>
      <p><strong> Antal:</strong> ${result.amount}</p>
      <p><strong>Meddelande:</strong> ${result.message}</p>
          </div>`,
      });
      await strapi.plugins["email"].services.email.send({
        to: result.email,
        subject: "Orderbekräftelse - XTools",
        html: `
  <style>
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      font-family: Arial, sans-serif;
      color: #333;
      border: 1px solid #ddd;
      border-radius: 5px;
    }

    .logo {
      max-width: 40px;
      max-height: 40px;
      margin-bottom: 20px;
    }

    .order-details {
      margin-bottom: 20px;
    }

    .contact-info {
      margin-top: 20px;
      border-top: 1px solid #ddd;
      padding-top: 10px;
    }
  </style>
  <div class="email-container">
  <p><strong>Hej ${result.firstname}!</strong></p>
    <p>Tack för din order. Detta är din orderbekräftelse. Nedan följer en sammanfattning om din beställning:</p>
    
    <div class="order-details">
      <p><strong>Produkt:</strong> ${result.productname}</p>
      <p><strong>Produkt ID:</strong> ${result.productId}</p>
      <p><strong>Antal:</strong> ${result.amount}</p>
      <p><strong>Meddelande:</strong> ${result.message}</p>
    </div>

    <div class="contact-info">
      <p>För frågor eller ytterligare information, kontakta oss på:</p>
      <p>E-post: kreativa.snickare@gmail.com.com</p>
      <p>Telefon: 070-423 75 88</p>
      <p>XTools C/O Kreativa Snickare AB</p>
      <p>Xtools.se</p>
    </div>
  </div>
`,
      });
    } catch (error) {
      console.error("Error processing order:", error);
    }
  },
};
