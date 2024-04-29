import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({log : ["query"]});


class DB{
    async createone(){
        const user = await prisma.user.create({data : {
            first_name : "reza",
            last_name : "rzi", 
            age : 16,
            email : "reza.rzi@gmail.com"
        },
        select : {
            first_name : true,
            age : true
        }});
        
        if(!user) throw "wasn't created user";
        console.log(user);
    };
    async createmany(){
        const users = await prisma.user.createMany({data : [{
            first_name : "ss",
            last_name : "mm", 
            age : 21,
            email : "ssmm@gmail.com"
        },{
            first_name : "mohamd",
            last_name : "sepehr", 
            age : 24,
            email : "mmd.sepi@gmail.com"
        }]});
        
        if(!users) throw "wasn't created users";
        console.log(users);
    };
    async getAll(){
        //const userFinder = await prisma.user.findFirst({});
        const userFinder = await prisma.user.findMany({});
        if(!userFinder) throw "didnt find any user";
        console.log(userFinder);
    };
    async getById(){
        const userFinder = await prisma.user.findUnique({
            where : {
                id : "7c961a1b-a739-47cf-922e-eec7d73aadc4"
            }
        });
        if(!userFinder) throw "didnt find any user";
        console.log(userFinder);
    };
    async updateOne(){
        const updateUser = await prisma.user.update({
            where : {
                id : "7c961a1b-a739-47cf-922e-eec7d73aadc4"
            },
            data : {
                phoneNumber : "09152056577"
            }
        });
        if(!updateUser) throw "wasnt updated  user";
        console.log(updateUser);
    };
    async updateMany(){
        const updateUsers = await prisma.user.updateMany({
            where : {
                email : ".com"
            },
            data : {
                email : "arsify.ir"
            }
        });
        if(!updateUsers) throw "wasnt updated any user";
        console.log(updateUsers);
    };
    async deleteOne(){
        const deleteUser = await prisma.user.delete({
            where : {
                id : "46fcf659-28cb-4a01-8ef5-6b6d84668550"
            }
        });
        if(!deleteUser) throw "wasnt delete user";
        console.log(deleteUser);
    };
    async deleteMany(){
        await prisma.user.deleteMany();
    };
};

const DataBase = new DB();

function runCode(Code : Function){
    try {
        prisma.$connect();
        console.log("prisma connect");
        Code();
    } catch (error) {
        prisma.$disconnect();
        console.log("prisma disconnect");
        console.error(error);   
    }
};

runCode(DataBase.createone);
//runCode(DataBase.createmany);
//runCode(DataBase.getAll);
//runCode(DataBase.getById);
//runCode(DataBase.updateOne);
//runCode(DataBase.updateMany);
//runCode(DataBase.deleteMany);
//runCode(DataBase.deleteOne);



