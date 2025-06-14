const signupForm = document.getElementById('signupForm');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('signupEmail');
const passwordInput = document.getElementById('password');
const fullnameInput = document.getElementById('fullname');
const errorMessage = document.createElement('p'); 

signupForm.appendChild(errorMessage);

const signupUser = async (username, email, password, fullname) => {
  try {
    const response = await fetch('https://bookshelf.devtests.ir/api/v1/User', {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        fullname: fullname,
      }),
    });


    console.log('Response Status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.log('Error details:', errorData); 

      if (errorData.message === "Username '" + username + "' is already taken.") {
        errorMessage.textContent = "This username is already taken. Please choose another one.";
      } else {
        errorMessage.textContent = 'Sign-up failed. Please try again.';
      }
      throw new Error('Sign Up failed!');
    }

    const data = await response.json();
    alert('Sign Up successful! Login successful!');
    
    localStorage.setItem('authToken', data.token);

    window.location.href = 'store.html';

  } catch (error) {
    console.error(error);
  }
};

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const fullname = fullnameInput.value.trim();

  if (username && email && password && fullname) {
    signupUser(username, email, password, fullname);
  } else {
    errorMessage.textContent = 'Please fill out all fields.';
  }
});

