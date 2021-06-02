Aplikace Počasí

Popis:
Aplikace slouží pro předpověď počasí na následujích pět dní. Umožňuje uživateli zobrazit počasí ve městě, které zadá do prázdného pole, který slouží jako našeptávač. Teplota se zobrazuje ve stupních Celsia a je uvedena jako maximální teplota / minimální teplota. Pozadí stránky se mění podle aktuálního počasí. V levé části je legenda, podle které určíme zda prší, sněží, atd. Nad legendou je seznam zkratek států. Ty nám určují, ve kterém státě hledáme město. Mezi státy lze jednotlivě překlikávat.

Spuštění:
Pro spuštění je potřeba server. Pro lokální použití lze použít například Live Server.

Popis struktury:
Důležité komponenty aplikace jsou v samostatných souborech
weather.js - zjišťuje teplotu, lokaci, mění barvu pozadí
days.js - zjistí následujích pět dní a vypíše je na stránku
autocomplete.js - našeptávač
countries.js - vytvoří seznam států
legenda.js - vytvoří legendu