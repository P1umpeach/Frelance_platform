var current_fs, next_fs, previous_fs;
var left, opacity, scale;
var animating = false;

const pathsBlobRight = [
  "M393.968 109.904C501.692 80.1458 574.529 19.8185 687.739 4.36042C800.949 -11.0976 954.531 18.3136 968.288 92.2698C982.045 166.226 856.051 284.522 787.454 395.146C718.578 505.9 707.1 608.981 661.865 621.543C616.63 634.105 537.64 556.149 415.416 534.432C293.191 512.715 128.014 547.108 51.7677 490.348C-24.4783 433.588 -11.3822 285.824 66.3032 212.17C143.914 138.722 286.245 139.663 393.968 109.904Z",
  "M548.532 34.0841C641.617 64.117 745.525 108.735 789.036 190.095C832.375 271.51 815.199 389.894 766.069 499.945C717.112 609.942 636.03 711.66 539.007 733.019C441.984 754.378 328.912 695.034 221.408 634.132C113.904 573.23 12.3135 510.661 1.80608 433.14C-8.70136 355.619 72.1551 263.435 135.531 184.307C199.024 104.953 245.091 38.8276 309.283 13.575C373.474 -11.6775 455.619 3.99709 548.532 34.0841Z",
  "M350.302 192.763C446.656 278.964 598.13 355.633 620.095 460.484C642.267 565.127 534.722 697.951 393.402 769.233C252.289 840.722 77.1931 850.668 22.0741 765.089C-2.43645 727.267 -3.39966 670.697 4.17623 609C13.701 531.431 36.7231 445.758 43.4172 379.048C55.4356 259.486 14.8216 201.258 27.4617 134.121C40.1017 66.9835 105.996 -9.06418 159.457 0.882106C212.918 10.8284 253.947 106.561 350.302 192.763Z",
];

const pathsBlobLeftTop = [
  "M300 167.8C300 236 250 273.5 175 273.5C100 273.5 0 236 0 167.8C0 99.5 100 0.5 175 0.5C250 0.5 300 99.5 300 167.8Z",
  "M272.3 187.3C272.3 274.7 173.7 349.3 105.6 349.3C37.5 349.3 0 274.7 0 187.3C0 100 37.5 0 105.6 0C173.7 0 272.3 100 272.3 187.3Z",
  "M326 90.7401C326 162.909 326 289 244.5 289C163 289 0 162.909 0 90.7401C0 18.5716 163 0 244.5 0C326 0 326 18.5716 326 90.7401Z",
];

const pathsBlobLeftBottom = [
  "M360.343 170.528C421.312 242.343 500.255 285.001 506.581 333.979C512.908 382.813 446.332 437.967 385.507 489.674C324.538 541.381 269.322 589.641 197.856 605.871C126.391 622.101 38.5325 606.446 10.7803 554.739C-17.1157 503.032 15.0941 415.274 39.9704 352.507C64.703 289.597 82.2458 251.535 109.998 179.72C137.894 107.905 175.999 2.33662 216.405 0.0385391C256.812 -2.25955 299.518 98.7125 360.343 170.528Z",
  "M432.505 95.9671C459.516 166.396 414.827 265.392 399.553 349.256C384.421 433.12 398.846 501.71 371.834 572.421C344.681 643.133 276.091 715.965 222.916 700.268C169.882 684.711 132.405 580.765 92.2409 510.054C52.2182 439.342 9.50847 401.865 1.44736 356.327C-6.61375 310.789 19.8324 257.048 59.9965 186.619C100.019 116.049 153.76 28.7912 229.987 6.16351C306.355 -16.4642 405.351 25.397 432.505 95.9671Z",
];

window.addEventListener("scroll", (e) => {
  document.body.style.cssText += `--scrollTop: ${this.scrollY}px`;
});

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
ScrollSmoother.create({
  wrapper: ".wrapper",
  content: ".content",
});

document.querySelectorAll(".next-button").forEach(function (element) {
  element.addEventListener("click", function () {
    current_fs = this.closest("fieldset");
    next_fs = current_fs.nextElementSibling;

    current_fs.style.display = "none";
    next_fs.style.display = "flex";

    animateSVG(".blob-right", pathsBlobRight);
    animateSVG(".blob-left-bottom", pathsBlobLeftBottom);
    animateSVG(".blob-left-top", pathsBlobLeftTop);
  });
});

document.querySelectorAll(".previous").forEach(function (element) {
  element.addEventListener("click", function () {
    current_fs = this.closest("fieldset");
    previous_fs = current_fs.previousElementSibling;

    previous_fs.style.display = "flex";
    current_fs.style.display = "none";

    animateSVG(".blob-right", pathsBlobRight);
    animateSVG(".blob-left-bottom", pathsBlobLeftBottom);
    animateSVG(".blob-left-top", pathsBlobLeftTop);
  });
});

document.querySelectorAll(".goto").forEach(function (element) {
  element.addEventListener("click", function () {
    reg_form = document.getElementById("regform");
    login_form = document.getElementById("loginform");

    if (reg_form.style.display !== "none") {
      reg_form.style.display = "none";
      login_form.style.display = "block";
      console.log("here");
    } else {
      login_form.style.display = "none";
      reg_form.style.display = "block";
      console.log("there");
    }

    animateSVG(".blob-right", pathsBlobRight);
    animateSVG(".blob-left-bottom", pathsBlobLeftBottom);
    animateSVG(".blob-left-top", pathsBlobLeftTop);
  });
});

function animateSVG(className, paths) {
  var svg = document.querySelector(className + " path");
  var startPath = svg.getAttribute("d");
  var randomIndex;
  var endPath;
  var duration = 1000;

  do {
    randomIndex = Math.floor(Math.random() * paths.length);
    endPath = paths[randomIndex];
  } while (endPath === startPath);

  svg.setAttribute("d", startPath);

  svg.setAttribute("d", startPath);
  svg.style.transition = "d " + duration + "ms";
  setTimeout(function () {
    svg.setAttribute("d", endPath);
  }, 50);
}

document.addEventListener("scroll", function () {
  const textGreat = document.getElementById("great");
  const textSpot = document.getElementById("spot");
  const logo = document.getElementById("logo");
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const scrollFraction = window.scrollY / maxScroll;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const oneVwInPx = viewportWidth / 100;
  const oneVhInPx = viewportHeight / 100;

  const index = oneVwInPx + oneVhInPx;

  const maxGreatFontSize = index * 2;
  const minGreatFontSize = index / 1.4;

  const maxSpotFontSize = index * 9;
  const minSpotFontSize = index * 3;

  if (scrollFraction >= 0.15) {
    textGreat.style.fontSize = minGreatFontSize + "px";
    textSpot.style.fontSize = minSpotFontSize + "px";
    logo.style.left = "0";
    logo.style.top = "20%";
  } else {
    const currentGreatFontSize =
      maxGreatFontSize -
      (maxGreatFontSize - minGreatFontSize) * (scrollFraction / 0.15);
    const currentSpotFontSize =
      maxSpotFontSize -
      (maxSpotFontSize - minSpotFontSize) * (scrollFraction / 0.15);
    textGreat.style.fontSize = currentGreatFontSize + "px";
    textSpot.style.fontSize = currentSpotFontSize + "px";

    const currentLeft = 50 - 50 * (scrollFraction / 0.15);
    const currentTop = 40 - 20 * (scrollFraction / 0.15); // От 50% до 10%
    logo.style.left = currentLeft + "%";
    logo.style.top = currentTop + "%";
  }
});



  const customSelects = document.querySelectorAll('.custom-select');

  customSelects.forEach(customSelect => {
    const dropdown = customSelect.querySelector('.dropdown');

    if (dropdown) {
      customSelect.addEventListener('click', function(event) {
        customSelects.forEach(cs => {
          const csDropdown = cs.querySelector('.dropdown');
          if (csDropdown && cs !== customSelect) {
            csDropdown.style.display = 'none';
          }
        });
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
      });

      dropdown.addEventListener('click', function(event) {
        event.stopPropagation();
      });
    }
  });


  document.addEventListener('click', function(event) {
    customSelects.forEach(customSelect => {
      const dropdown = customSelect.querySelector('.dropdown');
      if (dropdown && !customSelect.contains(event.target)) {
        dropdown.style.display = 'none';
      }
    });
  });

