module.exports = {
  async afterCreate(event) {
    const { result } = event;
    console.log("Lifecycle afterCreate triggered:", result);
    try {
      /*  
        const orderSummary = `Order details:
            First Name: ${result.firstname}
            Last Name: ${result.lastname}
            Email: ${result.email}

          
          `;
 */

      await strapi.plugins["email"].services.email.send({
        to: "fannie.wallner@medieinstitutet.se",
        subject: "Ny order - XTools",
        /* text: orderSummary, */
        html: "Det har inkommit en ny order via XTools.se",
      });
    } catch (error) {
      console.error("Error processing order:", error);
    }
  },
};
