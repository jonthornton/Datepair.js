module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner: '/*!\n' +
            ' * <%= pkg.name %> v<%= pkg.version %> - <%= pkg.description %>\n' +
            ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> - <%= pkg.homepage %>\n' +
            ' * License: <%= pkg.license %>\n' +
            ' */\n\n',
            outputDir: 'dist',
            output: '<%= meta.outputDir %>/<%= pkg.name %>',
            outputMin: '<%= meta.outputDir %>/<%= pkg.name.replace("js", "min.js") %>'
        },

        rig: {
            options: {
                banner: '<%= meta.banner %>'
            },
            dist: {
                files: {
                    '<%= meta.output %>': ['src/wrapper.js'],
                    // 'dist/jQuery.headroom.js' : ['src/jQuery.headroom.js'],
                    // 'dist/angular.headroom.js' : ['src/angular.headroom.js']
                }
            }
        },

        uglify: {
            options: {
                banner: '<%= meta.banner %>',
                report: 'gzip'
            },
            dist: {
                files: {
                    '<%= meta.outputMin %>': '<%= meta.output %>',
                }
            }
        },

        watch: {
            options : {
                atBegin : true
            },
            files: ['src/*.js'],
            tasks: ['rig']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-rigger');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['rig', 'uglify']);
};
