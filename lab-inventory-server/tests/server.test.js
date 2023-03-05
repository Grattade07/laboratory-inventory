const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index");

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
  });
  
  /* Closing database connection after each test. */
  afterEach(async () => {
    await mongoose.connection.close();
  });

  /* test looks to see if user being created reponds with correct message if username already exists. Found how to do this from url: https://www.freecodecamp.org/news/how-to-test-in-express-and-mongoose-apps/ */
  describe("POST /users/register", () => {
    it("should create new user account", async () => {
        const res = await request(app).post("/users/register").send({
            username: "john",
            password: "EasyGuess",
            admin: false
        })
        expect(res.body.message).toBe("This user already exists")
    })
})