module.exports = function(grunt) {
	'use strict';

	//Load all grunt tasks
	require('load-grunt-tasks')(grunt);

	//config grunt
	grunt.initConfig({
		//prefix css files for cross browser compatibility
        autoprefixer: {
            dist: {
                files: {
                    'app/css/app-prefixed.css': 'app/css/app.css'
                }
            }
        },
		//Watch files
		watch: {
			sass: {
				files: ['app/sass/**/*.{sass,scss}'],
				tasks: ['sass:dist']
			},
			livereload: {
				files: ['app/**/*.*']
			}
		},

		//compile sass with libsass
		sass: {
			options:{
				sourceMap: true,
				outputStyle: 'compressed',
				includePaths: ['app/js/lib/foundation/scss']
			},
			dist: {
				files: {
					'app/css/app.css': 'app/sass/app.scss'
				}
			}
		},

		//put all bower dependencies in the right files
		wiredep: {
			task: {
				src: ['app/index.html']
			}
		},

		//Express server
		express: {
			all: {
				options: {
					port: 9000,
					hostname: "0.0.0.0",
					bases: ['app'],
					livereload: true
				}
			}
		},

		// grunt-open will open default browser at the project's URL
		open: {
			all: {
				// Gets the port from the express configuration above
				path: 'http://localhost:<%= express.all.options.port%>'
			}
		},

		//Open project in sublime
		shell: {
			all: {
				command: 'open -a "Sublime Text" ${PWD}'
			}
		},

		//copy source files to build folder
		copy: {
			build: {
				cwd: 'app',
				src: [ '**' ],
				dest: 'build',
				expand: true
			}
		},

		//clean build folder
		clean: {
			build: {
				src: [ 'build' ]
			}
		}
	});

	//command: "grunt" -- open in browser etc
	grunt.registerTask('default',[
		'sass:dist',
		'express',
		'open',
		'watch'
	]);

	//command: "grunt dev" -- Project setup, from scratch (sublime not open)
	grunt.registerTask('dev',[
		'shell',
		'sass:dist',
		'express',
		'open',
		'watch'
	]);

	//command: "grunt build" -- build tasks. Todo: install grunt-copy...
	grunt.registerTask('build',[
		'clean',
		'copy'
	]);
};