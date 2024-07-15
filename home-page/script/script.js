// Header dropdown menu functionality in mobile
const headerMenuIcon = document.querySelector(".header-menu-icon"),
  headerMenu = document.querySelector(".header-menu");
headerMenuIcon.addEventListener("click", function () {
  headerMenu.classList.toggle("open");
  document.body.classList.toggle("menu-open");
});

// Sticky header functionality while scrolling
const headerSection = document.querySelector(".header-section");
window.addEventListener("scroll", function () {
  if (window.scrollY > 0) {
    headerSection.classList.add("sticky");
  } else {
    headerSection.classList.remove("sticky");
  }
});

// Hero section Form validation and submit
const heroSection = document.querySelector(".hero-section");
const formFields = heroSection.querySelectorAll(
  ".form-field input, .form-field select"
);

formFields.forEach(function (field) {
  field.addEventListener("focus", function () {
    field.parentElement.classList.add("focus");
  });

  field.addEventListener("blur", function () {
    if (field.value === "") {
      field.parentElement.classList.remove("focus");
    }
  });

  setTimeout(function () {
    if (field.value !== "") {
      field.parentElement.classList.add("filled", "focus");
    }
  }, 200)

  field.addEventListener("input", function () {
    if (field.value !== "") {
      field.parentElement.classList.add("filled");
      validateField(field);
    } else {
      field.parentElement.classList.remove("filled");
    }
  });
});

// Validate all fields on form submission
const form = heroSection.querySelector(".contect-form");
form.addEventListener("submit", function (event) {
  for (let i = 0; i < formFields.length; i++) {
    formFields[i].parentElement.classList.remove("err");
  }
  for (let i = 0; i < formFields.length; i++) {
    const field = formFields[i];
    var validateValue = false;
    if (field.type !== "submit") {
      if (field.name == "businessEmail") {
        validateValue = validateField(field, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      } else {
        validateValue = validateField(field);
      }
      if (validateValue) {
        field.focus();
        break;
      }
    }
  }

  const errFields = document.querySelectorAll(".form-field.err");
  if (errFields.length > 0) {
    event.preventDefault();
  }
});

// Function to validate a field using regex
function validateField(field, regex = /.+/) {
  const value = field.value.trim();
  const isValid = regex.test(value);
  if (!isValid) {
    field.parentElement.classList.add("err");
    return true;
  } else {
    field.parentElement.classList.remove("err");
  }
}

// Review Slider functionality
const slider = document.querySelector(".review-section"),
  rightArrow = slider.querySelector(".slider-right-arrow"),
  leftArrow = slider.querySelector(".slider-left-arrow"),
  dots = slider.querySelectorAll(".slider-dots .dot");

sliderChange(slider.querySelector(".slider-item.slide-active"));
window.onresize = function () {
  sliderChange(slider.querySelector(".slider-item.slide-active"));
};

rightArrow.addEventListener("click", function () {
  const activeSlider = slider.querySelector(".slider-item.slide-active");
  var nextActiveSlider = activeSlider.nextElementSibling ? activeSlider.nextElementSibling : slider.querySelector(".slider-item");

  nextActiveSlider.style.cssText = `margin-left: ${activeSlider.clientWidth * 1}px;`;
  setTimeout(function () {
    nextActiveSlider.style.cssText = `transition: all 0.2s;`;
    activeSlider.style.cssText = `margin-left: ${activeSlider.clientWidth * -1}px;transition: all 0.2s;`;
    activeSlider.classList.remove("slide-active");
    nextActiveSlider.classList.add("slide-active");
    dotActive(nextActiveSlider);
  }, 10);
});

leftArrow.addEventListener("click", function () {
  const activeSlider = slider.querySelector(".slider-item.slide-active");
  var nextActiveSlider = activeSlider.previousElementSibling ? activeSlider.previousElementSibling : slider.querySelectorAll(".slider-item")[slider.querySelectorAll(".slider-item").length - 1];

  nextActiveSlider.style.cssText = `margin-left: ${activeSlider.clientWidth * -1}px;`;

  setTimeout(function () {
    nextActiveSlider.style.cssText = `transition: all 0.2s;`;
    activeSlider.style.cssText = `margin-left: ${activeSlider.clientWidth * 1}px;transition: all 0.2s;`;
    activeSlider.classList.remove("slide-active");
    nextActiveSlider.classList.add("slide-active");
    dotActive(nextActiveSlider);
  }, 10);
});

function sliderChange(activeSlider, nextActiveSlider, direction) {
  nextActiveSlider.style.cssText = `margin-left: ${activeSlider.clientWidth * direction == 'left' ? -1 : 1}px;`;

  setTimeout(function () {
    nextActiveSlider.style.cssText = `transition: all 0.2s;`;
    activeSlider.style.cssText = `margin-left: ${activeSlider.clientWidth * direction == 'left' ? 1 : -1}px;transition: all 0.2s;`;
    activeSlider.classList.remove("slide-active");
    nextActiveSlider.classList.add("slide-active");
    dotActive(nextActiveSlider);
  }, 10);
}

dots.forEach(function (dot, i) {
  dot.addEventListener("click", function () {
    const activeSlider = slider.querySelector(".slider-item.slide-active");
    const index = Array.from(activeSlider.parentNode.children).indexOf(activeSlider);
    if ((index - 1) == i || (index == 0 && i == 2)) {
      leftArrow.click();
    } else {
      rightArrow.click();
    }
  });
});

var posX1 = 0,
  posX2 = 0,
  posInitial;
sliderList = slider.querySelector(".slider-list");
sliderList.addEventListener("mousedown", dragStart);
sliderList.addEventListener("touchstart", dragStart);
sliderList.addEventListener("touchend", dragEnd);
sliderList.addEventListener("touchmove", dragAction);

function dragStart(e) {
  e = e || window.event;
  posInitial = sliderList.offsetLeft;
  e.preventDefault();

  if (e.type == "touchstart") {
    posX1 = e.touches[0].clientX;
  } else {
    posX1 = e.clientX;
    document.onmouseup = dragEnd;
    document.onmousemove = dragAction;
    document.onmousedown = dragAction;
  }
}

function dragAction(e) {
  e = e || window.event;

  if (e.type == "touchmove") {
    posX2 = posX1 - e.touches[0].clientX;
    posX1 = e.touches[0].clientX;
  } else {
    posX2 = posX1 - e.clientX;
    posX1 = e.clientX;
  }
}

function dragEnd(e) {
  if (posX2 <= -1) {
    slider.querySelector(".slider-left-arrow").click();
  } else if (posX2 >= 1) {
    slider.querySelector(".slider-right-arrow").click();
  }
  posX2 = 0;
  document.onmouseup = null;
  document.onmousemove = null;
}

function sliderChange(activeSlider) {
  activeSlider.style = "";

  var nextIndex = 1;
  var nextElem = activeSlider;
  while (nextElem.nextElementSibling) {
    nextElem.nextElementSibling.style.cssText = `margin-left: ${activeSlider.clientWidth * nextIndex}px;`;
    nextIndex++;
    nextElem = nextElem.nextElementSibling;
  }

  var previousIndex = -1;
  var previousElem = activeSlider;
  while (previousElem.previousElementSibling) {
    previousElem.previousElementSibling.style.cssText = `margin-left: ${activeSlider.clientWidth * previousIndex}px;`;
    previousIndex--;
    previousElem = previousElem.previousElementSibling;
  }

  dotActive(activeSlider);
}

function dotActive(activeSlider) {
  const index = Array.from(activeSlider.parentNode.children).indexOf(activeSlider);
  slider.querySelector(".dot.dot-active").classList.remove("dot-active");
  dots[index].classList.add("dot-active");
}

// Video model popup functionality
var videoModel = document.querySelector(".video-popup");
function openPopup() {
  videoModel.style.display = "block";
}

function closePopup() {
  videoModel.style.display = "";
}


videoModel.addEventListener('click', function (e) {
  if (e.target.closest('.close') || !e.target.closest('video')) {
    closePopup();
  }
});
