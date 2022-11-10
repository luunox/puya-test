/** @format */
// @ts-nocheck

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(3);
  const { login } = useSelector((state) => state.app);

  useEffect(() => {
    setTimeout(() => {
      if (!login) navigate(`/login`);
      else navigate(`/employees`);
    }, 3000);
  }, []);

  setInterval(() => setCounter(counter - 1), 1000);

  return (
    <div id="error-page">
      <div>
        <h1>Oops!</h1>
        <p>Lo sentimos, ha ocurrido un error inesperado.</p>
        <i>Página no encontrada</i>
        <p>Redireccionando en {counter}</p>
      </div>
    </div>
  );
}
