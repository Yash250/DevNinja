const ProductRouter = require('./product');
const userRouter = require('./user')

const routesInit = (app) => {
  app.use('/products', ProductRouter);
  app.use('/user', userRouter);
  return app;
};

module.exports = routesInit;
