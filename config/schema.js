

module.exports = {
    
    "user": {
        "POST": {
            "type": "object",
            "maxProperties": 6,
            "properties": {
                "firstName": {
                    "type": "string"
                },
                "lastName": {
                    "type": "string"
                },
                "email": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                }
            },
            "required": ["firstName", "lastName", "email", "password"],
            "additionalProperties": false
        }
    }
}

