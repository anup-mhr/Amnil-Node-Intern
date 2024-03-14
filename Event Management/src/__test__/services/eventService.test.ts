import { AppDataSource } from "../../config/dbConfig";

jest.mock("../../config/dbConfig", () => ({
  AppDataSource: jest.fn((x) => x),
}));
jest.mock("../../models/Event");

describe("eventService test suite", () => {
  describe("create event test suite", () => {
    it("return created event", async () => {
      AppDataSource.getRepository(Event).save(Event);
    });
  });
});
