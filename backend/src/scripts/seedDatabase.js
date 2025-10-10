import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function seed() {
  try {
    console.log('🌱 Seeding database...');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.create({
      data: {
        email: 'admin@qrmenu.com',
        password: hashedPassword,
        name: 'Admin',
        isAdmin: true
      }
    });
    console.log('✅ Admin user created');

    // Create test restaurant
    const testUser = await prisma.user.create({
      data: {
        email: 'test@restaurant.com',
        password: await bcrypt.hash('test123', 10),
        name: 'Test Owner',
        phone: '+7 (999) 123-45-67',
        restaurant: {
          create: {
            name: 'Тестовый ресторан',
            subdomain: 'testrestaurant',
            address: 'г. Москва, ул. Тестовая, д. 1',
            phone: '+7 (999) 123-45-67',
            description: 'Лучший ресторан в городе',
            instagram: 'testrestaurant',
            whatsapp: '79991234567',
            deliveryEnabled: true,
            deliveryFee: 200,
            minOrderAmount: 500,
            subscription: {
              create: {
                plan: 'TRIAL',
                status: 'TRIAL',
                trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                currentPeriodStart: new Date(),
                currentPeriodEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
              }
            },
            categories: {
              create: [
                {
                  name: 'Закуски',
                  description: 'Холодные и горячие закуски',
                  order: 0,
                  dishes: {
                    create: [
                      {
                        name: 'Брускетта с томатами',
                        description: 'Хрустящий хлеб с томатами, базиликом и оливковым маслом',
                        price: 350,
                        order: 0,
                        modifiers: {
                          create: [
                            { name: 'Дополнительный сыр', price: 50, order: 0 },
                            { name: 'Острый соус', price: 30, order: 1 }
                          ]
                        }
                      },
                      {
                        name: 'Цезарь салат',
                        description: 'Классический салат с курицей, пармезаном и соусом',
                        price: 450,
                        order: 1
                      }
                    ]
                  }
                },
                {
                  name: 'Основные блюда',
                  description: 'Горячие блюда',
                  order: 1,
                  dishes: {
                    create: [
                      {
                        name: 'Стейк из говядины',
                        description: 'Сочный стейк с овощами гриль',
                        price: 1200,
                        order: 0,
                        modifiers: {
                          create: [
                            { name: 'Прожарка: Rare', price: 0, order: 0 },
                            { name: 'Прожарка: Medium', price: 0, order: 1 },
                            { name: 'Прожарка: Well Done', price: 0, order: 2 },
                            { name: 'Дополнительный гарнир', price: 150, order: 3 }
                          ]
                        }
                      },
                      {
                        name: 'Паста Карбонара',
                        description: 'Классическая итальянская паста с беконом и сливочным соусом',
                        price: 550,
                        order: 1
                      }
                    ]
                  }
                },
                {
                  name: 'Напитки',
                  description: 'Безалкогольные и алкогольные напитки',
                  order: 2,
                  dishes: {
                    create: [
                      {
                        name: 'Кока-Кола',
                        description: 'Классическая кола',
                        price: 150,
                        order: 0,
                        modifiers: {
                          create: [
                            { name: '0.33л', price: 0, order: 0 },
                            { name: '0.5л', price: 50, order: 1 }
                          ]
                        }
                      },
                      {
                        name: 'Свежевыжатый апельсиновый сок',
                        description: 'Натуральный сок из свежих апельсинов',
                        price: 250,
                        order: 1
                      }
                    ]
                  }
                }
              ]
            }
          }
        }
      }
    });
    console.log('✅ Test restaurant created');

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📝 Test accounts:');
    console.log('Admin: admin@qrmenu.com / admin123');
    console.log('Restaurant: test@restaurant.com / test123');
    console.log('\n🌐 Test menu: http://localhost:5173/menu/testrestaurant');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();