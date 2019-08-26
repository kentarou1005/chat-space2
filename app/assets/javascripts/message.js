$(document).on('turbolinks:load', function() {

  function buildMessageHTML(message) {

    var content = message.content ? `${message.content}`  : "";
    var image = message.image ? `<img src= ${message.image} class= "lower-message__image"> ` : "";

    var html = 
        `<div class="message" data-id= ${message.id} > 
        <div class="upper-message">
          <div class="upper-message__user-name">
            ${message.user_name} 
          </div>
          <div class="upper-message__date">
            ${message.created_at} 
          </div>
        </div> 
        <div class="lower-message">
          <p class="lower-message__content">
            ${content} 
          </p>
            ${image}  
      </div>`
      
    return html;
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })

    .done(function(message){
      var html = buildMessageHTML(message);
      $(".messages").append(html);
      $("form")[0].reset();
      $(".messages").animate({scrollTop: $(".message").last().offset().top + $('.messages').scrollTop()}, 500, "swing");
    })
    .fail(function(){
      alert('error2');
    });
    return false;
  });

  var reloadMessages = function(){
      var last_message_id = $('.message:last').data('id')
      $.ajax({
        url: "api/messages",
        type: "GET",
        dataType: "json",
        data: {id: last_message_id}
      })
      .done(function(messages){
        if (messages.length > 0){
              var insertHTML = '';
              messages.forEach(function (message) {
                insertHTML = buildMessageHTML(message); 
                $('.messages').append(insertHTML);
                    });
                $(".form__submit")[0].reset();
                $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, "fast");
            }
            else{
            }
        })
      .fail(function(){
      });
      return false;
    };
  setInterval(reloadMessages, 3000);

});



