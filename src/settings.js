window.onload = () => {
    document.getElementById('nameInput').value = localStorage.getItem('name') || '';
    document.getElementById('ageInput').value = localStorage.getItem('age') || '';
    document.getElementById('addressInput').value = localStorage.getItem('address') || '';
    document.getElementById('emailInput').value = localStorage.getItem('email') || '';
    document.getElementById('phoneInput').value = localStorage.getItem('phone') || '';
};

document.getElementById('settings-form').addEventListener('submit', function(e) {
    e.preventDefault();
    localStorage.setItem('name', document.getElementById('nameInput').value);
    localStorage.setItem('age', document.getElementById('ageInput').value);
    localStorage.setItem('address', document.getElementById('addressInput').value);
    localStorage.setItem('email', document.getElementById('emailInput').value);
    localStorage.setItem('phone', document.getElementById('phoneInput').value);
    window.location.href = "profile.html"; 
});