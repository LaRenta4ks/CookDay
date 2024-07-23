import { useEffect, useState } from "react";
import { Recette } from "../interfaces/Recette";
import { NavLink, useParams } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./RecipeDetail.css";

const Detail = () => {
    const [data, setData] = useState<Recette[]>([]);
    const [recette, setRecette] = useState<Recette | null>(null);
    const { id } = useParams<{ id: string }>();

    const getAllRecettes = async () => {
        try {
            const response = await fetch(`/db.json`);
            const result = await response.json();
            if (result.Recettes.length > 0) {
                setData(result.Recettes);
            } else {
                alert('Recette non trouvée');
            }
        } catch (error) {
            alert('Échec du fetch');
        }
    };

    useEffect(() => {
        getAllRecettes();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            const foundRecette = data.find(recette => recette.id === Number(id));
            setRecette(foundRecette || null);
        }
    }, [data, id]);

    if (data.length === 0) {
        return <div>Chargement...</div>;
    }

    if (!recette) {
        return <div>Recette non trouvée</div>;
    }

    return (
        <>
            <Header />
            <section className="section-detail">
                <div className="flex-container">
                    <div className="image-container">
                        <img alt={recette.title} className="image" src={recette.img} />
                    </div>
                    <div className="content-container">
                        <div className="content">
                            <h3 className="title">{recette.title}</h3>
                            <p className="description">{recette.description}</p>
                            <div className="info">
                                <p><strong>Ingrédients:</strong> {recette.ingredients.join(', ')}</p>
                                <p><strong>Instructions:</strong></p>
                                <ol>
                                    {recette.instructions.map((instruction, index) => (
                                        <li key={index}>{instruction}</li>
                                    ))}
                                </ol>
                                <p><strong>Temps de Préparation:</strong> {recette.prepTime} minutes</p>
                                <p><strong>Portions:</strong> {recette.servings} personnes</p>
                                <p><strong>Catégorie:</strong> {recette.category}</p>
                                <p><strong>Date de création:</strong> {recette.createdAt}</p>
                                <p><strong>Signature:</strong> {recette.signature}</p>
                            </div>
                            <NavLink to="/" className="back-link">
                                Revenir à l'accueil
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="back-icon" viewBox="0 0 24 24">
                                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                                </svg>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Detail;
