import {Sequelize} from 'sequelize-typescript';
import db from "../../config/db";

const sequelize = new Sequelize(db.mysql.database, db.mysql.user, db.mysql.password, {
    // 主机
    host: db.mysql.host,
    // 自定义端口3306
    port: db.mysql.port,
    // 数据库类型
    dialect: 'mysql',
    // 连接池
    pool: {
        max: 5, // 连接池中最大连接数量
        min: 0, // 连接池中最小连接数量
        acquire: 30000,
        idle: 10000, // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
    },
    timezone: '+08:00', // 东八区
})

// 验证连接数据库
sequelize.authenticate().then(() => {
        console.log('数据库连接成功')
    }
).catch(err => {
        console.log('数据库连接失败')
        throw  err
    }
)

export default sequelize;