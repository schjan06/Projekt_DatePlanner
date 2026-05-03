<script>
	let { label, active = false, onclick = () => {} } = $props();
</script>

<button class={`button ${active ? '' : 'secondary'}`} type="button" {onclick}>{label}</button>
