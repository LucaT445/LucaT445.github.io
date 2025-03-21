console.log("email.js loaded");

// Function to ensure EmailJS is fully loaded before execution
function waitForEmailJS(callback, retries = 10) {
    if (typeof emailjs !== "undefined" && emailjs.send) {
        callback();
    } else if (retries > 0) {
        console.warn(`Waiting for EmailJS to load... (${10 - retries}/10)`);
        setTimeout(() => waitForEmailJS(callback, retries - 1), 500);
    } else {
        console.error("EmailJS failed to load after multiple attempts.");
        alert("Error: Unable to load EmailJS. Please refresh and try again.");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    waitForEmailJS(() => {
        console.log("EmailJS is ready!");
        emailjs.init("lZZECpe1MiaiQX9Mg");

        var contactForm = document.getElementById("contact-form");
        if (contactForm) {
            contactForm.addEventListener("submit", function (event) {
                event.preventDefault();

                var templateParams = {
                    user_name: document.getElementById("user_name").value,
                    user_email: document.getElementById("user_email").value,
                    message: document.getElementById("message").value,
                };

                // Ensure EmailJS is available before attempting to send
                if (typeof emailjs === "undefined" || !emailjs.send) {
                    console.error("EmailJS is not available. Please check script loading.");
                    alert("Error: Email service is not available. Please try again later.");
                    return;
                }

                // Send email and handle response
                emailjs.send("service_qq07l5o", "template_3n1998p", templateParams)
                    .then(function (response) {
                        console.log("SUCCESS!", response.status, response.text);
                        alert("Email sent successfully!");
                        contactForm.reset();
                    })
                    .catch(function (error) {
                        console.error("FAILED...", error);
                        alert("Error sending email. Please check your input and try again.");
                    });
            });
        }
    });
});




  