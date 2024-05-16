const uploadForm = document.getElementById('uploadForm');

uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get the file input element
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0]; // Get the first file selected by the user

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('file', file);

    // Get the password input value
    const passwordInput = document.getElementById('passwordInput');
    const password = passwordInput.value;

    // Append password to the FormData object
    formData.append('password', password);
    console.log('FormData:', formData);

    try {
        const res = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        if (res.ok) {
            // File uploaded successfully
            console.log('File uploaded successfully');
            // You can handle further actions here, such as showing a success message to the user
        } else {
            // Handle non-OK response (e.g., display error message)
            console.error('Error uploading file:', res.statusText);
            // You can handle further error handling here, such as displaying an error message to the user
        }
    } catch (err) {
        // Handle fetch error
        console.error('Error uploading file:', err);
        // You can handle further error handling here, such as displaying an error message to the user
    }
});
