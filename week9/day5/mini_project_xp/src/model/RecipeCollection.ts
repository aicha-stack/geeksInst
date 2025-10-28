// src/model/RecipeCollection.ts
import { RecipeItem } from "./RecipeItem";

export class RecipeCollection {
  private recipes: RecipeItem[] = [];
  private storageKey = "recipeBook";

  constructor() {
    this.loadFromLocalStorage();
  }

  addRecipe(recipe: RecipeItem): void {
    this.recipes.push(recipe);
    this.saveToLocalStorage();
  }

  removeRecipe(id: string): void {
    this.recipes = this.recipes.filter(r => r.id !== id);
    this.saveToLocalStorage();
  }

  toggleFavorite(id: string): void {
    const recipe = this.recipes.find(r => r.id === id);
    if (recipe) {
      recipe.isFavorite = !recipe.isFavorite;
      this.saveToLocalStorage();
    }
  }

  clearAll(): void {
    this.recipes = [];
    this.saveToLocalStorage();
  }

  getAllRecipes(): RecipeItem[] {
    return this.recipes;
  }

  private saveToLocalStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.recipes));
  }

  private loadFromLocalStorage(): void {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      this.recipes = JSON.parse(data);
    }
  }
}
