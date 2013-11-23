# generator-vm

A generator for [Yeoman](http://yeoman.io) that sets up base configs for vagrant, bundler, and librarian-chef to make it easy to create a development and production environment.


## Getting Started

To install generator-vm from npm, run:

	$ npm install -g generator-vm

Finally, initiate the generator:

	$ yo vm


## Usage

To get the most out of this generator you'll need to install these first:

- [ruby](https://www.ruby-lang.org/en/downloads/)
- [bundler](http://bundler.io/)
- [vagrant](http://www.vagrantup.com/) (optional)

If you have these installed, the following commands will be run automatically:

	# needed to install Chef on base box
	$ vagrant plugin install vagrant-omnibus
	# installs gems
	$ bundle install
	# installs recipes
	$ bundle exec librarian-chef install

You'll need to run those commands manually if you don't have the required dependencies when you run the generator.

After everything is installed, run the following to start your local development environment:

	$ vagrant up

To provision a production environment with the same set up, run the following:

	$ bundle exec knife solo bootstrap [USER@]HOSTNAME recipes.json


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
