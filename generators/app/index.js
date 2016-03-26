'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var mkdirp = require('mkdirp');
var _ = require('lodash');
var glob = require('glob');


module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    this.log(yosay(
      'Bienvenido a ' + chalk.red('generator-teduxer') + ' un generador básico de react apps con redux!'
    ));

    var prompts = [{
      name: 'appName',
      message: 'Como vas a llamar a tu nueva app?'
    },
    {
      type: 'list',
      name: 'choiceCssFramework',
      message: 'Con que framework frontend te gustaría trabajar?',
      choices: ['Foundation Sites 6','Bootstrap 3']
    }
  ];

    this.prompt(prompts, function (props) {
      this.props = props;
      this.choiceCssFramework = props.choiceCssFramework;

      // To access props later use this.props.someOption;
      // this.appName = props.appName
      function cleanAppName(appName){
        var newName = appName.trim().split(" ").join("-");
        return newName;
      }

      this.appName = cleanAppName(props.appName)

      done();
    }.bind(this));
  },

  scaffoldFolders: function(){
    mkdirp('app/actions/',function(err) {
      err ? console.error(err) : console.log(chalk.green('   create ') + 'app/actions/');
    });
    mkdirp('app/components/',function(err) {
      err ? console.error(err) : console.log(chalk.green('   create ') + 'app/components/');
    });
    mkdirp('app/reducers/',function(err) {
      err ? console.error(err) : console.log(chalk.green('   create ') + 'app/reducers/');
    });
    mkdirp('app/stores/',function(err) {
      err ? console.error(err) : console.log(chalk.green('   create ') + 'app/stores/');
    });
    mkdirp('public/js/',function(err) {
      err ? console.error(err) : console.log(chalk.green('   create ') + 'public/js/');
    });
    mkdirp('public/styles/',function(err) {
      err ? console.error(err) : console.log(chalk.green('   create ') + 'public/styles/');
    });
    mkdirp('src/external/js/',function(err) {
      err ? console.error(err) : console.log(chalk.green('   create ') + 'src/external/js/');
    });
    mkdirp('src/external/styles/',function(err) {
      err ? console.error(err) : console.log(chalk.green('   create ') + 'src/external/styles/');
    });

  },

  writing: function () {

    var appName = String(this.appName);
    var choiceCssFramework = String(this.choiceCssFramework);
    var done = this.async();

    var cssFrameworkName,cssFrameworkVersion,cssFrameworkRoute;

    glob('**/*', { cwd: this.sourceRoot(), dot: true }, function (err, files) {

      if(choiceCssFramework === 'Foundation Sites 6'){
        var cssFrameworkName = "foundation-sites";
        var cssFrameworkVersion  = "^6.2.0";
        var cssFrameworkRoute = "../bower_components/"+cssFrameworkName+"/dist/foundation-flex.css";
      }else{
        var cssFrameworkName = "bootstrap";
        var cssFrameworkVersion  = "^3.3.6";
        var cssFrameworkRoute = "../bower_components/"+cssFrameworkName+"/dist/css/bootstrap.css";
      }

      if (err) {
        this.log('Error:', err.message);
        return done();
      }

      files.forEach(function (file) {
        var dest = file;
        if (file === 'npmignore') {
          dest = '.' + file;
        }
        this.fs.copyTpl(
          this.templatePath(file),
          this.destinationPath(dest),
          {
            name : appName,
            cssFramework: cssFrameworkName,
            cssFrameworkVersion: cssFrameworkVersion,
            cssFrameworkRoute: cssFrameworkRoute
          }
        );
      }, this)
      done();
    }.bind(this));

  },

  install: function () {

    console.log(
      '\n'+chalk.blue('-------------------------------------------------------------------') +
      '\n'+
      '\n'+ chalk.blue('Ya casi terminamos, Solo tenemos que instalar las dependencias 😴' ) +
      '\n'+
      '\n'+chalk.blue('--------------------------------------------------------------------')
    );

    this.spawnCommandSync('npm',['install']);
    this.spawnCommandSync('bower',['install']);
    this.spawnCommandSync('git',['init']);
    console.log(
      '\n'+chalk.blue('------------------------------------------------') +
      '\n'+
      '\n'+ chalk.blue('Todo listo. Para empezar a crear algo cool!' ) +
      '\n'+
      '\n'+chalk.blue('------------------------------------------------')
    );
    this.spawnCommandSync('gulp',['default']);
  }
});
