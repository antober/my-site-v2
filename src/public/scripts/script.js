const createRowNumbers = () => {
    let rows = 22;

    for (let i = 0; i < rows; i++) {
        let number = document.createElement('li');

        number.id = 'number';
        document.getElementById('row-numbers').appendChild(number);
    }
}

const blinkingCursor = () => {
    let cursor = true;
    let cursorElement = document.getElementById('cursor');

    setInterval(() => {
        if (cursor) {
            cursorElement.style.opacity = 0;
            cursor = false;
        } else {
            cursorElement.style.opacity = 1;
            cursor = true;
        }
    }, 500);
}

const getWorkDates = (timeSpan) => {
    if (timeSpan.endDate === 'present') {
        return `${timeSpan.startDate.toDateString()} - ${timeSpan.endDate}`;
    }
    
    return `${timeSpan.startDate.toDateString()} - ${timeSpan.endDate.toDateString()}`;
}

const getWorkPeriods = () => {
    let academicWork = { startDate: new Date(2019, 9, 3), endDate: new Date(2020, 11, 4) };
    let jetshop = { startDate: new Date(2020, 0, 7), endDate: 'present' };

    document.getElementById('workDatesAcademicWork').innerText = getWorkDates(academicWork);
    document.getElementById('workDatesJetshop').innerText = getWorkDates(jetshop);  
}

blinkingCursor();
createRowNumbers();
getWorkPeriods();