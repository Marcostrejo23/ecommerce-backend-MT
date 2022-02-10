const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const tag = await Tag.findAll({
      include: [
        { model: Product, attributes: { exclude: [`createdAt`, `updatedAt`] } },
      ],
      through: { attributes: { exclude: [`createdAt`, `updatedAt`] } },
      attributes: { exclude: [`createdAt`, `updatedAt`] },
    });
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tag = await Tag.findOne({
      where: { id: req.params.id },
      include: {
        model: product,
        attributes: { exclude: [`createdAt`, `updatedAt`] },
      },
      through: { attributes: { exclude: [`createdAt`, `updatedAt`] } },
    });
    res.status(200).json({ message: tag ? res.json(tag) : "no tag found" });
  } catch (err) {
    res.status(400).json(err);
  }
});
router.post("/", async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updateTag = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    res
      .status(200)
      .json({ message: updateTag[0] ? `Tag updated` : `No tag found.` });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleteTag = await Tag.destroy({
      where: { id: req.params.id },
    });
    res
      .status(200)
      .json({ message: deleteTag ? "Tag has been deleted" : `No tag found.` });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
