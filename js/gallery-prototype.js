function Gallery(gallery) {
  if(!gallery) {
    throw new Error('No gallery found')
  }
  this.gallery = gallery

  //console.log(gallery)
  //select DOM elements  
  this.images = Array.from(gallery.querySelectorAll('img'))
  this.modal = document.querySelector('.modal')
  this.prevButton = this.modal.querySelector('.prev')
  this.nextButton = this.modal.querySelector('.next')

  // bind our methods to the instance when we need them
  // bind allows to explicitly supply what this would be equal to
  // because in the counstructor this is equal to the instance, we are creating a new function that is bound
  this.showNextImage = this.showNextImage.bind(this)
  this.showPrevImage = this.showPrevImage.bind(this)
  this.handleKeyUp = this.handleKeyUp.bind(this)
  this.handleClickOutside = this.handleClickOutside.bind(this)


  //THese are event listeners
  this.images.forEach(image => image.addEventListener('click', (e) =>
      this.showImage(e.currentTarget)
      )
    )
  // loop over each image & attach evnt listener
  this.images.forEach(image => image.addEventListener('keyup', e=> {
  // when that is keyup'd, check if it was enter
    if (e.key === 'Enter') {
      // if it was, show that image
      this.showImage(e.currentTarget)
    }
  }))
  this.modal.addEventListener('click', this.handleClickOutside)
}

 Gallery.prototype.openModal = function() {
  console.info('opening modal')
  // 1st check if modal is already open
  if (this.modal.matches('.open')) {
    console.info('Modal alrd open')
    return // stop funct from running
  }
  this.modal.classList.add('open')
  // Event listeners to be bound when we open modal 
  window.addEventListener('keyup', this.handleKeyUp)
  this.nextButton.addEventListener('click', this.showNextImage)    
  this.prevButton.addEventListener('click', this.showPrevImage)    
}


Gallery.prototype.closeModal = function() {
  this.modal.classList.remove('open')
  // TODO: add event listeners for clicks and keyboard
  window.removeEventListener('keyup', this.handleKeyUp)
  this.nextButton.removeEventListener('click', this.showNextImage)
  this.prevButton.removeEventListener('click', this.showPrevImage)
}

Gallery.prototype.handleKeyUp = function(event) {
  if (event.key === 'Escape') return this.closeModal()
  if (event.key === 'ArrowRight') return this.showNextImage()
  if (event.key === 'ArrowLeft') return this.showPrevImage()
}

Gallery.prototype.handleClickOutside = function(e) {
  if(e.target === e.currentTarget) {
    this.closeModal()
  }
}

Gallery.prototype.showNextImage = function(e) {
  this.showImage(this.currentImage.nextElementSibling || this.gallery.firstElementChild)
}

Gallery.prototype.showPrevImage = function(e) {
  this.showImage(this.currentImage.previousElementSibling || this.gallery.lastElementChild)
}

Gallery.prototype.showImage = function(el) {
  if(!el) {
    console.info('No image to show')
    return
  }
  // update modal with this info
  console.log(el)
  this.modal.querySelector('img').src = el.src
  this.modal.querySelector('h2').textContent = el.title
  this.modal.querySelector('figure p').textContent = el.dataset.description
  this.currentImage = el
  this.openModal()
}

// use it on the page
const gallery1 = new Gallery(document.querySelector('.gallery1'))  
const gallery2 = new Gallery(document.querySelector('.gallery2'))  

console.log(gallery1, gallery2)