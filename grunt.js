module.exports = function(grunt) {
    grunt.initConfig({
        lint: {
            files: ['grunt.js', 'jquery.datepair.js']
        },
        jshint: {
            options: {
                immed: false,
                latedef: false,
                browser: true,
                eqeqeq: false
            }
        },

        min: {
            "jquery.datepair.min.js": ["jquery.datepair.js"]
        }
    });

    grunt.registerTask('default', 'lint min');
};
