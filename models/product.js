const fs = require('fs');
const path = require('path')

const pathBuilt = path.join(path.dirname(require.main.filename),"data","products.json");

const getProductsFromFile = ()=>{
    fs.readFile(pathBuilt,(err, fileContent)=>{
        if(err){
           return callbackFn([]);
        }
        callbackFn(JSON.parse(fileContent));
    });
};
module.exports = class Product {

    constructor(t) {
        this.title = t;
    }

    save() {
        getProductsFromFile((products) => {
          products.push(this);

          fs.writeFile(pathBuilt, JSON.stringify(products),(err)=> {
            console.log('err', err)
        })
        })
    }

    static fetchAll(callbackFn) {
        getProductsFromFile(callbackFn);
    }
}