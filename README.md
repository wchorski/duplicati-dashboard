# duplicati-dashboard
A NodeJS based server that collects JSON data from Duplicati backup logs

## 📦 Tech
- Frontend: NextJS
- API: NextJS
- Database: InfluxDB

> [!warning] Backups sharing the same name will cause issues. The backup's name must be unique across all Duplicati instances, it will be used as an ID for logging. MUST BE URL FRIENDLY
> example: "Laptop--Home_Folder_Backup", "Desktop--Home_Folder_Backup" is a good naming convention. 

## Usecase
Initally this was just some middle ware that serves as an endpoint for JSON friendly monitoring apps, but I also built a simple UI so it could be used as a standalone app.

## Duplicati Setup
you can either add these settings for the globally or per backup in the *Advanced options*
- send-http-result-output-format = json
- send-http-url = "http://APPSDOMAIN/api/backups"

## API

Here is a breakdown of what endpoints and search parameters that can be passed through.

### URL Breakdown

http://APPDOMAIN/backups/BACKUP_ID?start=-5h&first=true


- `BACKUP_ID` => the id (or name) of the backup saved
- stuff after the "?" search query sets range of time of pulled data
  - **start** => how far back to you want to start pulling data i.e. 
    - `-40d` 40 days ago [the default]
    - `-5h` 5 hours ago 
    - `-60m` 60 miniutes ago
    - `1999-12-31T00:00:00` starting on December 31st, 1999
    - `1694117521` starting on this UNIX time (seconds)
  - **stop** => the end of the range
    - `now()` => my current time [the default]
    - all the other examples above as long as the date is after the `start`
    - both query parameters can be omitted
  - **last** => set to true if you'd like the last recorded point in the table
    - can also use the `http://localhost:3000/api/backups/last/BACKUP_ID` endpoint for cleaner GET (this endpoint also takes `start` and `stop` query parameters)
  - **first** => same as *last* but returns the first point of recoreded data within the range

> [!note] make sure relative dates have a negative i.e. `-5h` as your are looking back in time. Positive time values will cause errors

### Examples
| query                                         | url                                                            |
| --------------------------------------------- | -------------------------------------------------------------- |
| all backup stats in database                  | `http://APPDOMAIN/backups`                                     |
| single backup stats                           | `http://APPDOMAIN/backups/BACKUP_ID`                           |
| last recorded backup stat                     | `http://APPDOMAIN/backups/last/BACKUP_ID`                      |
| same as above                                 | `http://APPDOMAIN/backups/BACKUP_ID?last=true`                |
| last recorded backup stat in the last 5 hours | `http://APPDOMAIN/backups/last/BACKUP_ID?start=-5h` |


## ⚙️ Development
1. `git clone https://github.com/wchorski/duplicati-dashboard.git && cd duplicati-dashboard`
2. `cp .env.template .env.local`
3. set up InfluxDB instance
3. get InfluxDB API Token for `.env.local`
3. `yarn install`
3. `yarn dev`

## 🏭 Production
1. `git clone https://github.com/wchorski/duplicati-dashboard.git && cd duplicati-dashboard`
2. `cp .env.template .env`
4. the **INFLUX_TOKEN** in `.env` should be a long ~88 character string
3. `docker compose up -d`

## Home Assistant
```yaml
rest: 
- authentication: basic
  username: "admin"
  password: "password"
  scan_interval: 86400
  resource: http://APPDOMAIN.lan/api/backups/last/DUPLICATI_ID
  sensor:
    - name: "duplicati-DUPLICATI_ID-status"
      value_template: "{{ value_json.status }}"
    - name: "duplicati-DUPLICATI_ID-time"
      value_template: >
        {% set thistime = value_json.time %}
        {{ as_timestamp(thistime) | timestamp_custom("%Y %M, %d %H:%M") }}
```


#Todo
- [x] create dynamic nav based on unique `duplicati_id`s from database
- [ ] add FAQ as a page inside the app
- [ ] mobile friendly (almost there)
- [ ] graph trends in app
- [ ] Home Assistant Template sensor
- [ ] Don't be lazy and figure out Types in TableClient.tsx component
- [ ] get real data for screenshots
- [ ] why is bg tile image weird when scrolling on mobile?
- [ ] human readable bytes formatter (gb tb)
- [ ] human readable duration formatter
