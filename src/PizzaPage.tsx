import React, { FormEvent } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { Pizza } from "./App";
import { AnyARecord } from "dns";
import { useNavigate } from "react-router-dom";

interface PizzaPageProps {
  setBasket: React.Dispatch<React.SetStateAction<Pizza[]>>;
  basket: Pizza[];
}

export function getPizzaFullPrice(pizza: Pizza): number {
  let startPrice = pizza.price;
  if (pizza.sm == 25) {
    startPrice = startPrice - 50;
  }
  if (pizza.sm == 35) {
    startPrice = startPrice + 50;
  }
  return startPrice;
}

function PizzaPage({ basket, setBasket }: PizzaPageProps) {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);

  useEffect(() => {
    fetch(`./pizza.json`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPizzas(data);
      });
  }, []);
  const navigate = useNavigate();

  function changeSm(sm: number, index: number) {
    let newPizzas = [...pizzas];
    let pizza = newPizzas[index];
    let newPizza = { ...pizza, sm };
    newPizzas[index] = newPizza;
    setPizzas(newPizzas);
  }
  function changeTisto(tisto: string, index: number) {
    let newPizzas = [...pizzas];
    let pizza = newPizzas[index];
    let newPizza = { ...pizza, tisto };
    newPizzas[index] = newPizza;
    setPizzas(newPizzas);
  }
  function handleChage(
    index: number,
    event: React.FormEvent<HTMLSelectElement>
  ) {
    let tistoValue = event.currentTarget.value;
    changeTisto(tistoValue, index);
  }

  function submitPizzas(index: number) {
    let newBasket = [...basket];
    let pizza = pizzas[index];
    let newPizza = { ...pizza };
    newBasket.push(newPizza);
    setBasket(newBasket);
    localStorage.setItem("basketPizzas", JSON.stringify(newBasket));
    navigate("/Basket", { replace: true });
  }
  return (
    <section className="catalog">
      <div className="catalog-all">
        {pizzas.map((pizza, index) => (
          <div className="catalog-col" key={index}>
            <img className="pizza-img" src={pizza.img} alt={pizza.name} />
            <h2 className="pizza-name">{pizza.name}</h2>
            <div className="catalog-pizza-settinx">
              <div className="sizes">
                <button
                  onClick={() => changeSm(25, index)}
                  className={
                    pizza.sm === 25 ? "size-pizza active" : "size-pizza"
                  }
                >
                  25 см
                </button>
                <button
                  onClick={() => changeSm(30, index)}
                  className={
                    pizza.sm === 30 ? "size-pizza active" : "size-pizza"
                  }
                >
                  30 см
                </button>
                <button
                  onClick={() => changeSm(35, index)}
                  className={
                    pizza.sm === 35 ? "size-pizza active" : "size-pizza"
                  }
                >
                  35 см
                </button>
              </div>
              <div className="catalog-tisto">
                <p className="catalog-tisto-name">Тісто</p>
                <select
                  onChange={(event: React.FormEvent<HTMLSelectElement>) =>
                    handleChage(index, event)
                  }
                  value={pizza.tisto}
                  className="catalog-select"
                >
                  <option value="пишне">Пишне</option>
                  <option value="тонке">Тонке</option>
                </select>
              </div>
              <div className="catalog-price-order">
                <p className="price">{getPizzaFullPrice(pizza)}грн</p>
                <button
                  className="order-btn"
                  onClick={() => submitPizzas(index)}
                >
                  Замовити
                </button>
              </div>
            </div>
            <p className="catalog-info-pizza">{pizza.ingredients}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PizzaPage;
