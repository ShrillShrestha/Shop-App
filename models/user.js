const mongoose = require('mongoose');
const { update } = require('./product');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart:{
        items:[
            {
                productId: {type: Schema.Types.ObjectId, ref:'Product', required: true},
                quantity: {type: Number, required: true}
            }
        ]
    }
});

userSchema.methods.addToCart = function(product){
    const index = this.cart.items.findIndex(cp=>{
        return cp.productId.toString() === product._id.toString();
    });
    let updatedCartItems = [...this.cart.items];
    let newQuantity = 1;
    if(index >= 0){
        updatedCartItems[index].quantity += newQuantity;
    }else{
        updatedCartItems.push({
            productId : product._id,
            quantity : newQuantity
        });
    }
    this.cart.items = updatedCartItems;
    return this.save();
};

userSchema.methods.removeCartItem = function(cartItemId){
    const updatedCartItems = this.cart.items.filter(item=>{
        return item._id.toString() != cartItemId.toString();
    });

    this.cart.items = updatedCartItems;
    return this.save();
};

userSchema.methods.clearCart = function() {
    this.cart = {items:[]};
    return this.save();
}

userSchema.methods.updateCart = function(itemList) {
    this.cart= {items:itemList};
    return this.save();
}

module.exports = mongoose.model('User', userSchema);