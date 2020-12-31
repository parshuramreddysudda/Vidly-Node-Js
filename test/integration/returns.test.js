

const { Rental } = require('../../models/rental');
const { User } = require('../../models/user');
const request = require('supertest');
const Mongoose  = require('mongoose');

let server;
describe('/api/returns/', () => {
    const id=Mongoose.Types.ObjectId;
    const movieID=Mongoose.Types.ObjectId;
    const rental;

    beforeEach(() => { server = require('../../index') 

    rental= new Rental({
        customer:{
            _id:id,
            name:"12435",
            phone:"45346"
        },
        movie:{
            _id:movieID,
            title:"Movie",
            dailyRentalRate:2
        }
    })
});
    afterEach(async () => {
        server.close();
        await Rental.remove({});
    })

    test('should work', async() => {
        const res= await Rental.findById(rental._id);
        expect(res!=null)
    })
    

 
    

})
