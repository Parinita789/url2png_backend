var schemas = require('../config/schema');
var Validator = require('jsonschema').Validator;
var v = new Validator();

exports.validate = async (req,res, next) => {
    try {
        let schemaJson = schemas[req.originalUrl.split("/")[2]][req.method];
        let validated = v.validate(req.body, schemaJson);
        if(validated.errors.length){
            let errors = validated.errors.map(x => {return x.message})
            res.status(400).json({validationErrors:errors})
        }
        else{
            next()
        }
    } catch (e) {
        console.log(e);
        res.status(400).json(e)
    }
}
