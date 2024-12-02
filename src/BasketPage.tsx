import React from "react";
import { Pizza } from "./App";
import "./Basket.css";
import { Drink } from "./App";
import { getPizzaFullPrice } from "./PizzaPage";
import { getDrinkFullPrice } from "./DrinkPage";
import { clear } from "console";
interface BasketPageProps {
  pizzas: Pizza[];
  drinks: Drink[];
}
function clearBasket() {
  localStorage.setItem("basketPizzas", JSON.stringify([]));
  localStorage.setItem("basketDrinks", JSON.stringify([]));
  document.location.reload();
}
function BasketPage({ pizzas, drinks }: BasketPageProps) {
  return (
    <div className="basket-container">
      <h2>Ваш кошик</h2>
      {pizzas.map((pizza, index) => (
        <div className="basket-item" key={index}>
          <img src={pizza.img} alt="Pizza" className="pizza-image" />
          <div className="pizza-details">
            <p>{pizza.name}</p>
            <p>
              {pizza.sm} см, {pizza.tisto} тісто
            </p>
          </div>
          <h2 className="pizza-price">{getPizzaFullPrice(pizza)} ₴</h2>
        </div>
      ))}
      {drinks.map((drinks, index) => (
        <div className="basket-item" key={index}>
          <img className="pizza-image" src={drinks.img} />
          <div className="pizza-details">
            <p>{drinks.name}</p>
            <p>{drinks.size}</p>
          </div>
          <h2 className="pizza-price">{getDrinkFullPrice(drinks)} ₴</h2>
        </div>
      ))}
      <div className="basket-footer">
        <div className="total-price">
          До сплати:{" "}
          {pizzas.reduce(
            (total, pizza) => total + getPizzaFullPrice(pizza),
            0
          ) +
            drinks.reduce(
              (total, drink) => total + getDrinkFullPrice(drink),
              0
            )}{" "}
          грн.
        </div>
        <button className="order-button">Зробити замовлення</button>
        <button onClick={clearBasket}>Очистити</button>
      </div>
    </div>
  );
}

export default BasketPage;
