import { jest } from "@jest/globals";
import { getDB, setDB } from "../src/db";

jest.unstable_mockModule("../src/db.js", () => {
  getDB: jest.fn();
  setDB: jest.fn();
});

const { getDB, setDB } = await import("../src/db.js");
const { newNote, getAllNotes, removeNote } = await import("../src/notes.js");

jest.beforeEach(() => {
  getDB.mockClear();
  setDB.mockClear();
});

test("newNote inserts data and returns it", async () => {
  const data = {
    tags: ["tag1", "tag2"],
    content: "Sample content",
    id: Date.now(),
  };
  insert.mockResolvedValue(data);

  const result = await newNote(data.content, data.tags);
  expect(result).toEqual(data);
});

test("getAllNotes returns all notes", async () => {
  const db = {
    notes: ["note1", "note2", "note3"],
  };
  getDB.mockResolvedValue(db);

  const result = await getAllNotes();
  expect(result).toEqual(db.notes);
});

test("removeNotes does nothing if id is not found", async () => {
  const notes = [
    { id: 1, content: "note 1" },
    { id: 2, content: "note 2" },
    { id: 3, content: "note 3" },
  ];
  setDB.mockResolvedValue(notes);

  const idToRemove = 4;
  const result = await removeNote(idToRemove);
  expect(result).toBeUndefined();
});
