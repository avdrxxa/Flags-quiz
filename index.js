let switchBtn = document.querySelector('.switchBtn')
let start= document.querySelector('.start')
let div= document.querySelector('div.quizContainer')

switchBtn.addEventListener('click', ()=>{
    document.body.classList.toggle('dark-mode')
})
let resultat=0
let resultatDiv=[]

let main= document.querySelector('.main')
let originalMain= main.innerHTML

function newSlide(){
    let mainElements= main.children
    for(let i = 0; i < mainElements.length; i++){
        mainElements[i].style.display='none'
    }
    let sista= main.lastElementChild
    sista.style.display='block'
}

function tillbaka(){
    main.innerHTML=originalMain
}


let frågor=[
    {
        'fråga':'Purple is the least common color on national flags.',
        'svar': ['True','False'],
        'rättSvar': 'True'
        },
    {
        'fråga':'Which country flag is this?',
        'svar': ['Monaco','Poland'],
        'rättSvar': 'Poland'
    },
    {
        'fråga':'Which country has the only flag that is not a regular shape?',
        'svar': ['Belgium','Bahrain','Nepal','United Kingdom'],
        'rättSvar': 'Nepal'
    },
    {
        'fråga':'Which flags feature a dragon? *Requires 2 or more answears*',
        'svar': ['Cambodia','Mexico','Bhutan','Wales'],
        'rättSvar': ['Bhutan', 'Wales']
    },
    {
        'fråga':'Which country flag is this?',
        'svar': ['North Korea','Vietnamn','Laos','Mongolia'],
        'rättSvar': 'Mongolia', 
    },
    {
        'fråga':'Which national flags features a sun with a face? *Requires 2 or more answears*',
        'svar': ['Uruguay','Argentina','Nauru','Kiribati'],
        'rättSvar': ['Uruguay','Argentina'], 
    },
    {
        'fråga':'Which country flag is this?',
        'svar': ['Tanzania','DR Congo', 'Republic of Congo','Madagascar'],
        'rättSvar': 'Tanzania', 
    },
    {
        'fråga':'Which national flags include a star or more in their design? *Requires 2 or more answears*',
        'svar': ['Brazil','Benin','Iran','Tuvalu'],
        'rättSvar': ['Brazil','Tuvalu'], 
    },
    {
        'fråga':'Which country flag is this?',
        'svar': ['Burkina Faso','Malawi'],
        'rättSvar': 'Malawi' 
    },
    {
        'fråga':'Which national flags include an eagle in their design? *Requires 2 or more answears*',
        'svar': ['Serbia','Spain','American Samoa','Angola'],
        'rättSvar': ['Serbia','American Samoa'], 
    },
    {
        'fråga':'Which country flag is this?',
        'svar': ['Fiji','Tuvalu'],
        'rättSvar': 'Tuvalu', 
    },
    {
        'fråga':'Which flag has the most colors?',
        'svar': ['Central African Republic','Seychelles','Belize','Spain'],
        'rättSvar': 'Belize', 
    },
]

let bilder=['pics/all.flags.jpg', 'pics/poland.jpg', 'pics/wierd.shape.jpg', 'pics/dragon.flags.jpeg', 'pics/mongolia.avif', 'pics/sun-flags.jpg', 'pics/tanzania.avif', 'pics/stars.flags.jpg', 'pics/malawi.avif',
    'pics/eagle.jpg', 'pics/tuvalu.jpg', 'pics/colors.flag.jpg']

let index=0

start.addEventListener('click', () => {
    newSlide()
    visaFrågorna()
})

function visaFrågorna(){
    let i= index
    div.innerHTML=''
    div.style.display='flex'
    let img= document.createElement('img')
    img.src= bilder[i]
    div.append(img)
    let h2= document.createElement('h2')
    h2.innerText= frågor[i].fråga
    div.append(h2)
    let fleraSvar= Array.isArray(frågor[i].rättSvar)
    let svaren= frågor[i].svar
    if(fleraSvar===true){
        svaren.forEach((svar)=>{
            let divSvar= document.createElement('div')
            divSvar.classList.add('options')
            let label= document.createElement('label')
            label.innerText=svar
            divSvar.append(label)
            let checkbox= document.createElement('input')
            checkbox.type='checkbox'
            checkbox.value=svar
            checkbox.classList.add('svar')
            divSvar.append(checkbox)
            div.append(divSvar)
        })
    } else{
        svaren.forEach((svar)=>{
            let divSvar= document.createElement('div')
            divSvar.classList.add('options')
            let label= document.createElement('label')
            label.innerText=svar
            divSvar.append(label)
            let radio= document.createElement('input')
            radio.type='radio'
            radio.name='radio'
            radio.value=svar
            radio.classList.add('svar')
            divSvar.append(radio)
            div.append(divSvar)
        })}
        let submit= document.createElement('button')
        submit.classList.add('submit')
        submit.innerText='Submit'
        div.append(submit)
        submit.addEventListener('click', ()=>{
            rätta(i,div) // be brandon förklara div
            index++
            if(index<frågor.length){
                visaFrågorna()
            }
            else{
                slut()
            }
        })
}


function rätta(i, div){
    let fråga = frågor[i];
    let fleraSvar = Array.isArray(fråga.rättSvar);
    if(!fleraSvar){
        let svarRadio = div.querySelector("input[type='radio']:checked");
        let p = document.createElement('p');
        p.innerText = `Frågan: ${fråga.fråga} Du svarade: ${svarRadio.value}. Rätt svar: ${fråga.rättSvar}`;
        resultatDiv.push(p)
        console.log(resultatDiv)
        if (svarRadio && svarRadio.value === fråga.rättSvar){
            p.style.color='green'
            resultat++;
            console.log(resultat);
        }else{
            p.style.color='red'
        }
    } else {
        let svarCheckbox = div.querySelectorAll("input[type='checkbox']:checked");
        let checkedValues = Array.from(svarCheckbox).map(cb => cb.value);
        let correctAnswers = fråga.rättSvar;
        let allCorrect = correctAnswers.every(ans => checkedValues.includes(ans));
        let noExtras = checkedValues.every(ans => correctAnswers.includes(ans));
        let p = document.createElement('p');
        p.innerText = `Frågan: ${fråga.fråga} Du svarade: ${checkedValues.join(", ")}. Rätt svar: ${fråga.rättSvar}`
        resultatDiv.push(p)
        console.log(resultatDiv)
        if(allCorrect && noExtras){
            p.style.color='green'
            resultat++;
            console.log(resultat);
        }else{
            p.style.color='red'
        }
    }
}


function slut(){
    div.innerHTML=''
    newSlide()
    let h1= document.createElement('h1')
    h1.innerText= 'End of quiz!'
    div.append(h1)
    let max= 12
    let summa=(resultat/max) *100
    let text= document.createElement('h2')
    if (summa< 50){
        text.style.color='#811331'
        text.innerText=`Resultat: ${Math.round(summa)}%`
    }else if(summa< 75){
        text.style.color='#B87333'
        text.innerText=`Resultat: ${Math.round(summa)}%`
    }else{
        text.style.color='#355E3B'
        text.innerText=`Resultat: ${Math.round(summa)}%`
    }
    div.append(text)
    let p= document.createElement('p')
    p.classList.add('slut')
    p.innerText= resultatDiv.forEach(item=>div.append(item))
    let retry=document.createElement('button')
    retry.innerText='Retry'
    retry.classList.add('retry')
    div.append(retry)
    retry.addEventListener('click',()=>{
        resultat=0
        index=0
        summa=0
        resultatDiv=[]
        div.innerHTML=''
        visaFrågorna()
    })
}
