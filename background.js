//Persistent background  transtition 
const image_array=['pic1.jpg','pic2.jpg','pic3.jpg','pic4.jpg','pic5.jpg','pic6.jpg'];

const bodyElement=document.querySelector('body');

let current_image=sessionStorage.getItem('current_image')? parseInt(sessionStorage.getItem('current_image')) :0; 

const image_length=image_array.length; 
const main_container=document.querySelector(".main_container");

const loader=document.querySelector(".loader");

//preload function to load all the images 
// all the preloaded images are stored in browser CACHE so that we can avoid white screen loading time
// when using new Image() and setting its src, browsers automatically cache the images.
async function preloadImages(){
    //using in-memory cache so that it stops random flickering and faster retrivel than browser cache 
    const imageCache=new Map();
    const promises=image_array.map((src)=>{

        return new Promise((resolve,reject)=>{
            //This creates a image tag and stores in browser cache 
            const img=new Image();//create a new Image 
            img.src=src;//set a image source

            imageCache.set(src,img);//storing in map


            img.onload=resolve; //Resolve promise when image is loaded
            img.onerror=reject;//Reject promise when image is not loaded
        });

    });
    return Promise.all(promises).then(()=>imageCache);//asynchronous handles all promises 
//and returns imageCache

};


// transition function to change background image 

   
    function changeBackground(imageCache) {
        const nextImage = imageCache.get(image_array[current_image]);
        
        if (nextImage) {
            bodyElement.style.backgroundImage = `url(${nextImage.src})`;
            current_image = (current_image + 1) % image_length;
            sessionStorage.setItem('current_image', current_image);
        }
    }






window.onload=()=>{
    preloadImages().then((imageCache)=>{
        loader.style.display="none"; 
        const intialImage=imageCache.get(image_array[current_image]);
        bodyElement.style.backgroundImage=`url(${intialImage.src})`;
        setInterval(()=>changeBackground(imageCache),5000);  
    }).catch((error)=>{
        console.log("Failed to load images",error);
        loader.style.display="none";
    });
    

    // if(!hasPreloadBefore){
    //     preloadImages();
    //     hasPreloadBefore=true;  //marking that preloadImages has been executed once

    // }This is not required as a refresh would wipe out in-memory of images 
    //you can only store string in session storage so storing loaded images is also not possible
   
    
    // When setting backgroundImage with a URL, the browser will:

    // First check if there's a loaded image in memory (our Map cache) with that src
    // If not found in memory, check browser's disk cache
    // If not in disk cache, fetch from network
    
    // So even though we're using the same src URL: 
    
    
    
}

// <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
//<meta http-equiv="Pragma" content="no-cache">
//<meta http-equiv="Expires" content="0"></meta> 
//optimizations in meta tag
