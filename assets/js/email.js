// One submit handler, installed even if the external email service cannot load.
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const button = document.getElementById('submit-btn');
  const status = document.getElementById('form-status');
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (button.disabled || !form.reportValidity()) return;
    if (!window.emailjs?.send) {
      status.textContent = 'Email service unavailable. Please email luca.thilgen@gmail.com directly.';
      return;
    }
    button.disabled = true;
    status.textContent = 'Sending…';
    try {
      window.emailjs.init('lZZECpe1MiaiQX9Mg');
      await window.emailjs.send('service_qq07l5o', 'template_3n1998p', {
        user_name: form.elements.user_name.value,
        user_email: form.elements.user_email.value,
        message: form.elements.message.value,
      });
      status.textContent = 'Message sent successfully.';
      form.reset();
    } catch {
      status.textContent = 'Message could not be sent. Your text is saved here; please try again or email luca.thilgen@gmail.com directly.';
    } finally {
      button.disabled = false;
    }
  });
});
