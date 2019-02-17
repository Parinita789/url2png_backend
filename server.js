var express = require('express');
var app = express();
const server = require('http').createServer(app);
const bodyParser = require('body-parser');
const schemaValidator = require('./validators/schemaValidator');
const userController = require('./controllers/user');
const urlController = require('./controllers/url');
const mongoose = require('mongoose');
mongoose.connect('mongodb://pari:mlab123@ds239055.mlab.com:39055/url2png');
// mongoose.connect('mongodb://localhost/test');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("mongo connected >>>>>>>>>>>>");
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

var port = process.env.PORT || 3000;
var router = express.Router();
router.get('/', function (req, res) {
    res.json({ message: 'Test project', now: + new Date });

});
app.use('/url2png', router);
router.use((req, res, next) => {
    next()
})

router.post('/user/register', schemaValidator.validate, userController.register);

router.post('/user/auth',  userController.auth);
router.post('/url', urlController.saveUrl);
router.get('/url', urlController.getUrl);

server.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});