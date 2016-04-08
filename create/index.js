'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var packageFile = require('../package.json');

var appfiles = require('./appfiles.json');
var uicfiles = require('./uicfiles.json');
var libfiles = require('./libfiles.json');


var OcappCreateGenerator = yeoman.generators.Base.extend({
    constructor: function() {
        yeoman.generators.Base.apply(this, arguments);

        this.argument('folderName', {
            type: String,
            required: false
        });
        this.folderName = this.folderName || 'app';
    },
    prompting: function() {
        var done = this.async();

        this.log(yosay(
            'Welcome to ' + chalk.green('Ocapp ' + this.folderName) + ' generator!'
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
        if(this.folderName === 'app') {
            this.files = [].concat(appfiles.staticFiles.map(this._resolvePaths(false), this));
        }else if(this.folderName === 'ui-component') {
            this.files = [].concat(uicfiles.staticFiles.map(this._resolvePaths(false), this));
        }else if(this.folderName === 'lib') {
            this.files = [].concat(libfiles.staticFiles.map(this._resolvePaths(false), this));
        } 
    },
    writeFiles: function() {
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
    end: function() {
        this.log(yosay(
            chalk.red('Congratulations!')
        ));
    }
});
module.exports = OcappCreateGenerator;
