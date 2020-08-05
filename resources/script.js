const main = document.getElementById('body');
const voiceSelector = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [{
        image: '../resources/img/happy.jpg',
        text: "I'm Happy."
    },
    {
        image: '../resources/img/angry.jpg',
        text: "I'm Angry."
    },
    {
        image: '../resources/img/sad.jpg',
        text: "I'm Sad."
    },
    {
        image: '../resources/img/scared.jpg',
        text: "I'm Scared."
    },
    {
        image: '../resources/img/hurt.jpg',
        text: "I'm Hurt."
    },
    {
        image: '../resources/img/tired.jpg',
        text: "I'm Tired."
    },
    {
        image: '../resources/img/drink.jpg',
        text: "I'm Thirsty."
    },
    {
        image: '../resources/img/food.jpg',
        text: "I'm Hungry."
    },
    {
        image: '../resources/img/home.jpg',
        text: "I want to go Home."
    },
    {
        image: '../resources/img/school.jpg',
        text: "I Want to go School."
    },
    {
        image: '../resources/img/outside.jpg',
        text: "I Want to go Outside."
    },
    {
        image: '../resources/img/friends.jpg',
        text: "I Want to meet my friend."
    }
];

data.forEach(createBox);

// Create Speech Boxes
function createBox(item) {
    const box = document.createElement('div');
    const {
        image,
        text
    } = item;

    box.classList.add('box');
    box.innerHTML = `
        <img src="${image}" alt="${text}" />
        <p class="info">${text}</p>
    `;

    // Speak Event
    box.addEventListener('click', () => {
        setTextMessage(text);
        speakText();

        // Add active effect
        box.classList.add('active');
        setTimeout(() => {
            box.classList.remove('active');
        }, 1000);
    });

    main.appendChild(box);
}
// Init Speech Synthesis
const message = new SpeechSynthesisUtterance();

// Store voices
let voices = [];

function getVoices() {
    voices = speechSynthesis.getVoices();

    voices.forEach(voice => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.innerText = `${voice.name} ${voice.lang}`;

        voiceSelector.appendChild(option);

    })


}

// Set text
function setTextMessage(text) {
    message.text = text;
}

// Speak text
function speakText() {
    speechSynthesis.speak(message);
}

// Set voice
function setVoice(e) {
    message.voice = voices.find(voice => voice.name === e.target.value)
}

// Voices Changed
speechSynthesis.addEventListener('voiceschanged', getVoices);

// toggle text box
toggleBtn.addEventListener('click', () => {
    document.getElementById('text-box').classList.toggle('show');
});
// close btn
closeBtn.addEventListener('click', () => {
    document.getElementById('text-box').classList.remove('show');
});
// Change voice
voiceSelector.addEventListener('change', setVoice);

// Read text button
readBtn.addEventListener('click', () => {
    setTextMessage(textarea.value);
    speakText();
});

getVoices();