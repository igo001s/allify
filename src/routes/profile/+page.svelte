<script lang="ts">
	// App
	import { page } from '$app/stores';

	// Assets
	import NotLogged from '$lib/components/general/NotLogged.svelte';

	//Components
	import KeyInformation from '$lib/components/profile/KeyInformation.svelte';
	import YourSongsOnProfile from '$lib/components/profile/YourSongsOnProfile.svelte';
	import YourArtistsOnProfile from '$lib/components/profile/YourArtistsOnProfile.svelte';
	import ChangeItemOfTheMomentModal from '$lib/components/profile/ChangeItemOfTheMomentModal.svelte';
	import SelectItemOfTheMomentModal from '$lib/components/profile/SelectItemOfTheMomentModal.svelte';
	import SelectCustomItemModal from '$lib/components/profile/SelectCustomItemModal.svelte';
	import ChangeCustomItemModal from '$lib/components/profile/ChangeCustomItemModal.svelte';
	import CommentsModal from '$lib/components/profile/CommentsModal.svelte';

	// Stores
	import { userInfo } from '$lib/stores/userInfo.store';
	import { translationsStore } from '$lib/stores/translations.store';

	// Schema
	import { getJsonLdByPage } from '$lib/utils/getJsonLdByPage';

	let showChangeItemOfTheMomentModal = false;
	let showSelectItemOfTheMomentModal = false;

	let showChangeCustomItemModal = false;
	let showSelectCustomItemModal = false;

	let showCommentsModal = false;

	let selectedItemType: 'artist' | 'music';

	$: selectedStreaming = $userInfo?.primaryStreaming === 'spotify' ? 'spotify' : null;

	function openSelectItemOfTheMomentModal(itemType: 'artist' | 'music') {
		showSelectItemOfTheMomentModal = true;
		selectedItemType = itemType;
	}

	function closeSelectItemOfTheMomentModal() {
		showSelectItemOfTheMomentModal = false;
		document.body.style.overflow = '';
	}

	function openChangeItemOfTheMomentModal(itemType: 'artist' | 'music') {
		showChangeItemOfTheMomentModal = true;
		selectedItemType = itemType;
	}

	function closeChangeItemOfTheMomentModal() {
		showChangeItemOfTheMomentModal = false;
		document.body.style.overflow = '';
	}

	function openSelectCustomItemModal(itemType: 'artist' | 'music') {
		showSelectCustomItemModal = true;
		selectedItemType = itemType;
	}

	function closeSelectCustomItemModal() {
		showSelectCustomItemModal = false;
		document.body.style.overflow = '';
	}

	function openChangeCustomItemModal(itemType: 'artist' | 'music') {
		showChangeCustomItemModal = true;
		selectedItemType = itemType;
	}

	function closeChangeCustomItemModal() {
		showChangeCustomItemModal = false;
		document.body.style.overflow = '';
	}
</script>

<svelte:head>
	<!-- Schema.org -->
	{@html `<script type="application/ld+json">${getJsonLdByPage(
		'profilePage',
		$translationsStore.locale,
		$translationsStore.profilePage.title,
		$translationsStore.configuration.allifyDescription,
		$translationsStore.profilePage.profilePageMetaDescription
	)}</script>`}
	<!-- General -->
	<title>{$translationsStore.profilePage.title}</title>
	<meta name="description" content={$translationsStore.profilePage.profilePageMetaDescription} />
	<meta name="keywords" content={$translationsStore.profilePage.profilePageMetaKeywords} />
	<link rel="canonical" href={`https://allify.club${$page.url.pathname}`} />
	<!-- Open Graph -->
	<meta property="og:locale" content={$translationsStore.configuration.langAttribute} />
	<meta property="og:url" content={`https://allify.club${$page.url.pathname}`} />
	<meta property="og:title" content={$translationsStore.profilePage.title} />
	<meta
		property="og:description"
		content={$translationsStore.profilePage.profilePageMetaOgAndTwitterContent}
	/>
	<!-- Twitter Card -->
	<meta name="twitter:url" content={`https://allify.club${$page.url.pathname}`} />
	<meta name="twitter:title" content={$translationsStore.profilePage.title} />
	<meta
		name="twitter:description"
		content={$translationsStore.profilePage.profilePageMetaOgAndTwitterContent}
	/>
</svelte:head>

{#if $userInfo?.connectedStreamings.spotify?.connected === true}
	<section class="base-section">
		<div class="mx-auto flex w-full flex-col gap-10 sm:gap-12 lg:gap-14">
			<KeyInformation
				userInfo={selectedStreaming === 'spotify' ? $userInfo.connectedStreamings.spotify : null}
				tickets={$userInfo.tickets}
				bind:showCommentsModal
			/>
		</div>

		<div class="mt-14 flex w-full flex-col gap-10 lg:gap-14">
			<YourSongsOnProfile
				openChangeYourItemsModal={() => openChangeItemOfTheMomentModal('music')}
				openSelectYourItemsModal={() => openSelectItemOfTheMomentModal('music')}
				openChangeCustomItemModal={() => openChangeCustomItemModal('music')}
				openSelectCustomItemModal={() => openSelectCustomItemModal('music')}
			/>

			<YourArtistsOnProfile
				openChangeYourItemsModal={() => openChangeItemOfTheMomentModal('artist')}
				openSelectYourItemsModal={() => openSelectItemOfTheMomentModal('artist')}
				openChangeCustomItemModal={() => openChangeCustomItemModal('artist')}
				openSelectCustomItemModal={() => openSelectCustomItemModal('artist')}
			/>
		</div>
	</section>

	{#if showSelectItemOfTheMomentModal}
		<SelectItemOfTheMomentModal {closeSelectItemOfTheMomentModal} itemType={selectedItemType} />
	{/if}

	{#if showSelectCustomItemModal}
		<SelectCustomItemModal {closeSelectCustomItemModal} itemType={selectedItemType} />
	{/if}

	{#if showChangeItemOfTheMomentModal}
		<ChangeItemOfTheMomentModal {closeChangeItemOfTheMomentModal} itemType={selectedItemType} />
	{/if}

	{#if showChangeCustomItemModal}
		<ChangeCustomItemModal {closeChangeCustomItemModal} itemType={selectedItemType} />
	{/if}

	{#if showCommentsModal}
		<CommentsModal bind:showCommentsModal />
	{/if}
{:else}
	<NotLogged notLoggedParagraph={$translationsStore.generalTexts.notLoggedProfileParagraph1} />
{/if}
