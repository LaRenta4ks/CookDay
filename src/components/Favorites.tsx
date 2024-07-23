import Header from "../components/Header";
import { useEffect, useState } from 'react';
import Footer from "./Footer";
import { Recette } from './interfaces/Recette';

const Favorites = () => {
  const [favorites, setFavorites] = useState<Recette[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  const removeFavorite = (id: number) => {
    let updatedFavorites = favorites.filter((fav: Recette) => fav.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  if (favorites.length === 0) {
    return (
      <>
        <Header />
        <div className="favorites-page">
          <p>Vous n'avez pas encore de recettes favorites.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="favorites-page">
        <h2>Vos recettes favorites</h2>
        <div className="favorites-list">
          {favorites.map((recette) => (
            <div key={recette.id} className="favorite-recipe">
              <img alt={recette.title} src={recette.img} className="favorite-image" />
              <h3>{recette.title}</h3>
              <p>{recette.description}</p>
              <button onClick={() => removeFavorite(recette.id)}>Retirer des favoris</button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Favorites;
