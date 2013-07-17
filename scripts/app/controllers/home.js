/**
 * Require.js Config
 */
requirejs.config({
    "baseUrl": "scripts/app",
    "paths": {
        "jquery": "http://code.jquery.com/jquery-2.0.3.min",
        "bootstrap": "../lib/bootstrap"
    },
    "shim": {
        "bootstrap": {
            "deps": ["jquery"]
        },
        "views/registration-form": {
            "deps": ["models/registration-form"]
        }
    }
});

/**
 * Define the Register Controller
 */
define(["bootstrap", "jquery", "models/registration-form", "views/registration-form"], function($) {

    // Registration Form view module
    APP.RegistrationFormModel.init();
    APP.RegistrationFormView.init();
});
