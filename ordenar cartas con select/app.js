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
      alert('porfavor coloque un numero positivo valido')
    }
  });

  sortInput.addEventListener('click', function () {
    sortCards();
  })


  function generateCards(amount) {



    for (let i = 0; i < amount; i++) {

      const randomNumber = Math.random() < 0.5 
        ? Math.floor(Math.random() * 10) + 1
        : ['Q', 'J', 'K', 'A'][Math.floor(Math.random() * 4)]


       
      const palo = ["&hearts;", "&diams;", '&clubs;', '&spades;'];
      const paloRandom = palo[Math.floor(Math.random() * 4)];

      cardsArray.push([randomNumber, paloRandom])
    }
    return cardsArray
  }


  function displayCards(amount) {



    const cardContainer = document.createElement('div');

    cardContainer.classList.add('card-container');

    for (let i = 0; i < cardsArray.length; i++) {

      const card = document.createElement('div');

      card.classList.add('card');

      const numeroCarta = document.createElement('p')
      numeroCarta.innerHTML = cardsArray[i][0]
      numeroCarta.classList.add('numeroC')

      const paloRandom1 = document.createElement('p');
      paloRandom1.innerHTML = cardsArray[i][1]
      paloRandom1.classList.add('palo1')

      const paloRandom2 = document.createElement('p')
      paloRandom2.innerHTML = cardsArray[i][1]
      paloRandom2.classList.add('palo2')

      if (cardsArray[i][1] === "&hearts;" || cardsArray[i][1] === "&diams;") {
        paloRandom1.classList.add('red');
        paloRandom2.classList.add('red');
      }

      card.appendChild(paloRandom1);
      card.appendChild(numeroCarta);
      card.appendChild(paloRandom2);
      cardContainer.appendChild(card);
      document.body.appendChild(cardContainer);

    }
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
    let step = 1;
    for(let i = 0; i < cardsSorted.length; i++) {
      let min = i;
        for(let j = i + 1; j < cardsSorted.length; j++) {
          if(cardValueToNumber(cardsSorted[j][0]) < cardValueToNumber(cardsSorted[min][0])) {
            min = j;
          }
        }
        if(min !== i) {
          let tmp = cardsSorted[i];
          cardsSorted[i] = cardsSorted[min];
          cardsSorted[min] = tmp;
          displayCardsSorted(cardsSorted, step);
          step++;
        }
      }
    }

  function displayCardsSorted(cardsSorted, step) {
    const cardContainerSorted = document.createElement('div');

    cardContainerSorted.classList.add('card-container');


    const title = document.createElement('p');
    title.textContent = `sort ${step}`;
    cardContainerSorted.appendChild(title);



    for (let i = 0; i < cardsSorted.length; i++) {

      const card = document.createElement('div');

      card.classList.add('card');

      const numeroCarta = document.createElement('p')
      numeroCarta.innerHTML = cardsSorted[i][0]
      numeroCarta.classList.add('numeroC')

      const paloRandom1 = document.createElement('p');
      paloRandom1.innerHTML = cardsSorted[i][1]
      paloRandom1.classList.add('palo1')

      const paloRandom2 = document.createElement('p')
      paloRandom2.innerHTML = cardsSorted[i][1]
      paloRandom2.classList.add('palo2')

      if (cardsArray[i][1] === "&hearts;" || cardsArray[i][1] === "&diams;") {
        paloRandom1.classList.add('red');
        paloRandom2.classList.add('red');
      }

      card.appendChild(paloRandom1);
      card.appendChild(numeroCarta);
      card.appendChild(paloRandom2);
      cardContainerSorted.appendChild(card);

    }
    document.body.appendChild(cardContainerSorted)

  }



});