(function () {
  var originalTitle = document.title;
  var leaveTitle = '(つ﹏⊂) 别走啊~';
  var backTitle = '(≧▽≦) 欢迎回来！';
  var timer = null;

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      document.title = leaveTitle;
      clearTimeout(timer);
    } else {
      document.title = backTitle;
      timer = setTimeout(function () {
        document.title = originalTitle;
      }, 2000);
    }
  });
})();
