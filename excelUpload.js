const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const multiparty = require("multiparty");
const xlsx = require("xlsx");
const app = express();
const dbConnection = require("./mssqlConnection");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    limit: "150mb",
    extended: false,
  })
);

app.get("/", (req, res, next) => {
  let contents = "";
  contents += "<html><body>";
  contents +=
    '   <form action="/" method="POST" enctype="multipart/form-data">';
  contents += '       <input type="file" name="xlsx" />';
  contents += '       <input type="submit" />';
  contents += "   </form>";
  contents += "</body></html>";

  res.send(contents);
});

app.post("/", (req, res, next) => {
  const resData = {};

  const form = new multiparty.Form({
    // 여기서 multiparty 를 이용해 Form 데이터를 처리함.
    autoFiles: true, // autoFiles 를 true로 지정하면 POST 방식으로 전달된 파일만 처리할 수 있음.
  });

  form.on("file", (name, file) => {
    const workbook = xlsx.readFile(file.path); // 전달된 파일을 객체로 변환
    const sheetnames = Object.keys(workbook.Sheets);

    let i = sheetnames.length;
    while (i--) {
      const sheetname = sheetnames[i];
      resData[sheetname] = xlsx.utils.sheet_to_json(workbook.Sheets[sheetname]);
      testData = resData.test;

      dbConnection.insertTable("test", testData);
      dbConnection.SelectTable("test");
    }
  });

  form.on("close", () => {
    res.send(resData);
  });

  form.parse(req);
});

http.createServer(app).listen(3000, () => {
  console.log("HTTP server listening on port " + 3000);
});
