if (localStorage.getItem("auth") !== "true") {
  window.location.href = "login.html";
}
let students = JSON.parse(localStorage.getItem("students")) || [];

function display(data = students) {
  let table = document.getElementById("table");
  table.innerHTML = "";

  data.forEach((s, index) => {
    table.innerHTML += `
      <tr>
        <td>${s.name}</td>
        <td>${s.usn}</td>
        <td>${s.company}</td>
        <td>${s.status}</td>
        <td><button class="delete-btn" onclick="deleteStudent(${index})">Delete</button></td>
      </tr>
    `;
  });
}

document.getElementById("form").addEventListener("submit", function(e) {
  e.preventDefault();

  let student = {
    name: document.getElementById("name").value,
    usn: document.getElementById("usn").value,
    company: document.getElementById("company").value,
    status: document.getElementById("status").value
  };

  students.push(student);
  localStorage.setItem("students", JSON.stringify(students));

  display();
  this.reset();
});

function deleteStudent(index) {
  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));
  display();
}

function searchStudent() {
  let value = document.getElementById("search").value.toLowerCase();
  let filtered = students.filter(s => s.name.toLowerCase().includes(value));
  display(filtered);
}

function filterStatus(status) {
  if (status === "All") return display();
  let filtered = students.filter(s => s.status === status);
  display(filtered);
}

display();
document.getElementById("total").innerText = students.length;
document.getElementById("placed").innerText = students.filter(s => s.status === "Placed").length;
document.getElementById("notPlaced").innerText = students.filter(s => s.status === "Not Placed").length;

function logout() {
  localStorage.removeItem("auth");
  window.location.href = "login.html";
}