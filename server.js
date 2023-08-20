// const Logger = require("./logger");
// const fs = require("node:fs");
// const path = require("node:path");

// const emitterObj = new Logger();

// emitterObj.on("message", (data) => {
//   fs.writeFile(
//     path.join(__dirname, "reference/test/new.txt"),
//     `${JSON.stringify(data)} `,
//     { flag: "a", encoding: "utf8" },
//     (err) => {
//       if (err) {
//         throw err;
//       }
//       console.log("The data is written to the newly created file...");
//     }
//   );
// });

// emitterObj.log("Hello World");

const path = require("node:path");
const http = require("node:http");
const fs = require("node:fs");

const server = http.createServer((req, res) => {
  // if (req.url === "/") {
  //   fs.readFile(path.join(__dirname, "public", "index.html"), (err, data) => {
  //     if (err) {
  //       throw err;
  //     }
  //     res.writeHead(200, { "Content-Type": "text/html" });
  //     res.write(data);
  //     res.end();
  //   });
  // } else if (req.url === "/about") {
  //   fs.readFile(
  //     path.join(__dirname, "public", "about.html"),
  //     (err, content) => {
  //       if (err) {
  //         throw err;
  //       }
  //       res.writeHead(200, { "Content-Type": "text/html" });
  //       res.write(content);
  //       res.end();
  //     }
  //   );
  // } else if (req.url === "/api/users") {
  //   const users = [
  //     { name: "Sourav", age: 21 },
  //     { name: "Varun", age: 30 },
  //     { name: "Matt", age: 23 },
  //   ];
  //   res.writeHead(200, { "Content-Type": "application/json" });
  //   res.end(JSON.stringify(users));
  // }

  // Build the file path
  const filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );
  console.log(filePath);

  // Extension of the path file
  const extName = path.extname(filePath);
  let contentType = "text/html";
  switch (extName) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        // PAGE NOT FOUND
        fs.readFile(path.join(__dirname, "public", "404.html"), (err, data) => {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.write(data);
          res.end();
        });
      } else {
        // SERVER ERROR
        res.writeHead(500);
        res.end(`Server error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data, "utf-8");
    }
  });
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
