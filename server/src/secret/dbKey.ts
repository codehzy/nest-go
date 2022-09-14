const productionConfig = {
  mysql: {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test',
    port: 3306,
    connectionLimit: 10,
  },
};

const developmentConfig = {
  mysql: {
    host: 'localhost',
    user: 'root',
    password: 'hzy1314..',
    database: 'todo',
    port: 3306,
    connectionLimit: 10,
  },
};

const Openconfig =
  process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig;

export default Openconfig;
