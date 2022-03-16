


router.get('/order/:order_key', async (req, res)=>{

    let {order_key} =req.params;

    try {

        let response_recipes_DB;
        
        if(order_key === 'asc'){ // isto é o mesmo que tenho no formulario, no meu caso seria 'a-z'
            response_recipes_DB = await Recipe.findAll({
                include: Diet,
                order:['name', 'ASC']
            }) 
        }

        if(order_key === 'des'){
            response_recipes_DB = await Recipe.findAll({
                include: Diet,
                order:['name', 'DESC']
            }) 
        }

        //NUMBER
        // sequelize.fn("max", sequelize.col("score"))



        res.json(response_recipes_DB);
        
    } catch (error) {
        console.log(error);
    }

})