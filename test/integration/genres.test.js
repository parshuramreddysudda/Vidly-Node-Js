
const { Genre } = require('../../models/genre');
const { User } = require('../../models/user');
const request = require('supertest');

let server;

describe('/api/genres', () => {

    beforeEach(() => { server = require('../../index') });
    afterEach(async () => {
        server.close();
        await Genre.remove({});
    })

    describe("GET /", () => {
        test('should return all the genres', async () => {
            await Genre.collection.insertMany([
                { name: 'genre1' },
                { name: 'genre2' }
            ])
            const res = await request(server).get('/api/genres');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
            expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();
        })
    })
    describe('GET: ID', () => {
        test('should return if ID is found ', async () => {
            const genre = new Genre({ name: "genre1" });
            await genre.save();
            const res = await request(server).get('/api/genres/' + genre._id);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', genre.name);
        })

        test('should return 404 if invalid ID is passed ', async () => {
            const res = await request(server).get('/api/genres/1');
            expect(res.status).toBe(404);
        })
    })
    describe('POST:/', () => {

        let token;
        let name;

        beforeEach(() => {
            token = User().generateAuthToken();
            name = 'genre1';
        })
        const execute = async () => {
            return await request(server).post('/api/genres').send({ name: name }).set('x-auth-token', token);
        }
        test('should return 401 when user is not logged in ', async () => {
            token = '';
            const res = await execute();
            expect(res.status).toBe(401);
        })

        test('should return 400 when genre is less than 5 char ', async () => {
            name = 'gen';
            const res = await execute();;
            expect(res.status).toBe(400);
        })

        test('should return 400 when genre is more than 50 char ', async () => {
            name = new Array(52).join('a');
            const res = await execute();
            expect(res.status).toBe(400);
        })

        test('should save the genre if it is valid', async () => {
            await execute();
            const genre = Genre.find({ name: 'genre1' });
            expect(genre).not.toBeNull();
        })

        test('should return if it is valid', async () => {
            const res = await execute();
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', 'genre1');
        })
    })


})
