# Smartlook Zendesk application
Zendesk marketplace application

# Development enviroment installation

Requirements:
  - Ruby
  - ZAT gem

### Installing Ruby on Mac OS X
1. Go to http://railsinstaller.org/en and download the Mac installer.
2. Double-click the downloaded file and follow the instructions.
3. The wizard installs a lot of files. If the installation appears to freeze, give it time. It'll finish eventually.

Test the installation by checking the version number:
`$ ruby -v`

### Installing the ZAT gem
`$ gem install zendesk_apps_tools`

After application editions run validator
`$ zat validate`

If everything is OK then
`$ zat package`
and you are ready to upload it into Zendesk Marketplace

### Developing
`$ zat server`

Go to Zendesk ticket and add on the end of URL `?zat=true` and allow loading external unsafe scripts in your browser

