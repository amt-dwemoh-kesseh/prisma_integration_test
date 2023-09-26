import prisma from "./prisma";

export default async () =>{
    await prisma.$transaction([
        prisma.tag.deleteMany(),
        prisma.quote.deleteMany(),
        prisma.user.deleteMany()
    ])
}