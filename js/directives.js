'use strict';

/* Directives */


angular.module('myApp.directives', [])
    .directive('dragresize',function() {
        return function(scope, elm, attrs) {

            elm.draggable({ containment: "parent",disabled:false,drag: scope.onDrag});
            elm.resizable({ containment: "parent",disabled:false,resize:scope.onResize});
            scope.$watch('dragResize',function(n){
                if(n)
                {
                    elm.draggable('option','disabled',false);
                    elm.resizable('option','disabled',false);
                    elm.css({"disabled":false});
                }
                else
                {
                    elm.draggable('option','disabled',true);
                    elm.resizable('option','disabled',true);
                    elm.css({"disabled":true});
                }
            });
        };
    })
    .directive('drag',function() {
        return function(scope, elm, attrs) {
            elm.draggable({ containment: attrs.drag});
            elm.css({zIndex:2000});
        };
    })
    .directive('maketab',function() {
        return function(scope, elm, attrs) {
            elm.tabs({
                show: function(event, ui) {

                    //https://github.com/marijnh/CodeMirror2/issues/71
                    scope.$broadcast("tabChanged",ui);
                }
            });
        };
    })
    .directive('floater',function() {
        return function(scope, elm, attrs) {
            elm.dialog({
                width: attrs.dialogwidth,
                resizable : attrs.resizable,
                title : attrs.dialogtitle,
                position : [parseInt(attrs.posx,10),parseInt(attrs.posy,10)]
            });
        };
    })
    .directive('makeaccordion',function() {
        return function(scope, elm, attrs) {
            elm.accordion({
                fillSpace: true,
                navigation: true
            });
        };
    })
    .directive('codemirror',function() {
        return function(scope, elm, attrs) {
            scope.cm = CodeMirror.fromTextArea(elm.get(0), {mode: 'text/html',
                lineNumbers: true,
                wordWrap:true});
        };
    })
    .directive('dialog', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: { title: 'bind' },
            link: function(scope, element, attrs) {
                element.css({width: attrs.width,height:"auto",left:parseInt(attrs.left,10),top:parseInt(attrs.top,10)});
                element.draggable({ containment: "window",disabled:false});
                if(attrs.resize == true)
                {
                    element.resizable({ containment: "window",disabled:false});
                }
            },
            templateUrl:'directive/dialog.html',
            replace: true
        };
    })