# fantasywebgame

## MONGODB

1. Pobieramy mongoDB.rar
2. Wypakowujemy na dysku c (tak żeby istniała ścieżka C:\MongoDB\Server\3.2\bin)
3. Dodajemy do zmiennych środowiskowych ścieżkę C:\MongoDB\Server\3.2\bin
4. Uruchamiamy cmd (command line)
5. Wpisujemy komendę 'mongod' (Właśnie mamy uruchomioną bazę mongoDB!)

## Repozytorium

1. Pobieramy repozytorium z grą (git clone https://github.com/MrZacky/fantasywebgame.git)

## NODEJS (nasz serwer na tym stoi)

1. Pobieramy nodejs (https://nodejs.org/en/), wybieramy stable version (recommended for most users)
2. Instalujemy nodejs

## NPM

Służy do ściągnięcia wymaganych zależności i zainstalowania ich.

1. W głównym katalogu otworzyć terminal;
2. Wywołać `npm install` i czekać na zakończenie.

## PHPStorm

1. Pobieramy phpStorm
2. Istalujemy phpStorm
3. Uruchamiamy phpStorm

Instalujemy plugin node js do phpStorm

1. Wchodzimy w File -> Settings -> Plugins -> Install JetBrains Plugins...
2. Wpisujemy w wyszukiwarce 'nodejs'
3. Klikamy install plugin

Dodajemy brakującą bibliotekę isogenic game engine (żeby rozpoznawał nazwy metod z ige)

1. Wchodzimy w File -> Settings -> Languages & Frameworks -> Javascript -> Liblaries
2. Klikamy Add...
3. Wpisujemy name 'Isogenic Engine'
4. Zaznaczamy visibility 'Global'
5. Klikamy plusik '+' i attach directories
6. Wybieramy ścieżkę repozytorium /ige/engine

Dodajemy bibliotekę nodejs

1. Zaznaczamy także Node.js globals
2. Klikamy ok

Otwieramy nasz projekt!

1. File -> Open i nasza ścieżka repozytorium
2. Klikamy ok

Uruchamianie projektu

1. Wchodzimy w Run -> edit configurations
2. Klikamy plusik '+' oraz wybieramy Node.js
3. W JavaScript file wpisujemy 'ige\server\ige.js' (To ścieżka do naszego isogenic game engine)
4. W Application parameters wpisujemy '-g .' (Parametr -g to ścieżka do gry, . oznacza obecną lokalizację)

## Alternatywny sposób uruchomienia serwera

1. Otworzyć terminal w głównym katalogu;
2. Wywołać w nim `npm start`.
