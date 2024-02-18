document.addEventListener("DOMContentLoaded", function () {
  const generateButton = document.querySelector('button');
  const amountInput = document.querySelector('#amountInput');
  const sortInput = document.querySelector('#sort-btn');
  const cardsArray = [];

  generateButton.addEventListener('click', function () {
    const amount = parseInt(amountInput.value);

    if (!isNaN(amount) && amount > 0) {
      cardsArray.length = 0;
      generateCards(amount);
      displayCards();
    } else {
      alert('Por favor, coloque un número positivo válido');
    }
  });

  sortInput.addEventListener('click', function () {
    const sortingSteps = sortCards();
    displaySortingSteps(sortingSteps);
  });

  function generateCards(amount) {
    for (let i = 0; i < amount; i++) {
      const randomNumber = Math.random() < 0.5
        ? Math.floor(Math.random() * 10) + 1
        : ['Q', 'J', 'K', 'A'][Math.floor(Math.random() * 4)];

      const palo = ["&hearts;", "&diams;", '&clubs;', '&spades;'];
      const paloRandom = palo[Math.floor(Math.random() * 4)];

      cardsArray.push([randomNumber, paloRandom]);
    }
    return cardsArray;
  }

  function displayCards() {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');

    for (let i = 0; i < cardsArray.length; i++) {
      const cardElement = createCardElement(cardsArray[i]);
      cardContainer.appendChild(cardElement);
    }

    document.body.appendChild(cardContainer);
  }

  function cardValueToNumber(cardValue) {
    if (cardValue === 'A') {
      return 1;
    } else if (cardValue === 'J') {
      return 11;
    } else if (cardValue === 'Q') {
      return 12;
    } else if (cardValue === 'K') {
      return 13;
    } else {
      return parseInt(cardValue, 10);
    }
  }

  function sortCards() {
    let cardsSorted = cardsArray.slice();
    let sortingSteps = [];

    for (let i = 0; i < cardsSorted.length; i++) {
      let min = i;
      for (let j = i + 1; j < cardsSorted.length; j++) {
        if (cardValueToNumber(cardsSorted[j][0]) < cardValueToNumber(cardsSorted[min][0])) {
          min = j;
        }
      }
      if (min !== i) {
        let tmp = cardsSorted[i];
        cardsSorted[i] = cardsSorted[min];
        cardsSorted[min] = tmp;
        sortingSteps.push(cardsSorted.slice());
      }
    }

    return sortingSteps;
  }

  function displaySortingSteps(steps) {
    steps.forEach((step, index) => {
      const cardContainerSorted = document.createElement('div');
      cardContainerSorted.classList.add('card-container');

      const title = document.createElement('p');
      title.textContent = `Sort Step ${index + 1}`;
      cardContainerSorted.appendChild(title);

      step.forEach(card => {
        const cardElement = createCardElement(card);
        cardContainerSorted.appendChild(cardElement);
      });

      document.body.appendChild(cardContainerSorted);
    });
  }

  function createCardElement(card) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');

    const numeroCarta = document.createElement('p');
    numeroCarta.innerHTML = card[0];
    numeroCarta.classList.add('numeroC');

    const paloRandom1 = document.createElement('p');
    paloRandom1.innerHTML = card[1];
    paloRandom1.classList.add('palo1');

    const paloRandom2 = document.createElement('p');
    paloRandom2.innerHTML = card[1];
    paloRandom2.classList.add('palo2');

    if (card[1] === "&hearts;" || card[1] === "&diams;") {
      paloRandom1.classList.add('red');
      paloRandom2.classList.add('red');
    }

    cardElement.appendChild(paloRandom1);
    cardElement.appendChild(numeroCarta);
    cardElement.appendChild(paloRandom2);

    return cardElement;
  }
});
