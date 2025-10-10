import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function applyMigration() {
  try {
    console.log('🔄 Применение миграции для добавления поля currency...\n');

    // Попробуем выполнить raw SQL
    await prisma.$executeRaw`
      ALTER TABLE "restaurants" 
      ADD COLUMN IF NOT EXISTS "currency" TEXT NOT NULL DEFAULT '₽'
    `;

    console.log('✅ Миграция успешно применена!');
    
    // Проверим результат
    const restaurants = await prisma.restaurant.findMany({
      select: {
        id: true,
        name: true,
        currency: true
      }
    });

    console.log('\n📊 Рестораны с валютой:');
    restaurants.forEach(r => {
      console.log(`   - ${r.name}: ${r.currency || '₽ (по умолчанию)'}`);
    });

  } catch (error) {
    console.error('❌ Ошибка:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

applyMigration();