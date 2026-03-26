import nextVitals from "eslint-config-next/core-web-vitals.js";
import nextTs from "eslint-config-next/typescript.js";

console.log("nextVitals type:", typeof nextVitals);
console.log("is nextVitals iterable?:", Symbol.iterator in Object(nextVitals));
console.log("nextVitals keys:", Object.keys(nextVitals));
console.log("nextTs type:", typeof nextTs);
console.log("is nextTs iterable?:", Symbol.iterator in Object(nextTs));
