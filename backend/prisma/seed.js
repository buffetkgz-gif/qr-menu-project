// Seed файл для создания тестовых данных
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Начинаем создание тестовых данных...');

  // Очистка существующих данных
  console.log('🗑️  Очистка существующих данных...');
  await prisma.modifier.deleteMany();
  await prisma.dish.deleteMany();
  await prisma.category.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.restaurant.deleteMany();
  await prisma.user.deleteMany();

  // Хэшируем пароли
  const hashedPassword = await bcrypt.hash('test123', 10);
  const hashedAdminPassword = await bcrypt.hash('admin123', 10);

  // 1. Создаем владельца ресторана
  console.log('👤 Создаем владельца ресторана...');
  const owner = await prisma.user.create({
    data: {
      email: 'test@restaurant.com',
      password: hashedPassword,
      name: 'Test Owner',
      phone: '+1234567890',
      isAdmin: false,
    },
  });

  // 2. Создаем ресторан
  console.log('🏪 Создаем ресторан...');
  const restaurant = await prisma.restaurant.create({
    data: {
      name: 'Test Restaurant',
      subdomain: 'testrestaurant',
      address: '123 Main Street, New York, NY 10001',
      phone: '+1234567890',
      description: 'Лучший ресторан для тестирования OimoQR',
      instagram: 'https://instagram.com/testrestaurant',
      facebook: 'https://facebook.com/testrestaurant',
      whatsapp: '+1234567890',
      deliveryEnabled: true,
      deliveryFee: 5.0,
      minOrderAmount: 15.0,
      currency: '$',
      banners: JSON.stringify([
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
        'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800',
      ]),
      userId: owner.id,
    },
  });

  // 3. Создаем подписку (trial)
  console.log('💳 Создаем подписку...');
  const trialEndDate = new Date();
  trialEndDate.setDate(trialEndDate.getDate() + 7);

  await prisma.subscription.create({
    data: {
      plan: 'TRIAL',
      status: 'TRIAL',
      trialEndsAt: trialEndDate,
      currentPeriodStart: new Date(),
      currentPeriodEnd: trialEndDate,
      restaurantId: restaurant.id,
    },
  });

  // 4. Создаем категории
  console.log('📂 Создаем категории...');
  const pizzaCategory = await prisma.category.create({
    data: {
      name: 'Pizza',
      description: 'Authentic Italian pizzas',
      order: 0,
      restaurantId: restaurant.id,
    },
  });

  const burgersCategory = await prisma.category.create({
    data: {
      name: 'Burgers',
      description: 'Juicy burgers with fresh ingredients',
      order: 1,
      restaurantId: restaurant.id,
    },
  });

  const drinksCategory = await prisma.category.create({
    data: {
      name: 'Drinks',
      description: 'Refreshing beverages',
      order: 2,
      restaurantId: restaurant.id,
    },
  });

  // 5. Создаем блюда - Pizza
  console.log('🍕 Создаем блюда...');
  const margherita = await prisma.dish.create({
    data: {
      name: 'Margherita Pizza',
      description: 'Classic Italian pizza with fresh mozzarella, tomato sauce, and basil',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400',
      order: 0,
      categoryId: pizzaCategory.id,
    },
  });

  const pepperoni = await prisma.dish.create({
    data: {
      name: 'Pepperoni Pizza',
      description: 'Loaded with pepperoni and mozzarella cheese',
      price: 14.99,
      image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400',
      order: 1,
      categoryId: pizzaCategory.id,
    },
  });

  // 6. Создаем блюда - Burgers
  const cheeseburger = await prisma.dish.create({
    data: {
      name: 'Classic Cheeseburger',
      description: 'Beef patty with cheddar cheese, lettuce, tomato, and special sauce',
      price: 10.99,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
      order: 0,
      categoryId: burgersCategory.id,
    },
  });

  const baconBurger = await prisma.dish.create({
    data: {
      name: 'Bacon Burger',
      description: 'Double beef patty with crispy bacon and BBQ sauce',
      price: 13.99,
      image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400',
      order: 1,
      categoryId: burgersCategory.id,
    },
  });

  // 7. Создаем блюда - Drinks
  const cola = await prisma.dish.create({
    data: {
      name: 'Coca-Cola',
      description: 'Classic Coca-Cola',
      price: 2.99,
      image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400',
      order: 0,
      categoryId: drinksCategory.id,
    },
  });

  const lemonade = await prisma.dish.create({
    data: {
      name: 'Fresh Lemonade',
      description: 'Homemade lemonade with fresh lemons',
      price: 3.99,
      image: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9d?w=400',
      order: 1,
      categoryId: drinksCategory.id,
    },
  });

  // 8. Создаем модификаторы для пиццы
  console.log('🔧 Создаем модификаторы...');
  await prisma.modifier.create({
    data: {
      name: 'Small',
      price: 0,
      order: 0,
      dishId: margherita.id,
    },
  });

  await prisma.modifier.create({
    data: {
      name: 'Medium',
      price: 2.0,
      order: 1,
      dishId: margherita.id,
    },
  });

  await prisma.modifier.create({
    data: {
      name: 'Large',
      price: 4.0,
      order: 2,
      dishId: margherita.id,
    },
  });

  await prisma.modifier.create({
    data: {
      name: 'Extra Cheese',
      price: 2.0,
      order: 3,
      dishId: margherita.id,
    },
  });

  // Модификаторы для бургера
  await prisma.modifier.create({
    data: {
      name: 'Extra Patty',
      price: 3.0,
      order: 0,
      dishId: cheeseburger.id,
    },
  });

  await prisma.modifier.create({
    data: {
      name: 'Add Bacon',
      price: 2.0,
      order: 1,
      dishId: cheeseburger.id,
    },
  });

  await prisma.modifier.create({
    data: {
      name: 'Gluten-free Bun',
      price: 1.5,
      order: 2,
      dishId: cheeseburger.id,
    },
  });

  // 9. Создаем администратора
  console.log('👨‍💼 Создаем администратора...');
  await prisma.user.create({
    data: {
      email: 'admin@oimoqr.com',
      password: hashedAdminPassword,
      name: 'Admin User',
      phone: '+1234567890',
      isAdmin: true,
    },
  });

  console.log('✅ Тестовые данные успешно созданы!');
  console.log('\n📋 Учетные данные для входа:');
  console.log('\n👤 Владелец ресторана:');
  console.log('   Email: test@restaurant.com');
  console.log('   Password: test123');
  console.log('   Restaurant: Test Restaurant');
  console.log('   Subdomain: testrestaurant');
  console.log('\n👨‍💼 Администратор:');
  console.log('   Email: admin@oimoqr.com');
  console.log('   Password: admin123');
  console.log('\n🌐 Доступ к меню:');
  console.log('   http://localhost:5173/menu/testrestaurant');
  console.log('\n🎉 Готово! Запустите npm run dev для начала работы\n');
}

main()
  .catch((e) => {
    console.error('❌ Ошибка при создании тестовых данных:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });