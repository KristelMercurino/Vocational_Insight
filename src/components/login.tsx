import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
  Link,
  Divider,
} from "@mui/material";
import {
  Google as GoogleIcon,
  Facebook as FacebookIcon,
} from "@mui/icons-material";

export default function SignIn() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        backgroundColor: "#0b0e14", // Fondo oscuro
        padding: 4,
        borderRadius: 2,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Sombra para darle más profundidad
        mt: 8,
        color: "#fff",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
        Sign in
      </Typography>

      <Box component="form">
        <TextField
          margin="normal"
          fullWidth
          label="Email"
          variant="filled"
          InputLabelProps={{
            style: { color: "#fff" }, // Color del texto
          }}
          sx={{
            input: { color: "#fff" }, // Color del texto del input
            backgroundColor: "#1f2833", // Fondo oscuro del input
            borderRadius: 1,
          }}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          variant="filled"
          InputLabelProps={{
            style: { color: "#fff" }, // Color del texto
          }}
          sx={{
            input: { color: "#fff" }, // Color del texto del input
            backgroundColor: "#1f2833", // Fondo oscuro del input
            borderRadius: 1,
          }}
        />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          <FormControlLabel
            control={<Checkbox sx={{ color: "#ECB444" }} />}
            label="Remember me"
            sx={{ color: "#fff" }}
          />
          <Link href="#" underline="hover" sx={{ color: "#ECB444" }}>
            Forgot your password?
          </Link>
        </Box>
        <Button
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: "#ECB444",
            mt: 3,
            mb: 2,
            "&:hover": {
              backgroundColor: "#D1A235",
            },
          }}
        >
          Sign in
        </Button>

        <Typography align="center">
          Don't have an account?{" "}
          <Link href="#" underline="hover" sx={{ color: "#ECB444" }}>
            Sign up
          </Link>
        </Typography>

        <Divider sx={{ my: 2 }}>or</Divider>

        <Button
          fullWidth
          startIcon={<GoogleIcon />}
          variant="outlined"
          sx={{
            color: "#fff",
            borderColor: "#fff",
            mt: 1,
            mb: 1,
            "&:hover": {
              backgroundColor: "#1f2833",
            },
          }}
        >
          Sign in with Google
        </Button>
        <Button
          fullWidth
          startIcon={<FacebookIcon />}
          variant="outlined"
          sx={{
            color: "#fff",
            borderColor: "#fff",
            "&:hover": {
              backgroundColor: "#1f2833",
            },
          }}
        >
          Sign in with Facebook
        </Button>
      </Box>
    </Container>
  );
}
