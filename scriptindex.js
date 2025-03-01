function showOptions(id) {
    document.getElementById('mainOptions').classList.add('hidden');
    document.getElementById('loginOptions').classList.add('hidden');
    document.getElementById('signupOptions').classList.add('hidden');
    document.getElementById(id).classList.remove('hidden');
}

function goBack() {
    document.getElementById('loginOptions').classList.add('hidden');
    document.getElementById('signupOptions').classList.add('hidden');
    document.getElementById('mainOptions').classList.remove('hidden');
}

function login(role) {
    window.location.href = "loginAdmin.html";
}

function signup(role) {
    if (role === 'admin') {
        window.location.href = "SignupasAdmin.html";
    } else if (role === 'cashier') {
        window.location.href = "SignupAsCashier.html";
    }
}