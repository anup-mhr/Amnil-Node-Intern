import request from "supertest";
import { User } from "../../src/models/User";

const baseURL = "http://localhost:3000";

describe("User api test suite", () => {
  describe("Create user", () => {
    const userData: Partial<User> = {
      email: "zeroo3442@gmail.com",
      password: "12345678",
    };

    const wrongUser: Partial<User> = {
      email: "zeroo3442@gmail.com",
    };

    afterAll(async () => {
      await request(baseURL).delete(`/api/v1/user/${userData.user_id}`);
    });

    it("create a User user", async () => {
      const response = await request(baseURL).post("/api/v1/user").send(userData);
      userData.user_id = response.body.data.user_id;
      expect(response.statusCode).toBe(201);
      expect(response.body.status).toBe("success");
      expect(response.body.data).toMatchObject<User>;
    });

    it("throws error for insuffient info", async () => {
      const response = await request(baseURL).post("/api/v1/user").send(wrongUser);
      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe("fail");
      expect(response.body.message).toBe("Insufficient information");
    });
  });

  describe("Get all users", () => {
    let authToken: string;
    const adminData: Partial<User> = {
      email: "anupmhrzn16@gmail.com",
      password: "12345678",
    };

    beforeAll(async () => {
      authToken = (await request(baseURL).post("/api/v1/user/login").send(adminData)).body.token;
    });

    it("Admin: fetch all user", async () => {
      const response = await request(baseURL)
        .get("/api/v1/user")
        .set("Authorization", `Bearer ${authToken}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.data).toMatchObject<User[]>;
    });
  });

  describe("Get user by id", () => {
    let authToken: string;
    let user_id: string;
    const adminData: Partial<User> = {
      email: "anupmhrzn16@gmail.com",
      password: "12345678",
    };

    beforeAll(async () => {
      authToken = (await request(baseURL).post("/api/v1/user/login").send(adminData)).body.token;
      const response = await request(baseURL)
        .get("/api/v1/user")
        .set("Authorization", `Bearer ${authToken}`);
      user_id = response.body.data[0].user_id;
    });

    it("Admin: fetch user by correct user_id", async () => {
      const response = await request(baseURL)
        .get(`/api/v1/user/${user_id}`)
        .set("Authorization", `Bearer ${authToken}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.data).toMatchObject<User>;
    });

    it("Admin: fetch user by wrong user_id", async () => {
      const response = await request(baseURL)
        .get("/api/v1/user/12431897-b916-4e59-8cbd-58064b8139cf")
        .set("Authorization", `Bearer ${authToken}`);
      expect(response.statusCode).toBe(404);
      expect(response.body.status).toBe("fail");
      expect(response.body.message).toBe("User not found");
    });
  });

  describe("delete a user", () => {
    let authToken: string;

    const adminData: Partial<User> = {
      email: "anupmhrzn16@gmail.com",
      password: "12345678",
    };

    const userData: Partial<User> = {
      email: "zeroo3442@gmail.com",
      password: "12345678",
    };

    beforeAll(async () => {
      authToken = (await request(baseURL).post("/api/v1/user/login").send(adminData)).body.token;
      const response = await request(baseURL).post("/api/v1/user").send(userData);
      userData.user_id = response.body.data.user_id;
    });

    afterAll(async () => {
      await request(baseURL)
        .delete(`/api/v1/user/${userData.user_id}`)
        .set("Authorization", `Bearer ${authToken}`);
    });

    it("Admin: delete user using correct id", async () => {
      const response = await request(baseURL)
        .post(`/api/v1/user/${userData.user_id}`)
        .set("Authorization", `Bearer ${authToken}`);
      const updatedData = response.body.data;
      const exists = userData.user_id == updatedData?.user_id;
      expect(exists).toBe(false);
    });
    it("Admin: delete user by wrong id", async () => {
      const response = await request(baseURL)
        .get("/api/v1/user/12431897-b916-4e59-8cbd-58064b8139cf")
        .set("Authorization", `Bearer ${authToken}`);
      expect(response.statusCode).toBe(404);
      expect(response.body.status).toBe("fail");
      expect(response.body.message).toBe("User not found");
    });
  });
});
