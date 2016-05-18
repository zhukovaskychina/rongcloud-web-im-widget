/// <reference path="../../lib/window.d.ts"/>
module RongIMWidget.conversationlist {

    class rongConversationList {

        restrict: string = "E";
        templateUrl: string = "./src/ts/conversationlist/conversationList.tpl.html";
        controller: string = "conversationListController";

        static instance() {
            return new rongConversationList;
        }

        link(scope: any, ele: angular.IRootElementService) {
            if (window["jQuery"] && window["jQuery"].nicescroll) {
                $(ele).find(".rongcloud-content").niceScroll({
                    'cursorcolor': "#0099ff",
                    'cursoropacitymax': 1,
                    'touchbehavior': false,
                    'cursorwidth': "8px",
                    'cursorborder': "0",
                    'cursorborderradius': "5px"
                });
            }
        }
    }


    class conversationItem implements ng.IDirective {
        static $inject: string[] = ["conversationServer",
            "conversationListServer",
            "RongIMSDKServer"];

        constructor(private conversationServer: RongIMWidget.conversation.IConversationService,
            private conversationListServer: RongIMWidget.conversationlist.IConversationListServer,
            private RongIMSDKServer: RongIMWidget.RongIMSDKServer) {

        }

        restrict: string = "E";
        scope: any = { item: "=" };
        template: string = '<div class="rongcloud-chatList">' +
        '<div class="rongcloud-chat_item " ng-class="{\'online\':item.onLine}">' +
        '<div class="rongcloud-ext">' +
        '<p class="rongcloud-attr clearfix">' +
        '<span class="rongcloud-badge" ng-show="item.unreadMessageCount>0">{{item.unreadMessageCount>99?"99+":item.unreadMessageCount}}</span>' +
        '<i class="rongcloud-sprite rongcloud-no-remind" ng-click="remove($event)"></i>' +
        '</p>' +
        '</div>' +
        '<div class="rongcloud-photo">' +
        '<img class="rongcloud-img" ng-src="{{item.portraitUri}}" err-src="http://7xo1cb.com1.z0.glb.clouddn.com/rongcloudkefu2.png" alt="">' +
        '<i ng-show="!!$parent.data.getOnlineStatus" class="rongcloud-Presence rongcloud-Presence--stacked rongcloud-Presence--mainBox"></i>' +
        '</div>' +
        '<div class="rongcloud-info">' +
        '<h3 class="rongcloud-nickname">' +
        '<span class="rongcloud-nickname_text" title="{{item.title}}">{{item.title}}</span>' +
        '</h3>' +
        '</div>' +
        '</div>' +
        '</div>';
        link(scope, ele, attr) {
            var that = this;
            ele.on("click", function() {
                that.conversationServer
                    .ChangeConversation(new RongIMWidget.Conversation(
                        scope.item.targetType,
                        scope.item.targetId,
                        scope.item.title));
                if (scope.item.unreadMessageCount > 0) {
                    that.RongIMSDKServer.clearUnreadCount(scope.item.targetType, scope.item.targetId)
                    that.RongIMSDKServer.sendReadReceiptMessage(scope.item.targetId, Number(scope.item.targetType));
                    that.conversationListServer.updateConversations();
                }
            });

            scope.remove = function(e) {
                e.stopPropagation();

                that.RongIMSDKServer.removeConversation(scope.item.targetType, scope.item.targetId).then(function() {
                    if (that.conversationServer.current.targetType == scope.item.targetType
                        && that.conversationServer.current.targetId == scope.item.targetId) {
                        // conversationServer.onConversationChangged(new RongIMWidget.Conversation());
                    }
                    that.conversationListServer.updateConversations();
                }, function(error) {
                    console.log(error);
                })
            }
        }
    }


    angular.module("RongWebIMWidget.conversationlist")
        .directive("rongConversationList", rongConversationList.instance)
        .directive("conversationItem",
        RongIMWidget.DirectiveFactory.GetFactoryFor(conversationItem));

}
