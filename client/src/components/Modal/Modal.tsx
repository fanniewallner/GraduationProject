import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IStrapiSingleResponse } from "../../models/IStrapiResponse";
import { Box, Link, Select, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { EmailData, PurchaseInquiry } from "../../models/PurchaseInquiry";
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import useApi from "../../hooks/useApi";
import axios from "axios";

type IModalProps = {
  open: boolean;
  handleClose: () => void;
  product: IStrapiSingleResponse;
};

export default function Modal({ open, handleClose, product }: IModalProps) {
  const { handleSubmit, formState, register, reset } =
    useForm<PurchaseInquiry>();
  const api = useApi();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(
    parseInt(product.data.attributes.price)
  );
  const formValid =
    !formState.errors.amount &&
    !formState.errors.checked &&
    !formState.errors.email &&
    !formState.errors.firstname &&
    !formState.errors.lastname &&
    !formState.errors.phonenumber &&
    !formState.errors.productId &&
    !formState.errors.productname;

  /*   const handleChangeOfAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event?.target.value;
  }; */

  // Your React component

  // Call the sendEmail function when needed

  const handleFormSubmit = async (data: PurchaseInquiry) => {
    try {
      console.log(data);
      console.log("Skickat");
      handleCheckbox();

      try {
        // Create an instance of the EmailData type
        const emailData: EmailData = {
          toEmail: data.email,
          subject: "Orderbekräftelse",
          content: "Hello, this is the body of your email!",
        };

        // Use the submitForm method from your useApi hook
        const response = await api.submitForm(emailData);

        console.log("Email sent successfully:", response.data);
      } catch (error) {
        console.error("Error sending email:", error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /*   const sendEmail = async (toEmail: string) => {
    try {
      const response = await axios.post("/api/send-email", { to: toEmail });
      console.log(response.data);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }; */

  /*   const sendEmail = async (clientMail: string) => {
    await strapi.plugins["email"].services.email.send({
      to: clientMail,
      subject: "Hello!",
      text: "This is a test email sent from Strapi with SendGrid!",
    });
  }; */

  const handleCheckbox = () => {
    setIsChecked(!isChecked);
  };
  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Köpformulär</DialogTitle>
        <DialogContent>
          <img
            src={
              product.data.attributes.image.data.attributes.formats.thumbnail
                .url
            }
          />
          <DialogContentText>
            <Typography>{product.data.attributes.name}</Typography>
            <Typography>Antal:</Typography>
            <Typography>Totalt pris: {totalPrice} kr exkl. moms</Typography>
          </DialogContentText>
          <form>
            <Select
              //helperText={formState.errors.amount?.message}
              error={formState.errors.amount != undefined}
              fullWidth
              value={amount}
              label="Antal"
              autoFocus
              type="number"
              id="amount"
              {...register("amount", {
                required: "Du måste ange det här fältet",
              })}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
            </Select>
            <TextField
              helperText={formState.errors.firstname?.message}
              error={formState.errors.firstname != undefined}
              margin="normal"
              fullWidth
              autoFocus
              label="Förnamn"
              type="text"
              id="firstname"
              {...register("firstname", {
                required: "Du måste ange det här fältet",
              })}
            />
            <TextField
              helperText={formState.errors.lastname?.message}
              error={formState.errors.lastname != undefined}
              margin="normal"
              fullWidth
              autoFocus
              label="Efternamn"
              type="text"
              id="lastname"
              {...register("lastname", {
                required: "Du måste ange det här fältet",
              })}
            />
            <TextField
              helperText={formState.errors.email?.message}
              error={formState.errors.email != undefined}
              margin="normal"
              fullWidth
              autoFocus
              label="E-post"
              type="email"
              id="email"
              {...register("email", {
                required: "Du måste ange det här fältet",
              })}
            />
            <TextField
              helperText={formState.errors.phonenumber?.message}
              error={formState.errors.phonenumber != undefined}
              margin="normal"
              fullWidth
              autoFocus
              label="Mobilnummer"
              type="number"
              id="phonenumber"
              {...register("phonenumber", {
                required: "Du måste ange det här fältet",
              })}
            />
            <TextField
              helperText={formState.errors.message?.message}
              error={formState.errors.message != undefined}
              margin="normal"
              fullWidth
              autoFocus
              multiline
              minRows={5}
              label="Meddelande (valfritt)"
              type="text"
              id="message"
              {...register("message")}
            />

            <TextField
              sx={{ display: "none" }}
              helperText={formState.errors.productId?.message}
              error={formState.errors.productId != undefined}
              margin="normal"
              fullWidth
              autoFocus
              value={product.data.id}
              type="number"
              id="productId"
              {...register("productId")}
            />
            <TextField
              sx={{ display: "none" }}
              helperText={formState.errors.productname?.message}
              error={formState.errors.productname != undefined}
              margin="normal"
              fullWidth
              autoFocus
              value={product.data.attributes.name}
              type="text"
              id="productname"
              {...register("productname")}
            />
            <Typography fontSize={"14px"}>
              Köpet är inte bindande förrän bekräftelse från XTools mottagits
            </Typography>
          </form>
        </DialogContent>
        <DialogActions>
          <Box>
            <Box sx={{ display: "flex" }}>
              <Checkbox onChange={handleCheckbox} checked={isChecked} />
              <Typography>
                Jag har läst och godkänner{" "}
                <Link
                  sx={{ color: "black" }}
                  href="/kopvillkor"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  köpvillkoren
                </Link>
              </Typography>
            </Box>

            <Button onClick={handleClose}>Stäng</Button>
            <Button
              onClick={handleSubmit(handleFormSubmit)}
              disabled={formState.isSubmitting || !isChecked || !formValid}
            >
              Skicka
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
