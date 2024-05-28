import {Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";
@Injectable()
export class RecipeService{
    recipeChanged=new Subject<Recipe[]>();
    private recipes: Recipe[]=[
        new Recipe('A Test Recipe',
        'This is test recipe',
        'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505',
        [   new Ingredient('meat',5),
            new Ingredient('french fries',20)
        ]),
        
        new Recipe('Another Test Recipe',
        'This is test recipe',
        'https://th.bing.com/th/id/R.1f1a85b21ae795ce89af29e20e983cef?rik=81%2fKAaDZwdPhyg&pid=ImgRaw&r=0',
        [   new Ingredient('chicken',5),
            new Ingredient('rice',2)
        ])
    ]
    constructor(private slService:ShoppingListService)
    {}
    getRecipe(index:number)
    {
        return this.recipes[index];
    }
    getRecipes()
    {
        return this.recipes.slice();
    }
    addIngredientsToShoppingList(ingredients:Ingredient[])
    {
        this.slService.addIngredients(ingredients);
    }
    addRecipe(recipe:Recipe)
    {
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }
    updateRecipe(newRecipe:Recipe,index:number)
    {
        this.recipes[index]=newRecipe;
        this.recipeChanged.next(this.recipes.slice());

    }
    deleteRecipe(index:number)
    {
        this.recipes.splice(index,1);
        this.recipeChanged.next(this.recipes.slice());
    }
}