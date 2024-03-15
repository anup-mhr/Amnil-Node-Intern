import request from "supertest";
import { Event } from "../../src/models/Event";

const baseURL = "http://localhost:3000";
describe("Event api test suite", () => {
  describe("Create event", () => {
    const eventData: Partial<Event> = {
      title: "tour",
      description: "going to tour",
      price: 150.12,
      event_date: new Date(),
    };

    const wrongEvent: Partial<Event> = {
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
      expect(response.body.data).toMatchObject<Event>;
    });

    it("throws error for insuffient info", async () => {
      const response = await request(baseURL).post("/api/v1/event").send(wrongEvent);
      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe("fail");
      expect(response.body.message).toBe("Insufficient information");
    });
  });

  describe("Get all events", () => {
    it("fetch all event", async () => {
      const response = await request(baseURL).get("/api/v1/event");
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.data).toMatchObject<Event[]>;
    });
  });

  describe("Get event by id", () => {
    let event_id = "";
    beforeAll(async () => {
      const response = await request(baseURL).get("/api/v1/event");
      event_id = response.body.data[0].event_id;
    });
    it("fetch event by right id", async () => {
      const response = await request(baseURL).get(`/api/v1/event/${event_id}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.data).toMatchObject<Event>;
    });
    it("fetch event by wrong id", async () => {
      const response = await request(baseURL).get(
        "/api/v1/event/12431897-b916-4e59-8cbd-58064b8139cf",
      );
      expect(response.statusCode).toBe(404);
      expect(response.body.status).toBe("fail");
      expect(response.body.message).toBe("Event Not Found");
    });
  });

  describe("delete a event", () => {
    const eventData: Partial<Event> = {
      title: "tour",
      description: "going to tour",
      price: 150.12,
      event_date: new Date(),
    };

    beforeAll(async () => {
      const response = await request(baseURL).post("/api/v1/event").send(eventData);
      eventData.event_id = response.body.data.event_id;
    });

    it("delete event using correct id", async () => {
      const response = await request(baseURL).post(`/api/v1/event/${eventData.event_id}`);
      const updatedData = response.body.data;
      const exists = eventData.event_id == updatedData?.event_id;
      expect(exists).toBe(false);
    });
    it("delete event by wrong id", async () => {
      const response = await request(baseURL).get(
        "/api/v1/event/12431897-b916-4e59-8cbd-58064b8139cf",
      );
      expect(response.statusCode).toBe(404);
      expect(response.body.status).toBe("fail");
      expect(response.body.message).toBe("Event Not Found");
    });
  });
});
