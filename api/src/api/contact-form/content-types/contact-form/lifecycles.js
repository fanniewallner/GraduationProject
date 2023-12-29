module.exports = {
  async afterCreate(event) {
    const { result } = event;
    console.log("Lifecycle afterCreate triggered:", result);
    try {
      await strapi.plugins["email"].services.email.send({
        to: "fannie.wallner@medieinstitutet.se",
        subject: "Ny kundmeddelande - XTools",
        html: `Det har inkommit ett mejl via XTools.se:
            Förnamn: ${result.firstname}
            Efternamn: ${result.lastname}
            Epost: ${result.email}
            Mobilnummer: ${result.phonenumber}
            Meddelande: ${result.message}`,
      });
    } catch (error) {
      console.error("Error processing order:", error);
    }
  },
};
