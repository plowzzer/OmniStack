// index, show, store, update, destroy

// index = listagem
// show = unica
// store = criar
// update = editar
// destory = deletar
const User = require("../models/User");

module.exports = {
  async store(req, res) {
    const { email } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email });
    }

    return res.json(user);
  }
};
