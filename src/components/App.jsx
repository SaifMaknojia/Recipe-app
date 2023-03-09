import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import RecipeDetails from "./RecipeDetails";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="recipe/:id" element={<RecipeDetails />} />
    </Routes>
  );
};

export default App;
