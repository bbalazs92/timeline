fetch('./news_articles.json')
    .then(res => res.json())
    .then(dataArray => {
        console.log(`Loaded ${dataArray.length} objects.`);
        dataArray.forEach(person => {
            console.log(person.name, person.age);
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

    //tooltip text and postion
    tooltip.innerText = `${year}/${month}/${day}`;
    tooltip.style.left = `${e.clientX}px`;
    tooltip.style.top = `${timelineRectangle.top - 30}px`;
    tooltip.style.display = 'block';
});

timeline.addEventListener('mouseleave', () => {
    tooltip.style.display = 'none';
});

timeline.addEventListener('click', (e) => {

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

    articles.innerText = `${year}/${month}/${day}`;
    articles.style.height = '50px';
});