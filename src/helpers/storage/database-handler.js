import { connect } from 'mongoose';

import config from '../../configs/config';
import loglevel from '../../configs/log-level';

import EnvironmentType from '../../enums/state/environment-type';

export default function initializeDB() {
  loglevel.info('[storage][databaseHandler]: Start');
  let uri = null;

  if (config.environment === EnvironmentType.PRODUCTION) {
    uri = `mongodb+srv://${config.database.user}:${config.database.credentials}`
        + `@${config.database.prodUri}/${config.database.name}?retryWrites=true&w=majority`;
  } else {
    uri = `${config.database.devUri}/${config.database.name}?retryWrites=true&w=majority`;
  }

  connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }).then(() => {
    loglevel.info(`Connected to ${uri}`);
    loglevel.info('[storage][databaseHandler]: Finish');
  }).catch((error) => {
    loglevel.error(`Database starting error: ${error.message}`);
    loglevel.info('[storage][databaseHandler]: Finish');
    process.exit(1);
  });
}
