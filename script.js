
// INPUTS FORM VARIABLES
let inputDate = document.querySelector(".date");
const submitBtn = document.querySelector(".submit-btn");
const excelInput = document.querySelector(".excelInput")
const typeCertificationInput = document.querySelector(".typeCertificationInput")
const typeFormationInput = document.querySelector(".typeFormationInput")
const descriptionInput = document.querySelector(".descriptionInput")
const imageInput = document.querySelector(".imageInput")
const inputs = document.querySelectorAll(".section1 input")


const nameBx = document.querySelector(".nameBx")
const downloadBx = document.querySelector(".downloadBx")
const tableSection = document.getElementById("table")

// ATTESTATION VARIABLE
const whatToPrint = document.querySelector(".whatToPrint")
const section2 = document.querySelector(".section2 .left-side")
// ATTESTATION TEXT VARIABLES
const typeAttestation = document.querySelectorAll(".typeAttestation")
const NameIntro = document.querySelectorAll(".NameIntro")
const fullName = document.querySelectorAll(".fullName")
const dateText = document.querySelectorAll(".dateText")
const description = document.querySelectorAll(".centered-Bx .description")

// COLOR PICKER VARIABLES
const colorPickers = document.querySelectorAll(".colorPicker")
const certificationColor = document.querySelector(".certificationColor")
const formationColor = document.querySelector(".formationColor")
const descriptionColor = document.querySelector(".descriptionColor")
const datePicker = document.querySelector(".datePicker")
const LineColor = document.querySelector(".lineColor")
const fullNameColor = document.querySelector(".nameColor")




// VARIABLES FOR GETTING DATA FROM EXCEL FILE
let selectedFile;
let fullNames = [];
let firstNames = [];
let lastNames = [];


// IMPORT EXCEL FILE
excelInput.addEventListener("change", (event) => {
  selectedFile = event.target.files[0];
});



const showSection = () => {
  document.getElementById("section2").classList.add("show")


}

submitBtn.addEventListener("click", () => {
  // IN CASE THE USER DIDNT FILL THE FORM
  inputs.forEach(item => {  
      if (!item.value) {
        item.style.borderBottom = "0.2rem solid #f00"
        item.parentElement.querySelector("label").style.color = "#f00"
      } else {
        item.style.borderBottom = "0.1rem solid var(--green-color)"
        item.parentElement.querySelector("label").style.color = "#000"
      }

  })
  // IN CASE THE USER FILLED THE FORM
  if(typeCertificationInput.value && typeFormationInput.value  && descriptionInput.value  && imageInput.value  && inputDate.value  && excelInput.value ) {
  //  CONVERT EXCEL DATA TO HTML
  showSection()
    if (selectedFile) {
      excelInput.style.borderBottom = "0.1rem solid var(--green-color)"
      excelInput.parentElement.querySelector("label").style.color = "#00"
  
      let fileReader = new FileReader();
  
      fileReader.readAsBinaryString(selectedFile);
      fileReader.onload = (event) => {
        let data = event.target.result;
        let workbook = XLSX.read(data, { type: "binary" });
        workbook.SheetNames.forEach((sheet) => {
          let rowObject = XLSX.utils.sheet_to_row_object_array(
            workbook.Sheets[sheet]
          );
          Object.values(rowObject).forEach((item) => {
            fullNames.push(Object.values(item));
          });
          fullNames.forEach((item) => {
            firstNames.push(item[0]);
            lastNames.push(item[1]);
          });
        });
        createTable();
        fillingInfo("Prenom","Nom")
      };
      selectedFile = "";
    }
  }

  
});

let imgData
function loadFile(item) {
  
  var img = item.files[0]
  var  file = new FileReader()

  file.onloadend = function( ) {
    imgData = file.result;
  }
  file.readAsDataURL(img)
}


const updateColors = function() {
  typeAttestation.forEach((item) => {
    item.style.color = certificationColor.value
  })

  typeAttestation.forEach((item) => {
    item.style.color = certificationColor.value
  })

  description.forEach((item)=> {
    item.style.color = descriptionColor.value
  })

  dateText.forEach((item)=> {
    item.style.color = datePicker.value
  })



  fullName.forEach((item) => {
    item.style.color = fullNameColor.value
  })

  document.querySelectorAll(".centered-Bx").forEach((item)=> {
    item.style.borderTop = `.3rem solid ${LineColor.value}`
  })

  document.querySelectorAll(".greenLabLogo").forEach((item)=> {
    item.style.borderBottom = `.3rem solid ${LineColor.value}`
  })

}

const fillingInfo = (firstNames, lastNames) => {
  typeAttestation.forEach((item) => {
    item.textContent = typeCertificationInput.value
    item.style.color = certificationColor.value
  })

  typeAttestation.forEach((item) => {
    item.textContent = typeCertificationInput.value
    item.style.color = certificationColor.value
  })

  description.forEach((item)=> {
    item.textContent = descriptionInput.value
    item.style.color = descriptionColor.value
  })

  dateText.forEach((item)=> {
    item.innerHTML = `<p class="dateText">Organisé le, ${inputDate.value}</p>  `
    item.style.color = datePicker.value
  })

  fullName.forEach((item) => {
    item.textContent = `${lastNames} ${firstNames}`
    item.style.color = certificationColor.value
  })

  section2.style.backgroundImage = `url(${imgData})`

}

let pdfBase64;
let temp;

function TIMERR(firstNames, lastNames) {
  setTimeout(()=> {  html2canvas(whatToPrint,{
    onrendered : function (canvas) {


      var img = canvas.toDataURL("image/PNG")
      let doc = new jsPDF('l', 'mm', 'a4');
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;

      doc.addImage(imgData,'JPEG',0,0,pageWidth,pageHeight)
      doc.addImage(img,'JPEG',0,0,)
        doc.save(`${firstNames} ${lastNames}.pdf`);
         pdfBase64 = doc.output('datauristring');
         console.log(pdfBase64)
    }
  })

  },50)
}

function   sendMsg(e) {
  setTimeout(()=> {  html2canvas(whatToPrint,{
    onrendered : function (canvas) {


      var img = canvas.toDataURL("image/PNG")
      let doc = new jsPDF('l', 'mm', 'a4');
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;

      doc.addImage(imgData,'JPEG',0,0,pageWidth,pageHeight)
      doc.addImage(img,'JPEG',0,0,)
         pdfBase64 = doc.output('datauristring');
         console.log(pdfBase64)


          e.preventDefault();
          Email.send({
            SecureToken : "d2895549-239c-4b1c-8fdb-ca763a2f0c5c",
            To : document.querySelector(".emailInput").value,
            From : "ayoubkhabali9@gmail.com",
            Subject : "votre attestation",
            Body : "And this is the body",
            Attachments : [pdfBase64]
          }).then(
          message => alert(message)
          );  
        
        
        
         
    }
  })

  },50)
}

temp = pdfBase64






// const windowBx = document.querySelector(".WindowBx")
const sendEmail = document.querySelector(".sendEmail")









function createTable() {
  let i;
  for (i = 0; i < firstNames.length; i++) {
    nameBx.innerHTML += `<div class="name-row"><p>${lastNames[i]} ${firstNames[i]}</p></div>`
    downloadBx.innerHTML += `<div class="download-row">
    <button  onclick="TIMERR(firstNames[${i}],lastNames[${i}]) ; fillingInfo(firstNames[${i}],lastNames[${i}]);updateColors()" class="downloadBtn btn">Download</button>
    <button onclick="sendMsg()"  data-id="${i}" class="btn sendBtn">Send</button>
</div>`
    
  }
}

const sendBtn = document.querySelectorAll(".sendBtn")


sendEmail.addEventListener("click", sendMsg)








