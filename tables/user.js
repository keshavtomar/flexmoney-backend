const {PrismaClient} = require("@prisma/client");
const client = new PrismaClient();

const usertable=async()=>{
    const classes = await client.user.findMany();
    console.log(classes);
}

module.exports = usertable;