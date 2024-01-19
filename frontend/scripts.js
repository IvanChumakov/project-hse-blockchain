function myFunction() {
    alert("Hello, world!");
}

document.getElementById('addressForm').addEventListener('submit', (event) => {
    event.preventDefault();

    let data = document.getElementById("address")
    if (data.value == "") {
        alert("You should input something")
    } else {
        alert(data.value)
    }
});