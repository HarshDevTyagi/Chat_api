const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const yourSchema = new mongoose.Schema({
    msg: {
        type: String,
        required: true
    },
   
});
function  fetchdataffunction(collection){
   
   // const seen_atmodel = mongoose.model('seen', seen,collection);
   
const pageination = mongoose.model('YourModel', yourSchema,collection);
return pageination ;

}
const pageination = mongoose.model('YourModel', yourSchema,"users");
function msgModelForCollection(collectionName) {
    const modelNames = mongoose.modelNames();
    if (modelNames.includes(collectionName)) {
        return mongoose.model(collectionName);
    } else {
        // Define the schema for the chat detail
        const UserSchemaformsg = new Schema({
            message:{
                type:String,
                $exists: true},
            reaction: {
                    type: Array,
                    default: [] 
                },
            seen_user: {
                    type: Array,
                    default: [] 
                },
            delivery_user: {
                    type: Array,
                    default: [] 
                }
        
        });
        // Create and return the Mongoose model for the given collection name
        return mongoose.model(collectionName, UserSchemaformsg);
    }
}
async function msgupdatefunction(collectionName, messageid,newmsg) {
    try {
        // Get the Mongoose model for the custom collection
        const UserDetailModel = msgModelForCollection(collectionName);
        // Find user detail in the collection
        let existingUserDetail = await UserDetailModel.findOne({ _id: messageid });
        if (!existingUserDetail) {
            // If user detail doesn't exist, create a new one
            console.log("not exist the message");
        } else {
            existingUserDetail.message = newmsg;
            existingUserDetail = await existingUserDetail.save();
            console.log(`User detail updated in ${collectionName}:`, existingUserDetail);
            return existingUserDetail;
        }
    } catch (error) {
        console.error('Error finding or creating user detail:', error);
    }
}
//delete function
// document.model.js
function remoevmsg(collectionName) {
   
    const modelNames = mongoose.modelNames();
    if (modelNames.includes(collectionName)) {
        return mongoose.model(collectionName);}
        else{
       new Schema({
            collection_name :String,
                
            id :String,
                  
           
        });
    }
        // Create and return the Mongoose model for the given collection name
        return mongoose.model(collectionName, UserSchemaformsg);
    }
//
async function remove_themsg(collectionName, id) {
    try {
        // Get the Mongoose model for the custom collection
        const UserDetailModel = remoevmsg(collectionName);
        // Find user detail in the collection
        let existingUserDetail = await UserDetailModel.findOneAndDelete({ _id: id });
        if (!existingUserDetail) {
            // If user detail doesn't exist, create a new one
            console.log("not exist the message");
        } else {
            return existingUserDetail;
        }
    } catch (error) {
        console.error('Error finding or creating user detail:', error);
    }
}
const replySchemaformsg=new Schema({
    _replyto:String,

    message_id:{
        type:String,
       $exists: true},

    message_reply_type:String,
    

    replyto:String,
    

    replyby:String,
     
})
//schema for the msg 
const UserSchemaformsg=new Schema({
    message:{
        type:String,
        $exists: true},
    send_by:{
        type:String,
        $exists: true
    },
    time:{
        type:String,
        $exists: true
    },
    message_type:{
        type:String,
        $exists: true
    },
   replymsg:replySchemaformsg,
     reaction: {
            type: Array,
            default: [] 
        },
    seen_user: {
            type: Array,
            default: [] 
        },
    delivery_user: {
            type: Array,
            default: [] 
        }

});
function  usermsgmodel(collection,
    message,
    send_by,
    time,
    message_type,
    _replyto,
    message_id,
    message_reply_type,
    replyto,
    replyby
    )
    {
    const userdetailmodel = mongoose.model('msg', UserSchemaformsg,collection);
    return userdetailmodel({
        message:message,
        send_by:send_by,
        time:time,
        message_type:message_type,
        replymsg: {
            _replyto: _replyto,
            message_id: message_id,
            message_reply_type: message_reply_type,
            replyto: replyto,
            replyby: replyby}
    });
}
/// reraction at seen schema 
const seen_at = new Schema({
    seen: String,
    seen_by:String,
   
});
const seen = new Schema({
    message:String,
   seen_user: [seen_at],
    
});
function  seenfunction(collection){
   
    const seen_atmodel = mongoose.model('seen', seen,collection);
    return seen_atmodel ;

}

const delivery_at = new Schema({
    deliver_to: String,
    delivery_t:String,
   
});
const delivery_by = new Schema({
    message:String,
   delivery_user: [delivery_at],
   
});
function  deliveryfunction(collection){
   
    
    const delivery_atmodel = mongoose.model('delivery', delivery_by,collection);
    return delivery_atmodel ;

}
const newreaction_at = new Schema({
    reaction_emoji: String,
    reacted_by:String,
    reacted_at: String
});
const reactionlistschema = new Schema({
    message:String,
   reaction: [newreaction_at],
   
    // Array of userSchema
});
function  reactionfunction(collection){
   
    const reactionatmodel = mongoose.model('reaction', reactionlistschema,collection);
    return reactionatmodel ;

}
//const User=mongoose.model("User",UserSchema);
const newuserSchema = new Schema({
    Name: String,
    Email: String,
    profilepic: String,
    mute:{ type:Boolean,
        default:false},
    admin: {type:Boolean,
        default:false},
    active_status:{
        type: Boolean,
        default:false,
    }
    
});

const userlistschema = new Schema({
    users: [newuserSchema] // Array of userSchema
});

function  userfunction(collection){
    const userdetailmodel = mongoose.model('userdetail', userlistschema,collection);
    return userdetailmodel ;

}
// Function to create and return the Mongoose model
function createChatChannelModel(uniqueName, nameField, emailField){
        // Define the schema
        const chatchannelmodel = userfunction(uniqueName);
        // Create and return the model

    return chatchannelmodel({
        users: [{
            Name: nameField,
            Email: emailField,
            profilepic: "",
            mute: false,
            admin: true,
            active_status: false
            
        }] 
    });
};

// channel_detail
function getModelForCollection(collectionName) {
    const modelNames = mongoose.modelNames();
    if (modelNames.includes(collectionName)) {
        return mongoose.model(collectionName);
    } else {
        // Define the schema for the chat detail
        const chatDetailSchema = new Schema({
            Detail: String
        });
        // Create and return the Mongoose model for the given collection name
        return mongoose.model(collectionName, chatDetailSchema);
    }
}
async function findOrCreateUserDetail(collectionName, user) {
    try {
        // Get the Mongoose model for the custom collection
        const UserDetailModel = getModelForCollection(collectionName);
        // Find user detail in the collection
        let existingUserDetail = await UserDetailModel.findOne({ Detail: { $ne: null } });
        if (!existingUserDetail) {
            // If user detail doesn't exist, create a new one
            const newUserDetail = new UserDetailModel({ Detail: user });
            const createdUserDetail = await newUserDetail.save();
            console.log(`New user detail created in ${collectionName}:`, createdUserDetail);
            return createdUserDetail;
        } else {
            // If user detail exists, update it with the new detail
            existingUserDetail.Detail = user;
            existingUserDetail = await existingUserDetail.save();
            console.log(`User detail updated in ${collectionName}:`, existingUserDetail);
            return existingUserDetail;
        }
    } catch (error) {
        console.error('Error finding or creating user detail:', error);
    }
}
//muted

function mutedcollection(collectionName) {
    const modelNames = mongoose.modelNames();
    if (modelNames.includes(collectionName)) {
        return mongoose.model(collectionName);
    } else {
        // Define the schema for the chat detail
        const UserSchemaformsg = new Schema({
            users: [{
                Name: String,
                Email: String,
                profilepic: String,
                admin: String,
                mute: String // Or whatever type mute should be
            }]
        });
        // Create and return the Mongoose model for the given collection name
        return mongoose.model(collectionName, UserSchemaformsg);
    }
}
//active

function activecollection(collectionName) {
    const modelNames = mongoose.modelNames();
    if (modelNames.includes(collectionName)) {
        return mongoose.model(collectionName);
    } else {
        // Define the schema for the chat detail
        const UserSchemaformsg = new Schema({
            users: [{
                Name: String,
                Email: String,
                profilepic: String,
                admin: Boolean,
                mute: Boolean,
                active_status:Boolean, // Or whatever type mute should be
            }]
        });
        // Create and return the Mongoose model for the given collection name
        return mongoose.model(collectionName, UserSchemaformsg);
    }
}

///muted function
async function mutedfunctio(collectionName, id, mute,user_id) {
    try {
        
        const UserDetailModel = mutedcollection(collectionName);

       
        const updatedDocument = await UserDetailModel.findOneAndUpdate(
            { "_id": user_id, "users._id": id }, 
            { "$set": { "users.$.mute": mute.toString() } }, 
            { new: true } 
        );

        if (!updatedDocument) {
            console.log(`User with ID '${id}' not found`);
            return;
        }

        console.log(`Muted value updated for user with ID '${id}' to '${mute}'`);
        console.log("Updated document:", updatedDocument);
    } catch (error) {
        console.error('Error finding or updating user detail:', error);
    }
}
//active statuds
async function activefunctio(collectionName, id, active_status,user_id) {
    try {
        
        const UserDetailModel = activecollection(collectionName);

       
        const updatedDocument = await UserDetailModel.findOneAndUpdate(
            { "_id": user_id, "users._id": id }, 
            { "$set": { "users.$.active_status": active_status.toString() } }, 
            { new: true } 
        );

        if (!updatedDocument) {
            console.log(`User with ID '${id}' not found`);
            return;
        }

        console.log(`Muted value updated for user with ID '${id}' to '${active_status}'`);
        console.log("Updated document:", updatedDocument);
    } catch (error) {
        console.error('Error finding or updating user detail:', error);
    }
}
// admin yes or not function 
async function adminfunctio(collectionName, id, admin,user_id) {
    try {
        
        const UserDetailModel = mutedcollection(collectionName);

       
        const updatedDocument = await UserDetailModel.findOneAndUpdate(
            { "_id": user_id, "users._id": id }, 
            { "$set": { "users.$.admin": admin.toString() } }, 
            { new: true } 
        );
    

        if (!updatedDocument) {
            console.log(`User with ID '${id}' not found`);
            return;
        }

        console.log(`Muted value updated for user with ID '${id}' to '${admin}'`);
        console.log("Updated document:", updatedDocument);
        return updatedDocument;
    } catch (error) {
        console.error('Error finding or updating user detail:', error);
    }
}
//user fetch
function fetchmsg(collectionName) {
   
    const modelNames = mongoose.modelNames();
    if (modelNames.includes(collectionName)) {
        return mongoose.model(collectionName);}
        else{
            const harsh = new Schema({
                users: [{
                   
                    Name: String,
                    Email: String,
                    profilepic: String,
                    admin: String,
                    mute: String
                   // Or whatever type mute should be
                }]
            });
    
        // Create and return the Mongoose model for the given collection name
        return mongoose.model(collectionName, harsh);
        }
 }
 async function fetchthemsg(collectionName) {
    try {
        // Get the Mongoose model for the custom collection
        const UserDetailModel = fetchmsg(collectionName);
        // Find user detail in the collection
        let existingUserDetail = await UserDetailModel.findOne({});
        if (!existingUserDetail) {
            // If user detail doesn't exist, create a new one
            console.log("User detail not found in the collection");
            return null;
        } else {
            // If user detail exists, return the users array
            return existingUserDetail.users;
        }
    } catch (error) {
        console.error('Error finding or retrieving user detail:', error);
        throw error; // Re-throwing the error for the caller to handle
    }
}
//schema delete 
// Define a schema for the collection
const collection_Schemaformsg = new mongoose.Schema({
    collection_name: String,
});

// Function to create or retrieve a Mongoose model for the given collection name
function getModelForCollection(collectionName) {
    // Check if the model already exists
    if (mongoose.models[collectionName]) {
        return mongoose.models[collectionName];
    } else {
        // If the model doesn't exist, create and return it with the schema
        return mongoose.model(collectionName, collection_Schemaformsg);
    }
}
// Function to delete a collection
async function deleteCollection(collectionName) {
    try {
        const db = mongoose.connection.db;
        
        // Check if the collection exists
        const collections = await db.listCollections().toArray();
        const existingCollection = collections.find(collection => collection.name === collectionName);
        
        if (!existingCollection) {
            console.log(`Collection '${collectionName}' does not exist.`);
            return;
        }
          

        // Drop the collection
        
        await db.dropCollection(collectionName);
        


        console.log(`Collection '${collectionName}' deleted successfully.`);
    } catch (error) {
        console.error('Error deleting collection:', error);
    }
}



const loginlistschema = new Schema({
  //  message:String,
    chat: [{collection_name_user:String,
}] // Array of userSchema
    
   
    // Array of userSchema
});
function  loginfunction(collection){
   
    const reactionatmodel = mongoose.model('login', loginlistschema,collection);
    return reactionatmodel ;

}

 module.exports={usermsgmodel,seenfunction,
        createChatChannelModel,findOrCreateUserDetail,msgupdatefunction,fetchdataffunction,remove_themsg,mutedfunctio,adminfunctio,
        userfunction,deliveryfunction,reactionfunction,fetchthemsg,activefunctio,deleteCollection,loginfunction};