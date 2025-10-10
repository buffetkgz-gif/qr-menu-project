import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkDatabase() {
  try {
    console.log('🔍 Проверка базы данных...\n');

    // Проверяем пользователей
    const users = await prisma.user.findMany({
      include: {
        restaurant: true
      }
    });
    console.log('👤 Пользователи:', users.length);
    users.forEach(user => {
      console.log(`  - ${user.email} (ID: ${user.id})`);
      if (user.restaurant) {
        console.log(`    Ресторан: ${user.restaurant.name} (ID: ${user.restaurant.id})`);
      }
    });

    // Проверяем рестораны
    const restaurants = await prisma.restaurant.findMany();
    console.log('\n🏪 Рестораны:', restaurants.length);
    restaurants.forEach(rest => {
      console.log(`  - ${rest.name} (ID: ${rest.id}, Subdomain: ${rest.subdomain})`);
    });

    // Проверяем категории
    const categories = await prisma.category.findMany({
      include: {
        restaurant: true
      }
    });
    console.log('\n📂 Категории:', categories.length);
    categories.forEach(cat => {
      console.log(`  - ${cat.name} (ID: ${cat.id}, Restaurant: ${cat.restaurant.name})`);
    });

    // Проверяем блюда
    const dishes = await prisma.dish.findMany({
      include: {
        category: true
      }
    });
    console.log('\n🍽️  Блюда:', dishes.length);
    dishes.forEach(dish => {
      console.log(`  - ${dish.name} (ID: ${dish.id}, Category: ${dish.category.name})`);
    });

  } catch (error) {
    console.error('❌ Ошибка:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase();