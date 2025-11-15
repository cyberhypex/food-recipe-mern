const Recipes=require("../Model/Recipe")
const multer=require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const filename=Date.now()+'-'+file.fieldname
    cb(null, filename)
  }
})

const upload = multer({ storage: storage })
const getRecipes=async(req,res)=>{
     const recipes=await Recipes.find()
     return res.json(recipes)
}
const getRecipeById=async(req,res)=>{
     const recipe=await Recipes.findById(req.params.id);
     return res.json(recipe)

}
const addRecipe=async(req,res)=>{
     const {title,ingredients,instructions,time}=req.body
     if(!title||!instructions||!ingredients){
        res.json({message:"Required fields cant be empty"})
        
     }
     const newRecipe=await Recipes.create({
        title,ingredients,instructions,time,coverImage:req.file.filename
     })
     console.log(newRecipe)
     return res.json(newRecipe)
}
const editRecipe=async(req,res)=>{
     const {title,ingredients,instructions,time}=req.body
     
     let recipe=await Recipes.findById(req.params.id)
     try{if(recipe){
        await Recipes.findByIdAndUpdate(req.params.id,req.body,{new:true});
        return res.json({title,ingredients,instructions,time})
     }
    }
    catch(error){
        return res.status(404).json({message:`Food with ${req.params.id} not found `})
    }
     
}
const deleteRecipe=async(req,res)=>{
    const recipe=await Recipes.findById(req.params.id);
    try{
        if(recipe){
        await Recipes.findByIdAndDelete(req.params.id);
        return res.status(200).json({message:"Deleted successfully"})
    }
    return res.status(404).json({message:`No recipe with ${req.params.id} found`})
    }
    catch(error){
        return res.status(500).json({message:"Server error",error})
    }
    
}







module.exports={
    getRecipes,
    addRecipe,
    getRecipeById,
    deleteRecipe,
    editRecipe,
    upload
    
}