<script lang="ts">
	// App
	import { dev } from '$app/environment';

	// Assets
	import DotsLoading from '$lib/assets/animations/DotsLoading.svelte';
	import AllifyLogoColorful from '$lib/assets/logos/AllifyLogoColorful.svelte';

	// Components
	import Modal from './Modal.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { toastStore } from '$lib/stores/toast.store';

	// Types
	import type { ArtistItems } from '$lib/types/Artists.type';
	import type { TrackItems } from '$lib/types/Tracks.type';
	import type { ShareDataContent } from '$lib/types/Share.type';

	// Librarys
	import { toBlob } from 'html-to-image';

	// Props
	export let showShareDataModal: boolean;
	export let shareDataFrom: string;
	export let dataToShare: ArtistItems[] | TrackItems[];
	export let buildShareDataContent: ShareDataContent;

	let loadingShare = false;

	async function handleShareData() {
		loadingShare = true;

		try {
			const element = document.getElementById('share-data-modal');

			if (!element) {
				throw new Error('Share data element not found.');
			}

			const blob = await toBlob(element, {
				cacheBust: true,
				width: 440,
				height: 560,
				pixelRatio: 3,
				backgroundColor: '#ffffff'
			});

			if (!blob) {
				throw new Error('Unable to generate the image.');
			}

			const file = new File([blob], buildShareDataContent.fileName, {
				type: 'image/png'
			});

			if (navigator.share && navigator.canShare?.({ files: [file] })) {
				await navigator.share({
					files: [file],
					title: buildShareDataContent.fileTitle,
					text: buildShareDataContent.fileText
				});
			}
		} catch (error) {
			if (dev) {
				console.error(`Error sharing data:`, error);
			}

			toastStore.set({
				showToast: true,
				toastType: 'error',
				toastMessage: buildShareDataContent.toastErrorMessage
			});
		} finally {
			setInterval(() => {
				loadingShare = false;
			}, 2000);
		}
	}
</script>

<Modal
	closeModal={() => (showShareDataModal = false)}
	closeModalButtonAriaLabel={buildShareDataContent.shareDataCloseModalButtonAriaLabel}
	closeModalIconAriaLabel={buildShareDataContent.shareDataCloseModalIconAriaLabel}
	additionalClasses="h-fit w-full max-w-2xl overflow-y-auto"
>
	<div class="space-y-3">
		<p class="text-lg font-bold text-t-primary sm:text-xl">
			{buildShareDataContent.shareDataModalParagraph1}
		</p>

		<p class="text-xs text-t-secondary sm:text-sm">
			{buildShareDataContent.shareDataModalParagraph2}
		</p>
	</div>

	<div
		class="mx-auto h-104 w-71.5 min-[400px]:h-128 min-[400px]:w-88 min-[480px]:h-160 min-[480px]:w-110"
	>
		<div class="origin-top-left scale-[0.65] min-[400px]:scale-[0.8] min-[480px]:scale-100">
			<div
				id="share-data-modal"
				class="flex h-160 w-110 flex-col justify-between overflow-hidden bg-s-default px-8 py-10 text-t-primary shadow-lg"
			>
				<header class="flex items-center justify-between gap-2">
					<AllifyLogoColorful
						logoSvgClass="w-[26%] h-auto"
						logoAriaLabel={$translationsStore.generalTexts.logoColorfulAriaLabel}
					/>

					<span class="text-right text-xs font-semibold text-t-secondary">
						{buildShareDataContent.shareDataType}
					</span>
				</header>

				<section class="space-y-1">
					<p class="text-[13px] font-bold text-brand-primary">
						{buildShareDataContent.shareDataModalPreviewParagraph1}
					</p>

					<p class="text-2xl leading-tight font-bold text-t-primary">
						{buildShareDataContent.shareDataModalPreviewParagraph2}
					</p>

					<p class="text-[13px] leading-relaxed text-t-secondary">
						{buildShareDataContent.shareDataModalPreviewParagraph3}
					</p>
				</section>

				<ul class="flex h-fit flex-col gap-3">
					{#each dataToShare as data, i (i)}
						<li class="flex max-h-22 flex-1 gap-4 rounded-lg border border-b-default p-3">
							{#if data.item.image?.url}
								<enhanced:img
									src={data.item.image?.url}
									alt={data.item.name}
									class="aspect-square h-full w-auto shrink-0 rounded-lg object-cover"
									loading="eager"
									fetchpriority="high"
									decoding="sync"
								/>
							{/if}

							<div class="mt-0.5 min-w-0 flex-1 space-y-1">
								<p
									class={`${shareDataFrom === 'myMusicalProfile' ? (i === 0 ? 'text-top-1' : i === 1 ? 'text-top-2' : 'text-top-3') : 'text-brand-primary'} text-xs font-semibold uppercase`}
								>
									{data.title}
								</p>

								<p class="text-sm font-semibold text-t-primary">
									{data.item.name}
								</p>
							</div>
						</li>
					{/each}
				</ul>

				<footer
					class="flex shrink-0 items-center justify-between gap-2 border-t border-b-default pt-6"
				>
					<span class="text-xs text-t-secondary">
						{$translationsStore.generalTexts.shareModalYourMusicYourIdentity}
					</span>

					<strong class="text-xs font-semibold text-brand-primary">allify.club</strong>
				</footer>
			</div>
		</div>
	</div>

	<div class="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
		<button class="button-secondary h-9 px-6 py-2.5" on:click={() => (showShareDataModal = false)}>
			{$translationsStore.generalTexts.shareModalCancelButtonText}
		</button>

		<button class="button-primary h-9 w-full px-6 py-2.5 sm:w-30" on:click={handleShareData}>
			{#if loadingShare}
				<DotsLoading dotsTheme="base-light" />
			{:else}
				{$translationsStore.generalTexts.shareModalShareButtonText}
			{/if}
		</button>
	</div>
</Modal>
