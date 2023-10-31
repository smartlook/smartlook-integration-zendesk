# New Developing through Docker Image

---

> **IMPORTANT**
> Is needed to add file ./src/settings.json with content:

```json
{
  "token": <Info in Confluence page>
}
```

---

`$ docker-compose up --build`

In the Dockerfile you have to set parameter --app-id to relevant ID, which you have installed as private on zendesk server.<br>
Here you can find an ID: https://d3v-smartlook.zendesk.com/api/support/apps/installations.json<br>
Go to Zendesk ticket and add on the end of URL `?zat=true` and allow loading external unsafe scripts in your browser<br>

Now you can modify your code and after reload Zendesk page you have a new update Smartlook App, without rebuilding docker image. (Only if it without changes on docker image)

## Installing the ZAT gem

`$ gem install zendesk_apps_tools`

After application editions run validator
`$ zat validate`

If everything is OK then
`$ npm run build`
`$ zat package`
and you are ready to upload it into Zendesk Marketplace

### Now you can skip next steps...

# Smartlook Zendesk application

Zendesk marketplace application

# Development enviroment installation

Requirements:

- Ruby
- ZAT gem
- Npm
- Gulp

### Installing Ruby on Mac OS X

1. Go to http://railsinstaller.org/en and download the Mac installer.
2. Double-click the downloaded file and follow the instructions.
3. The wizard installs a lot of files. If the installation appears to freeze, give it time. It'll finish eventually.

Test the installation by checking the version number:
`$ ruby -v`

### Installing the ZAT gem

`$ gem install zendesk_apps_tools`

After application editions run validator in src folder <br>
`$ cd src` <br>
`$ zat validate`

If everything is OK then<br>
`$ npm run build`<br>
`$ zat package`<br>
and you are ready to upload it into Zendesk Marketplace

### Developing

`$ zat server`

Go to Zendesk ticket and add on the end of URL `?zat=true` and allow loading external unsafe scripts in your browser
