const tabs = document.querySelectorAll(".tab");
const allSlides = document.querySelectorAll(".card");
const prevBtn = document.querySelector(".arrow.left");
const nextBtn = document.querySelector(".arrow.right");
const recipeCards = document.querySelectorAll(".recipe-card");
const recipePrevBtn = document.querySelector(".slider-wrapper .arrow.left");
const recipeNextBtn = document.querySelector(".slider-wrapper .arrow.right");
const recipeDotsContainer = document.querySelector(".page-dots");
const steps = document.querySelectorAll(".quiz-step");
const progressSteps = document.querySelectorAll("#progressSteps .step");
const nextBtn2 = document.getElementById("nextBtn");
const resultSection = document.getElementById("quizResult");
const arc = document.querySelector(".arc");
const movingIcon = document.querySelector(".moving-icon");
const timeIcon = document.getElementById("timeIcon");
const productImage = document.querySelector(".image-box img");
const tagText = document.querySelector(".tag");
const cookieImage = document.querySelector(".cookie-img");

let recipeGroup = 0;
let currentSlides = [];
let group = 0;
let currentStep = 0;
let currentIndex = 0;

const recipeVisible = 3;
const recipeTotalGroups = Math.ceil(recipeCards.length / recipeVisible);
const visibleCount = 3;
const viewAllBtn = document.querySelector(".view-btn");
const viewRangeBtn = document.querySelector(".view-range-btn");

recipeDotsContainer.innerHTML = "";

function setupCarousel(slides){

    currentSlides = slides;
    group = 0;

    allSlides.forEach(s => s.style.display = "none");

    if(slides.length <= visibleCount){
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";

        slides.forEach(s => s.style.display = "block");
        return;
    }

    prevBtn.style.display = "block";
    nextBtn.style.display = "block";

    showGroup(0);
}

function showGroup(g){

    currentSlides.forEach(s => s.style.display = "none");

    let start = g * visibleCount;
    let end = start + visibleCount;

    for(let i=start; i<end && i<currentSlides.length; i++){
        currentSlides[i].style.display = "block";
    }

    group = g;
}

nextBtn.addEventListener("click", ()=>{
    const totalGroups = Math.ceil(currentSlides.length / visibleCount);
    showGroup((group + 1) % totalGroups);
});

prevBtn.addEventListener("click", ()=>{
    const totalGroups = Math.ceil(currentSlides.length / visibleCount);
    showGroup((group - 1 + totalGroups) % totalGroups);
});

tabs.forEach(tab=>{
    tab.addEventListener("click", ()=>{

        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        const type = tab.textContent.trim().toLowerCase();

        if(type === "all"){
            setupCarousel([...allSlides]);
        }else{
            const filtered = [...document.querySelectorAll(".card." + type)];
            setupCarousel(filtered);
        }
    });
});

setupCarousel([...allSlides]);

for (let i = 0; i < recipeTotalGroups; i++) {
    const dot = document.createElement("span");
    if (i === 0) dot.classList.add("active");

    dot.addEventListener("click", () => showRecipeGroup(i));
    recipeDotsContainer.appendChild(dot);
}

function showRecipeGroup(g) {

    const dots = recipeDotsContainer.querySelectorAll("span");

    recipeCards.forEach(c => c.style.display = "none");
    dots.forEach(d => d.classList.remove("active"));

    let start = g * recipeVisible;
    let end = start + recipeVisible;

    for (let i = start; i < end && i < recipeCards.length; i++) {
        recipeCards[i].style.display = "block";
    }

    dots[g].classList.add("active");
    recipeGroup = g;
}

recipeNextBtn.addEventListener("click", () => {
    showRecipeGroup((recipeGroup + 1) % recipeTotalGroups);
});

recipePrevBtn.addEventListener("click", () => {
    showRecipeGroup((recipeGroup - 1 + recipeTotalGroups) % recipeTotalGroups);
});

showRecipeGroup(0);

viewAllBtn.addEventListener("click", () => {
    alert("Viewing all recipes");
});

if(viewRangeBtn){
    viewRangeBtn.addEventListener("click", () => {
        alert("Viewing selected range");
    });
}

nextBtn2.addEventListener("click", () => {

    const selected = steps[currentStep].querySelector("input:checked");
    if(!selected){
        alert("Please select an option");
        return;
    }

    progressSteps[currentStep].textContent = "✔";

    steps[currentStep].classList.remove("active-step");

    currentStep++;

    if (currentStep === steps.length) 
    {
    nextBtn2.style.display = "none";
    document.getElementById("quizResult").style.display = "block";
    document.getElementById("quizResult").scrollIntoView({ behavior: "smooth" });
    return;
    }

    progressSteps[currentStep].classList.add("active");
    steps[currentStep].classList.add("active-step");
});

const timeStates = [
  {
    tag: "Morning Kickstarter",
    productImg: "images/Morning kickstarter.jpg",
    cookieImg: "images/Half Cookie.jpg",
    icon: "images/sun.png",
    size: "90px",
    position: "0%"
  },
  {
    tag: "",
    productImg: "images/noon delights.png",
    cookieImg: "images/noon.jpg",
    icon: "images/sun.png",
    size: "55px",
    position: "50%"
  },
  {
    tag: "",
    productImg: "images/midnight whimsies.png",
    cookieImg: "images/night.jpg",
    icon: "images/moon.png",
    size: "70px",
    position: "100%"
  }
];

arc.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex >= timeStates.length) {
    currentIndex = 0;
  }

  const state = timeStates[currentIndex];
  movingIcon.style.left = state.position;
  timeIcon.src = state.icon;
  timeIcon.style.width = state.size;
  productImage.src = state.productImg;
  tagText.textContent = state.tag;
  cookieImage.src = state.cookieImg;
});
