const ProductRouter = require('./product');
const userRouter = require('./user')
const categoryRouter = require('./category')

const routesInit = (app) => {
  app.use('/product', ProductRouter);
  app.use('/user', userRouter);
  app.use('/category', categoryRouter);
  return app;
};

module.exports = routesInit;
