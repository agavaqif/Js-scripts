
//Promise which Loads image to the page
function loadImage(src) {
    return new Promise( (resolve, reject) => {
      let img = new Image();
      img.onload = ()=> resolve(img);
      img.error = ()=>reject(img);
      img.src = src;
    });
}


//Function which changes RGB value of chosen colour
function changeRGBValue(colour,new_value) {
  loadImage("tree.jpg").then((img)=>{
    const canvas = document.getElementById("target");
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img,0,0);
    let imgData=ctx.getImageData(0,0,canvas.width,canvas.height);//Get Image Data
    for (i=0;i<imgData.data.length;i=i+4){
      if(colour=="r"){
        imgData.data[i]=new_value;//If Chosen colour is red change It
      }else if(colour=="g"){
        imgData.data[i+1]=new_value;//If Chosen colour is green change It
      }else{
        imgData.data[i+2]=new_value;//If Chosen colour is blue change It
      }
    };
    ctx.putImageData(imgData,0,0);//Put New Data
  })
}

//Function which will print rgb values
function RGBPrinter(canvas){
  rgb_values=[];
  const ctx = canvas.getContext("2d");
  let imgData = ctx.getImageData(0,0,canvas.width,canvas.height);//Get Image Data
  for (i=0; i<imgData.data.length; i=i+4){
    rgb_values.push({ "r" : imgData.data[i],
                      "g" : imgData.data[i+1],
                      "b" : imgData.data[i+2]
                    });
  };
  return rgb_values;
}

//Function which inverts image
function invert(){
  loadImage("tree.jpg").then((img)=>{
    const canvas = document.getElementById("target");
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img,0,0);
    let imgData=ctx.getImageData(0,0,canvas.width,canvas.height);//Get Image Data
    for (i=0; i<imgData.data.length; i=i+4){
        imgData.data[i] = 255-imgData.data[i];//Main equations which ensure inverting process
        imgData.data[i+1] = 255-imgData.data[i+1];
        imgData.data[i+2] = 255-imgData.data[i+2];
    };
    ctx.putImageData(imgData,0,0);//Put New Data
  })
}

//Function which will transform RGB into GrayScale(There are several Methods)
function grayScale(){
  loadImage("tree.jpg").then((img)=>{
    const canvas = document.getElementById("target");
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img,0,0);
    let imgData=ctx.getImageData(0,0,canvas.width,canvas.height);//Get Image Data
    for (i=0;i<imgData.data.length;i=i+4){
        let new_value=(imgData.data[i]+imgData.data[i+1]+imgData.data[i+2])/3;//R+G+B/3 Method was used
        imgData.data[i] = new_value;
        imgData.data[i+1] = new_value;
        imgData.data[i+2] = new_value;
    };
    ctx.putImageData(imgData,0,0);//Put New Data
  })
}

//Function which will ensure that RGB values are in desirable range
function truncate(value){
  if(value<0){
    value=0;
  }else if(value>255){
    value=255;
  }
  return value;
}

//Function which will change brightness
function changeBrightness(brightness){
  loadImage("tree.jpg").then((img)=>{
    const canvas = document.getElementById("target");
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img,0,0);
    let imgData=ctx.getImageData(0,0,canvas.width,canvas.height);//Get Image Data
    for (i=0;i<imgData.data.length;i=i+4){
        imgData.data[i] = truncate(imgData.data[i]+brightness);//
        imgData.data[i+1] = truncate(imgData.data[i+1]+brightness);//
        imgData.data[i+2] = truncate(imgData.data[i+2]+brightness);//
    };
    ctx.putImageData(imgData,0,0);//Put New Data
  })
}

//Function which will change contrast
function changeContrast(contrast){
  loadImage("tree.jpg").then((img)=>{
    const canvas = document.getElementById("target");
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img,0,0);
    let imgData=ctx.getImageData(0,0,canvas.width,canvas.height);//Get Image Data
    let factor = (259*(contrast+255))/(255*(259-contrast));
    for (i=0;i<imgData.data.length;i=i+4){
        imgData.data[i]=truncate((imgData.data[i]-factor)*factor+128);//
        imgData.data[i+1]=truncate((imgData.data[i+1]-factor)*factor+128);//
        imgData.data[i+2]=truncate((imgData.data[i+2]-factor)*factor+128);//
    };
    ctx.putImageData(imgData,0,0);//Put New Data
  })
}

function random(){
  loadImage("tree.jpg").then((img)=>{
    const canvas = document.getElementById("target");
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img,0,0);
    let imgData=ctx.getImageData(0,0,canvas.width,canvas.height);//Get Image Data
    for (i=0;i<imgData.data.length;i=i+4){
        temp_r=imgData.data[i];
        temp_g=imgData.data[i+1];
        temp_b=imgData.data[i+2];
        imgData.data[i] = temp_g;
        imgData.data[i+1] = temp_b;
        imgData.data[i+2] = temp_r;
    };
    ctx.putImageData(imgData,0,0);//Put New Data
  })
}

//Change RGB button changes chosen colour value
document.getElementById("setter").onclick = ()=>{
     let red_value=document.getElementById("red").value;
     let green_value=document.getElementById("green").value;
     let blue_value=document.getElementById("blue").value;
     if(red_value){ changeRGBValue("r",red_value); }
     if(green_value){ changeRGBValue("g",green_value); }
     if(blue_value){ changeRGBValue("b",blue_value); }
};

//To change brightness
document.getElementById("changeBrightness").onclick = ()=>{
     let brightness=document.getElementById("brightness").value;
     changeBrightness(parseInt(brightness));
};
//To change contrast
document.getElementById("changeContrast").onclick = ()=>{
     let brightness=document.getElementById("contrast").value;
     changeContrast(parseInt(brightness));
};



//As soon as page loads load image too
  loadImage("tree.jpg").then((img)=>{
    let brightness=0;
    var canvas = document.getElementById("target");
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img,0,0);

  })
