const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/user');

// const hashPassword = async (password) => {
// return new Promise((resolve, reject) => {
//     bcrypt.hash(password, 10, function (err, hash) {
//         console.log("err in hashing >>>>>>>> ", err, " hash ", hash);

//         if (err) {
//             reject(err);
//         }
//         else resolve(hash);
//     });
// })
// }

exports.register = async (req, res) => {
try {
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (err) throw err;
        else {
            req.body.password = hash;
            user.create(req.body, async (err, user) => {
            if (err) res.status(500).json(err);
            else {
                delete user.password
                res.status(200).json(user);
                }
            })
        }
    });
} catch (e) { 
    res.status(500).json(e) }

}

exports.auth = async (req, res) => {
	try {
		let conditions = { email: req.body.email }
		let selectparams = {};
		if (!conditions.email) res.status(500).json({ "error": "Enter your email Id" });
		else {
			user.findOne(conditions, selectparams, async (err, user) => {
				if (err) throw err
				else {
					if (!user) res.status(500).json({ "error": `User does not exist with email ${conditions.email}` });
					else {
						if (req.body.password) {
							bcrypt.compare(req.body.password, user.password, (err, matched) => {
								if (matched == true) {
									let payload = user.toJSON();
									let rememberMe = req.body.rememberMe;
									let expiresIn = { expiresIn: 86400 };
									if (rememberMe) expiresIn = {};
									let token = jwt.sign(payload, 'url2pngsecret', expiresIn);
									delete user.password;
									res.status(200).json({ "accessToken": token, "user": user })
								} else res.status(500).json({ "error": "Wrong Password" });
							});
						} else {
							let payload = user.toJSON();
							let resetToken = jwt.sign(payload, 'testSecret', { expiresIn: 86400 });
							let url = 'https://localhost:3000/Test/user/resetPassword';
							let message = `password reset link has been sent to the ${url}`;
							res.status(200).json({ "resetToken": resetToken, "user": user, "message": message });
						}
					}
				}
			})
		}
	} catch (e) {
		res.status(500).json(e)
	}
}



