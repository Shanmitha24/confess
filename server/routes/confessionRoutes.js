const express = require("express");
const router = express.Router();
const Confession = require("../models/Confession");

// name generator
const adjectives = ["Silent", "Lost", "Hidden", "Brave", "Lonely"];
const nouns = ["Soul", "Star", "Moon", "Heart", "Mind"];

const generateName = () => {
  const a = adjectives[Math.floor(Math.random() * adjectives.length)];
  const n = nouns[Math.floor(Math.random() * nouns.length)];
  return `${a} ${n}`;
};

// POST confession
router.post("/", async (req, res) => {
  try {
    const { text, mood } = req.body;

    const confession = await Confession.create({
      text,
      mood,
      anonymousName: generateName(),
    });

    res.status(201).json(confession);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET confessions
router.get("/", async (req, res) => {
  const confessions = await Confession.find().sort({ createdAt: -1 });
  res.json(confessions);
});

// DELETE
router.delete("/delete/:id", async (req, res) => {
  await Confession.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// LIKE
router.put("/:id/like", async (req, res) => {
  const confession = await Confession.findById(req.params.id);
  confession.likes += 1;
  await confession.save();
  res.json(confession);
});

// REPORT
router.put("/:id/report", async (req, res) => {
  const confession = await Confession.findById(req.params.id);
  confession.reports += 1;
  if (confession.reports >= 3) {
    confession.isHidden = true;
  }
  await confession.save();
  res.json(confession);
});

module.exports = router;
