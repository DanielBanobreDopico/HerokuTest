<script>

	var APIURL
	var quotes = [];
	var htmlForm;

	if (window.location.hostname === 'localhost') {
		APIURL = 'http://localhost:3000/';
	} else {
		APIURL = '/';
	}

	async function getQuotes () {
		const QUERYURL = APIURL+'quote/';
		const response = await fetch(QUERYURL);
		const quotesArray = await response.json()
		quotes = [...quotesArray];
	}

	async function submitForm () {
		const POSTURL = APIURL+'quote/';
		const data = new FormData(htmlForm);
		const options = {
			method: 'POST',
			body: data,
		};
		const response = await fetch(POSTURL, options);
		if (response.ok) {
			alert('Gracias!');
		} else {
			alert('Oooops! Error');
		};
		getQuotes();
	}

	getQuotes();
</script>

<main>
	<h1>Silly quotes</h1>
	<div id="form">
		<form  action="javascript:;" on:submit={submitForm} bind:this={htmlForm}>
			<input type="text" name="quote" placeholder="New quote...">
			<input type="text" name="author" placeholder="Quote author...">
			<input type="file" name="image">
			<input type="submit"> 
		</form>
	</div>
	<div id="quotes">
		{#each quotes as item}
		<ul class="quote">
			<li>
				<q>{item.quote}</q>
				<em>{item.author}</em>
			</li>
		</ul>
		{/each}
	</div>
</main>

<style>
</style>