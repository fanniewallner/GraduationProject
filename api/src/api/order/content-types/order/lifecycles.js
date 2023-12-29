module.exports = {
  async afterCreate(event) {
    const { result } = event;
    console.log("Lifecycle afterCreate triggered:", result);
    try {
      await strapi.plugins["email"].services.email.send({
        to: "fannie.wallner@medieinstitutet.se",
        subject: "Ny order - XTools",
        html: `Order details:
          Förnamn: ${result.firstname}
          Efternamn: ${result.lastname}
          Epost: ${result.email}
          Mobilnummer: ${result.phonenumber}
          Produkt: ${result.productname}
          Produkt ID: ${result.productId}
          Antal: ${result.amount}
          Meddelande: ${result.message}`,
        //html: "Det har inkommit en ny order via XTools.se",
      });
      await strapi.plugins["email"].services.email.send({
        to: result.email,
        subject: "Orderbekräftelse - XTools",
        html: `Tack för din order. Detta är din orderbekräftelse. Nedan följer en sammanfattning om din beställning:
        Produkt: ${result.productname}
        Produkt ID: ${result.productId}
        Antal: ${result.amount}
        Meddelande: ${result.message}`,
        //html: "<p>Tack för din order. Detta är din orderbekräftelse.</p>",
      });
    } catch (error) {
      console.error("Error processing order:", error);
    }
  },
};
