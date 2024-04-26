const Tesseract = require('tesseract.js');

// Step 1: OCR Reading
Tesseract.recognize(
    'id_card_image.jpg',
    'eng',
    { logger: m => console.log(m) }
).then(({ data: { text } }) => {
    // Step 2: Regular Expression Parsing
    const idCardData = {};
    const nameMatch = /Name: (.+)/.exec(text);
    if (nameMatch) {
        idCardData.name = nameMatch[1];
    }
    const idMatch = /ID: (\d+)/.exec(text);
    if (idMatch) {
        idCardData.id = idMatch[1];
    }
    const dobMatch = /Date of Birth: (\d{2}\/\d{2}\/\d{4})/.exec(text);
    if (dobMatch) {
        idCardData.dateOfBirth = dobMatch[1];
    }

    // Step 3: Structured Data Creation
    console.log(idCardData);
}).catch(error => {
    console.error('Error:', error);
});
