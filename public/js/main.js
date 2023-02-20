window.addEventListener('load', () => {
    const updateButtons = document.querySelectorAll(".update-rent-btn");
    // console.log('entro')
    updateButtons.forEach(button => {
        const { idrent, action, renter } = button.dataset;
        const url = `http://localhost:3000/rent/${idrent}?newStatus=${action}`

        button.addEventListener('click', () => {
            // if (idrent === "Requested") {
            // update-rent-btn.classList.add("hidden") 
            // }
            axios.patch(url)
                .then(res => {
                    const menuActions = button.parentNode;
                    const card = menuActions.parentNode;
                    Array.from(menuActions.children).forEach(elem => elem.remove());
                
                    if (action === 'Rented') {
                        const ratingBtn = document.createElement('button');
                        ratingBtn.innerText = 'Rate this'
                        ratingBtn.classList.add('btn','btn-primary')
                        ratingBtn.setAttribute('href', 'http://google.com')
                        menuActions.append(ratingBtn);
                        const feedback = card.querySelector('.pending-game')
                        feedback.classList.remove('pending-game')
                        feedback.classList.add('rented-game')
                        feedback.innerText = `Rented to ${renter}`
                    } else if (action === 'Free') {
                        
                    }
                })
                .catch(err => {
                    console.error(err);
                })
        })
         
    })
})
  

