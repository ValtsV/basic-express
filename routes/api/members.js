const express = require("express");
const uuid = require("uuid");
const members = require("../../members");
const router = express.Router();

// Gets members
router.get("/", (req, res) => {
  res.json(members);
});

// get single member

router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: "Member not found" });
  }
});

//  create member

router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };
  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "Please include name and email" });
  }

  members.push(newMember);
  res.json(members);
});

module.exports = router;
