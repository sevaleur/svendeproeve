# Svendeprøve – Night Club

#### Navn: Sune Emil Valeur Andersen

##### Hold: 1146522c308 / WU08

##### Uddannelse: Webudvikler

##### Uddannelsessted: Roskilde Tekniske Skole

## Indholdsfortegnelse

- [Tech Stack](#tech-stack)
- [Overvejelser og Valg](#overvejelser-og-valg)
- [Arbejdsgang](#arbejdsgang)
- [Skalering](#)
- [Kodeeksempler](#kodeeksempler)

# Tech Stack

Til min svendeprøve har jeg valgt følgende stack:

- [JavaScript](#javascript)
- [Axios](#axios)
- [Gsap](#gsap)
- [Express.js](#express)
- [SCSS](#scss)
- [Pug](#pug)

## JavaScript

JavaScript er et dynamisk programmeringssprog, og et sprog der er fundament for mange af verdens mest elskede frameworks som **React, Vue, Angular**. Det er vigtigt for mig at mestre sproget internettet er bygget på, da jeg tror det giver mig en klar fordel i fremtiden - så jeg har valgt JavaScript.

## Axios

Axios er et JavaScript bibliotek, der bliver brugt til at lave requests fra node.js - HTTP. Axios understøtter brugen af Promise API'et der er native for ES6. Axios kan bruges til mange ting, og i denne web app har jeg brugt, udover at lave diverse requests, så til at opsnappe den JsonWebToken der blev kastet min vej af API'et vi har arbejdet med.

## GSAP

GSAP er et animations bibliotek fra Greensock. GSAP kan bruges til at animere stortset alt hvad JavaScript kan få fat på. Jeg har brugt GSAP både til denne Web App, men også meget før i tiden, til THREE.js og WebGL. Jeg er faktisk så stor fan af GSAP, at det er et bibliotek der har fast plads i min boilerplate.

## Express.js

Express.js er et node.js framework der giver et utal af muligheder for at bygge web og mobil applikationer. Det er et lag der bygget ovenpå node.js der hjælper med at håndtere servere og ruter. Jeg bruger Express.js hver gang da det giver mig en hurtig måde at bygge router på, og få sat gang i projektet. Der findes også meget middleware til express.js - I dette projekt har jeg bl.a. brugt express-session og express-flash. Session bruges til at gemme en session nøgle i en cookie og flash bruges til at definere og render en besked uden at skulle redirecte requestet.

## SCSS

SCSS er en udvidelse af CSS og den er giver langt flere muligheder end standard CSS syntax. Man kan lave variabler ved at smide et $ foran og du for kan forlænge klasser ved at smide et % foran, du kan endda lave funktioner og så kan du neste din css og dele din fil op. Så istedet for at have en lang fil på 1800 linier, så har du nu 3 filer på 600 linier. Jeg synes det er fedt, og jeg bruger altid SCSS.

## Pug

Pug (før kendt som Jade) er det for HTML, som SCSS er for CSS. Pug er en HTML Template Engine som gør det muligt at bruge JavaScript i HTML, lave loops over både arrays og objekter, samt lave de nødvendige conditionals som nu engang skal laves, og så er det muligt at dele sine filer op ved hjælp af block og extends.

# Overvejelser og Valg

## Ændringer fra designet

- Jeg har slået myComments & myReservations sammen til et samlet entry point for brugeren, kaldet Myclub, der fra kan brugeren så vælge hvad de vil kigge på og slette.
- Jeg har lavet nogle små ændringer i de forskellige animationer, men ikke noget specielt. Jeg har prøvet at holde det så Pixel Perfect som overhovedet muligt, da jeg i forvejen var bagud på tid, hvilket nok kan ses på det responsive og front pagen. Jeg kunne selvfølgelig argumentere for at mine designvalg i den responive del var en stilart kendt som kaotisk, men mere om det senere.


## Tilføjelser

- Jeg tilføjede Myclub for at give brugeren et samlingspunkt, til at kunne administrere, det der skal administreres.
- fra myclub siden har jeg tilføjet en comments side, hvor du kan se og slette dine tidligere kommentare.
- fra myclub siden har jeg tilføjet en reservations side hvor du kan se og slette dine reservationer.
- Jeg har tilføjet en lille animation når man vil booke bord, så brugeren får en bedre opfattelse af hvad de vælger og at de kan vælge.
- Jeg har tilføjet diverse små handlings sider, - fejl, tak, reservation.


## Animationer

Jeg har brugt animationer nogle steder for at skabe en mere interaktiv oplevelse. Jeg har primært brugt animationer når brugeren hover over ikoner eller information o.l. Jeg har prøvet at holde det så naturligt som muligt.

# Arbejdsgang

Jeg har arbejdet hårdt hele ugen og har været fuldt fokuseret på opgaven. Første dag brugte jeg tid på at omsætte min boilerplate til et godt starterpunkt. Derefter så Lagde jeg en plan, som selvfølgelig ikke skulle overholdes, da en af de absolutte fedeste ting ved kodning, er pudslespillet når man støder ind i bugs man ikke har haft før. Dem havde jeg en del af de første 3 dage, troede jeg, indtil jeg fandt en stavefejl på 4.dagen og fik det til at virke. Og så var det bare med at drikke så meget kaffe som muligt og prioritere hvad der skulle bygges og hvad jeg kan leve med er et ufærdigt produkt. Jeg har prioriteret dét brugeren kan interagere med efter et successfuldt login, og lod den responsive, frontpagen og noget af error-handlingen gå i forfald, da jeg så det andet som den egentlige opgave og som en større udfordring.


# Fremtidens Night Club

Fremtiden er stor for Night Club - De kan lave det om til en progressiv app, hvor folk har mulighed for en meget mere personlig oplevelse - end "bare" en web app.
De kan gameify hele brugeroplevelsen så brugerne får en større "trang" til at logge ind - dette kan gøres ved hjælp af en 3D avatar til brugerne - mini games der giver rabatter, et point system der unlocker nye ting til din 3D avatar men også oplevelser i den virkelig verden - det kan være biletter til den næste koncert på Night Club eller et reserveret bord til dig og hele familien. Mulighederne er mange, men det kræver nok mere tid end en uge, og nok også et bedre responsivt design end hvad jeg har formået.

# Kodeeksempler

## Sticky Nav

Dette er min sticky nav funktion jeg skrev for at undgå at skrive mere SCSS end højst nødvendigt. Jeg tjekker om vi er på 'home' templaten, så tager jeg nav'ens bounds - og udregner nav'ens statiske lokation, når vi kommer ind på siden.
Jeg sætter lokation ved hjælp af gsap efterfølgende for at sørge for en smooth transition fra andre views til 'home'. Derefter sætter jeg en eventlistener på window elementet der lytter efter scroll aktivitet.
Inde i funktionskroppen på eventlisteneren udregner jeg nav barens lokation igen, denne gang med den dynamiske scrollY værdi - derefter udregner jeg punktet hvor nav baren er i toppen af brugerens viewport, og så sammenligner jeg værdierne.

```js
if(template === 'home')
{
	const bounds = this.element.getBoundingClientRect()

	const initial_location = (window.innerHeight - bounds.height) - window.scrollY

	gsap.to(
	this.element,
	{
		top: `${initial_location}px`
	})

	window.onscroll = () =>
	{
	this.location = (window.innerHeight - bounds.height) - window.scrollY
	this.scroll = (window.scrollY + bounds.height) - window.innerHeight

	this.scroll > this.location
		? this.element.style.top = 0
		: this.element.style.top = `${this.location}px`
	}
}
```

## validation funktion

Dette er dele af Validation klassen jeg skrev til at validere brugernes input. Denne funktion vil jeg gerne forklare mere om til prøven.

```js
this.status = {}

validateInput(input, view)
{
    for(const [k, v] of Object.entries(input))
    {
      this.status[k] = false
      switch(k)
      {
		/*
		*
		** SWITCH/CASE DER VALIDERER FORSKELLIGE INPUTS
		** VED HJÆLP AF REGEX & FLAGS. FOR SÅ AT SÆTTE
		**	STATUS PÅ NØGLEN I STATUS OBJEKTET.
		*
		*/
	  }
	}
}

checkStatus(input, err, button, notice)
{
	let valid = 0
	this.ready = false

	const toValidate = Object.keys(this.status).length

	for(const v of Object.values(input))
	{
		v.addEventListener('input', () =>
		{
			for(const[k, v] of Object.entries(this.status))
			{
				if(v) valid++

				if(valid === toValidate)
				this.ready = true
			}
		})
	}

	this.submit(input, err, button, notice)
}

submit(input, err, button, notice)
{
	button.addEventListener('click', (e) =>
	{
		if(!this.ready)
		{
			e.preventDefault()

			for(const [k, v] of Object.entries(this.status))
			{
				!v
				? (input[k].focus(),
					gsap.to(
						input[k],
						{
						borderColor: '#ff0000',
						duration: 0.2
						}
					),
					notice.innerHTML = `Please fill out your ${k}`)
					: notice.innerHTML = `${err}`
			}
		}
	})
}
```
