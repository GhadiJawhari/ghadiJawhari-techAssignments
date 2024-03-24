const User= require ("../models/userSchema");
const Review= require ("../models/reviewSchema");
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
exports.CreateReview = async (req, res) => {
    try {
        const user = await  User.findOne({id:req.user._id});
        if (!user) {
            return res.status(401).json({ message: "user is not found" });
        }
        const newReview=Review.create({
            reviewOwner:user._id,
            product_ID:req.body.product_ID,
            reviewRating:req.body.Rating,
            reviewText:req.body.Text,
            ReviewedAt:new Date(),
        });
        return res.status(201).json({ data: newDiscount, message: "Review created successfully" });
        
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server Error" });
    }
};

exports.DeleteReview = async (req, res) => {
    try {
        const user = await  User.findOne({id:req.user._id});
        if (!user) {
            return res.status(401).json({ message: "user is not found" });
        }
        const reviewId = req.params.reviewId;
        if (!reviewId) {
         
            return res.status(404).json({ message: "Review not found" });
        }
     const deletedReview = await Review.findByIdAndDelete(reviewId);
     return res.status(200).json({ message: "Review deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server Error" });
    }
};

exports.UpdateReview = async (req, res) => {
    try {
        const user = await  User.findOne({id:req.user._id});
        if (!user) {
            return res.status(401).json({ message: "user is not found" });
        }
        const reviewId = req.params.reviewId;
        if (!reviewId) {
            return res.status(404).json({ message: "Review not found" });
        }
        const updatedReview = await Review.findByIdAndUpdate(reviewId, {
            reviewRating: req.body.rating,
            reviewText: req.body.text,
            updatedAt: new Date()
        }, { new: true });
        
        return res.status(200).json({ message: "Review updated successfully", review: updatedReview });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server Error" });
    }
};