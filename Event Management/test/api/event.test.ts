import request from "supertest";

const baseURL = "http://localhost:3000";
describe("Event api test suite", () => {
  describe("Create event", () => {
    type event = {
      event_id: string;
      title: string;
      description: string;
      thumbnail: string | null;
      seats: number;
      price: number;
      event_date: Date;
      created_at: Date;
    };
    const eventData: Partial<event> = {
      title: "tour",
      description: "going to tour",
      price: 150.12,
      event_date: new Date(),
    };

    afterAll(async () => {
      await request(baseURL).delete(`/api/v1/event/${eventData.event_id}`);
    });

    it("create event by admin", async () => {
      const response = await request(baseURL).post("/api/v1/event").send(eventData);
      eventData.event_id = response.body.data.event_id;
      expect(response.statusCode).toBe(201);
      expect(response.body.status).toBe("success");
      expect(response.body.data).toMatchObject<event>;
    });
  });
});

// import { userService } from "../src/services/userService";
// import { User } from "../src/models/User";

// describe("Event api test suite", () => {
//   const event = {
//     title: "tour",
//     description: "going to tour",
//     price: 150.12,
//     event_date: "2024-03-14",
//   };
//   beforeEach(async () => {
//     const user = {
//       email: "test@gmail.com",
//       password: "testpass",
//     };
//     // const userResponse = await userService.login(user);
//     const getresponse = await request("http://localhost:3000").get("/api/v1/user");
//     console.log(getresponse.statusCode);
//     const response = await request("http://localhost:3000").post("/api/v1/user/login").send(user);
//     // console.log(response.statusCode);
//   });

//   const wrongEvent = {
//     description: "going to tour",
//     price: 150.12,
//     event_date: "2024-03-14",
//   };
//   it("create event by admin", async () => {
//     const response = await request("http://localhost:3000").post("/api/v1/event").send(event);
//     expect(response.statusCode).toBe(200);
//     expect(response.body.status).toBe("success");
//     expect(response.body.data.title).toBe(event.title);
//   });
//   it("throws error for invalid data", async () => {
//     const response = await request("http://localhost:3000").post("/api/v1/event").send(wrongEvent);
//     expect(response.statusCode).toBe(500);
//     expect(response.body.status).toBe("error");
//     expect(response.body.message).toBe("Something went wrong!");
//   });
// });
