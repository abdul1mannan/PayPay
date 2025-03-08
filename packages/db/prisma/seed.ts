import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()

async function main() {
  const alice = await prisma.user.upsert({
    where: { number: '9999999999' },
    update: {},
    create: {
      number: '9999999999',
      password: await bcrypt.hash('alice', 10),
      name: 'alice',
      email: 'alice@example.com',
      onRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Completed",
          amount: 20000,
          token: "127",
          provider: "HDFC Bank",
        },
      },
    },
  })
  const bob = await prisma.user.upsert({
    where: { number: '9999999998' },
    update: {},
    create: {
      number: '9999999998',
      password: await bcrypt.hash('bob', 10),
      name: 'bob',
      email: 'bob@example.com',
      onRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Failed",
          amount: 2000,
          token: "123",
          provider: "HDFC Bank",
        },
      },
    },
  })
  const abdul = await prisma.user.upsert({
    where: { number: '9999999978' },
    update: {
      balance: {
        create: {
          amount: 20000,
          locked: 2000,
        },
      },
    },
    create: {
      number: '9999999978',
      password: await bcrypt.hash('abdul', 10),
      name: 'abdul',
      email: 'abdul@example.com',
    
      onRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Completed",
          amount: 2000,
          token: "124",
          provider: "HDFC Bank",
        },
      },
    },
  })
  
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })