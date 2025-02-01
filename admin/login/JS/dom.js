export function findUsers(users) {
  const initialWelcome = document.getElementById("initialWelcome");
  const container = document.getElementById("container");

  initialWelcome.onclick = () => {
    initialWelcome.style.opacity = "0";
    setTimeout(() => {
      initialWelcome.style.display = "none";
      if (container) {
        container.classList.add("visible");
        setTimeout(() => {
          container.classList.add("active");
        }, 100);
      }
    }, 500);
  };

  container.onclick = () => {
    if (!container.classList.contains("active")) {
      container.classList.add("active");
    }
  };

  const passwordToggle = document.querySelector(".password-toggle");
  const passwordInput = document.querySelector('input[type="password"]');

  passwordToggle.onclick = (e) => {
    e.stopPropagation();
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
  };

  const form = document.querySelector(".form");
  const btnLogin = document.querySelector(".login-btn");
  const errorUserDate = document.querySelector(".error-userData");

  btnLogin.onclick = (e) => {
    e.preventDefault();
    let userEmail = form["inpEmail"].value;
    let userPassword = form["inpPassword"].value;

    const user = users.find(
      (u) => u.email === userEmail && u.password === userPassword
    );

    if (user) {
      if (user.roleId === 0) {
        window.location.href = "../../dashboard/dashboard.html";
      } else {
        errorUserDate.innerHTML = "You don't have enough rights!";
      }
    } else {
      errorUserDate.innerHTML = "User not found!";
    }

    if (userEmail == "" && userPassword == "") {
      errorUserDate.innerHTML = "";
    }
    form.reset();
  };
}

document.addEventListener("DOMContentLoaded", findUsers);
