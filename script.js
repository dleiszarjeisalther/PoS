document.addEventListener("DOMContentLoaded", function () {
    const successMessage = document.getElementById("successMessage");
    if (sessionStorage.getItem("signupSuccess")) {
        successMessage.style.display = "block";
        setTimeout(function () {
            window.location.href = "index.html";
        }, 2000);
        sessionStorage.removeItem("signupSuccess");
    }
});