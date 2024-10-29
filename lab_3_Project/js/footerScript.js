const tekst = "Paweł Gałczyński";
const myParagraph = document.getElementsByClassName("Myname")[0];

function dodajLitery() {
  let index = 0;

  const dodajLiterki = setInterval(() => {
    if (index < tekst.length) {
      myParagraph.textContent += tekst[index];
      index++;
    } else {
      clearInterval(dodajLiterki);
      myParagraph.classList.add("pulsuj");
    }
  }, 100);
}

setInterval(() => {
  myParagraph.textContent = ""; // Czyści zawartość przed każdym nowym cyklem
  myParagraph.classList.remove("pulsuj"); // Usuwa klasę animacji, aby ją zresetować
  dodajLitery(); // Wywołuje funkcję dodającą litery
}, 5000);

// Wywołaj dodajLitery po załadowaniu
dodajLitery();
