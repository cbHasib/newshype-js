const loadData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    alert("Failed to connect: ", error.message);
    return false;
  }
};

const loadingSpinner = (isLoading) => {
  const loadingSpinnerElement = document.getElementById("loading-spinner");
  isLoading === true
    ? loadingSpinnerElement.classList.remove("hidden")
    : loadingSpinnerElement.classList.add("hidden");
};

const clearAllNews = () => {
  const newsContainer = document.getElementById("news-container");
  newsContainer.textContent = "";
};

const noData = (isNoData) => {
  const noDataElement = document.getElementById("no-data-message");
  if (isNoData === true) {
    noDataElement.classList.remove("hidden");
  } else {
    noDataElement.classList.add("hidden");
  }
};

const filterContent = (filterBy) => {
  const allNews = (document.getElementsByClassName('card'));
  const filterElement = document.getElementsByClassName(`${filterBy}`);
  for(let i=0; i<allNews.length; i++){
    allNews[i].classList.add('hidden');
  }
  for(let i=0; i<filterElement.length; i++){
    filterElement[i].classList.remove('hidden');
  }
} 

const displayCategoryNews = async (categoryId, categoryName, element) => {
  noData(false);
  // Remove old selected category
  const removeActive = document.querySelectorAll(".active-menu");
  removeActive[0].classList.remove("active-menu");
  element.classList.add("active-menu");

  // Load News Data
  const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
  const newsData = await loadData(url);

  if (newsData === false) {
    return;
  }

  let newsAll = newsData.data;
  if (newsAll.length === 0) {
    const countMessage = document.getElementById("news-count-message");
    countMessage.textContent = "";
    const div = document.createElement("div");
    div.innerText = `No news found in ${categoryName}`;
    countMessage.appendChild(div);
    loadingSpinner(false);
    noData(true);
    return;
  } else {
    const newsCount = newsAll.length;
    const countMessage = document.getElementById("news-count-message");
    countMessage.textContent = "";
    const div = document.createElement("div");
    div.innerText = `${newsCount} items found for category ${categoryName}`;
    countMessage.appendChild(div);
  }






  const newsContainer = document.getElementById("news-container");
  clearAllNews();

  newsAll = newsAll.sort((a, b) => b.total_view - a.total_view);


  newsAll.forEach((news) => {
    const {
      _id,
      title,
      total_view,
      rating: { number, badge },
      author: { name, published_date, img },
      thumbnail_url,
      details,
      others_info: { is_todays_pick, is_trending },
    } = news;

    const div = document.createElement("div");
    div.classList.add(
      "card",
      "md:card-side",
      "bg-base-200",
      "shadow-lg",
      "my-2"
    );
    if(is_todays_pick === true){
      div.classList.add("is_todays_pick");
    }
    if(is_trending === true){
      div.classList.add("is_trending");
    }
    else{
      div.classList.add('normal-news');
    }
    div.innerHTML = `
    <figure class="px-3 py-3">
        <img src="${thumbnail_url}" alt="${title}"
            class="rounded-xl object-cover w-full md:h-300 md:w-60" />
    </figure>
    <div class="card-body">
        <h2 class="card-title">${title}</h2>
        <p class="md:hidden">
        ${details.slice(0, 350) + "..."}
        </p>
        <p class="hidden md:block">
        ${details.slice(0, 150) + "..."}
        </p>
        <div class="card-actions grid grid-cols-2  lg:grid-cols-4 my-3">



        
            <div class="flex justify-center items-center">
            <div class="flex items-center justify-center space-x-3"  title="Author Information">
                    <div class="avatar">
                        <div class="mask mask-circle w-12 h-12">
                            <img src="${img}"
                                alt="${
                                  name !== null ? name : "No Data Found"
                                }" />
                        </div>
                    </div>
                    <div>
                        <div class="font-bold">${
                          name !== null ? name : "No Data Found"
                        }</div>
                        <div class="text-sm opacity-50">${published_date !== null? published_date : 'No Data Found'}</div>
                    </div>
                </div>
            </div>



            
            <div class="h-full flex gap-2 items-center justify-center"  title="Total Views">
                <figure>
                    <img clas src="img/icon/carbon_view.svg" alt="">
                </figure>
                <div class="font-bold">${
                  total_view !== null ? total_view : "No Data"
                }</div>
            </div>



            <div class="flex h-full items-center justify-center" title="${badge}">
                ${number === 5? `
                <img style="width: 24px" src="img/icon/star_full.svg" alt="Star Rating">
                <img style="width: 24px" src="img/icon/star_full.svg" alt="Star Rating">
                <img style="width: 24px" src="img/icon/star_full.svg" alt="Star Rating">
                <img style="width: 24px" src="img/icon/star_full.svg" alt="Star Rating">
                <img style="width: 24px" src="img/icon/star_full.svg" alt="Star Rating">
                ` : number >= 4.5 && number < 5? `
                <img style="width: 24px" src="img/icon/star_full.svg" alt="Star Rating">
                <img style="width: 24px" src="img/icon/star_full.svg" alt="Star Rating">
                <img style="width: 24px" src="img/icon/star_full.svg" alt="Star Rating">
                <img style="width: 24px" src="img/icon/star_full.svg" alt="Star Rating">
                <img style="width: 24px" src="img/icon/star_half.svg" alt="Star Rating">
                ` : number >= 4 && number < 4.5? `
                <img style="width: 24px" src="img/icon/star_full.svg" alt="Star Rating">
                <img style="width: 24px" src="img/icon/star_full.svg" alt="Star Rating">
                <img style="width: 24px" src="img/icon/star_full.svg" alt="Star Rating">
                <img style="width: 24px" src="img/icon/star_full.svg" alt="Star Rating">
                <img style="width: 24px" src="img/icon/star_blank.svg" alt="Star Rating">
                ` : number >= 3.5 && number < 4? `
                <img style="width: 24px" src="img/icon/star_full.svg" alt="Star Rating">
                <img style="width: 24px" src="img/icon/star_full.svg" alt="Star Rating">
                <img style="width: 24px" src="img/icon/star_full.svg" alt="Star Rating">
                <img style="width: 24px" src="img/icon/star_half.svg" alt="Star Rating">
                <img style="width: 24px" src="img/icon/star_blank.svg" alt="Star Rating">
                `: number >= 3 && number < 3.5? `
                <img style="width: 24px" src="img/icon/star_full.svg" alt="Star Rating">
                <img style="width: 24px" src="img/icon/star_full.svg" alt="Star Rating">
                <img style="width: 24px" src="img/icon/star_full.svg" alt="Star Rating">
                <img style="width: 24px" src="img/icon/star_blank.svg" alt="Star Rating">
                <img style="width: 24px" src="img/icon/star_blank.svg" alt="Star Rating">
                ` : number >= 2.5 && number < 3?`
                <img style="width: 24px" src="img/icon/star_full.svg" alt="Star Rating">
                <img style="width: 24px" src="img/icon/star_full.svg" alt="Star Rating">
                <img style="width: 24px" src="img/icon/star_half.svg" alt="Star Rating">
                <img style="width: 24px" src="img/icon/star_blank.svg" alt="Star Rating">
                <img style="width: 24px" src="img/icon/star_blank.svg" alt="Star Rating">
                ` : number >= 2 && number < 2.5? `
                <img style="width: 24px" src="img/icon/star_full.svg" alt="Star Rating">
                <img style="width: 24px" src="img/icon/star_full.svg" alt="Star Rating">
                <img style="width: 24px" src="img/icon/star_blank.svg" alt="Star Rating">
                <img style="width: 24px" src="img/icon/star_blank.svg" alt="Star Rating">
                <img style="width: 24px" src="img/icon/star_blank.svg" alt="Star Rating">
                ` : number >= 1.5 && number < 2? `
                <img style="width: 24px" src="img/icon/star_full.svg" alt="Star Rating">
                <img style="width: 24px" src="img/icon/star_half.svg" alt="Star Rating">
                <img style="width: 24px" src="img/icon/star_blank.svg" alt="Star Rating">
                <img style="width: 24px" src="img/icon/star_blank.svg" alt="Star Rating">
                <img style="width: 24px" src="img/icon/star_blank.svg" alt="Star Rating">
                ` : number >= 1 && number < 1.5? `
                <img style="width: 24px" src="img/icon/star_full.svg" alt="Star Rating">
                <img style="width: 24px" src="img/icon/star_blank.svg" alt="Star Rating">
                <img style="width: 24px" src="img/icon/star_blank.svg" alt="Star Rating">
                <img style="width: 24px" src="img/icon/star_blank.svg" alt="Star Rating">
                <img style="width: 24px" src="img/icon/star_blank.svg" alt="Star Rating">
                ` : `
                <img style="width: 24px" src="img/icon/star_blank.svg" alt="Star Rating">
                <img style="width: 24px" src="img/icon/star_blank.svg" alt="Star Rating">
                <img style="width: 24px" src="img/icon/star_blank.svg" alt="Star Rating">
                <img style="width: 24px" src="img/icon/star_blank.svg" alt="Star Rating">
                <img style="width: 24px" src="img/icon/star_blank.svg" alt="Star Rating">
                `}

            </div>



            <div class="flex justify-center items-center h-full">
              <label onclick="newsDetails('${_id}');" for="newsDetails" class="btn btn-primary shadow-md mx-auto">Read More <img class="ml-2"
              src="img/icon/arrow-right.svg" alt="Read More Button"></label>
              </div>




    </div>`;

    newsContainer.appendChild(div);
    loadingSpinner(false);
  });




    // Filtering Section
    const filterSection = document.getElementById('filter-section');
    filterSection.textContent = '';
  
    
    // Set new Data Filter
    const filterDiv = document.createElement('div');
    filterDiv.classList.add('flex', 'flex-col', 'sm:flex-row', 'gap-3', 'justify-between', 'w-full', 'items-center');
    filterDiv.innerHTML = `
    <div class="flex gap-3 justify-start items-center">
        <span>Sort By:</span>
        <select class="select select-bordered">
            <option disabled selected>View</option>
            <option>Date</option>
        </select>
    </div>
    <div class="flex gap-2 justify-end">
        <button class="btn btn-primary" onclick="filterContent('is_todays_pick')">Today's Pick</button>
        <button class="btn btn-outline btn-primary" onclick="filterContent('is_trending')">Trending</button>
    </div>`;
    filterSection.appendChild(filterDiv);










};

const getCategory = async () => {
  const categoryContainer = document.getElementById("category-container");
  const categoryData = await loadData(
    "https://openapi.programming-hero.com/api/news/categories"
  );

  const categories = categoryData.data.news_category;

  for (const category of categories) {
    const { category_id, category_name } = category;
    const li = document.createElement("li");
    li.innerText = category_name;
    li.setAttribute(
      "onclick",
      `displayCategoryNews('${category_id}', '${category_name}', this);clearAllNews();loadingSpinner(true)`
    );
    categoryContainer.appendChild(li);
  }
};

const newsDetails = async (newsId) => {
  const url = `https://openapi.programming-hero.com/api/news/${newsId}`;
  const newsDetailsData = await loadData(url);

  const news = newsDetailsData.data[0];

  const {
    image_url,
    details,
    title,
    total_view,
    author: { name, published_date, img },
  } = news;

  const modalBody = document.getElementById("modal-body");
  modalBody.textContent = "";

  const div = document.createElement("div");
  div.classList.add("modal-box");
  div.innerHTML = `
  <img src="${image_url}" alt="${title}">

  <div class="flex justify-between items-center mt-3 mb-5">
      <div class="flex">
          <div class="flex items-center space-x-3">
              <div class="avatar">
                  <div class="mask mask-circle w-12 h-12">
                      <img src="${img}" alt="${
                            name !== null ? name : " No Data Found"
                       }" />
                  </div>
              </div>
              <div>
                  <div class="font-bold">${
                    name !== null ? name : "No Data Found"
                  }</div>
                  <div class="text-sm opacity-50">${published_date !== null? published_date : 'No Data Found'}</div>
              </div>
          </div>
      </div>
      <div class="flex gap-2 items-center justify-center">
          <figure>
              <img clas src="img/icon/carbon_view.svg" alt="">
          </figure>
          <div class="font-bold">${
            total_view !== null ? total_view : "No Data"
          }</div>
      </div>

  </div>



  <h3 class="font-bold text-lg mt-3">${title}</h3>
  <p class="py-4">${details}
  </p>

  <div class="modal-action justify-center">
      <label for="newsDetails" class="btn btn-primary">Close</label>
  </div>`;

  modalBody.appendChild(div);
};


getCategory();

const homeDataLoad = () =>{
  loadingSpinner(true);
  displayCategoryNews('01', 'Home', document.getElementById('home'));
}

homeDataLoad();
