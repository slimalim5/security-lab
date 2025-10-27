// Form validation and password change verification
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('changePasswordForm');
    const submitBtn = form.querySelector('.submit-btn');
    const emailInput = document.getElementById('email');
    const currentPasswordInput = document.getElementById('currentPassword');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmNewPasswordInput = document.getElementById('confirmNewPassword');

    const emailError = document.getElementById('email-error');
    const currentPasswordError = document.getElementById('current-password-error');
    const newPasswordError = document.getElementById('new-password-error');
    const confirmNewPasswordError = document.getElementById('confirm-new-password-error');

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Disable submit button initially
    submitBtn.disabled = true;

    // Check if all fields are filled
    function checkAllFieldsFilled() {
        const allFilled = emailInput.value.trim() !== '' &&
                         currentPasswordInput.value !== '' &&
                         newPasswordInput.value !== '' &&
                         confirmNewPasswordInput.value !== '';

        submitBtn.disabled = !allFilled;
    }

    // Real-time validation on input and check if all fields are filled
    emailInput.addEventListener('input', checkAllFieldsFilled);
    emailInput.addEventListener('blur', validateEmail);

    currentPasswordInput.addEventListener('input', checkAllFieldsFilled);
    currentPasswordInput.addEventListener('blur', validateCurrentPassword);

    newPasswordInput.addEventListener('input', function() {
        checkAllFieldsFilled();
        validateNewPassword();
    });

    confirmNewPasswordInput.addEventListener('input', function() {
        checkAllFieldsFilled();
        validateConfirmNewPassword();
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const isEmailValid = validateEmail();
        const isCurrentPasswordValid = validateCurrentPassword();
        const isNewPasswordValid = validateNewPassword();
        const isConfirmNewPasswordValid = validateConfirmNewPassword();

        if (isEmailValid && isCurrentPasswordValid && isNewPasswordValid && isConfirmNewPasswordValid) {
            handleSuccessfulSubmission();
        }
    });

    function validateEmail() {
        const email = emailInput.value.trim();

        if (email === '') {
            showError(emailInput, emailError, 'Email is required.');
            return false;
        }

        if (!emailRegex.test(email)) {
            showError(emailInput, emailError, 'Please enter a valid email address.');
            return false;
        }

        if (email.length < 5 || email.length > 50) {
            showError(emailInput, emailError, 'Email must be between 5 and 50 characters.');
            return false;
        }

        showSuccess(emailInput, emailError);
        return true;
    }

    function validateCurrentPassword() {
        const currentPassword = currentPasswordInput.value;

        if (currentPassword === '') {
            showError(currentPasswordInput, currentPasswordError, 'Current password is required.');
            return false;
        }

        if (currentPassword.length < 6) {
            showError(currentPasswordInput, currentPasswordError, 'Password must be at least 6 characters long.');
            return false;
        }

        showSuccess(currentPasswordInput, currentPasswordError);
        return true;
    }

    function validateNewPassword() {
        const newPassword = newPasswordInput.value;
        const currentPassword = currentPasswordInput.value;

        if (newPassword === '') {
            showError(newPasswordInput, newPasswordError, 'New password is required.');
            return false;
        }

        if (newPassword.length < 6) {
            showError(newPasswordInput, newPasswordError, 'Password must be at least 6 characters long.');
            return false;
        }

        if (newPassword.length > 60) {
            showError(newPasswordInput, newPasswordError, 'Password must be less than 60 characters.');
            return false;
        }

        // Check if new password is different from current password
        if (currentPassword && newPassword === currentPassword) {
            showError(newPasswordInput, newPasswordError, 'New password must be different from current password.');
            return false;
        }

        showSuccess(newPasswordInput, newPasswordError);

        // Re-validate confirm password if it has a value
        if (confirmNewPasswordInput.value !== '') {
            validateConfirmNewPassword();
        }

        return true;
    }

    function validateConfirmNewPassword() {
        const newPassword = newPasswordInput.value;
        const confirmNewPassword = confirmNewPasswordInput.value;

        if (confirmNewPassword === '') {
            showError(confirmNewPasswordInput, confirmNewPasswordError, 'Please confirm your new password.');
            return false;
        }

        if (newPassword !== confirmNewPassword) {
            showError(confirmNewPasswordInput, confirmNewPasswordError, 'Passwords do not match.');
            return false;
        }

        showSuccess(confirmNewPasswordInput, confirmNewPasswordError);
        return true;
    }

    function showError(input, errorElement, message) {
        input.classList.add('error');
        input.classList.remove('success');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    function showSuccess(input, errorElement) {
        input.classList.remove('error');
        input.classList.add('success');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }

    function handleSuccessfulSubmission() {
        // Get form data
        const formData = {
            email: emailInput.value.trim(),
            currentPassword: currentPasswordInput.value,
            newPassword: newPasswordInput.value
        };

        // Log to console (in production, this would be sent to a server)
        console.log('Password change submitted successfully!');
        console.log('Email:', formData.email);
        console.log('Current password length:', formData.currentPassword.length);
        console.log('New password length:', formData.newPassword.length);

        // Hide form and show success message
        form.style.display = 'none';
        document.getElementById('successMessage').style.display = 'block';

        // Store in localStorage (for demo purposes)
        try {
            localStorage.setItem('userEmail', formData.email);
            console.log('Password change data logged locally');
        } catch (e) {
            console.error('Error storing data:', e);
        }

        // In a real application, you would send this data to your backend:
        /*
        fetch('/api/change-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Show success message, redirect to login, etc.
        })
        .catch((error) => {
            console.error('Error:', error);
            // Show error message
        });
        */
    }

    // Clear error on input focus
    [emailInput, currentPasswordInput, newPasswordInput, confirmNewPasswordInput].forEach(input => {
        input.addEventListener('focus', function() {
            this.classList.remove('error');
        });
    });

    // Password visibility toggle (optional enhancement)
    function addPasswordToggle() {
        const passwordFields = [currentPasswordInput, newPasswordInput, confirmNewPasswordInput];

        passwordFields.forEach(field => {
            const toggleBtn = document.createElement('button');
            toggleBtn.type = 'button';
            toggleBtn.className = 'password-toggle';
            toggleBtn.innerHTML = '👁️';
            toggleBtn.style.cssText = `
                position: absolute;
                right: 15px;
                top: 50%;
                transform: translateY(-50%);
                background: none;
                border: none;
                cursor: pointer;
                font-size: 18px;
                opacity: 0.6;
                transition: opacity 0.2s;
            `;

            toggleBtn.addEventListener('mouseenter', () => toggleBtn.style.opacity = '1');
            toggleBtn.addEventListener('mouseleave', () => toggleBtn.style.opacity = '0.6');

            toggleBtn.addEventListener('click', function() {
                const type = field.type === 'password' ? 'text' : 'password';
                field.type = type;
                this.innerHTML = type === 'password' ? '👁️' : '🙈';
            });

            field.parentElement.style.position = 'relative';
            field.parentElement.appendChild(toggleBtn);
        });
    }

    // Uncomment to enable password visibility toggle
    // addPasswordToggle();
});
