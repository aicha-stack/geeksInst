import axios from "axios";
import { Recipe } from "../types/types";


export const fetchRecipes = async (): Promise<Recipe[]> => {
  const response = await axios.get("https://api.example.com/recipes");
  return response.data;
};
