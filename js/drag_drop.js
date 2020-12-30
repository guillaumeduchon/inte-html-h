// DRAG DROP
function dragStart( event, chosenClass ) {
    // console.log("DRAG START");
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData( 'text', event.target.id );
    event.target.classList.add( "answer_button--active" );
  }
  
  function dragOver( event ) {
    // console.log( 'DRAG OVER' );
    event.preventDefault();
    event.dataTransfer.effectAllowed = 'move';
    event.target.closest( ".dz" ).classList.add( "dz--active" );
  }
  
  function dragLeave( event ) {
    // console.log( "DRAG LEAVE" );
    event.target.classList.remove( "dz--active" );
  }
  
  function dragDrop( event ) {
    // console.log( 'DROP' );
  
    event.target.closest( ".dz" ).append( document.getElementById( event.dataTransfer.getData( 'text' ) ) )
  
    document.getElementsByClassName( "answer_button--active" )[0].classList.remove( "answer_button--active" );
  
    if ( document.getElementsByClassName( "dz--active" )[0] ) {
      document.getElementsByClassName( "dz--active" )[0].classList.remove("dz--active" );
    }
  
    event.preventDefault();
  
  }
  
  function dragEnd( event ) {
  
    // event.preventDefault();
  
    console.log( 'DRAG END' );
    
    // remove applied active classes, regardless of where released.
    if ( document.getElementsByClassName( "answer_button--active" )[0] ) {
      document.getElementsByClassName( "answer_button--active" )[0].classList.remove( "answer_button--active" );
    }
    if ( document.getElementsByClassName( "dz--active" )[0] ) {
      document.getElementsByClassName( "dz--active" )[0].classList.remove( "dz--active" );
    }
  
  }
  
  // dragenter listener
  function dragEnter( event ) {
       event.preventDefault();
  }