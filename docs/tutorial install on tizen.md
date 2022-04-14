# Passo a Passo: Instalando no Tizen

## Requisitos

Você irá precisar do Tizen CLI que pode ser obtido aqui:
https://developer.tizen.org/development/tizen-studio/download

Você pode optar por baixar apenas o CLI ou ter o conjunto com IDE

Você vai precisar garantir que o Tizen CLI esteja no PATH

Para esse tutorial, será preciso ter baixado o conjunto com a IDE, para ter as ferramentas embutidas

- package-manager
- emulator-manager
- device-manager
- certificate-manager

## Instalando Packages essenciais

Pode ser que você precise instalar os seguintes pacotes pelo package-manager
 - TizenSDK Tools
 - Tv Extensions 5.5 ou maior
 - Tv Extensions Tools
 - Samsung Certificate Extension

## Criando projeto

`tvam create myApp`

## Configure Tv or Emulador

Esse é um processo oficial informado na doc do Tizen
Fonte: https://docs.tizen.org/application/web/get-started/tv/first-samsung-tv-app#run-on-a-target-device

### Preparando Tv

1. Ativando o Modo de Desenvolvedor da Tv
    1. Inicie a Tv, pressione o botão Home e selecione Apps
    2. No panel Apps, entre com a..ah como eu posso dizer? "Sequência Mágica" (1, 2, 3, 4 e 5, na sequência) (tem um botão 1 2 3 no controle bonitinho que abre o teclado numerico na tv)
    3. Ative o modo de desenvolvedor e informe com o endereço IP da sua maquina
    4. Confirme e reinicie a Tv

2. Conectando sua máquina na Tv
    1. Abra o device-manager
    2. Clique no botão Remote Device Manager 
    [Imagem]
    3. Clique em Scan para verificar se sua tv aparece na lista ou + para adicionar as informações manualmente
    [Imagem]
    4. Faça o Switch para On na Tv
    [Imagem]
    5. Confirme se a Tv mostra como conectada na lista de dispositivos
    [Imagem]

### Criando um Emulador

1. Abra o emulator-manager
2. Crie um emulador

## Gerando seu certificado (Prod)
Obs.: Para devs mobile, vão se famializar com o certificado gerado para iOS e a Keystore do Android (As IDEs geram automaticamente para debug, mas aqui estamos só com um Teminal e um editor de texto, então vamos lá)

1. Gerando certificado
    
`tizen certificate -a MyTizen -p 1234 -c KR -s Seoul -ct Gangnamgu -o Tizen -n "Gildong Hong" -e gildonghong@example.org -f mycert`

2. Criando perfil

Obs.: O comando anterior mostra onde o certificado foi gerado, então caso vc não tinha definido a variavel de ambiente TIZEN_STUDIO_DATA, pode copiar o caminho

`tizen security-profiles add -n MyProfile -a $TIZEN_STUDIO_DATA/keystore/author/mycert.p12 -p 1234`

## Buildando

### Debug

O tvam gera um certificado de Debug para ser usado se você passar tvamDebug ou nada como paramêtro no comando build

`tvam build tvamDebug`

ou

`tvam build`

### Prod

Gere seu próprio certifico e perfil e passe o como parametro para o comando build

`tvam build MyProfile`

## Instalando

`tvam install`
