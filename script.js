document.addEventListener('DOMContentLoaded', function() {
  // Event Handling Section
  const colorChanger = document.getElementById('colorChanger');
  colorChanger.addEventListener('click', function() {
      const colors = ['#9228d7', '#21F3E7', '#F43688', '#00FF98', '#9C27B0'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      this.style.backgroundColor = randomColor;
      this.textContent = `Color Changed to ${randomColor}`;
  });
  
  // Hover effect
  const hoverBox = document.querySelector('.hover-box');
  hoverBox.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
      this.style.backgroundColor = '#ACEBBB';
      this.style.padding = '15px';
      this.style.borderRadius = '8px';
      this.style.transition = 'all 0.3s ease';
  });
  
  hoverBox.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
      this.style.backgroundColor = 'transparent';
      this.style.padding = '0';
      this.style.borderRadius = '0';
  });
  
  // Interactive Elements Section
  // Slideshow functionality
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  let currentSlide = 0;
  
  function showSlide(index) {
      slides.forEach(slide => slide.classList.remove('active'));
      slides[index].classList.add('active');
      currentSlide = index;
  }
  
  prevBtn.addEventListener('click', function() {
      let newIndex = currentSlide - 1;
      if (newIndex < 0) newIndex = slides.length - 1;
      showSlide(newIndex);
  });
  
  nextBtn.addEventListener('click', function() {
      let newIndex = currentSlide + 1;
      if (newIndex >= slides.length) newIndex = 0;
      showSlide(newIndex);
  });
  
  // Tab functionality
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabBtns.forEach(btn => {
      btn.addEventListener('click', function() {
          const tabId = this.getAttribute('data-tab');
          
          // Update active tab button
          tabBtns.forEach(btn => btn.classList.remove('active'));
          this.classList.add('active');
          
          // Show corresponding content
          tabContents.forEach(content => content.classList.remove('active'));
          document.getElementById(tabId).classList.add('active');
      });
  });
  
  // Secret double-click in first tab
  const firstTab = document.getElementById('tab1');
  let clickCount = 0;
  
  firstTab.addEventListener('dblclick', function() {
      const secretArea = document.getElementById('secretArea');
      secretArea.style.display = 'flex';
      
      // Make secret area draggable
      let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      secretArea.onmousedown = dragMouseDown;
      
      function dragMouseDown(e) {
          e = e || window.event;
          e.preventDefault();
          // get the mouse cursor position at startup:
          pos3 = e.clientX;
          pos4 = e.clientY;
          document.onmouseup = closeDragElement;
          // call a function whenever the cursor moves:
          document.onmousemove = elementDrag;
      }
      
      function elementDrag(e) {
          e = e || window.event;
          e.preventDefault();
          // calculate the new cursor position:
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;
          // set the element's new position:
          secretArea.style.top = (secretArea.offsetTop - pos2) + "px";
          secretArea.style.left = (secretArea.offsetLeft - pos1) + "px";
      }
      
      function closeDragElement() {
          // stop moving when mouse button is released:
          document.onmouseup = null;
          document.onmousemove = null;
      }
  });
  
  // Form Validation Section
  const form = document.getElementById('myForm');
  const username = document.getElementById('username');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const usernameError = document.getElementById('usernameError');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const strengthBar = document.getElementById('strengthBar');
  
  // Real-time validation
  username.addEventListener('input', function() {
      validateUsername();
  });
  
  email.addEventListener('input', function() {
      validateEmail();
  });
  
  password.addEventListener('input', function() {
      validatePassword();
      updatePasswordStrength();
  });
  
  function validateUsername() {
      if (username.value.trim() === '') {
          username.classList.add('invalid');
          usernameError.style.display = 'block';
          return false;
      } else {
          username.classList.remove('invalid');
          username.classList.add('valid');
          usernameError.style.display = 'none';
          return true;
      }
  }
  
  function validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email.value.trim() === '' || emailRegex.test(email.value)) {
          email.classList.remove('invalid');
          email.classList.add('valid');
          emailError.style.display = 'none';
          return true;
      } else {
          email.classList.add('invalid');
          emailError.style.display = 'block';
          return false;
      }
  }
  
  function validatePassword() {
      if (password.value.length >= 8) {
          password.classList.remove('invalid');
          password.classList.add('valid');
          passwordError.style.display = 'none';
          return true;
      } else {
          password.classList.add('invalid');
          passwordError.style.display = 'block';
          return false;
      }
  }
  
  function updatePasswordStrength() {
      const strength = calculateStrength(password.value);
      strengthBar.style.width = strength.percentage + '%';
      strengthBar.style.backgroundColor = strength.color;
  }
  
  function calculateStrength(password) {
      let strength = 0;
      
      // Length contributes up to 50%
      strength += Math.min(password.length / 16 * 50, 50);
      
      // Character variety
      if (/[A-Z]/.test(password)) strength += 10;
      if (/[0-9]/.test(password)) strength += 10;
      if (/[^A-Za-z0-9]/.test(password)) strength += 10;
      
      // Repeated characters reduce strength
      const repeats = (password.match(/(.)\1{2,}/g) || []).length;
      strength -= repeats * 5;
      
      // Cap at 100
      strength = Math.max(0, Math.min(100, strength));
      
      // Determine color
      let color;
      if (strength < 30) color = 'red';
      else if (strength < 70) color = 'orange';
      else color = 'green';
      
      return {
          percentage: strength,
          color: color
      };
  }
  
  form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const isUsernameValid = validateUsername();
      const isEmailValid = validateEmail();
      const isPasswordValid = validatePassword();
      
      if (isUsernameValid && isEmailValid && isPasswordValid) {
          alert('Form submitted successfully!');
          // form.submit(); // Uncomment to actually submit
      } else {
          form.classList.add('shake');
          setTimeout(() => {
              form.classList.remove('shake');
          }, 500);
      }
  });
  
  // Bonus: Long press detection on the color changer button
  let pressTimer;
  const longPressTime = 1000; // 1 second
  
  colorChanger.addEventListener('mousedown', function() {
      pressTimer = window.setTimeout(function() {
          colorChanger.textContent = "Long press detected!";
          colorChanger.style.backgroundColor = "#FF5722";
      }, longPressTime);
  });
  
  colorChanger.addEventListener('mouseup', function() {
      clearTimeout(pressTimer);
  });
  
  colorChanger.addEventListener('mouseleave', function() {
      clearTimeout(pressTimer);
  });
});