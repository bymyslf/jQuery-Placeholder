;(function ($, un) {
    'use strict';
    
    var placeholderHelper = {
        placeholderSupport : "placeholder" in document.createElement("input"),
        focusHandler : function (ev) {
            var target = $(this),
                placeholder = target.attr("placeholder");

            if (this.value == placeholder) {
                this.value = "";
                target.removeClass("placeholder");
            }
        },
        passwordFocusHandler : function () {
            var that = $(this), 
                target =  that.prev();
                
            if (target[0].value === "") {
                that.hide();
                target.show().focus();
            }
        },
        blurHandler : function (ev) {
            var target = $(this),
                placeholder = target.attr("placeholder");

            if (this.value === "" || this.value == placeholder) {
                target.addClass("placeholder");
                this.value = placeholder;
            }
        },
        passwordBlurHandler : function () {
            if (this.value === "") {
                $(this).hide().next().show();
            }
        },
        preventPlaceholderSubmit : function () {
            $(this).find(".placeholder").each(function () {
                if (this.type === "password") {
                    $(this).next().remove();
                }

                if (this.value === "" || this.value == target.attr("placeholder")) {
                    this.value = "";
                }
            });
        },
        handlePasswordInput : function (input) {
            input.on("blur.placeholder", placeholderHelper.passwordBlurHandler);

            input.clone().attr("type", "text")
                .removeAttr("id")
                .removeAttr("name")
                .removeAttr("class")
                .val(input.attr("placeholder"))
                .addClass("placeholder clone")
                .insertAfter(input)
                .on("focus.placeholder", placeholderHelper.passwordFocusHandler);

            input.hide();
        }
    };

    $.fn.placeholder = function (options) {  
        if (placeholderHelper.placeholderSupport) {
            return this;
        }
        
        $(document).on("submit.placeholder", "form", placeholderHelper.preventPlaceholderSubmit); 

        return this.each(function () {
            var that = $(this);

            if (this.value !== "" || this.type === "hidden") {
                return;
            }

            if (this.type === "password") {
                placeholderHelper.handlePasswordInput(that);
            } else {
                that.on({
                    "focus.placeholder": placeholderHelper.focusHandler,
                    "blur.placeholder": placeholderHelper.blurHandler
                });    
            }
            
            that.triggerHandler("blur.placeholder");
        });
    };
})(jQuery, undefined);