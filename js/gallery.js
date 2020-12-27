function Gallery(gallery) {
  if(!gallery) {
    throw new Error('No gallery found')
  }
  //console.log(gallery) sdfdsf
  //select DOM elements  
  const images = Array.from(gallery.querySelectorAll('img'))
  const modal = document.querySelector('.modal')
  const prevButton = modal.querySelector('.prev')
  const nextButton = modal.querySelector('.next')
  let currentImage

  function openModal() {
    console.info('opening modal')
    // 1st check if modal is already open
    if (modal.matches('.open')) {
      console.info('Modal alrd open')
      return // stop funct from running
    }
    modal.classList.add('open')
    // Event listeners to be bound when we open modal 
    window.addEventListener('keyup', handleKeyUp)
    nextButton.addEventListener('click', showNextImage)    
    prevButton.addEventListener('click', showPrevImage)    
  }
  
  function closeModal() {
    modal.classList.remove('open')
    // TODO: add event listeners for clicks and keyboard
    window.removeEventListener('keyup', handleKeyUp)
    nextButton.removeEventListener('click', showNextImage)
    prevButton.removeEventListener('click', showPrevImage)
  }

  function handleKeyUp(event) {
    if (event.key === 'Escape') return closeModal()
    if (event.key === 'ArrowRight') return showNextImage()
    if (event.key === 'ArrowLeft') return showPrevImage()
  }

  function handleClickOutside(e) {
    if(e.target === e.currentTarget) {
      closeModal()
    }
  }

  function showNextImage(e) {
    showImage(currentImage.nextElementSibling || gallery.firstElementChild)
  }

  function showPrevImage(e) {
    showImage(currentImage.previousElementSibling || gallery.lastElementChild)
  }

  function showImage(el) {
    if(!el) {
      console.info('No image to show')
      return
    }
    // update modal with this info
    console.log(el)
    modal.querySelector('img').src = el.src
    modal.querySelector('h2').textContent = el.title
    modal.querySelector('figure p').textContent = el.dataset.description
    currentImage = el
    openModal()
  }

  //THese are event listeners
  images.forEach(image => image.addEventListener('click', (e) =>
      showImage(e.currentTarget)
      )
    )
  // loop over each image & attach evnt listener
  images.forEach(image => image.addEventListener('keyup', e=> {
  // when that is keyup'd, check if it was enter
    if (e.key === 'Enter') {
      // if it was, show that image
      showImage(e.currentTarget)
    }
  }))
  modal.addEventListener('click', handleClickOutside)

}

// use it on the page
const gallery1 = Gallery(document.querySelector('.gallery1'))  
const gallery2 = Gallery(document.querySelector('.gallery2'))  