
[![npm version](https://badge.fury.io/js/tvam.svg)](https://badge.fury.io/js/tvam)

# Tv App Manager Cli

Atualmente criando, buildando e instalando apps 

Tizen com VueJs

e

webOS com VueJs

Futuramente a ideia é ser possivel criar projetos com React também

## Installation

`npm i -g tvam`

or

`yarn global add tvam`

## Tutoriais

[Passo a Passo: Instalando no Tizen](https://github.com/LucasFebatis/tvam/blob/master/docs/tutorial%20install%20on%20tizen.md)

[Passo a Passo: Instalando no Web OS](https://github.com/LucasFebatis/tvam/blob/master/docs/tutorial%20install%20on%20web%20os.md)

## Você pode não gostar

- Os builds não podem usar chunks

- Você sempre estará limitado a versão do Chromium instalado na Tv

- Tvs Tizen (Samsung)

https://developer.samsung.com/smarttv/develop/specifications/web-engine-specifications.html

- Tvs webOS (LG)

https://webostv.developer.lge.com/develop/specifications/web-api-and-web-engine#web-engine

## Pro Tips

### Chromium
- Você pode encontrar versões antigas do Chromium aqui:

https://www.chromium.org/getting-involved/download-chromium

### Transpilando dependências

- Por conveniência o `tvam create` cria o projeto usando babel com o `@babel/preset-env` para os arquivos do projeto. Porém, você pode precisar transpilar algumas dependências para que navegadores antigos suportem, Se esse for seu caso você pode conferir outros exemplos de configurações no respositório do babel:

https://github.com/babel/babel-configuration-examples

- Lembre se de atualizar também webpack.config.js para continuar ignorarando o node_modules, mas permitindo o babel transpilar as dependências necessárias

`exclude: /node_modules\/(?![module1|module2])/`

### Detectando versão do EcmaScript

https://www.whatismybrowser.com/detect/ecma-script-version

### Versões anteriores dos Emuladores

Archive: https://developer.samsung.com/smarttv/develop/tools/tv-extension/archive.html

Passo a passo para instalação: https://developer.samsung.com/smarttv/develop/getting-started/setting-up-sdk/installing-tv-sdk.html

## Usage

### tvam doctor

Verifica se você tem o Tizen CLI configurado corretamente

É executado antes do create

### tvam create

Criar projeto

### tvam serve

Subir servidor de desenvolvimento

### tvam build

Buildar projeto

### tvam install

Instalar app no device conectado

# License

MIT - see LICENSE

