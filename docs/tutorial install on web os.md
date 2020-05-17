# Passo a Passo: Instalando no webOS TV

## Requisitos

Você irá precisar do web OS TV CLI que pode ser obtido aqui:
http://webostv.developer.lge.com/sdk/installation/

Você vai precisar garantir que o web OS TV CLI esteja no PATH

## Criando projeto

`tvam create myApp`

## Configure Tv or Emulador

Esse é um processo oficial informado na doc do Tizen
Fonte: https://webostv.developer.lge.com/develop/app-test/#turningDeveloperModeOn

### Preparando Tv

0. Se não tiver, crie uma conta de Desenvolvedor LG em http://webostv.developer.lge.com/login

1. Ativando o Modo de Desenvolvedor da Tv
    1. Obtenha o Developer Mode app na LG Content Store
    2. Entre com suas credenciais na tela inicial do Developer Mode app
    3. Habilite o Dev Mode Status e reinicie a Tv

2. Conectando sua máquina na Tv
    1. Em sua Tv, abra Developer Mode app
    2. Em seu PC, execute `ares-setup-device` e selecione add.
    3. Informe as informações como abaixo

    ```
    ? Select: add
    ? Enter Device Name: <Um nome como quiser>
    ? Enter Device IP address: <Informado no Developer Mode app>
    ? Enter Device Port: 9922
    ? Enter ssh user: prisoner
    ? Enter description: new device
    ? Select authentification: password
    ? Enter password:
    ? Save ? Yes
    ```

    4. No Developer Mode app, habilite o Key Server
    5. Em seu PC, execute `ares-novacom --device tv2 --getkey` e informe Passphrase mostrado no Developer Mode app

### Criando um Emulador

1. Abra o Component Manager TV
2. Instale uma versão do Emulador
3. Uma vez instalado, abra o LG_webOS_TV_Emulator_RCU disponivel em `/opt/webOS_TV_SDK/Emulator`

## Buildando

`tvam build`

## Instalando

`tvam install`