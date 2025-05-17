const request = require("supertest")("https://dummyjson.com");
const expect = require("chai").expect;

describe("Test Dummy API", function () {
    it("1.Get All Products", async function () {
        //send get request
        const response = await request.get('/products');
        expect(response.status).to.equal(200);
        expect(response.body.products).to.be.an('array');

        console.log("status", response.status);
    });

    it("2.Invalid Endpoint", async function () {
        const response = await request.get('/invalid');
        expect(response.status).to.equal(404);
        console.log("status", response.status);
    });

    it("3.Add Product", async function () {
        //send post request
        const response = await request
        .post("/products/add")
        .set("Content-Type", "application/json")
        .send({
            title: "Motor New Matic",
        });
        expect(response.status).to.equal(201);
        
    });

    it("4.Get Single Product", async function(){
        const response = await request.get('/products/2');
        expect(response.status).to.be.equal(200);
        expect(response.body).to.have.property("title")

        console.log("Nama Produk:", response.body.title);
        console.log("status:", response.status);
        });

    it("5.Search product", async function(){
            const response = await request.get('/products/search?q=phone');
            expect(response.status).to.be.equal(200);
            expect(response.body.products).to.be.an('array');
            
            console.log("Status:", response.status);
            
        });

    it.only("6.Get all products categories", async function(){
        const response = await request.get('/products/categories');
        expect(response.status).to.be.equal(200);

        console.log("Status:", response.status);

    });

    
});
