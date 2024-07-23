import Header from "../components/Header";
import { useEffect, useState } from 'react';
import Footer from "./Footer";

export default function RecipeForm() {
  useEffect(() => {
    // Création des regex 
    const min = /^\d{1,3}$/;
    const Nomrecette = /^[\p{L}\s]+$/u;
    const Dico = /^[a-zA-Z0-9À-ÖØ-öø-ÿ.,;:!?'"()\[\]{}\-_\s]+$/;

    // Sélection des inputs
    let inputs = document.querySelectorAll('input, textarea, select');

    // Fonction de validation
    const validateInput = (input:any) => {
      let Inputvalid = false;
      if (input.name === 'Temps') {
        Inputvalid = min.test(input.value);
      } else if (input.name === 'Nom') {
        Inputvalid = Nomrecette.test(input.value);
      } else if (input.name === 'Ingrediens' || input.name === 'desc') {
        Inputvalid = Dico.test(input.value);
      } else {
        Inputvalid = true; // Pour les autres inputs ou selects
      }

      input.style.backgroundColor = Inputvalid ? '#9ACD32' : '#F08080';
    };

    // gestionnaire d'evenement a chaque input 
    inputs.forEach(input => {
      input.addEventListener('input', (e) => validateInput(e.target));
    });

    // Nettoyage
    return () => {
      inputs.forEach(input => {
        input.removeEventListener('input', (e) => validateInput(e.target));
      });
    };
  }, []);

  const [msg, setMsg] = useState('');

  const [formData, setFormData] = useState({
    image: '',
    Nom: '',
    Temps: '',
    categories: '',
    Ingrediens: '',
    desc: '',
  });

  const submitForm = async (e: any) => {
    e.preventDefault();

    const response = await fetch('db.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setMsg('Recette ajoutée avec succès');

      setFormData({
        image: '',
        Nom: '',
        Temps: '',
        categories: '',
        Ingrediens: '',
        desc: '',
      });
    } else {
      console.error('error');
    }
    console.log('Form data ok:', formData);
  };

  const changeForm = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  let category = ['Française', 'Portugaise', 'Asiatique'];

  return (
    <>
      <Header />
      <section className="form-add">
        <form onSubmit={submitForm}>
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <br />
            <input type="text" id="image" name="image" onChange={changeForm} />
          </div>
          <div className="form-group">
            <label htmlFor="Nom">Nom de la recette</label>
            <br />
            <input type="text" id="Nom" name="Nom" value={formData.Nom} onChange={changeForm} />
          </div>
          <div className="form-group">
            <label htmlFor="Temps">Temps de préparation</label>
            <input type="text" id="Temps" name="Temps" value={formData.Temps} onChange={changeForm} />
          </div>
          <div className="form-group">
            <label htmlFor="categories">Catégorie</label>
            <select id="categories" name="categories" value={formData.categories} onChange={changeForm}>
              <option value="">Choisissez </option>
              {category.map((categoryx, index) => (
                <option key={index} value={categoryx}>{categoryx}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="Ingrediens">Ingrédients</label>
            <input type="text" id="Ingrediens" name="Ingrediens" value={formData.Ingrediens} onChange={changeForm} />
          </div>
          <div className="form-group">
            <label htmlFor="desc">Description</label>
            <textarea id="desc" name="desc" value={formData.desc} onChange={changeForm}></textarea>
          </div>
          <button type="submit">Ajouter la recette </button>
          {msg}
        </form>
      </section>
      <Footer />
    </>
    
  );
}
