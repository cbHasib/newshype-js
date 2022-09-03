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
      "lg:card-side",
      "bg-base-200",
      "shadow-lg",
      "my-2"
    );
    div.innerHTML = `
    <figure class="px-3 py-3">
        <img src="${thumbnail_url}" alt="${title}"
            class="rounded-xl object-cover h-300 w-60" />
    </figure>
    <div class="card-body">
        <h2 class="card-title">${title}</h2>
        <p>
        ${details.slice(0, 350) + "..."}
        </p>
        <div class="card-actions justify-between items-center">
            <div class="flex">
                <div class="flex items-center space-x-3">
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
            <div class="flex gap-2 items-center justify-center">
                <figure>
                    <img clas src="img/icon/carbon_view.svg" alt="">
                </figure>
                <div class="font-bold" title="Total Views">${
                  total_view !== null ? total_view : "No Data"
                }</div>
            </div>
            <div class="flex items-center justify-center" title="${badge}">

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
            <div>
              <label onclick="newsDetails('${_id}');" for="newsDetails" class="btn btn-primary shadow-md">Read More <img class="ml-2"
              src="img/icon/arrow-right.svg" alt="Read More Button"></label>
              </div>
    </div>`;

    newsContainer.appendChild(div);
    loadingSpinner(false);
  });
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
