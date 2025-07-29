import { getDB, setDB } from "./db.js";

const insert = async (note) => {
  const db = await getDB();
  db.notes.push(note);
  await setDB(db);
  return note;
};

export const newNote = async (content, tags) => {
  const makeNote = {
    content,
    tags,
    id: Date.now(),
  };
  await insert(makeNote);
  return makeNote;
};

// The getAllNotes function returns the array of all the notes. Example: notes is a key and has array [] of values. Running this function returns an array.

export const getAllNotes = async () => {
  const { notes } = await getDB();
  return notes;
};

export const findNotes = async (filter) => {
  const { notes } = await getDB();
  return notes.filter((note) =>
    note.content.toLowerCase().includes(filter.toLowerCase())
  );
};

export const removeNote = async (id) => {
  const { notes } = await getDB();
  const match = notes.find((note) => note.id === id);
  if (match) {
    const newNotes = notes.filter((note) => note.id !== id);
    await setDB({ notes: newNotes });
    return id;
  }
};

export const deleteAllNotes = () => {
  setDB({ notes: [] });
  console.log("All the notes got wiped out!");
};

export const dateConvert = async () => {
  const { notes } = await getDB();
  notes.forEach((note) => {
    console.log(new Date(note.id.toNumber()));
  });
};
