// Google Sheets API configuration
const GOOGLE_SHEET_ID = 'AKfycbyHHDdEAv6taGkFC7K17_6hIzGo9TKVeEYh9mQoMwzd2jNazG8PeZNxt3fGpSCux8BpYw';
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyHHDdEAv6taGkFC7K17_6hIzGo9TKVeEYh9mQoMwzd2jNazG8PeZNxt3fGpSCux8BpYw/exec';

// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message'),
                timestamp: new Date().toISOString()
            };
            
            try {
                console.log('Sending data:', data);
                console.log('To URL:', GOOGLE_SCRIPT_URL);
                
                // Send data to Google Sheets
                const response = await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    mode: 'no-cors'
                });
                
                console.log('Response:', response);
                
                // Since we're using no-cors, we can't check response.ok
                // Instead, we'll assume success if we get here
                alert('Message sent successfully!');
                contactForm.reset();
                
            } catch (error) {
                console.error('Error details:', error);
                alert('Failed to send message. Please try again later.');
            }
        });
    }
}); 