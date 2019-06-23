router.post('/login', (req, res) => {
    User.findOne({where: {username: req.body.username}})
      .then(user => {
        console.log(user);
        if (user && bcrypt.compareSync(req.body.password, user.password)){
          let token = jwt.sign({id: user.id}, 'secret_key', {expiresIn: 60 * 60 * 24});
          res.status(200).json({message: 'login success', user, token})
        } else {
          res.status(500).json({message: 'invalid credentials'})
        }
      })
      .catch(err => res.status(500).json({error: err.message}))
  })