import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

import { IContactFormDetails } from "../../models/IContactFormDetails";
import { useForm } from "react-hook-form";
import useApi from "../../hooks/useApi";
import { useTheme } from "../../contexts/ThemeContext";
import { ICompanyDetails } from "../../models/ICompanyDetails";
import { useEffect, useState } from "react";
import styles from "./ContactPage.module.scss";

export const ContactPage = () => {
  const { theme } = useTheme();
  const api = useApi();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  const [companyData, setCompanyData] = useState<ICompanyDetails>();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const [formSent, setFormSent] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getCompanyDetails();
        const message = response.data;
        setCompanyData(message);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const {
    handleSubmit: submitForm,
    formState,
    register,
    reset,
  } = useForm<IContactFormDetails>();

  const handleFormSubmit = async (data: IContactFormDetails) => {
    try {
      const response = await api.sendContactForm(data);
      if (response.status === 200) {
        setFormSent(true);
        reset({
          data: {
            firstname: "",
            lastname: "",
            phonenumber: 0,
            email: "",
            message: "",
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container
      sx={{ display: "flex", flexDirection: isMobile ? "column" : " row" }}
      className={styles.containerWrapper}
    >
      <Box sx={{ width: !isMobile ? "50%" : "100%", height: "600px" }}>
        <Box className={styles.containerWrapper__formWrapper}>
          {!formSent ? (
            <form onSubmit={submitForm(handleFormSubmit)}>
              <TextField
                helperText={formState.errors.data?.firstname?.message}
                error={formState.errors.data?.firstname != undefined}
                margin="normal"
                fullWidth
                autoFocus
                label="Förnamn*"
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
                label="Efternamn*"
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
                label="E-post*"
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
                label="Mobilnummer*"
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
                label="Meddelande*"
                type="text"
                id="message"
                {...register("data.message", {
                  required: "Du måste ange det här fältet",
                })}
              />
              <Button
                aria-label="Submit form button"
                sx={{
                  backgroundColor: theme.contrastColor,
                  "&:active": {
                    backgroundColor: theme.contrastColor,
                  },
                }}
                variant="contained"
                type="submit"
                disabled={!formState.isValid}
              >
                Skicka
              </Button>
            </form>
          ) : (
            <>
              <Box className={styles.formWrapper__confirmationMessageWrapper}>
                <Typography>
                  Tack för ditt meddelande! Vi hör av oss så snart som möjligt.{" "}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Box>
      <Box className={styles.containerWrapper__companyInformationWrapper}>
        <Typography fontFamily={"Poppins"} variant="h6">
          Företagsinformation
        </Typography>
        <Typography sx={{ whiteSpace: "pre-line" }}>
          {companyData?.data.attributes.companyInfo}
        </Typography>

        <Typography variant="h6" fontFamily={"Poppins"}>
          Snickeri & uthämtning
        </Typography>
        <Typography sx={{ whiteSpace: "pre-line" }}>
          {companyData?.data.attributes.pickup}
        </Typography>
      </Box>
    </Container>
  );
};
