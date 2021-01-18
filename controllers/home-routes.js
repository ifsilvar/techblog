const router = require('express').Router();
const { Blog, User } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll().catch((err) => { 
      res.json(err);
    });
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    res.render('homepage', { blogs });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
    const blogData = await Blog.findAll().catch((err) => { 
    res.json(err);
  });
  const blogs = blogData.map((blog) => blog.get({ plain: true }));
  res.render('dashboard', { blogs });

  // console.log(blogData.dataValues.blogs)
  // res.render("dashboard", {
  //   logged_in: req.session.logged_in,
  // });
});

router.get('/dashboard/:id', async (req, res) => {
  try{ 
      const blogData = await Blog.findByPk(req.params.id);
      if(!blogData) {
          res.status(404).json({message: 'No blog with this id!'});
          return;
      }
      const blog = blogData.get({ plain: true });
      res.render('blog', blog);
    } catch (err) {
        res.status(500).json(err);
    };     
});

// router.get("/dashboard", withAuth, async (req, res) => {
//   const userData = await User.findByPk(req.session.user_id, { include: [Blog] })
//   console.log(userData.dataValues.blogs)
//   res.render("dashboard", {
//     logged_in: req.session.logged_in,
//   });
// });

router.get("/blogs", withAuth, async (req, res) => {
  try {
    res.render("blogs", {
      logged_in: req.session.logged_in,
    });
} catch (err) {
  console.log(err);
  res.status(500).json(err);
}
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
