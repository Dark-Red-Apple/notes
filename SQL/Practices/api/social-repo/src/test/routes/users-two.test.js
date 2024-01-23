const request = require("supertest")
// require the app we had the express app there
// name it build to avoid conflicts, because this is not a function named app
const buildApp = require("../../app")
const UserRepo = require("../../repos/user-repo")
// to connect to db
const pool = require("../../pool")

// we added this after we moved the code to context
const Context = require("../context")
let context // need two places
// use async since we are using await in the function
beforeAll(async () => {
  context = await Context.build()
})

beforeEach(async () => {
  await context.rest()
})

// to close the conn
afterAll(() => {
  return context.close()
})

// it is an alias for test
it("create a user", async () => {
  // assertion, to make sure we actually have increased the num of users
  // add the count to user repo
  const startingCount = await UserRepo.count()
  //   assume we are starting from zero
  // expect(startingCount).toEqual(0)

  // technically the result should be 201
  await request(buildApp()).post("/users").send({ username: "testuser", bio: "test bio" }).expect(200)

  const finishCount = await UserRepo.count()
  expect(finishCount - startingCount).toEqual(1)
})
