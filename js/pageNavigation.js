// Mobile Navigation
const navBtn = document.getElementById("navBtn");
const closeBtn = document.getElementById("closeBtn");
const mobNav = document.getElementById("mobNav");

navBtn.addEventListener("click", () => {
  mobNav.classList.toggle("hidden");
});

closeBtn.addEventListener("click", () => {
  mobNav.classList.add("hidden");
});