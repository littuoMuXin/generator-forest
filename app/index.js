'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var updateNotifier = require('update-notifier');
var pkg = require('../package.json');

var options = require('./options.json');
var files = require('./files.json');


var OcappGenerator = yeoman.generators.Base.extend({
    constructor: function() {
        yeoman.generators.Base.apply(this, arguments);

        updateNotifier({pkg}).notify();

        this.options = options;
        this.options.forEach(function(option) {
            this.option(option.name, {
                type: global[option.type],
                required: option.required,
                desc: option.desc,
                defaults: option.defaults
            });
        }, this);

        this.argument('app_name', {
            type: String,
            required: false
        });
        this.appname = this.app_name || 'app-demo';

        this.config.set('appPath', this.appname);
    },
    prompting: function() {
        var done = this.async();

        this.log(yosay(
            'Welcome to ' + chalk.green('Ocapp') + ' generator!'
        ));

        var prompts = [{
            type: 'input',
            name: 'appname',
            message: 'Your project name?',
            default: this.appname
        }, {
            type: 'input',
            name: 'description',
            message: 'Your project description?',
            default: 'automatically generate by Ocapp',
        }, {
            type: 'input',
            name: 'author',
            message: 'author\'s name?',
            default: 'anonymous',
            store: true
        }, {
            type: 'input',
            name: 'version',
            message: 'this project"s version?',
            default: '0.0.1',
            store: true
        }];

        this.prompt(prompts, function(answers) {
            this.appname = answers.appname;
            this.description = answers.description;
            this.author = answers.author;
            this.version = answers.version;
            this.generator = answers.generator;
            done();
        }.bind(this));
    },
    prepareFiles: function() {
        this.files = [].concat(files.staticFiles.map(this._resolvePaths(false), this))
                    .concat(files.templates.map(this._resolvePaths(true), this));
    },
    writeFiles: function() {
        this.log(yosay(
                'Welcome to '
            ));

        this.files.forEach(function(file) {
            var dest = './' + file.dest.substring(file.dest.indexOf('/') + 1);
            if(file.src.indexOf('gitignore') > -1) {
                dest = '.gitignore';
            }
            try {
                if (file.template) {
                    this.fs.copyTpl(this.templatePath(file.src), this.destinationPath(dest), this);
                } else {
                    this.fs.copy(this.templatePath(file.src), this.destinationPath(dest));
                }
            } catch (error) {
                console.error('Template processing error on file', file.src);
                throw error;
            }
        }, this);
    },
    _resolvePaths: function(template) {
        return function(file) {
            var src = file,
                dest = file;
            return {
                src: src,
                dest: dest,
                template: template
            };
        };
    },
    install: function() {
        this.log(yosay(
            chalk.red('Congratulations!')
        ));
        if (!this.options['skip-install']) {
            this.log(yosay(
                chalk.green('Install npm modules for you right now ~')
            ));
            this.spawnCommand('tnpm', ['install']);
        }
    }
});
module.exports = OcappGenerator;
