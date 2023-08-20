import { useState, useEffect } from "react";
import video from "./food.mp4";
import "./App.css";
import RecipesComponent from "./Recipes.Component";

function App() {
  const [mySearch, setMySearch] = useState("");
  const [myRecipes, setMyRecipes] = useState([]);
  const [wordSubmitted, setWordSubmitted] = useState("potato");

  useEffect(() => {
    const getRecipe = async () => {
      const response = await fetch(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${wordSubmitted}%20&app_id=d7ed54a1&app_key=%203b9e117b8802c95913d4412490d601f6`
      );
      const data = await response.json();
      setMyRecipes(data.hits);
    };
    getRecipe();
  }, [wordSubmitted]);

  const myRecipeSearch = (e) => {
    setMySearch(e.target.value);
  };

  const finalSearch = (e) => {
    e.preventDefault();
    setWordSubmitted(mySearch);
  };

  return (
    <div className="App">
      <div className="container">
        <video autoPlay muted loop>
          <source src={video} type="video/mp4" alt="video"/>
        </video>
        <h1>Find A Recipe</h1>
      </div>

      <div className="container">
        <form onSubmit={finalSearch}>
          <input className="search" onChange={myRecipeSearch} value={mySearch} alt="video"/>
        </form>
      </div>

      <div className="container">
        <button onClick={finalSearch}>
          <img src="https://img.icons8.com/fluency/48/000000/fry.png " alt="icon"/>
        </button>
      </div>

      {myRecipes.map((element, index) => (
        <RecipesComponent
          key={index}
          label={element.recipe.label}
          image={element.recipe.image}
          calories={element.recipe.calories}
          ingredients={element.recipe.ingredientLines}
        />
      ))}
    </div>
  );
}

//https://api.edamam.com/api/recipes/v2?type=public&q=vegetables%20&app_id=d7ed54a1&app_key=%203b9e117b8802c95913d4412490d601f6

export default App;
