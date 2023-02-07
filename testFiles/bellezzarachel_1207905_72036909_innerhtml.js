const scriptHTML = `<script>alert("Alert from innerHTML");</script>`;
const main = document.getElementById('main');

main.innerHTML = scriptHTML;

document.getElementById("demo").innerHTML = "I have changed!";