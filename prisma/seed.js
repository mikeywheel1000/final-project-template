import bcrypt from 'bcrypt';
import 'dotenv/config';
import prisma from '../src/config/db.js';

try {
  await prisma.$queryRaw`TRUNCATE cards, users, leaders, decks RESTART IDENTITY CASCADE;`;

  const usersData = [
    { email: 'jamie@test.com', password: 'alice1234' },
    { email: 'sarah@example.com', password: 'bob1234' },
    { email: 'serie@demo.com', password: 'charlie1234', role: 'ADMIN' },
  ];

  const users = [];

  for (const userData of usersData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await prisma.user.create({
      data: {
        email: userData.email,
        password: hashedPassword,
        role: userData.role || 'USER',
      },
    });

    users.push(user);
  }
await prisma.leader.createMany({
    data: [
        {
            name: `Kudo, king among bears`,
            traits: `Creature, Official`,
            flipCondition: `when you have 4 resources, you may deploy this leader.`,
            aspects: `Command, Heroism`,
            stats: `4/4`,
            text: `Activate this leader: Give a Creature Unit you control +2/+2 for this phase // All Creatures you control get +2/+2`
        },
        {
            name: `Ayula, Queen among bears`,
            traits: `Creature, Official, Rebel`,
            flipCondition: `when you have 4 resources, you may deploy this leader.`,
            aspects: `Command, Cunning`,
            stats: `4/4`,
            text: `When you deploy a Creature: Give a Creature Unit you control +2/+2 for this phase // All Creatures you control get +1/+0 for every creature you control and Ambush`
        },
        {
            name: `Count Dooku, the funny`,
            traits: `Separatist, Sith, Official`,
            flipCondition: `when you have 7 resources, you may deploy this leader.`,
            aspects: `Command, Villany`,
            stats: `6/9`,
            text: `All separatist cards you play have exploit 1 // All separatist cards you play and separatist units you control have exploit 1 and When defeated: Create a Battle Droid`
        }
    ]
  });
  await prisma.card.createMany({
    data: [
        {
            name: `Bearly any Bears`,
            traits: `Bear, Trick`,
            cost: 2,
            aspects: `Command`,
            stats: `none`,
            text: `Create 2 Bear tokens (2/2 Command creature Units with Ambush )`,
            type: "EVENT"
        },
        {
            name: `Bear`,
            traits: `Creature`,
            cost: 2,
            aspects: `Command`,
            stats: `2/2`,
            text: `Ambush`
        },
        {
            name: `Emperor`,
            traits: `Creature`,
            cost: 8,
            aspects: `Aggression`,
            stats: `+4/+4`,
            text: `Attached unit gains the Creature trait and "Each friendly Creature Unit gains +4/+4". When attached: Ready all friendly Creature units. They cannot attack bases this phase.`,
            type: `UPGRADE`
          }
    ]
  });
  for (const user of users) {
    await prisma.deck.createMany({
      data: [
        {
          name: `${user.email.split('@')[0]}'s first deck`,
          description: `${user.email.split('@')[0]} made a deck.`,
          authorId: user.id,
          leaderId: 1
        },
        {
          name: `Aggro by ${user.email.split('@')[0]}`,
          description: ` ${user.email.split('@')[0]} hits hard, and Jimmy hits harder.`,
          authorId: user.id,
          leaderId: 2
        },
      ],
    });
  }

  console.log('Seed completed successfully!');
} catch (error) {
  console.error('Seed failed:', error);
} finally {
  await prisma.$disconnect();
}
