const filterOptions=document.querySelectorAll(".filter .options button"),
rotateOptions=document.querySelectorAll(".rotateFlip .options button"),
filterName=document.querySelector(".filterInfo .fName"),
filterVal=document.querySelector(".filterInfo .fVal"),
filterSlider=document.querySelector(".filterSlider input"),
previewImg=document.querySelector(".preview_panel img"),
fileInput=document.querySelector(".controls input"),
chooseImg=document.querySelector(".controls .chooseImg"),
saveImg=document.querySelector(".controls .saveImg"),
resetBtn=document.querySelector(".editor_panel .resetFilter");


let brightness = 100, contrast = 100, saturation = 100, grayscale = 0,
    inversion = 0, hue = 0, blur = 0, rotate = 0, flipHorizontal = 1, flipVertical = 1; 

filterOptions.forEach((option) =>{
   option.addEventListener("click",() =>{
       document.querySelector("button.active").classList.remove("active");
       option.classList.add("active");
       filterName.innerText=option.innerText;

     if(option.id==="brightness"){
     	  filterSlider.max = "200";
          filterSlider.value = brightness;
          filterVal.innerText = `${brightness}%`;
	 }
	 else if(option.id==="contrast"){
	 	 filterSlider.max = "200";
	     filterSlider.value = contrast;
         filterVal.innerText = `${contrast}%`;
	 }
	 else if(option.id==="saturation"){
	 	  filterSlider.max = "200";
          filterSlider.value = saturation;
          filterVal.innerText = `${saturation}%`;
	 }
	 else if(option.id==="grayscale"){
	 	 filterSlider.max = "100";
         filterSlider.value = grayscale;
         filterVal.innerText = `${grayscale}%`;
	 }
	  else if(option.id==="inversion"){
	  	 filterSlider.max = "100";
         filterSlider.value = inversion;
         filterVal.innerText = `${inversion}%`;
	 }
	 else if(option.id==="hue-rotate"){
	  	 filterSlider.max = "100";
         filterSlider.value = hue;
         filterVal.innerText = `${hue}%`;
	 }
	 else{
	 	 filterSlider.max = "100";
         filterSlider.value = blur;
         filterVal.innerText = `${blur}%`; 
	 }
   });
});

const saveImage = () =>{
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");
	canvas.width = previewImg.naturalWidth;
	canvas.height = previewImg.naturalHeight;
	ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) 
	 contrast(${contrast}%) grayscale(${grayscale}%) invert(${inversion}%) hue-rotate(${hue*3.4}deg) blur(${blur/40}px)`;
	 ctx.translate(canvas.width/2 , canvas.height/2);
	 if(rotate !== 0){
	 	ctx.rotate(rotate * Math.PI / 180);
	 }
	 ctx.scale(flipHorizontal , flipVertical);
	 ctx.drawImage(previewImg, -canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
	// document.body.appendChild(canvas);

     let image=fileInput.files[0];
	 // console.log(image);
	let imageName=image.name;

	const link = document.createElement("a");
	link.download = `${imageName}`;
	link.href = canvas.toDataURL();
	console.log(link.href);
	link.click();
}

const resetFilter = () =>{
	brightness = 100, contrast = 100, saturation = 100, grayscale = 0,
    inversion = 0, hue = 0, blur = 0, rotate = 0, flipHorizontal = 1, flipVertical = 1;
    filterOptions[0].click();
    applyFilter();
}

const applyFilter = () =>{
	 previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) 
	 contrast(${contrast}%) grayscale(${grayscale}%) invert(${inversion/3}%) hue-rotate(${hue*3.4}deg) blur(${blur/40}px)`;

	 previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal},${flipVertical})`;
}

const loadImage = ()=>{
	let file=fileInput.files[0];
	if(!file) return;
	previewImg.src=URL.createObjectURL(file);
	previewImg.addEventListener("load",()=>{
       document.querySelector(".container").classList.remove("disable");
       resetFilter();
	});
}

const updateFilter= ()=>{
     filterVal.innerText=`${filterSlider.value}%`;
     let selectedFilter=document.querySelector("button.active");

	 if(selectedFilter.id==="brightness"){
        brightness = filterSlider.value; 
	 }
	 else if(selectedFilter.id==="contrast"){
	 	contrast = filterSlider.value;
	 }
	 else if(selectedFilter.id==="saturation"){
        saturation = filterSlider.value;
	 }
	 else if(selectedFilter.id==="grayscale"){
        grayscale = filterSlider.value;
	 }
	  else if(selectedFilter.id==="inversion"){
        inversion = filterSlider.value;
	 }

	 else if(selectedFilter.id==="hue-rotate"){
	   hue = filterSlider.value;
	 }
	 else{
        blur = filterSlider.value;
	 }

	 applyFilter();
}

 rotateOptions.forEach((option) =>{
      option.addEventListener("click", () =>{
       if(option.id === "left"){
 	 	rotate -= 90;
		}
		else if(option.id === "right"){
			rotate += 90;
		}
		else if(option.id === "horizontal"){
			flipHorizontal = flipHorizontal == 1 ? -1 : 1;
		}
		else{
			flipVertical = flipVertical == 1 ? -1 : 1;
		}

		applyFilter();

      });
 });


filterSlider.addEventListener("input",updateFilter);
fileInput.addEventListener("change",loadImage);
chooseImg.addEventListener("click",() => fileInput.click());
saveImg.addEventListener("click",saveImage);
resetBtn.addEventListener("click",resetFilter);


