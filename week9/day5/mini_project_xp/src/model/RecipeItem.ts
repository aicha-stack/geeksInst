// src/model/RecipeItem.ts
import { v4 as uuidv4 } from "uuid";

export class RecipeItem {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  isFavorite: boolean;

  constructor(
    title: string,
    ingredients: string[],
    instructions: string,
    isFavorite = false
  ) {
    this.id = uuidv4();
    this.title = title;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.isFavorite = isFavorite;
  }
}
