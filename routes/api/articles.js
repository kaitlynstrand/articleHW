const router = require('express').Router();
const articlesController = require('../../controllers/articlesController');

//matches with "/api/articles"
router.route('/')
	.get(articlesController.findAll)
	.post(articlesController.create);

//only if need another page? page for saved articles? '/api/articles/:id'?
router
.route("/:id")
.get(articlesController.findById)
.delete(articlesController.remove);

module.exports = router;