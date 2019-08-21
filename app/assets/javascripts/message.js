$(document).on('turbolinks:load', function() {

  function buildMessage(message){
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="message">
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
                        ${message.content}
                        ${img}
                      </p>
                    </div>
                </div>`
    return html;
  }

  function buildMessageHTML(message) {
      // var img = message.image ? `<img src= ${ message.image }>` : "";
    if (message.content && message.image.url) {
      //data-idが反映されるようにしている
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
            ${message.content} 
          </p>
          <img src=${message.image.url} class="lower-message__image" >
        </div>
      </div>`
    } else if (message.content) {
      //同様に、data-idが反映されるようにしている
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
            ${message.content} 
          </p>
        </div>
      </div>`
    } else if (message.image.url) {
      //同様に、data-idが反映されるようにしている
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
          <img src=${message.image.url} class="lower-message__image" >
        </div>
      </div>`
    };
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
      var html = buildMessage(message);
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
        type: "get",
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
                $("form")[0].reset();
                $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, "fast");
            }
            else{
            }
        })
      .fail(function(){
      });
  };
  setInterval(reloadMessages, 5000);

});



