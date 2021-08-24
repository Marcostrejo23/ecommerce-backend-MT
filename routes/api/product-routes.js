const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  try{
    const product = await Product.findAll({
      include: [{ model:Category, attributes:{exclude: [`createdAt` , `updatedAt`]}}],
      through:{attributes: {exclude: [`createdAt`, `updatedAt`]}},
      attributes: {exclude: [`createdAt`, `updatedAt`]}
    })
    res.status(200).json(product);
  }catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) =>{
  try{ 
   const product = await Product.findOne({
     where: {id:req.params.id},
     include: {model:Category,attributes:{exclude:[`createdAt`, `updatedAt`]}},
     through:{attributes: {exclude: [`createdAt`,`updatedAt`]}},
    })
    res.status(200).json({message:product ? res.json(product): 'no product found'})
  }catch(err){
  res.status(500).json(err)
  }
});
// router.post('/', (req,res) =>{
//   Product.create(req.body)
//   .then((product) =>{
//     if (req.body.tagIds.length){
//       const tagIdArr= req.body.tagIds.map((tag_id) =>{
//         return{product_id: product.id, tag_id,};
//       })
//     }
//   });
//   return ProductTag.bulkCreate(tagIdArr);
// }).then((productTagIds) => res.status(200).json(productTagIds)).catch((err) =>{
//   console.log(err);
//   res.status(400).json(err);
// });
// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags)).catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try{
    const deleteProduct = await Product.destroy({
      where:{id:req.params.id}
    });
    res.status(200).json({message:deleteProduct ? `Product has been deleted` : `No product found.`})
  }catch(err){res.status(400).json(err)}
});

module.exports = router;
