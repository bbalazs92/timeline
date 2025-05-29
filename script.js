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
    const dayIndex    = Math.floor((x / timelineWidth) * daysInYear);       // calculate cursor position 0 - 364
    const currentDate = new Date(startDate);                                
    currentDate.setDate(currentDate.getDate() + dayIndex);                  // setDate() changes value in place

    //format date
    const year  = String(currentDate.getFullYear()).slice(-2);              // last 2 digits of the year
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');      // months are 0 indexed
    const day   = String(currentDate.getDate()).padStart(2, '0');
});