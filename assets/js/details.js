const product=document.querySelector('.product-details .container');

const getProductById=async ()=>{
    try{
        document.querySelector('.loader').style.display = "flex";
        const params=new URLSearchParams(location.search);
        const id=params.get('id');

        const {data}=await axios.get(`https://dummyjson.com/products/${id}`);
        return data;        
    }
    catch (error){
       
        document.querySelector('.no-result').classList.remove('hidden');
    }

    finally{
        document.querySelector('.loader').style.display = "none";

    }
}
getProductById();

const displayProductById=async ()=>{
    
    const result=await getProductById();

    let Stock;
    if(result.availabilityStatus=="In Stock"){
        Stock="In Stock";
    }
    else{
        Stock="Out Of Stock";
    }
     product.innerHTML=`
         <div class="product grid md:grid-cols-2 grid-cols-1 justify-items-start md:gap-4">
            <div class="flex md:justify-end w-full">
               <img src=${result.thumbnail} alt="">
            </div>

            <div class="flex flex-col md:gap-5 gap-3">

            <h1 class="font-bold text-3xl" >${result.title}</h1>
            <div class="flex items-center gap-1">
                <i class="fa-solid fa-star text-yellow-300"></i>
               <i class="fa-solid fa-star-half-stroke text-yellow-300"></i>
               <span class="text-paragraph">${result.rating} (${result.reviews.length} reviews)</span>
            </div>
            <span class="text-2xl font-bold text-purple-600"> $${result.price}</span>
             <div class="text-green-500 flex gap-1 items-center text-sm">
             <i class="fa-solid fa-circle"></i>
             <span class="">${Stock}</span>
             </div>
             <p class="text-gray-500 max-w-md">${result.description}</p>

             <div class="flex gap-2 items-center">
                <button class="cursor-pointer flex gap-3 items-center border p-2 border-mist-200 rounded-md">
                <span class="">-</span>
                <span class="">1</span>
                <span class="">+</span>
                </button>

                <button class=" flex items-center py-2 px-7 border-mist-200  border rounded-md gap-0.5 bg-purple-800 cursor-pointer">
                <i class="fa-solid fa-cart-shopping"></i>
                <span>Add to Cart</span>
                </button>
             </div>
            </div>
         </div>   
          <div class="border-y-2 py-5 border-mist-100 mt-8">
             <span class="font-bold text-black text-lg">Reviews (${result.reviews.length})</span>
         </div> 
     `;
    
     const review =result.reviews.map((rev)=>{
        let stars = '';

      for(let i = 0; i < Math.floor(rev.rating); i++){
        stars += `<i class="fa-solid fa-star text-yellow-300"></i>`;
        }
           return `
            <div class="review mt-10 p-6 border border-mist-100 rounded-lg flex flex-col gap-5">
               <h4 class="">${rev.reviewerName}</h4>
                <div class=" text-purple-500 flex md:justify-between gap-6">
                    <div>
                       ${stars}
                    </div>
                    <span class="md:text-lg text-sm">${rev.date}</span>
                </div>
                <p>${rev.comment}</p>
                    
                </div>
           `
    }).join('');
    product.innerHTML+=review;

}

displayProductById();