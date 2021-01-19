const router = require('express').Router();
const {Blog} = require('../models');
const {User} = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll().catch((err) => { 
      res.json(err);
    });
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    res.render('home', { blogs });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/new', withAuth, (req, res) => {
  res.render('new')
})

router.get('/show/:id', async (req, res) => {
  try{ 
      const blogData = await Blog.findByPk(req.params.id);
      if(!blogData) {
          res.status(404).json({message: 'No dish with this id!'});
          return;
      }
      const blog = blogData.get({ plain: true });
      res.render('show', blog);
    } catch (err) {
        res.status(500).json(err);
    };     
});

router.get("/user", withAuth, async (req, res) => {
  const userData = await User.findByPk(req.session.user_id, { include: [Blog] })
  console.log(userData.dataValues.blogs)
  res.render("user", {
    logged_in: req.session.logged_in,
  });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;



