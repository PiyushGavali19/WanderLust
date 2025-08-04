const joi = require("joi");

module.exports.listingSchema = joi.object({
    listing : joi.object({
        title: joi.string().required(),
        description : joi.string().required(),
        location : joi.string().required(),
        country: joi.string().required(),
        price:joi.number().required(),
        image: joi.object({
            filename: joi.string().optional(), // Optional filename validation
            url: joi.string().uri().allow('').default("https://images.unsplash.com/photo-1586375300773-8384e3e4916f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"),  // Validate URL or allow empty
        }).required(), // Ensure the image object itself is required
    }).required()
});

module.exports.reviewSchema = joi.object({
    review : joi.object({
        rating: joi.number().required().min(1).max(5),
        comment:joi.string().required()
    }).required()
});