const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try{
    const tagData = await Tag.findAll({
      include: [{ model: product }],
    });
    res.status(200).json(tagData);
  }catch (err) {
    res.status(500).json(err);
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) =>{
  
  try{ 
   const tagDAta = await Tag.findOne({
     where: {id:req.params.id},
     include: {model:product,attributes:{exclude:[`createdAt`, `updatedAt`]}},
     through:{attributes: {exclude: [`createdAt`,`updatedAt`]}},
   })
   res.status(200).json(message:tag ? res.json(tag): 'no tag found')
  }catch(err){
    res.status(400).json(err)
  }; 

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag)
  }catch(err){
    res.status(400).json(err)
  }
  // create a new tag
});

router.put('/:id', async (req, res) => {
  try{
    const updateTag = await Tag.update(req.body,{
      where: {id:req.params.id},
    })
    res.status(200).json({message:updateTag[0] ? `Tag updated` :`no tag found.` })
  }catch(err){
    res.status(400).json(err)
  }
  // update a tag's name by its `id` value

});

router.delete('/:id', (req, res) => {
  try{
    const deleteTag = await Tag.destroy({
      where: {id:req.params.id}
    });
    res.status(200).json({message:deleteTag ? 'Tag has been deleted' : `No tag found.`})
  }catch(err){
    res.status(400).json(err)
  }
  // delete on tag by its `id` value
});

module.exports = router;
