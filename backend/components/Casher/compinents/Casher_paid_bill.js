import express from "express";
const app = express.Router();
const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

app.get('/test', (req, res)=>{
  res.send("caasher is working")
})


export default app;