const displayPost = () => {
    const postContainer = document.getElementById('post-container');
    postContainer.textContent = '';

    blogPost.forEach(post => {
        const {postTitle, postDetails, postThumb} = post;
        
        const div = document.createElement('div');
        div.classList.add('card', 'card-compact', 'w-full', 'bg-base-100', 'shadow-xl');
        div.innerHTML = `
            <figure><img class="h-44 w-full" src="${postThumb}" alt="${postTitle}" /></figure>
            <div class="card-body flex flex-col justify-between">
                <h2 class="card-title text-center text-lg">${postTitle}</h2>
                
                <div class="card-actions justify-center">
                    <label onclick="postModal('${postTitle}', '${postThumb}', '${postDetails}')" for="postModalBox" class="btn btn-primary shadow-md">Get Answer</label>
                </div>
            </div>`;
        postContainer.appendChild(div);    
        });
}



const postModal = (postTitle, postThumb, postDetails) => {

    // console.log(postTitle, postDetails)
      
    const modalBody = document.getElementById("post-modal-body");
    modalBody.textContent = "";
  
    const div = document.createElement("div");
    div.classList.add("modal-box");
    div.innerHTML = `
    <img class="rounded-xl" src="${postThumb}" alt="${postTitle}">
   
  
  
    <h3 class="font-bold text-lg mt-3">${postTitle}</h3>
    <p class="py-4">${postDetails}
    </p>
  
    <div class="modal-action justify-center">
        <label for="postModalBox" class="btn btn-primary">Close</label>
    </div>`;
  
    modalBody.appendChild(div);
  };


displayPost();