const productForm = document.getElementById('productForm');
const productNameInput = document.getElementById('productName');
const productDescriptionInput = document.getElementById('productDescription');
const productPriceInput = document.getElementById('productPrice');
const productCategorySelect = document.getElementById('productCategory');
const authToken = localStorage.getItem('authToken');

const loadCategories = async () => {
  const savedCategory = localStorage.getItem('newCategory');
  if (savedCategory) {
    const category = JSON.parse(savedCategory);
    const option = document.createElement('option');
    option.value = category.id;
    option.textContent = category.name;
    productCategorySelect.appendChild(option);
    productCategorySelect.value = category.id;
    localStorage.removeItem('newCategory');
  }

  try {
    const response = await fetch('https://bookshelf.devtests.ir/api/v1/Category', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      alert('Error fetching categories.');
      return;
    }

    const result = await response.json();
    const categories = result.data || result; 

    if (!Array.isArray(categories)) {
      console.error("Expected array of categories but got:", categories);
      return;
    }

    categories.forEach(category => {
      if (!productCategorySelect.querySelector(`option[value="${category.id}"]`)) {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        productCategorySelect.appendChild(option);
      }
    });
  } catch (error) {
    console.error(error);
    alert('Error loading categories.');
  }
};

const createProduct = async (name, description, price, categoryId) => {
  try {
    const response = await fetch('https://bookshelf.devtests.ir/api/v1/Product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({ name, description, price, categoryId }),
    });

    if (!response.ok) {
      alert('Error creating product.');
      return;
    }

    const data = await response.json();
    alert('Product created successfully!');
    window.location.href = '../html/store.html';
  } catch (error) {
    console.error(error);
    alert('Error creating product');
  }
};

productForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = productNameInput.value.trim();
  const description = productDescriptionInput.value.trim();
  const price = parseFloat(productPriceInput.value);
  const categoryId = productCategorySelect.value;

  if (name && description && price && categoryId) {
    createProduct(name, description, price, categoryId);
  } else {
    alert('Please fill in all fields.');
  }
});



loadCategories();
