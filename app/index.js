'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var VmGenerator = module.exports = function VmGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        // this.installDependencies({ skipInstall: options['skip-install'] });
        if (this.shell.which('bundle')) {
            this.log.info('Installing gems...');
            this.shell.exec('bundle install');
            this.log.info('Installing recipes...');
            this.shell.exec('bundle exec librarian-chef install');
        }
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(VmGenerator, yeoman.generators.Base);

VmGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // have Yeoman greet the user.
    console.log(this.yeoman);

    var prompts = [
        {
            type: 'input',
            name: 'vmIpAddress',
            message: 'Vagrant IP address:',
            default: '192.168.2.100'
        },
        {
            type: 'input',
            name: 'vmWebPort',
            message: 'Forward port 80 to:',
            default: 8000
        },
        {
            type: 'input',
            name: 'vmBoxName',
            message: 'Vagrant box:',
            default: 'opscode-ubuntu-13.04'
        }
    ];

    this.prompt(prompts, function (props) {
        this.answers = props;

        cb();
    }.bind(this));
};

VmGenerator.prototype.app = function app() {
    this.mkdir('app');
    this.mkdir('app/public');
    this.copy('index.html', 'app/public/index.html');
};

VmGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('gitignore', '.gitignore');
};

VmGenerator.prototype.chef = function chef() {
    this.mkdir('.chef');
    this.mkdir('site-cookbooks');
    this.copy('knife.rb', '.chef/knife.rb');
    this.copy('_Cheffile', 'Cheffile');
    this.copy('recipes.json', 'recipes.json');
    this.directory('site-cookbook', 'site-cookbooks/app');
};

VmGenerator.prototype.gems = function gems() {
    this.copy('_Gemfile', 'Gemfile');
};

VmGenerator.prototype.vagrant = function vagrant() {
    this.template('_Vagrantfile', 'Vagrantfile');
};