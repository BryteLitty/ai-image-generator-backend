const form = document.getElementById("input-form");
const prompt = document.querySelector('.prompt');
const size = document.querySelector('.size');
const displayImage = document.querySelector('.dipslay-img')
const spinner = document.querySelector('.spinner')


form.addEventListener('submit', e => {
    e.preventDefault();

    showSpinner()
    document.querySelector('.msg').textContent = ""
    displayImage.src = ""


    if (prompt.value === '') {
        alert('Please add a text')
        return;
    }
    console.log(spinner.classList)
    
    generateImageRequest(prompt.value, size.value)
});

// function to generate image
const generateImageRequest = async (prompt, size) => {
    try {
        // showSpinner();
        const response = await fetch('/openai/generateimage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                prompt,
                size
            })
        })

        if(!response.ok) {
            removeSpinner();
            throw new Error('Image could not be generated')
        }

        const data = await response.json()
        removeSpinner()
        displayImage.src = data.data
        console.log(data)

    } catch (error) {
        document.querySelector('.msg').textContent = error
    }
}

// function to show spinner
const showSpinner = () => {
    spinner.classList.add('show')
}

// function to remove spinner
const removeSpinner = () => {
    spinner.classList.remove('show')
}

