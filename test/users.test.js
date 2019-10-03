//During the test the env variable is set to test
process.env.NODE_ENV = "test";

let mongoose = require("mongoose");

// const auth = require("../middleware/auth");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

const User = require("../models/User");

chai.use(chaiHttp);

describe("User registration", () => {
    beforeEach(done => {
        User.remove({}, err => {
            done();
        });
    });

    it("Should return 200 and confirmation for valid input", done => {
        //mock valid user input
        const new_user = {
            name: "JohnDoe",
            email: "john@doe.com",
            password: "password"
        };
        //send request to the app
        chai.request(server)
            .post("/api/users")
            .send(new_user)
            .end((err, res) => {
                //assertions
                res.should.have.status(200);
                res.body.should.have.property("token");
                done();
            });
    });
});
