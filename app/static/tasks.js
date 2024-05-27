const radioButtons = document.querySelectorAll('input[name="budget"]');
const termsRadioButtons = document.querySelectorAll('input[name="term"]');
const customValueInput = document.getElementById("custom-value");

function updateURL() {
  const selectedBudget = document.querySelector('input[name="budget"]:checked');
  const selectedTerm = document.querySelector('input[name="term"]:checked');

  let salaryValue = "";
  if (selectedBudget) {
    if (selectedBudget.value === "custom") {
        console.log("here")
      const customBudgetInput = document.querySelector('#customBudgetInput')
      salaryValue = customBudgetInput ? customBudgetInput.value : "";
    } else {
      salaryValue = selectedBudget.value;
    }
  }
  const termsValue = selectedTerm ? selectedTerm.value : "";

  const inputName = document.getElementById("name").value;

  const params = new URLSearchParams(window.location.search);

  if (salaryValue !== "") {
    params.set("salary", salaryValue);
  } else {
    params.delete("salary");
  }

  if (termsValue !== "") {
    params.set("terms", termsValue);
  } else {
    params.delete("terms");
  }

  if (inputName.length != "") {
        params.set("name", inputName);
   } else {
        params.delete("name");
   }

  const path = window.location.pathname.endsWith("/")
    ? window.location.pathname
    : window.location.pathname + "/";
  const newURL = `${path}?${params.toString()}`;
  var decodedUrl = decodeURIComponent(newURL);

  fetch(`${decodedUrl}`)
    .then((response) => response.text())
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const targetBlock = doc.getElementById("tasks");

      if (targetBlock) {
        const contentElement = document.getElementById("cardsContainer");
        contentElement.innerHTML = "";
        contentElement.appendChild(targetBlock);
      }

      console.log("Server response:", html);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  history.pushState({}, 1, decodedUrl);
}

radioButtons.forEach((radio) => {
  radio.addEventListener("change", updateURL);
});

document.getElementById("customBudgetInput").addEventListener("input", updateURL);

termsRadioButtons.forEach((radio) => {
  radio.addEventListener("change", updateURL);
});

document.getElementById("name").addEventListener("input", updateURL);

const optionMenu = document.querySelector(".select-menu"),
       selectBtn = optionMenu.querySelector(".select-btn"),
       options = optionMenu.querySelectorAll(".option"),
       sBtn_text = optionMenu.querySelector(".sBtn-text");
selectBtn.addEventListener("click", () => optionMenu.classList.toggle("active"));
options.forEach(option =>{
    option.addEventListener("click", ()=>{
        let selectedOption = option.querySelector(".option-text").innerText;
        sBtn_text.innerText = selectedOption;
        optionMenu.classList.remove("active");
        updateURL
    });
});

