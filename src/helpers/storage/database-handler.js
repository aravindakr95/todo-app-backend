import { connect } from 'mongoose';

export default function initializeDB() {
  const uri = 'mongodb://127.0.0.1:27017/app-data?retryWrites=true&w=majority';

  connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }).then(() => {
    console.log(`Connected to ${uri}`);
  }).catch((error) => {
    console.log(`Database starting error: ${error.message}`);
    process.exit(1);
  });
}
