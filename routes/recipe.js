
const express=require('express')
const router=express.Router()

const {getRecipes,editRecipe,getRecipeById,addRecipe,deleteRecipe}=require('../controller/recipeController')

router.get("/",getRecipes)
router.get("/:id",getRecipeById)
router.post("/",addRecipe)
router.put("/:id",editRecipe)
router.delete("/:id",deleteRecipe)


module.exports=router