const loadPhone = async (search) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`);
    const data = await res.json();
    const phones = data.data;
    displayPhone(phones);
}

const displayPhone = (phones) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    const showButton = document.getElementById('show-all-container')
    if (phones.length > 10) {
        showButton.classList.remove('hidden');
    }
    else {
        showButton.classList.add('hidden');
    }

    phones = phones.slice(0, 10);

    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 shadow-xl py-10 mx-auto`
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" /></figure>
            <div class="card-body">
              <h2 class="card-title">${phone.phone_name}</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
              </div>
            </div>
        `
        phoneContainer.appendChild(phoneCard);

        toggleLoading(false);
    })
}

const handleSearch = () => {
    toggleLoading(true);
    const textInput = document.getElementById('search-input');
    const searchValue = textInput.value
    console.log(searchValue);
    loadPhone(searchValue);
}


const toggleLoading = (isLoading) => {
    const spinner = document.getElementById('toggle-spinner');
    if (isLoading) {
        spinner.classList.remove('hidden');
    }
    else {
        spinner.classList.add('hidden');
    }
}

// loadPhone();