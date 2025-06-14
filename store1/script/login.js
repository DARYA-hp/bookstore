const loginForm = document.getElementById('loginForm');
const loginUsernameInput = document.getElementById('loginUsername');
const loginPasswordInput = document.getElementById('loginPassword');
const errorMessageLogin = document.createElement('p');

loginForm.appendChild(errorMessageLogin);

const loginUser = async (username, password) => {
  try {
    const response = await fetch('https://bookshelf.devtests.ir/api/v1/User', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    console.log('Response Status:', response.status);

    const data = await response.json();

    if (!response.ok) {
      console.log('Error details:', data);
      errorMessageLogin.textContent = 'Incorrect username or password. Please try again.';
      throw new Error('Login failed!');
    }

    localStorage.setItem('authToken', data.access_token);

    alert('Login successful');
    window.location.href = 'store.html';

  } catch (error) {
    console.error(error);
  }
};

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = loginUsernameInput.value.trim();
  const password = loginPasswordInput.value.trim();
  if (username && password) {
    loginUser(username, password);
  } else {
    errorMessageLogin.textContent = 'Please enter your username and password.';
  }
});
