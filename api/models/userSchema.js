const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    email :{
        type: String,
        require : true,
        validate: [validator.isEmail, "Please provide a Valid Email"],
        unique: true,
    },
    username :{
        type: String,
        require : true,
        minLength: [3, "first name must containe At least 3 character"],
        unique: true,
    },
    password :{
        type: String,
        required: [true, "Password Is Required!"],
        minLength: [8, "Password Must Contain At Least 8 Characters!"],
    },
    avatar :{
        type: String,
        default: "",
    },
    createdAt :{
        type: Date,
        default: Date.now ,
    },
    posts :{
        type: Array,
        default: [],
    },
    savedPosts :{
        type: Array,
        default: [],
    },
    chats: [{ type: Schema.Types.ObjectId, ref: 'Chat' }],
    chatIDs: [{ type: Schema.Types.ObjectId }]

},
);


const User = mongoose.model('User', UserSchema);

module.exports = User;
// posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
// savedPosts: [{ type: Schema.Types.ObjectId, ref: 'SavedPost' }],
