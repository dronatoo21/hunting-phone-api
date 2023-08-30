const loadPhone = async (search, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`);
    const data = await res.json();
    const phones = data.data;
    displayPhone(phones, isShowAll);
}

const displayPhone = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    const showButton = document.getElementById('show-all-container')
    if (phones.length > 10 && !isShowAll) {
        showButton.classList.remove('hidden');
    }
    else {
        showButton.classList.add('hidden');
    }

    if (!isShowAll) {
        phones = phones.slice(0, 10);
    }


    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 shadow-xl pt-10 mx-auto`
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" /></figure>
            <div class="card-body">
              <h2 class="card-title">${phone.phone_name}</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div class="card-actions justify-center">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show details</button>
              </div>
            </div>
        `
        phoneContainer.appendChild(phoneCard);

        toggleLoading(false);
    })
}

const handleShowDetails = async (id) => {
    // console.log(id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    const phone = data.data;
    showPhoneDetails(phone)
}

const showPhoneDetails = (phone) => {
    console.log(phone);

    const phoneName = document.getElementById('detail-phn-name');
    phoneName.innerText = phone.name;

    const detailContainer = document.getElementById('show-detail-container');
    detailContainer.innerHTML = `
        <img src="${phone.image}">
        <P>${phone?.mainFeatures.storage}</p>
    `

    show_details_modal.showModal()
}


const handleSearch = (isShowAll) => {
    toggleLoading(true);
    const textInput = document.getElementById('search-input');
    const searchValue = textInput.value
    loadPhone(searchValue, isShowAll);
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

const handleShowAll = () => {
    handleSearch(true);
}


// loadPhone();