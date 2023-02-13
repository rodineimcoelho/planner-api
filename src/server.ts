import app from './app';

import dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/../.env` });

const port = process.env.PORT || 80;

app.listen(port, () => {
  console.log(`Server running and listening to port ${port}`);
});
