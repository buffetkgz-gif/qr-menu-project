const API_URL = 'http://localhost:5000/api';

async function testSubdomain() {
  console.log('🧪 Тестирование получения ресторана по subdomain...\n');

  try {
    const subdomain = 'testrestaurant';
    const url = `${API_URL}/restaurants/${subdomain}`;
    
    console.log(`📡 Запрос к: ${url}`);
    
    const response = await fetch(url);
    
    console.log(`📊 Статус: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log(`❌ Ошибка: ${errorText}`);
      return;
    }

    const data = await response.json();
    console.log('\n✅ Ресторан найден:');
    console.log(`   Название: ${data.name}`);
    console.log(`   Subdomain: ${data.subdomain}`);
    console.log(`   ID: ${data.id}`);
    console.log(`   Описание: ${data.description || 'Нет'}`);
    console.log(`   Адрес: ${data.address || 'Нет'}`);
    console.log(`   Телефон: ${data.phone || 'Нет'}`);
    
    if (data.categories) {
      console.log(`\n📂 Категорий: ${data.categories.length}`);
      data.categories.forEach(cat => {
        console.log(`   - ${cat.name} (${cat.dishes?.length || 0} блюд)`);
      });
    }

  } catch (error) {
    console.error('❌ Ошибка:', error.message);
  }
}

testSubdomain();