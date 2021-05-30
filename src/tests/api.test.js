import "regenerator-runtime/runtime.js";
import request from 'supertest';
import app from '../app';
import User from '../api/user/model';
import Repository from '../api/repository/model';

const api = request(app);
let connection;

// import { server } from '../bin/www';
import { createConnection, cleanDataBase, closeConnection } from '../app/database';

beforeAll(async () => {
    connection = await createConnection();
});

// afterEach(async () => {
//     await server.close();
// });


// it('GET [domain]/api/user', done => {
//     request(app)
//         .get("/api/user")
//         .set('Accept', "application/json")
//         .expect(200, done);
// if (err) return done(err);
// done();
// await request(app).get("/api").send().expect(200);

// expect(response.body.msg).toBe(
//     [
//         {
//             "_id": "60b220ca2c97e174047aae1a",
//             "email": "test@test.com",
//             "username": "Test",
//             "password": "$2b$12$LUg4ln/U.dO85BWVMbGIVetBXs/8pfHvh9VBr2TsFN0KzjsWqO/qe",
//             "__v": 0
//         }
//     ]
// );

// });



describe('Users routes', () => {

    it('GET: [domain]/api/user - Get all users', async () => {
        await api
            .get('/api/user')
            .expect(200);
    });

    it('GET: [domain]/api/user/:id - Get user by id', async () => {
        const testUser = await new User({
            username: 'Test',
            email: 'test@test.com',
            password: 'test'
        }).save();
        await api
            .get(`/api/user/${testUser._id}`)
            .expect(200);
    });

    it('POST: [domain]/api/user - Add an user', async () => {
        await api
            .post('/api/user')
            .send({
                username: 'Test2',
                email: "test2@test.com",
                password: "12345"
            })
            .expect(201);
    });

    it('PATCH: [domain]/api/user/:id - Update user by id', async () => {
        const userInDb = await User.findOne({
            username: 'Test',
            email: 'test@test.com'
        });
        await api
            .patch(`/api/user/${userInDb._id}`)
            .send({
                username: "test01",
                email: 'test01@test.com'
            })
            .expect(200)
    });

    it('DELETE: [domain]/api/user/:id - Delete user by id', async () => {
        const userInDb = await User.findOne({
            username: "test01",
            email: 'test01@test.com'
        });
        await api
            .delete(`/api/user/${userInDb._id}`)
            .expect(200);
    });
});

describe('Repository routes', () => {

    it('GET: [domain]/api/repository - Get all repositories', async () => {
        await api
            .get('/api/repository')
            .expect(200);
    });

    it('GET: [domain]/api/repository/:id - Get repository by id', async () => {
        const testRepository = await new Repository({
            name: 'Test',
            url: 'https://test.es',
            description: 'Lorem Ipsum'
        }).save();
        await api
            .get(`/api/repository/${testRepository._id}`)
            .expect(200);
    });

    it('POST: [domain]/api/repository - Add a repository', async () => {
        await api
            .post('/api/repository')
            .send({
                name: 'Test2',
                url: 'https://test2.es',
                description: "Ipsum Lorem"
            })
            .expect(201);
    });

    it('PATCH: [domain]/api/repository/:id - Update repository by id', async () => {
        const repositoryInDb = await Repository.findOne({
            name: 'Test',
            url: 'https://test.es'
        });
        await api
            .patch(`/api/repository/${repositoryInDb._id}`)
            .send({
                name: "Test01",
                url: 'https://test01.es'
            })
            .expect(200)
    });

    it('DELETE: [domain]/api/repository/:id - Delete repository by id', async () => {
        const repositoryInDb = await Repository.findOne({
            name: "Test01",
            url: 'https://test01.es'
        });

        await api
            .delete(`/api/repository/${repositoryInDb._id}`)
            .expect(200);
    });
});

describe('NOTHING', () => {
    it("DUMMY", () => {
        expect(true).toBe(true);
    })
})



// use agent instead of manually calling `request(app)` each time


// afterEach(async () => {
//     await closeConnection(); // Atlas
//     // return server && server.close();
// });

afterAll(async ()=> {
    await User.deleteMany({});
    await Repository.deleteMany({});

    connection.close();
});