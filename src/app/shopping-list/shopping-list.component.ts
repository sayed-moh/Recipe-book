import { Component, OnDestroy, OnInit } from '@angular/core';
import {Ingredient} from'../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  ingredients :Ingredient[];
  private subscription:Subscription
  constructor(private slService:ShoppingListService)
  {

  }
  ngOnInit() {
    this.ingredients=this.slService.getIngredients(); 
    this.subscription=this.slService.ingredientChanged.subscribe(
      (ingredients:Ingredient[])=>{
        this.ingredients=ingredients; 
      }
    )
  }

  onEditing(index:number)
  {
    this.slService.startEditing.next(index);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
