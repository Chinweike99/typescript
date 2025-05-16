// src/index.ts
import express from "express";
var app = express();
var PORT = process.env.PORT || 3e3;
app.get("/", (req, res) => {
  res.json({ message: "Hello from TypeScript Backend!" });
});
app.get("/api/status", (req, res) => {
  res.json({
    status: "running",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    environment: process.env.NODE_ENV || "development"
  });
});
app.listen(PORT, () => {
  console.log(`Server,,, running on.... port ${PORT}`);
});
var index_default = app;
export {
  index_default as default
};
