import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import DrinkPage from "./DrinkPage";
import PizzaPage from "./PizzaPage";
import BasketPage from "./BasketPage";

export interface Pizza {
  img: string;
  name: string;
  sm: number;
  tisto: string;
  price: number;
  ingredients: string;
}

export interface Drink {
  img: string;
  name: string;
  size: string;
  price: number;
}

function App() {
  let [basketPizzas, setBasketPizzas] = useState(
    JSON.parse(
      localStorage.getItem("basketPizzas")
        ? localStorage.getItem("basketPizzas")!
        : "[]"
    )
  );

  let [basketDrinks, setBasketDrinks] = useState(
    JSON.parse(
      localStorage.getItem("basketDrinks")
        ? localStorage.getItem("basketDrinks")!
        : "[]"
    )
  );

  return (
    <Router>
      <header>
        <div className="header-container">
          <div className="logo">
            <img className="header-img" src="logo.png" alt="Logo" />
            <div className="header-text">
              <h1 className="header-name">My Pizza™</h1>
              <p className="header-undername">Безкоштовна доставка</p>
            </div>
          </div>
          <div className="contact">
            <h2 className="header-phnum">(012) 345-67-80</h2>
            <p className="header-info">Працюємо з 10:00 до 22:00</p>
          </div>
          <Link to="/Basket">
            <button className="header-basket">
              <img
                className="header-basket-img"
                src="basket.png"
                alt="Basket"
              />{" "}
              Кошик
            </button>
          </Link>
        </div>
      </header>
      <div className="menu-under-head">
        <Link to="/" className="menu-pizza">
          Піца
        </Link>
        <Link to="/drinks" className="menu-drink">
          Напої
        </Link>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <PizzaPage setBasket={setBasketPizzas} basket={basketPizzas} />
          }
        />
        <Route
          path="/drinks"
          element={
            <DrinkPage setBasket={setBasketDrinks} basket={basketDrinks} />
          }
        />
        <Route
          path="/Basket"
          element={<BasketPage pizzas={basketPizzas} drinks={basketDrinks} />}
        />
      </Routes>
      <footer>
        <p>Контакти: Facebook | Instagram | Телеграм</p>
      </footer>
    </Router>
  );
}

export default App;
