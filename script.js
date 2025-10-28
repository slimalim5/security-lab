// Google-style form validation and redirect
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('changePasswordForm');
    const submitBtn = form.querySelector('.btn-primary');
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

    // Display current time
    const currentTimeElement = document.getElementById('currentTime');
    if (currentTimeElement) {
        const now = new Date();
        const timeString = now.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
        currentTimeElement.textContent = timeString;
    }

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
        if (newPasswordInput.value !== '') {
            validateNewPassword();
        }
    });

    confirmNewPasswordInput.addEventListener('input', function() {
        checkAllFieldsFilled();
        if (confirmNewPasswordInput.value !== '') {
            validateConfirmNewPassword();
        }
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
            showError(emailInput, emailError, 'Enter an email');
            return false;
        }

        if (!emailRegex.test(email)) {
            showError(emailInput, emailError, 'Enter a valid email');
            return false;
        }

        if (email.length < 5 || email.length > 50) {
            showError(emailInput, emailError, 'Email must be between 5 and 50 characters');
            return false;
        }

        showSuccess(emailInput, emailError);
        return true;
    }

    function validateCurrentPassword() {
        const currentPassword = currentPasswordInput.value;

        if (currentPassword === '') {
            showError(currentPasswordInput, currentPasswordError, 'Enter your password');
            return false;
        }

        // No restrictions on current password - just needs to not be empty
        showSuccess(currentPasswordInput, currentPasswordError);
        return true;
    }

    function validateNewPassword() {
        const newPassword = newPasswordInput.value;
        const currentPassword = currentPasswordInput.value;

        if (newPassword === '') {
            showError(newPasswordInput, newPasswordError, 'Enter a password');
            return false;
        }

        if (newPassword.length < 6) {
            showError(newPasswordInput, newPasswordError, 'Use 6 or more characters');
            return false;
        }

        if (newPassword.length > 60) {
            showError(newPasswordInput, newPasswordError, 'Password is too long');
            return false;
        }

        // Check if new password is different from current password
        if (currentPassword && newPassword === currentPassword) {
            showError(newPasswordInput, newPasswordError, 'New password must be different');
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
            showError(confirmNewPasswordInput, confirmNewPasswordError, 'Confirm your password');
            return false;
        }

        if (newPassword !== confirmNewPassword) {
            showError(confirmNewPasswordInput, confirmNewPasswordError, 'Passwords don\'t match');
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

        // Log to console
        console.log('Form submitted successfully!');
        console.log('Email:', formData.email);
        console.log('Current password length:', formData.currentPassword.length);
        console.log('New password length:', formData.newPassword.length);

        // Hide form and show success message
        form.style.display = 'none';
        document.querySelector('.card-header').style.display = 'none';
        document.querySelector('.alert-message').style.display = 'none';
        document.getElementById('successMessage').style.display = 'block';

        // Store in localStorage (for demo purposes)
        try {
            localStorage.setItem('userEmail', formData.email);
            console.log('Data logged locally');
        } catch (e) {
            console.error('Error storing data:', e);
        }

        // Redirect after 2 seconds
        setTimeout(function() {
            window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1';
        }, 2000);
    }

    // Clear error on input focus
    [emailInput, currentPasswordInput, newPasswordInput, confirmNewPasswordInput].forEach(input => {
        input.addEventListener('focus', function() {
            this.classList.remove('error');
            const errorElement = this.parentElement.querySelector('.error-text');
            if (errorElement) {
                errorElement.classList.remove('show');
            }
        });
    });
});
