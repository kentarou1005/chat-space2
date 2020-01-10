$(function(){

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

//-----------------------------------------------------------
  // var buildMessageHTML = function(message) {
  //   if (message.content && message.image) {
  //     //data-idが反映されるようにしている
  //     var html = `<div class="message" data-message-id=` + message.id + `>` +
  //       `<div class="upper-message">` +
  //         `<div class="upper-message__user-name">` +
  //           message.user_name +
  //         `</div>` +
  //         `<div class="upper-message__date">` +
  //           message.created_at +
  //         `</div>` +
  //       `</div>` +
  //       `<div class="lower-message">` +
  //         `<p class="lower-message__content">` +
  //           message.content +
  //         `</p>` +
  //         `<img src="` + message.image + `" class="lower-message__image" >` +
  //       `</div>` +
  //     `</div>`
  //   } else if (message.content) {
  //     //同様に、data-idが反映されるようにしている
  //     var html = `<div class="message" data-message-id=` + message.id + `>` +
  //       `<div class="upper-message">` +
  //         `<div class="upper-message__user-name">` +
  //           message.user_name +
  //         `</div>` +
  //         `<div class="upper-message__date">` +
  //           message.created_at +
  //         `</div>` +
  //       `</div>` +
  //       `<div class="lower-message">` +
  //         `<p class="lower-message__content">` +
  //           message.content +
  //         `</p>` +
  //       `</div>` +
  //     `</div>`
  //   } else if (message.image) {
  //     //同様に、data-idが反映されるようにしている
  //     var html = `<div class="message" data-message-id=` + message.id + `>` +
  //       `<div class="upper-message">` +
  //         `<div class="upper-message__user-name">` +
  //           message.user_name +
  //         `</div>` +
  //         `<div class="upper-message__date">` +
  //           message.created_at +
  //         `</div>` +
  //       `</div>` +
  //       `<div class="lower-message">` +
  //         `<img src="` + message.image + `" class="lower-message__image" >` +
  //       `</div>` +
  //     `</div>`
  //   };
  //   return html;
  // };
//-----------------------------------------------------------

  $('.new_message').on('submit', function(e){
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
      console.log(message.content)
      if (message.content !== undefined) { 
        var html = buildMessageHTML(message);
        $(".messages").append(html);
        $("form")[0].reset();
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
        }
      else {
        alert('メッセージを忘れていますよ');
        }
      })
    return false;
  });
});

$(function(){
  var reloadMessages = function(){
     last_message_id = $('.message:last').data('message-id');
     console.log(last_message_id)
      $.ajax({
        url: "views/api/messages",
        type: "GET",
        dataType: "json",
        data: {id: last_message_id}
      })
      .done(function(messages){
        console.log(messages.content)
        if (messages.length !== 0){
          var insertHTML = '';
            messages.forEach(function (message) {
            insertHTML += buildMessageHTML(message); 
            $('.messages').append(insertHTML);
            $("form")[0].reset();
            $(".form__submit").prop("disabled", false);
            console.log("success")
          });
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
          }
        else{
          }
      })
      
      .fail(function(){
        })
      return false;
    };
    // if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    //   setInterval(reloadMessages, 7000);
    //   }
    // else {
    //   console.log("新しい投稿はなし")
    //   }
})
