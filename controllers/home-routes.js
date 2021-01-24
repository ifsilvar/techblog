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
    res.render('home', { blogs, loggedIn: req.session.loggedIn });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/new', withAuth, (req, res) => {
  res.render('new', { loggedIn: req.session.loggedIn } )
})

router.get('/show/:id', async (req, res) => {
  try{ 
      const blogData = await Blog.findByPk(req.params.id);
      if(!blogData) {
          res.status(404).json({message: 'No blog with this id!'});
          return;
      }
      const blog = blogData.get({ plain: true });
      res.render('show', {blog, loggedIn: req.session.loggedIn });
    } catch (err) {
        res.status(500).json(err);
    };     
});

router.get("/myblogs", withAuth, async (req, res) => {
  const userData = await User.findByPk(req.session.user_id, { include: [Blog] })
  console.log(userData.dataValues.blogs)
  res.render("myblog", {
    loggedIn: req.session.loggedIn,
    userData: userData.dataValues.blogs || []
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



