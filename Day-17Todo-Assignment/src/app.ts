import express from 'express';

const app = express();
app.use(express.json({ limit: '16kb' }));

// import routes
import userRoute from './routes/user.routes';
import todoRoute from './routes/todo.routes';

// initialize route
app.use('/api/v1/user', userRoute);
app.use('/api/v1/todo', todoRoute);

export default app;
