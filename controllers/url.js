const url = require('../models/url');

exports.saveUrl = async (req, res) => {
try {
    if(!req.body.url){
       res.status(500).json({err: 'URL is mandatory'});
    }
    url.create(req.body, async (err, image) => {
    if (err) res.status(500).json(err);
    else {
        res.status(200).json(image);
        }
    })
} catch (e) { 
    res.status(500).json(e)
   }
}

exports.getUrl = async (req, res) => {
try {
    url.find({}, async (err, image) => {
        if (err) res.status(500).json(err);
        else {
            res.status(200).json(image);
        }
    })
} catch (e) { 
    res.status(500).json(e)
    }
}