const router         = require('express').Router();
const {Direction}    = require('../utils/db'); 
const _p             = require('../utils/promise_errors');
router.get('/:hash',async (req,res,next)=>{
    let hash = req.params.hash;
    if(!hash) next(new Error("No redirect found"));
    let [hashErr,hashfound] = await _p(Direction.findOne({
        hash
    }));
    if(hashErr && !hashfound){
        next(hashErr);
    }
    else{
        console.log(`dest: ${hashfound.destination}`);
        res.redirect(hashfound.destination);
    }
})



module.exports = router;