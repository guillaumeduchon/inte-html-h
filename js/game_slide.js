// SLIDE PLATEAU
Flickity.createMethods.push('_createPrevNextCells');

Flickity.prototype._createPrevNextCells = function() {
  this.on( 'select', this.setPrevNextCells );
};

Flickity.prototype.setPrevNextCells = function() {
  // remove classes
  changeSlideClasses( this.previousSlide, 'remove', 'is-previous' );
  changeSlideClasses( this.nextSlide, 'remove', 'is-next' );
  // set slides
  this.previousSlide = this.slides[ this.selectedIndex - 1 ];
  this.nextSlide = this.slides[ this.selectedIndex + 1 ];
  // add classes
  changeSlideClasses( this.previousSlide, 'add', 'is-previous' );
  changeSlideClasses( this.nextSlide, 'add', 'is-next' );
};

function changeSlideClasses( slide, method, className ) {
  if ( !slide ) {
    return;
  }
  slide.getCellElements().forEach( function( cellElem ) {
    cellElem.classList[ method ]( className );
  });
}