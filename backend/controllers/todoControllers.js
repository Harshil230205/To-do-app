import todoModel from "../models/TodoModel.js";

export const createController = async (req, res) => {
  try {
    const {title, discription, createdBy} = req.body;

    if (!title || !discription) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const todo = new todoModel({
      title,
      discription,
      createdBy
    });
    const result = await todo.save();
    res.status(201).json({
      success: true,
      message: "Todo created successfully",
      result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "error in createController",
      error: err.message,
    });
  }
};

export const getAllController = async (req, res) => {
    try{
        const id  = req.params.id;
        if (!id) {
            return res.status(404).json({
                success: false,
                message: "No user found with this id",
            });
        }
        const todos = await todoModel.find({createdBy: id}).sort({createdAt: -1});
        if(!todos) {
            return res.status(404).json({
                success: false,
                message: "No todos found for this user",
            });
        }
        res.status(200).json({
            success: true,
            message: "Todos fetched successfully",
            todos,
        });
    }catch(err){
         console.error(err);
    res.status(500).json({
      success: false,
      message: "error in getAllController",
      error: err.message,
    });
    }
}

export const deleteTodoController = async (req, res) => {
    try{
        //fetch todo id
        const id = req.params.id;
        if (!id) {
            return res.status(404).json({
                success: false,
                message : "No todo found with this id",
            })}
        //find id -> findByIdAndDelete
        const todo = await todoModel.findByIdAndDelete(id);
        if(!todo){
            return res.status(404).json({
                success: false,
                message: "Todo not found",
            });
        }
        //success response
        res.status(200).json({
            success: true,
            message: "Todo deleted successfully",
            todo,
        });
    }catch(err){
        console.error(err);
        res.status(500).json({
            success: false,
            message: "error in deleteTodoController",
            error: err.message,
        });
    }
}

export const updateTodoController = async (req, res) => {
    try{
        //fetch todo id
        const id = req.params.id;
        if (!id) {
            return res.status(404).json({
                success: false,
                message : "No todo found with this id",
            })}
        const data =  req.body;    
        //find id -> findByIdAndDelete
        const todo = await todoModel.findByIdAndUpdate(id,{$set:data},{returnOrigin:false});
        if(!todo){
            return res.status(404).json({
                success: false,
                message: "Todo not found",
            });
        }
        //success response
        res.status(200).json({
            success: true,
            message: "Todo deleted successfully",
            todo,
        });
    }catch(err){
        console.error(err);
        res.status(500).json({
            success: false,
            message: "error in updateTodoController",
            error: err.message,
        });
    }
}
