const dropArea = document.querySelector(".drag");
const dragText = document.querySelector("#dragText");
let file; //global variable
let fileURL;
//add dragover event listener and prevent default event
//add triggered class
dropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  dragText.textContent = "Release to Upload File";
  dropArea.classList.add("triggered");
});

//add dragleave event listener and prevent default event
//remove triggered class
dropArea.addEventListener("dragleave", () => {
  dragText.innerHTML =
    "<p id='dragText'>Drag & Drop to upload file <br /> or</p>";
  dropArea.classList.remove("triggered");
});

//add drop event listener and prevent default event
//remove triggered class
dropArea.addEventListener("drop", (event) => {
  event.preventDefault();
  dropArea.classList.remove("triggered");
  file = event.dataTransfer.files[0];
  showFile(); //call the function to show the image to the drag area
});

const showFile = () => {
  let fileType = file.type;
  //filter the accepted files
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
  if (validExtensions.includes(fileType)) {
    let fileReader = new FileReader();
    fileReader.onload = () => {
      fileURL = fileReader.result;
      let imageTag = `<img src="${fileURL}" alt="image">`; //show the image
      dropArea.innerHTML = imageTag;
      document.querySelector(".btn-generate").classList.add("ready");
    };
    fileReader.readAsDataURL(file);
  } else {
    alert(" Only image files (.jpeg .png .jpg) can be accepted!");
    dropArea.classList.remove("triggered");
    dragText.innerHTML =
      "<p id='dragText'>Drag & Drop to upload file <br /> or</p>";
  }
};

//when btn upload is clicked input file element will be clicked, which is hidden
const button = document.querySelector(".btn-upload");
const input = document.querySelector("#imageFile");
button.onclick = () => {
  input.click();
};
input.addEventListener("change", function () {
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = this.files[0];
  dropArea.classList.add("active");
  showFile(); //calling function
});

//generate
const btnGenerate = document.querySelector(".btn-generate");
btnGenerate.onclick = () => {
  const texts = document.querySelector("#texts").value;
  const repeat = document.querySelector("#repeat").value;
  const text = document.querySelector("#text");
  text.style.backgroundImage = `url('${fileURL}')`;
  for (i = 1; i <= repeat; i++) {
    text.append(texts);
  }
};
// btnGenerate.focus = () => {
//   btnGenerate.classList.add("clicked");
// };
