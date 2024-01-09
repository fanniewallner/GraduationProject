import React, { useContext, useState } from "react";
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
import { IProduct } from "../../models/IProduct";
import { ProductCartContext } from "../../contexts/ProductCardContext";
import { ActionType } from "../../reducers/ProductsReducer";

type IModalProps = {
  open: boolean;
  handleClose: () => void;
  orderConfirmed: boolean;
  setOrderConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
  products: IProduct[];
};

export default function Modal({
  open,
  handleClose,
  orderConfirmed,
  setOrderConfirmed,
  products,
}: IModalProps) {
  const { handleSubmit, formState, setValue, register, reset } =
    useForm<PurchaseInquiry>();
  const api = useApi();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(1);
  const { state, dispatch } = useContext(ProductCartContext);

  const formValid =
    !formState.errors.data?.checked &&
    !formState.errors.data?.email &&
    !formState.errors.data?.firstname &&
    !formState.errors.data?.lastname &&
    !formState.errors.data?.phonenumber &&
    !formState.errors.data?.productDetails;

  const handleFormSubmit = async (data: PurchaseInquiry) => {
    try {
      console.log("products", products);
      const productDetails = products.map((product) => ({
        productname: product.attributes.name,
        productid: product.id,
      }));
      setValue("data.productDetails", productDetails);
      console.log(productDetails);
      const response = await api.submitForm(data);
      console.log("DATA", data);
      handleCheckbox();
      if (response.status === 200) {
        reset({
          data: {
            firstname: "",
            lastname: "",
            phonenumber: 0,
            email: "",
            productDetails: productDetails as {
              productname: string;
              productid: number;
            }[],
            message: "",
            checked: false,
          },
        });

        dispatch({ type: ActionType.CLEARED_CART });
        setOrderConfirmed(true);
      }
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
                {state.map((product, index) => (
                  <Box
                    key={product.id}
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Typography variant="body1">
                      Produkt: {product.attributes.name}
                    </Typography>
                    <Typography variant="body1">{`Pris: ${product.attributes.price}.00kr`}</Typography>
                    <Button
                      onClick={() =>
                        dispatch({
                          type: ActionType.REMOVED_PRODUCT,
                          payload: product,
                        })
                      }
                    >
                      x
                    </Button>
                  </Box>
                ))}
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
                    margin="normal"
                    fullWidth
                    autoFocus
                    value={products}
                    type=""
                    id="purchaseDetails"
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
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
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
                </Box>
                <Button aria-label="close button" onClick={handleClose}>
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
