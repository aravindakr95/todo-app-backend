import { connect } from 'mongoose';
import config from '../../configs/config';
import EnvironmentType from '../../enums/state/environment-type';

export default function initializeDB() {
  let uri = null;

  if (config.environment === EnvironmentType.PRODUCTION) {
    uri = `mongodb+srv://${config.database.user}:${config.database.credentials}`
        + `@se-tracking-engine.jw1zk.mongodb.net/${config.database.name}?retryWrites=true&w=majority`;
  } else {
    uri = `${config.database.devUri}/${config.database.name}?retryWrites=true&w=majority`;
  }

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
