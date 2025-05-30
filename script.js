let newsArticles = 0;

fetch('./news_articles.json')
    .then(res => res.json())
    .then(dataArray => {
        newsArticles = dataArray;
        console.log(`Loaded ${dataArray.length} objects.`);
        dataArray.forEach(article => {
            console.log(article.title, article.link, article.date, article.stolen);
        });
    })
    .catch(err => console.error('Error loading JSON:', err));

const timeline = document.getElementById('timeline');
const tooltip  = document.getElementById('tooltip');

const startDate = new Date('2025-01-01');                                   //rewrite to use temporal!!

const daysInYear = 365;

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
    tooltip.innerText = dateAtMousePointerMousemoveEvent;
    tooltip.style.left = `${e.clientX}px`;
    tooltip.style.top = `${timelineRectangle.top - 30}px`;
    tooltip.style.display = 'block';
});

timeline.addEventListener('mouseleave', () => {
    tooltip.style.display = 'none';
});

timeline.addEventListener('click', (e) => {

    if (!newsArticles) {
        console.warn('Data not loaded yet.');
        return;
    };

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

    const dateAtMousePointerMouseclickEvent = `${year}/${month}/${day}`;

    // articles.innerText = dateAtMousePointerMouseclickEvent;
    articles.style.height = '50px';

    const matchingItem = newsArticles.find(item => item.date === dateAtMousePointerMouseclickEvent);
    if (matchingItem) {
        articles.innerText = matchingItem.title;
    } else {
        articles.innerText = 'No relevant articles were found for this day.';
    }
});