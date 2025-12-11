# 💲Grand!Scam💲
## Juegos Serios 2025/2026 - 3ºV GDV - V.3.0
### Nombre del grupo: UNDERGROUND
### Sergio Naranjo Barroso y Jule Page Galocha
#### 💥Página Web💥
https://julepage.github.io/GrandScam-JuegosSerios/
	
## Descripción del juego
### Título: 
Grand!Scam

### Objetivo:
Educar a los adultos y personas de la tercera edad en el reconocimiento de estafas digitales (SMS, correo electrónico, mensajes y llamadas telefónicas). El jugador aprenderá a identificar señales de engaño y a tomar decisiones seguras frente a situaciones adversas y sospechosas.

### Descripción breve: 
El jugador encarna a una persona mayor en el sofá de su casa, con el teléfono fijo y el móvil al lado. A lo largo de la partida, recibirá mensajes y llamadas, en las que se le solicitará dinero o datos personales. Deberá identificar mediante opciones de respuesta si se trata de una estafa o no. El objetivo es superar una serie de situaciones sin caer en engaños. Si lo consigue, el jugador habrá aprendido y ganará el juego, de lo contrario, deberá comenzar de nuevo.

</details>


<details>
<summary> Género y PEGI </summary>

## Género y PEGI
### Género: 
Juego educativo perteneciente a la gama de los juegos serios.

### Plataforma(s):
 PC

### Público objetivo:
Enfocado a las personas de la tercera edad (+60) y adultos entre 40-60 años. 

### Modo de juego:
Un jugador.

### Motivación: 
Aprender jugando, reforzar su seguridad digital y aumentar la confianza frente a amenazas online.

### Premisa: 
¡Conviértete en un experto en seguridad digital con este fascinante juego educativo con el que jamás te verás envuelto en una estafa online!

### PEGI:
12

</details>

<details>
<summary> Jugabilidad </summary>

## Jugabilidad
### Movilidad del personaje: 
Éste estará en todo momento sentado en el sofá. No podrá ser manejado por el jugador. 

La cámara permanecerá completamente estática en la escena, manteniendo siempre la misma posición y orientación, independientemente de los cambios en la pantalla o del contenido que aparezca.

### Tipos de estafa:
#### Telefónicas: 
llamadas por teléfono en las que te pedirán tanto información personal como dinero.
#### SMS:  
mensajes al móvil en los que hay enlaces que pueden ser o no malignos, etc.
#### Correos electrónicos:
mails pidiendo cambios de contraseña o datos.
#### Whatsapps: 
suplantación de identidad, solicitud de datos personales o información bancaria, etc.

### Controles:
#### Ratón: 
Clic para seleccionar opciones de diálogo o interactuar con los distintos objetos.
#### Teclado: 
se emplea únicamente para rellenar el cuestionario inicial.

### Mecánicas:
#### Interacción con dispositivos: 
El teléfono fijo y móvil tendrán una animación para indicar cuando son interactuables (recibes una llamada, mensaje, etc). Una vez ocurra ésto, el jugador hará clic en ellos para interactuar.
#### Toma de decisiones:
Sucede algo (llamada o mensaje).  
Se presentan varias opciones para responder a esta situación.  
El jugador debe hacer clic en la opción que quiera para responder.

**Ejemplo:**  
*"Hola mamá, necesito dinero. ¿Podrías hacerme una transferencia?"*

**Opciones:**
- **A:** Claro, ahora mismo.  
- **B:** Es un número desconocido, no contesto.  
- **C:** Hacer una pregunta que solo tu hija podría responder.
  
#### Sistema de vidas:
El jugador comienza teniendo 3 vidas.
Pierde una vida si:
  1. Confía en un estafador.
  2. No se fía de alguien real injustamente.
Si pierde las 3 vidas, la partida se reinicia.
Si acierta 10 casos seguidos o 2 preguntas de cada tipo, ganará.

### Dinámica:
La dinámica del juego consiste en responder las distintas llamadas y mensajes que se reciben durante el transcurso de la partida. Mediante una serie de preguntas, identificar si se trata de una estafa, o en caso contrario, de alguien de quien te puedes fiar. Cada vez que te fíes de un estafador, o desconfías de alguien conocido, se pierde una vida, con un máximo de tres vidas. Si pierdes todas, el juego empezará de nuevo, hasta que se tome la decisión correcta suficientes veces.
El ritmo de juego se basa en la tensión y la observación. 
Las llamadas y mensajes aparecerán con frecuencia.
Se incluyen variaciones de tono, tipos de mensaje y credibilidad de los estafadores.

</details>

<details>
<summary> Diseño del juego </summary>

## Diseño del juego
### Tutorial inicial:
El juego comenzará en un menú peincipal en el que podrás elegir si jugar o su meterte en el tutorial en el que se enseñarán las distintas mecánicas, cómo interactuar con los objetos y el objetivo del juego.
### Cuestionario:
A continuación, el jugador deberá rellenar una encuesta en la que se le pedirán datos personales como nombre, dirección, etc. Los datos obligatorios aparecerán con un asterisco al lado, los demás no será opcional rellenarlos. 
### Desarrollo:
Una vez acabado el cuestionario, comenzará la partida. Durante ésta, se irán recibiendo tanto llamadas como mensajes. Una vez llegue uno de los anteriores, el jugador deberá elegir como reaccionar eligiendo una de las opciones que aparecerán en pantalla. Dependiendo de las respuestas, perderás vidas (si no has conseguido identificar cuando era una estafa y cuando no lo era) o no. Ésto se repetirá o bien hasta que hayas superado suficientes retos o hasta que hayas perdido todas las vidas. Además después de cada caso o falles o aciertes te dará una enseñanza y te dirá si has fallado o no.
### Final:
Una vez acaba la partida, si ganas, aparecerá una enseñanza y varios enlaces en los que se puede hacer clic para visitar webs en las que se profundiza más acerca de este tipo de estafas y cómo evitarlas.
Si pierdes, saldrá un mensaje de aviso y se reiniciará el juego.
### Diseño JSON:
El JSON está compuesto por categorías. Las primeras categorías hacen referencia al dispositivo, teniendo SCAMS de teléfono fijo y de teléfono móvil, nombradas como movil y telefono. Dentro de esas categorías se encuentran otros bloques según el tipo de engaño, teniendo llamada en teléfono y SMS, whatsapp y correo en móvil.

En cada una de estas categorías habrá otras dos, obligatorio y opcional, y dentro de estas habrá los distintos casos.
Los casos empiezan con un contenedor llamado caso1, caso2, ..., casoN, y dentro de estos la estructura será por distintos bloques.

Los bloques están organizados de forma que todos tienen un mIni, el texto inicial, unas opciones y, en los casos en que en la estafa se usen enlaces, también tendrán un apartado llamado enlace.

Dentro de las opciones habrá apartados que tendrán texto y siguiente; el texto sería la respuesta que da el jugador y siguiente el siguiente bloque al que va a pasar el jugador según su respuesta. Este bloque estará configurado de la misma manera.

El flujo del juego funcionaría de esa forma hasta llegar a una opción en la que el siguiente es fallo o acierto; estos son bloques especiales que tienen solo mIni, que funciona como aprendizaje en caso de fallo o como felicitación en caso de acierto.

Todos los bloques de caso comienzan con un primer bloque llamado comienzo.

La estructura final de un caso, por ejemplo de whatsapp, sería esta:

```
"movil"{
 "whatsapp"{ 
  "obligatorio"{  
   "caso1"{   
    "comienzo"{
     "mIni": "..." 
     "opciones"[
      {	 
       "texto": "...",	  
       "siguiente": "sig"	  
      },	 
      { 
       "texto": "...",	  
       "siguiente": "..."	  
      }
     ]	 
    },	
    "sig"{	
     "mIni": "..."	 
     "opciones"[
      {	 
       "texto": "...",	  
       "siguiente": "acierto"	  
      },	 
      {	 
       "texto": "...",  
       "siguiente": "fallo"	  
      }
     ]	 
    },	
    "acierto"{	
     "mIni": "..."	 
    },	
    "fallo"{	
     "mIni": "..." 
    }
   }   
  }  
 } 
}
```

</details>

<details>
<summary> Hud y pantallas </summary>
	
## Hud y pantallas:
### Pantalla principal:
- Sala de estar.
- Objetos interactuables.
  
[Fondo Juego](docs/assets/fondoJuego.png)
### HUD:
- Nº de vidas: 3 corazones.
- Nº casos resueltos.
- Botón a menú de pausa.
  
[Vidas](docs/assets/vidas.png)
### Menú de pausa:
- Menú opciones
- Menú incial para volver
- Continuar el juego

### Menú de opciones:
- Ajustes de sonido
- Opción de lectura de textos
- Pantalla grande
  
### Pantalla de móvil con mensajes y preguntas con opciones:
- Consiste en una pantalla en la que habrá o bien un telefono fijo o bien un móvil. En el segundo caso, el móvil tendrá una imagen en la que se muestra si es un whatsapp, correo, etc.
Además tendrá el bocadillo de diálogo del posible estafador y las respuestas a elegir. 

### Cuestionario
- Preguntas del cuestionario las cuales se usan posteriormente para hacer las estafas más creibles y difíciles de detectar.

  [Imagen Cuestionario](docs/assets/fondoCuestionario.png)

</details>


<details>
<summary> Sonido y arte </summary>
		
## Sonido y arte:
### Música:
- Música sin letra, solamente instrumentos.
- El sonido se podrá subir o bajar, e incluso silenciar. 
- Será un estilo relajado y cálido (guitarra, piano, violín).

### Sonidos:
- Los efectos de sonido están inspirados en los de producciones clásicas como Disney.
- El juego tendrá una opción en la que todos los textos se leerán en alto para aquellas personas con mala visión.

### Arte:
- El arte estará inspirado en el estilo cartoon de los 50-60.
- Referencias: Snoopy, Mafalda.
- Se usan muchos colores cálidos para que se sientan tranquilos y como en casa además de que aporta mucha ayuda visual para que sepan en todo momento que tienen que hacer.
- Interfaz con tipología grande y clara.
  
[Imagen Paleta](docs/assets/GDD/image1.png)

</details>

<details>
<summary> Evaluación </summary>
	
## Evaluación:
La efectividad del juego se evaluará mediante un enfoque que combine datos objetivos con retroalimentación de los participantes.

Al principio del juego se realizará un cuestionario para evaluar los conocimientos digitales del jugador y sobre todo, sobre las estafas online.

Una vez acabe el juego, completarán de nuevo el cuestionario, independientemente de si han conseguido ganar o no. De esta forma, evaluaremos los nuevos conocimientos que han adquirido además de la claridad de las instrucciones, la facilidad de uso, la motivación y la satisfacción general.

Además, se analizarán los datos recogidos de las partidas jugadas por cada participante y serán estudiados posteriormente para obtener información acerca de las decisiones que han ido tomando y si han aprendido mientras jugaban.

Por último, si nos fuera posible, intentaremos hacer playtesting para poder recoger información como el tiempo promedio para completar los retos, la facilidad para comprender el juego, etc.

A continuación podrás leer las preguntas del cuestionario Pre juego a las que deben contestar para poder comenzar la partida (todas son obligatorias):

### Acerca de ti:
- Edad
- ¿Alguna vez ha sufrido una estafa online?
  
### Conocimiento y reconocimiento de estafas online
- ¿Cuál de las siguientes consideras una estafa/phishing?
	- Un email de tu banco pidiendo tu clave
 	- Un sorteo online que pide pocos datos
    - Un mensaje de un amigo pidiendo dinero urgente
-  Recibe un mensaje por la noche de una empresa o servicio que dice que su cuenta está bloqueada en 2 horas si no hace clic en un enlace para confirmar su contraseña y usuario ¿Cuál es su señal de alarma más clara?
	- El mensaje tiene un enlace muy corto
 	- La urgencia por saber mi contraseña
  	- Que el mensaje se envíe fuera del horario laboral
- Recibes un mensaje de alguien que no conoces diciendo que has ganado un sorteo y te pide tus datos bancarios para reclamarlo. ¿Qué harías?
	- Ignorarlo
	- Dar mis datos para reclamar el premio
	- Comprobar la veracidad del sorteo
	- Otra
 - Al navegar por internet, aparece una ventana que dice que tu dispositivo está infectado y debes descargar un programa para “arreglarlo”. ¿Qué harías?
	- Descargar el programa para solucionar el problema
	- Cerrar la ventana y no descargar nada
	- Ignorarlo y comprobar con un antivirus fiable si mi dispositivo está libre de virus
   
   ### Autopercepción y confianza
- Me siento capaz de reconocer estafas online:	Totalmente en desacuerdo	En desacuerdo	Indiferente	De acuerdo	Totalmente de acuerdo	Sin respuesta
- Creo que podría evitar caer en un intento de estafa online:	Totalmente en desacuerdo	En desacuerdo	Indiferente	De acuerdo	Totalmente de acuerdo	Sin respuesta
- Confío en mi capacidad para identificar mensajes sospechosos en redes sociales o apps de mensajería:	Totalmente en desacuerdo	En desacuerdo	Indiferente	De acuerdo	Totalmente de acuerdo	Sin respuesta
- Creo que siempre debo verificar antes de hacer clic en enlaces o descargar archivos desconocidos:	Totalmente en desacuerdo	En desacuerdo	Indiferente	De acuerdo	Totalmente de acuerdo	Sin respuesta
- Me siento capaz de explicar a otras personas cómo reconocer estafas online:	Totalmente en desacuerdo	En desacuerdo	Indiferente	De acuerdo	Totalmente de acuerdo	Sin respuesta
- Suelo revisar la autenticidad de un mensaje antes de actuar cuando algo me parece sospechoso:	Totalmente en desacuerdo	En desacuerdo	Indiferente	De acuerdo	Totalmente de acuerdo	Sin respuesta
- Si recibo un mensaje sospechoso, sé qué pasos seguir para protegerme:	Totalmente en desacuerdo	En desacuerdo	Indiferente	De acuerdo	Totalmente de acuerdo	Sin respuesta
- Me considero consciente de los riesgos de compartir información personal en internet:	Totalmente en desacuerdo	En desacuerdo	Indiferente	De acuerdo	Totalmente de acuerdo	Sin respuesta
- Creo que mi entorno (amigos/familia) también podría beneficiarse de aprender a reconocer estafas online:	Totalmente en desacuerdo	En desacuerdo	Indiferente	De acuerdo	Totalmente de acuerdo	Sin respuesta
- Considero importante verificar la autenticidad de los mensajes antes de actuar:	Totalmente en desacuerdo	En desacuerdo	Indiferente	De acuerdo	Totalmente de acuerdo	Sin respuesta
- Me preocupa la seguridad de mi información personal en internet: Totalmente en desacuerdo	En desacuerdo	Indiferente	De acuerdo	Totalmente de acuerdo	Sin respuesta

- Escriba algo que le gustaría aprender o reforzar acerca de las estafas online.
  
Por último, éstas son las preguntas del cuestionario post juego a las que el jugador solo podrá contestar una vez termine de jugar una ronda completa, es decir, hasta que pierda o gane:

### Conocimiento y reconocimiento de estafas online
- ¿Cuál de las siguientes consideras una estafa/phishing?
	- Un email de tu banco pidiendo tu clave
	- Un sorteo online que pide pocos datos
	- Un mensaje de un amigo pidiendo dinero urgente
- Recibe un mensaje por la noche de una empresa o servicio que dice que su cuenta está bloqueada en 2 horas si no hace clic en un enlace para confirmar su contraseña y usuario ¿Cuál es su señal de alarma más clara?
	- El mensaje tiene un enlace muy corto
 	- La urgencia por saber mi contraseña
	- Que el mensaje se envíe fuera del horario laboral
 - Recibes un mensaje de alguien que no conoces diciendo que has ganado un sorteo y te pide tus datos bancarios para reclamarlo. ¿Qué harías?
	- Ignorarlo
	- Dar mis datos para reclamar el premio
	- Comprobar la veracidad del sorteo
	- Otra
 - Al navegar por internet, aparece una ventana que dice que tu dispositivo está infectado y debes descargar un programa para “arreglarlo”. ¿Qué harías?
	- Descargar el programa para solucionar el problema
	- Cerrar la ventana y no descargar nada
	- Ignorarlo y comprobar con un antivirus fiable si mi dispositivo está libre de virus
### Autopercepción y confianza
- Me siento capaz de reconocer estafas online:	Totalmente en desacuerdo	En desacuerdo	Indiferente	De acuerdo	Totalmente de acuerdo	Sin respuesta
- Creo que podría evitar caer en un intento de estafa online:	Totalmente en desacuerdo	En desacuerdo	Indiferente	De acuerdo	Totalmente de acuerdo	Sin respuesta
- Confío en mi capacidad para identificar mensajes sospechosos en redes sociales o apps de mensajería:	Totalmente en desacuerdo	En desacuerdo	Indiferente	De acuerdo	Totalmente de acuerdo	Sin respuesta
- Creo que siempre debo verificar antes de hacer clic en enlaces o descargar archivos desconocidos:	Totalmente en desacuerdo	En desacuerdo	Indiferente	De acuerdo	Totalmente de acuerdo	Sin respuesta
- Me siento capaz de explicar a otras personas cómo reconocer estafas online:	Totalmente en desacuerdo	En desacuerdo	Indiferente	De acuerdo	Totalmente de acuerdo	Sin respuesta
- Suelo revisar la autenticidad de un mensaje antes de actuar cuando algo me parece sospechoso:	Totalmente en desacuerdo	En desacuerdo	Indiferente	De acuerdo	Totalmente de acuerdo	Sin respuesta
- Si recibo un mensaje sospechoso, sé qué pasos seguir para protegerme:	Totalmente en desacuerdo	En desacuerdo	Indiferente	De acuerdo	Totalmente de acuerdo	Sin respuesta
- Me considero consciente de los riesgos de compartir información personal en internet:	Totalmente en desacuerdo	En desacuerdo	Indiferente	De acuerdo	Totalmente de acuerdo	Sin respuesta
- Creo que mi entorno (amigos/familia) también podría beneficiarse de aprender a reconocer estafas online:	Totalmente en desacuerdo	En desacuerdo	Indiferente	De acuerdo	Totalmente de acuerdo	Sin respuesta
- Considero importante verificar la autenticidad de los mensajes antes de actuar:	Totalmente en desacuerdo	En desacuerdo	Indiferente	De acuerdo	Totalmente de acuerdo	Sin respuesta
- Me preocupa la seguridad de mi información personal en internet: Totalmente en desacuerdo	En desacuerdo	Indiferente	De acuerdo	Totalmente de acuerdo	Sin respuesta

### Acerca del juego
- ¿Qué cambiarías o mejorarías del juego para que sea más claro o divertido?
- Si pudieras añadir algo al juego, ¿qué sería?
- ¿Qué parte del juego te resultó más difícil o confusa y cómo la mejorarías?
- ¿Tienes alguna sugerencia para que el juego sea más útil para aprender a reconocer estafas online?

- Indica tu satisfacción respecto a los distintos aspectos del juego.
	- Tamaño de los textos:	Muy satisfech@	Regular	Poco satisfech@	Sin respuesta
	- Tutorial / explicación inicial:	Muy satisfech@	Regular	Poco satisfech@	Sin respuesta
	- Lo intuitivo que es el juego:	Muy satisfech@	Regular	Poco satisfech@	Sin respuesta
	- Visualización de resultados (cuando ganabas o perdías):	Muy satisfech@	Regular	Poco satisfech@	Sin respuesta
	- Sonidos y efectos de audio:	Muy satisfech@	Regular	Poco satisfech@	Sin respuesta
	- Arte / gráficos del juego:	Muy satisfech@	Regular	Poco satisfech@	Sin respuesta
	- En general, ¿cómo de satisfecho estás respecto al juego?:	Muy satisfech@ Regular	Poco satisfech@	Sin respuesta
  
</details>

<details>
<summary> Referencias </summary>
			
## Referencias:

Algunos juegos que han servido de inspiración en términos de mecánicas y estilo son:

- Papers, Please: por su sistema de toma de decisiones y gestión moral.

[Papers, Please](docs/assets/GDD/image3.png)

- JustShare y SCHEDULE 1: por el uso de un móvil

[SCHEDULE 1](docs/assets/GDD/image6.png)

- Preguntados: por las preguntas con opciones.

- Estafas del banco Santander: ideas de tipos de estafas digitales


</details>
<details>
<summary> Licencias </summary>
			
## Licencias:

Esta obra está licenciada bajo una licencia Creative Commons Atribución–NoComercial–CompartirIgual 4.0 Internacional (CC BY-NC-SA 4.0).
© 2025 Jule Page Galocha y Sergio Naranjo Barroso.
Más información: https://creativecommons.org/licenses/by-nc-sa/4.0/

UNDERGROUND™ es un nombre de empresa utilizada por nosotros. No se permite usar el nombre, logotipo o identidad de la empresa sin permiso.”

La música usada es https://youtu.be/KmKwAh8ASXw?si=OPy2_d58Xkui0hb2

El arte es toda nuestra y está bajo la misma licencia que el juego Creative Commons Atribución–NoComercial–CompartirIgual 4.0 Internacional (CC BY-NC-SA 4.0).

</details>

