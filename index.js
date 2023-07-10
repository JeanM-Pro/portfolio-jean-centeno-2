const formulario = document.getElementById("miFormulario");
const emailInput = document.getElementById("email");
const submitBtn = document.getElementById("submitBtn");
const repositorios = document.getElementById("repositories");

emailInput.addEventListener("input", () => {
  if (emailInput.validity.valid) {
    emailInput.setCustomValidity("");
  } else {
    emailInput.setCustomValidity("Por favor, insira um email válido.");
  }
});

formulario.addEventListener("input", function () {
  const inputs = formulario.querySelectorAll("input, textarea");
  let allFieldsFilled = true;

  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      allFieldsFilled = false;
    }
  });

  submitBtn.disabled = !allFieldsFilled;
});

// obtener repositorios

const getApiGitHub = () => {
  fetch("https://api.github.com/users/JeanM-Pro/repos").then(async (res) => {
    if (!res.ok) {
      throw new Error(res.status);
    }

    let data = await res.json();
    data.map((repo) => {
      let project = document.createElement("div");
      project.classList.add("repos");
      project.innerHTML = `
      <div class="project">
        <div>
          <h4 class="project-title">${repo.name}</h4>
          <a target="_blank" href="${repo.html_url}" class="url">${
        repo.html_url
      }</a>
        </div>
        <div class="data-punto">
          <span class="data">${Intl.DateTimeFormat("pt-BR").format(
            new Date(repo.created_at)
          )}</span>
          <div class="punto">
            <div class="circulo"></div>
            <span class="lenguaje">${repo.language}</span>
          </div>
        </div>
      </div>
      `;

      repositorios.appendChild(project);
    });
  });
};

getApiGitHub();
