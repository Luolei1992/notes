import $ from 'jquery';

(function ($) {
  var opt;
  $.fn.jqprint = function (options) {
    opt = $.extend({}, $.fn.jqprint.defaults, options);
    var $element = (this instanceof $) ? this : $(this);
    if (opt.operaSupport && $.browser.opera) {
      var tab = window.open("", "jqPrint-preview");
      tab.document.open();
      var doc = tab.document;
    }else {
      var $iframe = $("<iframe  />");
      if (!opt.debug) { $iframe.css({ position: "absolute", width: "0px", height: "0px", left: "-300px", top: "-300px" }); }
      $iframe.appendTo("body");
      var doc = $iframe[0].contentWindow.document;
    }

    if (opt.importCSS) {
      doc.write('<!DOCTYPE html>');

      $("style").each(function () {//获取内联样式放到iframe中
        doc.write('<style type="text/css" rel="stylesheet" media="print" >' + $(this)[0].textContent + '</style>');
      });

      if ($("link[media=print]").length > 0) {//外联样式获取
        $("link[media=print]").each(function () {
          doc.write("<link type='text/css' rel='stylesheet' href='" + $(this).attr("href") + "' media='print' />");
        });
      }
      else {
        $("link").each(function () {
          doc.write("<link type='text/css' rel='stylesheet' href='" + $(this).attr("href") + "' />");
        });
      }
    }

    var canvasLis = $(this).find('canvas');//页面有canvas需要转换为图片
    if (!canvasLis) {
      return
    } else {
      $("img").remove('.canvasImg')//删除已添加的图片避免多张图片重叠
      for (var k = 0; k < canvasLis.length; k++) {
        var canvasSrc = canvasLis[k].toDataURL();
        let canvasImg = "<img class='canvasImg' src='" + canvasSrc + "'>"
        $(canvasLis[k]).parent().append(canvasImg)
      }
    }

    if (opt.printContainer) { doc.write($element.outer()); }
    else { $element.each(function () { doc.write($(this).html()); }); }

    doc.close();

    (opt.operaSupport && $.browser.opera ? tab : $iframe[0].contentWindow).focus();
    setTimeout(function () { (opt.operaSupport && $.browser.opera ? tab : $iframe[0].contentWindow).print(); if (tab) { tab.close(); } }, 500);
  }

  $.fn.jqprint.defaults = {
    debug: false,
    importCSS: true,
    printContainer: true,
    operaSupport: true
  };

  $.fn.outer = function () {
    return $($('<div></div>').html(this.clone())).html();
  }
})($);