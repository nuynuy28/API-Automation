const request = require("supertest");
const expect = require("chai").expect;

//global variable
let url = "https://dummyjson.com";
let searchProduct = "/products/search";
let product = "/products";

describe("Dummy JSON Search product", function () {
    it("1.API search product with search", async function () {
        this.timeout(60000)
        //local variable
        let header = { "Content-Type": "application/json"};
        let parameter = { q: "phone"};

        //Send Get Request
        let response = await request(url)
        .get(searchProduct)
        .set(header)
        .query(parameter);

        
        expect(response.status).to.equal(200);
        console.log(response.statusCode);
        //console.log(response.body.products);
        

       
    });

    it("2.API search product with limit and skip", async function () {
        this.timeout(60000)
        //local variable
        let header = { "Content-Type": "application/json"};
        let parameter = { 
           q: "apple",
           limit: 10,
           //skip: 10,
           select: "title,price",
        }

        //Send Get Request
        let response = await request(url)
        .get(searchProduct)
        .set(header)
        .query(parameter);

        
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('products');
        
        // Assertion isi field tiap produk
        response.body.products.forEach(p => {
            expect(p).to.include.keys("title", "price");
            
       
        });

       console.log(response.body.products);

     });

     //path parameter
    it.only("3.Get Single Product", async function () {
        this.timeout(6000);
        
        let productID = 3;
        let newEndpoint = `${product}/${productID}`;

        let response = await request(url).get(newEndpoint);
        expect(response.status).to.be.equal(200);
       

        console.log(response.statusCode);
        console.log(response.body);
       });

    });
        

       
    

    


