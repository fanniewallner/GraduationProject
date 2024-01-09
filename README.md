# Xtools productcatalog

## About the project

This is my graduation project as a frontend developer at Medieinstitutet. My customer is a company called XTools who sell ergonomic and portable carpentry benches and accessories. The target audience for this application is mainly other enterprises, but not excluding private customers. The goal with the website is to simplify the user flow throughout the application and provide a nice experience for potential customers. Another goal for this page is to remove the payment solution that the product owner(PO) previously used and instead implement purchase forms that the PO then can invoice the customers via.

## Tech stack

- React
- Typescript
- Axios
- Strapi
- Material UI (MUI) component library
- SendGrid

The web application is built with React and typescript in order to write correct and sustainable code.

MUI component library for React is used for both components and icons to keep a consistent design throught the website. MUI provides a great deal of documentation and I therefore chose to use this library since any other developer can turnt o the documentation if they were to change the components of the project.

Axios is used to fetch and post data from and to the database.

The Sendgrid plugin is used with a lifecycle hook in the application to send emails to the PO and customer, both when a message is submitted via the contact form and when a order is placed via the website. The axios post requests creates a contact object or an order object in the database which then triggers an email to be send through the plugin.

## Installation and setup of project

1. Clone the repo
   ```sh
   https://github.com/fanniewallner/GraduationProject.git
   ```
2. Install dependencies
   ```sh
   npm i
   ```
3. Run the app i frontend
   ```sh
   npm run dev
   ```
   3. Run the app i backend
   ```sh
   npm run develop
   ```

## User flow

As mentioned above, one primary goal is to simplify the user flow of the application. Below is the previous architecture of the web application as well as the new and improved architechture.

Previous userflow:
![Previous user flow](./client/public/userflow1.0.png)

New userflow:
![Previous user flow](./client/public/userflow2.0.png)

Xtools is a part of a company called Kreativa Snickare AB which is the POs' primary company. I therefor decided to remove the news section since the owner does not feel that he has the time to update as much as he wants and needs in order for this section to fill a purpose. The previous user flow had a redundant amout of pages which lead to the same url in the end which I have now removed and simplified.

## API Design

For this application I have used Strapi to build my sqlite database with javascipt.

Strapi is a headless CMS that comes with an admin panel where content types can be specified. This admin panel enables the PO of this project to manage content on his website without having coding experience. These content types generates basic controllers and services, providing endpoints for each content type to be fetched from. This way the PO can update, delete and create new products, add images to the media library and change contact fields such as company address, email, phonenumber etcetera to give him more freedom in maintaining the site himself.

The content types of the applications are collection types which are used for recurring content, and single types that are used for occasional instances.

**Collection types:**

• Product - This collection type represents each product that the company sells. The content type consist of the fields productImage(string), name(string), price (number), description (string), specification(string) as well as an optional field of stock status. Products have a relation to the collection type Category.

• Category - This collection type consists of a field called filter which can be either a 1 or 2, 1 representing workbench and 2 representing accessory. This collection type has a with Product.

• ContactForm - This collection type builds the data architecture for my contact form. It contains the following fields: firstname(string), lastname(string), email(string), phonenumber(string) and message(string).

• MediaGallery - This collection type is consisting of a collection of a single image field.

• Order - This consists of firstname(string), lastname(string), amount(number), email(string), phonenumber(string), message(string) and an order-purchase component containing productname(string) and productid(string).

**Single types:**

• AboutPage - This single type contains a single field called freeText(string) where the product owner can easily manage what information will be shown on the “About XTools” page.

• Company - This collection type has two fields – pickup(string) and companyInfo(string) that displays necessary information on the contact page.

• ContactDetail - This single type contains all the information that is shown in the footer such as email(email), phonenumber(string), freeText(string), company(string), website(string).

• PurchaseCondition - This single type contains the field text(string) where the product owner can edit and show customers purchase conditions for the company.

## Testing

Before implementation of code I have been conducting quick-and-dirty user tests of a prototype that I made with input from the PO. These tests gave us an insight in the behaviour of the potential user which I could take into care when writing the code for the application.

I have been testing components with Cypress with Gherkin syntax.

## Images displaying project

_Home page - desktop_
![Home page - desktop](./client/public/home-desktop.png)
_Product page - desktop_
![Product page - desktop](./client/public/product-desktop.png)
_Home page - mobile_
![Home page - mobile](./client/public/home-mobile.png)

_Product page - mobile_
![Product page - mobile](./client/public/product-mobile.png)
