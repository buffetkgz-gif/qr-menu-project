// Тест API для проверки маршрутов

const API_URL = 'http://localhost:5000/api';
const RESTAURANT_ID = '76b3a6b8-a967-47f6-9176-2c8bfdbecb75';

async function testAPI() {
  try {
    console.log('🧪 Тестирование API...\n');

    // 1. Логин
    console.log('1️⃣ Логин...');
    const loginResponse = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@restaurant.com',
        password: 'test123'
      })
    });
    
    if (!loginResponse.ok) {
      throw new Error(`Login failed: ${loginResponse.status}`);
    }
    
    const { token, user } = await loginResponse.json();
    console.log('✅ Логин успешен');
    console.log('   Token:', token.substring(0, 20) + '...');
    console.log('   User:', user.email);
    console.log('   Restaurant ID:', user.restaurant?.id);

    // 2. Получить категории
    console.log('\n2️⃣ Получение категорий...');
    const categoriesResponse = await fetch(`${API_URL}/restaurants/${RESTAURANT_ID}/categories`, {
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('   Status:', categoriesResponse.status);
    
    if (!categoriesResponse.ok) {
      const error = await categoriesResponse.text();
      console.log('❌ Ошибка:', error);
      return;
    }
    
    const categories = await categoriesResponse.json();
    console.log('✅ Категории получены:', categories.length);
    categories.forEach(cat => {
      console.log(`   - ${cat.name} (${cat.dishes?.length || 0} блюд)`);
    });

    // 3. Получить блюда первой категории
    if (categories.length > 0) {
      console.log('\n3️⃣ Получение блюд первой категории...');
      const firstCategoryId = categories[0].id;
      const dishesResponse = await fetch(`${API_URL}/categories/${firstCategoryId}/dishes`, {
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (dishesResponse.ok) {
        const dishes = await dishesResponse.json();
        console.log('✅ Блюда получены:', dishes.length);
        dishes.forEach(dish => {
          console.log(`   - ${dish.name} (${dish.price} ₸)`);
        });
      } else {
        console.log('❌ Ошибка получения блюд:', dishesResponse.status);
      }
    }

    console.log('\n✅ Все тесты пройдены!');

  } catch (error) {
    console.error('❌ Ошибка:', error.message);
  }
}

testAPI();