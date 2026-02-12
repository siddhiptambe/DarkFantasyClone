const form = document.getElementById("contactForm");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");
const charCount = document.getElementById("charCount");

message.addEventListener("input", () => {
    charCount.textContent = message.value.length;
});

form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearErrors();

    let valid = true;

    const nameRegex = /^[A-Za-z]+$/;

if (
    !nameRegex.test(firstName.value.trim()) ||
    !nameRegex.test(lastName.value.trim())
) {
    showError("nameError", "Name must contain letters only (no numbers)");
    valid = false;
} 

    if (!/^[6-9]\d{10}$/.test(phone.value.replace(/\s/g, ""))) {
        showError("phoneError", "Enter a valid 10-digit Indian mobile number");
        valid = false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email.value)) {
        showError("emailError", "Enter a valid email address");
        valid = false;
    }

    if (subject.value.trim() === "") {
        showError("subjectError", "Subject is required");
        valid = false;
    }

    if (message.value.trim() === "") {
        showError("messageError", "Please enter your message");
        valid = false;
    }

    if (valid) {
        alert("Form submitted successfully!");
        form.reset();
        charCount.textContent = "0";
    }
});

function showError(id, msg) {
    document.getElementById(id).textContent = msg;
}

function clearErrors() {
    document.querySelectorAll(".error").forEach(e => e.textContent = "");
}
