const loadData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data.data.news_category[0].category_name);
    return data;
  } catch (error) {
    const errorElement = document.getElementById('error-element');
    errorElement.classList.remove('hidden');
    const errorMessage = document.getElementById('error-message');
    errorMessage.innerText = error;
  }
};



const showCategoryContent = async(categoryId) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
  const newsData = await loadData(url);
  const newsAll = newsData.data;

  const newsContainer = document.getElementById('news-container');
  newsContainer.textContent = '';

  newsAll.forEach(news => {
    const {title, total_view, rating: {number, badge}, author: {name, published_date, img}, thumbnail_url, image_url, details, others_info: {is_todays_pick, is_trending}} = news;

    const div = document.createElement('div');
    div.classList.add('card', 'card-side', 'bg-base-200', 'shadow-lg', 'my-2');
    div.innerHTML = `
    <figure class="px-3 py-3">
        <img src="${thumbnail_url}" alt="${title}"
            class="rounded-xl object-cover h-300 w-60" />
    </figure>
    <div class="card-body">
        <h2 class="card-title">${title}</h2>
        <p>
        ${details.slice(0, 350) + '...'}
        </p>
        <div class="card-actions justify-between items-center">
            <div class="flex">
                <div class="flex items-center space-x-3">
                    <div class="avatar">
                        <div class="mask mask-circle w-12 h-12">
                            <img src="${img}"
                                alt="${name !== null? name : 'No Data Found'}" />
                        </div>
                    </div>
                    <div>
                        <div class="font-bold">${name !== null? name : 'No Data Found'}</div>
                        <div class="text-sm opacity-50">${published_date}</div>
                    </div>
                </div>
            </div>
            <div class="flex gap-2 items-center justify-center">
                <figure>
                    <img clas src="img/icon/carbon_view.svg" alt="">
                </figure>
                <div class="font-bold">${total_view !== null? total_view : 'No Data'}</div>
            </div>
            <div class="flex items-center justify-center">

                <img src="img/icon/star-half.svg" alt="">
                <img src="img/icon/star-outline.svg" alt="">
                <img src="img/icon/star-outline.svg" alt="">
                <img src="img/icon/star-outline.svg" alt="">
                <img src="img/icon/star-outline.svg" alt="">

            </div>
            <div>
                <div class="btn btn-primary shadow-md">Read More <img class="ml-2"
                        src="img/icon/arrow-right.svg" alt=""></div>
            </div>
        </div>
    </div>`;

newsContainer.appendChild(div);
    





  });
}



const getCategory = async () => {
  const categoryContainer = document.getElementById("category-container");
  const categoryData = await loadData(
    "https://openapi.programming-hero.com/api/news/categories"
  );

  const categories = categoryData.data.news_category;

  for (const category of categories) {
    const {category_id, category_name} = category;
    const li = document.createElement('li');
    li.innerText = category_name;
    li.setAttribute('onclick', `showCategoryContent('${category_id}')`)
    categoryContainer.appendChild(li);
  }
};

getCategory();



