const Transaction =require('../models/Transaction.js');

exports.deleteTransaction = async (req, res) => {
    try{
        const id = req.params.id;
        console.log(id)
        await Transaction.findByIdAndDelete({"_id":id});
        res.status(200).send({
            status:true,
            message:"Transaction Deleted Successfully"
        })
        
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            message:"Server Error"
        })
    }
}