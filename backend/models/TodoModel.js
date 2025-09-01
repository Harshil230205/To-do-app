import mongoose from 'mongoose';


const todoSchema  = new mongoose.Schema({
    title : {
        type: String,
        required :true
    },
    discription : {
        type :String,
        required : true
    },
    isCompleted : {
        type : Boolean,
        default : false,
        required : true
    },
    createdBy:{
        ref: 'User',
        type:mongoose.Schema.ObjectId,
    },
    name:{
        ref: 'User',
        type: String,
        
    }
},{timestamps:true});   

const todoModel = new mongoose.model("Todo", todoSchema);
export default todoModel;