function Cart(){
  const burgerMenu = document.getElementById("burgerMenu");
  const mobileNav = document.getElementById("mobileNav");

  burgerMenu.onclick = () => {
    mobileNav.classList.toggle("active");
  };

  document.onclick = (event) => {
    if (
      !mobileNav.contains(event.target) &&
      !burgerMenu.contains(event.target)
    ) {
      mobileNav.classList.remove("active");
    }
  };

}

document.addEventListener("DOMContentLoaded", Cart())