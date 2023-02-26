window.addEventListener('load', () => {
    const updateButtons = document.querySelectorAll(".update-rent-btn");
    const favoriteBtns = document.querySelectorAll('.favoriteBtn')



    favoriteBtns.forEach(favoriteBtn => {

        const gameId = favoriteBtn.value;
        const iconNode = favoriteBtn.querySelector('.bi')
    
        favoriteBtn.onclick = () => {
          axios.post(`/rent/${gameId}/favorites`)
            .then((response) => {
              if (response.status === 201) {
                iconNode.classList.remove('bi-heart');
                iconNode.classList.add('bi-heart-fill');
              } else if (response.status === 204) {
                iconNode.classList.add('bi-heart');
                iconNode.classList.remove('bi-heart-fill');
              }
            })
            .catch((err) => {
              console.error(err)
            })
        }
      })
  
    

 
    updateButtons.forEach(button => {
        const { idrent, action, renter } = button.dataset;
        const url = `http://localhost:3000/rent/${idrent}?newStatus=${action}`

        button.addEventListener('click', () => {
            axios.patch(url)
                .then(res => {
                    const menuActions = button.parentNode;
                    const card = menuActions.parentNode;
                    Array.from(menuActions.children).forEach(elem => elem.remove());
                
                    if (action === 'Rented') {
                        const feedback = card.querySelector('.pending-game')
                        feedback.classList.remove('pending-game')
                        feedback.classList.add('rented-game')
                        feedback.innerText = `Rented to ${renter}`
                    } else if (action === 'Free') {
                        card.remove()
                        
                    }
                })
                .catch(err => {
                    console.error(err);
                })
        })
         
    })

  })

