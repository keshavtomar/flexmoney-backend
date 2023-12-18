const {PrismaClient} = require("@prisma/client");
const client = new PrismaClient();

const classtable=async()=>{
    const classes = await client.class.findMany();
    console.log(classes);
}

module.exports = classtable;