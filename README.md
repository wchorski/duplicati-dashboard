# duplicati-dashboard
A NodeJS based server that collects JSON data from Duplicati backup logs

## Tech
- Frontend: NextJS
- API: NextJS
- Database: InfluxDB

> [!warning] Backups sharing the same name will cause issues. The backup's name must be > unique accross all Duplicati instances, it will be used as an ID for logging
> example: "Laptop | Home Folder Backup", "Desktop | Home Folder Backup" is a good naming convention. 

## Usecase
Initally this was just some middle ware that serves as an endpoint

## Duplicati Setup
you can either add these settings for the globally or per backup in the *Advanced options*
- send-http-result-output-format = json
- send-http-url = "http://APPSDOMAIN/api/backups"

## API

### Query Single Backup Stats

http://APPSDOMAIN/backups/BACKUP_ID?start=-5h

breaking down the url above
- BACKUP_ID => the id (or name) of the backup saved
- stuff after the "?" search query sets range of time of pulled data
  - start => how far back to you want to start pulling data i.e. 
    - `-40d` 40 days ago [the default]
    - `-5h` 5 hours ago 
    - `-60m` 60 miniutes ago
    - `1999-12-31T00:00:00` starting on December 31st, 1999
    - `012343` starting on this UNIX time
  - stop => the end of the range
    - `now()` => my current time [the default]
    - all the other examples above as long as the date is after the `start`
    - both query parameters can be omitted

> [!note] make sure relative dates have a negative i.e. `-5h` as your are looking back in time. Positive time values will cause errors