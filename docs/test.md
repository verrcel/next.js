# Testprotokoll

Folgende Tests wurden durchgeführt:

| Testfall               | Beschreibung                                         | Erwartetes Ergebnis                                                         | Tatsächliches Ergebnis                              | Status |
| ---------------------- | ---------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------- | ------ |
| Register Random User   | Test der Registrierung eines zufälligen Benutzers    | Benutzer wird erfolgreich erstellt ohne Fehler                              | Benutzer wurde erfolgreich erstellt                 | ✅     |
| Register Existing User | Test der Registrierung eines existierenden Benutzers | Registrierung schlägt fehl mit "User already exists"                        | Registrierung schlug fehl mit "User already exists" | ✅     |
| Check User Password    | Überprüfung, ob das Benutzerpasswort korrekt ist     | Passwortprüfung gibt true zurück                                            | Passwortprüfung gab true zurück                     | ✅     |
| cn                     | Test der cn-Hilfsfunktion für Klassenverkettung      | Korrekte Verkettung von Klassenstrings und Berücksichtigung von Bedingungen | Klassen wurden wie erwartet verkettet               | ✅     |
