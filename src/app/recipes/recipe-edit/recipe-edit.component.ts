import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit{
  
  id:number;
  editmode=false;
  recipeForm:FormGroup;
  form: FormGroup;
  constructor(private fb: FormBuilder,
              private route:ActivatedRoute,
              private recipeService:RecipeService,
              private router:Router ){
    this.form = this.fb.group({
      items: this.fb.array([])  // Initialize the FormArray
    });
  }
  ngOnInit() {
    this.route.params.subscribe(
      (params:Params)=>{
        this.id=+params['id'];
        this.editmode= params['id'] !=null;
        this.initForm();
      }
    )
  }
  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  private initForm()
  {
    let recipeName='';
    let recipeDescription='';
    let recipeImagePath='';
    if(this.editmode)
      {
        const recipe=this.recipeService.getRecipe(this.id);
        recipeName=recipe.name;
        recipeDescription=recipe.description;
        recipeImagePath=recipe.imagePath;
        if(recipe['ingredients'])
          {
          for(let ingredient of recipe.ingredients)
            {
              this.items.push(this.fb.group({
                'name':new FormControl(ingredient.name,Validators.required),
                'amount':new FormControl(ingredient.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
              }));
            }
          }
      }
    this.recipeForm=new FormGroup({
      'name':new FormControl(recipeName,Validators.required),
      'description':new FormControl(recipeDescription,Validators.required),
      'imagePath':new FormControl(recipeImagePath,Validators.required),
      'ingredients':this.items

      
    });

  }

  onCancel()
  {
    this.router.navigate(['../'],{relativeTo:this.route})
  }
  onSubmit()
  {
    /*const newRecipe=new Recipe(
      this.recipeForm.value('name'),
      this.recipeForm.value('description'),
      this.recipeForm.value('imagePath'),
      this.recipeForm.value('ingredients'));*/

    if(this.editmode)
    {
      this.recipeService.updateRecipe(this.recipeForm.value,this.id);
    }
    else
    {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }
  onAddIngredient()
  {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name':new FormControl(null,Validators.required),
      'amount':new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
    }))
  }
  onDeleteIngredient(index:number)
  {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
