let timeout;

async function searchWord() {
    const input = document.getElementById('search-input').value.trim();
    const resultDiv = document.getElementById('result');
    const loader = document.getElementById('loader');
    const errorMessage = document.getElementById('error-message');
    const wordElem = document.getElementById('word');
    const partOfSpeechElem = document.getElementById('part-of-speech');
    const definitionElem = document.getElementById('definition');
    const exampleElem = document.getElementById('example');

    // Clear previous results
    resultDiv.style.display = 'none';
    errorMessage.style.display = 'none';

    if (!input) return; // If input is empty, do nothing

    loader.style.display = 'block'; // Show loader

    try {
        const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${input}`;
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Word not found");

        const data = await response.json();
        const wordData = data[0];

        // Display results
        wordElem.textContent = wordData.word;
        partOfSpeechElem.textContent = wordData.meanings[0].partOfSpeech;
        definitionElem.textContent = wordData.meanings[0].definitions[0].definition;
        exampleElem.textContent = wordData.meanings[0].definitions[0].example || "No example available.";

        loader.style.display = 'none'; // Hide loader
        resultDiv.style.display = 'block'; // Show result section
    } catch (error) {
        loader.style.display = 'none'; // Hide loader
        errorMessage.style.display = 'block'; // Show error message
    }
}

// Debounce function to delay the search
function debounceSearch() {
    clearTimeout(timeout);
    timeout = setTimeout(searchWord, 500);
}
