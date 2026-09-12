<script lang="ts">
	// Assets
	import Divisor from '$lib/assets/musical-waves-divisor.webp';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
</script>

<img
	src={Divisor}
	class="my-10 w-full"
	alt={$translationsStore.generalTexts.musicalWavesDivisorAltText}
/>
