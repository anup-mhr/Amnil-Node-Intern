import request from "supertest";
import { EventRegistration } from "../../src/models/EventRegistration";
import { User } from "../../src/models/User";

const baseURL = "http://localhost:3000";

describe("event register test suite", () => {
  describe("register user in event", () => {
    let event_id: string;
    let authToken: string;
    let adminAuthToken: string;

    const adminData: Partial<User> = {
      email: "anupmhrzn16@gmail.com",
      password: "12345678",
    };
    const userData: Partial<User> = {
      email: "zeroo3442@gmail.com",
      password: "12345678",
    };

    beforeAll(async () => {
      adminAuthToken = (await request(baseURL).post("/api/v1/user/login").send(adminData)).body
        .token;

      const response = await request(baseURL).get("/api/v1/event");
      event_id = response.body.data[0].event_id;
      const userResponse = await request(baseURL).post("/api/v1/user").send(userData);
      userData.user_id = userResponse.body.data.user_id;
      authToken = (await request(baseURL).post("/api/v1/user/login").send(userData)).body.token;
    });

    afterAll(async () => {
      await request(baseURL)
        .delete(`/api/v1/user/${userData.user_id}`)
        .set("Authorization", `Bearer ${adminAuthToken}`);
    });

    it("User registering for event with correct data", async () => {
      const response = await request(baseURL)
        .get(`/api/v1/event/${event_id}/register`)
        .set("Authorization", `Bearer ${authToken}`);
      expect(response.statusCode).toBe(201);
      expect(response.body.status).toBe("success");
      expect(response.body.data).toMatchObject<EventRegistration>;
    });

    it("User registering for event with wrong event_id", async () => {
      const response = await request(baseURL)
        .get(`/api/v1/event/12431897-b916-4e59-8cbd-58064b8139cf/register`)
        .set("Authorization", `Bearer ${authToken}`);
      expect(response.statusCode).toBe(404);
      expect(response.body.status).toBe("fail");
      expect(response.body.message).toBe("Event not found");
    });
  });
});
