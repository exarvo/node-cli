import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import open from "open";

const interpolate = (html, data) => {
  return html.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, placeholder) => {
    return data[placeholder] || "";
  });
};

const formatNotes = (notes) => {
  return notes
    .map((note) => {
      return `
      <div class='note'>
        <p>${note.content}</p>
        <div class="tags">
          ${note.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
        </div>
      </div>
    `;
    })
    .join("\n");
};

const makeServer = (notes) => {
  return createServer(async (req, res) => {
    const HTML_PATH = new URL("./template.html", import.meta.url).pathname;
    const template = await readFile(HTML_PATH, "utf-8");
    const html = interpolate(template, { notes: formatNotes(notes) });

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  });
};

export const start = (notes, port) => {
  const server = makeServer(notes);

  server.listen(port, () => {
    const address = `http://localhost:${port}`;
    console.log(`Server running on ${address}`);
    open(address);
  });
};
