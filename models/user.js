const mongoose= require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/testapp2');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true // Enforces unique usernames
    },
    password: {
        type: String,
        required: true
    }
});
module.exports=mongoose.model('User', userSchema);
