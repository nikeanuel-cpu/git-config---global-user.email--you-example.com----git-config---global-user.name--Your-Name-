/* =====================================================
   FUNCIONALIDAD DEL FORMULARIO DE REGISTRO
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== CONTADOR DE CARACTERES EN TEXTAREA =====
    const referenceTextarea = document.getElementById('referencia');
    const charCountDisplay = document.getElementById('char-count');
    
    if (referenceTextarea) {
        referenceTextarea.addEventListener('input', function() {
            charCountDisplay.textContent = this.value.length;
        });
    }

    // ===== TOGGLE DE VISIBILIDAD DE CONTRASEÑA =====
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const passwordInput = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // ===== INDICADOR DE FUERZA DE CONTRASEÑA =====
    const passwordInput = document.getElementById('password');
    const strengthMeter = document.getElementById('strength-meter');
    const strengthContainer = strengthMeter?.parentElement;
    
    if (passwordInput && strengthMeter) {
        passwordInput.addEventListener('input', function() {
            const strength = evaluatePasswordStrength(this.value);
            
            // Remover clases anteriores
            strengthContainer.classList.remove('weak', 'fair', 'strong');
            
            // Añadir nueva clase según la fuerza
            if (strength === 'weak') {
                strengthContainer.classList.add('weak');
            } else if (strength === 'fair') {
                strengthContainer.classList.add('fair');
            } else if (strength === 'strong') {
                strengthContainer.classList.add('strong');
            }
        });
    }

    // Función para evaluar la fuerza de la contraseña
    function evaluatePasswordStrength(password) {
        let strength = 0;
        
        // Chequear longitud
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        
        // Chequear tipos de caracteres
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^a-zA-Z0-9]/.test(password)) strength++;
        
        if (strength <= 2) return 'weak';
        if (strength <= 4) return 'fair';
        return 'strong';
    }

    // ===== VALIDACIÓN DEL FORMULARIO =====
    const form = document.getElementById('registroForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Limpiar mensajes de error previos
            document.querySelectorAll('.error-message').forEach(el => {
                el.textContent = '';
            });
            document.querySelectorAll('input, select, textarea').forEach(el => {
                el.classList.remove('is-invalid', 'is-valid');
            });
            
            // Validar campos
            let isValid = true;
            
            // Validaciones individuales
            if (!validateNombre()) isValid = false;
            if (!validateFechaNacimiento()) isValid = false;
            if (!validateRUT()) isValid = false;
            if (!validateGenero()) isValid = false;
            if (!validateNacionalidad()) isValid = false;
            if (!validateEmail()) isValid = false;
            if (!validateEmailConfirm()) isValid = false;
            if (!validatePassword()) isValid = false;
            if (!validatePasswordConfirm()) isValid = false;
            if (!validateTelefono()) isValid = false;
            if (!validatePais()) isValid = false;
            if (!validateProvincia()) isValid = false;
            if (!validateCiudad()) isValid = false;
            if (!validateCalle()) isValid = false;
            if (!validateCodigoPostal()) isValid = false;
            if (!validateTipoCliente()) isValid = false;
            if (!validateTerminos()) isValid = false;
            if (!validatePrivacidad()) isValid = false;
            
            if (isValid) {
                // Mostrar mensaje de éxito (en un caso real, aquí se enviaría al servidor)
                alert('¡Registro completado exitosamente! Verificaremos tu correo electrónico.');
                // Descomentar para enviar realmente:
                // this.submit();
            } else {
                alert('Por favor, completa correctamente todos los campos requeridos.');
            }
        });
    }

    // Funciones de validación
    function validateNombre() {
        const field = document.getElementById('nombre');
        const value = field.value.trim();
        
        if (!value) {
            setError('error-nombre', 'El nombre es requerido');
            field.classList.add('is-invalid');
            return false;
        }
        
        if (value.length < 3) {
            setError('error-nombre', 'El nombre debe tener al menos 3 caracteres');
            field.classList.add('is-invalid');
            return false;
        }
        
        field.classList.add('is-valid');
        return true;
    }

    function validateFechaNacimiento() {
        const field = document.getElementById('fecha-nacimiento');
        
        if (!field.value) {
            setError('error-fecha', 'La fecha de nacimiento es requerida');
            field.classList.add('is-invalid');
            return false;
        }
        
        const birthDate = new Date(field.value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        
        if (age < 18) {
            setError('error-fecha', 'Debes ser mayor de 18 años');
            field.classList.add('is-invalid');
            return false;
        }
        
        field.classList.add('is-valid');
        return true;
    }

    function validateRUT() {
        const field = document.getElementById('rut');
        const value = field.value.trim();
        
        if (!value) {
            setError('error-rut', 'El RUT es requerido');
            field.classList.add('is-invalid');
            return false;
        }
        
        field.classList.add('is-valid');
        return true;
    }

    function validateGenero() {
        const field = document.getElementById('genero');
        
        if (!field.value) {
            setError('error-genero', 'Selecciona un género');
            field.classList.add('is-invalid');
            return false;
        }
        
        field.classList.add('is-valid');
        return true;
    }

    function validateNacionalidad() {
        const field = document.getElementById('nacionalidad');
        
        if (!field.value) {
            setError('error-nacionalidad', 'Selecciona una nacionalidad');
            field.classList.add('is-invalid');
            return false;
        }
        
        field.classList.add('is-valid');
        return true;
    }

    function validateEmail() {
        const field = document.getElementById('email');
        const value = field.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!value) {
            setError('error-email', 'El email es requerido');
            field.classList.add('is-invalid');
            return false;
        }
        
        if (!emailRegex.test(value)) {
            setError('error-email', 'Ingresa un email válido');
            field.classList.add('is-invalid');
            return false;
        }
        
        field.classList.add('is-valid');
        return true;
    }

    function validateEmailConfirm() {
        const field = document.getElementById('email-confirm');
        const emailField = document.getElementById('email');
        const value = field.value.trim();
        
        if (!value) {
            setError('error-email-confirm', 'Confirma tu email');
            field.classList.add('is-invalid');
            return false;
        }
        
        if (value !== emailField.value.trim()) {
            setError('error-email-confirm', 'Los emails no coinciden');
            field.classList.add('is-invalid');
            return false;
        }
        
        field.classList.add('is-valid');
        return true;
    }

    function validatePassword() {
        const field = document.getElementById('password');
        const value = field.value;
        
        if (!value) {
            setError('error-password', 'La contraseña es requerida');
            field.classList.add('is-invalid');
            return false;
        }
        
        if (value.length < 8) {
            setError('error-password', 'La contraseña debe tener mínimo 8 caracteres');
            field.classList.add('is-invalid');
            return false;
        }
        
        field.classList.add('is-valid');
        return true;
    }

    function validatePasswordConfirm() {
        const field = document.getElementById('password-confirm');
        const passwordField = document.getElementById('password');
        const value = field.value;
        
        if (!value) {
            setError('error-password-confirm', 'Confirma tu contraseña');
            field.classList.add('is-invalid');
            return false;
        }
        
        if (value !== passwordField.value) {
            setError('error-password-confirm', 'Las contraseñas no coinciden');
            field.classList.add('is-invalid');
            return false;
        }
        
        field.classList.add('is-valid');
        return true;
    }

    function validateTelefono() {
        const field = document.getElementById('telefono');
        const value = field.value.trim();
        
        if (!value) {
            setError('error-telefono', 'El teléfono es requerido');
            field.classList.add('is-invalid');
            return false;
        }
        
        if (!/^[\d\s\+\-\(\)]+$/.test(value)) {
            setError('error-telefono', 'Ingresa un teléfono válido');
            field.classList.add('is-invalid');
            return false;
        }
        
        field.classList.add('is-valid');
        return true;
    }

    function validatePais() {
        const field = document.getElementById('pais');
        
        if (!field.value) {
            setError('error-pais', 'Selecciona un país');
            field.classList.add('is-invalid');
            return false;
        }
        
        field.classList.add('is-valid');
        return true;
    }

    function validateProvincia() {
        const field = document.getElementById('provincia');
        const value = field.value.trim();
        
        if (!value) {
            setError('error-provincia', 'La provincia es requerida');
            field.classList.add('is-invalid');
            return false;
        }
        
        field.classList.add('is-valid');
        return true;
    }

    function validateCiudad() {
        const field = document.getElementById('ciudad');
        const value = field.value.trim();
        
        if (!value) {
            setError('error-ciudad', 'La ciudad es requerida');
            field.classList.add('is-invalid');
            return false;
        }
        
        field.classList.add('is-valid');
        return true;
    }

    function validateCalle() {
        const field = document.getElementById('calle');
        const value = field.value.trim();
        
        if (!value) {
            setError('error-calle', 'La calle es requerida');
            field.classList.add('is-invalid');
            return false;
        }
        
        field.classList.add('is-valid');
        return true;
    }

    function validateCodigoPostal() {
        const field = document.getElementById('codigo-postal');
        const value = field.value.trim();
        
        if (!value) {
            setError('error-codigo-postal', 'El código postal es requerido');
            field.classList.add('is-invalid');
            return false;
        }
        
        field.classList.add('is-valid');
        return true;
    }

    function validateTipoCliente() {
        const radios = document.querySelectorAll('input[name="tipo-cliente"]');
        const isChecked = Array.from(radios).some(radio => radio.checked);
        
        if (!isChecked) {
            setError('error-tipo-cliente', 'Selecciona un tipo de cliente');
            return false;
        }
        
        return true;
    }

    function validateTerminos() {
        const field = document.getElementById('terminos');
        
        if (!field.checked) {
            setError('error-terminos', 'Debes aceptar los términos y condiciones');
            return false;
        }
        
        return true;
    }

    function validatePrivacidad() {
        const field = document.getElementById('privacidad');
        
        if (!field.checked) {
            setError('error-privacidad', 'Debes aceptar la política de privacidad');
            return false;
        }
        
        return true;
    }

    // Función auxiliar para establecer mensajes de error
    function setError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    // ===== LIMPIAR ERRORES AL ESCRIBIR =====
    const inputFields = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"], input[type="tel"], input[type="date"], select, textarea');
    
    inputFields.forEach(field => {
        field.addEventListener('input', function() {
            if (this.classList.contains('is-invalid')) {
                this.classList.remove('is-invalid');
                const errorId = 'error-' + this.id;
                const errorElement = document.getElementById(errorId);
                if (errorElement) {
                    errorElement.textContent = '';
                }
            }
        });

        field.addEventListener('change', function() {
            if (this.classList.contains('is-invalid')) {
                this.classList.remove('is-invalid');
                const errorId = 'error-' + this.id;
                const errorElement = document.getElementById(errorId);
                if (errorElement) {
                    errorElement.textContent = '';
                }
            }
        });
    });
});

console.log('✓ Script de formulario de GlobalImport S.A. cargado correctamente');
