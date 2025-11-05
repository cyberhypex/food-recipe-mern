const getRecipes=(req,res)=>{
     res.json({message:"Hello"})
}
const getRecipeById=(req,res)=>{
     res.json({message:"Hello by id"})
}
const addRecipe=(req,res)=>{
     res.json({message:"Hello add"})
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