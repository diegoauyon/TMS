function show_messages ( msg ) {
  $( "#log_container" ).slideUp( 'slow', function () {
    document.getElementById( "log" ).innerHTML = msg;
    $( "#log_container" ).slideDown( 'slow', function () {
    } );
  } );
}

function load_code ( code ) {
  if ( code.length >= 10 ) {
    myCodeMirror.setValue( code );
  }
  else {
    myCodeMirror.setValue( '//LOAD AN EXAMPLE TO TRY\n' +
                           '//then load an input and click play\n\n' +
                           '//Syntax:\n\n' +
                           '//-------CONFIGURATION\n' +
                           'name: [name_of_machine]\n' +
                           'init: [initial_state]\n' +
                           'accept: [accept_state_1],... ,[accept_state_n]\n\n' +
                           '//-------DELTA FUNCTION:\n' +
                           '[current_state],[read_symbol]\n' +
                           '[new_state],[write_symbol],[>|<|-]\n\n' +
                           '// l = left\n' +
                           '// r = right\n' +
                           '// - = hold\n' +
                           '// use underscore for blank cells\n\n' +
                           '//States and symbols are case-sensitive\n\n' +
                           '//Load your code and click COMPILE.\n' +
                           '//or load an example (top-right).\n' );
  }
}