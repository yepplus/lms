const { PrismaClient } = require('@prisma/client')

const database = new PrismaClient()

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: 'Computer Science' },
        { name: 'Music' },
        { name: 'Fitness' },
        { name: 'Photography' },
        { name: 'Accounting' },
        { name: 'Engineering' },
        { name: 'Filming' }
      ]
    })
    console.log('Seeding the database categories Successfully')
  } catch (e) {
    console.error('Error seeding the database categories', e)
  } finally {
    await database.$disconnect()
  }
}

main()
