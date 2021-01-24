const router = require('express').Router();
const {Blog} = require('../../models');

router.post('/', async (req, res) => {
    try {
      const dbUserData = await Blog.create({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown,
        user_id: req.session.user_id,
      });
      res.status(200).json(dbUserData)
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  });

router.put('/:id', async (req, res) => {
    try {
        const blog = await Blog.update(
        {
            title: req.body.title,
            description: req.body.description,
            markdown: req.body.markdown,
        },
        {
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json(err);
    };
});

module.exports = router;