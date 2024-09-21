import React, { useState } from 'react';
import { TextField, Button, Grid, MenuItem, Select, FormControl, InputLabel, InputAdornment, Typography, IconButton, LinearProgress } from '@mui/material';
import { AccountCircle, Email, Lock, CalendarToday, Wc, Visibility, VisibilityOff } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import logo from './icono_logo_listo.png';

const Register = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        genero: '',
        fechaNacimiento: null,
        email: '',
        contraseña: '',
        confirmarContraseña: '',
        region: '',
        ciudad: ''
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Nuevo estado para confirmar contraseña
    const [showPasswordStrength, setShowPasswordStrength] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const regiones = ['Región Metropolitana', 'Valparaíso', 'Biobío'];
    const ciudadesPorRegion = {
        'Región Metropolitana': ['Santiago', 'Maipú', 'Las Condes'],
        'Valparaíso': ['Viña del Mar', 'Valparaíso', 'Quilpué'],
        'Biobío': ['Concepción', 'Chillán', 'Los Ángeles']
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        validateField(name, value);

        if (name === 'contraseña') {
            evaluatePasswordStrength(value);
            setShowPasswordStrength(!!value);
        }
    };

    const handleDateChange = (newValue) => {
        setFormData({
            ...formData,
            fechaNacimiento: newValue
        });
        validateField('fechaNacimiento', newValue);
    };

    const validateField = (name, value) => {
        let errorMsg = '';
        if (name === 'nombre' && !value) {
            errorMsg = 'El nombre es requerido';
        } else if (name === 'apellido' && !value) {
            errorMsg = 'El apellido es requerido';
        } else if (name === 'genero' && !value) {
            errorMsg = 'El género es requerido';
        } else if (name === 'email' && (!value || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value))) {
            errorMsg = 'El correo electrónico no es válido';
        } else if (name === 'contraseña' && (!value || value.length < 8)) {
            errorMsg = 'La contraseña debe tener al menos 8 caracteres, incluyendo letras y números';
        } else if (name === 'confirmarContraseña' && value !== formData.contraseña) {
            errorMsg = 'Las contraseñas no coinciden';
        }
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errorMsg
        }));
    };

    const evaluatePasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        setPasswordStrength(strength);
    };

    const validateFields = () => {
        const newErrors = {};
        if (!formData.nombre) newErrors.nombre = 'El nombre es requerido';
        if (!formData.apellido) newErrors.apellido = 'El apellido es requerido';
        if (!formData.genero) newErrors.genero = 'El género es requerido';
        if (!formData.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) newErrors.email = 'El correo electrónico no es válido';
        if (!formData.contraseña || formData.contraseña.length < 8) newErrors.contraseña = 'La contraseña debe tener al menos 8 caracteres, incluyendo letras y números';
        if (formData.confirmarContraseña !== formData.contraseña) newErrors.confirmarContraseña = 'Las contraseñas no coinciden';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateFields()) {
            console.log('Registro exitoso:', formData);
        }
    };

    const getPasswordStrengthLabel = () => {
        switch (passwordStrength) {
            case 1:
                return 'Débil';
            case 2:
                return 'Media';
            case 3:
                return 'Fuerte';
            case 4:
                return 'Muy fuerte';
            default:
                return '';
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh', backgroundColor: '#2c3e50ff' }}>
                <Grid item xs={12} sm={6} md={4} style={{ padding: '2rem', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}>
                    <img src={logo} alt="Logo" style={{ display: 'block', margin: '0 auto 20px', width: '120px' }} />
                    <Typography variant="h5" align="center" gutterBottom style={{ fontWeight: 'bold' }}>Crea tu cuenta para empezar</Typography>
                    
                    <FormControl fullWidth style={{ marginBottom: '1rem' }}>
                        <TextField
                            label="Nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            placeholder="Ingrese su nombre"
                            error={!!errors.nombre}
                            helperText={errors.nombre}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle style={{ color: '#ECB444' }} />
                                    </InputAdornment>
                                ),
                            }}
                            fullWidth
                        />
                    </FormControl>

                    <FormControl fullWidth style={{ marginBottom: '1rem' }}>
                        <TextField
                            label="Apellido"
                            name="apellido"
                            value={formData.apellido}
                            onChange={handleChange}
                            placeholder="Ingrese su apellido"
                            error={!!errors.apellido}
                            helperText={errors.apellido}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle style={{ color: '#ECB444' }} />
                                    </InputAdornment>
                                ),
                            }}
                            fullWidth
                        />
                    </FormControl>

                    <FormControl fullWidth style={{ marginBottom: '1rem' }}>
                        <InputLabel id="genero-label">Género</InputLabel>
                        <Select
                            labelId="genero-label"
                            name="genero"
                            value={formData.genero}
                            onChange={handleChange}
                            label="Género"
                            fullWidth
                        >
                            <MenuItem value="Masculino">Masculino</MenuItem>
                            <MenuItem value="Femenino">Femenino</MenuItem>
                            <MenuItem value="Otro">Otro</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth style={{ marginBottom: '1rem' }}>
                        <DatePicker
                            label="Fecha de Nacimiento"
                            value={formData.fechaNacimiento}
                            onChange={handleDateChange}
                            renderInput={(params) => (
                                <TextField {...params} fullWidth />
                            )}
                        />
                    </FormControl>

                    <FormControl fullWidth style={{ marginBottom: '1rem' }}>
                        <InputLabel id="region-label">Región</InputLabel>
                        <Select
                            labelId="region-label"
                            id="region"
                            name="region"
                            value={formData.region}
                            onChange={handleChange}
                            label="Región"
                            fullWidth
                        >
                            {regiones.map((region, index) => (
                                <MenuItem key={index} value={region}>{region}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth style={{ marginBottom: '1rem' }}>
                        <InputLabel id="ciudad-label">Ciudad</InputLabel>
                        <Select
                            labelId="ciudad-label"
                            id="ciudad"
                            name="ciudad"
                            value={formData.ciudad}
                            onChange={handleChange}
                            label="Ciudad"
                            disabled={!formData.region}
                            fullWidth
                        >
                            {ciudadesPorRegion[formData.region]?.map((ciudad, index) => (
                                <MenuItem key={index} value={ciudad}>{ciudad}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth style={{ marginBottom: '1rem' }}>
                        <TextField
                            label="Correo electrónico"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Ingrese su correo electrónico"
                            error={!!errors.email}
                            helperText={errors.email}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email style={{ color: '#ECB444' }} />
                                    </InputAdornment>
                                ),
                            }}
                            fullWidth
                        />
                    </FormControl>

                    <FormControl fullWidth style={{ marginBottom: '1rem' }}>
                        <TextField
                            label="Contraseña"
                            name="contraseña"
                            type={showPassword ? "text" : "password"}
                            value={formData.contraseña}
                            onChange={handleChange}
                            placeholder="Ingrese su contraseña"
                            error={!!errors.contraseña}
                            helperText={errors.contraseña}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock style={{ color: '#ECB444' }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            fullWidth
                        />
                        {showPasswordStrength && (
                            <div style={{ marginTop: '0.5rem' }}>
                                <LinearProgress variant="determinate" value={passwordStrength * 25} />
                                <Typography variant="caption" style={{ color: passwordStrength === 1 ? 'red' : passwordStrength === 2 ? 'orange' : 'green' }}>
                                    {getPasswordStrengthLabel()}
                                </Typography>
                            </div>
                        )}
                    </FormControl>

                    <FormControl fullWidth style={{ marginBottom: '1rem' }}>
                        <TextField
                            label="Confirmar Contraseña"
                            name="confirmarContraseña"
                            type={showConfirmPassword ? "text" : "password"} // Control de visibilidad para confirmar contraseña
                            value={formData.confirmarContraseña}
                            onChange={handleChange}
                            placeholder="Confirme su contraseña"
                            error={!!errors.confirmarContraseña}
                            helperText={errors.confirmarContraseña}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock style={{ color: '#ECB444' }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Control de visibilidad para confirmar contraseña
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            fullWidth
                        />
                    </FormControl>

                    <Typography align="center" style={{ marginTop: '1rem' }}>
                        ¿Ya tienes cuenta? <a href="/login" style={{ color: '#ECB444' }}>Inicia sesión aquí</a>
                    </Typography>

                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ backgroundColor: '#ECB444', marginTop: '1rem', padding: '12px', fontWeight: 'bold', fontSize: '16px', borderRadius: '5px', transition: 'background-color 0.3s ease', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
                        onClick={handleSubmit}>
                        REGISTRARSE
                    </Button>
                </Grid>
            </Grid>
        </LocalizationProvider>
    );
};

export default Register;
