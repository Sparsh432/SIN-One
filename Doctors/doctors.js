/* Starts Here
document.addEventListener('DOMContentLoaded', () => {
    const buttonGrid = document.querySelector('.button-grid');
    const urlParams = new URLSearchParams(window.location.search);
    const step = urlParams.get('step') || 'category'; // Default step
    const filter = urlParams.get('filter') || 'Doctors'; // Default filter
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
            const categories = ["Allopathy", "Homeopathy", "Ayurvedic", "Veterinary"];
            categories.forEach(category => createButton(category, `filterPage.html?step=city&filter=${category}&category=${category}`));
            break;
  
          case 'city':
            const cities = [...new Set(data.Doctors[category].map(doc => doc.city))];
            cities.forEach(city => createButton(city, `filterPage.html?step=locality&filter=${category} - ${city}&category=${category}&city=${city}`));
            break;
  
          case 'locality':
            const localities = [...new Set(data.Doctors[category].filter(doc => doc.city === city).map(doc => doc.locality))];
            localities.forEach(locality => createButton(locality, `filterPage.html?step=speciality&filter=${category} - ${city} - ${locality}&category=${category}&city=${city}&locality=${locality}`));
            break;
  
          case 'speciality':
            const specialities = [...new Set(data.Doctors[category].filter(doc => doc.city === city && doc.locality === locality).map(doc => doc.speciality))];
            specialities.forEach(speciality => createButton(speciality, `filterPage.html?step=results&filter=${category} - ${city} - ${locality} - ${speciality}&category=${category}&city=${city}&locality=${locality}&speciality=${speciality}`));
            break;
  
          case 'results':
            const doctors = data.Doctors[category].filter(doc => doc.city === city && doc.locality === locality && doc.speciality === speciality);
            doctors.forEach(doc => {
              buttonGrid.innerHTML += `
                <div class="doctor-card">
                  <img src="${doc.photo || 'default-profile.png'}" alt="Doctor Photo">
                  <p><strong>${doc.name}</strong></p>
                  <p>${doc.speciality}</p>
                  <p>${doc.fees} INR</p>
                  <a href="${doc.googleMap}" target="_blank">Clinic Location</a>
                </div>
              `;
            });
            break;
  
          default:
            createButton("Doctors", `filterPage.html?step=category&filter=Doctors`);
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
  
  Ends Here*/

document.addEventListener('DOMContentLoaded', () => {
  const buttonGrid = document.querySelector('.button-grid');
  const urlParams = new URLSearchParams(window.location.search);
  const step = urlParams.get('step') || 'category'; // Default step
  const filter = urlParams.get('filter') || 'Doctors'; // Default filter
  const category = urlParams.get('category') || '';
  const city = urlParams.get('city') || '';
  const locality = urlParams.get('locality') || '';
  

  const titleContainer = document.getElementById('title-container');

  fetch('../data.json')
    .then(response => response.json())
    .then(data => {
      titleContainer.innerHTML = `<p>${filter}</p>`; // Update title with current filter

      buttonGrid.innerHTML = ''; // Clear buttons
      //addGoBackButton();

      switch (step) {
        case 'category':
          const categories = ["Allopathy", "Homeopathy", "Ayurvedic", "Veterinary"];
          categories.forEach(category => createButton(category, `doctors.html?step=${category === 'Allopathy' ? 'city' : 'city'}&filter=${category}&category=${category}`));
          break;

        case 'city':
          const cities = [...new Set(data.Doctors[category].map(doc => doc.city))];
          cities.forEach(city => createButton(city, `doctors.html?step=locality&filter=${category} - ${city}&category=${category}&city=${city}`));
          break;

        case 'locality':
          if (category === "Allopathy") {
            const localities = [...new Set(data.Doctors[category].filter(doc => doc.city === city).map(doc => doc.locality))];
            localities.forEach(locality => createButton(locality, `doctors.html?step=speciality&filter=${category} - ${city} - ${locality}&category=${category}&city=${city}&locality=${locality}`));
          } else {
            const localities = [...new Set(data.Doctors[category].filter(doc => doc.city === city).map(doc => doc.locality))];
            localities.forEach(locality => createButton(locality, `doctors.html?step=results&filter=${category} - ${city} - ${locality}&category=${category}&city=${city}&locality=${locality}`));
          }
          break;

        case 'speciality':
          const specialities = [...new Set(data.Doctors[category].filter(doc => doc.city === city && doc.locality === locality).map(doc => doc.speciality))];
          specialities.forEach(speciality => createButton(speciality, `doctors.html?step=results&filter=${category} - ${city} - ${locality} - ${speciality}&category=${category}&city=${city}&locality=${locality}&speciality=${speciality}`));
          break;

        /*case 'results':
          const doctors = data.Doctors[category].filter(doc => doc.city === city && doc.locality === locality && (category !== "Allopathy" || doc.specialty === urlParams.get('speciality')));
          doctors.forEach(doc => {
            buttonGrid.innerHTML += `
              <div class="doctor-card">
                <img src="${doc.photo || 'default-profile.png'}" alt="Doctor Photo">
                <p><strong>${doc.name}</strong></p>
                <p>${doc.specialty}</p>
                <p>${doc.fees} INR</p>
                <a href="${doc.googleMap}" target="_blank">Clinic Location</a>
              </div>
            `;
          });
          break;*/

          /*case 'results':
            let specialityFilter = urlParams.get('speciality');  // Get speciality from URL params
            let filteredDoctors = data.Doctors[category].filter(doc => {
              return doc.city === city && 
                     doc.locality === locality &&
                     (category !== "Allopathy" || (specialityFilter ? doc.speciality === specialityFilter : true));
            });
          
            if (filteredDoctors.length > 0) {
              filteredDoctors.forEach(doc => {
                buttonGrid.innerHTML += `
                  <div class="doctor-card">
                    <img src="${doc.photo || 'default-profile.png'}" alt="Doctor Photo">
                    <p><strong>${doc.name}</strong></p>
                    <p>${doc.specialty}</p>
                    <p>Experience: ${doc.experience} years</p>
                    <p>Fees: ${doc.fees} INR</p>
                    <a href="${doc.googleMap}" target="_blank">Clinic Location</a>
                  </div>
                `;
              });
            } else {
              buttonGrid.innerHTML = `<p>No doctors found for the selected filters.</p>`;
            }
            break;*/

          case 'results':
          let specialityFilter = urlParams.get('speciality');
          let filteredDoctors = data.Doctors[category].filter(doc => {
            return doc.city === city &&
                  doc.locality === locality &&
                  (category !== "Allopathy" || (specialityFilter ? doc.speciality === specialityFilter : true));
          });

          buttonGrid.innerHTML = ''; // Clear existing grid

          if (filteredDoctors.length > 0) {
            const profileGrid = document.createElement('div');
            profileGrid.className = 'doctor-profile-grid';

            filteredDoctors.forEach(doc => {
              const card = document.createElement('div');
              card.className = 'doctor-card';
              card.innerHTML = `
                <div class="doctor-card">
                  <img src="${doc.photo || 'default-profile.png'}" alt="Doctor Photo">
                  <p>${doc.name}</p>
                  <p>Fee: ₹${doc.newFees}</p>
                </div>
              `;
              card.addEventListener('click', () => showPopup(doc));
              profileGrid.appendChild(card);
            });
            buttonGrid.appendChild(profileGrid);
          } else {
            buttonGrid.innerHTML = `<p>No doctors found for the selected filters.</p>`;
          }
          break;  

        default:
          createButton("Doctors", `doctors.html?step=category&filter=Doctors`);
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

  function showPopup(doc) {
    document.getElementById('popup-photo').src = doc.photo || 'default-profile.png';
    document.getElementById('popup-name').textContent = doc.name;
    document.getElementById('popup-experience').textContent = `${doc.experience} years`;
    document.getElementById('popup-degree').textContent = `${doc.degree || 'N/A'}`;
    document.getElementById('popup-clinic-name').textContent = `${doc.clinicName || 'N/A'}`;
    document.getElementById('popup-address').textContent = `${doc.address || 'N/A'}`;
    document.getElementById('popup-number').textContent = `${doc.contact || 'N/A'}`;
    document.getElementById('popup-fees').textContent = `New Case - ₹${doc.newFees}, Old Case - ₹${doc.oldFees || 'N/A'}`;
    document.getElementById('popup-timings').textContent = `${doc.timings || 'N/A'}`;
    document.getElementById('popup-map').href = doc.googleMap || '#';

    document.getElementById('doctor-popup').classList.remove('hidden');
  }

  document.querySelector('.popup-close').addEventListener('click', () => {
    document.getElementById('doctor-popup').classList.add('hidden');
  });

  document.getElementById('doctor-popup').addEventListener('click', (e) => {
    if (e.target.id === 'doctor-popup') {
      document.getElementById('doctor-popup').classList.add('hidden');
    }
  });

  function addGoBackButton() {
    const backButton = document.createElement('a');
    backButton.href = "javascript:history.back()";
    backButton.className = 'grid-button go-back';
    backButton.textContent = "Go Back";
    buttonGrid.appendChild(backButton);
  }
});