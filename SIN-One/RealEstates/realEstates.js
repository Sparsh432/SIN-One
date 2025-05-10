/*document.addEventListener('DOMContentLoaded', () => {
  const buttonGrid = document.querySelector('.button-grid');
  const urlParams = new URLSearchParams(window.location.search);
  const step = urlParams.get('step') || 'city';  // Default step
  const filter = urlParams.get('filter') || 'Real Estate';  // Default filter
  const city = urlParams.get('city') || '';
  const locality = urlParams.get('locality') || '';

  const titleContainer = document.getElementById('title-container');

  fetch('../data.json')
    .then(response => response.json())
    .then(data => {
      const realEstateData = data["Real Estate"]["Real Estate"];  // Updated path

      titleContainer.innerHTML = `<p>${filter}</p>`;  // Update title with current filter
      buttonGrid.innerHTML = '';  // Clear buttons
      addGoBackButton();

      switch (step) {
        case 'city':
          const cities = [...new Set(realEstateData.map(project => project.city))];
          cities.forEach(city => createButton(city, `realEstates.html?step=locality&filter=${filter} - ${city}&city=${city}`));
          break;

        case 'locality':
          const localities = [...new Set(realEstateData.filter(project => project.city === city).map(project => project.locality))];
          localities.forEach(locality => createButton(locality, `realEstates.html?step=speciality&filter=${filter} - ${city} - ${locality}&city=${city}&locality=${locality}`));
          break;

        case 'speciality':
          const specialities = [...new Set(realEstateData.filter(project => project.city === city && project.locality === locality)
            .flatMap(project => project.speciality))];
          specialities.forEach(speciality => createButton(speciality, `realEstates.html?step=results&filter=${filter} - ${city} - ${locality} - ${speciality}&city=${city}&locality=${locality}&speciality=${speciality}`));
          break;

        case 'results':
          const specialityFilter = urlParams.get('speciality');
          const filteredProjects = realEstateData.filter(project => {
            return project.city === city &&
                   project.locality === locality &&
                   project.speciality.includes(specialityFilter);
          });

          if (filteredProjects.length > 0) {
            filteredProjects.forEach(project => {
              buttonGrid.innerHTML += `
                <div class="real-estate-card">
                  <img src="${project.photo || 'default-project.jpg'}" alt="Project Photo">
                  <p><strong>${project.name}</strong></p>
                  <p>Builder: ${project.builder}</p>
                  <p>Type: ${project.speciality.join(', ')}</p>
                  <p>Price Range: ${project.priceRange}</p>
                  <p>Size Range: ${project.sizeRange}</p>
                  <p>Amenities: ${project.amenities.join(', ')}</p>
                  <a href="${project.brochure}" target="_blank">View Brochure</a>
                  <a href="${project.locationLink}" target="_blank">Location</a>
                  <p>Contact: ${project.contact}</p>
                </div>
              `;
            });
          } else {
            buttonGrid.innerHTML = `<p>No projects found for the selected filters.</p>`;
          }
          break;

        default:
          createButton("Real Estate", `realEstates.html?step=city&filter=Real Estate`);
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
});*/

document.addEventListener('DOMContentLoaded', () => {
  const buttonGrid = document.querySelector('.button-grid');
  const urlParams = new URLSearchParams(window.location.search);
  const step = urlParams.get('step') || 'city';  // Default step
  const filter = urlParams.get('filter') || 'Real Estate';  // Default filter
  const city = urlParams.get('city') || '';
  const locality = urlParams.get('locality') || '';

  const titleContainer = document.getElementById('title-container');
  titleContainer.innerHTML = `<p>${decodeURIComponent(filter)}</p>`;  // Display decoded filter

  fetch('../data.json')
    .then(response => response.json())
    .then(data => {
      const realEstateData = data["Real Estate"]["Real Estate"];  // Access nested data
      buttonGrid.innerHTML = '';  // Clear buttons
      addGoBackButton();

      switch (step) {
        case 'city':
          const cities = [...new Set(realEstateData.map(project => project.city))];
          cities.forEach(city => createButton(city, `realEstates.html?step=locality&filter=Real Estate - ${city}&city=${city}`));
          break;

        case 'locality':
          const localities = [...new Set(realEstateData.filter(project => project.city === city).map(project => project.locality))];
          localities.forEach(locality => createButton(locality, `realEstates.html?step=speciality&filter=Real Estate - ${city} - ${locality}&city=${city}&locality=${locality}`));
          break;

        case 'speciality':
          const specialities = [...new Set(realEstateData.filter(project => project.city === city && project.locality === locality)
            .flatMap(project => project.speciality))];
          specialities.forEach(speciality => createButton(speciality, `realEstates.html?step=results&filter=Real Estate - ${city} - ${locality} - ${speciality}&city=${city}&locality=${locality}&speciality=${speciality}`));
          break;

        case 'results':
          const specialityFilter = urlParams.get('speciality');
          const filteredProjects = realEstateData.filter(project => {
            return project.city === city &&
                   project.locality === locality &&
                   project.speciality.includes(specialityFilter);
          });

          if (filteredProjects.length > 0) {
            filteredProjects.forEach(project => {
              buttonGrid.innerHTML += `
                <div class="real-estate-card">
                  <img src="${project.photo || 'default-project.jpg'}" alt="Project Photo">
                  <p><strong>${project.name}</strong></p>
                  <p>Builder: ${project.builder}</p>
                  <p>Type: ${project.speciality.join(', ')}</p>
                  <p>Price Range: ${project.priceRange}</p>
                  <p>Size Range: ${project.sizeRange}</p>
                  <p>Amenities: ${project.amenities.join(', ')}</p>
                  <a href="${project.brochure}" target="_blank">View Brochure</a>
                  <a href="${project.locationLink}" target="_blank">Location</a>
                  <p>Contact: ${project.contact}</p>
                </div>
              `;
            });
          } else {
            buttonGrid.innerHTML = `<p>No projects found for the selected filters.</p>`;
          }
          break;

        default:
          createButton("Real Estate", `realEstates.html?step=city&filter=Real Estate`);
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