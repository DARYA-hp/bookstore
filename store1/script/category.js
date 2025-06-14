const categoryNameInput = document.getElementById('categoryName');
const categoryDescriptionInput = document.getElementById('categoryDescription');
const createCategoryBtn = document.getElementById('createCategoryBtn');
const authToken = localStorage.getItem('authToken'); 

const createCategory = async (name, description) => {
  try {
    const response = await fetch('https://bookshelf.devtests.ir/api/v1/Category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({ name, description }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert('Error: ' + errorData.message);
      return;
    }

    const data = await response.json();
    alert('Category created successfully!');

    localStorage.setItem('newCategory', JSON.stringify(data));
    window.location.href = '../html/createProduct.html';
  } catch (error) {
    console.error(error);
    alert('Error creating category'); 
  }
};

createCategoryBtn.addEventListener('click', () => {
  const name = categoryNameInput.value.trim();
  const description = categoryDescriptionInput.value.trim();

  if (name && description) {
    createCategory(name, description);
  } else {
    alert('Please fill in all fields.');
  }
});

