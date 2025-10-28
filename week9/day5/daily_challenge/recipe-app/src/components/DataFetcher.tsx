// src/components/DataFetcher.tsx
import React, { useEffect, useState } from "react";

export interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
}

interface DataFetcherProps {
  apiUrl: string; // l'URL de l'API à récupérer
}

const DataFetcher: React.FC<DataFetcherProps> = ({ apiUrl }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRecipes(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  if (loading) return <p>Loading recipes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {recipes.map((recipe) => (
        <div key={recipe.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h2>{recipe.title}</h2>
          <h4>Ingredients:</h4>
          <ul>
            {recipe.ingredients.map((ing, index) => (
              <li key={index}>{ing}</li>
            ))}
          </ul>
          <h4>Instructions:</h4>
          <p>{recipe.instructions}</p>
        </div>
      ))}
    </div>
  );
};

export default DataFetcher;
