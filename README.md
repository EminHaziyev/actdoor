# ActivityDoor

Show your Visual Studio Code activity everywhere, in iframe.


## Get started
Open https://actdoor.onrender.com/ and sign up with your GitHub account.

Get your API key from your profile. Do not share this information with anyone.

Install ActivityDoor extension on Visual Studio Code.

Press `Ctrl`+`Shift`+`P` to open Command Palette and select "Store API key". If your API key exposed, go to profile, reset API key and store API key on your VS Code again.

You will get `ActivityDoor: Activity tracking started!` if everything is OK. 


##
Your activity will be updated in every 3 minutes.

If you don't change anything on document in 20 seconds, it will change your activity to idle, and iframe will show `I'm not writing code right now.

## Commands in Visual Studio Code
`ActivityDoor: Store API key` - Change or store API key.
`ActivityDoor: Start tracking` - Starts updating activity on your iframe.
`ActivityDoor: Stop tracking` - Stops updating activity on your iframe.


### API Documentation
API link (must write both of params): `https://actdoor.onrender.com/api/getActivity/{username}`


## `?type=rectangle`
-`&theme=dark`

![](https://github.com/EminHaziyev/actdoor/blob/main/public/dark1.png?raw=true)

-`&theme=light`

![](https://github.com/EminHaziyev/actdoor/blob/main/public/light1.png?raw=true)

## `?type=square`

-`&theme=dark`

![](https://github.com/EminHaziyev/actdoor/blob/main/public/dark2.png?raw=true)

-`&theme=light`

![](https://github.com/EminHaziyev/actdoor/blob/main/public/light2.png?raw=true)


## Upcoming features
`?type=raw` for custom designs

## Iframe
For `?type=square `

`<iframe src="https://actdoor.onrender.com/api/getActivity/{username}?type=square&theme=dark"  width="190px" height="240px" frameborder="0"></iframe>`

For `?type=rectangle`

`<iframe src="https://actdoor.onrender.com/api/getActivity/{username}?type=rectangle&theme=dark" width="110px" height="340px" frameborder="0"></iframe>`

## Authors

- [@Emin Haziyev](https://www.github.com/EminHaziyev)


## Stats
https://stats.uptimerobot.com/8qCRqIfWYC

## License

[GPL 3.0](https://choosealicense.com/licenses/gpl-3.0/)


