
# Structure of SCHA (SHA-SCA) Projects
PLEASE MAKE THIS README FILE BETTER THAN CURRENT STATE
## Quick start

- install nodejs https://nodejs.org/en/
- navigate under src/main/resources/app/
  - execute the command : npm install && npm run install-bower
- After installing the required modules test under the folder of src/main/resources/
          gulp serve
  - if you have not gulp or bower, you can also install them globally
       - npm install -g bower gulp
- If the project is loaded well in the previous step, now you can compile your project with maven, please go under project
    mvn clean install && cp target/scha-app.jar ../../.iolite/apps/  


[angular course][1]
## Folder structure
    pom.xml
    README.md
    src/
      main/
        java/
          de.iolite.app.scha/
              SCHAApp.java
              ..
              ..
              ..

          resources/
            IOLITEApp.xml
            angular/
              index.html
              app/
                assets/
                controllers/
                myJS/
                styles/
                views/
                app.js
                init.js
              bower_components/
              bower.json
              .bowerrc
              .gitignore
              .jshintrc
              gulpfile.js
              package.json

## IOLITE Backend and Frontend
### Backend classes

 - DBRequestHandler.java  : For MySQL or SQLLite requests
 - HTMLRequestHandler.java : For HMTL Requests
 - JSONRequestHandler.java : For JSON Requests
Note that all new defined request handler should be also

- Communication with these request handlers are carried out with the aid of the
app/myJS/
     - modelAPIConnector.js establishes the communication between IOLITE and Frontend
     - ownAPIConnector.js gives examples how to communicate with the custom defined request handlers.
     - requester.js sends the requests using IOLITE APIs
     - requestParams.js includes the possible IOLITE APIs commands for devices and otherwise
     - view.js is conceptualised to load the data coming through requester.js in a view method, in which user
     can defind what he/she wants. This class is optional
     - dataProcessor.js should filter/form the data obtained from requester. This is right now empty, you have to fill it according to your requirements.
     - main.js shows how a simple call can be done with the available classes.  
     - To communicate with IOLITE Backend, the following method must be called, it is right now called in main.js. If you plan to remove this js file, then you have to call this method in an approapriate place.
            modelAPIConnector.connect(); // model api connecter con
     - Beside the examples in main.js, HomeCtrl contains also the usage of the request handlers.

### IOLITEApp.xml
 Permissions and application logo
### Compiling Project with Maven

   Just simply run the following code according to your folder structure:

       mvn clean install && cp target/scha-app.jar ../../.iolite/apps/

   Note that the project doesn't include .classpath, .project, metadata files, therefore you will not be able to load in the eclipse environment. You have to include these files and download the required plugins yourself! As an example you can use the older project "example-app" that  I provided you.
## Angularjs Frontend


### Loading Template init.js

To be able to use angular templates, they need to be loaded. All these templates are defined in init.js file.
You should edit this file with respect to the template that you have.

    var templateUrls = [
      'app/views/autocomplete.html',
      'app/views/bottomSheet.html',
      'app/views/button.html',
      'app/views/card.html',
      'app/views/datePicker.html',
      'app/views/gridList.html',
      'app/views/home.html',
      'app/views/input.html',
      'app/views/progressCircular.html',
      'app/views/progressLinear.html',
      'app/views/toast.html',
      'app/views/whiteframe.html',
      ...
    ];

### NG_DEFER_BOOTSTRAP  
index.html must containt the follwung script.
      <script>
        window.name = 'NG_DEFER_BOOTSTRAP!'; // manually initialize Angular
        console.debug('Stopped initialization of Angular');
      </script>

### Install NPM and Bower

  - Required configuration files: package.json,bower.json

  - npm modules and bower modules can be installed via the following command
      npm install && npm run install-bower

  1- NPM Run scripts https://docs.npmjs.com/misc/scripts

### Bower

  Bower manages the versions of installed js packages, frontend dependencies

  Configuration files: bower.json (dependecies file), .bowerrc (folder path)

  - Bower For Beginner http://andy-carter.com/blog/a-beginners-guide-to-package-manager-bower-and-using-gulp-to-manage-components
  - Bower for JavaScript dependencies: http://bower.io/#install-bower
  - Compass for compiling SASS to CSS: http://compass-style.org/install/



### Jshint

   *JSHint is a tool that analyzes JavaScript source code to warn about quality problems.* [jshint]

  .jshintrc -> check the javascript code
  configuration file: .jshintrc
  refence [jshint]:http://www.2ality.com/2011/09/jshint.html



### Gulp

  Task runner which automates bundling and minifying libs and stylesheets, refreshing your browser when you save a file, enabling to
  run unit tests, running code analysis, compiling less/sass, copying the modified file to an output directory.


  Testing with gulp and browser-sync :

        gulp serve

  configuration file: gulpfile.js
  configuration folder:

### Package.json

  NPM (Node Package Manager) manages the dependencies, run the scripts, ...
  configuration file:package.json

### Browsersync
      sychronised browser testing [8]


### Protactor [Optional]

  End to end testing frameworf for angularjs apps [protactor-1, protactor-2]
  Protactor generates a folder, namely, e2e, in which the scenarios of the test cases are written.

  Configuration file: protactor.conf.js
  Configuration folder: e2e/

 <!-- ![alt text][protactor-arch] -->

 [protactor-arch]: http://ramonvictor.github.io/protractor/slides/img/protractor-architecture.png "Protactor Architecture"
 ### Karma [Optional]

   *Karma is a JavaScript command line tool that can be used to spawn a web server which loads your application's source code and executes your tests.*

   For more information, please look at the following links: [unit-testing,write-unit-tests,testing-angular-with-karma]

   configuration file: karma.conf.js



### How To Markdown
It  is recommended to visit [Markdown Quick Reference ][20] and [Markdown-Cheatsheet][21] web pages to learn how the syntax of markdown style is.

### Recomended Editor
[Atom Editor][22]
recommended plugins:
color-picker, pigment

## References:

[1]: http://www.slideshare.net/KeithBloomfield/angularjs-crash-course "Angular Crash Course"
[2]: https://docs.angularjs.org/guide/unit-testing "Unit Testing"
[3]: http://yeoman.io/codelab/write-unit-tests.html "write-unit-tests"
[4]: https://www.airpair.com/angularjs/posts/testing-angular-with-karma "testing-angular-with-karma"
[5]: http://ramonvictor.github.io/protractor/slides/#/12 "protactor-1"
[6]: http://mherman.org/blog/2015/04/09/testing-angularjs-with-protractor-and-karma-part-1/#.Vtm-X5MrJTY "protactor-2"
[7]: http://www.sitepoint.com/improve-workflow-browsersync-2-0/ "brosync"

[20]: https://en.support.wordpress.com/markdown-quick-reference/ "Markdown Quick Reference"
[21]: https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet "Markdown Cheatsheet"
[22]: https://atom.io/ "Atom Editor"
