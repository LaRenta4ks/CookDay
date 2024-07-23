import { useEffect, useState } from "react";
import { Recette } from "./interfaces/Recette";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import { NavLink } from 'react-router-dom';

function App() {
  const [data, setData] = useState<Recette[]>([]);
  const [favorites, setFavorites] = useState<Recette[]>([]);

  const getRecettes = async () => {
    try {
      const response = await fetch("/db.json");
      const result = await response.json();
      setData(result.Recettes);
      console.log(result);
    } catch (error) {
      alert('Echec du fetch');
    }
  }

  useEffect(() => {
    getRecettes();
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  const toggleFavorite = (recette: Recette) => {
    let updatedFavorites;
    if (favorites.some((fav) => fav.id === recette.id)) {
      updatedFavorites = favorites.filter((fav) => fav.id !== recette.id);
    } else {
      updatedFavorites = [...favorites, recette];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  if (data.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Header />
      <section className="section-principale">
        <div className="conteneur">
          <div className="flex-colonne">
            <div className="barre-titre">
              <div className="barre-couleur"></div>
            </div>
            <div background="./public/fruits-et-legumes.jpeg">  
              <div className="entete">
                <h1 className="titre">CookDay</h1>
                <p className="sous-titre">Les Meilleurs Recettes des 4 coins du monde réuni dans 1 seul site !</p>
              </div>
            </div>
            <div className="recherche">
              <div>
                <h1>On cuisine quoi aujourd'hui ?</h1>
                <input type="search" placeholder="Trouver votre recette ici..." />
              </div>
            </div>
            <div className="ajouter-recette">
              <NavLink to="/Recipeform" className="ajouter-recette-lien">
                Ajouter une recette
              </NavLink>
            </div>
            <div className="all">
              <h2>Toutes nos recettes :</h2>
            </div>
          </div>
          <div className="liste-recettes">
            {data.map((recette) => (
              <div className="carte-recette" key={recette.id}>
                <figure>
                  <div className="image-conteneur">
                    <img alt="content" className="image" src={recette.img + `?random=` + recette.id} />
                  </div>
                  <figcaption className="categorie">{recette.category}</figcaption>
                </figure>
                <h2 className="titre-recette">{recette.title}</h2>
                <p className="description">{recette.description}</p>
                <p className="ingredients">{recette.ingredients.join(', ')}</p>
                <ol className="instructions">
                  {recette.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
                <h4 className="temps-preparation">{recette.prepTime} minutes</h4>
                <h4 className="portions">{recette.servings} portions</h4>
                <a href={"/" + recette.id} className="lien-detail">Learn More
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="icone-detail" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
                <button onClick={() => toggleFavorite(recette)}>
                  {favorites.some((fav) => fav.id === recette.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default App;
