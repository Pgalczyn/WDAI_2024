import Product from "./components/koszyk/produkt";
import Basket from "./components/koszyk/koszyk";
import BasketNew from "./components/koszyk/nowyKoszyk";
import Licznik from "./components/liczniki/licznik";
import NowyLicznik from "./components/liczniki/NowyLicznik";
import Form from "./components/formularze/Formularz";
import Haslo from "./components/formularze/Haslo";
import Logowanie from "./components/formularze/Logowanie";
import Ternary from "./components/inne/Ternary";
import Aktualizacja from "./components/inne/Aktualizacja";
import Students from "./components/studenci/Students";
import StudentManager from "./components/studenci/StudentManager";
import LicznikEffect from "./components/efekty/LicznikEffect";
import Title from "./components/efekty/Tytul";
import Odliczanie from "./components/efekty/Odliczanie";
import Komentarz from "./components/produkty/Komentarz";
import Komentarze from "./components/produkty/Komentarze";

function App() {
  const user = {
    id: 1,
    username: "Janek",
    fullName: "Jan Kowalski",
  };
  return (
    <div>
      <Komentarze></Komentarze>
    </div>
  );
}

export default App;
