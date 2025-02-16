const navtoggler=document.querySelector('.nav-toggler'); 

const navtogglericon=document.getElementById('navbar-toggle-icon');

const navhidden=document.querySelector('.nav-hidden'); 

navtogglericon.addEventListener("click",()=>{
    if(navhidden.classList.contains("active")){
        navhidden.classList.remove("active");
    }
    else{
        navhidden.classList.add("active");
    }
})