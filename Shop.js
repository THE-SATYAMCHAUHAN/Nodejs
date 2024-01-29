const expess =require('express');
const router=expess.Router();

router.get('/',(req,res ,next)=>{
    res.send('<h1>Hello From express!</h1>');
  });

module.exports=router;