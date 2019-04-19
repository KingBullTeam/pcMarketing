$(function () {
  $('.tabbtn>li').on('mouseenter', function () {
    var index = $(this).index();
    $(this).addClass('active').siblings().removeClass('active');
    $('.ulcont>li').eq(index).addClass('active').siblings().removeClass(
      'active');
  });
  
  $('.bigSameBtn').off('click').on('click', function () {
    $('.fixbox').show().find('.upcode').show();
  });

  $('.upcode .close').off('click').on('click', function () {
    $('.fixbox .upcode').hide();
    $('.againcode').show();
  });

  $('.againcode .close').off('click').on('click', function () {
    $('.fixbox').hide().find('.againcode').hide();
  });

  $(window).scroll(function (e) {
    var windH = $(window).height() / 2;
    var scrollTopH = $(window).scrollTop()
    // console.log()
    if (scrollTopH >= windH) {
      $('.rigcode').show()
    } else {
      $('.rigcode').hide()
    }
  })
});
