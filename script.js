const timeline = document.getElementById('timeline');
const tooltip  = document.getElementById('tooltip');
const totalStolenAtCurrentYear = document.getElementById('total-stolen-this-year');

const startDate = new Date('2025-01-01');                                   //consider temporal
const daysInYear = 365;

async function loadArticles() {
    try {
        const res = await fetch('./news_articles.json');
        if (!res.ok) {
            throw new Error('Data did not load.');
        };
        const articles = await res.json();
        return articles;
    } catch (err) {
        console.error('Fetch error: ', err);
    };
};

timeline.addEventListener('mousemove', (e) => {
    //mouse position calculation
    const timelineRectangle = timeline.getBoundingClientRect();             // getBoundingClientRect() returns a DOMRect object 
    const mouseXPosition    = e.clientX - timelineRectangle.left;           // mouse X position relative to timeline
    const timelineWidth     = timelineRectangle.width;

    //date calculation
    const dayIndex    = Math.floor((mouseXPosition / timelineWidth) * daysInYear);       // calculate cursor position 0 - 364
    const currentDate = new Date(startDate);                                
    currentDate.setDate(currentDate.getDate() + dayIndex);                  // setDate() changes value in place

    //format date
    const year  = String(currentDate.getFullYear()).slice(-2);              // last 2 digits of the year
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');      // months are 0 indexed
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

    articles.style.height = '50px';
    (async () => {
        const newsArticles = await loadArticles();
        const matchingItem = newsArticles.find(item => item.date === dateAtMousePointerMouseclickEvent);
        if (matchingItem) {
            articles.innerText = matchingItem.title;
        } else {
            articles.innerText = 'No relevant articles were found for this day.';
        }
    })();                                                                      // (async () => { ... })(); form is an IIFE - immediately invoked function expression
});