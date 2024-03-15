import request from "supertest";
import { EventRegistration } from "../../src/models/EventRegistration";
import { User } from "../../src/models/User";

const baseURL = "http://localhost:3000";

describe("event register test suite", () => {
  describe("register user in event", () => {
    let event_id: string;
    let authToken: string;
    const userData: Partial<User> = {
      email: "zeroo3442@gmail.com",
      password: "12345678",
    };

    beforeAll(async () => {
      const response = await request(baseURL).get("/api/v1/event");
      event_id = response.body.data[0].event_id;
      const userResponse = await request(baseURL).post("/api/v1/user").send(userData);
      userData.user_id = userResponse.body.data.user_id;
      authToken = (await request(baseURL).post("/api/v1/user/login").send(userData)).body.token;
    });
    afterAll(async () => {
      await request(baseURL).delete(`/api/v1/user/${userData.user_id}`);
    });
    it("user registering with correct data", async () => {
      const response = await request(baseURL)
        .get(`/api/v1/event/${event_id}/register`)
        .set("Authorization", `Bearer ${authToken}`);
      expect(response.statusCode).toBe(201);
      expect(response.body.status).toBe("success");
      expect(response.body.data).toMatchObject<EventRegistration>;
    });
  });
});
