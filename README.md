# fantasywebgame

MONGODB
1. Pobieramy mongoDB.rar
2. Wypakowujemy na dysku c (tak żeby istniała ścieżka C:\MongoDB\Server\3.2\bin)
3. Dodajemy do zmiennych środowiskowych ścieżkę C:\MongoDB\Server\3.2\bin
4. Uruchamiamy cmd (command line)
5. Wpisujemy komendę 'mongod' (Właśnie mamy uruchomioną bazę mongoDB!)

Repozytorium
1. Pobieramy repozytorium z grą (git clone https://github.com/MrZacky/fantasywebgame.git)

NODEJS (nasz serwer na tym stoi)
1. Pobieramy nodejs (https://nodejs.org/en/), wybieramy stable version (recommended for most users)
2. Instalujemy nodejs

PHPStorm
1. Pobieramy phpStorm
2. Istalujemy phpStorm
3. Uruchamiamy phpStorm
// Instalujemy plugin node js do phpStorm
4. Wchodzimy w File -> Settings -> Plugins -> Install JetBrains Plugins...
5. Wpisujemy w wyszukiwarce 'nodejs'
6. Klikamy install plugin

// Dodajemy brakującą bibliotekę isogenic game engine (żeby rozpoznawał nazwy metod z ige)
7. Wchodzimy w File -> Settings -> Languages & Frameworks -> Javascript -> Liblaries
8. Klikamy Add...
9. Wpisujemy name 'Isogenic Engine'
10. Zaznaczamy visibility 'Global'
11. Klikamy plusik '+' i attach directories
12. Wybieramy ścieżkę repozytorium /ige/engine

// Dodajemy bibliotekę nodejs
13. Zaznaczamy także Node.js globals
14. Klikamy ok

// Otwieramy nasz projekt!
15. File -> Open i nasza ścieżka repozytorium
16. Klikamy ok

// Uruchamianie projektu
17. Wchodzimy w Run -> edit configurations
18. Klikamy plusik '+' oraz wybieramy Node.js
19. W JavaScript file wpisujemy 'ige\server\ige.js' (To ścieżka do naszego isogenic game engine)
20. W Application parameters wpisujemy '-g .' (Parametr -g to ścieżka do gry, . oznacza obecną lokalizację)

