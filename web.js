// Array to store students
let students = [];


// Function to update the digital clock
function updateClock() {
    const now = new Date();
    
    // Get hours, minutes, and seconds
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    
    // Add leading zeros if needed
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    
    // Display time in HH:MM:SS format
    const timeString = hours + ":" + minutes + ":" + seconds;
    document.getElementById("digitalClock").innerText = timeString;
}

// Call the function immediately to avoid 1-second delay
updateClock();

// Update the clock every 1000 milliseconds (1 second) using setInterval
setInterval(updateClock, 1000);

// Get form
let form = document.getElementById("studentForm");

form.addEventListener("submit", function(event) {
    event.preventDefault(); // stop page reload
    
    let name = document.getElementById("name").value;
    let regNo = document.getElementById("regNo").value;
    let cat = parseInt(document.getElementById("cat").value);
    let exam = parseInt(document.getElementById("exam").value);

    let message = document.getElementById("message");

    // Validation
    if (name === "" || regNo === "" || isNaN(cat) || isNaN(exam)) {
        message.innerText = "All fields are required!";
        return;
    }

    if (cat < 0 || cat > 30) {
        message.innerText = "CAT must be between 0 and 30";
        return;
    }

    if (exam < 0 || exam > 70) {
        message.innerText = "Exam must be between 0 and 70";
        return;
    }

    let total = cat + exam;
    let grade = getGrade(total);

    let student = {
        name: name,
        regNo: regNo,
        cat: cat,
        exam: exam,
        total: total,
        grade: grade
    };

    students.push(student);

    message.innerText = "Student Added Successfully!";
    
    updateTable();
    updateDashboard();

    form.reset();
});

function getGrade(total) {
    if (total >= 70) return "A";
    else if (total >= 60) return "B";
    else if (total >= 50) return "C";
    else if (total >= 40) return "D";
    else return "Fail";
}

function updateTable() {

    let tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";

    let highest = getTopScore();

    students.forEach((student, index) => {

        let row = document.createElement("tr");

        if (student.total === highest) {
            row.classList.add("topStudent");
        }

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.regNo}</td>
            <td>${student.total}</td>
            <td>${student.grade}</td>
            <td><button onclick="deleteStudent(${index})">Delete</button></td>
        `;

        tableBody.appendChild(row);
    });
}

function deleteStudent(index) {
    students.splice(index, 1);
    updateTable();
    updateDashboard();
}

function getTopScore() {
    let highest = 0;
    students.forEach(student => {
        if (student.total > highest) {
            highest = student.total;
        }
    });
    return highest;
}

function updateDashboard() {
    let totalMarks = 0;
    let pass = 0;
    let fail = 0;

    students.forEach(student => {
        totalMarks += student.total;

        if (student.total >= 40) pass++;
        else fail++;
    });

    let average = students.length > 0 ? 
        (totalMarks / students.length).toFixed(2) : 0;

    document.getElementById("average").innerText = average;
    document.getElementById("passCount").innerText = pass;
    document.getElementById("failCount").innerText = fail;
}

function sortStudents() {
    students.sort((a, b) => b.total - a.total);
    updateTable();
}