const expess = require('express');
const router= expess.Router();

router.get('/add-product',(req,res ,next)=>{
    res.send('<form method="post"><input type="text" name="tittle"><button type=submit>Add Product</button><input type="number" name="size"><button type=submit>Product Size</button></form>');
  });
  
router.post('/add-product',(req,res,next)=>{
      console.log(req.body);
      res.redirect('/');
  });

module.exports=router;