$(function(){function e(e){var t=e.value,n=e.parentNode.getElementsByTagName("output")[0]||e.parentNode.parentNode.getElementsByTagName("output")[0];n[o]=t}var t=$(document),n="[data-rangeslider]",a=$(n),o="textContent"in document?"textContent":"innerText";t.on("input",'input[type="range"], '+n,function(t){e(t.target)}),t.on("click",'#js-example-disabled button[data-behaviour="toggle"]',function(e){var t=$(n,e.target.parentNode);t[0].disabled?t.prop("disabled",!1):t.prop("disabled",!0),t.rangeslider("update")}),t.on("click","#js-example-change-value button",function(e){var t=$(n,e.target.parentNode),a=$('input[type="number"]',e.target.parentNode)[0].value;t.val(a).change()}),t.on("click","#js-example-change-attributes button",function(e){var t=$(n,e.target.parentNode),a={min:$('input[name="min"]',e.target.parentNode)[0].value,max:$('input[name="max"]',e.target.parentNode)[0].value,step:$('input[name="step"]',e.target.parentNode)[0].value};t.attr(a),t.rangeslider("update",!0)}),t.on("click",'#js-example-destroy button[data-behaviour="destroy"]',function(e){$(n,e.target.parentNode).rangeslider("destroy")}).on("click",'#js-example-destroy button[data-behaviour="initialize"]',function(e){$(n,e.target.parentNode).rangeslider({polyfill:!1})}),t.on("click",'#js-example-hidden button[data-behaviour="toggle"]',function(e){var t=$(e.target.previousElementSibling);t.toggle()}),a.rangeslider({polyfill:!1,onInit:function(){e(this.$element[0])},onSlide:function(e,t){},onSlideEnd:function(e,t){}})});