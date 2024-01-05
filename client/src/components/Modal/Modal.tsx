import React, { useState } from "react";
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
import { PurchaseInquiry } from "../../models/PurchaseInquiry";
import Checkbox from "@mui/material/Checkbox";
import useApi from "../../hooks/useApi";

type IModalProps = {
  open: boolean;
  handleClose: () => void;
  orderConfirmed: boolean;
  setOrderConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
  product: IStrapiSingleResponse;
};

export default function Modal({
  open,
  handleClose,
  orderConfirmed,
  setOrderConfirmed,
  product,
}: IModalProps) {
  const { handleSubmit, formState, setValue, register, reset } =
    useForm<PurchaseInquiry>();
  const api = useApi();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(
    parseInt(product.data.attributes.price)
  );

  const formValid =
    !formState.errors.data?.amount &&
    !formState.errors.data?.checked &&
    !formState.errors.data?.email &&
    !formState.errors.data?.firstname &&
    !formState.errors.data?.lastname &&
    !formState.errors.data?.phonenumber &&
    !formState.errors.data?.productId &&
    !formState.errors.data?.productname;

  const handleFormSubmit = async (data: PurchaseInquiry) => {
    setValue("data.amount", amount);
    try {
      await api.submitForm(data);
      handleCheckbox();
      reset({
        data: {
          firstname: "",
          lastname: "",
          amount: 0,
          phonenumber: 0,
          email: "",
          productId: 0,
          productname: "",
          message: "",
          checked: false,
        },
      });

      setOrderConfirmed(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Köpformulär</DialogTitle>
        <DialogContent>
          {!orderConfirmed ? (
            <>
              <DialogContentText>
                <Typography>{product.data.attributes.name}</Typography>
                <Typography>Antal: 1</Typography>
                <Typography>Totalt pris: {totalPrice} kr exkl. moms</Typography>
                <Typography>
                  Önskar du fler än 1 st, vänligen fyll i detta i
                  meddelanderutan eller kontakta oss.
                </Typography>
              </DialogContentText>
              <DialogContent>
                {" "}
                <form>
                  <TextField
                    helperText={formState.errors.data?.firstname?.message}
                    error={formState.errors.data?.firstname != undefined}
                    margin="normal"
                    fullWidth
                    autoFocus
                    label="Förnamn"
                    type="text"
                    id="firstname"
                    {...register("data.firstname", {
                      required: "Du måste ange det här fältet",
                    })}
                  />
                  <TextField
                    helperText={formState.errors.data?.lastname?.message}
                    error={formState.errors.data?.lastname != undefined}
                    margin="normal"
                    fullWidth
                    autoFocus
                    label="Efternamn"
                    type="text"
                    id="lastname"
                    {...register("data.lastname", {
                      required: "Du måste ange det här fältet",
                    })}
                  />
                  <TextField
                    helperText={formState.errors.data?.email?.message}
                    error={formState.errors.data?.email != undefined}
                    margin="normal"
                    fullWidth
                    autoFocus
                    label="E-post"
                    type="email"
                    id="email"
                    {...register("data.email", {
                      required: "Du måste ange det här fältet",
                    })}
                  />
                  <TextField
                    helperText={formState.errors.data?.phonenumber?.message}
                    error={formState.errors.data?.phonenumber != undefined}
                    margin="normal"
                    fullWidth
                    autoFocus
                    label="Mobilnummer"
                    type="number"
                    id="phonenumber"
                    {...register("data.phonenumber", {
                      required: "Du måste ange det här fältet",
                    })}
                  />
                  <TextField
                    error={formState.errors.data?.message != undefined}
                    margin="normal"
                    fullWidth
                    autoFocus
                    multiline
                    minRows={5}
                    label="Meddelande (valfritt)"
                    type="text"
                    id="message"
                    {...register("data.message")}
                  />

                  <TextField
                    sx={{ display: "none" }}
                    helperText={formState.errors.data?.productId?.message}
                    error={formState.errors.data?.productId != undefined}
                    margin="normal"
                    fullWidth
                    autoFocus
                    value={product.data.id}
                    type="number"
                    id="productId"
                    {...register("data.productId")}
                  />
                  <TextField
                    sx={{ display: "none" }}
                    helperText={formState.errors.data?.productname?.message}
                    error={formState.errors.data?.productname != undefined}
                    margin="normal"
                    fullWidth
                    autoFocus
                    value={product.data.attributes.name}
                    type="text"
                    id="productname"
                    {...register("data.productname")}
                  />
                  <Typography fontSize={"14px"}>
                    Faktura för köp skickas ut via epost inom 14 arbetsdagar
                    från det datum som ordern registrerats.
                  </Typography>
                </form>
              </DialogContent>
            </>
          ) : (
            <DialogContentText>
              Tack för ditt köp! En orderbekräftelse skickas till den
              epostadress som angivits vid köp.
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            {orderConfirmed ? (
              <Button aria-label="close button" onClick={handleClose}>
                Stäng
              </Button>
            ) : (
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
                </Typography>{" "}
                <Button aria-aria-label="close button" onClick={handleClose}>
                  Stäng
                </Button>
                <Button
                  aria-label="Submit button"
                  onClick={handleSubmit(handleFormSubmit)}
                  disabled={formState.isSubmitting || !isChecked || !formValid}
                >
                  Skicka
                </Button>
              </Box>
            )}
          </Box>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
