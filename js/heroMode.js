// Hero mode change
const kitchenBtn = document.querySelector("#kitchenBtn");
const pantryBtn = document.querySelector("#pantryBtn");
const recipeBtn = document.querySelector("#recipeBtn");

const kitchenHero = document.querySelector("#kitchenHero");
const pantryHero = document.querySelector("#pantryHero");
const recipeHero = document.querySelector("#recipeHero");

kitchenBtn.addEventListener("click", () => {
  kitchenHero.style.display = "flex";
  pantryHero.style.display = "none";
  recipeHero.style.display = "none";

  kitchenBtn.classList.add("active");
  pantryBtn.classList.remove("active");
  recipeBtn.classList.remove("active");
});

pantryBtn.addEventListener("click", () => {
  kitchenHero.style.display = "none";
  pantryHero.style.display = "flex";
  recipeHero.style.display = "none";

  kitchenBtn.classList.remove("active");
  pantryBtn.classList.add("active");
  recipeBtn.classList.remove("active");
});

recipeBtn.addEventListener("click", () => {
  kitchenHero.style.display = "none";
  pantryHero.style.display = "none";
  recipeHero.style.display = "block";

  kitchenBtn.classList.remove("active");
  pantryBtn.classList.remove("active");
  recipeBtn.classList.add("active");
});
