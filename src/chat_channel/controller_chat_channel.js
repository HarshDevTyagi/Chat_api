const { json } = require("express");
const {usermsgmodel,userdetailmodel, reacted_atmodel, seen_atmodel, delivery_atmodel, chatchannel, createChatChannelModel, chatdetail_model, chatdetailcreated, createChatDetail, saveDataInCustomCollection, findOrCreateUserDetail, msgupdatefunction, remove_themsg, mutedfunctio, adminfunctio, userfunction, seenfunction, deliveryfunction, reactionfunction, fetchthemsg, activefunctio, delete_collection_themsg, deleteCollection, loginfunction} = require("./model");


const createNewmsg= async(data,harsh)=>{
    try {
        const {message}=data ;
       
        console.log("harshtyagi",JSON.stringify(message.replyby),"harshtygai");
        
    //    harshtyagi {"collection_name":"1710296778238","message":"Hello","send_by":"Alice","time":"2024-03-19",
    // "message_type":"Text","_replyto":"harshtyagkjhv shfuhvki","message_id":"messageId123",
    // "message_reply_type":"Text","replyto":"Reply To","replyby":"Bob"} harshtygai
       
        
        const newUser= new usermsgmodel(message.collection_name,
            message.message,
            message.send_by,
            message.time,
            message.message_type,
            message ._replyto,
            message. message_id,
            message.message_reply_type,
            message. replyto,
            message.replyby);
        console.log("controlller"+newUser);

    
        const createdUser=await newUser.save();
        return createdUser;

        
    } catch (error) {
        res.status(400) .json({
            status:0,
            msg:error.message,
            rescode:400

                }); 
        
    }
};

const delivery_atcontroller = async (data) => {
    try {
        const  {delivery_msg} = data;
        console.log("controller"+delivery_msg.collection_name,delivery_msg.message,delivery_msg.deliver_to);
        console.log(delivery_msg);
        const xyz =  new deliveryfunction(delivery_msg.collection_name);
      
        
       
        const updatedDocument = await xyz.findOneAndUpdate(
            { message: delivery_msg.message }, 
            { $push: { delivery_user: delivery_msg } }, // Push the entire seen_byuser object
            { new: true } // Return the updated document
        );
        console.log("updated",updatedDocument);
        
        if (!updatedDocument) {
            throw new Error('Document not found');
        }
        
        return updatedDocument;
      
    
       
    } catch (error) {
        res.status(400).json({
            status: 0,
            msg: error.message,
            rescode: 400
        });
    }
};



const seen_atcontroller = async (data) => {
    try {
        const { seen_byuser } = data;
        
        console.log('seen_byuser:', seen_byuser); // Add this line for debugging
        const xy =  new seenfunction(seen_byuser.collection_name);
        
        // Update the document and directly assign the result to updateddocument
        const updatedDocument = await xy.findOneAndUpdate(
            { message: seen_byuser.message }, 
            { $push: { seen_user: seen_byuser } }, // Push the entire seen_byuser object
            { new: true } // Return the updated document
        );
        
        if (!updatedDocument) {
            throw new Error('Document not found');
        }
        
        return updatedDocument;
    } catch (error) {
        // Handle errors properly, either by throwing them or sending an appropriate response
        console.error('Error updating document:', error);
        throw error;
    }
};


const reaction_atcontroller = async (data) => {
    try {
        const  {userreaction}  = data;
        //const value = data.message; // Accessing the message property
        console.log("data"+ userreaction.collection_name); 
        const xyzx =  new reactionfunction(userreaction.collection_name);
        
        const updatedDocument = await xyzx.findOneAndUpdate(
            { message: userreaction.message }, 
            { $push: { reaction: userreaction } }, // Push the entire seen_byuser object
            { new: true } // Return the updated document
        );
        
        if (!updatedDocument) {
            throw new Error('Document not found');
        }
        
        return updatedDocument;
    } catch (error) {
        res.status(400).json({
            status: 0,
            msg: error.message,
            rescode: 400
        });
    }
};




const createNewuser= async(data)=>{
    try {
        const {user}=data ;
        var createdUser="";
        console.log(user.Email+"controller");

     const x =  new userfunction(user.collection_name);
     

     await x.findOne({ users: { $ne: null } }).then(async(check)=>{
            console.log("check");
            if(check == null){
                const newUser= new x({
                    users : [
                        user
                    ],
                });
                createdUser=await newUser.save();
            }
            else{
                console.log("else worked");
                await x.findOneAndUpdate(
                    { _id: check._id }, // Filter for the user you want to update
                    { $push: { users: user } }, // Use $push to add the new message to the array
                    { new: true }, // Option to return the updated document
                ).then((userpushed)=>{
                    console.log("else then worked "+ userpushed._id);
                    createdUser = userpushed;
                });
                console.log("else ended");
            }
        });
        console.log("returned from controller worked");
        return createdUser;

        
    } catch (error) {
        res.status(400) .json({
            status:0,
            msg:error.message,
            rescode:400

                }); 
        
    }
};


const chat_channel_created = async (data) => {
    try {
        const { user } = data;
        console.log("User Name:", user.Name);
        console.log("User Email:", user.Email);

        const unique_name_channel = `${Date.now()}`;
        const chatchannel = new createChatChannelModel(unique_name_channel, user.Name, user.Email);
        const collection = "users";
        const xyxx = new loginfunction(collection);
        const name = unique_name_channel;

        var createdUser = "";

        const userFound = await xyxx.findOne({ email: user.Email });

        if (userFound) {
            // If the user is found, update the document
            const userpushed = await xyxx.findOneAndUpdate(
                { email: user.Email }, // Filter for the user you want to update
                { $push: { chat: { collection_name_user: unique_name_channel } } }, // Use $push to add the new chat object to the array
                { new: true }
            );
            console.log("User updated:", userpushed);
            createdUser = userpushed;
        }

        console.log("returned from controller worked");

        const newuser_chat = await chatchannel.save();
        return { newuser_chat, createdUser };
    } catch (error) {
        console.error(error);
        throw error;
    }
};






const chat_detail_controller=async(data)=>{
    try {
        const {chat_detail}=data;
        console.log("chat detail "+JSON.stringify(chat_detail));
        // const newUser= new chatdetail_model({
        //    "Detail":chat_detail.Detail,
        //    "chat_channel_user":chat_detail.chat_channel_user
        // });
        //saveDataInCustomCollection( chat_detail.chat_channel_user,chat_detail.Detail);
        findOrCreateUserDetail(chat_detail.chat_channel_user,chat_detail.Detail);
        
      
    
        // const createdUser=await chatchannel.save();
        // return createdUser;

    } catch (error) {
        res.status(400) .json({
            status:0,
            msg:error.message,
            rescode:400
    }); 
    }
}


const updatemsg=async(data)=>{
    try {
        const {edi}=data;
       console.log(JSON.stringify(edi));

        msgupdatefunction(edi.collection_name,edi.messageid,edi.newmsg);

    } catch (error) {
        res.status(400) .json({
            status:0,
            msg:error.message,
            rescode:400
    });
    }
}
const rem=async(data)=>{
    try {
        const {remove}=data;
      // console.log(JSON.stringify(edi));

    return   remove_themsg(remove.collection_name,remove.id);

    } catch (error) {
        res.status(400) .json({
            status:0,
            msg:error.message,
            rescode:400
    });
    }
}

const muted_controller_fuction=async(data)=>{
    try {
        const {muteduser}=data;
      // console.log(JSON.stringify(edi));

    return   mutedfunctio(muteduser.collection_name,muteduser.id,muteduser.mute,muteduser.user_id);

    } catch (error) {
        res.status(400) .json({
            status:0,
            msg:error.message,
            rescode:400
    });
    }
}
// actiev staus

const active_controller_fuction=async(data)=>{
    try {
        const {active}=data;
      // console.log(JSON.stringify(edi));

    return   activefunctio(active.collection_name,active.id,active.active_status,active.user_id);

    } catch (error) {
        res.status(400) .json({
            status:0,
            msg:error.message,
            rescode:400
    });
    }
}
//admin controller 

const admin_controller_fuction=async(data)=>{
    try {
        const {admin_byuser}=data;
      // console.log(JSON.stringify(edi));

    return   adminfunctio(admin_byuser.collection_name,admin_byuser.id,admin_byuser.admin,admin_byuser.user_id);

    } catch (error) {
       throw error;
   
    }
}
//fetch

const fetchuser = async (data) => {
    try {
        console.log(data);
        const  {fetch}  = data;
        var createdUser = "";
        console.log(data);
        console.log( data.collection_name,
        );
        const xu = new userfunction(fetch.collection_name);

        const check = await xu.findOne({ users: { $ne: null } });

        if (check === null) {
            console.log("null from controller");
            createdUser = null;
        } else {
            createdUser = check;
        }

        console.log("returned from controller worked");
        return createdUser;
    } catch (error) {
        res.status(400).json({
            status: 0,
            msg: error.message,
            rescode: 400
        });
    }
};
// delete a collection

const delete_collection_message=async(data)=>{
    try {
        const delete_collection=data;
     console.log("uyfu");
    await userfunction(data.delete_collection.collection_name).findOne({users : {$ne : null}}).then(async(chat_users)=>{
        
        
        const usersList = chat_users.users;
        for (const user of usersList) {
            //console.log(user.Email);
           

            const model = loginfunction("users");
            await model.findOne({"email" : user.Email}).then(async(userDoc)=>{
                if(userDoc != null){
                var objElement = null;
                for(const obj of userDoc.chat){
                    if(obj.collection_name_user != null && obj.collection_name_user == data.delete_collection.collection_name){
                        objElement = obj;
                        console.log("object   :", objElement);
                        break;
                    }
                }
                 const output = await model.findOneAndUpdate(
                        { email: user.Email }, // Filter for the user you want to update
                        { $pull: { chat: objElement } }, // Use $push to add the new chat object to the array
                    );
                    console.log(output);
                }
            }); 
            
        }
        

    }); 

    return   deleteCollection(data.delete_collection.collection_name);

    } catch (error) {
        res.status(400) .json({
            status:0,
            msg:error.message,
            rescode:400
    });
    }
}

const logincollection= async(data)=>{
    try {
        const {user}=data ;
        var createdUser="";
        console.log(user.Email+"controller");

     const x =  new loginfunction(user.collection_name);
     

     await x.findOne({ users: { $ne: null } }).then(async(check)=>{
            console.log("check");
            if(check == null){
                const newUser= new x({
                    users : [
                        user
                    ],
                });
                createdUser=await newUser.save();
            }
            else{
                console.log("else worked");
                await x.findOneAndUpdate(
                    { _id: check._id }, // Filter for the user you want to update
                    { $push: { users: user } }, // Use $push to add the new message to the array
                    { new: true }, // Option to return the updated document
                ).then((userpushed)=>{
                    console.log("else then worked "+ userpushed._id);
                    createdUser = userpushed;
                });
                console.log("else ended");
            }
        });
        console.log("returned from controller worked");
        return createdUser;

        
    } catch (error) {
        res.status(400) .json({
            status:0,
            msg:error.message,
            rescode:400

                }); 
        
    }
};

module.exports={createNewmsg,createNewuser,reaction_atcontroller,seen_atcontroller,delivery_atcontroller,
    chat_channel_created,chat_detail_controller,updatemsg,rem,muted_controller_fuction,admin_controller_fuction,
    fetchuser,active_controller_fuction,delete_collection_message,logincollection};