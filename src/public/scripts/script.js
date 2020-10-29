const createRowNumbers = () => {
    let rows = 91;

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

blinkingCursor();
createRowNumbers();
