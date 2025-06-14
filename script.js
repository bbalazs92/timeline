const timeline   = document.getElementById('timeline');
const tooltip    = document.getElementById('tooltip');
const articles   = document.getElementById('articles');
const currentDay = document.getElementById('current-day');
const buttonRow1 = document.getElementById('button-row-1');
const buttonRow2 = document.getElementById('button-row-2');

const startDate  = new Date('2025-01-01');                                               // consider temporal
const daysInYear = 365;                                                                 // consider leap years
let activeYear   = 2025;
let cachedArticles = [];

function removeChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    };
};

function removeActiveButtonClass(element) {
    for (let child of element.children) {
        if (child.classList.contains("active-button")) { child.classList.remove("active-button") };
    };
};

// LEARNING POINT: when JS inserts elements using appendChild()
// no whitespace is added, making buttons appear right next
// to each other. Hand-written HTML adds whitespace by default.
// This is why me-1 Bootstrap class is added.
function createButtons() {
    for (let i = 1998; i <= 2026; i++) {
        const button = document.createElement("button");
        button.setAttribute("type", "button");
        button.className = "btn btn-primary me-1";                                      
        button.insertAdjacentText("beforeend", i);                                      
        button.addEventListener("click", (e) => {
            removeActiveButtonClass(buttonRow1);
            removeActiveButtonClass(buttonRow2);
            e.target.classList.add("active-button");
            activeYear = e.target.innerText;
        });
        if (i <= 2015) {                                                                 
            buttonRow1.appendChild(button);                                              
        } else {
            buttonRow2.appendChild(button);
        };
        if (i === 2002) { i = 2009 };
    };
};

async function loadArticles() {
    try {
        const res = await fetch('./news_articles.json');
        if (!res.ok) {
            throw new Error('Data did not load.');
        };
        const loadedArticles = await res.json();
        return loadedArticles;
    } catch (err) {
        console.error('Fetch error: ', err);
    };
};

createButtons();

// load all articles into articles div when the page loads
(async () => {
    cachedArticles = await loadArticles();
    // store selected year
    const matchingYear = activeYear.toString().slice(2);
    // only keep articles written in active year      
    const matchingYearArticles = cachedArticles.filter(element => element.date.slice(0, 2) === matchingYear);       
    // display relevant articles
    matchingYearArticles.forEach((element) => {
        let currentArticleDiv = document.createElement("div");
        currentArticleDiv.className = "articleListItem";
        articles.appendChild(currentArticleDiv);
        // add links to articles
        let currentArticleLink = document.createElement("a");
        currentArticleDiv.appendChild(currentArticleLink);
        currentArticleLink.setAttribute("href", element.link);
        currentArticleLink.setAttribute("target", "_blank");
        currentArticleLink.setAttribute("rel", "noopener noreferrer");
        currentArticleLink.innerText = element.title;
    });
})();                                                                                   // (async () => { ... })(); form is an IIFE - immediately invoked function expression

timeline.addEventListener('mousemove', (e) => {
    //mouse position calculation
    const timelineRectangle = timeline.getBoundingClientRect();                         // getBoundingClientRect() returns a DOMRect object 
    const mouseXPosition    = e.clientX - timelineRectangle.left;                       // mouse X position relative to timeline
    const timelineWidth     = timelineRectangle.width;

    //date calculation
    const dayIndex    = Math.floor((mouseXPosition / timelineWidth) * daysInYear);      // calculate cursor position 0 - 364
    const currentDate = new Date(startDate);                                
    currentDate.setDate(currentDate.getDate() + dayIndex);                              // setDate() changes value in place

    //format date
    const year  = String(currentDate.getFullYear()).slice(-2);                          // last 2 digits of the year
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');                  // months are 0 indexed
    const day   = String(currentDate.getDate()).padStart(2, '0');

    const dateAtMousePointerMousemoveEvent = `${year}/${month}/${day}`;

    //tooltip text and postion
    tooltip.innerText     = dateAtMousePointerMousemoveEvent;
    tooltip.style.left    = `${e.clientX}px`;
    tooltip.style.top     = `${timelineRectangle.top - 30}px`;
    tooltip.style.display = 'block';
});

timeline.addEventListener('mouseleave', () => {
    tooltip.style.display = 'none';
});

timeline.addEventListener('click', (e) => {

    //mouse position calculation
    const timelineRectangle = timeline.getBoundingClientRect();             
    const mouseXPosition    = e.clientX - timelineRectangle.left;           
    const timelineWidth     = timelineRectangle.width;

    //date calculation
    const dayIndex    = Math.floor((mouseXPosition / timelineWidth) * daysInYear);       
    const currentDate = new Date(startDate);                                
    currentDate.setDate(currentDate.getDate() + dayIndex);                  

    //format date
    const year  = String(currentDate.getFullYear()).slice(-2);              
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');      
    const day   = String(currentDate.getDate()).padStart(2, '0');

    const dateAtMousePointerMouseclickEvent = `${year}/${month}/${day}`;
    const matchingItem = cachedArticles.find(item => item.date === dateAtMousePointerMouseclickEvent);

    if (matchingItem) {
        removeChildren(currentDay);
        let currentDayDate = document.createElement("p");
        let articleWithLink = document.createElement("a");
        currentDay.appendChild(currentDayDate);
        currentDay.appendChild(articleWithLink);
        currentDayDate.insertAdjacentText("beforeend", `Ez tortent ezen a napon: ${year}/${month}/${day}`);             // innerText and textContent remove child nodes using this instead
        articleWithLink.setAttribute("href", `${matchingItem.link}`);
        articleWithLink.setAttribute("target", "_blank");
        articleWithLink.setAttribute("rel", "noopener noreferrer");
        articleWithLink.innerText = matchingItem.title;
    } else {
        removeChildren(currentDay);
        let noArticles = document.createElement("div");
        currentDay.appendChild(noArticles);
        noArticles.innerText = 'No relevant articles were found for this day.';
    };                                                                   
});