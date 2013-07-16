/**
 * @fileOverview RegistrationForm View Module File
 *
 * @author Curtis Branum <curtis.branum@gmail.com>
 * @version 1.0
 */

var APP = APP || {};

(function (APP) {
    'use strict';

    APP.RegistrationForm = {

        /**
         * Initializes the UI Component View
         * Runs a single setupHandlers call, followed by createChildren and layout
         */
        init: function() {
            this.isEnabled = false;
            this.setupHandlers()
                .createChildren()
                .layout()
                .enable();
        },

        /**
         * Binds the scope of any handler functions
         * Should only be run on initialization of the view
         */
        setupHandlers: function() {
            return this;
        },

        /**
         * Create any child objects or references to DOM elements
         * Should only be run on initialization of the view
         */
        createChildren: function() {
            this.$form = $('.registration-form');
            this.$submit = this.$form.find('.submit');
            this.$textInput = this.$form.find('[type="text"]');
            this.$valueRequired = this.$form.find('.js-validation-value-required');
            this.$emailAddress = this.$form.find('.js-validation-email-address');
            return this;
        },

        /**
         * Performs measurements and applys any positiong style logic
         * Should be run anytime the parent layout changes
         */
        layout: function() {
            return this;
        },

        /**
         * Enables the view
         * Performs any event binding to handlers
         * Exits early if it is already enabled
         */
        enable: function() {
            if (this.isEnabled) {
                return;
            }

            this.isEnabled = true;
            this.hasClickedSubmit = false;

            // Setup any event handlers

            // submit button
            this.$submit.on('click', function(e) {
                this.onClickSubmit(e);
            }.bind(this));

            // key up in text fields
            this.$textInput.on('keyup', function(e) {
                this.onKeyUpTextField(e);
            }.bind(this));

            return this;
        },

        /**
         * Disables the view
         * Tears down any event binding to handlers
         * Exits early if it is already disabled
         */
        disable: function() {
            if (!this.isEnabled) {
                return;
            }

            this.isEnabled = false;

            // Tear down any event handlers

            return this;
        },

        /**
         * Destroys the view
         * Tears down any events, handlers, elements
         * Should be called when the object should be left unused
         */
        destroy: function() {
            this.disable();

            // any permanent destruction here

            return;
        },

        /**
         * Event Handler
         * Run validation check/display error messages on submit
         * @param e
         */
        onClickSubmit: function(e) {
            e.preventDefault();
            if (! this.isValid()) {
                this.showErrors();
                this.hasClickedSubmit = true;
            }
        },

        /***
         * Event Handler
         * Run validation check/display error messages on keyup only after the user has clicked submit
         * @param e
         */
        onKeyUpTextField: function(e) {
            if (this.hasClickedSubmit) {
                if (! this.isValid()) {
                    this.showErrors();
                }
            }
        },

        /**
         * Validator, checks for validation errors, sets validation error messages in the dom
         * @returns {boolean}
         */
        isValid: function() {

            // init to true
            var isValid = true;

            // used here and in showErrors()
            this.errorMsgAttribute = 'data-error-msg';

            // hide any previous error message ui
            this.hideErrors();

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
        },

        /**
         * Show any errors
         * implemented as bootstrap tooltips
         */
        showErrors: function() {
            this.$form.find('[' + this.errorMsgAttribute + ']').each(function(index, element) {
                // use $(element) because we are binding APP.RegistrationForm to 'this'
                var config = {
                    title: $(element).attr(this.errorMsgAttribute),
                    placement: 'right',
                    trigger: 'manual',
                    animation: false
                };
                $(element).tooltip(config);
                $(element).tooltip('show');
            }.bind(this));
        },

        /**
         * Hide any errors
         * implemented as bootstrap tooltips
         */
        hideErrors: function () {
            this.$form.find('[' + this.errorMsgAttribute + ']').each(function(index, element) {
                // use $(element) because we are binding APP.RegistrationForm to 'this'
                $(element).tooltip('destroy');
            }.bind(this));
        }
    };
})(APP);