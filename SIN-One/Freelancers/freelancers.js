document.addEventListener('DOMContentLoaded', () => {
  const buttonGrid = document.querySelector('.button-grid');
  const urlParams = new URLSearchParams(window.location.search);
  const step = urlParams.get('step') || 'category'; // Default step
  const filter = urlParams.get('filter') || 'Freelancers'; // Default filter
  const category = urlParams.get('category') || '';
  const city = urlParams.get('city') || '';
  const locality = urlParams.get('locality') || '';
  const speciality = urlParams.get('speciality') || '';
  
  const titleContainer = document.getElementById('title-container');

  fetch('../data.json')
    .then(response => response.json())
    .then(data => {
      titleContainer.innerHTML = `<p>${filter}</p>`; // Update title with current filter

      buttonGrid.innerHTML = ''; // Clear buttons
      addGoBackButton();

      switch (step) {
        case 'category':
          const categories = ["Creative", "Technology and Development", "Marketing and Sales", "Financial and Legal", "Business and Administrative", "Education and Training", "Lifestyle and Personal Services", "Technical"];
          categories.forEach(category => createButton(category, `freelancers.html?step=city&filter=${category}&category=${category}`));
          break;

        case 'city':
          const cities = [...new Set(data.Freelancers[category].map(freelancer => freelancer.city))];
          cities.forEach(city => createButton(city, `freelancers.html?step=locality&filter=${category} - ${city}&category=${category}&city=${city}`));
          break;

        case 'locality':
          const localities = [...new Set(data.Freelancers[category].filter(freelancer => freelancer.city === city).map(freelancer => freelancer.locality))];
          localities.forEach(locality => createButton(locality, `freelancers.html?step=speciality&filter=${category} - ${city} - ${locality}&category=${category}&city=${city}&locality=${locality}`));
          break;

        case 'speciality':
          const specialities = [...new Set(data.Freelancers[category].filter(freelancer => freelancer.city === city && freelancer.locality === locality).map(freelancer => freelancer.speciality))];
          specialities.forEach(speciality => createButton(speciality, `freelancers.html?step=results&filter=${category} - ${city} - ${locality} - ${speciality}&category=${category}&city=${city}&locality=${locality}&speciality=${speciality}`));
          break;

        case 'results':
          const filteredFreelancers = data.Freelancers[category].filter(freelancer => {
            return freelancer.city === city && 
                   freelancer.locality === locality &&
                   (speciality ? freelancer.speciality === speciality : true);
          });

          if (filteredFreelancers.length > 0) {
            filteredFreelancers.forEach(freelancer => {
              buttonGrid.innerHTML += `
                <div class="freelancer-card">
                  <img src="${freelancer.photo || 'default-profile.png'}" alt="Freelancer Photo">
                  <p><strong>${freelancer.name}</strong></p>
                  <p>${freelancer.speciality}</p>
                  <p>Experience: ${freelancer.experience} years</p>
                  <p>Rate: ${freelancer.rate} INR/hour</p>
                  <a href="${freelancer.portfolioLink}" target="_blank">Portfolio</a>
                </div>
              `;
            });
          } else {
            buttonGrid.innerHTML = `<p>No freelancers found for the selected filters.</p>`;
          }
          break;

        default:
          createButton("Freelancers", `freelancers.html?step=category&filter=Freelancers`);
          break;
      }
    })
    .catch(error => console.error('Error loading data:', error));

  function createButton(text, link) {
    const button = document.createElement('a');
    button.className = 'grid-button';
    button.href = link;
    button.textContent = text;
    buttonGrid.appendChild(button);
  }

  function addGoBackButton() {
    const backButton = document.createElement('a');
    backButton.href = "javascript:history.back()";
    backButton.className = 'grid-button go-back';
    backButton.textContent = "Go Back";
    buttonGrid.appendChild(backButton);
  }
});