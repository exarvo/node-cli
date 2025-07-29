import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
  dateConvert,
  deleteAllNotes,
  findNotes,
  getAllNotes,
  newNote,
  removeNote,
} from "./notes.js";
import { start } from "./server.js";

const formatCLI = (extracted) => {
  extracted.forEach(({ id, content, tags }) => {
    console.log("id: ", id);
    console.log("tags: ", tags);
    console.log("content: ", content);
    console.log("\n");
  });
};

yargs(hideBin(process.argv))
  .alias({
    help: "h",
    version: "v",
    tag: "t",
  })
  .command(
    "new <content>",
    "Create a new note",
    (yargs) => {
      return yargs.positional("content", {
        describe: "The content of the note you want to create.",
        type: "string",
      });
    },
    async (argv) => {
      const tags = argv.tag ? argv.tag.split(",") : [];
      const note = await newNote(argv.content, tags);
      formatCLI([note]);
    }
  )
  .option("tag", {
    type: "string",
    description: "Add tags to a note",
  })
  .command(
    "all",
    "Find all Notes",
    () => {},
    async () => {
      const notes = await getAllNotes();
      formatCLI(notes);
    }
  )
  .command(
    "find <filter>",
    "Find matching notes",
    (yargs) => {
      return yargs.positional("filter", {
        describe:
          "The search term to filter the notes, it will be applied to note.content",
        type: "string",
      });
    },
    async (argv) => {
      const matched = await findNotes(argv.filter);
      formatCLI(matched);
    }
  )
  .command(
    "remove <id>",
    "Remove a note by its ID",
    (yargs) => {
      return yargs.positional("id", {
        type: "number",
        description: "The ID of the note you want to remove.",
      });
    },
    async (argv) => {
      const id = await removeNote(argv.id);
      console.log(id);
    }
  )
  .command(
    "web [port]",
    "Launch website to see notes!",
    (yargs) => {
      return yargs.positional("port", {
        describe: "Port to bind on.",
        default: 5000,
        type: "number",
      });
    },
    async (argv) => {
      const notes = await getAllNotes();
      start(notes, argv.port);
    }
  )
  .command(
    "wipe",
    "Delete all the notes",
    () => {},
    async () => {
      const notes = await getAllNotes();
      formatCLI(notes);
      deleteAllNotes();
    }
  )
  .command(
    "time",
    "Show time for all the Notes",
    () => {},
    async () => {
      await dateConvert();
    }
  )
  .demandCommand(1)
  .parse();
