const products=document.querySelector(".products");
const select = document.querySelector(".title-price");
const pagination=document.querySelector(".pagination");
const lo=document.querySelector('.loader');
console.log(lo);
let allProducts = []; 
let CurrentPage=1;



const getProducts=async (sortBy,order,page)=>{
  try{
   /* document.querySelector('.loader').classList.remove('hidden');*/
   document.querySelector('.loader').style.display = "flex";
    const params=new URLSearchParams(location.search);
    const name=params.get('name');

    const skip=( page - 1) * 10;
    const {data}=await axios.get(`https://dummyjson.com/products/category/${name}?limit=10&skip=${skip}&sortBy=${sortBy}&order=${order}`);
    return data;
  }
  catch(error){
     document.querySelector('.no-products').classList.remove('hidden');
  }
  finally{
   document.querySelector('.loader').style.display="none";


  }
}
const displayProducts=async (page=1)=>{
    /*const response=await getProducts();*/
    CurrentPage=page;
  
     const [sortBy, order] = select.value.split("-");

      const data2=await getProducts(sortBy,order,page);
    const numberOfPages=Math.ceil(data2.total / 10);
    const productList=data2.products;
    const result=productList.map( (res)=>{
         return `
         <div class="product flex flex-col gap-2 rounded-lg border border-mist-200 md:max-w-lg max-w-sm ">

               <div class="relative bg-mauve-200 justify-items-center  ">
                    <img src=${res.thumbnail} alt="">
                    <i class="fa-regular fa-heart absolute top-6 right-3"></i>
                </div>

               <div class=" p-2 flex flex-col gap-2">
               <p class="">${res.title}</p>

               <div class="flex justify-between md:gap-4 gap-2">
                <div class="flex items-center gap-1">
                <i class="fa-solid fa-star text-yellow-300"></i>
               <i class="fa-solid fa-star-half-stroke text-yellow-300"></i>
               <span class="text-paragraph md:text-md text-sm">${res.rating} (${res.reviews.length} reviews)</span>
               </div>
               <span class="text-purple-600">${res.price}$</span>
               </div>

                <div class="flex justify-between gap-3">
                   <button class="p-2 bg-mauve-200 border border-mist-200 rounded-md"> <i class="fa-solid fa-cart-shopping"></i></button>
                   <button class="bg-mauve-200  grow md:px-4 px-2 md:py-1  border border-mist-200 rounded-md text-purple-700 cursor-pointer">
                   <a href="./details.html?id=${res.id}">View Details</a>
                  </button>
                </div>

                
               </div>
          </div>
         `
    } ).join('');

     let paginationLink=``;
    if(page >1){
        paginationLink=`<li><button class="cursor-pointer" onclick=displayProducts(${parseInt(page) - 1})>&lt;</button></li>`;
    }
    else{
        paginationLink=`<li><button class="cursor-pointer" disabled>&lt;</button></li>`;
    }
     
    for(let i=1;i<=numberOfPages;i++){
            paginationLink+=`<li><button class="cursor-pointer" onclick=displayProducts(${i})>${i} </button></li>`;
    }
    

    if(page < numberOfPages){
        paginationLink+=`<li><button class="cursor-pointer" onclick=displayProducts(${parseInt(page) + 1})>&gt</button></li>`;
    }
    else{
           paginationLink+=`<li> <button class="cursor-pointer" disabled>&gt</button></li>`
    }
pagination.innerHTML=paginationLink;
products.innerHTML=result;
}

 select.addEventListener("change", () => {
  displayProducts(CurrentPage);
}); 


displayProducts();