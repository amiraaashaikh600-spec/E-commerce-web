const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date
    },
    cart: [{
        productId: String,
        name: String,
        price: Number,
        quantity: Number,
        image: String
    }],
    orders: [{
        orderId: String,
        products: Array,
        totalAmount: Number,
        status: String,
        createdAt: Date
    }]
});


userSchema.pre('save', function(next) {
    const user = this;
    

    if (!user.isModified('password')) {
        return next();
    }
  
    // bcrypt.genSalt(10, function(err, salt) {
    //     if (err) return next(err);
        
    //     bcrypt.hash(user.password, salt, function(err, hash) {
    //         if (err) return next(err);
    //         user.password = hash;
    //         next();
    //     });
    // });
});


userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw error;
    }
};

module.exports = mongoose.model('User', userSchema);