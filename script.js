//seleziona il div corrispondente e ne fa il Check
function onCheck(event){
    const alldivs = event.currentTarget
    const img = alldivs.querySelector('.checkbox')
    img.src = 'images/checked.png'
    alldivs.classList.remove('opacita')
    alldivs.classList.add('cambia')
    answers[alldivs.dataset.questionId] = alldivs.dataset.choiceId
    if(answers.one !== '' && answers.two !== '' && answers.three !== ''){ //se tutte le risposte sono piene invoco il fineQuiz
        fineQuiz()
    }
    removeAnsw(alldivs)
}

//mappa per assegnare valori nulli ai componenti dei data-choice-id
const answers = {
    'one': '',
    'two': '',
    'three' : ''
};
 
//chiamo la funzione per la selezione del div
const alldivs = document.querySelectorAll('.choice-grid div')     
for (const div of alldivs) {
    div.addEventListener('click', onCheck)
}
 
//rimuove la risposta inserita 
function removeAnsw(answer){
    const ungiven = document.querySelectorAll('.choice-grid div') 
    for(const rispnon of ungiven){
        if(rispnon.dataset.choiceId !== answer.dataset.choiceId && rispnon.dataset.questionId === answer.dataset.questionId){
            rispnon.classList.remove("cambia")
            const imag = rispnon.querySelector('.checkbox').src = 'images/unchecked.png'
            rispnon.classList.add("opacita")
        }
    }
}

function choicePersonality(){
    if(answers.one === answers.three || answers.one === answers.two )
       return answers.one
    else if (answers.two === answers.three)
       return answers.two
    else if (answers.one !== answers.two && answers.one !== answers.three && answers.two !== answers.three)
       return answers.one
}

//seleziono l'unica section con id='nas' per rimuovere/aggiungere la classe hidden
const darim = document.querySelector('#nas');

function viewPersonality(){    
    var index = choicePersonality()

    var title = document.querySelector("#titolo")
    var text = document.querySelector("#personalita")
    var but = document.querySelector("#buttid")

    darim.classList.remove('hidden')

    title.textContent = RESULTS_MAP[index].title    
    text.textContent = RESULTS_MAP[index].contents

    but.addEventListener('click', reset)
}

//resetta la funzione dichiarando i valori della mappa a null e rimuovendo tutti gli attributi di classe precedentemente inseriti
function reset(){
    answers.one = ''
    answers.two = ''
    answers.three = ''
    for(const div of alldivs){
        const imag = div.querySelector('.checkbox')
        imag.src = 'images/unchecked.png'
        div.classList.remove('cambia')
        div.classList.remove('opacita')
        div.addEventListener('click', onCheck)
    }
    darim.classList.add('hidden')
    window.scrollTo(0,0)
}

//rimuovo la possibilità di cliccare sulle immagini
const stopdivs = document.querySelectorAll(".choice-grid div")
function fineQuiz(){
    for(var i=0;i<27;i++){
        alldivs[i].removeEventListener('click', onCheck) 
    }   
    viewPersonality()
}