const jwt = require('jsonwebtoken');
const auth=require('../../middleware/auth')
const Mongoose  = require('mongoose');
const { User } = require('../../models/user');


describe('auth middleware', () => {
    test('should populate req.user with payload of a valid JWT', () => {

        const user = { _id: Mongoose.Types.ObjectId().toHexString(), isAdmin: true }
        const token = new User(user).generateAuthToken();
        const req={
            header:jest.fn().mockReturnValue(token)
        };
        const res={}
        const next=jest.fn();
        auth(req,res,next);
        expect(req.user).toMatchObject(user);

    })

})

