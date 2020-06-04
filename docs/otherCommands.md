# Tizen

# Ares

Source: http://webostv.developer.lge.com/sdk/tools/using-webos-tv-cli/

## List Devices

`ares-setup-device --list`

## Generate Private Key to connect

`ares-novacom --device tv2 --getkey`

## Launch

`ares-launch --device emulator com.example.sampleapp`

## Inspect

*Requires old version Chromium
* Chromium v68 available when downloading the IDE via ComponentManager

`ares-inspect --device emulator --app com.example.sampleapp`