const timeline = document.getElementById('timeline');
const tooltip = document.getElementById('tooltip');

const startDate = new Date('2025-01-01');                                   //rewrite to use temporal!!

const daysInYear = 365;

timeline.addEventListener('mousemove', (e) => {
    //mouse position calculation
    const timelineRectangle = timeline.getBoundingClientRect();             // getBoundingClientRect() returns a DOMRect object 
    const mouseXPosition = e.clientX - timelineRectangle.left;              // mouse X position relative to timeline
    const timelineWidth = timelineRectangle.width;
});