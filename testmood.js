$(function(){
  
  // if things don't work, go to console and do localStorage.clear() to clear previous codepen localstorage
  
  var feels = {
    'mood'  : 0,
  };
  
  var color = {};
  
  $('section').each(function(){
    var section = $(this).attr('class');
    var i;
    color[section] = {};
    $(this).children('a').each(function(index){
      i = index + 1;
      color[section][i] = $(this).css('background-color');
    });
    
    $('p.info').append('<span class="' + section + '">' + section + ' <span class="color" style="background-color:#555;"></span> </span>');
    
  });
  
  

  function refresh() {
    if (window.localStorage) {
        if (window.localStorage.length) {
           for (var i = 0; i < window.localStorage.length; i++) {
               if ( /^tracker/.test(window.localStorage.key(i))) {
                 var local = $.parseJSON(window.localStorage.getItem(window.localStorage.key(i)));

                 console.log(window.localStorage.getItem(window.localStorage.key(i)));

                 
                 var mood = local['feels']['mood'];  
                

                 var process = '<span class="entry"><span class="date">' +
                               date.getHours() + ':' + minutes + '&nbsp;&nbsp;&nbsp;&nbsp;' + (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear() +
                               '</span>pain ' + pain + ' <span class="color" style="background-color:' + color['pain'][pain] + '"></span>' +
                               'mood ' + mood + '<img src="' + emoji[mood] + '"> <span class="color" style="background-color:' + color['mood'][mood] + '"></span>' +
                               'energy ' + energy + ' <span class="color" style="background-color:' + color['energy'][energy] + '"></span>' +
                               'fog ' + fog + ' <span class="color" style="background-color:' + color['fog'][fog] + '"></span>' +
                               '<span class="notes">' + local['notes'] + '</span></span>';

                 $('article').prepend(process);
               }
           }
        } else {
           // 
        }
    }
    
    console.log(JSON.stringify(color));
    
  }
  
  refresh();
  
  
  $('section a').click(function(){
    var section = $(this).parent('section').attr('class');
    if ($(this).hasClass('clicked')) {
      $(this).removeClass('clicked');
      feels[section] = 0;
      $('p.info').children('.' + section).children('.color').css('background-color','#555');
    } else {
      $(this).addClass('clicked');
      $(this).siblings('a').removeClass('clicked');
      feels[section] = $(this).text();
      $('p.info').children('.' + section).children('.color').css('background-color',color[section][$(this).text()]);
    }
  });
  
   
  $('a.submit').click(function(){
    if (feels['pain'] == 0 || feels['mood'] == 0 || feels['energy'] == 0 || feels['fog'] == 0) {
      $('.alert').show();
      event.preventDefault();
    } else {
      var timestamp = Date.now();
      var note = $('input.note').val();
      var data = {
        'feels':feels,
        'notes':note,
        'time': timestamp
      };

      localStorage.setItem('tracker-'+timestamp, JSON.stringify(data));
      $('article').html('');
      refresh();
      event.preventDefault();
    }
  });
  
  $('.alert a.button').click(function(){
    $('.alert').hide();
    event.preventDefault();
  });
  
  
});