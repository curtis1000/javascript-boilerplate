var APP = APP || {};

(function (APP) {
    'use strict';

    APP.RegistrationFormModel = {

        /**
         * initialize this model
         */
        init: function () {
            this.errorMsgAttribute = 'data-validation-error-msg';
            this.createChildren();
        },

        /**
         * Create any child objects or references to DOM elements
         * Should only be run on initialization of the view
         */
        createChildren: function() {
            this.$form = $('.js-registration-form');
            this.$valueRequired = this.$form.find('.js-validation-value-required');
            this.$emailAddress = this.$form.find('.js-validation-email-address');
            return this;
        },

        /**
         * Validator, checks for validation errors, sets validation error messages in the dom
         * @returns {boolean}
         */
        isValid: function() {

            var isValid = true;

            // delete any previous error message data
            this.$form.find('[' + this.errorMsgAttribute + ']').removeAttr(this.errorMsgAttribute);

            // check all 'value required' fields
            this.$valueRequired.each(function(index, element) {

                var $element = $(element);

                if ($element.val() === '') {
                    //try to get the label
                    var label = $('label[for="' + $element.attr('id') + '"]').html();
                    // set the error message
                    $element.attr(this.errorMsgAttribute, this.validationErrorMessages.valueRequired(label));
                    // form is not valid
                    isValid = false;
                }
            }.bind(this));

            // check all 'email address' fields
            this.$emailAddress.each(function(index, element) {

                var $element = $(element);

                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                if (! re.test($element.val())) {
                    //try to get the label
                    var label = $('label[for="' + $element.attr('id') + '"]').html();
                    // set the error message
                    $element.attr(this.errorMsgAttribute, this.validationErrorMessages.invalid(label));
                    // form is not valid
                    isValid = false;
                }
            }.bind(this));

            return isValid;
        },

        validationErrorMessages: {
            valueRequired: function(label) {
                var msg;

                if (typeof label === 'undefined') {
                    msg = 'Field cannot be blank.';
                } else {
                    msg = label + ' cannot be blank';
                }
                return msg;
            },
            invalid: function(label) {
                var msg;

                if (typeof label === 'undefined') {
                    msg = 'Field is invalid.';
                } else {
                    msg = label + ' is invalid.';
                }
                return msg;
            }
        }
    };

}(APP));