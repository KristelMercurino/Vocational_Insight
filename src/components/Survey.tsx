import React, { useState } from "react";
import {
  Container,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  Grid,
  Box,
} from "@mui/material";

export default function VocationalTest() {
  const [state, setState] = useState({
    // Pregunta 1
    q1a: false,
    q1b: false,
    q1c: false,
    q1d: false,
    q1e: false,
    // Pregunta 2
    q2a: false,
    q2b: false,
    q2c: false,
    q2d: false,
    q2e: false,
    // Pregunta 3
    q3a: false,
    q3b: false,
    q3c: false,
    q3d: false,
    q3e: false,
    // Pregunta 4
    q4a: false,
    q4b: false,
    q4c: false,
    q4d: false,
    q4e: false,
    // Pregunta 5
    q5a: false,
    q5b: false,
    q5c: false,
    q5d: false,
    q5e: false,
    // Pregunta 6
    q6a: false,
    q6b: false,
    q6c: false,
    q6d: false,
    q6e: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Selected options: ", state);
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Test Vocacional
      </Typography>
      <Typography align="center" variant="body1" gutterBottom>
        Lee cada pregunta cuidadosamente y selecciona todas las alternativas que
        reflejen tus intereses y habilidades. No te preocupes por elegir una
        sola opción, puedes seleccionar todas las que se apliquen a ti.
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          {/* Pregunta 1 */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{ padding: 2, border: "1px solid #ddd", borderRadius: "8px" }}
            >
              <Typography variant="h6">
                1. ¿Qué tipo de actividades disfrutas más en tu tiempo libre?
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.q1a}
                      onChange={handleChange}
                      name="q1a"
                    />
                  }
                  label="a) Resolver acertijos y problemas matemáticos"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.q1b}
                      onChange={handleChange}
                      name="q1b"
                    />
                  }
                  label="b) Escribir, leer libros, o crear contenido artísticos"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.q1c}
                      onChange={handleChange}
                      name="q1c"
                    />
                  }
                  label="c) Participar en actividades al aire libre o deportes"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.q1d}
                      onChange={handleChange}
                      name="q1d"
                    />
                  }
                  label="d) Dibujar, pintar, crear cosas o trabajar con las manos"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.q1e}
                      onChange={handleChange}
                      name="q1e"
                    />
                  }
                  label="e) Interactuar con personas y ayudar a otros"
                />
              </FormGroup>
            </Box>
          </Grid>

          {/* Pregunta 2 */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{ padding: 2, border: "1px solid #ddd", borderRadius: "8px" }}
            >
              <Typography variant="h6">
                2. ¿Qué materias te gustaban más en la escuela?
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.q2a}
                      onChange={handleChange}
                      name="q2a"
                    />
                  }
                  label="a) Matemáticas y ciencias"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.q2b}
                      onChange={handleChange}
                      name="q2b"
                    />
                  }
                  label="b) Lenguaje, literatura, y artes"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.q2c}
                      onChange={handleChange}
                      name="q2c"
                    />
                  }
                  label="c) Educación física"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.q2d}
                      onChange={handleChange}
                      name="q2d"
                    />
                  }
                  label="d) Artes plásticas, música, y tecnología"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.q2e}
                      onChange={handleChange}
                      name="q2e"
                    />
                  }
                  label="e) Ciencias sociales, psicología y filosofía"
                />
              </FormGroup>
            </Box>
          </Grid>

          {/* Pregunta 3 */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{ padding: 2, border: "1px solid #ddd", borderRadius: "8px" }}
            >
              <Typography variant="h6">3. ¿Cómo prefieres trabajar?</Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.q3a}
                      onChange={handleChange}
                      name="q3a"
                    />
                  }
                  label="a) Solo, concentrado en un problema específico"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.q3b}
                      onChange={handleChange}
                      name="q3b"
                    />
                  }
                  label="b) En un ambiente creativo, generando ideas nuevas"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.q3c}
                      onChange={handleChange}
                      name="q3c"
                    />
                  }
                  label="c) En equipo, colaborando con otros"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.q3d}
                      onChange={handleChange}
                      name="q3d"
                    />
                  }
                  label="d) En actividades prácticas que involucren herramientas o técnicas"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.q3e}
                      onChange={handleChange}
                      name="q3e"
                    />
                  }
                  label="e) Ayudando directamente a las personas"
                />
              </FormGroup>
            </Box>
          </Grid>

          {/* Pregunta 4 */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{ padding: 2, border: "1px solid #ddd", borderRadius: "8px" }}
            >
              <Typography variant="h6">
                4. ¿Te interesa el uso de la tecnología en tu futura carrera?
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.q4a}
                      onChange={handleChange}
                      name="q4a"
                    />
                  }
                  label="a) Sí, quiero trabajar con tecnología de punta"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.q4b}
                      onChange={handleChange}
                      name="q4b"
                    />
                  }
                  label="b) Me interesa, pero no quiero que sea el enfoque principal"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.q4c}
                      onChange={handleChange}
                      name="q4c"
                    />
                  }
                  label="c) No es algo que me atraiga particularmente"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.q4d}
                      onChange={handleChange}
                      name="q4d"
                    />
                  }
                  label="d) Prefiero usar tecnología de manera práctica"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.q4e}
                      onChange={handleChange}
                      name="q4e"
                    />
                  }
                  label="e) No, me interesa más el trato directo con las personas"
                />
              </FormGroup>
            </Box>
          </Grid>

          {/* Pregunta 5 */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{ padding: 2, border: "1px solid #ddd", borderRadius: "8px" }}
            >
              <Typography variant="h6">
                5. ¿Qué es lo más importante para ti en una carrera?
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.q5a}
                      onChange={handleChange}
                      name="q5a"
                    />
                  }
                  label="a) Estabilidad laboral y un buen salario"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.q5b}
                      onChange={handleChange}
                      name="q5b"
                    />
                  }
                  label="b) Libertad creativa y la posibilidad de innovar"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.q5c}
                      onChange={handleChange}
                      name="q5c"
                    />
                  }
                  label="c) Un trabajo dinámico que no sea repetitivo"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.q5d}
                      onChange={handleChange}
                      name="q5d"
                    />
                  }
                  label="d) La capacidad de ver los resultados tangibles de mi trabajo"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.q5e}
                      onChange={handleChange}
                      name="q5e"
                    />
                  }
                  label="e) Poder hacer una diferencia en la vida de las personas"
                />
              </FormGroup>
            </Box>
          </Grid>

          {/* Pregunta 6 */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{ padding: 2, border: "1px solid #ddd", borderRadius: "8px" }}
            >
              <Typography variant="h6">
                6. ¿Cómo prefieres aprender nuevas habilidades?
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.q6a}
                      onChange={handleChange}
                      name="q6a"
                    />
                  }
                  label="a) A través de libros, cursos online, o estudios formales"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.q6b}
                      onChange={handleChange}
                      name="q6b"
                    />
                  }
                  label="b) Experimentando y probando nuevas ideas por mi cuenta"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.q6c}
                      onChange={handleChange}
                      name="q6c"
                    />
                  }
                  label="c) A través de la práctica y el trabajo en equipo"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.q6d}
                      onChange={handleChange}
                      name="q6d"
                    />
                  }
                  label="d) Aprendiendo de otros profesionales o en el lugar de trabajo"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.q6e}
                      onChange={handleChange}
                      name="q6e"
                    />
                  }
                  label="e) Observando e interactuando con personas con experiencia"
                />
              </FormGroup>
            </Box>
          </Grid>

          {/* Botón de envío */}
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Ver Resultados
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
