import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { IContactFormDetails } from "../../models/IContactFormDetails";
import { useForm } from "react-hook-form";
import useApi from "../../hooks/useApi";
import { useTheme } from "../../contexts/ThemeContext";
import { ICompanyDetails } from "../../models/ICompanyDetails";
import { useEffect, useState } from "react";

export const ContactPage = () => {
  const { theme } = useTheme();
  const api = useApi();
  const [loading, setLoading] = useState(false);
  const [companyData, setCompanyData] = useState<ICompanyDetails>();

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

  console.log(companyData);

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
    <Container sx={{ minHeight: "100vh", pt: "5rem" }}>
      <Box sx={{ backgroundColor: "white", p: "10px", borderRadius: "5px" }}>
        <Typography>Kontakta oss</Typography>
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
            helperText={formState.errors.data?.message}
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
            sx={{ backgroundColor: theme.contrastColor }}
            variant="contained"
            type="submit"
            disabled={!formState.isValid}
          >
            Skicka
          </Button>
        </form>
      </Box>
      <Box sx={{ color: theme.secondaryColor }}>
        <Typography variant="h6">Företagsinformation</Typography>
        <Typography sx={{ whiteSpace: "pre-line" }}>
          {companyData?.data.attributes.companyInfo}
        </Typography>

        <Typography variant="h6">Snickeri & uthämtning</Typography>
        <Typography sx={{ whiteSpace: "pre-line" }}>
          {companyData?.data.attributes.pickup}
        </Typography>
      </Box>
    </Container>
  );
};
