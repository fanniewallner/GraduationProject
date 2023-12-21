import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IStrapiSingleResponse } from "../../models/IStrapiResponse";
import { Box, Link, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { PurchaseInquiry } from "../../models/PurchaseInquiry";
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";

type IModalProps = {
  open: boolean;
  handleClose: () => void;
  product: IStrapiSingleResponse;
};

export default function Modal({ open, handleClose, product }: IModalProps) {
  const { handleSubmit, formState, register, reset } =
    useForm<PurchaseInquiry>();
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const formValid =
    !formState.errors.amount &&
    !formState.errors.checked &&
    !formState.errors.email &&
    !formState.errors.firstname &&
    !formState.errors.lastname &&
    !formState.errors.phonenumber &&
    !formState.errors.productId &&
    !formState.errors.productname;

  const handleCheckbox = () => {
    setIsChecked(!isChecked);
  };
  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Köpförfrågan</DialogTitle>
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
            <Typography>
              Totalt pris: {product.data.attributes.price} kr exkl. moms
            </Typography>
          </DialogContentText>
          <form>
            <TextField
              helperText={formState.errors.amount?.message}
              error={formState.errors.amount != undefined}
              margin="normal"
              fullWidth
              label="Antal"
              autoFocus
              type="number"
              id="amount"
              {...register("amount", {
                required: "Du måste ange det här fältet",
              })}
            />
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
          </form>
        </DialogContent>
        <DialogActions>
          <Box>
            <Checkbox onChange={handleCheckbox} checked={isChecked} />
            <Typography>
              Jag har läst och godkänner{" "}
              <Link sx={{ color: "black" }}>köpvillkoren</Link>
            </Typography>
          </Box>

          <Button onClick={handleClose}>Stäng</Button>
          <Button
            onClick={handleSubmit((data) => {
              console.log(data);
              reset({
                amount: 0,
                firstname: "",
                lastname: "",
                email: "",
                phonenumber: 0,
                message: "",
              });
              handleCheckbox();
            })}
            disabled={formState.isSubmitting || !isChecked || !formValid}
          >
            Skicka
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
