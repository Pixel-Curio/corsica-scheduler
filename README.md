Plugin that allows individual screens to run by a set schedule, running specific commands during specified times.

Schedule is handled by adding an entry to the `settings:scheduler` section of `state.json`.

An example configuration might look like:
```
"settings::scheduler": {
        "entries": [
            {
                "command": "https://charliehoehn.com/wp-content/uploads/2012/12/1305828451-floor-minimalistic-dark-pattern-wood-patterns-wallpaper.jpg",
                "startHour": 10,
                "duration": 1
            },
            {
                "command": "twitch id=rifftrax volume=1",
                "startHour": 9,
                "duration": 1
            }
        ]
    }
```

startHour is given in 24 hour time.