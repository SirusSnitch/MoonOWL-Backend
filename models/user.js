const mongoose = require('mongoose');

const User = mongoose.model('User',{
    name: {
        type: String
    },
    superuser:{
        type: Boolean,
        default: false
    },
    email: {
        type: String
    },
    password: {
        type: String
    }

})

module.exports = User;