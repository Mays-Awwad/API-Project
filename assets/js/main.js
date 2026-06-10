
const category=document.querySelector('.category');
const product=document.querySelector('.products');
console.log(product);
console.log(category);

const getCategories=async ()=>{
    try{
        document.querySelector('.category .loader').style.display = "flex";
        const {data}=await axios.get(`https://dummyjson.com/products/category-list`);
       return data;

    }
    catch(error){
        document.querySelector('.no-category').classList.toggle('hidden');
        

    }
    finally{
        document.querySelector('.category .loader').style.display = "none";
    }
}

const displayCategories=async ()=>{
    const data=await getCategories();
    console.log(data);
    const result=data.map((p)=>{
        return `
        <a href="./product-category.html?name=${p}" class='capitalize rounded-md bg-purple-400 px-3 py-2 cursor-pointer'>${p}</a> 
        `
    
    }).join('');
    document.querySelector('.category').innerHTML=result;
}
displayCategories();


const getProducts=async ()=>{
    try{
         document.querySelector('.products .loader').style.display = "flex";
        const {data}=await axios.get(`https://dummyjson.com/products?limit=10`);
       return data.products;

    }
    catch(error){
         document.querySelector('.products .no-products').classList.remove('hidden');
}
finally {
     document.querySelector('.products .loader').style.display = "none";

}
}
const displayProducts=async ()=>{
    const data=await getProducts();
    const result=data.map( (p,index)=>{
        return `
        <div class="product rounded-lg border-2 border-amber-50 ">

        <div class="relative bg-[#eae4e4]">
        <img src=${p.thumbnail}>
        <i class="fa-regular fa-heart absolute top-6 right-3"></i>
        </div>

       <div class="flex md:px-5 flex-col gap-2">
        <h4 class="font-semibold md:text-md text-sm mt-1.5">${p.title}</h4>
 
        <div class='flex justify-between md:gap-4 gap-2 lg:text-lg text-sm'>
           <span class="text-purple-950 font-semibold">${p.price}$</span>

            <div class="flex items-center gap-1">
               <span>${p.rating}</span>
               <i class="fa-solid fa-star text-yellow-300"></i>
               <i class="fa-solid fa-star-half-stroke text-yellow-300"></i>
            </div>
        </div>

        <button class="md:px-4 px-2 md:py-1  border-2 border-purple-500 rounded-md text-purple-700 cursor-pointer">
        <a href="./details.html?id=${p.id}">View Details</a>
        </button>
       </div>

        </div>
        `
    } ).join('');
    document.querySelector('.products').innerHTML=result;

}
displayProducts();