$(document).on('turbolinks:load', function() {
  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">
                    ${user.name}
                  </p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
                </div>`
                $("#user-search-result").append(html);
              }

  function appendMember(name,user_id){
    var html = `<div class='chat-group-user clearfix js-chat-member'>
                  <input name='group[user_ids][]' type='hidden' value=${user_id}>
                  <p class='chat-group-user__name'>${name}
                  </p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
                $(".chat-group-users.js-add-user").append(html);
              }
  
  $("#user-search-field").on("keyup", function(e){
    e.preventDefault();
    var input = $("#user-search-field").val();

    $.ajax({
      url: "/users/search",
      type: "GET",
      data: {keyword: input} ,
      dataType: "json",
    })
    .done(function(users){
      $("#user-search-result").empty();
      if (users.length !== 0){
        users.forEach(function(user){
          $("#user-search-result").append(appendUser(user));
        });
      }
      else {
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    });
  });

  $(function(){
    $(document).on("click", ".user-search-add ", function () {
      var name = $(this).data("userName");
      var user_id = $(this).data("userId");
      $(this).parent().remove();
        $(".chat-group-users.js-add-user").append(appendMember(name, user_id));
      });
    });

    $(function(){
      $(document).on("click", '.user-search-remove', function () {
          $(this).parent().remove();
        });
      });

});