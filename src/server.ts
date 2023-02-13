import app from './app';

import dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/../.env` });

const port = process.env.PORT || 80;

app.listen(3000, () => {
  console.log(`Server running and listening to port ${port}`);
});
