const express = require('express');
const jwt = require('jsonwebtoken');

// local imports 
const { createUser, getUserByUsernameAndPassword } = require('../Database/UserRepository');
const { getAllDebts, getDebtById, syncDebt } = require('../Database/DebtRepository');
const jwtAuth = require('../Middleware/jwtAuth');

const router = express.Router();

router.get('/default', async (req, res) => {
  const returned = await createUser('apitest', 'test123');
  if (returned.success) {
    const data = jwt.sign({ id: returned.user.id }, "secretkey", { expiresIn: '1h' });
    res.json({ "response": { "token": data } });
  } else {
    res.status(200).json({ username: 'apitest' });
  }
});

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username, password);
  const response = await getUserByUsernameAndPassword(username, password);
  if (response.success) {
    const data = jwt.sign({ id: response.user.id }, "secretkey", { expiresIn: '1h' });
    res.json({ "response": { "token": data } });
  } else {
    res.status(400).json({ error: 'User login failed' });
  }
});

router.post("/sync", jwtAuth, async (req, res) => {
  const { username, amount, type, description } = req.body;
  console.log(`sync route called with: username=${username}, amount=${amount}, type=${type}, description=${description}`);
  if (username.trim().length > 0) {
    const debt = await syncDebt(username, amount, type, description);
    if (debt.success) {
      res.json({ response: debt });
    } else {
      res.status(400).json({ error: 'Debt sync failed' });
    }
  } else {
    res.status(400).json({ error: 'Invalid input' });
  }
});

router.patch("/get", jwtAuth, async (req, res) => {
  const fieldData = req.body.fieldData;
  const script = req.body.script;

  if (script == "getData") {
    const username = fieldData["id"];
    const debts = await getDebtById(username);
    if (debts.success)
      return res.status(200).json({ "response": { "scriptResult": debts } });
    return res.status(400).json({ error: debts.error });

  }
  else if (script == "getAllData") {
    const debts = await getAllDebts();
    if (fieldData["sort"] === "desc") {
      return res.status(200).json({ "response": { "scriptResult": debts.debts } });
    } else {
      return res.status(200).json({ "response": { "scriptResult": debts.debts.reverse() } });
    }

  }
  else {
    return res.status(400).json({ error: 'Invalid input' });
  }

});

router.get('/example', (req, res) => {
  res.json({ message: 'This is an example route' });
});

module.exports = router;
