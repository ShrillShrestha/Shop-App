const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), "data", "product.json");

const getProductFromFile = (cb => {
    fs.readFile(p, (err, data)=>{
        if(err){
            return cb([]);
        }else{
            try{
                 return cb(JSON.parse(data));
            }catch(e){
                return cb([]);
            }
        }
    });
});

module.exports = class Product{
    constructor(id, title, imageUrl, price, description){
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save(cb){
        getProductFromFile( products =>{
            console.log("The is:", this.id);
            if(this.id){
                const index = products.findIndex((prod)=>{
                    return prod.id === this.id
                });
                const updateList = [...products];
                updateList[index] = this;
                fs.writeFile(p, JSON.stringify(updateList), (err) =>{
                    if(err){
                        console.log("Couldn't write I!: ", err.message);
                    }
                    cb();
                });
            }else{
                console.log("Not Exists");
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err) =>{
                    if(err){
                        console.log("Couldn't write II!: ", err.message);
                    }
                    cb();
                });
            }
        });
    }

    static findById(id, cb){
        getProductFromFile((products)=>{
            const prod = products.find(product => id == product.id);
            cb(prod);
        });
    }

    static fetchAll(cb) {
        getProductFromFile(cb);
      }
};