import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  BrowserRouter,
  useNavigate,
  useParams,
} from "react-router-dom";

import ColorList from "./ColorList";
import NewColorForm from "./NewColorForm";
import Color from "./Color";

function RoutesComponent() {
  const initialColors = JSON.parse(localStorage.getItem("colors")) || {
    red: "#FF0000",
    green: "#00FF00",
    blue: "#0000FF",
  };
  const [colors, updateColors] = useState(initialColors);

  useEffect(
    () => localStorage.setItem("colors", JSON.stringify(colors)),
    [colors]
  );

  function handleAdd(newColorObj) {
    updateColors((prevColors) => ({ ...prevColors, ...newColorObj }));
  }

  function CurrentColor() {
    const { color } = useParams();
    const hex = colors[color];
    let navigate = useNavigate();

    if (!hex) {
      navigate("/colors");
      return null;
    }

    return <Color hex={hex} color={color} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/colors" element={<ColorList colors={colors} />} />
        <Route
          path="/colors/new"
          element={<NewColorForm addColor={handleAdd} />}
        />
        <Route path="/colors/:color" element={<CurrentColor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesComponent;
