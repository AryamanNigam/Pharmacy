window.onload = () => {
    const name = localStorage.getItem("name");
    const age = localStorage.getItem("age");
    const address = localStorage.getItem("address");
    const email = localStorage.getItem("email");
    const phone = localStorage.getItem("phone");

    if (name) document.getElementById("name").textContent = name;
    if (age) document.getElementById("age").textContent = age;
    if (address) document.getElementById("address").textContent = address;
    if (email) document.getElementById("email").textContent = email;
    if (phone) document.getElementById("phone").textContent = phone;
};