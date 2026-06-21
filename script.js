document.addEventListener('DOMContentLoaded', () => {
    // Modal Selectors
    const modal = document.getElementById('contactModal');
    const openModalBtn = document.getElementById('openContactFormBtn');
    const closeModalBtn = document.getElementById('closeContactFormBtn');
    const contactForm = document.getElementById('leadContactForm');
    const successMessage = document.getElementById('formSuccessMessage');

    // Open Modal
    if (openModalBtn) {
        openModalBtn.addEventListener('click', () => {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Disable background scroll
            
            // Reset state
            if (contactForm) contactForm.classList.remove('hidden');
            if (successMessage) successMessage.classList.add('hidden');
        });
    }

    // Close Modal
    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable background scroll
    };

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Close Modal by clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Form Submission
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Retrieve values
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('emailAddress').value;
            const message = document.getElementById('message').value;

            // Change submit button state to loading
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> שולח...';

            // Send via FormSubmit AJAX API
            fetch("https://formsubmit.co/ajax/leale.halpern@gmail.com", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    "שם פרטי": firstName,
                    "שם משפחה": lastName,
                    "טלפון": phone,
                    "אימייל": email,
                    "הודעה": message,
                    "_subject": "פנייה חדשה מדף הנחיתה של הקורס!"
                })
            })
            .then(response => response.json())
            .then(data => {
                // Show success, hide form
                contactForm.classList.add('hidden');
                successMessage.classList.remove('hidden');
                
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;

                // Close modal after a delay
                setTimeout(() => {
                    closeModal();
                }, 3500);
            })
            .catch((error) => {
                console.error('Error submitting form:', error);
                alert('אירעה שגיאה בשליחת הטופס. אנא נסי שוב או פני אלינו בווצאפ.');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            });
        });
    }

    // Email Copy to Clipboard Logic
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    const emailTooltip = document.getElementById('emailTooltip');
    const emailAddressToCopy = "leale.halpern@gmail.com";

    if (copyEmailBtn && emailTooltip) {
        copyEmailBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(emailAddressToCopy).then(() => {
                // Show tooltip
                emailTooltip.classList.add('show');
                
                // Hide tooltip after 2 seconds
                setTimeout(() => {
                    emailTooltip.classList.remove('show');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy email: ', err);
            });
        });
    }

    // Smooth Scroll for local anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    // Testimonials Slider Navigation
    const slider = document.getElementById('testimonialsSlider');
    const prevBtn = document.getElementById('sliderPrevBtn');
    const nextBtn = document.getElementById('sliderNextBtn');

    if (slider && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            const card = slider.querySelector('.testimonial-card');
            if (card) {
                const scrollAmount = card.offsetWidth + 24; // Width + gap
                slider.scrollBy({
                    left: scrollAmount, // Scroll right (backwards in RTL)
                    behavior: 'smooth'
                });
            }
        });

        nextBtn.addEventListener('click', () => {
            const card = slider.querySelector('.testimonial-card');
            if (card) {
                const scrollAmount = card.offsetWidth + 24; // Width + gap
                slider.scrollBy({
                    left: -scrollAmount, // Scroll left (forwards in RTL)
                    behavior: 'smooth'
                });
            }
        });
    }
});
