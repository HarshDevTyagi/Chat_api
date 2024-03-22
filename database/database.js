require("dotenv").config();
const mongoose=require("mongoose");


//url
const MONODBB_URI="mongodb+srv://harshdevtyagi56481:harsh56481@cluster0.hnswjxv.mongodb.net/";
const connectToDB =async()=>{
    try {
        var output;
        await mongoose.connect(MONODBB_URI,).then((err,db)=>{
            if(err) throw err;
            output=db;
        });
        console.log("DB Connected");
        return output;
    } catch (error) {
        console.log(error);
    }
};

connectToDB();