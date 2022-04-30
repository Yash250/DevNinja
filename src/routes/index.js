const ProductRouter = require('./product');
const userRouter = require('./user')
const categoryRouter = require('./category')
const bannerRouter = require('./banner')
const orderRouter = require('./order')

const routesInit = (app) => {
  app.use('/product', ProductRouter);
  app.use('/user', userRouter);
  app.use('/category', categoryRouter);
  app.use('/banner', bannerRouter)
  app.use('/order', orderRouter)
  return app;
};

module.exports = routesInit;
