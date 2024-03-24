const Tutorial = require("../models/turorialSchema");
const User = require("../models/userSchema");

exports.createTutorial = async (req, res) => {
try{  const isAdmin = await checkAdmin(req);
    if (!isAdmin) {
        return res.status(401).json({ message: "Unauthorized: Only admin can create a tutorial" });
    }
    const existingTutorial = await Tutorial.findOne({ title: req.body.title });
    if (existingTutorial) {
        return res.status(409).json({ message: "Tutorial title already exists" });
    }
    const newTutorial = await Tutorial.create({
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
    });
    return res.status(201).json({ data: newTutorial, message: "Tutorial created successfully" });


}catch(err){
 console.log(err);
 res.status(500).json({message:err.message});
}
};
exports.deleteTutorial = async (req, res) => {
    try {
        const isAdmin = await checkAdmin(req);
        if (!isAdmin) {
            return res.status(401).json({ message: "Unauthorized: Only admin can delete a tutorial" });
        }

        const tutorialId = req.params.id; 
        const deletedTutorial = await Tutorial.findByIdAndDelete(tutorialId);
        if(!tutorialId){
            return res.status(400).json({ message: "tutorial is not found" });
           }
        return res.status(200).json({ message: "Tutorial deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server Error" });
    }
};

exports.updateTutorial = async (req, res) => {
    try {
        const isAdmin = await checkAdmin(req);
        if (!isAdmin) {
            return res.status(401).json({ message: "Unauthorized: Only admin can update a tutorial" });
        }
 
        const tutorialId = req.params.tutorialId;
       if(!tutorialId){
        return res.status(400).json({ message: "tutorial is not found" });
       }
        
        const updatedTutorial = await Tutorial.findByIdAndUpdate(tutorialId, {
            title: req.body.title,
            description: req.body.description,
            author: req.body.author,
        }, { new: true });
        

        return res.status(200).json({ message: "Tutorial updated successfully", tutorial: updatedTutorial });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server Error" });
    }
};

const checkAdmin =async (req) =>{
    try{
        const user = await User.findByOne({_id:req.user._id});
        if (!user|| user.role!=="admin"){
            return false;
        }
        else {
            return true;
        }

    }catch(err){
        console.log(err);
    
}
};