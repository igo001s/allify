<script lang="ts">
	// Svelte
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	// Services
	import { getPublicUser } from '$lib/services/user/getters/getPublicUser';

	onMount(async () => {
		const userId = $page.params.id;
		
		if (!userId) {
			return;
		}

		const user = await getPublicUser(userId);

		console.log('Fetched public user:', user);
	});
</script>

<section class="base-section">
	Basic Structure for Music Community Page - User ID: {$page.params.id}
</section>
