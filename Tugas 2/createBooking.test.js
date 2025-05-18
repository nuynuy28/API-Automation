const axios = require("axios")
const expect = require("chai").expect;

const baseURL = 'https://restful-booker.herokuapp.com';
const bookingData = require("./bookingData.json");


describe("Create Booking", function () {
    this.timeout(5000);
    let bookingId;

    it("1.Success create new booking", async function () {
        const response = await axios.post(`${baseURL}/booking`, bookingData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
       
      console.log("Body (JSON):", response.data);


       //assertion 
       expect(response.status).to.equal(200);
       expect(response.data).to.have.property('bookingid');
       expect(response.data.booking).to.deep.include(bookingData);

       bookingId = response.data.bookingid; 
       });

    it("2.Success get booking ID by bookingID", async function () {
        if (!bookingId){
            this.skip();
        }

        const response = await axios.get(`${baseURL}/booking/${bookingId}`, {
            headers: {
              'Accept': 'application/json'
            }
          });
        expect(response.status).to.be.equal(200);
        expect(response.data).to.deep.include(bookingData);
});
});


