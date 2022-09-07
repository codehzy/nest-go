import { Injectable } from '@nestjs/common';
import sequelize from "../database/sequelize";
import * as Sequelize from "sequelize";

@Injectable()
export class TodosService {

    // 查询某一个todo
    async findOne(title: string): Promise<any | undefined>{
        const sql = `SELECT title,description,status
                     FROM 
                        todos
                     WHERE
                        title = '${title}'
        `

        try {
            const res = await sequelize.query(sql,{
                type: Sequelize.QueryTypes.SELECT, // 查询方式
                raw: true, // 是否使用数组组装的方式展示结果
                logging: true // 是否打印sql语句
            })

            const todo = res[0]
            if(todo){
                return {
                    code: 200,
                    data: {
                        todo
                    },
                }
            }else{
                return{
                    code: 600,
                    msg: '查无这个todo'
                }
            }
        } catch (err){
            return {
                code: 503,
                msg: '数据库查询错误'
            }
        }
    }
}
