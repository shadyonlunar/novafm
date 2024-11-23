const loadFileButton = document.getElementById('loadFile');
const saveFileButton = document.getElementById('saveFile');
const editor = document.getElementById('editor');

let fileHandle;

// Load a file from the local system
loadFileButton.addEventListener('click', async () => {
    try {
        [fileHandle] = await window.showOpenFilePicker();
        const file = await fileHandle.getFile();
        const content = await file.text();
        editor.value = content;
    } catch (err) {
        console.error('Error loading file:', err);
    }
});

// Save the current text to the file
saveFileButton.addEventListener('click', async () => {
    if (!fileHandle) {
        alert('No file loaded!');
        return;
    }

    try {
        const writable = await fileHandle.createWritable();
        await writable.write(editor.value);
        await writable.close();
        alert('File saved successfully!');
    } catch (err) {
        console.error('Error saving file:', err);
    }
});
