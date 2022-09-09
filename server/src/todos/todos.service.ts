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

    // 查询所有todo
    async findAll(): Promise<any | undefined>{
        const sql = `SELECT * from todos`
        try {
            const res = await sequelize.query(sql,{
                type: Sequelize.QueryTypes.SELECT, // 查询方式
                raw: true, // 是否使用数组组装的方式展示结果
                logging: true // 是否打印sql语句
            })

            if(res.length){
                return{
                    code: 200,
                    data: {
                        res
                    }
                }
            }
        }catch (err){
            return {
                code: 503,
                msg: '数据库查询错误'
            }
        }
    }

    // 创建todo
    async createOne(title: string, description: string, status: number): Promise<any | undefined>{
        const sql = `INSERT INTO todos (title,description,status) VALUES ('${title}','${description}',${status})`
        console.log(sql)
        try {
            await sequelize.query(sql,{logging:false})

            return {
                code: 200,
                msg: '创建成功',
            };

        } catch (err){
            return {
                code: 503,
                msg: '创建失败'
            }
        }
    }

    // 更新todo
    async updateOne(title: string, description: string, status: number): Promise<any | undefined>{
        const sql = `UPDATE todos SET description = '${description}', status = ${status} WHERE title = '${title}'`
        
        try {
            await sequelize.query(sql,{logging:false})

            return {
                code: 200,
                msg: '更新成功'
            }
        }catch (err) {
            return {
                code: 503,
                msg: '更新失败'
            }
        }
    }

    // 删除todo
    async deleteOne(title: string): Promise<any | undefined>{
        const sql = `DELETE FROM todos WHERE title = '${title}'`
        
        try {
            await sequelize.query(sql,{logging: false})

            return {
                code: 200,
                msg: '删除成功'
            }
        }catch (e) {
            return {
                code: 503,
                msg: '删除失败'
            }
        }
    }
}
