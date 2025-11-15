
const express=require('express')
const router=express.Router()

const {getRecipes,editRecipe,getRecipeById,addRecipe,deleteRecipe,upload}=require('../controller/recipeController')

router.get("/",getRecipes)
router.get("/:id",getRecipeById)
router.post("/",upload.single('file'),addRecipe)
router.put("/:id",editRecipe)
router.delete("/:id",deleteRecipe)


module.exports=router