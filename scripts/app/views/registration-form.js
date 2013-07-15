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
            this.$firstName = this.$form.find('.first-name');
            this.$textInput = this.$form.find('[type="text"]');
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

            // Setup any event handlers

            // submit button
            this.$submit.on('click', function(e) {
                this.onClickSubmit(e);
            }.bind(this));

            // key up in text fields
            this.$textInput.on('keyup', function(e) {
                console.log('keyup');
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
         * @param e
         */
        onClickSubmit: function(e) {
            e.preventDefault();
            if (! this.isValid()) {
                this.showErrors();
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

            // check first name field
            if (this.$firstName.val() === '') {

                // invalid, attach error message to the dom element
                this.$firstName.attr(this.errorMsgAttribute, 'Field cannot be blank');

                // the form is not valid
                isValid = false;
            }

            return isValid;
        },

        /**
         * Show any errors
         * implemented as bootstrap tooltips
         */
        showErrors: function() {
            this.$form.find('[' + this.errorMsgAttribute + ']').each(function(index, element) {
                // use $(element) because we are binding APP.RegistrationForm to 'this'
                $(element).tooltip({title: $(element).attr(this.errorMsgAttribute), placement: 'right', trigger: 'manual'});
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
        },

        /***
         * Event Handler
         * @param e
         */
        onKeyUpTextField: function(e) {
            if (! this.isValid()) {
                this.showErrors();
            }
        }
    };
})(APP);