import './styles/main.less';

const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const year = document.getElementById('year');
const form = document.getElementById('portfolioForm');
const nameInput = document.getElementById('username');
const emailInput = document.getElementById('useremail');
const messageInput = document.getElementById('usermessage');
const successToast = document.getElementById('successToast');

const errors = {
  name: document.getElementById('nameError'),
  email: document.getElementById('emailError'),
  message: document.getElementById('messageError')
};

year.textContent = new Date().getFullYear();

menuButton.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

const setError = (input, errorElement, hasError) => {
  input.classList.toggle('is-invalid', hasError);
  errorElement.classList.toggle('is-visible', hasError);
};

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const nameInvalid = nameInput.value.trim().length < 3;
  const emailInvalid = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
  const messageInvalid = messageInput.value.trim().length === 0;

  setError(nameInput, errors.name, nameInvalid);
  setError(emailInput, errors.email, emailInvalid);
  setError(messageInput, errors.message, messageInvalid);

  if (!nameInvalid && !emailInvalid && !messageInvalid) {
    successToast.classList.add('is-visible');
    form.reset();
    window.setTimeout(() => successToast.classList.remove('is-visible'), 3500);
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
