<script lang="ts">
	// Svelte
	import { onMount } from 'svelte';

	// Global styles
	import '$lib/styles/global.css';

	// Components
	import Header from '$lib/components/general/header/Header.svelte';
	import Footer from '$lib/components/general/footer/Footer.svelte';
	import LoadingAfterConnection from '$lib/components/general/LoadingAfterConnection.svelte';
	import Toast from '$lib/components/general/Toast.svelte';
	import AddTicketsModal from '$lib/components/general/AddTicketsModal.svelte';
	import BuildProfileModal from '$lib/components/general/BuildProfileModal.svelte';

	// Stores
	import { userInfo } from '$lib/stores/userInfo.store';
	import { loadingAfterConnectionStore } from '$lib/stores/loadingAfterConnection.store';
	import { showAddTickets } from '$lib/stores/showAddTickets.store';
	import { translationsStore } from '$lib/stores/translations.store';
	import { toastStore } from '$lib/stores/toast.store';

	// Services
	import { fetchUserInfo } from '$lib/services/user/build/fetchUserInfo';

	let { children } = $props();

	const fetchMeInfo = async () => {
		try {
			const response = await fetchUserInfo($translationsStore.templateEmail.welcomeToAllifySubject);

			userInfo.set(response);
		} catch {
			userInfo.set(undefined);
		} finally {
			loadingAfterConnectionStore.set({
				loading: false,
				streamingPlatform: null
			});
			sessionStorage.removeItem('allify-loading-spotify');
			sessionStorage.removeItem('allify-loading-deezer');
		}
	};

	onMount(() => {
		if (!$userInfo) fetchMeInfo();
	});
</script>

<svelte:head>
	<!-- General -->
	<meta name="color-scheme" content="light" />
	<meta name="theme-color" content="#09623a" />
	<!-- Google -->
	<meta name="google" content="notranslate" />
	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Allify" />
	<meta
		property="og:image"
		content="https://allify-sv.netlify.app/open-graph-images/og-image-allify.webp"
	/>
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@allifyapp" />
	<meta
		name="twitter:image"
		content="https://allify-sv.netlify.app/open-graph-images/og-image-allify.webp"
	/>
</svelte:head>

<Header />

<main id="main-content">
	{@render children()}
</main>

<Footer />

<!-- Toast notifications -->
{#if $toastStore.showToast}
	<Toast />
{/if}

<!-- Loading after streaming connection -->
{#if $loadingAfterConnectionStore.loading}
	<LoadingAfterConnection
		streamingPlatform={$loadingAfterConnectionStore.streamingPlatform ?? undefined}
	/>
{/if}

<!-- Add Tickets Modal -->
{#if $showAddTickets}
	<AddTicketsModal />
{/if}

<!-- Build Profile -->
{#if $userInfo}
	<BuildProfileModal />
{/if}
