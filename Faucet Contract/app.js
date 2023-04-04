const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})

app.get("/index.html", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})

app.listen(3000, () => {
  console.log('Server started on port 3000');
});