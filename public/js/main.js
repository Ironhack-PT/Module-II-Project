window.addEventListener('load', () => {
    const updateButtons = document.querySelectorAll(".update-rent-btn");
    console.log('entro')
    updateButtons.forEach(button => {
        const { idrent, action } = button.dataset;
        const url = `http://localhost:3000/rent/${idrent}?newStatus=${action}`

        button.addEventListener('click', () => {

            axios.patch(url)
        })
         

        // const bookContainer = button.parentElement.parentElement.parentElement
    
        // button.addEventListener('click', () => deleteBook(url, bookContainer))
    })
})
  