import Openconfig from 'src/secret/dbKey';

const productionConfig = {
  mysql: Openconfig.mysql,
};

const developmentConfig = {
  mysql: Openconfig.mysql,
};

const config =
  process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig;

export default config;
