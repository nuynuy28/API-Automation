require('dotenv').config();

const request = require("supertest");
const expect = require("chai").expect;

const baseURL = 'https://restful-booker.herokuapp.com';

describe("Authentication API - Create Token", function () {
    this.timeout(5000);
    it("1.Success get token", async function () {
        
       const response = await request(baseURL)
       .post('/auth')
       .send({
        username: process.env.USERNAME,
        password: process.env.PASSWORD
       });

       console.log(response.body);
       expect(response.status).to.equal(200);
       expect(response.body).to.have.property('token');
       
       

    });
});
