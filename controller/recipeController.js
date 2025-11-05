const Recipes=require("../Model/Recipe")

const getRecipes=async(req,res)=>{
     const recipes=await Recipes.find()
     return res.json(recipes)
}
const getRecipeById=async(req,res)=>{
     
}
const addRecipe=async(req,res)=>{
     const {title,ingredients,instructions,time}=req.body
     if(!title||!instructions||!ingredients){
        res.json({message:"Required fields cant be empty"})
        
     }
     const newRecipe=await Recipes.create({
        title,ingredients,instructions,time
     })
     return res.json(newRecipe)
}
const editRecipe=(req,res)=>{
     res.json({message:"Hello edit"})
}
const deleteRecipe=(req,res)=>{
     res.json({message:"Hello delete"})
}







module.exports={
    getRecipes,
    addRecipe,
    getRecipeById,
    deleteRecipe,
    editRecipe
    
}