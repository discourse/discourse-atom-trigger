# discourse-atom-trigger package

This atom package will ping a local discourse server when a SCSS file has
been changed.

This is useful on Windows systems when working on Discourse in a VM
with shared folders, where changes to files are not picked up right
away.

### Requirements

* Recent version of atom

* Install [discourse-atom-receiver](https://github.com/discourse/discourse-atom-receiver)
in your discourse development server.


### How it Works

Whenever you save a file that ends with .scss, if the full path
contains `discourse` in it, it will be sent as a message to a
local discourse server.

If Discourse knows about the file, it will live reload it.

> check the package settings to change your development server address!
