const authToken = localStorage.getItem('authToken');

const loadProducts = async () => {
  try {
    const response = await fetch('https://bookshelf.devtests.ir/api/v1/Product', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      alert('Error fetching products.');
      return;
    }

    const data = await response.json();
    const products = data.data; 
    const container = document.getElementById('productContainer');
    container.innerHTML = ''; 

    products.forEach(product => {
      appendProductToDOM(product);
    });
  } catch (error) {
    console.error(error);
    alert('Error loading products.');
  }
};


function appendProductToDOM(product) {
  const container = document.getElementById('productContainer');
  const div = document.createElement('div');
  div.className = 'product';
  div.innerHTML = `
    <h3>${product.name}</h3>
    <img src="${product.imageUrl || 'https://via.placeholder.com/150'}" style="width: 150px; height: 120px;">
    <p>${product.description}</p>
    <p>Price: ${product.price}</p>
  `;
  container.appendChild(div);
}

window.addEventListener('DOMContentLoaded', async () => {
  await loadProducts();

  const newProduct = localStorage.getItem('newProduct');
  if (newProduct) {
    const product = JSON.parse(newProduct);
    appendProductToDOM(product); 
    localStorage.removeItem('newProduct'); 
  }
});
