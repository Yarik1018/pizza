import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Drink } from "./App";
import { useNavigate } from "react-router-dom";

interface DrinkPageProps {
  setBasket: React.Dispatch<React.SetStateAction<Drink[]>>;
  basket: Drink[];
}
export function getDrinkFullPrice(drink: Drink): number {
  let startPrice = drink.price;
  if (drink.size == "0.75") {
    startPrice = startPrice + 20;
  }

  return startPrice;
}
function DrinkPage({ basket, setBasket }: DrinkPageProps) {
  let [drinks, setDrinks] = useState<Drink[]>([]);

  useEffect(() => {
    fetch(`./drink.json`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDrinks(data);
      });
  }, []);
  function submitDrink(index: number) {
    let newBasket = [...basket];
    let drink = drinks[index];
    let newDrink = { ...drink };
    newBasket.push(newDrink);
    setBasket(newBasket);
    localStorage.setItem("basketDrinks", JSON.stringify(newBasket));
    navigate("/Basket", { replace: true });
  }
  const navigate = useNavigate();
  function changeSize(size: string, index: number) {
    let newDrinks = [...drinks];
    let drink = newDrinks[index];
    let newDrink = { ...drink, size };
    newDrinks[index] = newDrink;
    setDrinks(newDrinks);
  }
  function handleChage(
    index: number,
    event: React.FormEvent<HTMLSelectElement>
  ) {
    let sizeValue = event.currentTarget.value;
    changeSize(sizeValue, index);
  }

  return (
    <section className="catalog">
      <div className="drink-catalog-all">
        {drinks.map((drink, index) => (
          <div className="catalog-col-drink" key={index}>
            <img className="drink-img" src={drink.img} alt={drink.name} />
            <h2 className="drink-name">{drink.name}</h2>
            <h3 className="drink-size">
              {getDrinkFullPrice(drink)} ₴/{drink.size} Л
            </h3>
            <div className="drink-select-but">
              <select
                className="drink-select-ml"
                onChange={(event: React.FormEvent<HTMLSelectElement>) =>
                  handleChage(index, event)
                }
                value={drink.size}
              >
                <option value="0.5">0.5</option>
                <option value="0.75">0.75</option>
              </select>
              <br />
              <button
                className="drink-button-buy"
                onClick={() => submitDrink(index)}
              >
                <img className="drink-basket-img" src="basket.png" />В корзину
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DrinkPage;
