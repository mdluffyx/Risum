// Contact Form Validation and Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    const nameInput = contactForm.querySelector('input[name="name"]');
    const emailInput = contactForm.querySelector('input[name="email"]');
    const messageInput = contactForm.querySelector('textarea[name="message"]');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const statusMessage = document.createElement('div');
    statusMessage.className = 'mt-4 p-4 rounded hidden';
    contactForm.appendChild(statusMessage);

    // Real-time validation
    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('input', validateForm);
    });

    function validateForm() {
        let isValid = true;
        
        // Name validation
        if (nameInput.value.trim().length < 2) {
            nameInput.classList.add('border-red-500');
            isValid = false;
        } else {
            nameInput.classList.remove('border-red-500');
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailInput.classList.add('border-red-500');
            isValid = false;
        } else {
            emailInput.classList.remove('border-red-500');
        }

        // Message validation
        if (messageInput.value.trim().length < 10) {
            messageInput.classList.add('border-red-500');
            isValid = false;
        } else {
            messageInput.classList.remove('border-red-500');
        }

        submitBtn.disabled = !isValid;
        return isValid;
    }

    // Form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';

        try {
            // In a real implementation, this would be a fetch() to your backend
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            statusMessage.textContent = 'Thank you! Your message has been sent.';
            statusMessage.className = 'mt-4 p-4 rounded bg-green-100 text-green-800';
            statusMessage.classList.remove('hidden');
            
            contactForm.reset();
        } catch (error) {
            statusMessage.textContent = 'There was an error sending your message. Please try again later.';
            statusMessage.className = 'mt-4 p-4 rounded bg-red-100 text-red-800';
            statusMessage.classList.remove('hidden');
            console.error('Form submission error:', error);
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Send Message';
            
            // Hide message after 5 seconds
            setTimeout(() => {
                statusMessage.classList.add('hidden');
            }, 5000);
        }
    });
}
