const request = require("supertest");
const app = require("../../app");

describe("Launches Api", () => {
  const postRequestBody = {
    mission: "Reminescen Exploration",
    rocket: "Explorer IS1",
    launchDate: "December 27, 2040",
    target: "Kepler-442-b",
  };

  const postResponseBody = {
    mission: "Reminescen Exploration",
    rocket: "Explorer IS1",
    launchDate: "2040-12-27T08:00:00.000Z",
    flightNumber: 101,
    target: "Kepler-442-b",
    customer: ["alex", "Nasa"],
    upcoming: true,
    succeess: true,
  };

  test("adds 1 + 2 to equal 3", () => {
    expect(1 + 2).toBe(3);
  });

  test("Request GET launches", async () => {
    request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
      });
  });

  test("Request POST launches", async () => {
    const response = await request(app)
      .post("/launches")
      .send(postRequestBody)
      .expect("Content-Type", /json/)
      .expect("Content-Length", "202")
      .expect(201);

    //cheeck the answer has the same expected body
    expect(response.body).toStrictEqual(postResponseBody);
  });

  //ERRORS

  test("Post Launch with incorrect LaunchDate", async () => {
    const response = await request(app)
      .post("/launches")
      .send(Object.assign(postRequestBody, { launchDate: "alex" }))
      .expect("Content-Type", /json/)
      .expect(400);

    //cheeck the answer has the same expected body
    expect(response.body).toStrictEqual({
      error: "Provide a valid mission Launch Date",
    });
  });

  test("Post Launch with incorrect mission name", async () => {
    const response = await request(app)
      .post("/launches")
      .send(Object.assign(postRequestBody, { mission: "" }))
      .expect("Content-Type", /json/)
      .expect(400);

    //cheeck the answer has the same expected body
    expect(response.body).toStrictEqual({
      error: "You didnt provide a valide mission name",
    });
  });
});
