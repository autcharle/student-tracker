const LogInModel = require("../../models/logInModel");

module.exports = async (req, res) => {
  /*const login = await LogInModel.find();
    console.log(login[0]);
    res.json(login);*/
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("Missing required attributes.");
  }
  const login = new LogInModel({
    username,
    password,
  });
  const newLogin = await login.save();
  res.json(newLogin);
};
