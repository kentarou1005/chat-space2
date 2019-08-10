$(function(){
  function buildMessage(message){
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="message">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.date}
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
      alert('error');
    });
    return false;
  });
});



