const {PrismaClient} = require("@prisma/client");
const client = new PrismaClient();

const paymenttable=async ()=>{
    const classes = await client.payment.findMany();
    console.log(classes);
}

module.exports = paymenttable;