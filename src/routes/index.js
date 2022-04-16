const ProductRouter = require('./product');
const userRouter = require('./user')
const categoryRouter = require('./category')
const bannerRouter = require('./banner')

const routesInit = (app) => {
  app.use('/product', ProductRouter);
  app.use('/user', userRouter);
  app.use('/category', categoryRouter);
  app.use('/banner', bannerRouter)
  return app;
};

module.exports = routesInit;
