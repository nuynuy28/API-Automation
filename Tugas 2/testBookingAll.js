const axios = require("axios");
const expect = require("chai").expect;

const baseURL = 'https://restful-booker.herokuapp.com';

const authData = require("./authData.json");
const bookingData = require("./bookingData.json");

describe("Delete Booking API Test", function () {
  this.timeout(10000);

  let token;
  let bookingId;

  it("1. Get auth token", async function () {
    const response = await axios.post(`${baseURL}/auth`, authData, {
      headers: { 'Content-Type': 'application/json' }
    });

    expect(response.status).to.equal(200);
    expect(response.data).to.have.property('token');

    token = response.data.token;
  });

  it("2. Create new booking", async function () {
    const response = await axios.post(`${baseURL}/booking`, bookingData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    expect(response.status).to.equal(200);
    expect(response.data).to.have.property('bookingid');
    expect(response.data.booking).to.deep.include(bookingData);

    bookingId = response.data.bookingid;
  });

  it("3. Delete booking with token", async function () {
    if (!bookingId || !token) this.skip();

    const response = await axios.delete(`${baseURL}/booking/${bookingId}`, {
      headers: {
        'Cookie': `token=${token}`
      }
    });

    // Sesuai dokumentasi, delete sukses kembalikan status 201
    expect(response.status).to.equal(201);
  });
});
