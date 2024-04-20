function myFunction() {
    alert("Hello, world!");
}

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('button_to_click');
    button.addEventListener('click', () => {
        alert('Hello World');
    });
});

document.getElementById('addressForm').addEventListener('submit', (event) => {
    event.preventDefault();

    let data = document.getElementById("address") 
    if (data.value == "") {
        alert("You should input something")
    } else {
        alert(data.value)
    }
});