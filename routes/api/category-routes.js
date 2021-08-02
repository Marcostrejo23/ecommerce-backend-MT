const router = require('express').Router();
const { json } = require('sequelize/types');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//find all categories 
router.get('/', async (req, res) => {
  try{
    const categoryInformation = await Category.findAll ({
      include: { model: Product}
    })
    res.status(200).json(categoryInformation)
  }catch (err){
    res.status(404).json(err)
  }
});

//find one category by its id
router.get('/:id', (req, res) => {
  try{
    const categoryInformation = await Category.findOne({
      where: {id:req.params.id},
      include: {model: Product},
    })
    res.status(200).json({message:categoryInformation ? res.json(categoryInformation): "please select from a different category"});
  }catch (err){
    res,status(400).json(err)
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  try{
    const newCategory = await Category.create(req.body);
  res.status(200).json(newCategory)
  }catch(err){
    res.status(200).json({message:editCategory[0] ? 'Category update' : 'Category unavailable'})
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(req.body,{
      where:{id:req.params.id},
    })
   console.log(updateCategory)
   res.status(200).json({message:updateCategory[0] ? 'Category update' : 'Category unavailable'})
  }catch (err){
    res.status(400).json(err)
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value

});

module.exports = router;
