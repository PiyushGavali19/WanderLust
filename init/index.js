const mongoose = require("mongoose");
const listing  = require("../models/listing.js");
const initData = require("./data.js");

main().then(res => console.log(res)).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderLust');
};

const initDB = async ()=>{
    await listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({
        ...obj,
        owner:"6780056e87853ce4b466fee4",
    }));
    await listing.insertMany(initData.data);
    console.log("data was initalized ");
};

initDB();   