
const User=require("../Model/User")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const userSignUp=async(req,res)=>{
    const {email,password}=req.body
   
   try{
    if(!email || !password){
        return res.status(400).json({message:"Email and password can't be null"})
    }
    else{
        let user=await User.findOne({email})
        if(user){
            return res.status(400).json({message:`User with this email ${email} already exists`})

        }
        const hashedPass=await bcrypt.hash(password,10)
        const newUser=await User.create({
            email,password:hashedPass
        })

        let token=jwt.sign({email,id:newUser._id},process.env.SECRET_KEY,{expiresIn:'1h'})
        return res.status(200).json({token,newUser})
    }
   } 
   catch(error){
    return res.status(500).json({message:`server error ${error}`})
   }
}
const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email or password can't be null" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email, id: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

   
    const { password: _, ...userWithoutPassword } = user.toObject();

    return res.status(200).json({ token, user: userWithoutPassword });

  } catch (error) {
    return res.status(500).json({ message: `Server error: ${error.message}` });
  }
};

const getUser=async(req,res)=>{
    
    try{
        const user=await User.findById(req.params.id);
        if(!user){
            return res.status(400).json({message:"Not found"})
        }
        else{
            return res.status(200).json({email:user.email})
        }
    }
    catch(error){
        return res.status(500).json({message:`server error`})
    }
}
module.exports={
    userLogin,
    userSignUp,
    getUser
}