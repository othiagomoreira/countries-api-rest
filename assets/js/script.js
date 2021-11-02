// API call
// Theme toggle
// Search
// Filter
// Modal
const countriesEl = document.querySelector('#countries');
const toggleBtn = document.querySelector('#toggle');
const searchEl = document.querySelector('#search');
const filterBtn = document.querySelector('#filter');
const regionFilters = filterBtn.querySelectorAll('.dropdown__item');
const modal = document.querySelector('#modal');
const closeBtn = document.querySelector('#close');

// API CALL
// Pega o array com todos os paises que retorna da API e as exibi com a function displayCountries
async function getCountries() {
    const res = await fetch('https://restcountries.com/v2/all');
    const countries = await res.json();

    displayCountries(countries);
}
getCountries();

function displayCountries(countries) {
    countriesEl.innerText = '';

    countries.forEach((country) => {
        const countryEl = document.createElement('div'); // Cria um elemento div
        countryEl.classList.add('card'); // Adiciona a class card que foi estilizada no css

        // Adiciona como conteudo desse elemento a estrutura dos cards dos paises
        countryEl.innerHTML = ` 
            <div class="card__header">
                <img src="${country.flag}" alt="${country.name}">
            </div>
            <div class="card__info">
                <h2 class="card__title country-name">${country.name}</h2>
                <ul class="card__list">
                    <li class="card__item">
                        <span class="card__description">Population:</span>
                        ${country.population}
                    </li>
                    <li class="card__item country-region">
                        <span class="card__description">Region:</span>
                        ${country.region}
                    </li>
                    <li class="card__item">
                        <span class="card__description">Capital:</span>
                        ${country.capital}
                    </li>
                </ul>
            </div>`;

        countryEl.addEventListener('click', () => {
            modal.style.display = 'flex';
            showCountryDetails(country); // Preenche as informações no modal
        });

        countriesEl.append(countryEl);
    });
}

// Responsavel por preencher as informaçoes sobre cada pais dentro do modal
function showCountryDetails(country) {
    const modalDescription = document.querySelector('.modal__description');
    const modalImg = document.querySelector('.modal__image');

    modalImg.setAttribute('src', country.flag);

    modalDescription.innerHTML = `
        <h2 class="modal__title">${country.name}</h2>

        <div class="modal__info">
            <ul class="modal__list">
                <li class="modal__item">Native Name:
                    <span class="modal__span">${country.nativeName}</span>
                </li>

                <li class="modal__item">Population:
                    <span class="modal__span">${country.population}</span>
                </li>

                <li class="modal__item">Region:
                    <span class="modal__span">${country.region}</span>
                </li>

                <li class="modal__item">Sub Region:
                    <span class="modal__span">${country.subregion}</span>
                </li>

                <li class="modal__item">Capital:
                    <span class="modal__span">${country.capital}</span>
                </li>
            </ul>

            <ul class="modal__list">
                <li class="modal__item">Top Level Domain:
                    <span class="modal__span">${country.topLevelDomain}</span>
                </li>

                <li class="modal__item">Currencies:
                    <span class="modal__span">${country.currencies.map(
                        (currency) => currency.code
                    )}</span>
                </li>

                <li class="modal__item">Languages
                    <span class="modal__span">${country.languages.map(
                        (language) => language.name
                    )}</span>
                </li>
            </ul>
        </div>
    `;
}

// Seleciona entre o tema Dark/Light
toggleBtn.addEventListener('click', () => {
    const themeText = document.querySelector('.theme__text');
    const themeIcon = document.querySelector('.theme__icon');

    document.body.classList.toggle('dark-theme');

    if (document.body.classList.contains('dark-theme')) {
        themeText.innerText = 'Light Mode';

        themeIcon.classList.remove('bxs-moon');
        themeIcon.classList.add('bx-moon');
    } else {
        themeText.innerText = 'Dark Mode';

        themeIcon.classList.remove('bx-moon');
        themeIcon.classList.add('bxs-moon');
    }
});

// Abre e fecha o menu de dropdown
filterBtn.addEventListener('click', () => {
    const menuDrop = document.querySelector('.dropdown__list');

    menuDrop.classList.toggle('open-dropdown');
});

// Fecha o modal
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Seleciona os Paises com base no que foi digitado no input
searchEl.addEventListener('input', (event) => {
    const value = event.target.value; // Valor atualizado digitado dentro do input
    const countryName = document.querySelectorAll('.country-name'); // Pega todos os elementos com essa class

    // Um loop em todos as class country-name
    countryName.forEach((name) => {
        // Transforma o conteudo de name e do input em caracteres minusculo e verifica se inclui algum carracter do input nessa class
        if (name.innerText.toLowerCase().includes(value.toLowerCase())) {
            // Pega o ancestral mais próximo com a class card e altera seu display para block
            name.closest('.card').style.display = 'block';
        } else {
            // Se o conteudo do input não for igual a algum nome de pais retire ele da tela com o display none na class card
            name.closest('.card').style.display = 'none';
        }
    });
});

// Seleciona os paises com base no seu continente
regionFilters.forEach((filter) => {
    // Recebe as 5 li do html que representa cada continente
    filter.addEventListener('click', () => {
        const value = filter.innerText;
        const countryRegion = document.querySelectorAll('.country-region'); // Class presente em todos os cards contentendo os continentes de cada pai

        // Pega cada li com a class country-region que tem informaçoes sobre os continentes
        countryRegion.forEach((region) => {
            if (region.innerText.includes(value) || value === 'All') {
                region.closest('.card').style.display = 'block'; // Mostre todos os continentes iguais ao que foi selecionadoo no dropdown
            } else {
                region.closest('.card').style.display = 'none'; // Esconda todos os que restaram(que não são iguais ao que foi seleciondo no dropdown)
            }
        });
    });
});
