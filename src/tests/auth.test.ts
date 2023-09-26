import {describe,expect,it} from 'vitest';
import request from 'supertest';
import app from 'lib/createServer';
import jwt from 'jsonwebtoken';

import prisma from './helpers/prisma'

describe('/auth',async()=>{
    describe('[POST]/auth/signup',async()=>{
        it('should respond with a `200` status code and user details',async()=>{
            const {status,body} = await request(app).post('/auth/signup').send({
                username:'testusername',
                password:'testpassword'
            })
        const newUser = await prisma.user.findFirst()
        expect(status).toBe(200)
        expect(newUser).not.toBeNull()
        expect(body.user).toStrictEqual({
            username: 'testusername',
            id: newUser?.id
         })
        })
    })
})
describe('/auth',async()=>{
    describe('[POST]/auth/signup',async()=>{
        it('should respond with a valid session token when successful',async()=>{
            const {body} = await request(app).post('/auth/signup').send({
                username:'testusername',
                password:'testpassword'
            })
        
        expect(body).toHaveProperty('token')
        expect(jwt.verify(body.token, process.env.API_SECRET as string))
        
        })
    })
})
describe('/auth',async()=>{
    describe('[POST]/auth/signup',async()=>{
        it('should respond with a `400` status code if a user exists with the provided username',async()=>{
            await prisma.user.create({
                data:{
                    username:'testusername',
                    password:'somepassword'
                }
            })
        const {status,body} = await request(app).post('/auth/signup').send({
            username:'testusername',
            password:'testpassword'
        })
        const count = await prisma.user.count()
        expect(status).toBe(400)
        expect(count).toBe(1)
        expect(body).not.toHaveProperty('user')
        
        })
    })
})

