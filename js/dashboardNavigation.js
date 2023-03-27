const pantryBtn = document.getElementById("pantryBtn");
const recipeBtn = document.getElementById("recipeBtn");

const pantry = document.getElementById("pantry");
const recipe = document.getElementById("recipe");

pantryBtn.addEventListener("click", () => {
  pantry.style.display = "flex";
  recipe.style.display = "none";
});

recipeBtn.addEventListener("click", () => {
  pantry.style.display = "none";
  recipe.style.display = "flex";
});
