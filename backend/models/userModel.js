const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const { use } = require('../routes/userRoutes');

const userSchema = mongoose.Schema(
    {
        name: {type: String, required:true},
        email: {type: String, required:true,unique:true},
        password: {type: String, required:true},
        pic: {type: String, default: "https://media.wired.com/photos/598e35fb99d76447c4eb1f28/16:9/w_2123,h_1194,c_limit/phonepicutres-TA.jpg"},
    },
    {
        timestamps:true,
    },
);

userSchema.methods.matchPassword=async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.pre('save',async function(next){
    if(!this.isModified){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;