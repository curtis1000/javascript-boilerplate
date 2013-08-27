/**
 * Require.js Config
 */
requirejs.config({
    "baseUrl": "scripts/app",
    "paths": {
        "jquery": "http://code.jquery.com/jquery-2.0.3.min",
        "bootstrap": "../lib/bootstrap",
        "HomeController": "controllers/HomeController",
        "RegistrationFormModel": "models/RegistrationFormModel",
        "RegistrationFormView": "views/RegistrationFormView"
    },
    "shim": {
        "bootstrap": {
            "deps": ["jquery"]
        }
    }
});
