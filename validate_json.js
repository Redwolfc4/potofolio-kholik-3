const fs = require("fs");
try {
  const en = JSON.parse(fs.readFileSync("src/data/en/certifications.json", "utf8"));
  console.log("EN OK - items:", en.items.length);
} catch(e) {
  console.log("EN ERR:", e.message);
}
try {
  const id = JSON.parse(fs.readFileSync("src/data/id/certifications.json", "utf8"));
  console.log("ID OK - items:", id.items.length);
} catch(e) {
  console.log("ID ERR:", e.message);
}
