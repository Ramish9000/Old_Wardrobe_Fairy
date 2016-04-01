var User = require('../models/user');

function createUser(req, res){
  var user = new User(req.body);
  user.save(function(error){
    if (error) return res.status(403).send({message: error})
    else return res.status(200).send(user);
    console.log(user)
  });
}

function showUser(req, res){
  var id = req.params.id;
  User.findById({_id: id}, function(error, user){
    if (error) return res.status(404).send({message: error})
    else return res.status(200).send(user);
  });
}

function updateUser(req, res){
  var id = req.params.id;
  User.findById({_id: id}, function(error, user) {
    if (error) return res.status(404).send({message: error})

    if (req.body.name) user.name = req.body.name;
    if (req.body.username) user.username = req.body.username;
    if (req.body.email) user.email     = req.body.email;

    user.save(function(error) {
      if (error) return res.status(500).send({message: "An error occurred while updating the account."})
      return res.status(200).send(user);
    });
  });
}

function deleteUser(req, res){
  var id = req.params.id;
  User.remove({_id: id}, function(error) {
    if (error) res.status(404).send({message: error})
    res.status(204);
  });
  return;
}


module.exports = {
  createUser: createUser,
  showUser  : showUser,
  updateUser: updateUser,
  deleteUser: deleteUser
}